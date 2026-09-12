# 26 · Arquitectura de Solución — FASE 1 (v2)

> **NOTA (actualización)**: la versión final de FASE 1 descarta el MCP — solo RAG simple. La decisión y comparación están en `FASE 1/02-Arquitectura-de-Solucion/04-Comparacion-RAG-simple-vs-MCP.md`.
> Estado: borrador de trabajo · Alineada al **Plan de Proyecto v1.2** (línea base aprobada 11/09/2026) y al **Acta 5** (CS3081-005-2026, PO aprobó todas las decisiones).
> Refina la versión anterior: `01-Mockups-y-Propuestas/v1_backend_arquitectura.jpeg` (el diagrama base se mantiene; aquí se cierran sus puntos "por confirmar").
> Fuentes de verdad: `01-Mockups-y-Propuestas/Igualab - Plan de proyecto.docx (1).pdf` · mock vivo: <https://igualab.vercel.app/>

---

## 0. Decisiones que fijan esta arquitectura (trazabilidad)

| Decisión | Fuente |
|---|---|
| Modelo de **2 roles** (Superadmin / Administrador), 3 personas | Acta 4 · REQ-10 |
| **Sin** módulo Bolsa de Valores, **sin** LinkedIn | Acta 5 · REQ-16, REQ-17 |
| Dashboards de visualización → **fase 2**; fase 1 = núcleo de valor | Acta 5 · REQ-19 |
| Delegación tecnológica al equipo (stack libre, avalado por el PO Oscar) | Acta 5 · REQ-18 · Plan v1.2 §10 |
| Ingesta: cliente sube **solo `.md`** (tablas con pipes); PDF se descarta como formato de entrada | Acta 5 · REQ-20 |
| LLM sin costo para la ONG; despliegue en el **servidor de la universidad** | Acta 2/4 · RNF-010 · Plan v1.2 §10 |

## 1. Stack tecnológico decidido (elección libre avalada por el PO, acta 5 REQ-18)

| Capa | Tecnología | Estado respecto a v1 |
|---|---|---|
| Frontend | **React 18 + Vite** (SPA; sin Next.js — no hay SSR ni SEO que lo justifiquen) | v1 decía "por definir" → **decidido: React** |
| Ruteo UI | React Router — 2 layouts según rol (el mock `js/app.js` ya modela los menús) | nuevo |
| Backend | **FastAPI (Python 3.12)**, monolito modular, con SQLModel/SQLAlchemy | igual a v1 |
| Tareas de fondo | **FastAPI BackgroundTasks** (fase 1); celery solo si la ingesta escala | igual a v1 |
| Parsing de documentos | **markdown-it-py** (entrada primaria `.md`); **PyMuPDF** solo como respaldo (el PDF ya no es formato de entrada: REQ-20) | cambia: entrada primaria es .md |
| Base de datos | **PostgreSQL 16 + pgvector** | igual a v1 |
| RAG (fase 1, simple) | **pgvector** (cosine, k=4) + reranker opcional | se confirma el enfoque "RAG simple" |
| Reportes PDF | **Jinja2 → HTML → WeasyPrint** (plantilla + variables dinámicas) | refina v1 |
| Auth | Tokens de sesión + **middleware RBAC** (RNF-001/002) | igual a v1 |

### 1.1 Frontend — mapeo de pantallas del mock (<https://igualab.vercel.app/>)

| Vista del mock | Rol | Módulo backend que la alimenta |
|---|---|---|
| Login (demoAccounts) | ambos | `usuarios` |
| Dashboard | ambos | métricas de `empresas`, `documentos`, `reportes` |
| Usuarios y roles | Superadmin | servicio `usuarios` |
| Ingesta de documentos | Superadmin | servicio `ingesta` (subida .md, estado del pipeline) |
| Configuración | Superadmin | `usuarios` (bloqueo por inactividad, notificaciones) |
| Auditoría de accesos | Superadmin | servicio `auditoría` (solo lectura) |
| Asistente de IA (chat RAG) | Administrador | servicio `rag/chat` |
| Reportes de prospección | Administrador | servicio `reportes` (generación) |
| Descargar reportes | Administrador | servicio `reportes` (entregados) |

No existen vistas de Bolsa de Valores ni de LinkedIn (coherente con REQ-16/17; retiradas del mock).

## 2. FASE 1 por módulos (prioridad según plan v1.2 §5 Gantt y acta 5 REQ-19)

**Principio rector (REQ-19)**: concentrar fase 1 en el **núcleo de valor**: ingesta → asistente RAG con citado → brechas GRI → reportes PDF → auditoría.

