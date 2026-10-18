# 🗄️ Base de Datos — Motor, Configuración y conexión con pgAdmin

> **Fuente:** código `06-Desarrollo/BCK-IGUALAB@78e614a` (verificado). El código es la fuente de verdad.
> **Para quién:** cualquiera que necesite entender cómo se genera el esquema y cómo **ver las tablas** (pgAdmin/DBeaver) en el servidor on-premise.

---

## 1 · ¿Cuál es el "Hibernate/JPA" de nuestro proyecto?

En Spring Boot el ORM es **Hibernate** (implementa la especificación **JPA**) y las migraciones suelen ser **Flyway/Liquibase**.
En nuestro proyecto (Python/FastAPI) los equivalentes son:

| Concepto Spring Boot | Igualab (Python) | Dónde |
|---|---|---|
| Hibernate / JPA (ORM) | **SQLAlchemy 2.0** (async) | `app/models/*.py` |
| `@Entity` / entidad | Clase `Base` + `Mapped[...]` / `mapped_column(...)` | `app/models/*.py` |
| `EntityManager` / `Session` | **`AsyncSession`** (`async_sessionmaker`) | `app/core/database.py` |
| Driver JDBC (PostgreSQL) | **asyncpg** (driver async nativo) | `DATABASE_URL=postgresql+asyncpg://...` |
| `application.properties` (datasource) | Variables de entorno → `app/core/config.py` (`Settings`) | `app/core/config.py` |
| Flyway / Liquibase | **Motor de migraciones propio** (versionado + checksum) | `app/migraciones/` |
| `ddl-auto` (Hibernate) | **`create_all`** explícito (no automático por defecto) | `scripts/crear_tablas.py` |

**No usamos Alembic** (el "Flyway" estándar de Python). Tenemos un motor de migraciones propio, más estricto: bloqueo asesor por base,
checksum SHA-256, y clasificación **APLICA / ADOPTA / CONFLICTO** comparando el esquema real contra `app/migraciones/firmas.json`.

### 1.1 Piezas clave (para leer el código)
- `app/core/database.py` → `engine` (motor transaccional), `AsyncSessionLocal`, `Base` (`DeclarativeBase`), dependencia `get_db()`.
- `app/core/database_vectorial.py` → motor de la **base vectorial** (perezoso, `VECTOR_DATABASE_URL`, sin fallback).
- `app/models/*.py` → las entidades (equivalen a las `@Entity`).
- `app/migraciones/motor.py` + `app/migraciones/catalogo.py` → el motor y el catálogo de migraciones.

---

## 2 · Dos bases PostgreSQL (no una)

| Base | Variable de entorno | Contenido | ORM |
|---|---|---|---|
| **Transaccional** | `DATABASE_URL` | usuarios, sesiones, empresas, documentos, análisis GRI, auditoría… | Sí (`app/models`) |
| **Vectorial** | `VECTOR_DATABASE_URL` | `fragmentos_documento` (+ vista) y `cierres_documento`; requiere extensión **pgvector** | No (SQL crudo) |

> **Sin claves foráneas físicas entre bases**: las referencias (`documento_id`, `empresa_id`) son **UUID lógicos** validados por la app.
> No hay fallback: si falta `VECTOR_DATABASE_URL`, solo la funcionalidad vectorial falla (error `VECTOR_DATABASE_NOT_CONFIGURED`).

---

## 3 · ¿Cómo se crean las tablas? (dos mecanismos, en el arranque)

El arranque (`app/main.py`, `lifespan`, 6 pasos) prepara el esquema en dos vías:

1. **`create_all` controlado** — paso **1/6** (`scripts/crear_tablas.py`): crea/verifica las tablas **base** cuyos modelos NO están en
   `TABLAS_SIN_DDL_AUTOMATICO`:
   `usuarios`, `sesiones`, `tokens_recuperacion`, `empresas`, `auditoria`.
   (Se crean **una a una**, en orden de dependencias, con plazos de conexión/sentencia/bloqueo.)

2. **Migraciones versionadas** (`app/migraciones/`, corre dentro de `iniciar_ingesta`): crean el resto, porque tocan esquemas compartidos y
   requieren aprobación versionada:
   - **Transaccional** (`DATABASE_URL`): `documentos` (0001+0002), `operaciones_ingesta` (0003), `analisis_gri_*` (0004).
   - **Vectorial** (`VECTOR_DATABASE_URL`): `fragmentos_documento` + vista `fragmentos_consultables` (v0001), `cierres_documento` (v0002).
   - Tabla de control del motor: **`igualab_migraciones`** (version, nombre, checksum, origen, aplicada_en).

> Resultado en pgAdmin: **14 objetos de esquema** (11 tablas transaccionales + 2 vectoriales + 1 vista) **+ `igualab_migraciones`**.

