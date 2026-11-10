import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const dataDir = path.join(root, "src/data");

const openproject = JSON.parse(fs.readFileSync(path.join(dataDir, "openproject.json"), "utf8"));
const requirements = JSON.parse(fs.readFileSync(path.join(dataDir, "requirements.json"), "utf8"));
const testcases = JSON.parse(fs.readFileSync(path.join(dataDir, "testcases.json"), "utf8"));
const curated = JSON.parse(fs.readFileSync(path.join(dataDir, "curated.json"), "utf8"));

const wps = openproject.workPackages ?? [];
const cambios = curated["cambiosA&D"] ?? [];
const gaps = curated.analysisGaps ?? [];
const actExtra = new Set((curated.clasificacion?.actExtra ?? []).map(String));
const reqById = new Map(requirements.map((r) => [r.id, r]));
const cambioById = new Map(cambios.map((c) => [c.id, c]));
const esAct = (w) => (w.asunto ?? "").startsWith("ACT-") || actExtra.has(String(w.id));
const esBug = (w) => w.tipo === "Bug" && !esAct(w);

const MODULE_BY_PARENT = {
  "Módulo · Autenticación y Gestión de Sesión": "M1",
  "Módulo · Gestión de Usuarios": "M2",
  "Módulo · Catálogo de Empresas": "M3",
  "Módulo · Ingesta de Documentos": "M4",
  "Módulo · Análisis y Validación de Brechas GRI": "M5",
  "Módulo · Asistente de IA (RAG)": "M6",
  "Módulo · Generación de Reportes de Prospección": "M7",
  "Módulo · Auditoría Funcional": "M8",
};
const WP_MODULE = curated.clasificacion?.moduloWp ?? {};
const BUG_MODULE = Object.fromEntries((curated.bugs?.todos ?? []).map((b) => [String(b.id), b.modulo]));

function moduloDe(w) {
  return (
    MODULE_BY_PARENT[w.padre ?? ""] ??
    MODULE_BY_PARENT[w.asunto] ??
    WP_MODULE[String(w.id)] ??
    BUG_MODULE[String(w.id)] ??
    null
  );
}

function modulosDe(etiqueta) {
  if (!etiqueta) return [];
  const m = etiqueta.match(/^M(\d)(?:[–-]M?(\d))?$/);
  if (!m) return [etiqueta];
  const a = Number(m[1]);
  const b = m[2] ? Number(m[2]) : a;
  const out = [];
  for (let i = Math.min(a, b); i <= Math.max(a, b); i++) out.push(`M${i}`);
  return out;
}

function requisitosDelModulo(modulo) {
  if (!modulo) return [];
  const propios = modulosDe(modulo);
  return requirements.filter((r) => modulosDe(r.modulo).some((x) => propios.includes(x))).map((r) => r.id);
}

const RE_REQ = /\b(RN|RF|RNF)-(\d{3})\b/g;
const RE_CP = /\bCP[-\s]?(\d{1,2})\b/g;

