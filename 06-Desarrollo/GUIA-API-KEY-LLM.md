# 🔑 Cómo probar tu API key del LLM (paso a paso)

> Proveedor del proyecto: **OpenRouter** (LLM) y **NVIDIA NIM / Google** (embeddings), todos **OpenAI-compatible**.
> Variables de entorno: `LLM_BASE_URL`, `LLM_API_KEY`, `LLM_MODEL`, `LLM_FALLBACK_MODEL`, `EMBEDDING_BASE_URL`, `EMBEDDING_API_KEY`, `EMBEDDING_MODEL`.

## ⚠️ Reglas de seguridad (primero)
1. La key **solo** vive en un archivo **`.env`** local, **nunca** en el código, en Git, en capturas ni en el chat.
2. Verifica que `.env` esté ignorado: `git check-ignore .env` (debe responder `.env`).
3. Si la key se filtró (la pegaste en algún lado), **rótala** en el panel del proveedor y genera una nueva.

---

## Paso 0 — Guardar la key de forma segura
Crea/edita `BCK-IGUALAB/.env` (junto al backend):

```env
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
LLM_MODEL=z-ai/glm-5.2:free
LLM_FALLBACK_MODEL=openrouter/free

EMBEDDING_BASE_URL=https://integrate.api.nvidia.com/v1
EMBEDDING_API_KEY=nvapi-xxxxxxxxxxxxxxxx
EMBEDDING_MODEL=nvidia/nv-embedqa-e5-v5
```

Carga las variables en tu terminal **sin imprimirlas**:
```bash
set -a; source .env; set +a      # carga .env sin mostrar los valores
```

---

## Paso 1 — Test rápido del LLM con `curl`
```bash
curl -s https://openrouter.ai/api/v1/chat/completions \
  -H "Authorization: Bearer $LLM_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
        "model": "z-ai/glm-5.2:free",
        "messages": [{"role": "user", "content": "Responde únicamente: OK"}]
      }' | head -c 800
```
✅ **Funciona** si devuelve un JSON con `choices[0].message.content` (p. ej. `"OK"`).
❌ Si devuelve error, mira la sección «Diagnóstico».

## Paso 2 — Verificar que la key es válida y ver tu cuota (OpenRouter)
```bash
curl -s https://openrouter.ai/api/v1/auth/key -H "Authorization: Bearer $LLM_API_KEY"
```
Devuelve datos de la key (etiqueta, `usage`, `limit`, si es `:free`). Así confirmas que la key existe y no está agotada.

## Paso 3 — Test de embeddings (NVIDIA NIM)
```bash
curl -s https://integrate.api.nvidia.com/v1/embeddings \
  -H "Authorization: Bearer $EMBEDDING_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"input": ["prueba de embeddings"], "model": "nvidia/nv-embedqa-e5-v5", "input_type": "query"}' \
  | head -c 400
```
✅ **Funciona** si devuelve `data[0].embedding` (un vector de números).
> En Google: cambia `LLM_BASE_URL`/`EMBEDDING_BASE_URL` a los endpoints de Gemini y usa `gemini-embedding-*`.

> ⚠️ **Modelos EOL:** `nvidia/nv-embedqa-e5-v5` dio **410 Gone** (fin de vida 25/08/2026). Usa un modelo vigente:
> - **NVIDIA NIM:** `llama-3.2-nv-embedqa-1b-v2` (≈2048 dim) o `baai/bge-m3` (1024 dim, multilingüe, ideal para español).
> - **Google:** `gemini-embedding-001` (hasta 3072 dim; muy estable) o `gemini-embedding-2`.
> **Lista los disponibles con tu key** antes de fijar el modelo:
> ```bash
> curl https://integrate.api.nvidia.com/v1/models -H "Authorization: Bearer $EMBEDDING_API_KEY"
> ```
> ⚠️ La **dimensión** del modelo debe coincidir con `fragmentos_documento.embedding VECTOR(N)` en tu BD (pgvector).

