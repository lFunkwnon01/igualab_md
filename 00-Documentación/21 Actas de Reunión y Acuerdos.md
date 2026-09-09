# 21 · Actas de Reunión y Acuerdos

Registro oficial de las interacciones con el cliente (Oscar Baldeón, Product Owner). Formato CS3081 (Ingeniería de Software). Los PDF firmados están en `01-Mockups-y-Propuestas/`.

> ⚠️ **Estado:** Actas 1 y 2 **firmadas** (cliente + PM) · Acta 3 firmada por cliente y PM, **pendiente firma del docente** · **Acta 4 (08-09, 10:55–11:15): REALIZADA** — solo asistió Fabricio (PM); acta completada en LaTeX y pendiente de firma/envío (`Acta_Reunion4_BORRADOR.tex/pdf`; guía en [[23 Guía de Generación de Actas]]).

---

## 📋 Acta 1 — CS3081-001-2026 · vie 28-08-2026 · 10:00–11:15 · Virtual ✅ Firmada

**Proyecto (como se llamaba entonces):** Portal RAG de consulta de reportes financieros · **Fase:** Definición de alcance y costos (post kick-off) · **Reunión #2 del Plan** (validación del mockup).

**Objetivo:** presentar el prototipo/mockup, recoger primera impresión y consultar presupuesto, validando el enfoque de IA restringida a la base de datos del cliente.

### Decisiones y hallazgos
| # | Tema | Conclusión | Estado |
|---|---|---|---|
| 1 | **Comportamiento de la IA** | La IA responde **únicamente con la base de datos del cliente** (no conocimiento general). Ante pregunta sin respuesta en los documentos → debe buscar información. Criticidad baja (uso de prospección, informativo) | ✅ Decidido |
| 2 | **Usuarios y fuentes** | Ingresan al portal **máximo 3 personas** (Superadmin, Administrador, Usuario). El cliente **NO cuenta con API ni acceso a datos de la Bolsa**: la data proviene de **sus propios reportes** | ✅ Decidido |
| 3 | **Costos** | Cliente sin presupuesto definido; desea desarrollo sin costo. Tokens + servidor tienen costo. Contexto: ~115 empresas. Se compartió PPT de costos | ⏳ Pendiente |
| 4 | **Mockup** | Primera impresión positiva, "intuitivo"; desea algo **simplista** que entregue las respuestas necesarias. Link compartido | 🔎 Por validar |
| 5 | **Cambio de problemática** | Del onepager (chatbot) → kick-off propuso RAG. Oscar sugiere: portal donde se **vean todos los reportes** y **cobrar suscripción** a quienes deseen ver la data (sin analítica) | 🔎 Por validar |

### Requerimientos capturados (acta)
| ID | Requisito | Tipo | Prioridad | Estado |
|---|---|---|---|---|
| REQ-01 | IA responde **solo** con la base del cliente (conocimiento delimitado) | RF | Alta | ✅ Validado |
| REQ-02 | Comportamiento cuando la respuesta no está en los documentos (buscar / indicar no encontrado) | RF | Media | Propuesto |
| REQ-03 | Portal con 3 roles, **máx. 3 usuarios** | RF | Alta | Propuesto |
| REQ-04 | Mostrar **fuente/cita** en cada respuesta | RNF | Media | Propuesto |
| REQ-05 | **Minimizar costo** de tokens y servidor | RNF | Alta | Propuesto |
| REQ-06 | Cambio: portal de reportes + **suscripción** (sin analítica) | Cambio | Media | Propuesto |

### Compromisos
- Oscar: definir presupuesto con su equipo (⏳ pendiente)
- PM: compartir PPT de costos ✅ cumplido (28-08)
- Equipo: evaluar cambio de problemática (en curso) · definir características del servidor y delimitación de data (pendiente) · compartir link de mockup + referencia (en curso)

**Próxima reunión (según acta):** 31-08 · definir presupuesto y validar cambio de problemática.

---

## 📋 Acta 2 — CS3081-002-2026 · sáb 29-08-2026 · 11:30–12:00 · Virtual ✅ Firmada

**Fase:** Fase 1 — Desarrollo (primera problemática). *Asistieron todos excepto Luis (analista funcional).*

### Decisiones
| # | Tema | Conclusión | Estado |
|---|---|---|---|
| 1 | **Primera problemática** | Se **confirma desarrollar el sistema RAG** sobre la base de datos del cliente como primera problemática; enfoque claro para equipo y cliente | ✅ Decidido |
| 2 | **Infraestructura de desarrollo** | La **universidad proporciona servidor y LLM** para esta etapa; el cliente no asume costos durante el desarrollo | ✅ Decidido |
| 3 | **Continuidad post-desarrollo** | Si el cliente mantiene el sistema en operación, el servidor y el consumo del modelo **serán costo del cliente**; evaluar opciones económicas a su tiempo | ℹ️ Informado |
| 4 | **Suscripción (retorno)** | Se evaluará en una **segunda fase**, según el avance de la fase 1 | ⏳ Pendiente (2ª fase) |

