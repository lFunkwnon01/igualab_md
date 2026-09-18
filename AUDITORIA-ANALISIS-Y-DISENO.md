# 🔍 Auditoría — Análisis y Diseño (Igualab)

> **Fecha:** 2026-09-17 · **Alcance:** contrastar el *Análisis y Diseño* (A&D), el vault `FASE 1/`, el **Plan de Proyecto v1.2**, el **mock** (`https://igualab.vercel.app/`) y los repos **BCK-IGUALAB / FE-IGUALAB**.
> **Criterio de verdad:** Plan v1.2 (línea base) + A&D (documento vivo) + decisiones por acta (REQ).
> **Estado FASE 1:** 2 roles (Superadmin/Administrador) · sin Bolsa de Valores · sin LinkedIn · dashboards → fase 2 · ingesta solo `.md` (tablas de pipes) · RAG simple sin MCP · sectores Minería / Petróleo y Gas / Energía.

---

## 0. Cómo leer esta auditoría

Cada sección del índice oficial tiene: **Estado**, **Evidencia** y **Acción requerida**.
Estados: ✅ OK · 🟡 Parcial · 🔴 Vacío/Ausente · ⛔ Contenido ajeno/erróneo.

| # | Sección | Estado | Prioridad |
|---|---------|:------:|:---------:|
| 1 | Antecedentes | ✅ | — |
| 2 | Objetivo general | ✅ | — |
| 3 | Alcance del proyecto | 🟡 | P1 |
| 4 | Diseño funcional detallado | ✅ | — |
| 5 | Diagrama del proceso (+5.1/5.2) | 🔴 | P0 |
| 6 | Reglas de negocio (RN) | 🟡 | P1 |
| 7.1 | Actores | ✅ | — |
| 7.2 | Casos de uso y especificación | 🟡 | P0 |
| 7.3 | Diagrama de secuencia | 🔴 | P1 |
| 7.4 | Requerimientos funcionales (RF) | 🟡 | P0 |
| 7.5 | Requerimientos no funcionales (RNF) | 🟡 | P1 |
| 8 | Modelo de datos | 🔴 | P0 |
| 9 | Diccionario de datos | ⛔ | P0 |
| 10 | Volumen estimado | 🔴 | P1 |
| 11 | Diseño arquitectónico | 🔴 | P0 |
| 12 | Prototipo | 🟡 | P1 |
| 13 | Anexo | 🔴 | P2 |

**Resumen:** el A&D cubre bien antecedentes, objetivo, diseño funcional, RN, actores, RF y RNF. Está **incompleto** en proceso (5), secuencia (7.3), modelo de datos (8), volumen (10), arquitectura (11), anexo (13) y **trae contenido de otro proyecto** en el diccionario (9).

---

## 1. Antecedentes — ✅ OK
- Presenta Igualab (consultoría DEI/RSE/ASG desde 2016), la obligación de memorias de la BVL y reportes GRI, y el problema comercial reactivo (A&D pp. 5).
- Acción: ninguna.

## 2. Objetivo general — ✅ OK
- «Desarrollar una plataforma web de analítica de sostenibilidad… identificando brechas en indicadores ASG mediante un asistente de IA (RAG)…» (A&D p. 5).
- Acción: ninguna.

## 3. Alcance del proyecto — 🟡 PARCIAL
- **Evidencia:** define 2 perfiles (SuperAdmin/Administrador) pero **no explicita el fuera de alcance** (sin Bolsa, sin LinkedIn, dashboards a fase 2, solo `.md`). No aparece la palabra «FASE 1» (A&D pp. 5-6).
- **Discrepancia con el Plan:** el Plan no habla de fases 1/2, sino de 4 fases (Inicial, Análisis/Diseño, Desarrollo, Cierre) y **no declara exclusiones**. Un deck de avance muestra «portal público» fuera del Plan.
- **Acción:** agregar en el A&D un apartado «Fuera de alcance FASE 1» con las decisiones de acta 5 (Bolsa, LinkedIn, dashboards, portal público) y enlazar el Plan v1.2.

