# 18 · Diagramas de Procesos — Lógica de Negocio

Diagramas de proceso **a nivel de negocio**: actores, actividades, decisiones y resultados. **No incluyen stack tecnológico** (ningún servicio, herramienta o infraestructura); describen *qué hace* la plataforma y *cómo fluye el trabajo*, no *con qué se implementa*. La vista técnica (servicios e infraestructura) vive en [[Diagramas de Procesos]] y [[06 Arquitectura (AWS)]]. El proceso central (9 · prospección comercial E2E) está también modelado en **BPMN 2.0** (estándar de industria): ver [[19 BPMN — Modelado de Procesos (Estándar de Industria)]].

> ⚖️ **Actualizado post-actas (05-09):** alcance vigente = Portal RAG sobre la **base de documentos del cliente**, acotado a **Minería, Energía y Petróleo**; ingesta por el **Superadmin**; **LinkedIn eliminado**; suscripción en 2ª fase. Ver [[21 Actas de Reunión y Acuerdos]]. Los procesos marcados ⛔/⏸️ quedaron fuera del alcance actual (se conservan como referencia).
> ✅ **Acta 4 (08-09, REQ-10/11/12 — definidos):** RBAC de **2 roles / 3 personas** (Oscar = Superadmin + 2 Administradores; 🔵 Lectura eliminado); la fase 1 opera en **desarrollo sin producción** (REQ-11); 2ª fase = **Cliente con `tenant_id` + pasarela de pagos** (REQ-12). El análisis queda **en proceso**: CU + BD/diccionario (REQ-13, ~1–2 semanas). Coherente con el **Análisis y Diseño v1.1** (to-be).

**Convenciones**
- 🔵 Inicio / fin de proceso · `{ }` decisión · 🟡🟢🔵🌐 rol responsable · enlaces entre notas al final de cada sección.
- Todo proceso sensible deja **registro de trazabilidad** (ver proceso 11).

---

## 0. Mapa general de la cadena de valor

Visión de conjunto: cómo el trabajo fluye desde la información pública hasta el negocio de consultoría de Igualab.

```mermaid
flowchart TD
    INICIO([🔵 Información pública de empresas]) --> ABASTO

    subgraph ABASTO["📥 1 · Abastecimiento de información"]
        A1[Recolectar memorias anuales y reportes de sostenibilidad]
        A2[Registrar, clasificar y mantener vigente]
    end

    ABASTO --> ANALISIS

    subgraph ANALISIS["🧠 2 · Análisis de sostenibilidad"]
        B1[Detectar brechas de reporte por indicador]
        B2[Identificar y cuantificar sanciones]
        B3[Señalar oportunidades y puntos débiles]
    end

    ANALISIS --> USO

    subgraph USO["🤖 3 · Uso de la inteligencia"]
        C1[Consulta analítica con fuentes]
        C2[Reportes de prospección]
        C3[Consulta pública de lectura]
    end

    USO --> NEGOCIO

    subgraph NEGOCIO["🤝 4 · Prospección y consultoría"]
        D1[Priorizar empresas objetivo]
        D2[Acercamiento como aliado estratégico]
        D3[Servicio de consultoría retribuido]
    end

    NEGOCIO --> RESULTADO([🟢 Ingresos y misión social])

    GESTION[⚙️ Transversal: accesos, usuarios, configuración] -.controla.-> ABASTO
    GESTION -.controla.-> USO
    AUDIT[📋 Transversal: auditoría y trazabilidad] -.registra.-> ABASTO
    AUDIT -.registra.-> USO
    AUDIT -.registra.-> NEGOCIO
    CICLO[🔄 Transversal: ciclo anual de vigencia] -.mantiene.-> ABASTO

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style RESULTADO fill:#e8f5e9,stroke:#2e7d32
    style ABASTO fill:#fff8e1,stroke:#f9a825
    style ANALISIS fill:#e8f5e9,stroke:#2e7d32
    style USO fill:#f3e5f5,stroke:#7b1fa2
    style NEGOCIO fill:#fce4ec,stroke:#c62828
```

