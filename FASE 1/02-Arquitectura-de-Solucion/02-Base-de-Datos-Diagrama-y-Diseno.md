# 02 · Base de Datos — Diagrama ERD, Diseño detallado y Reglas Semánticas (FASE 1)

> **Numeración alineada al A&D V2 (LaTeX)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Fuente de verdad: **Plan de Proyecto v1.2** + actas 4/5 · Norma: **GES/GAP** (conceptual → lógico → físico) · Escenario: 3 usuarios (1 Superadmin + 2 Administradores) · **2 bases PostgreSQL 16 — transaccional (12 tablas) + vectorial (1 tabla: `fragmentos_documento`), 13 tablas en total — alineadas a la arquitectura por capas (`arquitecturasolution.jpeg`, capas 6–7)**.

## ✅ v3 · MODELO DE DATOS DEPURADO (vigente — 2 bases, 13 tablas: 12 transaccionales + 1 vectorial)

> Adopta el ERD «modelo de datos depurado» entregado por el equipo, con las **correcciones aplicadas** tras su revisión (los puntos marcados con ⚙ en la especificación). Las decisiones D-01…D-05 quedaron **cerradas**:
> - **D-01** → autenticación **sessionizada**: `sesiones` + `tokens_recuperacion` como tablas (refleja Capa 6: `Sesión (TokenRecuperación)`).
> - **D-02** → medidor del asistente derivado de `consultas_asistente` (COUNT por día/modelo); límites por variables de entorno (`LLM_DAILY_LIMIT`, `UPLOAD_MAX_MB` → doc `03-Stack` §4).
> - **D-03** → `fragmentos_documento` como **tabla independiente** (texto · embedding vector(dim) NOT NULL · metadata), compatible con índice HNSW y búsqueda cosine k=4.
> - **D-04** → sin `vw_puntaje_esg` como objeto del ERD: el puntaje se calcula desde `gri_analisis` cuando el negocio lo pida (fase 2 dashboard GET-only).
> - **D-05** → nombres normalizados: ORM `CatalogoGRI` / `GRIAnalisis` · tabla `auditoria` (coherente con Capa 6).
> - **D-06 (nueva, resuelta)** → `reportes_prospeccion` con **UNIQUE parcial (empresa_id, anho)** — cumple RN-041 (un solo reporte por empresa/año; no hay versiones).

### Tablas retiradas y su justificación (se quitaron módulos)

| Retirada | Justificación |
|---|---|
| `roles` | El conjunto cerrado queda como **UNIQUE parcial en `usuarios.rol`** (un solo Superadmin) + CHECK/ENUM `rol_usuario`; catálogo de 2 filas sin valor referencial en fase 1 |
| `configuracion` | Se quitó el **módulo Configuración**; umbrales operativos viven en variables de entorno (doc Stack §4) |
| Medidor LLM separado | Consumo derivable de `consultas_asistente`; no corresponde a un RF/RNF confirmado en el alcance vigente |
| Histórico GRI separado | Los cambios de estado sensibles quedan en `auditoria` (evento `AJUSTE_BRECHA` con detalle JSONB) |
| `reporte_detalle_snapshot` | Sustituida por `contenido_snapshot` JSONB en la propia fila de `reportes_prospeccion` + PDF inmutable |
| `reporte_detalle_snapshot` | Sustituida por `contenido_snapshot` JSONB en la propia fila de `reportes_prospeccion` + PDF inmutable |
### Cadena principal del negocio

**empresa → documento (`.md`) → fragmentos (vectorizados) → análisis GRI/sanciones → consulta asistente (RAG con citas) → reporte PDF → auditoría** (todo con usuario responsable).

### Relaciones (1:N salvo indicación)

1. Un **usuario** crea **sesiones** y **tokens_recuperacion** (1:N en ambos).
2. Una **empresa** tiene muchos **documentos**; un usuario crea documentos (`creada_por`).
3. Un **documento** se vectoriza en muchos **fragmentos_documento** (base vectorial; referencia lógica UUID validada por la app); de un fragmento provienen `cita_textual` de **gri_analisis** y **sanciones** (referencia lógica `fragmento_id` NULL = cita directa del doc).
4. El **catalogo_gri** referencia cada fila de **gri_analisis** (UNIQUE documento+código: una sola tabla de resultados).
5. Una **consulta_asistente** registra sus **citas** (`consulta_citas` → referencias lógicas a fragmentos) — citas · fuentes de la Capa 6.
6. Un reporte pertenece a una empresa (UNIQUE empresa+anho — RN-041); su **snapshot** se congela a la fecha de emisión.
7. Todo evento sensible va a **auditoria** (append-only; referencias lógicas usuario/empresa NULL).

