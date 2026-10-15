# 03 · Diccionario de Datos — FASE 1 · **AS-BUILT (código = fuente de verdad)**

> **Estado:** ✅ **ACTUALIZADO 2026-10-14** tras `pull` de `development` ([Auditoría Completa de Código](../../MEJORAS-A&D/AUDITORIA-COMPLETA-CODIGO-2026-10.md)).
> **Fuente única:** `06-Desarrollo/BCK-IGUALAB` @ `78e614a` (modelos `app/models/*.py` + migraciones `app/migraciones/**/*.sql`). Conteo de atributos y tipos verificados directamente contra el ORM y el SQL.
> **Regla de diseño (acordada con el PO):** **ninguna tabla supera 20 atributos**. La tabla `documentos` (37 atributos) es la excepción actual y está 🔴 **marcada para partición** (ver §7 — rediseño aprobado-pendiente).
> **2 bases PostgreSQL 16 + pgvector:** transaccional (`DATABASE_URL`) y vectorial (`VECTOR_DATABASE_URL`). **Sin claves foráneas físicas entre bases** (referencias lógicas UUID validadas por la app).
> Formato por ficha: **Campo · Tipo de Dato · Descripción · NULL**.

> ⚠️ **Versión anterior:** el diseño previo (13 tablas: `gri_analisis`, `sanciones`, `catalogo_gri` como tabla, `consultas_asistente`, `reportes_prospeccion`…) **fue reemplazado por la implementación real**. Consulta la auditoría §3 para el mapeo de la brecha.

---

## 📊 Inventario real (14 tablas)

| # | Tabla | Base | Atributos | Origen | Estado |
|---|---|---|---:|---|---|
| 1 | `usuarios` | transaccional | 9 | `create_all` | ✅ |
| 2 | `sesiones` | transaccional | 5 | `create_all` | ✅ |
| 3 | `tokens_recuperacion` | transaccional | 6 | `create_all` | ✅ |
| 4 | `empresas` | transaccional | 5 | `create_all` | ✅ |
| 5 | `auditoria` | transaccional | 5 | `create_all` | ✅ |
| 6 | **`documentos`** | transaccional | **37** | migración 0001+0002 | 🔴 **NO VIABLE → §7** |
| 7 | `operaciones_ingesta` | transaccional | 12 | migración 0003 | ✅ |
| 8 | `analisis_gri_control` | transaccional | 6 | migración 0004 | ✅ |
| 9 | `analisis_gri_estados` | transaccional | 12 | migración 0004 | ✅ |
| 10 | `analisis_gri_historial` | transaccional | 13 | migración 0004 | ✅ |
| 11 | `analisis_gri_validaciones` | transaccional | 13 | migración 0004 | ✅ |
| 12 | `fragmentos_documento` | vectorial | **21** | migración v0001 | 🟡 §7.4 (→ 17) |
| 13 | `fragmentos_consultables` | vectorial | (vista 20) | migración v0001 | ✅ Vista RAG |
| 14 | `cierres_documento` | vectorial | 3 | migración v0002 | ✅ |

Infraestructura: `igualab_migraciones` (5 cols: `version, nombre, checksum, origen, aplicada_en`) — registro del motor propio de migraciones.

---

## 1 · IDENTIDAD Y ACCESO

### Tabla: `usuarios`
Descripción: usuarios de la plataforma (fase 1: 1 SuperAdmin + 2 Administradores). Roles cerrados por ENUM.

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador único (gen_random_uuid). | NO |
| nombre | VARCHAR(200) | Nombre completo. | NO |
| correo | VARCHAR(255) | Correo único case-insensitive (índice funcional `lower(correo)`). | NO |
| password_hash | VARCHAR(255) | Hash bcrypt de la contraseña (nunca en claro). | NO |
| rol | rol_usuario (ENUM) | `superadmin` \| `administrador`. UNIQUE parcial → un solo SuperAdmin (RN-002). | NO |
| habilitado | BOOLEAN | true = puede operar (RN-005). | NO |
| intentos_fallidos | INTEGER | Contador de logins fallidos (RN-012). | NO |
| bloqueado_hasta | TIMESTAMPTZ | Bloqueo temporal tras 5 intentos (RN-012). | SÍ |
| creado_en | TIMESTAMPTZ | Fecha de creación. | NO |