---

## 1. Gestión de accesos y sesión (todos los roles)

**Actor:** personal de Igualab (Gestión 🟡 · Análisis 🟢 — 2 roles, 3 personas, acta 4 REQ-10). Decide el espacio de trabajo según el rol asignado.

```mermaid
flowchart TD
    INICIO([🔵 Persona intenta ingresar]) --> CRED[Ingresa sus credenciales]
    CRED --> VAL{"¿Credenciales válidas?"}

    VAL -->|"No"| DENEGADO[🚫 Acceso denegado]
    DENEGADO --> REGF[Registra intento fallido en el historial de eventos]
    REGF --> REC["Recuperar acceso (olvidé mi contraseña)"]
    REC --> CRED

    VAL -->|"Sí"| ROL{"¿Qué rol tiene asignado?"}
    ROL -->|"🟡 Gestión"| SA[Espacio de gestión<br/>usuarios · configuración · eventos]
    ROL -->|"🟢 Análisis"| AD[Espacio de análisis<br/>información · IA · reportes]

    SA --> TRAB[Realiza acciones permitidas según su matriz de permisos]
    AD --> TRAB
    ROL -.->|"🌐 Cliente (2ª fase — acta 4 REQ-12)"| FIN2([📌 Acceso externo con tenant_id · no en fase 1])

    TRAB --> INACT{"¿Inactividad prolongada?"}
    INACT -->|"Sí"| CIERRA[Cierre automático de sesión<br/>por política de seguridad]
    CIERRA --> FIN3([🔵 Sesión cerrada])
    INACT -->|"No"| TRAB
    TRAB --> SALIR[Decide cerrar sesión]
    SALIR --> FIN([🟢 Sesión finalizada con registro])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
    style FIN2 fill:#e8f5e9,stroke:#2e7d32
    style FIN3 fill:#e8f5e9,stroke:#2e7d32
    style DENEGADO fill:#ffebee,stroke:#c62828
```

> Reglas de negocio: los roles son **aislados, no jerárquicos** (ver [[03 Roles y Control de Accesos]]); el rol de Gestión **no** usa el asistente de IA; la sesión expira por inactividad (RNF-01). **Acta 4 (REQ-10 ✅):** 3 usuarios — Oscar (Superadmin) + 2 Administradores; rol "🔵 Lectura" eliminado.

---

## 2. Gestión de usuarios y permisos (🟡 rol Gestión)

**Actor:** Superadmin. Único rol que puede administrar personas y permisos.

```mermaid
flowchart TD
    INICIO([🔵 Gestión requiere administrar usuarios]) --> OPC{"¿Qué operación?"}

    OPC -->|"Alta"| ALTA[Registra datos del nuevo usuario]
    ALTA --> DUPLI{"¿Correo ya registrado?"}
    DUPLI -->|"Sí"| AVISO1[⚠️ Avisa: correo duplicado]
    AVISO1 --> ALTA
    DUPLI -->|"No"| ROL1[Asigna rol inicial y estado Activo]
    ROL1 --> NOTIF1[Notifica acceso al nuevo usuario]

    OPC -->|"Modificar rol"| CAMBIO[Selecciona usuario y nuevo rol]
    CAMBIO --> CONF1{"¿Confirma el cambio?"}
    CONF1 -->|"Sí"| APLICA1[Revoca permisos anteriores y aplica el nuevo rol]
    APLICA1 --> REG1[Registra cambio de rol en el historial]

    OPC -->|"Baja / revocar"| BAJA[Marca usuario como Inactivo o revoca privilegios]
    BAJA --> CONF2{"¿Confirma la baja?"}
    CONF2 -->|"Sí"| APLICA2[Cierra sus accesos y conserva su historial]
    APLICA2 --> REG2[Registra la baja en el historial]

    NOTIF1 --> FIN([🟢 Usuario operativo])
    REG1 --> FIN
    REG2 --> FIN
    CONF1 -->|"No"| FIN
    CONF2 -->|"No"| FIN

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
    style AVISO1 fill:#fff8e1,stroke:#f9a825
```

