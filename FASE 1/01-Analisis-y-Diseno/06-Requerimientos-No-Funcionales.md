# 06 · Requerimientos No Funcionales — FASE 1 (numeración = A&D v4)

> **Fuente única**: A&D v4 (14/09). Se replica numeración y contenido; se corrigen erratas evidentes dejando constancia (p. ej. RNF-029 decía «menos de 50 MB»).

| N° | Requerimiento No Funcional | Deriva de |
|---|---|---|
| **RNF-001** | Las contraseñas deben tener un mínimo de **8 caracteres** e incluir al menos una mayúscula, una minúscula, un dígito y un carácter especial, y **no pueden coincidir con el correo** de la cuenta. | RF-002, RF-004, RF-010 |
| **RNF-002** | Las contraseñas se almacenan mediante una **función de hash de un solo sentido con sal**. | RF-004, RF-010 |
| **RNF-003** | El rol de la cuenta se obtiene **exclusivamente del token firmado** por el servidor; nunca de parámetros de la petición. El token incorpora la identidad de la cuenta y su **rol vigente**. | RN-003, RF-007 |
| **RNF-004** | La autorización se evalúa **en cada endpoint**, con independencia de lo que exponga la interfaz. | RN-003, RF-008 |
| **RNF-005** | La **revocación de sesión** se verifica **en cada petición**, no únicamente al emitir el token. | RN-005, RF-009 |
| **RNF-006** | El **tipo real del archivo** se valida del lado del servidor, **sin confiar en la extensión** declarada. | RF-020 |
| **RNF-007** | Las respuestas de recuperación de contraseña son **idénticas exista o no la cuenta**. | RF-002 |
| **RNF-008** | El mensaje de error de autenticación **no distingue** entre credencial inválida y cuenta inexistente. | RF-001 |
| **RNF-009** | El enlace de recuperación tiene **vigencia máxima de 30 minutos** y es criptográficamente impredecible. | RF-002, RF-003 |
| **RNF-010** | La validación de unicidad documental emplea el algoritmo de **hash SHA-256**. | RF-023 *(el A&D cita RF-023; corresponde a RF-021)* |
| **RNF-011** | La transferencia del rol SuperAdmin se ejecuta dentro de una **transacción única**; un fallo parcial **revierte** la operación completa. | RN-002, RF-015 |
| **RNF-012** | La unicidad del rol SuperAdmin se garantiza mediante una **restricción de integridad en la base de datos**, además de la validación en la capa de aplicación. | RN-002 |
| **RNF-013** | Los registros de auditoría se almacenan en **estructuras de solo inserción**, sin operaciones de actualización ni eliminación. | RN-030, RF-064, RF-065 *(refs. del A&D; corresponden a RF-049 y RF-050)* |
| **RNF-014** | El sistema debe admitir y procesar documentos de **hasta 50 MB** por cada operación de ingesta. | RN-020, RF-021 *(corresponde a RN-033/RN-011 y RF-021)* |
| **RNF-015** | La ingesta e indexación de un documento de tamaño máximo se completa en **menos de 120 segundos**. | RF-027 *(corresponde a RF-023)* |
| **RNF-016** | La caída del servicio de IA externo **no degrada** la disponibilidad de los módulos de gestión, ingesta, reportes y auditoría. | RN-031, RF-069 *(corresponden a RN-030 y RF-052)* |
| **RNF-017** | Una ingesta interrumpida por fallo **no deja documentos parcialmente indexados**: se completa o se revierte por entero. | RF-027 *(corresponde a RF-023)* |
| **RNF-018** | El sistema aplica un **tiempo máximo de espera** a las llamadas al servicio de IA; superado, la operación se reporta como **indisponible**. | RN-031, RF-070 *(corresponden a RN-030 y RF-052)* |
| **RNF-019** | El sistema distingue en el modelo de datos entre un **valor no determinado** y un **valor igual a cero**. | RN-034, RF-057 *(corresponde a RN-032 y RF-043)* |
| **RNF-020** | Todo fragmento indexado conserva la **referencia a su documento de origen y a su ubicación** dentro de él. | RN-023, RF-043 *(corresponde a RN-022 y RF-041/043)* |
| **RNF-021** | El **registro de auditoría** conserva sus entradas durante todo el periodo de operación. | RN-030 *(corresponde a RN-029)* |
| **RNF-022** | El **catálogo predefinido de 40 códigos GRI** se carga automáticamente en la base de datos mediante un **script de inicialización versionado** en el repositorio, garantizando el mismo catálogo en todos los ambientes. | RN-018, RN-019 |
| **RNF-023** | Durante una **ingesta síncrona** el sistema mantiene informado al usuario del **progreso** de la operación. | RF-027 *(corresponde a RF-023)* |
| **RNF-024** | La autenticación emplea **tokens JWT firmados**, cuya integridad se verifica **en cada petición**. | RF-001 |
| **RNF-025** | La **clave de firma** de los tokens se almacena **fuera del código fuente** y se rota **sin redespliegue**. | RF-001 |
| **RNF-026** | El sistema verifica **en cada petición** que la cuenta del token **siga habilitada y conserve el rol** declarado. | RN-005, RF-009, RF-073 *(corresponde a RF-053)* |
| **RNF-027** | El sistema debe contar con un **proveedor de IA que proporcione servicios de embeddings y generación de respuestas mediante API**. | RN-012 *(corresponde a RN-012/RN-018)* |
| **RNF-028** | Se aplican las **mismas reglas de almacenamiento seguro y política de complejidad** al establecer la nueva contraseña tras la recuperación. | RN-007, RN-010 |
| **RNF-029** | El sistema debe **rechazar el indexado de documentos que superen los 50 MB**. *(El A&D v4 dice «pesen menos de 50 MB» — errata corregida.)* | RN-011, RN-014 |

---

**Notas:**
- Varias columnas «Deriva de» del A&D v4 apuntan a RN/RF inexistentes o desfasados (p. ej. RF-064/065/069/070/073, RN-019/RN-020/RN-023/RN-030/RN-031/RN-034). Se anotan las correspondencias correctas **entre paréntesis** para no perder la trazabilidad.
- **RNF-015** fija el máximo en **120 s** (dato del A&D, antes era un placeholder).
- **RNF-027** confirma la decisión del chat: **embeddings y generación por API del proveedor**.
