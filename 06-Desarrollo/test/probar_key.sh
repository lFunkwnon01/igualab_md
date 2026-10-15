#!/usr/bin/env bash
# ============================================================
#  ¿Esta API key sirve para CHAT y/o para EMBEDDINGS?
#  Prueba una sola key contra su proveedor.
#  Uso:
#     ./probar_key.sh                 # usa la key del .env (LLM_API_KEY)
#     ./probar_key.sh sk-xxxx https://api.deepseek.com
# ============================================================
set -uo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
for f in "$DIR/.env.local" "$DIR/.env"; do
  [ -f "$f" ] && { set -a; source "$f"; set +a; }
done

KEY="${1:-${LLM_API_KEY:-}}"
BASE="${2:-${LLM_BASE_URL:-https://api.deepseek.com}}"
BASE="${BASE%/}"
MODEL="${LLM_MODEL:-deepseek-flash}"

if [ -z "$KEY" ]; then echo "❌ No hay key. Ponla en .env o pásala como argumento."; exit 1; fi

echo "Proveedor : $BASE"
echo "Key        : ${KEY:0:8}… (oculta)"
echo "====================================================="

# ---------- 1) CHAT ----------
echo "== 1) CHAT =="
HTTP=$(curl -s -o "$DIR/.k_chat.json" -w "%{http_code}" "$BASE/chat/completions" \
  -H "Content-Type: application/json" -H "Authorization: Bearer $KEY" \
  -d "{\"model\":\"$MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"Responde solo: OK\"}],\"stream\":false}")
case "$HTTP" in
  200) echo "  ✅ CHAT: FUNCIONA  ->  $(python3 -c "import json;print(json.load(open('$DIR/.k_chat.json'))['choices'][0]['message']['content'])" 2>/dev/null)"; CHAT="✅";;
  401) echo "  ❌ CHAT: 401 (key inválida)"; CHAT="❌";;
  402) echo "  ❌ CHAT: 402 (sin saldo)"; CHAT="❌";;
  404) echo "  ❌ CHAT: 404 (modelo '$MODEL' no existe)"; CHAT="❌";;
  429) echo "  ❌ CHAT: 429 (rate limit)"; CHAT="⚠️";;
  *)   echo "  ❌ CHAT: HTTP $HTTP"; head -c 200 "$DIR/.k_chat.json"; echo; CHAT="❌";;
esac

# ---------- 2) EMBEDDINGS (misma key, mismo proveedor) ----------
echo "== 2) EMBEDDINGS =="
EMB_MODEL="${EMBEDDING_MODEL:-}"
# Si no hay modelo, probamos sin modelo para ver si el endpoint existe
BODY="{\"input\":[\"prueba de embeddings\"]"
[ -n "$EMB_MODEL" ] && BODY="$BODY,\"model\":\"$EMB_MODEL\",\"input_type\":\"query\""
BODY="$BODY}"
HTTP2=$(curl -s -o "$DIR/.k_emb.json" -w "%{http_code}" "$BASE/embeddings" \
  -H "Content-Type: application/json" -H "Authorization: Bearer $KEY" \
  -d "$BODY")
case "$HTTP2" in
  200) echo "  ✅ EMBEDDINGS: FUNCIONA (key y modelo OK)"; EMB="✅";;
  400|422) echo "  ⚠️ EMBEDDINGS: el endpoint EXISTE, pero falta/está mal el modelo. Pon un EMBEDDING_MODEL válido."; EMB="⚠️";;
  404) echo "  ❌ EMBEDDINGS: NO EXISTE en este proveedor -> esta key NO sirve para embeddings"; EMB="❌";;
  401) echo "  ❌ EMBEDDINGS: 401 (esta key NO está autorizada para embeddings)"; EMB="❌";;
  410) echo "  ⛔ EMBEDDINGS: 410 (modelo dado de baja / EOL)"; EMB="⛔";;
  429) echo "  ⚠️ EMBEDDINGS: 429 (rate limit)"; EMB="⚠️";;
  *)   echo "  ❌ EMBEDDINGS: HTTP $HTTP2"; head -c 200 "$DIR/.k_emb.json"; echo; EMB="❌";;
esac

# ---------- 3) Si hay OTRO proveedor para embeddings, probarlo también ----------
if [ -n "${EMBEDDING_BASE_URL:-}" ] && [ "${EMBEDDING_BASE_URL%/}" != "$BASE" ]; then
  echo "== 3) EMBEDDINGS en otro proveedor ($EMBEDDING_BASE_URL) =="
  EB="${EMBEDDING_BASE_URL%/}"; EK="${EMBEDDING_API_KEY:-}"
  if [ -z "$EK" ]; then
    echo "  ⚠️ No hay EMBEDDING_API_KEY para ese proveedor."
  else
    HTTP3=$(curl -s -o "$DIR/.k_emb2.json" -w "%{http_code}" "$EB/embeddings" \
      -H "Content-Type: application/json" -H "Authorization: Bearer $EK" \
      -d "{\"input\":[\"prueba\"],\"model\":\"${EMBEDDING_MODEL:-}\",\"input_type\":\"query\"}")
    case "$HTTP3" in
      200) echo "  ✅ EMBEDDINGS: FUNCIONA en $EB"; EMB2="✅";;
      410) echo "  ⛔ EMBEDDINGS: 410 (modelo EOL) -> elige otro modelo"; EMB2="⛔";;
      401) echo "  ❌ EMBEDDINGS: 401 (key inválida para ese proveedor)"; EMB2="❌";;
      404) echo "  ❌ EMBEDDINGS: 404 (modelo o endpoint inexistente)"; EMB2="❌";;
      *)   echo "  ❌ EMBEDDINGS: HTTP $HTTP3"; EMB2="❌";;
    esac
  fi
fi

echo "====================================================="
echo "RESUMEN -> Chat: $CHAT  |  Embeddings (mismo proveedor): $EMB ${EMB2:+| Otro proveedor: $EMB2}"
[ "$CHAT" = "✅" ] && [ "$EMB" != "✅" ] && echo "👉 Tu key sirve para CHAT pero NO para embeddings. Necesitas una key de NVIDIA NIM o Google para los embeddings."
echo "(respuestas en .k_*.json, ignoradas por git)"
