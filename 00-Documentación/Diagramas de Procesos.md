# Diagramas de Procesos (Mermaid)

Diagramas de procesos completos de la plataforma Igualab. Renderizables en Obsidian. Basados en el Plan de Proyecto oficial y el vault actualizado.

> 🧭 **Dos vistas complementarias:** este documento es la **vista técnica** (servicios, almacenamiento e infraestructura: Cognito, Lambda, S3, Bedrock, OpenSearch, DynamoDB, Aurora). La **vista de negocio** (solo actores, actividades y decisiones, sin stack) está en [[18 Diagramas de Procesos (Lógica de Negocio)]] — usa esa para presentar al cliente.

---

## 1. Proceso General de la Plataforma

```mermaid
flowchart TB
    subgraph ENTRADA["🚪 Acceso"]
        L[Login] --> COG{{Cognito}}
        COG --> GW{{API Gateway}}
        GW -->|Valida rol| ROLES{¿Rol?}
    end

    subgraph SUPERADMIN["🟡 SUPERADMIN"]
        ROLES -->|Superadmin| SA_US[👤 Gestionar usuarios]
        ROLES -->|Superadmin| SA_CFG[⚙️ Configurar sistema]
        ROLES -->|Superadmin| SA_AUD[📋 Ver auditoría]
        SA_US --> AUR[(Aurora Serverless)]
        SA_CFG --> AUR
        SA_AUD --> AUR
    end

    subgraph ADMIN["🟢 ADMINISTRADOR"]
        ROLES -->|Administrador| AD_ING[📥 Ingestar datos]
        ROLES -->|Administrador| AD_IA[🤖 Asistente IA]
        ROLES -->|Administrador| AD_REP[📄 Generar reportes]
        ROLES -->|Administrador| AD_BOL[📊 Ver Bolsa]
        AD_ING --> S3[(S3)]
        S3 --> BED[Bedrock]
        BED --> OS[(OpenSearch)]
        AD_IA --> OS
        AD_IA --> DYN[(DynamoDB)]
        AD_REP --> OS
        AD_REP --> DYN
        AD_BOL --> API_BOL[API Bolsa]
    end

    subgraph USUARIO["🔵 USUARIO OPERATIVO"]
        ROLES -->|Usuario| US_BOL[📊 Ver dashboards]
        ROLES -->|Usuario| US_DESC[⬇️ Descargar reportes]
        US_BOL --> API_BOL
        US_DESC --> AD_REP
    end

    subgraph PUBLICO["👥 PÚBLICO"]
        ROLES -->|Público| PU_DOC[📚 Consultar documentos]
        ROLES -->|Público| PU_CHAT[💬 Chatbot citas - Fase 2]
        PU_DOC --> OS
    end

    style ENTRADA fill:#e3f2fd,stroke:#1565c0
    style SUPERADMIN fill:#fff8e1,stroke:#f9a825
    style ADMIN fill:#e8f5e9,stroke:#2e7d32
    style USUARIO fill:#e3f2fd,stroke:#1565c0
    style PUBLICO fill:#f3e5f5,stroke:#7b1fa2
```

---

## 2. Flujo de Autenticación y RBAC

```mermaid
flowchart LR
    U[Usuario] -->|Ingresa credenciales| COG[Cognito]
    COG -->|Autentica| ROL{¿Rol asignado?}

    ROL -->|Superadmin| SA_P[Dashboard gestión]
    ROL -->|Administrador| AD_P[Dashboard análisis]
    ROL -->|Usuario| US_P[Dashboard lectura]
    ROL -->|Credenciales inválidas| ERR[❌ Error + registro auditoría]

    SA_P -->|Solo puede| SA_M[Gestionar usuarios]
    SA_P -->|Solo puede| SA_C[Configurar sistema]
    SA_P -->|Solo puede| SA_A[Ver auditoría]

    AD_P -->|Solo puede| AD_I[Ingestar datos]
    AD_P -->|Solo puede| AD_R[Consultar IA]
    AD_P -->|Solo puede| AD_G[Generar reportes]

    US_P -->|Solo puede| US_V[Ver dashboards]
    US_P -->|Solo puede| US_D[Descargar reportes]

    style ROL fill:#fff9c4,stroke:#f9a825
    style ERR fill:#ffebee,stroke:#c62828
```

