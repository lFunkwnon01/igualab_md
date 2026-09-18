# 03 · Diccionario de Datos — FASE 1 (norma GES/GAP · completo)

> **Numeración alineada al A&D v6 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Formato por columna: **Campo · Tamaño · Tipo de Dato · Descripción · NULL**.
> Diseño de origen: `02-Base-de-Datos-Diagrama-y-Diseno.md` (ERD [[Diagrama_bd.png]] + 21 reglas semánticas RS). Estado: **COMPLETADO** (diseño congelado — ERD v2 del equipo).
> Motor: PostgreSQL 16 + pgvector (`embedding vector(1024)`, índice HNSW cosine).

---

## Tabla: `roles`
Descripción: catálogo cerrado de los dos perfiles de acceso del RBAC (acta 4 · REQ-10; 2 roles / 3 personas).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| rol | 20 | VARCHAR (PK) | Identificador del rol: superadmin o administrador. Valores fijos. | NO |
| descripcion | - | TEXT | Descripción del alcance del rol (segregación de funciones, RN-002). | SÍ |

## Tabla: `usuarios`
Descripción: usuarios de la plataforma (3 en fase 1: 1 Superadmin + 2 Administradores).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del usuario (gen_random_uuid). | NO |
| nombre | 120 | VARCHAR | Nombre completo del usuario. | NO |
| correo | 160 | VARCHAR | Correo institucional; único (índice funcional lower(correo)). | NO |
| password_hash | - | TEXT | Hash bcrypt/argon2 de la contraseña (RNF-002; nunca texto plano). | NO |
| rol | 20 | VARCHAR (FK) | Rol del usuario → roles.rol. Consulte CHECK: superadmin/administrador. | NO |
| habilitado | - | BOOLEAN | Estado de la cuenta (true = puede operar; RN-005/RS-02). | NO |
| created_at | - | TIMESTAMPTZ | Fecha de creación del registro. | NO |

Reglas semánticas: RS-01 (un solo Superadmin con índice único parcial), RS-02, RS-03.

## Tabla: `empresas`
Descripción: catálogo de empresas analizables; en fase 1 todas cotizan en la BVL (foco Perú; no existe `pais` — decisión del equipo).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | - | SERIAL (PK) | Identificador único de la empresa. | NO |
| nombre | 160 | VARCHAR | Nombre comercial/razón social; único. | NO |
| ticker | 12 | VARCHAR | Ticker en la BVL (p. ej. MINAND); único. | NO |
| sector | 40 | VARCHAR | Sector permitido: Minería, Energía, Petróleo y Gas (CHECK — RN-019). | NO |
| activo | - | BOOLEAN | false = no seleccionable en ingesta/análisis (default true). | NO |
| created_at | - | TIMESTAMPTZ | Fecha de creación del registro. | NO |

## Tabla: `documentos`
Descripción: cada archivo `.md` ingestado (memoria anual o reporte de sostenibilidad) con el estado del pipeline síncrono.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del documento. | NO |
| empresa_id | - | INT (FK) | Empresa a la que pertenece → empresas.id (RN-014). | NO |
| anho | 5 | SMALLINT | Año del documento; CHECK entre 2000 y 2100. | NO |
| tipo | 30 | VARCHAR | memoria_anual o reporte_sostenibilidad. | NO |
| nombre_archivo | 255 | VARCHAR | Nombre original del `.md` subido. | NO |
| ruta_origen | - | TEXT | Ruta del archivo original en disco (back-end; RN-030 no borrado). | NO |
| sha256 | 64 | CHAR (UNIQUE) | Huella anti-duplicado del archivo (RNF-010). | NO |
| estado | 20 | VARCHAR | indexado | observado | rechazado (RS-06). | NO |
| motivo | - | TEXT | Motivo exacto del guard en rechazo/observación (RF-021). | SÍ |
| chunks_count | - | INT | Nº de chunks indexados (éxito). | SÍ |
| version | - | INT | Versión (incrementa si el contenido difiere; RN-033; default 1). | NO |
| created_by | 36 | UUID (FK) | Superadmin que ingesta → usuarios.id. | NO |
| created_at | - | TIMESTAMPTZ | Fecha de ingesta. | NO |

## Tabla: `chunks_embeddings` (BD vectorizada — núcleo del RAG)
Descripción: fragmentos del documento con su embedding para búsqueda semántica (pgvector).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único del chunk. | NO |
| doc_id | 36 | UUID (FK) | Documento origen → documentos.id. | NO |
| chunk_index | - | INT | Posición del chunk dentro del documento (orden). | NO |
| texto | - | TEXT | Fragmento de texto (sección o fila de tabla). | NO |
| chunk_id_hash | 64 | CHAR (UNIQUE) | sha256 del texto — idempotencia del upsert (RNF-16). | NO |
| embedding | - | VECTOR(N) (índice HNSW cosine) | Vector devuelto por el **servicio de embeddings por API** del proveedor (N según modelo). | NO |
| seccion | 200 | VARCHAR | Encabezado de la sección/régimen origen (llave de la cita RN-022). | NO |
| gri_code | 12 | VARCHAR | Código GRI heredado del encabezado de la tabla; nulo si no aplica. | SÍ |
| metadata | - | JSONB | Empresa_id, año, tipo doc, fila tabla, otros contextos. | NO |
| created_at | - | TIMESTAMPTZ | Fecha de indexación. | NO |

