# 04 · Reglas de Negocio — FASE 1

> 31 RN, agrupadas por dominio. Cada RF referencia sus RN. Fuente: actas 1–5 + plan v1.2 + acuerdos con el PO (Oscar). Las RN decididas en el acta 5 marcan `([acta 5])`.

## Grupo A · Acceso, sesiones y roles

| ID         | Nombre                                               | Regla                                                                                                                                                                                                                                            |
| ---------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **RN-001** | Acceso restringido                                   | Solo acceden usuarios registrados y **habilitados** por Igualab, con **rol asignado** que define su alcance (2 roles: Superadmin, Administrador — acta 4 REQ-10).                                                                                |
| **RN-002** | Segregación de funciones                             | La gestión de accesos y la ingesta (Superadmin) quedan separadas de la explotación comercial (Administrador); ningún rol concentra ambas funciones.                                                                                              |
| **RN-003** | Un solo Superadmin · transferencia automática de rol | Existe **siempre 1 solo Superadmin** activo. Si el Superadmin asigna el rol Superadmin a un Administrador, **el rol se transfiere: el Superadmin original vuelve automáticamente a Administrador**. El movimiento queda registrado en auditoría. |
| **RN-004** | Bloqueo por inactividad                              | La sesión expira tras **30 minutos de inactividad** (CONFIG: configurable en `Configuración` del mock); al expirar la sesión se bloquea y exige reautenticación.                                                                                 |
| **RN-005** | Bloqueo por intentos fallidos                        | Tras **5 intentos fallidos** consecutivos de login, la cuenta queda bloqueada **15 minutos** y se registra el evento en auditoría.                                                                                                               |
| **RN-006** | Política de contraseñas                              | Mínimo **8 caracteres**, con mayúscula, minúscula, número y carácter especial. Nunca en texto plano (cifrado con hash fuerte).                                                                                                                   |
| **RN-007** | Usuario deshabilitado no opera                       | Un usuario deshabilitado no puede iniciar sesión ni conservar tokens; sus sesiones vigentes se cierran al deshabilitarlo.                                                                                                                        |

## Grupo B · Ingesta de documentos ([acta 5] REQ-20)

| ID | Nombre | Regla |
|---|---|---|
| **RN-008** | Ingesta exclusiva del Superadmin | Solo el Superadmin carga documentos; el Administrador no ve la opción de ingesta (el mock concuerda). |
| **RN-009** | Conversión, formato y estructura de ingesta | La **conversión de formatos** está fuera del alcance: los documentos ingresan únicamente como **Markdown (.md)** convertido por el cliente, **responsable de la fidelidad** de la conversión (no verificable por el sistema). La **estructura exigible** es: extensión `.md` y **tablas pipe válidas** (encabezado entre `|`, **fila separadora** `|---|` y columnas consistentes). El **PDF no es formato de entrada**; un archivo que no cumpla se **rechaza** (o queda **OBSERVADO**) con motivo exacto, sin indexar (acta 5 · REQ-20). |
| **RN-010** | Límite de peso del archivo | El archivo `.md` no puede superar **50 MB** (límite documental acordado en el A&D v2, RN-010). Un archivo mayor se rechaza con motivo explícito. |
| **RN-011** | Contenido mínimo analizable (verificable) | El documento debe contener **al menos un código del catálogo GRI (40) o una mención de sanción**, reconocidos por **patrones configurados** (p. ej. `GRI <número>`, denominación del código, o términos de sanción de la lista del catálogo — ver RN-010). Si no se reconoce ninguno, el documento **no se indexa** y se marca **RECHAZADO** con el motivo "sin contenido analizable"; el Superadmin puede corregir y reintentar. *(Alternativa acordada con el PO: marcarlo OBSERVADO en lugar de rechazo definitivo.)* |
| **RN-012** | Ingesta **síncrona** (sin colas) | Solo hay 1 Superadmin que ingesta: el pipeline procesa el documento al momento de la subida y la UI espera el resultado (éxito/observación/rechazo). **No se permite lanzar otra subida mientras la actual esté en proceso** (diseño acorde al alcance de 3 usuarios). |
| **RN-013** | Identificación obligatoria del documento | Todo documento ingestado debe estar asociado a: **(i)** una empresa **existente y activa del catálogo**; **(ii)** el **año del ejercicio** del documento (`YYYY`, rango 2000–año actual+1); y **(iii)** su **tipo** (memoria anual o reporte de sostenibilidad GRI). Si falta cualquiera de los tres datos, la ingesta se **rechaza** indicando el dato faltante, sin procesar ni indexar. |
| **RN-014** | Anti duplicado (doble unicidad) | Se rechaza un documento si (i) su **sha256** ya existe, o (ii) ya hay un documento **indexado de la misma empresa + año + tipo** (memoria anual / reporte GRI) — evita duplicación y reemplazos (A&D v2 RN-010/RF-023/024). |
| **RN-015** | Hash inmutable y versiones | Un mismo documento (empresa + tipo + año) puede tener **múltiples versiones** (v1, v2, …) solo si el contenido difiere; El archivo original queda guardado (nunca se borra físicamente, RN-030). |

