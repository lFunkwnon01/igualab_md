# 02 · Glosario

Definiciones de significado fijo en todo el proyecto (fuente: `Requerimientos-Igualab.pdf`, §2).

| Término | Definición |
|---|---|
| **Memorias de sostenibilidad** | Documentos (texto/PDF) con información cualitativa de sostenibilidad que el **Administrador** ingesta. Base de conocimiento del asistente de IA (RAG). Ver [[13 Visión del CEO y Caso de Uso (Kick-off)\|detalle kick-off]]. |
| **Reporte de sostenibilidad** | Documento anual de empresas (áreas de sostenibilidad), auditado por auditores internacionales, que responde al **estándar GRI**. Ubicado en la web de cada empresa. |
| **Memoria anual** | Documento financiero/estratégico obligatorio en Perú para empresas de la **Bolsa de Valores de Lima**; transparenta **sanciones económicas**. Repositorio público de la Bolsa. |
| **Estándar GRI** | *Global Reporting Initiative*: códigos por área (ambiental, social, económico/gobernanza). Ej. **GRI 400 = laboral/social**. El agente detecta brechas (ver [[14 Requerimientos del Kick-off (RF-11+)\|RF-12/RF-13]]). |
| **Datos de la Bolsa de Valores** | En el kick-off = **memorias anuales** del repositorio público de la Bolsa de Valores de Lima (fuente real, no ejemplo). Ver [[08 Ingesta de Datos]]. |
| **Métricas / datos industriales** | Datos estructurados y tabulares (ej. sector minero) en la base de datos. |
| **Asistente de IA** | Motor conversacional (RAG + métricas), de uso del **rol interno/Administrador** (ver [[04 Requerimientos Funcionales#RF-010 — Consulta en lenguaje natural (Administrador)|RF-010]]). |
| **Prospección comercial** | Uso de la plataforma para detectar empresas con brechas GRI/sanciones y acercarse como aliado estratégico (modelo retribuido). |
| **Lenguas originarias** | Quechua/aimara; el bot debe soportarlas (inclusión). Ver [[14 Requerimientos del Kick-off (RF-11+)\|RF-15]]. |

## Términos del alcance vigente (actas 2026)
| Término | Definición |
|---|---|
| **Acta CS3081** | Acta de reunión con usuarios (formato del curso); registro oficial de decisiones con el cliente. Ver [[21 Actas de Reunión y Acuerdos]]. |
| **Problemática (1ª)** | Primer desarrollo del proyecto: el **sistema RAG** sobre la base del cliente (acta 2). |
| **Delimitación de IA** | La IA responde **solo** con la base de documentos del cliente (acta 1, REQ-01). |
| **Sectores priorizados** | **Minería, Energía y Petróleo** — acotado del procesamiento por volumen (acta 3, REQ-07). |
| **Suscripción (2ª fase)** | Modelo propuesto: ver los reportes **sin analítica** a cambio de suscripción (actas 1–2). Concretado en acta 4 (REQ-12): usuarios **"Cliente" con `tenant_id`** (multi-tenant) + **pasarela de pagos**. |

## Términos técnicos (adicionales del análisis)
| Término | Definición |
|---|---|
| **RBAC** | *Role-Based Access Control*: control de accesos basado en roles (2 roles aislados — acta 4, REQ-10). |
| **Tenant / tenant_id** | Identificador de inquilino para usuarios "Cliente" en 2ª fase (modelo multi-tenant — acta 4, REQ-12). |
| **RAG** | *Retrieval-Augmented Generation*: la IA responde sobre documentos citando la fuente. |
| **Ingesta** | Proceso de cargar memorias, métricas y datos de bolsa al sistema. |
| **MOC** | *Map of Content*: nota índice del vault ([[📌 Inicio]]). |

## 🔗 Relacionado
- [[03 Roles y Control de Accesos]] · [[08 Ingesta de Datos]]