### M1 — Ingesta de documentos (más importante) → `Servicio Ingesta`
- **Entrada**: archivos `.md` subidos por el cliente (REQ-20). Parser: markdown-it-py.
- **Regla clave (lección del acta 5)**: las tablas `.md` deben venir **con pipes** `|`; el texto de corrido puede causar errores de ingesta. El servicio valida el formato **antes** de consumir recursos.
- **Pipeline (BackgroundTasks)**:
  1. **Guard de formato**: ¿tablas con pipes OK? Si no → registrar en `auditoria_eventos` como "rechazado: formato" y notificar al PO.
  2. **Conversión/limpieza**: markdown → estructura (secciones por encabezado; tablas → filas normalizadas).
  3. **Chunking**: por encabezado (~800–1000 chars, solape ~100); cada **fila de tabla** es un chunk heredando su encabezado/contexto (crítico para datos GRI).
  4. **Embeddings** (§4) y upsert en `chunks_embeddings` (pgvector).
  5. Registro en `documentos` (título, hash, fecha, estado del pipeline) y evento de auditoría.

### M2 — Asistente IA (RAG + MCP) → `Servicio RAG / Chat`
- **Recuperación**: pgvector cosine k=4, filtro por `empresa_id`.
- **MCP (Model Context Protocol)**: el backend expone un **MCP server propio** con herramientas: `buscar_chunks(consulta, empresa, top_k)`, `obtener_empresa(ticker)`, `listar_brechas_gri(empresa)`, `resumen_brechas(empresa)`. El LLM (agente) conecta a este MCP server para tocar el backend — por eso el modelo elegido debe soportar **function calling** (§4).
- **Citación obligatoria** (RF del plan): toda respuesta cita `doc_id` + sección del documento origen.

### M3 — Generación de reportes de prospección (más importante para negocio) → `Servicio Reportes PDF`
- **Enfoque**: reporte por **plantilla** (Jinja2 → WeasyPrint → PDF).
- **Variables dinámicas**: no se "inventan" con el LLM; se **solicitan de la base de datos** (tablas/consultas). El reporte llama al backend y el backend orquesta:
  1. **Reglas determinísticas**: las brechas (OK / sub-reportado / baja sustancia) y sanciones se calculan con reglas de negocio (RN GRI/sanciones) y quedan persistidas → consulta SQL directa para la plantilla.
  2. **LLM de apoyo (delgado/opcional)**: solo el **resumen ejecutivo**, vía tool MCP `resumen_brechas(empresa)` con citado.
  3. Plantilla llena: datos de empresa, tabla de brechas GRI, sanciones, nivel de sustancia por código/sector, y fuentes citadas.
- Salida → tabla `reportes_generados` (pdf_path, empresa, hash, fecha) + evento de auditoría.

### M4 — Usuarios y RBAC
Dos perfiles exactos como el mock: **Superadmin** (usuarios, ingesta, configuración, auditoría) y **Administrador** (dashboard, asistente IA, reportes, descargas). El middleware valida sesión activa + rol en cada endpoint (RNF-001/002).

### M5 — Auditoría
Registro automático e inmutable (append-only) de: inicios de sesión, cambios de rol, ingesta de documentos, generación de reportes; consulta filtrable por usuario/fecha/tipo, acceso por Superadmin (coincide con `v1_backend_arquitectura.jpeg`).

### Fuera de fase 1 (acta 5 · REQ-19)
- Dashboards de visualización (KPIs ASG/ESG, índice 0–100) → **fase 2**.
- Bolsa de Valores (CU007, RF-018/019, RN-008) y LinkedIn: **eliminados** (REQ-16/17).

## 3. Modelo de datos (PostgreSQL + pgvector) — como v1, ajustado

| Tabla | Contenido | Módulo |
|---|---|---|
| `usuarios` | nombre, correo, rol (superadmin/admin), estado | M4 |
| `empresas` | nombre, ticker, sector (ingresa con cada `.md`) | M1 |
| `documentos` | empresa (FK), hash del archivo, fecha, estado del pipeline | M1 |
| `chunks_embeddings` | doc_id, chunk_index, texto, `embedding vector(1024)`, sección, metadata | M1/M2 |
| `reportes_generados` | empresa, tipo, pdf_path, hash, fecha | M3 |
| `auditoria_eventos` | usuario, acción, fecha, detalles (append-only) | M5 |

## 4. Pipeline RAG y modelo gratuito — decisión tecnológica

