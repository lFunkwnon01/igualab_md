# 🧾 Auditoría Completa de Código — Backend + Frontend (fuente única de verdad)

> **Fecha:** 2026-10-14 (re-ejecutada; original 2026-10-13) · **Alcance:** `06-Desarrollo/BCK-IGUALAB` + `06-Desarrollo/FE-IGUALAB` tras `pull` de `development`.
> **Ramas auditadas:** `development` · BCK `fe764ef..78e614a` · FE `8a8d4c1..705cc78`.
> **Cambios del pull (2026-10-14):** BCK `78e614a` «refactor(analisis): corrige hallazgos Sonar del módulo GRI» · FE `705cc78` «Ingesta: filtro por sector y documentos de empresas inactivas marcados como Inactivo». Ninguno altera el modelo de datos ni cierra los P0.
> **Principio:** el **código es la fuente única y verdadera**. Este documento audita la realidad implementada y de ella salen las correcciones del vault (no al revés).
> **Regla de diseño aplicada en la auditoría:** ninguna tabla debe superar **20 atributos** (acordado con el PO).

---

## 0 · Resumen ejecutivo

| # | Hallazgo | Severidad | Estado |
|---|---|---|---|
| 1 | **Tabla `documentos` con 37 atributos** — no viable, 6 responsabilidades mezcladas, 16 CHECK | 🔴 CRÍTICA | Propuesta de partición en §4 |
| 2 | **`email_service.py` rompe el arranque completo** si `MAIL_*` está vacío (validado empíricamente) | 🔴 CRÍTICA | Bug activo §5.1 |
| 3 | **Vault desalineado con el código**: el diccionario describe 13 tablas "diseñadas"; el código tiene 14 tablas reales con otro esquema | 🔴 ALTA | Se corrige en esta actualización §3 |
| 4 | **Parseo Markdown triplicado** (deteccion_gri, deteccion_sanciones, fragmentacion) | 🟡 MEDIA | §5.3 |
| 5 | **`documento_service.py` = 1.374 lín / ~40 funciones** (síntoma del punto 1) | 🟡 MEDIA | §5.4 |
| 6 | **Frontend con dominio dual** (mock `seed.ts` + tipos reales) y 4 módulos que aún no tienen backend | 🟡 MEDIA | §6.5 |
| 7 | Bug FE↔BE: `details.errors` vs `details.errores` — se pierden mensajes de política de contraseña | 🟡 MEDIA | §6.6 |
| 8 | `fragmentos_documento` con 21 atributos (supera el límite por 1) | 🟡 BAJA | Justificado + rediseño §4.4 |
| 9 | Config muerta (`DEEPSEEK_*`, `openai`), docstrings obsoletos, secretos en consola Jenkins | 🟢 BAJA | §5.7 |

**Veredicto:** el código tiene una calidad alta (≈1.200 tests backend, contratos de error estables, migraciones versionadas con checksums, control de concurrencia optimista). La deuda se concentra en **un modelo de datos sobrecargado** (`documentos`) y en la **fractura documentación ↔ código** que esta auditoría cierra.

---

## 1 · Qué hay realmente en el código (inventario)

### 1.1 Backend — `BCK-IGUALAB`

- **Stack:** FastAPI 0.115 · SQLAlchemy 2.0 async (asyncpg) · PostgreSQL 16 (2 bases) + pgvector · MinIO/S3 (boto3) · OCI Generative AI (embeddings Cohere embed-v4.0, 1536 dims) · fastapi-mail · JWT sessionizado.
- **Volumen:** `app/` ≈ 12.763 líneas (51 módulos) · `tests/` ≈ 22.362 líneas · **~1.197 tests**.
- **Arquitectura por capas:** `routers/` (solo HTTP) → `services/` (lógica) → `models/` + `migraciones/` (persistencia). Dos motores de BD separados: `DATABASE_URL` (transaccional) y `VECTOR_DATABASE_URL` (pgvector), sin fallback entre ellas.

**Arranque** (`app/main.py` `lifespan`, 6 pasos): `crear_tablas` → `crear_superadmin_inicial` → `preparar_esquema_analisis` (Módulo 5; si falla → 503 parcial) → `iniciar_ingesta` (MinIO/OCI + migraciones + barrido de recuperación). Si la ingesta no está configurada, la app arranca igual y solo `/documentos` responde 503.

