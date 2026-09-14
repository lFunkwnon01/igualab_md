# 07 · Casos de Uso — Diagrama y Listado (FASE 1)

> **Numeración alineada al A&D v4 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Casos de uso del A&D v1.0 **depurados** según plan v1.2 y actas 4/5: se eliminan CU007 de Dashboards de Bolsa de Valores (REQ-16/19), el rol Usuario del mock CU010 LinkedIn (REQ-17) y el chatbot inclusivo (fase 2). Se retoman 9 CU **vivos en el mock fidelizado**.

## 7.1 Actores

- **Superadmin** (1 usuario — gestión de accesos e ingesta).
- **Administrador** (2 usuarios — explotación analítica; supervisa el PO).
- **PO (Oscar)** — supervisar (auditor de estados, no rol del sistema).
- **LLM & Embeddings**: sistema externo (API `:free` de OpenRouter para el chat; embeddings por API para la BD vectorizada). **Sin function calling en fase 1 → solo RAG simple.**

## 7.2 Diagrama general (mermaid)

```mermaid
flowchart LR
  SU(("Superadmin"))
  AD(("Administrador"))
  LLM(("LLM/Embeddings<br/>(API free)"))
  PO(("PO Oscar<br/>(supervisa)"))

  subgraph Sistema["Plataforma Igualab · FASE 1"]
    CU001["CU001 · Autenticación y<br/>gestión de sesión"]
    CU002["CU002 · Gestión de usuarios y roles"]
    CU003["CU003 · Configuración del sistema"]
    CU004["CU004 · Ingesta de documentos (.md)"]
    CU005["CU005 · Consulta al asistente IA (RAG)"]
    CU006["CU006 · Revisión/ajuste de estado<br/>de brechas GRI"]
    CU007["CU007 · Generación de reporte PDF"]
    CU008["CU008 · Historial y descarga de reportes"]
    CU009["CU009 · Auditoría de eventos"]
  end

  SU --> CU001 & CU002 & CU003 & CU004
  AD --> CU001 & CU005 & CU006 & CU007 & CU008
  CU002 -. incluye-CRUD roles + avisos .-> CU009
  CU004 -. registra eventos .-> CU009
  CU005 -. consultas RAG con contexto .-> LLM
  CU004 -. embeddings por API .-> LLM
  CU007 -. solo variables de la BD .-> LLM
  PO -. supervisa estados .-> CU006
```

## 7.3 Listado de casos de uso (empresa)

| Código | Nombre | CU padre | Actor(es) | Estado fase 1 |
|---|---|---|---|---|
| **CU001** | Autenticación y gestión de sesión (login, recuperación) | — | Ambos | Incluido |
| **CU002** | Gestión de usuarios y roles (con transferencia de Superadmin) | CU001 | Superadmin | Incluido |
| **CU003** | Configuración del sistema (inactividad, bloqueo, notificaciones) | CU001 | Superadmin | Incluido |
| **CU004** | Ingesta de documentos (` .md`, síncrona con guard) | CU001 | Superadmin | Incluido |
| **CU005** | Consulta al asistente de IA (RAG con citación) | CU001 | Administrador | Incluido |
| **CU006** | Revisión y ajuste de estado de brechas GRI (supervisión humana) | CU005 | Administrador | Incluido |
| **CU007** | Generación de reporte de prospección (PDF) | CU006 | Administrador | Incluido |
| **CU008** | Historial y descarga de reportes | CU007 | Administrador | Incluido |
| **CU009** | Auditoría de eventos del sistema | CU002 | Superadmin | Incluido |
| ~~CU007 (v1.0)~~ | ~~Dashboards de Bolsa de Valores~~ | — | — | **Eliminado** (acta 5 · REQ-16/19) |
| ~~CU010 (v1.0)~~ | ~~Búsqueda LinkedIn~~ | — | — | **Eliminado** (acta 5 · REQ-17) |
| CU-PF | Portal público | — | Público | **Diferido** (post-fase 1) |
| CU-CI | Chatbot inclusivo | — | — | **Fase 2** (mock existiia como CU013_fase_2) |

