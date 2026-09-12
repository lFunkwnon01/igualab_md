# 14 · Requerimientos del Kick-off (RF-11+)

RF derivados de la transcripción del kick-off (video 2026-08-25, en [[13 Visión del CEO y Caso de Uso (Kick-off)]]). **El numerado RF-11+ es histórico**: el numerado oficial vigente es [[04 Requerimientos Funcionales|RF-001…RF-021]] (borrador de Análisis y Diseño). Esta nota conserva la trazabilidad de qué sobrevivió y qué no tras las [[21 Actas de Reunión y Acuerdos|actas]].

## 📊 Estados post-actas

| ID | Requerimiento | Estado | Motivo |
|---|---|---|---|
| RF-11 | Unificación de fuentes (reportes + memorias) | ✅ **Vigente (ajustado)** | Sigue vivo como ingesta sobre **la base del cliente**, acotada a **Minería, Energía y Petróleo** (acta 3, REQ-07) → RF-006…009 |
| RF-12 | Detección de brechas GRI | ✅ **Vigente** | Núcleo del negocio → RF-013, RF-014 |
| RF-13 | Análisis de sanciones | ✅ **Vigente** | → RF-015 |
| RF-14 | Rol público/externo de solo lectura | ⏸️ **Replanteado** | El "público" pasa a **suscripción** (ver reportes sin analítica) — 2ª fase (actas 1 y 2) |
| RF-15 | Multilingüe (ES/originarias/EN) | ⏸️ **Sin prioridad** | No aparece en el numerado oficial ni en las actas; retomable a futuro |
| RF-16 | Autonomía (web scraping anual) | ⏸️ **Sin prioridad** | El cliente provee su propia data; no hay scraping en el alcance oficial |
| RF-17 | Sincronización con LinkedIn | ❌ **ELIMINADO del alcance** | Revisión del equipo al actualizar el Plan (aprobado sin LinkedIn); tampoco está en el borrador A&D |
| RF-18 | Alineación concursos (Kunan/Democracia Digital) | ⏸️ **Estratégico, sin RF** | No está en el numerado oficial; mantener como criterio de diseño cualitativo |
| RF-19 | Canal flexible + agenda (WhatsApp/Telegram, citas) | ⏸️ **Sin prioridad** | Sin analítica ni chatbot de citas en el alcance actual (onepager archivado) |

> ⚠️ **Regla de trazabilidad:** ningún RF de esta lista puede volver al alcance sin decisión del Product Owner (Oscar) registrada en un acta. Ver [[10 Pendientes y Supuestos]].

## Detalle (histórico del kick-off)

### RF-11 — Unificación de fuentes *(ajustado)*
Unificar los documentos de sostenibilidad y las memorias que **el cliente posee** (ya no se habla de repositorio público de la Bolsa: el cliente **no tiene API ni acceso a bolsa** — acta 1). Ver [[08 Ingesta de Datos]].

### RF-12 — Detección de brechas GRI
Identificar códigos GRI sub-reportados → oportunidad. Ej.: *"según empresa X del sector Minería, ¿cuáles son sus métricas GRI más débiles?"* → RF-013/RF-014.

### RF-13 — Análisis de sanciones
Extraer y cuantificar sanciones económicas y puntos débiles de reputación → RF-015.

### RF-14 — Rol público/externo *(replanteado → suscripción, 2ª fase)*
El acercamiento del CEO a un acceso público se concreta como **modelo de suscripción** (ver la data sin analítica), a evaluar en la 2ª fase (acta 2, REQ-04).

### RF-15 — Multilingüe *(sin prioridad)*
Español + lenguas originarias + inglés. Fuera del numerado oficial.

### RF-16 — Autonomía de actualización *(sin prioridad)*
Recarga automática (web scraping). Fuera del numerado oficial; la vigencia anual queda como buena práctica de operación.

### RF-17 — Sincronización con LinkedIn ❌
**Eliminado del alcance.** Estaba mapeado al mockup `b_squeda_linkedin_cu010` (Stitch) y al CU010 del prototipo; ambos quedan marcados como **fuera de alcance** (ver [[20 Prompt Mockup MVP]]). El BPMN fue actualizado para no mencionar LinkedIn ([[19 BPMN — Modelado de Procesos (Estándar de Industria)]]).
> Motivo de la eliminación: enfoque del MVP en el RAG delimitado y simplificación solicitada por el cliente ("algo simplista" — acta 1).

### RF-18 — Alineación concursos *(estratégico)*
Premio Kunan / Democracia Digital como criterio cualitativo de diseño. No es RF.

### RF-19 — Canal flexible + agenda *(sin prioridad)*
WhatsApp/Telegram + agenda de citas con `consultas@igualab.org`. Sin prioridad actual.

## 🔗 Relacionado
- [[13 Visión del CEO y Caso de Uso (Kick-off)]] · [[21 Actas de Reunión y Acuerdos]] · [[04 Requerimientos Funcionales]] · [[08 Ingesta de Datos]] · [[03 Roles y Control de Accesos]] · [[09 Planificación y Roadmap]]
