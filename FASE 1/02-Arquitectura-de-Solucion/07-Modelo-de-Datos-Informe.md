# MODELO DE DATOS — IGUALAB (Informe completo)

> PostgreSQL 16 + pgvector · Monolito modular · **13 tablas (2 bases: transaccional 12 + vectorial 1) — modelo de destino**
> Alineado a la arquitectura de solución por capas (`arquitecturasolution.jpeg`, capas 6–7) y al A&D V2 (LaTeX) (fuente única de RN/RF/RNF).
> Norma del curso: **GES/GAP** (modelo conceptual → modelo lógico → modelo físico semántico).

---

# 1 · MODELO DE DATOS

## 1.1 Resumen del modelo

| Propiedad         | Valor                                                                                                                                                                           |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Motor             | **PostgreSQL 16 + extensión pgvector** — 2 bases: transaccional (12 tablas) + vectorial (1 tabla) |
| Driver / acceso   | **Python 3.13 · FastAPI · SQLAlchemy Async + AsyncPG**                                                                                                                        |
| Arquitectura      | **Monolito modular** · **2 bases PostgreSQL 16**: transaccional (12 tablas, `DATABASE_URL`) + vectorial (1 tabla `fragmentos_documento`, `VECTOR_DATABASE_URL`);**sin claves foráneas físicas entre bases** (referencias lógicas UUID validadas por la app) |
| Total de tablas   | **13** (transaccional 12 · vectorial 1) |
| Bases de datos    | **2 PostgreSQL 16**: transaccional (`DATABASE_URL`) · vectorial (`VECTOR_DATABASE_URL`, tabla `fragmentos_documento`); sin claves foráneas físicas entre bases (UUID lógicos validados por la app) |
| Origen del diseño | ERD «Diagrama Entidad–Relación · IGUALAB — Modelo de Datos Depurado» entregado por el equipo, con las correcciones aplicadas tras su revisión (puntos ⚙ anotados en cada ficha) |
| Alcance retirado  | Se quitaron módulos (Configuración, catálogo de roles, medidor LLM separado) → el modelo quedó en **2 bases / 13 tablas** |

## 1.2 El modelo por dominios (6 dominios — refleja el ERD vigente)

| Dominio                | Tablas                                             | Propósito                                                                                              |
| ---------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| **IDENTIDAD Y ACCESO** | `usuarios` · `sesiones` · `tokens_recuperacion`    | Accounts of access, sesiones explícitas (JWT/sid) y recuperación de contraseña single-use.             |
| **EMPRESAS E INGESTA** | `empresas` · `documentos` · `fragmentos_documento` | Cadena de contenido fuente: catálogo de empresas, pipeline de ingesta `.md` y fragmentos vectorizados. |
| **ANÁLISIS GRI**       | `catalogo_gri` · `gri_analisis` · `sanciones`      | El estándar GRI (referencia) y la tabla única de resultados del análisis (códigos, citas, sanciones).  |
| **ASISTENTE RAG**      | `consultas_asistente` · `consulta_citas`           | Persistencia de cada consulta al RAG con sus citas · fuentes (post-verificación de IDs).               |
| **REPORTES**           | `reportes_prospeccion`                             | Entregable PDF inmutable + snapshot JSONB congelado a la fecha de emisión (en 2 bases, sin FK físicas entre ellas). |
| **AUDITORÍA**          | `auditoria`                                        | Bitácora **append-only** de eventos sensibles (solo INSERT; UTC).                                      |

## 1.3 Entidades y relaciones (modelo conceptual)

Cadena principal del negocio:

```
empresa → documento (.md) → fragmentos (vectorizados) → gri_analisis → reportes_prospeccion,
con: usuarios (quién hace qué) · auditoria (eventos sensibles) · catalogo_gri (El estándar),
     consultas_asistente + consulta_citas (Asistente RAG).
```

Relaciones (todas 1:N salvo indicación):

