# 06 · Requerimientos No Funcionales — FASE 1 (numeración vigente)

> **Fuente única:** `analisis-diseno-latex/main.pdf`. 33 RNF categorizados; derivan de RN/RF (o transversales).

| N° | Categoría | Descripción del Requerimiento No Funcional | Deriva de |
|---|---|---|---|
| RNF-001 | Seguridad | Las contraseñas deben tener un mínimo de 8 caracteres, con al menos una mayúscula, una minúscula, un dígito y un carácter especial, y no pueden coincidir con el correo de la cuenta. | RF-001, RN-011 |
| RNF-002 | Seguridad | Las contraseñas se almacenan mediante una función de hash de un solo sentido con sal única por usuario, nunca en texto plano. | RF-001, RN-011 |
| RNF-003 | Seguridad | La identidad de la cuenta se obtiene exclusivamente del token firmado (JWT), nunca de parámetros de la petición. | RF-001, RF-004, RN-003 |
| RNF-004 | Seguridad | La clave de firma de los tokens se almacena fuera del código fuente y se rota sin redespliegue de la aplicación. | RF-001 |
| RNF-005 | Seguridad | La autorización se evalúa en cada endpoint, con independencia de lo que exponga la interfaz. | RN-003 |
| RNF-006 | Seguridad | La revocación de la sesión y la vigencia del rol se verifican en cada petición. | RF-004, RN-005, RN-013 |
| RNF-007 | Seguridad | El tipo real del archivo se valida en el servidor, sin confiar en la extensión declarada. | RF-013, RN-018 |
| RNF-008 | Seguridad | Las respuestas de recuperación y el mensaje de error de autenticación son idénticos para toda cuenta (no revelan su existencia). | RF-001, RF-002, RN-010 |
| RNF-009 | Seguridad | El token del enlace de recuperación se genera con un generador de números aleatorios criptográficamente seguro. | RF-002, RN-010 |
| RNF-010 | Seguridad | El contenido recuperado del corpus se trata como datos dentro del prompt, nunca como instrucciones (protección ante *prompt injection*). | RF-024, RN-033, RN-034 |
| RNF-011 | Integridad | La unicidad documental por contenido emplea el algoritmo de hash SHA-256. | RF-014, RN-024 |
| RNF-012 | Integridad | La transferencia del rol SuperAdmin se ejecuta en una transacción única; un fallo parcial revierte toda la operación. | RF-008, RN-009 |
| RNF-013 | Integridad | La unicidad del SuperAdmin se garantiza mediante una restricción de integridad en la base de datos, además de la validación en la aplicación. | RN-002 |
| RNF-014 | Integridad | El modelo de datos distingue entre un valor no determinado y un valor igual a cero. | RN-031, RN-032 |
| RNF-015 | Integridad | El contenido de los documentos se procesa y almacena en UTF-8, preservando tildes y la letra «ñ» sin alteración. | RF-012, RF-016 |
| RNF-016 | Rendimiento | La ingesta e indexación de un documento de tamaño máximo (50 MB) se completa en menos de 120 segundos. | RF-015 |
| RNF-017 | Rendimiento | El asistente entrega una respuesta en un máximo de 15 segundos bajo condiciones normales, excluyendo la latencia del proveedor externo. | RF-023 |
| RNF-018 | Rendimiento | Las llamadas al proveedor de IA tienen un tiempo máximo de espera de 1 minuto, tras el cual la operación se reporta como indisponible. | RF-023 |
| RNF-019 | Disponibilidad | La indisponibilidad del proveedor de IA no degrada los módulos de gestión, ingesta, reportes de prospección ni auditoría. | RF-024, RN-033 |
| RNF-020 | Capacidad | El sistema admite y procesa documentos de hasta 50 MB por cada operación de ingesta. | RF-013, RN-021 |
| RNF-021 | Disponibilidad | El sistema ofrece una disponibilidad de al menos el 95 % en horario laboral (lun–vie, 8:00–20:00, hora de Perú). | Transversal |
| RNF-022 | Trazabilidad | Los registros de auditoría se almacenan en estructuras de solo inserción (*append-only*), sin actualización ni eliminación. | RN-044 |
| RNF-023 | Trazabilidad | El registro de auditoría conserva sus entradas durante todo el periodo de operación del sistema. | RN-044 |
| RNF-024 | Trazabilidad | La fecha y hora de la auditoría se almacenan en UTC y se convierten a *America/Lima* solo en la presentación. | RN-043 |
| RNF-025 | Trazabilidad | Todo fragmento indexado conserva la referencia a su documento de origen y a su ubicación dentro de él. | RF-016, RN-034 |
| RNF-026 | Mantenibilidad | El catálogo de 40 códigos GRI se carga mediante un script de inicialización versionado, garantizando el mismo catálogo en todos los ambientes. | RN-027 |
| RNF-027 | Mantenibilidad | El sistema integra al proveedor de IA mediante una interfaz estandarizada, de modo que cambiar de modelo o proveedor no obliga a rediseñar. | RF-023 |
| RNF-028 | Compatibilidad | El sistema es compatible con navegadores modernos (Chromium, Firefox y Safari/WebKit, últimas dos versiones). | Transversal |
| RNF-029 | Usabilidad | Durante la ingesta síncrona el sistema mantiene informado al usuario del progreso de la operación. | RF-015, RN-026 |
| RNF-030 | Usabilidad | Los mensajes de estado y de rechazo se presentan en español claro y accionable, indicando el motivo. | RF-013 |
| RNF-031 | Continuidad | Se realizan copias de seguridad diarias de la base de datos (incluido el índice vectorial) y de los documentos `.md` originales. | RF-016 |
| RNF-032 | Privacidad | El sistema cumple los controles básicos de protección de datos personales (Ley 29733). | Transversal |
| RNF-033 | Observabilidad | Los registros técnicos incluyen niveles y correlación por `request_id`; los errores no exponen trazas al usuario. | Transversal |