> La **baja es lógica**: el usuario deja de estar activo, pero su rastro histórico se conserva (RNF-04). **Acta 4 (REQ-10 ✅):** los 3 usuarios = **Oscar Baldeón (Superadmin)** + **2 Administradores**; alta manual por el Superadmin (no hay auto-registro ni acceso público en fase 1).

---

## 3. Configuración del sistema (🟡 rol Gestión)

**Actor:** Superadmin. Ajusta políticas generales que afectan a los demás roles.

```mermaid
flowchart TD
    INICIO([🔵 Gestión entra a configuración]) --> VER[Revisa políticas actuales<br/>tiempo de inactividad · funciones habilitadas · notificaciones]
    VER --> AJUSTA[Modifica los valores deseados]
    AJUSTA --> IMPACTO[Revisa a quién afecta el cambio<br/>todos los roles o solo externos]
    IMPACTO --> CONF{"¿Confirma aplicar?"}
    CONF -->|"No"| DESCARTA[Descarta cambios]
    DESCARTA --> FIN1([🔵 Sin cambios])
    CONF -->|"Sí"| APLICA[Aplica la nueva política]
    APLICA --> REG[Registra el cambio en el historial de eventos]
    REG --> AVISA[Notifica a los roles afectados]
    AVISA --> FIN2([🟢 Configuración vigente])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN2 fill:#e8f5e9,stroke:#2e7d32
```

---

## 4. Abastecimiento de información (🟡 rol Gestión e Ingesta)

**Actor:** Superadmin. Alimenta la base de conocimiento con **los documentos del cliente** (memorias anuales y reportes de sostenibilidad que Igualab ya posee — sin API de Bolsa, acta 1), acotado a **Minería, Energía y Petróleo** (acta 3).

```mermaid
flowchart TD
    INICIO([🔵 Necesidad de información nueva o actualizada]) --> FUENTE{"¿Cómo se obtiene?"}

    FUENTE -->|"Búsqueda manual"| MANUAL[Localiza el documento en su fuente pública<br/>memoria anual o reporte de sostenibilidad]
    FUENTE -->|"Recolección automática (fase futura, sin prioridad)"| AUTO[El sistema detecta publicaciones nuevas<br/>de las fuentes vigiladas]
    AUTO --> CAL{"¿Documento legible y completo?"}
    CAL -->|"No"| REVISA[Marca para revisión manual]
    REVISA --> MANUAL
    CAL -->|"Sí"| METADATOS

    MANUAL --> METADATOS[Registra metadatos:<br/>empresa · año · sector · tipo de fuente]
    METADATOS --> EXISTE{"¿Ya existe una versión anterior?"}
    EXISTE -->|"Sí"| AVISO[⚠️ Avisa que reemplazará la versión previa]
    AVISO --> CONF{"¿Confirma el reemplazo?"}
    CONF -->|"No"| FIN1([🔵 Sin cambios])
    CONF -->|"Sí"| PREPARA
    EXISTE -->|"No"| PREPARA

    PREPARA[Clasifica el documento y lo prepara para análisis<br/>texto · tablas · indicadores] --> PROCESA[Estado: procesando e indexando]
    PROCESA --> OK{"¿Procesamiento exitoso?"}
    OK -->|"Sí"| DISP[Estado: disponible para consulta y análisis]
    OK -->|"No"| ERROR[Marca error de formato o contenido]
    ERROR --> CORRIGE[Corrige y vuelve a intentar]
    CORRIGE --> METADATOS

    DISP --> FIN([🟢 Información lista para el análisis])
    METADATOS --> MET[📌 Se registran métricas estructuradas<br/>códigos de reporte · montos de sanción]

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
    style FIN1 fill:#e8f5e9,stroke:#2e7d32
    style AVISO fill:#fff8e1,stroke:#f9a825
    style ERROR fill:#ffebee,stroke:#c62828
```

