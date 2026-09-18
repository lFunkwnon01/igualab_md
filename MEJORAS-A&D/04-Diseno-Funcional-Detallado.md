# 4. DISEÑO FUNCIONAL DETALLADO — propuesta mejorada (A&D Igualab)

> **Origen:** sección 4 del PDF `Análisis y Diseño - Igualab.pdf` (pp. 6-7, «ocho módulos funcionales»).
> **Objetivo de esta propuesta:** conservar la redacción válida del PDF y **completar/corregir** lo que falta para que la sección cierre: modularización **SOLID**, trazabilidad con RF/RN/RNF/CU, flujos funcionales, límites y referencias cruzadas.
> **Alcance vigente FASE 1:** 2 roles (SuperAdmin / Administrador) · sin Bolsa de Valores · sin LinkedIn · dashboards → fase 2 · ingesta solo `.md` (tablas de pipes, ≤ 50 MB) · RAG simple sin MCP/function calling · 3 estados GRI (`OK`, `Baja sustancia`, `Sub-reportado`).

---

## 4.0 Visión general y roles

La solución es una **plataforma web de analítica de sostenibilidad** que permite a Igualab procesar reportes de sostenibilidad y memorias anuales de empresas que cotizan en la Bolsa de Valores de Lima, identificar **brechas en indicadores ASG/GRI** y generar **reportes de prospección comercial en PDF**. Se organiza en **ocho módulos funcionales** sobre **dos roles**:

| Rol | Personas | Responsabilidad principal |
|---|---|---|
| **SuperAdmin** | 1 | Administra cuentas y ejecuta la **ingesta** de documentos; consulta auditoría. **No usa la IA.** |
| **Administrador** | 2 | Consulta al asistente RAG, **revisa y valida** brechas/sanciones y **genera y descarga reportes**. |

> El detalle de actores y casos de uso está en la sección **7.1/7.2**; las reglas en la **6**; los RF/RNF en la **7.4/7.5**.

---

## 4.1 Criterios de diseño y modularización (SOLID)

El sistema se implementa como un **monolito modular** (una sola unidad de despliegue) con **responsabilidades separadas por módulo/servicio**, siguiendo **SOLID**:

- **S — Single Responsibility:** cada módulo expone un único servicio con una responsabilidad funcional (p. ej. `auth_service`, `ingesta_service`), sin mezclar autenticación con ingesta o reportes.
- **O — Open/Closed:** las integraciones externas (proveedor de IA, almacenamiento de archivos, correo) se consumen mediante **interfaces**; agregar un proveedor nuevo no obliga a modificar los servicios.
- **L — Liskov:** las implementaciones de una interfaz (p. ej. cliente de IA `LlmClient`) son sustituibles sin romper el contrato.
- **I — Interface Segregation:** cada servicio expone solo las operaciones que sus consumidores necesitan (endpoints por módulo).
- **D — Dependency Inversion:** los servicios dependen de **abstracciones** (cliente de IA, repositorios de datos), no de implementaciones concretas; la configuración llega por variables de entorno.

> **Nota:** SOLID aquí **no** implica microservicios. la FASE 1 se despliega como monolito modular; la separación por módulos deja preparada una eventual extracción a servicios en fase 2.

---

## 4.2 Catálogo de módulos funcionales

Cada módulo indica su **responsabilidad**, el **servicio** que lo implementa (SRP), su **CU** y los **requisitos** que cubre.

| # | Módulo funcional | Servicio | CU | RF | RN | RNF |
|---|---|---|---|---|---|---|
| 1 | Autenticación y Gestión de Sesión | `auth_service` | CU001 | RF-001…006, 009 | RN-004, 005, 006, 007, 010, 036 | RNF-001…009, 023…026, 031 |
| 2 | Gestión de Usuarios | `usuario_service` | CU002 | RF-007, 008, 010…016, 050 | RN-001, 002, 003, 008, 009 | RNF-011, 012 |
| 3 | Catálogo de Empresas | `empresa_service` | CU002/CU003 | RF-052, 053 | RN-019, 035 | — |
| 4 | Ingesta de Documentos | `ingesta_service` | CU003 | RF-017…024, 054 | RN-011…014, 017, 033, 039 | RNF-006, 010, 014, 015, 017, 020, 023, 036 |
| 5 | Análisis y Validación de Brechas GRI | `gri_analisis_service` | CU005 | RF-025…028, 038, 051, 055 | RN-015, 016, 017, 018, 020, 031, 032, 034 | RNF-019, 022 |
| 6 | Asistente de IA (RAG) | `rag_chat_service` | CU004 | RF-029…034, 049 | RN-021, 022, 023, 030, 037, 038 | RNF-018, 027, 028, 030, 033, 035 |
| 7 | Generación de Reportes de Prospección | `reportes_pdf_service` | CU006 | RF-035…045, 056 | RN-020, 024, 025, 026 | RNF-032 |
| 8 | Auditoría | `auditoria_service` | CU008 | RF-046…048 | RN-027, 028, 029 | RNF-013, 021, 034 |
| — | *(Transversal)* Configuración | `configuracion_service` | — | — | — | RNF-014, RNF-028 (parámetros sin redesplegar) |