## Tabla: `catalogo_gri` (el estándar — semilla del sistema)
Descripción: catálogo precargado del estándar GRI (Universal + series 200/300/400). La IA no inventa el estándar; consulta aquí (RN-017).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| codigo | 12 | VARCHAR (PK) | Código GRI oficial (p. ej. GRI 403). | NO |
| serie | 3 | VARCHAR | Serie del estándar: 100,200,300,400. | NO |
| tema | 120 | VARCHAR | Denominación del tema (p. ej. Seguridad y Salud). | NO |
| elementos_minimos | - | TEXT | Checklist de elementos de reporto esperados para el estado OK. | NO |
| keywords | - | TEXT[] | Palabras clave de evidencia usadas por el motor determinista. | NO |
| vigente_desde | 5 | SMALLINT | Año de la versión del estándar referida (RS-11). | NO |

## Tabla: `gri_analisis`
Descripción: **la tabla del análisis** — fila por empresa+doc+código GRI, incluidos los estados OK (RN-019). Poblada automáticamente al terminar la ingesta; la generación del reporte hace SELECT determinista de aquí (RN-026).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador único de la fila de análisis. | NO |
| empresa_id | - | INT (FK) | Empresa analizada → empresas.id. | NO |
| doc_id | 36 | UUID (FK) | Documento fuente → documentos.id. | NO |
| gri_code | 12 | VARCHAR (FK) | Código analizado → catalogo_gri.codigo (RN-017). | NO |
| estado | 20 | VARCHAR | Estado asignado **manualmente** por el Administrador: `OK` / `BAJA SUSTANCIA` / `SUB-REPORTADO` (3 únicos). Visible para el reporte. | NO |
| cita_fragmento | - | TEXT | Fragmento citado del documento. | NO |
| seccion | 200 | VARCHAR | Sección del documento (doc + sección = citación RN-022). | NO |
| observacion | - | TEXT | **Obligatoria al cambiar el estado** (RF-025); sustento humano. | SÍ* |
| validado_por | 36 | UUID (FK) | Usuario que validó/cambió el estado (NULL = pendiente CU006; RN-018). | SÍ* |
| updated_at | - | TIMESTAMPTZ | Última actualización del estado. | NO |

\* Obligatoriamente condicional según reglas semánticas (RF-025/RN-018).

## Tabla: `gri_analisis_historico`
Descripción: auditoría por cambio de estado de una fila de análisis (RN-018; append-only por trigger).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador del cambio. | NO |
| gri_analisis_id | 36 | UUID (FK) | Fila de análisis → gri_analisis.id. | NO |
| estado_anterior | 20 | VARCHAR | Estado previo a la revisión. | NO |
| estado_nuevo | 20 | VARCHAR | Estado tras la revisión (idem CHECK). | NO |
| usuario_id | 36 | UUID (FK) | Quien ejecutó el cambio → usuarios.id. | NO |
| observacion | - | TEXT | Sustento del cambio (RF-025). | SÍ |
| created_at | - | TIMESTAMPTZ | Fecha/hora del cambio. | NO |

## Tabla: `sanciones`
Descripción: sanciones económicas identificadas — siempre con cita verificable (RN-020); sin borra físicá (RN-030).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador de la sanción. | NO |
| empresa_id | - | INT (FK) | Empresa → empresas.id. | NO |
| doc_id | 36 | UUID (FK) | Documento que la evidencia → documentos.id. | NO |
| anho | 5 | SMALLINT | Año de la sanción. | NO |
| entidad | 160 | VARCHAR | Entidad/norma emisora. | NO |
| monto | (14,2) | NUMERIC | Monto económico; **NULL = no determinado** (nunca 0 por defecto; RF-040/RF-055). | SÍ |
| doc_seccion | 200 | VARCHAR | Sección del documento citado (obligatoria, RS-16). | NO |
| created_at | - | TIMESTAMPTZ | Fecha de registro. | NO |

## Tabla: `reportes_generados`
Descripción: entregables PDF generados, versionados e inmutables (RN-025/028).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | 36 | UUID (PK) | Identificador del reporte. | NO |
| empresa_id | - | INT (FK) | Empresa reportada. | NO |
| anho | 5 | SMALLINT | Año analizado. | NO |
| sector | 40 | VARCHAR | Snapshot del sector (evita join futuro). | NO |
| version | - | INT | Versión del reporte; UNIQUE(empresa_id, anho, version). | NO |
| pdf_path | - | TEXT | Ruta del PDF generado (WeasyPrint). | NO |
| sha256 | 64 | CHAR | Hash del binario generado (auditoría de integridad). | NO |
| resumen_ejecutivo | - | TEXT | Texto determinístico desde gri_analisis (sin LLM, RN-026). | NO |
| usuario_id | 36 | UUID (FK) | Administrador que generó. | NO |
| created_at | - | TIMESTAMPTZ | Fecha de generación. | NO |

