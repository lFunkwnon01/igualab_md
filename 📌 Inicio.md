# 📌 Igualab — Vault de Proyecto

> **Vault de planificación del proyecto Igualab** — *Plataforma de analítica de sostenibilidad (RAG)*
> Estado: 🟢 **Análisis en cierre** — acta 4 realizada (08-09, 10:55–11:15): servidor confirmado (fase 1 **sin producción**), GAP/backlog revisados, **RBAC definido: 2 roles / 3 personas (sin "Usuario")**, análisis en cierre (**CU + BD/diccionario, ~1–2 semanas**) · Sectores: **Minería, Energía y Petróleo**
> Fuentes oficiales: `Plan de proyecto.pdf` (v1.1, **aprobado por el cliente**) · **[[21 Actas de Reunión y Acuerdos|Actas CS3081-001/002/003/004]]** (acta 4 en borrador) · `Análisis y Diseño.pdf` (v1.1, 08-09 → [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]])
> 🗄️ Archivados (ya no definen alcance): `Onepager Igualab.pdf` · `Requerimientos-Igualab.pdf`
> Cliente / Product Owner: Oscar Baldeón — Fundador (oscarbaldeon@igualab.org)
> Jefe de Proyecto (PM): **Fabricio Godofredo Ladera La Torre** *(acta 4)* · Frontend: Juan Renato Flores Pascual

---

## 🧭 Mapa del Vault (MOC)

Este vault organiza el análisis y la planificación del proyecto. Sigue el orden numerado para leerlo de forma progresiva.

### 1. Fundamentos
- [[01 Contexto del Proyecto]] — qué es Igualab, el problema y los dos alcances detectados
- [[02 Glosario]] — definición fija de términos (memorias, métricas, bolsa, IA)
- [[03 Roles y Control de Accesos]] — RBAC de 2 roles (acta 4, REQ-10) y matriz de permisos

### 2. Requerimientos
- [[04 Requerimientos Funcionales]] — RF-01 … RF-10
- [[05 Requerimientos No Funcionales]] — RNF-01 … RNF-04

### 3. Solución técnica
- [[06 Arquitectura (AWS)]] — componentes y stack propuesto
- [[15 Arquitectura de Solución]] — visión de solución, componentes y base de datos (relacional vs no relacional según presupuesto)
- [[16 Diagramas de Secuencia]] — flujos en Mermaid (ingesta, RAG, reporte PDF, rol público)
- [[17 Diagrama de Casos de Uso]] — actores y casos de uso (Mermaid) + mapeo a RF
- [[07 Flujos por Rol]] — caminos de Superadmin y Administrador (2 roles, acta 4)
- [[08 Ingesta de Datos]] — pipeline S3 → Bedrock → OpenSearch → Aurora/DynamoDB

### 4. Planificación
- [[09 Planificación y Roadmap]] — fases, MVP, hitos y épicas (sincronizado con el Plan aprobado + actas)
- [[21 Actas de Reunión y Acuerdos]] — actas CS3081-001…004: decisiones, acuerdos y estados
- [[10 Pendientes y Supuestos]] — decisiones abiertas, riesgos oficiales y supuestos
- [[23 Guía de Generación de Actas]] — plantilla LaTeX + workflow de actas CS3081 (REQ, estilo, envío 24h)
- [[11 Stakeholders y Contactos]] — cliente, equipo SCRUM y equipo académico
- [[12 Análisis y Recomendaciones]] — reconciliación de documentos + **sección post-actas**
- [[13 Visión del CEO y Caso de Uso (Kick-off)]] — análisis del video kick-off (histórico)
- [[14 Requerimientos del Kick-off (RF-11+)]] — estados post-actas: vigentes, eliminados y sin prioridad

### 5. Diseño y prototipo
- [[17 Diagrama de Casos de Uso]] ya listado arriba; además:
- [[18 Diagramas de Procesos (Lógica de Negocio)]] — 14 procesos de negocio sin stack (accesos, ingesta, brechas GRI, sanciones, IA, prospección E2E, público, auditoría, ciclo anual, chatbot)
- [[19 BPMN — Modelado de Procesos (Estándar de Industria)]] — modelo BPMN 2.0 (estándar OMG) del proceso central + visor HTML en `00-Documentación/bpmn/`
- [[20 Prompt Mockup MVP]] — prompts Stitch → AI Studio (CU001–CU013) y su estado
- [[Diagramas de Procesos]] — 10 flujos Mermaid **técnicos** (RBAC, ingesta, motor RAG, GRI, sanciones, reportes, auditoría, fases, AWS)
- `diseno/stitch_plataforma_igualab_sostenibilidad_e_inteligencia/` — 14 pantallas generadas (CU001–CU013 + dashboard) con `code.html` + `screen.png`
- `frontend/` — mockup navegable (HTML + JS por vistas, desplegado en Vercel)

