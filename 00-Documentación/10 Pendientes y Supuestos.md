# 10 · Pendientes y Supuestos

Decisiones abiertas y supuestos del proyecto, alineados con el Plan de Proyecto aprobado y las [[21 Actas de Reunión y Acuerdos|actas CS3081-001/002/003]].

---

## ✅ Supuestos confirmados (Plan aprobado + actas)

1. **Acceso a los documentos:** la base es la **del propio cliente** (sus memorias y reportes; el cliente **no cuenta con API ni acceso a Bolsa** — acta 1). El supuesto original del Plan (repositorio público de la BVL) se ajusta por acta.
2. **Disponibilidad del PO:** Oscar Baldeón valida requerimientos, prototipos e incrementos en cada sprint (acta 3: asume el seguimiento según el plan entregado).
3. **Servicio de LLM por API** con capacidad y presupuesto para RAG — en la etapa de desarrollo lo provee la **universidad** (acta 2).
4. **Servidor universitario** para desarrollo/despliegue (Plan + acta 2). ⬅️ **Cerrado (acta 4, REQ-11): no habrá despliegue a producción en fase 1**; el sistema opera en el entorno de desarrollo universitario (el cliente no tiene presupuesto para sostener la infraestructura IA/RAG).
5. **Criterios de aceptación e indicadores GRI** definidos y validados por el PO durante el desarrollo.
6. **Costo mínimo:** el cliente busca el costo más bajo posible (tokens + servidor); desarrollo sin costo para él durante la etapa universitaria (actas 1 y 2).

---

## 🚩 Pendientes de diseño (vigentes)

1. **Comportamiento ante "respuesta no encontrada"** (acta 1, REQ-02): ¿el asistente busca en otra parte o responde "no se encontró en los documentos"? — cerrar con el PO.
2. **Criterios de detección de brechas GRI (RN-006)** — vacía en el borrador A&D; definir por sector (**Minería / Energía / Petróleo**). Ver [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|hallazgo 3]].
3. **Cerrar el análisis con arquitectura (acta 4, REQ-13):** faltan los **diagramas de casos de uso** y el **diagrama de BD con diccionario de datos** — fecha **por definir (~1–2 semanas tras la confirmación del cliente sobre el diagrama de procesos/modelo de usuarios)** (cierra hallazgos 1 y 4).
3. **Expiración de sesión por inactividad** — parámetro configurable (RF-003); los mockups usan slider 5–120 min, default 15.
4. **Presupuesto del cliente** (acta 1) — pendiente; condiciona costos de operación (tokens/servidor).
5. ~~**Servidor de producción**~~ — ✅ **CERRADO (acta 4, REQ-11): sin producción en fase 1**; operación en desarrollo (universidad).
6. **Modelo de suscripción (2ª fase)** — concretado en acta 4 (REQ-12): usuarios **"Cliente" con `tenant_id`** (multi-tenant) + **pasarela de pagos** (a evaluar); sin desarrollo en fase 1. ⚠️ **Aclaración (acta 4):** todo lo contemplado en el plan de proyecto corresponde **solo a la fase 1**; la fase 2 depende del **tiempo del equipo** (cronograma académico) y del **presupuesto del cliente para salir a producción** — argumento de motivación: la inversión habilitaría el modelo retribuido (suscripción + consultoría) que amortizaría ese costo.
7. **Modelo de datos y diccionario** — corregir en el borrador A&D (el diccionario actual corresponde a otro dominio). Ver [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|hallazgos 1 y 4]].
8. **Vigencia anual de los documentos** — mecanismo de recarga **manual** (sin scraping en el alcance).
9. **Elección concreta del LLM/API** de la universidad y su formato de consumo (RNF-010).

## ❌ Cerrados / eliminados del alcance

| Tema | Estado | Referencia |
|---|---|---|
| **Servidor de producción (REQ-08, acta 3)** | ✅ **RESUELTO (acta 4, REQ-11): sin producción en fase 1** — todo opera en desarrollo universitario | [[21 Actas de Reunión y Acuerdos]] |
| **LinkedIn (antes pendiente 6)** | ❌ **ELIMINADO** — revisión del equipo; Plan aprobado sin LinkedIn | [[14 Requerimientos del Kick-off (RF-11+)]] |
| ¿Quién ingesta? (GAP Superadmin vs Administrador) | ✅ **RESUELTO**: **el Superadmin ingesta** (Plan objetivo 3 aprobado + A&D RN-002); el Administrador consulta | [[03 Roles y Control de Accesos]] |
| Base de datos relacional vs no relacional | 🔄 Re-definir en el borrador A&D (el modelo de datos está vacío) | [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]] |
| Chatbot de citas (onepager) | ⛔ Obsoleto — fuente archivada | [[01 Contexto del Proyecto]] |
| Rol público de lectura | ⏸️ Sustituido por usuarios **"Cliente" con `tenant_id` + pasarela de pagos** (2ª fase, acta 4 REQ-12) | [[21 Actas de Reunión y Acuerdos]] |

## ❓ Supuestos a confirmar con el cliente
- ¿Volumen real de documentos del cliente por sector (Minería/Energía/Petróleo)?
- ~~¿Quién operará como Superadmin / Administrador / Usuario?~~ ✅ **Cerrado (acta 4, REQ-10): 2 roles / 3 personas — Oscar = Superadmin + 2 Administradores** (rol "Usuario" eliminado).
- ¿El modelo de negocio de 2ª fase es suscripción para "ver reportes" (sin analítica)?

---

## ⚠️ Riesgos del Proyecto (oficiales, Plan aprobado)

| Riesgo | Probabilidad | Impacto | Responsable | Mitigación | Contingencia |
|---|---|---|---|---|---|
| Retiro de un miembro del grupo | Media | Alto | Jefe de Proyecto | Documentación continua; distribución equilibrada de tareas | Reasignar tareas; ajustar alcance del sprint |
| Problemas personales de un miembro | Medio | Medio | Jefe de Proyecto | Comunicación abierta; márgenes de tiempo en planificación | Priorizar casos críticos; redistribuir carga |
| Brechas de seguridad o filtración de datos | Baja | Alto | Desarrollador Backend | Cifrar datos en reposo y tránsito; RBAC; auditorías | Rotar credenciales; notificar al cliente |
| Problemas de salud de un miembro | Medio | Medio | Jefe de Proyecto | Buffer en planificación; trabajo colaborativo | Redistribuir responsabilidades; replanificar sprint |
| Indisponibilidad del Product Owner | Medio | Alto | Jefe de Proyecto | PO alterno; criterios escritos; tiempos de respuesta | Decisiones con supuestos documentados; validar retroactivamente |
| Disponibilidad y calidad de datos públicos | Medio | Alto | Analista Funcional | Verificar fuentes antes del desarrollo; datos de prueba | Carga manual; ajustar alcance de ingesta |
| Cambios en estándares GRI o regulaciones | Baja | Medio | Analista Funcional | Monitorear actualizaciones GRI; reglas configurables | Actualizar reglas; pruebas de regresión |

> 📌 Con las actas, el riesgo "disponibilidad y calidad de los datos" aplica ahora a los **reportes propios del cliente** (calidad/formato). El riesgo "indisponibilidad del servidor" quedó acotado al **entorno de desarrollo universitario** (acta 4: sin producción en fase 1).

---

## 🔗 Relacionado
- [[21 Actas de Reunión y Acuerdos]] · [[09 Planificación y Roadmap]] · [[12 Análisis y Recomendaciones]] · [[01 Contexto del Proyecto]] · [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]]