## Modelo lógico — ER (mermaid)

> Las relaciones hacia `fragmentos_documento` (base vectorial) son **referencias lógicas UUID** validadas por la app, **sin claves foráneas físicas** entre bases.

```mermaid
erDiagram
    usuarios ||--o{ sesiones : abre
    usuarios ||--o{ tokens_recuperacion : crea
    usuarios ||--o{ documentos : crea
    usuarios ||--o{ auditoria : registra
    usuarios ||--o{ consultas_asistente : pregunta
    empresas ||--o{ documentos : tiene
    empresas ||--o{ reportes_prospeccion : recibe
    empresas ||--o{ consultas_asistente : contextualiza
    documentos ||--o{ fragmentos_documento : vectoriza (base vectorial, ref lógica)
    documentos ||--o{ gri_analisis : produce
    documentos ||--o{ sanciones : cita
    catalogo_gri ||--o{ gri_analisis : referencia
    fragmentos_documento ||--o{ gri_analisis : desde
    fragmentos_documento ||--o{ sanciones : desde
    consultas_asistente ||--o{ consulta_citas : cita
    fragmentos_documento ||--o{ consulta_citas : fuente

    usuarios {
        uuid id PK
        varchar nombre
        varchar correo UK
        varchar password_hash
        rol_usuario rol "ENUM superadmin|administrador"
        boolean habilitado
        integer intentos_fallidos
        timestamptz bloqueado_hasta "NULL"
        timestamptz creado_en
    }
    sesiones {
        uuid id PK
        uuid usuario_id FK
        timestamptz creada_en
        timestamptz ultima_actividad
        boolean revocada
    }
    tokens_recuperacion {
        uuid id PK
        uuid usuario_id FK
        varchar token_hash UK
        timestamptz expira_en
        boolean usado
        timestamptz creado_en
    }
    empresas {
        uuid id PK
        varchar nombre UK
        varchar sector
        boolean activo
        timestamptz creado_en
    }
    documentos {
        uuid id PK
        uuid empresa_id FK
        uuid creada_por FK
        smallint anho
        varchar tipo
        varchar nombre_archivo
        char sha256 UK
        bigint tamano_bytes
        estado_ingesta estado "ENUM"
        text motivo_rechazo "NULL"
        timestamptz creado_en
    }
    fragmentos_documento {
        uuid id PK
        uuid documento_id FK
        integer indice "UQ (documento_id, indice)"
        varchar seccion
        text texto "NOT NULL"
        vectordim embedding "N según proveedor"
        jsonb metadata
        timestamptz creado_en
    }
    catalogo_gri {
        varchar codigo PK
        varchar serie
        varchar tema
        text descripcion
        text elementos_minimos "restaurado"
        text_arreglo keywords "restaurado"
        varchar version_catalogo
    }
    gri_analisis {
        uuid id PK
        uuid documento_id FK
        varchar gri_codigo FK
        uuid fragmento_id FK "NULL"
        text cita_textual
        estado_gri estado "NULL"
        uuid validado_por FK "NULL"
        varchar version_catalogo "snapshot RS-11"
        timestamptz realizado_en
    }
    sanciones {
        uuid id PK
        uuid documento_id FK
        uuid fragmento_id FK "NULL"
        varchar autoridad_emisora
        numeric monto "(14,2) NULL = no determinado"
        varchar moneda "NULL"
        text cita_textual
        timestamptz creado_en
    }
    consultas_asistente {
        uuid id PK
        uuid usuario_id FK
        uuid empresa_id FK "NULL"
        smallint anho
        text pregunta
        text respuesta
        varchar modelo
        timestamptz creado_en
    }
    consulta_citas {
        uuid id PK
        uuid consulta_id FK
        uuid fragmento_id FK
        smallint orden
        text extracto
    }
    reportes_prospeccion {
        uuid id PK
        uuid empresa_id FK
        uuid generado_por FK
        smallint anho
        varchar pdf_path UK
        char sha256 UK
        jsonb contenido_snapshot
        timestamptz creado_en
    }
    auditoria {
        uuid id PK
        uuid usuario_id FK "NULL"
        uuid empresa_id FK "NULL"
        tipo_evento_auditoria tipo_evento "ENUM append-only"
        jsonb detalle "corregido: era varchar(500)"
        timestamptz fecha_hora_utc
    }
```

