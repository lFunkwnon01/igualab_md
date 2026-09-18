# 📌 Igualab — Vault de Proyecto

> **Plataforma de analítica de sostenibilidad (RAG)** — Igualab / cliente Oscar Baldeón (PO).
> Estado: 🟡 **FASE 1 alineada; A&D en auditoría**. **Plan v1.2 aprobado** (acta 5, 11/09) · **A&D** (RN 001–039 · RF 001–056 · RNF 001–036) con hallazgos abiertos → ver [[AUDITORIA-ANALISIS-Y-DISENO]].
> Alcance: **3 usuarios / 2 roles** (1 Superadmin + 2 Administradores) · flujo **sin Bolsa de Valores**, **sin LinkedIn**, **dashboards → fase 2**, **ingesta solo `.md` con tablas de pipes** · **RAG simple, sin MCP** · sectores: **Minería, Petróleo y Gas, Energía**.
> Mock fidelizado: <https://igualab.vercel.app/>

## ⚖️ Fuentes de verdad (solo estas)

1. `01-Mockups-y-Propuestas/Igualab - Plan de proyecto.docx (1).pdf` — **Plan de Proyecto v1.2** (línea base aprobada).
2. `01-Mockups-y-Propuestas/Análisis y Diseño - Igualab.pdf` — **A&D** (documento vivo; numeración RN/RF/RNF). ⚠️ Pendiente de corrección: secciones 5, 7.3, 8, 10, 11 y 13; diccionario de datos ajeno (inmobiliario). Ver [[AUDITORIA-ANALISIS-Y-DISENO]].
3. `FASE 1/` — desarrollo del análisis, arquitectura, BD, stack, frontend y API, alineado 1:1 a las dos fuentes anteriores.

> Toda desviación de alcance se registra por **acta (REQ)**; el Plan firmado no se re-versiona. Ver [[21 Actas de Reunión y Acuerdos]].

> 📄 Auditoría vigente: [[AUDITORIA-ANALISIS-Y-DISENO]] · 🏗️ Infraestructura y flujo Git: [[INFRAESTRUCTURA-Y-FLUJO-GIT]].

---

## 🧭 Mapa del Vault

### 1 · Análisis y Diseño — `FASE 1/01-Analisis-y-Diseno/`
- `01-Antecedentes-y-Objetivos.md` — qué es Igualab, objetivo general y **alcance de fase 1**.
- `02-Antecedentes-del-Analisis-GRI.md` — memorias anuales, reportes GRI, qué es una **brecha** y cómo se califica.
- `03-Diagramas-de-Procesos-TO-BE.md` — procesos to-be en Mermaid (+ BPMN en `diagramas-BPMN/`).
- `04-Reglas-de-Negocio.md` — **RN-001…RN-039**.
- `05-Requerimientos-Funcionales.md` — **RF-001…RF-056**.
- `06-Requerimientos-No-Funcionales.md` — **RNF-001…RNF-036**.
- `07-Casos-de-Uso-Diagrama.md` · `08-Especificacion-Casos-de-Uso.md` — **CU001…CU009** + especificaciones.
- `09-Revision-A&D-v2-vs-FASE1.md` · `10-Contexto-Embeddings-y-Auditoria-AyD.md` — bitácora histórica de conciliación con el A&D (no es documentación vigente; el doc 10, Parte 1, sí fija la decisión de **embeddings/LLM por API**).

### 2 · Arquitectura de Solución — `FASE 1/02-Arquitectura-de-Solucion/`
- `01-Arquitectura-de-Solucion-FASE-1.md` — visión por módulos (**RAG simple, sin MCP**).
- `02-Base-de-Datos-Diagrama-y-Diseno.md` — ERD v2 (**PostgreSQL + pgvector**) y 21 reglas semánticas.
- `03-Diccionario-de-Datos.md` — diccionario (14 tablas).
- `04-Comparacion-RAG-simple-vs-MCP.md` · `05-Analisis-Por-que-Existen-las-Tablas.md`.