## Paso 4 — Test con Python (así lo usará el backend)
```python
import os
from openai import OpenAI

client = OpenAI(
    base_url=os.environ["LLM_BASE_URL"],
    api_key=os.environ["LLM_API_KEY"],
)

resp = client.chat.completions.create(
    model=os.environ["LLM_MODEL"],          # z-ai/glm-5.2:free
    messages=[{"role": "user", "content": "Responde únicamente: OK"}],
    timeout=60,
)
print("OK:", resp.choices[0].message.content)
```
Ejecuta:
```bash
set -a; source .env; set +a
python test_llm.py
```
✅ Si imprime `OK: OK` → la key y el modelo funcionan end-to-end.

## Paso 5 — Verificarlo desde TU backend
1. Añade a `app/core/config.py`:
   ```python
   LLM_BASE_URL: str = os.getenv("LLM_BASE_URL", "")
   LLM_API_KEY: str = os.getenv("LLM_API_KEY", "")
   LLM_MODEL: str = os.getenv("LLM_MODEL", "z-ai/glm-5.2:free")
   ```
2. Crea un endpoint de salud que haga una llamada mínima:
   ```python
   @router.get("/health/llm")
   async def health_llm():
       try:
           # llama al proveedor con el LlmClient y un prompt de 1 token
           ...
           return {"llm": "ok", "model": settings.LLM_MODEL}
       except Exception as e:
           return {"llm": "error", "detail": str(e)}
   ```
3. Prueba: `curl localhost:8000/health/llm`.

---

## Paso 6 — Proveedor alternativo: DeepSeek (OpenAI-compatible)
DeepSeek **sí es un LLM** (chat); se prueba igual. ⚠️ Sus keys empiezan con `sk-` (no `sk-or-v1-`, que es OpenRouter).

```env
DEEPSEEK_API_KEY=sk-xxxxxxxx
# para el proyecto, encaja igual en el LlmClient:
LLM_BASE_URL=https://api.deepseek.com
LLM_API_KEY=sk-xxxxxxxx
LLM_MODEL=deepseek-chat
```

```bash
curl https://api.deepseek.com/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $DEEPSEEK_API_KEY" \
  -d '{"model":"deepseek-chat","messages":[{"role":"user","content":"Responde únicamente: OK"}],"stream":false}'

# verificar key / modelos
curl https://api.deepseek.com/models -H "Authorization: Bearer $DEEPSEEK_API_KEY"
```
- Modelos: `deepseek-chat` (V3) · `deepseek-reasoner` (R1).
- **DeepSeek NO ofrece embeddings** → el RAG usa **NVIDIA NIM / Google** para los embeddings.
- Es **de pago por uso** (no free tier).

---

## Diagnóstico de errores comunes
| Código | Significado | Solución |
|---|---|---|
| **401** | Key inválida o mal copiada | Revisa el `Bearer`, que no haya espacios/salto de línea |
| **402** | Sin créditos / free tier agotado | Espera el reset diario o usa otro `:free` (failover) |
| **404** | Modelo inexistente | Verifica el `LLM_MODEL` exacto (p. ej. `z-ai/glm-5.2:free`) |
| **429** | Rate limit (200 req/día free) | Reduce frecuencia o usa `LLM_FALLBACK_MODEL` |
| **timeout** | Red lenta / proveedor caído | Sube el timeout (RNF-018: 1 min) y reintenta |
| **model_not_found** | El `:free` rotó | Usa `openrouter/free` como failover |

## Checklist final
- [ ] `.env` creado y **gitignored** (`git check-ignore .env`).
- [ ] `curl` al chat devuelve respuesta (Paso 1).
- [ ] `curl` a `/auth/key` confirma la key (Paso 2).
- [ ] `curl` a embeddings devuelve vector (Paso 3).
- [ ] Script Python imprime `OK` (Paso 4).
- [ ] Endpoint `/health/llm` del backend responde `ok` (Paso 5).
- [ ] La key **no** aparece en el repo (`git grep sk-or-v1` → vacío).