### 1.2 Frontend — `FE-IGUALAB`

- **Stack:** React 18.3 + TypeScript 5.6 (`strict`) + Vite 5 + Tailwind + framer-motion + sonner + react-router-dom 6. Tests: Vitest + jsdom.
- **Volumen:** `src/` = 5.450 líneas (54 archivos).
- **Estado real:** 5 módulos conectados al backend (auth, usuarios, empresas, ingesta/documentos, análisis GRI) y **4 módulos aún mock** (Asistente, Reportes, Descargas, Auditoría) marcados con `PendienteBanner`.

---

## 2 · Inventario de tablas REALES (fuente: modelos + migraciones)

Conteo de columnas verificado directamente sobre `app/models/*.py` y los `.sql` de `app/migraciones/`.

### 2.1 Base transaccional — creadas por `create_all` (arranque)

| Tabla | Modelo | Atributos | Estado |
|---|---|---:|---|
| `usuarios` | `models/usuarios.py` | 9 | ✅ OK |
| `sesiones` | `models/usuarios.py` | 5 | ✅ OK |
| `tokens_recuperacion` | `models/usuarios.py` | 6 | ✅ OK |
| `empresas` | `models/empresas.py` | 5 | ✅ OK |
| `auditoria` | `models/auditoria.py` | 5 | ✅ OK |

### 2.2 Base transaccional — creadas por migraciones versionadas

| Tabla | Migración | Atributos | Estado |
|---|---|---:|---|
| **`documentos`** | 0001 (27 col) + 0002 (+10 col) | **37** | 🔴 **NO VIABLE — supera 20** |
| `operaciones_ingesta` | 0003 | 12 | ✅ OK |
| `analisis_gri_control` | 0004 | 6 | ✅ OK |
| `analisis_gri_estados` | 0004 | 12 | ✅ OK |
| `analisis_gri_historial` | 0004 | 13 | ✅ OK |
| `analisis_gri_validaciones` | 0004 | 13 | ✅ OK |

### 2.3 Base vectorial (solo SQL, sin ORM)

| Tabla | Migración | Atributos | Estado |
|---|---|---:|---|
| `fragmentos_documento` | vectorial 0001 | **21** | 🟡 Supera 20 por 1 (ver §4.4) |
| `fragmentos_consultables` | vista sobre la anterior | 19 (columnas) | ✅ Vista de lectura RAG |
| `cierres_documento` | vectorial 0002 | 3 | ✅ OK (cierre anti-escrituras tardías) |

### 2.4 Infraestructura

| Tabla | Atributos | Nota |
|---|---:|---|
| `igualab_migraciones` | 5 | Registro del motor propio de migraciones (version, nombre, checksum, origen, aplicada_en) |

**Total: 14 tablas reales** (10 transaccionales + 3 vectoriales + 1 de infraestructura).

### 2.5 El problema central: `documentos` = 37 atributos

`app/models/documento_ingesta.py:114-319` · confirmado por conteo directo: **37 columnas**.

```
id, ambiente, empresa_id, anio, tipo, sector, nombre_archivo, sha256, tamano_bytes,
usuario_id, creado_en, clave_original, version_id_original, almacenamiento_intentado_en,
original_almacenado_en, estado_procesamiento, resultado_analisis, completado_en,
motivo_fallo, fallido_en, estado_compensacion, compensacion_intentos,
ultimo_error_compensacion, compensada_en, ejecucion_token, ejecucion_vigente_hasta,
reserva_activa, analisis, etapa_actual, fragmentos_procesados, fragmentos_total,
progreso_actualizado_en, advertencias, vector_escritura_intentada_en, vector_publicado_en,
vector_publicacion_intentos, vector_ultimo_error
```

**Cómo se llegó aquí (trazabilidad):**
1. La migración `0001_documentos_etapa_4a.sql` creó `documentos` con **27 columnas** (identidad + almacenamiento + máquina de estados + compensación).
2. La migración `0002_documentos_coordinador.sql` le añadió **10 columnas** más (progreso de fragmentación + publicación vectorial) → **37**.

