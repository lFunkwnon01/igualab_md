# 24 · Control de Cambios post-Plan — Trazabilidad A&D v1.2

> **Fecha:** 10-09-2026 · **Origen:** revisión del equipo post-acta 4 y post-firma del Plan
> **Documentos afectados:** `Análisis y Diseño - Igualab.pdf` (v1.1 → v1.2) · actas CS3081 (próxima: 11-09)
> **Regla de gobernanza aplicable:** el Plan de Proyecto v1.1 está **aprobado y firmado** (acta 3, evidencia de entrega por correo 04-09) → **NO se edita ni se re-versiona**. Toda desviación del alcance se registra mediante **acta (REQ)** y trazabilidad en este documento. El A&D es el documento **vivo** que se construye sobre la base del Plan (Fase 1 congelada como *baseline*); el cambio se documenta, no se oculta — así se evita cualquier apariencia de incumplimiento.

---

## 0 · Gobernanza: relación Plan ↔ A&D (leer esto primero)

1. **El Plan es la base congelada.** Todo lo que el plan contiene (objetivos 1–7, cronograma, alcance Fase 1) permanece como línea base firmada. **Ningún cambio al plan se hace editándolo.**
2. **Los cambios viven en las actas.** El mecanismo correcto es el que ya usamos desde el acta 1: cada ajuste se captura como **REQ** en el acta correspondiente, con tipo "Cambio", criterio de aceptación y estado.
3. **El A&D refleja el estado real ("to-be").** Cuando un cambio queda decidido en acta, el A&D se actualiza en la versión siguiente con la **nota de cambio** y la referencia al acta/REQ. Si un módulo del plan cambia de forma en el A&D, se deja nota: *"Vigente según Plan; reescrito por acta X (REQ-Y)"* — así la trazabilidad muestra que el plan se cumplió y se perfeccionó, no que se incumplió.
4. **Presupuestos del plan ya reinterpretados por actas (ejemplos válidos de este mecanismo):** servidor de producción [✅ resuelto acta 4 REQ-11: sin producción, entorno universitario], fuente de datos [✅ acta 1: reportes del cliente], sectores [✅ acta 3: Minería/Energía/Petróleo].

> **Frase para el docente/cliente:** *"El plan firmado es la línea base de la Fase 1; los refinamientos del análisis (rol Usuario, viabilidad del módulo de Bolsa, renombrado) ingresan por control de cambios documentado en actas — exactamente como el propio plan establece."*

---

## 1 · Cambio: eliminación del rol "Usuario" — ACTA 4, REQ-10 ✅ FIRMADO/DEFINIDO

**Decisión (acta 4, 08-09-2026):** el cliente adoptó la opción (a): **2 roles / 3 personas** — Oscar Baldeón = **Superadmin** + **2 Administradores** de Igualab. El rol "Usuario (lectura)" queda **eliminado**. El acceso externo de lectura se re-encauza a **2ª fase** como usuarios "Cliente" con `tenant_id` + pasarela de pagos (REQ-12).

**Justificación de negocio:** solo habrá 3 usuarios de confianza; un rol pasivo no aporta valor en Fase 1; minimiza costo de tokens/infraestructura (acta 1 REQ-05); desbloqueó el cierre del modelo de procesos. **El Superadmin NO usa la IA** (regla vigente) — los roles son aislados, no jerárquicos.

### 1.1 Impacto trazado en el A&D (párrafos/exactos por corregir)