## Especificación física y detallada por tabla

> Convención GAP: qué es, columnas, llave, restricciones y reglas semánticas. Los puntos ⚙ marcan las **correcciones aplicadas** al ERD recibido.

### 1 · IDENTIDAD Y ACCESO

#### 1.1 `usuarios`
- **Qué**: las 3 personas del proyecto (1 Superadmin + 2 Administradores). Sin "Usuario" público (acta 4 · REQ-10).
- **Columnas**: `id UUID PK` · `nombre VARCHAR(200) NOT NULL` · `correo VARCHAR(255) NOT NULL` ⚙ **UNIQUE case-insensitive** (`CREATE UNIQUE INDEX ON usuarios (lower(correo))`; RN-007 «correo único de dominio autorizado») · `password_hash VARCHAR(255)` (**bcrypt** — almacena el prefijo del algoritmo; NOT NULL) · `rol rol_usuario NOT NULL` (ENUM/CHECK: `superadmin|administrador` — sustituye a la tabla `roles`) · `habilitado BOOLEAN NOT NULL DEFAULT true` · `intentos_fallidos INT NOT NULL DEFAULT 0` **(RN-012)** · `bloqueado_hasta TIMESTAMPTZ NULL` (5 intentos → 15 min) · `creado_en TIMESTAMPTZ NOT NULL DEFAULT now()`.
- **Restricciones**:
  - ⚙ **UNIQUE parcial del único Superadmin (RN-002, sin filtro de habilitado)**: `CREATE UNIQUE INDEX uq_un_solo_superadmin ON usuarios (rol) WHERE rol='superadmin';` — transferencia de rol = transacción doble atómica (RNF-012).
- **RS**: deshabilitar cuenta invalida sesiones (`sesiones.revocada=true`) y exige re-login (RN-005). Sin usuario habilitado no hay operación (RS-03).

#### 1.2 `sesiones`
- **Qué**: sesiones activas de cada usuario (Capa 6: `Usuario·Sesión`).
- **Columnas**: `id UUID PK` · `usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE` · `creada_en TIMESTAMPTZ` · `ultima_actividad TIMESTAMPTZ` (soporte del idler RNF: inactivo por env var) · `revocada BOOLEAN NOT NULL DEFAULT false`.
- **RS** ⚙: no hay borrado (RNF-019); revocar es la «eliminación» lógica. El JWT/Cookie referencia esta fila; cada petición valida `revocada=false` y habilitación (rol vigente — RNF-006 de trazabilidad).

#### 1.3 `tokens_recuperacion`
- **Qué**: tokens de recuperación de contraseña (un solo uso).
- **Columnas**: `id UUID PK` · `usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE` · `token_hash VARCHAR(255)` ⚙ **UNIQUE — se guarda hash del token, nunca el token en claro** · `expira_en TIMESTAMPTZ` · `usado BOOLEAN NOT NULL DEFAULT false` (single-use) · `creado_en TIMESTAMPTZ`.
- **RS**: expirado o usado → inválido; el cambio de contraseña revoca todas las sesiones del usuario.

### 2 · EMPRESAS E INGESTA

#### 2.1 `empresas`
- **Qué**: catálogo de empresas analizables (gestión del Superadmin).
- **Columnas**: `id UUID PK` · `nombre VARCHAR(200) NOT NULL UNIQUE` · `sector VARCHAR NOT NULL` ⚙ **CHECK cerrado** (`sector IN ('Minería','Petróleo y Gas','Energía')` — RN-015, en la BD) · `activo BOOLEAN NOT NULL DEFAULT true` · `creado_en TIMESTAMPTZ`.
- **Nota de alcance**: sin `pais` en fase 1 — BVL-Perú (fase 2+ añade columna con default).
- **RS (RN-015)**: el análisis solo alcanza empresas del CHECK; `activo=false` no aparece en ingesta.

