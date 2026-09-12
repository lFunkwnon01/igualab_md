# 04 · Reglas de Negocio — FASE 1

> 31 RN, agrupadas por dominio. Cada RF referencia sus RN. Fuente: actas 1–5 + plan v1.2 + acuerdos con el PO (Oscar). Las RN decididas en el acta 5 marcan `([acta 5])`.

## Grupo A · Acceso, sesiones y roles

| ID | Nombre | Regla |
|---|---|---|
| **RN-001** | Acceso restringido | Solo acceden usuarios registrados y **habilitados** por Igualab, con **rol asignado** que define su alcance (2 roles: Superadmin, Administrador — acta 4 REQ-10). |
| **RN-002** | Segregación de funciones | La gestión de accesos y la ingesta (Superadmin) quedan separadas de la explotación comercial (Administrador); ningún rol concentra ambas funciones. |
| **RN-003** | Un solo Superadmin · transferencia automática de rol | Existe **siempre 1 solo Superadmin** activo. Si el Superadmin asigna el rol Superadmin a un Administrador, **el rol se transfiere: el Superadmin original vuelve automáticamente a Administrador**. El movimiento queda registrado en auditoría. |
| **RN-004** | Bloqueo por inactividad | La sesión expira tras **30 minutos de inactividad** (CONFIG: configurable en `Configuración` del mock); al expirar la sesión se bloquea y exige reautenticación. |
| **RN-005** | Bloqueo por intentos fallidos | Tras **5 intentos fallidos** consecutivos de login, la cuenta queda bloqueada **15 minutos** y se registra el evento en auditoría. |
| **RN-006** | Política de contraseñas | Mínimo **8 caracteres**, con mayúscula, minúscula, número y carácter especial. Nunca en texto plano (cifrado con hash fuerte). |
| **RN-007** | Usuario deshabilitado no opera | Un usuario deshabilitado no puede iniciar sesión ni conservar tokens; sus sesiones vigentes se cierran al deshabilitarlo. |

## Grupo B · Ingesta de documentos ([acta 5] REQ-20)

| ID | Nombre | Regla |
|---|---|---|
| **RN-008** | Ingesta exclusiva del Superadmin | Solo el Superadmin carga documentos; el Administrador no ve la opción de ingesta (el mock concuerda). |
| **RN-009** | Formato de entrada exclusivo `.md` | El sistema solo acepta **Markdown (.md)**. El PDF se descarta como entrada; su conversión es responsabilidad del cliente ([acta 5]). |
| **RN-010** | Tablas con pipes obligatorias | Las tablas del `.md` deben estar estructuradas con **pipes** (`|`). Si el archivo está en **texto de corrido** se rechaza la ingesta con motivo explícito, para evitar errores de indexado del RAG ([acta 5]). |
| **RN-011** | Límite de peso del archivo | El archivo `.md` no puede superar **15 MB** (coherente con la capacidad del embedding local y los límites del free tier). Un archivo mayor se rechaza con sugerencia de dividirlo por secciones/años. |
| **RN-012** | Contenido mínimo | El `.md` debe contener **al menos una sección identificable de indicadores GRI o de sanción**; un documento sin contenido analizable se marca **OBSERVADO** (no se indexa hasta corregir). |
| **RN-013** | Ingesta **síncrona** (sin colas) | Solo hay 1 Superadmin que ingesta: el pipeline procesa el documento al momento de la subida y la UI espera el resultado (éxito/observación/rechazo). **No se permite lanzar otra subida mientras la actual esté en proceso** (diseño acorde al alcance de 3 usuarios). |
| **RN-014** | Asociación obligatoria | Todo documento se carga asociado a una **empresa** del catálogo y un **año**; sin estos datos no se permite la ingesta. |
| **RN-015** | Anti duplicado | Se calcula el **sha256 del archivo**; un documento con el mismo hash ya registrado **no se indexa dos veces**; el sistema informa "duplicado" y muestra el documento ya existente. |
| **RN-016** | Hash inmutable y versiones | Un mismo documento (empresa + tipo + año) puede tener **múltiples versiones** (v1, v2, …) solo si el contenido difiere; El archivo original queda guardado (nunca se borra físicamente, RN-031). |

## Grupo C · Alcance y contenido del análisis (GRI / sanciones) (GRI / sanciones)

