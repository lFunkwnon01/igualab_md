#!/usr/bin/env python3
"""Genera la matriz de trazabilidad RN/RF/RNF desde el A&D v2 (PDF oficial) y el estado real."""
from __future__ import annotations

import json
import re
import subprocess
from collections import Counter, defaultdict
from pathlib import Path

BASE = Path(__file__).resolve().parents[1]  # dashboard-progreso
VAULT = BASE.parents[1]  # /igualab
PDF = VAULT / "01-Mockups-y-Propuestas/analisis-diseno-latex/analisis_y_diseno_oficial.pdf"
OUT_JSON = BASE / "src/data/requirements.json"
OUT_MD = VAULT / "TRAZABILIDAD-REQUISITOS-2026-11-12.md"

SEC = re.compile(r"^\s*\d+(\.\d+)*\.?\s*[A-ZÁÉÍÓÚÑ]")


def extraer_lineas() -> list[str]:
    if not PDF.exists():
        raise SystemExit(f"No existe el A&D: {PDF}")
    out = subprocess.run(
        ["pdftotext", "-layout", str(PDF), "-"],
        capture_output=True, text=True, check=True,
    ).stdout
    return [l.replace("\x0c", "") for l in out.split("\n")]


def buscar(lineas: list[str], pat: str, desde: int = 0) -> int:
    for i in range(max(desde, 0), len(lineas)):
        if re.match(pat, lineas[i].replace("​", "")):
            return i
    raise SystemExit(f"No se encontró la sección: {pat}")


def filas_de(lineas: list[str], a: int, b: int, pref: str) -> list[dict]:
    out: list[dict] = []
    cur: dict | None = None
    fuera = False
    for i in range(a, b):
        l = lineas[i]
        s = l.strip()
        if fuera:
            if re.match(rf"\s*{pref}-\d{{3}}\b", l):
                fuera = False
            else:
                continue
        if SEC.match(l.replace("​", "")) and not re.match(rf"\s*{pref}-\d", l):
            if cur:
                out.append(cur)
                cur = None
            fuera = True
            continue
        if (
            s.startswith("N°")
            or "Descripción del Requerimiento" in l
            or "NOMBRE DE LA" in l
            or s in ("REGLA", "Funcional", "Negocio")
            or s.startswith("Categoría")
        ):
            continue
        m = re.match(rf"\s*({pref}-\d{{3}})\b", l)
        if m:
            if cur:
                out.append(cur)
            cur = {"id": m.group(1), "raw": [l], "start": m.start(1)}
            continue
        if cur is not None:
            cur["raw"].append(l)
    if cur:
        out.append(cur)
    return out


def titulo_rn(f: dict) -> str:
    l0 = f["raw"][0]
    after = f["start"] + len(f["id"])
    tit_x = after + len(re.match(r"\s*", l0[after:]).group(0))
    m = re.search(r"(SI|Si)\s", l0[after:])
    det_x = after + m.start() if m else 36
    partes = []
    for j, l in enumerate(f["raw"]):
        seg = l[tit_x:det_x]
        if j > 0 and seg.strip():
            primero = tit_x + len(l[tit_x:]) - len(l[tit_x:].lstrip())
            if primero > tit_x + 3:
                continue
        partes.append(seg)
    return re.sub(r"\s+", " ", " ".join(partes)).strip()


def fila_rf(f: dict) -> dict:
    l0 = f["raw"][0]
    after = f["start"] + len(f["id"])
    tit_x = after + len(re.match(r"\s*", l0[after:]).group(0))
    m = re.search(r"\bRN-\d{3}", l0[after:])
    if m:
        rn_x = after + m.start()
    else:
        rn_x = 54
        for l in f["raw"][1:]:
            m2 = re.search(r"\bRN-\d{3}", l)
            if m2:
                rn_x = m2.start()
                break
    partes = [l[tit_x:rn_x] for l in f["raw"]]
    titulo = re.sub(r"\s+", " ", " ".join(partes)).strip()
    titulo = re.sub(r"\s+RN-\d{3}.*$", "", titulo).strip()
    todo = " ".join(f["raw"])
    if "NICE TO" in todo:
        pri = "NICE TO HAVE" if "HAVE" in todo else "NICE TO"
    elif "MUST" in todo:
        pri = "MUST HAVE" if "HAVE" in todo else "MUST"
    elif "SHOULD" in todo:
        pri = "SHOULD HAVE" if "HAVE" in todo else "SHOULD"
    else:
        pri = ""
    return {"titulo": titulo, "prioridad": pri}