### Requerimientos capturados (acta)
| ID | Requisito | Tipo | Prioridad | Estado |
|---|---|---|---|---|
| REQ-01 | Sistema RAG como primera problemática | RF | Alta | ✅ Validado |
| REQ-02 | Infraestructura (servidor + LLM) de la universidad para desarrollo | RN | Alta | ✅ Validado |
| REQ-03 | Mantenimiento posterior a cargo del cliente si continúa en operación | RN | Media | ℹ️ Informado |
| REQ-04 | Suscripción para retorno → evaluar en 2ª fase | Cambio | Media | Propuesto |

### Compromisos
- Equipo: desarrollar RAG con infraestructura universitaria (en curso)
- PM: presentar plan de trabajo en la próxima reunión (pendiente → cumplido en acta 3)
- Equipo/Oscar: definir responsabilidad del cliente fase a fase (pendiente → cerrado en acta 3)
- Oscar: evaluar suscripción en 2ª fase (pendiente)

**Canal de seguimiento:** Correo / **Discord** · **Próxima reunión:** presentar plan de trabajo y responsabilidades del cliente.

---

## 📋 Acta 3 — CS3081-003-2026 · vie 04-09-2026 · 10:00–10:20 · Virtual 🟡 Firmada (pendiente docente)

**Proyecto:** Igualab — Plataforma de analítica de sostenibilidad (RAG) · **Fase:** Cierre de análisis / inicio de desarrollo · *Asistieron todos excepto Luis.*

### Decisiones
| # | Tema | Conclusión | Estado |
|---|---|---|---|
| 1 | **Plan de trabajo** | Se **entregó el plan de trabajo** al cliente; el cliente **asume sus responsabilidades** de seguimiento. Se enviará además por correo | ✅ Decidido |
| 2 | **Delimitación de data por sectores** | El volumen de documentos es muy grande → se acota el procesamiento a los **sectores con clientes potenciales: Minería, Energía y Petróleo** (indicados por Oscar) | ✅ Decidido |
| 3 | **Servidor para producción** | Oscar responde el **lunes 07-09-2026** sobre la disponibilidad de **su servidor** para producción (desarrollo = infraestructura de la universidad, acta 2) | ⏳ Pendiente (lunes) |

### Requerimientos capturados (acta)
| ID | Requisito | Tipo | Prioridad | Estado |
|---|---|---|---|---|
| REQ-07 | Acotar procesamiento a **Minería, Energía y Petróleo** | Cambio | Alta | ✅ Validado |
| REQ-08 | Definir infraestructura de servidor para desarrollo | RN | Alta | ⏳ Pendiente (lunes 07-09) |
| REQ-09 | Cliente asume seguimiento según plan de trabajo | RN | Media | ✅ Validado |

### Compromisos
- Oscar: responder disponibilidad de servidor (⏳ **07-09**) · seguimiento permanente del proyecto (en curso)
- PM: enviar plan de trabajo por correo (en curso)
- Equipo: acotar la ingesta a Minería / Energía / Petróleo (en curso)

**Próxima reunión:** por definir (tras respuesta del servidor, lunes 07-09) → confirmar servidor e iniciar etapa de desarrollo.

---

## 📝 Acta 4 — CS3081-004-2026 · mar 08-09-2026 · `[hora por definir]` · Virtual 🚧 BORRADOR

**Proyecto:** Igualab — Plataforma de analítica de sostenibilidad (RAG) · **Fase:** Análisis y Diseño — confirmación de servidor y cierre del análisis (arquitectura) · *Primera acta con Fabricio Ladera como PM; asiste el equipo completo.*

**Borrador completo:** `01-Mockups-y-Propuestas/Acta_Reunion4_BORRADOR.tex` (+ PDF compilado; guía en [[23 Guía de Generación de Actas]]). Completar horas y asistencia durante la reunión.

### Decisiones (a validar en la reunión)
| # | Tema | Conclusión | Estado |
|---|---|---|---|
| 1 | **Cambio de roles del equipo** | Juan Renato Flores pasa a **Desarrollador Frontend**; **Fabricio Godofredo Ladera La Torre asume como Jefe de Proyecto (PM)** | ✅ Decidido |
| 2 | **Confirmación de servidor y despliegue** | Fase 1 íntegra en **entorno de desarrollo universitario** (servidor + LLM por API); **sin despliegue a producción**: el cliente no tiene presupuesto para sostener la infraestructura IA/RAG → **cierra REQ-08** (REQ-11) | ✅ Decidido |
| 3 | **GAP y backlog inicial** | Análisis GAP y backlog **aprobados**; priorizados para Sprint 1 (login/RBAC) | ✅ Aprobado |
| 4 | **A&D v1.1 (to-be) y cierre del análisis** | Presentado el **proceso to-be**; el análisis **aún no se cierra**: faltan los **diagramas de casos de uso** y el **diagrama de BD con diccionario de datos** — el equipo dispone de **1–2 semanas adicionales**; el avance depende de la **confirmación del cliente** sobre el diagrama de procesos (REQ-13) | 🚧 En proceso |
| 5 | **Modelo de usuarios del portal** | **Definido por el cliente: opción (a)** — **2 roles / 3 personas**: Oscar = **Superadmin** + **2 Administradores**; se **elimina el rol "Usuario"** (ajusta el "máx. 3 usuarios" del acta 1, REQ-03) y habilita el avance del diagrama de procesos | ✅ Definido |
| 6 | **Alcance 2ª fase** | Alta de usuarios **"Cliente" con `tenant_id`** (multi-tenant) + evaluación de **pasarela de pagos** (REQ-12) — sin desarrollo en fase 1. **Aclaración:** todo lo del plan de proyecto corresponde **únicamente a la fase 1**; la fase 2 depende del **tiempo del equipo** y del **presupuesto del cliente para salir a producción** — la inversión habilitaría el modelo retribuido (suscripción + consultoría) que amortizaría ese costo | 📌 Registrado |

