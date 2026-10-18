# 🧱 Arquitectura de Carpetas y Modularización — Igualab

> **Propósito:** definir la **arquitectura objetivo** del código (backend y frontend) para que cada módulo tenga un lugar claro, sin archivos sueltos ni lógica repetida.
> **Estado:** ✅ **APLICADA al backend (2026-10-14)** — ver [`ARQUITECTURA-BACKEND-OBJETIVO.md`](ARQUITECTURA-BACKEND-OBJETIVO.md) (árbol final + verificación: 1955 tests, 0 duplicados). El **frontend** aún no se reorganizó.
> **Fuente de verdad del sistema implementado:** `06-Desarrollo/BCK-IGUALAB` + `06-Desarrollo/FE-IGUALAB`.

---

## 1 · Diagnóstico de la estructura actual

El backend (`app/`) mezcla **infraestructura transversal** con **lógica de dominio** en la raíz, y los servicios viven a **dos niveles** distintos:

```
app/
├── config.py, database.py, database_vectorial.py, security.py,        ← INFRA en la raíz
│   exceptions.py, exception_handlers.py, logging_config.py, request_id.py,
│   dependencies.py, email_service.py, audit.py, main.py
├── models/        (7)   routers/ (6)   schemas*.py (3)                 ← por TIPO (horizontal)
└── services/
    ├── auth_service.py, empresa_service.py, usuario_service.py        ← sueltos en services/
    ├── ingesta/     (19 archivos: dominio + adaptadores + orquestación MEZCLADOS)
    └── analisis_gri/ (4)
```

**Problemas concretos:**
1. **Sin fronteras de módulo:** no se ve que `ingesta` sea un módulo (CU003) y `analisis_gri` otro (CU005); parte está en `services/` plano y parte anidado.
2. **`ingesta/` mezcla 3 responsabilidades** en la misma carpeta: reglas puras (`markdown`, `fragmentacion`, `deteccion_*`), adaptadores externos (`almacenamiento_s3`, `proveedor_oci`, `fragmentos_vectoriales`) y orquestación (`coordinador`, `gestor`, `documento_service`).
3. **Infra en la raíz** (`config`, `database`, `security`, `exceptions`, `logging`, `email`, `audit`) sin agrupar → `app/` es un cajón.
4. **`schemas*.py` sueltos** (`schemas.py`, `schemas_analisis.py`, `schemas_ingesta.py`) y **modelos centralizados** desacoplados de su módulo.
5. **Fácil repetir lógica**: al no haber un "hogar" por feature, se copia código (el propio grafo detecta duplicación de parseo Markdown, etc.).

---

## 2 · Arquitectura recomendada: **Monolito modular + "package by feature" (vertical slice) con hexagonal ligero**

### 2.1 ¿Por qué esta y no otra?

| Candidata | Encaje en Igualab | Veredicto |
|---|---|---|
| **Layered (por tipo)** | Es lo que tenemos; escala mal y difumina módulos | ❌ No |
| **Microservicios** | El proyecto es 3 usuarios, 1 backend; añade infra sin valor (RNF-015 «sin colas») | ❌ No |
| **Hexagonal/Clean puro** | Excelente aislamiento, pero **ceremonia alta** (puertos/interfaces por todo) para un equipo/plazo corto | 🟡 Solo la parte útil |
| **Vertical slice (por feature)** | 1 carpeta = 1 módulo funcional; navegación obvia; encaja con M1–M8 | ✅ Núcleo |
| **Monolito modular** | Ya lo declaramos (2 bases, un despliegue); módulos con fronteras claras | ✅ Núcleo |

**Recomendación = Monolito modular**, organizado **por feature** (cada módulo con sus capas internas `router → service → (domain / adapters)`), tomando de **hexagonal** solo lo valioso: **separar dominio puro de adaptadores externos** (MinIO, OCI, pgvector) detrás de contratos. Nada de microservicios ni interfaces por todos lados.

> Esto es lo que ya insinuaba la doc: «monolito modular», «una responsabilidad por tabla/servicio». Aquí se lleva a **carpetas**.

### 2.2 Regla de oro
- **`core/`** = todo lo transversal (no sabe de ningún módulo).
- **`modules/<feature>/`** = un módulo funcional autocontenido. Nadie fuera de `ingesta/` importa detalles internos de `ingesta/`; se usan sus contratos públicos.
- **Dominio puro** (sin BD/HTTP) separado de **adaptadores** (I/O) dentro del módulo.

---

## 3 · Estructura objetivo — Backend

```
BCK-IGUALAB/
├── app/
│   ├── main.py                      # compone routers + lifespan
│   ├── core/                        # ⚙️ transversal (antes: raíz + models + schemas)
│   │   ├── config.py
│   │   ├── database.py              # engine transaccional + Base
│   │   ├── database_vectorial.py
│   │   ├── security.py              # bcrypt + JWT
│   │   ├── dependencies.py          # get_db, usuario actual, roles
│   │   ├── errors.py                # exceptions.py + exception_handlers.py
│   │   ├── logging.py               # logging_config.py + request_id.py
│   │   └── email.py                 # email_service.py
│   └── modules/                     # 🧩 1 carpeta = 1 módulo funcional
│       ├── auth/                    # CU001  M1
│       │   ├── router.py  schemas.py  service.py
│       ├── usuarios/                # CU002  M2
│       ├── empresas/                # CU008  M3
│       ├── ingesta/                 # CU003  M4
│       │   ├── router.py  schemas.py  service.py     # orquestación (coordinador/gestor/documento)
│       │   ├── domain/              # ✅ reglas PURAS (sin BD/HTTP)
│       │   │   ├── markdown.py  fragmentacion.py  reglas.py  parametros.py
│       │   │   ├── deteccion_gri.py  deteccion_sanciones.py  catalogo_gri.py
│       │   ├── adapters/            # 🔌 salidas externas
│       │   │   ├── almacenamiento.py  almacenamiento_s3.py
│       │   │   ├── embeddings.py  proveedor_oci.py
│       │   │   └── fragmentos_vectoriales.py
│       │   └── models.py            # Documento, OperacionIngesta
│       ├── analisis_gri/            # CU005  M5
│       │   ├── router.py  schemas.py  service.py
│       │   ├── domain/calculo.py    # cálculo puro
│       │   └── models.py
│       ├── asistente/               # CU004  M6  ← NUEVO
│       ├── reportes/                # CU006  M7  ← NUEVO
│       └── auditoria/               # CU007  M8  ← NUEVO
├── migrations/                      # motor + SQL (antes app/migraciones)
├── scripts/                         # crear_tablas, superadmin, smoke…
└── tests/                           # espeja app/: tests/modules/ingesta/…
```

