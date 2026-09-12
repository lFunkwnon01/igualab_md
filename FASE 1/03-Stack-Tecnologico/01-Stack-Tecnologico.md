# 01 · Stack tecnológico — FASE 1

> Decisión avalada por el PO en el acta 5 (REQ-18: «stack a elección libre del equipo»). Complemento del diagrama `v1_backend_arquitectura.jpeg` y del A&D.

## 1. Stack consolidado

| Capa | Tecnología | Versión sugerida | Por qué |
|---|---|---|---|
| Frontend | **React 18 + Vite** (SPA, React Router) | ^18 | mock ya está modelado; sin SSR necesario |
| UI kit | CSS by: CSS Modules + material symbols (como mock) | — | continuidad del mock fidelizado |
| Backend | **FastAPI (Python 3.12)** + SQLModel + pydantic v2 | 0.11x | tipos, async, OpenAPI automático |
| Motor de subprocess: se ejecuta | FastAPI BackgroundTasks (patrón sync-guarda) | — | RN-013 no colas |
| BD | **PostgreSQL 16 + pgvector** (HNSW cosine) | pgvector ≥ 0.6 | RAG simple sin infraextra |
| Pipeline | **markdown-it-py** · PyMuPDF de respaldo (PDF del cliente ya convertido) | — | RN-009/010 |
| Embeddings | **Qwen3-Embedding-0.6B** (Apache 2.0) o **bge-m3** en el **servidor de la universidad** (sentence-transformers) | — | $0 y no consume el free tier |
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
- **Embeddings y reranker 100 % locales** (server universidad): el cupo diario del free tier queda para el chat (RN-025).
- **Fase 1 = RAG simple sin function calling**: no invocamos tools (decisión de alcance — el MCP como desarrollo adicional queda re-evaluado para fase 2; la comparación está en `04-Comparación-RAG-simple-vs-MCP.md`).

## 3. Matriz RN/RF → componente de stack

| RN clave | Componente |
|---|---|
| RN-009/010 (solo .md, pipes) | guard FastAPI + markdown-it-py (validación pre-chunking) |
| RN-011 (15 MB) | middleware de tamaño + config |
| RN-013 (síncrona) | endpoint síncrono + spinner de pipeline en React |
| RN-018/019 (catalogo_gri + humano) | tabla catalogo_gri + servicios gri_analisis + UI CU006 |
| RN-023 (citas) | prompt system + post-check de ids citados |
| RN-027 (variables de BD) | queries SQL directas en servicio reportes + Jinja2 |
| RN-025 (free tier) | tabla uso_llm y rate limit en FastAPI middleware |

## 4. Variables de entorno (resumen)

```
DATABASE_URL=postgresql+psycopg://igualab:***@host:5432/igualab
EMBEDDING_MODEL=BAAI/bge-m3         # o Qwen/Qwen3-Embedding-0.6B
EMBEDDING_DEVICE=cpu                 # según capacidad del server universidad
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_API_KEY=***                      # free key
LLM_MODEL=z-ai/glm-5.2:free
LLM_FALLBACK_MODEL=openrouter/free
LLM_DAILY_LIMIT=200
JWT_SECRET=***
SESSION_IDLE_MINUTES=30
UPLOAD_MAX_MB=15
```