⚠️ **Nota de implementación:** `RolUsuario.SUPERADMIN = "superadmin"` pero SQLAlchemy persiste el *name* («SUPERADMIN») y el índice parcial usa `rol = 'SUPERADMIN'`. Unificar nombre/valor (pendiente, auditoría §5.6).

### Tabla: `sesiones`
Descripción: sesiones explícitas; el JWT referencia `jti` y la app valida `revocada=false` en cada petición (expiración por inactividad 2 h).

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador de la sesión (jti del JWT). | NO |
| usuario_id | UUID (FK) | → usuarios.id (ON DELETE CASCADE). | NO |
| creada_en | TIMESTAMPTZ | Inicio de la sesión. | NO |
| ultima_actividad | TIMESTAMPTZ | Última petición (idle de sesión). | NO |
| revocada | BOOLEAN | true = inválida (logout o deshabilitación — RN-005). | NO |

### Tabla: `tokens_recuperacion`
Descripción: token de recuperación de contraseña de un solo uso; se persiste su hash.

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador del token. | NO |
| usuario_id | UUID (FK) | → usuarios.id. | NO |
| token_hash | VARCHAR(255) (UNIQUE) | Hash del token (nunca el token en claro). | NO |
| expira_en | TIMESTAMPTZ | Caducidad. | NO |
| usado | BOOLEAN | Un solo uso; al usarse revoca sesiones del usuario. | NO |
| creado_en | TIMESTAMPTZ | Fecha de creación. | NO |

---

## 2 · EMPRESAS Y AUDITORÍA

### Tabla: `empresas`
Descripción: catálogo de empresas analizables. Sector cerrado a 3 valores (Minería, Petróleo y Gas, Energía) mediante ENUM `sector_empresa`.

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador único. | NO |
| nombre | VARCHAR(200) | Nombre comercial/razón social; único. | NO |
| sector | sector_empresa (ENUM) | `MINERIA` \| `PETROLEO` \| `ENERGIA` (RN-015). | NO |
| activa | BOOLEAN | false = no seleccionable en ingesta/análisis (default true). | NO |
| creado_en | TIMESTAMPTZ | Fecha de creación. | NO |

### Tabla: `auditoria`
Descripción: bitácora de eventos sensibles (append-only por convención de la app).

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador del evento. | NO |
| usuario_id | UUID (FK) | Usuario implicado (NULL en eventos anónimos). | SÍ |
| tipo_evento | tipo_evento_auditoria (ENUM) | `Inicio de sesión` \| `Cambio de rol` \| `Ingesta de datos` \| `Rechazo de documento` \| `Generación de reporte` \| `Descarga`. | NO |
| detalle | VARCHAR(500) | Contexto del evento (texto). | NO |
| fecha_hora_utc | TIMESTAMPTZ | Fecha/hora UTC (presentación America/Lima solo en UI — RNF-024). | NO |

⚠️ **Gap FE↔BE:** el backend almacena auditoría pero **no la expone por HTTP** (no existe `GET /auditoria`). La página de Auditoría del frontend es mock.

---

## 3 · INGESTA DE DOCUMENTOS

### 🔴 Tabla: `documentos` — 37 ATRIBUTOS · NO VIABLE · ver §7 (rediseño)

