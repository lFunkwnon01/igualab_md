# 06 · Requerimientos No Funcionales — FASE 1

> Definen **cómo opera** el sistema (calidad, no función). **32 RNF** (19 base + 13 incorporados/alineados del A&D v2), cada uno con verificación propuesta ligada al cronograma de pruebas del plan v1.2 (§7) y a las RN. SIN "MUST HAVE" decorativo: cada uno es indispensable u observable en fase 1.
> Cambios clave respecto al A&D v1.0: la ingesta ahora es **SÍNCRONA** (RN-012, un solo Superadmin) — el antiguo RNF de "procesamiento asíncrono" se reformula como tiempo máximo de pipeline por documento; se añaden RNF de degradación controlada con el LLM free, sanitización de `.md`, observabilidad y respaldo.

## Seguridad

| ID | Requerimiento | Categoría | Prioridad | Verificación |
|---|---|---|---|---|
| **RNF-01** | Las contraseñas se almacenan **cifradas con hash adaptativo** (bcrypt/argon2), nunca en texto plano; tokens de sesión firmados y con expiración. | Seguridad | MUST HAVE | revisión de código + prueba 2/11 |
| **RNF-02** | Todo tráfico viaja por **HTTPS** (incl. backend-universidad ↔ frontend desplegado); certificado válido incluso en entorno académico. | Seguridad/Transporte | MUST HAVE | prueba operativa 13/11 |
| **RNF-03** | **RBAC en todos los endpoints**: el backend valida sesión + rol en cada llamada (no solo la UI oculta menús); intento sin permiso → 403 auditado. | Seguridad | MUST HAVE | pruebas 2/11 |
| **RNF-04** | **Sanitización del `.md` subido**: neutralización de scripts/HTML/citando (protección XSS al renderizar fragmentos en el chat y reportes); los archivos solo se sirven protegidos. | Seguridad de entrada | MUST HAVE | pruebas de calidad 9/11 |
| **RNF-05** | Protección de **datos personales** de los usuarios conforme a normativa peruana aplicable (Ley 29733): acceso, retención y visualización mínimos. | Cumplimiento | MUST HAVE | revisión 2/11 |
| **RNF-06** | **Protección de almacenamiento**: DB sin acceso público; credenciales por variables de entorno; volcados de DB cifrados en reposo si se respaldan. | Seguridad en reposo | MUST HAVE | despliegue 13/11 |

## Rendimiento y capacidad

| ID | Requerimiento | Categoría | Prioridad | Verificación |
|---|---|---|---|---|
| **RNF-07** | El asistente IA responde **≤ 30 s** (documentos ya indexados) medido en percentil 90. | Rendimiento | MUST HAVE | análisis GRI/sanciones 19/10 |
| **RNF-08** | La ingesta síncrona de un documento ≤ 15 MB completa el pipeline completo (guard→chunking→embeddings→upsert) en **≤ 5 min** y con indicador de progreso en la UI; que no bloquea al resto de módulos (otras peticiones del sistema siguen respondiendo durante la ingesta). | Rendimiento | MUST HAVE | demo ingesta/RAG 5/10 |
| **RNF-09** | Las vistas de gestión (login, usuarios, auditoría, descargas) responden **≤ 3 s** en operación normal. | Rendimiento | MUST HAVE | calidad 9/11 |
| **RNF-10** | El sistema soporta el **crecimiento progresivo** de documentos (cientos de chunks → decenas de miles) **sin degradar** consultas; índice HNSW en pgvector y paginación obligatoria en listados. | Escalabilidad | SHOULD HAVE | pruebas de rendimiento |
| **RNF-11** | **Eficiencia del free tier**: contadores por día/tabla `uso_llm`; rate-limit por usuario y global; los embeddings y el parsing **nunca** invocan APIs de pago. | Eficiencia | MUST HAVE | métricas de cada demo |

## Disponibilidad y confiabilidad

| ID | Requerimiento | Categoría | Prioridad | Verificación |
|---|---|---|---|---|
| **RNF-12** | Disponibilidad **≥ 95 %** en horario laboral (lun–vie 8:00–20:00 hora Perú). | Disponibilidad | MUST HAVE | UAT 16/11 |
| **RNF-13** | **Degradación elegante ante fallo del LLM**: timeouts (p. ej. 60 s), reintento con modelo `:free` de respaldo y — si ambos fallan — mensaje al usuario sin bloquear el resto del sistema (RN-023). | Confiabilidad | MUST HAVE | escenarios de falla en pruebas 9/11 |
| **RNF-14** | **Respaldos (backups)** diarios de la base de datos (incluye índice vectorial) y de los archivos `.md` subidos, con restauración probada al menos una vez antes de la UAT. | Continuidad | MUST HAVE | previo a 16/11 |
| **RNF-15** | **Logs técnicos** con niveles (error/warn/info) y correlación por request_id; los errores no controlados no exponen stack traces al usuario. | Observabilidad | MUST HAVE | revisión 2/11 |
| **RNF-16** | **Consistencia de idempotencia**: el pipeline de ingesta es idempotente por sha256 y los upserts no generan duplicados ante un reintento (recupera tras caída a mitad). | Confiabilidad | MUST HAVE | pruebas de ingesta 5/10 |

## Usabilidad y compatibilidad

