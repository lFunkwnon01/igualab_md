# Auditoría del A&D — versión 18/09/2026

> ⚠️ **DOCUMENTO HISTÓRICO.** Auditó el PDF con sha256 `d7ac8e95…` (18/09). El A&D vigente es del **20/09/2026** (sha256 `1663a85f…`): ya trae modelo (13 tablas), diccionario de Igualab, volumen y glosario. Las fallas sobre las secciones **8, 9 y 10** y «14 tablas» **ya no aplican**; siguen vigentes las de **3, 4, 5, 7.1, 7.2, 7.3, 7.4, 7.5, 11, 12 y 13**.

> **Documento auditado:** `01-Mockups-y-Propuestas/Análisis y Diseño - Igualab.pdf`
> **sha256:** `d7ac8e95bd76bb59cc016d2e606743d891639140a3cb0f21da17ef1db95a5ba5` · **44 págs** · export 18/09 00:57.
> **Referencia:** estructura oficial (1–13) + Plan v1.2 + actas 4/5 + repos FE/BCK-IGUALAB + mock.

## ✅ Cambios ya logrados (respecto a la versión previa)
- **CU007 (Bolsa) eliminado** y **Auditoría renumerada a CU007**.
- Se **agregaron encabezados** de secciones **10, 11, 12 y 13** (aún vacíos).
- La numeración del cuerpo ya queda **7.1–7.5** (sin el desfase «6.x»).

---

## 3 · ALCANCE DEL PROYECTO (p. 7)
- **Falla 3.1 — No declara el "fuera de alcance".** No se dice en ningún punto que quedan fuera FASE 1: Bolsa de Valores, LinkedIn, dashboards y chatbot/portal.
- **Mejora:** añadir una tabla **«Fuera del alcance FASE 1»** (acta 5): dashboards → fase 2 (REQ-19), Bolsa (REQ-16), LinkedIn (REQ-17), chatbot inclusivo/vocal (fase 2).

## 4 · DISEÑO FUNCIONAL DETALLADO (pp. 6-7)
- **Falla 4.1 — Sectores incompletos:** dice «Minería, **Petróleo y Energía**» → debe ser «Minería, **Petróleo y Gas**, y Energía» (RN-019).
- **Falla 4.2 — Vigencia del enlace de recuperación:** dice «recuperación de contraseña por enlace temporal… (**vigencia de 2 horas**)». El enlace de recuperación es de **30 minutos** (RF-002); las **2 horas** son de **inactividad de sesión** (RN-036/RF-005). Están mezclados.
- **Falla 4.3 — Sin modularización (SOLID):** son 8 módulos funcionales pero no se mapean a servicios/componentes ni se justifica SRP/interfaces (requisito del curso).
- **Falla 4.4 — Sin trazabilidad:** el diseño funcional no referencia **CU ↔ RF ↔ RN ↔ RNF**.
- **Mejora:** ver propuesta `MEJORAS-A&D/04-Diseno-Funcional-Detallado.md` (ya incluye SOLID, matriz y flujos).

## 5 · DIAGRAMA DEL PROCESO (pp. 9-10)
- **Falla 5.1 — Estructura incorrecta.** Hoy: `5.1 Diagrama del proceso actual (AS IS)`, `5.2 Problemas identificados`, `5.3 Diagrama del proceso actual (AS IS)` (título **repetido**), `5.4 Brechas identificadas`. La estructura oficial pide:
  - **5.1 Integración entre los sistemas de la empresa**
  - **5.2 Interoperación con sistemas externos vinculados con la empresa**
- **Falla 5.2 — Sin diagramas reales:** 5.1/5.3 son solo títulos (el contenido del proceso está en un enlace a Miro); no hay AS-IS ni TO-BE incrustados.
- **Mejora:** renumerar y redactar **5.1 integración interna** (FE↔API↔BD↔almacenamiento) y **5.2 interoperación externa** (proveedor de IA/embeddings, correo, BVL), e incorporar AS-IS y TO-BE.

