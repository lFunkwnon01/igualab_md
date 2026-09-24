# 21 · Actas de Reunión y Acuerdos

Registro oficial de las interacciones con el cliente (Oscar Baldeón, Product Owner). Formato CS3081 (Ingeniería de Software). Los PDF firmados están en `01-Mockups-y-Propuestas/`.

> ⚠️ **Estado:** Actas 1 y 2 **firmadas** · Acta 3 firmada por cliente y PM (firma del docente por confirmar) · **Acta 4 (08-09) realizada y firmada** · **Acta 5 (11-09) aprobada** (Plan v1.2 conformado + decisiones de alcance) · **Acta 6 (15-09) registrada** · **Acta 7 (21-09) registrada** (avance desplegado + autenticación + configuración de correo Gmail + envío del A&D por correo). Guía de generación en [[23 Guía de Generación de Actas]].

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

## 📋 Acta 3 — CS3081-003-2026 · vie 04-09-2026 · 10:00–10:20 · Virtual 🟡 Firmada (docente por confirmar)

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

## 📝 Acta 4 — CS3081-004-2026 · mar 08-09-2026 · Virtual ✅ Realizada y firmada

**Proyecto:** Igualab — Plataforma de analítica de sostenibilidad (RAG) · **Fase:** Análisis y Diseño — confirmación de servidor y cierre del análisis (arquitectura) · *Primera acta con Fabricio Ladera como PM.*
**Archivo firmado:** `01-Mockups-y-Propuestas/CS3081-004-2026_Acta_Reunion4.pdf`.

### Decisiones
| # | Tema | Conclusión | Estado |
|---|---|---|---|
| 1 | **Cambio de roles del equipo** | Juan Renato Flores pasa a **Desarrollador Frontend**; **Fabricio Godofredo Ladera La Torre asume como Jefe de Proyecto (PM)** | ✅ Decidido |
| 2 | **Confirmación de servidor y despliegue** | Fase 1 íntegra en **entorno de desarrollo universitario** (servidor + LLM por API); **sin despliegue a producción**: el cliente no tiene presupuesto para sostener la infraestructura IA/RAG → **cierra REQ-08** (REQ-11) | ✅ Decidido |
| 3 | **GAP y backlog inicial** | Análisis GAP y backlog **aprobados**; priorizados para Sprint 1 (login/RBAC) | ✅ Aprobado |
| 4 | **A&D (to-be) y cierre del análisis** | Proceso to-be presentado; el análisis se cierra con **diagramas de casos de uso** y **diagrama de BD con diccionario de datos** | ✅ Cerrado (en el A&D actual) |
| 5 | **Modelo de usuarios del portal** | **Definido por el cliente: opción (a)** — **2 roles / 3 personas**: Oscar = **Superadmin** + **2 Administradores**; se **elimina el rol "Usuario"** | ✅ Definido |
| 6 | **Alcance 2ª fase** | Usuarios **"Cliente" con `tenant_id`** (multi-tenant) + evaluación de **pasarela de pagos** — sin desarrollo en fase 1 | 📌 Registrado |

### Requerimientos capturados (acta)
| ID | Requisito | Tipo | Prioridad | Estado |
|---|---|---|---|---|
| REQ-10 | Modelo de usuarios: **2 roles / 3 personas** (sin rol "Usuario") — opción (a) | Cambio | Alta | ✅ Definido |
| REQ-11 | Fase 1 **solo en entorno de desarrollo** (universidad); sin producción | RN | Alta | ✅ Definido |
| REQ-12 | 2ª fase: usuarios **"Cliente" con `tenant_id`** + **pasarela de pagos** | Cambio | Media | ✅ Definido |
| REQ-13 | Cerrar análisis con arquitectura: **CU + BD/diccionario** | Documento | Alta | ✅ Cumplido (A&D actual) |
| REQ-14 | **A&D (to-be)** como base del análisis con arquitectura | Documento | Alta | ✅ Cumplido (A&D actual) |

**Siguiente hito:** presentación de arquitectura completa y prototipo → **acta 5 (11-09)**.

---

## 📋 Acta 5 — CS3081-005-2026 · vie 11-09-2026 · 10:00–11:00 · Virtual ✅ Aprobada

**Proyecto:** Igualab — Sistema de Análisis de Datos de Sostenibilidad (RAG); línea base: **Plan de Proyecto v1.2** · **Fase:** Presentación del Plan v1.2 y del prototipo; control de cambios de alcance.
**Archivos:** `01-Mockups-y-Propuestas/CS3081-005-2026_Acta_Reunion5.tex` (+ `CS3081-005-2026_Acta_Reunion5.pdf`).

