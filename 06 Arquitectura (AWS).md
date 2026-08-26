# 06 · Arquitectura (AWS)

Stack propuesto en los requerimientos. Tres roles comparten la puerta de acceso; de ahí, cada uno solo usa sus funciones.

## 🧩 Componentes compartidos
| Componente | Función |
|---|---|
| **Cognito** | Login + identificación de rol (RF-01). |
| **API Gateway** | Valida el rol en cada petición (capa de control de acceso). |

## 🗂️ Por módulo

### Gestión (Superadmin)
`Cognito → API Gateway → λ Usuarios → Aurora Serverless v2`
- Crea usuarios, asigna roles, sube datos de auditoría.
- Tablas: `usuarios`, `roles`, `auditoría`.

### Inteligencia (Administrador)
`Cognito → API Gateway → λ Ingesta / IA / Reportes → almacén híbrido`
- `λ Ingesta`: sube memorias y métricas (RF-06).
- `λ IA chat`: pregunta en lenguaje natural sobre documentos y métricas (RF-05).
- `λ Reportes`: genera y descarga PDF (RF-07).

### Bolsa (Usuario)
`Cognito → API Gateway → λ Bolsa → API-bolsa de valores`
- Lee datos de mercado, dashboards y tablas (RF-08).

## 💾 Almacenamiento híbrido
| Dato | Destino |
|---|---|
| Documentos / memorias | **S3** |
| Vectores para búsqueda RAG | **OpenSearch** |
| Métricas estructuradas / datos numéricos | **DynamoDB** / **Aurora Serverless v2** |
| Datos de la Bolsa de Valores | API externa + caché |

## 🔐 Seguridad (RNF-01)
- Credenciales hasheadas en Aurora.
- Expiración de sesión por inactividad en Cognito (⚠ pendiente de parámetro).
- Auditoría en tabla dedicada (RF-09).

## 🔗 Relacionado
- [[07 Flujos por Rol]] · [[08 Ingesta de Datos]] · [[15 Arquitectura de Solución]] · [[05 Requerimientos No Funcionales]]
