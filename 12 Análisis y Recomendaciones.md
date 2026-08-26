# 12 · Análisis y Recomendaciones

Análisis a profundidad tras el kick-off y la lectura de ambos documentos.

## 🔎 Hallazgo central: dos documentos, dos alcances
- `Onepager Igualab.pdf` presenta el proyecto como un **chatbot inclusivo público** para agendar citas (accesible a personas con discapacidad).
- `Requerimientos-Igualab.pdf` describe una **plataforma interna de inteligencia de sostenibilidad** con RBAC, IA/RAG, reportes y bolsa.

**Lectura sugerida:** el onepager es la visión origen (atención al público). Los requerimientos amplían el alcance hacia una plataforma analítica interna. El chatbot del onepager es exactamente el **RF-10 (Fase 2)**. No son contradictorios, pero el cliente debe priorizar.

---

## 🔄 Insight del kick-off: pivot a consultoría y datos públicos
El kick-off revela la intención real del CEO (ver [[13 Visión del CEO y Caso de Uso]]):
- Igualab quiere **pivotar a consultoría** (modelo retribuido) usando la plataforma para asesorar a empresas.
- El dato de interés son las **memorias anuales** (repositorio público de la Bolsa de Valores de Lima) y los **reportes de sostenibilidad** (web de cada empresa) — información pública con sanciones y obligaciones; ej. caso derrame petrolero.
- Esto **reconcilia** el documento de requerimientos (que menciona bolsa) con la visión del cliente: la "bolsa" probablemente fue un ejemplo de dato tabular; el MVP real debe centrarse en datos públicos de empresas + RAG + reportes.

## ✅ Recomendaciones
1. **Separar MVP de Fase 2 claramente.** Entregar primero la plataforma interna (RF-01…09); el chatbot inclusivo (RF-10) en una segunda entrega. Esto reduce riesgo y da valor temprano.
2. **Cerrar alcance en Sprint 0.** Confirmar con Oscar Baldeón si espera solo el chatbot o también la plataforma interna. Ver [[10 Pendientes y Supuestos]].
3. **Accesibilidad desde el diseño.** Aunque el chatbot es Fase 2, aplicar criterios del onepager (lectores de pantalla, lenguaje claro, texto/voz) en la UI del MVP mejora RNF-03 y evita deuda.
4. **Datos de bolsa:** arrancar con carga manual (RF-06) y dejar API externa como mejora; no bloquear el MVP.
5. **Modelo de IA:** prototipar con un modelo Bedrock balanceado costo/latencia para cumplir RNF-02 (< 5 s).
6. **Auditoría y seguridad transversales:** implementar RNF-01 y RF-09 desde Sprint 1, no al final.
7. **Repriorizar la fuente de datos:** sustituir/complementar la "Bolsa de Valores" por **datos públicos del estado** (web scraping o carga manual) sobre sanciones/obligaciones de empresas. Ver [[10 Pendientes y Supuestos]].
8. **Modelo de consultoría:** diseñar el agente RAG + reportes como producto de pago para las empresas asesoradas (pivot del CEO). Ver [[13 Visión del CEO y Caso de Uso]].

## 🧩 Coherencia arquitectónica
El stack AWS (Cognito + API GW + Lambda + Aurora + S3 + Bedrock + OpenSearch + DynamoDB) cubre bien los RF. La capa de control de acceso compartida (Cognito/API GW) es sólida para el RBAC de 3 roles aislados. Ver [[06 Arquitectura (AWS)]].

## 🔧 Corrección post-transcripción del kick-off
La transcripción del video (ver [[13 Visión del CEO y Caso de Uso (Kick-off)]]) **corrige dos supuestos** de este análisis:
1. **La "Bolsa de Valores" SÍ es la fuente real.** No era un ejemplo de dato tabular: son las **memorias anuales** del repositorio público de la Bolsa de Valores de Lima, que además contienen sanciones. El otro documento es el **reporte de sostenibilidad** (estándar GRI) de la web de cada empresa.
2. **El valor central es la prospección comercial** (modelo retribuido), no solo la analítica interna. El agente RAG debe *detectar brechas GRI y sanciones* para que Igualab se acerque a esas empresas como aliado estratégico de reputación.
3. **Hay un rol público/externo** además de los 3 internos: lectura unificada para ciudadanos/profesionales.

Esto refuerza que el MVP debe centrarse en: ingesta unificada (memorias + reportes) + RAG de brechas GRI/sanciones + reportes PDF + rol público de lectura + i18n + autonomía por web scraping.

## 📈 Valor de negocio
- Plataforma interna: trazabilidad, análisis de impacto y **prospección comercial proactiva** (ingresos para Igualab).
- Rol público: misión social (acceso unificado a info de sostenibilidad) y posicionamiento en concursos Kunan / Democracia Digital.
- Chatbot inclusivo de citas: complemento post-contacto (RF-10).

## 🔗 Relacionado
- [[01 Contexto del Proyecto]] · [[09 Planificación y Roadmap]] · [[10 Pendientes y Supuestos]] · [[13 Visión del CEO y Caso de Uso (Kick-off)]]
