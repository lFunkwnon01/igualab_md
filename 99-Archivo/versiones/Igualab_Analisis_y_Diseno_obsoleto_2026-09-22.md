# Igualab — Documento de Análisis y Diseño

> Plataforma de Analítica de Sostenibilidad (RAG) · FASE 1

---

## HISTORIAL DE VERSIONES

| FECHA | VERSIÓN | DESCRIPCIÓN |
|-------|---------|-------------|
| 12/09/2026 | 1.0 | Primera versión oficial — consolidación del análisis y diseño de FASE 1 |

| VERSIÓN | AUTORES | REVISADO POR | APROBADO POR |
|---------|---------|--------------|--------------|
| 1.0 | Carlos David Ordinola Ortega (Analista Funcional) · Juan Marcelo Ferreyra Gonzales (Backend) · Juan Renato Flores Pascual (Frontend) | Fabricio Godofredo Ladera La Torre (PM) · Teofilo Chambilla Aquino (Profesor) | Oscar Rafael Baldeón Montoro (PO/Cliente) |

**Equipo:**
- **Project Manager:** Fabricio Godofredo Ladera La Torre
- **Analista Funcional:** Carlos David Ordinola Ortega
- **Analista Funcional:** Luis Javier Millones Carrasco
- **Desarrollador Backend:** Juan Marcelo Ferreyra Gonzales
- **Desarrollador Frontend:** Juan Renato Flores Pascual
- **Tester:** Mauricio Gabriel Gonzalez Kremer
- **Tester:** Alonso Aarón Benites Camacho

**Revisores:**
- TCH: Teofilo Chambilla Aquino

**Aprobadores:**
- Oscar Rafael Baldeón Montoro (PO/Cliente)

---

## CONTENIDO

1. ANTECEDENTES
2. OBJETIVO GENERAL
3. ALCANCE DEL PROYECTO
4. DISEÑO FUNCIONAL DETALLADO
5. DIAGRAMA DEL PROCESO
   - 5.1. Proceso actual (AS-IS)
   - 5.2. Problemas identificados
   - 5.3. Proceso propuesto (TO-BE)
   - 5.4. Pipeline de ingesta detallado
   - 5.5. Flujo de análisis GRI y generación de reporte
6. REGLAS DE NEGOCIO
7. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL
   - 7.1. ACTORES
   - 7.2. DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN
   - 7.3. REQUERIMIENTOS FUNCIONALES
   - 7.4. REQUERIMIENTOS NO FUNCIONALES
8. MODELO DE DATOS
9. DICCIONARIO DE DATOS
10. DISEÑO ARQUITECTÓNICO
11. PROTOTIPO

---

## GLOSARIO DE TÉRMINOS

| Término | Definición |
|---------|------------|
| **RAG** | Retrieval-Augmented Generation. Técnica de IA que combina recuperación de documentos con generación de texto para responder preguntas basándose en una base de conocimiento específica. |
| **GRI** | Global Reporting Initiative. Estándar internacional para reportes de sostenibilidad que define indicadores de desempeño ambiental, social y de gobernanza. |
| **Brecha GRI** | Diferencia entre lo que el estándar GRI exige reportar y lo que la empresa realmente reporta en sus documentos de sostenibilidad. |
| **RBAC** | Role-Based Access Control. Control de acceso basado en roles que define permisos según el perfil del usuario. |
| **PGvector** | Extensión de PostgreSQL que permite almacenar y consultar vectores embedding para búsquedas semánticas. |
| **Embedding** | Representación vectorial de texto que captura su significado semántico para búsquedas de similitud. |
| **Chunking** | Proceso de dividir documentos en fragmentos más pequeños para su indexación y recuperación eficiente. |
| **Superadmin** | Rol de usuario con permisos de administración completa: gestión de usuarios, ingesta de documentos y configuración del sistema. |
| **Administrador** | Rol de usuario con permisos de explotación analítica: consultas al asistente IA, revisión de brechas y generación de reportes. |
| **Memoria Anual** | Documento financiero obligatorio para empresas que cotizan en la Bolsa de Valores de Lima, que contiene resultados financieros, gobierno corporativo y sanciones. |
| **Reporte de Sostenibilidad** | Documento validado por auditores internacionales bajo el estándar GRI que reporta el desempeño ambiental, social y de gobernanza de una empresa. |
| **Bolsa de Valores de Lima (BVL)** | Mercado de valores peruano donde cotizan empresas que están obligadas a emitir memorias anuales financieras. |
| **LLM** | Large Language Model. Modelo de lenguaje grande utilizado para generar texto y responder preguntas. |
| **Free Tier** | Nivel gratuito de un servicio de API que ofrece un límite de uso sin costo. |
| **OpenRouter** | Plataforma que agrega múltiples modelos de IA y permite acceder a ellos mediante una API unificada. |
| **Docker** | Plataforma de contenedores que permite empaquetar aplicaciones con sus dependencias para despliegue reproducible. |
| **FastAPI** | Framework web moderno para Python que permite crear APIs de alta performance con documentación automática. |
| **Jinja2** | Motor de plantillas para Python utilizado para generar HTML y otros formatos con variables dinámicas. |
| **WeasyPrint** | Herramienta de conversión de HTML/CSS a PDF utilizada para generar reportes. |
| **JWT** | JSON Web Token. Estándar para transmitir información de forma segura entre partes como tokens de autenticación. |
| **SHA-256** | Algoritmo de hash criptográfico que genera una huella digital única de 64 caracteres para verificar integridad de archivos. |
| **ASG** | Ambiental, Social y Gobernanza. Marco de evaluación del desempeño sostenible de las empresas. |
| **DEI** | Diversidad, Equidad e Inclusión. Marco de prácticas laborales que promueve entornos diversos e inclusivos. |
| **RSE** | Responsabilidad Social Empresarial. Compromiso de las empresas con el desarrollo sostenible y el bienestar social. |
| **EPD** | Entidad Perceptora de Donaciones. Certificación que permite a organizaciones接收ar donaciones con beneficios tributarios. |
| **BPMN** | Business Process Model and Notation. Estándar gráfico para modelar procesos de negocio. |
| **UAT** | User Acceptance Testing. Pruebas de aceptación realizadas con usuarios finales para validar el sistema. |
| **Sprint** | Período de tiempo fijo (típicamente 2-4 semanas) en el que se completa un conjunto de trabajo en metodología SCRUM. |
| **MVP** | Minimum Viable Product. Versión mínima del producto que incluye las funcionalidades esenciales para validar la solución. |
| **PO** | Product Owner. Rol en SCRUM responsable de definir prioridades y validar el producto con el cliente. |
| **PM** | Project Manager. Jefe de proyecto responsable de la planificación, dirección y gestión del equipo. |

---

## 1. ANTECEDENTES

Igualab es una organización peruana dedicada a la consultoría en Diversidad e Inclusión (DEI), sostenibilidad y Responsabilidad Social Empresarial (RSE), enfocada en promover entornos laborales inclusivos y prácticas ASG (Ambiental, Social y Gobernanza) en el sector empresarial peruano. Fundada en 2016, cuenta con certificaciones como Entidad Perceptora de Donaciones (EPD) y reconocimientos internacionales como el Corporate Live Wire Innovation & Excellence Awards.