---

## 3. Pipeline de Ingesta de Datos

```mermaid
flowchart TB
    subgraph FUENTES["📥 Fuentes de datos"]
        F1[📄 Memorias anuales<br/>Bolsa de Valores de Lima]
        F2[📊 Reportes de sostenibilidad<br/>GRI - web empresas]
        F3[📈 Métricas industriales<br/>Datos tabulares]
    end

    subgraph CARGA["⬇️ Carga (Administrador)"]
        F1 -->|PDF| CARGA_MAN[Carga manual]
        F2 -->|PDF| CARGA_MAN
        F3 -->|XLSX/CSV| CARGA_MAN
        F1 -.->|web scraping - Fase 2| CARGA_AUTO[Carga automática]
        F2 -.->|web scraping - Fase 2| CARGA_AUTO
    end

    subgraph PROCESO["⚙️ Proceso de ingesta"]
        CARGA_MAN --> S3[🗑️ S3<br/>Almacena PDFs]
        CARGA_AUTO --> S3
        S3 --> TRIGGER[Trigger Lambda]
        TRIGGER --> BED[🧠 Bedrock<br/>Genera embeddings]
        TRIGGER --> EXTRACT[🔍 Extracción]
        BED --> OS[(OpenSearch<br/>Vectores RAG)]
        EXTRACT --> GRI[📋 Análisis GRI<br/>Detección brechas]
        EXTRACT --> SAN[⚖️ Análisis sanciones<br/>Cuantificación]
        GRI --> DYN[(DynamoDB<br/>Métricas estructuradas)]
        SAN --> DYN
    end

    subgraph RESULTADO["✅ Resultado"]
        OS --> CONSULTA[🤖 Asistente IA<br/>Consulta RAG]
        DYN --> CONSULTA
        OS --> REP[📄 Generación reportes]
        DYN --> REP
    end

    style FUENTES fill:#e3f2fd,stroke:#1565c0
    style CARGA fill:#fff8e1,stroke:#f9a825
    style PROCESO fill:#e8f5e9,stroke:#2e7d32
    style RESULTADO fill:#f3e5f5,stroke:#7b1fa2
```

---

## 4. Flujo del Motor RAG (Consulta IA)

```mermaid
flowchart TB
    START([🤖 Administrador pregunta]) --> VALIDAR

    subgraph VALIDAR["🔐 Validación"]
        VALIDAR --> COG[Cognito<br/>Verifica rol Administrador]
        COG --> GW[API Gateway<br/>Valida permisos]
    end

    GW --> PROCESAR

    subgraph PROCESAR["⚙️ Procesamiento"]
        PROCESAR --> PARSE[Parsea lenguaje natural]
        PARSE --> CLASSIFY{¿Tipo de consulta?}

        CLASSIFY -->|Documentos/RAG| SEMANTIC[🔍 Búsqueda semántica<br/>OpenSearch]
        CLASSIFY -->|Métricas| TABULAR[📊 Query estructurada<br/>DynamoDB/Aurora]
        CLASSIFY -->|Mixta| BOTH[Combina ambas]

        SEMANTIC --> CONTEXT[Recupera contexto + fuentes]
        TABULAR --> CONTEXT
        BOTH --> CONTEXT
    end

    CONTEXT --> GENERAR

    subgraph GENERAR["🧠 Generación de respuesta"]
        CONTEXT --> BED[Bedrock LLM<br/>Compone respuesta]
        BED -->         CITAS["Agrega citas<br/>1. Memoria p.142<br/>2. Res. OEFA"]
        CITAS --> FORMAT[Formatea respuesta<br/>con fuentes verificables]
    end

    FORMAT --> RESPUESTA([✅ Respuesta al Administrador<br/>Latencia < 5s])

    style START fill:#e8f5e9,stroke:#2e7d32
    style VALIDAR fill:#fff8e1,stroke:#f9a825
    style PROCESAR fill:#e3f2fd,stroke:#1565c0
    style GENERAR fill:#f3e5f5,stroke:#7b1fa2
    style RESPUESTA fill:#e8f5e9,stroke:#2e7d32
```