1. Un **usuario** abre muchas **sesiones** y crea muchos **tokens_recuperacion**.
2. Una **empresa** tiene muchos **documentos**; un **usuario** crea los documentos (`creada_por`).
3. Un **documento** se vectoriza en muchos **fragmentos_documento**; un documento produce muchas filas de **gri_analisis** y cita muchas **sanciones**.
4. Cada fila de **gri_analisis** referencia un código del **catalogo_gri** y proviene de un **fragmento** (`fragmento_id` — cita verificable).
5. Una **consulta_asistente** registra sus **citas** (`consulta_citas`) enlazadas a fragmentos.
6. Un **reporte de prospección** pertenece a una empresa (UNIQUE empresa+anho — RN-041) y congela su **snapshot** a la fecha de emisión.
7. Todo evento sensible registra **auditoria** (append-only; FK usuario/empresa NULL cuando aplica).

## 1.4 Diagrama Entidad–Relación (ERD vigente)

> ERD «Modelo de Datos Depurado» (13 tablas). El diagrama anterior `Diagrama_bd.png` queda como archivo histórico.



## 1.5 Restricciones clave (UNIQUE y reglas BD)

| Restricción | Descripción |
|---|---|
| **UNIQUE parcial en `usuarios.rol`** (`WHERE rol='superadmin'`) | Un solo Superadmin en toda la tabla — la transferencia es transacción doble atómica (RS-01). |
| **UNIQUE case-insensitive `usuarios.correo`** (índice `lower(correo)`) | Correo único de dominio autorizado (RN-007). |
| **UNIQUE `documentos.sha256`** | El mismo contenido nunca se ingesta dos veces (RNF-011). |
| **UNIQUE parcial `(empresa_id, anho, tipo)` `WHERE estado='indexado'`** | Unicidad documental por empresa/año/tipo — solo para documentos exitosos. |
| **UNIQUE `(documento_id, indice)` en `fragmentos_documento`** | Posición única del fragmento dentro del documento. |
| **UNIQUE parcial `(documento_id, gri_codigo)` en `gri_analisis`** | Una sola fila de resultados por documento/código. |
| **UNIQUE parcial `(empresa_id, anho)` en `reportes_prospeccion`** | Un solo reporte por empresa/año (RN-041). |
| **CHECK sectores cerrados en `empresas.sector`** | Minería · Petróleo y Gas · Energía (RN-015, en la BD). |
| **CHECK tamano_bytes ≤ 50 MB en `documentos`** | Límite de tamaño (RN-015). |
| **CHECK estados ENUM** | `estado_ingesta`, `estado_gri`, `estado_documental`, `tipo_evento_auditoria`. |
| **REVOKE UPDATE, DELETE en `auditoria`** | Append-only garantizado por la BD. |

## 1.6 Tablas retiradas (se quitaron módulos)

| Retirada | Justificación |
|---|---|
| `roles` | Catálogo cerrado de 2 filas — sustituido por ENUM `rol_usuario` + UNIQUE parcial en `usuarios.rol`. |
| `configuracion` | El módulo Configuración fue quitado → umbrales por variables de entorno (doc Stack §4). |
| Medidor LLM separado | El consumo diario se deriva de `consultas_asistente` (COUNT por día/modelo). |
| Histórico GRI separado | Los cambios sensibles quedan en `auditoria` (`AJUSTE_BRECHA` detalle JSONB). |
| `reporte_detalle_snapshot` | Sustituida por `contenido_snapshot` JSONB + PDF inmutable con hash. |

## 1.7 Decisiones del modelo

- **Sectores cerrados**: Minería, Petróleo y Gas, Energía (CHECK en la BD).
- **Estado GRI asignado manualmente** por el Administrador: no existe `estado_sugerido`.
- **Sanciones enlazadas al documento**; empresa y año se derivan de él (sin duplicar FKs).
- **Embeddings almacenados en `fragmentos_documento`**; la dimensión depende del modelo del proveedor (fijar en migración, p. ej. 1024).
- **Reporte consolidado en JSONB + PDF inmutable** (sin tabla normalizada de detalle).
- **Auditoría unipersonal** separada del logging técnico y con modo append-only.
- **FK de auditoría/consultas visibles** en el diagrama (líneas largas omitidas por legibilidad).

---

# 2 · DICCIONARIO DE DATOS