## 7.4 Diagramas por caso de uso (mermaid)

### CU001 — Autenticación y gestión de sesión

```mermaid
flowchart LR
  U(("Usuario")) --> CU001((CU001))
  CU001 -.->|extend| REC((Recuperar<br/>contraseña))
  CU001 -.->|include| VAL((Validar credenciales<br/>y estado de cuenta))
  CU001 --> AUD((CU009<br/>evento: login))
```

### CU002 — Gestión de usuarios y roles

```mermaid
flowchart LR
  SA(("Superadmin")) --> CU002((CU002))
  CU002 -.->|extend| CREAR((Crear usuario))
  CU002 -.->|extend| HAB((Habilitar/deshabilitar))
  CU002 -.->|extend| TRANSF((Transferir rol Superadmin<br/>RN-003 · auto-degradación))
  CU002 -.->|include| AUD((CU009 · evento change Role))
```

### CU003 — Configuración

```mermaid
flowchart LR
  SA(("Superadmin")) --> CU003((CU003))
  CU003 -.->|extend| TIEMPO((Ajustar minutos de<br/>inactividad))
  CU003 -.->|extend| BLOQ((Habilitar bloqueo y<br/>notificaciones))
```

### CU004 — Ingesta de documentos

```mermaid
flowchart LR
  SA(("Superadmin")) --> CU004((CU004))
  CU004 -.->|include| GUARD((Pre-validación: `.md`, pipes,<br/>15 MB, empresa y año))
  CU004 -.->|extend| DUP((Rechazar duplicado<br/>sha256))
  CU004 -.->|include| IDX((Chunking +<br/>embeddings por API))
  CU004 --> AUD((CU009 · evento ingesta))
```

### CU005 — Consulta al asistente IA (RAG)

```mermaid
flowchart LR
  AD(("Administrador")) --> CU005((CU005))
  CU005 -.->|include| BUSQ((Búsqueda semántica<br/>pgvector k=4))
  CU005 -.->|include| CITA((Citación de fuentes<br/>doc+sección))
  CU005 -.->|extend| OFF2((Fallos con aviso<br/>sin bloquear módulos))
  CU005 -.->|extend| OFF((Mensaje de<br/>indisponibilidad))
```

### CU006 — Revisión/ajuste de brechas (supervisión)

```mermaid
flowchart LR
  AD(("Administrador")) --> CU006((CU006))
  PO(("PO Oscar")) -. supervisa .-> CU006
  CU006 -.->|include| SUG((Sugerencia IA del estado<br/>según catalogo_gri))
  CU006 -.->|extend| CAMB((Cambiar estado:<br/>OK/Sub/Baja/Crítico))
  CAMB --> HIST((Historial del<br/>cambio — quién y cuándo))
```

### CU007 — Generación de reporte PDF

```mermaid
flowchart LR
  AD(("Administrador")) --> CU007((CU007))
  CU007 -.->|include| BDV((Variables dinámicas<br/>desde la BD))
  CU007 -.->|include| PLANT((Plantilla Jinja2 →<br/>WeasyPrint))
  CU007 -.->|include| TEMPL((Plantilla + variables<br/>desde la BD → WeasyPrint))
  CU007 --> AUD((CU009 · evento reportGeneration))
```

### CU008 — Historial y descarga de reportes

```mermaid
flowchart LR
  AD(("Administrador")) --> CU008((CU008))
  CU008 -.->|include| LIST((Listado históricos<br/>solo-lectura))
  CU008 -.->|extend| DUP2((Descargar PDF de<br/>cualquier versión))
```

### CU009 — Auditoría de eventos

```mermaid
flowchart LR
  SA(("Superadmin")) --> CU009((CU009))
  CU009 -.->|include| FILT((Filtrar por usuario,<br/>fecha y tipo))
  CU009 -.->|extend| READ((Acceso solo<br/>lectura append-only))
```

> Los diagramas formales UML (plantuml) pueden generar a partir de estas especies de la especificación (documento 08) cuando se deseen incluir en el A&D exportable PDF.