#### 2.2 `documentos`
- **Qué**: cada `.md` subido con su estado del pipeline síncrono.
- **Columnas**: `id UUID PK` · `empresa_id UUID REFERENCES empresas(id)` · `creada_por UUID REFERENCES usuarios(id)` · `anho SMALLINT NOT NULL CHECK ( BETWEEN 2000 AND 2100)` · `tipo VARCHAR NOT NULL CHECK IN ('memoria_anual','reporte_sostenibilidad')` · `nombre_archivo VARCHAR(255)` ⚙ guard: **sin espacios ni mayúsculas** (regla del guard) · `sha256 CHAR(64) NOT NULL UNIQUE` (RNF-011 anti-duplicado de contenido) · `tamano_bytes BIGINT NOT NULL CHECK (<= 50 MB — RN-015 límite de tamaño)` · `estado estado_ingesta NOT NULL` (ENUM: `indexado|observado|rechazado`) · `motivo_rechazo TEXT NULL` (texto exacto del guard) · `creado_en TIMESTAMPTZ`.
- **Restricciones**: ⚙ **UNIQUE parcial `(empresas_id, anho, tipo) WHERE estado='indexado'`** (unicidad documental por empresa/año/tipo de documentos exitosos — RN-026/033).
- **RS**: integridad atómica (RN-026/RN-026): documento rechazado → **cero fragmentos y cero análisis** (operación transaccional completa con rollback); solo queda el registro con `estado='rechazado'` y motivo, sin DELETE físico (RNF-019).

#### 2.3 `fragmentos_documento` (BD vectorial — núcleo del RAG)
- **Qué**: fragmento del documento con su embedding (base vectorial, acceso por `VECTOR_DATABASE_URL`).
- **Columnas**: `id UUID PK` · `documento_id UUID REFERENCES documentos(id) ON DELETE CASCADE` · `indice INT NOT NULL` ⚙ **UNIQUE `(documento_id, indice)`** (combinado, no global — un índice es posición dentro del documento) · `seccion VARCHAR(500)` (encabezado markdown — llave de la cita RN-034) · `texto TEXT NOT NULL` ⚙ **CORREGIDO: es NOT NULL** — un fragmento sin texto no es buscable ni citable · `embedding VECTOR(N) NOT NULL` (pgvector; **la dimensión depende del modelo de embeddings del proveedor** — fijar en migración: p. ej. 1024) · `metadata JSONB NOT NULL` (empresa_id, año, tipo doc, fila de tabla origen) · `creado_en TIMESTAMPTZ`.
- **Físico**: ⚙ **índice HNSW obligatorio**: `CREATE INDEX idx_frag_hnsw ON fragmentos_documento USING hnsw (embedding vector_cosine_ops) WITH (m=16, ef_construction=64);` — búsqueda `ORDER BY embedding <=> :q LIMIT 4` (k=4 cosine).
- **RS**: consultado por el AI Harness (Capa 5); provee las citas verificables (doc/empresa/año/sección deducibles de la propia fila + joins).

### 3 · ANÁLISIS GRI

#### 3.1 `catalogo_gri`
- **Qué**: el estándar precargado (seed GRI) — la IA no decide el estándar.
- **Columnas**: `codigo VARCHAR(20) PK` · `serie VARCHAR(50) CHECK IN ('100','200','300','400')` · `tema VARCHAR(200) NOT NULL` · `descripcion TEXT` ⚙ **+ `elementos_minimos TEXT NOT NULL` y `keywords TEXT[] NOT NULL` — RESTAURADOS (RS-10)**: sin ellos la detección determinista y el criterio OK/Baja/Sub del estado manual quedan indefinidos · `version_catalogo VARCHAR(30) NOT NULL` (versión del estándar — permitía conservar la versión del análisis).
- **RS (RS-10/RN-027)**: toda fila de `gri_analisis` referencia solo códigos existentes aquí.