Descripción actual: archivo `.md` ingestado + estado del pipeline + almacenamiento + compensación + progreso + publicación vectorial (6 responsabilidades mezcladas).

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador del documento. | NO |
| ambiente | VARCHAR(32) | Entorno (dev/qa/uat/prod). | NO |
| empresa_id | UUID (FK lógica) | → empresas.id (RN-022). | NO |
| anio | INTEGER | Año del documento (CHECK ≥ 2000). | NO |
| tipo | tipo_documento (ENUM) | `MEMORIA_ANUAL` \| `REPORTE_SOSTENIBILIDAD_GRI`. | NO |
| sector | sector_empresa (ENUM) | Sector copiado de la empresa (`MINERIA` \| `PETROLEO` \| `ENERGIA`, filtro RAG). | NO |
| nombre_archivo | VARCHAR(255) | Nombre del `.md`. | NO |
| sha256 | CHAR(64) | Huella anti-duplicado (RNF-011). | NO |
| tamano_bytes | BIGINT | Tamaño real (CHECK ≤ 50 MB — RN-015). | NO |
| usuario_id | UUID (FK) | → usuarios.id (quien ingestó). | NO |
| creado_en | TIMESTAMPTZ | Fecha de creación. | NO |
| clave_original | VARCHAR(512) (UNIQUE) | Clave del objeto en MinIO/S3. | NO |
| version_id_original | TEXT | Versión exacta del objeto en S3. | SÍ |
| almacenamiento_intentado_en | TIMESTAMPTZ | Último intento de subida. | SÍ |
| original_almacenado_en | TIMESTAMPTZ | Subida confirmada. | SÍ |
| estado_procesamiento | estado_procesamiento (ENUM) | Estado de la máquina de estados. | NO |
| resultado_analisis | resultado_analisis (ENUM) | Clasificación del análisis. | SÍ |
| completado_en | TIMESTAMPTZ | Final OK. | SÍ |
| motivo_fallo | VARCHAR(64) | Motivo exacto del fallo. | SÍ |
| fallido_en | TIMESTAMPTZ | Final KO. | SÍ |
| estado_compensacion | estado_compensacion (ENUM) | Estado de la compensación. | NO |
| compensacion_intentos | INTEGER | Reintentos de compensación. | NO |
| ultimo_error_compensacion | VARCHAR(64) | Último error. | SÍ |
| compensada_en | TIMESTAMPTZ | Compensación terminada. | SÍ |
| ejecucion_token | UUID | Token de propiedad de la ejecución. | NO |
| ejecucion_vigente_hasta | TIMESTAMPTZ | Vigencia del token (latido). | NO |
| reserva_activa | BOOLEAN | Reserva vigente. | NO |
| analisis | JSONB | Resultado completo GRI + sanciones (`a_dict()`). | SÍ |
| etapa_actual | VARCHAR(32) | Etapa del pipeline (default `RESERVADO`). | NO |
| fragmentos_procesados | INTEGER | Progreso de fragmentación. | NO |
| fragmentos_total | INTEGER | Total estimado de fragmentos. | SÍ |
| progreso_actualizado_en | TIMESTAMPTZ | Latido de progreso. | NO |
| advertencias | JSONB | Advertencias del pipeline (default `[]`). | NO |
| vector_escritura_intentada_en | TIMESTAMPTZ | Último intento de escritura vectorial. | SÍ |
| vector_publicado_en | TIMESTAMPTZ | Publicación vectorial confirmada. | SÍ |
| vector_publicacion_intentos | INTEGER | Reintentos de publicación. | NO |
| vector_ultimo_error | VARCHAR(64) | Último error de publicación. | SÍ |

Restricciones: **20 CHECK** + 2 índices únicos parciales (`uq_documentos_sha256_activo` y `uq_documentos_empresa_anio_tipo_activo`, ambos `WHERE reserva_activa`). Creada por migración `0001` (27 col) y ampliada por `0002` (+10 col). **→ PARTICIÓN OBLIGATORIA en §7.**

