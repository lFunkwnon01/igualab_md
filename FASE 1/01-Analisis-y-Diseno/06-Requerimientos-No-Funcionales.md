# 06 · Requerimientos No Funcionales — FASE 1 (numeración = A&D v6)

> **Fuente única**: `01-Mockups-y-Propuestas/Análisis y Diseño - Igualab .pdf` (v6, actualizado 15/09). Replica numeración y contenido (**RNF-001 a RNF-036**). Se anotan entre paréntesis las correcciones de trazabilidad detectadas.

| N° | Requerimiento No Funcional | Deriva de |
| --- | --- | --- |
| **RNF-001** | Las contraseñas deben tener un mínimo de **8 caracteres** e incluir al menos una mayúscula, una minúscula, un dígito y un carácter especial, y **no pueden coincidir con el correo** de la cuenta. | RF-004, RF-010, RF-001 |
| **RNF-002** | Las contraseñas se almacenan mediante una **función de hash de un solo sentido con sal**, con **sal única por usuario**. | RF-004, RF-010 |
| **RNF-003** | El rol de la cuenta se obtiene **exclusivamente del token firmado** por el servidor; nunca de parámetros de la petición. El token incorpora la identidad de la cuenta y su **rol vigente**. | RN-003, RF-007 |
| **RNF-004** | La autorización se evalúa **en cada endpoint**, con independencia de lo que exponga la interfaz. | RN-003, RF-008 |
| **RNF-005** | La **revocación de sesión** se verifica **en cada petición**, no únicamente al emitir el token. | RN-005, RF-009 |
| **RNF-006** | El **tipo real del archivo** se valida del lado del servidor, **sin confiar en la extensión declarada**. | RF-018, RN-011, RN-012 |
| **RNF-007** | Las respuestas de recuperación de contraseña son **idénticas para todo tipo de cuenta**. | RF-002, RF-003, RN-010 |
| **RNF-008** | El mensaje de error de autenticación **no distingue** entre credencial inválida y cuenta inexistente. | RF-002, RF-003, RN-010 |
| **RNF-009** | El token incluido en el enlace de recuperación debe generarse mediante un **generador de números aleatorios criptográficamente seguro**, de modo que no sea posible predecirlo ni reconstruirlo a partir de información conocida de la cuenta. | RF-002, RF-003, RN-010 |
| **RNF-010** | La validación de unicidad documental emplea el algoritmo de hash **SHA-256**. | RF-020, RN-033 |
| **RNF-011** | La transferencia del rol SuperAdmin se ejecuta dentro de una **transacción única**; un fallo parcial **revierte la operación completa**. | RN-002, RF-015 |
| **RNF-012** | La unicidad del SuperAdmin se garantiza mediante una **restricción de integridad en la base de datos**, además de la validación en la capa de aplicación. | RN-002 |
| **RNF-013** | Los registros de auditoría se almacenan en **estructuras de solo inserción**, sin operaciones de actualización ni eliminación habilitadas. | RN-029 |
| **RNF-014** | El sistema debe admitir y procesar **documentos de hasta 50 MB** por cada operación de ingesta. | RN-012, RF-021 |
| **RNF-015** | La ingesta e indexación de un documento de tamaño máximo se completa en **menos de 120 segundos**. | RF-022 |
| **RNF-016** | La caída del servicio de IA externo **no degrada** la disponibilidad de los módulos de gestión, ingesta, reportes de prospección y auditoría. | RF-049, RN-030 |
| **RNF-017** | Cuando una ingesta sea **rechazada o interrumpida por un fallo**, el sistema debe **revertir completamente el procesamiento**, sin conservar contenido del documento, fragmentos, embeddings ni resultados de análisis generados parcialmente. Solo debe conservar los datos necesarios para **registrar y auditar el rechazo**. | RF-027, RF-033 |
| **RNF-018** | El sistema aplica un **tiempo máximo de espera de 1 minuto** a las llamadas al servicio de IA, tras el cual la operación se reporta como **indisponible**. | RN-030 |
| **RNF-019** | El sistema distingue en el modelo de datos entre un **valor no determinado** y un **valor igual a cero**. | RN-032 |
| **RNF-020** | Todo fragmento indexado conserva la **referencia a su documento de origen y a su ubicación** dentro de él. | RN-023, RF-023 |
| **RNF-021** | El **registro de auditoría** conserva sus entradas durante **todo el periodo de operación** del sistema. | RN-030 *(debería ser RN-029)* |
| **RNF-022** | El **catálogo predefinido de 40 códigos GRI** deberá cargarse automáticamente en la base de datos mediante un **script de inicialización versionado** en el repositorio del proyecto, garantizando el mismo catálogo en todos los ambientes del sistema. | RN-018, RN-019 |
| **RNF-023** | Durante una **ingesta síncrona** el sistema mantiene informado al usuario del **progreso** de la operación. | RF-029 *(corresponde a RF-022)* |
| **RNF-024** | La autenticación emplea **tokens JWT firmados**, cuya integridad se verifica **en cada petición**. | RF-009 |
| **RNF-025** | La **clave de firma** de los tokens se almacena **fuera del código fuente** y se rota **sin redespliegue** de la aplicación. | RF-001 |
| **RNF-026** | El sistema verifica **en cada petición** que la cuenta asociada al token **siga habilitada y conserve el rol declarado**. | RN-005, RF-009 |
| **RNF-027** | Toda respuesta del asistente se genera **exclusivamente dentro del contexto seleccionado (sector, empresa y año)**. | RF-037, RN-037, RN-038 |
| **RNF-028** | El sistema debe contar con un **proveedor de IA que proporcione servicios de embeddings y de generación de respuestas mediante API**. Es la base del pipeline de IA (indexación, consulta y extracción de sanciones). | RF-025, RF-029 |
| **RNF-029** | Se aplican las **mismas reglas de almacenamiento seguro y política de complejidad** al establecer la nueva contraseña tras validar el enlace de recuperación. | RF-002, RF-003 |
| **RNF-030** | El sistema debe ser **compatible con diferentes modelos de IA mediante una interfaz de integración estandarizada** (permite cambiar de proveedor/modelo sin rediseño). | RF-025 |
| **RNF-031** | El sistema debe **bloquear temporalmente una cuenta tras 5 intentos fallidos consecutivos** de inicio de sesión, impidiendo nuevos intentos durante **15 minutos**. El evento de bloqueo debe registrarse automáticamente en el módulo de **auditoría**. | RF-001 |
| **RNF-032** | El sistema debe **impedir generar un nuevo reporte de la misma empresa y el mismo año**; sin embargo, sí debe permitir que **todos los Administradores puedan ver los PDF** en el portal de reportes de prospección. | RF-035, RN-026 |
| **RNF-033** | El asistente de IA debe entregar una respuesta a una consulta del Administrador en un **máximo de 15 segundos** bajo condiciones normales de operación, exceptuando la latencia propia del proveedor externo de IA. | RF-029 |
| **RNF-034** | Todo registro de auditoría debe almacenar la **fecha y hora en formato UTC**, convirtiéndose a la zona horaria local (**America/Lima**) únicamente en la capa de presentación, para garantizar la consistencia cronológica de los eventos. | RF-046, RF-047, RN-028 |
| **RNF-035** | El contenido recuperado de los documentos indexados debe tratarse **exclusivamente como datos de referencia** dentro del prompt enviado al modelo, **nunca como instrucciones del sistema**. El diseño del prompt debe delimitar claramente el contenido del corpus del resto de las instrucciones, de modo que el texto de un documento ingestado **no pueda alterar** el comportamiento, las reglas o las restricciones del asistente. | RF-029 |
| **RNF-036** | El sistema debe procesar y almacenar el contenido de los documentos ingestados utilizando codificación **UTF-8**, preservando correctamente tildes, la letra «ñ» y demás caracteres propios del idioma español, **sin pérdida ni alteración** de datos. | RF-023, RF-017 |

