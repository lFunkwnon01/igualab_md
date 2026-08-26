# 13 · Visión del CEO y Caso de Uso (Kick-off)

Transcripción analizada del video de kick-off (2026-08-25, ~35 min). El CEO **Oscar Baldeón** expone la visión; el equipo de desarrollo pregunta. Fuente: `video.mp4` → `transcript.txt`.

## 🧭 Pivot estratégico (confirmado)
- Igualab (ONG) → operará también como **consultoría de sostenibilidad** (modelo retribuido / generador de ingresos).
- Objetivo principal: **prospección comercial proactiva** (dejar de ser reactivos). Usan la plataforma para encontrar empresas a las que ayudar a reparar/mejorar su reputación en sostenibilidad.

## 📄 Dos documentos anuales (FUENTE REAL DE DATOS)
Ambos son **públicos** (PDF, sin límite de acceso; cualquiera con internet puede descargarlos).

1. **Reportes de sostenibilidad**
   - Emitidos por áreas de sostenibilidad de las empresas; auditados por auditores internacionales.
   - Responden al **estándar GRI** (Global Reporting Initiative). Códigos por área: ambiental, social, económico/gobernanza. Ej. **GRI 400 = temas laborales/sociales**.
   - Ubicación: la **web de cada empresa**.
2. **Memorias anuales** (financieras/estratégicas)
   - En Perú, solo empresas que operan en la **Bolsa de Valores de Lima** están obligadas (por norma) a publicarlas.
   - **Transparentan sanciones económicas** (minist. de trabajo por acoso/acosamiento, consulta previa en zonas extractivas, corrupción con sector público, etc.). Los montos son cuantificables.
   - Ubicación: **repositorio público de la Bolsa de Valores de Lima** (acceso a memorias de todos los afiliados que cotizan).

## 🤖 Qué debe hacer el agente (RAG)
- Unificar ambos documentos en una base común para "una interpretación más sólida".
- **Detectar brechas GRI**: identificar códigos GRI sub-reportados (poca sustancia) → oportunidad comercial.
  - Ej.: *"según empresa X del sector banca, ¿cuáles son sus métricas GRI más débiles?"*
- **Analizar sanciones**: *"¿cuáles son los puntos débiles por sanciones económicas en la última memoria anual de la minera X?"* → señala dónde reparar reputación.
- Generar **reportes de prospección en PDF** (un click) para compartir con el equipo.
- Es **apoyo analítico interno** (no para el público, salvo el rol público).

## 👥 Roles (refinamiento del kick-off)
El CEO define **dos dimensiones**:
- **Rol interno** = prospector / analista comercial de Igualab (≈ Administrador de los requerimientos).
- **Rol público/externo** = ciudadano que solo busca información unificada (no prospecta). (≈ Usuario Operativo, ampliado).
Ver [[03 Roles y Control de Accesos]].

## 🌐 Idiomas (transversal)
- **Español** (obligatorio).
- **Lenguas originarias** (quechua/aimara) — inclusión.
- **Inglés** (contactos en Reino Unido).
Ver [[14 Requerimientos del Kick-off (RF-11+)]].

## 🔄 Autonomía (reto principal)
Los documentos son **anuales** → la base se desfasa. Necesidad de **recarga/actualización automática** (web scraping o búsqueda en web) para que la herramienta viva "2017, 18, 19…". Ver [[08 Ingesta de Datos]] y [[14 Requerimientos del Kick-off (RF-11+)|RF-16]].

## 🔗 LinkedIn (exploratorio)
El analista comercial quiere encontrar contactos (gerente de sostenibilidad/financiero) vía sincronización con LinkedIn. Ver [[14 Requerimientos del Kick-off (RF-11+)|RF-17]].

## 📅 Canales y agenda
- Web y/o app externa (WhatsApp/Telegram).
- Agenda de citas: sincronizar con `consultas@igualab.org` (estilo Google Meet con invitados preestablecidos). Ver [[04 Requerimientos Funcionales#RF-10 — Chatbot de Citas Fase 2|RF-10]].

## 🏆 Reconocimientos (requisito estratégico)
Quieren postular a **Premio Kunan** y **Democracia Digital** (Perú). El diseño debe responder a sus criterios de evaluación desde el inicio. Oscar compartirá las bases. Ver [[14 Requerimientos del Kick-off (RF-11+)|RF-18]].

## 📌 Compromisos de la reunión
- **Próxima reunión: viernes 28 a las 10:00** → presentar mockup de requerimientos + solución.
- Grupo de coordinación (Oscar + analistas + equipo dev), reuniones semanales.

## 🔗 Relacionado
- [[14 Requerimientos del Kick-off (RF-11+)]] · [[01 Contexto del Proyecto]] · [[08 Ingesta de Datos]] · [[12 Análisis y Recomendaciones]] · [[10 Pendientes y Supuestos]]