**Por qué no es viable:**
- Mezcla **6 responsabilidades** en una tabla: (1) identidad del archivo, (2) almacenamiento en MinIO, (3) máquina de estados del procesamiento, (4) compensación ante fallos, (5) progreso de fragmentación, (6) publicación vectorial.
- **16 restricciones CHECK** + 2 índices únicos parciales → DDL intratable, migraciones dolorosas (cada `0002` en adelante engorda la misma tabla).
- Consecuencia directa en código: `documento_service.py` tiene **1.374 líneas y ~40 funciones** porque debe conocer todas las responsabilidades de la tabla.
- Toda columna nueva que agregue una responsabilidad volverá a engordarla (ya pasó una vez: 27 → 37).

---

## 3 · Brecha vault ↔ código (qué estaba desalineado)

El vault describía un modelo **diseñado** (13 tablas) que **no coincide** con el modelo **implementado**:

| Vault (diseñado) | Código (real) | Problema |
|---|---|---|
| `documentos` (11 campos) | `documentos` (**37**) | Esquema totalmente distinto |
| `fragmentos_documento` (8 campos: `seccion`, `texto`, `metadata` JSONB) | `fragmentos_documento` (**21**: `texto_literal`, `contexto`, `ruta_encabezados`, `embedding_*`…) | Otro esquema |
| `gri_analisis` + `sanciones` (tablas) | `analisis_gri_control/estados/historial/validaciones` (4 tablas) + análisis embebido en `documentos.analisis` (JSONB) | Diseño reemplazado |
| `catalogo_gri` (tabla) | `catalogo_gri.json` (archivo versionado en `app/modules/ingesta/datos/`) | Cambió de naturaleza |
| `consultas_asistente`, `consulta_citas`, `reportes_prospeccion` | **No existen** en backend | Diseño aún no implementado |
| — | `operaciones_ingesta` (12), `cierres_documento` (3) | **Nuevas, no documentadas** |
| `empresas.activo` / `anho` | `empresas.activa` / `anio` | Nombres distintos |
| `documentos.creada_por` | `documentos.usuario_id` | Nombre distinto |
| `documentos.estado` (indexado/observado/rechazado) | `estado_procesamiento` + `resultado_analisis` (2 enums separados) | Semántica nueva |
| HNSW en `fragmentos_documento` | **Sin índice vectorial** (búsqueda exacta por coseno) | Decisión explícita en el SQL |

> ✅ **Acción tomada con esta auditoría:** el diccionario de datos (`03-Diccionario-de-Datos.md`) se reescribe como **diccionario as-built** (lo implementado) más el **rediseño propuesto** de §4. El diseño anterior queda como referencia histórica.

---

## 4 · Propuesta de rediseño — máximo 20 atributos por tabla

### 4.1 Objetivo

Partir `documentos` (37) en **4 tablas** con ≤20 atributos cada una, separando responsabilidades. Ninguna tabla del sistema supera 20 atributos (ver §4.4 para `fragmentos_documento`).

### 4.2 Diseño propuesto

```
documentos (13 atributos)              ← identidad y contenido
├── documentos_almacenamiento (8)      ← MinIO/S3
├── documentos_procesamiento (13)      ← máquina de estados + progreso
├── documentos_compensacion (9)        ← reintento y compensación
└── documentos_vector_publicacion (8)  ← publicación en BD vectorial
```

#### `documentos` — identidad y contenido (13 atributos)

| Campo | Tipo | Descripción |
|---|---|---|
| id | UUID PK | Identificador del documento |
| ambiente | VARCHAR(32) | Entorno (dev/qa/uat/prod) |
| empresa_id | UUID FK | → empresas.id |
| anio | INTEGER | Año del documento (CHECK 2000..actual) |
| tipo | tipo_documento (ENUM) | memoria_anual \| reporte_sostenibilidad |
| sector | VARCHAR(64) | Sector copiado de la empresa (filtro de RAG) |
| nombre_archivo | VARCHAR(255) | Nombre del `.md` |
| sha256 | CHAR(64) | Huella anti-duplicado (UNIQUE) |
| tamano_bytes | BIGINT | Tamaño real (CHECK ≤ 50 MB) |
| usuario_id | UUID FK | → usuarios.id (quien ingestó) |
| creado_en | TIMESTAMPTZ | Fecha de creación |
| analisis | JSONB | Resultado completo GRI + sanciones (ver §4.5) |
| advertencias | JSONB | Advertencias del pipeline |