En el contexto peruano, las empresas que cotizan en la Bolsa de Valores de Lima están obligadas a emitir memorias anuales financieras, mientras que los reportes de sostenibilidad son validados por auditores internacionales bajo estándares como el GRI (Global Reporting Initiative). Estos documentos contienen información crítica sobre **cumplimiento normativo, sanciones económicas, indicadores de gobernanza y métricas de desempeño ambiental y social** — y son la base del análisis de brechas del sistema.

Actualmente, Igualab enfrenta un desafío operativo en su área comercial: opera de manera reactiva, recibiendo empresas de forma orgánica, sin herramientas que sistematicen el análisis de información pública para detectar oportunidades de acercamiento. Frente a ello, se plantea el desarrollo de una plataforma basada en inteligencia artificial (RAG) que permita procesar reportes de sostenibilidad y memorias anuales, identificar brechas en indicadores ASG/GRI y generar información procesada que facilite la toma de decisiones comerciales.

**Documento de soporte:** Plan de Proyecto v1.2 (aprobado 11/09/2026) · Actas CS3081-001…005 · Mock fidelizado: https://igualab.vercel.app/

---

## 2. OBJETIVO GENERAL

Desarrollar una plataforma web de analítica de sostenibilidad que permita a Igualab procesar y consultar información pública de empresas (reportes de sostenibilidad y memorias anuales de la Bolsa de Valores de Lima), identificando brechas en indicadores ASG mediante un asistente de inteligencia artificial (RAG), para impulsar la prospección comercial de la organización de manera proactiva y fundamentada en datos.

### 2.1 Objetivos específicos de FASE 1

1. Implementar la **ingesta de documentos** en formato `.md` con tablas con pipes (REQ-20 del acta 5), con validación de formato y tamaño.
2. Desarrollar el **asistente IA (RAG)** con citación obligatoria de fuentes de datos ingestados.
3. Implementar la **detección y captura de brechas GRI y sanciones**, con estados validados por el humano (antes de generar el reporte).
4. Generar **reportes de prospección PDF** mediante plantilla con variables dinámicas desde la base de datos.
5. Establecer **RBAC de 2 roles** (Superadmin / Administrador) y el **registro de auditoría** de eventos sensibles.

---

## 3. ALCANCE DEL PROYECTO

### 3.1 Dentro del alcance (FASE 1)

El proyecto comprende el diseño, desarrollo e implementación de una plataforma web que centralice la ingesta, indexación, consulta y explotación analítica de memorias anuales y reportes de sostenibilidad (GRI) de empresas que cotizan en la Bolsa de Valores de Lima, mediante una arquitectura cliente-servidor y un motor de inteligencia artificial basado en RAG (Retrieval-Augmented Generation), construido sobre un LLM gratuito.

El sistema está orientado a optimizar las operaciones de **dos perfiles** (3 usuarios: 1 Superadmin + 2 Administradores):

- **Superadmin** (1 persona — gestión): crea usuarios, habilita/deshabilita, asigna roles, y es responsable de la **ingesta de documentos** `.md` al sistema.
- **Administrador** (2 personas — explotación): realiza consultas al asistente de IA (RAG), **revisa y supervisa** las brechas GRI y sanciones detectadas, y genera **reportes de prospección comercial en PDF**.

**Módulos funcionales:**
- Autenticación y RBAC (2 roles)
- Ingesta de documentos `.md` (síncrona, con guard de validación)
- Asistente IA (RAG simple, sin function calling)
- Análisis de brechas GRI y sanciones (con supervisión humana)
- Generación de reportes de prospección PDF
- Auditoría de eventos sensibles
- Gestión de catálogo de empresas

### 3.2 Fuera del alcance (FASE 1)

| Excluido | Referencia |
|----------|------------|
| Dashboards de visualización (KPIs ASG/ESG) | acta 5 · REQ-19 |
| Módulo de Bolsa de Valores | acta 5 · REQ-16 |
| Búsqueda vía LinkedIn | acta 5 · REQ-17 |
| Chatbot inclusivo & asistente vocal | fase 2 del plan |
| Integración con APIs externas | FASE 1 = solo documentos del cliente |
| Despliegue a producción | acta 4 · REQ-11 (entorno desarrollo universidad) |

### 3.3 Sectores en alcance

El análisis de brechas GRI / sanciones se limita a los sectores (acta 3):

1. **Minería**
2. **Energía**
3. **Petróleo y Gas**

---

## 4. DISEÑO FUNCIONAL DETALLADO

El sistema se estructura en los siguientes módulos funcionales:

### 4.1 Módulo de Seguridad y Autenticación

- Autenticación con correo y contraseña (bcrypt/argon2)
- Recuperación de contraseña mediante enlace seguro
- Control de sesión con expiración por inactividad (configurable)
- RBAC de 2 roles (Superadmin / Administrador)
- Registro de eventos sensibles (login, login fallido)

### 4.2 Módulo de Gestión de Usuarios (Superadmin)

- Crear, editar, habilitar/deshabilitar usuarios
- Asignar roles (con transferencia automática de Superadmin)
- Máximo 1 Superadmin activo en todo momento
- Auditoría de cambios de rol y estado

### 4.3 Módulo de Ingesta de Documentos (Superadmin)

- Carga síncrona de archivos `.md` con tablas con pipes
- Guard de validación: extensión, tamaño ≤ 50 MB, contenido mínimo GRI
- Anti-duplicado por SHA-256
- Pipeline: parseo → chunking → embeddings locales → pgvector
- Estados: indexado / observado / rechazado (con motivo)
- Registro en auditoría

### 4.4 Módulo de Asistente IA (RAG)

- Consulta en lenguaje natural sobre documentos indexados
- Búsqueda semántica pgvector (k=4, cosine similarity)
- Respuesta con citas obligatorias (documento + sección)
- Manejo de indisponibilidad del LLM (sin bloquear resto del sistema)

### 4.5 Módulo de Análisis GRI / Sanciones

- Comparación contra catálogo GRI (reglas deterministas)
- Estados sugeridos: OK / SUB-REPORTADO / BAJA SUSTANCIA / CRITICO
- Supervisión humana: Administrador valida o cambia estado
- Observación obligatoria al cambiar estado
- Historial de cambios (quién, cuándo, anterior → nuevo)
- Registro de sanciones con cita verificable

### 4.6 Módulo de Reportes de Prospección (PDF)

- Plantilla Jinja2 + WeasyPrint
- Variables dinámicas desde BD (sin llamadas al LLM)
- Contenido mínimo: brechas con estado validado, sanciones, resumen ejecutivo
- Versionado e inmutabilidad (nueva versión = nueva generación)
- Historial de reportes generados

### 4.7 Módulo de Auditoría

- Registro append-only de eventos sensibles: LOGIN, LOGIN_FALLIDO, CAMBIO_ROL, INGESTA, INGESTA_FALLIDA, GEN_REPORTE, AJUSTE_BRECHA, DESCARGA
- Consulta filtrable por usuario, fecha y tipo
- Solo lectura (sin edición)

### 4.8 Módulo de Configuración (Superadmin)

- Parámetros dinámicos: minutos de inactividad, bloqueo, notificaciones
- Límites: upload_max_mb=50
- Cambio sin rediseñar código (RNF-20)

