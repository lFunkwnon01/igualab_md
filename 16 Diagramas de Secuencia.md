# 16 · Diagramas de Secuencia

Diagramas de secuencia (Mermaid) de los flujos principales de la plataforma Igualab. Renderizables en Obsidian. Complementan [[15 Arquitectura de Solución]] y [[07 Flujos por Rol]].

## 1. Ingesta de documento (Administrador — RF-06)
```mermaid
sequenceDiagram
    actor Admin as Administrador
    participant Cog as Cognito
    participant GW as API Gateway
    participant Ing as λ Ingesta
    participant S3 as S3
    participant Bed as Bedrock
    participant OS as OpenSearch
    participant DB as Base de datos
    Admin->>Cog: Login
    Admin->>GW: Sube PDF (memoria/reporte)
    GW->>GW: Valida rol (Administrador)
    GW->>Ing: PUT /ingesta
    Ing->>S3: Guarda documento
    Ing->>Bed: Genera embeddings
    Bed->>OS: Indexa vectores (con fuente)
    Ing->>DB: Registra metadatos + métricas/GRI
    Ing-->>Admin: Confirmación
```

## 2. Consulta RAG del asistente (Administrador — RF-05)
```mermaid
sequenceDiagram
    actor Admin as Administrador
    participant Cog as Cognito
    participant GW as API Gateway
    participant IA as λ IA
    participant OS as OpenSearch
    participant DB as Base de datos
    participant Bed as Bedrock (LLM)
    Admin->>GW: Pregunta en lenguaje natural
    GW->>GW: Valida rol (Administrador)
    GW->>IA: POST /chat
    IA->>OS: Búsqueda semántica (RAG)
    IA->>DB: Métricas/GRI estructuradas
    IA->>Bed: Compone respuesta con contexto
    Bed-->>IA: Respuesta + fuentes
    IA-->>Admin: Respuesta citando memoria/reporte
```

## 3. Generación de reporte PDF (Administrador — RF-07)
```mermaid
sequenceDiagram
    actor Admin as Administrador
    participant GW as API Gateway
    participant Rep as λ Reportes
    participant OS as OpenSearch
    participant DB as Base de datos
    participant S3 as S3
    Admin->>GW: "Generar reporte de prospección"
    GW->>Rep: POST /reportes
    Rep->>OS: Recupera brechas GRI y sanciones
    Rep->>DB: Métricas del sector/empresa
    Rep->>Rep: Compila PDF (un click)
    Rep->>S3: Almacena PDF
    Rep-->>Admin: Enlace de descarga
```

## 4. Rol público (lectura unificada — RF-14)
```mermaid
sequenceDiagram
    actor Pub as Usuario público
    participant Cog as Cognito
    participant GW as API Gateway
    participant Lec as λ Lectura
    participant DB as Base de datos
    participant OS as OpenSearch
    Pub->>Cog: Login (rol público)
    Pub->>GW: Solicita documentos unificados
    GW->>GW: Valida rol (público)
    GW->>Lec: GET /documentos
    Lec->>DB: Memorias + reportes indexados
    Lec->>OS: Metadatos de búsqueda
    Lec-->>Pub: Vista unificada (sin prospectar)
```

## 🔗 Relacionado
- [[15 Arquitectura de Solución]] · [[07 Flujos por Rol]] · [[08 Ingesta de Datos]] · [[06 Arquitectura (AWS)]]
