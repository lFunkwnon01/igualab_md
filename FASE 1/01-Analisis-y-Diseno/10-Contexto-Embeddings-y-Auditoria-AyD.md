# 10 · Contexto del chat "Requisitos de embeddings" + Auditoría RN/RF/RNF (A&D v2)

> Fuente: conversación compartida por el equipo (ChatGPT, 14/09) + revisión del A&D v2. Este documento **fija la decisión de arquitectura sobre embeddings** y consolida la **lista accionable de correcciones** de RN/RF/RNF para el A&D.

---

## PARTE 1 · Decisión de arquitectura: embeddings y LLM por API

### Lo que se aclaró en el chat (flujo real)
```
Markdown → Chunking (Python, sin IA) → Embeddings (API del proveedor) → pgvector
        → búsqueda vectorial → contexto → LLM generativo (API) → respuesta
```

- El **chunking** es código Python puro (conteo de caracteres), **sin IA**.
- "Embedding" = "vectorizar": **una sola llamada** al servicio de embeddings; no hay paso aparte.
- Guardar el vector en pgvector es un **INSERT** normal, sin modelo.
- **Embeddings y LLM generativo son dos servicios/modelos distintos**, aunque puedan ser del **mismo proveedor**. No debe decirse "una LLM que tenga embeddings".

### Decisión (según el chat)
> **El sistema usará los servicios de embeddings y de generación por API del proveedor de IA configurado, sin ejecutar modelos de embeddings por API.**

⚠️ **Esto revierte la decisión anterior de "embeddings locales"** (que había marcado el equipo); la decisión vigente pasa a ser la del chat: **embeddings por API del proveedor**. Consecuencia a asumir: **los embeddings también consumen cuota/límite del proveedor**, por lo que la RN de consumo y la tabla `uso_llm` deben contar también los tokens de embeddings (o llevar contador aparte `uso_embeddings`).

### Requisitos tal como deben quedar (los tres)
| Componente | Requisito |
|---|---|
| **Embeddings** | "El sistema deberá integrar, mediante API, un servicio de generación de embeddings para vectorizar los fragmentos de texto antes de almacenarlos en la base de datos vectorial." |
| **Modelo generativo** | "El sistema deberá integrar, mediante API, un modelo de lenguaje para generar respuestas a partir del contexto recuperado por el sistema RAG." |
| **Proveedor** | "El sistema deberá permitir configurar un proveedor de IA que ofrezca servicios de generación de embeddings y de generación de respuestas mediante API, utilizando las credenciales correspondientes." |

### Proveedores que cumplen "embeddings + generación por API" gratis
| Proveedor | Embeddings | Generación | Nota |
|---|---|---|---|
| **NVIDIA NIM** (build.nvidia.com) | ✅ (nv-embed / llama-nv-embed) | ✅ `z-ai/glm-5.2` (40 RPM) | **Mismo proveedor para ambos** — encaja con RNF-036 del A&D |
| **Google AI Studio** | ✅ `gemini-embedding-*` (free tier) | ✅ Gemini Flash (free) | Alternativa directa |
| **OpenRouter** | ⚠️ Qwen3-Embedding (pago barato ~$0.01/M) | ✅ GLM-5.2 `:free` | Embeddings no son gratis aquí |
| **Z.ai / DashScope** | ✅ (Qwen embeddings) | ✅ GLM/Qwen Flash | Cuota gratuita según plan |

**Recomendación**: usar **un solo proveedor que dé ambos servicios** (NVIDIA NIM o Google AI Studio), cumpliendo RNF-036; el `LlmClient`/`EmbeddingClient` quedan abstraídos por si cambia.

---

## PARTE 2 · Auditoría RN/RF/RNF del A&D v2 (accionable)

### 2.1 Duplicados y filas a descartar