---

## 5. DIAGRAMA DEL PROCESO

### 5.1 Proceso actual (AS-IS)

El proceso actual de análisis de sostenibilidad en Igualab es completamente manual y depende del criterio individual del analista. El flujo se describe a continuación:

```mermaid
flowchart LR
    A["Analista de Igualab"] --> B["Elegir empresa a buscar"]
    B --> C["Descargar manualmente informes de la empresa seleccionada"]
    C --> D["Leer documentos manualmente"]
    D --> E["Identificar brechas, sanciones y situaciones de mejora"]
    E --> F["Elaboración de prospecto"]
    F --> G{"¿Elegir otra empresa?"}
    G -- Sí --> B
    G -- No --> H["FIN"]
```

### 5.2 Problemas identificados

A partir del análisis del proceso actual (AS-IS) se identifican los siguientes problemas. El analista de Igualab debe buscar y descargar manualmente cada informe (memoria anual y/o reporte de sostenibilidad) de fuentes dispersas, lo que incrementa el riesgo de omitir documentos relevantes o descargar versiones desactualizadas. La revisión íntegra de documentos que suelen exceder las 100 páginas depende enteramente de su criterio individual, lo que genera variabilidad en la cobertura y profundidad del análisis entre distintas revisiones. No existe un catálogo estandarizado de indicadores GRI evaluables ni una metodología uniforme para asignar estados de cumplimiento, por lo que los criterios pueden variar de una empresa a otra. Una vez identificadas brechas, sanciones o hallazgos, el analista no registra la información en un sistema estructurado — ni base de datos, ni hoja de cálculo, ni herramienta similar — por lo que los resultados quedan en su conocimiento implícito, sin posibilidad de consulta histórica, comparación entre empresas o trazabilidad. Tampoco se registra qué empresa revisó, en qué fecha ni con qué criterios, lo que impide validar la calidad del análisis o demostrar diligencia ante el cliente. La elaboración del documento de prospección se realiza en texto libre sin plantilla estandarizada, lo que genera formatos inconsistentes y omisión de información relevante. En conjunto, cada análisis parte de cero y no permite reutilizar resultados previos, comparar evolución año a año ni escalar el proceso a más empresas sin incrementar linealmente la carga de trabajo.

---

### 5.3 Proceso propuesto (TO-BE) — Ingesta → Análisis → Prospección

```mermaid
flowchart LR
  subgraph GEST["Línea de gestión · Superadmin"]
    A1["Prepara documento .md convertido del PDF origen"] --> A2["Selecciona empresa y año"]
    A2 --> A3["Sube .md en Ingesta con validación de formato y tamaño"]
    A3 --> A4{"¿Tablas con pipes y tamaño dentro del límite?"}
    A4 -- No --> A5["Audita rechazo y muestra motivo en la UI"]
    A4 -- Sí --> A6["Chunking por secciones y filas de tabla"]
    A6 --> A7["Embedding local + upsert en pgvector"]
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

### 5.4 Pipeline de ingesta detallado

```mermaid
flowchart TD
    U["Superadmin en la UI"] -->|POST /api/v1/ingesta con archivo .md| API["FastAPI · middleware RBAC"]
    API --> G1["1 Guard de formato: solo .md, tablas con pipes, tamaño ≤ 50 MB"]
    G1 -- falla --> X["Audita rechazo · estado RECHAZADO + motivo exacto hacia la UI"]
    G1 -- ok --> P1["2 Parseo markdown: encabezados y filas de tablas normalizadas"]
    P1 --> P2["3 Chunking por sección/fila ~800 chars con metadata: empresa, año, código GRI"]
    P2 --> P3["4 Embeddings locales: Qwen3-Embedding-0.6B / bge-m3"]
    P3 --> P4["5 Upsert en chunks_embeddings con sha256 anti-duplicado"]
    P4 --> ANA["6 Motor de análisis GRI según reglas de catalogo_gri → INSERT en tabla del análisis"]
    ANA --> AUD["7 Audita ingesta: usuario, archivo, hash, estado, tiempos"]
    AUD --> RESP["Éxito: respuesta con brechas sugeridas listas para revisión humana"]
```

### 5.5 Flujo de análisis GRI y generación de reporte

```mermaid
flowchart TD
    S["Administrador solicita análisis GRI de una empresa del sector permitido"]
    S --> R1{"¿Empresa dentro de sectores permitidos?"}
    R1 -- No --> DEN["Se informa límite de alcance de fase 1"]
    R1 -- Sí --> RAW["Consume la tabla del análisis poblada al terminar la ingesta"]
    RAW --> SUG["Motor reglas sugiere estado: OK / Sub-reportado / Baja sustancia / Crítico"]
    SUG --> HUM{"¿El humano valida o cambia el estado antes de generar?"}
    HUM -- Cambia --> REG["Historial: guarda estado, quién, cuándo, anterior → nuevo"]
    HUM -- Confirma --> GEN
    REG --> GEN["Generar PDF: SELECT determinista → Jinja2 → WeasyPrint"]
    GEN --> AUD2[("auditoria_eventos: generación de reporte")]
    GEN --> DL["Descarga del reporte en la UI"]