### 3 · Stack y demás capas
- `FASE 1/03-Stack-Tecnologico/01-Stack-Tecnologico.md` — stack decidido + LLM gratuito y variables de entorno.
- `FASE 1/04-Frontend-React/01-Arquitectura-Frontend-React.md` — React 18 + Vite, mapeo 1:1 con el mock.
- `FASE 1/05-api-endpoints-mock/igualab-fase1-mock.openapi.yaml` — OpenAPI mock (peticiones/respuestas simuladas).

### 4 · Gobernanza
- [[21 Actas de Reunión y Acuerdos]] — actas **CS3081-001…005**: decisiones, acuerdos y estados.
- [[23 Guía de Generación de Actas]] — plantilla LaTeX + workflow de actas.
- [[11 Stakeholders y Contactos]] — cliente, equipo SCRUM y equipo académico.

### 5 · Diseño, prototipo y recursos
- `diseno/stitch_.../` — 14 pantallas generadas (CU + dashboard) con `code.html` + `screen.png`.
- `frontend/` — mockup navegable (HTML + JS por vistas), desplegado en Vercel (submódulo `igualab-mock`).
- `06-Desarrollo/FE-IGUALAB` y `06-Desarrollo/BCK-IGUALAB` — repos de desarrollo (submódulos).
- `01-Mockups-y-Propuestas/` — Plan, A&D, actas firmadas y organigrama del equipo.
- `02-Recursos-Media/` — media, fotos y evidencias.
- `03-Transcripciones/` — transcript del kick-off + `transcribe.py`.
- `00-Documentación/bpmn/` — visor BPMN 2.0.

---

## 🗂️ Resumen ejecutivo

Igualab necesita una **plataforma de analítica de sostenibilidad con IA (RAG)** para su área comercial: procesa **memorias anuales y reportes de sostenibilidad GRI** (que el cliente ya entrega convertidos a **`.md`**), identifica **brechas GRI y sanciones**, y genera **reportes de prospección en PDF** para acercarse a las empresas como aliado estratégico. La IA responde **solo con el corpus ingestado y cita la fuente** (si no hay evidencia, lo declara explícitamente).

**Roles (2 / 3 personas):** 🟡 **Superadmin** (Oscar) — gestión de usuarios, **ingesta** de documentos, configuración y auditoría; no usa la IA. 🟢 **Administrador** (×2) — consulta el asistente, revisa/valida estados GRI y genera reportes.

**Fase 1 opera en el entorno de desarrollo universitario, sin producción.** La 2ª fase (usuarios "Cliente" con `tenant_id` + pasarela de pagos y dashboards) está registrada pero fuera del alcance.

---

## ✅ Estado y próximos pasos

1. **Plan v1.2 aprobado** (acta 5, 11/09) — línea base vigente.
2. **Análisis y diseño EN AUDITORÍA** — el `FASE 1/` está alineado, pero el **A&D** tiene secciones incompletas y contenido ajeno. Detalle y backlog en [[AUDITORIA-ANALISIS-Y-DISENO]].
3. **Pendientes P0 del A&D:** sección 5 (proceso + 5.1/5.2), 7.3 (secuencia), 8 (modelo de datos vacío), 9 (diccionario inmobiliario ajeno), 11 (diseño arquitectónico + SOLID), y fichas CU005/CU006/CU007 + rol "Usuario".
4. **Correcciones internas aplicadas (17/09):** límite `50 MB`, 3 estados GRI (sin «Crítico»), sin `estado_sugerido`, RAG sin `function calling`, 14 tablas, sectores `RN-019`. Queda unificar la numeración CU (A&D ↔ FASE 1 ↔ mock).
5. **Desarrollo:** `BCK-IGUALAB` + `FE-IGUALAB` por `development → qa → uat → main` ([[INFRAESTRUCTURA-Y-FLUJO-GIT]]), con la demo de integración del cronograma.

> Última actualización del vault: **2026-09-17**.