| Identificadores | Problema | Qué hacer | Solución |
|---|---|---|---|
| RF-014 y RF-015 | Ambos permiten transferir el rol SuperAdmin | Fusionar; eliminar RF-015 | RF-014: "transferir su rol a un Administrador habilitado, pidiendo confirmación y asignando el rol Administrador a la cuenta de origen" |
| RF-048 y RF-050 | Ambos restringen la lista a empresas con documentos indexados | Conservar RF-048; eliminar RF-050 | — |
| RF-019 y RNF-037 | Mismo comportamiento; RNF-037 no es no funcional | Eliminar RNF-037 | Mantener RF-019 (+ RN-011/RN-014) |
| RNF-003 y RNF-032 | Ambos regulan identidad/rol en el token | Fusionar | "El token firmado contiene la identidad y no acepta datos de autorización del cliente; el rol vigente se valida en el servidor" |
| RN-031, RF-069 y RNF-019 | Repiten la continuidad cuando falla la IA | Mantener RN-031 (política) y RNF-019 (disponibilidad); eliminar RF-069 | Conservar RF-070 (informar indisponibilidad) |
| RF-068 y RNF-022 | Borrado lógico con la misma redacción | Separar: RF-068 = qué desactiva el usuario; RNF-022 = implementación (lógico) | Ampliar: excluir **reportes** del borrado (RN-027) |
| RNF-038 | Repite RN-022/RF-042 y no es RNF | Eliminar | Queda en RN-022, RF-041, RF-042 |
| RF-074 | Duplica historial de reportes (RF-062); "prospecto" indefinido | Eliminar si es el historial; si es otra entidad, definir RN + modelo de datos | — |
| RN-020 | Fila vacía | **No eliminar**: usarla como "Límite de tamaño" (50 MB) | Ver 2.2 |
| RF-038/039/040/052/055/056/066/071/072 | Filas vacías | Eliminar (renumerar al estabilizar) | — |
| RNF-023/028/029/033 | Filas vacías | Eliminar | — |
| "crear regla negoci par" | Nota de trabajo | Eliminar | — |

### 2.2 Filas vacías que deben COMPLETARSE (no eliminarse)

| ID | Por qué | Contenido recomendado |
|---|---|---|
| **RN-015** | De ella deriva RF-030 | "Todo documento conserva uno de estos estados: EN PROCESO, INDEXADO o RECHAZADO; si es rechazado se registra el motivo." (Cambiar "éxito" por "indexado") |
| **RN-032** | Usada por RF-068/RNF-020/RNF-022 | "Los **documentos y fragmentos** retirados se conservan por marcado de estado; no se eliminan físicamente." (Excluir reportes: RN-027) |
| **RF-025** | Falta chunking | "Dividir el contenido aceptado en fragmentos de texto mediante el mecanismo de segmentación configurado." |
| **RF-026** | Falta embeddings | "Enviar cada fragmento al servicio de embeddings del proveedor y obtener su vector **por API**." |
| **RF-028** | Falta almacenamiento vectorial | "Almacenar cada fragmento, su vector y la referencia a su documento de origen en la base vectorial." |
| **RF-031** | De él deriva RNF-018 | "Permitir al Administrador ejecutar el análisis GRI/sanciones seleccionando empresa y año con documentos indexados." |
| **RF-034** | Falta identificación GRI | "Identificar en los documentos del año las menciones de los códigos del catálogo GRI y recuperar sus citas." |
| **RF-035** | Falta la asignación manual | "Permitir al Administrador asignar manualmente a cada código GRI uno de los estados permitidos, tras revisar su evidencia." |
| **RF-036** | Falta guardar resultados | "Almacenar el estado GRI, la cita, las sanciones identificadas y la condición de evidencia disponible." |

### 2.3 "Deriva de" ausente o incorrecto