```

---

## 6. REGLAS DE NEGOCIO

Las Reglas de Negocio (RN) se detallan a continuación, agrupadas por dominio:

### Grupo A · Acceso, sesiones y roles

| NO | NOMBRE DE LA REGLA | DETALLE DE LA REGLA |
|----|--------------------|---------------------|
| RN-001 | Conjunto cerrado de roles | El sistema reconoce únicamente dos roles: SuperAdmin y Administrador. Toda cuenta tiene exactamente uno asignado. |
| RN-002 | Unicidad del SuperAdmin | El rol SuperAdmin está asignado a exactamente una cuenta en todo momento, con independencia de su estado de habilitación o de que tenga una sesión abierta. |
| RN-003 | Permisos cerrados por rol | Ninguna cuenta puede ejecutar acciones no asignadas a su rol respectivo. |
| RN-004 | Condiciones de autenticación | Solo pueden autenticarse las cuentas registradas y habilitadas en el sistema. |
| RN-005 | Efecto de la deshabilitación | Una cuenta deshabilitada pierde acceso inmediato a todas las funcionalidades del sistema, cerrando su sesión activa. |
| RN-006 | Cuenta SuperAdmin inicial | El sistema se inicializa con una única cuenta SuperAdmin creada durante el despliegue. Esta cuenta no puede crearse mediante la aplicación. |
| RN-007 | Datos obligatorios de la cuenta | Toda cuenta se registra con nombre, correo electrónico y contraseña. |
| RN-008 | Rol por defecto | Toda cuenta creada a través de la aplicación se asigna con rol Administrador. El rol SuperAdmin solo se obtiene por transferencia. |
| RN-009 | Transferencia del rol SuperAdmin | El rol SuperAdmin puede transferirse a una cuenta de Administrador existente y habilitada. La transferencia es atómica: la cuenta destino adquiere el rol y la cuenta origen pasa a rol Administrador en una sola operación. |
| RN-010 | Autonomía en la recuperación de acceso | Todo usuario debe poder recuperar el acceso a su cuenta ante la pérdida de sus credenciales, sin requerir la intervención del SuperAdmin. |

### Grupo B · Gestión documental

| NO | NOMBRE DE LA REGLA | DETALLE DE LA REGLA |
|----|--------------------|---------------------|
| RN-011 | Tipos de documento admisibles | Solo se admiten como documentos fuente memorias anuales y reportes de sostenibilidad GRI. El tipo es un atributo obligatorio del documento con esos dos valores posibles. |
| RN-012 | Responsabilidad de la conversión | El sistema no realiza conversión de formatos. Los documentos fuente ingresan al sistema ya convertidos a Markdown por el cliente, quien es responsable de la fidelidad de la conversión y la integridad de las tablas (con formato pipe). |
| RN-013 | Contenido mínimo del documento | El documento ingestado debe contener al menos un código del catálogo GRI (40 códigos) o una mención de sanción, reconocidos mediante el mecanismo de detección configurado. |
| RN-014 | Identificación obligatoria del documento | Todo documento que se ingesta debe estar asociado a una empresa existente y activa del catálogo del sistema; el año del ejercicio del documento y su tipo (memoria anual o reporte de sostenibilidad GRI). |
| RN-015 | Origen de las sanciones | Las sanciones asociadas a una empresa se identifican exclusivamente a partir de los documentos ingestados para esa empresa. El sistema no consulta fuentes externas de sanciones. |
| RN-016 | Asignación de estado GRI | El estado de cumplimiento de cada código GRI contará con tres estados únicos: OK, Baja sustancia y Sub-reportado. Este será asignado manualmente por el rol Administrador, en base a su criterio profesional, tras revisar la cita textual extraída del documento. El sistema no calcula ni infiere dicho estado de forma automática, ni compara el contenido contra el texto del estándar GRI. |
| RN-017 | Alcance del análisis | El análisis se ejecuta como último paso de la ingesta y su alcance se limita a una empresa, un año y los sectores habilitados (Minería, Energía y Petróleo). Comprende la identificación de los 40 códigos GRI del catálogo corporativo presentes en los documentos; sus resultados se persisten en la base de datos (tabla del análisis), y son la única base del reporte. |
| RN-018 | Catálogo de códigos GRI evaluables | Sólo son evaluables los 40 códigos del catálogo corporativo versionado. La evidencia válida es la reportada por la empresa en sus documentos; el texto del estándar GRI oficial no es fuente de evaluación. |
| RN-019 | Registro de empresas | El SuperAdmin es el encargado de crear una empresa y registrarla en el sistema, para lo cual es necesario que tenga un nombre y un sector asociado. |
| RN-020 | Precondición del reporte de prospección | El reporte de prospección de una empresa solo se ejecuta si dicha empresa cuenta con al menos un documento ingestado. |
| RN-021 | Fundamentación en el corpus | El modelo LLM responde exclusivamente con base en los documentos ingestados. No emplea conocimiento externo al corpus ni genera información no respaldada por dichos documentos. |
| RN-022 | Trazabilidad de la información entregada | Toda información que el sistema entrega debe ser atribuible a un documento del corpus. Una afirmación sin respaldo trazable no constituye información válida del sistema. |
| RN-023 | Declaración explícita ante ausencia de información | La insuficiencia de información en los documentos ingestados disponibles es un resultado válido y explícito, tanto en las respuestas del modelo LLM como en el análisis para la generación de reportes. La ausencia de respaldo nunca se sustituye por datos generados, inferidos, supuestos o atribuidos a fuentes inexistentes. |
| RN-024 | Contenido del reporte de prospección | Todo reporte consolida, un sector para una empresa y un año específico, el estado de cada código GRI (asignado de forma manual), las sanciones identificadas y un resumen ejecutivo. |
| RN-025 | Determinismo del reporte de prospección | El contenido del reporte de prospección se deriva exclusivamente de los resultados ya almacenados. Dos generaciones sobre los mismos datos y el mismo criterio producen el mismo resultado. |
| RN-026 | Inmutabilidad del reporte | Un reporte de prospección generado no puede modificarse ni eliminarse. Se conserva permanentemente en el sistema. |
| RN-027 | Eventos auditados | Se registra automáticamente todo inicio de sesión, cambio de estado o rol de una cuenta, ingesta, rechazo de documento y generación de reporte de prospección. |
| RN-028 | Contenido del registro | Cada registro de auditoría consigna la cuenta que originó la acción, fecha, hora y tipo de acción. |
| RN-029 | Inmutabilidad de la auditoría | Los registros de auditoría no pueden modificarse ni eliminarse. |
| RN-030 | Degradación ante indisponibilidad del asistente | La indisponibilidad del servicio de IA no impide operar los módulos de gestión de cuentas, descargas de reportes de prospección, auditoría y creación de empresas. |
| RN-031 | Ausencia de hallazgo y ausencia de evidencia | La ausencia de hallazgos y la falta de evidencia analizable son resultados distintos y no equivalentes. La falta de evidencia no constituye cumplimiento. |
| RN-032 | Información parcial | La información incompleta respecto a los campos esperados es admisible y se conserva identificada como tal. Un dato no determinado nunca se sustituye por un valor por defecto ni se omite del análisis. |
| RN-033 | Unicidad de documento por empresa y año | El sistema no admite más de un documento del mismo tipo (memoria anual o reporte de sostenibilidad) para una misma empresa y año para así evitar la duplicación. |
| RN-034 | Cálculo del puntaje ESG | El puntaje ESG de una empresa para un año se calcula automáticamente a partir de los estados asignados a sus códigos GRI. |
| RN-035 | Registro de empresas | El SuperAdmin es el encargado de crear una empresa y registrarla en el sistema, para lo cual es necesario que tenga un nombre y un sector asociado. |
| RN-036 | Sesión activa | Toda sesión recientemente activa debe permanecer en ese estado por un tiempo determinado. Cuando deje de estar activa se cierra sesión. |
| RN-037 | Consulta al modelo | Las consultas deben limitarse a responder preguntas relacionadas con sostenibilidad empresarial, indicadores GRI, sanciones económicas o el contenido de los documentos ingestados. Caso contrario debe informarse al usuario que la consulta está fuera del alcance. |
| RN-038 | Requerimientos para consulta | Toda consulta debe tener como datos el nombre de la empresa, el sector al que pertenece y el año del reporte a consultar. Caso contrario no debe permitir la consulta. |

---

## 7. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL

### 7.1 Actores

| Actor | Descripción | Permisos |
|-------|-------------|----------|
| **Superadmin** | Gestor del sistema (1 persona — Oscar Baldeón) | Gestión de usuarios, ingesta de documentos, configuración, auditoría |
| **Administrador** | Analista comercial (2 personas) | Consultas IA (RAG), revisión de brechas, generación de reportes, descargas |
| **Sistema** | Actor automatizado | Validación de formatos, análisis GRI, generación de embeddings |

### 7.2 Diagrama de Casos de Uso

```mermaid
flowchart LR
  SU(("Superadmin"))
  AD(("Administrador"))
  LLM(("LLM/Embeddings"))
  PO(("PO Oscar"))

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
    CU010["CU010 · Gestión de catálogo de empresas"]
  end

  SU --> CU001 & CU002 & CU003 & CU004 & CU009 & CU010
  AD --> CU001 & CU005 & CU006 & CU007 & CU008
  CU002 -. incluye-CRUD roles + avisos .-> CU009
  CU004 -. registra eventos .-> CU009
  CU005 -. consultas RAG con contexto .-> LLM
  CU004 -. embeddings locales .-> LLM
  CU007 -. solo variables de la BD .-> LLM
  PO -. supervisa estados .-> CU006
