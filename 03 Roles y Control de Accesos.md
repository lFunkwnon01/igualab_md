# 03 · Roles y Control de Accesos

Modelo **RBAC** con tres roles **aislados (no jerárquicos)**: cada rol tiene un conjunto acotado de permisos y **no hereda** los de otro. En particular, el **Superadmin NO usa el asistente de IA**.

## 👥 Los tres roles

### 🟡 Superadmin (Gestión)
- Administra usuarios y asigna/revoca roles y privilegios.
- Configura el sistema y consulta la **auditoría de accesos**.
- **No** realiza análisis de datos ni usa la IA.

### 🟢 Administrador (Análisis)
- Consulta el **asistente de IA** sobre métricas y memorias.
- Ingestiona datos (memorias, métricas industriales y datos de bolsa).
- Genera reportes en PDF.
- **No** gestiona usuarios ni roles.

### 🔵 Usuario Operativo (Lectura)
- Acceso de **solo lectura**, exclusivamente a los **datos de la Bolsa de Valores** (dashboards y tablas).
- **No** accede a la IA, ni a métricas de sostenibilidad, ni a ingesta o configuración.

> Nota: el Administrador también visualiza los datos de la Bolsa de Valores (parte de su análisis); el Usuario solo eso.

## 🔐 Matriz de Permisos

| Acción | 🟡 Superadmin | 🟢 Administrador | 🔵 Usuario |
|---|:---:|:---:|:---:|
| Iniciar sesión | ✅ | ✅ | ✅ |
| Crear / dar de baja usuarios | ✅ | ❌ | ❌ |
| Asignar / revocar roles | ✅ | ❌ | ❌ |
| Configurar el sistema | ✅ | ❌ | ❌ |
| Ver auditoría de accesos | ✅ | ❌ | ❌ |
| Consultar el asistente de IA | ❌ | ✅ | ❌ |
| Ingesta de memorias / métricas / datos de bolsa | ❌ | ✅ | ❌ |
| Generar y descargar reportes PDF | ❌ | ✅ | ✅ |
| Ver dashboards/tablas de la Bolsa de Valores | ✅* | ✅ | ✅ |

\* El Superadmin puede ver la bolsa por ser parte de la consulta general del sistema, pero su foco es gestión.

## 🆕 Refinamiento del kick-off: dimensión Interno vs Público
El CEO (video kick-off) redefine los roles en **dos dimensiones**:
- **Rol interno** = prospector / analista comercial de Igualab → equivale al **Administrador** (usa la IA, ingesta, reportes).
- **Rol público/externo** = ciudadano que solo busca la información unificada (reportes + memorias), **sin prospectar** → equivale/amplía al **Usuario Operativo**.

> ⚠️ La matriz de arriba (3 roles del documento) sigue vigente como base, pero el alcance real suma el **rol público** y matiza que el "Usuario" no ve solo "bolsa" sino los documentos unificados. Ver [[13 Visión del CEO y Caso de Uso (Kick-off)]] y [[14 Requerimientos del Kick-off (RF-11+)\|RF-14]].

## 🧱 Capa de control de acceso (compartida)
Todos los roles entran por **Cognito** (login + rol) y **API Gateway** comprueba el rol antes de permitir el paso. Ahí vive el control de acceso: por eso el Usuario nunca llega a la IA y solo el Superadmin cambia roles. Ver [[06 Arquitectura (AWS)]] y [[07 Flujos por Rol]].

## 🔗 Relacionado
- [[04 Requerimientos Funcionales]] · [[09 Planificación y Roadmap]]
