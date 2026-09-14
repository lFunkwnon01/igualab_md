# 06 · Requerimientos No Funcionales — FASE 1 (numeración = A&D v6)

> **Fuente única**: A&D v6 (14/09 21:04). Replica numeración y contenido (RNF-001 a RNF-030). Se anotan entre paréntesis las correspondencias cuando el A&D cita una referencia desfasada.

| N°          | Requerimiento No Funcional                                                                                                                                                     | Deriva de              |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------- |
| **RNF-001** | Las contraseñas deben tener un mínimo de **8 caracteres** e incluir mayúscula, minúscula, dígito y carácter especial, y **no pueden coincidir con el correo**.                 | RF-002, RF-004, RF-010 |
| **RNF-002** | Las contraseñas se almacenan mediante una **función de hash de un solo sentido con sal**.                                                                                      | RF-004, RF-010         |
| **RNF-003** | El rol de la cuenta se obtiene **exclusivamente del token firmado** por el servidor; nunca de parámetros de la petición. El token incorpora la identidad y el **rol vigente**. | RN-003, RF-007         |
| **RNF-004** | La autorización se evalúa **en cada endpoint**, con independencia de lo que exponga la interfaz.                                                                               | RN-003, RF-008         |
| **RNF-005** | La **revocación de sesión** se verifica **en cada petición**, no solo al emitir el token.                                                                                      | RN-005, RF-009         |
| **RNF-006** | El **tipo real y el tamaño** del archivo se validan del lado del servidor, **sin confiar en la extensión ni en el cliente**. | RF-018 |
| **RNF-007** | Las respuestas de recuperación de contraseña son **idénticas exista o no la cuenta**.                                                                                          | RF-002                 |
| **RNF-008** | El mensaje de error de autenticación **no distingue** entre credencial inválida y cuenta inexistente.                                                                          | RF-001                 |
| **RNF-009** | El enlace de recuperación tiene **vigencia máxima de 30 minutos** y es criptográficamente impredecible.                                                                        | RF-002, RF-003         |
| **RNF-010** | La validación de unicidad documental emplea **SHA-256**. | RF-020 |
| **RNF-011** | La transferencia del rol SuperAdmin se ejecuta en una **transacción única**; un fallo parcial **revierte** todo, de modo que **nunca existan 0 ni 2 SuperAdmin**. Se complementa con RNF-012. | RN-009, RN-002, RF-014, RF-015 |
| **RNF-012** | La unicidad del SuperAdmin se garantiza con una **restricción de integridad en la base de datos** (índice único sobre `rol='superadmin'`, sin depender de la habilitación), además de la validación en la capa de aplicación. Complementa a RNF-011. | RN-002 |
| **RNF-013** | Los registros de auditoría se almacenan en **estructuras de solo inserción**, sin update ni delete. | **RN-029**, RF-046, RF-047 |
| **RNF-014** | **Capacidad**: el sistema debe **procesar documentos de hasta 50 MB** por operación de ingesta **sin degradar el servicio** (dentro del tiempo de RNF-015). | RF-017 |
| **RNF-015** | La ingesta e indexación de un documento de tamaño máximo se completa en **menos de 120 segundos**. | RF-023 |
| **RNF-016** | La caída del servicio de IA externo **no degrada** la disponibilidad de gestión, ingesta, reportes y auditoría.                                                                | RN-030, RF-049         |
| **RNF-017** | Una ingesta interrumpida por fallo **no deja documentos parcialmente indexados**: se completa o se revierte (sin contenido parcial en el corpus). | **RN-039, RF-054** |
| **RNF-018** | El sistema aplica un **tiempo máximo de espera** a las llamadas al servicio de IA; superado, la operación se reporta como **indisponible**.                                    | RN-030, RF-049         |
| **RNF-019** | El sistema distingue en el modelo de datos entre un **valor no determinado** y un **valor cero**.                                                                              | RN-032, RF-040         |
| **RNF-020** | Todo fragmento indexado conserva la **referencia a su documento de origen y su ubicación**.                                                                                    | RN-022, RF-039         |
| **RNF-021** | El **registro de auditoría** conserva sus entradas durante todo el periodo de operación. | **RN-029** |
| **RNF-022** | El **catálogo de 40 códigos GRI** se carga mediante un **script de inicialización versionado** en el repositorio, igual en todos los ambientes.                                | RN-018, RN-019         |
| **RNF-023** | Durante la **ingesta síncrona** el sistema mantiene informado al usuario del **progreso** de la operación (indicador de avance), complementando el resultado final definido en RF-022. | **RF-022** *(proceso síncrono y sus estados)* |
| **RNF-024** | La autenticación emplea **tokens JWT firmados**, verificados **en cada petición**.                                                                                             | RF-001                 |
| **RNF-025** | La **clave de firma** de los tokens se almacena **fuera del código** y se rota **sin redespliegue**.                                                                           | RF-001                 |
| **RNF-026** | El sistema verifica **en cada petición** que la cuenta asociada al token **siga habilitada** y **aplica el rol vigente** (no el declarado en el token). | **RN-005, RN-009, RF-009, RF-050** |
| **RNF-027** | Toda respuesta del asistente se genera **exclusivamente dentro del contexto seleccionado (sector, empresa y año)**. | **RN-037, RN-038, RF-030, RF-037** |
| **RNF-028** | El sistema debe contar con un **proveedor de IA que proporcione servicios de embeddings y de generación de respuestas mediante API** (mismo proveedor para ambos). Es la base del pipeline de IA (indexación, consulta y extracción de sanciones). | **RF-023, RF-025, RF-029, RF-030** |
| **RNF-029** | Se aplican las **mismas reglas de almacenamiento seguro y política de complejidad** al establecer la nueva contraseña tras validar el enlace de recuperación. | **RF-002, RF-003, RF-004** |
| **RNF-030** | El sistema debe ser **compatible con diferentes modelos de IA mediante una interfaz de integración estandarizada** (permite cambiar de proveedor/modelo sin rediseño). | **RNF-028, RF-029** |