---

## 4 · Variables de conexión (formato real)

De `app/core/config.py` y `.env.example` (los valores reales viven en el `.env` del servidor, **nunca en el repo**):

```env
# SQLAlchemy async exige el prefijo postgresql+asyncpg://
DATABASE_URL=postgresql+asyncpg://usuario:password@host:5432/base_relacional
VECTOR_DATABASE_URL=postgresql+asyncpg://usuario:password@host:5432/base_vectorial
```

Descomposición de la URL (útil para pgAdmin):

| Parte | Ejemplo | Campo en pgAdmin |
|---|---|---|
| esquema+driver | `postgresql+asyncpg` | (solo Python; en pgAdmin se ignora el `+asyncpg`) |
| usuario | `usuario` | **Username** |
| password | `password` | **Password** |
| host | `host` | **Host name/address** |
| puerto | `5432` | **Port** |
| base | `base_relacional` | **Database** |

---

## 5 · Conectar pgAdmin para ver las tablas

**Requisito:** pgAdmin es un cliente PostgreSQL estándar; **no** entiende el sufijo `+asyncpg` de la URL de Python. Se conecta con los
campos por separado (host/port/db/user/password), tomados del `.env` real del servidor.

### 5.1 Alta del servidor en pgAdmin
1. `Object → Register → Server…`
2. **General → Name:** `Igualab Transaccional` (y otro para `Igualab Vectorial`).
3. **Connection:**
   - **Host name/address:** host del `.env` (servidor on-premise).
   - **Port:** `5432` (por defecto).
   - **Maintenance database:** `postgres` (o la propia base).
   - **Username / Password:** del `.env`.
   - (Si el servidor exige TLS, pestaña **SSL**: `SSL mode = require`.)
4. Guardar → **Databases → (la base) → Schemas → public → Tables**.

### 5.2 Qué verás
- **Transaccional** (`base_relacional`): `usuarios`, `sesiones`, `tokens_recuperacion`, `empresas`, `auditoria`, `documentos`,
  `operaciones_ingesta`, `analisis_gri_control`, `analisis_gri_estados`, `analisis_gri_historial`, `analisis_gri_validaciones`,
  `igualab_migraciones`.
- **Vectorial** (`base_vectorial`): `fragmentos_documento` (columna `embedding vector(1536)`), la **vista** `fragmentos_consultables`,
  `cierres_documento`, `igualab_migraciones`. Verifica la extensión: `SELECT * FROM pg_extension WHERE extname='vector';`

> ⚠️ Si entras a la base **transaccional** buscando los fragmentos, no están: el RAG vive en la **vectorial**.

### 5.3 Si no ves tablas (aún no se crearon)
El esquema se crea **al arrancar el backend**. Si la base está vacía:
- Levanta el backend (dispara `lifespan`: `crear_tablas` + migraciones), **o**
- Ejecuta manualmente la creación de tablas base: `python -m scripts.crear_tablas` (las migraciones de ingesta/GRI corren en el arranque).

---

## 6 · Dónde corre la base (on-premise)

- `docker-compose.yml` de `BCK-IGUALAB` **solo** define el servicio **backend** (red externa `proxy_net`). La **PostgreSQL es externa**
  (servidor on-premise de la universidad), por eso `DATABASE_URL`/`VECTOR_DATABASE_URL` apuntan a `host:5432` fuera del compose.
- El **ambiente** (`development` / `qa` / `uat`) se deriva de `APP_ENV` y determina el **prefijo de los originales** en MinIO y el filtrado
  por ambiente de documentos/operaciones/consultas (columna `ambiente` en las tablas).

---

## 7 · Seguridad

- El `.env` real (con usuario/password/host) **NO se versiona** (`.gitignore`). En el repo solo está `.env.example` con placeholders.
- Los errores de BD del motor nunca exponen la URL ni credenciales (solo códigos/SQLSTATE).
- No compartir capturas de pgAdmin con la cadena de conexión visible.

---

## 8 · Trazabilidad
- Motor ORM: `app/core/database.py`, `app/core/database_vectorial.py`.
- Creación: `scripts/crear_tablas.py` (`TABLAS_SIN_DDL_AUTOMATICO`) · `app/migraciones/{motor,catalogo}.py` + `transaccional/*.sql` + `vectorial/*.sql`.
- Diccionario de datos as-built: [`FASE 1/02-Arquitectura-de-Solucion/03-Diccionario-de-Datos.md`](../FASE%201/02-Arquitectura-de-Solucion/03-Diccionario-de-Datos.md).
- Auditoría de código: [`MEJORAS-A&D/AUDITORIA-COMPLETA-CODIGO-2026-10.md`](../MEJORAS-A&D/AUDITORIA-COMPLETA-CODIGO-2026-10.md).