| ID | Requerimiento | Categoría | Prioridad | Verificación |
|---|---|---|---|---|
| **RNF-17** | Interfaz web **responsiva** (escritorio y móvil) con navegación y textos idénticos al mock fidelizado; mensajes de estado/rechazo **en español claro y accionable** de estado/rechazo **en español claro y accionable** (ej. «tablas sin pipes en línea 42»). | Usabilidad | MUST HAVE | funcionalidad 9/11 |
| **RNF-18** | Compatibilidad con **navegadores modernos** (Chromium, Firefox, Safari/WebKit; últimas 2 versiones). | Compatibilidad | MUST HAVE | demo 23/10 |

## Operación, portabilidad y mantenibilidad

| ID | Requerimiento | Categoría | Prioridad | Verificación |
|---|---|---|---|---|
| **RNF-19** | **Empaquetado reproducible**: backend + PostgreSQL/pgvector en Docker Compose; el frontend como build estático; instalación documentada en el server universidad. | Portabilidad | MUST HAVE | despliegue 13/11 |
| **RNF-20** | **Config por variables de entorno** (modelo, límites, umbrales) — cambiar modelo `:free` o límite de peso **sin rediseñar** el código (flexibilidad ante cambios de catálogo/estándares GRI, heredada del RNF-008 del A&D v1.0). | Mantenibilidad | MUST HAVE | revisión 2/11 |
| **RNF-21** | **Adecuación a restricciones de fase 1**: sin servicios pagados (todo free/local), despliegue en el **servidor de la universidad** (plan v1.2 §10; acta 5 REQ-18), sin colas (RN-012). | Restricción | MUST HAVE | despliegue 13/11 |

## Restricciones de entorno (FASE 1) — resumen

1. **Sin producción pagada**: infraestructura universitaria/dev; el PO lo autorizó (acta 5 · REQ-18).
2. **Ingesta síncrona**: el diseño asume 1 Superadmin + 2 Administradores (3 usuarios); sin colas de mensajería.
3. **Zero-cost**: LLM por API `:free` (OpenRouter) + embeddings/reranker locales; límites y contadores obligatorios (RN-024, RNF-11).

> Verificación fisica: las métricaciones numericas, 3 s, 95 %, 15 MB, 5 min) son compromisos testeada por los testers (Alonso/Mauricio) durante el cronograma de pruebas §7 del plan.

## Adiciones del A&D v2 (13/09) — seguridad y confiabilidad

| ID | Requerimiento | Categoría | Prioridad | Verificación |
|---|---|---|---|---|
| **RNF-22** | Política de contraseñas: mínimo **8 caracteres** con mayúscula, minúscula, dígito y especial, y no puede coincidir con el correo; almacenamiento con **hash de un solo sentido con sal**. | Seguridad | MUST HAVE | revisión de código |
| **RNF-23** | El **rol de la cuenta** se obtiene **exclusivamente del token firmado por el servidor**, nunca de parámetros de la petición; la autorización se evalúa en **cada endpoint** (independiente de la UI). | Seguridad | MUST HAVE | pruebas de autorización |
| **RNF-24** | La **revocación de sesión** se verifica en **cada petición** (no solo al emitir el token); el token incorpora identidad y rol vigente y no admite modificación sin invalidar la firma; clave de firma **fuera del código y rotable sin redespliegue**. | Seguridad | MUST HAVE | pruebas 2/11 |
| **RNF-25** | Mensajes de error **indistinguibles** (credencial inválida vs cuenta inexistente) y respuestas de recuperación idénticas exista o no la cuenta; enlace de recuperación con **vigencia máxima de 30 min** e impredecible. | Seguridad | MUST HAVE | pruebas 9/11 |
| **RNF-26** | La **transferencia del SuperAdmin es atómica** (transacción única; un fallo revierte todo) y la **unicidad del SuperAdmin** se garantiza con una **restricción de integridad en la BD** además de la capa de aplicación. | Integridad | MUST HAVE | pruebas de gestión |
| **RNF-27** | La ingesta es **atómica**: una interrupción por fallo **no deja documentos parcialmente indexados** (todo o nada). | Confiabilidad | MUST HAVE | pruebas de ingesta 5/10 |
| **RNF-28** | **Timeout explícito** en las llamadas al servicio de IA; superado el tiempo, la operación se reporta como indisponible sin bloquear los demás módulos. | Confiabilidad | MUST HAVE | escenarios de falla 9/11 |
| **RNF-29** | En el modelo de datos debe distinguirse **un valor no determinado de un valor igual a cero** (p. ej. montos de sanciones). | Integridad | MUST HAVE | revisión de BD 2/11 |
| **RNF-30** | El catálogo GRI (40 códigos) se carga mediante un **proceso de inicialización reproducible y versionado junto al código**. | Mantenibilidad | MUST HAVE | despliegue 13/11 |
| **RNF-31** | El sistema debe integrar, **mediante API**, un **servicio de embeddings del proveedor de IA** para vectorizar los fragmentos (y un **servicio de generación** para las respuestas) — sin modelos locales. El **chunking y el parsing** sí son código propio (sin IA). | Integración | MUST HAVE | pruebas de ingesta |
| **RNF-31b** | El contador de uso del proveedor (RN-024) debe incluir **tokens de embeddings y de generación** (o contador separado `uso_embeddings`). | Eficiencia | MUST HAVE | métricas de cada demo |
| **RNF-32** | Los valores de **"N/M segundos" del A&D v2 se fijan** aquí: ingesta de un documento máximo **≤ 5 min** · primera porción de respuesta del asistente **≤ 8 s** · generación de reporte **≤ 10 s** · análisis de una empresa (1 doc) **≤ 60 s**. | Rendimiento | MUST HAVE | demos y 9/11 |
