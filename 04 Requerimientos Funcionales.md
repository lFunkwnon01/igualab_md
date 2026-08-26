# 04 · Requerimientos Funcionales (RF)

## Módulo de Seguridad y Control de Accesos

### RF-01 — Autenticación
El sistema debe permitir el inicio de sesión seguro y diferenciar los tres perfiles: **Superadmin, Administrador y Usuario Operativo**.
- Rol: todos · Ver [[03 Roles y Control de Accesos]]

### RF-02 — Gestión de usuarios y roles (Superadmin)
El **Superadmin** debe poder crear/dar de baja usuarios y asignar o revocar roles y privilegios. **Es el único rol con esta capacidad.**
- Rol: 🟡 Superadmin
- Backend sugerido: `λ Usuarios` → Aurora Serverless v2 (tablas `usuarios`, `roles`, `auditoría`). Ver [[06 Arquitectura (AWS)]].

### RF-03 — Restricción rol Usuario
El **Usuario Operativo** solo tiene permisos de lectura y **únicamente** sobre los datos de la Bolsa de Valores.
- Rol: 🔵 Usuario

### RF-04 — Restricción rol Administrador
El **Administrador** tiene acceso a la ingesta de datos, generación de reportes PDF y al asistente de IA, pero **no** a la gestión de usuarios/roles.
- Rol: 🟢 Administrador

---

## Módulo Principal: Inteligencia de Sostenibilidad (IA)

### RF-05 — Asistente IA Híbrido (solo Administrador)
Interfaz de chat en lenguaje natural, **exclusiva del Administrador**, que combina:
- **(a) Consulta sobre documentos (RAG):** responde preguntas sobre las memorias de sostenibilidad ingestadas, **citando la fuente**.
- **(b) Consulta sobre métricas estructuradas:** responde sobre los datos tabulares (ej. sector minero) de la base de datos.

- Rol: 🟢 Administrador · Backend: `λ IA` + Bedrock + OpenSearch + Aurora/DynamoDB. Ver [[08 Ingesta de Datos]].

### RF-06 — Ingesta de datos
El Administrador debe poder alimentar el sistema con:
- Memorias de sostenibilidad (documentos)
- Métricas industriales
- Datos de la Bolsa de Valores (carga manual)

> 🚩 **Pendiente:** posible integración con fuente externa para datos de bolsa. Ver [[10 Pendientes y Supuestos]].

- Rol: 🟢 Administrador · Backend: `λ Ingesta` → S3 / DynamoDB. Ver [[08 Ingesta de Datos]].

### RF-07 — Generación de Reportes
El Administrador debe poder **generar y descargar reportes de prospección automatizados en formato PDF**.
- Rol: 🟢 Administrador (y 🔵 Usuario puede descargar los generados — ver matriz).
- Backend: `λ Reportes`.

### RF-08 — Visualización de la Bolsa de Valores
El sistema debe mostrar los datos de la Bolsa de Valores en **dashboards y tablas**, accesibles al Usuario (solo lectura) y al Administrador.
- Rol: 🟢 Administrador · 🔵 Usuario · Backend: `λ Bolsa` → API-bolsa de valores.

---

## Módulo Transversal: Auditoría

### RF-09 — Auditoría de accesos
El sistema debe registrar eventos sensibles:
- Inicios de sesión
- Cambios de rol
- Ingesta de datos
- Generación de reportes

Consultable por el **Superadmin**. Soporta [[05 Requerimientos No Funcionales#RNF-04 — Trazabilidad|RNF-04]].
- Rol: 🟡 Superadmin

---

## Módulo Secundario: Asistencia Externa (Fase 2)

### RF-10 — Chatbot de Citas (Fase 2)
Complemento conversacional externo orientado al **agendamiento de citas con el público**. Considerado foco secundario / **Fase 2**, fuera del alcance del MVP.

> 🔎 Este RF es el puente con el `Onepager Igualab.pdf`: el chatbot inclusivo descrito allí es este RF-10. Ver [[01 Contexto del Proyecto]] y [[12 Análisis y Recomendaciones]].

- Fase: 2 · Rol: público externo

---

## 📊 Resumen RF
| ID | Módulo | Rol(es) | Fase |
|---|---|---|---|
| RF-01 | Seguridad | Todos | MVP |
| RF-02 | Seguridad | Superadmin | MVP |
| RF-03 | Seguridad | Usuario | MVP |
| RF-04 | Seguridad | Administrador | MVP |
| RF-05 | IA | Administrador | MVP |
| RF-06 | IA | Administrador | MVP |
| RF-07 | IA | Administrador/Usuario | MVP |
| RF-08 | IA | Administrador/Usuario | MVP |
| RF-09 | Auditoría | Superadmin | MVP |
| RF-10 | Asistencia | Público | Fase 2 |

## 🔗 Relacionado
- [[05 Requerimientos No Funcionales]] · [[09 Planificación y Roadmap]]
