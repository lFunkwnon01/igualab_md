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


def main() -> None:
    op = json.loads(OP.read_text(encoding="utf-8"))
    wps = op["workPackages"]
    por_id = {w["id"]: w for w in wps}

    conteo = defaultdict(lambda: {"bugsOpen": 0, "bugsClosed": 0, "act": 0})
    for w in wps:
        modulo = BUG_TAGS.get(w["id"])
        if not modulo:
            continue
        if w["asunto"].startswith("ACT-"):
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

    modulos = [
        {"id": "M1", "nombre": "Autenticación y sesión", "sprint": "S3", "codigo": 100, "auto": 95, "manual": 95, "uat": 80, "evidencia": "Documentada (CP01–CP12)", "estado": "Probado", "nota": "CP01–CP12 ejecutados; bugs de sesión cerrados."},
        {"id": "M2", "nombre": "Gestión de usuarios", "sprint": "S3", "codigo": 100, "auto": 95, "manual": 90, "uat": 60, "evidencia": "Documentada (CP13–CP19)", "estado": "Probado con observaciones", "nota": "CP13–CP19 ejecutados; CP16 ya incluido en v1.8."},
        {"id": "M3", "nombre": "Catálogo de empresas", "sprint": "S4", "codigo": 100, "auto": 85, "manual": 90, "uat": 40, "evidencia": "Documentada (CP20–CP26)", "estado": "Probado", "nota": "Casos documentados en v1.8; evidencia incluida en el PDF."},
        {"id": "M4", "nombre": "Ingesta de documentos", "sprint": "S4", "codigo": 100, "auto": 85, "manual": 90, "uat": 40, "evidencia": "Documentada (CP27–CP33)", "estado": "Probado", "nota": "Casos documentados en v1.8; evidencia incluida en el PDF."},
        {"id": "M5", "nombre": "Análisis y validación GRI", "sprint": "S5", "codigo": 100, "auto": 90, "manual": 90, "uat": 50, "evidencia": "Documentada (CP34–CP40)", "estado": "Probado", "nota": "Casos documentados en v1.8; citas en revisión."},
        {"id": "M6", "nombre": "Asistente IA (RAG)", "sprint": "S6", "codigo": 100, "auto": 85, "manual": 80, "uat": 40, "evidencia": "Documentada (CP41–CP51)", "estado": "Probado; RAG en evaluación", "nota": "Casos documentados en v1.8; evaluación RAG parcial."},
        {"id": "M7", "nombre": "Reportes de prospección", "sprint": "S7", "codigo": 100, "auto": 85, "manual": 85, "uat": 40, "evidencia": "Documentada (CP52–CP57)", "estado": "Probado; bugs abiertos", "nota": "Casos documentados en v1.8; reportes en revisión."},
        {"id": "M8", "nombre": "Auditoría funcional", "sprint": "S9", "codigo": 100, "auto": 85, "manual": 80, "uat": 30, "evidencia": "Documentada (CP58–CP61)", "estado": "Probado; verificación parcial", "nota": "Casos documentados en v1.8; auditoría en revisión."},
    ]
    for modulo in modulos:
        c = conteo[modulo["id"]]
        modulo.update(
            opTotal=c.get("opTotal", 5),
            opClosed=c.get("opClosed", 0),
            bugsOpen=c.get("bugsOpen", 0),
            bugsClosed=c.get("bugsClosed", 0),
            act=c.get("act", 0),
        )

    sprints_op = defaultdict(lambda: {"total": 0, "cerrados": 0})
    for w in wps:
        clave = w.get("sprint") or "Sin sprint"
        sprints_op[clave]["total"] += 1
        if w["estado"] == "Closed":
            sprints_op[clave]["cerrados"] += 1

    meta_sprints = {
        "S0 · Inicial": ("S0", "Inicial", 100, 100, "Cerrado"),
        "S1 · Análisis": ("S1", "Análisis", 100, 100, "Cerrado"),
        "S2 · Diseño": ("S2", "Diseño", 100, 100, "Diseño en verificación"),
        "S3 · Auth + Usuarios": ("S3", "Auth + Usuarios", 100, 90, "Probado con observaciones"),
        "S4 · Catálogo + Ingesta": ("S4", "Catálogo + Ingesta", 100, 65, "Automatizado/API; manual sin evidencia"),
        "S5 · Análisis GRI": ("S5", "Análisis GRI", 100, 70, "Probado por PO"),
        "S6 · Asistente RAG": ("S6", "Asistente RAG", 100, 55, "Funcional; RAG en evaluación"),
        "S7 · Reportes": ("S7", "Reportes", 100, 60, "Probado; bugs abiertos"),
        "S8 · Integración": ("S8", "Integración", 100, 70, "Integración/E2E ejecutados"),
        "S9 · Auditoría + Calidad": ("S9", "Auditoría + Calidad", 100, 55, "Implementado; verificación parcial"),
        "S10 · Cierre": ("S10", "Cierre", 100, 25, "Pendiente: despliegue/UAT/entrega"),
        "Sin sprint": ("—", "Bugs y ACT", 0, 25, "Backlog de correcciones"),
    }
    sprints = []
    for nombre, (sid, etiqueta, codigo, pruebas, estado) in meta_sprints.items():
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
    act = [b for b in bugs if b["asunto"].startswith("ACT-")]
    solo_bugs = [b for b in bugs if b["tipo"] == "Bug" and not b["asunto"].startswith("ACT-")]

    curated = {
        "meta": {
            "generadoEn": "2026-10-29",
            "codigo": {"bck": "8bcbabe", "fe": "1d36b8a", "rama": "development"},
            "fuente": "Auditoría 2026-10-29 + API de OpenProject",
            "nota": "Actualizado tras el cierre de WPs/bugs. Las cifras de OpenProject son en vivo; las de pruebas son estimaciones basadas en evidencia.",
        },
        "global": {"proyecto": 73, "desarrollo": 100, "testeo": 64, "analisis": 75, "uat": 40, "cierre": 25},
        "modulos": modulos,
        "sprints": sprints,
        "testing": {
            "automatizado": {"pytest": 1727, "vitest": 145, "playwright": 68, "integracion": 158, "e2e": 73, "zap": True, "trivy": True, "cobertura": "Alta"},
            "manual": {"casosDocumentados": 61, "casosFaltantes": [], "modulosDocumentados": ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8"], "modulosEjecutadosSinEvidencia": [], "modulosParciales": [], "cobertura": "Alta", "nota": "El documento v1.8 (21/10) cubre CP01–CP61 e incluye capturas en el PDF. 5 CPs no tienen captura explícita y quedan como resultado OK."},
            "uat": {"estado": "Parcial", "nota": "El PO probó la plataforma; sus observaciones posteriores están en bugs/ACT abiertas."},
            "rag": {"estado": "Parcial", "nota": "CP41–CP51 documentados; falta cerrar bugs de citas y un set dorado repetible."},
            "manualVsIA": {"estado": "No iniciado", "nota": "Falta comparar análisis manual histórico contra la automatización."},
        },
        "bugs": {"todos": bugs, "soloBugs": solo_bugs, "act": act},
        "analysisGaps": [
            {"tema": "Doble check de ingesta", "detalle": "Falta RN/RF que formalice la advertencia y la decisión del Superadmin (acta 8, REQ-31).", "prioridad": "Alta"},
            {"tema": "Archivo mal subido", "detalle": "Definir estados OBSERVADO/RECHAZADO/EN_REVISION, bloqueo y anulación lógica; evitar borrado físico por embeddings.", "prioridad": "Alta"},
            {"tema": "Sector “Otros”", "detalle": "Agregar “Otros” al conjunto de sectores y definir si es elegible para análisis GRI.", "prioridad": "Alta"},
            {"tema": "Ingesta de matrices (Perenco)", "detalle": "El PDF de observaciones indica que Perenco reporta GRI pero no ingesta correctamente por ser matrices; falta caso/ajuste.", "prioridad": "Alta"},
            {"tema": "Trazabilidad RN/RF", "detalle": "Matriz RN/RF ↔ módulo ↔ código ↔ caso de prueba ↔ WP.", "prioridad": "Media"},
            {"tema": "Evidencia complementaria", "detalle": "El PDF v1.8 incluye capturas de 56 CPs; 5 CPs no tienen captura explícita (resultado OK) y las observaciones del PO siguen abiertas como bugs/ACT.", "prioridad": "Media"},
        ],
    }
    OUT.write_text(json.dumps(curated, ensure_ascii=False, indent=2), encoding="utf-8")
    print(
        f"Curado generado: {len(modulos)} módulos · {len(sprints)} sprints · "
        f"{len(solo_bugs)} bugs ({sum(1 for b in solo_bugs if b['estado'] != 'Closed')} abiertos) · {len(act)} ACT"
    )


if __name__ == "__main__":
    main()
