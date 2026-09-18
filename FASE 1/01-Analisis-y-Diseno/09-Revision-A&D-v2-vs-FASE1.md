# 09 · Revisión A&D v2 (sobrescrito 13/09) vs FASE 1 — RN, RF, RNF

> ⚠️ **BITÁCORA HISTÓRICA — NO es documentación vigente.** Registra la conciliación del equipo contra una versión antigua del A&D (v2, con RF-001…075). Ya fue resuelta y aplicada; la documentación vigente son los docs **01–08** de esta carpeta + el A&D actual. Se conserva solo como trazabilidad de decisiones. Estado actual del A&D: **RN 001–039 · RF 001–056 · RNF 001–036** (ver doc 10, Anexo 5).
>
> Fuente revisada en su momento: `Análisis y Diseño - Igualab .pdf` (versión del 13/09/2026, 34 RN · RF-001…RF-075 · RNF-001…RNF-036).
> Objetivo: detectar **(A) aportes a incorporar**, **(B) contradicciones a resolver** y **(C) errores a corregir** en el A&D. La base de FASE 1 (`FASE 1/01-Analisis-y-Diseno/03…08`) es la referencia vigente.

---

## A. Aportes del A&D v2 que conviene INCORPORAR al FASE 1

| # | A&D v2 | Qué aporta | Acción propuesta |
|---|---|---|---|
| A1 | **RN-016** | Estados GRI = **solo 3**: `OK`, `Baja sustancia`, `Sub-reportado`. **Sin "Crítico"**. | Quitar `CRITICO` de nuestro diseño (RN-019, estados de `gri_analisis`) → quedan 3 estados. |
| A2 | **RN-016/018 + RF-035** | El estado lo asigna **manualmente el Administrador** tras revisar la cita; **el sistema no infiere ni compara con el estándar GRI**. | Ajustar: el motor **no sugiere** estado; solo **detecta presencia** de códigos y extrae la **cita**. Quitar `estado_sugerido` (o dejarlo como "sin estado" hasta revisión). |
| A3 | **RN-017** | **Catálogo predefinido de 40 códigos GRI** evaluables. | Cambiar `catalogo_gri` (nuestro "estándar con elementos mínimos") → catálogo de **40 códigos** para *detección de presencia*, versionado (RNF-027). |
| A4 | **RN-019** | Límite documental **50 MB** (no 15 MB). | Actualizar RN-011/RN-019 en FASE 1 y `configuracion.upload_max_mb=50`. |
| A5 | **RN-020 / RF-033 / RF-048/049/051** | El análisis y las consultas **solo** sobre empresas con ≥1 documento indexado; años = los ingestados. | Ya está cubierto por diseño (RS-12), reforzar en CU006/CU007 y en UI (empresas/años habilitados). |
| A6 | **RN-033 / RF-023/024** | **Unicidad documental doble**: por hash **y** por empresa+año+tipo (no duplicar memoria anual del mismo año). | Agregar el UNIQUE(empresa_id, anho, tipo) a `documentos` (hoy solo sha256). |
| A7 | **RN-034 / RF-057/058/075** | **Puntaje ESG** (OK=100, Baja=50, Sub=0) y **sanciones sin monto** (se listan y cuentan aparte; "no determinado" ≠ 0). | Añadir cálculo del puntaje ESG (columna/vista) y `monto NULL` + `sin_monto` en reporte; RNF-024 (no-determinado ≠ 0). |
| A8 | **RN-031/032** | Distinción entre **ausencia de hallazgo** y **falta de evidencia**; información parcial se conserva identificada. | Refuerza nuestra RS-22 (bloque "no se registraron"). Añadir estado/marca "sin evidencia analizable" por dimensión (RF-037). |
| A9 | **RN-025/026, RF-060/061/062/063** | Reporte **determinístico, sin invocar IA**, inmutable, versionado y descargable. | Ya alineado con nuestro diseño (RN-027/028). ✔ |
| A10 | **RNF-011/012** | Transferencia SuperAdmin **atómica en transacción** + unicidad garantizada **también en BD**. | Ya lo teníamos (RS-01); reforzar el texto con transacción explícita. |
| A11 | **RNF-001→009, 031/032/034/035** | Seguridad fuerte: política de contraseñas, hash con sal, **rol desde el token firmado**, revocación por petición, mensajes de error indistinguibles, enlace de recuperación 30 min, JWT + rotación de clave. | Incorporar como RNF de FASE 1 (hoy tenemos 21; agregar estos o reportarlos como detalle de los existentes). |
| A12 | **RNF-013/022/025** | Auditoría insert-only; **borrado lógico** (marcado de estado, sin borrado físico); cada fragmento conserva referencia a documento **y ubicación**. | Ajustar: nuestro "no borrado" pasa a "borrado lógico"; chunk ya guarda sección (ok). |
| A13 | **RNF-020/021/030** | Atomicidad de la ingesta (todo o nada), **timeout de las llamadas al LLM**, y **progreso visible** en la ingesta síncrona. | Ya cubierto (RS-06/RNF-13); agregar el timeout explícito y el indicador de progreso a la spec de CU004. |