## 4. Diseño funcional detallado — ✅ OK
- Define **8 módulos funcionales** sobre 2 roles: Autenticación/Sesión, Gestión de Usuarios, Catálogo de Empresas, Ingesta, Análisis/Validación de Brechas GRI, Asistente RAG, Generación de Reportes, Auditoría (A&D pp. 6-7).
- **Nota:** aquí falta el criterio de **modularización (SOLID)** que pidió el curso; ver sección 11.
- Acción: enlazar módulos ↔ RF ↔ CU en la matriz de trazabilidad.

## 5. Diagrama del proceso — 🔴 CRÍTICO

> ⚠️ **Ojo con la numeración:** en el **índice oficial** la sección **5 = Diagrama del proceso** y **6 = Reglas de Negocio**. En el **cuerpo del PDF** el "Diagrama del proceso" está **mal numerado como 4** (duplica el 4 de Diseño Funcional), por lo que allí el **"5. REGLAS DE NEGOCIO"** (pág. 8) corresponde al **6 del índice**. Todo el cuerpo va **−1** respecto al índice.

| Índice oficial | Cuerpo del PDF | Contenido |
|---|---|---|
| 5. Diagrama del proceso (+5.1, 5.2) | `4.` / `4.1` / `4.2` / `4.3` | prácticamente vacío |
| 6. Reglas de negocio | `5.` | **completo** (RN-001…RN-039) |
| 7. Análisis de requerimientos | `6.` | completo |
| 8. Modelo de datos | `7.` | **vacío** |
| 9. Diccionario de datos | `8.` | **contenido ajeno (inmobiliario)** |

- **Evidencia:** el ToC (pág. 3) lista `5. DIAGRAMA DEL PROCESO`, `5.1` y **`5.3`** con el mismo título («Diagrama del proceso actual (AS IS)») y **se salta el 5.2**. En el cuerpo (pág. 7) aparece como `4. DIAGRAMA DEL PROCESO` / `4.1…`; la pág. 8 trae `4.2. Problemas identificados` **sin texto** y `4.3` con **solo el enlace a Miro**.
- **5.1 Integración entre los sistemas de la empresa — AUSENTE.**
- **5.2 Interoperación con sistemas externos — AUSENTE** (solo se nombran externos en Actores: LLM y BVL).
- **Acción (P0):** renumerar (Diagrama del proceso = 5) y completar con AS-IS, TO-BE (ya existe en `FASE 1/01-Analisis-y-Diseno/03-Diagramas-de-Procesos-TO-BE.md` + BPMN), «Problemas identificados» y las subsecciones **5.1 integración interna** y **5.2 interoperación externa**.

## 6. Reglas de negocio — 🟡 PARCIAL
- **Evidencia:** RN-001…RN-039, correlativas, sin duplicados (A&D pp. 9-12).
- **Hallazgos:** RN-026 termina incompleta («…se conserva permanentemente en el sistema **en .**»); RN-036 sin cuantificar («por un tiempo determinado»); **sectores inconsistentes** (módulo: «Minería, Petróleo y Energía» vs RN-019: «Minería, Petróleo y **Gas**, y Energía» vs RF-053: «minería, petrolera o energía»).
- **Pendientes ya reconocidos en el vault** (`04-Reglas-de-Negocio.md`): RN-017 y RN-019 **repiten sectores**; **falta RN del límite de 50 MB**; RN-034 (puntaje ESG) convive con estados 100 % manuales.
- **Acción:** unificar el literal de sectores; completar RN-026 y RN-036; agregar RN de 50 MB; revisar RN-034 vs asignación manual.

## 7. Análisis de requerimientos funcional

### 7.1 Actores — ✅ OK
- SuperAdmin, Administrador + externos (LLM, BVL) (A&D pp. 12-13). Coherente con 2 roles.

