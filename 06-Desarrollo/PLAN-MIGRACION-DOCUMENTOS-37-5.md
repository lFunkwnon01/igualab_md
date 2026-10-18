# 🗄️ Plan de Migración: `documentos` (37 → 5 tablas) — Diseño y Ejecución

> **Objetivo:** partir la tabla `documentos` (37 atributos = 5 responsabilidades mezcladas) en **un núcleo + 4 tablas satélite** (cada una ≤20 atributos), sin perder datos y sin romper funcionalidad.
> **Estado:** 🟡 **plan pendiente de ejecución** · **Beneficio:** buenas prácticas (1 responsabilidad/tabla), servicio más corto, y consultas de reporte más ligeras.
> **Relacionado:** [`GRANULARIZACION-ESTRUCTURA-PROYECTO.md`](GRANULARIZACION-ESTRUCTURA-PROYECTO.md) · [`AUDITORIA-COMPLETA-CODIGO-2026-10.md`](../MEJORAS-A&D/AUDITORIA-COMPLETA-CODIGO-2026-10.md) §4.

---

## 1 · Problema actual
`documentos` tiene **37 columnas** que mezclan **5 responsabilidades**:

| Responsabilidad | Columnas actuales |
|---|---|
| Identidad y contenido | `id, ambiente, empresa_id, anio, tipo, sector, nombre_archivo, sha256, tamano_bytes, usuario_id, creado_en, analisis, advertencias` |
| Almacenamiento (MinIO) | `clave_original, version_id_original, almacenamiento_intentado_en, original_almacenado_en` |
| Procesamiento/estados | `estado_procesamiento, resultado_analisis, completado_en, motivo_fallo, fallido_en, ejecucion_token, ejecucion_vigente_hasta, reserva_activa, etapa_actual, fragmentos_procesados, fragmentos_total, progreso_actualizado_en` |
| Compensación | `estado_compensacion, compensacion_intentos, ultimo_error_compensacion, compensada_en` |
| Publicación vectorial | `vector_escritura_intentada_en, vector_publicado_en, vector_publicacion_intentos, vector_ultimo_error` |

Consecuencia: `documento_service.py` tiene **1370 líneas** (49 funciones) porque debe conocer las 5 cosas.

---

## 2 · Diseño objetivo (5 tablas)

> **Regla clave para el reporte:** las columnas que consulta el reporte (`id, nombre_archivo, sha256, tipo, analisis, resultado_analisis, completado_en`) se quedan en el **núcleo** → el reporte lee **una sola tabla angosta**, sin JOIN.

### `documentos` (núcleo · 15 atributos) — identidad + contenido + clasificación
`id, ambiente, empresa_id, anio, tipo, sector, nombre_archivo, sha256, tamano_bytes, usuario_id, creado_en, analisis, advertencias, resultado_analisis, completado_en`

### `documentos_almacenamiento` (5) — MinIO/S3
`documento_id (PK/FK 1:1), clave_original, version_id_original, almacenamiento_intentado_en, original_almacenado_en`

### `documentos_procesamiento` (11) — máquina de estados + progreso
`documento_id (PK/FK), estado_procesamiento, etapa_actual, fragmentos_procesados, fragmentos_total, progreso_actualizado_en, motivo_fallo, fallido_en, ejecucion_token, ejecucion_vigente_hasta, reserva_activa`

### `documentos_compensacion` (5) — reintentos
`documento_id (PK/FK), estado_compensacion, compensacion_intentos, ultimo_error_compensacion, compensada_en`

### `documentos_vector_publicacion` (5) — publicación vectorial
`documento_id (PK/FK), vector_escritura_intentada_en, vector_publicado_en, vector_publicacion_intentos, vector_ultimo_error`

> Cada satélite se relaciona **1:1** con `documentos` vía `documento_id` (PK/FK). Cada tabla ≤20 atributos ✅.

---

## 3 · Plan de ejecución por FASES (con tests verdes en cada paso)

> Cada fase termina con `pytest`/`vitest`/`tsc` en verde. **Sin cambios de comportamiento** hasta donde sea posible.

| Fase | Qué se hace | Criterio "verde" |
|---|---|---|
| **F0 · Preparar** | rama, backup de la BD dev, correr suite y registrar línea base (2335 tests) | 0 fallos |
| **F1 · Modelos + migración 0005** | crear los modelos de las 4 satélites + la migración `0005_particion_documentos.sql` (solo **crear** tablas, sin tocar `documentos` aún) | tests verdes; la BD crea las 4 tablas |
| **F2 · Migrar datos** | SQL que **copia** las columnas de `documentos` a las satélites (INSERT…SELECT) | verificación: conteos iguales; 0 pérdida |
| **F3 · Partir el servicio** | `documento_service.py` → `reserva / procesamiento / compensacion / publicacion / consultas`, leyendo de las nuevas tablas | 2335 tests verdes |
| **F4 · Limpiar** | quitar de `documentos` las columnas ya movidas (quedan 15) | tests verdes |
| **F5 · Verificar** | suite completa + probar el reporte con BD local | todo verde + reporte genera |