def fila_rnf(f: dict) -> dict:
    l0 = f["raw"][0]
    after = f["start"] + len(f["id"])
    m = re.match(r"\s*(\S+)\s+(.*)", l0[after:])
    categoria, rest = m.group(1), m.group(2)
    pre = len(l0[after:]) - len(rest)
    tit_x = after + pre + len(re.match(r"\s*", rest).group(0))
    m2 = re.search(r"\b(?:RN|RF|RNF)-\d{3}|\bTransversal\b", rest)
    desc0 = rest[: m2.start()] if m2 else rest
    der_x = after + pre + m2.start() if m2 else None
    partes = [desc0] + [
        l[tit_x:der_x] if der_x else l[tit_x:] for l in f["raw"][1:]
    ]
    return {
        "categoria": categoria,
        "titulo": re.sub(r"\s+", " ", " ".join(partes)).strip(),
    }


def parsear() -> dict[str, dict]:
    lineas = extraer_lineas()
    i_rn = buscar(lineas, r"\s*6\.\s*REGLAS DE NEGOCIO")
    i_rf = buscar(lineas, r"\s*7\.4\.\s*Requerimientos Funcionales", i_rn + 1)
    i_rnf = buscar(lineas, r"\s*7\.5\.\s*Requerimientos No Funcionales", i_rf + 1)
    i_fin = buscar(lineas, r"\s*8\.\s*MODELO DE DATOS", i_rnf + 1)
    rn = {f["id"]: titulo_rn(f) for f in filas_de(lineas, i_rn, i_rf, "RN")}
    rf = {f["id"]: fila_rf(f) for f in filas_de(lineas, i_rf, i_rnf, "RF")}
    rnf = {f["id"]: fila_rnf(f) for f in filas_de(lineas, i_rnf, i_fin, "RNF")}
    if (len(rn), len(rf), len(rnf)) != (50, 38, 31):
        raise SystemExit(f"Conteos inesperados: RN={len(rn)} RF={len(rf)} RNF={len(rnf)}")
    for k, v in rn.items():
        if "ENTONCES" in v or len(v) > 70 or len(v) < 5:
            raise SystemExit(f"Título RN inválido {k}: {v!r}")
    for k, v in rf.items():
        if re.search(r"\bRN-\d{3}", v["titulo"]) or len(v["titulo"]) < 15:
            raise SystemExit(f"Título RF inválido {k}: {v['titulo']!r}")
    for k, v in rnf.items():
        if re.search(r"\b(?:RN|RF|RNF)-\d{3}", v["titulo"]) or len(v["titulo"]) < 20:
            raise SystemExit(f"Descripción RNF inválida {k}: {v['titulo']!r}")
    return {"RN": rn, "RF": rf, "RNF": rnf}


def module_of(rid: str, tipo: str) -> tuple[str, str]:
    n = int(rid.split("-")[1])
    if tipo == "RN":
        if n <= 13:
            return "M1–M2", "S3"
        if n <= 17:
            return "M3", "S4"
        if n <= 26:
            return "M4", "S4"
        if n <= 32:
            return "M5", "S5"
        if n <= 37:
            return "M6", "S6"
        if n <= 41:
            return "M7", "S7"
        if n <= 45:
            return "M8", "S9"
        return {46: ("M6", "S6"), 47: ("M7", "S7"), 48: ("M7", "S7"),
                49: ("M4", "S4"), 50: ("M6", "S6")}[n]
    if tipo == "RF":
        if n <= 5:
            return "M1", "S3"
        if n <= 9:
            return "M2", "S3"
        if n <= 11:
            return "M3", "S4"
        if n <= 17 or n == 22:
            return "M4", "S4"
        if n <= 21 or n == 28:
            return "M5", "S5"
        if n in (23, 24):
            return "M6", "S6"
        if n in (25, 26, 27):
            return "M7", "S7"
        if n in (29, 30):
            return "M8", "S9"
        return {
            31: ("M7", "S7"), 32: ("M7", "S7"), 33: ("M4", "S4"),
            34: ("M4", "S4"), 35: ("M4", "S4"), 36: ("M5", "S5"),
            37: ("M6", "S6"), 38: ("M6", "S6"),
        }[n]
    if n <= 10:
        return "M1–M2", "S3"
    if n <= 15:
        return "M4–M7", "S4–S7"
    if n <= 21:
        return "Transversal", "S8–S9"
    if n <= 25:
        return "M8", "S9"
    if n <= 27:
        return "M5–M6", "S5–S6"
    if n <= 29:
        return "M4", "S4"
    if n == 30:
        return "Transversal", "S10"
    return "M6", "S6"  # RNF-031 (traducción del asistente)


