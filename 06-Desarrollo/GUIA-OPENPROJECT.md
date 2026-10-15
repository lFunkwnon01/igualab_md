# 📘 Guía de OpenProject — Proyecto Igualab

> Cómo está organizado nuestro OpenProject, cómo se trabaja día a día y cómo se mide el **% de avance**. 
> Servidor: <https://openproject.ingsoftware.lat> · Proyecto: **Igualab**.

---

## 1. ¿Qué es OpenProject y por qué lo usamos?

OpenProject es la plataforma donde el curso exige registrar **todo** (tareas, avances, documentación y evidencias). 
**Regla del curso:** *lo que no está en OpenProject, no se considera entregado.*

Nos sirve para: planificar por sprints, asignar responsables, ver el avance diario (Kanban), medir el progreso (Roadmap/Burndown) y dejar trazabilidad.

---

## 2. Cómo está organizado (jerarquía)

Nuestro proyecto sigue esta estructura de **3 niveles**:

```
Sprint  (Version)          ← la "carpeta" de tiempo
  └── Módulo  (Feature)    ← la subcarpeta funcional
        ├── Analizar y especificar   (User story)  → Analista
        ├── Implementar backend      (Feature)     → Backend
        ├── Implementar frontend     (Feature)     → Frontend
        └── Probar …                 (Task)        → Tester
```

| Nivel | En OpenProject | Ejemplo |
|---|---|---|
| **Sprint** | *Version* | `S3 · Auth + Usuarios` |
| **Módulo** | *Feature* (contenedor) | `Módulo · Ingesta de Documentos` |
| **Tarea** | *User story / Feature / Task* (hijas) | `Implementar backend de Ingesta` |

---

## 3. Los 11 sprints (Versions)

| Sprint | Rango | Módulos / Transversales | Nº tareas |
|---|---|---|---:|
| **S0 · Inicial** | 2026-08-24 → 2026-09-02 | Transversal/Inicial | 5 |
| **S1 · Análisis** | 2026-09-03 → 2026-09-11 | Transversal/Análisis | 6 |
| **S2 · Diseño** | 2026-09-12 → 2026-09-21 | Transversal/Diseño | 5 |
| **S3 · Auth + Usuarios** | 2026-09-16 → 2026-09-25 | Autenticación y Gestión de Sesión · Gestión de Usuarios | 8 |
| **S4 · Catálogo + Ingesta** | 2026-09-26 → 2026-10-02 | Catálogo de Empresas · Ingesta de Documentos | 8 |
| **S5 · Análisis GRI** | 2026-10-03 → 2026-10-09 | Análisis y Validación de Brechas GRI | 4 |
| **S6 · Asistente RAG** | 2026-10-10 → 2026-10-16 | Asistente de IA (RAG) | 4 |
| **S7 · Reportes** | 2026-10-17 → 2026-10-23 | Generación de Reportes de Prospección | 4 |
| **S8 · Integración** | 2026-10-24 → 2026-10-30 | Transversal/Integración | 2 |
| **S9 · Auditoría + Calidad** | 2026-10-31 → 2026-11-06 | Auditoría Funcional · Transversal/Calidad | 6 |
| **S10 · Cierre** | 2026-11-07 → 2026-11-20 | Transversal/Cierre | 5 |

---

## 4. Las "carpetas": sprints → módulos → tareas

### 📁 S0 · Inicial  (2026-08-24 → 2026-09-02)

**🗂️ Transversal · Inicial**  _(líder: Fabricio Ladera · 2026-08-24 → 2026-09-02)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| Task | Reunión de inicio (Kick-off) con el cliente | Fabricio Ladera | 2026-08-24 | 2026-08-24 |
| Task | Levantamiento y validación de requerimientos | Carlos Ordinola | 2026-08-24 | 2026-08-28 |
| Task | Elaboración del Plan de Proyecto v1.2 y cronograma | Fabricio Ladera | 2026-08-28 | 2026-09-02 |
| Task | Asignación de roles y responsabilidades | Fabricio Ladera | 2026-08-28 | 2026-08-31 |
| Task | Metodología de desarrollo (Scrum) | Fabricio Ladera | 2026-08-31 | 2026-09-02 |

