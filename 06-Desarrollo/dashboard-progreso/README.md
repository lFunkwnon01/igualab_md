# 📊 Control de proyecto — Igualab

Panel interno de monitoreo de tareas, sprints, módulos, bugs, ACT, casos de prueba y evidencias. **No es una presentación**: es el tablero operativo del equipo.

Stack: **Next.js 16 + Tailwind 4**.

## Cómo ejecutarlo

```bash
cd 06-Desarrollo/dashboard-progreso
npm install
npm run sync            # trae WPs/bugs/ACT/sprints desde OpenProject
npm run trace           # cruza issues con RN/RF/RNF y casos de prueba (A&D)
npm run sync:evidence   # lee el registro de evidencias y actualiza los CPs
npm run dev             # http://localhost:3000
```

Build:

```bash
npm run build
npm run start
```

## Vistas

| Vista | Qué muestra |
|---|---|
| **Resumen** | WPs abiertos, cola de trabajo por estado, salud por sprint, módulos y actividad reciente. |
| **Presentación** | Slides listas para captura/PDF: resumen ejecutivo, avance por módulo, casos por módulo, avance por sprint y fases de testers. |
| **Guía de slides** | Tarjetas con vista previa, qué gráfica usar, datos reales y enlace directo a cada slide. |
| **Tareas** | Tabla completa de WPs con búsqueda y filtros por estado, tipo, sprint, responsable y módulo. Click abre el detalle. |
| **Sprints** | Fechas reales y avance de cierre por sprint. Click filtra las tareas. |
| **Módulos** | M1–M8 con código, OpenProject, pruebas, bugs, ACT y evidencia. |
| **Equipo** | Carga abierta por responsable y qué tiene por testear. |
| **Bugs y ACT** | Tabs separadas, filtros y detalle. |
| **Casos de prueba** | CP01–CP61 del documento v1.8, por módulo, con estado de evidencia. |
| **Evidencias** | Carpetas de archivo y CPs pendientes de captura. |
| **Brechas A&D** | Cambios pendientes en el análisis + flujos manuales. |
| **Requisitos** | Cumplimiento RN/RF/RNF con gráfica por tipo/estado, filtros y detalle por requisito. |
| **Trazabilidad** | Todos los issues de OpenProject por fecha de creación y estado, y su cruce con RN/RF/RNF y CP del A&D: qué issue exige actualizar el análisis. |
| **Timeline** | Gantt simple con fechas de sprints y avance. |

## Slides exportadas

Las imágenes están en `public/slides/` (para la guía) y en `../../07-Exposicion/slides-2026-10-29/` (para el PPT).

## Datos

| Archivo | Fuente |
|---|---|
| `src/data/openproject.json` | API de OpenProject (`npm run sync`). |
| `src/data/curated.json` | Lectura curada de módulos/pruebas/brechas. |
| `src/data/testcases.json` | Documento v1.8 + registro de evidencias (`npm run sync:evidence`). |
| `src/data/traceability.json` | Cruce issues ↔ RN/RF/RNF ↔ CP (`npm run trace`). |

## Evidencias

El registro está en:

```text
03-Calidad/03-Evidencias/00-REGISTRO-EVIDENCIAS.md
```

1. Guarda la captura en la subcarpeta correspondiente.
2. Llena la fila del CP en el registro.
3. Ejecuta `npm run sync:evidence`.
4. El dashboard cambiará el CP de “Pendiente” a “Aprobado” o “Fallido”.

## Regla de lectura

- **Código**: M1–M8 implementados.
- **OpenProject**: cierre administrativo (puede ir por detrás).
- **Calidad**: CPs, evidencias, bugs y ACT.
