# Parte 4: Diseño Funcional Detallado

**Igualab - Plataforma de Análisis de Sostenibilidad**

Documento creado: 2026-09-16

---

## Introducción

Esta sección define la estructura funcional detallada del sistema Igualab, describiendo cómo los componentes interactúan para cumplir los requerimientos especificados en la Parte 7. El diseño se fundamenta en una arquitectura cliente-servidor con un motor de inteligencia artificial basado en RAG (Retrieval-Augmented Generation) que analiza documentos de sostenibilidad e identifica indicadores GRI.

El sistema centraliza la ingesta, indexación, consulta y explotación analítica de memorias anuales y reportes de sostenibilidad (GRI) de empresas cotizantes en la Bolsa de Valores de Lima, facilitando tanto la exploración técnica como el análisis comercial.

---

## 4.1 Arquitectura del Sistema

### Componentes Principales

La arquitectura de Igualab se estructura en **7 capas** (ver diagrama vigente `FASE 1/02-Arquitectura-de-Solucion/arquitecturasolution.jpeg` — **arquitectura de solución por capas**); agrupadas funcionalmente corresponden a las siguientes capas clásicas de presentación, lógica y datos:

#### Capa de Presentación (Frontend)
- **Capa 2 del diagrama:** SPA **React 18 + Vite** (React Router · fetch/axios · HTML5/CSS3)
- Gestión, carga, análisis, RAG, reportes y auditoría
- Módulos de gestión:
  - Panel de SuperAdmin (gestión de usuarios y control total)
  - Panel de Administrador (análisis comercial y consultas)
- Dashboards de Bolsa de Valores (BVL) con visualizaciones — **fuera de alcance FASE 1 (fase 2)**
- Formularios de autenticación y recuperación de contraseña

#### Capa de API (Capa 3 del diagrama)
- **FastAPI**: Pydantic · Uvicorn · REST · HTTPS · JSON · OpenAPI
- Endpoints: Auth/Usuarios · Empresas/Documentos · Análisis GRI · Consultas RAG · Reportes · Auditoría
- Comunicación HTTPS · JSON · JWT

#### Capa de Lógica de Negocio (Backend — Capas 4 y 5 del diagrama)
- Servicios y lógica de negocio **Python 3.11** (Capa 4): gestión de sesiones y usuarios · catálogo de empresas e ingesta documental (síncrono y atómico) · análisis y validación GRI · asistente IA (RAG) · reportes de prospección · auditoría funcional
- Procesamiento y reglas de cada módulo (Capa 5): motor de procesamiento síncrono para:
  - Ingesta y validación de documentos (guard `.md` ≤ 50 MB + sha256)
  - Análisis de indicadores GRI (40 códigos del catálogo; estado manual OK/Baja/Sub)
  - Detección de brechas y sanciones
- Módulo de gestión de usuarios y roles (basado en RN-001: roles cerrados SuperAdmin/Administrador)
- Servicio de generación de reportes de prospección (HTML → PDF: solo datos de BD, snapshot inmutable, hash, JS deshabilitado)
- Módulo de auditoría: eventos sensibles (UTC · solo INSERT)
- Servicio de autenticación con validación de JWT (bcrypt · token expirable)

#### Capa de Persistencia y Datos (Capas 6 y 7 del diagrama)
- **Capa 6 — Modelos ORM:** **SQLAlchemy Async · AsyncSession** (Usuario/Sesión · Empresa/Documento/FragmentoDocumento · CatalogoGRI/GRIAnalisys · ConsultaAsistente · ReporteProspección · EventoAuditoría append-only)
- **Capa 7 — Base de datos:** **PostgreSQL 16 + PGVector · AsyncPG** con esquema normalizado
- **Índice de búsqueda semántica** (pgvector, cosine) para documentos indexados
- **Almacenamiento de corpus documental** con embedding de contenido (fragmentos · documento_vector · hash por documento)
- Tablas de auditoría para trazabilidad completa (RNF-021)

#### Servicio Externo: IA (LLM/RAG)
- API del proveedor de IA externa
- Generación de embeddings semánticos de documentos
- Respuestas en lenguaje natural a consultas del Administrador
- Timeout máximo: 1 minuto antes de reportar indisponibilidad (RNF-018)

### Relaciones entre Componentes

La comunicación sigue el patrón **cliente-servidor**:

```
┌─────────────────────────────────────────────────────────┐
│                    CLIENTE (Browser)                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Frontend: Interfaces SuperAdmin / Administrador │   │
│  └──────────────┬───────────────────────────────────┘   │
└─────────────────┼──────────────────────────────────────┘
                  │ HTTP/HTTPS
┌─────────────────┼──────────────────────────────────────┐
│  SERVIDOR (Backend)                                    │
│  ┌──────────────▼───────────────────────────────────┐  │
│  │  API RESTful + Lógica de Negocio               │  │
│  │  - Autenticación y Gestión de Sesiones        │  │
│  │  - Procesamiento de Ingesta                   │  │
│  │  - Análisis GRI y Detección de Brechas       │  │
│  │  - Consultas al Asistente IA                 │  │
│  └──────────────┬──────────────────────────────────┘  │
│                 │                                      │
│     ┌───────────┴────────────────┬──────────────┐    │
│     │                            │              │    │
│  ┌──▼──────────┐  ┌─────────────▼──┐  ┌──────▼──┐  │
│  │  PostgreSQL │  │  Search Index  │  │Auditoría│  │
│  │  (Datos)    │  │  (Semántica)   │  │(Eventos)│  │
│  └─────────────┘  └────────────────┘  └─────────┘  │
└─────────────────────────────────────────────────────┘
                  │
                  │ API (LLM/RAG)
┌─────────────────┼──────────────────────────────────────┐
│  SERVICIO EXTERNO: IA (Proveedor)                      │
│  - Procesamiento de lenguaje natural                   │
│  - Generación de embeddings                           │
│  - Análisis contextual de documentos                  │
└──────────────────────────────────────────────────────┘
```

---

## 4.2 Flujos de Información

### Flujo 1: Autenticación y Gestión de Sesión (CU001)

```
SuperAdmin/Administrador
        │
        ├─→ Ingresa correo y contraseña
        │
        └─→ Sistema valida credenciales
                ├─→ Genera token JWT firmado
                ├─→ Crea sesión activa
                ├─→ Registra evento en auditoría
                │
                └─→ Redirige a panel correspondiente
                    (SuperAdmin → Panel Admin | Administrador → Panel Analítico)
```

**Características de seguridad:**
- Contraseñas con mínimo 8 caracteres (mayúscula, minúscula, número, carácter especial) - RNF-001
- Hash SHA-256 con sal única por usuario - RNF-002
- Token JWT con vigencia limitada (sesión activa máx 2 horas) - RN-036
- Bloqueo temporal tras 5 intentos fallidos (15 minutos) - RNF-031
- Recuperación de contraseña mediante enlace seguro (vigencia 30 minutos) - RF-002

---

### Flujo 2: Ingesta de Documentos (CU003)

```
SuperAdmin
    │
    ├─→ Accede a módulo de gestión de usuarios
    │
    ├─→ Selecciona archivo (.md) con memoria anual o reporte GRI
    │   (máx 50 MB)
    │
    └─→ Sistema realiza validaciones:
            ├─→ Validación de formato (.md) - RF-018
            ├─→ Validación de tamaño (<50 MB) - RNF-014
            ├─→ Validación de contenido (códigos GRI identifi
cados) - RF-019
            │
            ├─→ Cálculo de hash SHA-256 para deduplicación - RF-020
            │
            ├─→ Generación de embeddings semánticos - RNF-028
            │   (invoca servicio IA externos)
            │
            ├─→ Indexación en motor de búsqueda semántica
            │
            ├─→ Almacenamiento en base de datos:
            │   ├─ Metadatos: empresa, año, tipo, hash
            │   ├─ Estado: "Exitoso" (si validaciones pasan)
            │   └─ Referencia al documento en corpus
            │
            ├─→ Registro en auditoría:
            │   ├─ Cuenta origen
            │   ├─ Fecha y hora (UTC, zona Lima) - RNF-034
            │   ├─ Tipo de acción (ingesta)
            │   └─ Resultado (exitoso/rechazado con motivo) - RNF-017
            │
            └─→ Notificación al SuperAdmin

**Caminos Alternativos:**
- Archivo rechazado: Sistema muestra motivo y permite reintentar
- Duplicado detectado: Sistema rechaza con indicación de documento existente
- Error en servicio IA: Procesa sin embeddings, marca para reintentar - RNF-030
```

---

