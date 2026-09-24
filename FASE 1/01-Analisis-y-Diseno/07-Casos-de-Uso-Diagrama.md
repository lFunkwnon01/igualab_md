# 07 · Casos de Uso — Diagrama y Listado (FASE 1)

> **Numeración = A&D vigente** (`01-Mockups-y-Propuestas/analisis_y_diseno_oficial.pdf`, sección 7.2).
> Casos de uso de la **v1 (FASE 1)**: **CU001…CU008**. Se eliminaron los CU fuera de alcance (Bolsa, LinkedIn, chatbot/portal).

## 7.1 Actores

- **SuperAdmin** (1 persona — gestión): cuentas, catálogo de empresas, ingesta y auditoría. **No usa la IA.**
- **Administrador** (2 personas — explotación): consulta al asistente RAG, revisa/valida brechas y sanciones, y genera reportes.
- **Proveedor de IA (externo):** servicio por API que da *embeddings* (indexación semántica) y generación de respuestas. **Sin *function calling* en FASE 1 → RAG simple.**
- **Servicio de correo (externo):** envío del enlace de recuperación de contraseña.
- **PO (Oscar):** supervisa la validación de estados (rol humano de control, no rol del sistema).

## 7.2 Diagrama general (mermaid)

```mermaid
flowchart LR
  SU(("SuperAdmin"))
  AD(("Administrador"))
  IA(("Proveedor de IA<br/>(API: embeddings + generación)"))
  MAIL(("Servicio de correo"))

  subgraph Sistema["Plataforma Igualab · FASE 1 (v1)"]
    CU001["CU001 · Autenticación y gestión de sesión"]
    CU002["CU002 · Gestión de usuarios"]
    CU003["CU003 · Ingesta de documentos (.md)"]
    CU004["CU004 · Consulta al asistente IA (RAG)"]
    CU005["CU005 · Detección de brechas GRI y sanciones"]
    CU006["CU006 · Generación de reportes de prospección (PDF)"]
    CU007["CU007 · Auditoría de eventos"]
    CU008["CU008 · Gestión del catálogo de empresas"]
  end

  SU --> CU001 & CU002 & CU003 & CU007 & CU008
  AD --> CU001 & CU004 & CU005 & CU006
  CU001 -. recuperación .-> MAIL
  CU003 -. embeddings por API .-> IA
  CU004 -. RAG (contexto + citas) .-> IA
  CU005 -. extrae cita (sin inferir estado) .-> IA
```

## 7.3 Listado de casos de uso

| Código | Nombre | CU padre | Actor(es) | Estado FASE 1 |
|---|---|---|---|---|
| **CU001** | Autenticación y gestión de sesión | — | SuperAdmin, Administrador | Incluido |
| **CU002** | Gestión de usuarios | — | SuperAdmin | Incluido |
| **CU003** | Ingesta de documentos (memorias y reportes GRI) | — | SuperAdmin | Incluido |
| **CU004** | Consulta al asistente de IA (RAG) | — | Administrador | Incluido |
| **CU005** | Detección de brechas GRI y sanciones | CU003 | Administrador | Incluido |
| **CU006** | Generación de reportes de prospección (PDF) | CU005 | Administrador | Incluido |
| **CU007** | Auditoría de eventos del sistema | — | SuperAdmin | Incluido |
| **CU008** | Gestión del catálogo de empresas | — | SuperAdmin | Incluido |
| ~~CU (Bolsa)~~ | ~~Dashboards de Bolsa de Valores~~ | — | — | **Eliminado** (acta 5 · REQ-16/19) |
| ~~CU (LinkedIn)~~ | ~~Búsqueda vía LinkedIn~~ | — | — | **Eliminado** (acta 5 · REQ-17) |
| CU (portal) | Portal público · chatbot inclusivo | — | — | **FASE 2 (v2)** |

## 7.4 Diagramas por caso de uso (mermaid)

### CU001 — Autenticación y gestión de sesión

```mermaid
flowchart LR
  U(("SuperAdmin / Administrador")) --> CU001((CU001))
  CU001 -.->|extend| REC((Recuperar contraseña<br/>enlace 30 min))
  CU001 -.->|include| VAL((Validar credenciales<br/>y estado de cuenta))
  CU001 --> AUD((CU007 · evento login))
```

### CU002 — Gestión de usuarios

```mermaid
flowchart LR
  SA(("SuperAdmin")) --> CU002((CU002))
  CU002 -.->|extend| CREAR((Crear Administrador))
  CU002 -.->|extend| HAB((Habilitar / deshabilitar))
  CU002 -.->|extend| TRANSF((Transferir rol SuperAdmin<br/>atómico — RN-009))
  CU002 --> AUD((CU007 · evento cambio de rol))
```

### CU003 — Ingesta de documentos (.md)

```mermaid
flowchart LR
  SA(("SuperAdmin")) --> CU003((CU003))
  CU003 -.->|include| GUARD((Guard: .md, pipes,<br/>50 MB, SHA-256))
  CU003 -.->|extend| DUP((Rechazar duplicado))
  CU003 -.->|include| IDX((Chunking + embeddings<br/>por API + pgvector))
  CU003 -.->|include| ANA((Análisis GRI/sanciones<br/>como último paso))
  CU003 --> AUD((CU007 · evento ingesta))
```

### CU004 — Consulta al asistente IA (RAG)

```mermaid
flowchart LR
  AD(("Administrador")) --> CU004((CU004))
  CU004 -.->|include| BUSQ((Seleccionar sector/empresa/año))
  CU004 -.->|include| CITA((Búsqueda semántica +<br/>citación de fuentes))
  CU004 -.->|extend| OFF((Proveedor IA no disponible<br/>sin bloquear módulos))
```

### CU005 — Detección de brechas GRI y sanciones

```mermaid
flowchart LR
  AD(("Administrador")) --> CU005((CU005))
  PO(("PO Oscar")) -. supervisa .-> CU005
  CU005 -.->|include| DET((Códigos GRI detectados<br/>+ cita textual))
  CU005 -.->|extend| EST((Asignación manual del estado<br/>OK / Baja sustancia / Sub-reportado — RN-029/030))
  EST --> HIST((Historial: quién, cuándo, anterior→nuevo))
```

### CU006 — Generación de reportes de prospección (PDF)

```mermaid
flowchart LR
  AD(("Administrador")) --> CU006((CU006))
  CU006 -.->|include| SEL((SELECT determinista<br/>a gri_analisis + sanciones))
  CU006 -.->|include| PLANT((Plantilla Jinja2 →<br/>WeasyPrint: sin LLM))
  CU006 -.->|extend| REG((Reporte inmutable +<br/>snapshot congelado))
  CU006 --> AUD((CU007 · evento generación de reporte))
```

### CU007 — Auditoría de eventos

```mermaid
flowchart LR
  SA(("SuperAdmin")) --> CU007((CU007))
  CU007 -.->|include| FILT((Filtrar por usuario,<br/>fecha y tipo))
  CU007 -.->|extend| READ((Solo lectura · append-only))
```

### CU008 — Gestión del catálogo de empresas

```mermaid
flowchart LR
  SA(("SuperAdmin")) --> CU008((CU008))
  CU008 -.->|include| EMP((Registrar empresa:<br/>nombre + sector))
  CU008 -.->|extend| VIG((Activar / desactivar<br/>RN-017))
```