| Requisito | Problema | Corrección |
|---|---|---|
| RF-001 | Falta coma | RN-001, RN-004, RN-007 |
| RF-005 / RF-006 | RN-005 no regula expiración/cierre de sesión | Crear RN de ciclo de vida de sesión (o dejar sin RN) |
| RF-011 | RN-007 no fija unicidad | Reformular RN-007: "correo corporativo **único** de dominio autorizado" |
| RF-019 | Falta tipo documental | RN-011, RN-014 |
| RF-021 | RN-012 es de conversión, no de tamaño | Quitar RN-012; usar **RN-020 (límite 50 MB)**; RNF-014 deriva de RF-021 |
| RF-023 | RN-039 prohíbe empresa/tipo/año, no duplicidad por hash | Crear RN específica de duplicidad por contenido (SHA-256) |
| RF-027 | RN-012/RN-034 no justifican estados | Usar RN-015 (estados documentales) |
| RF-029 | RN-022 es de respuestas, no de indexación | Ligar a RF-025/026/028 o crear RN de incorporación al corpus |
| RF-030 | Deriva de RN-015 (vacía) | Completar RN-015 |
| RF-046 | RN-022 no fija historial | Crear RN de conservación de historial o quitar RN-022 |
| RF-049 / RF-051 | Sin RN | RN-018, RN-021 |
| RF-050 | Duplica RF-048 | Eliminar |
| RF-058 | RN-033 no sustenta montos | Dejar solo RN-034 (o reformular RN-033) |
| RF-061 | RN-027 es inmutabilidad, no formato | Dejar sin RN o precisar "PDF" en RN-025 |
| RF-068 | RN-032 vacía | Completar RN-032 (sin reportes) |
| RF-074 | Sin RN ni prioridad | Eliminar si duplica RF-062 |
| RF-075 | Cita RN-035 inexistente | Cambiar a **RN-034** (puntaje ESG); RN-025 si va en el reporte |
| RNF-001 | No cubre cambio/recuperación | Derivar de RF-002, RF-004, RF-010 |
| RNF-002 | RN-007 no sustenta hash | Derivar de RF-002/004/010 o crear RN de protección de credenciales |
| RNF-013 | RF-066 vacío | Cambiar a RN-030, RF-064, RF-065 |
| RNF-018 | RF-031 vacío | Completar RF-031 |
| RNF-020 | RN-032 ≠ atomicidad | Dejar RF-027; crear RN de integridad de ingesta si hace falta |
| RNF-022 | RN-032 vacía y contradice RN-027 | Completar RN-032; limitar a documentos y fragmentos |
| RNF-027 | RN-019 no define catálogo/versión | Derivar de RN-018, RN-019 |
| RNF-036 | Sin "Deriva de" | RF-026, RF-041 |
| RNF-037 | Duplica RF-019 y sin "Deriva de" | Eliminar |
| RNF-038 | Mal clasificado y sin "Deriva de" | Eliminar |

### 2.4 Requisitos a REFORMULAR