### Decisiones
| # | Tema | Conclusión | Estado |
|---|---|---|---|
| 1 | **Plan de Proyecto v1.2** | Presentado al PO; **conformidad sin observaciones**. Queda como **línea base vigente** | ✅ Aprobado |
| 2 | **Módulo de Bolsa de Valores** | **NO viable** (API BVL licenciada ~US$20/mes sin presupuesto; riesgo de ban por scraping; la fuente real es la ingesta). El PO decidió **eliminar** CU007/RF-018/019/RN-008 y el actor externo BVL | ✅ Decidido (eliminar) |
| 3 | **Exclusión de LinkedIn** | Registro formal de su exclusión del alcance (cierra la trazabilidad del mockup CU010) | ✅ Aprobado |
| 4 | **Delegación tecnológica** | El PO **autoriza** al equipo decidir stack, arquitectura y herramientas, informándolas y validándolas funcionalmente en las demos | ✅ Aprobado |
| 5 | **Dashboards de visualización** | **Reprogramados a fase 2** (KPIs ASG/ESG, índice ASG 0–100); fase 1 se centra en el núcleo de valor | ✅ Aprobado |
| 6 | **Formato de ingesta** | Los documentos se suben **únicamente en Markdown (`.md`)** (conversión a cargo del cliente), con **tablas de pipes**; reemplaza la idea inicial de aceptar solo PDF | ✅ Aprobado |

### Requerimientos capturados (acta)
| ID | Requisito | Tipo | Prioridad | Estado |
|---|---|---|---|---|
| REQ-15 | Presentación y **conformidad del Plan v1.2** (línea base vigente) | Documento | Alta | ✅ Aprobado |
| REQ-16 | **Eliminación del módulo de Bolsa de Valores** (CU007, RF-018/019, RN-008, actor BVL) | Cambio | Alta | ✅ Decidido |
| REQ-17 | **Registro formal de la exclusión de LinkedIn** | Cambio | Media | ✅ Aprobado |
| REQ-18 | **Delegación de la decisión tecnológica** al equipo (stack, arquitectura, herramientas) | RN | Alta | ✅ Aprobado |
| REQ-19 | **Reprogramación de los dashboards** de visualización a **fase 2** | Cambio | Alta | ✅ Aprobado |
| REQ-20 | **Formato de ingesta**: solo `.md` con tablas de pipes | Cambio | Alta | ✅ Aprobado |

**Próxima reunión:** 14/09 (lunes), cadencia acordada de **2 reuniones/semana** — validación final de requerimientos, arquitectura y prototipo; avance del A&D con las decisiones de esta acta.

---

## 📝 Acta 6 — CS3081-006-2026 · mar 15-09-2026 · Virtual 🚧 BORRADOR

**Proyecto:** Proyecto Igualab — Plataforma de analítica de sostenibilidad (RAG) · **Fase:** Conformidad del PO (RN/RF/RNF) y avance del Análisis y Diseño (cierre previsto para el viernes 18/09).
**Borrador:** `01-Mockups-y-Propuestas/CS3081-006-2026_Acta_Reunion6_BORRADOR.tex` (+ `CS3081-006-2026_Acta_Reunion6.pdf`). Se completa en la reunión.

### Temas previstos
1. **Conformidad del PO (Oscar) con RN/RF/RNF** — validación por correo, sin observaciones (RN 001–039, RF 001–056, RNF 001–036).
2. **Presentación del rediseño del mockup** con todas las funcionalidades de fase 1, alineado al alcance vigente.
3. **Avance del Análisis y Diseño (A&D)** — gran avance; cierre previsto para el viernes 18/09.

> El acta se centra en cerrar la **fase 1**; no se reabren temas ya cerrados (fase 2 en actas 4/5).

### Requerimientos propuestos (IDs tentativos — continúan desde REQ-20)
| ID | Necesidad / cambio | Tipo | Estado |
|---|---|---|---|
| REQ-21 | Conformidad del PO con RN/RF/RNF remitidos por correo | Documento | Por registrar |
| REQ-22 | Presentación y aprobación del rediseño del mockup | Documento | Por registrar |
| REQ-23 | Cierre del Análisis y Diseño (A&D) con trazabilidad final | Documento | En proceso |

---

## 📝 Acta 7 — CS3081-007-2026 · lun 21-09-2026 · 10:00–10:30 · Virtual 🚧 Por firmar

