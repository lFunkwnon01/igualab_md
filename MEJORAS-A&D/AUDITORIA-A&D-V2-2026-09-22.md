# 🔍 Auditoría completa — A&D Igualab V2 (LaTeX)

> **Documento auditado:** `01-Mockups-y-Propuestas/analisis-diseno-latex/` (fuentes `.tex`) → `analisis_y_diseno_oficial.pdf` (71 págs, compilado 22/09/2026 23:41).
> **Versión:** V2 (22/09/2026) · Historial de versiones incluido.
> **Criterio:** estructura oficial 1–13 · guías del curso `software_pdf/` (T2 Requerimientos, T4 Use Cases, T5 Arquitectura, T6 Diseño) · Plan v1.2 · mock `igualab.vercel.app` · repos FE/BCK.
> **Base:** reemplaza a las auditorías del 18/09 y 21/09 (ya superadas por la V2).

---

## Resumen ejecutivo

| # | Sección | Estado |
|---|---------|:------:|
| 1 | Antecedentes | ✅ |
| 2 | Objetivo general | ✅ |
| 3 | Alcance | 🟡 |
| 4 | Diseño funcional detallado | 🟡 |
| 5 | Diagrama del proceso (5.1/5.2) | ✅ |
| 6 | Reglas de negocio (45 RN) | 🟡 |
| 7.1 | Actores | ✅ |
| 7.2 | CU y especificación | 🟡 |
| 7.3 | Diagrama de secuencia | 🟡 |
| 7.4 | Requerimientos funcionales (30) | ✅ |
| 7.5 | Requerimientos no funcionales (30) | 🟡 |
| 8 | Modelo de datos | 🟡 |
| 9 | Diccionario de datos | ✅ |
| 10 | Volumen estimado | ✅ |
| 11 | Diseño arquitectónico | 🟡 |
| 12 | Prototipo | ✅ |
| 13 | Anexo | ✅ |

**Veredicto:** la V2 es un salto enorme — cubre las 13 secciones, RN con plantilla, RF atómicos con analista, RNF categorizados, modelo/diccionario reales, volumen, arquitectura, prototipo y anexo. Los hallazgos restantes son **de consistencia y de profundidad**, no de ausencia.

---

## Hallazgos por sección

### 3 · Alcance — 🟡
- **3.1 — No declara "fuera de alcance FASE 1".** Solo define los 2 roles. Falta explicitar: sin Bolsa de Valores, sin LinkedIn, dashboards → fase 2, portal público/chatbot → fase 2.
- **Acción:** añadir subsección «Fuera del alcance de FASE 1» con las referencias de acta 5 (REQ-16/17/19).

### 4 · Diseño funcional detallado — 🟡
- **4.1 — Sectores incompletos (recurrente):** el Módulo 3 dice «Minería, **Petróleo y Energía**» → debe ser «Minería, **Petróleo y Gas**, y Energía».
- **4.2 — Sin justificación de modularidad (SOLID).** El documento dice «monolito modular» y lista 8 módulos, pero **no explica cohesión, acoplamiento ni principios SOLID** — criterio central de la clase T6. Falta una subsección que justifique la descomposición (SRP por módulo, interfaces, inyección de dependencias).
- **4.3 — Solapamiento de rangos en la matriz:** el Módulo 1 cubre «RN-004…RN-013» y el Módulo 2 «RN-001…RN-009» → **RN-004…RN-009 se cuentan en ambos** (autenticación vs usuarios). Precisar los rangos.
- ✅ Lo bueno: matriz módulo ↔ CU ↔ RF ↔ RN ↔ RNF ya presente.

### 5 · Diagrama del proceso — ✅
- **5.1 Integración entre los sistemas de la empresa** y **5.2 Interoperación con sistemas externos** ya coinciden con la estructura oficial. Incluye AS-IS, TO-BE, externos (IA/embeddings, SMTP, BVL) y las figuras.
- **Mejora menor:** 5.1 describe el **AS-IS manual** (no hay integración interna hoy); conviene titular el contenido para que no se confunda «integración interna» con «proceso actual».

