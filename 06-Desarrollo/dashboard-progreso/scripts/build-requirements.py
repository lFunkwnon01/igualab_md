#!/usr/bin/env python3
"""Genera la matriz de trazabilidad RN/RF/RNF desde el A&D y el estado real."""
from __future__ import annotations
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

BASE = Path(__file__).resolve().parents[3]  # /igualab
DOCS = {
    "RN": BASE / "FASE 1/01-Analisis-y-Diseno/04-Reglas-de-Negocio.md",
    "RF": BASE / "FASE 1/01-Analisis-y-Diseno/05-Requerimientos-Funcionales.md",
    "RNF": BASE / "FASE 1/01-Analisis-y-Diseno/06-Requerimientos-No-Funcionales.md",
}
OUT_JSON = BASE / "06-Desarrollo/dashboard-progreso/src/data/requirements.json"
OUT_MD = BASE / "TRAZABILIDAD-REQUISITOS-2026-10-29.md"

def parse(tipo: str):
    rows = []
    for line in DOCS[tipo].read_text(encoding="utf-8").splitlines():
        if not line.strip().startswith("|"):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if not cells:
            continue
        m = re.match(r"(RN|RF|RNF)-(\d{3})", cells[0])
        if not m or m.group(1) != tipo:
            continue
        if tipo == "RN":
            rows.append({"id": cells[0], "tipo": "RN", "titulo": cells[1], "categoria": "Regla de negocio", "prioridad": ""})
        elif tipo == "RF":
            rows.append({"id": cells[0], "tipo": "RF", "titulo": cells[1], "categoria": "Funcional", "prioridad": cells[3] if len(cells) > 3 else ""})
        else:
            rows.append({"id": cells[0], "tipo": "RNF", "titulo": cells[2] if len(cells) > 2 else cells[1], "categoria": cells[1] if len(cells) > 1 else "No funcional", "prioridad": ""})
    return rows

def module_of(rid: str, tipo: str):
    n = int(rid.split("-")[1])
    if tipo == "RN":
        if n <= 13: return "M1–M2", "S3"
        if n <= 17: return "M3", "S4"
        if n <= 26: return "M4", "S4"
        if n <= 32: return "M5", "S5"
        if n <= 37: return "M6", "S6"
        if n <= 41: return "M7", "S7"
        return "M8", "S9"
    if tipo == "RF":
        if n <= 5: return "M1", "S3"
        if n <= 9: return "M2", "S3"
        if n <= 11: return "M3", "S4"
        if n <= 17 or n == 22: return "M4", "S4"
        if n <= 21 or n == 28: return "M5", "S5"
        if n in (23, 24): return "M6", "S6"
        if n in (25, 26, 27): return "M7", "S7"
        return "M8", "S9"
    if n <= 10: return "M1–M2", "S3"
    if n <= 15: return "M4–M7", "S4–S7"
    if n <= 21: return "Transversal", "S8–S9"
    if n <= 25: return "M8", "S9"
    if n <= 27: return "M5–M6", "S5–S6"
    if n <= 29: return "M4", "S4"
    return "Transversal", "S10"

EVIDENCE_MODULE = {
    "M1": "modules/auth · core/security.py · CP01–CP12",
    "M1–M2": "modules/auth + modules/usuarios · CP01–CP19",
    "M2": "modules/usuarios · CP01–CP19",
    "M3": "modules/empresas · CP20–CP26",
    "M4": "modules/ingesta · CP27–CP33",
    "M5": "modules/analisis_gri · CP34–CP40",
    "M6": "modules/asistente · CP41–CP51",
    "M7": "modules/reportes · CP52–CP57",
    "M8": "modules/auditoria · CP58–CP61",
    "Transversal": "tests/ · Jenkinsfile · pruebas-http/ · pruebas-zap/",
    "M4–M7": "modules/ingesta + analisis_gri + asistente + reportes · CP27–CP57",
    "M5–M6": "modules/analisis_gri + asistente · CP34–CP51",
}

