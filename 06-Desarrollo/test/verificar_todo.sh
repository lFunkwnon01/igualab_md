#!/usr/bin/env bash
# ============================================================
#  Verificación COMPLETA: LLM (chat) + Embeddings — Igualab
#  Lee .env / .env.local. No toca BCK ni FrontEnd.
#  Uso:  ./verificar_todo.sh
# ============================================================
set -uo pipefail
DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
for f in "$DIR/.env.local" "$DIR/.env"; do
  [ -f "$f" ] && { set -a; source "$f"; set +a; }
done

LLM_BASE_URL="${LLM_BASE_URL:-https://api.deepseek.com}"
LLM_MODEL="${LLM_MODEL:-deepseek-chat}"
EB="${EMBEDDING_BASE_URL:-https://integrate.api.nvidia.com/v1}"
EM="${EMBEDDING_MODEL:-}"

echo "#####################################################"
echo "# 1) LLM (chat)  ->  $LLM_BASE_URL  ($LLM_MODEL)"
echo "#####################################################"
HTTP=$(curl -s -o "$DIR/.t_chat.json" -w "%{http_code}" "$LLM_BASE_URL/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer ${LLM_API_KEY:-}" \
  -d "{\"model\":\"$LLM_MODEL\",\"messages\":[{\"role\":\"user\",\"content\":\"Responde solo: OK\"}],\"stream\":false}")
echo "HTTP $HTTP"
case "$HTTP" in
  200) echo "✅ LLM FUNCIONA -> $(python3 -c "import json;print(json.load(open('$DIR/.t_chat.json'))['choices'][0]['message']['content'])" 2>/dev/null)";;
  401) echo "❌ 401: key del LLM inválida o mal copiada";;
  402) echo "❌ 402: sin saldo (DeepSeek es de pago)";;
  404) echo "❌ 404: modelo '$LLM_MODEL' no existe";;
  429) echo "❌ 429: rate limit";;
  *)   echo "❌ error inesperado"; head -c 300 "$DIR/.t_chat.json"; echo;;
esac

echo
echo "#####################################################"
echo "# 2) Modelos de EMBEDDINGS disponibles en tu proveedor"
echo "#    ($EB)"
echo "#####################################################"
HTTP2=$(curl -s -o "$DIR/.t_models.json" -w "%{http_code}" "$EB/models" \
  -H "Authorization: Bearer ${EMBEDDING_API_KEY:-}")
echo "HTTP $HTTP2"
if [ "$HTTP2" = "200" ]; then
  python3 - "$DIR/.t_models.json" <<'PY'
import json,sys
d=json.load(open(sys.argv[1]))
ids=[m.get('id','') for m in d.get('data',[])]
emb=[i for i in ids if any(k in i.lower() for k in ('embed','bge','retriev','nemotron','m3'))]
if emb:
    print("👉 Modelos de embeddings disponibles (copia uno a EMBEDDING_MODEL):")
    for i in sorted(set(emb)): print("     -", i)
else:
    print("(no se detectaron modelos de embeddings; revisa el JSON .t_models.json)")
PY
else
  echo "❌ no se pudo listar modelos"; head -c 300 "$DIR/.t_models.json"; echo
fi

echo
echo "#####################################################"
echo "# 3) Test del modelo de embeddings configurado"
echo "#    EMBEDDING_MODEL = ${EM:-<vacío>}"
echo "#####################################################"
if [ -z "$EM" ]; then
  echo "⚠️  EMBEDDING_MODEL vacío. Copia uno del paso 2 a tu .env y reintenta."
else
  HTTP3=$(curl -s -o "$DIR/.t_emb.json" -w "%{http_code}" "$EB/embeddings" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${EMBEDDING_API_KEY:-}" \
    -d "{\"input\":[\"prueba de embeddings\"],\"model\":\"$EM\",\"input_type\":\"query\"}")
  echo "HTTP $HTTP3"
  case "$HTTP3" in
    200) echo "✅ EMBEDDINGS FUNCIONAN (vector recibido)";;
    410) echo "⛔ 410: ese MODELO está dado de baja (EOL). Elige otro del paso 2.";;
    401) echo "❌ 401: key de embeddings inválida";;
    404) echo "❌ 404: modelo '$EM' no existe (copia el nombre exacto del paso 2)";;
    429) echo "❌ 429: rate limit";;
    *)   echo "❌ error:"; head -c 300 "$DIR/.t_emb.json"; echo;;
  esac
fi

echo
echo "Fin. (respuestas en .t_*.json, ignoradas por git)"