| Requisito | Error/ambigüedad | Reformulación |
|---|---|---|
| RN-004 | Contradice RN-006 (el SuperAdmin inicial no lo creó otro) | "Solo se autentican cuentas habilitadas y registradas, **incluida la cuenta SuperAdmin creada en el despliegue**." |
| RN-007 | "Correo corporativo" sin criterio ni unicidad | "nombre, **correo corporativo único de un dominio autorizado** y contraseña" (definir dominios) |
| RN-013 | "Sección identificable" subjetivo | Definir encabezados/códigos/patrones que reconocen una sección GRI o de sanciones |
| RN-016/RN-017 | No define el criterio de OK/Baja/Sub | Mantener asignación manual e incorporar **definición objetiva de cada estado** (catálogo de criterios) |
| RN-018 | Dice 40 códigos pero no identifica catálogo/versión | "El sistema evalúa el **catálogo aprobado de 40 códigos GRI, identificado por nombre y versión**." |
| RN-019 | "Buscando su contenido" sin método | "La presencia de un código se determina por su código, denominación o **patrones configurados** en los documentos." |
| RN-022 | Imposible garantizar que el LLM no use conocimiento previo | "El sistema restringe el **contexto enviado** a los documentos recuperados y **rechaza respuestas sin evidencia** en el corpus." |
| RN-023 | "Toda información" demasiado amplio | "Toda **afirmación analítica** (asistente o reportes) indica documento, empresa, año y ubicación de la evidencia." |
| RN-025 / RF-047 | RN-025 exige empresa y año; RF-047 solo empresa | RF-047: "…para una **empresa y un año** seleccionados." |
| RN-027 / RF-068 / RNF-022 | RN-027 prohíbe eliminar reportes; los otros permiten borrarlos | **Excluir reportes** de RF-068 y RNF-022; se conservan permanentemente |
| RN-029 | Auditoría sin objeto/resultado | "Cada registro consigna usuario, fecha/hora, tipo de acción, **entidad afectada, id del objeto, resultado y motivo del fallo**." |
| RN-031 | Dice que la ingesta funciona sin IA, pero indexar necesita embeddings | "La caída del proveedor de IA no afecta cuentas, reportes históricos ni auditoría. La carga puede recibirse, pero los **embeddings quedan pendientes** hasta restablecer el servicio." |
| RN-039 / RF-023 | Mezclan dos duplicidades | RN-039 = empresa–tipo–año; crear otra RN si se prohíbe repetir contenido (SHA-256) |
| RN-034/RN-040 | Fórmula ESG incompleta | Definir suma/promedio, denominador, redondeo y tratamiento de códigos sin evidencia/estado |
| RF-020 / RNF-006 | RF-020 solo extensión; RNF-006 valida contenido real | "Aceptar únicamente archivos Markdown válidos; rechazar si extensión **o contenido** no corresponden." |
| RF-027 | "Síncrono" pero puede dar "en proceso" | "Procesar el documento y comunicar al finalizar si fue **indexado o rechazado**; durante el proceso mostrar el progreso." |
| RF-029 | "Indexar" agrupa chunking+embeddings+almacenamiento | Sustituir por RF-025, RF-026, RF-028 |
| RF-032 | "Búsqueda de contenido" sin técnica/resultado | "Detectar posibles sanciones mediante **reglas de búsqueda textual configuradas** y registrar cita, entidad, fecha y monto cuando existan." |
| RF-041/042/043 | No limitan a empresa+año; "cuando corresponda" | Limitar a los documentos de la **empresa y año seleccionados**; citar siempre doc/empresa/año/ubicación |
| RF-049/051 | Dos comportamientos / redacción confusa | Exigir empresa y año antes de consultar; mostrar solo años con documentos indexados |
| RF-053 | "Desagregado por año" con reporte anual | "…el estado de cada código GRI **del año seleccionado**, con su cita." |
| RF-067 | Orden gramatical | "Permitir al SuperAdmin consultar los registros de auditoría y filtrarlos por usuario, fecha y tipo." |
| RF-075 | RN inexistente y sin fórmula | "Calcular y mostrar el puntaje ESG aplicando la **fórmula de RN-034** a los estados almacenados." |
| RNF-015 | Mezcla rendimiento con "sugerencia" y "N segundos" | Quitar la sugerencia y fijar valor medible (50 MB en X seg.) |
| RNF-016/017/018 | N y M sin definir | Reemplazar por tiempos, nº de documentos, concurrencia y ambiente de medición |
| RNF-030 | Es comportamiento visible, no calidad | Integrar en RF-027 y eliminar RNF-030 |
| RNF-031/032/035 y RF-073 | Tensión: rol "solo del token" vs rol vigente tras transferir | El token **identifica la cuenta**; en cada petición el servidor valida habilitación y **consulta el rol vigente** (o versión de autorización que permita revocar tokens antiguos) |
| RNF-036 | Junta embeddings + generación | "Permitir configurar un proveedor de IA que ofrezca por API **un servicio de embeddings y un servicio de generación**, con sus credenciales." (alineado a Parte 1) |