> Formato por ficha: **Campo · Tamaño · Tipo de Dato · Descripción · NULL** (formato del informe de referencia).

## Dominio: IDENTIDAD Y ACCESO

## Tabla: `usuarios`
Descripción: Registro de las personas que operan la plataforma (3 en fase 1: 1 Superadmin + 2 Administradores). El rol es un ENUM cerrado — sustituye a la tabla `roles` del diseño anterior; soporta el bloqueo de cuenta por intentos fallidos (RN-012).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del usuario (gen_random_uuid). | NO |
| nombre | 200 | VARCHAR | Nombre completo oficial del usuario. | NO |
| correo | 255 | VARCHAR | Correo de dominio autorizado; único case-insensitive (índice funcional lower(correo)). | NO |
| password_hash | 255 | VARCHAR | Hash bcrypt de la contraseña (RNF-002; nunca texto plano). | NO |
| rol | - | rol_usuario (ENUM) | Rol cerrado: `superadmin \| administrador` (RN-001). | NO |
| habilitado | - | BOOLEAN | Cuenta habilitada para operar (RN-005; default true). | NO |
| intentos_fallidos | - | INTEGER | Logins fallidos consecutivos — contador para el bloqueo (RN-012). | NO |
| bloqueado_hasta | - | TIMESTAMPTZ | Momento hasta el cual la cuenta queda blooeada tras 5 intentos (15 min). | SÍ |
| creado_en | - | TIMESTAMPTZ | Fecha y hora automática de creación del registro. | NO |

## Tabla: `sesiones` — **NUEVA**
Descripción: sesiones explícitas de autenticación (Capa 6 `Usuario·Sesión`); el JWT/sid referencia esta fila y cada petición valida `revocada=false` y habilitación (rol vigente — RNF-006).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único de la sesión (referenciado por el JWT/sid). | NO |
| usuario_id | 36 | UUID (FK) | Usuario de la sesión → usuarios.id (ON DELETE CASCADE). | NO |
| creada_en | - | TIMESTAMPTZ | Fecha y hora del login. | NO |
| ultima_actividad | - | TIMESTAMPTZ | Última petición de la sesión (soporte del idle definido por env var). | NO |
| revocada | - | BOOLEAN | true = sesión inválida (logout o deshabilitación de cuenta — RN-005). | NO |

## Tabla: `tokens_recuperacion` — **NUEVA**
Descripción: tokens de recuperación de contraseña de un solo uso; se guarda el **hash** del token (nunca el token en claro).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del token. | NO |
| usuario_id | 36 | UUID (FK) | Usuario destinatario → usuarios.id (ON DELETE CASCADE). | NO |
| token_hash | 255 | VARCHAR (UNIQUE, IDX) | Hash criptográfico del token. | NO |
| expira_en | - | TIMESTAMPTZ | Fecha y hora de expiración del token. | NO |
| usado | - | BOOLEAN | true = ya consumido (single-use). | NO |
| creado_en | - | TIMESTAMPTZ | Fecha y hora de emisión. | NO |

**Reglas semánticas**: expirado o ya usado → inválido. La contraseña nueva revoca todas las sesiones del usuario (RS de seguridad).

## Dominio: EMPRESAS E INGESTA

## Tabla: `empresas`
Descripción: Catálogo de empresas analizables gestionado por el Superadmin. En fase 1 no existe columna `pais` — todas las empresas cotizan en la Bolsa de Valores de Lima (Perú); el CHECK garantiza los sectores en la propia BD.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único de la empresa (gen_random_uuid). | NO |
| nombre | 200 | VARCHAR | Razón social / nombre comercial; único. | NO |
| sector | - | VARCHAR (CHECK) | Sector cerrado en vigencia: Minería \| Petróleo y Gas \| Energía (RN-015). | NO |
| activo | - | BOOLEAN | false = no seleccionable en ingesta/análisis (default true). | NO |
| creado_en | - | TIMESTAMPTZ | Fecha y hora de creación del registro. | NO |

