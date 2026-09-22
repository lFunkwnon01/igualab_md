# 📌 Igualab — Vault de Proyecto

> **Plataforma de analítica de sostenibilidad (RAG)** — Igualab / cliente Oscar Baldeón (PO).
> Estado: 🟢 **A&D reescrito en LaTeX y auditado** · **Plan v1.2 aprobado** (acta 5, 11/09) · **RN-001…RN-045 · RF-001…RF-030 · RNF-001…RNF-030** · secciones **1–13** completas.
> Alcance: **3 usuarios / 2 roles** (1 SuperAdmin + 2 Administradores) · sin Bolsa de Valores, sin LinkedIn, dashboards → fase 2, ingesta solo **`.md`** con tablas de pipes · **RAG simple, sin MCP** · sectores: **Minería, Petróleo y Gas, Energía**.
> Mock de referencia (fuente viva del diseño): <https://igualab.vercel.app/>

## ⚖️ Fuentes de verdad

1. `01-Mockups-y-Propuestas/Igualab - Plan de proyecto.docx (1).pdf` — **Plan de Proyecto v1.2** (línea base aprobada).
2. **`01-Mockups-y-Propuestas/analisis-diseno-latex/main.pdf`** — **A&D vigente** (nuevo). Fuente editable en `analisis-diseno-latex/` (`main.tex` + `rn.tex`/`rf.tex`/`rnf.tex`). Compila con `tectonic -X compile main.tex`.
3. `FASE 1/` — desarrollo del análisis, arquitectura, BD, stack, frontend y API (RN/RF/RNF replicados en `01-Analisis-y-Diseno/`).
4. `01-Mockups-y-Propuestas/Análisis y Diseño - Igualab.pdf` — A&D **original** (referencia histórica).

> Toda desviación de alcance se registra por **acta (REQ)**; el Plan firmado no se re-versiona. Ver [[21 Actas de Reunión y Acuerdos]].

> 📄 Auditoría del A&D (LaTeX): `MEJORAS-A&D/AUDITORIA-RN-RF-RNF-2026-09-21.md` · 🏗️ Infraestructura y flujo Git: [[INFRAESTRUCTURA-Y-FLUJO-GIT]].

---

## 🧭 Mapa del Vault

### 0 · A&D vigente (LaTeX) — `01-Mockups-y-Propuestas/analisis-diseno-latex/`
- `main.tex` (+ `portada.tex`, `frontmatter.tex`, `glosario.tex`, `s01-06.tex`, `s07.tex`, `s08-13.tex`) — documento completo.
- `rn.tex` (45 RN) · `rf.tex` (28 RF) · `rnf.tex` (33 RNF) — tablas de requisitos.
- `img/` — figuras extraídas del A&D original.
- `main.pdf` — **PDF compilado** · `comparativa-original-vs-latex.pdf` — comparación lado a lado.

### 1 · Análisis y Diseño — `FASE 1/01-Analisis-y-Diseno/`
- `01-Antecedentes-y-Objetivos.md` — qué es Igualab, objetivo general y representación de **FASE 1 (v1)**.
- `02-Antecedentes-del-Analisis-GRI.md` — memorias anuales, reportes GRI, qué es una **brecha** y cómo se califica.
- `03-Diagramas-de-Procesos-TO-BE.md` — procesos to-be en Mermaid (+ BPMN en `diagramas-BPMN/`).
- `04-Reglas-de-Negocio.md` — **RN-001…RN-045** (plantilla `SI…ENTONCES…SE APLICA A…SE BASA EN…EXCEPCIÓN`).
- `05-Requerimientos-Funcionales.md` — **RF-001…RF-030** (atómicos + Analista).
- `06-Requerimientos-No-Funcionales.md` — **RNF-001…RNF-030** (categorizados).
- `07-Casos-de-Uso-Diagrama.md` · `08-Especificacion-Casos-de-Uso.md` — **CU001…CU007** + especificaciones.
- `09-Revision-A&D-v2-vs-FASE1.md` · `10-Contexto-Embeddings-y-Auditoria-AyD.md` — bitácora histórica (el doc 10, Parte 1, fija la decisión de **embeddings/LLM por API**).

