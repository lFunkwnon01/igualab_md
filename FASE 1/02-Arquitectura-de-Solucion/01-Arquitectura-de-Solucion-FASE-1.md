# 01 · Arquitectura de Solución — FASE 1 (a medida)

> **Numeración alineada al A&D v6 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Fuente de verdad: **Plan de Proyecto v1.2** (aprobado 11/09) · acta 5 · **RAG simple, sin MCP ni function calling** · modelos `:free` sin costo.

**Diagrama de la solución (elaborado por el equipo — versión vigente):**


![[Arquitectura_solution.png]]

*Resumen de bloques del diagrama (fase 1): React 18 + Vite (2 roles, Vercel + HTTPS) → FastAPI (RBAC, pydantic, manejo de errores) → servicios monolito modular (usuarios, ingesta, rag\_chat sin function calling, gri\_analisis, reportes\_pdf, auditoría, configuración) · Pipeline de ingesta SÍNCRONO (Guard .md ≤ 50 MB + pipes + sha256 → parseo → chunking → embeddings por API Qwen3/bge-m3 → upsert pgvector HNSW) · PostgreSQL 16 + pgvector (14 tablas incl. gri\_analisis\_historico y configuración) · LLM `:free` (GLM-5.2, respaldo openrouter/free) · Docker Compose · firewall de seguridad y observabilidad de fase 1.*

---

**A continuación, el contenido detallado de la arquitectura (sin cambios):**



## 1. Vista general por capas (FASE 1)

```
┌──────────────────────────────────────────────────────────────────┐
│ UI (React 18 + Vite) — 2 layouts: Superadmin / Administrador     │
│ login · dashboard · usuarios · ingesta · configuración ·         │
│ auditoría (Superadmin) │ ia-chat · reportes · descargas (Admin)  │
└─────────────────────┬────────────────────────────────────────────┘
                      │ API REST (fetch/axios, JWT)
┌─────────────────────▼────────────────────────────────────────────┐
│ API · FastAPI                                                    │
│ middleware RBAC (RNF-004) · validadores pydantic · manejo de     │
│ errores de servicios externos (RN-023/RN-024)                    │
├──────────────────────────────────────────────────────────────────┤
│ Servicios (monolito modular)                                     │
│ usuarios · ingesta · rag_chat · gri_analisis · reportes_pdf ·    │
│ auditoria · configuracion                                        │
├──────────────────────────────────────────────────────────────────┤
│ Pipeline de ingesta (SÍNCRONO, RF-022)                           │
│ guard → markdown-it-py → chunking → embeddings → pgvector        │
├──────────────────────────────────────────────────────────────────┤
└─────────────────────┬──────────────────────────────┬─────────────┘
                      │                              │
┌─────────────────────▼─────────────┐   ┌────────────▼─────────────┐
│ PostgreSQL 16 + pgvector          │   │ LLM (free, OpenRouter)   │
│ usuarios ·empresas·documentos·    │   │ GLM-5.2 :free (256K)     │
│ chunks_embeddings(vector 1024)·   │   │ respaldo: openrouter/free│
│ catalogo_gri · brechas_gris ·     │   │ (Nemotron/Gemma/MiniMax) │
│ sanciones · reportes_generados ·  │   └──────────────────────────┘
│ auditoria_eventos · uso_llm       │   ┌──────────────────────────┐
│                                   │   │ Embeddings por API ( │
└───────────────────────────────────┘   │ universidad): Qwen3-     │
                                        │ Embedding-0.6B / bge-m3  │
                                        └──────────────────────────┘
```

## 2. Módulos priorizados de FASE 1 (Gantt plan v1.2 + acta 5 REQ-19)

| # | Módulo | Prioridad | CU | Resumen técnico |
|---|---|---|---|---|
| 1 | **Ingesta de documentos** | ★★★ (núcleo) | CU004 | Guard (.md + pipes + 50 MB + sha256) → chunking (~800 chars por sección/fila de tabla) → embeddings por API → upsert pgvector. **Síncrono** (1 superadmin, sin colas). |
| 2 | **Asistente IA (RAG simple)** | ★★★ | CU005 | Retrieval búsqueda pgvector cosine k=4 + prompt con citas para datos estructurados. |
| 3 | **Análisis GRI / sanciones y supervisión de estados** | ★★★ (núcleo) | CU006 | Comparación contra `catalogo_gri` (reglas deterministas) → **asignación manual del estado por el Administrador** con historial. Toda brecha persiste (RN-019). |
| 4 | **Generación de reportes PDF** | ★★★ (núcleo) | CU007 | Plantilla Jinja2 + WeasyPrint; variables dinámicas de BD; sin LLM: SELECT determinista a `gri_analisis` (poblado al terminar la ingesta) + plantilla. |
| 5 | **RBAC + Usuarios + Configuración** | ★★ | CU001–3 | JWT + políticas de contraseña/bloqueo; transferencia de Superadmin atómica (RN-009, RNF-011). |
| 6 | **Auditoría** | ★★ | CU009 | append-only; consulta filtrable (solo lectura). |
| — | Dashboards (KPIs ASG 0–100, etc.) | fase 2 | — | Tablas de agregación listas para GET (ver BD). |