## 6 · REGLAS DE NEGOCIO (pp. 11-14)
- **Falla 6.1 — Sectores duplicados:** RN-017 y RN-019 repiten la restricción de sectores (candidatas a fusionar).
- **Falla 6.2 — Falta la RN del límite de 50 MB** (la requiere RNF-014).
- **Falla 6.3 — RN-026 incompleta:** termina «…se conserva permanentemente en el sistema **en .**».
- **Falla 6.4 — RN-036 vaga:** «por un tiempo determinado» sin cuantificar → debe decir **2 horas**.
- **Mejora:** numerar RN temporal/50 MB, completar RN-026 y cuantificar RN-036.

## 7.1 · ACTORES (p. 15)
- **Ojo:** confirmar que solo figuran **SuperAdmin, Administrador** (+ externos: IA/LLM y BVL) y que **no** aparece el rol «Usuario».

## 7.2 · DIAGRAMA DE CASO DE USO Y ESPECIFICACIÓN (pp. 16-33)
- **Falla 7.2.1 — Índice desalineado:** el **TOC (p. 3)** lista `CU008: Auditoría`, pero el **listado y la ficha** usan **CU007: Auditoría**. Falta actualizar el TOC.
- **Falla 7.2.2 — CU005 (Detección de Brechas, pp. 26-27):**
  - El **Flujo Básico aún se titula «Administración de cuentas»** (residuo de la copia de CU002).
  - **Contradicción de fondo:** dice que el sistema **compara contra el estándar** y **determina el estado y la severidad**, con estados **`OK / DÉBIL / AUSENTE`** y severidad **`ALTA/MEDIA/BAJA`**. Esto **contradice** RN-016 (3 estados **manuales**: `OK`, `Baja sustancia`, `Sub-reportado`) y el módulo 5 (el sistema **no infiere ni calcula**).
  - Precondición introduce «documento indexado y **validado**» (validación que no existe en el diseño).
- **Falla 7.2.3 — CU006 (Generación de Reportes, pp. 28-29):**
  - Precondición dice **«El SuperAdmin debe haber iniciado sesión»** → debe ser **Administrador**.
  - **Flujo Alternativo, Post Condiciones y Restricciones siguen copiados de CU002** (correo ya registrado, habilitar/deshabilitar, transferencia de rol…).
  - Typos: «El **Administr** accede…», «prospección**..**».
- **Falla 7.2.4 — CU003 (Ingesta, pp. 24-25):** ficha **incompleta**: no menciona **50 MB**, tablas de **pipes**, **tipo real**, **SHA-256/duplicado**, **observado vs rechazado**, **rollback** ni que el **análisis GRI corre como último paso**.
- **Falla 7.2.5 — CU004 (Asistente, pp. 27):** typos «**agende** de IA», «en la **módulo**»; falta declarar el **alcance restringido de dominio** y el **timeout**.
- **Falla 7.2.6 — «CU padre»:** casi todos cuelgan de **CU001** (no representa relaciones reales); solo CU005←CU003 y CU006←CU005 son dependencias reales.
- **Falla 7.2.7 — Prototipos:** no todos los CU tienen prototipo (CU003 sin prototipo; CU005/CU006 sin prototipo).

## 7.3 · DIAGRAMA DE SECUENCIA (pp. 34-35) — 🔴 GRAVE
- **El contenido NO es un diagrama de secuencia.** Es la **especificación duplicada de CU001** (actores, precondiciones y flujo de 21 pasos) que venía de la antigua sección «6.3».
- **Reintroduce el rol «Usuario»:** «(SuperAdmin, Administrador y **Usuario**)» y «**dashboard de solo lectura para Usuario**» → fuera de alcance.
- **Desalineación de título:** el **TOC** dice `7.3 ESPECIFICACIÓN DE CASOS DE USO`; el **cuerpo** dice `7.3 DIAGRAMA DE SECUENCIA`.
- **Mejora:** **borrar** ese contenido duplicado y colocar **diagramas de secuencia reales** por CU (al menos: autenticación, ingesta, consulta RAG, generación de reporte).