## Tabla: `documentos`
Descripción: Cada archivo `.md` de memoria anual o reporte de sostenibilidad, con su estado del pipeline síncrono (RF-015). El sha256 es el borde anti-duplicado de contenido y `tamano_bytes` con CHECK garantiza el límite ≤ 50 MB.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del documento. | NO |
| empresa_id | 36 | UUID (FK) | Empresa de origen → empresas.id (RN-022). | NO |
| creada_por | 36 | UUID (FK) | Usuario que ingestó → usuarios.id (⌈Superadmin⌉). | NO |
| anho | 5 | SMALLINT | Año del documento; CHECK entre 2000 y 2100. | NO |
| tipo | - | VARCHAR (CHECK) | `memoria_anual \| reporte_sostenibilidad`. | NO |
| nombre_archivo | 255 | VARCHAR | Nombre del `.md`; guard: sin espacios ni mayúsculas. | NO |
| sha256 | 64 | CHAR (UNIQUE) | Huella criptográfica del archivo (RNF-011). | NO |
| tamano_bytes | - | BIGINT (CHECK ≤ 50 MB) | Tamaño real del archivo (RN-015). | NO |
| estado | - | estado_ingesta (ENUM) | `indexado \| observado \| rechazado`. | NO |
| motivo_rechazo | - | TEXT | Texto exacto del guard en rechazo/observación. | SÍ |
| creado_en | - | TIMESTAMPTZ | Fecha y hora de ingesta. | NO |

Restricciones: UNIQUE `(empresa_id, anho, tipo)` parcial `WHERE estado='indexado'` (unicidad documental de documentos exitosos). Integridad atómica (RN-026/RN-026): documento rechazado → cero fragmentos, cero análisis; sin DELETE físico (RNF-019).

## Tabla: `fragmentos_documento` (BD vectorizada — núcleo del RAG)
Descripción: Fragmentos del documento con su embedding — **base vectorial**. Es la tabla que consulta el AI Harness (Capa 5) en cada pregunta del chat y la fuente de las citas verificables.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del fragmento (antes chunk_id). | NO |
| documento_id | 36 | UUID (FK) | Documento origen → documentos.id (ON DELETE CASCADE). | NO |
| indice | - | INTEGER | Posición correlativa del fragmento dentro del documento; UNIQUE `(documento_id, indice)`. | NO |
| seccion | 500 | VARCHAR | Encabezado markdown de la sección origen — llave de la cita (RN-034). | NO |
| texto | - | TEXT | Transcripción del fragmento (sección o fila de tabla). | NO |
| embedding | (dim) | VECTOR(dim) | Vector devuelto por el servicio de embeddings **por API** del proveedor de IA; la dimensión depende del modelo (fijar en migración, p. ej. 1024). Índice **HNSW cosine**. | NO |
| metadata | (500) | JSONB | Empresa_id, año, tipo doc, fila de tabla origen y otros contextos. | NO |
| creado_en | - | TIMESTAMPTZ | Fecha y hora de indexación. | NO |

## Dominio: ANÁLISIS GRI

## Tabla: `catalogo_gri`
Descripción: **El estándar** — catálogo precargado (seed) del GRI Universal + tópicos de las series 100/200/300/400. Define el criterio objetivo del indicador (el punto "GRI ideal" explicitado por el PO); la IA no decide el estándar.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| codigo | 20 | VARCHAR (PK) | Código GRI oficial (p. ej. `GRI 403`). | NO |
| serie | 50 | VARCHAR | Serie del estándar: `100 \| 200 \| 300 \| 400`. | NO |
| tema | 200 | VARCHAR | Denominación del tema (p. ej. Seguridad y Salud). | NO |
| descripcion | - | TEXT | Descripción del indicador y su alcance. | NO |
| elementos_minimos | - | TEXT | **Checklist de elementos esperados para el estado OK** (con el PO — restaurado). | NO |
| keywords | - | TEXT[] | Palabras clave de evidencia del motor determinista (restaurado). | NO |
| version_catalogo | 30 | VARCHAR | Versión del estándar referida (RS-11). | NO |

