# 06 · Requerimientos No Funcionales — FASE 1 (numeración = A&D v5)

> **Fuente única**: A&D v5 (14/09 21:04). Replica numeración y contenido (RNF-001 a RNF-030). Se anotan entre paréntesis las correspondencias cuando el A&D cita una referencia desfasada.

| N° | Requerimiento No Funcional | Deriva de |
|---|---|---|
| **RNF-001** | Las contraseñas deben tener un mínimo de **8 caracteres** e incluir mayúscula, minúscula, dígito y carácter especial, y **no pueden coincidir con el correo**. | RF-002, RF-004, RF-010 |
| **RNF-002** | Las contraseñas se almacenan mediante una **función de hash de un solo sentido con sal**. | RF-004, RF-010 |
| **RNF-003** | El rol de la cuenta se obtiene **exclusivamente del token firmado** por el servidor; nunca de parámetros de la petición. El token incorpora la identidad y el **rol vigente**. | RN-003, RF-007 |
| **RNF-004** | La autorización se evalúa **en cada endpoint**, con independencia de lo que exponga la interfaz. | RN-003, RF-008 |
| **RNF-005** | La **revocación de sesión** se verifica **en cada petición**, no solo al emitir el token. | RN-005, RF-009 |
| **RNF-006** | El **tipo real del archivo** se valida del lado del servidor, **sin confiar en la extensión**. | RF-018 |
| **RNF-007** | Las respuestas de recuperación de contraseña son **idénticas exista o no la cuenta**. | RF-002 |
| **RNF-008** | El mensaje de error de autenticación **no distingue** entre credencial inválida y cuenta inexistente. | RF-001 |
| **RNF-009** | El enlace de recuperación tiene **vigencia máxima de 30 minutos** y es criptográficamente impredecible. | RF-002, RF-003 |
| **RNF-010** | La validación de unicidad documental emplea **SHA-256**. | RF-020 |
| **RNF-011** | La transferencia del rol SuperAdmin se ejecuta en una **transacción única**; un fallo parcial **revierte** todo. | RN-002, RF-015 |
| **RNF-012** | La unicidad del SuperAdmin se garantiza con una **restricción de integridad en la base de datos**, además de la capa de aplicación. | RN-002 |
| **RNF-013** | Los registros de auditoría se almacenan en **estructuras de solo inserción**, sin update ni delete. | RN-030, RF-046, RF-047 |
| **RNF-014** | El sistema debe admitir y procesar documentos de **hasta 50 MB** por operación de ingesta. | RN-011, RF-017 |
| **RNF-015** | La ingesta e indexación de un documento de tamaño máximo se completa en **menos de 120 segundos**. | RF-023 |
| **RNF-016** | La caída del servicio de IA externo **no degrada** la disponibilidad de gestión, ingesta, reportes y auditoría. | RN-030, RF-049 |
| **RNF-017** | Una ingesta interrumpida por fallo **no deja documentos parcialmente indexados**: se completa o se revierte. | RF-023 |
| **RNF-018** | El sistema aplica un **tiempo máximo de espera** a las llamadas al servicio de IA; superado, la operación se reporta como **indisponible**. | RN-030, RF-049 |
| **RNF-019** | El sistema distingue en el modelo de datos entre un **valor no determinado** y un **valor cero**. | RN-032, RF-040 |
| **RNF-020** | Todo fragmento indexado conserva la **referencia a su documento de origen y su ubicación**. | RN-022, RF-039 |
| **RNF-021** | El **registro de auditoría** conserva sus entradas durante todo el periodo de operación. | RN-029 |
| **RNF-022** | El **catálogo de 40 códigos GRI** se carga mediante un **script de inicialización versionado** en el repositorio, igual en todos los ambientes. | RN-018, RN-019 |
| **RNF-023** | Durante una **ingesta síncrona** el sistema mantiene informado al usuario del **progreso**. | RF-023 |
| **RNF-024** | La autenticación emplea **tokens JWT firmados**, verificados **en cada petición**. | RF-001 |
| **RNF-025** | La **clave de firma** de los tokens se almacena **fuera del código** y se rota **sin redespliegue**. | RF-001 |
| **RNF-026** | El sistema verifica **en cada petición** que la cuenta del token **siga habilitada y conserve el rol** declarado. | RN-005, RF-009, RF-050 |
| **RNF-027** | El sistema debe **rechazar la carga si falta empresa, año o tipo**. | RN-011, RN-014 |
| **RNF-028** | El sistema debe **rechazar el indexado de documentos que superen los 50 MB**. *(El A&D v5 dice «pesen menos de 50 MB» — errata corregida.)* | RN-011 |
| **RNF-029** | El sistema debe contar con un **proveedor de IA que proporcione embeddings y generación de respuestas mediante API**. | RN-012 |
| **RNF-030** | Se aplican las **mismas reglas de almacenamiento seguro y política de complejidad** al establecer la nueva contraseña tras la recuperación. | RN-007, RN-010 |