---

## 5. Flujo de Detección de Brechas GRI

```mermaid
flowchart TB
    DOC([📄 Documento ingestado<br/>Memoria/Reporte GRI]) --> EXTRACT

    subgraph EXTRACT["🔍 Extracción"]
        EXTRACT --> PARSE[Parseo del documento]
        PARSE --> CODES[Identifica códigos GRI<br/>GRI 305, GRI 401, etc.]
    end

    CODES --> ANALYSIS

    subgraph ANALYSIS["📊 Análisis de sustancia"]
        ANALYSIS --> MEASURE[Mide nivel de sustancia<br/>por código GRI]
        MEASURE --> COMPARE{¿Cumple estándar?}

        COMPARE -->|OK| OK[✅ Reporte completo<br/>Sustancia adecuada]
        COMPARE -->|Sub-reportado| SUB[⚠️ Brecha identificada<br/>Poca sustancia]
        COMPARE -->|Baja sustancia| BAJA[🟡 Débil<br/>Política sin casos]
    end

    subgraph ALERT["🚨 Alerta de prospección"]
        SUB --> ALERT_MSG[Oportunidad comercial<br/>Empresa con brecha GRI]
        BAJA --> ALERT_MSG
        ALERT_MSG --> REPORT[📄 Se incluye en<br/>reporte de prospección]
    end

    OK --> STORE[(DynamoDB<br/>Almacena resultado)]
    ALERT_MSG --> STORE

    style DOC fill:#e3f2fd,stroke:#1565c0
    style EXTRACT fill:#fff8e1,stroke:#f9a825
    style ANALYSIS fill:#e8f5e9,stroke:#2e7d32
    style ALERT fill:#ffebee,stroke:#c62828
```

---

## 6. Flujo de Análisis de Sanciones

```mermaid
flowchart TB
    MEM([📄 Memoria anual<br/>Repositorio Bolsa de Lima]) --> SCAN

    subgraph SCAN["🔍 Escaneo"]
        SCAN --> SEARCH[Busca sección<br/>Pasivos contingentes]
        SEARCH --> IDENTIFY[Identifica sanciones<br/>multas, procedimientos]
    end

    IDENTIFY --> EXTRACT

    subgraph EXTRACT["💰 Extracción de datos"]
        EXTRACT --> ENTITY[Entidad sancionadora<br/>OEFA, Ministerio, SBS]
        EXTRACT --> AMOUNT[Monto S/ cuantificable]
        EXTRACT --> YEAR[Año de la sanción]
        EXTRACT --> REASON[Motivo / incumplimiento]
    end

    ENTITY --> STORE
    AMOUNT --> STORE
    YEAR --> STORE
    REASON --> STORE

    STORE[(DynamoDB<br/>Sanciones por empresa)]

    STORE --> ALERT

    subgraph ALERT["🚨 Alerta de prospección"]
        ALERT --> RANK[Ranking de empresas<br/>por total sanciones]
        RANK --> OPP[Oportunidad: reparar<br/>reputación de empresa]
        OPP --> PDF[📄 Reporte PDF<br/>con sanciones cuantificadas]
    end

    style MEM fill:#e3f2fd,stroke:#1565c0
    style SCAN fill:#fff8e1,stroke:#f9a825
    style EXTRACT fill:#e8f5e9,stroke:#2e7d32
    style ALERT fill:#ffebee,stroke:#c62828
```

---

## 7. Flujo de Generación de Reportes PDF