## Anexo · RNF propuestos para completar el A&D (aún no numerados allí)

| Tema | Requerimiento propuesto | Categoría |
|---|---|---|
| **Ingesta: obligatoriedad** | El modelo de datos garantiza **empresa, año y tipo obligatorios** en todo documento (`NOT NULL` + FK a `empresas`), con independencia de la validación en la app. *(Integridad de la ingesta; separado del contexto de consulta.)* | Integridad |
| **Sanitización del `.md`** | Neutralizar HTML/scripts del Markdown ingestado (protección XSS al renderizar fragmentos y reportes); los archivos se sirven protegidos. | Seguridad |
| **Respaldos** | Backups diarios de la BD (incluye índice vectorial) y de los `.md` originales, con restauración probada antes de la UAT. | Continuidad |
| **Disponibilidad** | ≥ 95 % en horario laboral (lun–vie 8:00–20:00, hora Perú). | Disponibilidad |
| **Privacidad** | Cumplir controles básicos de protección de datos personales (Ley 29733). | Cumplimiento |
| **Observabilidad** | Logs con niveles y correlación por `request_id`; los errores no exponen stack traces al usuario. | Observabilidad |
| **Portabilidad** | Empaquetado reproducible (Docker Compose: backend + PostgreSQL/pgvector). | Portabilidad |
| **Cuota del proveedor IA** | Contadores de uso (tokens de embeddings y de generación) y rate-limit (free tier); mensaje de indisponibilidad al agotarse. | Eficiencia |
| **Compatibilidad** | Navegadores modernos (Chromium, Firefox, Safari/WebKit; últimas 2 versiones). | Compatibilidad |
| **Accesibilidad/usabilidad** | Mensajes de estado/rechazo en español claro y accionable; interfaz responsiva. | Usabilidad |

> **Correcciones de trazabilidad detectadas:** RNF-013 y RNF-021 deben derivar de **RN-029** (inmutabilidad de la auditoría), no de RN-030; RNF-010 de **RF-020**, no de RF-023; RNF-015/017 de **RF-023** (indexación), no de RF-027; **RNF-023 de RF-022** (no de RF-023). **Falta en el A&D una RN del límite de 50 MB** (RNF-014/RNF-028 la necesitan).