## Tabla: `gri_analisis`
Descripción: **La tabla del análisis** — fila por documento + código GRI (empresa y año se derivan del documento). Única tabla de resultados (UNIQUE documento+código). Se puebla automáticamente al terminar la ingesta; guarda la revisión del Administrador (`validado_por`).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único de la fila de análisis. | NO |
| documento_id | 36 | UUID (FK) | Documento fuente → documentos.id (empresa/año derivables de él). | NO |
| gri_codigo | 20 | VARCHAR (FK) | Código analizado → catalogo_gri.codigo. | NO |
| fragmento_id | 36 | UUID (FK) | Fragmento fuente de la cita textual (permite verificación de la evidencia). | SÍ |
| cita_textual | - | TEXT | Transcripción textual verbatim del fragmento/documento. | NO |
| estado | - | estado_gri (ENUM) | Estado del análisis: `OK \| BAJA SUSTANCIA \| SUB-REPORTADO` — asignado **manualmente** por el Administrador (no existe `estado_sugerido`). | SÍ |
| validado_por | 36 | UUID (FK) | Administrador que asignó el estado (NULL = pendiente CU006). | SÍ |
| version_catalogo | 30 | VARCHAR | Versión del catálogo al analizar (RS-11: snapshot fiel). | NO |
| realizado_en | - | TIMESTAMPTZ | Fecha y hora del poblado automático. | NO |

Restricción: **UNIQUE parcial `(documento_id, gri_codigo)`** — una sola fila de resultados por documento/código (evita duplicados de análisis). El historial de cambios de estado se registra en `auditoria` con evento `AJUSTE_BRECHA`.

## Dominio: ASISTENTE RAG

## Tabla: `consultas_asistente` — **NUEVA**
Descripción: Cada consulta al asistente IA (módulo Asistente — RAG con citas). Medidor del free tier (RNF-027: COUNT por día/modelo vs env var `LLM_DAILY_LIMIT`).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único de la consulta. | NO |
| usuario_id | 36 | UUID (FK) | Administrador que consultó → usuarios.id. | NO |
| empresa_id | 36 | UUID (FK) | Empresa activa en el momento de la consulta (NULL = sin empresa activa). | SÍ |
| anho | 5 | SMALLINT | Año de consulta (si aplica). | SÍ |
| pregunta | - | TEXT | Pregunta del usuario. | NO |
| respuesta | - | TEXT | Respuesta generada por el asistente. | NO |
| modelo | 100 | VARCHAR | Modelo usado (p. ej. GLM-5.2 :free, respaldo). | NO |
| creado_en | - | TIMESTAMPTZ | Fecha y hora (motor del medidor). | NO |

## Tabla: `consulta_citas` — **NUEVA**
Descripción: Citas · fuentes de cada respuesta — constancia de la post-verificación de IDs citados (post-check). Cada cita debe existir en el contexto recuperado; si el LLM cita fuera del contexto, la cita no se inserta.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único de la cita. | NO |
| consulta_id | 36 | UUID (FK) | Consulta a la que pertenece → consultas_asistente.id (ON DELETE CASCADE). | NO |
| fragmento_id | 36 | UUID (FK) | Fragmento citado → fragmentos_documento.id. | NO |
| orden | - | SMALLINT | Posición de la cita en la respuesta. | NO |
| extracto | - | TEXT | Extracto textual enlazado al fragmento. | NO |

## Dominio: REPORTES

## Tabla: `reportes_prospeccion`
Descripción: Entregables PDF inmutables — `contenido_snapshot` JSONB congelado + PDF inmutable con hash.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador del reporte. | NO |
| empresa_id | 36 | UUID (FK) | Empresa reportada → empresas.id. | NO |
| generado_por | 36 | UUID (FK) | Administrador que emitió el PDF → usuarios.id. | NO |
| anho | 5 | SMALLINT | Año analizado en el PDF. | NO |
| pdf_path | 500 | VARCHAR (UNIQUE) | Ruta del PDF generado (WeasyPrint). | NO |
| sha256 | 64 | CHAR (UNIQUE) | Hash del binario generado (auditoría de integridad). | NO |
| contenido_snapshot | - | JSONB | Estado congelado al emitir: brechas con `estado_final` + **cita textual** + sanciones con montos (RS-18). | NO |
| creado_en | - | TIMESTAMPTZ | Fecha y hora de generación. | NO |