```

### 7.3 Listado de Casos de Uso

| Código | Nombre | Actor(es) | RF Asociados |
|--------|--------|-----------|--------------|
| **CU001** | Autenticación y gestión de sesión | Ambos | RF-001, RF-002, RF-003, RF-023 |
| **CU002** | Gestión de usuarios y roles | Superadmin | RF-005 |
| **CU003** | Configuración del sistema | Superadmin | RF-006 |
| **CU004** | Ingesta de documentos (.md) | Superadmin | RF-007, RF-008, RF-009, RF-021, RF-028 |
| **CU005** | Consulta al asistente IA (RAG) | Administrador | RF-010, RF-011, RF-019, RF-020 |
| **CU006** | Revisión/ajuste de brechas GRI | Administrador | RF-012, RF-013, RF-025 |
| **CU007** | Generación de reporte PDF | Administrador | RF-014, RF-015 |
| **CU008** | Historial y descarga de reportes | Administrador | RF-015 |
| **CU009** | Auditoría de eventos | Superadmin | RF-016 |
| **CU010** | Gestión de catálogo de empresas | Superadmin | RF-017, RF-022 |

### 7.4 Especificación de Casos de Uso

#### CU001 · Autenticación y gestión de sesión

| Campo | Detalle |
|-------|---------|
| Actores | Superadmin, Administrador |
| RF / RN | RF-001, RF-002, RF-003, RF-023 / RN-001, RN-004, RN-005, RN-006 |
| Precondiciones | Sistema desplegado; usuario registrado, habilitado y con rol |
| Postcondición | Sesión activa con rol identificado y evento auditado |

**Flujo básico:**
1. El usuario accede a la URL de la plataforma
2. El sistema muestra el formulario de inicio de sesión
3. El usuario ingresa correo y contraseña
4. El sistema valida estado de cuenta, credenciales y rol
5. El sistema establece la sesión y registra evento de login
6. El sistema redirige a su vista según el rol

**Flujos alternativos:**
- **A1 · Credenciales inválidas:** mensaje "Credenciales inválidas". A los 5 intentos fallidos: bloqueo 15 min
- **A2 · Usuario deshabilitado:** "Usuario deshabilitado. Contacte al administrador"
- **A3 · Recuperación de contraseña:** enlace con vigencia limitada enviado al correo

---

#### CU004 · Ingesta de documentos (.md) — SÍNCRONA

| Campo | Detalle |
|-------|---------|
| Actores | Superadmin; LLM/Embeddings (servicio externo) |
| RF / RN | RF-007, RF-008, RF-009, RF-021, RF-028 / RN-009…RN-017 |
| Precondiciones | Sesión Superadmin; empresa registrada; archivo .md listo |
| Postcondición | Documento indexado o estado RECHAZADO/OBSERVADO con motivo |

**Flujo básico:**
1. El Superadmin abre Ingesta de documentos
2. Selecciona empresa, año y tipo (memoria anual / reporte sostenibilidad)
3. Selecciona el archivo `.md` y "Subir"
4. **Guard:** valida extensión, tamaño (15 MB), tablas con pipes y contenido mínimo
5. Anti-duplicado por sha256
6. **Procesamiento síncrono:** parseo → chunking → embeddings locales → upsert pgvector
7. La UI muestra el resultado: nº de chunks o estado OBSERVADO
8. Auditoría con usuario, hash, tiempos

---

#### CU005 · Consulta al asistente IA (RAG)

| Campo | Detalle |
|-------|---------|
| Actores | Administrador; LLM (RAG simple) |
| RF / RN | RF-010, RF-011, RF-019, RF-020 / RN-023, RN-024, RN-025, RN-026 |
| Precondiciones | Sesión activa; ≥ 1 documento indexado; cuota disponible |
| Postcondición | Respuesta con citas + historial de chat en la sesión |

**Flujo básico:**
1. El Administrador abre Asistente de IA
2. Escribe su consulta en lenguaje natural
3. El backend arma el RAG: búsqueda semántica pgvector (k=4)
4. El sistema arma la respuesta con fuentes citadas (doc + sección)

**Flujos alternativos:**
- **A1 · Sin información relevante:** "el documento no aborda este punto"
- **A2 · LLM/cuota no disponible:** mensaje de indisponibilidad; resto del sistema operativo

---

#### CU006 · Revisión y ajuste de estado de brechas

| Campo | Detalle |
|-------|---------|
| Actores | Administrador; PO (Oscar) supervisa |
| RF / RN | RF-012, RF-013, RF-025 / RN-019, RN-020, RN-021 |
| Precondición | Análisis GRI ejecutado para la empresa |
| Postcondición | Estados confirmados en gri_analisis con historial |

**Flujo básico:**
1. El Administrador abre la tabla de resultados del análisis
2. Cada fila tiene el estado sugerido por las reglas + cita
3. El Administrador revisa y valida o cambia el estado
4. El sistema guarda el cambio con autor, fecha y estado anterior→nuevo

---

#### CU007 · Generación de reporte de prospección (PDF)

| Campo | Detalle |
|-------|---------|
| Actores | Administrador |
| RF / RN | RF-014, RF-015 / RN-027, RN-028, RN-029 |
| Precondiciones | Brechas validadas para la empresa |
| Postcondición | PDF generado, versionado e inmutable |

**Flujo básico:**
1. El Administrador selecciona empresa y año
2. El sistema valida que todas las brechas tengan estado confirmado
3. El backend recolecta variables dinámicas con SELECT determinista
4. La plantilla Jinja2 + WeasyPrint genera el PDF
5. Se registra en reportes_generados y se audita

---

### 7.5 Requerimientos Funcionales

| ID | Requerimiento Funcional | RN | Actores | Prioridad |
|----|------------------------|-----|---------|-----------|
| **RF-001** | Autenticación con correo y contraseña, validando cuenta habilitada | RN-001, RN-004, RN-005 | Ambos | MUST HAVE |
| **RF-002** | Recuperación de contraseña mediante enlace seguro de vigencia limitada | RN-005 | Ambos | MUST HAVE |
| **RF-003** | Mantener sesión activa y expirar por inactividad (tiempo configurable) | RN-004, RN-005 | Ambos | MUST HAVE |
| **RF-004** | Restringir menús y endpoints según el rol (RBAC) | RN-001, RN-002 | Ambos | MUST HAVE |
| **RF-005** | Superadmin crea, habilita/deshabilita y asigna roles (con transferencia automática) | RN-003, RN-005 | Superadmin | MUST HAVE |
| **RF-006** | Superadmin configura parámetros del sistema (inactividad, bloqueo, notificaciones) | RN-004 | Superadmin | SHOULD HAVE |
| **RF-007** | Carga síncrona de documentos `.md` con resultado de ingesta en la misma operación | RN-009…RN-017 | Superadmin | MUST HAVE |
| **RF-008** | Pre-validar cada `.md`: extensión, tamaño ≤ 15 MB, tablas con pipes, contenido analizable | RN-010, RN-011, RN-012, RN-013 | Sistema | MUST HAVE |
| **RF-009** | Procesar e indexar automáticamente cada documento válido (chunking + embeddings) | RN-014, RN-015, RN-016 | Sistema | MUST HAVE |
| **RF-010** | Consultar al asistente IA (RAG) en lenguaje natural con respuesta y fuentes citadas | RN-023, RN-024 | Administrador | MUST HAVE |
| **RF-011** | Informar cuando el asistente no esté disponible sin bloquear resto de módulos | RN-025, RN-026 | Administrador | MUST HAVE |
| **RF-012** | Listar brechas GRI y sanciones por empresa con estado y cita | RN-018, RN-019, RN-021, RN-022 | Administrador | MUST HAVE |
| **RF-013** | Revisión humana del estado de cada brecha: sugerencia + cambio manual antes de generar reporte | RN-020 | Administrador | MUST HAVE |
| **RF-014** | Generar reporte de prospección en PDF con plantilla y variables desde BD | RN-027, RN-028 | Administrador | MUST HAVE |
| **RF-015** | Conservar historial de reportes generados (versiones, sin edición) y permitir descarga | RN-029, RN-032 | Administrador | MUST HAVE |
| **RF-016** | Registrar automáticamente eventos sensibles y permitir consulta filtrando | RN-030, RN-031 | Superadmin | MUST HAVE |
| **RF-017** | Superadmin gestiona catálogo de empresas: crear, editar (sector solo 3 permitidos), activar/desactivar | RN-015, RN-018 | Superadmin | MUST HAVE |
| **RF-018** | Superadmin lista documentos ingestados con estado, versión, hash y permite re-subir versión nueva | RN-017, RN-032 | Superadmin | SHOULD HAVE |
| **RF-019** | Mantener historial de conversación del Administrador y permitir nueva conversación | RNF-11 | Administrador | SHOULD HAVE |
| **RF-020** | Mostrar contador de cuota diaria del asistente y avisar al alcanzar límites | RN-026, RNF-11 | Administrador | MUST HAVE |
| **RF-021** | Notificar resultado de ingesta con motivo exacto en pantalla y en auditoría | RN-010…RN-016 | Superadmin | MUST HAVE |
| **RF-022** | Filtrar listados por empresa, sector, año y estado | RN-018, RN-021 | Admin/Superadmin | SHOULD HAVE |
| **RF-023** | Cierre de sesión manual y automático por inactividad, invalidando token | RN-004, RN-005 | Ambos | MUST HAVE |
| **RF-024** | Restringir análisis a empresas de sectores permitidos en todos los flujos | RN-018 | Sistema | MUST HAVE |
| **RF-025** | Al cambiar estado de brecha, requerir observación cuando el estado final difiere del sugerido | RN-020 | Administrador | MUST HAVE |
| **RF-026** | **El sistema debe validar que las contraseñas cumplan con los requisitos de longitud (mínimo 8), complejidad (mayúscula, minúscula, dígito, carácter especial) y que no coincidan con el correo.** | **RN-008** | **Sistema** | **MUST HAVE** |
| **RF-027** | **El sistema debe solicitar confirmación de contraseña al momento del registro o cambio.** | **RN-008** | **Sistema** | **MUST HAVE** |
| **RF-028** | **El sistema debe bloquear el botón de subida mientras el pipeline de ingesta está en proceso, impidiendo cargas simultáneas.** | **RN-014** | **Sistema** | **MUST HAVE** |

### 7.6 Requerimientos No Funcionales

| ID | Requerimiento | Categoría | Prioridad |
|----|--------------|-----------|-----------|
| **RNF-01** | Contraseñas cifradas con hash adaptativo (bcrypt/argon2); tokens firmados con expiración | Seguridad | MUST HAVE |
| **RNF-02** | Todo tráfico viaja por HTTPS (incl. backend-universidad ↔ frontend) | Seguridad | MUST HAVE |
| **RNF-03** | RBAC en todos los endpoints; intento sin permiso → 403 auditado | Seguridad | MUST HAVE |
| **RNF-04** | Sanitización del `.md` subido (protección XSS al renderizar fragmentos) | Seguridad | MUST HAVE |
| **RNF-05** | Protección de datos personales conforme a normativa peruana (Ley 29733) | Cumplimiento | MUST HAVE |
| **RNF-06** | BD sin acceso público; credenciales por variables de entorno | Seguridad | MUST HAVE |
| **RNF-07** | Asistente IA responde ≤ 30 s (percentil 90) | Rendimiento | MUST HAVE |
| **RNF-08** | Ingesta síncrona ≤ 5 min por documento ≤ 15 MB | Rendimiento | MUST HAVE |
| **RNF-09** | Vistas de gestión responden ≤ 3 s | Rendimiento | MUST HAVE |
| **RNF-10** | Crecimiento progresivo sin degradación; índice HNSW y paginación | Escalabilidad | SHOULD HAVE |
| **RNF-11** | Contadores por día en tabla uso_llm; rate-limit; embeddings locales | Eficiencia | MUST HAVE |
| **RNF-12** | Disponibilidad ≥ 95% en horario laboral (lun–vie 8:00–20:00) | Disponibilidad | MUST HAVE |
| **RNF-13** | Degradación elegante ante fallo del LLM: timeout, reintento, modelo respaldo | Confiabilidad | MUST HAVE |
| **RNF-14** | Respaldos diarios de BD (incl. índice vectorial) y archivos .md | Continuidad | MUST HAVE |
| **RNF-15** | Logs técnicos con niveles y correlación por request_id | Observabilidad | MUST HAVE |
| **RNF-16** | Pipeline idempotente por sha256; upserts sin duplicados | Confiabilidad | MUST HAVE |
| **RNF-17** | Interfaz responsiva con textos en español claro y accionable | Usabilidad | MUST HAVE |
| **RNF-18** | Compatibilidad con navegadores modernos (Chromium, Firefox, Safari) | Compatibilidad | MUST HAVE |
| **RNF-19** | Backend + PostgreSQL/pgvector en Docker Compose; frontend build estático | Portabilidad | MUST HAVE |
| **RNF-20** | Config por variables de entorno (sin rediseñar código para cambiar límites) | Mantenibilidad | MUST HAVE |
| **RNF-21** | FASE 1: sin servicios pagados, despliegue en servidor universidad | Restricción | MUST HAVE |
| **RNF-22** | **Las contraseñas se almacenan cifradas con bcrypt/argon2, aplicando salt aleatorio para prevenir ataques de rainbow table.** | **Seguridad** | **MUST HAVE** |

---

## 8. MODELO DE DATOS

### 8.1 Modelo conceptual (entidades y relaciones)

**Cadena principal del negocio:** empresa → documento (.md) → chunks (vectorizados) → análisis GRI/sanciones → reporte PDF

**Entidades del dominio (12):**

1. **empresa** — catálogo de empresas analizables
2. **documento** — cada archivo .md ingestado
3. **chunks_embeddings** — fragmentos vectorizados (núcleo del RAG)
4. **catalogo_gri** — estándar GRI precargado (referencia)
5. **gri_analisis** — brechas por empresa, documento, código GRI
6. **sanciones** — sanciones económicas identificadas
7. **reportes_generados** — entregables PDF versionados
8. **usuarios** — personas del sistema (3 en FASE 1)
9. **roles** — catálogo de 2 perfiles
10. **auditoria_eventos** — bitácora append-only
11. **uso_llm** — contador diario del free tier
12. **configuracion** — parámetros del sistema

### 8.2 Diagrama ER (Mermaid)

```mermaid
erDiagram
    usuarios ||--o{ auditoria_eventos : genera
    empresas ||--o{ documentos : tiene
    documentos ||--o{ chunks_embeddings : vectoriza
    documentos ||--o{ gri_analisis : produce
    empresas ||--o{ gri_analisis : analiza
    catalogo_gri ||--o{ gri_analisis : referencia
    gri_analisis ||--o{ gri_analisis_historico : registra
    empresas ||--o{ sanciones : registra
    documentos ||--o{ sanciones : cita
    empresas ||--o{ reportes_generados : recibe
    gri_analisis }o--o{ reportes_generados : consolida

    usuarios {
        uuid id PK
        varchar nombre
        varchar correo UK
        varchar password_hash
        varchar rol
        bool habilitado
        timestamp created_at
    }
    roles {
        varchar rol PK
        text descripcion
    }
    empresas {
        int id PK
        varchar nombre UK
        varchar ticker UK
        varchar sector
        bool activo
    }
    documentos {
        uuid id PK
        int empresa_id FK
        smallint anho
        varchar tipo
        varchar nombre_archivo
        varchar sha256 UK
        varchar estado
        int version
    }
    chunks_embeddings {
        uuid id PK
        uuid doc_id FK
        int chunk_index
        text texto
        vector_1024 embedding
        varchar seccion
        varchar gri_code
        jsonb metadata
    }
    catalogo_gri {
        varchar codigo PK
        varchar serie
        varchar tema
        text elementos_minimos
        text_arreglo keywords
    }
    gri_analisis {
        uuid id PK
        int empresa_id FK
        uuid doc_id FK
        varchar gri_code FK
        varchar estado_sugerido
        varchar estado
        text cita_fragmento
        varchar seccion
        uuid validado_por FK
    }
    sanciones {
        uuid id PK
        int empresa_id FK
        uuid doc_id FK
        decimal monto
        varchar entidad
        varchar doc_seccion
    }
    reportes_generados {
        uuid id PK
        int empresa_id FK
        smallint anho
        int version
        varchar pdf_path
        varchar sha256
        uuid usuario_id FK
    }
    auditoria_eventos {
        bigserial id PK
        uuid usuario_id FK
        varchar accion
        varchar resultado
        jsonb detalle
    }
```

---

## 9. DICCIONARIO DE DATOS

### Tabla: `roles`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| rol | VARCHAR(20) PK | Identificador: superadmin o administrador | NO |
| descripcion | TEXT | Descripción del alcance del rol | SÍ |

### Tabla: `usuarios`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | UUID PK | Identificador único (gen_random_uuid) | NO |
| nombre | VARCHAR(120) | Nombre completo | NO |
| correo | VARCHAR(160) UK | Correo institucional (índice funcional lower) | NO |
| password_hash | TEXT | Hash bcrypt/argon2 (nunca texto plano) | NO |
| rol | VARCHAR(20) FK | Rol → roles.rol | NO |
| habilitado | BOOLEAN | Estado de la cuenta (default true) | NO |
| created_at | TIMESTAMPTZ | Fecha de creación | NO |

**RS-01:** Exactamente 1 fila con `rol='superadmin' AND habilitado=true` (índice único parcial).

### Tabla: `empresas`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | SERIAL PK | Identificador único | NO |
| nombre | VARCHAR(160) UK | Nombre comercial/razón social | NO |
| ticker | VARCHAR(12) UK | Ticker en la BVL | NO |
| sector | VARCHAR(40) | Minería, Energía, Petróleo y Gas (CHECK) | NO |
| activo | BOOLEAN | false = no seleccionable (default true) | NO |

### Tabla: `documentos`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | UUID PK | Identificador único | NO |
| empresa_id | INT FK | Empresa → empresas.id | NO |
| anho | SMALLINT | Año (CHECK 2000-2100) | NO |
| tipo | VARCHAR(30) | memoria_anual o reporte_sostenibilidad | NO |
| nombre_archivo | VARCHAR(255) | Nombre original del .md | NO |
| sha256 | CHAR(64) UK | Huella anti-duplicado | NO |
| estado | VARCHAR(20) | indexado / observado / rechazado | NO |
| motivo | TEXT | Motivo del rechazo/observación | SÍ |
| chunks_count | INT | Nº de chunks indexados | SÍ |
| version | INT | Versión (default 1) | NO |
| created_by | UUID FK | Superadmin → usuarios.id | NO |
| created_at | TIMESTAMPTZ | Fecha de ingesta | NO |

### Tabla: `chunks_embeddings` (BD vectorizada)
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | UUID PK | Identificador único del chunk | NO |
| doc_id | UUID FK | Documento → documentos.id | NO |
| chunk_index | INT | Posición dentro del documento | NO |
| texto | TEXT | Fragmento de texto | NO |
| chunk_id_hash | CHAR(64) UK | sha256 del texto (idempotencia) | NO |
| embedding | VECTOR(1024) | Vector del modelo local (índice HNSW cosine) | NO |
| seccion | VARCHAR(200) | Encabezado de sección (llave de cita) | NO |
| gri_code | VARCHAR(12) | Código GRI heredado | SÍ |
| metadata | JSONB | empresa_id, año, tipo doc, fila tabla | NO |

### Tabla: `catalogo_gri`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| codigo | VARCHAR(12) PK | Código GRI oficial (ej. GRI 403) | NO |
| serie | VARCHAR(3) | 100, 200, 300, 400 | NO |
| tema | VARCHAR(120) | Denominación del tema | NO |
| elementos_minimos | TEXT | Checklist de elementos esperados para OK | NO |
| keywords | TEXT[] | Palabras clave de evidencia | NO |
| vigente_desde | SMALLINT | Año de la versión del estándar | NO |

### Tabla: `gri_analisis`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | UUID PK | Identificador único de la fila | NO |
| empresa_id | INT FK | Empresa → empresas.id | NO |
| doc_id | UUID FK | Documento → documentos.id | NO |
| gri_code | VARCHAR(12) FK | Código → catalogo_gri.codigo | NO |
| estado_sugerido | VARCHAR(20) | Estado sugerido por motor | NO |
| estado | VARCHAR(20) | Estado final validado | NO |
| cita_fragmento | TEXT | Fragmento citado | NO |
| seccion | VARCHAR(200) | Sección del documento | NO |
| observacion | TEXT | Obligatoria si estado difiere del sugerido | SÍ* |
| validado_por | UUID FK | Usuario que validó | SÍ* |
| updated_at | TIMESTAMPTZ | Última actualización | NO |

### Tabla: `sanciones`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | UUID PK | Identificador | NO |
| empresa_id | INT FK | Empresa → empresas.id | NO |
| doc_id | UUID FK | Documento → documentos.id | NO |
| anho | SMALLINT | Año de la sanción | NO |
| entidad | VARCHAR(160) | Entidad/norma emisora | NO |
| monto | NUMERIC(14,2) | Monto económico | SÍ |
| doc_seccion | VARCHAR(200) | Sección citada (obligatoria) | NO |

### Tabla: `reportes_generados`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | UUID PK | Identificador del reporte | NO |
| empresa_id | INT FK | Empresa | NO |
| anho | SMALLINT | Año analizado | NO |
| sector | VARCHAR(40) | Snapshot del sector | NO |
| version | INT | Versión (UNIQUE empresa_id, anho, version) | NO |
| pdf_path | TEXT | Ruta del PDF generado | NO |
| sha256 | CHAR(64) | Hash del binario | NO |
| resumen_ejecutivo | TEXT | Texto determinístico desde gri_analisis | NO |
| usuario_id | UUID FK | Administrador que generó | NO |
| created_at | TIMESTAMPTZ | Fecha de generación | NO |

### Tabla: `auditoria_eventos`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | BIGSERIAL PK | Identificador secuencial | NO |
| usuario_id | UUID FK | Usuario (nulo en eventos anónimos) | SÍ |
| accion | VARCHAR(20) | LOGIN, CAMBIO_ROL, INGESTA, GEN_REPORTE, etc. | NO |
| resultado | VARCHAR(30) | Resultado de la operación | NO |
| detalle | JSONB | Contexto: hash, doc_id, motivo, etc. | NO |
| ip_origen | INET | IP del cliente | SÍ |
| created_at | TIMESTAMPTZ | Fecha/hora (indexada) | NO |

### Tabla: `uso_llm`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| id | BIGSERIAL PK | Identificador diario | NO |
| fecha | DATE UK | Día de consumo (1 fila/día) | NO |
| consultas | INT | Nº de consultas del día | NO |
| tokens_input | BIGINT | Tokens entrada | NO |
| tokens_output | BIGINT | Tokens salida | NO |
| modelo | VARCHAR(80) | Último modelo usado | NO |
| incidencias | INT | Timeouts/failover del día | NO |

### Tabla: `configuracion`
| Campo | Tipo | Descripción | NULL |
|-------|------|-------------|------|
| clave | VARCHAR(60) PK | Nombre del parámetro | NO |
| valor | JSONB | Valor del parámetro | NO |
| descripcion | TEXT | Descripción para el panel | SÍ |
| actualizado_por | UUID FK | Último Superadmin que modificó | SÍ |
| updated_at | TIMESTAMPTZ | Última modificación | NO |

---

## 10. DISEÑO ARQUITECTÓNICO

### 10.1 Vista lógica

```
┌──────────────────────────────────────────────────────────────────┐
│ UI (React 18 + Vite) — 2 layouts: Superadmin / Administrador     │
│ login · dashboard · usuarios · ingesta · configuración ·         │
│ auditoría (Superadmin) │ ia-chat · reportes · descargas (Admin)  │
└─────────────────────┬────────────────────────────────────────────┘
                      │ API REST (fetch/axios, JWT)
┌─────────────────────▼────────────────────────────────────────────┐
│ API · FastAPI                                                    │
│ middleware RBAC (RNF-05) · validadores pydantic · manejo de     │
│ errores de servicios externos (RN-024/RN-025)                    │
├──────────────────────────────────────────────────────────────────┤
│ Servicios (monolito modular)                                     │
│ usuarios · ingesta · rag_chat · gri_analisis · reportes_pdf ·    │
│ auditoria · configuracion                                        │
├──────────────────────────────────────────────────────────────────┤
│ Pipeline de ingesta (SÍNCRONO, RN-013)                           │
│ guard → markdown-it-py → chunking → embeddings → pgvector        │
└─────────────────────┬──────────────────────────────┬─────────────┘
                      │                              │
┌─────────────────────▼─────────────┐   ┌────────────▼─────────────┐
│ PostgreSQL 16 + pgvector          │   │ LLM (free, OpenRouter)   │
│ usuarios · empresas · documentos ·│   │ GLM-5.2 :free (256K)     │
│ chunks_embeddings (vector 1024) · │   │ respaldo: openrouter/free│
│ catalogo_gri · gri_analisis ·     │   └──────────────────────────┘
│ sanciones · reportes_generados ·  │   ┌──────────────────────────┐
│ auditoria_eventos · uso_llm       │   │ Embeddings local (server │
│                                   │   │ universidad): Qwen3-     │
└───────────────────────────────────┘   │ Embedding-0.6B / bge-m3  │
                                        └──────────────────────────┘
```

### 10.2 Stack tecnológico

| Capa | Tecnología | Versión |
|------|------------|---------|
| Frontend | React 18 + Vite (SPA, React Router) | ^18 |
| UI kit | CSS Modules + material symbols | — |
| Backend | FastAPI (Python 3.12) + SQLModel + pydantic v2 | 0.11x |
| BD | PostgreSQL 16 + pgvector (HNSW cosine) | pgvector ≥ 0.6 |
| Pipeline | markdown-it-py | — |
| Embeddings | Qwen3-Embedding-0.6B o bge-m3 (local) | — |
| LLM | GLM-5.2 :free vía OpenRouter | — |
| Reportes | Jinja2 + WeasyPrint | — |
| Despliegue | Docker Compose (backend + postgres) | — |
| Testing | pytest (backend), vitest (frontend) | — |

### 10.3 Variables de entorno

```
DATABASE_URL=postgresql+psycopg://igualab:***@host:5432/igualab
EMBEDDING_MODEL=BAAI/bge-m3
EMBEDDING_DEVICE=cpu
LLM_BASE_URL=https://openrouter.ai/api/v1
LLM_API_KEY=***
LLM_MODEL=z-ai/glm-5.2:free
LLM_FALLBACK_MODEL=openrouter/free
LLM_DAILY_LIMIT=200
JWT_SECRET=***
SESSION_IDLE_MINUTES=30
UPLOAD_MAX_MB=50
```

---

## 11. PROTOTIPO

El prototipo funcional (mock fidelizado) está desplegado en:

**https://igualab.vercel.app/**

El mock implementa:
- Login con demoAccounts (Superadmin / Administrador)
- Navegación por rol (menús diferentes según perfil)
- Ingesta de documentos (UI con dropzone y estados)
- Chat con citación de fuentes
- Tabla de brechas GRI con estados editables
- Generación y descarga de reportes
- Auditoría de accesos
- Configuración del sistema

**Estructura del mock:**
```
frontend/
  index.html
  vite.config.ts
  src/
    main.tsx
    app/            # App, router, guards de rol
    api/            # endpoints tipados
    layouts/
      SuperAdminLayout.tsx
      AdminLayout.tsx
    pages/
      login/Login.tsx
      superadmin/
        Dashboard.tsx  Usuarios.tsx  Ingesta.tsx  Configuracion.tsx  Auditoria.tsx
      admin/
        Dashboard.tsx  AssistantIa.tsx  Reportes.tsx  Descargas.tsx
    components/    # Badges, Cards, Modal, Toast, TableSort, ChatBubbles
    hooks/         # useAuth, useIdleTimer, useChat
    store/         # estado de sesión
    styles/        # tokens del mock
```

---

**Documento generado el:** 12/09/2026
**Versión:** 1.0
**Estado:** Primera versión oficial