#### 3.2 `gri_analisis`
- **Qué**: **la tabla del análisis** — fila por documento + código GRI (empresa/año se derivan del documento); incluye los OK.
- **Columnas**: `id UUID PK` · `documento_id UUID REFERENCES documentos(id)` · `gri_codigo VARCHAR(20) REFERENCES catalogo_gri(codigo)` · `fragmento_id UUID NULL REFERENCES fragmentos_documento(id)` — cita textual proviene del fragmento (verificable) · `cita_textual TEXT NOT NULL` (transcripción textual del fragmento/doc) · `estado estado_gri NULL` (ENUM: `OK | BAJA SUSTANCIA | SUB-REPORTADO`) — **asignado manualmente por el Administrador**, sin `estado_sugerido` (RS-13/RN-029) · `validado_por UUID NULL REFERENCES usuarios(id)` (NULL = pendiente CU006) · ⚙ **`version_catalogo VARCHAR(30) NOT NULL` — RESTAURADA (RS-11)**: snapshot de la versión del catálogo al analizar; si el estándar cambia, el registro queda fiel a su fecha · `realizado_en TIMESTAMPTZ`.
- **Restricciones**: ⚙ **UNIQUE parcial `(documento_id, gri_codigo)`** — una sola fila de resultados por doc/código (evita duplicados de análisis).
- **RS**: el reporte solo lee estados **validados** (`validado_por IS NOT NULL` y `estado IS NOT NULL` — RS-12/RN-027). El estado del análisis se llena automáticamente al terminar la ingesta (pipeline síncrono) y queda pendiente CU006. **El historial de cambios** de estado se registra en `auditoria` (`AJUSTE_BRECHA` con detalle JSONB: analisis_id, anterior→nuevo, observación).

#### 3.3 `sanciones`
- **Qué**: sanciones identificadas en los documentos — negocio puro del reporte.
- **Columnas**: `id UUID PK` · `documento_id UUID REFERENCES documentos(id)` · `fragmento_id UUID NULL REFERENCES fragmentos_documento(id)` · `autoridad_emisora VARCHAR(255) NOT NULL` · `monto NUMERIC(14,2) NULL` ⚙ **NULL = monto no determinado — nunca 0 por defecto (RN-031/RN-032)** · `moneda VARCHAR(10) NULL` · `cita_textual TEXT NOT NULL` · `creado_en TIMESTAMPTZ`.
- **RS**: ⚙ **sanción enlazada al DOCUMENTO; empresa y año se derivan de él** (decisión del modelo — evita duplicar FKs). Sin cita no hay sanción (RN-038): siempre con `fragmento_id` o cita extraída del documento.

### 4 · ASISTENTE RAG

#### 4.1 `consultas_asistente` — **NUEVA**
- **Qué**: cada consulta al asistente IA (Capa 6: `ConsultaAsistente`) — el RAG ahora persiste.
- **Columnas**: `id UUID PK` · `usuario_id UUID REFERENCES usuarios(id)` · `empresa_id UUID NULL REFERENCES empresas(id)` (NULL = consulta sin empresa activa) · `anho SMALLINT NULL` · `pregunta TEXT NOT NULL` · `respuesta TEXT NOT NULL` · `modelo VARCHAR(100) NOT NULL` (GLM-5.2 :free, respaldo…) · `creado_en TIMESTAMPTZ`.
- **RS**: **medidor del free tier** (D-02): consumo diario = `COUNT(*) GROUP BY date(creado_en), modelo` vs `LLM_DAILY_LIMIT` (env var) — RNF-027.

#### 4.2 `consulta_citas` — **NUEVA**
- **Qué**: citas · fuentes de cada respuesta (constancia de la post-verificación de IDs citados).
- **Columnas**: `id UUID PK` · `consulta_id UUID REFERENCES consultas_asistente(id) ON DELETE CASCADE` · `fragmento_id UUID` (referencia lógica al fragmento citado — base vectorial, sin FK física) · `orden SMALLINT NOT NULL` (posición en la respuesta) · `extracto TEXT NOT NULL`.
- **RS**: cada cita debe existir en el contexto recuperado (post-check ids — si el LLM cita fuera del contexto, la cita no se inserta).

### 5 · REPORTES