| # | Artefacto | Texto actual (v1.1) | Acción en v1.2 |
|---|---|---|---|
| A | §7.1 **Actores** | Lista `SuperAdmin, Administrador, Usuario` + descripción "Usuario: perfil de solo lectura… dashboards… datos de la Bolsa" | Eliminar el actor Usuario + su descripción; nota "2 roles en Fase 1 (acta 4 REQ-10)" |
| B | §7.1 **Actor externo** | `Bolsa de Valores de Lima (Externo — fuente de datos)` | Eliminar o redefinir como "emisoras" (ver §2) |
| C | **CU001** (Autenticación) | "usuarios registrados (SuperAdmin, Administrador **y Usuario**)" + `Actores: SuperAdmin, Administrador, Usuario` | Cambiar a los 2 roles (acta 4 REQ-10) |
| D | **RF-001** | "(SuperAdmin, Administrador **y Usuario**)" + actores | Cambiar a los 2 roles |
| E | **RF-002** | "(SuperAdmin, Administrador **o Usuario**)" | Cambiar a los 2 roles |
| F | **RF-004** | restricción por rol — 3 roles/3 usuarios | Reformular: **2 roles / 3 personas** (Oscar Superadmin + 2 Administradores) |
| G | **RF-018** | "dashboards… modo solo lectura **para el rol Usuario**" | Eliminar (ver §2) o reescribir con rol Administrador |
| H | **RN-008** | "…no permite edición de datos por parte del **rol Usuario**" | Eliminar (ver §2) o reescribir sin Usuario |
| I | §2/§3 (resumen de módulos/actores) | "…y Usuario (solo lectura de dashboards y datos de la Bolsa de Valores)" + "acceso diferenciado para los **3 roles**" | Reescribir a 2 roles |
| J | **RNF** | Revisión realizada: los RNF-001…011 **ya no dependen** del rol Usuario (RNF-001 dice "los dos roles") | ⚠️ **Impacto RNF: cero cambios** — confirmar en revisión final |
| K | **Mockups Stitch/frontend** | Vistas/roles demo con "Usuario", vistas de `linkedin` y pantallas de Bolsa | Filtrar demo a 2 roles; quitar LinkedIn y (según §2) Bolsa |

### 1.2 Resumen de impacto por tipo

- **CUs afectados:** CU001 (actores), **CU007** (entero, ver §2). CU008 (auditoría) no cambia por rol.
- **RF afectados:** RF-001, RF-002, RF-004 (roles) · RF-018/RF-019 (eliminación/reescritura por Bolsa).
- **RN afectadas:** RN-008 (eliminación/reescritura); RN-002 (RBAC rol único) se mantiene.
- **RNF afectados: ninguno** (ya alineados a 2 roles).
- **Actores externos:** "Bolsa de Valores de Lima" queda fuera (ver §2). El actor "Sistema IA/LLM (API universidad)" se mantiene (acta 2/4).

---

## 2 · Cambio: módulo "Dashboards de Bolsa de Valores" (CU007 + RF-018/019 + RN-008) — 🚩 NO VIABLE, por registrar en acta del 11-09

### 2.1 Por qué ya no es viable (tres causas)

1. **Legal/económica:** la información de la Bolsa de Valores de Lima es **licenciada (~$20/mes por API)** — la ONG no tiene presupuesto (consistente con acta 4 REQ-11: sin producción ni infraestructura de pago).
2. **Técnica:** el web scraping desde el **servidor con IP estática** de la ONG presenta **riesgo real de ban de IP** por el proveedor — no viable operativamente.
3. **Semántica (ya inscripta en el propio A&D):** **RN-008 exige que los datos provengan únicamente de la información ingestada y validada** — pero la ingesta definida y firmada contiene **memorias anuales + reportes de sostenibilidad GRI** (Minería/Energía/Petróleo, acta 3). Es decir: el módulo se llama "de Bolsa", pero **nunca tendrá datos de mercado** (precio, valor de acción, capitalización). Los números GRI (ej. GRI 305/302) son **datos de sostenibilidad de empresas que son emisoras bursátiles**, no datos de la Bolsa. El mockup CU008 ("Evolución de Emisiones vs **Valor de Acción (USD)**") grafica un cruce que la ingesta no puede proveer.

> **Lectura correcta de RN-008:** con fuente = solo ingesta, el módulo es en realidad un **dashboard de analítica ESG de empresas cotizadas**. El nombre "Bolsa de Valores" es engañoso y arrastra expectativas de feed de mercado que el alcance descartó (acta 1).

### 2.2 Opciones para el cliente (decisión en acta 11-09)

| | **Opción A — Eliminar** (recomendada) | **Opción B — Conservar renombrado** |
|---|---|---|
| Alcance | Se eliminan CU007, RF-018, RF-019, RN-008 y el actor externo BVL. La visualización sobrevive como **dashboards de la data ingerida** (KPIs ESG por empresa/sector/periodo) dentro de los flujos CU005/CU006 | Módulo renombrado **"Dashboards de Sostenibilidad — empresas cotizadas"**; RN-008 reescrita (fuente = solo ingesta; rol Administrador, sin edición); RF-018/019 reescritos sin "Bolsa" |
| Pro | Alcance limpio, sin expectativas imposibles; menor esfuerzo; coherente con actas 1/3/4 | Preserva el impacto visual para demos; usa mockups ya existentes |
| Costo adicional | Ninguno | Limpiar mockups (quitar "Valor de Acción", tickers de feed) y mantener módulo sin fuente real de mercado |
| Riesgo | Ninguno | Confusión semántica persistente si no se re-etiqueta TODO |

