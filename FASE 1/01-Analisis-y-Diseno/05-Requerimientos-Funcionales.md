# 05 · Requerimientos Funcionales — FASE 1 (numeración = A&D v4)

> **Fuente única**: A&D v4 (14/09). Se replica la **numeración y contenido** del A&D para que ambos documentos queden 1:1. Se conservan los huecos de numeración reservados del A&D (RF-019, RF-039, RF-042) para no romper la trazabilidad. La columna «Deriva de» replica las reglas citadas por el A&D; se corrigen entre corchetes las referencias inexistentes.

| N° | Requerimiento Funcional | Deriva de (A&D) | Prioridad |
|---|---|---|---|
| **RF-001** | El sistema debe permitir la autenticación de usuarios con correo y contraseña, validando que la cuenta esté habilitada y tenga un rol asignado. | RN-001, RN-004, RN-007 | MUST HAVE |
| **RF-002** | El sistema debe permitir la recuperación de contraseña mediante enlace seguro enviado al correo registrado, con vigencia limitada de **30 minutos**. | RN-010 | MUST HAVE |
| **RF-003** | El sistema debe invalidar el enlace de recuperación al ser utilizado o al vencer su vigencia. | RN-010 | MUST HAVE |
| **RF-004** | El sistema debe permitir al usuario cambiar su propia contraseña estando autenticado. | RN-010 | SHOULD HAVE |
| **RF-005** | El sistema debe mantener la sesión activa y expirarla por inactividad después de **2 horas**. | RN-036 | MUST HAVE |
| **RF-006** | El sistema debe permitir el cierre de sesión manual, invalidando la sesión activa. | RN-005 | MUST HAVE |
| **RF-007** | El sistema debe restringir el acceso a funcionalidades según el rol asignado (SuperAdmin / Administrador). | RN-003, RN-001 | MUST HAVE |
| **RF-008** | El sistema debe responder con error de autorización ante una acción no permitida para el rol. | RN-003 | MUST HAVE |
| **RF-009** | El sistema debe invalidar todas las sesiones activas de una cuenta al deshabilitarla. | RN-005 | MUST HAVE |
| **RF-010** | El sistema debe permitir al SuperAdmin crear cuentas con nombre, correo y contraseña, asignando automáticamente el rol Administrador. | RN-004, RN-007, RN-008 | MUST HAVE |
| **RF-011** | El sistema debe rechazar el registro de cuentas con correo ya existente. | RN-007 | MUST HAVE |
| **RF-012** | El sistema debe permitir al SuperAdmin habilitar y deshabilitar cuentas de Administrador. | RN-005 | MUST HAVE |
| **RF-013** | El sistema debe impedir que la cuenta con rol SuperAdmin sea deshabilitada o eliminada desde la aplicación, indicando que debe transferirse el rol previamente. | RN-002 | MUST HAVE |
| **RF-014** | El sistema debe mostrar un mensaje de alerta de confirmación antes de ejecutar el cambio de rol SuperAdmin a una cuenta con rol Administrador habilitada. La cuenta de origen cambia al rol Administrador al completarse el cambio. | RN-002, RN-009 | MUST HAVE |
| **RF-015** | El sistema debe rechazar la transferencia si la cuenta destino no existe, está deshabilitada o ya tiene rol SuperAdmin. | RN-009 | MUST HAVE |
| **RF-016** | El sistema debe listar las cuentas existentes con su rol y estado. | RN-003 | SHOULD HAVE |
| **RF-017** | El sistema debe permitir al SuperAdmin cargar documentos asociando **sector, empresa, año y tipo** (memoria anual / reporte de sostenibilidad GRI). | RN-011, RN-014 | MUST HAVE |
| **RF-018** | El sistema debe rechazar la carga si el archivo no tiene extensión `.md`. | RN-012 | MUST HAVE |
| **RF-020** | El sistema debe validar que el documento contenga al menos un **código del catálogo GRI o una mención de sanción** (contenido mínimo). | RN-013 | MUST HAVE |
| **RF-021** | El sistema debe calcular el **hash SHA-256** del contenido del archivo antes de procesarlo y rechazar la carga si ya existe un documento con el mismo hash. | RN-033 | MUST HAVE |
| **RF-022** | El sistema debe rechazar la carga si ya existe un documento indexado con la **misma empresa, tipo y año**, indicando la fecha y la cuenta que realizó la carga original. | RN-033 *(el A&D cita RN-039, inexistente)* | MUST HAVE |
| **RF-023** | El sistema debe procesar el documento de forma **síncrona**, informando el resultado (éxito / en proceso / rechazo) al finalizar. | RN-017 | MUST HAVE |
| **RF-024** | El sistema debe indexar el contenido del documento para su consulta por el asistente. | RN-012 | MUST HAVE |
| **RF-025** | El sistema debe listar los documentos ingestados con su estado (éxito / en proceso / rechazado), versión y fecha. | RN-017 | MUST HAVE |
| **RF-026** | El sistema debe identificar posibles sanciones mediante **búsqueda de contenido** en el documento y, de encontrar evidencia, extraer mediante el servicio de IA la **entidad sancionadora y el monto** de la multa. | RN-015, RN-021, RN-022 | MUST HAVE |
| **RF-027** | El sistema debe bloquear la ejecución del reporte de prospección para empresas **sin documentos ingestados**, indicando el motivo. | RN-020, RN-021 | MUST HAVE |
| **RF-028** | El sistema debe permitir al Administrador **cambiar los estados de todos los códigos GRI analizados en la ingesta**; estados permitidos: `OK`, `Baja sustancia` y `Sub-reportado`. | RN-016 | MUST HAVE |
| **RF-029** | El sistema debe registrar, para cada análisis, **si cada dimensión (brechas GRI, sanciones) contó con evidencia analizable** en el corpus. | RN-021 | MUST HAVE |
| **RF-030** | El sistema debe permitir al Administrador **consultar en lenguaje natural** sobre el corpus indexado. | RN-022 | MUST HAVE |
| **RF-031** | El sistema debe restringir la recuperación de contexto a los **documentos indexados**. | RN-022 | MUST HAVE |
| **RF-032** | El sistema debe incluir en cada respuesta la **referencia al documento, empresa y año**, cuando corresponda. | RN-023 | MUST HAVE |
| **RF-033** | El sistema debe **suprimir toda afirmación sin fuente verificable** en el corpus. | RN-023 | MUST HAVE |
| **RF-034** | El sistema debe informar explícitamente cuando el corpus **no contiene información suficiente** para responder. | RN-022, RN-023 | MUST HAVE |
| **RF-035** | El sistema debe conservar el **historial de consultas** del Administrador. | RN-027 | SHOULD HAVE |
| **RF-036** | El sistema debe permitir al Administrador **generar un reporte de prospección por empresa y un año específico**. | RN-025 | MUST HAVE |
| **RF-037** | El sistema debe mostrar para selección únicamente las **empresas con al menos un documento indexado** para la generación del reporte. | RN-020, RN-014 | MUST HAVE |
| **RF-038** | El sistema debe permitir **seleccionar sector, empresa y año** del prospecto a consultar; si no se completan las opciones, no se pueden realizar consultas. | RN-020, RN-021, RN-035 | MUST HAVE |
| **RF-040** | El sistema debe presentar en el reporte el **estado de cada código GRI del año específico**, con su **cita de respaldo**. | RN-027 *(el A&D cita RN-026)*, RN-026 | MUST HAVE |
| **RF-041** | El sistema debe **listar los códigos GRI identificados del año** antes de generar el reporte, incluyendo las **sanciones asociadas**. Cada sanción indica su **monto** cuando esté disponible; si no, se conserva **nulo** y se identifica como «no cuantificada», **sin omitirla**. | RN-024, RN-015, RN-032 | MUST HAVE |
| **RF-043** | El reporte debe tener un **campo separado** con el **monto total de sanciones cuantificadas** y el **número de sanciones sin monto**. | RN-032, RN-034 | MUST HAVE |
| **RF-044** | El sistema debe generar automáticamente un **resumen ejecutivo** con: puntaje ESG, número total de brechas GRI por estado (OK, Sub-reportado, Baja sustancia), monto total de sanciones cuantificadas y número de sanciones sin monto — **sin intervención del usuario**. | RN-024, RN-025, RN-034 | MUST HAVE |
| **RF-045** | El sistema debe generar el reporte **a partir de los resultados de análisis almacenados, sin invocar al servicio de IA**. | RN-025 | MUST HAVE |
| **RF-046** | El sistema debe generar el reporte de prospección en **formato PDF**. | RN-024 | MUST HAVE |
| **RF-047** | El sistema debe permitir al Administrador **visualizar el historial de reportes** generados, mostrando como mínimo empresa, año y fecha de generación. | RN-026, RN-030 | MUST HAVE |
| **RF-048** | El sistema debe permitir **descargar** un reporte de prospección previamente generado. | RN-030 | SHOULD HAVE |
| **RF-049** | El sistema debe **registrar automáticamente** los eventos: inicio de sesión, cambio de estado o rol, ingesta, rechazo de documento y generación de reportes. | RN-027 | MUST HAVE |
| **RF-050** | El sistema debe **consignar en cada registro** la cuenta, fecha, hora y tipo de acción. | RN-028 | MUST HAVE |
| **RF-051** | El sistema debe permitir al SuperAdmin **consultar el registro de auditoría** filtrando por usuario, fecha y tipo de evento. | RN-027, RN-028, RN-029 | SHOULD HAVE |
| **RF-052** | El sistema debe **informar la indisponibilidad del servicio de IA sin bloquear** los demás módulos. | RN-030 | SHOULD HAVE |
| **RF-053** | El sistema debe **aplicar el rol vigente** de la cuenta en las sesiones activas tras una transferencia del rol SuperAdmin. | RN-002, RN-009 | MUST HAVE |
| **RF-054** | El sistema debe **calcular y mostrar el puntaje ESG** de una empresa y año (OK=100, Baja sustancia=50, Sub-reportado=0) a partir de los estados asignados. | RN-034, RN-025 | MUST HAVE |
| **RF-055** | El sistema debe permitir al SuperAdmin **ingresar una nueva empresa** en el sistema. | RN-035 | MUST HAVE |
| **RF-056** | Al ingresar una nueva empresa, el sistema debe **obligar a colocarle un nombre y asignarle un sector** (Minería, Petróleo o Energía). | RN-035 | MUST HAVE |

## Notas de trazabilidad
- **Huecos de numeración** del A&D conservados: RF-019, RF-039, RF-042.
- **Correcciones aplicadas** (errores del A&D v4): RF-022 citaba **RN-039** (inexistente) → RN-033; RF-040 citaba RN-026 (inmutabilidad) para un requerimiento de contenido → RN-024/RN-025.
- **RF de pipeline** que el A&D v4 no lista y deberían existir (propuestos): *chunking*, *generación de embeddings por API*, *almacenamiento vectorial* — ver doc 10 · Anexo 3.