## Tabla: `reporte_detalle_snapshot`
Descripción: una fila por indicador/sanción incluida en un reporte — congelada a su fecha de emisión (RS-18). Una línea es BRECHA o SANCION (nunca ambas).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | - | BIGSERIAL (PK) | Identificador de la línea. | NO |
| reporte_id | 36 | UUID (FK) | Reporte al que pertenece → reportes_generados.id (ON DELETE RESTRICT). | NO |
| gri_analisis_id | 36 | UUID (FK) | Rellene si línea BRECHA → gri_analisis.id. | SÍ* |
| sancion_id | 36 | UUID (FK) | Rellene si línea SANCION → sanciones.id. | SÍ* |
| tipo_linea | 20 | VARCHAR | BRECHA | SANCION | METRICA. | NO |
| gri_code | 12 | VARCHAR | Código GRI de la línea (si BRECHA/METRICA). | SÍ |
| estado_final | 20 | VARCHAR | Estado congelado al emitir (no vivo). | SÍ |
| cita_final | - | TEXT | Cita (doc + sección) al momento de emitir. | NO |
| monto | (14,2) | NUMERIC | Monto congelado si SANCION. | SÍ |
| es_brecha | - | BOOLEAN | true = línea de brecha (incl. las OK; RN-025); false = informativa. | NO |
| created_at | - | TIMESTAMPTZ | Fecha de creación. | NO |

Regla: `CHECK (num_nonnulls(gri_analisis_id, sancion_id) = 1)`.

## Tabla: `auditoria_eventos`
Descripción: bitácora de eventos sensibles (append-only; REVOKE UPDATE/DELETE — RN-028/30).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | - | BIGSERIAL (PK) | Identificador secuencial del evento. | NO |
| usuario_id | 36 | UUID (FK) | Usuario implicado; nulo en eventos anónimos (login fallido). | SÍ |
| accion | 20 | VARCHAR | LOGIN | LOGIN_FALLIDO | CAMBIO_ROL | INGESTA | INGESTA_FALLIDA | GEN_REPORTE | AJUSTE_BRECHA | DESCARGA. | NO |
| resultado | 30 | VARCHAR | Resultado de la operación (p. ej. ok, duplicado, formato). | NO |
| detalle | - | JSONB | Contexto: hash, doc_id, motivo, rol anterior→nuevo, cuota. | NO |
| ip_origen | - | INET | IP del cliente (red académica). | SÍ |
| created_at | - | TIMESTAMPTZ | Fecha/hora (indexada para rangos). | NO |

## Tabla: `uso_llm`
Descripción: contador diario del asistente (free tier — RNF-028). Una fila por fecha (UNIQUE).

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| id | - | BIGSERIAL (PK) | Identificador del registro diario. | NO |
| fecha | - | DATE (UNIQUE) | Día de consumo (1 fila/día). | NO |
| usuario_id | 36 | UUID (FK) | Último/por-usuario opcional; null si agregado global. | SÍ |
| consultas | - | INT | Nº de consultas del día. | NO |
| tokens_input | - | BIGINT | Tokens consumidos de entrada. | NO |
| tokens_output | - | BIGINT | Tokens consumidos de salida. | NO |
| modelo | 80 | VARCHAR | Último modelo usado (GLM-5.2 :free, respaldo…). | NO |
| costo_estimado | (12,4) | NUMERIC | Coste estimado — 0 en :free (útil si se migra a). | SÍ |
| incidencias | - | INT | Timeouts / failover del día. | NO |
| created_at | - | TIMESTAMPTZ | Fecha de inserción. | NO |

## Tabla: `configuracion`
Descripción: parámetros dinámicos del sistema (mock: Configuración). Cambiar límites sin desplegar.

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
|---|---|---|---|---|
| clave | 60 | VARCHAR (PK) | clave del parámetro: minutos_inactividad, bloqueo, notificaciones, upload_max_mb (50), llm_daily_limit (200). | NO |
| valor | - | TEXT/JSONB | Valor del parámetro. | NO |
| descripcion | - | TEXT | Descripción del parámetro para el panel del Superadmin. | SÍ |
| actualizado_por | 36 | UUID (FK) | Último Superadmin que lo modificó. | SÍ |
| updated_at | - | TIMESTAMPTZ | Última modificación. | NO |

---

## Reglas de lectura del diccionario
1. **NULL con \*** significa SÍ, pero con régimen condicional explicado en la fila (RF-025, RS-12/18).
2. El desglose técnico (índices, HNSW, triggers, CHECK completos) está en `02-Base-de-Datos-Diagrama-y-Diseno.md`.
3. Corresponde línea a línea a la versión de diseño congelada ([[Diagrama_bd.png]] — ERD v2).