```mermaid
flowchart TB
    START([📄 Administrador:<br/>Generar reporte]) --> CONFIG

    subgraph CONFIG["⚙️ Configuración"]
        CONFIG --> SELECT[Selecciona empresa]
        SELECT --> PERIOD[Define periodo<br/>2023 - 2025]
        PERIOD --> SECTIONS[Elige secciones<br/>Resumen · GRI · Sanciones]
    end

    SECTIONS --> COMPILE

    subgraph COMPILE["📝 Compilación automática"]
        COMPILE --> FETCH_GRI[Recupera brechas GRI<br/>OpenSearch]
        COMPILE --> FETCH_SAN[Recupera sanciones<br/>DynamoDB]
        COMPILE --> FETCH_MET[Recupera métricas<br/>ESG · Riesgo]
        FETCH_GRI --> BUILD[Construye PDF<br/>Plantilla A4]
        FETCH_SAN --> BUILD
        FETCH_MET --> BUILD
    end

    BUILD --> AUDIT

    subgraph AUDIT["📋 Auditoría"]
        AUDIT --> LOG[Registra en auditoría<br/>"Generó reporte"]
        LOG --> SAVE[(Aurora<br/>Tabla auditoría)]
    end

    BUILD --> DELIVER

    subgraph DELIVER["📤 Entrega"]
        DELIVER --> STORE_S3[Almacena en S3]
        STORE_S3 --> DOWNLOAD[Enlace de descarga]
        DOWNLOAD --> PREVIEW[Vista previa A4]
    end

    PREVIEW --> DONE([✅ PDF listo para descargar])

    style START fill:#e8f5e9,stroke:#2e7d32
    style CONFIG fill:#fff8e1,stroke:#f9a825
    style COMPILE fill:#e3f2fd,stroke:#1565c0
    style AUDIT fill:#f3e5f5,stroke:#7b1fa2
    style DELIVER fill:#e8f5e9,stroke:#2e7d32
    style DONE fill:#e8f5e9,stroke:#2e7d32
```

---

## 8. Flujo de Auditoría (Trazabilidad)

```mermaid
flowchart TB
    subgraph EVENTOS["📡 Eventos que se registran"]
        E1[🔑 Inicio de sesión]
        E2[🔄 Cambio de rol]
        E3[📥 Ingesta de datos]
        E4[📄 Generación de reporte]
        E5[⬇️ Descarga]
        E6[⚙️ Configuración]
        E7[❌ Intento fallido]
    end

    subgraph CAPTURE["📋 Captura"]
        E1 --> LOG[λ Auditoría]
        E2 --> LOG
        E3 --> LOG
        E4 --> LOG
        E5 --> LOG
        E6 --> LOG
        E7 --> LOG
    end

    LOG --> REGISTRO

    subgraph REGISTRO["💾 Registro"]
        REGISTRO --> DATA[Capture:<br/>• Fecha/hora<br/>• Usuario<br/>• Tipo de evento<br/>• Acción realizada]
        DATA --> AUR[(Aurora Serverless<br/>Tabla auditoría<br/>Solo lectura)]
    end

    AUR --> CONSULTA

    subgraph CONSULTA["🔍 Consulta (Superadmin)"]
        CONSULTA --> FILTER[Filtros:<br/>Tipo · Usuario · Fecha]
        FILTER --> VIEW[Tabla de auditoría<br/>Exportable CSV]
    end

    style EVENTOS fill:#ffebee,stroke:#c62828
    style CAPTURE fill:#fff8e1,stroke:#f9a825
    style REGISTRO fill:#e3f2fd,stroke:#1565c0
    style CONSULTA fill:#e8f5e9,stroke:#2e7d32
```

---

## 9. Procesos por Fases del Proyecto