### Tabla: `operaciones_ingesta` — 12 atributos ✅
Descripción: operación de carga ≠ documento (permite `operacion_id` antes de subir). Filtrada por ambiente dentro del SQL.

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador de la operación. | NO |
| ambiente | VARCHAR(32) | Entorno. | NO |
| usuario_id | UUID (FK) | → usuarios.id. | NO |
| estado | VARCHAR(16) | Estado PROPIO de la operación: `CREADA` \| `EN_CARGA` \| `CON_DOCUMENTO` \| `RECHAZADA` (el estado público se deriva de este + el documento). | NO |
| documento_id | UUID | Documento resultante (UNIQUE parcial). | SÍ |
| creada_en | TIMESTAMPTZ | Creación de la operación. | NO |
| carga_iniciada_en | TIMESTAMPTZ | Inicio de la carga. | SÍ |
| carga_vigente_hasta | TIMESTAMPTZ | Vigencia de la carga. | SÍ |
| actualizada_en | TIMESTAMPTZ | Última actualización. | NO |
| codigo_error | VARCHAR | Código de error estable. | SÍ |
| mensaje_error | TEXT | Mensaje de error. | SÍ |
| estado_http | INTEGER | Estado HTTP asociado. | SÍ |

---

## 4 · ANÁLISIS GRI (Módulo 5)

Modelo actual: **4 tablas** (sustituyen al diseño anterior `gri_analisis` + `sanciones`). El detalle del análisis por documento vive en `documentos.analisis` (JSONB); aquí se persiste el **estado humano** y el **control de versiones**.

### Tabla: `analisis_gri_control` — 6 atributos ✅
Descripción: control optimista por (ambiente, empresa, año). PK compuesta.

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| ambiente | VARCHAR(32) | Entorno (PK compuesta). | NO |
| empresa_id | UUID (FK) | → empresas.id (PK compuesta). | NO |
| anio | INTEGER | Año (PK compuesta, CHECK ≥ 2000). | NO |
| version | INTEGER | Versión del análisis (bloqueo optimista, CHECK ≥ 0). | NO |
| creado_en | TIMESTAMPTZ | Creación. | NO |
| actualizado_en | TIMESTAMPTZ | Última actualización. | NO |

### Tabla: `analisis_gri_estados` — 12 atributos ✅
Descripción: estado humano asignado por fila GRI (identidad = código + edición).

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador de la fila. | NO |
| ambiente | VARCHAR(32) | Entorno. | NO |
| empresa_id | UUID (FK) | → empresas.id. | NO |
| anio | INTEGER | Año. | NO |
| identidad | VARCHAR(48) | Identidad GRI (p. ej. `305:2016`). | NO |
| codigo | VARCHAR(3) | Código GRI (p. ej. `305`). | NO |
| edicion | VARCHAR(4) | Edición (`2016`). | SÍ |
| identidad_tipo | VARCHAR(24) | `EDICION_RESUELTA` \| `EDICION_AMBIGUA` \| `EDICION_NO_CATALOGADA`. | NO |
| estado | VARCHAR(16) | `OK` \| `BAJA_SUSTANCIA` \| `SUB_REPORTADO` (RN-029). | NO |
| version | INTEGER | Versión (CHECK ≥ 1). | NO |
| asignado_por | UUID (FK) | → usuarios.id. | NO |
| asignado_en | TIMESTAMPTZ | Fecha de asignación. | NO |

Restricciones: UNIQUE (ambiente, empresa_id, anio, identidad).

### Tabla: `analisis_gri_historial` — 13 atributos ✅
Descripción: histórico append-only de cambios de estado (solo inserción).

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador del cambio. | NO |
| ambiente | VARCHAR(32) | Entorno. | NO |
| empresa_id | UUID (FK) | → empresas.id. | NO |
| anio | INTEGER | Año. | NO |
| identidad | VARCHAR(48) | Identidad GRI. | NO |
| codigo | VARCHAR(3) | Código GRI. | NO |
| edicion | VARCHAR(4) | Edición. | SÍ |
| identidad_tipo | VARCHAR(24) | Tipo de identidad. | NO |
| estado_anterior | VARCHAR(16) | Estado previo (NULL = primera asignación). | SÍ |
| estado_nuevo | VARCHAR(16) | Estado nuevo (≠ anterior — CHECK). | NO |
| usuario_id | UUID (FK) | → usuarios.id. | NO |
| cambiado_en | TIMESTAMPTZ | Fecha del cambio. | NO |
| version_analisis | INTEGER | Versión del análisis al cambiar. | NO |