## B. Contradicciones a RESOLVER (decidir con el equipo/PO)

| # | Tema | A&D v2 dice | Nuestro FASE 1 dice | Recomendación |
|---|---|---|---|---|
| B1 | **Embeddings** | **RF-026**: enviar cada fragmento al **servicio de embeddings del proveedor de IA** vía API; **RNF-036**: proveedor que dé **embeddings y generación** por API. | Inicialmente el equipo había definido embeddings **locales** (servidor universidad). | **Resuelto (14/09)**: se adopta **API del proveedor** (mismo proveedor para embeddings y generación; NVIDIA NIM o Google AI Studio). Implica contabilizar los tokens de embeddings en la cuota (RN-025/RNF-31b). |
| B2 | **Sugerencia de estado** | El sistema **no calcula ni infiere**; todo manual (RN-016/018). | Teníamos `estado_sugerido` (motor de reglas vs catálogo) + validación humana. | Adoptar el A&D v2: **estado 100% manual** con cita; el sistema solo detecta códigos y extrae citas. Simplifica. |
| B3 | **Estados** | 3 (OK/Baja/Sub). | Teníamos 4 (con `CRITICO`). | Adoptar 3 (A1). |
| B4 | **Puntaje ESG** | Existe (RN-034/RF-075). | En acta 5 los **dashboards** van a fase 2; no teníamos puntaje. | Aclarar si el puntaje ESG es **fase 1** (se calcula y va al reporte) o fase 2 (visualización). El cálculo en sí es trivial; la **visualización** sigue en fase 2. |
| B5 | **Módulo Bolsa / rol Usuario** | El A&D v2 **aún lista CU007 Dashboards de Bolsa** y el rol **"Usuario"** en CU001. | Acta 5: **eliminados** (REQ-16/17). | Corregir el A&D: quitar CU007/Usuario; nuestro FASE 1 ya está correcto. |
| B6 | **Borrado** | Marcado de estado (borrado lógico). | "Nunca se borra". | Unificar en "borrado lógico, prohibido el borrado físico" (coinciden en el fondo). |

## C. Errores e inconsistencias DETECTADOS en el A&D v2 (corregir sí o sí)