### 4.2.1 Módulo de Autenticación y Gestión de Sesión
Controla el acceso con correo y contraseña, garantizando que solo cuentas registradas y habilitadas operen. Incluye recuperación por enlace temporal (30 min), cambio de contraseña autenticado, expiración por inactividad, cierre manual y bloqueo temporal tras **5 intentos fallidos** (15 min). Sesión con **JWT firmado**; el rol se obtiene **del token**, no de la petición.

### 4.2.2 Módulo de Gestión de Usuarios
Exclusivo del **SuperAdmin**: crea cuentas de Administrador (contraseña temporal de primer acceso), habilita/deshabilita y **transfiere el rol SuperAdmin** a un Administrador existente con confirmación previa y **transacción atómica**. Garantiza **exactamente un SuperAdmin**; no hay eliminación permanente de cuentas (solo habilitación/deshabilitación) para preservar la auditoría.

### 4.2.3 Módulo de Catálogo de Empresas
Exclusivo del SuperAdmin: registra empresas exigiendo **nombre y sector**. El análisis de brechas se limita a **Minería, Petróleo y Gas, y Energía** (RN-019). Empresas de otros sectores pueden registrarse, pero **no son elegibles** para el análisis ni para reportes. *(Corrección respecto al PDF: el PDF dice «Minería, Petróleo y Energía»; debe incluir «Gas» según RN-019.)*

### 4.2.4 Módulo de Ingesta de Documentos
Exclusivo del SuperAdmin: carga memorias anuales y reportes GRI en **Markdown (`.md`)** con **tablas de pipes**, asociados obligatoriamente a **empresa + año + tipo**. Valida el **tipo real del archivo** en servidor, calcula **SHA-256** para rechazar duplicados, verifica que exista al menos un código GRI o mención de sanción (si no, queda **observado**, no rechazado) y exige **tamaño ≤ 50 MB** (RNF-014). El **procesamiento es síncrono** con progreso visible, e incluye **indexación** y la **ejecución automática del análisis GRI como último paso** de una ingesta exitosa. Ante rechazo o interrupción, **revierte** sin conservar contenido parcial (RN-039/RF-054).

### 4.2.5 Módulo de Análisis y Validación de Brechas GRI
Exclusivo del Administrador. El motor identifica qué códigos del **catálogo de 40** están presentes, **citando el fragmento** de origen, sin comparar con el estándar GRI oficial. El Administrador revisa la cita y **asigna manualmente** el estado (`OK`, `Baja sustancia`, `Sub-reportado`); el sistema **no infiere ni calcula** el estado. Las sanciones se identifican **solo** por menciones explícitas en el corpus. El **puntaje ESG** se calcula a partir de los estados asignados (**OK=100 · Baja sustancia=50 · Sub-reportado=0**) y se muestra **«no disponible»** —nunca cero— si no se detectó ningún código. Cada cambio de estado queda en histórico (quién, cuándo, anterior → nuevo).

### 4.2.6 Módulo de Asistente de IA (RAG)
Exclusivo del Administrador: consultas en lenguaje natural sobre el corpus indexado. Exige seleccionar **sector, empresa y año** antes de consultar. Responde **solo** sobre sostenibilidad, indicadores GRI, sanciones o contenido ingestado; ante otro tema **declina explícitamente**. Toda respuesta incluye **referencia a documento, empresa y año**, suprime afirmaciones sin fuente y declara la insuficiencia de información. El contenido del corpus se trata **como datos, nunca como instrucciones** (anti prompt-injection). RAG **simple, sin function calling**; ante indisponibilidad del proveedor externo informa el error **sin bloquear** el resto de módulos (timeout máx. 1 min).

### 4.2.7 Módulo de Generación de Reportes de Prospección
Exclusivo del Administrador: consolida el análisis validado en un **PDF**. Solo para empresas con al menos un documento indexado y con estados **validados manualmente**; se construye **exclusivamente desde resultados almacenados, sin invocar IA**, por lo que es **determinista**. Incluye estado de cada código GRI con su cita, sanciones (con monto o «no cuantificada») y resumen ejecutivo con puntaje ESG. Una vez generado, el reporte es **inmutable**; su historial es visible y descargable por **cualquier Administrador**.

### 4.2.8 Módulo de Auditoría
Exclusivo del SuperAdmin: registra automáticamente todo evento sensible —inicio de sesión, cambio de estado/rol, ingesta, rechazo de documento y generación de reportes— con **cuenta responsable, fecha/hora (UTC) y tipo de acción**. Consultable por usuario, fecha y tipo de evento; **solo inserción** (no edita ni elimina).

