# 01 · Stack tecnológico — FASE 1

> ## ⚠️ NOTA AS-BUILT (2026-10-14 · `BCK-IGUALAB@78e614a` + `FE-IGUALAB@705cc78`)
> El stack **real** del código difiere del diseño en estos puntos (el código manda):
> - **Backend:** FastAPI 0.115 · SQLAlchemy 2.0 async · **PostgreSQL 16** · Python **3.13**. ✓
> - **Embeddings (real):** **OCI Generative AI** con `cohere.embed-v4.0` (**1536 dims**) — `app/modules/ingesta/infrastructure/proveedor_oci.py`. (No NVIDIA/Google.)
> - **LLM de chat (real):** **no implementado**. `config.py` define `DEEPSEEK_API_KEY/BASE_URL/MODEL` pero **no se usan en ningún servicio** (config muerta, pendiente M6). GLM-5.2/OpenRouter es diseño, no código.
> - **Almacenamiento de originales (real):** **MinIO/S3** (boto3) — `app/modules/ingesta/infrastructure/almacenamiento_s3.py`. (No disco local.)
> - **Parseo Markdown (real):** parser propio mínimo `app/modules/ingesta/domain/markdown.py`. (No markdown-it-py.)
> - **Reportes (real):** **no implementados** (Jinja2/WeasyPrint es diseño).
> - **BD (real):** 14 objetos en repo (`documentos` con 37 columnas 🔴); **sin índice HNSW** (coseno exacto).

> **Numeración alineada al A&D V2 (LaTeX)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Decisión avalada por el PO en el acta 5 (REQ-18: «stack a elección libre del equipo»). Complemento del diagrama `arquitecturasolution.jpeg` — **arquitectura de solución por capas (7 capas)** — y del A&D.

## 1. Stack consolidado

| Capa | Tecnología | Versión sugerida | Por qué |
|---|---|---|---|
| Frontend | **React 18 + Vite** (SPA, React Router) | ^18 | mock ya está modelado; sin SSR necesario |
| UI kit | CSS by: CSS Modules + material symbols (como mock) | — | continuidad del mock fidelizado |
| Backend | **FastAPI (Python 3.13)** + **SQLAlchemy Async · AsyncSession** + Pydantic v2 | 0.11x | tipos, async, OpenAPI automático |
| Driver/method BD | **AsyncPG** (motor async de SQLAlchemy hacia PostgreSQL) | — | capa 6–7 del diagrama por capas |
| Motor de ejecución | FastAPI BackgroundTasks (patrón sync-guarda) | — | RF-015 sin colas |
| BD | **2× PostgreSQL 16 + pgvector** — transaccional (`DATABASE_URL`) + vectorial (`VECTOR_DATABASE_URL`) | pgvector ≥ 0.6 | RAG simple sin infraextra |
| Pipeline | Parser Markdown propio (`app/modules/ingesta/domain/markdown.py`) | — | RN-009/010 |
| Embeddings | **OCI Generative AI · `cohere.embed-v4.0`** (1536 dims) vía `proveedor_oci.py` | — | embeddings reales del código |
| LLM chat/agente | **No implementado aún** (`DEEPSEEK_*` en config, sin uso) — pendiente Módulo 6 (RAG) | — | diseño: GLM-5.2 `:free`/OpenRouter |
| Reportes | **No implementado aún** (diseño: Jinja2 + WeasyPrint) | — | pendiente Módulo 7 |
| Despliegue | Docker compose (backend + postgres + pgvector) en server universidad; mock en Vercel | — | plan §10 |
| Testing | pytest (**~1.197 tests**), vitest (frontend, solo lógica) | — | UAT 16/11 |

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
| RNF-020 (50 MB) | middleware de tamaño + config |
| RF-015 (síncrona) | endpoint síncrono + spinner de pipeline en React |
| RN-027/019 (catalogo_gri + humano) | tabla catalogo_gri + servicios gri_analisis + UI CU005 |
| RN-034 (citas) | prompt system + post-check de ids citados |
| RN-041 (variables de BD) | queries SQL directas en servicio reportes + Jinja2 |
| RNF-027 (free tier) | rate limit en middleware FastAPI, derivado de `consultas_asistente` (sin tabla de uso) |

