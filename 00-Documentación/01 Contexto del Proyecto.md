
# 01 · Contexto del Proyecto

> ⚖️ **Actualización post-actas (05-09):** el alcance vigente es el **Portal RAG sobre la base de documentos del cliente**, acotado a **Minería, Energía y Petróleo**, máx. 3 usuarios, ingesta por Superadmin, IA delimitada con citas. El onepager (chatbot inclusivo) y el PDF de requerimientos antiguos están **archivados** en `01-Mockups-y-Propuestas/archivados/`. Resumen en [[12 Análisis y Recomendaciones]] y [[21 Actas de Reunión y Acuerdos]].

## 🏢 Sobre Igualab
- **Nombre:** Igualab
- **Fundada:** 2016
- **Naturaleza:** Organización peruana dedicada a la **consultoría en Diversidad e Inclusión (DEI), sostenibilidad y Responsabilidad Social Empresarial (RSE)**
- **Fines:** promover entornos laborales inclusivos y prácticas **ASG** (Ambiente, Social y Gobernanza) en el sector empresarial peruano
- **Certificaciones:** Entidad Perceptora de Donaciones (EPD), Corporate Live Wire Innovation & Excellence Awards
- **Servicios:** consultoría, capacitaciones y programas de reconocimiento

---

## 📌 Problema planteado (Requerimientos)
Igualab requiere una **plataforma interna centralizada y segura** para gestionar su analítica de sostenibilidad y prospección industrial, estructurada sobre:
- Modelo de control de accesos por roles (**RBAC**) con tres perfiles.
- Un asistente de **Inteligencia Artificial** para análisis de datos.
- Generación de **reportes en PDF**.
- Un complemento externo de **agendamiento de citas**.

---

## 💬 Problema planteado (Onepager)
El onepager enfoca el proyecto en la **atención virtual al público**, específicamente:
- Mejorar la atención virtual asegurando que sea **accesible para personas con discapacidad**.
- Gestionar de forma eficiente el **agendamiento de citas** con el equipo de atención.

> **Pregunta rectora (onepager):** *¿Cómo podríamos crear e integrar un chatbot inclusivo que atienda virtualmente al público, incluyendo a personas con discapacidad, y que permita programar citas con el equipo de atención de Igualab?*

---

## 🔍 Dos alcances que conviven → nuestra propuesta de solución
Los dos documentos iniciales plantean alcances distintos:

| Documento                    | Alcance                                                                  | Actor principal                                 | Fase               |
| ---------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------- | ------------------ |
| `Requerimientos-Igualab.pdf` | Plataforma interna de sostenibilidad + IA + reportes + bolsa + auditoría | Superadmin / Administrador / Usuario (internos) | **MVP**            |
| `Onepager Igualab.pdf`       | Chatbot inclusivo público para agendar citas                             | Público general / personas con discapacidad     | **Fase 2 (RF-10)** |

**Nuestra propuesta de solución (unifica ambos y se apoya en el video del kick-off):** una sola plataforma en dos entregas:
- **MVP — plataforma interna de prospección:** un agente **RAG** que unifica los *reportes de sostenibilidad* (estándar **GRI**) y las *memorias anuales* del repositorio público de la **Bolsa de Valores de Lima** (estas últimas contienen además **sanciones económicas**). El agente **detecta brechas GRI y sanciones** para que Igualab prospecte empresas como aliado estratégico, genera **reportes PDF** y suma un **rol público de solo lectura** (acceso unificado a la información). Incluye RBAC (Superadmin / Administrador / Usuario) y auditoría.
- **Fase 2 — chatbot inclusivo de citas (RF-10):** el chatbot de agendamiento accesible del onepager, como complemento **post-contacto** (una vez lograda la prospección), con canales web / WhatsApp / Telegram.

> ✅ **Alineación con el video:** la propuesta coincide con lo dicho por el CEO en el kick-off —la fuente real son las memorias anuales (Bolsa de Lima) + reportes GRI, el valor central es la **prospección comercial**, hay un **rol público de lectura**, y el chatbot de citas es un complemento. El video matiza que el "público" del onepager es más bien un rol de lectura unificada, mientras el bot de citas queda en Fase 2. Ver [[13 Visión del CEO y Caso de Uso (Kick-off)]] y [[12 Análisis y Recomendaciones]].

---

## 🎤 Visión del CEO (post kick-off): pivot a consultoría
De la sesión de kick-off (2026-08-25) surge una visión estratégica que **refina y amplía** los documentos escritos:

- Igualab, aunque es una **ONG sin fines de lucro**, busca **pivotar hacia un modelo de consultoría** para ayudar a empresas a mejorar su gestión de impacto y sostenibilidad.
- El modelo debe ser **retribuido / generar ingresos** (consultoría de pago), no solo filantrópico.
- **Caso de uso real mencionado:** una empresa petrolera con un derrame en el mar peruano que contaminó. Las empresas declaran públicamente memorias anuales y reportes de sostenibilidad que contienen información de **accionistas, deberes y obligaciones**, y pueden ser **sancionadas** (ej. sanciones económicas por acoso, consulta previa, corrupción).
- Esa información es **pública del estado**. Se evaluó: (a) **web scraping** de plataformas estatales, o (b) carga manual de los documentos y análisis con un agente.
- El análisis se haría con un **agente RAG** sobre esa información, el cual generaría **reportes** automatizados (ver [[04 Requerimientos Funcionales#RF-016 — Reporte PDF de prospección (Administrador)|RF-016]]).

> 📌 **Fuente de datos (aclarada por el video):** el documento de requerimientos menciona *"datos de la Bolsa de Valores"*; el kick-off confirma que **es la fuente real**: las **memorias anuales** del repositorio público de la Bolsa de Valores de Lima (obligatorias para empresas que cotizan) + los **reportes de sostenibilidad** (estándar GRI) de la web de cada empresa. Ambos son públicos. Ver [[13 Visión del CEO y Caso de Uso (Kick-off)]] y [[10 Pendientes y Supuestos]].

---

## 🎯 Objetivos del proyecto (según onepager)
- **General:** Diseñar y prototipar un chatbot inclusivo capaz de atender consultas y agendar citas virtuales.
- **Específicos:**
  1. Investigar criterios de accesibilidad e inclusión aplicables a chatbots (lectores de pantalla, lenguaje claro, alternativas texto/voz).
  2. Mapear el flujo actual de atención al público y agendamiento de citas.
  3. Diseñar y prototipar el flujo conversacional del chatbot.
  4. Integrar funcionalidad de programación de citas virtuales.

> Referencia histórica: los objetivos del onepager alimentaban el RF-10 (chatbot de citas), hoy **fuera del alcance** (fuente archivada).

---

## 🔗 Relacionado
- [[03 Roles y Control de Accesos]] · [[09 Planificación y Roadmap]] · [[12 Análisis y Recomendaciones]]