```mermaid
flowchart LR
    subgraph FASE1["🏠 FASE INICIAL<br/>21/08 - 31/08"]
        F1A[Kick-off]
        F1B[Plan de trabajo]
        F1C[Mockup solución]
        F1A --> F1B --> F1C
    end

    subgraph FASE2["📐 ANÁLISIS Y DISEÑO<br/>04/09 - 07/09"]
        F2A[Plan proyecto + metodología]
        F2B[Análisis GAP]
        F2C[Backlog inicial]
        F2A --> F2B --> F2C
    end

    subgraph FASE3["🔧 DESARROLLO<br/>11/09 - 09/11"]
        F3A[Arquitectura + prototipo]
        F3B[Demo RBAC<br/>28/09]
        F3C[Demo RAG<br/>05/10]
        F3D[Demo GRI<br/>19/10]
        F3E[Demo reportes<br/>23/10]
        F3F[Integración<br/>30/10]
        F3G[Auditoría<br/>02/11]
        F3H[Pruebas<br/>09/11]
        F3A --> F3B --> F3C --> F3D --> F3E --> F3F --> F3G --> F3H
    end

    subgraph FASE4["🎉 CIERRE<br/>13/11 - 20/11"]
        F4A[Despliegue]
        F4B[UAT]
        F4C[Capacitación]
        F4D[Entrega final]
        F4A --> F4B --> F4C --> F4D
    end

    FASE1 --> FASE2 --> FASE3 --> FASE4

    style FASE1 fill:#e3f2fd,stroke:#1565c0
    style FASE2 fill:#fff8e1,stroke:#f9a825
    style FASE3 fill:#e8f5e9,stroke:#2e7d32
    style FASE4 fill:#f3e5f5,stroke:#7b1fa2
```

---

## 10. Arquitectura AWS (Flujo de componentes)

```mermaid
flowchart TB
    subgraph USERS["👥 Usuarios"]
        USR[Web App<br/>React + Tailwind]
    end

    subgraph AUTH["🔐 Autenticación"]
        COG[Cognito<br/>Login + RBAC]
        GW[API Gateway<br/>Validación de rol]
    end

    subgraph LAMBDA["⚡ Lambda Functions"]
        LAMB_US[λ Usuarios]
        LAMB_ING[λ Ingesta]
        LAMB_IA[λ IA Chat]
        LAMB_REP[λ Reportes]
        LAMB_BOL[λ Bolsa]
        LAMB_AUD[λ Auditoría]
    end

    subgraph STORAGE["💾 Almacenamiento"]
        S3[(S3<br/>PDFs / documentos)]
        AUR[(Aurora Serverless v2<br/>usuarios · roles · auditoría)]
        DYN[(DynamoDB<br/>métricas · sanciones · GRI)]
        OS[(OpenSearch<br/>vectores RAG)]
    end

    subgraph AI["🧠 Inteligencia"]
        BED[Bedrock<br/>Embeddings + LLM]
    end

    subgraph EXTERNAL["🌐 Externos"]
        API_BOL[API Bolsa de Valores]
        WEB[Web scraping<br/>Fase 2]
    end

    USR --> COG --> GW
    GW --> LAMB_US --> AUR
    GW --> LAMB_ING --> S3
    LAMB_ING --> BED --> OS
    LAMB_ING --> DYN
    GW --> LAMB_IA --> OS
    LAMB_IA --> DYN
    LAMB_IA --> BED
    GW --> LAMB_REP --> OS
    LAMB_REP --> DYN
    LAMB_REP --> S3
    GW --> LAMB_BOL --> API_BOL
    GW --> LAMB_AUD --> AUR
    WEB --> S3

    style USERS fill:#e3f2fd,stroke:#1565c0
    style AUTH fill:#fff8e1,stroke:#f9a825
    style LAMBDA fill:#e8f5e9,stroke:#2e7d32
    style STORAGE fill:#f3e5f5,stroke:#7b1fa2
    style AI fill:#fce4ec,stroke:#c62828
    style EXTERNAL fill:#e0f2f1,stroke:#00695c
```

---

## 🔗 Relacionado
- [[18 Diagramas de Procesos (Lógica de Negocio)]] · [[06 Arquitectura (AWS)]] · [[07 Flujos por Rol]] · [[08 Ingesta de Datos]] · [[15 Arquitectura de Solución]] · [[16 Diagramas de Secuencia]] · [[17 Diagrama de Casos de Uso]]