> Fuente de negocio: **los propios reportes del cliente** (sin API ni acceso a Bolsa — acta 1), acotado a **Minería, Energía y Petróleo** (acta 3, REQ-07). Ver [[08 Ingesta de Datos]] y [[04 Requerimientos Funcionales#RF-006 — Carga de documentos (Superadmin)|RF-006…009]].

---

## 5. Análisis de sostenibilidad — detección de brechas (🤖 automático)

**Actor:** el sistema (sin intervención). Detecta indicadores sub-reportados, la base de la oportunidad comercial.

```mermaid
flowchart TD
    INICIO([🔵 Documento disponible para análisis]) --> LEE[Interpreta el contenido del documento]
    LEE --> COD[Identifica códigos del estándar GRI presentes<br/>ambiental · social · económico/gobernanza]
    COD --> MID[Evaluación del nivel de sustancia reportada<br/>por código y por sector]
    MID --> COMPARA{"¿El código reporta<br/>sustancia suficiente?"}

    COMPARA -->|"Completo"| OK[✅ Indicador bien reportado]
    COMPARA -->|"Sub-reportado"| BRECHA[⚠️ Brecha: poca sustancia<br/>política sin casos ni métricas]
    COMPARA -->|"Ausente"| FALTA[🔴 Brecha: código no reportado]

    BRECHA --> ALERTA[Marca la brecha como oportunidad de prospección]
    FALTA --> ALERTA
    OK --> GUARDA
    ALERTA --> GUARDA[Guarda el resultado por empresa, sector y año]
    GUARDA --> FIN([🟢 Radiografía GRI de la empresa disponible])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
    style BRECHA fill:#ffebee,stroke:#c62828
    style FALTA fill:#ffebee,stroke:#c62828
    style ALERTA fill:#fff8e1,stroke:#f9a825
```

> Regla de negocio: la brecha se define **por código y por sector** (lo "débil" en minería puede ser normal en banca). Alimenta [[14 Requerimientos del Kick-off (RF-11+)|RF-12]].

---

## 6. Análisis de sanciones y reputación (🤖 automático)

**Actor:** el sistema. Cuantifica sanciones económicas desde las memorias anuales.

```mermaid
flowchart TD
    INICIO([🔵 Memoria anual disponible]) --> BUSCA[Revisa secciones de pasivos y contingencias]
    BUSCA --> HAY{"¿Encuentra sanciones o<br/>procedimientos en curso?"}

    HAY -->|"No"| LIMPIO[✅ Empresa sin sanciones registradas]
    LIMPIO --> GUARDA

    HAY -->|"Sí"| EXTRA[Extrae por cada caso:<br/>entidad sancionadora · monto · año · motivo]
    EXTRA --> CUANTI[Convierte cada caso en un monto comparable]
    CUANTI --> SUMA[Suma y clasifica por tipo:<br/>laboral · ambiental · consulta previa · corrupción]
    SUMA --> RANK[Posiciona a la empresa en el ranking del sector]
    RANK --> DEBIL[Señala los puntos débiles de reputación]
    DEBIL --> GUARDA[Guarda el resultado por empresa y año]

    GUARDA --> FIN([🟢 Perfil de sanciones disponible para prospección])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
    style LIMPIO fill:#e8f5e9,stroke:#2e7d32
    style DEBIL fill:#fff8e1,stroke:#f9a825
```

> Los montos deben ser **cuantificables** (S/) y trazables a la fuente y página. Alimenta [[14 Requerimientos del Kick-off (RF-11+)|RF-13]].

---

## 7. Consulta analítica con IA (🟢 rol Análisis)

**Actor:** Administrador/Analista. Pregunta en lenguaje natural; la respuesta **solo usa la base de documentos del cliente** (delimitación — acta 1, REQ-01) y siempre cita su fuente.

```mermaid
flowchart TD
    INICIO([🔵 Analista necesita una respuesta]) --> PREG[Formula su pregunta en lenguaje natural<br/>ej. brechas GRI de la empresa X · sanciones del sector Y]
    PREG --> INT[Interpreta la intención de la consulta]
    INT --> TIPO{"¿Qué tipo de respuesta<br/>necesita?"}

    TIPO -->|"Documentos"| RAG[Busca en la base de conocimiento<br/>memorias y reportes]
    TIPO -->|"Métricas"| TAB[Consulta los datos estructurados<br/>códigos GRI · montos · rankings]
    TIPO -->|"Ambas"| MIXTO[Combina búsqueda en documentos<br/>y datos estructurados]
    RAG --> CONTEXTO
    TAB --> CONTEXTO
    MIXTO --> CONTEXTO[Recupera el contexto relevante con su origen]

    CONTEXTO --> COMPONE[Compone la respuesta apoyada en IA]
    COMPONE --> VALIDA{"¿La respuesta está<br/>respaldada por fuentes?"}

    VALIDA -->|"Sí"| CITA[Adjunta las citas verificables<br/>documento · empresa · año · página]
    CITA --> PANEL[Puebla el panel de brechas y sanciones relacionado]
    PANEL --> ENTREGA[Entrega respuesta en tiempo razonable]
    ENTREGA --> FIN([🟢 Analista decidido con información citada])

    VALIDA -->|"No"| HONESTA[Responde que no hay base suficiente en los documentos]
    HONESTA --> SUGIERE[Sugiere ampliar la ingesta o reformular]
    SUGIERE --> FIN2([🔵 Sin respuesta especulativa])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
    style FIN2 fill:#e8f5e9,stroke:#2e7d32
    style HONESTA fill:#fff8e1,stroke:#f9a825
```

> Reglas de oro del negocio: **ninguna respuesta sin cita** y **delimitación total a la base del cliente** (acta 1). Si la respuesta no está en los documentos → buscar o indicar que no se encontró. Ver [[04 Requerimientos Funcionales#RF-010 — Consulta en lenguaje natural (Administrador)|RF-010…012]] y [[16 Diagramas de Secuencia]].

---

## 8. Reporte de prospección (🟢 rol Análisis)

**Actor:** Administrador/Analista. Compila el dossiere comercial en un documento descargable.

```mermaid
flowchart TD
    INICIO([🔵 Analista prepara un acercamiento]) --> SEL[Selecciona empresa objetivo y periodo]
    SEL --> SEC[Elige secciones del reporte<br/>resumen · brechas GRI · sanciones · oportunidades · fuentes]
    SEC --> COMPILE[Compila automáticamente:<br/>brechas + sanciones + métricas + fuentes]
    COMPILE --> VISTA[Muestra vista previa del documento]
    VISTA --> OKPREV{"¿El contenido<br/>es el esperado?"}

    OKPREV -->|"No"| AJUSTA[Ajusta empresa, periodo o secciones]
    AJUSTA --> COMPILE
    OKPREV -->|"Sí"| EMITE[Emite el documento final]
    EMITE --> REG[Registra la generación en el historial de eventos]
    REG --> ENTREGA[Deja el reporte disponible para descarga y compartido con el equipo]
    ENTREGA --> FIN([🟢 Dossiere listo para el acercamiento comercial])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
```

> Un click para el analista: el negocio pide que la preparación no tome más que la selección. Ver [[04 Requerimientos Funcionales#RF-016 — Reporte PDF de prospección (Administrador)|RF-016]].

---

## 9. Prospección comercial de extremo a extremo (🟢🤝 proceso de negocio central)

**Actores:** Analista comercial (🟢) + mercado. Es el proceso que justifica la plataforma: convertir información pública en **ingresos por consultoría**.

```mermaid
flowchart TD
    INICIO([🔵 Nueva información analizada]) --> RANK[Revisa ranking de brechas y sanciones por sector]
    RANK --> POT{"¿Empresa con brecha relevante<br/>o sanción significativa?"}

    POT -->|"No"| ARCHIVA[Archiva la observación para el siguiente ciclo]
    ARCHIVA --> FIN0([🔵 Sin oportunidad por ahora])

    POT -->|"Sí"| PERFIL[Perfil de oportunidad:<br/>qué le duele · qué puede mejorar · argumento de valor]
    PERFIL --> CONTACTO{"¿Se identifica a la persona clave<br/>gerente de sostenibilidad o financiero?"}

    CONTACTO -->|"Sí"| PREPARA[Prepara dossiere de prospección<br/>reporte + propuesta de valor]
    CONTACTO -->|"No"| DIRECTO[Identifica el contacto por canales institucionales<br/>de la empresa: correo, web corporativa, referencias]
    DIRECTO --> HALLA{"¿Contacto encontrado?"}
    HALLA -->|"Sí"| PREPARA
    HALLA -->|"No"| ESPERA[Deja la oportunidad en seguimiento]
    ESPERA --> FIN0

    PREPARA --> ACERCA[Se acerca a la empresa como aliado estratégico<br/>no como crítico: le ayuda a reparar y mejorar su reputación]
    ACERCA --> RESP{"¿La empresa muestra<br/>interés?"}

    RESP -->|"No"| SEGUIM[Programa seguimiento en el próximo ciclo anual]
    SEGUIM --> FIN0

    RESP -->|"Sí"| CITA[Agenda reunión de trabajo<br/>chatbot de citas o coordinación directa]
    CITA --> PROP[Presenta propuesta de consultoría retribuida<br/>plan de mejora de sostenibilidad y reputación]
    PROP --> CIERRE{"¿Acepta el servicio?"}

    CIERRE -->|"Sí"| CONTRATO[Formaliza contrato de consultoría]
    CONTRATO --> EJECUTA[Presta el servicio de consultoría<br/>con la plataforma como soporte analítico]
    EJECUTA --> EXITO([🟢 Ingreso retribuido + impacto de sostenibilidad])

    CIERRE -->|"No"| SEGUIM

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style EXITO fill:#e8f5e9,stroke:#2e7d32
    style FIN0 fill:#e0f2f1,stroke:#00695c
    style ACERCA fill:#fff8e1,stroke:#f9a825
    style CONTRATO fill:#e8f5e9,stroke:#2e7d32
```

> Este flujo conecta la plataforma con el **pivot a consultoría** del CEO (ver [[13 Visión del CEO y Caso de Uso (Kick-off)]] y [[01 Contexto del Proyecto]]). Cada paso sensible queda registrado (proceso 11).

---

## 10. Consulta pública de información (🌐) — ⏸️ REPLANTEADO

> ⏸️ **Fuera del alcance actual:** el "rol público" se replanteó como **suscripción** (ver la data sin analítica) para la 2ª fase (actas 1–2). Se conserva como referencia.

**Actor:** ciudadano o profesional externo. Solo lectura, unificado, sin prospección; accesible e inmersivo.

```mermaid
flowchart TD
    INICIO([🔵 Persona entra a la consulta pública]) --> IDIOM["Elige idioma<br/>español · inglés · lengua originaria"]
    IDIOM --> BUSCA[Busca por empresa o sector]
    BUSCA --> HAY{"¿Encuentra resultados?"}

    HAY -->|"No"| SUG[Le sugiere búsquedas populares]
    SUG --> BUSCA

    HAY -->|"Sí"| FICHA[Abre la ficha unificada de la empresa:<br/>sostenibilidad + memoria anual, solo lectura]
    FICHA --> PROF{"¿Quién consulta?"}
    PROF -->|"Ciudadano"| LEE1[Explora el impacto real de las empresas]
    PROF -->|"Profesional / empresa"| LEE2[Revisa ratings e indicadores validados]
    LEE1 --> MAS{"¿Consulta otra empresa?"}
    LEE2 --> MAS
    MAS -->|"Sí"| BUSCA
    MAS -->|"No"| FIN([🟢 Consulta finalizada · transparencia cumplida])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
```

> Referencia histórica: RF-14/RF-15 del kick-off (⏸️ sin prioridad). Ver [[14 Requerimientos del Kick-off (RF-11+)]] y [[17 Diagrama de Casos de Uso]].

---

## 11. Auditoría y trazabilidad (📋 transversal)

**Actor:** el sistema registra; el Superadmin consulta. Protege al negocio y cumple políticas de seguridad.

```mermaid
flowchart TD
    subgraph REGISTRO["📡 Registro (automático)"]
        EV[Ocurre un evento sensible<br/>ingreso · cambio de rol · ingesta · generación o descarga de reporte · configuración · intento fallido]
        EV --> CAP[Registra quién · qué · cuándo · resultado]
        CAP --> CONS[Consolida el registro histórico]
    end

    CONS --> USO

    subgraph USO["🔍 Consulta (🟡 Superadmin)"]
        USO[Filtra por tipo, usuario o rango de fechas]
        FILTRO --> LEE[Revisa la secuencia de eventos]
        LEE --> EXPORTA{"¿Necesita un informe?"}
        EXPORTA -->|"Sí"| DOC[Exporta el informe de auditoría]
        EXPORTA -->|"No"| CIERRA
        DOC --> CIERRA([🟢 Trazabilidad verificada])
    end

    style EV fill:#ffebee,stroke:#c62828
    style CIERRA fill:#e8f5e9,stroke:#2e7d32
```

> Soporta RNF-04 y RF-09 (ver [[04 Requerimientos Funcionales#RF-020 — Registro automático de eventos|RF-020/021]] y [[05 Requerimientos No Funcionales|RNF-04]]).

---

## 12. Ciclo anual de vigencia de la información (🔄 transversal)

**Actor:** el sistema + 🟢 Análisis. Resuelve el reto de la **autonomía**: los documentos son anuales y la base se desfasa.

```mermaid
flowchart TD
    INICIO([🔵 Se publica un nuevo periodo anual]) --> DETECTA[Detecta publicaciones nuevas de las fuentes vigiladas]
    DETECTA --> LISTA[Encola la recolección automática]
    LISTA --> RECOLECTA[Obtiene memorias y reportes del nuevo año]
    RECOLECTA --> CALIDAD{"¿Documentos legibles<br/>y completos?"}

    CALIDAD -->|"No"| MANUAL[Asigna la tarea a recolección manual]
    MANUAL --> CALIDAD

    CALIDAD -->|"Sí"| REEMPLAZA[Reemplaza la versión anterior y mantiene el histórico]
    REEMPLAZA --> REANALIZA[Re-ejecuta los análisis: brechas y sanciones del nuevo año]
    REANALIZA --> NOTIFICA[Notifica al equipo: información vigente del periodo]
    NOTIFICA --> FIN([🟢 Base siempre actualizada año a año])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN fill:#e8f5e9,stroke:#2e7d32
    style MANUAL fill:#fff8e1,stroke:#f9a825
```

> Ver [[14 Requerimientos del Kick-off (RF-11+)|RF-16]] y [[08 Ingesta de Datos]].

---

## 13. Chatbot inclusivo de citas (🌐) — ⛔ FUERA DEL ALCANCE

> ⛔ **Fuera del alcance actual:** el chatbot de citas venía del onepager (fuente archivada); no está en el numerado oficial ni en las actas. Se conserva como referencia histórica.

**Actor:** público externo con o sin discapacidad. Complemento post-contacto del proceso 9.

```mermaid
flowchart TD
    INICIO([🔵 Persona abre el asistente de citas]) --> SALUDA[Saludo accesible<br/>texto grande · alto contraste · compatible con lectores de pantalla]
    SALUDA --> INT{"¿Qué necesita?"}

    INT -->|"Agendar cita"| DATOS[Solicita datos mínimos de contacto]
    DATOS --> HORAS[Muestra horarios disponibles]
    HORAS --> CONFIRMA{"¿Confirma la cita?"}
    CONFIRMA -->|"Sí"| RESERVA[Reserva y sincroniza con la agenda del equipo]
    RESERVA --> RECUERDA[Programa el recordatorio]
    RECUERDA --> FIN1([🟢 Cita agendada])
    CONFIRMA -->|"No"| OFRECE[Ofrece otras alternativas]
    OFRECE --> HORAS

    INT -->|"Consultar cita"| VERIF[Solicita su identificador de contacto]
    VERIF --> MUESTRA[Muestra detalle de la cita]
    MUESTRA --> MODIF{"¿Desea cambiarla?"}
    MODIF -->|"Sí"| HORAS
    MODIF -->|"No"| FIN2([🟢 Consulta resuelta])

    INT -->|"Ayuda humana"| HUMANO[Deriva a una persona del equipo<br/>por el canal de contacto acordado]
    HUMANO --> FIN3([🟢 Escalado a atención humana])

    style INICIO fill:#e3f2fd,stroke:#1565c0
    style FIN1 fill:#e8f5e9,stroke:#2e7d32
    style FIN2 fill:#e8f5e9,stroke:#2e7d32
    style FIN3 fill:#e8f5e9,stroke:#2e7d32
```

> Referencia histórica: RF-10/RF-19 (⏸️ sin prioridad) y la pregunta rectora del onepager archivado. Ver [[01 Contexto del Proyecto]].

---

## 🗂️ Mapeo Proceso → Actores → Requerimientos

| # | Proceso | Actores | RF / RNF / CU |
|---|---|---|---|
| 0 | Cadena de valor | Todos | Visión general |
| 1 | Accesos y sesión | 🟡🟢🔵🌐 | RF-01 · RNF-01 · CU001 |
| 2 | Usuarios y permisos | 🟡 | RF-02 · CU002 |
| 3 | Configuración | 🟡 | RF-01/RNF-01 · CU003 |
| 4 | Abastecimiento | 🟡 | RF-006…009 · CU003 (A&D) |
| 5 | Brechas GRI | 🤖 | RF-12 · CU006 |
| 6 | Sanciones | 🤖 | RF-13 · CU006 |
| 7 | Consulta IA | 🟢 | RF-05 · CU006 |
| 8 | Reporte prospección | 🟢 | RF-07 · CU007/CU009 |
| 9 | Prospección comercial E2E | 🟢🤝 | RF-006…RF-019 · negocio |
| 10 | Consulta pública | 🌐 | RF-14 · RF-15 · CU012 |
| 11 | Auditoría | 🟡 + 🤖 | RF-09 · RNF-04 · CU004 |
| 12 | Ciclo anual | 🤖 + 🟢 | RF-16 |
| 13 | Chatbot citas | 🌐 | RF-10 · RF-19 · CU013 (F2) |

## 🔗 Relacionado
- [[Diagramas de Procesos]] (vista técnica equivalente) · [[16 Diagramas de Secuencia]] · [[17 Diagrama de Casos de Uso]] · [[03 Roles y Control de Accesos]] · [[04 Requerimientos Funcionales]] · [[14 Requerimientos del Kick-off (RF-11+)]] · [[13 Visión del CEO y Caso de Uso (Kick-off)]]