#### `documentos_almacenamiento` — MinIO/S3 (8 atributos)

| Campo | Tipo | Descripción |
|---|---|---|
| documento_id | UUID PK/FK | → documentos.id (1:1) |
| clave_original | TEXT | Clave del objeto en el bucket |
| version_id_original | TEXT | Versión exacta del objeto |
| almacenamiento_intentado_en | TIMESTAMPTZ | Último intento de subida |
| original_almacenado_en | TIMESTAMPTZ | Subida confirmada |
| almacenamiento_error | TEXT | Último error de almacenamiento (nuevo, absorbe `ultimo_error_compensacion` parcial) |
| sha256_verificado | BOOLEAN | Verificación post-subida |
| creado_en | TIMESTAMPTZ | Alta del registro |

#### `documentos_procesamiento` — máquina de estados + progreso (13 atributos)

| Campo | Tipo | Descripción |
|---|---|---|
| documento_id | UUID PK/FK | → documentos.id (1:1) |
| estado_procesamiento | estado_procesamiento (ENUM) | Estado actual |
| resultado_analisis | resultado_analisis (ENUM) | clasificación (CON_HALLAZGOS/OBSERVADO/…) |
| etapa_actual | VARCHAR(32) | Etapa del pipeline |
| fragmentos_procesados | INTEGER | Progreso |
| fragmentos_total | INTEGER | Total estimado |
| progreso_actualizado_en | TIMESTAMPTZ | Latido de progreso |
| completado_en | TIMESTAMPTZ | Final OK |
| fallido_en | TIMESTAMPTZ | Final KO |
| motivo_fallo | TEXT | Motivo exacto del fallo |
| ejecucion_token | UUID | Token de propiedad de la ejecución |
| ejecucion_vigente_hasta | TIMESTAMPTZ | Vigencia del token (latido) |
| reserva_activa | BOOLEAN | Reserva vigente |

#### `documentos_compensacion` — reintento y compensación (9 atributos)

| Campo | Tipo | Descripción |
|---|---|---|
| documento_id | UUID PK/FK | → documentos.id (1:1) |
| estado_compensacion | estado_compensacion (ENUM) | Estado de la compensación |
| compensacion_intentos | INTEGER | Número de reintentos |
| ultimo_error_compensacion | TEXT | Último error |
| compensada_en | TIMESTAMPTZ | Compensación terminada |
| pendiente_minio | BOOLEAN | Falta limpiar objeto |
| pendiente_vectorial | BOOLEAN | Falta limpiar fragmentos |
| siguiente_intento_en | TIMESTAMPTZ | Backoff del barrido |
| actualizado_en | TIMESTAMPTZ | Última actualización |

#### `documentos_vector_publicacion` — publicación en BD vectorial (8 atributos)

| Campo | Tipo | Descripción |
|---|---|---|
| documento_id | UUID PK/FK | → documentos.id (1:1) |
| vector_escritura_intentada_en | TIMESTAMPTZ | Último intento |
| vector_publicado_en | TIMESTAMPTZ | Publicación confirmada |
| vector_publicacion_intentos | INTEGER | Reintentos |
| vector_ultimo_error | TEXT | Último error |
| fragmentos_publicados | INTEGER | Contador publicado |
| estado | VARCHAR(32) | pendiente \| publicado \| fallido |
| actualizado_en | TIMESTAMPTZ | Última actualización |

### 4.3 Beneficios esperados

- Cada tabla ≤20 atributos, **1 responsabilidad por tabla**.
- `documento_service.py` se parte en servicios acotados (almacenamiento / procesamiento / compensación / publicación) — mismo criterio de las tablas.
- Las migraciones futuras tocan una tabla, no una de 37 columnas.
- Se puede consultar el estado del documento con `JOIN` explícito (o vista `documentos_completo` para compatibilidad).