### Requerimientos capturados (acta)
| ID | Requisito | Tipo | Prioridad | Estado |
|---|---|---|---|---|
| REQ-10 | Modelo de usuarios: **2 roles / 3 personas** (sin rol "Usuario") — opción (a) | Cambio | Alta | ✅ Definido |
| REQ-11 | Fase 1 **solo en entorno de desarrollo** (universidad); sin producción | RN | Alta | ✅ Definido |
| REQ-12 | 2ª fase: usuarios **"Cliente" con `tenant_id`** + **pasarela de pagos** — sujeta a tiempo del equipo y presupuesto de producción (plan = solo fase 1) | Cambio | Media | ✅ Definido |
| REQ-13 | Cerrar análisis con arquitectura: **CU + BD/diccionario** (por definir: ~1–2 semanas tras confirmación del cliente) | Documento | Alta | 🚧 En proceso |
| REQ-14 | **A&D v1.1** (to-be) como base del análisis con arquitectura | Documento | Alta | 🚧 En proceso |

**Próxima reunión:** 11-09 (cronograma del Plan) → presentar arquitectura completa (CU + BD/diccionario) y prototipo.

---

## 🧭 Consolidado del alcance vigente (post-actas)

1. **Producto:** Portal RAG de consulta sobre **la base de documentos del cliente** (sus propios reportes; sin API ni acceso a la Bolsa).
2. **Sectores priorizados:** **Minería, Energía y Petróleo** (el resto queda fuera del procesamiento por volumen).
3. **Usuarios:** exactamente **3 personas / 2 roles** — Oscar Baldeón (**Superadmin**) + **2 Administradores**; rol "Usuario (lectura)" **eliminado** (acta 4, REQ-10 definido) (ver [[03 Roles y Control de Accesos]]).
4. **IA delimitada:** responde **solo** con la base del cliente y **cita fuente**; ante ausencia → buscar o indicar que no se encontró (REQ-01/02).
5. **Costo:** minimizar tokens + servidor (REQ-05); desarrollo sin costo (infra universitaria); operación posterior = costo del cliente.
6. **Fuera del alcance actual:** LinkedIn (eliminado), suscripción (2ª fase), i18n/rol público/chatbot de citas (sin prioridad; ver [[14 Requerimientos del Kick-off (RF-11+)|estados RF-11+]]).
7. **Infraestructura:** desarrollo = servidor + LLM de la universidad; **fase 1 sin despliegue a producción** (acta 4, REQ-11 — el cliente no tiene presupuesto para infra IA/RAG).
8. **2ª fase (registrada, sin desarrollo):** usuarios **"Cliente" con `tenant_id`** (multi-tenant) + **pasarela de pagos** (acta 4, REQ-12).

## 🔜 Pendientes inmediatos
- ✅ **Cerrado en acta 4:** servidor de producción (REQ-08) → **sin producción en fase 1** (REQ-11); GAP/backlog revisados.
- ✅ **Modelo de usuarios (REQ-10): definido — 2 roles / 3 personas** (Oscar = Superadmin + 2 Administradores; sin rol "Usuario").
- 📌 **Cerrar el análisis (REQ-13):** diagramas de casos de uso + diagrama de BD con diccionario de datos — por definir (~1–2 semanas tras confirmación del diagrama de procesos/modelo de usuarios).
- 📝 **Acta 4 (08-09):** completar horas/asistencia en el borrador, validar en la reunión y firmar (`Acta_Reunion4_BORRADOR`).
- 🟡 Entrega/firma formal del acta 3 por el docente.
- 🔧 **11-09:** presentación de arquitectura completa y prototipo con el cliente (cronograma del Plan).
- 📄 Ajustar la documentación al modelo de usuarios decidido (ver [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]]).

## 🔗 Relacionado
- [[09 Planificación y Roadmap]] · [[10 Pendientes y Supuestos]] · [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]] · [[13 Visión del CEO y Caso de Uso (Kick-off)]] · [[03 Roles y Control de Accesos]]
