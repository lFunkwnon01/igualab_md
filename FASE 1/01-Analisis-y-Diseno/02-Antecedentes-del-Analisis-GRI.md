# 02 · Análisis GRI: antecedentes, qué es una brecha y cómo se califica

>Detalle solicitado por el PO (Oscar) en las interacciones previas (actas 1–5): entender con precisión qué son las **memorias anuales**, los **reportes de sostenibilidad (GRI)**, qué es una “brecha” y cómo se determina el estado de un indicador.

## 1. ¿Qué documentos consume el sistema (fuente de verdad)?

| Documento | Quién lo publica | Qué contiene | Valor para Igualab |
|---|---|---|---|
| **Memoria anual** | toda empresa que cotiza en la **Bolsa de Valores de Lima** (obligatorio por la SMV) | resultados financieros, gobierno corporativo, remuneraciones, litigios, sanciones | evidencia de **sanciones** e indicadores de gobernanza |
| **Reporte de sostenibilidad (GRI)** | mismas empresas, elaborado voluntariamente y **validado por auditores internacionales** bajo el estándar **GRI** | desempeño ambiental, social y de gobernanza por código GRI (p. ej. GRI 305 Emisiones, GRI 403 Seguridad y Salud, GRI 404 Formación) | evidencia de **brechas de sub/sobre-reporto** y datos ASG |

Ambos documentos llegan al sistema **ya convertidos a Markdown (.md)** por el propio cliente, con tablas **estructuradas con pipes** (acta 5 · REQ-20). El sistema **no recibe PDF**.

## 2. ¿Qué es una “brecha”?

Una **brecha GRI** es la diferencia entre **lo que el estándar GRI exige reportar** y **lo que la empresa realmente reporta** en sus memorias anuales o reportes de sostenibilidad.

El estado del indicador se clasifica con el **catálogo GRI como referencia** (tabla `catalogo_gri` en la base de datos, nunca lo decide la IA por sí sola — ver RN-013):

| Estado | Significado | Ejemplo (mock) |
|---|---|---|
| `OK` | el reporte cubre el indicador con datos completos y metas verificables | *GRI 306 Residuos — OK: “Reporte completo con metas de reducción”* (Minera Andina, mock) |
| `SUB-REPORTADO` | se menciona el tema pero faltan datos/metricas exigidas | *GRI 401 Empleo — Sub-reportado: “solo declara contrataciones, sin rotación ni beneficios”* (Minera Andina, mock) |
| `BAJA SUSTANCIA` | el contenido existe pero es superficial (sin impacto medible) | *GRI 413 Comunidades locales — Baja sustancia: “menciona consultas pero sin indicadores de impacto”* (mock) |
| `CRITICO` | (asignado por el humano) omisión grave o sanción asociada, prioridad de contacto | el analista lo asigna en la revisión del análisis |

Ningún estado se calcula “a ojo” de la IA: cada fila de evaluación guarda el **código GRI**, la **cita** (documento, sección) y el **estado**; la IA/motor solo **sugiere**, y el humano **valida o cambia el estado antes de generar el reporte** (RN-013, RF-013 — supervisión humana acordada con el PO).

## 3. ¿Cómo se identifica el estado sin que la IA decida el “GRI óptimo”?

Pregunta del PO: “¿cómo sabe la IA cuál es el GRI óptino? ¿hay un estándar que se deba seguir?”. Respuesta de diseño (fase 1):

1. Existe un **catálogo GRI estándar** (Universal Standards serie 100, materiales 200-ambiental, 300-sociales y 400-goobreza) precargado en la tabla `catalogo_gri` con: código, denominación, sección requerida, **elementos mínimos de reporto esperados** y palabras clave de evidencia.
2. El pipeline de ingesta **compara el contenido del documento** contra el catálogo: para cada código detectado registra el nivel de sustancia (lista de verificación de elementos mínimos: cifras, metas, casos, coberturas).
3. El estado sugerido resulta de esas reglas **determinísticas** (no del conocimiento “general” del LLM); el LLM únicamente redacta la observación con su cita.
4. El analista humano revisa la fila sugerida y **cambia el estado si corresponde** (`CRITICO`, `OK`, etc.). El histórico de cambios queda en la tabla (quién, cuándo, estado anterior/nuevo).

## 4. Flujo de servicios por defecto (de la meist noja del final del mock)

El mock fidelizado muestra por empresa (ej. **Minera Andina S.A.A.**, sector Minería):

- fila `GRI 401 Empleo` → *Sub-reportado*; fila `GRI 413` → *Baja sustancia*; fila `GRI 306` → *OK*. materiales analizados “sector a grupo” **con la misma disciplina por código**.
- Con esos datos y las **sanciones**, el Administrador genera el **reporte de prospección PDF**.

El mismo patrón se replica en los 3 sectores permitidos (Minería, Energía, Petróleo y Gas — ver alcance de análisis, actas).
