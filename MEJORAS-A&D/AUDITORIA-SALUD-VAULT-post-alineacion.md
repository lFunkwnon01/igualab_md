# 🩺 Auditoría de salud del Vault — post-alineación A&D V2

> **Alcance:** todo el vault `igualab/` tras la alineación al A&D V2 y la limpieza.
> **Estado Git:** limpio · `main` = `origin/main` · commit `14f0c11`.

## Salud global: **≈ 92 %** (antes ≈ 86 %)

| Área | Antes | Ahora | Nota |
|---|:---:|:---:|:---:|
| Navegación / índice | 70 % | 🟢 **95 %** | rutas y CU corregidos |
| A&D V2 (LaTeX) | 95 % | 🟢 **96 %** | sectores y RN corregidos, PDF recompilado |
| FASE 1 (interno) | 82 % | 🟢 **92 %** | alineado a 2 BD, Python 3.13, nombres canónicos |
| Consistencia A&D ↔ FASE 1 ↔ repos | 65 % | 🟢 **90 %** | 1 vs 2 BD resuelto (backend confirma 2) |
| Gobernanza (actas) | 92 % | 🟢 **92 %** | acta 7 al día; quedan REQ tentativos |
| Recursos / prototipo | 85 % | 🟡 **85 %** | `diseno/` con numeración CU antigua |
| Desarrollo / infra | 90 % | 🟢 **90 %** | submódulos en `development` |
| Higiene de Git | 70 % | 🟢 **95 %** | limpio, artefactos fuera, basura borrada |
| Graphify | 55 % | 🟡 **70 %** | actualizado, pero **no indexa el A&D V2** |

---

## ✅ Lo que se corrigió (verificado)

- **Nombres obsoletos: 0.** Ya no hay `uso_llm`, `auditoria_eventos`, `chunks_embeddings`, `documento_vector`, `reportes_generados`, `reportes_prosperacion`, `gri_analisis_historico`, `Python 3.11` ni «A&D v6» en el material vigente.
- **Sectores:** «Minería, Petróleo y Gas, Energía» en todo el material vigente (el A&D V2 y FASE 1). Solo aparece la errata en los docs de auditoría que la describen.
- **2 bases PostgreSQL** (`DATABASE_URL` + `VECTOR_DATABASE_URL`) de forma consistente; **ningún** doc dice «una base».
- **A&D V2:** 3 sectores corregidos y **las 45 RN con plantilla completa** (RN-007/010/012/015/026 ya incluyen `SE APLICA / SE BASA / EXCEPCIÓN`); PDF recompilado.
- **Numeración CU unificada** (CU001 auth · CU002 usuarios · CU003 ingesta · CU004 IA · CU005 brechas · CU006 reportes · CU007 auditoría · CU008 catálogo) en el A&D y en FASE 1.
- **Higiene:** `diagrama_secuencia_CU5.jpeg` (raíz) y los artefactos LaTeX (`main.aux/.log/.fls/.xdv/.toc/.out/.fdb_latexmk`, `.kate-swp`) eliminados y **gitignorados**. Auditoría obsoleta archivada.
- **Git:** árbol limpio y sincronizado con `origin/main`.

---

## 🟡 Pendientes (menores)

1. **Graphify no incluye el A&D V2.** El grafo (814 nodos) cubre FASE 1, pero **no el A&D** porque `.graphifyignore` excluye su PDF y **graphify no indexa `.tex`**. Como el A&D es la fuente de verdad, conviene indexarlo (p. ej. permitir `analisis_y_diseno_oficial.pdf` o exportar el A&D a `.md`).
2. **Numeración duplicada «06»** en `FASE 1/02-Arquitectura-de-Solucion/` (`06-Diseño-Arquitectonico.md` y `06-Modelo-de-Datos-Informe.md`). Renumerar (p. ej. 06 y 07) y ajustar el README.
3. **Granularidad de arquitectura:** FASE 1 habla de **7 capas**; el A&D V2 §11 dice **4 niveles**. No es contradictorio (macro vs detalle), pero conviene una nota que los mapee.
4. **REQ tentativos en actas:** REQ-21, REQ-22 «Por registrar» y REQ-23/REQ-27 «En proceso». Cerrarlos.
5. **CU008 (Catálogo de Empresas):** en el A&D V2 el listado lo incluye pero **no tiene ficha ni diagrama de secuencia** (las fichas/secuencias van de CU001 a CU007).
6. **`diseno/` (Stitch):** conserva numeración CU antigua (auditoría=CU004, ingesta=CU005). Un `README` dentro de `diseno/` evitaría confusiones.
7. **RNF con tensión:** RNF-016/017/018 (ingesta ≤15 min, respuesta ≤90 s, timeout IA 1 min) y «5 usuarios» vs 3 del alcance.

---

## Recomendaciones (ordenadas)

| P | Acción |
|---|---|
| P1 | Indexar el **A&D V2 en graphify** (o exportarlo a `.md`) |
| P1 | Renumerar los dos «06» de `02-Arquitectura-de-Solucion/` |
| P2 | Ficha + secuencia de **CU008** en el A&D V2 |
| P2 | Cerrar REQ-21/22/23/27 en actas |
| P2 | Nota de mapeo **7 capas ↔ 4 niveles** |
| P3 | `README` en `diseno/`; alinear RNF-016/017/018 |

## ✅ Resueltos (post-auditoría)

1. **Graphify ahora indexa el A&D V2** (`analisis_y_diseno_oficial.pdf`): **150 nodos** del A&D en el grafo → total **962 nodos · 1551 aristas · 165 comunidades**. (No se modificó el PDF; solo se indexó.)
2. **Numeración «06» resuelta:** `06-Modelo-de-Datos-Informe.md` → **`07-Modelo-de-Datos-Informe.md`**; referencias de `README` e `Inicio` actualizadas.
3. **Nota de mapeo 7 capas ↔ 4 niveles** añadida en `06-Diseño-Arquitectonico.md`.
4. **`diseno/README.md`** creado (traduce la numeración CU antigua → vigente y marca la fuente viva del diseño).
5. **REQ-27** (entrega del A&D por correo) marcado **✅ Registrado (22/09)** en actas.

> No se tocó el LaTeX ni el PDF del A&D (verificado: `main.tex` y `analisis_y_diseno_oficial.pdf` sin cambios; sha `3258479b…`).

## Pendientes que dependen del A&D (no editables sin tocar el LaTeX/PDF)

- **CU008** (Catálogo de Empresas) sin ficha ni diagrama de secuencia.
- Tensión **RNF-016/017/018** (ingesta ≤15 min · respuesta ≤90 s · timeout IA 1 min) y «5 usuarios» vs 3 del alcance.
- REQ-21/22/23 «por registrar / en proceso» (conformidad del PO, aprobación del mockup, cierre del A&D).

## Conclusión

El vault pasó de **≈86 % → ≈92 %**. Ya **no hay contenido erróneo ni basura** en el material vigente y la consistencia A&D ↔ FASE 1 ↔ repos quedó resuelta (2 bases, Python 3.13, nombres canónicos). El grafo ya incluye la fuente de verdad. Lo que resta depende del propio A&D (CU008, RNF) o de cierre formal (REQ).
