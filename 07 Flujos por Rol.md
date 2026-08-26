# 07 · Flujos por Rol

Cada rol entra por lo mismo (Cognito + API Gateway validan su rol) pero solo usa sus funciones. Lectura de izquierda a derecha.

## 🟡 1 · SUPERADMIN
**Gestiona quién entra y con qué rol.** Da de alta usuarios y les asigna un rol. Es el único que puede. No usa la IA.

```
Superadmin → Cognito → API Gateway → λ Usuarios → Aurora Serverless v2
 inicia sesión   login+rol   valida rol   crea usuarios y      usuarios ·
                                        asigna roles          roles · auditoría
```

- RF aplicables: [[04 Requerimientos Funcionales#RF-02 — Gestión de usuarios y roles (Superadmin)|RF-02]], [[04 Requerimientos Funcionales#RF-09 — Auditoría de accesos|RF-09]].

## 🟢 2 · ADMINISTRADOR
**Carga datos, pregunta a la IA y genera reportes.** Alimenta la base con memorias y métricas, consulta el chat de IA y descarga PDFs.

```
Administrador → Cognito → API Gateway → λ Ingesta / IA / Reportes → almacén híbrido
 inicia sesión   login+rol   valida rol     chat IA · PDF
```

Funciones (misma puerta, tres capacidades):
- **λ Ingesta** — sube memorias y métricas ([[04 Requerimientos Funcionales#RF-06 — Ingesta de datos|RF-06]]).
- **λ IA chat** — pregunta en lenguaje natural sobre documentos y métricas ([[04 Requerimientos Funcionales#RF-05 — Asistente IA Híbrido solo Administrador|RF-05]]).
- **λ Reportes** — genera y descarga PDF ([[04 Requerimientos Funcionales#RF-07 — Generación de Reportes|RF-07]]).

## 🔵 3 · USUARIO
**Solo mira los datos de la Bolsa.** Acceso de solo lectura. Ve dashboards y tablas de la Bolsa de Valores. Sin IA, sin cargar nada.

```
Usuario → Cognito → API Gateway → λ Bolsa → API-bolsa de valores
 inicia sesión  login+rol  valida rol   lee datos de mercado
```

- RF aplicables: [[04 Requerimientos Funcionales#RF-08 — Visualización de la Bolsa de Valores|RF-08]].

## 🔗 Relacionado
- [[03 Roles y Control de Accesos]] · [[06 Arquitectura (AWS)]] · [[08 Ingesta de Datos]]
