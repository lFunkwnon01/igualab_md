# 🔍 Auditoría RN / RF / RNF — contra el criterio del curso (CS3081)

> **Fecha:** 2026-09-21 · **Alcance:** LaTeX `analisis-diseno-latex/` + `FASE 1/01-Analisis-y-Diseno/` + A&D.
> **Criterio (fuentes del curso):**
> - `software_pdf/CS3081.T2.Requerimientos.pdf` — RF vs RNF, calidad de requerimientos, prioridad.
> - `software_pdf/T4.UseCases.pdf` — especificación de casos de uso.
> - `software_pdf/CS3081.T5.Arquitectura.pdf` — los RNF guían la arquitectura (seguridad, escalabilidad, disponibilidad, rendimiento, trazabilidad).
> - `software_pdf/CS3081.T6.Diseño.pdf` — modularidad, abstracción, acoplamiento, cohesión, SOLID.
> - `software_pdf/CS3081.T4.Calidad del Software.pdf` — atributos de calidad y pruebas.
> - **Guía del profesor:** `01-Mockups-y-Propuestas/EJEMPLO DE RF Y RN.docx (1).pdf`.

---

## 1. El criterio del profesor (lo que hay que calcar)

### 1.1 Formato de REGLA DE NEGOCIO (RN) — de la guía
Cada RN es una **regla condicional** con estructura fija:

```
SI <condición / evento / intento del actor>,
ENTONCES <obligación / comportamiento que impone el sistema>,
SE APLICA A <ámbito: módulos, roles, situaciones, entidades>,
SE BASA EN <principio de negocio / norma / acuerdo con el PO (acta)>,
Y TIENE LA SIGUIENTE EXCEPCIÓN <excepción explícita>.
```

Tabla: `NO | NOMBRE DE LA REGLA | DETALLE DE LA REGLA` (1 columna de detalle, texto largo).
Numeración del ejemplo: **RN-0001, RN-0002…** (4 dígitos).

### 1.2 Formato de REQUERIMIENTO FUNCIONAL (RF) — de la guía
Tabla: `N° | Descripción del Requerimiento Funcional | Reglas de Negocio | Prioridad | Analista que lo elaboró`.
- El RF es **una frase corta y atómica** (“Autenticar a los usuarios…”, “Crear nuevos roles…”).
- Cada RF **cita VARIAS RN** (en el ejemplo, RF-01 → RN-0001, 0002, 0003, 0005, 0007, 0009, 0013, 0017).
- Prioridad: **MUST HAVE / NICE TO HAVE / OUT OF THE SCOPE** (T2).

### 1.3 Regla de proporción (indicación del profesor)
> Debe haber **más RN que RF y que RNF**.
En el ejemplo: **33 RN → 12 RF** (≈ 3 RN por RF).

### 1.4 Calidad de un requerimiento (T2) — checklist
No ambiguo · Comprobable · Claro (conciso, breve, simple, preciso) · Correcto · Comprensible · Factible · **Independiente** · **Atómico** (no dividirse) · Necesario · **Libre de implementación** (no imponer el “cómo”).

---

## 2. Estado actual de Igualab

| Artefacto | Cantidad | ¿Cumple proporción? | Formato guía |
|---|---|---|---|
| **RN** | **39** (RN-001…039) | ❌ **RN(39) < RF(56)** | ❌ Declarativas, sin `SI…ENTONCES…SE APLICA…SE BASA…EXCEPCIÓN` |
| **RF** | **56** (RF-001…056) | — | ⚠️ Sin columna “Analista”; citan 1–2 RN (deben citar varias) |
| **RNF** | **36** (RNF-001…036) | ⚠️ RN(39) > RNF(36) apenas | ⚠️ Sin categoría; “Deriva de” con referencias cruzadas erradas |

**Conclusión:** gana RF → hay que **ampliar y reestructurar las RN** (y re-expresar RF/RNF).

---

## 3. Brechas por sección (contra tu lista)

| § | Sección | Estado | Acción |
|---|---|---|---|
| 1 | Antecedentes | ✅ | Revisar palabra por palabra |
| 2 | Objetivo general | ✅ | — |
| 3 | Alcance | 🟡 | Añadir “fuera de alcance FASE 1” explícito |
| 4 | Diseño funcional detallado | 🟡 | “8 módulos” pero lista 6; añadir modularidad/SOLID (T6) |
| 5 | Diagrama del proceso | 🔴 | **Reestructurar a 5.1 Integración entre los sistemas de la empresa / 5.2 Interoperación con sistemas externos** (hoy 5.1 AS-IS / 5.2 problemas / 5.3 AS-IS repetido) |
| 6 | Reglas de negocio | 🔴 | **Reescribir con plantilla guía + ampliar (RN > RF y > RNF)** |
| 7.1 | Actores | 🟡 | Alinear (LLM/BVL externos) |
| 7.2 | CU y especificación | 🟡 | CU005/CU006 con texto copiado; CU003 incompleto |
| 7.3 | Diagrama de secuencia | 🔴 | Faltan/ubicación revisar |
| 7.4 | RF | 🟡 | Tabla con “Analista”, múltiples RN, prioridad MUST/NICE/OUT |
| 7.5 | RNF | 🟡 | Categorizar y corregir “Deriva de” |

