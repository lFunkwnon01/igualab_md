# 04 · Requerimientos Funcionales (RF)

> **Fuente oficial:** *Análisis y Diseño - Igualab* v1.0 (03-09-2026, borrador) — numerado **RF-001…RF-021**.
> **Ajustado por actas:** [[21 Actas de Reunión y Acuerdos]] — IA delimitada a la base del cliente, data acotada a **Minería, Energía y Petróleo**; **RBAC definido en acta 4 (REQ-10): 2 roles / 3 usuarios — sin rol "Usuario"**.
> El numerado antiguo (RF-01…RF-10 del `Requerimientos-Igualab.pdf` archivado) quedó **mapeado al final**. Ver también [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]].

## Módulo de Seguridad y Control de Accesos (RBAC)

### RF-001 — Autenticación
Autenticación por **correo y contraseña** para los dos roles del portal (Superadmin, Administrador — acta 4 REQ-10).
- RN-001 · Actores: todos · Ver [[03 Roles y Control de Accesos]]

### RF-002 — Recuperación de contraseña
Recuperación mediante **enlace enviado al correo registrado**, con vigencia limitada.
- RN-001

### RF-003 — Sesión activa persistente
Sesión sin reautenticación frecuente; **expira por inactividad prolongada** (parámetro configurable, ver [[10 Pendientes y Supuestos]]).

### RF-004 — Restricción por rol
Las funcionalidades disponibles dependen del rol (**Superadmin / Administrador** — 2 roles, acta 4 REQ-10).
- RN-002 · Portal con **3 usuarios** (acta 1, REQ-03; acta 4: Oscar Superadmin + 2 Administradores).

## Módulo de Gestión de Usuarios

### RF-005 — Gestión de usuarios (Superadmin)
El **Superadmin** crea, habilita/deshabilita y asigna roles. Es el único con esta capacidad.
- RN-002

## Módulo de Ingesta de Datos (Superadmin)

> ⚠️ **Cambio oficial (Plan v1.1 aprobado + borrador A&D):** la ingesta es responsabilidad del **Superadmin**; el Administrador solo **consulta**. Ver [[03 Roles y Control de Accesos]].

### RF-006 — Carga de documentos (Superadmin)
Carga de **memorias anuales y reportes de sostenibilidad en PDF**, asociados a **empresa y año**. Fuente: **los reportes del cliente** (sin API de Bolsa — acta 1), acotado a **Minería, Energía y Petróleo** (acta 3, REQ-07).
- RN-004

### RF-007 — Validación anti-duplicados
Validar que un documento cargado **no esté duplicado** antes de indexarlo.
- RN-004

### RF-008 — Indexación automática
Procesar e **indexar (embeddings)** automáticamente cada documento válido.
- RN-004 · Ver [[08 Ingesta de Datos]]

### RF-009 — Notificación de resultado de ingesta
Notificar al Superadmin el resultado (éxito o error con motivo).
- RN-004 · RN-003

## Módulo de Asistente IA (RAG)

### RF-010 — Consulta en lenguaje natural (Administrador)
Consultas en lenguaje natural sobre los **documentos indexados**.
- RN-005 · Actores: Administrador

### RF-011 — Citado de fuente obligatorio
Cada respuesta cita su **fuente (documento, empresa, año)**.
- RN-005 · Complementa acta 1 REQ-01: la IA **solo** responde con la base del cliente (delimitación de conocimiento).

### RF-012 — Aviso de IA no disponible
Informar cuando el asistente no pueda procesar, **sin bloquear** los demás módulos.
- RN-010

## Módulo de Análisis GRI y Sanciones

### RF-013 — Detección de brechas GRI
Identificar y listar brechas en indicadores GRI por empresa, según **criterio definido con el Product Owner** (pendiente de cerrar; RN-006 del borrador está vacía).
- Ver [[18 Diagramas de Procesos (Lógica de Negocio)|proceso 5]]

### RF-014 — Evolución histórica GRI
Mostrar la **evolución año a año** de los indicadores GRI por empresa.
- RN-006