### 📁 S1 · Análisis  (2026-09-03 → 2026-09-11)

**🗂️ Transversal · Análisis**  _(líder: Luis Millones · 2026-09-03 → 2026-09-11)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Análisis del proceso actual y GAP | Luis Millones | 2026-09-03 | 2026-09-07 |
| User story | Definir reglas de negocio (RN-001…045) | Carlos Ordinola | 2026-09-03 | 2026-09-08 |
| User story | Definir RF-001…030 y RNF-001…030 | Carlos Ordinola | 2026-09-04 | 2026-09-09 |
| User story | Casos de uso CU001…CU008 y especificación | Luis Millones | 2026-09-07 | 2026-09-10 |
| Task | Backlog detallado + story points | Fabricio Ladera | 2026-09-07 | 2026-09-11 |
| Task | Prototipado de interfaces (mock) | Juan Flores | 2026-09-07 | 2026-09-10 |

### 📁 S2 · Diseño  (2026-09-12 → 2026-09-21)

**🗂️ Transversal · Diseño**  _(líder: Juan Ferreyra · 2026-09-14 → 2026-09-21)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| Task | Arquitectura de solución (7 capas) | Juan Ferreyra | 2026-09-14 | 2026-09-16 |
| Task | Diseño de base de datos (13 tablas) | Juan Ferreyra | 2026-09-14 | 2026-09-18 |
| Task | A&D V2 (LaTeX) — elaboración y compilado | Luis Millones | 2026-09-14 | 2026-09-21 |
| Task | Plan de pruebas | Mauricio Gonzalez | 2026-09-15 | 2026-09-21 |
| Task | Wiki del proyecto | Fabricio Ladera | 2026-09-14 | 2026-09-21 |

### 📁 S3 · Auth + Usuarios  (2026-09-16 → 2026-09-25)

**🗂️ Módulo · Autenticación y Gestión de Sesión**  _(líder: Fabricio Ladera · 2026-09-16 → 2026-09-25)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Analizar y especificar Autenticación (RN/RF/CU) | Carlos Ordinola | 2026-09-16 | 2026-09-17 |
| Feature | Implementar backend de Autenticación | Juan Ferreyra | 2026-09-16 | 2026-09-22 |
| Feature | Implementar frontend de Autenticación | Juan Flores | 2026-09-17 | 2026-09-23 |
| Task | Probar Autenticación: casos de prueba y evidencias | Mauricio Gonzalez | 2026-09-24 | 2026-09-25 |

**🗂️ Módulo · Gestión de Usuarios**  _(líder: Fabricio Ladera · 2026-09-16 → 2026-09-25)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Analizar y especificar Gestión de Usuarios | Luis Millones | 2026-09-16 | 2026-09-17 |
| Feature | Implementar backend de Gestión de Usuarios | Juan Ferreyra | 2026-09-17 | 2026-09-23 |
| Feature | Implementar frontend de Gestión de Usuarios | Juan Flores | 2026-09-18 | 2026-09-23 |
| Task | Probar Gestión de Usuarios: casos de prueba y evidencias | Alonso Benites | 2026-09-24 | 2026-09-25 |

### 📁 S4 · Catálogo + Ingesta  (2026-09-26 → 2026-10-02)

**🗂️ Módulo · Catálogo de Empresas**  _(líder: Fabricio Ladera · 2026-09-28 → 2026-10-02)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Analizar y especificar Catálogo de Empresas | Carlos Ordinola | 2026-09-28 | 2026-09-28 |
| Feature | Implementar backend de Catálogo de Empresas | Juan Ferreyra | 2026-09-28 | 2026-09-29 |
| Feature | Implementar frontend de Catálogo de Empresas | Juan Flores | 2026-09-28 | 2026-09-30 |
| Task | Probar Catálogo de Empresas: casos de prueba y evidencias | Mauricio Gonzalez | 2026-10-01 | 2026-10-02 |

