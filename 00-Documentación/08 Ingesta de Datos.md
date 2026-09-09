# 08 · Ingesta de Datos

> 🔄 **Cambio oficial (Plan aprobado + actas):** la ingesta la realiza el **🟡 Superadmin** (no el Administrador). La fuente es **la base de documentos del cliente** (sus propios reportes; el cliente **no cuenta con API ni acceso a Bolsa** — acta 1) y el procesamiento está **acotado a los sectores Minería, Energía y Petróleo** (acta 3, REQ-07).

Cuando el **Superadmin** carga un documento (PDF + empresa + año), el sistema valida que no esté duplicado, lo procesa y lo **indexa automáticamente** para que el asistente de IA pueda buscar dentro. El Administrador **solo consulta**. Todo queda registrado en auditoría.

## 🔄 Pipeline de ingesta
```
Carga del Superadmin → Validación (formato + duplicado)
→ Procesamiento e indexación (asíncrona, no bloquea módulos — RNF-003)
→ Resultado notificado al Superadmin (éxito / error con motivo)
```

## 📥 Tipos de ingesta (Superadmin)
| Tipo | Origen | RF |
|---|---|---|
| **Memorias anuales** | Reportes propios del cliente (PDF) | [[04 Requerimientos Funcionales#RF-006 — Carga de documentos (Superadmin)\|RF-006]] |
| **Reportes de sostenibilidad (GRI)** | Reportes propios del cliente (PDF) | [[04 Requerimientos Funcionales#RF-006 — Carga de documentos (Superadmin)\|RF-006]] |
| **Métricas estructuradas** | Extraídas del análisis de los PDF (códigos GRI, montos de sanción) | [[04 Requerimientos Funcionales#RF-013 — Detección de brechas GRI\|RF-013]]/[[04 Requerimientos Funcionales#RF-015 — Detección de sanciones\|RF-015]] |

**Reglas de negocio aplicadas:** PDF + empresa identificable + no duplicado (RN-004) · sin borrado físico (RN-003) · notificación de resultado (RF-009) · ingesta asíncrona (RNF-003).

## 🤖 Consulta (Administrador)
El asistente de IA responde **únicamente con la base del cliente** (delimitación — acta 1, REQ-01) y **cita la fuente** (documento, empresa, año — RF-011). Si la respuesta no está en los documentos: buscar o indicar que no se encontró (REQ-02, comportamiento a definir — [[10 Pendientes y Supuestos]]).

## 🚩 Pendientes de diseño
- Criterios de detección de brechas GRI por sector (**RN-006 vacía en el borrador**) — cerrar con el PO en la reunión del 07-09. Ver [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|hallazgo 3]].
- Comportamiento exacto ante "respuesta no encontrada" (acta 1, REQ-02).
- Mecanismo de vigencia anual de los documentos (sin scraping en el alcance; recarga manual).
- Ver [[10 Pendientes y Supuestos]].

## 🔗 Relacionado
- [[06 Arquitectura (AWS)]] · [[04 Requerimientos Funcionales#RF-010 — Consulta en lenguaje natural (Administrador)|RF-010]] · [[04 Requerimientos Funcionales#RF-006 — Carga de documentos (Superadmin)|RF-006]] · [[21 Actas de Reunión y Acuerdos]]