### 4.4 Ajuste de `fragmentos_documento` (21 → 20)

Hoy tiene 21 columnas. Denormaliza `empresa_id, anio, tipo, sector` del documento (decisión deliberada para no hacer JOIN entre bases). Rediseño propuesto:

- **Mover a tabla satélite `fragmentos_embeddings` (5 cols):** `fragmento_id, embedding_proveedor, embedding_modelo, embedding_dimension, creado_en` → `fragmentos_documento` queda en **17 atributos**.
- La búsqueda `buscar_similares` mantiene el rendimiento con `JOIN` dentro de la misma base vectorial.

### 4.5 Nota sobre `documentos.analisis` (JSONB)

El JSONB del análisis GRI/sanciones **no cuenta como columnas de tabla** (es contenido, no esquema) pero es grande. Opciones futuras (no urgentes):
1. Dejarlo como snapshot JSONB (actual) — simple, atómico con el documento.
2. Extraerlo a `documentos_analisis` (documento_id, payload, creado_en) si crece.

**Decisión recomendada:** mantenerlo en `documentos` (una sola columna JSONB) — el límite de 20 se aplica a columnas escalares.

---

## 5 · Backend — problemas, bugs y deuda técnica

### 5.1 🔴 CRÍTICO — `email_service.py` rompe el arranque

`app/core/email_service.py:5-16` crea el `ConnectionConfig` de fastapi-mail **en el import del módulo**. Con `MAIL_USERNAME`/`MAIL_FROM` vacíos, importar el módulo lanza `pydantic ValidationError`. Como `app/modules/auth/service.py:9` lo importa → `routers/auth.py` → `app/main.py`, **toda la API no arranca**, aunque el correo solo se use para recuperar contraseña.

- Contradice `app/core/config.py:47-54`, donde `MAIL_*` es opcional.
- Los tests lo esquivan forzando `MAIL_*` en `tests/conftest.py:8-10`; el `Jenkinsfile:32` también.
- **Arreglo propuesto:** construir el `ConnectionConfig` de forma perezosa (dentro de `enviar_correo_recuperacion`) y responder 503/omitir la función si el correo no está configurado.

### 5.2 🔴 CRÍTICO — tabla `documentos` de 37 atributos

Ver §2.5 y §4 (rediseño completo). Es la causa raíz de la sobrecarga de `documento_service.py`.

### 5.3 🟡 MEDIA — parseo Markdown triplicado

La lógica de tablas de pipes, límites de cita y `delimitador_pendiente` está reimplementada en 3 sitios:
- `deteccion_gri.py:284, 299, 607-624`
- `deteccion_sanciones.py:481, 518-545, 933`
- `fragmentacion.py:177-202`

Cambiar el formato de tabla exige tocar tres lógicas paralelas → riesgo de divergencia. **Propuesta:** módulo compartido `services/ingesta/markdown_tokens.py`.

### 5.4 🟡 MEDIA — módulos gigantes

| Archivo | Líneas | Problema |
|---|---:|---|
| `documento_service.py` | 1.374 | ~40 funciones: reserva + almacenamiento + compensación + recuperación + publicación + progreso (síntoma de §5.2) |
| `deteccion_sanciones.py` | 1.144 | Clase `_Analizador` con ~40 métodos; el docstring admite «no se afirma precisión validada» |
| `coordinador.py` | 517 | `ingerir_documento` (101 lín) y `_ejecutar_etapas` (77) — flujo síncrono que espera en el request |
| `analisis_gri/servicio.py` | 581 | `asignar_estado` (101 lín) |

### 5.5 🟡 MEDIA — configuración y arranque frágil

- `app/core/config.py:29` → `os.environ["JWT_SECRET_KEY"]` lanza `KeyError` sin mensaje accionable si falta la variable.
- `scripts/crear_superadmin_inicial.py:24-26` → `os.environ["SUPERADMIN_*"]` puede romper el paso 2/6 del arranque con `KeyError` crudo.
- **Config muerta:** `DEEPSEEK_API_KEY/BASE_URL/MODEL` (`config.py:83-85`) no se usa en ningún servicio. `openai>=1.30.0` está en `requirements.txt` pero jamás se importa.

