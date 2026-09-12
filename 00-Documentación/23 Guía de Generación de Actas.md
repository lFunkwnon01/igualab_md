
> ⚠️ **AVISO (12/09/2026)**: los docs [[04 RF]], [[05 RNF]], [[06 AWS]], [[09 Planificación]], [[10 Pendientes]], [[12-14 Kick-off]], [[15-19 Diagramas]], [[20 Prompt]], [[22 A&D]] y [[26 Arquitectura]] fueron **archivados** en `99-Archivo — Versiones Anteriores`. La base vigente = **Plan de Proyecto v1.2** + carpeta **`FASE 1/`** + actas.
# 23 · Guía de Generación de Actas (Plantilla + Workflow)

Cómo se generan las actas del proyecto. **Fuente del formato:** plantilla oficial de Google Docs del curso ("ACTA DE REUNION — CS3081") y las actas firmadas 1–3 (`01-Mockups-y-Propuestas/Acta_Reunion[1-3].pdf`).

> 📌 **Resumen del flujo:** copiar el `.tex` del último acta → renombrar a `Acta_ReunionN_BORRADOR.tex` → editar contenido → compilar con `tectonic` → llevar el PDF a la reunión → completar en vivo → enviar por correo en 24 h → firmar y archivar.

---

## 📁 Archivos

| Archivo | Rol |
|---|---|
| `01-Mockups-y-Propuestas/Acta_ReunionN_BORRADOR.tex` | **Fuente editable del acta** (LaTeX/XeLaTeX) |
| `01-Mockups-y-Propuestas/Acta_ReunionN_BORRADOR.pdf` | Salida compilada (para la reunión y firma) |
| `01-Mockups-y-Propuestas/Acta_ReunionN.pdf` | Acta **firmada** (archivo oficial, reemplaza al borrador) |

**Compilar:**
```bash
cd 01-Mockups-y-Propuestas
tectonic -X compile Acta_ReunionN_BORRADOR.tex
```
Requiere `tectonic` (XeTeX autocontenido) y la fuente **Carlito** (clónica métrica de Calibri; instalada en `/usr/share/fonts/google-carlito-fonts/`).

---

## 🧩 Estructura obligatoria (10 secciones)

| § | Sección | Qué se llena ANTES | Qué se llena DURANTE/DESPUÉS |
|---|---|---|---|
| 1 | Datos generales | Código (CS3081-NNN-AAAA), fecha, proyecto, módulo/fase, modalidad | **Horas** de inicio/término |
| 2 | Objetivo y resultado esperado | Todo | — |
| 3 | Participantes | Nombres y roles (cliente + equipo completo) | **Asistencia** `[ ] Sí [ ] No` |
| 4 | Agenda | Temas + responsables | Columna **Tratado** |
| 5 | Desarrollo | Temas y síntesis propuesta | Ajustar síntesis + **conclusión/estado** |
| 6 | Requisitos (REQ-xx) | Filas propuestas | **Columna Estado** (Propuesto/Validado/Registrado/Pendiente/Descartado) |
| 7 | Acuerdos y compromisos | Acciones, responsables, fechas | Estado de avance |
| 8 | Próxima interacción | Fecha tentativa + objetivo | Confirmar canal |
| 9 | Validación/firmas | Nombres y cargos | Método, fecha, observaciones |
| 10 | Aprobación (V°B° CEO) | Nombre del CEO | Firma y fecha |

> ⚠️ **Regla:** en el borrador que se lleva a la reunión, §3 asistencia, §4 tratado y §6 estados van **en blanco** — se marcan durante/tras la reunión, nunca antes.

---

## 🔢 Convención de REQ

1. **Secuencia continua entre actas:** el acta 3 cerró en REQ-09 → el acta 4 arranca en REQ-10. Nunca re-usar IDs.
2. **REQ ≠ RF/RNF/RN:** los `REQ-xx` son acuerdos con el cliente (acta); los `RF-xxx/RNF-xxx/RN-xxx` son la especificación del documento Análisis y Diseño. Un REQ puede impactar varios RF (ej.: REQ-10 → RF-004/005).
3. **No se re-crean REQs pasados:** se confirman/cierran por **referencia cruzada** (ej.: REQ-11 *"cierra REQ-08"*; REQ-12 *"en concordancia con acta 1 REQ-06 y acta 2 REQ-04"*).
4. **Estados válidos:** `Propuesto · Validado · Registrado · Pendiente · Descartado · Cumplido`.
5. **Trazabilidad:** todo cambio de alcance requiere decisión del **PO (Oscar Baldeón) registrada en acta** (regla del vault, `14 RF-11+.md`).

---

## 🎨 Especificaciones visuales (plantilla Doc, replicada en LaTeX)

| Elemento | Especificación |
|---|---|
| Tipografía | **Carlito** (métrica Calibri). Cuerpo 11pt · tablas `\footnotesize` (9pt) |
| Título | `ACTA DE REUNION` centrado, **22pt** bold |
| Marca | `CS3081 | INGENIERÍA DE SOFTWARE` en **rojo #E4002B** + `· Acta de reunión con usuarios` gris #666666 |
| Encabezado corrido | La marca va **en todas las páginas** (fancyhdr `\fancyhead[L]`) |
| Pie corrido | `Uso académico · Proyecto real    Página X de Y` (gris, `\fancyfoot[R]`, `\pageref{LastPage}`) |
| Cajas PROPÓSITO/REGISTRO | Fondo **#FCE8EC**, borde #B7B7B7, etiqueta roja bold, texto #333333, 9pt |
| Encabezados de tabla | Fondo **#202124**, texto blanco bold, centrado |
| Celdas de etiqueta | Fondo **#F3F4F6**, bold |
| Valores | Itálica gris #555555 (estilo placeholder de la plantilla) |
| Bordes | 1pt **#B7B7B7** en todas las celdas (`\arrayrulecolor`) |
| Secciones | 14pt bold, **18pt antes / 9pt después** (`\asec`) — nunca pegadas al contenido |

## ⚖️ Armonía de paginación (reglas LaTeX ya aplicadas)

- `\arraystretch{1.55}` + `\tabcolsep{4pt}` → filas con aire y tablas que caben en el ancho (texto útil ≈ 16cm).
- Tablas largas (§5–§7) con **`longtable`**: si no caben, continúan en la página siguiente **repitiendo el encabezado** (`\endhead`).
- `tr`/filas nunca se cortan a la mitad; títulos con `page-break-after: avoid` natural (el `\asec` + contenido fluyen juntos).
- Verificar tras compilar: ~4–5 páginas, encabezado y pie presentes en todas (`pypdf`).

---

## ✅ Checklist de envío (dentro de las 24 h)

1. [ ] Horas §1 completadas
2. [ ] Asistencia §3 marcada
3. [ ] Agenda §4 tratada
4. [ ] Estados §6 y compromisos §7 actualizados
5. [ ] PDF re-compilado y revisado (paginación limpia)
6. [ ] Enviado por correo al cliente (canal: Correo/Discord)
7. [ ] Firmas §9–10 recogidas → renombrar a `Acta_ReunionN.pdf` y archivar
8. [ ] Sintetizar el acta en [[21 Actas de Reunión y Acuerdos]] y propagar cambios al vault (roles, pendientes, plan)

## 🔗 Relacionado
- [[21 Actas de Reunión y Acuerdos]] · [[10 Pendientes y Supuestos]] · [[09 Planificación y Roadmap]]
