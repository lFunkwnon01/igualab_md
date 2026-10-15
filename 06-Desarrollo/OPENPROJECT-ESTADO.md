# 📋 Estado de OpenProject (Igualab) — estructura reconstruida

> Proyecto `igualab` (id 9) · https://openproject.ingsoftware.lat · **11 sprints (Versions) + 71 Work Packages**.
> Reconstruido desde cero (se eliminó la estructura anterior). Fechas ajustadas a **días laborables**.

## Jerarquía
```
Sprint (Version)
  └── Módulo (Feature "Módulo · X" / "Transversal · X")
        ├── User story → Analizar y especificar (analista)
        ├── Feature    → Implementar backend        (backend)
        ├── Feature    → Implementar frontend       (frontend)
        └── Task       → Probar …                   (tester)
```

## Sprints (Versions)
| Version | Nombre | Inicio → Fin | Foco |
|---|---|---|---|
| 14 | S0 · Inicial | 24/08 → 02/09 | Kickoff, plan, roles, metodología |
| 15 | S1 · Análisis | 03/09 → 11/09 | GAP, RN/RF/RNF, CU, backlog, prototipo |
| 16 | S2 · Diseño | 12/09 → 21/09 | Arquitectura, BD, A&D LaTeX, plan de pruebas, wiki |
| 17 | S3 · Auth + Usuarios | 16/09 → 25/09 | M1 Autenticación · M2 Usuarios |
| 18 | S4 · Catálogo + Ingesta | 26/09 → 02/10 | M3 Catálogo · M4 Ingesta |
| 19 | S5 · Análisis GRI | 03/10 → 09/10 | M5 Análisis y Validación GRI |
| 20 | S6 · Asistente RAG | 10/10 → 16/10 | M6 Asistente IA (RAG) |
| 21 | S7 · Reportes | 17/10 → 23/10 | M7 Reportes de prospección |
| 22 | S8 · Integración | 24/10 → 30/10 | Integración E2E |
| 23 | S9 · Auditoría + Calidad | 31/10 → 06/11 | M8 Auditoría · Calidad |
| 24 | S10 · Cierre | 07/11 → 20/11 | Despliegue, UAT, docs, capacitación, entrega |

## Equipo (responsables por rol)
| Rol | Persona | ID |
|---|---|---|
| PM / Scrum Master | Fabricio Ladera | 25 |
| Analista funcional | Luis Millones | 23 |
| Analista funcional | Carlos Ordinola | 26 |
| Backend | Juan Ferreyra | 24 |
| Frontend | Juan Flores | 29 |
| Tester | Alonso Benites | 27 |
| Tester | Mauricio Gonzalez | 28 |

## Módulos por sprint (resumen)
| Sprint | Módulos / Transversales | Nº WPs |
|---|---|---|
| S0 | Transversal · Inicial | 6 |
| S1 | Transversal · Análisis | 7 |
| S2 | Transversal · Diseño | 6 |
| S3 | M1 Autenticación · M2 Usuarios | 10 |
| S4 | M3 Catálogo · M4 Ingesta | 10 |
| S5 | M5 Análisis GRI | 5 |
| S6 | M6 Asistente RAG | 5 |
| S7 | M7 Reportes | 5 |
| S8 | Transversal · Integración | 3 |
| S9 | M8 Auditoría · Transversal · Calidad | 8 |
| S10 | Transversal · Cierre | 6 |

## Cómo verlo y reportar % (lo que pide el profesor)
1. **Vista "carpetas"**: módulo **Backlogs** (Product Backlog + cada Sprint con sus WPs) o **Work packages** agrupado por **Version** y luego por **Parent** (módulo).
2. **% de avance por sprint**: cada integrante actualiza **estado** (% Complete) de sus tareas; el **Roadmap/Burndown/Velocity** por Version se calcula solo.
3. **Gantt/Calendar**: ya funcionan porque cada WP tiene `Start`/`Due`.