### 5.6 🟢 BAJA — deuda menor

- Docstrings obsoletos que afirman que componentes "aún no existen" cuando ya existen: `analisis_ingesta.py:24-26`, `deteccion_gri.py:13`, `embeddings.py:56`.
- `app/models/__init__.py:7-10` importa (comentado) `app.models.analisis` y `app.models.reportes` — módulos inexistentes.
- Trampa enum vs BD: `RolUsuario.SUPERADMIN = "superadmin"` pero SQLAlchemy persiste el *name* («SUPERADMIN») y el índice parcial usa `rol = 'SUPERADMIN'`. Unificar nombre/valor.
- `Jenkinsfile:32` pasa secretos de prueba como variables en línea de comando (visibles en consola del build).
- Sin rate limiting por IP en `/auth/login` (solo bloqueo por cuenta) y sin refresh tokens.
- Sin índices vectoriales (HNSW/IVFFlat) — decisión declarada, aceptable hoy.
- CORS `allow_methods/headers=["*"]` con `allow_credentials=True` — correcto solo porque los orígenes vienen de configuración.

### 5.7 Lo que está bien (no tocar)

- Jerarquía de errores `AppException` con `code` estable + `request_id` (`exceptions.py`, `exception_handlers.py`).
- Motor de migraciones propio con candado asesor, checksum SHA-256, firmas estructurales y clasificación APLICA/ADOPTA/CONFLICTO (`app/migraciones/motor.py`).
- Compensación con incertidumbre (`almacenamiento_s3.py` nunca declara "limpio" por DELETE+HEAD) y cierre anti-escrituras tardías (`cierres_documento`).
- Control de concurrencia optimista (`analisis_gri_control.version`, `FOR UPDATE`) y token de ejecución con latido.
- Batería de ~1.197 tests orientada a bordes, concurrencia e incertidumbre.

---

## 6 · Frontend — problemas y deuda técnica

### 6.1 Arquitectura real

- `src/api/` (client + auth + usuarios + empresas + documentos + analisis) — contratos **verificados campo por campo contra el backend**: sin discrepancias de rutas, métodos ni enums.
- `src/types.ts` (412 lín) contiene **dos modelos de dominio**: legacy mock (líneas 37-104) y contratos API reales (106-412).

### 6.2 Módulos reales vs mock

| Módulo | Backend | Estado |
|---|---|---|
| Login / Restablecer / MiCuenta | `/auth/*` | ✅ Real |
| Usuarios | `/usuarios` | ✅ Real |
| Empresas | `/empresas` | ✅ Real |
| Ingesta / Documentos | `/documentos/*` | ✅ Real (con polling) |
| Análisis GRI | `/analisis-gri/*` | ✅ Real (control optimista 409) |
| Asistente | — | 🔴 **Mock** (keyword matcher con latencia simulada) |
| Reportes | — | 🔴 **Mock** (asigna estados GRI sobre datos falsos) |
| Descargas | — | 🔴 **Mock** ("PDF" = `window.print()`) |
| Auditoría | — | 🔴 **Mock** (eventos en `useState`, no inmutables) |

### 6.3 Componentes grandes

| Archivo | Líneas | Nota |
|---|---:|---|
| `pages/AnalisisGri.tsx` | 561 | 9 subcomponentes en un archivo (deuda de archivo, no de lógica) |
| `pages/Ingesta.tsx` | 434 | 3 subcomponentes + lógica de polling |
| `types.ts` | 412 | Dos dominios en uno |

### 6.4 Lógica duplicada

- `fechaHora()` idéntica en `Ingesta.tsx:301` y `AnalisisGri.tsx:214`.
- `fechaCorta` con **dos implementaciones distintas** (`lib/format.ts:16` vs `Empresas.tsx:151`).
- Componente `Campo` copiado 4 veces (Ingesta, AnalisisGri, Empresas, Reportes).
- Clases de inputs repetidas 7 veces en `Ingesta.tsx` (AnalisisGri ya extrajo `CLS_SELECT`).
- Asignación de estado GRI implementada **dos veces**: real (`AnalisisGri.tsx`) y mock (`Reportes.tsx`).

