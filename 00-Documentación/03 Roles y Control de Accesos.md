# 03 · Roles y Control de Accesos

Modelo **RBAC** con **dos roles aislados (no jerárquicos)** y **exactamente 3 usuarios** en el portal (acta 1, REQ-03; **redefinido en acta 4, REQ-10**: se eliminó el rol "Usuario (lectura)"). Cada rol tiene un conjunto acotado de permisos y **no hereda** los de otro. En particular, el **Superadmin NO usa el asistente de IA**.

> ✅ **Definido en acta 4 (08-09-2026 — REQ-10):** el cliente adoptó la **opción (a)** — **2 roles / 3 personas**: Oscar Baldeón = **Superadmin** + **2 Administradores**; el rol "Usuario (lectura)" queda **eliminado**. La matriz de abajo refleja el modelo vigente. La **ingesta** sigue siendo del **Superadmin** (Plan objetivo 3 + RN-002).
> 🚀 **2ª fase (acta 4, REQ-12):** alta de usuarios **"Cliente" con `tenant_id`** (multi-tenant) + evaluación de **pasarela de pagos**. Fuera del desarrollo de fase 1.
> 🖥️ **Despliegue (acta 4, REQ-11):** la fase 1 opera íntegramente en el **entorno de desarrollo** de la universidad (servidor + LLM); **sin despliegue a producción**.

## 👥 Los dos roles (3 personas)

### 🟡 Superadmin (Gestión e Ingesta) — 1 persona: Oscar Baldeón
- Administra los usuarios (máx. 3) y asigna/revoca roles.
- **Ingresa los documentos** (memorias anuales y reportes GRI del cliente) y valida su indexación.
- Configura el sistema y consulta la **auditoría de accesos**.
- **No** consulta el asistente de IA ni genera reportes de prospección.

### 🟢 Administrador (Análisis) — 2 personas
- Consulta el **asistente de IA** (RAG) sobre los documentos ingestados.
- Revisa **brechas GRI y sanciones** detectadas.
- Genera **reportes de prospección en PDF**.
- Visualiza los datos/dashboards (parte de su análisis).
- **No** gestiona usuarios, roles ni ingesta.

## 🔐 Matriz de Permisos (vigente)

| Acción                                          | 🟡 Superadmin | 🟢 Administrador |
| ----------------------------------------------- | :-----------: | :--------------: |
| Iniciar sesión                                  |       ✅       |        ✅         |
| Crear / habilitar / deshabilitar usuarios       |       ✅       |        ❌         |
| Asignar / revocar roles                         |       ✅       |        ❌         |
| **Ingesta de documentos (memorias/reportes)**   |   **✅** ⬅️    |        ❌         |
| Consultar el asistente de IA (RAG)              |       ❌       |        ✅         |
| Revisar brechas GRI / sanciones                 |       ❌       |        ✅         |
| Generar reportes de prospección PDF             |       ❌       |        ✅         |
| Ver dashboards/tablas (solo lectura)            |      ✅*       |        ✅         |
| Configurar el sistema                           |       ✅       |        ❌         |
| Ver auditoría de accesos                        |       ✅       |        ❌         |

\* El Superadmin puede ver la bolsa por ser parte de la consulta general del sistema, pero su foco es gestión e ingesta.

## 🚀 Dimensión externa (2ª fase — acta 4, REQ-12)
- El acceso externo se concretará como **usuarios "Cliente"** con **`tenant_id`** (modelo multi-tenant), con posible **pasarela de pagos** para la suscripción (actas 1–2: ver reportes sin analítica).
- **No forma parte de la fase 1**: requiere decisión del PO registrada en acta antes de entrar en desarrollo. Ver [[21 Actas de Reunión y Acuerdos]].

## 🧱 Capa de control de acceso (compartida)
Todos los roles entran por el mismo mecanismo de autenticación (RF-001) y el control de acceso por rol se aplica en cada módulo: el Administrador no ingesta, y solo el Superadmin cambia roles e ingresa documentos. Ver [[06 Arquitectura (AWS)]] y [[07 Flujos por Rol]].

## 🔗 Relacionado
- [[04 Requerimientos Funcionales]] · [[09 Planificación y Roadmap]] · [[21 Actas de Reunión y Acuerdos]]