**🗂️ Módulo · Ingesta de Documentos**  _(líder: Fabricio Ladera · 2026-09-28 → 2026-10-02)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Analizar y especificar Ingesta de Documentos | Luis Millones | 2026-09-28 | 2026-09-28 |
| Feature | Implementar backend de Ingesta de Documentos | Juan Ferreyra | 2026-09-28 | 2026-09-30 |
| Feature | Implementar frontend de Ingesta de Documentos | Juan Flores | 2026-09-28 | 2026-09-30 |
| Task | Probar Ingesta de Documentos: casos de prueba y evidencias | Alonso Benites | 2026-10-01 | 2026-10-02 |

### 📁 S5 · Análisis GRI  (2026-10-03 → 2026-10-09)

**🗂️ Módulo · Análisis y Validación de Brechas GRI**  _(líder: Fabricio Ladera · 2026-10-05 → 2026-10-09)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Analizar y especificar Análisis y Validación GRI | Luis Millones | 2026-10-05 | 2026-10-05 |
| Feature | Implementar backend de Análisis GRI y sanciones | Juan Ferreyra | 2026-10-05 | 2026-10-07 |
| Feature | Implementar frontend de Análisis GRI | Juan Flores | 2026-10-05 | 2026-10-07 |
| Task | Probar Análisis GRI: casos de prueba y evidencias | Alonso Benites | 2026-10-08 | 2026-10-09 |

### 📁 S6 · Asistente RAG  (2026-10-10 → 2026-10-16)

**🗂️ Módulo · Asistente de IA (RAG)**  _(líder: Fabricio Ladera · 2026-10-12 → 2026-10-16)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Analizar y especificar Asistente de IA (RAG) | Carlos Ordinola | 2026-10-12 | 2026-10-12 |
| Feature | Implementar backend del Asistente IA (RAG) | Juan Ferreyra | 2026-10-12 | 2026-10-14 |
| Feature | Implementar frontend del Asistente IA (RAG) | Juan Flores | 2026-10-12 | 2026-10-14 |
| Task | Probar Asistente IA (RAG): casos de prueba y evidencias | Mauricio Gonzalez | 2026-10-15 | 2026-10-16 |

### 📁 S7 · Reportes  (2026-10-17 → 2026-10-23)

**🗂️ Módulo · Generación de Reportes de Prospección**  _(líder: Fabricio Ladera · 2026-10-19 → 2026-10-23)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Analizar y especificar Generación de Reportes | Carlos Ordinola | 2026-10-19 | 2026-10-19 |
| Feature | Implementar backend de Reportes PDF | Juan Ferreyra | 2026-10-19 | 2026-10-21 |
| Feature | Implementar frontend de Reportes | Juan Flores | 2026-10-19 | 2026-10-21 |
| Task | Probar Reportes: casos de prueba y evidencias | Mauricio Gonzalez | 2026-10-22 | 2026-10-23 |

### 📁 S8 · Integración  (2026-10-24 → 2026-10-30)

**🗂️ Transversal · Integración**  _(líder: Juan Ferreyra · 2026-10-26 → 2026-10-30)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| Task | Integración de módulos (FE↔API↔BD E2E) | Juan Ferreyra | 2026-10-26 | 2026-10-28 |
| Task | Pruebas de integración | Mauricio Gonzalez | 2026-10-29 | 2026-10-30 |

### 📁 S9 · Auditoría + Calidad  (2026-10-31 → 2026-11-06)

**🗂️ Módulo · Auditoría Funcional**  _(líder: Fabricio Ladera · 2026-11-02 → 2026-11-05)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| User story | Analizar y especificar Auditoría Funcional | Luis Millones | 2026-11-02 | 2026-11-02 |
| Feature | Implementar backend de Auditoría Funcional | Juan Ferreyra | 2026-11-02 | 2026-11-03 |
| Feature | Implementar frontend de Auditoría Funcional | Juan Flores | 2026-11-02 | 2026-11-04 |
| Task | Probar Auditoría Funcional: casos de prueba y evidencias | Alonso Benites | 2026-11-05 | 2026-11-05 |

