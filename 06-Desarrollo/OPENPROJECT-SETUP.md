# ⚙️ Configuración de OpenProject — Igualab (Sprint → Módulo → Tarea)

> **No tengo acceso en vivo a tu OpenProject**, así que esta es la vía de **configuración por importación**. Con esto queda exactamente como pediste: **una carpeta por Sprint, dentro los Módulos, y dentro las Tareas.**

## Jerarquía (cómo se ve)
```
Sprint (Version)          ← la "carpeta"
  └── Módulo (Epic)       ← agrupador
        └── Tarea (Task)  ← con Due date, responsable y horas
```
En OpenProject: **Sprint = Version** · **Módulo = Epic** · **Tarea = Task** (con `Version` = su sprint y `Parent` = su módulo).

---

## Paso 1 — Crear los Sprints (Versions)
`Project settings → Versions → + Version` (o el módulo **Backlogs**):

| Version | Start date | End date |
|---|---|---|
| Sprint 0 | 24/08/2026 | 02/09/2026 |
| Sprint 1 | 03/09/2026 | 21/09/2026 |
| Sprint 2 | 16/09/2026 | 02/10/2026 |
| Sprint 3 | 03/10/2026 | 19/10/2026 |
| Sprint 4 | 20/10/2026 | 28/10/2026 |
| Sprint 5 | 29/10/2026 | 07/11/2026 |
| Sprint 6 | 08/11/2026 | 20/11/2026 |

> Estos rangos son **fechas límite**; el Gantt y el burndown se calculan solos.

## Paso 2 — Importar Work Packages
`Work packages → ⋮ → Import` y sube **`06-Desarrollo/openproject-import.csv`**.
Mapea las columnas:
`Type→Type` · `Subject→Subject` · `Parent→Parent` · `Version→Version` · `Assignee→Assignee` · `Start date→Start date` · `Due date→Due date` · `Estimated time→Estimated time` · `Priority→Priority` · `Description→Description`.

> **Nota:** en OpenProject el `Parent` se resuelve por **ID**, no por nombre. Si la importación no anida por nombre:
> 1. Importa primero solo las filas **Epic** (11 módulos) → quedan creadas.
> 2. Vuelve a importar las **Task** indicando el `Parent` con el **ID** del Epic (o arrástralas en `Backlogs`).

## Paso 3 — Cargar a los Sprints
En el módulo **Backlogs**, arrastra cada Tarea a su Sprint (Version). O cambia el campo `Version` en la tarea.

## Paso 4 — Tablero y seguimiento
- **Boards → + Board**: tipo *Action board* (New → In progress → In testing → Closed).
- **Versions**: crea los sprints (paso 1); el **Roadmap** los agrupa.
- **Gantt / Calendar**: aparecen al tener `Start`/`Due` (ya vienen en el CSV).
- **Burndown/Velocity**: se calculan con fechas + story points.

---

## Estructura resultante (por Sprint)
| Sprint | Rango | Módulos (Epics) | Tareas |
|---|---|---|---|
| Sprint 1 | 03/09–21/09 | Transversal · Análisis y Diseño | 9 |
| Sprint 2 | 16/09–02/10 | M1 Auth · M2 Usuarios · M3 Catálogo · M4 Ingesta | 13 |
| Sprint 3 | 03/10–19/10 | M5 GRI · M6 RAG · M7 Reportes | 9 |
| Sprint 4 | 20/10–28/10 | M7 (cierre) · Transversal · Integración | 2 |
| Sprint 5 | 29/10–07/11 | M8 Auditoría · Transversal · Calidad | 4 |
| Sprint 6 | 08/11–20/11 | Transversal · Cierre | 5 |

## Módulos (Epics) ↔ CU ↔ RF
| Epic | CU · RF | Sprint principal |
|---|---|---|
| M1 Autenticación y Sesión | CU001 · RF-001…005 | Sprint 2 |
| M2 Gestión de Usuarios | CU002 · RF-006…009 | Sprint 2 |
| M3 Catálogo de Empresas | CU008 · RF-010,011 | Sprint 2 |
| M4 Ingesta de Documentos | CU003 · RF-012…017,022 | Sprint 2 |
| M5 Análisis y Validación GRI | CU005 · RF-018…021,028 | Sprint 3 |
| M6 Asistente IA (RAG) | CU004 · RF-023,024 | Sprint 3 |
| M7 Reportes de Prospección | CU006 · RF-025…027 | Sprint 3–4 |
| M8 Auditoría Funcional | CU007 · RF-029,030 | Sprint 5 |

---

## Responsables (deben existir como usuarios en OpenProject)
| Rol | Persona | Tipo de tarea |
|---|---|---|
| PM / Scrum Master | Fabricio Ladera | Gestión, análisis, cierre |
| Analistas | Luis Millones · Carlos Ordinola | Diseño, RF/RNF, CU, docs |
| Backend | Juan Marcelo Ferreyra | Backend de cada módulo |
| Frontend | Juan Renato Flores | Frontend de cada módulo |
| Testers | Mauricio Gonzalez · Alonso Benites | Pruebas de cada módulo |

> Si algún nombre no coincide exactamente con la cuenta de OpenProject, la importación dejará el `Assignee` vacío; ajusta el CSV o crea los usuarios.