## Anexo · RNF propuestos para completar el A&D (aún no numerados allí)

| Tema | Requerimiento propuesto | Categoría |
| --- | --- | --- |
| **Ingesta: obligatoriedad** | El modelo de datos garantiza **empresa, año y tipo obligatorios** en todo documento (`NOT NULL` + FK a `empresas`), con independencia de la validación en la app. | Integridad |
| **Sanitización del `.md`** | Neutralizar HTML/scripts del Markdown ingestado (protección XSS al renderizar fragmentos y reportes); los archivos se sirven protegidos. **Relacionado con RNF-035** (prompt injection) en el lado de presentación. | Seguridad |
| **Respaldos** | Backups diarios de la BD (incluye índice vectorial) y de los `.md` originales, con restauración probada antes de la UAT. | Continuidad |
| **Disponibilidad** | ≥ 95 % en horario laboral (lun–vie 8:00–20:00, hora Perú). | Disponibilidad |
| **Privacidad** | Cumplir controles básicos de protección de datos personales (Ley 29733). | Cumplimiento |
| **Observabilidad** | Logs con niveles y correlación por `request_id`; los errores no exponen stack traces al usuario. | Observabilidad |
| **Portabilidad** | Empaquetado reproducible (Docker Compose: backend + PostgreSQL/pgvector). | Portabilidad |
| **Cuota del proveedor IA** | Contadores de uso (tokens de embeddings y de generación) y rate-limit (free tier); mensaje de indisponibilidad al agotarse. | Eficiencia |
| **Compatibilidad** | Navegadores modernos (Chromium, Firefox, Safari/WebKit; últimas 2 versiones). | Compatibilidad |
| **Accesibilidad/usabilidad** | Mensajes de estado/rechazo en español claro y accionable; interfaz responsiva. | Usabilidad |

> **Correcciones de trazabilidad detectadas:** RNF-013 debe derivar de **RN-029** (inmutabilidad de la auditoría) y RNF-021 fue citado con **RN-030** → también corresponde a **RN-029**; RNF-010 de **RF-020**; RNF-015/017 de **RF-022/RF-027** (indexación/reversión), no de RF-027 en el primer caso; **RNF-023** fue citado con RF-029 → corresponde a **RF-022**; **RNF-026** dice «conserve el rol declarado», lo que **contradice RF-050** («aplicar el rol vigente»). **Falta en el A&D una RN del límite de 50 MB** (RNF-014 la necesita).