**🗂️ Transversal · Calidad**  _(líder: Mauricio Gonzalez · 2026-11-05 → 2026-11-06)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| Task | Pruebas de seguridad y rendimiento | Alonso Benites | 2026-11-05 | 2026-11-06 |
| Task | Calidad: SonarQube y cobertura | Mauricio Gonzalez | 2026-11-05 | 2026-11-06 |

### 📁 S10 · Cierre  (2026-11-07 → 2026-11-20)

**🗂️ Transversal · Cierre**  _(líder: Fabricio Ladera · 2026-11-09 → 2026-11-20)_

| Tipo | Tarea | Responsable | Inicio | Fin |
|---|---|---|---|---|
| Task | Despliegue del sistema (entornos universidad) | Juan Ferreyra | 2026-11-09 | 2026-11-12 |
| Task | Validación final con el cliente (UAT) | Fabricio Ladera | 2026-11-13 | 2026-11-16 |
| Task | Documentación final y manuales | Luis Millones | 2026-11-17 | 2026-11-18 |
| Task | Capacitación al equipo de Igualab | Fabricio Ladera | 2026-11-18 | 2026-11-19 |
| Task | Entrega final y acta de conformidad | Fabricio Ladera | 2026-11-19 | 2026-11-20 |

---

## 5. Cómo se trabaja (día a día)

Cada integrante repite este ciclo:

1. **Revisar mis tareas:** *Work packages* → filtro **Assignee = yo** (guardar como «Mis tareas»).
2. **Actualizar el estado** al empezar o terminar.
3. **Comentar** avances, bloqueos o decisiones en la tarea.
4. **Adjuntar evidencia** (capturas, diagramas, PDFs).
5. **Cerrar** solo si cumple el **DoD** (código + pruebas + documentado + revisado).
6. *(Opcional)* **Registrar tiempo** si el profesor lo pide.

### Estados del flujo (Workflow)

```
New → In progress → Developed → In testing → Tested → Closed
                          └──────► Test failed ──► In progress (corregir)
```

### Kanban (Boards)

En **Boards** hay un tablero con columnas por estado; arrastra las tarjetas para reflejar el avance. 
La vista **Work packages** agrupada por *Version* y *Parent* se ve como carpetas.

### Reuniones y Git

- **Meetings/actas:** registrar cada reunión (ya tenemos `CS3081-001…007`).
- **Git:** enlazar commits/PR con el WP (mencionar el `#ID` del work package).

---

## 6. Cómo se mide el % de avance (lo que pide el profesor)

### 6.1 Por **sprint** (Version)

Cada sprint tiene un alcance claro (un módulo). El % se calcula:

```
% avance = (tareas cerradas del sprint) / (total de tareas del sprint) × 100
o por esfuerzo: story points cerrados / story points comprometidos
```

### 6.2 Dónde verlo en OpenProject

| Vista | Módulo | Qué muestra |
|---|---|---|
| **Roadmap** | Backlogs/Roadmap | Avance por **Version (sprint)** — ideal para reportar |
| **Burndown** | Backlogs | Trabajo restante vs. tiempo del sprint |
| **Velocity** | Backlogs | Puntos completados por sprint |
| **% Complete** | Work packages | Campo por tarea; súbelo al avanzar |
| **Dashboards** | Dashboards | Resumen de métricas del proyecto |
| **Gantt / Calendar** | Gantt/Calendar | Tareas por fecha (ya configurado) |

### 6.3 Para que el % salga bien

1. Cada integrante mueve el **estado** de sus tareas (New → … → Closed).
2. Poner **Story Points** o **% Complete** a cada tarea.
3. Así el **Burndown/Velocity** y el **Roadmap por Version** se calculan solos.

---

## 7. Resumen

- **11 sprints (Versions)** y **71 work packages** (14 contenedores de módulo + 57 tareas).
- Jerarquía: `Sprint → Módulo → Analizar / Backend / Frontend / Probar`.
- Todo con **responsable** y **fecha de inicio/fin** (días laborables).
- El **% de avance por sprint** se ve en **Roadmap/Burndown** al mover los estados.