### Flujo 3: Consulta Analítica (CU004) y Generación de Reporte (CU006)

```
Administrador
    │
    ├─→ Accede a módulo de consultas
    │
    ├─→ Selecciona filtros de contexto:
    │   ├─ Sector (Minería, Petróleo, Gas, Energía) - RN-019
    │   ├─ Empresa (empresas habilitadas con documentos) - RN-020
    │   └─ Año (año del reporte) - RF-037
    │
    ├─→ Formula consulta en lenguaje natural
    │   sobre sostenibilidad empresarial
    │
    └─→ Sistema procesa:
            ├─→ Validación de filtros
            │   └─ Precondición: empresa debe tener al menos
            │      un documento ingesta - RN-020
            │
            ├─→ Limitación de contexto:
            │   ├─ Búsqueda semántica limitada a sector/empresa/año
            │   └─ Respuesta generada exclusivamente del corpus - RNF-027
            │
            ├─→ Invocación de servicio IA/RAG:
            │   ├─ Envío de fragmentos relevantes del corpus
            │   ├─ Parámetro de contexto (sector, empresa, año)
            │   ├─ Timeout máximo: 15 segundos - RNF-033
            │   └─ Respuesta en lenguaje natural
            │
            ├─→ Extracción de códigos GRI identificados:
            │   ├─ Comparación automática con catálogo de 40 códigos
            │   └─ Identificación de sanciones asociadas - RN-015
            │
            ├─→ Composición de respuesta:
            │   ├─ Respuesta textual del modelo LLM
            │   ├─ Códigos GRI detectados (con referencias)
            │   ├─ Sanciones identificadas (si aplica)
            │   └─ Metadata (empresa, año, fecha consulta)
            │
            ├─→ Generación de reporte PDF:
            │   ├─ Resumen ejecutivo (generado automáticamente) - RF-041
            │   ├─ Contenido consolidado de prospección
            │   ├─ Tabla de códigos GRI con estados
            │   ├─ Tabla de sanciones identificadas
            │   └─ Inmutable tras generación - RN-026
            │
            ├─→ Registro en auditoría:
            │   ├─ Administrador
            │   ├─ Fecha/hora y zona horaria
            │   ├─ Parámetros de consulta
            │   ├─ Resultado (exitoso/sin datos)
            │   └─ Metadata del reporte generado
            │
            └─→ Presentación al Administrador:
                ├─ Respuesta en texto
                ├─ Opción de descargar PDF - RF-045
                ├─ Opción de acceder a histórico de reportes - RF-044
                └─ Visualización de indicadores GRI
```

---

### Flujo 4: Detección de Brechas GRI y Sanciones (CU005)

```
Documento Indexado
        │
        └─→ Backend (análisis automático):
                ├─→ Extracción de códigos GRI presentes en documento
                │   (búsqueda de patrones conocidos)
                │
                ├─→ Comparación contra catálogo corporativo:
                │   ├─ 40 códigos GRI versionar - RN-018
                │   ├─ Identificación de códigos "OK", "Baja sustancia",
                │   │  "Sub-reportado" - RN-016
                │   └─ Estados asignados manualmente por Administrador
                │
                ├─→ Identificación de sanciones:
                │   ├─ Búsqueda de códigos GRI con sanciones asociadas
                │   ├─ Montos de multas por sanción - RN-032
                │   └─ Clasificación: cuantificada / sin monto - RF-040
                │
                ├─→ Restricciones:
                │   ├─ Análisis solo para sectores habilitados - RN-019
                │   │  (Minería, Petróleo, Gas, Energía)
                │   ├─ Alcance limitado a 40 códigos evaluables - RN-018
                │   └─ Resultados solo en base a documentos ingesta - RN-017
                │
                └─→ Almacenamiento de resultados para reportes
                    (disponible en generación de reportes de prospección)
```

---

## 4.3 Interfaz de Usuario: Módulos Principales

### Módulo 1: Gestión de Usuarios (SuperAdmin)

**Ubicación:** Panel de SuperAdmin → "Gestión de Usuarios"

**Funcionalidades:**
- Crear cuentas de Administrador (nombre, correo, contraseña, sector)
- Habilitar/Deshabilitar cuentas
- Transferir rol SuperAdmin (atómico, con confirmación previa) - RF-014
- Ver listado de cuentas activas/inactivas
- Auditoría: registra usuario, fecha, acción, resultado

