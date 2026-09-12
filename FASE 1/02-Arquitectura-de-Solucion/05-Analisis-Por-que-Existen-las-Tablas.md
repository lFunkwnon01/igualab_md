# 05 · Análisis de Alto Nivel — Por qué existe cada tabla (y por qué NO sobra)

> Cuestionamiento legítimo del equipo: "¿no son demasiadas tablas? ¿son todas necesarias?". Respuesta corta: **sí son necesarias, pero se explican de tres razones: la cadena del negocio, las reglas de negocio (RN) que las exigen, y la regla oro del modelo: cada tabla existe para un propietario distinto del dato — nunca dos tablas contengan lo mismo.**

## 1. Principio de diseño que gobierna el fundamento

BD de fase 1 = **14 tablas**, pero NO son 14 "igual de importantes". Se ordenan en 4 niveles, y eso responde a la sensación de «son muchas»:

| Nivel | Tablas | ¿Qué tan indispensables? |
|---|---|---|
| **N1 · Núcleo de negocio (6)** | `empresas`, `documentos`, `chunks_embeddings`, `catalogo_gri`, `gri_analisis`, `reportes_generados` | **Indispensables** — sin una de estas, la plataforma no existe como negocio. |
| **N2 · Cumplimiento/compliance (3)** | `auditoria_eventos`, `gri_analisis_historico`, `reporte_detalle_snapshot` | Obligatorias por **reglas de negocio de trazabilidad** (acta 4/5) — no son "extras" de ingeniería, son requisitos. |
| **N3 · Soporte operativo (3)** | `usuarios`, `roles`, `configuracion` | Necesarias pero pequeñas: darían problemas si se unen (ver §3). |
| **N4 · Métricas/transversal (2)** | `sanciones`, `uso_llm` | Sanciones es **negocio** (objeto del reporte); uso_llm es el medidor del free tier. |

Ejemplo: el parecido visual entre `gri_analisis` y `gri_analisis_historico` se puede confundir con "tabla repetida", pero cumplen roles opuestos: una es el **estado actual** del análisis (lo que muestra el sistema hoy), la otra es la **historia inmutable** de cambios (quién decidió qué y cuándo, RN-019). Son complementarias, no duplicadas.

## 2. Tabla por tabla — ¿por qué existe, para qué, y por qué no sobra?

### N1 · Núcleo de negocio

1. **`empresas`** — *de dónde nace*: alcance del plan v1.2 (análisis limitado a 3 sectores — acta/REQ-17). *Qué hace*: catálogo de empresas la única clave de negocio; que los documentos se asocien a `empresa_id` (RN-014) y al sector permitido (CHECK, RN-017). *Si no existiera*: cada submit de doc tendría que grabarse texto-plano y los filtros no garantizarían la restricción de sectores en la propia BD.

2. **`documentos`** — *de dónde nace*: RF-007/008 (ingesta) · acta 5 REQ-20. *Qué hace*: Garantiza la trazabilidad del archivo fuente. **Estado del pipeline por archivo** (.md ingerido: indexado/observado/rechazado) — obviamente todo análisis proviene de un doc; el hash (sha256) es el borde anti-duplicado (RN-015). *Si no existiera*: no habría forma de conocer **qué** está indexado, reproducir la ingesta de una empresa, o auditar el lugar de citación (doc → cita).

3. **`chunks_embeddings`** — *de dónde nace*: plan v1.2 (motor RAG), RN-022/23. *Qué hace*: **la BD vectorizada** — cada fragmento del `.md` con su embedding de 1024 dims y su metadata (empresa/año/código GRI/sección). Es la tabla que se consulta en cada pregunta del chat del Administrador. *Si no existiera* no hay RAG, y el no tendrían su fuente de búsqueda.

4. **`catalogo_gri`** — *de dónde nace*: pregunta explícita del PO ("¿cómo sabe la IA cuál es el GRI óptimo?") → respuesta: es el **estándar GRI precargado**; regla RN-018. *Qué hace*: define el "expected" (elementos mínimos de reporto por código); la IA no decide el estándar — aquí está la respuesta. *Si no existiera*: la "brecha" quedaría a cielo abierto en el modelo y violaría la regla de que el humano — no el LLM — define estados.