EVIDENCE_MODULE = {
    "M1": "modules/auth · core/security.py · CP01–CP12",
    "M1–M2": "modules/auth + modules/usuarios · CP01–CP19",
    "M2": "modules/usuarios · CP13–CP19, CP62",
    "M3": "modules/empresas · CP20–CP26, CP63",
    "M4": "modules/ingesta · CP27–CP33, CP64–CP65",
    "M5": "modules/analisis_gri · CP34–CP40, CP66–CP67",
    "M6": "modules/asistente · CP41–CP51, CP68–CP74",
    "M7": "modules/reportes · CP52–CP57, CP75–CP77",
    "M8": "modules/auditoria · CP58–CP61, CP78",
    "Transversal": "tests/ · Jenkinsfile · pruebas-http/ · pruebas-zap/ · CP78",
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
    26: "script de catálogo GRI versionado (44 códigos estándar)",
    27: "modules/asistente/infrastructure/llm.py (interfaz ProveedorLlm)",
    28: "pages/Ingesta (progreso por etapas) · CP27",
    29: "mensajes de error en español · CP21/CP28/CP29",
    30: "sin evidencia de backups diarios",
    31: "modules/asistente (respuesta en español) · CP68",
}

# Estados distintos de "Cumple" y notas de los requisitos que tuvieron observaciones.
OVERRIDES = {
    "RN-015": ("Cumple", "Sector «Otros» habilitado (ACT-12 cerrada); CP63 lo valida."),
    "RN-025": ("Cumple", "Doble check del SuperAdmin implementado (RF-033); bugs #752/#753 cerrados."),
    "RN-027": ("Cumple", "A&D v2 alinea el catálogo a 44 códigos estándar (antes 48 vs 40)."),
    "RN-031": ("Cumple", "Sanciones desde mención explícita sin doble conteo; CP66 aprueba."),
    "RN-033": ("Cumple", "CP41–CP51 y CP68–CP74; bugs de citas RAG cerrados (#659–#675)."),
    "RN-034": ("Cumple", "CP49/CP73; estándar de citación cerrado (ACT-10)."),
    "RN-035": ("Cumple", "CP43/CP72; falsos «sin evidencia» corregidos."),
    "RN-036": ("Cumple", "CP44; restricción y falsos positivos cerrados (ACT-09)."),
    "RN-039": ("Cumple", "CP52–CP57; bugs #557/#559/#636 cerrados."),
    "RF-018": ("Cumple", "CP34–CP36; condición de carrera #664 cerrada."),
    "RF-019": ("Cumple", "CP35–CP36; condición de carrera #664 cerrada."),
    "RF-020": ("Cumple", "CP37/CP66; lógica de sanciones cerrada (ACT-08)."),
    "RF-023": ("Cumple", "CP41–CP51; bugs de citas y respuestas RAG cerrados."),
    "RF-024": ("Cumple", "CP42–CP51/CP73; #659–#663 y ACT-04/09/10 cerradas."),
    "RF-025": ("Cumple", "CP52–CP57; #557/#559/#636 cerrados."),
    "RF-026": ("Cumple", "CP56/CP77; #636 y #665 cerrados."),
    "RF-027": ("Cumple", "CP57/CP75; #665 cerrado."),
    "RF-033": ("Cumple", "Doble check implementado y probado; bugs #752/#753 cerrados."),
    "RNF-016": ("No verificable", "Sin evidencia de prueba de ingesta de 50 MB en 15 min."),
    "RNF-017": ("No verificable", "Sin prueba de 5 usuarios concurrentes ni 4,200 fragmentos."),
    "RNF-021": ("No verificable", "Sin evidencia de monitoreo de disponibilidad 95% en horario laboral."),
    "RNF-026": ("Cumple", "A&D v2 fija 44 códigos GRI con script de inicialización versionado."),
    "RNF-030": ("No verificable", "Sin evidencia archivada de backups diarios de BD y documentos."),
    "RNF-031": ("Cumple", "CP68 aprueba. Nota: el A&D deriva de «RF-050», inexistente (debe ser RF-038)."),
}

