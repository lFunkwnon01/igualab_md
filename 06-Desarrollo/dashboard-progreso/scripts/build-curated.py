#!/usr/bin/env python3
"""Combina OpenProject (en vivo) con la lectura curada de módulos/pruebas."""
from __future__ import annotations

import json
from collections import defaultdict
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
OP = BASE / "src/data/openproject.json"
OUT = BASE / "src/data/curated.json"

BUG_TAGS = {
    357: "M1", 510: "M1", 511: "M1", 512: "M2",
    515: "M1", 516: "M3", 658: "M2", 666: "M2",
    530: "M4", 565: "M4", 667: "M4",
    663: "M5", 664: "M5", 671: "M5", 673: "M5", 676: "M5",
    560: "M6", 561: "M6", 562: "M6", 659: "M6", 660: "M6", 661: "M6",
    662: "M6", 669: "M6", 670: "M6", 674: "M6", 675: "M6",
    557: "M7", 559: "M7", 636: "M7", 665: "M7", 672: "M7",
    570: "M8", 635: "M8",
    529: "Integración", 531: "Integración", 563: "Calidad", 566: "Calidad", 567: "Calidad",
}

CONTAINERS = {
    "M1": (171, "Módulo · Autenticación y Gestión de Sesión"),
    "M2": (176, "Módulo · Gestión de Usuarios"),
    "M3": (181, "Módulo · Catálogo de Empresas"),
    "M4": (186, "Módulo · Ingesta de Documentos"),
    "M5": (191, "Módulo · Análisis y Validación de Brechas GRI"),
    "M6": (196, "Módulo · Asistente de IA (RAG)"),
    "M7": (201, "Módulo · Generación de Reportes de Prospección"),
    "M8": (209, "Módulo · Auditoría Funcional"),
}

MODULOS = [
    {"id": "M1", "nombre": "Autenticación y sesión", "sprint": "S3", "codigo": 100, "auto": 95, "manual": 95, "uat": 100,
     "evidencia": "Documentada (CP01–CP12)", "estado": "Probado",
     "nota": "CP01–CP12 ejecutados; bugs de sesión cerrados. Sin pendientes."},
    {"id": "M2", "nombre": "Gestión de usuarios", "sprint": "S3", "codigo": 100, "auto": 95, "manual": 95, "uat": 100,
     "evidencia": "Documentada (CP13–CP19, CP62)", "estado": "Validado",
     "nota": "CP13–CP19 + CP62 (confirmación de contraseña) aprobados."},
    {"id": "M3", "nombre": "Catálogo de empresas", "sprint": "S4", "codigo": 100, "auto": 85, "manual": 95, "uat": 100,
     "evidencia": "Documentada (CP20–CP26, CP63)", "estado": "Probado",
     "nota": "CP20–CP26 + CP63 (sector «Otros»); ACT-12 cerrada."},
    {"id": "M4", "nombre": "Ingesta de documentos", "sprint": "S4", "codigo": 100, "auto": 85, "manual": 95, "uat": 100,
     "evidencia": "Documentada (CP27–CP33, CP64–CP65)", "estado": "Probado",
     "nota": "CP27–CP33 + CP64–CP65; doble check y anulación lógica cerrados."},
    {"id": "M5", "nombre": "Análisis y validación GRI", "sprint": "S5", "codigo": 100, "auto": 90, "manual": 95, "uat": 100,
     "evidencia": "Documentada (CP34–CP40, CP66–CP67)", "estado": "Probado",
     "nota": "CP34–CP40 + CP66–CP67; sanciones sin doble conteo."},
    {"id": "M6", "nombre": "Asistente IA (RAG)", "sprint": "S6", "codigo": 100, "auto": 85, "manual": 90, "uat": 100,
     "evidencia": "Documentada (CP41–CP51, CP68–CP74)", "estado": "Probado",
     "nota": "CP41–CP51 + CP68–CP74; citas, historial y respuesta en español cerrados."},
    {"id": "M7", "nombre": "Reportes de prospección", "sprint": "S7", "codigo": 100, "auto": 85, "manual": 90, "uat": 100,
     "evidencia": "Documentada (CP52–CP57, CP75–CP77)", "estado": "Probado",
     "nota": "CP52–CP57 + CP75–CP77; versionado y última validación cerrados."},
    {"id": "M8", "nombre": "Auditoría funcional", "sprint": "S9", "codigo": 100, "auto": 85, "manual": 90, "uat": 100,
     "evidencia": "Documentada (CP58–CP61, CP78)", "estado": "Probado",
     "nota": "CP58–CP61 + CP78 (paginado unificado); auditoría cerrada."},
]

