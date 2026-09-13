# 03 · Diagramas de Procesos TO-BE — FASE 1 (formato BPMN)

> Proceso to-be según el A&D actualizado y ajustado al plan de proyecto v1.2 + actas 4/5: **sin dashboard, sin Bolsa, sin LinkedIn**. Todos los flujos corresponden 1:1 con el mock fidelizado <https://igualab.vercel.app/>.
> El BPMN fuente está en `diagramas-BPMN/proceso_tobe_fase1.bpmn` (visualizable en `00-Documentación/bpmn/visor_bpmn.html`). Aquí se incluye versión mermaid para lectura rápida.

## 3.1 Proceso 1 — Flujo de negocio end-to-end (ingesta → análisis → prospección)

```mermaid
flowchart LR
  subgraph GEST["Línea de gestión · Superadmin"]
    A1["Prepara documento .md convertido del PDF origen"] --> A2["Selecciona empresa y año"]
    A2 --> A3["Sube .md en Ingesta con validación de formato y tamaño"]
    A3 --> A4{"¿Tablas con pipes y tamaño dentro del límite?"}
    A4 -- No --> A5["Audita rechazo y muestra motivo en la UI"]
    A4 -- Sí --> A6["Chunking por secciones y filas de tabla"]
    A6 --> A7["Embeddings por API + upsert en pgvector"]
    A7 --> A8[("documentos y chunks_embeddings")]
  end
  subgraph EXPL["Línea analítica · Administrador"]
    B1["Consulta al asistente IA con citación de fuentes"] --> B2["Revisa brechas GRI y sanciones sugeridas"]
    B2 --> B3["Ajusta estado de brecha: OK / Sub-reportado / Baja sustancia / Crítico"]
    B3 --> B4["Genera reporte de prospección PDF"]
    B4 --> B5["Descarga y comparte con el área comercial"]
  end
  A8 --> B1
  A8 -. alimenta .-> B2
  A8 -. alimenta .-> B4
  B4 -- registra --> R[("reportes_generados")]
  A3 -. registra .-> ACC[("auditoria_eventos")]
```

```mermaid
flowchart TD
    U["Superadmin en la UI"] -->|POST /api/v1/ingesta con archivo .md| API["FastAPI · middleware RBAC"]
    API --> G1["1 Guard de formato: solo .md, tablas con pipes, tamaño ≤ 50 MB"]
    G1 -- falla --> X["Audita rechazo · estado RECHAZADO + motivo exacto hacia la UI"]
    G1 -- ok --> P1["2 Parseo markdown: encabezados y filas de tablas normalizadas"]
    P1 --> P2["3 Chunking por sección/fila ~800 chars con metadata: empresa, año, código GRI"]
    P2 --> P3["4 Embeddings por APIes: servicio de embeddings del proveedor (p. ej. NVIDIA NIM / Google AI Studio)"]
    P3 --> P4["5 Upsert en chunks_embeddings con sha256 anti-duplicado"]
    P4 --> ANA["6 Detección GRI: códigos presentes (catálogo de 40) + cita textual → INSERT en tabla del análisis SIN estado (lo asigna el humano en CU006)"]
    ANA --> AUD["7 Audita ingesta: usuario, archivo, hash, estado, tiempos"]
    AUD --> RESP["Éxito: respuesta con fichas de chunks ingestados y brechas sugeridas listas para revision humana"]
```

```mermaid
flowchart TD
    S["Administrador solicita análisis GRI de una empresa del sector permitido: Minería / Energía / Petróleo y Gas"]
    S --> R1{"¿Empresa dentro de sectores permitidos?"}
    R1 -- No --> DEN["Se informa límite de alcance de fase 1"]
    R1 -- Sí --> RAW["Consume la tabla del análisis poblada al terminar la ingesta, sin releer el documento"]
    RAW --> SUG["el sistema detecta códigos y extrae la cita (sin inferir estado)"]
    SUG --> HUM{"¿El humano asigna el estado (OK / Baja / Sub) antes de generar? RN-018"}
    HUM -- Cambia --> REG["Historial: guarda estado, quién, cuándo, anterior → nuevo"]
    HUM -- Confirma --> GEN
    REG --> GEN["Generar PDF: SELECT determinista a gri_analisis con estados validados y sanciones → Jinja2 → WeasyPrint — sin llamar al LLM"]
    GEN --> AUD2[("auditoria_eventos: generación de reporte")]
    GEN --> DL["Descarga del reporte en la UI"]
```


## 3.4 Mapeo de vistas del mock → pasos del proceso

| Vista del mock | Paso del proceso |
|---|---|
| Login (demoAccounts) | Proceso 1 · autenticación |
| Usuarios y roles (Superadmin) | Proceso 1 · gestión (RN-002, RN-003) |
| Ingesta de documentos | Proceso 2 completo |
| Auditoría de accesos | Consulta de `auditoria_eventos` |
| Asistente de IA (chat) | Proceso 3 (análisis y consulta) |
| Reportes de prospección / Descargar | Proceso 3 (generación y entregables) |

> Nota: los procesos **AS-IS** ya están en el documento A&D v1.0 (sección 5.1); el modelo **to-be** válido para FASE 1 es el de este documento. Los archivos `.bpmn` exportables (estándar BPMN 2.0, abribibles en bpmn.io / Camunda) están en la carpeta `diagramas-BPMN/`.
