# 🎯 Backend — Arquitectura Objetivo (organización de carpetas) — ✅ APLICADA

> **Estado:** ✅ **APLICADO (2026-10-14)** en `BCK-IGUALAB@development`. Reorganización completa sin cambios de comportamiento:
> **1955 tests pasan · 359 skipped · 0 fallos** (mismo resultado que antes del refactor) · `ruff` (F401/F811/F841) limpio · `import app.main` OK.
> Complementa a [`ARQUITECTURA-DE-CARPETAS-Y-MODULARIZACION.md`](ARQUITECTURA-DE-CARPETAS-Y-MODULARIZACION.md).

---

## 1 · Principios aplicados

1. **Módulo = carpeta** (`app/modules/<feature>/`). Un módulo = un caso de uso funcional (M1–M8).
2. **Capas internas por módulo:**

   | Capa | Responsabilidad |
   |---|---|
   | `router.py` | Entrada HTTP (FastAPI) |
   | `schemas.py` | Pydantic (entrada/salida de su API) |
   | `service.py` | Casos de uso / orquestación |
   | `application/` | (solo módulos grandes) orquestación por etapas |
   | `domain/` | **reglas puras** (sin BD/HTTP/red) |
   | `infrastructure/` | **adaptadores** (S3/MinIO, OCI, pgvector) |

3. **`core/`** = todo lo transversal (no conoce módulos). **`models/`** = ORM compartido (registro único de SQLAlchemy + FKs entre módulos).

---

## 2 · Árbol final implementado

```
app/
├── main.py
├── core/                    # ⚙️ transversal
│   ├── config.py  database.py  database_vectorial.py  security.py
│   ├── dependencies.py  exceptions.py  exception_handlers.py
│   └── logging_config.py  request_id.py  email_service.py
├── models/                  # ORM compartido (Base registry + FK entre módulos)
│   ├── usuarios.py  empresas.py  auditoria.py  documento_ingesta.py  analisis_gri.py  documentos.py
├── schemas.py               # Pydantic compartido (auth/usuarios/empresas)
├── modules/                 # 🧩 1 carpeta = 1 módulo
│   ├── auth/        { router.py, service.py }
│   ├── usuarios/    { router.py, service.py }
│   ├── empresas/    { router.py, service.py }
│   ├── ingesta/     { router.py, schemas.py, application/, domain/, infrastructure/ }   ← ver §3
│   ├── analisis_gri/{ router.py, schemas.py, application/, domain/ }
│   └── auditoria/   { service.py }        # registrar_evento (usado por todos)
├── migraciones/             # motor + SQL (transaccional/ + vectorial/)
└── scripts/ · tests/
```

**Decisiones respecto a la propuesta original:**
- Se usa **`router.py` en la raíz del módulo** (no `api/`) → menos anidamiento.
- **`models/` se mantiene centralizado** (no por módulo): es el registro único de SQLAlchemy y varias tablas tienen FK entre módulos. Moverlo no aportaba y sí arriesgaba el arranque.
- `auditoria` expone `service.py` con `registrar_evento`, consumido por el resto (módulo "hoja").

---

## 3 · `ingesta` desglosado (implementado)

```
modules/ingesta/
├── router.py                 # antes app/modules/ingesta/router.py
├── schemas.py                # antes app/modules/ingesta/schemas.py
├── application/              # 🎬 casos de uso / orquestación
│   ├── coordinador.py  documento_service.py  operacion_service.py
│   ├── gestor.py       analisis_ingesta.py
├── domain/                   # 🧠 reglas puras
│   ├── markdown.py  fragmentacion.py  texto.py  reglas.py  parametros.py  validacion.py
│   ├── catalogo_gri.py  deteccion_gri.py  deteccion_sanciones.py
│   ├── almacenamiento.py  embeddings.py            # contratos (ports)
│   └── datos/catalogo_gri.json                     # 48 entradas / 44 códigos
└── infrastructure/           # 🔌 adaptadores
    ├── almacenamiento_s3.py  proveedor_oci.py  fragmentos_vectoriales.py
```

### Etapas del pipeline y dónde vive cada una
Las 7 etapas (`EtapaIngesta`) son estados que recorre `application/`, no carpetas:

| # | Etapa | Código |
|---|---|---|
| 1 | `RESERVADO` | `application/documento_service.py` (reserva) |
| 2 | `ALMACENANDO_ORIGINAL` | `infrastructure/almacenamiento_s3.py` |
| 3 | `INDEXANDO` | `domain/markdown` + `domain/fragmentacion` + `infrastructure/proveedor_oci` + `infrastructure/fragmentos_vectoriales` |
| 4 | `ANALIZANDO` | `application/analisis_ingesta.py` + `domain/deteccion_*` |
| 5 | `COMPLETANDO` | `application/documento_service.py` |
| 6 | `PUBLICANDO` | `application/documento_service.py` + `infrastructure/fragmentos_vectoriales.py` |
| 7 | `FINALIZADO` | `application/documento_service.py` |

---

## 4 · Duplicación eliminada (calidad)

| Duplicado | Antes | Ahora |
|---|---|---|
| Código seguro de error (`_CODIGO_REGEX`, `_codigo`, `_codigo_seguro`) | 3 copias del regex + 2 funciones en `documento_service`, `coordinador`, `operacion_service` | `core/exceptions.py::codigo_seguro` + `es_codigo_valido` |
| `_inicia_tabla` (detección de inicio de tabla Markdown) | 3 implementaciones (`deteccion_gri`, `deteccion_sanciones`, `fragmentacion`) | `domain/markdown.py::inicia_tabla` |
| `_limites_de_cita` (recorte de cita) | 2 implementaciones | `domain/texto.py::recortar_cita` |
| Handlers 500 (`database`/`unexpected`) | 2 cuerpos idénticos | `core/exception_handlers.py::_internal_error_response` |
| Imports sin usar | `AsyncSession`, `select` | eliminados |

> Verificado con detector AST: **0 cuerpos de función estructuralmente duplicados**.

---

## 5 · Cómo deben nacer M6 / M7 / M8

```
modules/asistente/     # CU004 · M6
├── router.py  schemas.py  service.py
├── domain/    { prompt.py, citas.py }
└── infrastructure/{ llm/deepseek.py }        # usa DEEPSEEK_* de core/config

modules/reportes/      # CU006 · M7
├── router.py  schemas.py  service.py
├── domain/{ plantilla.py }
└── infrastructure/{ pdf/, storage/ }

modules/auditoria/     # CU007 · M8  (ya existe service.py de escritura)
└── + router.py (lectura con filtros)
```

Reutilizan: `asistente` → `ingesta/infrastructure/fragmentos_vectoriales.buscar_similares`; `reportes` → `analisis_gri` validado; `auditoria` → su modelo + `registrar_evento`.

---

## 6 · Estado de la verificación

| Check | Resultado |
|---|---|
| `pytest` (suite completa) | **1955 passed · 359 skipped · 0 failed** |
| `ruff check app --select F401,F811,F841` | **All checks passed** |
| `import app.main` | OK |
| Duplicados estructurales (AST) | **0** |

> Pendiente de commit/push (los cambios viven en el working tree de `BCK-IGUALAB@development`).