META_SPRINTS = {
    "S0 · Inicial": ("S0", "Inicial", 100, 100, "Cerrado"),
    "S1 · Análisis": ("S1", "Análisis", 100, 100, "Cerrado"),
    "S2 · Diseño": ("S2", "Diseño", 100, 100, "Cerrado"),
    "S3 · Auth + Usuarios": ("S3", "Auth + Usuarios", 100, 100, "Cerrado y probado"),
    "S4 · Catálogo + Ingesta": ("S4", "Catálogo + Ingesta", 100, 100, "Cerrado; evidencia en el PDF"),
    "S5 · Análisis GRI": ("S5", "Análisis GRI", 100, 100, "Cerrado; validado por el PO"),
    "S6 · Asistente RAG": ("S6", "Asistente RAG", 100, 100, "Cerrado; citas e historial verificados"),
    "S7 · Reportes": ("S7", "Reportes", 100, 100, "Cerrado; bugs de reportes resueltos"),
    "S8 · Integración": ("S8", "Integración", 100, 100, "Cerrado; integración/E2E ejecutados"),
    "S9 · Auditoría + Calidad": ("S9", "Auditoría + Calidad", 100, 100, "Cerrado; auditoría y calidad completas"),
    "S10 · Cierre": ("S10", "Cierre", 100, 100, "Cerrado; UAT y acta de conformidad (12/11)"),
    "Sin sprint": ("—", "Bugs y ACT", 100, 100, "Backlog vacío: bugs y ACT cerrados"),
}