---

## 4. Propuesta de reestructuración de RN (borrador)

Agrupar las RN por módulo y expandirlas con la plantilla. Meta sugerida: **≈ 60–70 RN** (para superar 56 RF y 36 RNF), por dominio:

1. **Acceso y cuentas** (login, sesión, recuperación, bloqueo, contraseña, roles, transferencia SuperAdmin).
2. **Ingesta documental** (formato, tamaño 50 MB, tipo real, hash, unicidad, observado/rechazado, atomicidad).
3. **Catálogo de empresas y sectores** (nombre, sector, activos).
4. **Análisis GRI y sanciones** (catálogo 40, estados manuales, evidencia, sanciones, evidencia ausente ≠ cero, puntaje ESG).
5. **Asistente RAG** (dominio, contexto obligatorio, citas, sin conocimiento externo, prompt-as-data, timeout).
6. **Reportes de prospección** (precondición, determinismo, inmutabilidad, sin LLM, historial, descarga).
7. **Auditoría** (eventos, contenido, append-only, UTC).
8. **Trazabilidad y datos** (información parcial, no borrado físico, versionado de catálogo).

---

## 5. Checklist de verificación (paso a paso)

- [ ] 1 · Antecedentes — texto íntegro, sin faltas
- [ ] 2 · Objetivo general — íntegro
- [ ] 3 · Alcance — + fuera de alcance
- [ ] 4 · Diseño funcional — 8 módulos + SOLID
- [ ] 5 · Proceso — 5.1 integración interna / 5.2 interoperación externa
- [ ] 6 · RN — plantilla guía + **RN > RF y > RNF**
- [ ] 7.1 · Actores
- [ ] 7.2 · Casos de uso y especificación (CU005/CU006/CU003)
- [ ] 7.3 · Diagramas de secuencia
- [ ] 7.4 · RF — tabla con Analista + múltiples RN + prioridad
- [ ] 7.5 · RNF — categorías + Deriva de
- [ ] LaTeX recompila y comparativa OK

---

## 6. Decisiones a confirmar con el usuario

1. **Numeración:** ¿mantener `RN-001` / `RF-001` o adoptar `RN-0001` / `RF-01` como la guía?
2. **Profundidad:** ¿reescribimos **solo RN**, o también RF (columna Analista + múltiples RN) y RNF (categorías)?
3. **Meta de conteo:** ¿objetivo ~60 RN? (para superar 56 RF).
4. **Prioridades:** adoptar `MUST HAVE / NICE TO HAVE / OUT OF THE SCOPE` de la guía.

---

## 7. Modelo de sectores y empresas (VERIFICADO en el mock desplegado)

> Fuente: `igualab.vercel.app` (mock fidelizado) — `js/data.js`, `js/views/ingesta.js`, `js/app.js`.
> ⚠️ El mock **local** (`frontend/`, submódulo `igualab-mock`) estaba **desactualizado** y su submódulo fue **retirado del vault** (2026-09-21). La fuente viva es el mock desplegado <https://igualab.vercel.app/>; si se necesita el código, re-agregar el submódulo desde su repo.

- **Sector = enum cerrado de 3** → `DB.sectores = ["Minería", "Petróleo y Gas", "Energía"]`. **No se crean sectores** (ni tabla ni endpoint).
- **Empresa** = `{ id, nombre, sector, activa }`. El **sector es atributo de la empresa**.
- **Alta de empresa** (`empresaForm`): campos **Nombre** + **Sector** (select de 3) → `push({ id, nombre, sector, activa: true })`.
- **Ingesta** (`ingestionView`): **Sector** (select 3) → **Empresa** (select que se rellena con las empresas *de ese sector* y activas) → **Año** → **Tipo** → archivo **`.md` ≤ 50 MB**.
- **`documentos` NO duplica `sector`**: se deriva de la empresa.

**Consecuencia para la redacción:** el flujo correcto es `sector → empresa(del sector) → año → tipo` (no “empresa jala sector”). Ajustar RF-017 y RF-037 en consecuencia.