| ID | Nombre | Regla |
|---|---|---|
| **RN-017** | Sectores habilitados | El análisis de brechas se limita a los sectores, **acordado con el PO**: **Minería, Energía y Petróleo y Gas**. Empresas de otros sectores no se analizan en fase 1. |
| **RN-018** | Catálogo GRI como estándar | Los indicadores y estados válidos se definen contra una **tabla `catalogo_gri`** precargada (estándar GRI). La IA no "inventa" el estándar: consulta el catalogo; esto responde la pregunta del PO sobre "quién define el GRI óptimo". |
| **RN-019** | Estado de brecha lo decide el **humano** | El motor/IA **sugiere** un estado (`OK`, `SUB-REPORTADO`, `BAJA SUSTANCIA`, `CRITICO`) y el Administrador (con supervisión del PO) **valida o cambia el estado manualmente antes de generar el reporte**. El cambio queda en historial (quién, cuándo, estado anterior → nuevo) — supervisión humana acordada con Oscar. |
| **RN-020** | Toda brecha queda registrada | **Cada una de las brechas detectadas (todas: las OK y las problemáticas) se persiste en `gri_analisis`/`sanciones` con cita (documento, sección), estado y fecha — igual en el mock (GRI 401 Sub-reportado, GRI 306 OK). Permitенте consultas y análisis posteriores. |
| **RN-021** | Sanciones solo con cita | Una "sanción" solo puede registrarse si el documento aporta cita **identificable** (norma/entidad, documento y sección). Queda prohibido incorporar sanciones desde el conocimiento general del modelo. |

## Grupo D · Asistente IA (RAG)

| ID | Nombre | Regla |
|---|---|---|
| **RN-022** | Respuesta solo con información ingestada | El asistente responde **solo con información de documentos ingestados**. Si no hay información en la fuente, lo **declara explícitamente** ("el documento no aborda este punto") en lugar de inventar. |
| **RN-023** | Citación obligatoria | Toda respuesta cita **documento + sección** de donde proviene la conclusión (acta 4 · REQ-14; RN-005 del A&D v1.0). |
| **RN-024** | Disponibilidad del asistente | El asistente usa modelos de API gratuitos (OpenRouter). Si el servicio externo falla, el módulo de IA lo avisa en la UI sin bloquear el resto del sistema (acta 4 · RNF-010). |
| **RN-025** | Consumo moderado del free tier | El backend **limita el número de consultas diarias** del asistente (default **200/día**, tope del free tier), monitorea el uso con contadores y muestra al PO el consumo para acordar aumentos. Los embeddings **nunca** consumen el free tier (van local). |

## Grupo E · Reportes de prospección

| ID | Nombre | Regla |
|---|---|---|
| **RN-026** | Contenido mínimo del reporte | Todo reporte PDF consolida como mínimo: las **brechas con su estado final validado** incluyendo explícitamente los indicadores en estado **OK** con su cita, **sanciones identificadas**, sector/año y **resumen ejecutivo**. |
| **RN-027** | Variables desde la BD, nunca desde el LLM | El reporte se genera **solo consultando la tabla del análisis** (`gri_analisis` + `reporte_detalle_snapshot`): el análisis se ejecuta **al terminar la ingesta** y persiste, de modo que la generación del PDF es un SELECT determinista (sin llamadas al LLM). | **RN-028** | Reportes inmutables | Un reporte generado **no se edita**; cualquier nueva re-generación crea una **nueva versión**, y el historial se conserva (RN-035 del A&D v1.0). |

## Grupo F · Auditoría y datos

| ID | Nombre | Regla |
|---|---|---|
| **RN-029** | Eventos auditados | Registro automático e **inmutable** de: inicios de sesión, cambios de rol, ingestas y generación de reportes (usuario, fecha/hora, acción, resultado). ([acta 4]) |
| **RN-030** | Auditoría solo-lectura | La auditoría no admite edición; no editable; filtrable por usuario/fecha/tipo y de acceso solo-lectura para el Superadmin. |
| **RN-031** | No borrado físico | Documentos ingestados, chunks y reportes **nunca se borran físicamente**; la trazabilidad se garantiza por diseño. |

---

**Conteo:** 31 reglas de negocio. Cada RF (documento 05) explica qué RN le sirve de fundamento; ningún RF se respalda en una RN eliminada.
