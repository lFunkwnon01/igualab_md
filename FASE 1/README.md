# FASE 1 — Índice de documentación

> FASE 1 = **primera versión (v1) del software** del plan de proyecto v1.2 (aprobado 11/09/2026). Alcance: sin dashboard (fase 2), sin Bolsa de Valores, sin LinkedIn (acta 5). Fuente del A&D: `01-Mockups-y-Propuestas/analisis_y_diseno_oficial.pdf`. Mock de referencia: <https://igualab.vercel.app/>

> ⚠️ **NOTA AS-BUILT (2026-10-14):** el **código es la fuente de verdad** del sistema implementado (`06-Desarrollo/BCK-IGUALAB@78e614a` + `FE-IGUALAB@705cc78`). Los documentos de diseño de esta carpeta citan el modelo de 13 tablas, LLM GLM-5.2/OpenRouter y HNSW; la realidad as-built es **14 tablas**, **LLM no implementado** (embedding OCI Cohere), storage MinIO y **sin HNSW**. Ver el diccionario as-built (`02-Arquitectura-de-Solucion/03-Diccionario-de-Datos.md`) y la [auditoría completa](../MEJORAS-A&D/AUDITORIA-COMPLETA-CODIGO-2026-10.md).

## Estructura

| Carpeta | Contenido |
|---|---|
| `01-Analisis-y-Diseno/` | antecedentes y objetivos · análisis GRI · **diagramas de procesos TO-BE (BPMN + mermaid)** · **reglas de negocio (45)** · **requerimientos funcionales (30)** · **no funcionales (30)** — numeración = **A&D vigente (LaTeX)** · **casos de uso (CU001–CU008 + mermaid)** · especificaciones · bitácora de conciliación con el A&D (docs 09–10) |
| `02-Arquitectura-de-Solucion/` | **arquitectura de solución POR CAPAS (7 capas, ver `arquitecturasolution.jpeg`)** · arquitectura por módulos (**RAG simple, sin MCP**) + compara RAG vs MCP · **diseño de la base de datos (2 bases PostgreSQL 16: transaccional + vectorial con pgvector; diseño 13 tablas → as-built 14)** · diccionario de datos (**AS-BUILT: 14 tablas reales**) · **`06-Diseño-Arquitectonico.md`** (informe de diseño arquitectónico por capas) |
| `03-Stack-Tecnologico/` | stack decidido + variables de entorno **reales** (`app/config.py`); ⚠️ LLM GLM/OpenRouter es diseño — el código aún no implementa el asistente (embeddings reales: OCI Cohere embed-v4.0) |
| `04-Frontend-React/` | arquitectura React 18 + Vite, mapeo 1:1 con el mock, comportamientos por RN |
| `05-api-endpoints-mock/` | swagger/OpenAPI mock con peticiones y respuestas simuladas (estados de ingesta, chat con citas, transferencia de rol) |

## Orden sugerido de lectura

1. `01-Analisis-y-Diseno/01-Antecedentes-y-Objetivos.md`
2. `01-Analisis-y-Diseno/02-Antecedentes-del-Analisis-GRI.md`
3. `01-Analisis-y-Diseno/03-Diagramas-de-Procesos-TO-BE.md` (+ BPMN en `diagramas-BPMN/`)
4. `01-Analisis-y-Diseno/04-Reglas-de-Negocio.md` → `05-RF` → `06-RNF`
5. `01-Analisis-y-Diseno/07-Casos-de-Uso-Diagrama.md` → `08-Especificacion-Casos-de-Uso.md`
6. `02-Arquitectura-de-Solucion/02-Base-de-Datos…` → `01-Arquitectura…` → `03-Diccionario…`
7. `03-Stack-Tecnologico`, `04-Frontend-React`, `05-api-endpoints-mock`