---

## 4 · SQL de la migración (`0005_particion_documentos.sql`)

```sql
-- 1) Crear satélites (1:1 con documentos)
CREATE TABLE documentos_almacenamiento (
    documento_id UUID PRIMARY KEY REFERENCES documentos(id),
    clave_original VARCHAR(512),
    version_id_original VARCHAR(255),
    almacenamiento_intentado_en TIMESTAMPTZ,
    original_almacenado_en TIMESTAMPTZ
);
CREATE TABLE documentos_procesamiento (
    documento_id UUID PRIMARY KEY REFERENCES documentos(id),
    estado_procesamiento estado_procesamiento NOT NULL,
    etapa_actual VARCHAR(32) NOT NULL,
    fragmentos_procesados INTEGER NOT NULL,
    fragmentos_total INTEGER,
    progreso_actualizado_en TIMESTAMPTZ NOT NULL,
    motivo_fallo VARCHAR(64),
    fallido_en TIMESTAMPTZ,
    ejecucion_token UUID NOT NULL,
    ejecucion_vigente_hasta TIMESTAMPTZ NOT NULL,
    reserva_activa BOOLEAN NOT NULL
);
CREATE TABLE documentos_compensacion (
    documento_id UUID PRIMARY KEY REFERENCES documentos(id),
    estado_compensacion estado_compensacion NOT NULL,
    compensacion_intentos INTEGER NOT NULL,
    ultimo_error_compensacion VARCHAR(64),
    compensada_en TIMESTAMPTZ
);
CREATE TABLE documentos_vector_publicacion (
    documento_id UUID PRIMARY KEY REFERENCES documentos(id),
    vector_escritura_intentada_en TIMESTAMPTZ,
    vector_publicado_en TIMESTAMPTZ,
    vector_publicacion_intentos INTEGER NOT NULL,
    vector_ultimo_error VARCHAR(64)
);

-- 2) Migrar datos (Fase 2) — copia sin borrar todavía
INSERT INTO documentos_almacenamiento SELECT id, clave_original, version_id_original, almacenamiento_intentado_en, original_almacenado_en FROM documentos;
INSERT INTO documentos_procesamiento SELECT id, estado_procesamiento, etapa_actual, fragmentos_procesados, fragmentos_total, progreso_actualizado_en, motivo_fallo, fallido_en, ejecucion_token, ejecucion_vigente_hasta, reserva_activa FROM documentos;
INSERT INTO documentos_compensacion SELECT id, estado_compensacion, compensacion_intentos, ultimo_error_compensacion, compensada_en FROM documentos;
INSERT INTO documentos_vector_publicacion SELECT id, vector_escritura_intentada_en, vector_publicado_en, vector_publicacion_intentos, vector_ultimo_error FROM documentos;

-- 3) (Fase 4, tras validar) DROP de las columnas movidas en documentos
```

> El motor de migraciones exige registrarla en `app/migraciones/catalogo.py` y **regenerar `firmas.json`**:
> `IGUALAB_REGENERAR_FIRMAS=1 python -m pytest tests/services/test_migraciones_firmas.py`

---

## 5 · Refactor del servicio (`documento_service.py` → 5)

| Archivo nuevo | Contenido |
|---|---|
| `application/reserva.py` | reservar documento, sha256, token de ejecución, vigencia |
| `application/procesamiento.py` | máquina de estados, progreso, COMPLETADO/FALLIDO |
| `application/compensacion.py` | rollback/reintentos |
| `application/publicacion.py` | publicación vectorial |
| `application/consultas.py` | `documentos_recuperables`, listar, detalle |

Cada uno lee/escribe **su satélite**. `coordinador.py` sigue orquestando.

---

## 6 · Riesgos y mitigaciones

| Riesgo | Mitigación |
|---|---|
| Perder datos al migrar | INSERT…SELECT en transacción + verificación de conteos antes/después |
| Romper el servicio de 1370 líneas | partirlo en F3 **con tests verdes en cada paso** |
| Consultas de reporte más lentas (JOIN) | dejar las columnas del reporte en el **núcleo** (sin JOIN) |
| Migración mal registrada | regenerar `firmas.json` y usar el motor de migraciones (checksum) |
| La BD de dev ya tiene datos | probar primero en local / copia de dev, no directo |

---

## 7 · Criterios de aceptación
1. `documentos` queda con **15 atributos** y las 4 satélites creadas.
2. **2335 tests verdes** (sin regresiones).
3. El **reporte se genera igual** (usa el núcleo, sin JOIN).
4. `documento_service.py` dividido (cada archivo <500 líneas).
5. Sin pérdida de datos (conteos verificados).

> **Siguiente paso:** aprobar el plan → empezar por **F1** (modelos + migración) con tests verdes.