### 7.2 Casos de uso y especificación — 🟡 PARCIAL
- **Evidencia:** listado CU001-CU008 (A&D p. 13). Fichas de CU001, CU002, CU003, CU004, CU005, CU006, CU008.
- **Hallazgos P0:**
  - **CU007 listado pero sin ficha** («Visualización de Dashboards de Bolsa de Valores») → **fuera de alcance FASE 1**.
  - **CU005 y CU006 con texto truncado** y **precondiciones/flujos copiados de CU002** («Gestión de Usuarios», hablan de «crear cuenta»/«transferir rol SuperAdmin»).
  - **CU001 especificado dos veces**: la segunda ficha (pp. 31-32) **añade el rol «Usuario»**, fuera de alcance.
  - **Colisión de códigos:** el `FASE 1/` usa un **CU007 nuevo = reporte PDF**, que choca con «CU007 Bolsa» del A&D; el mock (`diseno/`) numera distinto (ingesta=CU005, auditoría=CU004, IA=CU006).
- **Acción:** ficha propia para CU007 (reporte PDF), eliminar CU007-Bolsa, rehacer CU005/CU006, depurar el rol «Usuario», y **unificar la numeración CU** A&D ↔ `FASE 1/07-08` ↔ mock.

### 7.3 Diagrama de secuencia — 🔴 AUSENTE
- No existe en el A&D (cero coincidencias de «secuencia»).
- **Acción:** agregar diagramas de secuencia por CU (al menos autenticación, ingesta, consulta RAG, reporte).

### 7.4 Requerimientos funcionales — 🟡 PARCIAL
- **Evidencia:** RF-001…RF-056, correlativos (A&D pp. 33-37).
- **Hallazgos:** **faltan RF del pipeline RAG** (chunking, embeddings, almacenamiento vectorial); consistencia de derivación a revisar (RF-040 deriva de RN-034/ESG).
- **Acción:** agregar los RF de pipeline (ver `FASE 1/05` nota de pendientes) y revisar derivaciones RF↔RN.

### 7.5 Requerimientos no funcionales — 🟡 PARCIAL
- **Evidencia:** RNF-001…RNF-036, correlativos (A&D pp. 37-40). Incluye RNF-014 (50 MB) y RNF-028 (embeddings/respuestas por API).
- **Hallazgos:** RNF-026 («conserve el rol declarado») **contradice RF-050** («rol vigente tras transferencia»); RNF-021/023 con trazabilidad cruzada errónea. En el **deck de avance** RNF-001 dice **3 roles** (contradice los 2 del Plan).
- **Acción:** corregir RNF-026; alinear la redacción de roles a 2; normalizar referencias.

## 8. Modelo de datos — 🔴 VACÍO
- El encabezado «7. MODELO DE DATOS» existe **sin contenido** (A&D p. 40): no hay ER ni entidades de Igualab.
- **Acción (P0):** insertar el **ERD real de Igualab (14 tablas)** desde `FASE 1/02-Arquitectura-de-Solucion/02-Base-de-Datos-Diagrama-y-Diseno.md`.

## 9. Diccionario de datos — ⛔ CONTENIDO AJENO
- **Evidencia:** tablas **proyecto, torre, piso, activo, hito, hito_piso** con lenguaje «proyectos **inmobiliarios**», «certificación EDGE/LEED», «recorrido virtual», «departamentos, cocheras, depósitos» (A&D pp. 40-44).
- **No corresponde a Igualab** (es de un proyecto inmobiliario). Además «Llosa» no aparece literal, pero el contenido es inmobiliario.
- **Acción (P0):** reemplazar por el **diccionario de las 14 tablas** de `FASE 1/02-Arquitectura-de-Solucion/03-Diccionario-de-Datos.md`. **Nota:** ese diccionario interno ya está bien, salvo `estado_sugerido` con 4 estados (incl. `CRITICO`) que debe quedar en **3 estados** y sin inferencia.

## 10. Volumen estimado — 🔴 AUSENTE
- Cero menciones de «volumen» en el A&D.
- **Acción:** definir nº de empresas/emisores, documentos/año, tamaño máximo (50 MB), total de documentos FASE 1 y frecuencia de ingesta.