1. **Diccionario de datos equivocado**: la sección 9 sigue con tablas del **proyecto inmobiliario** (`proyecto`, `torre`, `piso`, `activo`, `hito`) — no corresponde a Igualab. Reemplazar por nuestro Diccionario de Datos FASE 1 (14 tablas).
2. **Sección 8 "Modelo de datos" vacía** (sin diagrama ni tablas).
3. **CU nuevos desactualizados**: CU007 Dashboards de Bolsa y rol Usuario en las especificaciones (ver B5).
4. **Numeración RN incompleta/inconsistente**: solo se listan 34 RN, pero los RF referencian **RN-035 y RN-039 que no existen** en el listado. Revisar numeración (¿faltan RN-035 a RN-040?).
5. **RF duplicados o solapados**: **RF-014 y RF-015** describen lo mismo (transferencia del rol); RF-023 (hash) y RF-024 (empresa/tipo/año) son dos unicidades distintas — bien, pero deben quedar separadas y no mezcladas con RN.
6. **RF con huecos de numeración**: faltan RF-031, RF-034, RF-036, RF-038…040, RF-050, RF-052, RF-055/056, RF-066, RF-069, RF-071/072 (saltos). Limpiar la numeración (renumerar correlativo) o justificar los huecos.
7. **RNF con valores sin definir**: RNF-015 ("menos de N segundos"), RNF-016 ("N segundos"), RNF-017, RNF-018 ("M segundos") — **los N/M son placeholders**, hay que fijar los números (p. ej. ingesta ≤ 5 min, primera respuesta ≤ 8 s, reporte ≤ 10 s, análisis ≤ 60 s) o quedan inverificables.
8. **RN-006 vs RN-009** (tensión interna): RN-006 dice que la cuenta SuperAdmin inicial "no es posible de ser asignada o atribuida a alguna cuenta creada posteriormente", mientras RN-009 permite **transferir** el rol a un Administrador. Aclarar: lo que no se puede es **crear** superadmins nuevos; la transferencia del rol sí procede.
9. **RN-035 en RF-075**: el puntaje ESG referencia RN-035, pero el listado solo llega a RN-034. Inconsistencia.
10. **RF-057 dice "sanciones sin monto ... RN-034"** y RN-034 es el puntaje ESG → referencia cruzada mal puesta.
11. **RF-026 (embeddings por API)** contradice el plan v1.2 §10 (servidor de la universidad) según la interpretación que se elija (ver B1).
12. **"ideotas" y notas sueltas** en el CU001 (líneas 449-455 del PDF: "que debe tener el pdf exactamente…, cuántos intentos…, qué se hace cuando") — quedaron residuos de trabajo en el documento final. Limpiar antes de presentar.

## B-bis. Decisiones tomadas por el equipo (13/09) ✅

| Punto | Decisión |
|---|---|
| **Embeddings** | **Por API del proveedor de IA** (decisión final del chat «Requisitos de embeddings», 14/09 — revierte la opción local). El chunking/parsing es código propio sin IA. Ver `10-Contexto-Embeddings-y-Auditoria-AyD.md`. |
| **Estado GRI** | **100 % manual** (el sistema solo detecta códigos y extrae citas; no infiere ni compara con el estándar). |
| **Nº de estados** | **3**: `OK`, `Baja sustancia`, `Sub-reportado` (se elimina "Crítico"). |
| **Puntaje ESG** | **Sí en fase 1**, calculado desde los estados manuales y presentado en el reporte (la visualización tipo dashboard sigue en fase 2). |
| **Límite documental** | **50 MB**. |
| **Unicidad documental** | Doble: `sha256` **+** (empresa, año, tipo). |
| **Sanciones sin monto** | Se listan y cuentan por separado; "no determinado" ≠ 0. |
| **Borrado** | Lógico (marcado de estado); sin borrado físico. |

Estas decisiones ya se aplicaron a `04-Reglas-de-Negocio.md`, `05-Requerimientos-Funcionales.md`, `06-Requerimientos-No-Funcionales.md`, `02-Base-de-Datos-Diagrama-y-Diseno.md`, `03-Diccionario-de-Datos.md`, `08-Especificacion-Casos-de-Uso.md` y `01/03-Arquitectura…`.

## D. Resultado de la revisión

- **A&D v2 = mejor y más maduro en seguridad y reglas de negocio** (RN/RNF de JWT, atomicidad, unicidad, determinismo del reporte, ESG, sanciones sin monto). **Gran parte ya está o se incorpora fácil** al FASE 1.
- **2 decisiones que deben cerrarse primero**: (B1) **embeddings por API vs locales** — el tema del chat compartido, y (B2/B3) **estados GRI 3 y 100 % manuales**.
- **El FASE 1 está adelantado al A&D v2** en: eliminación de Bolsa/LinkedIn/rol Usuario, ingesta `.md` con guard, RAG sin MCP, ERD y diccionario reales. Falta que el A&D se ponga al día en esos puntos (B5, C1–C3).
- **Próximo paso sugerido**: (1) cerrar B1–B4 con el equipo; (2) actualizar `FASE 1` con A1–A13; (3) corregir el A&D (C1–C12) para que ambos documentos queden consistentes.

> Nota: el enlace de ChatGPT compartido (`chatgpt.com/share/6aa707a4…`, "Requisitos de embeddings") **no es accesible por fetch** (requiere sesión/JS). Pega aquí el contenido de esa conversación y lo integro a este análisis y al vault.
