import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const envPath = path.resolve(root, "../dashboard/.env");
const outputPath = path.resolve(root, "src/data/openproject.json");

function leerEnv(ruta) {
  const texto = fs.readFileSync(ruta, "utf8");
  const valores = {};
  for (const linea of texto.split(/\r?\n/)) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith("#") || !limpia.includes("=")) continue;
    const i = limpia.indexOf("=");
    const clave = limpia.slice(0, i).trim();
    let valor = limpia.slice(i + 1).trim();
    if (
      (valor.startsWith('"') && valor.endsWith('"')) ||
      (valor.startsWith("'") && valor.endsWith("'"))
    ) {
      valor = valor.slice(1, -1);
    }
    valores[clave] = valor;
  }
  return valores;
}

const env = leerEnv(envPath);
const url = env.OP_URL;
const key = env.OP_KEY;
if (!url || !key) {
  console.error("Faltan OP_URL u OP_KEY en ../dashboard/.env");
  process.exit(1);
}

const filtro = encodeURIComponent(
  JSON.stringify([{ project: { operator: "=", values: ["9"] } }]),
);
const endpoint = `${url}/api/v3/work_packages?filters=${filtro}&pageSize=500`;

const respuesta = await fetch(endpoint, {
  headers: { Accept: "application/json", Authorization: `Basic ${Buffer.from(`apikey:${key}`).toString("base64")}` },
});
if (!respuesta.ok) {
  console.error(`OpenProject respondió ${respuesta.status}`);
  process.exit(1);
}
const data = await respuesta.json();
const elementos = data?._embedded?.elements ?? [];

const titulo = (e, clave) => e?._links?.[clave]?.title ?? null;
const href = (e, clave) => e?._links?.[clave]?.href ?? null;

const wps = elementos.map((e) => ({
  id: e.id,
  tipo: titulo(e, "type"),
  estado: titulo(e, "status"),
  asunto: e.subject,
  sprint: titulo(e, "version"),
  padre: titulo(e, "parent"),
  responsable: titulo(e, "assignee"),
  inicio: e.startDate ?? null,
  fin: e.dueDate ?? null,
  creado: e.createdAt?.slice(0, 10) ?? null,
  actualizado: e.updatedAt?.slice(0, 10) ?? null,
  url: href(e, "self"),
  descripcion: e.description?.raw ?? "",
  porcentaje: e.percentageDone ?? null,
}));

const cuenta = (arr, fn) =>
  arr.reduce((acc, item) => {
    const k = fn(item) ?? "Sin sprint";
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});

const resumen = {
  total: wps.length,
  cerrados: wps.filter((w) => w.estado === "Closed").length,
  abiertos: wps.filter((w) => w.estado !== "Closed").length,
  porTipo: cuenta(wps, (w) => w.tipo),
  porEstado: cuenta(wps, (w) => w.estado),
  porSprint: cuenta(wps, (w) => w.sprint),
  bugs: wps.filter((w) => w.tipo === "Bug"),
  act: wps.filter((w) => w.asunto.startsWith("ACT-")),
};

// Versiones (sprints) con fechas para el timeline
let versiones = [];
try {
  const rv = await fetch(`${url}/api/v3/projects/9/versions`, {
    headers: { Accept: "application/json", Authorization: `Basic ${Buffer.from(`apikey:${key}`).toString("base64")}` },
  });
  if (rv.ok) {
    const dv = await rv.json();
    versiones = (dv?._embedded?.elements ?? []).map((v) => {
      const filas = wps.filter((w) => w.sprint === v.name);
      return {
        id: v.id,
        nombre: v.name,
        inicio: v.startDate ?? null,
        fin: v.endDate ?? null,
        estado: v.status ?? null,
        total: filas.length,
        cerrados: filas.filter((w) => w.estado === "Closed").length,
      };
    }).sort((a, b) => (a.inicio ?? "").localeCompare(b.inicio ?? ""));
  }
} catch {
  versiones = [];
}

const salida = {
  sincronizadoEn: new Date().toISOString(),
  proyecto: { id: 9, identificador: env.OP_PROJECT ?? "igualab", url },
  resumen,
  versiones,
  workPackages: wps.sort((a, b) => a.id - b.id),
};

fs.writeFileSync(outputPath, JSON.stringify(salida, null, 2), "utf8");
console.log(
  `OpenProject sincronizado: ${resumen.total} WPs · ${resumen.cerrados} cerrados · ${resumen.abiertos} abiertos`,
);