### 6. Recursos
- [[Recursos y Adjuntos]] — PDFs oficiales, actas, archivados, media, transcripciones y rutas
- `03-Transcripciones/` — `transcript.txt` (kick-off) · `2026-09-02.md` (⚠ pendiente de contenido) · `transcribe.py`
- `00-Documentación/Propuesta_Tecnica_Chatbot_Corporativo (1).md` — propuesta alternativa (Supabase/pgvector) para el chatbot corporativo

---

## 🗂️ Resumen ejecutivo (post-actas)

**Producto vigente:** Portal RAG de consulta sobre **la base de documentos del cliente** (sus propios reportes; sin API de Bolsa — acta 1), acotado a los sectores **Minería, Energía y Petróleo** (acta 3). La IA responde **solo** con esa base y **cita la fuente**; ante ausencia, busca o indica que no se encontró. **3 usuarios / 2 roles**: Oscar Baldeón = **Superadmin** + **2 Administradores**; rol "Usuario (lectura)" **eliminado** (acta 4, REQ-10); **el Superadmin ingesta** los documentos. Costo mínimo de tokens/servidor; **fase 1 opera íntegramente en el entorno de desarrollo de la universidad, sin despliegue a producción** (acta 4, REQ-11). **2ª fase:** usuarios **"Cliente" con `tenant_id`** + **pasarela de pagos** (acta 4, REQ-12) — **sujeta al tiempo del equipo y al presupuesto del cliente para salir a producción**; todo lo del plan corresponde solo a la fase 1. **LinkedIn eliminado** del alcance. Ver [[12 Análisis y Recomendaciones]] (sección post-actas).

---

## 🗂️ Resumen ejecutivo

Igualab necesita una **plataforma de inteligencia de sostenibilidad y prospección** con control de accesos por roles, un asistente de IA (RAG + métricas), generación de reportes PDF, dashboards de la Bolsa de Valores y auditoría. El onboarding del cliente, sin embargo, describe inicialmente un **chatbot inclusivo público** para agendar citas (accesible para personas con discapacidad). 

**Conclusión del análisis:** ambos documentos describen alcances distintos que conviven. El chatbot inclusivo es el **RF-10 / Fase 2** de los requerimientos y el MVP se centra en la plataforma interna. Ver [[12 Análisis y Recomendaciones]].

**Nuevo (post kick-off, transcrito):** el CEO confirma el **pivot a consultoría** (modelo retribuido) centrado en **prospección comercial**. El agente RAG unifica **reportes de sostenibilidad (estándar GRI)** y **memorias anuales de la Bolsa de Valores de Lima** (estas SÍ son la fuente real y contienen sanciones) para detectar **brechas GRI y sanciones**, generar reportes PDF y acercarse a empresas como aliado estratégico. Hay además un **rol público** de solo lectura, soporte **multilingüe** (ES/lenguas originarias/EN), necesidad de **autonomía por web scraping** y meta de postular a **Premio Kunan / Democracia Digital**. Ver [[13 Visión del CEO y Caso de Uso (Kick-off)]] y [[14 Requerimientos del Kick-off (RF-11+)]].

---

## ✅ Próximos pasos inmediatos (actas + cronograma)
1. **📝 Acta 4 (martes 08-09):** completar horas/asistencia del borrador (`01-Mockups-y-Propuestas/Acta_Reunion4_BORRADOR`), validar en la reunión y firmar.
2. **🟡 Entregar/firmar formalmente el acta 3** (falta firma del docente).
3. **🔧 vie 11-09: Presentación de arquitectura y prototipo con el cliente** (cronograma del Plan).
4. Ajustar documentación y mockups al modelo definido (acta 4: **2 roles / 3 personas**, sin "Usuario") y registrar la 2ª fase (Cliente + `tenant_id` + pasarela).

> Última actualización: 2026-09-08 · post-acta 4 (borrador)
