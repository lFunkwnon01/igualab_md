# 🤖 M6 · Asistente IA (RAG) y 📊 M7 · Reportes de Prospección — Implementación

> **Fecha:** 2026-10-15 · **Rama:** `development` (local, **sin push**).
> **Módulos:** M6 (CU004 · RF-023/024) y M7 (CU006 · RF-025..027). **M8 (Auditoría) pendiente.**
> **Tests:** 23 nuevos (M6: 13 · M7: 10) + suite completa verde. **Swagger:** endpoints expuestos en `/docs`.

---

## 1 · M6 — Asistente IA (RAG)

**Ubicación:** `app/modules/asistente/` (`router.py`, `schemas.py`, `service.py`, `domain/`, `infrastructure/`).

**Flujo (RF-023/024 · RN-033..037):**
```
pregunta → embedding de CONSULTA (SEARCH_QUERY, OCI) → buscar_similares (pgvector, k=4)
        → filtrar por documentos_recuperables (solo COMPLETADO + empresa activa)
        → prompt con contexto numerado [1..n] → LLM (DeepSeek) → post-verificación de citas
        → respuesta + citas verificadas
```

| Pieza | Archivo | Rol |
|---|---|---|
| `prompt.py` | `domain/` | construye el prompt (contexto numerado + reglas de dominio) |
| `citas.py` | `domain/` | post-verificación RN-034: descarta citas `[n]` fuera del contexto |
| `llm.py` | `infrastructure/` | cliente DeepSeek (OpenAI-compatible) — protocolo `ProveedorLlm` inyectable |
| `service.py` | raíz | orquesta el flujo; reutiliza `buscar_similares` + `documentos_recuperables` |
| `router.py` | raíz | `POST /asistente/consultas` (solo **Administrador**) |

**Reglas de negocio aplicadas:** RN-033 (solo corpus) · RN-034 (citas) · RN-035 (sin evidencia → se declara) · RN-036 (dominio restringido sostenibilidad).

**Config:** `DEEPSEEK_API_KEY` / `DEEPSEEK_BASE_URL` / `DEEPSEEK_MODEL` + embeddings OCI (`ProveedorEmbeddingsOCI`). Sin ellos → **503** con código claro.

**Ejemplo de respuesta:**
```json
{ "respuesta": "Minera Andina presenta GRI 305 como OK [1].",
  "citas": [{ "documento_id": "…", "seccion": "3.6 Personal", "anio": 2025, "extracto": "…" }],
  "sin_evidencia": false }
```

---

## 2 · M7 — Reportes de Prospección (PDF LaTeX)

**Ubicación:** `app/modules/reportes/` (`router.py`, `schemas.py`, `service.py`, `domain/plantilla.py`, `infrastructure/pdf.py`, `plantillas/reporte_prospeccion.tex`).

**Idea (según el mock):** la **plantilla LaTeX es permanente**; solo se rellenan los valores con el análisis GRI **validado** de una empresa/año/documento específicos. El PDF es un **render determinista de datos ya validados** (RN-040): **nunca** se genera contenido con IA.

**Flujo:**
```
POST /reportes {empresa_id, anio}
  → obtener_analisis_validado  (exige validación vigente; si no → 409 ANALYSIS_NOT_VALIDATED)
  → datos_desde_analisis  (empresa/año/sector, puntaje ESG, conteos GRI, sanciones, citas)
  → renderizar  (rellena reporte_prospeccion.tex con jinja2)
  → compilar_tex_a_pdf  (tectonic)  → PDF
  → guarda reportes_prospeccion (PDF + sha256 + snapshot JSONB), 1 por empresa/año (RN-041)
```

| Pieza | Archivo | Rol |
|---|---|---|
| `reporte_prospeccion.tex` | `plantillas/` | plantilla LaTeX (cabecera, resumen, tabla GRI con cita, sanciones) |
| `plantilla.py` | `domain/` | escape LaTeX + `datos_desde_analisis` + render jinja2 |
| `pdf.py` | `infrastructure/` | compila `.tex` → PDF con `tectonic` |
| `service.py` | raíz | `generar_reporte` / `listar_reportes` / `obtener_pdf` |
| Modelo | `app/models/reportes.py` | `reportes_prospeccion` (PDF, sha256, snapshot) — 1 por empresa/año |

**Endpoints:** `POST /reportes` (genera) · `GET /reportes` (historial) · `GET /reportes/{id}/archivo` (descarga PDF) — solo **Administrador**.

**Datos del reporte** (del análisis validado): puntaje ESG · conteo de estados GRI (OK/baja/sub) · tabla código·estándar·estado·**cita de respaldo** · resumen de sanciones · versión/huella/validador.

---

## 3 · Endpoints en Swagger (`/docs`)

| Método | Ruta | Rol | Módulo |
|---|---|---|---|
| POST | `/asistente/consultas` | Administrador | M6 |
| POST | `/reportes` | Administrador | M7 |
| GET | `/reportes` | Administrador | M7 |
| GET | `/reportes/{reporte_id}/archivo` | Administrador | M7 |

---

## 4 · Verificación

| Check | Resultado |
|---|---|
| `pytest` (suite completa, BD local) | **2333 passed · 3 skipped · 0 failed** (1 flaky de temporización en ingesta, ajeno) |
| Tests M6 + M7 | **23 passed** |
| `POST /reportes` sin análisis validado | **409** `ANALYSIS_NOT_VALIDATED` ✅ |
| `POST /asistente/consultas` sin OCI | **503** `EMBEDDINGS_NOT_CONFIGURED` ✅ |
| RBAC (superadmin → asistente) | **403** ✅ |
| PDF real (tectonic) | generado (`%PDF-`, 25 KB) ✅ |

> **Pruebas E2E con corpus real** (ingesta → análisis → validación → reporte) requieren MinIO + OCI configurados; en local se validó la generación de PDF con datos de muestra y el servicio con dobles.

---

## 5 · Pendiente
- **M8 · Auditoría Funcional** (lectura + filtros) — al final, según lo acordado.
- E2E con corpus real cuando haya MinIO/OCI.
- Tests de integración HTTP del flujo completo.
