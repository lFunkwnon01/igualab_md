# FASE 1 — Índice de documentación

> FASE 1 = **primera versión (v1) del software** del plan de proyecto v1.2 (aprobado 11/09/2026). Alcance: sin dashboard (fase 2), sin Bolsa de Valores, sin LinkedIn (acta 5). Fuente del A&D: `01-Mockups-y-Propuestas/analisis_y_diseno_oficial.pdf`. Mock de referencia: <https://igualab.vercel.app/>

## Estructura

| Carpeta | Contenido |
|---|---|
| `01-Analisis-y-Diseno/` | antecedentes y objetivos · análisis GRI · **diagramas de procesos TO-BE (BPMN + mermaid)** · **reglas de negocio (45)** · **requerimientos funcionales (30)** · **no funcionales (30)** — numeración = **A&D vigente (LaTeX)** · **casos de uso (CU001–CU008 + mermaid)** · especificaciones · bitácora de conciliación con el A&D (docs 09–10) |
| `02-Arquitectura-de-Solucion/` | **arquitectura de solución POR CAPAS (7 capas, ver `arquitecturasolution.jpeg`)** · arquitectura por módulos (**RAG simple, sin MCP**) + compara RAG vs MCP · modelos gratis sin function calling · **diagrama y diseño de la base de datos (2 bases PostgreSQL 16: transaccional + vectorial con pgvector; 13 tablas)** · diccionario de datos (13 tablas) · **`06-Diseño-Arquitectonico.md`** (informe de diseño arquitectónico por capas) · **`07-Modelo-de-Datos-Informe.md`** (informe completo del modelo de datos: conceptual → lógico → físico) |
| `03-Stack-Tecnologico/` | stack decidido + LLM gratuito (GLM-5.2 `:free` / OpenRouter + embeddings por API) y variables de entorno |
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
