#!/usr/bin/env python3
"""Reconstruye testcases.json (CP01–CP79) y el registro de evidencias desde el PDF vigente."""
from __future__ import annotations

import json
import re
import subprocess
import sys
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
VAULT = BASE.parents[1]  # /igualab
PDF = VAULT / "01-Mockups-y-Propuestas/Igualab - Casos de Prueba.pdf"
OUT_JSON = BASE / "src/data/testcases.json"
REGISTRO = VAULT / "03-Calidad/03-Evidencias/00-REGISTRO-EVIDENCIAS.md"

MODULO_POR_NOMBRE = [
    ("Autenticaci", "M1"),
    ("Gesti[óo]n de Usuarios?", "M2"),
    ("Cat[áa]logo de Empresas", "M3"),
    ("Ingesta", "M4"),
    ("Brechas GRI", "M5"),
    ("An[áa]lisis y Validaci", "M5"),
    ("Asistente", "M6"),
    ("Reportes de Prospecci", "M7"),
    ("Generaci[óo]n de Reportes", "M7"),
    ("Auditor", "M8"),
    ("Transversal", "Transversal"),
    ("Documentaci", "Documentación"),
]


def modulo_desde_nombre(texto: str) -> str:
    for patron, modulo in MODULO_POR_NOMBRE:
        if re.search(patron, texto, re.I):
            return modulo
    return "?"


def extraer_pdf() -> str:
    if not PDF.exists():
        sys.exit(f"No existe el PDF: {PDF}")
    return subprocess.run(
        ["pdftotext", "-layout", str(PDF), "-"],
        capture_output=True, text=True, check=True,
    ).stdout


def limpiar(campo: str) -> str:
    texto = campo.replace("​", " ")
    texto = re.sub(r"\b\d{1,2}/\d{1,2}/\d{4}\b", " ", texto)
    for token in ("Fecha de", "ejecución", "sistema", "Módulo del", "N.º", "Caso de uso"):
        texto = texto.replace(token, " ")
    return re.sub(r"\s+", " ", texto).strip(" \n–-·")


def parsear(texto: str) -> list[dict]:
    paginas = texto.split("\f")
    pos_pagina: list[tuple[int, int]] = []  # (offset_absolute, pagina)
    offset = 0
    for i, pagina in enumerate(paginas, start=1):
        pos_pagina.append((offset, i))
        offset += len(pagina)

    def pagina_de(pos: int) -> int:
        actual = 1
        for off, num in pos_pagina:
            if off <= pos:
                actual = num
            else:
                break
        return actual

    candidatos = list(re.finditer(r"^\s*(CP\d{2})\s*[—–-]\s*(.+?)\s*$", texto, re.M))
    cabeceras = [
        m for m in candidatos
        if "INFORMACIÓN GLOBAL DEL CASO DE PRUEBA" in texto[m.end():m.end() + 300]
    ]
    if not cabeceras:
        sys.exit("No se encontraron cabeceras CPxx —")

    cps: list[dict] = []
    for idx, m in enumerate(cabeceras):
        cp_id = m.group(1)
        titulo = m.group(2).strip()
        inicio = m.start()
        fin = cabeceras[idx + 1].start() if idx + 1 < len(cabeceras) else len(texto)
        bloque = texto[inicio:fin]
        pagina_ini = pagina_de(inicio)
        pagina_fin = pagina_de(fin - 1) if fin > inicio else pagina_ini

        # Fecha de ejecución: primera fecha antes de "Caso de uso"
        corte = bloque.find("Caso de uso")
        cabecera_bloque = bloque[:corte] if corte != -1 else bloque[:600]
        mf = re.search(r"(\d{1,2})/(\d{1,2})/(\d{4})", cabecera_bloque)
        if not mf:
            sys.exit(f"{cp_id}: sin fecha de ejecución")
        fecha = f"{mf.group(3)}-{int(mf.group(2)):02d}-{int(mf.group(1)):02d}"

        # Módulo del sistema
        mm = re.search(r"M[óo]dulo del(.*?)(?:Caso de uso|Requisitos)", bloque, re.S)
        if not mm:
            sys.exit(f"{cp_id}: sin campo Módulo del sistema")
        modulo = modulo_desde_nombre(limpiar(mm.group(1)))
        if modulo == "?":
            sys.exit(f"{cp_id}: módulo no reconocido: {limpiar(mm.group(1))!r}")

        # Caso de uso
        mc = re.search(r"Caso de uso\s*(.*?)(?:Requisitos)", bloque, re.S)
        caso_uso = re.sub(r"\s+", " ", mc.group(1)).strip() if mc else "—"

        # Requisitos / reglas (corta en "Origen (ACT)" si existe)
        mr = re.search(r"Requisitos /\s*(.*?)\s*Descripci", bloque, re.S)
        requisitos = ""
        origen = ""
        if mr:
            requisitos = re.sub(r"\breglas\b", " ", mr.group(1))
            mo = re.search(r"Origen \(ACT\)\s*(ACT-\d+)", requisitos)
            if mo:
                origen = mo.group(1)
            requisitos = requisitos.split("Origen")[0]
            requisitos = re.sub(r"\s+", " ", requisitos).strip()

        # Descripción
        md = re.search(r"Descripci[óo]n\s*(.*?)\s*1\.\s*Caso de prueba", bloque, re.S)
        descripcion = re.sub(r"\s+", " ", md.group(1)).strip() if md else titulo

        # Veredicto
        mv = re.search(r"Veredicto \(Paso / Falla\)(.*?)(?:Observaciones|Probador)", bloque, re.S)
        veredicto = None
        if mv:
            mv2 = re.search(r"\b(Paso|Falla)\b", mv.group(1))
            if mv2:
                veredicto = mv2.group(1)
        if not veredicto:
            mv3 = re.search(r"Veredicto \(Paso / Falla\)\s*(?:\n.*){0,4}?\s*(Paso|Falla)\s*(?:\n|$)", bloque)
            veredicto = mv3.group(1) if mv3 else None
        if not veredicto:
            sys.exit(f"{cp_id}: sin veredicto")

        # Defectos y observaciones
        mdef = re.search(r"Defectos y desviaciones\s*(.*?)\s*Veredicto", bloque, re.S)
        defectos = re.sub(r"\s+", " ", mdef.group(1)).strip() if mdef else ""
        mobs = re.search(r"Observaciones\s*(.*?)\s*Probador", bloque, re.S)
        observaciones = re.sub(r"\s+", " ", mobs.group(1)).strip() if mobs else ""

        # Probador
        mp = re.search(r"Probador:\s*([^\n]+)", bloque)
        probador = mp.group(1).strip() if mp else ""

        rango = f"p. {pagina_ini}" if pagina_ini == pagina_fin else f"p. {pagina_ini}–{pagina_fin}"
        aprobado = veredicto == "Paso"

        cps.append({
            "cp": cp_id,
            "numero": int(cp_id[2:]),
            "modulo": modulo,
            "titulo": titulo,
            "version": "1.8" if int(cp_id[2:]) <= 61 else "2.0",
            "documentado": True,
            "estado": "Aprobado" if aprobado else "Fallido",
            "entorno": "QA/UAT",
            "resultado": "OK" if aprobado else "Falla",
            "responsable": probador or "Mauricio Gonzalez / Alonso Benites",
            "evidencia": f"PDF vigente, {rango}",
            "observaciones": observaciones or "Sin observaciones",
            "fecha": fecha,
            "casoUso": caso_uso,
            "requisitos": requisitos,
            "origen": origen,
            "descripcion": descripcion,
            "defectos": defectos or "Ninguno",
        })
    return cps