5. **`gri_analisis`** — *de dónde nace*: RN-019/020 (humano confirma/reajusta; *todas* las brechas se registran), acta 4/5. *Qué hace*: **la tabla del análisis** — fila por empresa+doc+código GRI, con `estado_sugerido` (salida del motor de reglas al terminar la ingesta) y `estado` (validado por el humano con `validado_por`). El reporte solo lee **esta tabla** (RN-027): es la base de la generación determinista. *Si no existiera*: el reporte tendría que "consultar al LLM" o re-analizar pdf en el vuelo — justo lo que decidimos prohibir (RN-027).

6. **`reportes_generados`** — *de dónde nace*: RN-026/028 (reportes PDF inmutables y versionados). *Qué hace*: registro de cada PDF (versión, hash, sector, pdf_path) — el entregable comercial. Con la **tabla compañera `reporteDetalle_snapshot`** (§N1-bis) garantiza que el reporte emitido sea fiel a la fecha y que toda próxsimas regeneración sea una versión nueva. *Si no existiera*: no hay versionado ni trazabilidad de entregables (violando RN-028/031).

7. **`reporte_detalle_snapshot`** (n1-bis) — *de dónde nace*: RS-18/RN-026 — el reporte **consolida** brechas y sanciones con estado final + cita, y el resultado **no puede verse modificado**. *Qué hace*: fila por línea del reporte (BRECHA o SANCION — CHECK de exclusividad) con el **estado_final y cita congelados** a la fecha de emisión: si mañana un estado se cambia, el PDF anterior sigue siendo correcto históricamente. *Si no existiera*: el reporte dependería de estados vivos que siguen cambiando (reportes que "se reescriben solos") — violando RN-028.

### N2 · Cumplimiento de trazabilidad (aquí es donde "parece que sobra" y NO sobra)

8. **`auditoria_eventos`** — *de dónde nace*: acta 4/5 (registro automático de eventos sensibles), plan v1.2 módulo de auditoría. *Qué hace*: bitácora append-only de login, cambio de rol, ingesta, generación. Es la traba de integridad del proyecto: no descarta NINGUNA acción que modifique estado. Si no existiera: nada verifiable con el cliente (la conformidad del acta 5 demostró que Oscar pide evidencia).

9. **`gri_analisis_historico`** — *de dónde nace*: RF-025/RN-019 — el análisis de estados lo confirma o cambia **el humano por diseño** (supervisión del PO explicada con el propio Oscar). *Qué hace*: **diferencia crítico respecto de auditors**: registra específicamente **anterior → nuevo por indicador** con observación — imposible reconstituir con una auditoría global JSONB de forma consultiva (es lo que se muestra en el panel CU006 por fila). *Si no existiera*: los cambios de estado no serían recuperables ni reportables (break de RN-019). Nota: podría "fusionarse" con auditoria_eventos (ver §3.2 — decidido NO por consulta por detalle).

### N3 · Soporte operativo

10. **`usuarios`** — acceso + responsabilité (RF-001/005; RN-001/003). 3 personas — soporta el índice único parcial de "1 solo Superadmin" (RS-01).
11. **`roles`** — *el catálogo más pequeño que existe* y sigue siendo útil: define la integridad referencia del RBAC (FK usable en el middleware). Ver §3.1: es candidata a eliminación, con implicaciones.
12. **`configuracion`** — parámetros dinámicos (minutos de inactividad, bloques, `upload_max_mb=15`, `llm_daily_limit=200`), RF-006/RNF-20: **cambiar el límite del free tier o el peso máximo sin desplegar código**.
13. **`uso_llm`** — contador diario (fecha UNIQUE) del asistente: soporte de RN-025/RNF-11 (200 req/día), con diagnóstico (tokens/ incidencias) — es lo que permite avisar al PO "se agotó la cuota de hoy" y no gastar el cupo en generación de reportes (que no lo usan).

14. **`sanciones`** — *de dónde nace*: kick-off/plan (sanciones como evidencia comercial) + RN-021 (solo con cita). Es **negocio puro** (objeto del reporte N2), no soporte.

## 3. ¿Se pueden juntar algunas? — Análisis de consolidación (honesto)

Evaluamos las 3 fusiones plausibles, con costo/beneficio:

