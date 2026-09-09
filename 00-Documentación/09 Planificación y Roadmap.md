# 09 · Planificación y Roadmap

Plan de trabajo oficial del proyecto. **Metodología SCRUM** con sprints incrementales. El alcance vigente es el **Portal RAG sobre la base del cliente** (1ª problemática), acotado a Minería/Energía/Petróleo; la **suscripción** es candidata a 2ª fase.

> Fuente: `Igualab - Plan de proyecto.docx.pdf` (v1.1, 01-09-2026) — ✅ **aprobado por el cliente** (Oscar Baldeón) y **entregado al cliente** ([[21 Actas de Reunión y Acuerdos|acta 3]], 04-09). Complementado con el borrador [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|Análisis y Diseño v1.0]].

---

## 🎯 Objetivos del Proyecto (oficiales)

### Objetivo general
Desarrollar una plataforma web de analítica de sostenibilidad que permita a Igualab procesar y consultar información pública de empresas (reportes de sostenibilidad y memorias anuales de la Bolsa de Valores de Lima), identificando brechas en indicadores ASG para impulsar la prospección comercial de la organización de manera proactiva y fundamentada en datos.

> ⚠️ **Ajuste por actas:** la **data procesada es la del cliente** (sus propios reportes, sin API de Bolsa — acta 1) y el procesamiento está **acotado a Minería, Energía y Petróleo** (acta 3, REQ-07). **Acta 4 (REQ-10, definido):** RBAC de **2 roles / 3 usuarios** (sin rol "Usuario"). Ver [[21 Actas de Reunión y Acuerdos]].

### Objetivos específicos
1. Diseñar la arquitectura del sistema para integración de datos de fuentes públicas y explotación mediante IA.
2. Implementar autenticación y RBAC (Superadmin / Administrador / Usuario). *(Ajuste acta 4, REQ-10 definido: RBAC de 2 roles — sin "Usuario".)*
3. Desarrollar módulo de ingesta de datos (memorias, reportes GRI, métricas).
4. Implementar asistente IA basado en RAG con citado de fuentes.
5. Desarrollar módulo de generación de reportes de prospección en PDF.
6. Implementar módulo de visualización de datos de la Bolsa de Valores (dashboards/tablas).
7. Establecer sistema de auditoría de eventos sensibles.

---

## 🗓️ Cronograma por Fases (fechas oficiales)

### FASE INICIAL
| # | Fecha | Actividad |
|---|---|---|
| 1 | 21/08/2026 | Reunión de kick-off (levantamiento de visión y necesidades) |
| 2 | 28/08/2026 | Presentación y validación del mockup de requerimientos y solución |
| 3 | 31/08/2026 | Contrapropuesta, modificación de requerimientos, validación de propuesta |

### FASE DE ANÁLISIS Y DISEÑO
| # | Fecha | Actividad |
|---|---|---|
| 4 | 04/09/2026 | Presentación del Plan de Proyecto y metodología |
| 5 | 07/09/2026 | Revisión del análisis GAP y backlog inicial |

### FASE DE DESARROLLO
| # | Fecha | Actividad |
|---|---|---|
| 6 | 11/09/2026 | Presentación de arquitectura y prototipo con cliente |
| 7 | 21/09/2026 | Validación final de requerimientos/arquitectura/prototipo |
| 8 | 28/09/2026 | Demo de autenticación y control de accesos (RBAC) |
| 9 | 05/10/2026 | Demo de ingesta de datos y motor RAG |
| 10 | 19/10/2026 | Demo de módulos de análisis GRI/sanciones |
| 11 | 23/10/2026 | Demo del chatbot, reportes PDF y dashboards |
| 12 | 30/10/2026 | Revisión de integración del sistema |
| 13 | 02/11/2026 | Revisión de auditoría y trazabilidad |
| 14 | 09/11/2026 | Revisión de pruebas de funcionalidad y calidad |

### FASE DE CIERRE
| # | Fecha | Actividad |
|---|---|---|
| 15 | 13/11/2026 | Despliegue completado, prueba operativa en vivo |
| 16 | 16/11/2026 | Cierre de UAT, validación final con el cliente |
| 17 | 20/11/2026 | Entrega final, documentación, capacitación y firma de acta |