## 11. Diseño arquitectónico — 🔴 AUSENTE
- No hay sección; solo «arquitectura cliente-servidor» (A&D p. 5). Sin capas, stack ni despliegue.
- **Requisito del curso:** modularizar siguiendo **SOLID**. No aparece SOLID ni el detalle de módulos/servicios.
- **Acción (P0):** insertar la arquitectura de `FASE 1/02-Arquitectura-de-Solucion/01-Arquitectura-de-Solucion-FASE-1.md` + `03-Stack` + `04-Frontend`, y **mapear módulos a servicios** justificando SOLID (SRP por servicio, inyección de dependencias, interfaces).

## 12. Prototipo — 🟡 PARCIAL
- Solo marcadores de imagen en fichas de CU001/CU002 y pantallas sueltas (A&D pp. 16-31). Sin descripción de todos los módulos.
- **Acción:** enlazar el **mock vigente** (`https://igualab.vercel.app/`) y el repo frontend; cubrir todos los CU en alcance.

## 13. Anexo — 🔴 AUSENTE
- No existe (el **Glosario** de la p. 4 está **vacío**).
- **Acción:** agregar anexos: glosario, matriz de trazabilidad RN/RF/RNF ↔ CU ↔ pruebas, y evidencias de actas.

---

## Hallazgos transversales

### A. Numeración de secciones (A&D)
Dos secciones «4.» y, desde ahí, el cuerpo va **desfasado −1** respecto al índice (cuerpo: 5 Reglas, 6 Análisis, 7 Modelo, 8 Diccionario; índice: 6,7,8,9). El índice es el correcto; corregir en el cuerpo.

### B. Trazabilidad con el Plan
- El Plan tiene **4 fases**; el vault habla de «FASE 1/2». Homologar terminología (fase de desarrollo vs alcance liberable).
- El Plan pide **procesamiento asincrónico** de ingesta; el vault decidió **ingesta síncrona** (← verificar decisión por acta y documentar la desviación).
- El Plan no menciona: `Jenkins`, `SonarQube`, ramas, `SOLID`, volumen, 50 MB, ingesta `.md`, «RAG sin MCP». Son decisiones internas a documentar.

### C. Repos y mock
- **Repos:** `ING-IGUALAB/BCK-IGUALAB` (FastAPI: `auth`, `usuarios`, `audit`, `services`) y `ING-IGUALAB/FE-IGUALAB` (React+Vite+Tailwind: `Login, Inicio/Asistente, Ingesta, Reportes, Descargas, Auditoria, Usuarios, MiCuenta, Restablecer`). Ramas `development/qa/uat/main` presentes; `main` solo README (correcto).
- `main`≡`uat` en ambos repos (release actual); `development` por delante. **Sin evidencia de PRs/CI** (revisar).
- **Frontend vs alcance:** no aparecen pantallas de Bolsa/LinkedIn/dashboards (bien). Verificar que el mock desplegado corresponda al último `development`.
- **FASE 2 en el mock/vault:** sobran pantallas de `diseno/` (`b_squeda_linkedin_cu010`, `dashboards_bolsa_cu008`, `chatbot_inclusivo_cu013_fase_2`, `portal_p_blico_cu012`, `panel_principal_dashboard`).