### Tabla: `analisis_gri_validaciones` — 13 atributos ✅
Descripción: validación del análisis por el Administrador (habilita reporte de prospección).

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador de la validación. | NO |
| ambiente | VARCHAR(32) | Entorno. | NO |
| empresa_id | UUID (FK) | → empresas.id. | NO |
| anio | INTEGER | Año. | NO |
| numero | INTEGER | Número de validación. | NO |
| version_estados | INTEGER | Versión de estados validada. | NO |
| huella_documentos | VARCHAR | Huella de los documentos del análisis (vigencia). | NO |
| documentos | JSONB | Snapshot de documentos. | NO |
| estados | JSONB | Snapshot de estados. | NO |
| puntaje_suma | INTEGER | Suma del puntaje ESG. | NO |
| puntaje_filas | INTEGER | Filas evaluables. | NO |
| validado_por | UUID (FK) | → usuarios.id. | NO |
| validado_en | TIMESTAMPTZ | Fecha de validación. | NO |

---

## 5 · BASE VECTORIAL (pgvector · `VECTOR_DATABASE_URL`)

### 🔴 Tabla: `fragmentos_documento` — 21 atributos 🟡 (ver §7.4 → 17)
Descripción: fragmentos con embedding para búsqueda semántica; núcleo del RAG.

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador del fragmento. | NO |
| ambiente | VARCHAR(32) | Entorno. | NO |
| documento_id | UUID | Referencia lógica → documentos.id (sin FK entre bases). | NO |
| indice | INTEGER | Posición en el documento (UNIQUE con ambiente+documento). | NO |
| empresa_id | UUID | Copiado del documento (filtro RAG, sin JOIN entre bases). | NO |
| anio | INTEGER | Copiado del documento (CHECK ≥ 2000). | NO |
| tipo | VARCHAR(64) | Copiado del documento. | NO |
| sector | VARCHAR(64) | Copiado del documento. | NO |
| texto_literal | TEXT | Texto literal del fragmento (= fin − inicio). | NO |
| contexto | TEXT | Contexto (encabezados de sección). | NO |
| inicio | INTEGER | Posición inicial en el documento original. | NO |
| fin | INTEGER | Posición final. | NO |
| continuacion | BOOLEAN | true = continúa en el siguiente fragmento. | NO |
| ruta_encabezados | TEXT[] | Ruta de encabezados markdown (llave de cita). | NO |
| embedding | VECTOR(1536) | Vector (Cohere embed-v4.0). | NO |
| embedding_proveedor | TEXT | Proveedor del embedding. | NO |
| embedding_modelo | TEXT | Modelo usado. | NO |
| embedding_dimension | SMALLINT | Dimensión (CHECK = 1536). | NO |
| publicado | BOOLEAN | false = no visible en RAG. | NO |
| publicado_en | TIMESTAMPTZ | Fecha de publicación (coherente con `publicado`). | SÍ |
| creado_en | TIMESTAMPTZ | Fecha de creación. | NO |

Restricciones: **13 CHECK** + UNIQUE (ambiente, documento_id, indice). **Sin índice vectorial** (búsqueda exacta por coseno — decisión declarada en el SQL).

### Vista: `fragmentos_consultables` ✅
Única vía de lectura del RAG (excluye fragmentos no publicados). 20 columnas expuestas (todas menos `publicado`).

### Tabla: `cierres_documento` — 3 atributos ✅
Descripción: cierre lógico que impide escrituras tardías tras compensar.

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| ambiente | VARCHAR(32) | Entorno (PK compuesta). | NO |
| documento_id | UUID | Documento (PK compuesta). | NO |
| cerrado_en | TIMESTAMPTZ | Fecha de cierre. | NO |

---

## 6 · Catálogos y módulos aún NO implementados

