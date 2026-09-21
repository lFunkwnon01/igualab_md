# 03 · Diccionario de Datos — FASE 1 (norma GES/GAP · completo)

> **Numeración alineada al A&D v6 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Formato por ficha: **Campo · Tamaño · Tipo de Dato · Descripción · NULL**.
> Diseño de origen: `02-Base-de-Datos-Diagrama-y-Diseno.md` · Estado: **COMPLETADO — Modelo de Datos Depurado (13 tablas)**, alineado a la arquitectura de solución por capas (`arquitecturasolution.jpeg`, capas 6–7).
> Motor: PostgreSQL 16 + pgvector (`embedding VECTOR(dim)`, índice HNSW cosine).
> Cambios vs ERD v2 (14 tablas): **quitan las fichas de** `roles` · `configuracion` · `uso_llm` · `gri_analisis_historico` · `reporte_detalle_snapshot` · **se renombra** `chunks_embeddings`→`fragmentos_documento` y `reportes_generados`→`reportes_prospeccion` · **se agregan** `sesiones` · `tokens_recuperacion` · `consultas_asistente` · `consulta_citas`.

## 1 · IDENTIDAD Y ACCESO

## Tabla: `usuarios`
Descripción: usuarios de la plataforma (3 en fase 1: 1 Superadmin + 2 Administradores). Roles cerrados por ENUM (sustituye a la tabla `roles`).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del usuario (gen_random_uuid). | NO |
| nombre | 200 | VARCHAR | Nombre completo del usuario. | NO |
| correo | 255 | VARCHAR | Correo de dominio autorizado; único case-insensitive (índice funcional lower(correo)). | NO |
| password_hash | 255 | VARCHAR | Hash bcrypt/argon2 de la contraseña (RNF-002; nunca texto plano). | NO |
| rol | - | rol_usuario (ENUM) | superadmin \| administrador. UNIQUE parcial → un solo Superadmin (RN-002). | NO |
| habilitado | - | BOOLEAN | Estado de la cuenta (true = puede operar; RN-005). | NO |
| intentos_fallidos | - | INTEGER | Contador de logins fallidos consecutivos (RN-012). | NO |
| bloqueado_hasta | - | TIMESTAMPTZ | Bloqueo temporal tras 5 intentos (15 min — RN-012). reset al reiniciar contador. | SÍ |
| creado_en | - | TIMESTAMPTZ | Fecha de creación del registro. | NO |

## Tabla: `sesiones` — **NUEVA**
Descripción: sesiones explícitas del usuario (Capa 6 `Usuario·Sesión`); la app valida `revocada=false` en cada petición.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador de la sesión; referenciado por el JWT/sid. | NO |
| usuario_id | 36 | UUID (FK) | Usuario de la sesión → usuarios.id (ON DELETE CASCADE). | NO |
| creada_en | - | TIMESTAMPTZ | Inicio de la sesión. | NO |
| ultima_actividad | - | TIMESTAMPTZ | Última petición; soporte del idle de sesión (env var). | NO |
| revocada | - | BOOLEAN | true = inválida (logout o deshabilitación — RN-005). | NO |

## Tabla: `tokens_recuperacion` — **NUEVA**
Descripción: token de recuperación de contraseña de un solo uso; se persiste su hash.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador del token. | NO |
| usuario_id | 36 | UUID (FK) | Usuario destinatario → usuarios.id. | NO |
| token_hash | 255 | VARCHAR (UNIQUE) | Hash del token (nunca el token en claro). | NO |
| expira_en | - | TIMESTAMPTZ | Caducidad del token. | NO |
| usado | - | BOOLEAN | Un solo uso. Al usarse: inválido + revoca sesiones del usuario. | NO |
| creado_en | - | TIMESTAMPTZ | Fecha de creación. | NO |

## 2 · EMPRESAS E INGESTA

## Tabla: `empresas`
Descripción: catálogo de empresas analizables (fase 1 = BVL Perú, sin `pais`).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único de la empresa. | NO |
| nombre | 200 | VARCHAR | Nombre comercial/razón social; único. | NO |
| sector | - | VARCHAR (CHECK) | Sector permitido cerrado: Minería, Petróleo y Gas, Energía (RN-015). | NO |
| activo | - | BOOLEAN | false = no seleccionable en ingesta/análisis (default true). | NO |
| creado_en | - | TIMESTAMPTZ | Fecha de creación del registro. | NO |