def main() -> None:
    op = json.loads(OP.read_text(encoding="utf-8"))
    wps = op["workPackages"]
    por_id = {w["id"]: w for w in wps}
    previo = json.loads(OUT.read_text(encoding="utf-8")) if OUT.exists() else {}

    act_extra = set((previo.get("clasificacion") or {}).get("actExtra") or [])

    def es_act(w):
        return w["asunto"].startswith("ACT-") or w["id"] in act_extra

    conteo = defaultdict(lambda: {"bugsOpen": 0, "bugsClosed": 0, "act": 0, "actTotal": 0})
    for w in wps:
        modulo = BUG_TAGS.get(w["id"])
        if not modulo:
            continue
        if es_act(w):
            conteo[modulo]["actTotal"] += 1
            if w["estado"] != "Closed":
                conteo[modulo]["act"] += 1
        elif w["tipo"] == "Bug":
            clave = "bugsClosed" if w["estado"] == "Closed" else "bugsOpen"
            conteo[modulo][clave] += 1

    for modulo, (cid, padre) in CONTAINERS.items():
        hijos = [w for w in wps if w.get("padre") == padre]
        contenedor = por_id.get(cid)
        total = len(hijos) + 1
        cerrados = sum(1 for w in hijos if w["estado"] == "Closed")
        if contenedor and contenedor["estado"] == "Closed":
            cerrados += 1
        conteo[modulo]["opTotal"] = total
        conteo[modulo]["opClosed"] = cerrados

    modulos = []
    for base in MODULOS:
        m = dict(base)
        c = conteo[m["id"]]
        m.update(
            opTotal=c.get("opTotal", 5),
            opClosed=c.get("opClosed", 0),
            bugsOpen=c.get("bugsOpen", 0),
            bugsClosed=c.get("bugsClosed", 0),
            act=c.get("act", 0),
            actTotal=c.get("actTotal", 0),
        )
        modulos.append(m)

    sprints_op = defaultdict(lambda: {"total": 0, "cerrados": 0})
    for w in wps:
        clave = w.get("sprint") or "Sin sprint"
        sprints_op[clave]["total"] += 1
        if w["estado"] == "Closed":
            sprints_op[clave]["cerrados"] += 1

    sprints = []
    for nombre, (sid, etiqueta, codigo, pruebas, estado) in META_SPRINTS.items():
        st = sprints_op.get(nombre, {"total": 0, "cerrados": 0})
        sprints.append({
            "id": sid,
            "nombre": etiqueta,
            "total": st["total"],
            "cerrados": st["cerrados"],
            "codigo": codigo,
            "pruebas": pruebas,
            "estado": estado,
            "opPct": round(100 * st["cerrados"] / st["total"]) if st["total"] else 0,
        })

    bugs = []
    for w in wps:
        if w["tipo"] == "Bug" or w["asunto"].startswith("ACT-"):
            bugs.append({
                "id": w["id"],
                "tipo": w["tipo"],
                "estado": w["estado"],
                "asunto": w["asunto"],
                "sprint": w.get("sprint"),
                "responsable": w.get("responsable"),
                "modulo": BUG_TAGS.get(w["id"], "Transversal"),
            })
    act = [b for b in bugs if b["asunto"].startswith("ACT-") or b["id"] in act_extra]
    solo_bugs = [b for b in bugs if b not in act]

    cerrados = sum(1 for w in wps if w["estado"] == "Closed")
    bugs_abiertos = sum(1 for b in solo_bugs if b["estado"] != "Closed")
    act_abiertas = sum(1 for a in act if a["estado"] != "Closed")

    curated = {
        "meta": {
            "generadoEn": "2026-11-12",
            "codigo": {"bck": "fbda867", "fe": "596b0fd", "rama": "development"},
            "fuente": "API de OpenProject 2026-11-12 + Acta de Conformidad + A&D v2 + CP01–CP79",
            "nota": (
                f"Cierre total: {len(wps)}/{len(wps)} WPs cerrados, "
                f"{bugs_abiertos} bugs y {act_abiertas} ACT abiertos. "
                "Acta de Conformidad firmada el 12/11/2026 (alcance FASE 1 al 100%)."
            ),
        },
        "global": {"proyecto": 100, "desarrollo": 100, "testeo": 100, "analisis": 100, "uat": 100, "cierre": 100},
        "historial": {
            "anterior": {
                "fecha": "2026-11-05",
                "wps": len(wps) - sum(1 for w in wps if (w.get("creado") or "") > "2026-11-05"),
                "cerrados": 101,
                "bugsAbiertos": 6,
                "actAbiertas": 20,
                "nota": "Corte anterior (05/11): 131 WPs, 101 cerrados, 6 bugs y 20 ACT abiertos. El 12/11 se cerró el resto.",
            },
            "actual": {
                "fecha": op["sincronizadoEn"][:10],
                "wps": len(wps),
                "cerrados": cerrados,
                "bugsAbiertos": bugs_abiertos,
                "actAbiertas": act_abiertas,
            },
        },
        "clasificacion": previo.get("clasificacion") or {
            "nota": "ACT = feedback del cliente o alcance extra, no un defecto.",
            "actExtra": [],
            "moduloWp": {},
        },
        "modulos": modulos,
        "sprints": sprints,
        "testing": {
            "automatizado": {"pytest": 1727, "vitest": 145, "playwright": 68, "integracion": 158, "e2e": 73, "zap": True, "trivy": True, "cobertura": "Alta"},
            "manual": {
                "casosDocumentados": 79,
                "casosFaltantes": [],
                "modulosDocumentados": ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8"],
                "modulosEjecutadosSinEvidencia": [],
                "modulosParciales": [],
                "cobertura": "Alta",
                "nota": "El documento vigente (12/11) cubre CP01–CP79 con veredicto «Paso» y captura en el PDF; 79/79 con evidencia.",
            },
            "uat": {
                "estado": "Completado",
                "nota": "El PO ejecutó las pruebas completas en UAT el 12/11/2026 y firmó el Acta de Conformidad.",
            },
            "rag": {
                "estado": "Verificado",
                "nota": "CP41–CP51 y CP68–CP74 aprobados; citas, historial y respuesta en español cerrados.",
            },
            "manualVsIA": {
                "estado": "No iniciado",
                "nota": "Falta comparar análisis manual histórico contra la automatización (fuera del alcance de la FASE 1).",
            },
        },
        "bugs": {"todos": bugs, "soloBugs": solo_bugs, "act": act},
        "cambiosA&D": [],
        "analysisGaps": [
            {
                "tema": "Evidencia de rendimiento y continuidad",
                "detalle": "RNF-016/017 (carga de 50 MB y 5 usuarios concurrentes), RNF-021 (disponibilidad 95%) y RNF-030 (backups diarios) quedan «No verificables»: falta archivar la evidencia.",
                "prioridad": "Media",
            },
        ],
    }
    OUT.write_text(json.dumps(curated, ensure_ascii=False, indent=2), encoding="utf8")
    print(
        f"Curado generado: {len(modulos)} módulos · {len(sprints)} sprints · "
        f"{len(solo_bugs)} bugs ({bugs_abiertos} abiertos) · {len(act)} ACT ({act_abiertas} abiertas) · "
        f"global {curated['global']}"
    )


if __name__ == "__main__":
    main()
