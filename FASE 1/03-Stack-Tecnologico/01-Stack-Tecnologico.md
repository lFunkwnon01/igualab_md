# 01 · Stack tecnológico — FASE 1

> **Numeración alineada al A&D v5 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Decisión avalada por el PO en el acta 5 (REQ-18: «stack a elección libre del equipo»). Complemento del diagrama `Arquitectura_solution.png` y del A&D.

## 1. Stack consolidado

| Capa | Tecnología | Versión sugerida | Por qué |
|---|---|---|---|
| Frontend | **React 18 + Vite** (SPA, React Router) | ^18 | mock ya está modelado; sin SSR necesario |
| UI kit | CSS by: CSS Modules + material symbols (como mock) | — | continuidad del mock fidelizado |
| Backend | **FastAPI (Python 3.12)** + SQLModel + pydantic v2 | 0.11x | tipos, async, OpenAPI automático |
| Motor de subprocess: se ejecuta | FastAPI BackgroundTasks (patrón sync-guarda) | — | RN-012 no colas |
| BD | **PostgreSQL 16 + pgvector** (HNSW cosine) | pgvector ≥ 0.6 | RAG simple sin infraextra |
| Pipeline | **markdown-it-py** · PyMuPDF de respaldo (PDF del cliente ya convertido) | — | RN-009/010 |
| Embeddings | **Servicio de embeddings por API del proveedor de IA** (NVIDIA NIM `nv-embed` o Google `gemini-embedding`, free tier) — **sin modelo local** | — | $0 con free tier; **consume cuota** (ver RN-010) |
| LLM chat/agente | **GLM-5.2 `:free`** (Z.ai) vía **OpenRouter** (OpenAI-compatible, function calling) — router `openrouter/free` como failover | — | $0, 200–1000 req/día |
| Reportes | **Jinja2 + WeasyPrint** | — | variables dinámicas de BD |
| Despliegue | Docker compose (backend + postgres + pgvector) en server universidad; mock en Vercel | — | plan §10 |
| Testing | pytest (backend), vitest (frontend), Postman/Newman del cronograma de pruebas del plan §7 | — | UAT 16/11 |

## 2. LLM gratuito — detalles de la elección

| Criterio | GLM-5.2 :free | Alternativos `:free` |
|---|---|---|
| Contexto | 256K–1M | 262K–1M |
| Se usa en fase 1 | **Solo como chat-completions RAG** (sin tools) | — |
| Output de español | bueno | bueno |
| Costo | $0 (200 req/día; 1000/día con $10 lifetime) | $0 |

- Respaldo inmediato: `nvidia/nemotron-…:free` (1M ctx), `google/gemma-4-31b:free`, `minimax-m3:free` — el `LlmClient` cambia solo `model_id`.
- **Embeddings y generación por API del mismo proveedor** (NVIDIA NIM o Google AI Studio); el chunking/parsing es código propio sin IA.
- **Fase 1 = RAG simple sin function calling**: no invocamos tools (decisión de alcance — el MCP como desarrollo adicional queda re-evaluado para fase 2; la comparación está en `04-Comparación-RAG-simple-vs-MCP.md`).

## 3. Matriz RN/RF → componente de stack

| RN clave | Componente |
|---|---|
| RN-009/010 (solo .md, pipes) | guard FastAPI + markdown-it-py (validación pre-chunking) |
| RN-010 (15 MB) | middleware de tamaño + config |
| RN-012 (síncrona) | endpoint síncrono + spinner de pipeline en React |
| RN-017/019 (catalogo_gri + humano) | tabla catalogo_gri + servicios gri_analisis + UI CU006 |
| RN-022 (citas) | prompt system + post-check de ids citados |
| RN-026 (variables de BD) | queries SQL directas en servicio reportes + Jinja2 |
| RN-024 (free tier) | tabla uso_llm y rate limit en FastAPI middleware |

## 4. Variables de entorno (resumen)

```
DATABASE_URL=postgresql+psycopg://igualab:***@host:5432/igualab
EMBEDDING_BASE_URL=https://integrate.api.nvidia.com/v1   # o generativelanguage.googleapis.com
EMBEDDING_API_KEY=***                 # credenciales del proveedor de IA
EMBEDDING_MODEL=nvidia/nv-embedqa-e5-v5                   # según proveedor
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_API_KEY=***                      # free key
LLM_MODEL=z-ai/glm-5.2:free
LLM_FALLBACK_MODEL=openrouter/free
LLM_DAILY_LIMIT=200
JWT_SECRET=***
SESSION_IDLE_MINUTES=30
UPLOAD_MAX_MB=15
```

## 5. ¿Cómo se solicita la API del LLM gratuito? (GLM-5.2)

El código **no depende del proveedor** (todo es OpenAI-compatible vía `LlmClient`); solo cambian `LLM_BASE_URL` + `LLM_MODEL` + `LLM_API_KEY`. Opciones verificadas:

### Opción A — OpenRouter (la del diseño)
1. Registrarse en **https://openrouter.ai** (sin tarjeta de crédito).
2. Ir a **https://openrouter.ai/keys → Create Key** y copiar la clave `sk-or-v1-…`.
3. Configurar en el backend:
   ```
   LLM_BASE_URL=https://openrouter.ai/api/v1
   LLM_API_KEY=sk-or-v1-…
   LLM_MODEL=z-ai/glm-5.2:free
   LLM_FALLBACK_MODEL=openrouter/free
   ```
4. Free tier: **200 req/día** (1 000/día con un top-up único de US$10). Las variantes `:free` rotan; si `z-ai/glm-5.2:free` no está disponible, el failover `openrouter/free` elige otro modelo gratis con function calling.

### Opción B — NVIDIA NIM (recomendada: embeddings + generación con un proveedor)
- NVIDIA hospeda `z-ai/glm-5.2` **y modelos de embeddings** gratis (hasta 40 RPM): API key en **https://build.nvidia.com**; endpoint OpenAI-compatible `https://integrate.api.nvidia.com/v1`. Cumple el requisito del proveedor que da **ambos servicios**.

### Opción D — Google AI Studio (alternativa para embeddings)
- Embeddings `gemini-embedding-*` con free tier y generación con Gemini Flash: **https://aistudio.google.com/apikey**.

### Opción C — Z.ai oficial (Zhipu)
- Consola en **https://z.ai / https://open.bigmodel.cn**: API key propia; el plan gratuito da los modelos **Flash** (GLM-4.7-Flash / 4.5-Flash, 1 request concurrente).

> El modelo `GLM-5.2` completo es pago en algunos proveedores (≈ US$1.40/US$4.40 por 1M tokens in/out); **gratis** se consigue vía OpenRouter `:free` o NVIDIA NIM. Los **embeddings van por API del proveedor** (decisión del chat «Requisitos de embeddings»), por lo que **también consumen cuota**: el contador de uso debe incluir los tokens de embeddings (tabla `uso_llm` o `uso_embeddings`) — RN-010/RNF-11.