### D. Documentos internos con contenido obsoleto/erróneo
Contradicen la decisión vigente (detectar y corregir):
- `04-DISEÑO-FUNCIONAL-DETALLADO.md`: **Dashboards BVL** (líneas 28, 482), **CQRS** (415), **Event Sourcing** (425), CU mal numerados (122, 166, 229), «procesamiento asíncrono» (491), RNF mal citado (463).
- `01-Arquitectura-de-Solucion-FASE-1.md`: **≤15 MB** (12, 60, 72), `estado_sugerido` (62), embeddings por API «universidad» revierte la decisión (51-52, 112).
- `02-Base-de-Datos…`: `estado_sugerido` (109), RS-13 con motor de estado (210), «12 entidades» vs 14 (1), RN-016 por sector (debe RN-019).
- `03-Diccionario…`: `estado_sugerido` con `CRITICO` (4 estados).
- `05-Analisis-Por-que…`: `upload_max_mb=15` (48).
- `03-Stack`: **function calling** (18) contradice «sin function calling» (28, 34); 15 MB (40, 62).
- `01-Antecedentes-y-Objetivos.md`: «función de llamadas de herramientas» (29).
- `07/08`: CU004 «15 MB» vs 50; CU005 actor LLM «function calling»; numeración RF/RN desfasada.
- `11 Stakeholders`: rango «RN-001…RN-009» obsoleto (48).

> ✅ **Corregido 2026-09-17 (pase de limpieza):** se aplicaron en el vault las correcciones de contenido: `15 MB → 50 MB`, estados GRI a **3** (sin «Crítico»), eliminación de `estado_sugerido`, RAG **sin function calling**, **14 tablas**, sectores con **RN-019**, y remapeo de referencias RN/RF/RNF obsoletas (incl. `embedding local`→embeddings por API). Queda pendiente **unificar la numeración CU** (A&D ↔ FASE 1 ↔ mock), que depende del A&D.

### E. Búsquedas de contenido ajeno (A&D)
`Llosa`: no aparece · Contenido **inmobiliario**: SÍ (pp. 40-44) · `CU007`: SÍ (p. 13) · rol `Usuario`: SÍ (p. 31) · `LinkedIn`: no · `MCP`/`chunking`/`pgvector`: no · `SOLID`: no · `50 MB`: SÍ (p. 38).

---

## Backlog de correcciones priorizado

| P | Acción | Sección | Owner sugerido |
|---|--------|---------|----------------|
| P0 | Reemplazar diccionario inmobiliario por el de 14 tablas de Igualab | 9 | Analistas |
| P0 | Insertar modelo de datos (ERD) real | 8 | Analistas |
| P0 | Rehacer sección Diagrama del proceso + 5.1/5.2 | 5 | Analistas + PM |
| P0 | Fichas CU005/CU006/CU007 y quitar rol «Usuario» | 7.2 | Analistas |
| P0 | Insertar Diseño arquitectónico + mapeo modular SOLID | 11 | Arquitectos |
| P0 | Añadir RF del pipeline RAG (chunking/embeddings/vector) | 7.4 | Analistas |
| P1 | Fuera de alcance explícito + homologar fases con el Plan | 3 | PM |
| P1 | Diagramas de secuencia por CU | 7.3 | Arquitectos |
| P1 | Corregir RN-026/RN-036, unificar sectores, +RN 50 MB | 6 | Analistas |
| P1 | Corregir RNF-026 vs RF-050 y referencias cruzadas | 7.5 | Analistas |
| P1 | Volumen estimado | 10 | PM + Arquitectos |
| P1 | Unificar numeración CU A&D ↔ FASE 1 ↔ mock | 7.2 | Analistas |
| P1 | Limpiar docs internos obsoletos (15 MB, estado_sugerido, function calling) | Vault | Analistas |
| P2 | Prototipo completo + anexos (glosario, matriz trazabilidad) | 12/13 | Equipo |

---

## Fuentes cotejadas
- `01-Mockups-y-Propuestas/Análisis y Diseño - Igualab.pdf` (44 pp.).
- `01-Mockups-y-Propuestas/Igualab - Plan de proyecto.docx (1).pdf` (v1.2) y `igualab.avanze_AYD_cierre_plan.pdf`.
- `FASE 1/` (01-Análisis, 02-Arquitectura, 03-Stack, 04-Frontend, 05-API).
- `04-DISEÑO-FUNCIONAL-DETALLADO.md`, `00-Documentación/`.
- Mock: <https://igualab.vercel.app/> · Repos: `ING-IGUALAB/BCK-IGUALAB`, `ING-IGUALAB/FE-IGUALAB`.