---

## 🧪 Metodología SCRUM

### Roles SCRUM
| Rol | Integrante |
|---|---|
| **Product Owner (PO)** | Oscar Rafael Baldeón |
| **Jefe de Proyecto (PM)** | Fabricio Godofredo Ladera La Torre *(acta 4: reemplaza a Juan Renato Flores, que pasa a Desarrollador Frontend)* |
| **Equipo de desarrollo** | Analistas, Testers, Ingenieros Backend/Frontend |

### Ceremonias
- **Sprint Planning:** inicio de cada sprint, define objetivo e historias
- **Daily Scrum:** reunión diaria breve para sincronizar avances
- **Sprint Review:** cierre del sprint, presentación al PO para validación
- **Sprint Retrospective:** evaluación del proceso y mejoras
- **Refinamiento del Backlog:** detallar, estimar y priorizar historias futuras

### Artefactos
- **Product Backlog:** lista priorizada de todos los requerimientos
- **Sprint Backlog:** historias y tareas del sprint en curso
- **Incremento:** producto funcional al final de cada sprint

---

## 📦 Épicas y RF (numerado oficial [[04 Requerimientos Funcionales|RF-001…021]])

| Épica | Alcance | RF |
|---|---|---|
| Seguridad y sesión | Autenticación, recuperación, sesión, RBAC (máx. 3 usuarios) | RF-001…004 |
| Gestión de usuarios | Alta/habilitar/deshabilitar, roles (Superadmin) | RF-005 |
| Ingesta (Superadmin) | Carga PDF + empresa/año, dedup, indexación, notificación; sectores Minería/Energía/Petróleo | RF-006…009 |
| Asistente IA (RAG) | Consulta NL con citas, aviso si no disponible, IA delimitada a la base del cliente | RF-010…012 |
| Análisis GRI/sanciones | Brechas, evolución histórica, sanciones | RF-013…015 |
| Reportes de prospección | PDF consolidado, historial inmutable | RF-016, RF-017 |
| Visualización | Dashboards solo lectura + filtros | RF-018, RF-019 |
| Auditoría | Registro automático + consulta con filtros | RF-020, RF-021 |
| ~~LinkedIn~~ | ❌ eliminado del alcance | (antes RF-17) |

## 🚦 Hitos (milestones)

| Hito | Descripción | Fecha | Estado |
|---|---|---|---|
| **M0** | Mockup de requerimientos + solución | 28/08/2026 | ✅ Validado por cliente (acta 1) |
| **M1** | Login + roles funcionando | fin Sprint 1 | ⏳ |
| **M2** | Documentos ingestados y buscables | fin Sprint 2 | ⏳ |
| **M3** | Chat de IA responde con fuentes (solo base del cliente) | fin Sprint 3 | ⏳ |
| **M4** | PDF + dashboards | fin Sprint 4 | ⏳ |
| **M5** | Auditoría + seguridad cerrada | fin Sprint 5 | ⏳ |

## ⚠️ Dependencias y riesgos tempranos
- ✅ **Servidor de producción — CERRADO (acta 4, REQ-11):** fase 1 **sin despliegue a producción**; operación en el entorno de desarrollo universitario (servidor + LLM). El "despliegue" de los hitos 15–17 del cronograma se entiende sobre ese entorno.
- **Presupuesto:** sin definir por el cliente (acta 1) — afecta costos de tokens/servidor (RNF-011); mitigado en fase 1 con infraestructura universitaria (acta 4).
- **Criterios de brecha GRI (RN-006):** vacíos en el borrador A&D; cerrar con el PO el 07-09.
- Disponibilidad de la data del cliente (calidad/formato de sus reportes).

## 🔗 Relacionado
- [[21 Actas de Reunión y Acuerdos]] · [[10 Pendientes y Supuestos]] · [[12 Análisis y Recomendaciones]] · [[04 Requerimientos Funcionales]] · [[11 Stakeholders y Contactos]] · [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]]
