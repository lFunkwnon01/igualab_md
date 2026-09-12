# 99 · Archivo — Versiones Anteriores (v1.0 / pre-plan v1.2)

> **AVISO**: contenido **congelado el 12/09/2026**. La **base de verdad** del proyecto es:
> 1. `01-Mockups-y-Propuestas/Igualab - Plan de proyecto.docx (1).pdf` — **Plan de Proyecto v1.2** (línea base aprobada 11/09/2026).
> 2. `FASE 1/` — el análisis y diseño, arquitectura, stack, frontend y API de FASE 1 (31 RN / 25 RF / 21 RNF / 9 CU, RAG simple sin MCP).
> 3. Actas 1–5 (`00-Documentación/21...` y PDFs en `01-Mockups-y-Propuestas/`).
> Este material aquí archivado **describe versiones anteriores** (plan v1.0/1.1, rol "Usuario", módulo de Bolsa de Valores, dashboards, ingestión de PDF, numerado RF-001…021 y CU007 dashboards) — **NO debe citarse como vigente**. Se conserva solo por trazabilidad de decisiones (acta 5 · REQ-16/19/20 y acta 4).

## Motivo de archivado por archivo

| Archivo | Motivo |
|---|---|
| `04 Requerimientos Funcionales.md` / `05 Requerimientos No Funcionales.md` | Numerado RF-001…021 del A&D v1.0 con Bolsa/LinkedIn/dashboards — sustituido por `FASE 1/01-Analisis-y-Diseno/05…y 06…` (25 RF / 21 RNF). |
| `06 Arquitectura (AWS).md` | Arquitectura serverless descartada; vigente: FastAPI + PostgreSQL/pgvector en server universitado (`FASE 1/02-Arquitectura-de-Solucion`). |
| `09 Planificación y Roadmap.md` | Sustituido por el Gantt + plan de reuniones del plan v1.2. |
| `10 Pendientes y Supuestos.md` | Resueltos/dispuestos en actas 4-5 y plan v1.2 (§10-11). |
| `12, 13, 14 (Kick-off)` | Fase inicial histórica; reemplazados por el FASE 1 (el RF del kick-off ya se renumeró en la FASE 1). |
| `15 Arquitectura de Solución.md`, `16 Secuencia`, `17 Casos de Uso`, `18/19 BPMN antiguos`, `Diagramas de Procesos.md` | A&D v1.0/v1.1: incluye cu007/usuarios/Bolsa y la ingesta asíncrona; vigentes = `FASE 1/01-Analisis-y-Diseno/*` + `diagramas-BPMN/proceso_tobe_fase1.bpmn`. |
| `20 Prompt Mockup MVP.md` | Sustituido por el mock fidelizado (igualab.vercel.app) + `FASE 1/04-Frontend-React`. |
| `22 Análisis y Diseño (Borrador)` | El A&D PDF vigente está en `01-Mockups-y-Propuestas/Análisis y Diseño - Igualab .pdf` + la carpeta FASE 1. |
| `26 Arquitectura de Solución FASE 1 — Stacks ... RAG.md` | Iteración intermedia que aún proponía MCP; la versión aprobada es `FASE 1/02-Arquitectura-de-Solucion/01…` y `04-Comparación-RAG-simple-vs-MCP.md`. |
| `Propuesta_Tecnica_Chatbot_Corporativo` | Anteproyecto; el asistente RAG definitivo está en FASE 1. |
| `01-Mockups-y-Propuestas/presentacion_avance.html` | Slides de avance que refieren A&D v1.1/puntual (desfasé); vigente: arquitectura_solution.png + mock vercel. |
| `01-Mockups-y-Propuestas/Acta_Reunion4_BORRADOR.tex` | Borrador; acta 4 vigente = `Acta_Reunion4-(pequeno-cambio).pdf`. |

> Para consultar historia: `24 Control de Cambios post-Plan — Trazabilidad` documentó los cambios «Usuario / Bolsa / Renombrado» con sus actas; todo lo que ese documento marca como eliminado vive en esta carpeta.
