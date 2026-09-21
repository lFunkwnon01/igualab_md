# 05 · Análisis de Alto Nivel — Por qué existe cada tabla (y por qué NO sobra)

> **Numeración alineada al A&D v6 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Cuestionamiento legítimo del equipo: "¿son necesarias todas las tablas?". Respuesta corta: **sí, y ahora son menos**: la arquitectura por capas quitó módulos y el modelo quedó en **13 tablas** — cada una sigue respondiendo a la cadena del negocio, a una regla de negocio (RN) o a un propietario distinto del dato (regla oro: nunca dos tablas contienen lo mismo).

## ✅ v3 · RESPUESTA ALINEADA AL MODELO DE DATOS DEPURADO

1. **La premisa se cumple mejor**: de 14 → 13 tablas. Se **retiraron 5** (se quitaron módulos) y se **agregaron 4** nuevas, manteniendo la regla de diseño intacta.
2. **Retiradas** (se quitaron módulos): `roles` (ENUM + UNIQUE parcial en `usuarios.rol`), `configuracion` (variables de entorno — doc Stack §4), `uso_llm` (consumo derivable de `consultas_asistente`), `gri_analisis_historico` (traza en `auditoria` con detalle JSONB), `reporte_detalle_snapshot` (JSONB en `reportes_prospeccion`).
3. **Nuevas (4)**: `sesiones` · `tokens_recuperacion` (autenticación sessionizada — Capa 6: `Sesión (TokenRecuperación)`) · `consultas_asistente` + `consulta_citas` (el Asistente IA — RAG ahora persiste consulta + citas · fuentes).
4. **El propósito de las tablas que se mantienen no cambia**: la justificación por cadena de negocio + RN sigue vigente.

## 1. Principio de diseño que gobierna el fundamento

BD de fase 1 = **13 tablas** (PostgreSQL 16 + pgvector · monolito modular), organizadas en 4 grupos — eso responde a la sensación de «son muchas»:

| Grupo | Tablas | ¿Qué tan indispensables? |
|---|---|---|
| **N1 · Núcleo de negocio (5)** | `empresas`, `documentos`, `fragmentos_documento`, `catalogo_gri`, `gri_analisis` | **Indispensables** — la plataforma no existe como negocio sin una de ellas. |
| **N1-bis · Complementarias de negocio (2)** | `sanciones`, `reportes_prospeccion` | Negocio puro: objeto del reporte y entregable final. |
| **N2 · Cumplimiento/trazabilidad (1)** | `auditoria` | Obligatoria (append-only) — **absorbe** la traza de los cambios de estado (sustituye a `gri_analisis_historico`). |
| **N3 · Soporte operativo (5)** | `usuarios`, `sesiones`, `tokens_recuperacion`, `consultas_asistente`, `consulta_citas` | Acceso y operaciones — pequeñas, cadauna dueña única del dato. |

> Nota: la separación por grupos es para la lectura, no un orden de prioridad físico.

## 2. Tabla por tabla — ¿por qué existe, para qué, y por qué no sobra?

### N1 · Núcleo de negocio

1. **`empresas`** — *de dónde nace*: alcance del plan v1.2 (los 3 sectores cerrados — CHECK en la BD, RN-015). *Qué hace*: única clave de negocio; los documentos cuelgan de `empresa_id` (RN-022) y el CHECK garantiza los sectores en la propia BD. *Si no existiera*: cada submit grabaría texto-plano y los filtros de sector no estarían garantizados.
2. **`documentos`** — *de dónde nace*: ingesta (acta 5 · REQ-20). *Qué hace*: estado del pipeline por archivo (indexado/observado/rechazado), sha256 anti-duplicado (RNF-011) y `tamano_bytes` con CHECK ≤ 50 MB (RN-015). *Si no existiera*: no habría forma de saber qué está indexado, con qué estado, ni de auditar el doc del que proviene cada cita.
3. **`fragmentos_documento`** — *de dónde nace*: motor RAG del plan v1.2. *Qué hace*: **la BD vectorizada** — fragmentos del `.md` (sección o fila de tabla) con embedding + metadata (empresa/año/tipo doc). Es la tabla consultada en cada pregunta del chat (AI Harness — Capa 5) y la **fuente de las citas** (RN-034). *Si no existiera*: no hay RAG ni citas verificables.
4. **`catalogo_gri`** — *de dónde nace*: el PO definió el "GRI óptimo" como criterio humano: el **estándar precargado** con `elementos_minimos` + `keywords` y `version_catalogo` (RS-10/RS-11). *Qué hace*: define el "expected" sin dejarlo a cielo abierto del modelo. *Si no existiera*: el humano no tendría criterio objetivo para el estado manual ni para la detección determinista — la IA no decide el estándar (RS-13).
5. **`gri_analisis`** — *de dónde nace*: RN-027/020 (el humano confirma; todo se registra). *Qué hace*: **la tabla del análisis** — fila por documento + código GRI (empresa y año se derivan del doc); única tabla de resultados (UNIQUE doc + código). Se puebla **automáticamente al terminar la ingesta** y el estado lo asigna **manualmente el Administrador** (`validado_por`) — CU006. El reporte solo lee **esta tabla** con estados validados (RN-041). *Si no existiera*: el reporte tendría que re-analizar PDF en vuelo con el LLM — justo lo prohibido.
   - El **historial de cambios de estado** vive en `auditoria` (evento `AJUSTE_BRECHA` con detalle JSONB: analisis_id, anterior→nuevo, observación — sustituye a `gri_analisis_historico`).

### N1-bis · Negocio puro / entregable

