# 15 · Arquitectura de Solución

Visión de solución, diagramas de secuencia y decisión de base de datos (relacional vs no relacional según presupuesto). Complementa [[06 Arquitectura (AWS)]] y [[08 Ingesta de Datos]].

## 🎯 Visión de la solución
Plataforma web interna (con posible app externa WhatsApp/Telegram en Fase 2) de **prospección de sostenibilidad** apoyada en un agente **RAG**. Tres capas:
1. **Acceso y control:** Cognito + API Gateway (validación de rol).
2. **Lógica:** Lambda por dominio (Usuarios, Ingesta, IA, Reportes, Lectura/Bolsa).
3. **Conocimiento y datos:** S3 + Bedrock + OpenSearch + Base de datos.

## 🧩 Componentes de la solución
| Capa | Componentes |
|---|---|
| Presentación | Web (React) + canal externo (WhatsApp/Telegram, Fase 2) |
| Identidad | Cognito (auth + RBAC), API Gateway (validación de rol) |
| Lógica | `λ Usuarios`, `λ Ingesta`, `λ IA`, `λ Reportes`, `λ Lectura/Bolsa` |
| Conocimiento | S3 (PDF), Bedrock (embeddings + LLM), OpenSearch (vectores RAG) |
| Datos | Base de datos (ver sección "Base de datos") + caché |
| Transversal | Auditoría (RF-09), expiración de sesión (RNF-01) |

## 🔀 Diagramas de secuencia
Los 4 diagramas de secuencia (ingesta, consulta RAG, reporte PDF y rol público) están en su **nota aparte**: [[16 Diagramas de Secuencia]].

## 🗄️ Base de datos: relacional vs no relacional (según presupuesto)
La elección **depende del presupuesto del cliente** y se define en Sprint 0.

### Opción A — Relacional (Aurora Serverless v2, PostgreSQL/MySQL)
- ✅ Relaciones y consistencia (usuarios, roles, auditoría, métricas tabulares, sanciones).
- ✅ Consultas complejas / joins / reportes analíticos.
- ✅ Transacciones ACID.
- ⚠️ Costo puede ser mayor si se mantiene encendido; Serverless v2 escala a 0 y ayuda.
- 📌 Recomendada si el presupuesto lo permite y se requiere integridad relacional.

### Opción B — No relacional (DynamoDB)
- ✅ Serverless, escalado automático, costo por uso (ideal presupuesto ajustado).
- ✅ Alto rendimiento por clave, ingesta de alta cardinalidad (métricas GRI, eventos).
- ⚠️ Menos flexible para joins/consultas analíticas complejas; requiere modelado por acceso.
- 📌 Recomendada si el presupuesto es limitado y el acceso es mayormente por clave / escala.

### Opción C — Híbrida (la de los requerimientos originales)
- Aurora para datos de gestión (usuarios, roles, auditoría, métricas) + DynamoDB/OpenSearch para lo no relacional y vectores.
- ✅ Lo mejor de ambos, pero ⚠️ más complejidad operativa y posiblemente más costo.

### Tabla comparativa
| Criterio | Relacional (Aurora) | No relacional (DynamoDB) |
|---|---|---|
| Presupuesto | Medio / Alto | Bajo / Medio (por uso) |
| Relaciones / joins | Nativas | Limitadas (modelar por acceso) |
| Escalado | Serverless v2 | Automático |
| Consultas analíticas | Fuertes | Débiles |
| Vectores RAG | No (usar OpenSearch) | No (usar OpenSearch) |
| Caso de uso | Gestión + reportes | Ingesta masiva / por clave |

> ⚠️ **Decisión pendiente:** confirmar presupuesto de Oscar en Sprint 0 para fijar Opción A, B o C. Ver [[10 Pendientes y Supuestos]] y [[09 Planificación y Roadmap]].

## 🔗 Relacionado
- [[06 Arquitectura (AWS)]] · [[16 Diagramas de Secuencia]] · [[07 Flujos por Rol]] · [[08 Ingesta de Datos]] · [[09 Planificación y Roadmap]] · [[10 Pendientes y Supuestos]]