| Concepto | Diseño anterior | Estado real |
|---|---|---|
| `catalogo_gri` (tabla) | Catálogo precargado GRI | 📄 **Archivo versionado** `app/services/ingesta/datos/catalogo_gri.json` (**48 entradas · 44 códigos únicos**, versión `2026-10-07.2`) — no es tabla. ⚠️ El JSON declara que **no** es el «catálogo corporativo de 40 códigos»: brecha abierta con **RN-027/RNF-026** (que citan 40). |
| `sanciones` (tabla) | Sanciones por documento | 📄 Dentro de `documentos.analisis` (JSONB) + detector `deteccion_sanciones.py` |
| `consultas_asistente` + `consulta_citas` | RAG/chat con citas | ❌ **No implementadas** — Asistente del frontend es mock |
| `reportes_prospeccion` | PDFs inmutables | ❌ **No implementada** — Reportes/Descargas son mock (`window.print()`) |
| Exposición de auditoría | `GET /auditoria` | ❌ Solo escritura interna (`app/audit.py`) |

---

## 7 · 🔧 REDISEÑO PROPUESTO — máximo 20 atributos por tabla

> **Objetivo:** ninguna tabla supere 20 atributos. Fuente: [Auditoría §4](../../MEJORAS-A&D/AUDITORIA-COMPLETA-CODIGO-2026-10.md).
> **Estado:** ⏳ **PENDIENTE DE APROBACIÓN DEL PO** (recomendado: migración 0005 antes de datos en producción).

### 7.1 `documentos` (37) → 4 tablas

```
documentos (13)                    ← identidad y contenido
├── documentos_almacenamiento (8)  ← MinIO/S3
├── documentos_procesamiento (13)  ← máquina de estados + progreso
├── documentos_compensacion (9)    ← reintento y compensación
└── documentos_vector_publicacion (8) ← publicación vectorial
```

#### `documentos` — identidad y contenido (**13 atributos**)

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| id | UUID (PK) | Identificador del documento. | NO |
| ambiente | VARCHAR(32) | Entorno. | NO |
| empresa_id | UUID (FK) | → empresas.id. | NO |
| anio | INTEGER | Año (CHECK ≥ 2000). | NO |
| tipo | tipo_documento (ENUM) | Tipo de documento. | NO |
| sector | VARCHAR(64) | Sector (filtro RAG). | NO |
| nombre_archivo | VARCHAR(255) | Nombre del `.md`. | NO |
| sha256 | CHAR(64) UNIQUE | Huella anti-duplicado. | NO |
| tamano_bytes | BIGINT | Tamaño (CHECK ≤ 50 MB). | NO |
| usuario_id | UUID (FK) | → usuarios.id. | NO |
| creado_en | TIMESTAMPTZ | Fecha de creación. | NO |
| analisis | JSONB | Resultado GRI + sanciones (contenido, no esquema). | SÍ |
| advertencias | JSONB | Advertencias del pipeline. | SÍ |

#### `documentos_almacenamiento` — MinIO/S3 (**8 atributos**)

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| documento_id | UUID (PK/FK) | → documentos.id (1:1). | NO |
| clave_original | TEXT | Clave del objeto en el bucket. | SÍ |
| version_id_original | TEXT | Versión exacta del objeto. | SÍ |
| almacenamiento_intentado_en | TIMESTAMPTZ | Último intento de subida. | SÍ |
| original_almacenado_en | TIMESTAMPTZ | Subida confirmada. | SÍ |
| almacenamiento_error | TEXT | Último error de almacenamiento. | SÍ |
| sha256_verificado | BOOLEAN | Verificación post-subida. | NO |
| creado_en | TIMESTAMPTZ | Alta del registro. | NO |

#### `documentos_procesamiento` — máquina de estados + progreso (**13 atributos**)

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| documento_id | UUID (PK/FK) | → documentos.id (1:1). | NO |
| estado_procesamiento | estado_procesamiento (ENUM) | Estado actual. | NO |
| resultado_analisis | resultado_analisis (ENUM) | Clasificación del análisis. | SÍ |
| etapa_actual | VARCHAR(32) | Etapa del pipeline. | NO |
| fragmentos_procesados | INTEGER | Progreso. | NO |
| fragmentos_total | INTEGER | Total estimado. | SÍ |
| progreso_actualizado_en | TIMESTAMPTZ | Latido de progreso. | NO |
| completado_en | TIMESTAMPTZ | Final OK. | SÍ |
| fallido_en | TIMESTAMPTZ | Final KO. | SÍ |
| motivo_fallo | TEXT | Motivo exacto del fallo. | SÍ |
| ejecucion_token | UUID | Token de propiedad de la ejecución. | SÍ |
| ejecucion_vigente_hasta | TIMESTAMPTZ | Vigencia del token. | SÍ |
| reserva_activa | BOOLEAN | Reserva vigente. | NO |

