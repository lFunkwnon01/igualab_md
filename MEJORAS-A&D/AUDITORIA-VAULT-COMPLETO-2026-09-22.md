# 🗂️ Auditoría integral del Vault — Igualab

> **Fecha:** 2026-09-22 · **Alcance:** todo el vault `igualab/` (navegación, A&D, FASE 1, gobernanza, recursos, desarrollo, higiene de Git y graphify).
> **Contexto:** el A&D V2 (LaTeX) **ya fue enviado** (≈96 % de aceptación reportado). Esta auditoría mira el **estado global del vault y su consistencia interna**.
> **Documento estrella:** A&D V2 → `01-Mockups-y-Propuestas/analisis-diseno-latex/analisis_y_diseno_oficial.pdf` (71 págs).

## Salud global: **≈ 86 %**

| Área | Estado | Nota |
|---|:---:|:---:|
| Navegación / índice (`📌 Inicio.md`) | 🟡 | 70 % |
| A&D V2 (LaTeX) | 🟢 | 95 % |
| FASE 1 (análisis/diseño interno) | 🟡 | 82 % |
| Consistencia A&D ↔ FASE 1 ↔ repos | 🔴 | 65 % |
| Gobernanza (actas/stakeholders) | 🟢 | 92 % |
| Recursos / prototipo | 🟡 | 85 % |
| Desarrollo / infraestructura | 🟢 | 90 % |
| Higiene de Git | 🟡 | 70 % |
| Graphify | 🔴 | 55 % (desactualizado) |

---

## 1 · Navegación e índice — 🟡

**`📌 Inicio.md`** está bien redactado, pero tiene **datos desactualizados**:
- **1.1 Ruta rota:** apunta a `01-Mockups-y-Propuestas/analisis_y_diseno_oficial.pdf`, pero el PDF está en `01-Mockups-y-Propuestas/**analisis-diseno-latex/**analisis_y_diseno_oficial.pdf`.
- **1.2 Auditoría desactualizada:** enlaza `MEJORAS-A&D/AUDITORIA-RN-RF-RNF-2026-09-21.md`; ya existen `AUDITORIA-A&D-V2-2026-09-22.md` (vigente) y las del 18/09.
- **1.3 CU incompletos:** la línea de numeración CU lista **CU001…CU007**; el A&D vigente tiene **CU001…CU008** (CU008 = Catálogo de Empresas).
- **1.4 Fecha:** «Última actualización: 21/09», pero el A&D V2 y las actas 7 son del **22/09**.
- **1.5 Mapa incompleto:** no menciona los nuevos `FASE 1/02-Arquitectura-de-Solucion/06-Diseño-Arquitectonico.md` ni `06-Modelo-de-Datos-Informe.md`.
- **Acción:** corregir ruta, enlazar la auditoría V2, completar CU001–CU008, actualizar fecha y el mapa.

---

## 2 · A&D V2 (LaTeX) — 🟢

- Cubre **13 secciones**, 45 RN (plantilla), 30 RF (atómicos + analista), 30 RNF (categorizados), CU001–CU008, secuencias, modelo/diccionario reales, volumen, arquitectura, prototipo y anexo.
- **Hallazgos abiertos** (ver `AUDITORIA-A&D-V2-2026-09-22.md`): sectores sin «Gas» en 3 lugares, CU008 sin ficha ni secuencia, RN-007/010/012/015/026 con plantilla incompleta, tensión RNF-016/017/018, falta «fuera de alcance», SOLID/vistas por profundizar.

---

## 3 · Consistencia A&D ↔ FASE 1 ↔ repos — 🔴 (lo más grave)

El A&D **oficial** y los docs internos **no coinciden** en puntos técnicos clave:

| Punto | A&D V2 (oficial, enviado) | FASE 1 (interno) | ¿Conflicto? |
|---|---|---|---|
| **Nº de bases de datos** | **2 bases** PostgreSQL (12 transaccional + 1 vectorial) | **1 base** PostgreSQL 16 + pgvector (13 tablas) — `02-Base`, `06-Modelo`, `01-Arquitectura` | 🔴 **Sí** |
| **Tabla de fragmentos** | `fragmentos_documento` (BD vectorial) | `documento_vector` / `fragmentos` (`01-Arquitectura`) vs `fragmentos_documento` (`02-Base`) | 🟡 nombres |
| **Auditoría** | `auditoria` | `auditoria_eventos` (`01-Arquitectura`) | 🟡 nombres |
| **Reportes** | `reportes_prospeccion` | `reportes_prosperacion` (`06-Diseño-Arquitectonico` D-06) | 🟡 typo |
| **Medidor LLM** | **retirado** del modelo («se quitó el medidor LLM separado») | `uso_llm` sigue citado (`01-Arquitectura`) | 🔴 **Sí** |
| **Python** | **3.13** | **3.11** (stack, arquitectura, 06-Diseño) | 🟡 |
| **Puntaje ESG** | FASE 1 (RN-032) | «fase 2» (`06-Diseño-Arquitectonico` D-04) | 🔴 **Sí** |

> **Riesgo:** como el A&D ya se envió, conviene **decidir la versión canónica** (1 o 2 BD; Python 3.11 o 3.13; `uso_llm` sí/no) y **propagarla** a `FASE 1/` y a los repos, o documentar la desviación.

---

## 4 · FASE 1 (análisis/diseño interno) — 🟡

- **4.1 Numeración duplicada:** en `02-Arquitectura-de-Solucion/` hay **dos archivos «06»** (`06-Diseño-Arquitectonico.md` y `06-Modelo-de-Datos-Informe.md`). El `README` no los lista.
- **4.2 `06-Diseño-Arquitectonico.md` desordenado:** dice «**7 capas**» pero la tabla lista **6**; **numeración repetida** (`1.4` dos veces, `1.2` tras `1.4`, `1.IZ Desplegar`); estado «**Borrador para validación**»; contradice FASE 1 (ESG fase 2, «motor determinista» de brechas vs estado 100 % manual).
- **4.3 `06-Modelo-de-Datos-Informe.md`:** referencia «**A&D v6**» (obsoleto; el vigente es V2 LaTeX).
- **4.4 Solapamiento:** `02-Base-de-Datos…` y `06-Modelo-de-Datos-Informe.md` cubren el mismo modelo (23 KB vs 21 KB) → riesgo de duplicidad/deriva.
- ✅ Lo bueno: RN/RF/RNF y diccionario ya replican la numeración del A&D V2 (45/30/30, 13 tablas).

---

## 5 · Gobernanza — 🟢

- `21 Actas de Reunión y Acuerdos.md` ya incluye el **Acta 7 (CS3081-007-2026, 21-09)** con REQ-24/25, y los archivos `CS3081-007-2026_Acta_Reunion7.pdf/.tex`.
- `11 Stakeholders` y `23 Guía de Actas` coherentes con la nomenclatura `CS3081-00N-2026_Acta_ReunionN`.
- **Mejora:** la tabla de REQ tiene IDs «tentativos» (REQ-21/22/23 «por registrar») — cerrarlos tras el acta 7.

---

## 6 · Recursos y prototipo — 🟡

- `diseno/` (Stitch) conserva **numeración CU antigua** (auditoría=CU004, ingesta=CU005) frente al A&D (auditoría=CU007). Ya se declara «histórico» en Inicio, pero puede inducir a error; considerar renombrar las carpetas o un `README` dentro de `diseno/`.
- Mock vivo: `https://igualab.vercel.app/` (fuente del prototipo). ✅
- `02-Recursos-Media` y `03-Transcripciones` presentes; media pesada fuera de Git. ✅

---

## 7 · Desarrollo / infraestructura — 🟢