#### 5.1 `reportes_prospeccion`
- **Qué**: entregables PDF inmutables.
- **Columnas**: `id UUID PK` · `empresa_id UUID REFERENCES empresas(id)` · `generado_por UUID REFERENCES usuarios(id)` · `anho SMALLINT NOT NULL` · `pdf_path VARCHAR(500) NOT NULL UNIQUE` (WeasyPrint) · `sha256 CHAR(64) NOT NULL UNIQUE` (integridad del binario) · `contenido_snapshot JSONB NOT NULL` (estado consolidado congelado: brechas con `estado_final` + **cita textual** + sanciones con montos — sustituye la tabla normalizada) · `creado_en TIMESTAMPTZ`.
- **Restricciones**: ⚙ **UNIQUE parcial `(empresa_id, anho)` — RESTAURADO (RN-041)**: no se generan dos reportes de la misma empresa/año (si cambia el análisis → RNF: consultar regla con PO antes de habilitar regeneración).
- **RS**: el PDF no se invoca al LLM; todo dato proviene de SELECT determinista a `gri_analisis`(validado) + `sanciones` (RN-040/026). El snapshot es fiel a su fecha: cambios posteriores de estados no afectan el PDF emitido (RN-042).

### 6 · AUDITORÍA

#### 6.1 `auditoria`
- **Qué**: bitácora **append-only** de eventos sensibles (Capa 7: `solo INSERT`).
- **Columnas**: `id UUID PK` · `usuario_id UUID NULL REFERENCES usuarios(id)` (NULL = evento anónimo, p. ej. login fallido de correo inexistente) · `empresa_id UUID NULL REFERENCES empresas(id)` (contexto opcional — ⚙ FK visibles aquí) · `tipo_evento tipo_evento_auditoria NOT NULL` (ENUM: `LOGIN | LOGIN_FALLIDO | CAMBIO_ROL | INGESTA | INGESTA_FALLIDA | GEN_REPORTE | AJUSTE_BRECHA | DESCARGA`) · `detalle JSONB NOT NULL` ⚙ **CORREGIDO: era VARCHAR(500)** — contexto por evento (hash, doc_id, motivo, rol anterior→nuevo, resultado de la operación, análisis_id para AJUSTE_BRECHA) · `fecha_hora_utc TIMESTAMPTZ NOT NULL DEFAULT now()` **(RNF-024: UTC; presentación en America/Lima solo en la UI)**.
- **Físico**: ⚙ **REVOKE UPDATE, DELETE** al rol de la app — la BD garantiza el append-only (RN-043/RS-19): los eventos de `AJUSTE_BRECHA` sustituyen el historial de estado de `gri_analisis`.
- **Nota** ⚙: sin columna `ip` en el modelo depurado (la IP queda opcional en fase 2; el entorno es académico de 3 usuarios).

## Reglas semánticas globales (v3)

1. **Sin borrado físico**: solo `sesiones.revocada`, `tokens_recuperacion.usado`, `empresas.activo=false`, `usuarios.habilitado=false` (RNF-019).
2. **Un solo Superadmin**: índice único parcial — transferencia atómica (RS-01).
3. **El estado lo asigna el humano**: sin `estado_sugerido`; `validado_por` exige humanidad (RS-12).
4. **El estándar GRI manda**: `catalogo_gri` con `elementos_minimos` + `keywords` alimenta la detección (RS-10); `version_catalogo` se congela en el análisis (RS-11).
5. **La vectorial es el dominio de consulta**: metadata autocontenida por fragmento — citas trazables (RS-09).
6. **Bloqueo de cuenta**: 5 intentos → 15 min (`intentos_fallidos`/`bloqueado_hasta`, RN-012) + auditoría.
7. **Un reporte por empresa/año**: UNIQUE parcial (RN-041) — regeneración solo si el PO la habilita.

## Checklist GAP

| Paso GAP | Estado |
|---|---|
| Modelo conceptual (entidades, relaciones) | ✔ §cadena + relaciones (13 tablas) |
| Modelo lógico (ER diagrama mermaid) | ✔ (compila; incluye los 4 grupos de Capa 7) |
| Modelo físico (columnas/tipos/índices) | ✔ §Especificación |
| Reglas semánticas (invariantes) | ✔ por tabla + §globales |
| **Diccionario de datos (GAP: campo · tipo · descripción · NULL)** | ✔ documento `03-Diccionario-de-Datos.md` — 13 tablas fichadas con los cambios aplicados |

> Referencias cruzadas: análisis de justificación → `05-Analisis-Por-que-Existen-las-Tablas.md` · stack/env vars de límites → `03-Stack-Tecnologico/01-Stack-Tecnologico.md` §4 · ERD vigente = «Diagrama ER — Modelo de Datos Depurado» (13 tablas, PostgreSQL 16 + pgvector, monolito modular).