## 7.4 · REQUERIMIENTOS FUNCIONALES (pp. 36-39)
- **Falla 7.4.1 — Faltan RF del pipeline RAG:** chunking, embeddings por API y almacenamiento vectorial.
- **Mejora:** agregar los RF de pipeline y revisar la derivación RF↔RN.

## 7.5 · REQUERIMIENTOS NO FUNCIONALES (pp. 40-42)
- **Falla 7.5.1 — RNF-026:** «conserve el **rol declarado**» **contradice RF-050** («aplicar el rol **vigente**»).
- **Falla 7.5.2 — RNF-032:** «impedir generar un mismo reporte **más de una vez**» choca con el reporte **determinista/regenerable** y con la sección de reportes visibles (RF-056).
- **Falla 7.5.3 — Trazabilidad («Deriva de») equivocada:**
  - RNF-017 → debe derivar de **RF-054/RN-039** (hoy RF-027, RF-033).
  - RNF-023 → debe derivar de **RF-022** (hoy RF-029).
  - RNF-021 → debe derivar de **RN-029** (hoy RN-030).
  - RNF-020 → debe derivar de **RN-022** (hoy RN-023).
  - RNF-014 → no hay RN del límite; quitar RN-012/RF-021.
  - RNF-022 → quitar **RN-019** (es solo RN-018).

## 8 · MODELO DE DATOS (p. 43) — 🔴 VACÍO
- Solo existe el encabezado; **no hay ER**. Insertar el **ERD real de Igualab (14 tablas)** cuando se congele la versión de la BD.

## 9 · DICCIONARIO DE DATOS (pp. 43-44) — ⛔ CONTENIDO AJENO
- Contiene tablas de un proyecto **inmobiliario**: `proyecto`, `torre`, `piso`, `activo`, `hito`, `hito_piso` (EDGE/LEED, recorrido virtual, departamentos/cocheras). **No corresponde a Igualab.**
- **Mejora:** reemplazar por el diccionario de las **14 tablas** de Igualab (usuarios, roles, empresas, documentos, chunks_embeddings, catalogo_gri, gri_analisis, gri_analisis_historico, sanciones, reportes_generados, auditoria_eventos, uso_llm, configuracion + …), en espera de la versión final de la BD.

## 10-13 · SECCIONES VACÍAS (p. 44)
- **10 · VOLUMEN ESTIMADO:** encabezado sin contenido.
- **11 · DISEÑO ARQUITECTÓNICO:** encabezado sin contenido.
- **12 · PROTOTIPO:** encabezado sin contenido.
- **13 · ANEXO:** encabezado sin contenido.
- **GLOSARIO DE TÉRMINOS (p. 4):** encabezado **vacío**.

---

## Priorización sugerida
| P | Corrección | Sección |
|---|---|---|
| P0 | Reemplazar contenido de **7.3** por diagramas de secuencia reales; borrar duplicado CU001 y rol «Usuario» | 7.3 |
| P0 | Corregir contradicción de **CU005** (estados/severidad automáticos vs RN-016) y su título «Administración de cuentas» | 7.2 |
| P0 | Corregir **CU006** (precondición SuperAdmin, flujo copiado de CU002) | 7.2 |
| P0 | Reemplazar **diccionario inmobiliario** y llenar **modelo de datos** | 9 / 8 |
| P0 | Reestructurar **5.1/5.2** (integración interna / interoperabilidad externa) | 5 |
| P1 | TOC: **CU008→CU007** y título de **7.3** | Índice |
| P1 | **4**: sectores con «Gas» y enlace de recuperación 30 min (no 2 h) | 4 |
| P1 | **7.5**: RNF-026, RNF-032 y trazabilidad | 7.5 |
| P1 | **6**: RN duplicadas, RN 50 MB, RN-026, RN-036 | 6 |
| P2 | Completar **CU003/CU004**, prototipos y **10-13** + glosario | varios |
