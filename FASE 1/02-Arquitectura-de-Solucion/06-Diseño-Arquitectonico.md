# 06 · Diseño Arquitectónico — Igualab (Informe)

> Escenario: monolito modular + Python 3.13 · **2 bases PostgreSQL 16** (transaccional + vectorial con pgvector) · Modelo por capas.

## 1. Visión arquitectónica

El sistema se estructura en **7 capas** con flujo unidireccional (de arriba hacia abajo; las capas solo invocan a la capa inferior, nunca en sentido inverso):

| Nivel | Capa | Responsabilidad | Tecnologías |
|---|---|---|---|
| 1 | Actores y Roles | Superadmin · Administrador — acceso, permisos, creación de documentos | — |
| 2 | Aplicación web (SPA) | Gestión, carga, análisis, RAG, reportes y auditoría | React 18 + Vite, React Router, fetch/axios, HTML5/CSS3 |
| 3 | API y endpoints | Exposición REST, validación y orquestación | FastAPI · Pydantic · Uvicorn · REST/HTTPS |
| 4 | Servicios y lógica de negocio | Casos de uso: gestiona sesiones, ingesta documental, análisis GRI, asistente IA | Python 3.13 · SQLAlchemy Async |
| 5 | Procesamiento y reglas de cada módulo | Reglas de negocio de ingesta, análisis GRI, RAG, reportes y auditoría | Python 3.13 · SQLAlchemy Async |
| 6 | Persistencia | Modelos ORM y sesión | SQLAlchemy Async · AsyncSession |
| 7 | Base de datos | Persistencia transaccional (12 tablas) + vectorial (1 tabla, pgvector) | 2 bases PostgreSQL 16 · `DATABASE_URL` + `VECTOR_DATABASE_URL` |

**Reglas de dependencia:** cada capa solo conoce la capa inmediatamente inferior — no se salta capas ni hay dependencias circulares.

## 1.1 Capa 1 — Actores y Roles

| Actor | Alcance |
|---|---|
| Superadmin | Control total: empresas, ingesta, auditoría |
| Administrador | Validación GRI, consultas RAG, reportes |

## 1.2 Capa 2 — Aplicación Web (SPA)

- Módulos: gestión, carga, análisis, RAG, reportes y auditoría
- Panels: Superadmin (gestión y control total) · Administrador (análisis comercial y consultas)
- Fuera de alcance fase 1: Dashboards de Bolsa de Valores (fase 2)

## 1.3 Capa 3 — API y Endpoints

- Contrato REST con OpenAPI autogenerado
- CORS: solo orígenes configurados por variable de entorno
- Auth por JWT en headers `Authorization: Bearer`
- Endpoints: Auth/Usuarios · Empresas/Documentos · Análisis GRI · Consultas RAG · Auditoría

## 1.4 Capa 4 — Servicios (lógica de negocio)

| Servicio | Responsabilidad |
|---|---|
| gestión de sesiones y usuarios | login, logout, JWT, roles, bloqueo por intentos (RN-012) |
| ingesta documental | guard `.md` (≤ 50 MB, sin espacios ni mayúsculas), sha256, estado de rechazo |
| fragmentos vectorizados | segmentación en filas/chunks, embeddings por API del proveedor |
| asistente IA — RAG | recuperación k=4 cosine + respuesta fundamentada con citas |
| análisis GRI | detección de presencia y extracción de cita (motor determinista); el estado es 100% manual (no infiere) |
| reportes | PDF inmutable + snapshot JSONB |
| auditoría | registro de acciones de la plataforma (append-only) |

## 1.5 Reglas de integridad (transversales)

1. **Atomicidad de la ingesta** — documento rechazado ⇒ cero fragmentos, cero análisis (RN-026).
2. **Sin borrado físico** → `sesiones.revocada`, `tokens_recuperacion.usado`, `empresas.activo=false` (RNF-019).
3. **Unicidad documental** — UNIQUE `(empresa_id, anho, tipo)` parcial `WHERE estado='indexado'`.
4. **Un solo Superadmin** — índice único parcial en `usuarios.rol`.
5. **Un solo reporte por empresa/año** — UNIQUE parcial `(empresa_id, anho)` (RN-041).
6. **Citas obligadas** — todo estado visible proviene de `gri_analisis` supervisado por Administrador (RS-13).

## 1.6 Decisiones de arquitectura (avaladas)

| ID | Decisión |
|---|---|
| D-01 | Capa de presentación separate: SPA React 18 + Vite (FastAPI expone contrato REST/JSON) |
| D-02 | Autenticación **sessionizada** (JWT + tablas `sesiones`/`tokens_recuperacion`) |
| D-03 | Persistencia async (SQLAlchemy) — compatible con índice HNSW y búsqueda cosine |
| D-04 | Puntaje ESG calculado desde `gri_analisis` en **FASE 1** |
| D-05 | Nombres normalizados de ORM: `CatalogoGRI` / `GRIAnalisis` / `auditoria` |
| D-06 | `reportes_prospeccion` con UNIQUE parcial `(empresa_id, anho)` — cubre RN-041 |

## 1.7 Despliegue

Pipeline sugerido: Vercel (mock vivo estático) + servidor universitario (FastAPI + PostgreSQL). Pendiente decidir política de failover y observabilidad (fase 2).

---

> **Puntos abiertos a iterar:** ver #[PENDIENTES](#pendientes-de-implementación) en el capítulo final del informe.