### 6.5 Dominio dual (crítico de mantenibilidad)

`src/data/seed.ts` + `DomainContext.tsx` mantienen datos ficticios (ids falsos, hashes fingidos, tamaños como texto) y helpers (`esgScore`, `riesgoDesdeEsg`) que **replican el puntaje ESG que el backend ya calcula**. Conviven `EstadoGri`/`EstadoGriApi`, `Sector`/`SectorApi`, `Documento`/`DocumentoResumen`, `Analisis`/`AnalisisGri`. **Cuando el backend exponga `/reportes`, `/auditoria` y RAG, hay que eliminar seed + DomainContext.**

### 6.6 Bugs puntuales

1. **`client.ts:103-105` (`detallesToStrings`) solo interpreta `details.errores`**, pero el backend envía `details={"errors": [...]}` en `PASSWORD_POLICY_VIOLATION` → los mensajes por-regla de contraseña **se pierden**.
2. `Ingesta.tsx:414`: `resultado.estado as EstadoProgreso` es un cast incorrecto (`Operacion.estado` es `EstadoOperacion`, que incluye `CREADA|VALIDANDO|INTERRUMPIDA|RECHAZADA`).
3. `Ingesta.tsx:101-110`: el polling termina tras 20 intentos sin error claro y sin cancelación al desmontar.
4. `Usuarios.tsx:235`: campo de contraseña con `type="text"` (riesgo de shoulder-surfing).
5. `Auditoria.tsx:38-41`: `URL.createObjectURL` nunca se revoca.
6. `Reportes.tsx:63`: el mensaje "Reporte generado… e inmutable" es engañoso (vive en memoria).
7. `DocumentoResumen.cargado_por` es UUID en backend pero se muestra crudo (sin nombre de usuario).

### 6.7 Tests frontend

11 archivos, ~737 líneas. Buena calidad sobre lógica pura (`dominio.test.ts`, `client.test.ts`, contratos de API). **Huecos:** cero tests de componentes/páginas (sin Testing Library), sin tests de integración contra backend real (el bug `details.errors`/`errores` sobrevive a toda la batería).

---

## 7 · Endpoints reales del backend (referencia)

| Grupo | Endpoints | Rol |
|---|---|---|
| `GET /health` | infraestructura | público |
| `/auth` | login, logout, recuperar-contrasena, restablecer-contrasena, mi-contrasena | público / sesión |
| `/usuarios` | crear, listar, habilitar, deshabilitar, transferir-superadmin | SuperAdmin |
| `/empresas` | crear, listar, detalle, editar, activar, desactivar | SuperAdmin |
| `/documentos` | crear operación, ingesta multipart, progreso, reintentar-publicacion, historial, detalle | SuperAdmin |
| `/analisis-gri` | consultar, asignar estado, historial, validar | Administrador |

**No existen aún:** `/auditoria` (lectura), `/reportes`, `/asistente` (RAG/chat). El frontend los muestra como mock. `AnalisisResponse.habilita_reporte` anticipa el Módulo 7.

---

## 8 · Plan de acción (priorizado)

| P | Acción | Archivos | Esfuerzo |
|---|---|---|---|
| **P0** | Corregir `email_service.py` (lazy init; la API debe arrancar sin MAIL_*) | `app/core/email_service.py` | Bajo |
| **P0** | Aprobar rediseño de `documentos` (§4) y crear migración 0005 de partición vertical | `app/models/`, `app/migraciones/transaccional/0005_*.sql` | Alto |
| **P1** | Partir `documento_service.py` según las nuevas tablas | `app/modules/ingesta/` | Alto |
| **P1** | Actualizar diccionario de datos as-built (✅ hecho con esta auditoría) | `03-Diccionario-de-Datos.md` | — |
| **P1** | Bug FE: `details.errors` en `client.ts` + test de contrato | `FE/src/api/client.ts` | Bajo |
| **P2** | Unificar parseo Markdown en módulo compartido | `app/modules/ingesta/` | Medio |
| **P2** | Extraer `fragmentos_embeddings` (21 → 17) | migración vectorial | Medio |
| **P2** | FE: partir `AnalisisGri.tsx` / `Ingesta.tsx`; unificar `Campo`, `fechaCorta`; quitar cast de `Ingesta.tsx:414` | `FE/src/` | Medio |
| **P3** | Retirar config muerta (`DEEPSEEK_*`, `openai`); actualizar docstrings; limpiar `models/__init__.py` | backend | Bajo |
| **P3** | Enmascarar secretos en `Jenkinsfile`; endurecer `SUPERADMIN_*` | CI | Bajo |
| **P3** | FE: `type="password"` en Usuarios; revocar `createObjectURL`; timeout de polling | `FE/src/` | Bajo |
| **P3** | Tests de UI (Testing Library) para Ingesta/AnalisisGri/AuthContext | `FE/` | Medio |