### RF-015 — Detección de sanciones
Identificar **sanciones económicas** por empresa desde la información ingestada.
- RN-006 · Ver [[18 Diagramas de Procesos (Lógica de Negocio)|proceso 6]]

## Módulo de Reportes de Prospección

### RF-016 — Reporte PDF de prospección (Administrador)
Generar reporte PDF que consolide **brechas + sanciones + métricas** de una empresa.
- RN-007 · Ver [[18 Diagramas de Procesos (Lógica de Negocio)|proceso 8]]

### RF-017 — Historial de reportes inmutable
Conservar el historial de reportes **sin edición posterior**.
- RN-007 · RN-003

## Módulo de Visualización (Bolsa)

### RF-018 — Dashboards solo lectura
Dashboards con los datos en modo **solo lectura** — consultados por el **Administrador** (y el Superadmin como consulta general). *(Acta 4, REQ-10: sin rol "Usuario".)*
- RN-008 · ⚠️ Data = la **ingestada del cliente** (acta 1); revisar coherencia "Bolsa" en [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|hallazgo 8]].

### RF-019 — Filtros de visualización
Filtrar por **empresa, sector y periodo**.
- RN-008

## Módulo Transversal: Auditoría

### RF-020 — Registro automático de eventos
Registrar inicios de sesión, cambios de rol, ingesta y generación de reportes.
- RN-009 · Ver [[18 Diagramas de Procesos (Lógica de Negocio)|proceso 11]]

### RF-021 — Consulta de auditoría con filtros
Consultar el registro filtrando por **usuario, fecha y tipo de evento** (rol Superadmin).
- RN-009

---

## ⛔ Fuera del alcance actual (post-actas)

| Tema | Estado | Referencia |
|---|---|---|
| **Sincronización LinkedIn** | ❌ **ELIMINADO del alcance** (revisión del equipo; el Plan aprobado no lo incluye) | [[14 Requerimientos del Kick-off (RF-11+)]] |
| **Usuarios "Cliente" + `tenant_id` + pasarela de pagos** | 📌 **Registrado para 2ª fase** (acta 4, REQ-12) — sin desarrollo en fase 1 | [[21 Actas de Reunión y Acuerdos]] |
| Rol público de lectura | ⏸️ Sustituido por **suscripción** (ver reportes sin analítica) — 2ª fase (acta 2) | [[21 Actas de Reunión y Acuerdos]] |
| Multilingüe (i18n) | ⏸️ Sin prioridad en el numerado oficial | [[14 Requerimientos del Kick-off (RF-11+)]] |
| Chatbot de citas (onepager) | ⏸️ Obsoleto con el onepager (fuente archivada) | [[01 Contexto del Proyecto]] |
| Web scraping / autonomía anual | ⏸️ El cliente provee su propia data; sin scraping en el numerado oficial | [[14 Requerimientos del Kick-off (RF-11+)]] |

## 🗺️ Mapeo numerado antiguo → oficial

| Antiguo (Requerimientos archivado) | Oficial (A&D v1.0) |
|---|---|
| RF-01 Autenticación | RF-001, RF-002, RF-003 |
| RF-02 Gestión de usuarios | RF-005 |
| RF-03 Restricción Usuario | RF-004, RF-018 |
| RF-04 Restricción Administrador | RF-004 |
| RF-05 Asistente IA | RF-010, RF-011, RF-012 |
| RF-06 Ingesta (Administrador) | **RF-006…RF-009 (Superadmin)** |
| RF-07 Reportes PDF | RF-016, RF-017 |
| RF-08 Dashboards Bolsa | RF-018, RF-019 |
| RF-09 Auditoría | RF-020, RF-021 |
| RF-10 Chatbot de citas | ⛔ Obsoleto (onepager archivado) |

## 🔗 Relacionado
- [[05 Requerimientos No Funcionales]] · [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]] · [[21 Actas de Reunión y Acuerdos]] · [[09 Planificación y Roadmap]] · [[17 Diagrama de Casos de Uso]]