### 6 · Reglas de negocio (45 RN) — 🟡
- **6.1 — Plantilla incompleta en 5 RN:** **RN-007, RN-010, RN-012, RN-015 y RN-026** solo tienen `SI…ENTONCES` y **les falta** `SE APLICA A… / SE BASA EN… / Y TIENE LA SIGUIENTE EXCEPCIÓN`. (El resto sí cumple.)
- **6.2 — Sectores (recurrente):** RN-015 dice «Minería, **Petróleo, o Energía**» → falta **Gas**.
- **6.3 — RN con detalle de implementación (viola "libre de implementación"):**
  - RN-026 menciona «**FastAPI** coordina la reversión… **base vectorial**».
  - RN-031 menciona representación de datos («valor **nulo** y nunca cero»).
- **6.4 — Proporción ✅:** RN(45) > RF(30) y > RNF(30). Cumple la regla del profesor.
- **Mejora:** completar las 5 RN y despojar las RN de decisiones técnicas.

### 7.1 · Actores — ✅
- SuperAdmin, Administrador, Proveedor de IA (externo), Servicio de correo (externo). Coherente (la BVL queda como fuente de datos, no como actor).

### 7.2 · Casos de uso — 🟡
- **7.2.1 — CU008 sin ficha.** El listado incluye **CU008 «Gestión del Catálogo de Empresas»**, pero **no tiene especificación** (las fichas van de CU001 a CU007). O se le agrega ficha o se explica su ausencia.
- **7.2.2 — Typos:** CU001, Flujo Alternativo: «Bloquea el acceso y muestra ``Usuario deshabilitado''. Contacte al administrador.''» (comillas sobrantes).
- ✅ Lo bueno: CU005 y CU006 ya **no** están copiados de CU002; CU003 está completo; el rol «Usuario» ya no aparece en las fichas; los «CU padre» ahora son coherentes.

### 7.3 · Diagrama de secuencia — 🟡
- **7.3.1 — Falta la secuencia de CU008** (Catálogo de Empresas): hay 7 diagramas (CU001–CU007) y **ninguno para CU008**.
- **7.3.2 — Formato heterogéneo:** casi todos son `.png` (`im-034-033.png`, …) pero CU005 usa `diagrama-secuencia-CU005.**jpeg**`. Homogeneizar.

### 7.4 · Requerimientos funcionales (30) — ✅
- Atómicos, con **varias RN** por RF, **prioridad** (MUST/NICE) y **columna Analista**. Cumple la guía.
- **Mejora menor — derivaciones discutibles:** RF-016 (indexar) deriva de RN-018/RN-025 (RN-025 es «contenido mínimo/observado»); RF-017 deriva de RN-026 (integridad). Revisar el mapeo.
- **Mejora menor — atomicidad:** RF-024 combina «citas» + «dominio restringido»; podría dividirse.

### 7.5 · Requerimientos no funcionales (30) — 🟡
- ✅ Categorizados (Seguridad, Integridad, Rendimiento, Disponibilidad, Capacidad, Trazabilidad, Mantenibilidad, Usabilidad, Continuidad) con «Deriva de» coherente.
- **7.5.1 — Tensión de tiempos:** **RNF-018** fija el timeout del proveedor de IA en **1 minuto**, pero **RNF-017** admite una respuesta del asistente de hasta **90 s** (> 1 min). Si la llamada expira a los 60 s, no puede haber respuesta de 90 s. Alinear.
- **7.5.2 — Usuarios concurrentes:** RNF-017 asume «**5 usuarios concurrentes**», pero el alcance es de **3 usuarios** (1 SuperAdmin + 2 Administradores). Ajustar.
- **7.5.3 — Ingesta 50 MB en ≤ 15 min** (RNF-016): revisar si es coherente con el diseño síncrono y con la experiencia de usuario (antes se manejaba < 120 s).

### 8 · Modelo de datos — 🟡
- ✅ Ahora es real: **12 tablas transaccionales + 1 vectorial = 13**, con ERD, relaciones físicas/lógicas y referencias UUID.
- **8.1 — Divergencia con el resto del proyecto:** la V2 decide **dos bases PostgreSQL separadas** (transaccional + vectorial) y nombres de tabla nuevos (`sesiones`, `tokens_recuperacion`, `consultas_asistente`, `consulta_citas`, `reportes_prospeccion`, `auditoria`, `fragmentos_documento`). Los docs de `FASE 1/02-Arquitectura-de-Solucion/` y los repos pueden seguir con **un solo PostgreSQL + pgvector y otras tablas** (`chunks_embeddings`, `gri_analisis_historico`, `uso_llm`, `configuracion`). **Sincronizar** modelo A&D ↔ BD implementada.
- **Mejora:** confirmar que el backend (`BCK-IGUALAB`) refleja estas 13 tablas; si no, alinear o documentar la desviación.

