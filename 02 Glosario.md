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
| **Asistente de IA** | Motor conversacional (RAG + métricas), de uso del **rol interno/Administrador** (ver [[04 Requerimientos Funcionales#RF-05 — Asistente IA Híbrido solo Administrador|RF-05]]). |
| **Prospección comercial** | Uso de la plataforma para detectar empresas con brechas GRI/sanciones y acercarse como aliado estratégico (modelo retribuido). |
| **Lenguas originarias** | Quechua/aimara; el bot debe soportarlas (inclusión). Ver [[14 Requerimientos del Kick-off (RF-11+)\|RF-15]]. |

## Términos técnicos (adicionales del análisis)
| Término | Definición |
|---|---|
| **RBAC** | *Role-Based Access Control*: control de accesos basado en roles (3 roles aislados). |
| **RAG** | *Retrieval-Augmented Generation*: la IA responde sobre documentos citando la fuente. |
| **Ingesta** | Proceso de cargar memorias, métricas y datos de bolsa al sistema. |
| **MOC** | *Map of Content*: nota índice del vault ([[📌 Inicio]]). |

## 🔗 Relacionado
- [[03 Roles y Control de Accesos]] · [[08 Ingesta de Datos]]