## Grupo C · Alcance y contenido del análisis (GRI / sanciones) (GRI / sanciones)

| ID | Nombre | Regla |
|---|---|---|
| **RN-016** | Sectores habilitados | El análisis de brechas se limita a los sectores, **acordado con el PO**: **Minería, Energía y Petróleo y Gas**. Empresas de otros sectores no se analizan en fase 1. |
| **RN-017** | Catálogo de códigos GRI evaluables | Solo son evaluables los **40 códigos del catálogo corporativo versionado** (semilla reproducible). La **evidencia válida** es la reportada por la empresa en sus documentos; el **texto del estándar GRI oficial no es fuente de evaluación**. |
| **RN-018** | Estado asignado 100 % por el humano (sin inferencia) | El estado de cada código GRI (`OK` / `Baja sustancia` / `Sub-reportado`) es **atribución exclusiva del Administrador**, según su criterio profesional y tras revisar la cita textual. **Ningún estado es calculado, inferido ni comparado automáticamente contra el estándar GRI.** Cada asignación conserva historial (quién, cuándo, anterior → nuevo). |
| **RN-019** | Toda brecha queda registrada | **Cada una de las brechas detectadas (todas: las OK y las problemáticas) se persiste en `gri_analisis`/`sanciones` con cita (documento, sección), estado y fecha — igual en el mock (GRI 401 Sub-reportado, GRI 306 OK). Permitенте consultas y análisis posteriores. |
| **RN-020** | Sanciones: solo con cita y sin monto se conservan | Una "sanción" solo puede registrarse si el documento aporta cita **identificable** (norma/entidad, documento y sección). Queda prohibido incorporar sanciones desde el conocimiento general del modelo. Las sanciones **sin monto determinado no se excluyen**: se listan y se cuentan por separado del monto total (**no determinado ≠ 0** — A&D v2 RN-010/RF-057/058). |

## Grupo D · Asistente IA (RAG)

| ID | Nombre | Regla |
|---|---|---|
| **RN-021** | Declaración explícita ante ausencia de información | La insuficiencia de información en **los documentos ingestados disponibles** es un **resultado válido y explícito**, tanto en las respuestas del asistente como en los reportes. La ausencia de respaldo **nunca se sustituye** por datos generados, inferidos, supuestos o atribuidos a fuentes inexistentes. (La distinción «sin hallazgo» / «sin evidencia analizable» se rige por RN-032; el deber de informarlo explícitamente, por RF correspondiente). |
| **RN-022** | Citación obligatoria | Toda respuesta cita **documento + sección** de donde proviene la conclusión (acta 4 · REQ-14; RN-005 del A&D v1.0). |
| **RN-023** | Disponibilidad del asistente | La operación de los módulos de gestión, ingesta, reportes históricos y auditoría es **independiente** de la disponibilidad del servicio de IA. La indisponibilidad del asistente (timeout/fallo del proveedor) se informa al usuario y **no bloquea** el resto del sistema. |
| **RN-024** | Consumo moderado del free tier | El backend **limita el número de consultas diarias** del asistente (default **200/día**, tope del free tier), monitorea el uso con contadores y muestra al PO el consumo para acordar aumentos. Los **embeddings van por API del proveedor** y **también consumen cuota**: se contabilizan junto con las consultas del asistente (RN-010). |

## Grupo E · Reportes de prospección