Requisitos del modelo: (a) **function calling / tools** nativo (para que el agente use las tools MCP del backend); (b) herramienta de **embeddings** para la ingesta; (c) **costo cero**; (d) reemplazable sin reescribir código.

**Decisión (fase 1): arquitectura híbrida "zero-cost"**

| Rol | Modelo | ¿Por qué | Costo |
|---|---|---|---|
| LLM chat/agente (tools MCP) | **GLM-5.2 `:free` (Z.ai)** vía **OpenRouter** — respaldo: router `openrouter/free` (elige modelo `:free` que soporte tools) o `nvidia/nemotron-…:free` (1M ctx) | endpoint **OpenAI-compatible** con **function calling** y streaming; modelos chinos gratis; contextos 256K–1M | **$0** — free tier **200 req/día** (1000/día con $10 de crédito lifetime) |
| Embeddings | **Qwen3-Embedding-0.6B** (Apache 2.0) o **bge-m3**, corriendo **local en el servidor de la universidad** (sentence-transformers) | cumple el plan v1.2 (RAG en servidor universitario) y no gasta el RPD del free tier | **$0** |
| Reranker (opcional) | Qwen3-Reranker-0.6B local | con k=4 basta en fase 1; se re-evalúa en pruebas | $0 |
| Conversión PDF→md | la hace el propio cliente (REQ-20) | fuera del alcance del sistema | $0 |

Notas de riesgo y operación:
- El free tier de OpenRouter es por cuenta; para demo/UAT es suficiente (200–1000 llamadas/día). Los **embeddings NO van por esa API** (van local): así el cupo diario queda íntegro para el chat.
- Si el modelo `:free` cambia o se discontinúa: abstraer en `LlmClient` (API OpenAI-compatible); se cambia solo el `model_id` en config (Nemotron 3, Gemma 4, MiniMax M3 … todos `:free` con tools).
- **MCP**: lo cierto es que el **backend expone** el MCP server con las tools; el modelo solo necesita soportar function-calling estándar. No se requiere que el proveedor sea "MCP-native".
- Escalado futuro (si el proyecto pasa a producción): DeepSeek V3.2 (~US$0.27/M tokens) o GLM Turbo — pero la arquitectura no cambia.

## 5. Flujo extremo a extremo (FASE 1)

```
[Cliente (Oscar)] --.md (tablas con pipes)--> [UI Ingesta (Superadmin)]
        │  POST /api/ingesta  (BackgroundTasks)
        ▼
[Pipeline: guard formato → chunking → embeddings (local) → upsert pgvector] ──► [auditoria_eventos]
        │
        ▼
[Administrador consulta en el chat (React)]
        │  POST /api/rag/chat
        ▼
[Backend = cliente MCP frente al LLM]
        │  → GLM-5.2 :free (OpenRouter) decide llamar tool:
        │      buscar_chunks(consulta, empresa, k=4)
        │  ← chunks recuperados (pgvector) + citados (doc_id, sección)
        ▼
[Backend ensambla la respuesta con citas] → [UI: chat con fuentes]

[Reporte]: Administrador pide PDF → backend consulta la BD (reglas + variable LLM opcional vía MCP) → Jinja2 → WeasyPrint → reportes_generados → descarga
```

## 6. Riesgos técnicos y mitigaciones (fase 1)

| Riesgo | Mitigación |
|---|---|
| Free tier agotado (&gt;200/día) | router `openrouter/free` de respaldo + embeddings locales (no consumen API) + caché de contexto |
| Cliente sube `.md` mal formateado (texto de corrido) | guard de validación con mensaje claro en la UI + re-solicitud |
| Modelo `:free` cambia o se retira | `LlmClient` abstraído; cambiar `model_id` en configuración |
| Citas incorrectas del LLM | solamente se permite citar ids reales de la respuesta del backend; validaciones al armar la respuesta |
| Parseo imperfecto de tablas GRI | pruebas con memorias reales (cronograma de pruebas, plan v1.2 §7) |
| Límite del free tier en demos con muchas consultas | límite de consultas por sesión (RNF) y contexto reutilizado |

## 7. Pendientes abiertos
1. Ejecutar `query` del benchmark de embeddings (bge-m3 vs Qwen3-Embedding-0.6B) sobre 2–3 memorias reales, antes del sprint de ingesta.
2. Confirmar límites del servidor universitario (CPU para embeddings y reranker; RNF-010 del plan).
3. Registrar esta arquitectura como presentación pendiente al cliente (la presentación de arquitectura sigue reprogramada según acta 4/5).
