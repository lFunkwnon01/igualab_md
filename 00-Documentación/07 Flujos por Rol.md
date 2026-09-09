# 07 · Flujos por Rol

Cada rol entra por el mismo mecanismo (autenticación + validación de rol) pero solo usa sus funciones. Numerado de RF según [[04 Requerimientos Funcionales|RF-001…021]].

> ✅ **Definido en acta 4 (08-09-2026 — REQ-10):** RBAC de **2 roles / 3 personas** (Oscar = Superadmin + 2 Administradores; rol "Usuario" eliminado — flujo eliminado abajo). La fase 1 opera en el **entorno de desarrollo** universitario, sin producción (REQ-11). El acceso de "Cliente" con `tenant_id` es **2ª fase** (REQ-12).

## 🟡 1 · SUPERADMIN (Gestión e Ingesta) — Oscar Baldeón
**Gestiona quién entra, con qué rol, y qué documentos entran al sistema.** Da de alta los usuarios (**3: él mismo + 2 Administradores** — acta 4, REQ-10), asigna roles, **carga las memorias y reportes GRI del cliente** y valida su indexación. No usa la IA.

```
Superadmin → Autenticación (RF-001) → Validación de rol
           → λ Usuarios: crea/actualiza usuarios y roles (RF-005)
           → λ Ingesta: carga PDF + empresa + año, dedup, indexa, notifica resultado (RF-006…009)
           → Configuración y auditoría (RF-020/021)
```

- RF aplicables: RF-005, RF-006…009, RF-020, RF-021.

## 🟢 2 · ADMINISTRADOR (Análisis) — 2 personas de Igualab
**Consulta la IA, revisa brechas y genera reportes.** Explota la información ingestada por el Superadmin. Es el rol de los **prospectores/analistas comerciales** (visión del CEO).

```
Administrador → Autenticación (RF-001) → Validación de rol
             → λ IA: consulta RAG con citas (RF-010…012)
             → Brechas GRI + sanciones (RF-013…015)
             → λ Reportes: PDF de prospección (RF-016/017)
             → Dashboards de Bolsa (RF-018/019)
```

Funciones (misma puerta, tres capacidades):
- **Chat IA** — pregunta en lenguaje natural sobre los documentos ([[04 Requerimientos Funcionales#RF-010 — Consulta en lenguaje natural (Administrador)|RF-010]]).
- **Análisis** — brechas GRI y sanciones por empresa/sector ([[04 Requerimientos Funcionales#RF-013 — Detección de brechas GRI|RF-013…015]]).
- **Reportes** — PDF de prospección y descarga ([[04 Requerimientos Funcionales#RF-016 — Reporte PDF de prospección (Administrador)|RF-016/017]]).

## 🚀 3 · CLIENTE (2ª fase — acta 4, REQ-12) 📌 no en fase 1
Usuario externo "Cliente" con **`tenant_id`** (multi-tenant) y posible **pasarela de pagos** para la suscripción. Requiere decisión del PO en acta antes de desarrollarse.

## 🔗 Relacionado
- [[03 Roles y Control de Accesos]] · [[06 Arquitectura (AWS)]] · [[08 Ingesta de Datos]] · [[17 Diagrama de Casos de Uso]]