| ID | Nombre | Regla |
|---|---|---|
| **RN-025** | Contenido del reporte de prospección | Todo reporte consolida, por **empresa, sector y un único año específico**: **puntaje ESG, nivel de riesgo, estado de todos los códigos GRI detectados —incl. `OK`— asignado manualmente por el Administrador, con su cita, sanciones con su total (las sin monto, aparte) y resumen ejecutivo**. Se emite en **PDF con fecha de generación** solo cuando **todos** los códigos detectados tienen estado asignado. |
| **RN-026** | Variables desde la BD, nunca desde el LLM | El reporte se genera **solo consultando la tabla del análisis** (`gri_analisis` + `reporte_detalle_snapshot`): el análisis se ejecuta **al terminar la ingesta** y persiste, de modo que la generación del PDF es un SELECT determinista (sin llamadas al LLM). | **RN-027** | Reportes inmutables | Un reporte generado **no se edita**; cualquier nueva re-generación crea una **nueva versión**, y el historial se conserva (RN-034 del A&D v1.0). |

## Grupo F · Auditoría y datos

| ID | Nombre | Regla |
|---|---|---|
| **RN-027** | Eventos auditados | Registro automático e **inmutable** de: inicios de sesión, cambios de rol, ingestas y generación de reportes (usuario, fecha/hora, acción, resultado). ([acta 4]) |
| **RN-028** | Auditoría solo-lectura | La auditoría no admite edición; no editable; filtrable por usuario/fecha/tipo y de acceso solo-lectura para el Superadmin. |
| **RN-029** | No borrado físico | Documentos ingestados, chunks y reportes **nunca se borran físicamente**; la trazabilidad se garantiza por diseño. |

---

## Grupo G · Incorporadas del A&D v2 (13/09)

| ID | Nombre | Regla |
|---|---|---|
| **RN-030** | Unicidad documento por empresa/año/tipo | No se admite más de un documento del mismo tipo (memoria anual o reporte de sostenibilidad) para una misma empresa y año; complementa el anti-duplicado por hash (A&D v2 RN-010). |
| **RN-031** | Puntaje ESG (fase 1, en el reporte) | El puntaje ESG de una empresa/año se calcula automáticamente a partir de los estados manuales: **OK = 100, Baja sustancia = 50, Sub-reportado = 0**. Se incluye en el reporte (la visualización tipo dashboard sigue en fase 2) — A&D v2 RN-010/RF-075. |
| **RN-032** | Ausencia de hallazgo ≠ falta de evidencia | La ausencia de hallazgos y la falta de evidencia analizable son resultados **distintos**; la falta de evidencia **no** constituye cumplimiento. Se registra por dimensión (brechas GRI / sanciones) si hubo evidencia analizable (A&D v2 RN-010/RN-010, RF-037). |
| **RN-033** | Información parcial conservada | Un dato no determinado **nunca** se sustituye por un valor por defecto ni se omite; se conserva identificado como no determinado (A&D v2 RN-010/RNF-024). |
| **RN-034** | Borrado lógico | Documentos, fragmentos y reportes se "eliminan" solo mediante **marcado de estado**; no existe borrado físico (A&D v2 RN-010, RF-068, RNF-022). |
| **RN-035** | Identificación en la ingesta y persistencia (política) | La identificación de códigos y sanciones corresponde **al cierre de la ingesta** del documento, **no** a la generación del reporte. La presencia de un código se acredita con **patrones configurados** (código, denominación, encabezados) y su **cita textual**; las sanciones, con su cita (entidad, fecha y monto cuando existan). Los resultados son la **única base del reporte**, que se limita a consultarlos (sin re-análisis ni IA). Los **estados** son asignados por el Administrador (RN-018); la identificación **no asigna estados**. |
| **RN-036** | Nivel de riesgo del reporte | El **nivel de riesgo** (Alto / Medio / Bajo) se deriva de los resultados del análisis del periodo (nº de códigos en estado `Sub-reportado` y sanciones identificadas), conforme a la regla de cálculo acordada con el PO. |

**Conteo:** 36 reglas de negocio (una sola regla de ingesta/estructura + las del A&D v2). Cada RF (documento 05) explica qué RN le sirve de fundamento; ningún RF se respalda en una RN eliminada.