### 2.5 Orden de corrección priorizado (del chat)
1. Eliminar duplicados y filas vacías.
2. Completar RN-015 y RN-032.
3. Incorporar RF de chunking, embeddings y almacenamiento vectorial (RF-025/026/028).
4. Resolver RN-027 vs borrado de reportes.
5. Resolver JWT vs transferencia de rol (rol vigente).
6. Sustituir N/M/X por métricas verificables.
7. Corregir referencias inexistentes (RN-035 → RN-034).

---

## PARTE 3 · Estado tras la actualización del A&D (v3 · 13/09 16:32)

Comparación automática contra la versión anterior (v2):

### ✅ Corregido en v3
| ID | Qué se arregló |
|---|---|
| **RN-006** | Se eliminó la frase que contradecía a RN-009 ("no es posible asignar/atribuir a cuenta posterior"). Ya no choca con la transferencia del SuperAdmin. |
| **RF-014 / RF-015** | Dejaron de ser duplicado: RF-014 es ahora el **mensaje de alerta/confirmación** antes del cambio de rol; RF-015 mantiene la **transferencia** (origen→Administrador). |
| **RF-062** | Absorbió RF-074: ahora es "visualizar el historial de reportes de prospección" (empresa, año, fecha). Se resolvió el duplicado. |
| **RF-075** | Ya cita **RN-034** (antes citaba RN-035, inexistente). Trazabilidad corregida. |
| **RF-030** | Presente y correcto: lista documentos con estado, versión y fecha. |

### ❌ Sigue pendiente (o empeoró) en v3
| ID | Problema | Acción |
|---|---|---|
| **RF-025** | **Desapareció** (chunking) — ahora es un hueco | Reincorporar: "Dividir el contenido aceptado en fragmentos mediante el mecanismo de segmentación configurado" |
| **RF-026** | **Desapareció** (embeddings) | Reincorporar el requisito de embeddings **por API del proveedor** (decisión del chat) |
| **RF-028** | **Desapareció** (almacenamiento vectorial) | Reincorporar: "Almacenar cada fragmento, su vector y la referencia al documento origen en la base vectorial" |
| **RF-031, 034, 038, 039, 040, 050, 052, 055, 056, 071, 072** | Huecos de numeración (filas sin contenido) | Renumerar correlativo al estabilizar o completar (RF-031 = ejecutar análisis; RF-034 = identificar códigos+citas) |
| **RNF-018** | **Desapareció** (tiempo del análisis) | Reincorporar o justificar |
| **RNF-023, 028, 029, 033** | Huecos | Renumerar/eliminar |
| **RNF-015/016/017** | Siguen con **"N segundos"** sin definir | Fijar los valores (propuesta: ingesta ≤ 5 min · 1.ª porción ≤ 8 s · reporte ≤ 10 s · análisis ≤ 60 s) |
| **RF-021** | Cita **RN-020**, pero RN-020 es "Precondición del análisis"; el límite de 50 MB es **RN-019** | Cambiar la trazabilidad a **RN-019** |
| **RF-027** | Cita **RN-015**, pero RN-015 es "Origen de las sanciones"; los estados documentales no tienen RN que los formalice | Crear/renombrar una RN de **estados documentales** (EN PROCESO / INDEXADO / RECHAZADO) y que RF-027/RF-030 la referencien |
| **RF-023/RF-024** | Citan **RN-039**, que **no existe** en el listado (llega a RN-034) | Crear la RN de unicidad (hash + empresa/tipo/año) o corregir la referencia |
| **RN-034** | Se le quitó la **fórmula** (OK=100/Baja=50/Sub=0); solo quedó en RF-075 | Dejar la fórmula en la **RN** (fuente) y que el RF la referencie |
| **RN-004** | "Solo se autentican cuentas **creadas y habilitadas por un SuperAdmin**" choca con la cuenta SuperAdmin inicial (creada en el despliegue) | Reformular: "…habilitadas y registradas, **incluida la cuenta SuperAdmin creada durante el despliegue**" |
| **CU007** | Sigue listado "Visualización de **Dashboards** de Bolsa de Valores" (eliminado por acta 5) | Quitar CU007 del listado y de las especificaciones |
| **CU001** | Sigue hablando del rol **Usuario** ("SuperAdmin, Administrador y Usuario") | Dejar solo SuperAdmin y Administrador |
| **Sección 8** | **Modelo de datos vacío** | Incluir el ERD (nuestro `Diagrama_bd.png` / doc 02) |
| **Sección 9** | **Diccionario de datos = proyecto inmobiliario** (proyecto/torre/piso/activo/hito) | Reemplazar por el **Diccionario FASE 1** (14 tablas, doc 03) |