## 4. Variables de entorno (reales — `app/core/config.py`)

> Verificadas contra `BCK-IGUALAB@78e614a`. `JWT_SECRET_KEY` es **obligatoria** (`os.environ[...]`): sin ella la app no arranca.

```
# Aplicación
APP_ENV=development
BACKEND_URL=http://localhost:8000
FRONTEND_URL=http://localhost:5173
CORS_ORIGINS=...                      # CSV; por defecto = FRONTEND_URL
FRONTEND_RESET_URL=...                # por defecto {FRONTEND_URL}/restablecer

# Base de datos (2 motores; VECTOR_DATABASE_URL sin valor por defecto)
DATABASE_URL=postgresql+asyncpg://igualab:***@host:5432/igualab
VECTOR_DATABASE_URL=postgresql+asyncpg://igualab:***@host:5432/igualab_vectorial

# JWT y sesión
JWT_SECRET_KEY=***                    # OBLIGATORIA
JWT_ALGORITHM=HS256
SESSION_INACTIVITY_HOURS=2
PASSWORD_RESET_TOKEN_EXPIRE_MINUTES=30
MAX_LOGIN_ATTEMPTS=5
LOGIN_LOCKOUT_MINUTES=15

# Correo (Gmail SMTP) — opcional; el arranque NO debe depender de estas (bug P0 email_service.py)
MAIL_USERNAME=***
MAIL_PASSWORD=***                     # contraseña de aplicación
MAIL_FROM=***

# Almacenamiento de originales (MinIO/S3)
MINIO_ENDPOINT_URL=...  MINIO_BUCKET=...  MINIO_REGION=...
MINIO_ACCESS_KEY=***    MINIO_SECRET_KEY=***

# Embeddings (OCI Generative AI)
OCI_REGION=us-chicago-1
OCI_COMPARTMENT_ID=...
OCI_EMBED_MODEL=cohere.embed-v4.0
OCI_EMBED_DIMENSIONS=1536
OCI_CONFIG_FILE=~/.oci/config   OCI_CONFIG_PROFILE=svc-embeddings
OCI_USER_OCID=...  OCI_FINGERPRINT=...  OCI_TENANCY_OCID=...  OCI_KEY_PEM_B64=...

# LLM de chat (config presente pero SIN USO — pendiente Módulo 6)
DEEPSEEK_API_KEY=***  DEEPSEEK_BASE_URL=https://api.deepseek.com  DEEPSEEK_MODEL=deepseek-flash
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
4. Free tier: **200 req/día** (1 000/día con un top-up único de US$10). Las variantes `:free` rotan; si `z-ai/glm-5.2:free` no está disponible, el failover `openrouter/free` elige otro modelo gratis sin function calling.

### Opción B — NVIDIA NIM (recomendada: embeddings + generación con un proveedor)
- NVIDIA hospeda `z-ai/glm-5.2` **y modelos de embeddings** gratis (hasta 40 RPM): API key en **https://build.nvidia.com**; endpoint OpenAI-compatible `https://integrate.api.nvidia.com/v1`. Cumple el requisito del proveedor que da **ambos servicios**.

### Opción D — Google AI Studio (alternativa para embeddings)
- Embeddings `gemini-embedding-*` con free tier y generación con Gemini Flash: **https://aistudio.google.com/apikey**.

### Opción C — Z.ai oficial (Zhipu)
- Consola en **https://z.ai / https://open.bigmodel.cn**: API key propia; el plan gratuito da los modelos **Flash** (GLM-4.7-Flash / 4.5-Flash, 1 request concurrente).

> El modelo `GLM-5.2` completo es pago en algunos proveedores (≈ US$1.40/US$4.40 por 1M tokens in/out); **gratis** se consigue vía OpenRouter `:free` o NVIDIA NIM. Los **embeddings van por API del proveedor** (decisión del chat «Requisitos de embeddings»), por lo que **también consumen cuota**: el contador de uso debe incluir los tokens de embeddings (rate limit en middleware, sin tabla) — RNF-027.
