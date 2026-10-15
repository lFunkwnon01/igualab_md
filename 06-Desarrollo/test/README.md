# 🧪 Test interno de API key (sin tocar BCK ni FrontEnd)

Prueba que tu **API key** funcione con `curl`/Python, **sin modificar el backend ni el frontend**. Solo hace llamadas HTTP de prueba.

## Uso
```bash
cd 06-Desarrollo/test
cp .env.local.example .env.local     # pega tu key real en .env.local
chmod +x test_api_key.sh
./test_api_key.sh                    # versión bash
# o:
python3 test_api_key.py              # versión python
```

## Qué prueba
1. **Chat completions** → debe devolver `content` = "OK" (HTTP 200).
2. **Listar modelos** → confirma que la key es válida.
3. **Embeddings** (si defines `EMBEDDING_API_KEY`) → debe devolver un vector.

## Seguridad
- La key **solo** vive en `.env.local`, que está **gitignored**.
- Verifica: `git check-ignore 06-Desarrollo/test/.env.local` → debe responder esa ruta.
- Nunca subas `.env.local` ni pegues la key en el chat/capturas.

## Interpretación
| HTTP | Significado |
|---|---|
| 200 | ✅ Funciona |
| 401 | Key inválida o mal copiada |
| 402 | Sin saldo (DeepSeek es de pago por uso) |
| 404 | Modelo mal escrito |
| 429 | Rate limit |

> Este test es **independiente** del proyecto: si da 200, la key y el modelo están OK y podrás usarla en el `LlmClient` del backend sin problemas.