**Restricciones:**
- Solo SuperAdmin accede a este módulo - RN-001
- Un solo SuperAdmin existe en todo momento - RN-002, RN-006
- Transferencia del rol es operación única sin deshacer - RN-009

---

### Módulo 2: Ingesta de Documentos

**Ubicación:** Panel de SuperAdmin → "Cargar Documentos"

**Componentes de pantalla:**
```
┌─────────────────────────────────────────────────────┐
│  INGESTA DE DOCUMENTOS                              │
├─────────────────────────────────────────────────────┤
│                                                     │
│  Instrucciones:                                     │
│  - Formato: Markdown (.md)                          │
│  - Tamaño máximo: 50 MB                             │
│  - Contenido: Memoria anual o Reporte de            │
│    Sostenibilidad (GRI)                             │
│                                                     │
│  ┌─────────────────────────────────────────────┐   │
│  │ [Seleccionar Archivo]                       │   │
│  └─────────────────────────────────────────────┘   │
│                                                     │
│  Empresa: [____________] (desplegable)             │
│  Año: [____]                                        │
│  Tipo: [○ Memoria Anual ○ Reporte GRI]            │
│                                                     │
│  [Cargar]    [Cancelar]                             │
│                                                     │
├─────────────────────────────────────────────────────┤
│  Documentos Cargados:                               │
│  ┌─────────────────────────────────────────────┐   │
│  │ Empresa    │ Año  │ Tipo   │ Estado │ Fecha │   │
│  ├─────────────────────────────────────────────┤   │
│  │ Minera ABC │ 2024 │ Memoria│ Exitoso│ 14/09 │   │
│  │ Petro XYZ  │ 2023 │ GRI    │ Exitoso│ 10/09 │   │
│  └─────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

### Módulo 3: Consulta Analítica

**Ubicación:** Panel de Administrador → "Consultar Análisis"

**Componentes de pantalla:**
```
┌──────────────────────────────────────────────────────┐
│  ANÁLISIS DE SOSTENIBILIDAD                          │
├──────────────────────────────────────────────────────┤
│                                                      │
│  Filtros de Contexto:                               │
│  ┌──────────────────────────────────────────────┐   │
│  │ Sector:  [Minería ▼]                         │   │
│  │ Empresa: [Minera ABC ▼]                      │   │
│  │ Año:     [2024 ▼]                            │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  Su Consulta (Lenguaje Natural):                     │
│  ┌──────────────────────────────────────────────┐   │
│  │ ¿Cuáles son los principios de sostenibilidad│   │
│  │ ambiental en esta empresa?                   │   │
│  │                                              │   │
│  │                    [Consultar]               │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
├──────────────────────────────────────────────────────┤
│  RESPUESTA DEL ASISTENTE:                            │
│  ┌──────────────────────────────────────────────┐   │
│  │ La empresa reporta los siguientes principios │   │
│  │ de sostenibilidad ambiental:                 │   │
│  │ - Reducción de emisiones de carbono          │   │
│  │ - Gestión de residuos                        │   │
│  │ ...                                          │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  CÓDIGOS GRI IDENTIFICADOS:                          │
│  ┌──────────────────────────────────────────────┐   │
│  │ GRI-305 │ Emisiones             │ Estado: OK │   │
│  │ GRI-306 │ Residuos              │ Estado: OK │   │
│  │ GRI-308 │ Conformidad Ambiental  │ Bajo     │   │
│  └──────────────────────────────────────────────┘   │
│                                                      │
│  [Generar Reporte PDF]   [Ver Histórico]            │
│                                                      │
└──────────────────────────────────────────────────────┘
```

---

### Módulo 4: Auditoría de Eventos

**Ubicación:** Panel de SuperAdmin → "Auditoría"

**Campos registrados:**
- Usuario (cuenta que originó la acción)
- Fecha y Hora (UTC, con conversión a zona Lima)
- Tipo de Evento (autenticación, ingesta, cambio estado, consulta, etc.)
- Empresa y Acción afectada
- Resultado (exitoso/fallido)
- Detalles adicionales si aplica

**Restricciones:**
- Solo SuperAdmin accede - RN-001
- Registros inmutables (no se pueden modificar/eliminar) - RN-029

---

## 4.4 Patrones de Diseño

### Patrón 1: Autenticación con JWT

**Tecnología:** JSON Web Tokens firmados

**Características:**
- Token incluye: identidad del usuario, rol asignado, timestamp de emisión
- Firma validada en cada petición
- Vigencia: duración de sesión activa (máx 2 horas)
- Revocación: al cierre de sesión o deshabilitación de cuenta - RNF-005

---

### Patrón 2: RAG (Retrieval-Augmented Generation)

**Componentes:**
- **Retriever:** Búsqueda semántica en corpus indexado
- **Prompter:** Composición de prompt con fragmentos relevantes + contexto
- **Generator:** Modelo LLM genera respuesta en lenguaje natural

**Características:**
- Respuesta fundada únicamente en corpus (sin conocimiento externo)
- Contexto limitado a sector, empresa, año seleccionados
- Trazabilidad completa: registro de consulta → respuesta → auditoría

---

### Patrón 3: CQRS y Event Sourcing — NO aplicables a FASE 1

> **Fuera de alcance FASE 1.** La arquitectura de fase 1 es un **monolito modular simple (RAG simple)**; no se implementan CQRS ni Event Sourcing.

---

## 4.5 Especificaciones Técnicas

### 4.5.1 Protocolos de Comunicación

- **Cliente-Servidor:** HTTP/HTTPS (recomendado TLS 1.3)
- **API:** RESTful con JSON en request/response
- **Formato de documentos:** Markdown (.md) para ingesta
- **Reportes:** PDF generado con metadatos embebidos

### 4.5.2 Estándares de Datos

- **Codificación de caracteres:** UTF-8 en almacenamiento y transmisión
- **Formato de fechas:** ISO 8601 (YYYY-MM-DD)
- **Zona horaria:** UTC en base de datos, conversión a América/Lima en presentación - RNF-034
- **Moneda:** Usado para montos de sanciones (formato numérico con 2 decimales)

### 4.5.3 Consideraciones de Rendimiento

- **Timeout de respuesta IA:** 15 segundos máximo - RNF-033
- **Timeout de operación IA indisponible:** 1 minuto - RNF-018
- **Tamaño máximo de documento:** 50 MB - RNF-014
- **Tiempo de indexación:** máx 120 segundos por documento - RNF-015

### 4.5.4 Seguridad

- **Hashing de contraseñas:** SHA-256 con sal única - RNF-002
- **Validación de entrada:** Sanitización en todos los endpoints
- **CORS:** Configurado para origen específico (dominio Igualab)
- **Rate limiting:** Máx 5 intentos de autenticación en 15 minutos - RNF-031
- **Cifrado en tránsito:** HTTPS obligatorio

### 4.5.5 Disponibilidad y Mantenimiento

- **Degradación sin IA:** Sistema funcional si servicio IA no disponible, con marcadores de reintentos
- **Backup de datos:** Copia de seguridad de BD y corpus documental
- **Recuperación ante fallos:** Rollback de ingesta si procesamiento interrumpido - RF-054

---

## Resumen de Componentes por Módulo

| Módulo | Componentes | Acceso | Dependencias |
|--------|-------------|--------|--------------|
| Autenticación | Login, recuperación contraseña, sesiones | Público | Email externo |
| Gestión Usuarios | Crear/habilitar cuentas, transferir rol SuperAdmin | SuperAdmin | - |
| Ingesta Documentos | Carga de archivos, validación, indexación | SuperAdmin | IA (RAG), BD |
| Consultas Analíticas | Búsqueda semántica, generación reportes | Administrador | IA (RAG), BD, Email |
| Auditoría | Registros inmutables de eventos | SuperAdmin | BD |
| Dashboards BVL (fase 2 — fuera de alcance FASE 1) | Visualización de indicadores | Público/Autenticado | BD |

---

## Notas Finales

Este diseño funcional detallado integra:
- **Arquitectura:** Cliente-servidor con componentes desacoplados
- **Seguridad:** Autenticación fuerte, auditoría completa, integridad de datos
- **Escalabilidad:** Índices semánticos optimizados, procesamiento síncrono
- **Usabilidad:** Interfaces intuitivas para SuperAdmin y Administrador
- **Confiabilidad:** Degradación elegante si servicios externos no están disponibles

La implementación debe seguir las reglas de negocio (RN-001 a RN-039) y requerimientos funcionales/no funcionales (RF-001 a RF-056, RNF-001 a RNF-036) especificados en la Parte 7 del Análisis y Diseño.