## Tabla: `documentos`
Descripción: cada archivo `.md` ingestado (memoria anual o reporte de sostenibilidad) con el estado del pipeline síncrono.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del documento. | NO |
| empresa_id | 36 | UUID (FK) | Empresa a la que pertenece → empresas.id (RN-022). | NO |
| creada_por | 36 | UUID (FK) | Usuario que ingestó → usuarios.id. | NO |
| anho | 5 | SMALLINT | Año del documento; CHECK entre 2000 y 2100. | NO |
| tipo | - | VARCHAR (CHECK) | memoria_anual \| reporte_sostenibilidad. | NO |
| nombre_archivo | 255 | VARCHAR | Nombre del `.md`; guard: sin espacios ni mayúsculas. | NO |
| sha256 | 64 | CHAR (UNIQUE) | Huella anti-duplicado del contenido (RNF-011). | NO |
| tamano_bytes | - | BIGINT | Tamaño real del archivo; CHECK ≤ 50 MB (RN-015 límite). | NO |
| estado | - | estado_ingesta (ENUM) | indexado \| observado \| rechazado (pipeline síncrono RF-015). | NO |
| motivo_rechazo | - | TEXT | Motivo exacto del guard en rechazo/observación. | SÍ |
| creado_en | - | TIMESTAMPTZ | Fecha de ingesta. | NO |

Restricciones: UNIQUE parcial (empresa_id, anho, tipo) WHERE estado='indexado'.

## Tabla: `fragmentos_documento` (antes `chunks_embeddings` — BD vectorizada)
Descripción: fragmentos del documento con su embedding para búsqueda semántica; núcleo del RAG.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del fragmento (antes chunk_id). | NO |
| documento_id | 36 | UUID (FK) | Documento origen → documentos.id (ON DELETE CASCADE). | NO |
| indice | - | INTEGER | Posición dentro del documento; UNIQUE (documento_id, indice). | NO |
| seccion | 500 | VARCHAR | Encabezado markdown de la sección origen (llave de la cita RN-034). | NO |
| texto | - | TEXT | Fragmento de texto (sección o fila de tabla). | NO |
| embedding | - | VECTOR(dim) índice HNSW cosine | Vector del servicio de embeddings por API del proveedor; dimensión depende del modelo (fijar p. ej. 1024). | NO |
| metadata | - | JSONB | Empresa_id, año, tipo doc, fila tabla origen y contexto de la cita. | NO |
| creado_en | - | TIMESTAMPTZ | Fecha de indexación. | NO |

## 3 · ANÁLISIS GRI

## Tabla: `catalogo_gri`
Descripción: catálogo precargado del estándar GRI (Universal + series 100/200/300/400). La IA no decide el estándar.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| codigo | 20 | VARCHAR (PK) | Código GRI oficial (p. ej. GRI 403). | NO |
| serie | 50 | VARCHAR | Serie del estándar: 100 \| 200 \| 300 \| 400. | NO |
| tema | 200 | VARCHAR | Denominación del tema (p. ej. Seguridad y Salud). | NO |
| descripcion | - | TEXT | Descripción del indicador. | NO |
| elementos_minimos | - | TEXT | Checklist de elementos esperados para el estado OK (RS-10 — restaurado). | NO |
| keywords | - | TEXT[] | Palabras clave de evidencia del motor determinista (RS-10 — restaurado). | NO |
| version_catalogo | 30 | VARCHAR | Versión del estándar GRI referida (RS-11). | NO |

## Tabla: `gri_analisis`
Descripción: **la tabla del análisis** — fila por documento + código GRI (empresa/año se derivan del documento); incluye los estados OK. Poblada al terminar la ingesta; estado asignado manualmente (CU006); el reporte hace SELECT determinista.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único de la fila de análisis. | NO |
| documento_id | 36 | UUID (FK) | Documento fuente → documentos.id. | NO |
| gri_codigo | 20 | VARCHAR (FK) | Código analizado → catalogo_gri.codigo (RN-027). | NO |
| fragmento_id | 36 | UUID (FK) | Fragmento citado → fragmentos_documento.id (permite verificación de la cita). | SÍ |
| cita_textual | - | TEXT | Cita textual extraída del fragmento/documento (verificable). | NO |
| estado | - | estado_gri (ENUM) | Asignado **manualmente**: OK \| BAJA SUSTANCIA \| SUB-REPORTADO (3 únicos — RN-029). Solo útil validado. | SÍ |
| validado_por | 36 | UUID (FK) | Administrador que validó (NULL = pendiente CU006 — RS-12). | SÍ |
| version_catalogo | 30 | VARCHAR | Versión del catálogo al analizar (RS-11 — restaurada). | NO |
| realizado_en | - | TIMESTAMPTZ | Fecha del análisis/poblado automático. | NO |

Restricciones: UNIQUE parcial (documento_id, gri_codigo) — una sola fila de resultados por doc/código. ❗ Sin `estado_sugerido` (asignación manual).
Historial: cambios de estado → `auditoria` (evento `AJUSTE_BRECHA` con detalle JSONB; sustituye a `gri_analisis_historico`).

## Tabla: `sanciones`
Descripción: sanciones identificadas en los documentos — negocio puro del reporte; siempre con cita verificable.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador de la sanción. | NO |
| documento_id | 36 | UUID (FK) | Documento que la evidencia (→ empresa y año se derivan de él — decisión del modelo). | NO |
| fragmento_id | 36 | UUID (FK) | Fragmento citado (verificable). | SÍ |
| autoridad_emisora | 255 | VARCHAR | Entidad/norma emisora de la sanción. | NO |
| monto | (14,2) | NUMERIC | Monto económico; **NULL = monto no determinado — nunca 0 por defecto** (RN-031/RN-032). | SÍ |
| moneda | 10 | VARCHAR | Código ISO de la moneda (si el monto cuantifica). | SÍ |
| cita_textual | - | TEXT | Transcripción textual de la evidencia (obligatoria — RN-038). | NO |
| creado_en | - | TIMESTAMPTZ | Fecha de registro. | NO |

