# 10 · Pendientes y Supuestos

Decisiones abiertas y riesgos detectados en los documentos fuente.

## 🚩 Pendientes de diseño (según requerimientos)
1. **Fuente externa de la Bolsa de Valores** — hoy es carga manual (RF-06 / RF-08). ¿Conectar API de la Bolsa de Lima u otra?
2. **Modelo de IA en Bedrock** — ¿cuál? (ej. Titan / Claude). Afecta costo y latencia (RNF-02).
3. **Expiración de sesión por inactividad** — parámetro de Cognito (RNF-01). ¿Cuántos minutos?
4. **Chatbot de citas (RF-10)** — fuera de MVP; definir si se adelanta.
5. **"Bolsa de Valores" = fuente real (corregido)** — tras la transcripción del kick-off, la "Bolsa de Valores" **SÍ es la fuente real**: son las **memorias anuales** del repositorio público de la Bolsa de Valores de Lima (obligatorias para empresas que cotizan). No era un mero ejemplo. Ver [[08 Ingesta de Datos]] y [[13 Visión del CEO y Caso de Uso (Kick-off)]].
6. **LinkedIn** — sincronizar para que el analista comercial encuentre contactos (gerente de sostenibilidad/financiero). Exploratorio (privacidad/TOS). Ver [[14 Requerimientos del Kick-off (RF-11+)|RF-17]].
7. **Concursos Kunan / Democracia Digital** — obtener bases y alinear criterios de evaluación desde el diseño. Ver [[14 Requerimientos del Kick-off (RF-11+)|RF-18]].
8. **Idiomas** — definir soporte ES + lenguas originarias (quechua/aimara) + EN y cómo se implementa (modelo/i18n). Ver [[14 Requerimientos del Kick-off (RF-11+)|RF-15]].
9. **Autonomía/anualidad** — mecanismo de recarga (web scraping) para no desfasar la base al año siguiente. Ver [[14 Requerimientos del Kick-off (RF-11+)|RF-16]].
10. **Base de datos: relacional vs no relacional** — definir según el **presupuesto del cliente** (Aurora relacional vs DynamoDB no relacional vs híbrida). Decisión en Sprint 0. Ver [[15 Arquitectura de Solución]].

## ❓ Supuestos a confirmar con el cliente
- ¿El chatbot inclusivo del onepager es el único entregable esperado, o también la plataforma interna? → Ver [[12 Análisis y Recomendaciones]].
- ¿Volumen estimado de memorias y métricas? (define tamaño de OpenSearch/Aurora).
- ¿Quién operará como Superadmin / Administrador / Usuario en producción?
- ¿Canal del chatbot (web, WhatsApp, ambos)?
- ¿El modelo de negocio es consultoría de pago sobre los reportes del agente?

## ⚠️ Riesgos
| Riesgo | Impacto | Mitigación |
|---|---|---|
| Alcance ambiguo (dos documentos) | Alto | Reunión de alcance en Sprint 0 |
| Fuente de bolsa indefinida | Medio | Iniciar con carga manual |
| Latencia de IA > 5 s | Medio | Elección de modelo + índices |
| Accesibilidad postergada | Medio | Incluir criteria desde diseño |
| Fuente de datos mal entendida (bolsa vs estado) | Alto | Confirmado: memorias anuales Bolsa de Lima |
| Desfase anual de la base (reportes anuales) | Alto | Web scraping / recarga automática (RF-16) |

## 🔗 Relacionado
- [[09 Planificación y Roadmap]] · [[12 Análisis y Recomendaciones]] · [[01 Contexto del Proyecto]]
