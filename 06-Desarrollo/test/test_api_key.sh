#!/usr/bin/env bash
# ============================================================
#  Test interno de API keys (LLM + embeddings) — Igualab
#  No toca BCK ni FrontEnd. Solo hace llamadas HTTP de prueba.
#
#  Uso:
#    1) Copia .env.local.example -> .env.local y pega tu key
#    2) chmod +x test_api_key.sh && ./test_api_key.sh
# ============================================================
set -uo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Carga .env (privado, gitignored). .env tiene prioridad sobre .env.local.
for f in "$DIR/.env.local" "$DIR/.env"; do
  if [ -f "$f" ]; then
    set -a; # shellcheck disable=SC1091
    source "$f"; set +a
  fi
done

LLM_BASE_URL="${LLM_BASE_URL:-https://api.deepseek.com}"
LLM_MODEL="${LLM_MODEL:-deepseek-chat}"

if [ -z "${LLM_API_KEY:-}" ]; then
  echo "❌ Falta LLM_API_KEY. Edita este archivo y pega tu key:  $DIR/.env"
  exit 1
fi

echo "Proveedor : $LLM_BASE_URL"
echo "Modelo    : $LLM_MODEL"
echo "Key       : ${LLM_API_KEY:0:7}… (oculta)"
echo "-----------------------------------------------------"

echo "== 1) Chat completions =="
HTTP=$(curl -s -o "$DIR/.last_chat.json" -w "%{http_code}" "$LLM_BASE_URL/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $LLM_API_KEY" \
  -d "{\"model\":\"$LLM_MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"Responde unicamente: OK\"}],\"stream\":false}")
echo "HTTP $HTTP"
if [ "$HTTP" = "200" ]; then
  echo "✅ Chat OK ->"; python3 -c "import json;print(json.load(open('$DIR/.last_chat.json'))['choices'][0]['message']['content'])" 2>/dev/null || head -c 300 "$DIR/.last_chat.json"
else
  echo "❌ Chat FALLÓ:"; head -c 400 "$DIR/.last_chat.json"; echo
fi

echo "-----------------------------------------------------"
echo "== 2) Lista de modelos (valida la key) =="
HTTP2=$(curl -s -o "$DIR/.last_models.json" -w "%{http_code}" "$LLM_BASE_URL/models" -H "Authorization: Bearer $LLM_API_KEY")
echo "HTTP $HTTP2"
[ "$HTTP2" = "200" ] && echo "✅ Key válida (modelos disponibles)." || { echo "❌"; head -c 300 "$DIR/.last_models.json"; echo; }

if [ -n "${EMBEDDING_API_KEY:-}" ]; then
  echo "-----------------------------------------------------"
  echo "== 3) Embeddings =="
  EB="${EMBEDDING_BASE_URL:-https://integrate.api.nvidia.com/v1}"
  EM="${EMBEDDING_MODEL:-nvidia/nv-embedqa-e5-v5}"
  HTTP3=$(curl -s -o "$DIR/.last_embed.json" -w "%{http_code}" "$EB/embeddings" \
    -H "Content-Type: application/json" -H "Authorization: Bearer $EMBEDDING_API_KEY" \
    -d "{\"input\":[\"prueba de embeddings\"],\"model\":\"$EM\",\"input_type\":\"query\"}")
  echo "HTTP $HTTP3"
  [ "$HTTP3" = "200" ] && echo "✅ Embeddings OK (vector recibido)." || { echo "❌"; head -c 300 "$DIR/.last_embed.json"; echo; }
fi

echo "-----------------------------------------------------"
echo "Fin. (respuestas guardadas en .last_*.json, ignoradas por git)"