### 2.3 Si el cliente elige la Opción A — trazabilidad

| Artefacto | Acción |
|---|---|
| CU007 "Visualización de dashboards de Bolsa" | **Eliminado** — nota: "no viable en Fase 1 (licencia BVL + riesgo scraping); función consultiva absorbida por dashboards de data ingerida (CU005/CU006)" |
| RF-018 / RF-019 | **Eliminados** (o renumerados si se conserva la vista ESG como CU) |
| RN-008 | **Eliminada** |
| Actor "BVL (Externo)" | **Eliminado** del listado y de secuencia/diagramas |
| Objetivo específico 6 del Plan | **No se toca el plan** — se registra el cambio como REQ con referencia "Satisfecho con ajuste: visualización sobre data ingerida; feed de mercado fuera por no-viabilidad (acta X)" |
| Renumeración | CU008 (Auditoría) → pasa a **CU007**; ajustar referencias cruzadas en RF/actores/matriz |

### 2.4 REQ propuestos para el acta del 11-09 (IDs tentativos — verificar no colisión)

| ID | Necesidad / cambio | Tipo | Prioridad | Criterio/evidencia | Estado |
|---|---|---|---|---|---|
| **REQ-15** (prop.) | Eliminar el módulo de Visualización de Datos de Bolsa (CU007, RF-018/019, RN-008): API BVL licenciada ~$20/mes sin presupuesto de la ONG; web scraping arriesga ban de la IP estática del servidor de la ONG; RN-008 ya restringe la fuente a la ingesta (sin data de mercado) | Cambio | Alta | Justificación económica/técnica; acta 1 (fuente = reportes del cliente); acta 4 REQ-11 (sin producción) | Por definir |
| **REQ-16** (prop.) | **Renombrado** (si Opción B): "Dashboards de Sostenibilidad — empresas cotizadas" en reemplazo de "Bolsa de Valores"; RN-008 reescrita (fuente = ingesta; rol Administrador; consultivo, sin edición) | Cambio | Media | RN-008 actual y acta 1 | Por definir |
| **REQ-17** (prop.) | Alinear todo el A&D al modelo de usuarios definido (acta 4 REQ-10): eliminar el rol "Usuario" de actores, CU001, RF-001/002/004, RN-008 y texto residual de §2/§3 | Documento | Alta | Acta 4 REQ-10 (definido) | En proceso |

---

## 3 · Registro retroactivo: LinkedIn — eliminado sin acta

- **Estado:** ninguna acta (1–4) menciona LinkedIn (verificado por búsqueda de texto en los PDF firmados). Su exclusión quedó documentada **implícitamente**: el **Plan v1.1 aprobado ya no lo contiene** y el numerado oficial RF-001…021 no lo incluye (era RF-17 del numerado antiguo archivado).
- **Acción:** registrar en la acta del 11-09 como confirmación retroactiva con motivo (revisión del equipo; fuera del plan aprobado). Mockups: carpeta `b_squeda_linkedin_cu010` queda **fuera de la demo**.

---

## 4 · Checklist de actualización A&D v1.2 (para Luis y Carlos)

- [ ] §7.1: quitar actor Usuario y actor externo BVL; añadir nota acta 4 (2 roles / 3 personas)
- [ ] CU001: actores y texto a 2 roles
- [ ] RF-001, RF-002, RF-004: texto a 2 roles / 3 personas (siempre citar acta 4 REQ-10)
- [ ] Resolución Bolsa (según decisión del cliente 11-09): Opción A (eliminar CU007/RF-018/019/RN-008 + renumerar) u Opción B (renombrar y reescribir RN-008/RF-018/019)
- [ ] §2/§3: reescribir párrafos con mención residual de "3 roles" y "datos de la Bolsa"
- [ ] Objetivo general/§1: ajustar la mención de "información pública… BVL" — fuente real = reportes del cliente (acta 1), sectores Minería/Energía/Petróleo (acta 3) [hallazgo 5 vigente]
- [ ] Verificar que no quede ningún "rol Usuario" en todo el documento (búsqueda "Usuario", "Usuario:")
- [ ] Validar con Oscar y dejar en acta los tres REQ (± renumerar)

## 🔗 Relacionado
- [[21 Actas de Reunión y Acuerdos]] · [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]] · [[03 Roles y Control de Accesos]] · [[09 Planificación y Roadmap]] · [[10 Pendientes y Supuestos]] · [[04 Requerimientos Funcionales]] · [[05 Requerimientos No Funcionales]]
