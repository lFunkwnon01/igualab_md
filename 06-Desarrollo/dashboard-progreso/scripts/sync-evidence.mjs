import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const registro = path.resolve(root, "../../03-Calidad/03-Evidencias/00-REGISTRO-EVIDENCIAS.md");
const testcasesPath = path.resolve(root, "src/data/testcases.json");

function nil(valor) {
  const v = (valor ?? "").trim();
  return !v || v === "—" || v === "-" ? null : v;
}

if (!fs.existsSync(registro)) {
  console.error(`No existe el registro: ${registro}`);
  process.exit(1);
}

const lineas = fs.readFileSync(registro, "utf8").split(/\r?\n/);
const actualizados = new Map();
for (const linea of lineas) {
  if (!linea.trim().startsWith("| CP")) continue;
  const celdas = linea.split("|").map((c) => c.trim());
  // | CP | Módulo | Caso | Entorno | Fecha | Estado | Evidencia | Responsable | Observaciones |
  if (celdas.length < 11) continue;
  const cp = celdas[1];
  if (!/^CP\d{2}$/.test(cp)) continue;
  actualizados.set(cp, {
    entorno: nil(celdas[4]),
    fecha: nil(celdas[5]),
    estado: nil(celdas[6]) ?? "Pendiente",
    evidencia: nil(celdas[7]),
    responsable: nil(celdas[8]),
    observaciones: nil(celdas[9]),
  });
}

const testcases = JSON.parse(fs.readFileSync(testcasesPath, "utf8"));
let cambios = 0;
for (const tc of testcases) {
  const datos = actualizados.get(tc.cp);
  if (!datos) continue;
  for (const [clave, valor] of Object.entries(datos)) {
    if (tc[clave] !== valor) {
      tc[clave] = valor;
      cambios += 1;
    }
  }
}
fs.writeFileSync(testcasesPath, JSON.stringify(testcases, null, 2), "utf8");
console.log(`Evidencias sincronizadas: ${actualizados.size} CPs leídos · ${cambios} campos actualizados`);
