# 06 · Arquitectura (AWS)

Stack propuesto en los requerimientos. Dos roles comparten la puerta de acceso (acta 4 REQ-10); de ahí, cada uno solo usa sus funciones.

> ⚠️ **Nota de despliegue (actas 2, 3 y 4):** en la **etapa de desarrollo**, el servidor y el LLM los provee la **universidad** (por API). ⬅️ **Acta 4 (REQ-11): la fase 1 NO tendrá despliegue a producción** — el cliente no tiene presupuesto para sostener la infraestructura IA/RAG; todo opera en el entorno de desarrollo. Este stack AWS (Cognito/Lambda/Bedrock/Aurora/DynamoDB/OpenSearch) es la **arquitectura lógica de referencia** ([[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|A&D v1.1]]): los módulos y el RBAC se mantienen; los servicios concretos se adaptarán al entorno real. Ver [[15 Arquitectura de Solución]], [[21 Actas de Reunión y Acuerdos]] y [[10 Pendientes y Supuestos]].

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