**Proyecto:** Proyecto Igualab — Plataforma de analítica de sostenibilidad (RAG) · **Fase:** Avance desplegado en los entornos de la universidad (módulo de autenticación), configuración de correo Gmail y presentación del A&D por correo.
**Archivos:** `01-Mockups-y-Propuestas/CS3081-007-2026_Acta_Reunion7.tex` (+ `CS3081-007-2026_Acta_Reunion7.pdf`).
**Asistentes:** Oscar Baldeón (PO) · Fabricio Ladera (PM) · Luis Millones (Analista) · Juan Marcelo Ferreyra (Backend) · Alonso Benites (Tester).

### Temas tratados
1. **Avance desplegado en los entornos de la universidad** y demostración del **módulo de autenticación** (inicio de sesión y control de acceso por roles).
2. **Configuración de envío de correos con Gmail (SMTP/API)** para el flujo de recuperación de contraseña ("olvidé contraseña"); el PO **compartirá una cuenta** de correo para la configuración.
3. **Presentación del Análisis y Diseño (A&D) por correo** para **conformidad del PO** (cierre de la revisión).

### Requerimientos capturados (acta)
| ID | Requisito | Tipo | Prioridad | Estado |
|---|---|---|---|---|
| REQ-24 | Despliegue del avance en los entornos de la universidad | Demo | Alta | ✅ Registrado |
| REQ-25 | Demostración del módulo de autenticación | Demo | Alta | ✅ Registrado |
| REQ-26 | Configuración de envío de correos con Gmail (SMTP/API) para recuperación de contraseña; cuenta a compartir por el PO | Cambio | Alta | ⏳ Pendiente |
| REQ-27 | Presentación/entrega del Análisis y Diseño (A&D) por correo | Documento | Alta | ✅ Registrado (22/09) |

### Compromisos
- PO (Oscar): **compartir una cuenta de correo** para la configuración (⏳ pendiente).
- Juan Marcelo (Backend): **obtener la API/configuración de Gmail** y configurar el envío de correos (⏳ pendiente).
- PM/Analistas: **enviar el A&D por correo** (✅ enviado 22/09) y **enviar el acta 7** (✅ 22/09).

**Próxima reunión:** por definir (cadencia de 2 reuniones/semana).

---

## 🧭 Consolidado del alcance vigente (post-actas 1–5)

1. **Producto:** portal RAG de consulta sobre **la base de documentos del cliente** (sus propios reportes; sin API ni acceso a la Bolsa).
2. **Sectores priorizados:** **Minería, Petróleo y Gas, y Energía**.
3. **Usuarios:** exactamente **3 personas / 2 roles** — Oscar Baldeón (**Superadmin**) + **2 Administradores**; rol "Usuario" **eliminado** (acta 4, REQ-10).
4. **IA delimitada:** responde **solo** con el corpus ingestado y **cita la fuente**; ante ausencia, lo declara explícitamente.
5. **Ingesta:** el **Superadmin** carga documentos **`.md` con tablas de pipes** (acta 5, REQ-20); el Administrador solo consulta.
6. **Costo:** minimizar tokens + servidor; desarrollo sin costo (infra universitaria); operación posterior = costo del cliente.
7. **Fuera de fase 1:** dashboards (fase 2, REQ-19), módulo Bolsa (eliminado, REQ-16), LinkedIn (excluido, REQ-17), chatbot inclusivo/portal público/i18n (fase 2).
8. **Infraestructura:** desarrollo = servidor + LLM de la universidad; **fase 1 sin despliegue a producción** (acta 4, REQ-11).
9. **2ª fase (registrada, sin desarrollo):** usuarios **"Cliente" con `tenant_id`** + **pasarela de pagos** (acta 4, REQ-12).

## 🔜 Pendientes inmediatos
- 📌 **A&D:** corregir los pendientes documentados (CU007/rol "Usuario" aún presentes; sección 8 y diccionario de datos; RN del límite de 50 MB; RF del pipeline) — ver `FASE 1/01-Analisis-y-Diseno/10…` (Anexo 5).
- 🟡 Firma del docente en el acta 3.
- 🗓️ Cadencia de **2 reuniones/semana** con el cliente (acta 5).
- 🔧 Avance de **backend y frontend** por sprint (`06-Desarrollo/BCK-IGUALAB`, `06-Desarrollo/FE-IGUALAB`).

## 🔗 Relacionado
- [[📌 Inicio]] · [[11 Stakeholders y Contactos]] · [[23 Guía de Generación de Actas]]