### Prioridad inmediata (en orden)
1. Reincorporar **RF-025, RF-026, RF-028** (chunking, embeddings por API, almacenamiento vectorial).
2. Arreglar trazabilidad: **RF-021→RN-019**, **RF-027/030→RN de estados**, **RF-023/024→RN de unicidad** (crear RN), **RN-034 con fórmula**.
3. Quitar **CU007 (Bolsa)** y el **rol Usuario**; completar **Modelo de datos** y **Diccionario**.
4. Fijar los tiempos **N/M/X** (RNF-015/016/017) y limpiar huecos de numeración.

---

## ANEXO · Equivalencias de numeración A&D (v3) ↔ FASE 1

> Aclaración: el **A&D** y los documentos de **FASE 1** tienen numeraciones propias. Esta tabla evita confusiones al citar reglas.

| Tema | A&D (RN) | FASE 1 (RN) |
|---|---|---|
| Conjunto cerrado de roles | RN-001 | RN-001 |
| Unicidad del SuperAdmin | RN-002 | RN-003 |
| Permisos cerrados por rol | RN-003 | RN-002 |
| Efecto de la deshabilitación | RN-005 | RN-007 |
| Datos obligatorios de la cuenta | RN-007 | RN-006 |
| Transferencia del rol SuperAdmin | RN-009 | RN-003 |
| Autonomía en recuperación de acceso | RN-010 | RN-006 |
| Tipos de documento | RN-011 | RN-009, RN-013 |
| Responsabilidad de la conversión | RN-012 | RN-009 |
| Contenido mínimo del documento | RN-013 | RN-011 |
| Identificación obligatoria del documento | RN-014 | RN-013 |
| Origen de las sanciones | RN-015 | RN-020 |
| Asignación de estado GRI (manual) | RN-016 | RN-018 |
| Catálogo de códigos GRI evaluables | RN-018 | RN-017 |
| Límite de tamaño (50 MB) | RN-019 | RN-010 |
| Precondición del análisis | RN-020 | RN-019 (implícita) |
| Fundamentación en el corpus | RN-021 | RN-021 |
| Trazabilidad de la información entregada | RN-022 | RN-022 |
| Declaración explícita ante ausencia de información | RN-023 | RN-021 |
| Contenido del reporte de prospección | **RN-024** | **RN-025** |
| Determinismo del reporte | RN-025 | RN-026 |
| Inmutabilidad del reporte | RN-026 | RN-028 |
| Eventos auditados / contenido del registro | RN-027, RN-028 | RN-027 |
| Inmutabilidad de la auditoría | RN-029 | RN-028 |
| Degradación ante indisponibilidad del asistente | RN-030 | RN-023 |
| Ausencia de hallazgo ≠ falta de evidencia | RN-031 | RN-032 |
| Información parcial | RN-032 | RN-033 |
| Unicidad de documento por empresa/año/tipo | RN-033 | RN-030 |
| Cálculo del puntaje ESG | RN-034 | RN-031 |
| Identificación en la ingesta y persistencia | (nueva RN propuesta) | RN-035 |
| Nivel de riesgo del reporte | (no existe en A&D) | RN-036 |