function extraerRequisitos(texto) {
  const ids = [];
  for (const m of texto.matchAll(RE_REQ)) {
    const id = `${m[1]}-${m[2]}`;
    if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

function extraerCps(texto) {
  const ids = [];
  for (const m of texto.matchAll(RE_CP)) {
    const n = Number(m[1]);
    if (n < 1 || n > 99) continue;
    const id = `CP${String(n).padStart(2, "0")}`;
    if (!ids.includes(id)) ids.push(id);
  }
  return ids;
}

const CAMBIO_FUERTE = [
  "regla de negocio", "requisito", "rn-", "rf-", "rnf-", "alcance",
  "debería", "deberia", "no coincide", "observación del po", "observacion del po",
  "cambiar la regla", "modificar el análisis", "modificar el analisis",
  "actualizar el análisis", "actualizar el analisis", "nueva funcionalidad",
  "ampliar", "redefin", "cambio de requerimiento", "nuevo requerimiento",
];
const CAMBIO_DEBIL = ["cambio", "cambia", "cambi", "modific", "actualiz", "ajust", "corregir el análisis", "corregir el analisis"];

function tieneCambio(texto) {
  const t = texto.toLowerCase();
  return {
    fuerte: CAMBIO_FUERTE.some((k) => t.includes(k)),
    debil: CAMBIO_DEBIL.some((k) => t.includes(k)),
  };
}

function senalDe(w) {
  const texto = `${w.asunto ?? ""} ${w.descripcion ?? ""}`;
  const { fuerte, debil } = tieneCambio(texto);
  const esCambio = fuerte || (esAct(w) && debil);
  if (esAct(w)) return esCambio ? "Observación PO con cambio" : "Observación PO";
  if (esBug(w)) return esCambio ? "Defecto con cambio de alcance" : "Defecto";
  if (esCambio) return "Cambio de alcance";
  if (w.tipo === "Feature") return "Funcionalidad";
  if (w.tipo === "User story") return "Historia de usuario";
  return "Tarea";
}

const issues = wps.map((w) => {
  const texto = `${w.asunto ?? ""}\n${w.descripcion ?? ""}`;
  const reqDirectos = extraerRequisitos(texto);
  const reqDesconocidos = reqDirectos.filter((id) => !reqById.has(id));
  const reqValidos = reqDirectos.filter((id) => reqById.has(id));
  const cpsDirectos = extraerCps(texto).filter((id) => testcases.some((c) => c.cp === id));
  const modulo = moduloDe(w);
  const reqModulo = requisitosDelModulo(modulo).filter((id) => !reqDirectos.includes(id));
  const senal = senalDe(w);

  const enCambios = reqValidos.filter((id) => cambioById.has(id));
  const conBrecha = reqValidos.filter((id) => ["Brecha", "Parcial"].includes(reqById.get(id).estado));

  let impacto = "contemplado";
  let motivo = "";
  if (reqDesconocidos.length) {
    impacto = "actualizar-and";
    motivo = `Menciona ${reqDesconocidos.join(", ")} que no existe en el A&D vigente.`;
  } else if (enCambios.length) {
    impacto = "actualizar-and";
    motivo = `Toca ${enCambios.join(", ")}: el A&D ya registra no concordancia con la implementación.`;
  } else if (conBrecha.length) {
    impacto = "actualizar-and";
    motivo = `Toca ${conBrecha.join(", ")}, marcados como Brecha/Parcial en el análisis.`;
  } else if (senal.includes("cambio") && (reqValidos.length || reqModulo.length)) {
    impacto = "actualizar-and";
    motivo = `Señal de cambio de alcance sobre requisitos de ${modulo ?? "sin módulo"}; verificar redacción en el A&D.`;
  } else if (reqValidos.length || cpsDirectos.length || reqModulo.length) {
    impacto = "contemplado";
    motivo = reqValidos.length
      ? `Cubierto por ${reqValidos.join(", ")} en el A&D.`
      : `Pertenece a ${modulo}, con requisitos y CP ya definidos en el análisis.`;
  } else {
    impacto = "sin-relacion";
    motivo = "Sin referencia a RN/RF/RNF ni a un módulo con requisitos del A&D.";
  }

  return {
    id: w.id,
    tipo: w.tipo,
    estado: w.estado,
    asunto: w.asunto,
    creado: w.creado,
    actualizado: w.actualizado,
    sprint: w.sprint,
    responsable: w.responsable,
    modulo,
    senal,
    reqDirectos,
    reqDesconocidos,
    reqModulo,
    cpsDirectos,
    impacto,
    motivo,
    esBug: esBug(w),
    esAct: esAct(w),
  };
});

const issuesPorReq = new Map();
for (const issue of issues) {
  for (const id of issue.reqDirectos) {
    const arr = issuesPorReq.get(id) ?? [];
    arr.push(issue.id);
    issuesPorReq.set(id, arr);
  }
}
const issuesPorModulo = new Map();
for (const issue of issues) {
  if (!issue.modulo) continue;
  const arr = issuesPorModulo.get(issue.modulo) ?? [];
  arr.push(issue.id);
  issuesPorModulo.set(issue.modulo, arr);
}

const requisitos = requirements.map((r) => {
  const directos = issuesPorReq.get(r.id) ?? [];
  const enModulo = (issuesPorModulo.get(r.modulo) ?? []).filter((id) => !directos.includes(id));
  const cambio = cambioById.get(r.id) ?? null;
  const modsReq = modulosDe(r.modulo);
  const cps = [
    ...testcases.filter((c) => modsReq.includes(c.modulo)).map((c) => c.cp),
    ...issues.filter((i) => directos.includes(i.id)).flatMap((i) => i.cpsDirectos),
  ].filter((v, i, a) => a.indexOf(v) === i);

  const pendiente = r.estado !== "Cumple" || Boolean(cambio);
  let accion = "Sin acción: el A&D refleja lo implementado.";
  if (cambio) accion = cambio.accion || "Reescribir la entrada según la implementación real.";
  else if (r.estado === "Brecha") accion = "Completar en el A&D: falta alcance o formalización.";
  else if (r.estado === "Parcial") accion = "Ajustar el A&D: el alcance escrito no coincide del todo.";
  else if (r.estado === "No verificable") accion = "Añadir al A&D cómo se verifica; hoy no hay evidencia.";
  else if (r.estado === "Cumple con observaciones") accion = "Documentar la observación (bug/ACT) junto al requisito.";

  return {
    id: r.id,
    tipo: r.tipo,
    titulo: r.titulo,
    estado: r.estado,
    nota: r.nota,
    modulo: r.modulo,
    sprint: r.sprint,
    issuesDirectos: directos,
    issuesModulo: enModulo,
    cps,
    enCambios: Boolean(cambio),
    concordancia: cambio?.concordancia ?? null,
    pendiente,
    accion,
  };
});

const actualizaciones = [];
for (const c of cambios) {
  actualizaciones.push({
    origen: "Cambios A&D",
    ref: c.id,
    detalle: `${c.artefacto}: ${c.analisis} → ${c.implementacion}`,
    accion: c.accion,
    concordancia: c.concordancia,
    prioridad: c.concordancia === "No concuerda" ? "Alta" : "Media",
  });
}
for (const g of gaps) {
  actualizaciones.push({
    origen: "Brecha de formalización",
    ref: g.tema,
    detalle: g.detalle,
    accion: "Formalizar en RN/RF del A&D.",
    concordancia: "Pendiente",
    prioridad: g.prioridad ?? "Media",
  });
}
const desconocidos = new Map();
for (const i of issues) {
  for (const id of i.reqDesconocidos) {
    const arr = desconocidos.get(id) ?? [];
    arr.push(`#${i.id}`);
    desconocidos.set(id, arr);
  }
}
for (const [id, refs] of desconocidos) {
  actualizaciones.push({
    origen: "Detección en issues",
    ref: id,
    detalle: `Referenciado en ${refs.join(", ")} pero no existe en el A&D (RN/RF/RNF).`,
    accion: "Verificar si es un requisito nuevo o un ID mal escrito; actualizar el análisis.",
    concordancia: "Fuera del A&D",
    prioridad: "Alta",
  });
}
for (const r of requisitos) {
  if (r.estado === "Brecha" && r.issuesDirectos.length === 0) {
    actualizaciones.push({
      origen: "Seguimiento",
      ref: r.id,
      detalle: `Marcado como Brecha en el A&D pero ningún issue lo menciona de forma directa.`,
      accion: "Crear/relacionar un work package para cerrar la brecha.",
      concordancia: "Sin seguimiento",
      prioridad: "Media",
    });
  }
}

const resumen = {
  total: issues.length,
  abiertos: issues.filter((i) => i.estado !== "Closed").length,
  cerrados: issues.filter((i) => i.estado === "Closed").length,
  conRefDirecta: issues.filter((i) => i.reqDirectos.length > 0 || i.cpsDirectos.length > 0).length,
  actualizarAnd: issues.filter((i) => i.impacto === "actualizar-and").length,
  contemplado: issues.filter((i) => i.impacto === "contemplado").length,
  sinRelacion: issues.filter((i) => i.impacto === "sin-relacion").length,
  requisitosTocados: requisitos.filter((r) => r.issuesDirectos.length > 0).length,
  requisitosPendientes: requisitos.filter((r) => r.pendiente).length,
  cpsRelacionados: new Set(issues.flatMap((i) => i.cpsDirectos)).size,
  actualizaciones: actualizaciones.length,
};

const salida = {
  generadoEn: new Date().toISOString(),
  fuentes: {
    openproject: openproject.sincronizadoEn,
    requisitos: "FASE 1/01-Analisis-y-Diseno (A&D oficial)",
    casosDePrueba: "03-Calidad/02-Casos-de-Prueba/Plan-y-Casos-de-Prueba-v1.8",
  },
  resumen,
  issues: issues.sort((a, b) => (b.creado ?? "").localeCompare(a.creado ?? "") || b.id - a.id),
  requisitos,
  actualizaciones,
};

fs.writeFileSync(path.join(dataDir, "traceability.json"), JSON.stringify(salida, null, 2), "utf8");

const r = resumen;
console.log(
  `Trazabilidad: ${r.total} issues · ${r.conRefDirecta} con referencia directa · ` +
    `${r.actualizarAnd} requieren actualizar A&D · ${r.requisitosTocados}/105 requisitos tocados · ` +
    `${r.actualizaciones} actualizaciones pendientes`,
);
