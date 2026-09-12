# 12 · Análisis y Recomendaciones

Análisis a profundidad tras el kick-off y la lectura de los documentos. **Actualizado post-actas (05-09):** ver sección final.

## 🔎 Hallazgo central: dos documentos, dos alcances *(histórico)*
- `Onepager Igualab.pdf` (📌 **archivado**) presentaba el proyecto como un **chatbot inclusivo público** para agendar citas.
- `Requerimientos-Igualab.pdf` (📌 **archivado**) describía una **plataforma interna de inteligencia de sostenibilidad** con RBAC, IA/RAG, reportes y bolsa.

> 🗄️ Ambos PDF están en `01-Mockups-y-Propuestas/archivados/` — **ya no son la fuente del alcance**. El alcance vigente lo definen el Plan aprobado + las [[21 Actas de Reunión y Acuerdos|actas]] y el borrador [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|Análisis y Diseño]].

---

## 🔄 Insight del kick-off: pivot a consultoría y datos públicos *(histórico, ajustado por actas)*
El kick-off reveló la intención real del CEO (ver [[13 Visión del CEO y Caso de Uso (Kick-off)]]): pivotar a consultoría usando la plataforma para asesorar a empresas, con datos de memorias y reportes públicos. **Las actas ajustaron esta visión** (ver final de esta nota).

## ✅ Recomendaciones
1. **Separar MVP de Fase 2 claramente.** Entregar primero la plataforma interna (RF-01…09); el chatbot inclusivo (RF-10) en una segunda entrega. Esto reduce riesgo y da valor temprano.
2. **Cerrar alcance en Sprint 0.** Confirmar con Oscar Baldeón si espera solo el chatbot o también la plataforma interna. Ver [[10 Pendientes y Supuestos]].
3. **Accesibilidad desde el diseño.** Aunque el chatbot es Fase 2, aplicar criterios del onepager (lectores de pantalla, lenguaje claro, texto/voz) en la UI del MVP mejora RNF-03 y evita deuda.
4. **Datos de bolsa:** arrancar con carga manual (RF-06) y dejar API externa como mejora; no bloquear el MVP.
5. **Modelo de IA:** prototipar con un modelo Bedrock balanceado costo/latencia para cumplir RNF-02 (< 5 s).
6. **Auditoría y seguridad transversales:** implementar RNF-01 y RF-09 desde Sprint 1, no al final.
7. **Repriorizar la fuente de datos:** sustituir/complementar la "Bolsa de Valores" por **datos públicos del estado** (web scraping o carga manual) sobre sanciones/obligaciones de empresas. Ver [[10 Pendientes y Supuestos]].
8. **Modelo de consultoría:** diseñar el agente RAG + reportes como producto de pago para las empresas asesoradas (pivot del CEO). Ver [[13 Visión del CEO y Caso de Uso (Kick-off)]].

## 🧩 Coherencia arquitectónica
El stack AWS (Cognito + API GW + Lambda + Aurora + S3 + Bedrock + OpenSearch + DynamoDB) cubre bien los RF. La capa de control de acceso compartida (Cognito/API GW) es sólida para el RBAC de 2 roles aislados (acta 4). Ver [[06 Arquitectura (AWS)]].

## 🔧 Corrección post-transcripción del kick-off *(histórico)*
La transcripción del video corrigió dos supuestos del análisis inicial:
1. **La "Bolsa de Valores" SÍ es la fuente real** según el CEO en el kick-off: memorias anuales (Bolsa de Lima) + reportes de sostenibilidad GRI.
2. **El valor central es la prospección comercial** (modelo retribuido), no solo la analítica interna.
3. **Había un rol público/externo** además de los 3 internos.

> 🗄️ Estos puntos se **re-ajustaron después con las actas** (ver siguiente sección): el cliente aclaró que no tiene API/acceso a bolsa y que la data es la propia.

## ⚖️ ACTUALIZACIÓN POST-ACTAS (28-08 → 04-09) — el alcance real

Las [[21 Actas de Reunión y Acuerdos|actas 1–3]] re-definieron el alcance del MVP:

1. **Producto = Portal RAG sobre la base del cliente.** La IA responde **solo** con los documentos del cliente (sin conocimiento general, sin API de Bolsa). La "prospección" se apoya en la data que Igualab ya posee.
2. **Data acotada a 3 sectores:** **Minería, Energía y Petróleo** (acta 3) por volumen.
3. **3 usuarios / 2 roles** (Oscar = Superadmin + 2 Administradores — acta 4, REQ-10 definido); **el Superadmin ingesta** (Plan aprobado, objetivo 3).
4. **Costo como restricción dura:** minimizar tokens + servidor (RNF-011); desarrollo con infraestructura de la universidad; operación posterior = costo del cliente.
5. **Suscripción = 2ª fase** (ver reportes sin analítica) — sustituye la idea de "rol público".
6. **LinkedIn eliminado** del alcance (junto con i18n, scraping y chatbot de citas).
7. **Deliverable en curso:** Análisis y Diseño v1.1 (nuevo diagrama de procesos — [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]]).
8. **Acta 4 (08-09):** fase 1 **sin producción** (desarrollo universitario); modelo de usuarios **definido: 2 roles / 3 personas** (REQ-10); 2ª fase = **Cliente con `tenant_id` + pasarela de pagos**; **PM = Fabricio Ladera** (Juan Renato → Frontend); análisis en proceso de cierre con **CU + BD/diccionario** (REQ-13, ~1–2 semanas).

**Recomendación vigente:** cerrar con el PO el criterio de brechas GRI por sector (RN-006), el comportamiento ante respuesta ausente y el modelo de datos corregido (acta 4, 08-09: GAP/backlog y A&D v1.1 validados; servidor de producción **cerrado** — sin producción en fase 1).

## 📈 Valor de negocio
- Plataforma interna: trazabilidad, análisis de impacto y **prospección comercial proactiva** (ingresos para Igualab).
- Rol público: misión social (acceso unificado a info de sostenibilidad) y posicionamiento en concursos Kunan / Democracia Digital.
- Chatbot inclusivo de citas: complemento post-contacto (RF-10).

## 🔗 Relacionado
- [[01 Contexto del Proyecto]] · [[09 Planificación y Roadmap]] · [[10 Pendientes y Supuestos]] · [[13 Visión del CEO y Caso de Uso (Kick-off)]]