### 2 · Arquitectura de Solución — `FASE 1/02-Arquitectura-de-Solucion/`
- `01-Arquitectura-de-Solucion-FASE-1.md` — **arquitectura por capas (7 capas, `arquitecturasolution.jpeg`)**, RAG simple **sin MCP**.
- `02-Base-de-Datos-Diagrama-y-Diseno.md` — ERD (**PostgreSQL + pgvector**) y reglas semánticas.
- `03-Diccionario-de-Datos.md` — diccionario (**13 tablas**).
- `04-Comparacion-RAG-simple-vs-MCP.md` · `05-Analisis-Por-que-Existen-las-Tablas.md`.

### 3 · Stack y demás capas
- `FASE 1/03-Stack-Tecnologico/01-Stack-Tecnologico.md` — stack + LLM gratuito y variables de entorno.
- `FASE 1/04-Frontend-React/01-Arquitectura-Frontend-React.md` — React 18 + Vite, mapeo 1:1 con el mock.
- `FASE 1/05-api-endpoints-mock/igualab-fase1-mock.openapi.yaml` — OpenAPI mock.

### 4 · Gobernanza
- [[21 Actas de Reunión y Acuerdos]] — actas **CS3081-001…006** (archivos `CS3081-00N-2026_Acta_ReunionN.pdf`).
- [[23 Guía de Generación de Actas]] — plantilla LaTeX + nomenclatura `CS3081-00N-2026_Acta_ReunionN`.
- [[11 Stakeholders y Contactos]] — cliente, equipo SCRUM y equipo académico.

### 5 · Diseño, prototipo y recursos
- `diseno/stitch_.../` — mockups de **Stitch (diseño histórico, numeración CU antigua)**. La **fuente viva del diseño es el mock desplegado** <https://igualab.vercel.app/> (SuperAdmin: Usuarios, Ingesta, Auditoría · Administrador: Asistente IA, Reportes, Descargas; **sin Configuración**). Pantallas fuera de alcance en `99-Archivo/`.
- Mockup navegable **desplegado**: <https://igualab.vercel.app/>.
- `06-Desarrollo/FE-IGUALAB` y `06-Desarrollo/BCK-IGUALAB` — repos de desarrollo (submódulos).
- `01-Mockups-y-Propuestas/` — Plan, A&D, actas firmadas y organigrama.
- `02-Recursos-Media/` · `03-Transcripciones/` · `00-Documentación/bpmn/`.

---

## 🗂️ Resumen ejecutivo

Igualab necesita una **plataforma de analítica de sostenibilidad con IA (RAG)** para su área comercial: procesa **memorias anuales y reportes de sostenibilidad GRI** (que el cliente entrega convertidos a **`.md`**), identifica **brechas GRI y sanciones**, y genera **reportes de prospección en PDF** para acercarse a las empresas como aliado estratégico. La IA responde **solo con el corpus ingestado y cita la fuente** (si no hay evidencia, lo declara explícitamente).

**Roles (2 / 3 personas):** 🟡 **SuperAdmin** (Oscar) — gestión de usuarios, **ingesta** de documentos y auditoría; no usa la IA. 🟢 **Administrador** (×2) — consulta el asistente, revisa/valida estados GRI y genera reportes.

**La FASE 1 es la v1 del software.** La **FASE 2 (v2)** —usuarios "Cliente" con `tenant_id`, pasarela de pagos y dashboards— está registrada pero fuera del alcance (actas 4/5).

---

## ✅ Estado y próximos pasos

1. **Plan v1.2 aprobado** (acta 5, 11/09) — línea base vigente.
2. **A&D reescrito en LaTeX (21/09):** 13 secciones completas, con **45 RN** (plantilla del profesor), **28 RF** atómicos y **33 RNF** categorizados; modelo y diccionario (**13 tablas**, incl. `sanciones`).
3. **Trazabilidad:** RN/RF/RNF citan actas cuando aplica; la cita `CS3081-00N-2026` mapea 1 a 1 al archivo del acta.
4. **Numeración CU unificada** a la del A&D (CU001 auth · CU002 usuarios · CU003 ingesta · CU004 IA · CU005 brechas · CU006 reportes · CU007 auditoría), con dependencias reales.
5. **Limpieza del vault:** archivos ajenos/duplicados fuera; media pesada fuera de Git; pantallas/BPMN fuera de alcance archivados; auditorías históricas.
6. **Desarrollo:** `BCK-IGUALAB` + `FE-IGUALAB` por `development → qa → uat → main` ([[INFRAESTRUCTURA-Y-FLUJO-GIT]]).

> Última actualización del vault: **2026-09-21**.