---

## 4.3 Flujos funcionales end-to-end (nivel funcional)

> El detalle gráfico (TO-BE/BPMN) corresponde a la sección **5** y a los casos de uso (**7.2**).

- **F1 · Ingesta y análisis (SuperAdmin):** autenticarse → seleccionar empresa, año y tipo → subir `.md` → *guard* (extensión, pipes, ≤ 50 MB, SHA-256) → parseo → chunking → **embeddings por API** → upsert en pgvector → **detección de códigos GRI + cita** (filas **sin estado**) → auditoría → resultado con progreso.
- **F2 · Consulta RAG (Administrador):** seleccionar sector/empresa/año → pregunta → embedding de la pregunta por API → búsqueda semántica → respuesta del LLM **con citas** (o declinación fuera de dominio).
- **F3 · Revisión de brechas (Administrador):** abrir filas con cita → **asignar estado** manual → registrar histórico.
- **F4 · Reporte de prospección (Administrador):** verificar estados validados → **SELECT determinista** (estados + sanciones) → plantilla → **PDF** → snapshot inmutable → auditoría → historial/descarga.
- **F5 · Autenticación y usuarios (SuperAdmin):** login/recuperación; crear, habilitar/deshabilitar y **transferir** SuperAdmin (atómico).
- **F6 · Auditoría (SuperAdmin):** consulta filtrable y exportable, solo lectura.

---

## 4.4 Reglas transversales de diseño

1. **RBAC de 2 roles** en todo endpoint (autorización por petición; rol desde el JWT).
2. **Ingesta síncrona** de `.md` (tablas de pipes), ≤ **50 MB**, con hash y **reversión atómica** ante fallo.
3. **3 estados GRI**, asignación **100 % manual**; sin `estado_sugerido`; puntaje ESG derivado y «no disponible» si no hay códigos.
4. **RAG simple** sin function calling/tools; citación obligatoria; corpus como datos (anti prompt-injection); timeout IA 1 min.
5. **Reporte determinista sin LLM** e **inmutable**.
6. **Auditoría append-only** en UTC.
7. **Trazabilidad:** todo módulo referencia sus CU ↔ RF ↔ RN ↔ RNF (tabla §4.2).

---

## 4.5 Interfaces (adelanto de 5.1/5.2)

- **Internas:** Frontend (React) ↔ API REST (FastAPI) vía **HTTPS + JWT**; API ↔ **PostgreSQL + pgvector**; API ↔ **almacenamiento de `.md`**.
- **Externas:** **proveedor de IA** (LLM + embeddings) por API; **correo (SMTP)** para recuperación de contraseña; **fuente de datos BVL** (documentos que el cliente entrega ya convertidos a `.md`, ingesta manual).
- **Interoperación:** JSON/HTTPS; sin function calling; el contenido del corpus se delimita como datos.

---

## 4.6 Criterios de aceptación funcionales (por módulo)

| Módulo | Criterio de aceptación |
|---|---|
| Autenticación | Solo cuentas habilitadas acceden; bloqueo a los 5 intentos; enlace de recuperación de un solo uso. |
| Usuarios | Existe exactamente 1 SuperAdmin en todo momento; transferencia atómica. |
| Empresas | No se puede analizar una empresa fuera de los 3 sectores. |
| Ingesta | Rechaza > 50 MB, sin `.md`, duplicados (SHA-256) y sin sección GRI/sanción (observado); revierte ante fallo. |
| Brechas | Toda fila tiene cita; el estado solo cambia por acción humana; histórico completo. |
| RAG | Respuesta con cita de documento/empresa/año; declina fuera de dominio; no usa conocimiento externo. |
| Reportes | Dos generaciones con los mismos datos producen el mismo PDF; sin llamadas a IA. |
| Auditoría | Todo evento sensible queda registrado e inalterable. |

---

## Cambios aplicados respecto al PDF (resumen)

1. **Minería, Petróleo y Energía → Minería, Petróleo y Gas, y Energía** (RN-019).
2. Añadido **§4.1 modularización SOLID** (mapeo a servicios, monolito modular).
3. Añadida **§4.2 matriz módulo ↔ servicio ↔ CU ↔ RF ↔ RN ↔ RNF**.
4. Añadidos **§4.3 flujos funcionales** y **§4.6 criterios de aceptación**.
5. Ingesta: se explicita **≤ 50 MB** y el estándar de `.md` con **tablas de pipes**.
6. Se unifica «SuperAdmin/Administrador» y se aclara que el SuperAdmin **no usa la IA**.
7. Se marcan referencias cruzadas a las secciones **5, 6, 7, 8, 11 y 12**.

> **Pendiente de coordinación (no incluido aquí):** unificación de la **numeración CU** entre el A&D (8 CU) y la implementación (que agrega Configuración e Historial/Descarga) → ver auditoría.