RNF_EVIDENCE = {
    1: "core/security.py · core/validadores.py · tests/",
    2: "core/security.py (hash+salt) · tests/",
    3: "core/security.py + core/dependencies.py (JWT) · tests/",
    4: "core/config.py (JWT_SECRET_KEY fuera del código) · .env",
    5: "core/dependencies.py (RBAC por endpoint) · tests/",
    6: "modules/auth (sesión/rol vigente) · CP04/CP09",
    7: "core/validadores.py + modules/ingesta (tipo real) · CP28",
    8: "modules/auth (mensajes uniformes) · tests/",
    9: "modules/auth (token aleatorio) · tests/",
    10: "modules/asistente (prompt con datos delimitados) · CP45",
    11: "modules/ingesta (SHA-256) · CP31",
    12: "modules/usuarios (transferencia atómica) · CP17",
    13: "modelos/migraciones (restricción único SuperAdmin) · tests/",
    14: "models/analisis_gri + reportes (NULL ≠ 0) · CP37/CP39",
    15: "modules/ingesta (UTF-8) · tests/",
    16: "sin evidencia de prueba de carga/ingesta 50 MB",
    17: "sin evidencia de prueba de carga concurrente",
    18: "modules/asistente (timeout 60 s) · CP46",
    19: "modules/asistente (503 aislado) · CP46",
    20: "modules/ingesta (límite 50 MB) · CP29",
    21: "sin evidencia de monitoreo de disponibilidad 95%",
    22: "models/auditoria + migración 0005 (append-only) · CP60",
    23: "models/auditoria (retención) · CP58–CP61",
    24: "modules/auditoria (UTC → America/Lima) · CP59",
    25: "fragmentos_documento (documento_id + posiciones) · CP49",
    26: "catalogo_gri.json (48 entradas / 44 códigos; el A&D pide 40)",
    27: "modules/asistente/infrastructure/llm.py (interfaz ProveedorLlm)",
    28: "pages/Ingesta (progreso por etapas) · CP27",
    29: "mensajes de error en español · CP21/CP28/CP29",
    30: "sin evidencia de backups diarios",
}

OVERRIDES = {
    "RN-011": ("Cumple con observaciones", "CP12 aprobado; bug #515 sobre mensaje de política."),
    "RN-015": ("Parcial", "Código solo admite Minería/Petróleo/Energía; el PO pidió agregar «Otros» (observaciones 2026-10-29)."),
    "RN-025": ("Brecha", "El código publica OBSERVADO para RAG; el A&D dice no indexar hasta corregir. Acta 8 cambia a doble check del Superadmin; falta RN/RF."),
    "RN-027": ("Brecha", "Catálogo real: 48 entradas / 44 códigos únicos; el A&D exige 40."),
    "RN-031": ("Cumple con observaciones", "Detector implementado; ACT-08 pide aclarar sanciones literales/inferidas y doble conteo."),
    "RN-033": ("Cumple con observaciones", "CP41–CP51; bugs #659–#663, #669, #670, #674 y #675 abiertos."),
    "RN-034": ("Cumple con observaciones", "CP49; citas con Markdown/duplicados en revisión (#659–#662)."),
    "RN-035": ("Cumple con observaciones", "CP43; revisar falsos «sin evidencia» (#663)."),
    "RN-036": ("Cumple con observaciones", "CP44; ACT-09 revisa restricción y falsos positivos."),
    "RN-037": ("Cumple", "CP41; contexto obligatorio implementado."),
    "RN-039": ("Cumple con observaciones", "CP52–CP57; bugs #557, #559 y #636 abiertos."),
    "RF-018": ("Cumple con observaciones", "CP34–CP36; #664 condición de carrera al cambiar estados."),
    "RF-019": ("Cumple con observaciones", "CP35–CP36; #664 condición de carrera."),
    "RF-020": ("Cumple con observaciones", "CP37; ACT-08 sobre lógica de sanciones."),
    "RF-023": ("Cumple con observaciones", "CP41–CP51; bugs de citas y respuestas RAG."),
    "RF-024": ("Cumple con observaciones", "CP42–CP51; #659–#663 y ACT-04/09/10."),
    "RF-025": ("Cumple con observaciones", "CP52–CP57; #557/#559/#636 abiertos."),
    "RF-026": ("Cumple con observaciones", "CP56; #636 y #665."),
    "RF-027": ("Cumple con observaciones", "CP57; #665."),
    "RNF-016": ("No verificable", "No hay evidencia de prueba de ingesta de 50 MB en 15 min."),
    "RNF-017": ("No verificable", "No hay prueba de 5 usuarios concurrentes ni 4,200 fragmentos."),
    "RNF-021": ("No verificable", "No hay monitoreo de disponibilidad 95% en horario laboral."),
    "RNF-026": ("Brecha", "El catálogo versionado tiene 48 entradas / 44 códigos, no 40."),
    "RNF-030": ("No verificable", "No hay evidencia de backups diarios de BD y documentos."),
}