#### `documentos_compensacion` — reintento y compensación (**9 atributos**)

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| documento_id | UUID (PK/FK) | → documentos.id (1:1). | NO |
| estado_compensacion | estado_compensacion (ENUM) | Estado de la compensación. | NO |
| compensacion_intentos | INTEGER | Reintentos. | NO |
| ultimo_error_compensacion | TEXT | Último error. | SÍ |
| compensada_en | TIMESTAMPTZ | Compensación terminada. | SÍ |
| pendiente_minio | BOOLEAN | Falta limpiar objeto. | NO |
| pendiente_vectorial | BOOLEAN | Falta limpiar fragmentos. | NO |
| siguiente_intento_en | TIMESTAMPTZ | Backoff del barrido. | SÍ |
| actualizado_en | TIMESTAMPTZ | Última actualización. | NO |

#### `documentos_vector_publicacion` — publicación vectorial (**8 atributos**)

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| documento_id | UUID (PK/FK) | → documentos.id (1:1). | NO |
| vector_escritura_intentada_en | TIMESTAMPTZ | Último intento. | SÍ |
| vector_publicado_en | TIMESTAMPTZ | Publicación confirmada. | SÍ |
| vector_publicacion_intentos | INTEGER | Reintentos. | NO |
| vector_ultimo_error | TEXT | Último error. | SÍ |
| fragmentos_publicados | INTEGER | Contador publicado. | NO |
| estado | VARCHAR(32) | `pendiente` \| `publicado` \| `fallido`. | NO |
| actualizado_en | TIMESTAMPTZ | Última actualización. | NO |

### 7.2 Beneficios

- Cada tabla ≤20 atributos, **1 responsabilidad por tabla**.
- `documento_service.py` (1.374 lín) se parte en servicios acotados.
- Migraciones futuras tocan una tabla pequeña, no una de 37 columnas.
- Compatibilidad: crear vista `documentos_completo` (JOIN) para las consultas actuales.

### 7.3 Nota sobre JSONB

`documentos.analisis` es **contenido** (JSONB), no esquema: no cuenta para el límite de 20 columnas escalares. Se mantiene en `documentos` por atomicidad (snapshot atómico del análisis). Si crece, extraer a `documentos_analisis` (3 cols).

### 7.4 Ajuste de `fragmentos_documento` (21 → 17)

Mover a tabla satélite `fragmentos_embeddings` (**5 atributos**):

| Campo | Tipo de Dato | Descripción | NULL |
|---|---|---|---|
| fragmento_id | UUID (PK/FK) | → fragmentos_documento.id. | NO |
| embedding_proveedor | TEXT | Proveedor. | NO |
| embedding_modelo | TEXT | Modelo. | NO |
| embedding_dimension | SMALLINT | Dimensión (1536). | NO |
| creado_en | TIMESTAMPTZ | Fecha. | NO |

`fragmentos_documento` conserva `embedding VECTOR(1536)` y queda en **17 atributos**. La búsqueda `buscar_similares` mantiene rendimiento con `JOIN` dentro de la misma base vectorial.

---

## Reglas de lectura del diccionario
1. **AS-BUILT:** refleja lo implementado en código, no el diseño deseado. Ante discrepancia, manda el código.
2. El desglose físico (CHECKs, índices, firmas de migración) está en `02-Base-de-Datos-Diagrama-y-Diseno.md` y en `app/migraciones/`.
3. Los módulos aún no implementados (§6) están documentados para no perder el alcance del Plan v1.2.
4. Cambios de modelo → actualizar este documento **en el mismo PR** que la migración.