Restricciones: UNIQUE parcial `(empresa_id, anho)` — RN-041. Reglas: cero LLM en la generación (RN-041); el PDF/snapshot es fiel a su fecha (RN-042).

## Dominio: AUDITORÍA

## Tabla: `auditoria`
Descripción: Bitácora de eventos sensibles **append-only** — la BD garantiza el append-only (REVOKE UPDATE/DELETE): la app solo puede INSERT/SELECT. El historial de cambios de estado vive aquí como evento `AJUSTE_BRECHA` (campo `detalle` JSONB).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador secuencial del evento. | NO |
| usuario_id | 36 | UUID (FK) | Usuario implicado; nulo en eventos anónimos (p. ej. login fallido de correo inexistente). | SÍ |
| empresa_id | 36 | UUID (FK) | Contexto de empresa opcional (FK visible en diagrama). | SÍ |
| tipo_evento | - | tipo_evento_auditoria (ENUM) | `LOGIN \| LOGIN_FALLIDO \| CAMBIO_ROL \| INGESTA \| INGESTA_FALLIDA \| GEN_REPORTE \| AJUSTE_BRECHA \| DESCARGA`. | NO |
| detalle | - | JSONB | Contexto por evento: hash, doc_id, motivo, anterior→nuevo, resultado de la operación (corregido: era VARCHAR(500)). | NO |
| fecha_hora_utc | - | TIMESTAMPTZ | Fecha y hora UTC (RNF-024 — presentación America/Lima solo en la UI). | NO |

---

# 3 · VOLUMEN ESTIMADO

> Estimación preliminar para el escenario de fase 1 (3 usuarios; 1 organización). **Cada empresa analizable define el volumen; crece con el área.**

| Tabla                  | Filas estimadas       | Nota                                                                                           |
| ---------------------- | --------------------- | ---------------------------------------------------------------------------------------------- |
| `usuarios`             | 3                     | 1 Superadmin + 2 Administradores (acta 4 · REQ-10).                                            |
| `sesiones`             | ~3–30                 | Por cada login hasta el logout/revocación (inactiva no elimina).                               |
| `tokens_recuperacion`  | bajo                  | Uso ocasional (single-use).                                                                    |
| `empresas`             | 3-10                  | Catálogo de empresas ingestadas en fase 1 (mínimo 3 sectores).                                 |
| `documentos`           | 6–30                  | Memorias anuales y reportes de sostenibilidad por empresa/año/tipo.                            |
| `fragmentos_documento` | 3k–8k                 | ~800–1000 fragmentos por documento (filas de tabla con ~800 chars por sección).                |
| `catalogo_gri`         | 40                    | **Catálogo cerrado del estándar** (40 códigos GRI del catálogo vigente — semilla del sistema). |
| `gri_analisis`         | 40–400+               | Fila por documento/código (incluidos los OK).                                                  |
| `sanciones`            | variable (bajo–medio) | Detección por patrones configurados en los documentos.                                         |
| `consultas_asistente`  | 200/día               | Free tier — `LLM_DAILY_LIMIT` (200).                                                           |
| `consulta_citas`       | ~4 por respuesta      | k=4 (post-check constantes por IDs).                                                           |
| `reportes_prospeccion` | 1–5                   | **UN reporte por empresa/año (RN-041)**.                                                      |
| `auditoria`            | creciente             | Participación mensual si el volumen crece; fase 1 = monolito simple sin particiones.           |

---

# 4 · PENDIENTES DE IMPLEMENTACIÓN (Próximos pasos)

- [ ] Congelar diseño (acuerdo del equipo y el UNIQUE de reportes).
- ⚙ DDL físico de los dominios en **2 bases** de migración (transaccional + vectorial; fijar dimension de embeddings p. ej. `vector(1024)`, trigger del append-only en auditoría).
- **VOLUMEN ESTIMADO** se completa la carga (3 usuarios, escenario académico).
- **PROTOTIPO / DISEÑO ARQUITECTÓNICO** → prototipo (mock vivo) y el estado de la BD. documento correlato del mock vivo.