## 4 · ASISTENTE RAG

## Tabla: `consultas_asistente` — **NUEVA**
Descripción: cada consulta al asistente IA (Capa 6 `ConsultaAsistente`). Sustituye a `uso_llm` como medidor del free tier (RNF-027: COUNT por día/modelo vs `LLM_DAILY_LIMIT`).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador de la consulta. | NO |
| usuario_id | 36 | UUID (FK) | Administrador que consultó → usuarios.id. | NO |
| empresa_id | 36 | UUID (FK) | Empresa activa en la consulta (NULL = sin contexto de empresa). | SÍ |
| anho | 5 | SMALLINT | Año de consulta (si aplica). | SÍ |
| pregunta | - | TEXT | Pregunta del usuario. | NO |
| respuesta | - | TEXT | Respuesta generada por el asistente. | NO |
| modelo | 100 | VARCHAR | Modelo usado (p. ej. GLM-5.2 :free, respaldo). | NO |
| creado_en | - | TIMESTAMPTZ | Fecha/hora (motor del medidor). | NO |

## Tabla: `consulta_citas` — **NUEVA**
Descripción: citas · fuentes de cada respuesta del asistente — constan la post-verificación de IDs citados (post-check). Cada cita debe existir en el contexto recuperado; si el LLM cita fuera del contexto, la cita no se inserta.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador de la cita. | NO |
| consulta_id | 36 | UUID (FK) | Consulta a la que pertenece → consultas_asistente.id (ON DELETE CASCADE). | NO |
| fragmento_id | 36 | UUID (FK) | Fragmento citado → fragmentos_documento.id. | NO |
| orden | - | SMALLINT | Posición de la cita en la respuesta. | NO |
| extracto | - | TEXT | Extracto textual citado del fragmento. | NO |

## 5 · REPORTES

## Tabla: `reportes_prospeccion`
Descripción: entregables PDF inmutables — fusiona `reportes_generados` + `reporte_detalle_snapshot` (contenido JSONB congelado).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador del reporte. | NO |
| empresa_id | 36 | UUID (FK) | Empresa reportada. | NO |
| generado_por | 36 | UUID (FK) | Administrador que generó. | NO |
| anho | 5 | SMALLINT | Año analizado. | NO |
| pdf_path | 500 | VARCHAR (UNIQUE) | Ruta del PDF generado (WeasyPrint). | NO |
| sha256 | 64 | CHAR (UNIQUE) | Hash del binario generado (auditoría de integridad). | NO |
| contenido_snapshot | - | JSONB | Estado congelado al emitir: brechas con estado_final + cita textual + sanciones con montos (RS-18). | NO |
| creado_en | - | TIMESTAMPTZ | Fecha de generación. | NO |

Restricciones: UNIQUE parcial (empresa_id, anho) — RN-041 (un solo reporte por empresa/año; regeneración solo si el PO la habilita).
Reglas: cero LLM en la generación (RN-041); el PDF/snapshot es fiel a su fecha (RN-042).

## 6 · AUDITORÍA

## Tabla: `auditoria` (antes `auditoria_eventos`)
Descripción: bitácora append-only de eventos sensibles — la app solo INSERT/SELECT (REVOKE UPDATE/DELETE). UTC (RNF-024).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador secuencial del evento. | NO |
| usuario_id | 36 | UUID (FK) | Usuario implicado; nulo en eventos anónimos (login fallido de correo inexistente). | SÍ |
| empresa_id | 36 | UUID (FK) | Contexto de empresa opcional (FK visible aquí). | SÍ |
| tipo_evento | - | tipo_evento_auditoria (ENUM) | LOGIN \| LOGIN_FALLIDO \| CAMBIO_ROL \| INGESTA \| INGESTA_FALLIDA \| GEN_REPORTE \| AJUSTE_BRECHA \| DESCARGA. | NO |
| detalle | - | JSONB | Contexto: hash, doc_id, motivo, anterior→nuevo, resultado de la operación (corregido: era VARCHAR(500)). | NO |
| fecha_hora_utc | - | TIMESTAMPTZ | Fecha/hora UTC (indexada para rangos; presentación America/Lima solo en la UI — RNF-024). | NO |

---

## Reglas de lectura del diccionario
1. **Campos "SÍ"** explican en la descripción cuándo aplican (RF-020, RS-12).
2. El desglose técnico completo (HNSW, UNIQUE parciales, triggers, CHECKs y env vars) está en `02-Base-de-Datos-Diagrama-y-Diseno.md`.
3. Corresponde línea a línea al ERD «Modelo de Datos Depurado» (13 tablas — PostgreSQL 16 + pgvector · monolito modular) — ERD anterior `Diagrama_bd.png` queda **como archivo histórico**.