def main():
    rows = parse("RN") + parse("RF") + parse("RNF")
    for row in rows:
        modulo, sprint = module_of(row["id"], row["tipo"])
        row["modulo"] = modulo
        row["sprint"] = sprint
        if row["tipo"] == "RNF":
            row["evidencia"] = RNF_EVIDENCE.get(int(row["id"].split("-")[1]), EVIDENCE_MODULE.get(modulo, "—"))
        else:
            row["evidencia"] = EVIDENCE_MODULE.get(modulo, "—")
        estado, nota = OVERRIDES.get(row["id"], ("Cumple", ""))
        row["estado"] = estado
        row["nota"] = nota
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf-8")

    def counts(items):
        return Counter(x["estado"] for x in items)
    grupos = {t: [r for r in rows if r["tipo"] == t] for t in ("RF", "RN", "RNF")}
    total = len(rows)
    cumple = sum(1 for r in rows if r["estado"] == "Cumple")
    observ = sum(1 for r in rows if r["estado"] == "Cumple con observaciones")
    parcial = sum(1 for r in rows if r["estado"] == "Parcial")
    brecha = sum(1 for r in rows if r["estado"] == "Brecha")
    nover = sum(1 for r in rows if r["estado"] == "No verificable")

    L = []
    L.append("# 📋 Trazabilidad RN / RF / RNF ↔ desarrollo — 2026-10-29\n")
    L.append("> **Fuente:** A&D vigente (`FASE 1/01-Analisis-y-Diseno/`) + código `BCK@8bcbabe` + `FE@1d36b8a` + casos de prueba v1.8 + OpenProject.")
    L.append("> **Método:** cada requisito se cruza con su módulo, sprint, código, CP y estado en OpenProject. Los estados no verificables se marcan como tales, no como “cumple”.\n")
    L.append("---\n")
    L.append("## 1 · Veredicto\n")
    L.append(f"**{cumple}/{total} requisitos cumplen al 100%**; **{observ}** cumplen con observaciones; **{parcial}** son parciales; **{brecha}** son brechas; **{nover}** no son verificables con la evidencia actual.\n")
    L.append("| Tipo | Total | Cumple | Con observaciones | Parcial | Brecha | No verificable |")
    L.append("|---|---:|---:|---:|---:|---:|---:|")
    for t in ("RF", "RN", "RNF"):
        c = counts(grupos[t])
        L.append(f"| {t} | {len(grupos[t])} | {c['Cumple']} | {c['Cumple con observaciones']} | {c['Parcial']} | {c['Brecha']} | {c['No verificable']} |")
    L.append(f"| **Total** | **{total}** | **{cumple}** | **{observ}** | **{parcial}** | **{brecha}** | **{nover}** |")
    L.append("\n### Brechas y parciales críticos\n")
    for r in rows:
        if r["estado"] in ("Brecha", "Parcial", "No verificable"):
            L.append(f"- **{r['id']} · {r['titulo']}** — {r['estado']}. {r['nota']}")
    L.append("\n---\n")
    L.append("## 2 · Matriz completa\n")
    for t, titulo in (("RF", "Requerimientos funcionales"), ("RN", "Reglas de negocio"), ("RNF", "Requerimientos no funcionales")):
        L.append(f"### {titulo} ({len(grupos[t])})\n")
        L.append("| ID | Requisito | Módulo | Sprint | Estado | Evidencia | Observación |")
        L.append("|---|---|---|---|---|---|---|")
        for r in grupos[t]:
            L.append(f"| {r['id']} | {r['titulo']} | {r['modulo']} | {r['sprint']} | {r['estado']} | {r['evidencia']} | {r['nota'] or '—'} |")
        L.append("")
    L.append("---\n")
    L.append("## 3 · Lectura por sprint\n")
    L.append("| Sprint | Módulos | Requisitos | Cumple | Observaciones | Brechas/Parciales |")
    L.append("|---|---|---:|---:|---:|---:|")
    por_sprint = defaultdict(list)
    for r in rows:
        por_sprint[r["sprint"]].append(r)
    for sprint in ["S3", "S4", "S5", "S6", "S7", "S8–S9", "S9", "S10", "S4–S7", "S5–S6"]:
        if sprint not in por_sprint:
            continue
        items = por_sprint[sprint]
        mods = sorted({x["modulo"] for x in items})
        c = counts(items)
        L.append(f"| {sprint} | {', '.join(mods)} | {len(items)} | {c['Cumple']} | {c['Cumple con observaciones']} | {c['Parcial'] + c['Brecha'] + c['No verificable']} |")
    L.append("\n---\n")
    L.append("## 4 · Recomendaciones\n")
    L.append("1. **RN-027 / RNF-026:** alinear el catálogo a 40 códigos o cambiar el A&D y la RN/RNF al catálogo real (48 entradas / 44 códigos).")
    L.append("2. **RN-025 / acta 8:** formalizar el doble check del Superadmin y decidir si OBSERVADO se indexa o no.")
    L.append("3. **RN-015:** agregar el sector “Otros” a RN/RF, backend, frontend y CP23.")
    L.append("4. **RAG (RN-033–037, RF-023/024):** cerrar #659–#663, #669, #670, #674 y #675; luego reevaluar.")
    L.append("5. **Reportes (RN-039, RF-025–027):** cerrar #557, #559, #636 y #665.")
    L.append("6. **RNF de rendimiento/disponibilidad/backups:** ejecutar y archivar evidencia de carga, monitoreo y backups; hoy no son verificables.")
    L.append("7. **RN-031 / ACT-08:** documentar la regla de sanciones y evitar doble conteo.")
    OUT_MD.write_text("\n".join(L) + "\n", encoding="utf-8")
    print("requirements", total, "cumple", cumple, "observ", observ, "parcial", parcial, "brecha", brecha, "nover", nover)
    print("json", OUT_JSON)
    print("md", OUT_MD)

if __name__ == "__main__":
    main()