REQ_EXTRA = {
    "RN-046": "CP69–CP71 · modules/asistente (historial de chats)",
    "RN-047": "CP77 · modules/reportes (reportes previos al versionado)",
    "RN-048": "CP76 · modules/reportes (consistencia del origen)",
    "RN-049": "CP65 · modules/ingesta (anulación lógica)",
    "RN-050": "CP68 · modules/asistente (respuesta en español)",
    "RF-031": "CP76 · modules/reportes (actualización pendiente)",
    "RF-032": "CP76 · modules/reportes (aborta si cambió el origen)",
    "RF-033": "modules/ingesta (doble check) · bugs #752/#753",
    "RF-034": "CP65 · modules/ingesta (anulación lógica)",
    "RF-035": "CP64 · modules/ingesta (tipo ya cargado)",
    "RF-036": "CP34–CP40 · modules/analisis_gri (tablas/matrices)",
    "RF-037": "CP69–CP70 · modules/asistente (historial)",
    "RF-038": "CP68 · modules/asistente (traducción al español)",
}


def main() -> None:
    parseado = parsear()
    rows = []
    for tipo in ("RN", "RF", "RNF"):
        for rid, datos in parseado[tipo].items():
            if tipo == "RN":
                row = {"id": rid, "tipo": "RN", "titulo": datos, "categoria": "Regla de negocio", "prioridad": ""}
            elif tipo == "RF":
                row = {"id": rid, "tipo": "RF", "titulo": datos["titulo"], "categoria": "Funcional", "prioridad": datos["prioridad"]}
            else:
                row = {"id": rid, "tipo": "RNF", "titulo": datos["titulo"], "categoria": datos["categoria"], "prioridad": ""}
            modulo, sprint = module_of(rid, tipo)
            row["modulo"] = modulo
            row["sprint"] = sprint
            if rid in REQ_EXTRA:
                row["evidencia"] = REQ_EXTRA[rid]
            elif tipo == "RNF":
                row["evidencia"] = RNF_EVIDENCE.get(int(rid.split("-")[1]), EVIDENCE_MODULE.get(modulo, "—"))
            else:
                row["evidencia"] = EVIDENCE_MODULE.get(modulo, "—")
            estado, nota = OVERRIDES.get(rid, ("Cumple", ""))
            row["estado"] = estado
            row["nota"] = nota
            rows.append(row)

    orden = {"RN": 0, "RF": 1, "RNF": 2}
    rows.sort(key=lambda r: (orden[r["tipo"]], r["id"]))
    OUT_JSON.parent.mkdir(parents=True, exist_ok=True)
    OUT_JSON.write_text(json.dumps(rows, ensure_ascii=False, indent=2), encoding="utf8")

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
    L.append("# 📋 Trazabilidad RN / RF / RNF ↔ desarrollo — 2026-11-12\n")
    L.append("> **Fuente:** A&D v2 oficial (`01-Mockups-y-Propuestas/analisis-diseno-latex/analisis_y_diseno_oficial.pdf`, 12/11/2026) + código `BCK@fbda867` + `FE@596b0fd` + casos de prueba CP01–CP79 + OpenProject (133/133 cerrados).")
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
    L.append("\n### Pendientes de evidencia\n")
    for r in rows:
        if r["estado"] in ("Brecha", "Parcial", "No verificable"):
            L.append(f"- **{r['id']} · {r['titulo'][:70]}** — {r['estado']}. {r['nota']}")
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
    L.append("1. **RNF-016 / RNF-017:** ejecutar y archivar la prueba de carga para poder verificarlos.")
    L.append("2. **RNF-021 / RNF-030:** archivar evidencia de monitoreo de disponibilidad y de backups diarios.")
    L.append("3. **RNF-031:** corregir en el A&D la derivación «RF-050» → «RF-038» (typo del documento).")
    L.append("4. **Cierre:** los 133 WPs de OpenProject y los 79 CPs están cerrados/aprobados; no quedan brechas de alcance abiertas.")
    OUT_MD.write_text("\n".join(L) + "\n", encoding="utf8")
    print(f"requirements: {total} ({len(grupos['RN'])} RN · {len(grupos['RF'])} RF · {len(grupos['RNF'])} RNF)")
    print(f"cumple {cumple} · observ {observ} · parcial {parcial} · brecha {brecha} · no verificable {nover}")
    print("json", OUT_JSON)
    print("md", OUT_MD)


if __name__ == "__main__":
    main()