> **Nota**: "Nivel de riesgo" y "Identificación en la ingesta y persistencia" son reglas de FASE 1 que aún **no existen en el A&D** — se recomienda agregarlas o quitar el KPI del reporte.

---

## ANEXO 2 · Correcciones pendientes del diagrama de pipeline (imagen «Pipeline de Ingesta»)

Con las decisiones del 13-14/09, el diagrama debe actualizar:

| Elemento actual | Corrección |
|---|---|
| Paso 1: `≤ 15 MB` | **`≤ 50 MB`** (RN-010 límite acordado) |
| Paso 4: `modelo local (Qwen3/bge-m3) · 1024 dims` | **Embeddings por API del proveedor de IA** (decisión del chat «Requisitos de embeddings»); la dimensión depende del modelo |
| Paso 6: `reglas vs catalogo_gri (elementos mínimos)` | **Detección de los 40 códigos GRI presentes + extracción de la cita** (sin evaluar contra el estándar) |
| Paso 6: `estado_sugerido por fila` | **Sin estado**: el INSERT queda sin estado y el **Administrador lo asigna en el formulario CU006** |
| Paso 6: `listo para revisión humana — CU006` | ✔ correcto, se mantiene |
| Título: `análisis al terminar — el reporte no consulta al LLM` | ✔ correcto, se mantiene |

> Coherente con: RN-017 (alcance del análisis = último paso de la ingesta), RN-018 (estado manual), RN-035 (identificación y persistencia), RN-025 (el reporte consolida y no invoca IA).

---

## ANEXO 3 · Estado del A&D v4 (14/09) y correcciones

**Lo que el A&D v4 sí actualizó:** el bloque completo de **RN (001–038)** y **RF (001–056)**, con mejoras incorporadas (RN-013 contenido mínimo, RN-014 identificación con empresa/año/tipo, RN-016 estados manuales de 3 valores, RN-017 análisis como último paso de la ingesta, RN-018 catálogo versionado, RN-019 sectores, RN-024 reporte, RN-035 registro de empresas, RN-036 sesión, RN-037/038 consultas). El FASE 1 ya quedó **1:1** con esta numeración.

**Errores/ pendientes detectados en el A&D v4:**

| # | Problema | Acción |
|---|---|---|
| 1 | **RN-037 duplicada** (dos reglas con el mismo código) | La segunda se renumeró a **RN-038** en FASE 1; corregir en el A&D |
| 2 | **RN-017 y RN-019** repiten la restricción de sectores | Fusionar o diferenciar (RN-019 podría eliminarse) |
| 3 | **RN-024** con redacción confusa ("consolida, un sector para una empresa…") | Usar: "consolida, para una empresa, su sector y un año específico" |
| 4 | **RF-022** cita **RN-039**, inexistente | Debe citar RN-033 |
| 5 | **RF-040** cita RN-026 (inmutabilidad) | Debe citar RN-024/RN-025 |
| 6 | **RF-019, RF-039, RF-042** son huecos | Completar (chunking/embeddings/almacenamiento) o renumerar |
| 7 | **RF de pipeline ausentes**: chunking, embeddings por API y almacenamiento vectorial | Reincorporar (ver Parte 1 de este doc) |
| 8 | **RNF-029** dice "rechazar documentos que pesen **menos** de 50 MB" | Debe decir "que **superen** los 50 MB" (corregido en FASE 1) |
| 9 | **Deriva de** con referencias inexistentes (RF-064/065/069/070/073; RN-019/020/023/030/031/034) | Corregir la trazabilidad de la tabla de RNF |
| 10 | **CU007 Dashboards de Bolsa** y rol **"Usuario"** siguen en CU001/CU007 | Eliminar (acta 5) |
| 11 | **Sección 8 (Modelo de datos) vacía** y **Diccionario = proyecto inmobiliario** | Reemplazar por el ERD + Diccionario de FASE 1 |
| 12 | Nota de trabajo "**ideotas:** …" en CU001 | Eliminar |