---

## 9 · Decisión pendiente del PO

1. **Aprobar la partición de `documentos`** en 4 tablas (§4.2) — ¿se hace como migración 0005 ahora (recomendado, antes de que haya datos en producción) o se posterga?
2. **`fragmentos_documento` (21 cols):** ¿se extrae `fragmentos_embeddings` (→17) o se acepta 21 por ser la tabla del RAG?
3. **Módulos mock (Asistente/Reportes/Descargas/Auditoría):** ¿se prioriza su backend en este sprint o se mantienen como demo con banner?

---

> **Trazabilidad de esta auditoría:** datos extraídos directamente de `BCK-IGUALAB@78e614a` y `FE-IGUALAB@705cc78`. Conteo de atributos, enums, tipos y nulabilidad verificados por script/directo sobre `app/models/*.py` y migraciones SQL. Hallazgo de `email_service` verificado empíricamente.

---

## 10 · Alineación del vault ↔ código (2026-10-14)

Correcciones aplicadas al vault para que refleje el código (fuente de verdad). Todas verificadas contra `BCK@78e614a` / `FE@705cc78`:

| Documento | Corrección |
|---|---|
| `03-Diccionario-de-Datos.md` | `documentos.tipo` → `MEMORIA_ANUAL\|REPORTE_SOSTENIBILIDAD_GRI`; `documentos.sector` → ENUM `sector_empresa`; nulabilidades corregidas (`clave_original`, `ejecucion_token`, `ejecucion_vigente_hasta`, `advertencias`); textos `VARCHAR(64)`; **20 CHECK**; `operaciones_ingesta.estado` → `CREADA\|EN_CARGA\|CON_DOCUMENTO\|RECHAZADA`; `auditoria.tipo_evento` ENUM + `detalle VARCHAR(500)`; `puntaje_suma` INTEGER; vista RAG **20 columnas**; catálogo **48 códigos**; `empresas` sin «BVL Perú». |
| `02-Base-de-Datos-*.md` / `05-Analisis-*.md` | Nota as-built actualizada a `@78e614a`, catálogo 48, `auditoria` real (5 col, `detalle` VARCHAR, sin `empresa_id`), sin HNSW. |
| `01-Arquitectura-de-Solucion-FASE-1.md` | Nota as-built: 14 tablas reales, embeddings **OCI Cohere embed-v4.0**, storage **MinIO/S3**, LLM **no implementado**, `buscar_similares` sin exponer. |
| `03-Stack-Tecnologico/01-*.md` | Tabla de stack corregida (embeddings OCI, LLM sin uso, parser propio, reportes no implementados); §4 con las **variables de entorno reales** de `config.py`. |
| `04-Frontend-React/01-*.md` | Estructura real (`api/auth/components/data/lib/pages`), rutas reales, 7 páginas conectadas vs 4 mock, cero tests de componentes. |
| `05-api-endpoints-mock/*.yaml` | Nota con los **27 endpoints reales** y los no implementados (RAG/Reportes/Auditoría/Descargas). |
| `06-Desarrollo/INFRAESTRUCTURA-Y-FLUJO-GIT.md` | §3 «estado actual de los repos» actualizado a la estructura real. |
| `📌 Inicio.md` | Fecha/hash de auditoría y hallazgos actualizados. |

> **Sigue pendiente (depende del PO o de trabajo de código, no de documentación):** partición de `documentos` (migración 0005), fix de `email_service.py`, extracción de `fragmentos_embeddings`, y backend de M6/M7/M8.