## 3. Detalle del pipeline RAG (a medida, RAG simple que sirve)

**Entrada (todo es `.md`, acta 5 REQ-20):**

1. **Guard** (FastAPI endpoint, RN-011/RN-014): extensión `.md`; tamaño ≤ 50 MB; ≥ 1 sección GRI/sanciones (RN-011); antidad sha256 duplicado (RNF-010). Rechazo con motivo textual para el cliente.
2. **Parseo** (markdown-it-py): se preserva la **jerarquía de encabezados**; las **tablas con pipes** se convierten en filas normalizadas, cada fila hereda el contexto (empresa, año, código GRI del encabezado de la tabla).
3. **Chunking**: por sección/token window (~800 chars, solape 100); chunks de **tabla por fila** (uno por empresa-indicador-valor) con metadata `{doc_id, empresa_id, año, gri_code?, tabla_origen, seccion}` — el metadata es lo que hace posible las citas y las tablas del reporte.
4. **Embeddings**: llamada al **servicio de embeddings por API del proveedor** (dimensión según modelo: p. ej. 1024) → columna `vector(N)` con índice HNSW en pgvector.
5. **Persistencia**: upsert idempotente (chunk_id = sha256 del chunk) — permite re-ingesta sin duplicar.

**Consulta (chat):**

6. pregunta del Administrador + contexto de sesión (empresa activa si la hay) → embedding **por API** de la pregunta → búsqueda pgvector cosine **k=4** (+ filtro por empresa cuando aplica).
7. **RAG simple, sin agentes**: el LLM (GLM-5.2 :free) recibe el contexto de los chunks y redacta la respuesta — no hay tools ni function calling en fase 1 (decisión: evitar desarrollo extra).
8. **Respuesta con citas**: modelo obligado a incluir `[doc_id:seccion]`; post-verificación de los IDs citados (si cita algo fuera del contexto recuperado, se elimina esa cita).
9. **Rate limit**: contadores en `uso_llm` (RNF-028, 200/día); si se agota, la respuesta se mide en estado de cola y avisa («sin cuota hoy»).

## 4. Generación de reportes (cero LLM — la cadena determinista)

El análisis GRI/sanciones **se ejecuta automáticamente al terminar cada ingesta** y se persiste en la tabla del análisis (`gri_analisis` + `gri_analisis_historico`); con ello, la generación de un reporte es **un SELECT + plantilla**:

```
[Proceso de ingesta (.md) al terminar] 
   → detección de códigos GRI presentes (catálogo de 40) + extracción de la cita textual → INSERT en gri_analisis (sin estado: queda pendiente de asignación manual)
[CU006: el Administrador asigna manualmente el estado (OK/Baja/Sub) revisando la cita → historial]
[CU007 generar reporte]
   → SELECT sobre gri_analisis (estado final validado) + sanciones
   → variables dinámicas (conteos por estado, montos, sector, año) para la plantilla
   → Jinja2 → WeasyPrint → PDF + reporte_detalle_snapshot (misma transacción)
   → reportes_generados → auditoria_eventos
```

- **El reporte no invoca al LLM** (ni en el resumen ejecutivo): todo dato del PDF proviene de la BD — el resumen sale de plantilla con conteos (brechas por estado, total de sanciones, cita principal).
- Beneficios: determinismo total (PO puede auditar cada valor), sin consumo de free tier en generación, pruebas fáciles (cronograma plan v1.2), reportes idénticos si se regenera con los mismos datos (salvo cálculo de fecha).



## 5. Decisiones y notas de operación

| Tema                                  | Decisión                                                                                                                                                                                 |
| ------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Colas de mensajería                   | **No en fase 1** (RF-022): BackgroundTasks/llamada síncrona por una sola sesión de Superadmin; si escala, se introduce Celery en fase 2.                                                 |
| API de LLM | OpenRouter (`:free`, OpenAI-compatible). Se abstrae en `LlmClient`; en fase 1 solo chat-completions RAG, sin tools. |
| Failover                              | router alternativo `openrouter/free` o modelo `:free` de respaldo; configuración por env var.                                                                                            |
| Embeddings por API | server universitario (VRAM o CPU con sentence-transformers); nunca llamadas de embeddings por API free.                                                                                  |
| Almacenamiento de archivos            | los `.md` se guardan en disco del backend (o table blob) además de chunks, para auditoría y descartes (RN-030).                                                                          |
| Contenedores                          | backend en Docker (compose con postgres+pgvector) para reproducibilidad; frontend estático en Vercel (mock vivo).                                                                        |

## 6. Trazabilidad hacia documentos del plan

- Plan v1.2 §5 (Gantt): demo de ingesta/motor RAG 5/10, análisis GRI/sanciones 19/10, chatbot+reportes 23/10, integración 30/10, auditoría 2/11, calidad 9/11, despliegue 13/11, UAT 16/11, cierre 20/11.
- Acta 5: REQ-15 (plan v1.2 línea base), REQ-16 (Bolsa fuera), REQ-17 (LinkedIn fuera), REQ-18 (stack libre), REQ-19 (dashboards fase 2), REQ-20 (.md con pipes).
- Mock: fiel a la <https://igualab.vercel.app/> (mismo menú por rol, sin vistas de Bolsa/LinkedIn).