def escribir_registro(cps: list[dict]) -> None:
    lineas = REGISTRO.read_text(encoding="utf-8").splitlines()
    inicio = next(i for i, l in enumerate(lineas) if l.startswith("| CP | Módulo |"))
    cabecera = lineas[inicio]
    filas = [
        f"| {c['cp']} | {c['modulo']} | {c['titulo']} | {c['entorno']} | {c['fecha']} | "
        f"{c['estado']} | {c['evidencia']} | {c['responsable']} | {c['observaciones']} |"
        for c in cps
    ]
    nuevas = lineas[:inicio] + [cabecera] + filas
    texto = "\n".join(nuevas) + "\n"
    texto = texto.replace(
        "Las imágenes/capturas están insertadas en el PDF de casos de prueba v1.8.",
        "Las imágenes/capturas están insertadas en el PDF de casos de prueba vigente (CP01–CP79, 12/11/2026).",
    ).replace(
        "1. La evidencia principal está en `03-Calidad/02-Casos-de-Prueba/Plan-y-Casos-de-Prueba-v1.8_2026-10-21.pdf`.",
        "1. La evidencia principal está en `01-Mockups-y-Propuestas/Igualab - Casos de Prueba.pdf` (CP01–CP79).",
    )
    REGISTRO.write_text(texto, encoding="utf-8")


def main() -> None:
    cps = parsear(extraer_pdf())
    OUT_JSON.write_text(json.dumps(cps, ensure_ascii=False, indent=2), "utf8")
    escribir_registro(cps)

    por_modulo: dict[str, int] = {}
    for c in cps:
        por_modulo[c["modulo"]] = por_modulo.get(c["modulo"], 0) + 1
    fallidos = [c["cp"] for c in cps if c["estado"] != "Aprobado"]
    print(f"testcases.json: {len(cps)} CPs · {por_modulo}")
    print(f"aprobados: {sum(1 for c in cps if c['estado'] == 'Aprobado')} · no aprobados: {fallidos or 'ninguno'}")
    print(f"registro actualizado: {REGISTRO}")


if __name__ == "__main__":
    main()
