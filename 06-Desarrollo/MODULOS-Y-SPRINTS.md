# 🧩 Módulos y 🏃 Sprints — Igualab

> Vista consolidada del proyecto en OpenProject: los **8 módulos funcionales** y los **11 sprints**.

---

## 1. Tabla de MÓDULOS (8)

| # | Módulo | CU | Requisitos (RF) | Sprint | Rango | Líder | Tareas |
|---|---|---|---|---|---|---|---:|
| **M1** | Autenticación y Gestión de Sesión | CU001 | RF-001…005 | S3 · Auth + Usuarios | 2026-09-16 → 2026-09-25 | Fabricio Ladera | 4 |
| **M2** | Gestión de Usuarios | CU002 | RF-006…009 | S3 · Auth + Usuarios | 2026-09-16 → 2026-09-25 | Fabricio Ladera | 4 |
| **M3** | Catálogo de Empresas | CU008 | RF-010, 011 | S4 · Catálogo + Ingesta | 2026-09-28 → 2026-10-02 | Fabricio Ladera | 4 |
| **M4** | Ingesta de Documentos | CU003 | RF-012…017, 022 | S4 · Catálogo + Ingesta | 2026-09-28 → 2026-10-02 | Fabricio Ladera | 4 |
| **M5** | Análisis y Validación de Brechas GRI | CU005 | RF-018…021, 028 | S5 · Análisis GRI | 2026-10-05 → 2026-10-09 | Fabricio Ladera | 4 |
| **M6** | Asistente de IA (RAG) | CU004 | RF-023, 024 | S6 · Asistente RAG | 2026-10-12 → 2026-10-16 | Fabricio Ladera | 4 |
| **M7** | Generación de Reportes de Prospección | CU006 | RF-025…027 | S7 · Reportes | 2026-10-19 → 2026-10-23 | Fabricio Ladera | 4 |
| **M8** | Auditoría Funcional | CU007 | RF-029, 030 | S9 · Auditoría + Calidad | 2026-11-02 → 2026-11-05 | Fabricio Ladera | 4 |

> Cada módulo se implementa como **Feature contenedor** con 4 tareas hijas: *Analizar · Backend · Frontend · Probar*.

### 1.1 Transversales (no son módulos funcionales)

| Transversal | Sprint | Rango | Líder | Tareas |
|---|---|---|---|---:|
| Inicial | S0 · Inicial | 2026-08-24 → 2026-09-02 | Fabricio Ladera | 5 |
| Análisis | S1 · Análisis | 2026-09-03 → 2026-09-11 | Luis Millones | 6 |
| Diseño | S2 · Diseño | 2026-09-14 → 2026-09-21 | Juan Ferreyra | 5 |
| Integración | S8 · Integración | 2026-10-26 → 2026-10-30 | Juan Ferreyra | 2 |
| Calidad | S9 · Auditoría + Calidad | 2026-11-05 → 2026-11-06 | Mauricio Gonzalez | 2 |
| Cierre | S10 · Cierre | 2026-11-09 → 2026-11-20 | Fabricio Ladera | 5 |

---

## 2. Tabla de SPRINTS (11)

| Sprint | Rango | Días | Módulos / Transversales | Tareas | Foco |
|---|---|---:|---|---:|---|
| **S0 · Inicial** | 2026-08-24 → 2026-09-02 | 10 | Inicial | 5 | Kickoff, plan, roles, metodología |
| **S1 · Análisis** | 2026-09-03 → 2026-09-11 | 9 | Análisis | 6 | GAP, RN/RF/RNF, CU, backlog, prototipo |
| **S2 · Diseño** | 2026-09-12 → 2026-09-21 | 10 | Diseño | 5 | Arquitectura, BD, A&D LaTeX, plan de pruebas, wiki |
| **S3 · Auth + Usuarios** | 2026-09-16 → 2026-09-25 | 10 | Autenticación y Gestión de Sesión · Gestión de Usuarios | 8 | Login/JWT/RBAC + gestión de usuarios |
| **S4 · Catálogo + Ingesta** | 2026-09-26 → 2026-10-02 | 7 | Catálogo de Empresas · Ingesta de Documentos | 8 | Catálogo de empresas + ingesta .md |
| **S5 · Análisis GRI** | 2026-10-03 → 2026-10-09 | 7 | Análisis y Validación de Brechas GRI | 4 | Detección de brechas, sanciones, ESG |
| **S6 · Asistente RAG** | 2026-10-10 → 2026-10-16 | 7 | Asistente de IA (RAG) | 4 | Consultas con citas |
| **S7 · Reportes** | 2026-10-17 → 2026-10-23 | 7 | Generación de Reportes de Prospección | 4 | PDF de prospección + snapshot |
| **S8 · Integración** | 2026-10-24 → 2026-10-30 | 7 | Integración | 2 | Integración E2E FE↔API↔BD |
| **S9 · Auditoría + Calidad** | 2026-10-31 → 2026-11-06 | 7 | Auditoría Funcional · Calidad | 6 | Auditoría + pruebas de calidad |
| **S10 · Cierre** | 2026-11-07 → 2026-11-20 | 14 | Cierre | 5 | Despliegue, UAT, docs, capacitación |

---

## 3. Relación Módulo ↔ Sprint

| Sprint | Módulos | Tipo |
|---|---|---|
| **S0 · Inicial** | Inicial | Transversal |
| **S1 · Análisis** | Análisis | Transversal |
| **S2 · Diseño** | Diseño | Transversal |
| **S3 · Auth + Usuarios** | Autenticación y Gestión de Sesión · Gestión de Usuarios | Módulo · Módulo |
| **S4 · Catálogo + Ingesta** | Catálogo de Empresas · Ingesta de Documentos | Módulo · Módulo |
| **S5 · Análisis GRI** | Análisis y Validación de Brechas GRI | Módulo |
| **S6 · Asistente RAG** | Asistente de IA (RAG) | Módulo |
| **S7 · Reportes** | Generación de Reportes de Prospección | Módulo |
| **S8 · Integración** | Integración | Transversal |
| **S9 · Auditoría + Calidad** | Auditoría Funcional · Calidad | Módulo · Transversal |
| **S10 · Cierre** | Cierre | Transversal |

> **Total:** 8 módulos funcionales + 6 transversales = **14 contenedores** · **57 tareas** · **71 work packages** · **11 sprints**.