- `06-Desarrollo/INFRAESTRUCTURA-Y-FLUJO-GIT.md` correcto (FE/BCK, `development→qa→uat→main`, Jenkins).
- Submódulos `FE-IGUALAB` y `BCK-IGUALAB` en `development`. ✅
- **Mejora:** verificar que el backend refleje el modelo de 13 tablas y el Python decidido.

---

## 8 · Higiene de Git — 🟡

- **8.1 Cambios sin commitear/push:** **29 entradas** pendientes (A&D LaTeX, FASE 1, actas 7, Inicio, etc.). El vault en GitHub está **desincronizado**.
- **8.2 Archivo basura en la raíz:** `diagrama_secuencia_CU5.jpeg` (duplicado de `analisis-diseno-latex/img/diagrama-secuencia-CU005.jpeg`).
- **8.3 Artefactos de build LaTeX versionados:** `main.aux`, `main.log`, `main.fls`, `main.xdv`, `main.toc`, `main.out`, `main.fdb_latexmk`, `.s01-06.tex.kate-swp`. **Falta** en `.gitignore`: `*.aux *.log *.fls *.xdv *.toc *.out *.fdb_latexmk *.swp`.
- **8.4 Obsoletos en raíz:** `AUDITORIA-ANALISIS-Y-DISENO.md` (18/09) superado por `MEJORAS-A&D/` → mover a `99-Archivo/`.
- ✅ `.gitignore` ya excluye `software_pdf/`, media pesada y `graphify-out/`.

---

## 9 · Graphify — 🔴

- El grafo `graphify-out/` se construyó **antes** de la V2 y de las actas 7 → **desactualizado**.
- `.graphifyignore` modificado sin commitear.
- **Acción:** re-ejecutar `--update` con el vault actual (A&D LaTeX, FASE 1, actas 7) y limpiar nodos obsoletos.

---

## 10 · Vacíos del vault (no están, quizá deberían)

- **Plan de pruebas / casos de prueba** (el acta y el plan lo mencionan: «Plan de Prueba y Casos de Prueba») — no hay documento en el vault.
- **Matriz de trazabilidad global** — existe solo dentro del anexo del A&D (ok, pero podría ser un `.md` propio).
- **Cronograma/sprints** — está en el Plan (PDF), no como `.md` navegable.

---

## Priorización

| P | Acción | Dónde |
|---|---|---|
| P0 | **Resolver 1 vs 2 bases de datos** (A&D dice 2; FASE 1 dice 1) y propagar | §3 · A&D/FASE1 |
| P0 | Decidir **Python (3.11 vs 3.13)** y `uso_llm` (existe o no) | §3 |
| P0 | Corregir **ruta del PDF** en Inicio + enlazar auditoría V2 + CU001–CU008 | §1 |
| P1 | Limpiar `06-Diseño-Arquitectonico.md` (capas, numeración, estado, ESG fase 2) | §4 |
| P1 | Unificar nombres (`fragmentos_documento`, `auditoria`, `reportes_prospeccion`) | §3 |
| P1 | `.gitignore` LaTeX + borrar `diagrama_secuencia_CU5.jpeg` de raíz | §8 |
| P1 | **Commit + push** de los 29 cambios | §8 |
| P2 | Actualizar **graphify** con el vault vigente | §9 |
| P2 | Archivar `AUDITORIA-ANALISIS-Y-DISENO.md`; unificar `06-*` de arquitectura | §4/§8 |
| P2 | README dentro de `diseno/` aclarando numeración antigua | §6 |

---

## Conclusión

El vault está **maduro y bien estructurado**; el A&D V2 es sólido (de ahí el ~96 %). El riesgo principal **no es de contenido sino de consistencia**: el A&D oficial ya enviado dice **2 bases de datos** y **Python 3.13**, mientras el material interno dice **1 base** y **Python 3.11**, y hay nombres de tablas divergentes. Cerrar esas diferencias y sincronizar Git/graphify es lo que subiría el vault del ~86 % al ~95 %.