### 3.1 `roles` → ¿eliminarla y usar CHECK en `usuarios.rol`?
- **Candidato de fusión**: sí; con `_CHECK (rol IN ('superadmin','administrador'))` la integridad existe sin la tabla.
- **Por qué se mantiene** (decisión): es la manera estándar de crear la **palabra clave del rol con su descripción** para el futuro (si en fase 2 se añadieran nuevos roles, crece sin migración de columnas; además es el catálogo sobre el que el docente/ACL puede revisar el RBAC). [Es la tabla más "barata" del esquema (2 filas).]
- **Veredicto**: mantener. Costo 0 (2 filas), gana semántica del RBAC.

### 3.2 `gri_analisis_historico` → ¿meterlo en `auditoria_eventos.detalle` JSONB?
- **Candidato** (real): un evento `AJUSTE_BRECHA` con `detalle={gri_analisis_id, anterior, nuevo, observación}` deja el historial "en" la auditoría y quita 1 tabla.
- **Por qué se mantiene**: separar el **historial de estados a nivel de INDICADOR** es lo que hace **consultable** para CU006 (cada fila del análisis muestra su cadena de cambios con observación) y lo que impide **perder granularidad** al filtrar por gre. Si un día se desean rankings por empresa, estado y fecha — directo de aquí — sin parsear JSONB. Es barata (pocos registros) y está diseñada **por la regla de negocio** — no por cautela del desarrollador. *Veredicto*: mantener (puede migrarse más adelante/normalizado ningunos... revisar en fase 2).
- Si en la revisión el equipo **prefiere simplificar**: fusionarla con auditoria_eventos exige que TODO análisis por fila se refleje como evento — correcto... pero perderías para la consulta "cuál fue la evolución del GRI 401 de Minera Andina" el privilegio de join directo; haría el control fachada al JSONB. En este proyecto esa consulta es el uso cotidiano del panel del análisis.

### 3.3 `reporte_detalle_snapshot` — ¿no es redundante con el PDF ya generado?
- **Propuesta de eliminación** (plausiblemente la más tempted): "el PDF ya existe, ¿para qué el snapshot?".
- **Razón de fondo para mantenerla**: el PDF es un binario (no consultable) y los TLs del order poder no se pueden "consultar" (cuando una filo se genera, el PDF es descarga). El snapshot es la **única forma de saber exactamente qué datos se usaron por línea**, y el la base del dashboard del dashboard fase 2 (es lo que incluye). Es la diferencia entre tener un binario (el PDF) y tener datos consultables y auditables.
- **Costo real**: insert 1 fila por indicador — **mismos costos del reporte**. Mantener.

### 3.4 `uso_llm` → ¿una fila en `configuracion` con contador?
- **Candidato** que cae solo: el contador **es por fecha** (clación diaria RN-025); `configuracion` es clave/valor — meter índices diarios violaría la unicidad de fechas. Además, la correlación de tokens cuesta horaría/journal al e2e. Mantener separada (la tabla del medidor). ✔

## 4. Resumen / decisión del equipo sobre el fundamento del modelo

**El modelo no tiene tablas de más. Las 14 están lá, cada una, por un propietario distinto del dato:**

| Grupo | Tablas | "Dueño del dato" |
|---|---|---|
| Contenido fuente | empresas · documentos · chunks_embeddings | lo que el cliente sube (transformado) |
| Conocimiento de referencia | catalogo_gri | estándar externo GRI |
| Resultado de análisis | gri_analisis · gri_analisis_historico · sanciones | lo que el humano validó |
| Entregables | reportes_generados · reporte_detalle_snapshot | lo que se emitió (congelado) |
| Seguridad/soporte | usuarios · roles · auditoria_eventos · configuracion · uso_llm | control operativo |

Ninguna de las 14 responde "¿y esto para qué?" con "por si acaso": cada una existe justo al casarla equivalencia con un acto de estudio (actas/plan: RN/RF de la fase 1) y una única responsabilidad.

--

**Referencia de diseño completo:** `02-Base-de-Datos-Diagrama-y-Diseno.md` (§3.1–3.13 + 3.10bis). El diccionario campo a campo: `03-Diccionario-de-Datos.md`.