6. **`sanciones`** — *de dónde nace*: plan (sanciones como evidencia comercial) + RN-038 (solo con cita). *Qué hace*: sanciones con `autoridad_emisora`, monto **NULL permitido — nunca 0 por defecto** (RN-031/RN-032) y cita textual obligatoria. *Si no existiera*: sanciones quedarían a merced del LLM (violación RN-038) y el reporte no tendría su objeto comercial.
7. **`reportes_prospeccion`** — *de dónde nace*: RN-040 (inmutable) + RN-041 (un solo reporte por empresa/año). *Qué hace*: entregable PDF con **binario consultable vía hash + snapshot JSONB congelado por línea** — fidelidad total a la fecha de emisión. *Si no existiera*: solo habría un binario no consultable, sin datos auditables por línea.

### N2 · Cumplimiento/trazabilidad

8. **`auditoria`** — *de dónde nace*: acta 4/5 (registro automático de eventos sensibles). *Qué hace*: bitácora **append-only** (REVOKE UPDATE/DELETE en BD) · `tipo_evento` ENUM (`LOGIN | LOGIN_FALLIDO | CAMBIO_ROL | INGESTA | INGESTA_FALLIDA | GEN_REPORTE | AJUSTE_BRECHA | DESCARGA`) · `detalle` JSONB (incluye la traza por fila de los cambios de estado) · `fecha_hora_utc` (RNF-024). *Si no existiera*: nada sería demostrable con evidencia (el PO pide traza — acta 5).

### N3 · Soporte operativo

9. **`usuarios`** — *de dónde nace*: acceso + responsabilidad (RF-001/005). *Qué hace*: identidad de las 3 personas; soporta el índice único parcial «un solo Superadmin» (RS-01) y el bloqueo por intentos fallidos (RN-012). *Si no existiera*: no habría RBAC ni unicidad de Superadmin.
10. **`sesiones`** — *de dónde nace*: módulo de gestión de sesiones (Capa 4/6). *Qué hace*: sesión explícita del JWT/sid; revocar = logout/inhabilitación de tokens (RNF-006: rol vigente en cada petición). *Si no existiera*: no habría revocación en runtime (logout) — riesgo con la transferencia de rol.
11. **`tokens_recuperacion`** — *de dónde nace*: RF-006 (cambio y recuperación de contraseña). *Qué hace*: token single-use con hash único y expiración. *Si no existiera*: no habría auto-recuperación de acceso (RN-006) — los cambios de contraseña dependian del Superadmin.
12. **`consultas_asistente`** — *de dónde nace*: decisión v3 (D-02). El Asistente IA — RAG persiste cada consulta con el modelo usado. *Qué hace*: además del historial de chat, es el **medidor del free tier**: COUNT por día/modelo vs env var `LLM_DAILY_LIMIT` (RNF-027) — sustituye a `uso_llm` sin perder trazabilidad (los tokens de embeddings se mide en fase 2 si se requiere, con `uso_embeddings`).
13. **`consulta_citas`** — *de dónde nace*: post-verificación de citas (post-check IDs). *Qué hace*: constan por consulta las citas verificables enlazadas al fragmento. *Si no existiera*: no habría forma obligada de demostrar que el asistente fundamentó en el corpus (RN-035/RNF-010).

## 3. Consolidación v3 — ¿por qué se retiraron 5 tablas (y no sobraban)?

| Retirada | Respuesta |
|---|---|
| `roles` | El conjunto cerrado es una regla, no un dato: ENUM/CHECK + índice único parcial en `usuarios.rol` (transferencia de rol = transacción). El catálogo no aporta integridad adicional en fase 1 |
| `configuracion` | El módulo Configuración fue quitado en fase 1 → umbrales vía variables de entorno (doc Stack §4) |
| `uso_llm` | El consumo diario se deriva de `consultas_asistente` (COUNT por día/modelo) — una tabla, dos de sus usos: historial + medidor |
| `gri_analisis_historico` | El detalle JSONB de los eventos `AJUSTE_BRECHA` de `auditoria` cubre la traza por fila (anterior→nuevo, observación, quien) |
| `reporte_detalle_snapshot` | `contenido_snapshot` JSONB en `reportes_prospeccion` es el resultado congelado por línea + PDF inmutable con hash. En el dashboard de fase 2 se leen las líneas de ese JSONB (GET-only) |

Estas 5 fusiones respondieron de una vez a las candidatas plausibles: una tabla retirada no cayó «por si acaso», cada retirada conservó su fundamento dentro del dueño del dato.

## 4. Resumen — las 13 tablas y su «dueño del dato» (v3)

| Grupo | Tablas | «Dueño del dato» |
|---|---|---|
| Contenido fuente | empresas · documentos · fragmentos_documento | lo que el cliente sube (transformado y vectorizado) |
| Conocimiento de referencia | catalogo_gri | el estándar GRI |
| Resultados analíticos | gri_analisis · sanciones | lo que el humano validó |
| Entregable | reportes_prospeccion | lo que se emitió (congelado) |
| Asistente / Operativa | usuarios · sesiones · tokens_recuperacion · consultas_asistente · consulta_citas | control operativo |
| Bitácora | auditoria | las acciones (append-only) |

> Cada tabla existe por un hecho de negocio (actas/plan/RN) y un dueño único del dato. Ahora son **13**: las 5 retiradas (módulos eliminados) y las 4 agregadas cambiaron la forma del modelo, no la regla de diseño.

---

**Referencias:** diseño completo → `02-Base-de-Datos-Diagrama-y-Diseno.md` · diccionario campo a campo → `03-Diccionario-de-Datos.md` · diagrama vigente: **ERD «Modelo de Datos Depurado» (13 tablas)** — `Diagrama_bd.png` queda como histórico.