**Notas de decisión:**
- **Modelos:** cada módulo es dueño de sus modelos (`modules/<x>/models.py`). Los que son de otro módulo (p. ej. `empresas`) se importan desde su módulo. Si una entidad es realmente compartida, va a `core/models/` o a un módulo `shared/`.
- **`schemas.py`** (Pydantic) vive dentro del módulo (entrada/salida de su API).
- **`domain/`** no importa `core/database` ni FastAPI → 100% testeable sin infra.
- **`adapters/`** implementa los contratos de salida (S3, OCI, pgvector).

---

## 4 · Estructura objetivo — Frontend

Mismo principio: **por feature**, con un núcleo compartido.

```
FE-IGUALAB/src/
├── main.tsx  App.tsx                # composición (router + providers)
├── core/                            # ⚙️ compartido
│   ├── api/client.ts                # fetch + ApiError + eventos
│   ├── auth/                        # AuthContext, ProtectedRoute
│   ├── lib/                         # dominio.ts, format.ts, token.ts, validacion.ts
│   └── components/ui/               # Badge, Modal, Spinner, KpiCard, Layout…
└── features/                        # 🧩 1 carpeta = 1 módulo
    ├── auth/           { api.ts, pages/, components/, types.ts }
    ├── usuarios/
    ├── empresas/
    ├── ingesta/
    ├── analisis-gri/
    ├── asistente/      (hoy mock)
    ├── reportes/       (hoy mock)
    ├── auditoria/      (hoy mock)
    └── descargas/      (hoy mock)
```

> Regla: una feature **no** importa de otra feature; lo común sube a `core/`.

---

## 5 · Migración (incremental, sin romper tests)

El código actual **funciona** (2314 tests backend + 93 frontend + build OK). Un refactor total de golpe es riesgoso. Plan recomendado:

| Fase | Acción | Riesgo |
|---|---|---|
| **F0** | Documentar esta arquitectura objetivo + `AGENTS.md` | Nulo |
| **F1** ✅ | `core/` con infra transversal (`config`, `database*`, `security`, `errors`, `logging`, `email`) | Bajo |
| **F2** ✅ | `modules/` con **auth, usuarios, empresas** | Bajo-Medio |
| **F3** ✅ | `ingesta` → `modules/ingesta/{application,domain,infrastructure}` | Medio |
| **F4** ✅ | `analisis_gri` movido; `auditoria` como módulo; `asistente`/`reportes` nacerán aquí | Medio |
| **F5** | Reflejar en `tests/` la misma estructura (pendiente) | Bajo |

> **Hecho (2026-10-14):** F1–F4 aplicadas en `BCK-IGUALAB@development` con **1955 tests verdes** y **0 duplicados estructurales**. Detalle en [`ARQUITECTURA-BACKEND-OBJETIVO.md`](ARQUITECTURA-BACKEND-OBJETIVO.md).

Cada fase = un PR que **debe dejar los tests verdes** (`pytest` / `vitest` / `tsc`). Sin cambios de comportamiento.

---

## 6 · Nivel "IA" (AI-native) — qué ya tenemos y qué falta

El proyecto ya usa prácticas **AI-native** de facto:
- **Vault** (Obsidian) como base de conocimiento y trazabilidad.
- **Graphify** como capa de **contexto** navegable (grafo de código + docs).
- **Spec-driven**: el A&D, RN/RF/RNF y CU guían la implementación.

Lo que falta para cerrarlo (convención actual de repos asistidos por IA):
- **`AGENTS.md`** en la raíz de cada repo: reglas para agentes (cómo correr tests, estructura, convenciones, qué no tocar). Es el estándar abierto <https://agents.md>.
- **Specs por feature** dentro de `modules/<x>/` (un `README.md` corto con: propósito, CU/RF, contrato de API, tablas que toca).
- Mantener **graphify actualizado** (`--update`) para que el grafo sirva de contexto al agente.

---

## 7 · Referencias (tipos de arquitectura)
- Thoughtworks — *Demystifying software architecture patterns* (Clean, Hexagonal, Onion): <https://www.thoughtworks.com/insights/blog/architecture/demystify-software-architecture-patterns>
- Wikipedia — *Hexagonal architecture (ports & adapters)*: <https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)>
- Vertical Slice Architecture (colección): <https://github.com/drveillard/software-architecture/blob/main/docs/vertical-slice-architecture.md>
- Guía en español de patrones (MVC, microservicios, hexagonal, CQRS…): <https://www.gestionarquitectonica.com.co/blog/patrones-arquitectura-principales.html>

> Resumen: **Monolito modular organizado por feature (vertical slice) con separación dominio/adaptadores (hexagonal ligero)**. Es el patrón que mejor encaja con M1–M8, el tamaño del equipo y el plazo del proyecto.