### 9 · Diccionario de datos — ✅
- ✅ Reemplazado el contenido inmobiliario ajeno por las **13 tablas reales de Igualab**, campo a campo, con reglas semánticas y REF lógicas. Coherente con la sección 8.

### 10 · Volumen estimado — ✅
- ✅ Tabla por módulo con volúmenes, nivel y justificación (42 documentos, 4 200 fragmentos, ~420 consultas, etc.). Coherente con RNF-017.

### 11 · Diseño arquitectónico — 🟡
- **11.1 — Poco desarrollado para el peso que le da el curso (T5/T6).** Es un párrafo + una imagen. Falta:
  - **Vistas arquitectónicas** (lógica, física, datos, integración, seguridad) que pide T5.
  - Cómo los **RNF guían la arquitectura** (seguridad, escalabilidad, disponibilidad, rendimiento, trazabilidad).
  - **Modularidad/cohesión/acoplamiento/SOLID** (T6).
- ✅ Lo bueno: define niveles (frontend/API/servicios/procesos/datos), stack y la separación de bases.

### 12 · Prototipo — ✅
- ✅ Menciona las pantallas por rol y el enlace al mock desplegado.

### 13 · Anexo — ✅
- ✅ Incluye «Problemas identificados del proceso actual (AS-IS)» y la **matriz de trazabilidad** (módulo · CU · RF · RN · RNF).

---

## Hallazgos transversales

1. **Sectores incompletos (3 lugares):** `s01-06.tex` (Módulo 3), `rn.tex` (RN-015) y `glosario.tex` dicen «Petróleo y Energía» → debe ser **«Minería, Petróleo y Gas, Energía»** (así está en el mock y en `Inicio.md`). Es la errata más repetida.
2. **Consistencia A&D ↔ FASE 1 ↔ repos:** el A&D V2 redefine el modelo de datos (2 BD, 13 tablas) y varios tiempos; verificar que `FASE 1/` y el backend/frontend se actualicen o se documente la desviación.
3. **Artefactos de build en git:** están versionados `main.aux`, `main.log`, `main.fls`, `main.xdv`, `main.toc`, `main.out`, `main.fdb_latexmk` y `.s01-06.tex.kate-swp`. Añadir a `.gitignore` (`*.aux`, `*.log`, `*.fls`, `*.xdv`, `*.toc`, `*.out`, `*.fdb_latexmk`, `*.swp`).
4. **Glosario:** el término «Sectores habilitados» repite el error de sectores.

---

## Priorización

| P | Corrección | Sección |
|---|---|---|
| P0 | Unificar sectores → «Minería, Petróleo y Gas, Energía» (3 lugares) | 4 · 6 · Glosario |
| P0 | Agregar ficha + secuencia de **CU008** (o justificar su ausencia) | 7.2 · 7.3 |
| P0 | Sincronizar modelo de datos (2 BD / 13 tablas) con FASE 1 y repos | 8 |
| P1 | Completar plantilla de **RN-007, 010, 012, 015, 026** | 6 |
| P1 | Alinear **RNF-016/017/018** (90 s vs 60 s; 5 vs 3 usuarios; 15 min) | 7.5 |
| P1 | Añadir **«Fuera de alcance FASE 1»** | 3 |
| P1 | Ampliar **Diseño arquitectónico** con vistas + RNF + SOLID | 11 |
| P1 | Añadir justificación **SOLID/modularidad** | 4 · 11 |
| P2 | Quitar detalle de implementación de **RN-026/RN-031** | 6 |
| P2 | Revisar derivaciones **RF-016/017**, atomicidad **RF-024** | 7.4 |
| P2 | `.gitignore` de artefactos LaTeX; typos CU001; homogeneizar imágenes | varios |

---

## Criterios del curso verificados
- **T2 (Requerimientos):** RF atómicos, verificables, con prioridad y trazabilidad a RN → ✅ (salvo derivaciones puntuales).
- **T4 (Use Cases):** fichas con descripción, actores, precondiciones, flujo básico/alternativo, postcondiciones, restricciones → ✅ (falta CU008).
- **T5 (Arquitectura):** vistas y relación RNF→arquitectura → 🟡 (por profundizar).
- **T6 (Diseño):** modularidad, abstracción, acoplamiento, cohesión, SOLID → 🟡 (menciona monolito modular, falta justificación).
- **Regla de proporción:** RN(45) > RF(30) y > RNF(30) → ✅.
