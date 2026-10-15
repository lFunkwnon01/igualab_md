#!/usr/bin/env python3
"""
Test interno de API key del LLM (OpenAI-compatible) — Igualab.
No toca BCK ni FrontEnd. Lee la key desde .env.local o variables de entorno.

Uso:
    cp .env.local.example .env.local   # pega tu key
    python3 test_api_key.py
"""
import os, json, urllib.request, urllib.error
from pathlib import Path

DIR = Path(__file__).resolve().parent
ENV = None
for cand in (DIR / ".env", DIR / ".env.local"):
    if cand.exists():
        ENV = cand
        break
if ENV:
    for line in ENV.read_text().splitlines():
        line = line.strip()
        if line and not line.startswith("#") and "=" in line:
            k, v = line.split("=", 1)
            os.environ.setdefault(k.strip(), v.strip())

BASE = os.environ.get("LLM_BASE_URL", "https://api.deepseek.com").rstrip("/")
MODEL = os.environ.get("LLM_MODEL", "deepseek-chat")
KEY = os.environ.get("LLM_API_KEY", "")

if not KEY:
    raise SystemExit("❌ Falta LLM_API_KEY (ponla en .env.local)")

print(f"Proveedor : {BASE}")
print(f"Modelo    : {MODEL}")
print(f"Key       : {KEY[:7]}… (oculta)")
print("-" * 50)


def post(path, body, key):
    req = urllib.request.Request(
        BASE + path, data=json.dumps(body).encode(), method="POST",
        headers={"Content-Type": "application/json", "Authorization": f"Bearer {key}"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:300]
    except Exception as e:
        return -1, str(e)


def get(path, key):
    req = urllib.request.Request(BASE + path, headers={"Authorization": f"Bearer {key}"})
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:300]
    except Exception as e:
        return -1, str(e)


print("== 1) Chat completions ==")
st, body = post("/chat/completions",
                {"model": MODEL, "messages": [{"role": "user", "content": "Responde unicamente: OK"}], "stream": False},
                KEY)
print("HTTP", st)
if st == 200:
    print("✅ Chat OK ->", body["choices"][0]["message"]["content"])
else:
    print("❌ Chat FALLÓ ->", body)

print("-" * 50)
print("== 2) Lista de modelos (valida la key) ==")
st, body = get("/models", KEY)
print("HTTP", st)
if st == 200:
    n = len(body.get("data", [])) if isinstance(body, dict) else "?"
    print(f"✅ Key válida ({n} modelos disponibles).")
else:
    print("❌ ->", body)
