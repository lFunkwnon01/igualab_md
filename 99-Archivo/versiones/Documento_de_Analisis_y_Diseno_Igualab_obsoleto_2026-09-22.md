# Documento de Análisis y Diseño — Igualab

> Conversión del PDF a Markdown. Se conserva el contenido textual disponible en el documento y se marcan los elementos gráficos que no pueden representarse directamente como texto.

## Página 1

> **[Página sin texto extraíble; contiene contenido gráfico/visual.]**
> **[Contenido gráfico de la página 1: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 2

1

## HISTORIAL DE VERSIONES

FECHA VERSIÓN DESCRIPCIÓN 03/09/2026 Versión Inicial del documento

V

### AUTORES

REVISADO POR APROBADO POR 1.0 Luis Javier Millones Carrasco Carlos David Ordinola Ortega Fabricio Godofredo Ladera La Torre

Elaboración de la primera versión del Documento de Análisis y Diseño

Autores: Project Manager: Fabricio Ladera La Torre Analista Funcional: Luis Javier Millones Carrasco Analista Funcional: Carlos David Ordinola Ortega Desarrollador backend: Juan Marcelo Ferreyra Gonzales Desarrollador frontend: Juan Renato Flores Pascal Analista de calidad: Mauricio Gabriel Gonzalez Kremer Analista de calidad: Alonso Aarón Benites Camacho Revisores: TCH: Teofilo Chambilla Aquino Aprobadores YY:

---

## Página 3

## Contenido

1. ANTECEDENTES.................................................................................................................7
2. OBJETIVO GENERAL......................................................................................................... 7
3. ALCANCE DEL PROYECTO...............................................................................................7
4. DISEÑO FUNCIONAL DETALLADO...................................................................................8
5. DIAGRAMA DEL PROCESO...............................................................................................8
### 5.1. Diagrama del proceso actual (AS IS)...........................................................................8

### 5.2. Problemas identificados...............................................................................................8

### 5.3. Diagrama del proceso actual (AS IS)...........................................................................9

6. REGLAS DE NEGOCIO.......................................................................................................9
7. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL............................................................. 12
### 7.1. ACTORES..................................................................................................................12

### 7.2. DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN.............................................13

### 7.2.1. Listado de casos de uso................................................................................... 13

### 7.3. ESPECIFICACIÓN DE CASOS DE USO.................................................................. 17

### 7.4. REQUERIMIENTOS FUNCIONALES........................................................................18

### 7.5. REQUERIMIENTOS NO FUNCIONALES................................................................. 23

8. MODELO DE DATOS.........................................................................................................26
9. DICCIONARIO DE DATOS................................................................................................ 26

---

## Página 4

## GLOSARIO DE TÉRMINOS

---

## Página 5

1.  ANTECEDENTES
Igualab es una organización peruana dedicada a la consultoría en Diversidad e Inclusión (DEI), sostenibilidad y Responsabilidad Social Empresarial (RSE), enfocada en promover entornos laborales inclusivos y prácticas ASG (Ambiental, Social y Gobernanza) en el sector empresarial peruano. Fundada en 2016, cuenta con certificaciones como Entidad Perceptora de Donaciones (EPD) y reconocimientos internacionales como el Corporate Live Wire Innovation & Excellence Awards. En el contexto peruano, las empresas que cotizan en la Bolsa de Valores de Lima están obligadas a emitir memorias anuales financieras, mientras que los reportes de sostenibilidad son validados por auditores internacionales bajo estándares como el GRI (Global Reporting Initiative). Estos documentos contienen información crítica sobre cumplimiento normativo, sanciones económicas, indicadores de gobernanza y métricas de desempeño ambiental y social. Actualmente, Igualab enfrenta un desafío operativo en su área comercial: opera de manera reactiva, recibiendo empresas de forma orgánica, sin herramientas que sistematicen el análisis de información pública para detectar oportunidades de acercamiento. Frente a ello, se plantea el desarrollo de una plataforma basada en inteligencia artificial (RAG) que permita procesar reportes de sostenibilidad y memorias anuales, identificar brechas en indicadores ASG/GRI y generar información procesada que facilite la toma de decisiones comerciales.

2. OBJETIVO GENERAL
Desarrollar una plataforma web de analítica de sostenibilidad que permita a Igualab procesar y consultar información pública de empresas (reportes de sostenibilidad y memorias anuales de la Bolsa de Valores de Lima), identificando brechas en indicadores ASG mediante un asistente de inteligencia artificial (RAG), para mejorar el análisis de reportes de prospección de la organización de manera proactiva y fundamentada en datos.

3. ALCANCE DEL PROYECTO
El proyecto comprende el diseño, desarrollo e implementación de una plataforma web que centralice la ingesta, indexación, consulta y explotación analítica de memorias anuales y reportes de sostenibilidad (GRI) de empresas que cotizan en la Bolsa de Valores de Lima, mediante una arquitectura cliente-servidor y un motor de inteligencia artificial basado en RAG (Retrieval-Augmented Generation). El sistema estará orientado a optimizar las operaciones de dos perfiles:

---

## Página 6

● SuperAdmin: gestiona usuarios (creación, habilitación/deshabilitación, asignación de roles) y es responsable de la ingesta de documentos de sostenibilidad y memorias anuales al sistema. ● Administrador: realiza consultas al asistente de inteligencia artificial (RAG), revisa las brechas GRI y sanciones detectadas, y genera reportes de prospección comercial en formato PDF. El SuperAdmin concentra tanto la administración de accesos como la carga de información fuente, mientras que el Administrador se enfoca exclusivamente en la explotación analítica y comercial de dicha información.

4. DISEÑO FUNCIONAL DETALLADO
La solución consiste en una plataforma web de analítica de sostenibilidad que permite a Igualab procesar reportes de sostenibilidad y memorias anuales de empresas que cotizan en la Bolsa de Valores de Lima, identificar brechas en indicadores ASG mediante inteligencia artificial, y generar reportes de prospección comercial. La plataforma se organiza en ocho módulos funcionales, diseñados sobre dos roles: SuperAdmin y Administrador. Módulo de Autenticación y Gestión de Sesión: este módulo controla el acceso a la plataforma mediante correo y contraseña, garantizando que solo cuentas registradas y habilitadas puedan operar el sistema. Incluye recuperación de contraseña por enlace temporal enviado al correo (vigencia de 30 minutos), cambio de contraseña estando autenticado, expiración de sesión por inactividad, cierre de sesión manual y bloqueo temporal de la cuenta tras 5 intentos fallidos consecutivos de inicio de sesión. Módulo de Gestión de Usuarios: exclusivo del SuperAdmin, permite crear cuentas de Administrador (con contraseña temporal para primer acceso), habilitarlas o deshabilitarlas, y transferir el rol de SuperAdmin a una cuenta de Administrador existente, con confirmación previa. El sistema garantiza en todo momento la existencia de exactamente una cuenta con rol SuperAdmin; no contempla eliminación permanente de cuentas, solo habilitación y deshabilitación, para preservar la trazabilidad de auditoría. Módulo de Catálogo de Empresas: exclusivo del SuperAdmin, permite registrar las empresas sobre las cuales se realizará el análisis, exigiendo nombre y sector. El análisis de brechas se limita a los sectores acordados con el cliente: Minería, Petróleo y Energía; empresas de otros sectores pueden registrarse en el catálogo, pero no son elegibles para el análisis ni para la generación de reportes. Módulo de Ingesta de Documentos: exclusivo del SuperAdmin, permite cargar memorias anuales y reportes de sostenibilidad GRI en formato Markdown (.md), asociados obligatoriamente a una empresa, un año y un tipo de documento. El sistema valida el tipo real del archivo en el servidor, calcula su hash SHA-256 para rechazar duplicados, y verifica que contenga al menos un código GRI o mención de sanción reconocible; en caso contrario, el documento se marca como observado en lugar de rechazarse por completo. El procesamiento es síncrono, con progreso visible al usuario, e incluye la indexación del contenido y la ejecución automática del análisis de brechas GRI como último paso de una ingesta exitosa. Ante rechazo o interrupción, el sistema revierte el procesamiento sin conservar contenido parcial. Módulo de Análisis y Validación de Brechas GRI: exclusivo del Administrador, traduce el contenido indexado en un diagnóstico de cumplimiento GRI con supervisión humana obligatoria. El motor de análisis identifica automáticamente qué códigos del catálogo GRI (40 códigos) están presentes en el documento, citando el fragmento de origen, sin comparar contra el texto del estándar GRI oficial. El Administrador revisa cada cita textual y asigna manualmente el estado del código (OK, Baja sustancia o Sub-reportado); el sistema no infiere ni calcula este estado de forma automática. Las sanciones económicas se identifican exclusivamente a partir de menciones explícitas en los documentos ingestados. El sistema calcula automáticamente el puntaje ESG a partir

---

## Página 7

de los estados asignados; si no se detectó ningún código, se muestra como "no disponible", nunca como cero. Módulo de Asistente de Inteligencia Artificial (RAG): exclusivo del Administrador, permite consultas en lenguaje natural sobre el corpus indexado. Requiere seleccionar empresa, sector y año antes de habilitar la consulta. El asistente se limita a responder temas de sostenibilidad empresarial, indicadores GRI, sanciones o el contenido de los documentos ingestados; ante cualquier otra consulta, debe declinar explícitamente, independientemente de si el modelo posee conocimiento general para responderla. Toda respuesta incluye la referencia al documento, empresa y año de origen, y suprime cualquier afirmación sin fuente verificable en el corpus; ante información insuficiente, lo declara explícitamente en lugar de inventar una respuesta. El contenido recuperado de los documentos se trata siempre como datos de referencia dentro del prompt, nunca como instrucciones del sistema, previniendo que un documento de un tercero manipule el comportamiento del asistente. Ante indisponibilidad del proveedor externo de IA, el sistema informa el error sin bloquear el resto de los módulos. Módulo de Generación de Reportes de Prospección: exclusivo del Administrador, consolida el análisis validado de una empresa en un documento PDF para el acercamiento comercial. Solo puede generarse para empresas con al menos un documento indexado, y se construye exclusivamente a partir de los resultados de análisis ya almacenados y validados manualmente, sin invocar al servicio de IA en este paso, garantizando que dos generaciones sobre los mismos datos produzcan el mismo resultado. El reporte incluye el estado de cada código GRI con su cita de respaldo, las sanciones identificadas (con monto o marcadas como "no cuantificada"), y un resumen ejecutivo con el puntaje ESG. Una vez generado, el reporte es inmutable; su historial es visualizable y descargable por cualquier Administrador. Módulo de Auditoría: exclusivo del SuperAdmin, registra automáticamente todo evento sensible del sistema — inicio de sesión, cambio de estado o rol de cuenta, ingesta, rechazo de documento y generación de reportes — consignando la cuenta responsable, fecha, hora y tipo de acción. El registro es consultable filtrando por usuario, fecha y tipo de evento, y es de solo inserción: no admite edición ni eliminación.

4. DIAGRAMA DEL PROCESO
4.1. Diagrama del proceso actual (AS IS)

4.2. Problemas identificados

> **[Contenido gráfico de la página 7: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 8

4.3. Diagrama del proceso actual (AS IS)

5. REGLAS DE NEGOCIO
Las Reglas de Negocio (RN) se detallan a continuación:

RN NOMBRE DE LA REGLA DETALLE DE LA REGLA RN-001 Conjunto cerrado de roles El sistema reconoce únicamente dos roles: SuperAdmin y Administrador. Toda cuenta tiene exactamente uno asignado. RN-002 Unicidad del SuperAdmin El rol SuperAdmin está asignado a exactamente una cuenta en todo momento, con independencia de su estado de habilitación o de que tenga una sesión abierta. RN-003 Permisos cerrados por rol Ninguna cuenta puede ejecutar acciones no asignadas a su rol respectivo. RN-004 Condiciones de autenticación Solo pueden autenticarse las cuentas registradas y habilitadas en el sistema.

> **[Contenido gráfico de la página 8: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 9

RN-005 Efecto de la deshabilitación Una cuenta deshabilitada pierde acceso inmediato a todas las funcionalidades del sistema, cerrando su sesión activa. RN-006 Cuenta SuperAdmin inicial El sistema se inicializa con una única cuenta SuperAdmin creada durante el despliegue. Esta cuenta no puede crearse mediante la aplicación. RN-007 Datos obligatorios de la cuenta Toda cuenta se registra con nombre, correo electrónico y contraseña. RN-008 Rol por defecto Toda cuenta creada a través de la aplicación se asigna con rol Administrador. El rol SuperAdmin solo se obtiene por transferencia RN-009 Transferencia del rol SuperAdmin El rol SuperAdmin puede transferirse a una cuenta de Administrador existente y habilitada. La transferencia es atómica: la cuenta destino adquiere el rol y la cuenta origen pasa a rol Administrador en una sola operación. RN-010 Autonomía en la recuperación de acceso Todo usuario debe poder recuperar el acceso a su cuenta ante la pérdida de sus credenciales, sin requerir la intervención del SuperAdmin. RN-011 Tipos de documento admisibles Solo se admiten como documentos fuente memorias anuales y reportes de sostenibilidad GRI. El tipo es un atributo obligatorio del documento con esos dos valores posibles. RN-012 Responsabilidad de la conversión El sistema no realiza conversión de formatos. Los documentos fuente ingresan al sistema ya convertidos a Markdown por el cliente, quien es responsable de la fidelidad de la conversión y la integridad de las tablas (con formato pipe).

RN-013 Contenido mínimo  del documento El documento ingestado debe contener al menos un código del catálogo GRI (40 códigos) o una mención de sanción, reconocidos mediante el mecanismo de detección configurado para colocarlos en el reporte de prospección. RN-014 Identificación obligatoria del documento Todo documento que se ingesta debe estar asociado a una empresa existente y activa del catálogo del sistema; el año del ejercicio del documento y su tipo (memoria anual o reporte de sostenibilidad GRI). RN-015 Origen de las sanciones Las sanciones asociadas a una empresa se identifican exclusivamente a partir de los documentos ingestados para esa empresa. El sistema no consulta fuentes externas de sanciones.

---

## Página 10

RN-016 Asignación de estado GRI El estado de cumplimiento de cada código GRI contará con tres estados únicos: OK, Baja sustancia y Sub-reportado. Este será asignado manualmente por el rol Administrador, en base a su criterio profesional, tras revisar la cita textual extraída del documento. El sistema no calcula ni infiere dicho estado de forma automática, ni compara el contenido contra el texto del estándar GRI. RN-017 Alcance del análisis El análisis se ejecuta como último paso de la ingesta y su alcance se limita a una empresa, un año y los sectores habilitados. 40 códigos GRI del catálogo corporativo presentes en los documentos; sus resultados se persisten en la base de datos (tabla del análisis), y son la única base del reporte. RN-018 Catálogo de códigos GRI evaluables Sólo son evaluables los 40 códigos del catálogo corporativo versionado. La evidencia válida es la reportada por la empresa en sus documentos; el texto del estándar GRI oficial no es fuente de evaluación. RN-019 Acotación de Sectores del Análisis El análisis de brechas GRI y sanciones se limita a empresas de los sectores Minería, Petróleo y Gas, y Energía, acordados con el cliente. RN-020 Precondición del reporte de prospección El reporte de prospección de una empresa solo se ejecuta si dicha empresa cuenta con al menos un documento ingestado. RN-021 Fundamentación en el corpus El modelo LLM responde exclusivamente con base en los documentos ingestados. No emplea conocimiento externo al corpus ni genera información no respaldada por dichos documentos. RN-022 Trazabilidad de la información entregada Toda información que el sistema entrega debe ser atribuible a un documento del corpus. Una afirmación sin respaldo trazable no constituye información válida del sistema. RN-023 Declaración explícita ante ausencia de información La insuficiencia de información en los documentos ingestados disponibles es un resultado válido y explícito, tanto en las respuestas del modelo LLM como en el análisis para la generación de reportes. La ausencia de respaldo nunca se sustituye por datos generados, inferidos, supuestos o atribuidos a fuentes inexistentes. RN-024 Contenido del reporte de prospección Todo reporte consolida, un sector para una empresa y un año específico, el estado de cada código GRI (asignado de forma manual), las sanciones identificadas y un resumen ejecutivo.

---

## Página 11

RN-025 Determinismo del reporte de prospección El contenido del reporte de prospección se deriva exclusivamente de los resultados ya almacenados. Dos generaciones sobre los mismos datos y el mismo criterio producen el mismo resultado. RN-026 Inmutabilidad del reporte Un reporte de prospección generado no puede modificarse ni eliminarse. Se conserva permanentemente en el sistema en . RN-027 Eventos auditados Se registra automáticamente todo inicio de sesión, cambio de estado o rol de una cuenta, ingesta, rechazo de documento y generación de reporte de prospección. RN-028 Contenido del registro Cada registro de auditoría consigna la cuenta que originó la acción, fecha,  hora y tipo de acción. RN-029 Inmutabilidad de la auditoría Los registros de auditoría no pueden modificarse ni eliminarse. RN-030 Degradación ante indisponibilidad del asistente La indisponibilidad del servicio de IA no impide operar los módulos de gestión de cuentas, descargas de reportes de prospección, auditoría y creación de empresas. RN-031 Ausencia de hallazgo y ausencia de evidencia La ausencia de hallazgos y la falta de evidencia analizable son resultados distintos y no equivalentes. La falta de evidencia no constituye cumplimiento. RN-032 Información parcial La información incompleta respecto a los campos esperados es admisible y se conserva identificada como tal. Un dato no determinado nunca se sustituye por un valor por defecto ni se omite del análisis. RN-033 Unicidad de documento por empresa y año El sistema no admite más de un documento del mismo tipo (memoria anual o reporte de sostenibilidad) para una misma empresa y año para así evitar la duplicación. RN-034 Cálculo del puntaje ESG El puntaje ESG de una empresa para un año se calcula automáticamente a partir de los estados asignados a sus códigos GRI. RN-035 Registro de empresas El superAdmin es el encargado de crear una empresa y registrarla en el sistema., Para lo cual es necesario que tenga un nombre y un sector asociado. RN-036 Sesión activa Toda sesión recientemente activa debe permanecer en ese estado por un tiempo determinado. Cuando deje de estar activa se cierra sesión. RN-037 Restricción de Dominio del Asistente Las consultas al asistente deben limitarse a temas de sostenibilidad empresarial, indicadores GRI, sanciones

---

## Página 12

económicas o el contenido de los documentos ingestados. Ante una consulta fuera de este alcance, el asistente debe declinar explícitamente, indicando que su función se limita al análisis de sostenibilidad de empresas, independientemente de si el modelo posee conocimiento general suficiente para responderla. RN-038 Requerimientos para consulta Toda consulta debe tener como datos el nombre de la empresa, el sector al que pertenece y el año del reporte a consultar. Caso contrario no debe permitir la consulta. RN-039 Integridad de la ingesta Un documento rechazado o cuya ingesta haya sido interrumpida no debe incorporarse total ni parcialmente al corpus documental. Solo debe conservarse la información necesaria para identificar y auditar el rechazo.

6. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL
6.1.

### ACTORES

SuperAdmin: usuario con privilegios totales sobre la plataforma. Gestiona usuarios (creación, invitación, habilitación, deshabilitación y asignación de roles) y es responsable de la ingesta de memorias anuales y reportes de sostenibilidad al sistema, incluyendo la validación de su correcta indexación. Administrador: usuario operativo encargado de la explotación analítica del sistema. Consulta al asistente de IA (RAG) en lenguaje natural, revisa las brechas GRI y sanciones detectadas por empresa, y genera reportes de prospección en PDF para apoyar el acercamiento comercial de Igualab. Sistema de IA / LLM (Externo): modelo de lenguaje provisto vía API (servidor de la universidad) que sustenta el motor RAG: generación de embeddings, indexación semántica y generación de respuestas a consultas del Administrador. Bolsa de Valores de Lima (Externo — fuente de datos): repositorio público de donde se obtienen las memorias anuales y reportes de sostenibilidad (GRI) que el SuperAdmin ingesta al sistema.

6.2. DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN 6.2.1. Listado de casos de uso

● Casos de uso de la Empresa

---

## Página 13

CÓDIGO NOMBRE CU PADRE CU001 Autenticación y Gestión de Sesión - CU002 Gestión de Usuarios CU001 CU003 Ingesta de Documentos (memorias y reportes GRI) CU001 CU004 Consulta al Asistente de IA (RAG) CU001 CU005 Detección de Brechas GRI y Sanciones CU003 CU006 Generación de Reportes de Prospección (PDF) CU005 CU007 Visualización de Dashboards de Bolsa de Valores CU001 CU008 Auditoría de Eventos del Sistema CU002

CU001: Autenticación y Gestión de Sesión Descripción Este caso de uso permite a los usuarios registrados (SuperAdmin y Administrador) iniciar una sesión segura en la plataforma mediante correo electrónico y contraseña. El sistema valida las credenciales contra los registros existentes, verifica que la cuenta esté habilitada, identifica el rol y establece una sesión autenticada mediante un token JWT firmado que incorpora la identidad de la cuenta y su rol vigente. El caso de uso abarca además la recuperación de contraseña mediante enlace seguro, el cambio de contraseña con sesión activa, el cierre de sesión y la expiración de la sesión por inactividad.

### Actores

SuperAdmin Administrador Servicio de correo (externo) Precondiciones

–  El sistema debe estar desplegado y operativo.
–  La cuenta debe estar registrada en la plataforma y habilitada.
–  La cuenta debe contar con un rol asignado (SuperAdmin o Administrador).
–  Para la recuperación de contraseña, el correo debe estar registrado y el
servicio de correo disponible.

---

## Página 14

### Flujo Básico

Autenticación exitosa

1.  El usuario accede a la URL de la plataforma. El sistema muestra el formulario
de inicio de sesión.

2.  El usuario ingresa su correo electrónico y contraseña, y selecciona “Iniciar
sesión”.

3.  El sistema valida que la cuenta exista y se encuentre habilitada.
4.  El sistema valida que la contraseña corresponda a la cuenta registrada.
5.  El sistema identifica el rol de la cuenta (SuperAdmin o Administrador) y genera
un token de autenticación firmado que incorpora la identidad y el rol vigente.

6.  El sistema establece la sesión activa y redirige al usuario a la vista principal
correspondiente a su rol: panel de gestión para SuperAdmin, panel analítico para Administrador.

---

## Página 15

### Flujo Alternativo

Credenciales inválidas En el paso 4, la contraseña no corresponde a la cuenta. El sistema muestra el mensaje “Credenciales inválidas” —idéntico tanto si la cuenta no existe como si la contraseña es incorrecta— y el usuario permanece en la pantalla de inicio, donde puede reintentar. Correo con formato inválido En el paso 2, el usuario ingresa un correo con formato inválido. El sistema muestra “Ingrese un correo válido.” y no procesa la solicitud. Cuenta deshabilitada En el paso 3, el sistema detecta que la cuenta está deshabilitada. Bloquea el acceso y muestra “Usuario deshabilitado". Contacte al administrador.” Bloqueo por intentos fallidos Tras 5 intentos fallidos consecutivos, el sistema bloquea temporalmente la cuenta durante 15 minutos, impide nuevos intentos y registra el evento en el módulo de auditoría. Recuperación de contraseña

1.  Desde la pantalla de inicio, el usuario selecciona “¿Olvidaste tu contraseña?” e
ingresa el correo asociado a la cuenta.

2.  El sistema muestra un mensaje idéntico para toda cuenta (“Si el correo está
registrado en el sistema, recibirás un enlace de recuperación en los próximos minutos”), genera un enlace seguro con vigencia de 30 minutos y lo envía por correo.

3.  El usuario abre el enlace, que lo redirige a la pantalla de recuperación, e
ingresa y confirma una nueva contraseña que cumpla la política de seguridad.

4.  El sistema actualiza la contraseña, invalida el enlace utilizado y redirige al
formulario de inicio de sesión. Variantes: si el enlace expiró, el sistema muestra “El enlace de recuperación ha expirado.” y solicita generar uno nuevo; si las contraseñas no coinciden, muestra “Las contraseñas no coinciden.”; si la contraseña no cumple los requisitos, muestra el mensaje con la política mínima. En ningún caso se actualiza la contraseña. Cambio de contraseña con sesión activa Un usuario autenticado cambia su propia contraseña. El sistema aplica la misma política de complejidad y almacenamiento seguro que en el registro. Cierre de sesión y expiración por inactividad El usuario puede cerrar sesión manualmente, con lo que el sistema invalida la sesión activa. Además, tras 2 horas de inactividad el sistema expira la sesión y solicita reautenticación. Si la cuenta es deshabilitada, todas sus sesiones activas se invalidan de inmediato; tras una transferencia del rol SuperAdmin, la sesión aplica el rol vigente.

### Post Condiciones

–  Éxito: el usuario queda autenticado con una sesión activa y un token que refleja
su rol vigente; solo se habilitan las funcionalidades correspondientes a su rol.

–  Fallo: el usuario permanece en la pantalla de inicio de sesión, sin acceso a la
plataforma.

---

## Página 16

### Restricciones

–  Solo pueden autenticarse las cuentas registradas y habilitadas en el sistema.
–  El rol de la cuenta se obtiene exclusivamente del token firmado por el servidor,
nunca de parámetros de la petición.

–  Las contraseñas se almacenan mediante una función de hash de un solo
sentido con sal única por usuario; nunca se guardan en texto plano.

–  La autorización se evalúa en cada endpoint y la revocación de la sesión se
verifica en cada petición. Casos de Uso Padre Ninguno

> **[Imagen/diagrama referido en la página 16; no se incluye como texto.]**
> **[Imagen/diagrama referido en la página 16; no se incluye como texto.]**
> **[Contenido gráfico de la página 16: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 17

CU002: Gestión de Usuarios Descripción Este caso de uso permite al SuperAdmin realizar la administración de las cuentas del sistema: crear cuentas (a las que se asigna automáticamente el rol Administrador), habilitar y deshabilitar cuentas de Administrador, listar las cuentas existentes con su rol y estado, y transferir el rol SuperAdmin a una cuenta de Administrador existente y habilitada. La transferencia es atómica y garantiza que en todo momento exista exactamente una cuenta SuperAdmin.

### Actores

SuperAdmin Precondiciones

–  El SuperAdmin debe haber iniciado sesión exitosamente.
–  Para crear una cuenta, el correo ingresado no debe estar registrado
previamente.

–  Para transferir el rol SuperAdmin, la cuenta destino debe existir, tener rol
> **[Contenido gráfico de la página 17: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 18

Administrador y estar habilitada.

### Flujo Básico

Administración de cuentas

1.  El SuperAdmin accede al módulo de gestión de usuarios.
2.  El sistema lista las cuentas existentes mostrando, para cada una, su nombre,
correo, rol y estado (habilitada o deshabilitada).

3.  El SuperAdmin crea una cuenta ingresando nombre, correo y contraseña.
4.  El sistema valida que el correo no esté registrado, crea la cuenta y le asigna
automáticamente el rol Administrador.

5.  El sistema confirma la creación y actualiza el listado de cuentas.
### Flujo Alternativo

Correo ya registrado En el paso 3, el correo ingresado ya existe en el sistema. El sistema rechaza el registro e informa que el correo ya está en uso. Habilitar / deshabilitar cuenta El SuperAdmin habilita o deshabilita una cuenta de Administrador. Al deshabilitarla, el sistema invalida de inmediato todas las sesiones activas de esa cuenta y le revoca el acceso a todas las funcionalidades. Intento de deshabilitar o eliminar al SuperAdmin El sistema impide deshabilitar o eliminar la cuenta con rol SuperAdmin desde la aplicación, indicando que primero debe transferirse el rol a otra cuenta. Transferencia del rol SuperAdmin

1.  El SuperAdmin selecciona como destino una cuenta de Administrador
existente y habilitada.

2.  El sistema muestra una alerta de confirmación antes de ejecutar el cambio.
3.  Al confirmar, el sistema ejecuta la transferencia de forma atómica: la cuenta
destino adquiere el rol SuperAdmin y la cuenta origen pasa a rol Administrador en una sola operación. Las sesiones activas aplican el rol vigente tras la transferencia. Transferencia inválida Si la cuenta destino no existe, está deshabilitada o ya tiene rol SuperAdmin, el sistema rechaza la transferencia e informa el motivo.

### Post Condiciones

–  Éxito: las cuentas y sus estados o roles quedan persistidos; el sistema
mantiene siempre exactamente una cuenta con rol SuperAdmin.

–  Fallo: la operación se cancela y se notifica el error, sin alterar el estado de las
cuentas.

---

## Página 19

### Restricciones

–  Solo el rol SuperAdmin puede acceder a este módulo.
–  En todo momento existe exactamente una cuenta con rol SuperAdmin, con
independencia de su estado o de que tenga una sesión abierta; esto se garantiza además mediante una restricción de integridad en la base de datos.

–  La cuenta SuperAdmin inicial se crea durante el despliegue y no puede
crearse desde la aplicación.

–  Toda cuenta creada desde la aplicación nace con rol Administrador; el rol
SuperAdmin solo se obtiene por transferencia.

–  La transferencia del rol se ejecuta dentro de una transacción única; un fallo
parcial revierte toda la operación.

### Casos de Uso Padre

CU001 — Autenticación y Gestión de Sesión

> **[Imagen/diagrama referido en la página 19; no se incluye como texto.]**
> **[Imagen/diagrama referido en la página 19; no se incluye como texto.]**
> **[Contenido gráfico de la página 19: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 20

> **[Página sin texto extraíble; contiene contenido gráfico/visual.]**
> **[Contenido gráfico de la página 20: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 21

CU003: Ingesta de Documentos (memorias y reportes GRI) Descripción Este caso de uso permite al SuperAdmin ingresar documentos como memorias y reportes GRI, de tipo Markdown, para que el agente de IA pueda usarlos para proporcionar la información pedida.

### Actores

SuperAdmin Precondiciones

–  El SuperAdmin debe haber iniciado sesión exitosamente.
–  Debe encontrarse en el módulo de ingesta de documentos.
### Flujo Básico

Ingesta de Documentos

1.  El SuperAdmin accede al módulo de gestión de ingesta de documentos.
2.  Ingresar los datos solicitados como sector, empresa, año y tipo (memoria o
reporte).

3.  Subir el documento que debe ser Markdown.
4.  Una vez ingresados todos los datos anteriores, presionar el botón de realizar
ingesta para ingresar el documento al sistema.

> **[Contenido gráfico de la página 21: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 22

### Flujo Alternativo

Empresa no registrada Si la empresa del documento que se va a ingresar no se encuentra en el sistema, se puede crear la empresa con el botón de agregar empresa en la sección de documentos ingresados. Debes ingresar el nombre de dicha empresa y su sector.

Documento ya se encuentra en el sistema Si el documento ya está en el sistema, entonces no se va a poder ingresar debido a que este sería un duplicado.

### Post Condiciones

–  Éxito: El documento es ingresado correctamente en el sistema junto con su
información de identificación adicional.

–  Fallo: El documento no cumple con el tipo de archivo admisible o este es un
duplicado de uno ya registrado en el sistema.

### Restricciones

–  Solo el rol SuperAdmin puede acceder a este módulo.
–  El único tipo de documento admisible es en formato Markdown
### Casos de Uso Padre

CU001 — Autenticación y Gestión de Sesión

> **[Imagen/diagrama referido en la página 22; no se incluye como texto.]**
> **[Contenido gráfico de la página 22: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 23

> **[Página sin texto extraíble; contiene contenido gráfico/visual.]**
> **[Contenido gráfico de la página 23: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 24

CU004: Consulta al Asistente de IA (RAG) Descripción Este caso de uso permite al Administrador usar al agente de IA para hacerle consultas dependiendo de la empresa y sector específico, también eligiendo el año de los documentos a analizar. Este puede hablar en lenguaje natural con el asistente y responderá de acuerdo a la información de los documentos en el sistema.

### Actores

Administrador Precondiciones

–  El Administrador debe haber iniciado sesión exitosamente.
–  Debe encontrarse en la módulo correcto para Consulta de Asistente de IA
### Flujo Básico

Consultas al Asistente de IA

1.  El Administrador accede al módulo de Consulta de Asistente de IA.
2.  El Administrador debe elegir el sector, empresa y año para delimitar la
información que va a usar el agente de IA. El sistema muestra un mensaje inicial sobre las empresas actualmente en el sistema, y da sugerencias de prompts en lenguaje natural.

3.  El Administrador debe ingresar su consulta en lenguaje natural pidiendo la
información pertinente de la empresa.

4.  El agente de IA debe procesarla, buscando información dentro de los
documentos en el sistema.

5.  El agende de IA devuelve la respuesta conteniendo la información pedida de
la consulta junto con citas para evitar información inventada.

> **[Contenido gráfico de la página 24: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 25

### Flujo Alternativo

Información no encontrada Al devolver la información o respuesta pedida, si el documento o información pedida no existe, la IA deberá informar en su respuesta que no existe o no se encuentra, no inventarse información para cumplir con lo pedido.

### Post Condiciones

–  Éxito: En la respuesta del agente de IA debe responder a la consulta y
devolver la información solicitada.

–  Fallo: En su respuesta del agente de IA debe informarle al Administrador que
no se encuentra la información solicitada.

### Restricciones

–  Solo el rol Administrador tiene la capacidad de interactuar con el agende de
IA.

### Casos de Uso Padre

CU001 — Autenticación y Gestión de Sesión

> **[Imagen/diagrama referido en la página 25; no se incluye como texto.]**
> **[Contenido gráfico de la página 25: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 26

CU005: Detección de Brechas GRI y Sanciones Descripción El Administrador tiene la capacidad de

### Actores

Administrador Precondiciones

–  El SuperAdmin debe haber iniciado sesión exitosamente.
–  Para crear una cuenta, el correo ingresado no debe estar registrado
previamente.

–  Para transferir el rol SuperAdmin, la cuenta destino debe existir, tener rol
Administrador y estar habilitada.

### Flujo Básico

Administración de cuentas

1.  El SuperAdmin accede al módulo de gestión de usuarios.
2.  El sistema lista las cuentas existentes mostrando, para cada una, su nombre,
correo, rol y estado (habilitada o deshabilitada).

3.  El SuperAdmin crea una cuenta ingresando nombre, correo y contraseña.
4.  El sistema valida que el correo no esté registrado, crea la cuenta y le asigna
automáticamente el rol Administrador.

5.  El sistema confirma la creación y actualiza el listado de cuentas.
> **[Contenido gráfico de la página 26: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 27

### Flujo Alternativo

Correo ya registrado En el paso 3, el correo ingresado ya existe en el sistema. El sistema rechaza el registro e informa que el correo ya está en uso. Habilitar / deshabilitar cuenta El SuperAdmin habilita o deshabilita una cuenta de Administrador. Al deshabilitarla, el sistema invalida de inmediato todas las sesiones activas de esa cuenta y le revoca el acceso a todas las funcionalidades. Intento de deshabilitar o eliminar al SuperAdmin El sistema impide deshabilitar o eliminar la cuenta con rol SuperAdmin desde la aplicación, indicando que primero debe transferirse el rol a otra cuenta. Transferencia del rol SuperAdmin

1.  El SuperAdmin selecciona como destino una cuenta de Administrador
existente y habilitada.

2.  El sistema muestra una alerta de confirmación antes de ejecutar el cambio.
3.  Al confirmar, el sistema ejecuta la transferencia de forma atómica: la cuenta
destino adquiere el rol SuperAdmin y la cuenta origen pasa a rol Administrador en una sola operación. Las sesiones activas aplican el rol vigente tras la transferencia. Transferencia inválida Si la cuenta destino no existe, está deshabilitada o ya tiene rol SuperAdmin, el sistema rechaza la transferencia e informa el motivo.

### Post Condiciones

–  Éxito: las cuentas y sus estados o roles quedan persistidos; el sistema
mantiene siempre exactamente una cuenta con rol SuperAdmin.

–  Fallo: la operación se cancela y se notifica el error, sin alterar el estado de las
cuentas.

### Restricciones

–  Solo el rol SuperAdmin puede acceder a este módulo.
–  En todo momento existe exactamente una cuenta con rol SuperAdmin, con
independencia de su estado o de que tenga una sesión abierta; esto se garantiza además mediante una restricción de integridad en la base de datos.

–  La cuenta SuperAdmin inicial se crea durante el despliegue y no puede
crearse desde la aplicación.

–  Toda cuenta creada desde la aplicación nace con rol Administrador; el rol
SuperAdmin solo se obtiene por transferencia.

–  La transferencia del rol se ejecuta dentro de una transacción única; un fallo
parcial revierte toda la operación.

### Casos de Uso Padre

CU003 — Ingesta de Documentos (memorias y reportes GRI)

> **[Imagen/diagrama referido en la página 27; no se incluye como texto.]**

---

## Página 28

CU006: Generación de Reportes de Prospección (PDF) Descripción Este caso de uso el Administrador tiene la capacidad de generar

### Actores

Administrador Precondiciones

–  El SuperAdmin debe haber iniciado sesión exitosamente.
–  Para crear una cuenta, el correo ingresado no debe estar registrado
previamente.

–  Para transferir el rol SuperAdmin, la cuenta destino debe existir, tener rol
Administrador y estar habilitada.

### Flujo Básico

Generar reportes de prospección

1.  El SuperAdmin accede al módulo de gestión de usuarios.
2.  El sistema lista las cuentas existentes mostrando, para cada una, su nombre,
correo, rol y estado (habilitada o deshabilitada).

3.  El SuperAdmin crea una cuenta ingresando nombre, correo y contraseña.
4.  El sistema valida que el correo no esté registrado, crea la cuenta y le asigna
automáticamente el rol Administrador.

5.  El sistema confirma la creación y actualiza el listado de cuentas.
> **[Contenido gráfico de la página 28: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 29

### Flujo Alternativo

Correo ya registrado En el paso 3, el correo ingresado ya existe en el sistema. El sistema rechaza el registro e informa que el correo ya está en uso. Habilitar / deshabilitar cuenta El SuperAdmin habilita o deshabilita una cuenta de Administrador. Al deshabilitarla, el sistema invalida de inmediato todas las sesiones activas de esa cuenta y le revoca el acceso a todas las funcionalidades. Intento de deshabilitar o eliminar al SuperAdmin El sistema impide deshabilitar o eliminar la cuenta con rol SuperAdmin desde la aplicación, indicando que primero debe transferirse el rol a otra cuenta. Transferencia del rol SuperAdmin

1.  El SuperAdmin selecciona como destino una cuenta de Administrador
existente y habilitada.

2.  El sistema muestra una alerta de confirmación antes de ejecutar el cambio.
3.  Al confirmar, el sistema ejecuta la transferencia de forma atómica: la cuenta
destino adquiere el rol SuperAdmin y la cuenta origen pasa a rol Administrador en una sola operación. Las sesiones activas aplican el rol vigente tras la transferencia. Transferencia inválida Si la cuenta destino no existe, está deshabilitada o ya tiene rol SuperAdmin, el sistema rechaza la transferencia e informa el motivo.

### Post Condiciones

–  Éxito: las cuentas y sus estados o roles quedan persistidos; el sistema
mantiene siempre exactamente una cuenta con rol SuperAdmin.

–  Fallo: la operación se cancela y se notifica el error, sin alterar el estado de las
cuentas.

### Restricciones

–  Solo el rol SuperAdmin puede acceder a este módulo.
–  En todo momento existe exactamente una cuenta con rol SuperAdmin, con
independencia de su estado o de que tenga una sesión abierta; esto se garantiza además mediante una restricción de integridad en la base de datos.

–  La cuenta SuperAdmin inicial se crea durante el despliegue y no puede
crearse desde la aplicación.

–  Toda cuenta creada desde la aplicación nace con rol Administrador; el rol
SuperAdmin solo se obtiene por transferencia.

–  La transferencia del rol se ejecuta dentro de una transacción única; un fallo
parcial revierte toda la operación.

### Casos de Uso Padre

CU005 — Detección de Brechas GRI y Sanciones

> **[Imagen/diagrama referido en la página 29; no se incluye como texto.]**

---

## Página 30

CU008: Auditoría de Eventos del Sistema Descripción Este caso de uso permite al SuperAdmin visualizar todos los eventos que los usuarios hagan en el sistema, desde ingresar con un login al sistema, hacer consultas al agente de IA, generar un reporte de prospección y cambiar de roles.

### Actores

SuperAdmin Precondiciones

–  El SuperAdmin debe haber iniciado sesión exitosamente.
–  Debe encontrarse en el módulo de auditoria
### Flujo Básico

Auditoría de eventos del sistema

1.  El SuperAdmin accede al módulo de auditoría.
2.  El sistema lista todas las acciones, junto con el usuario que las hizo, la hora
y las especificaciones de a que empresa y que acción hizo respecto a ella.

### Flujo Alternativo

Ver cambios bajo ciertas condiciones

- El SuperAdmin tiene la capacidad de ver la auditoría con respecto al usuario,
fecha y tipo de evento.

### Post Condiciones

–  Éxito: Las acciones hechas están correctamente informadas en auditoría con
respecto al usuario que lo hizo, tipo de evento, empresa afectada y la fecha que realizó la acción.

–  Fallo: Información faltante en alguno de los registros o la acción no se
registró.

### Restricciones

–  Solo el rol SuperAdmin tiene acceso a esta sección.
–  La información registrada es inmutable.
### Casos de Uso Padre

CU001 — Autenticación y Gestión de Sesión

> **[Imagen/diagrama referido en la página 30; no se incluye como texto.]**
> **[Contenido gráfico de la página 30: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 31

6.3. ESPECIFICACIÓN DE CASOS DE USO CU001: Autenticación y Gestión de Sesión El sistema debe permitir que los usuarios registrados (SuperAdmin, Administrador y Usuario) accedan a la plataforma mediante correo electrónico y contraseña. El sistema valida las credenciales contra los registros existentes y, si son correctas, identifica el rol del usuario y establece una sesión autenticada. Asimismo, permite la recuperación de contraseña mediante un enlace seguro enviado por correo.

### Actores

SuperAdmin, Administrador, Usuario Precondiciones El sistema debe estar desplegado y operativo. El usuario debe estar registrado en la plataforma y encontrarse habilitado. El usuario debe contar con un rol asignado (SuperAdmin, Administrador o Usuario). Para la recuperación de contraseña, el correo del usuario debe estar registrado en el sistema y el servicio de correo debe estar disponible.

### Flujo Básico

1. El usuario accede a la URL de la plataforma.
2. El sistema muestra el formulario de inicio de sesión.
3. El usuario ingresa su correo electrónico y contraseña.
4. El usuario selecciona el botón Iniciar sesión.
5. El sistema valida que el usuario se encuentre habilitado.
6. El sistema valida que la contraseña corresponda al usuario registrado.
7. El sistema identifica el rol del usuario: SuperAdmin, Administrado.
8. El sistema genera los mecanismos de autenticación necesarios y establece una
sesión activa.

9. El sistema redirige al usuario a la vista principal correspondiente a su rol (panel de
gestión para SuperAdmin, panel analítico para Administrador, dashboard de solo

> **[Contenido gráfico de la página 31: diagramas, prototipos o tablas visuales del PDF.]**

---

## Página 32

lectura para Usuario).

10. Si el usuario no recuerda su contraseña, selecciona "¿Olvidaste tu
contraseña?" desde la pantalla de inicio de sesión.

11. El sistema solicita el correo electrónico asociado a la cuenta.
12. El usuario ingresa su correo y selecciona Enviar correo.
13. El sistema muestra el mensaje "Si el correo está registrado en el sistema,
recibirás un enlace de recuperación en los próximos minutos".

14. El sistema genera un enlace de recuperación con vigencia limitada (por definir,
ver nota abajo).

15. El sistema envía el correo con el enlace de recuperación.
16. El usuario abre el correo y selecciona el enlace.
17. El enlace redirige al usuario a la pantalla de recuperación dentro de la plataforma.
18. El usuario ingresa y confirma una nueva contraseña.
19. El sistema valida que ambas contraseñas coincidan y cumplan las reglas mínimas
de seguridad.

20. El sistema actualiza la contraseña y muestra un mensaje de confirmación.
21. El sistema redirige al usuario al formulario de inicio de sesión.
Flujo Alternativo — Credenciales incorrectas En el paso 6, el sistema detecta que la contraseña no corresponde al usuario. El sistema muestra el mensaje "Credenciales inválidas". El usuario permanece en la pantalla de inicio de sesión y puede reintentar. Flujo Alternativo — Correo con formato inválido En el paso 3 u 11, el usuario ingresa un correo con formato inválido. El sistema muestra el mensaje "Ingrese un correo válido." y no acepta el correo. Flujo Alternativo — Usuario deshabilitado En el paso 5, el sistema detecta que el usuario está deshabilitado. El sistema bloquea el acceso y muestra "Usuario deshabilitado. Contacte al administrador." Flujo Alternativo — Enlace de recuperación expirado En el paso 17, el usuario abre el enlace después de que expiró. El sistema muestra "El enlace de recuperación ha expirado." y solicita generar uno nuevo. No se permite cambiar la contraseña con el enlace vencido. Flujo Alternativo — Contraseñas no coinciden En el paso 19, la nueva contraseña y su confirmación no coinciden. El sistema muestra "Las contraseñas no coinciden." y no actualiza la contraseña. Flujo Alternativo — Contraseña no cumple requisitos En el paso 19, la nueva contraseña no cumple las reglas mínimas de seguridad. El sistema muestra "La contraseña debe tener al menos 8 caracteres e incluir una letra mayúscula, una letra minúscula, un número y un carácter especial."

---

## Página 33

ideotas: - que debe tener el pdf exactamente (como se va a poner la información) - cuantos intentos son necesarios para que el sistema se rompa - que se hace cuando -

6.4. REQUERIMIENTOS FUNCIONALES N° Descripción del Requerimiento Funcional Reglas de Negocio Prioridad RF-001

El sistema debe permitir la autenticación de usuarios con correo y contraseña, validando que la cuenta esté habilitada y tenga un rol asignado. RN-001, RN-004, RN-007 MUST HAVE

RF-002 El sistema debe permitir la recuperación de contraseña mediante enlace seguro enviado al correo registrado, con vigencia limitada de 30 minutos. RN-010 MUST HAVE RF-003 El sistema debe invalidar el enlace de recuperación al ser utilizado o al vencer su vigencia. RN-010 MUST HAVE RF-004 El sistema debe permitir al usuario cambiar su propia contraseña estando autenticado. RN-010 SHOULD HAVE RF-005 El sistema debe mantener la sesión activa y expirar por inactividad después de 2 horas. RN-036 MUST HAVE RF-006 El sistema debe permitir el cierre de sesión manual, invalidando la sesión activa RN-005 MUST HAVE RF-007 El sistema debe restringir el acceso a funcionalidades según el rol asignado (SuperAdmin / Administrador). RN-003 RN-001 MUST HAVE RF-008 El sistema debe responder con error de autorización ante una acción no permitida para el rol. RN-003 MUST HAVE RF-009 El sistema debe invalidar todas las sesiones activas de una cuenta al deshabilitarla. RN-005 MUST HAVE RF-010 El sistema debe permitir al SuperAdmin crear cuentas con nombre, correo y contraseña, asignando automáticamente el rol Administrador. RN-004, RN-007, RN-008 MUST HAVE RF-011 El sistema debe rechazar el registro de cuentas con correo ya existente. RN-007 MUST HAVE

---

## Página 34

RF-012

El sistema debe permitir al SuperAdmin habilitar y deshabilitar cuentas de Administrador. RN-005

MUST HAVE

RF-013 El sistema debe impedir que la cuenta con rol SuperAdmin sea deshabilitada o eliminada desde la aplicación, indicando que debe transferirse el rol previamente. RN-002 MUST HAVE RF-014 El sistema debe mostrar un mensaje de alerta de confirmación antes de ejecutar el cambio de rol de SuperAdmin a una cuenta que tenga el rol de administrador habilitado. La cuenta de origen cambiará al rol de Administrador una vez completado el cambio. RN-002 RN-009 MUST HAVE RF-015 El sistema debe rechazar la transferencia si la cuenta destino no existe, está deshabilitada o ya tiene rol SuperAdmin. RN-009 MUST HAVE RF-016 El sistema debe listar las cuentas existentes con su rol y estado. RN-003 SHOULD HAVE RF-017 El sistema debe permitir al SuperAdmin cargar documentos asociando sector, empresa, año y tipo (memoria anual / reporte de sostenibilidad GRI). RN-011, RN-014 MUST HAVE RF-018 El sistema debe rechazar la carga si el archivo no tiene extensión .md. RN-012 MUST HAVE RF-019 El sistema debe validar que el documento contenga al menos una sección identificable de indicadores GRI o de sanciones, en todo caso se llenará como “no identificado”. RN-013 MUST HAVE RF-020 El sistema debe calcular el hash SHA-256 del contenido del archivo antes de procesarlo y rechazar la carga si ya existe un documento con el mismo hash. RN-033 MUST HAVE RF-021 El sistema debe rechazar la carga si ya existe un documento indexado con la misma empresa, tipo y año, indicando la fecha y la cuenta que realizó la carga original. RN-039 RN-033 MUST HAVE RF-022 El sistema debe procesar el documento de forma síncrona, informando el resultado (éxito, en proceso o rechazo) al finalizar. RN-017 MUST HAVE RF-023 El sistema debe indexar el contenido del documento para su consulta por el asistente. RN-012 MUST HAVE RF-024 El sistema debe listar los documentos ingestados con su estado (éxito / en proceso / rechazado), versión y fecha. RN-017 MUST HAVE

---

## Página 35

RF-025 El sistema debe identificar posibles sanciones mediante búsqueda de contenido dentro del documento y, de encontrarse evidencia, extraer automáticamente mediante el servicio de IA la entidad sancionadora y el monto de la multa RN-015, RN-021, RN-022 MUST HAVE RF-026 El sistema debe bloquear la ejecución del reporte de prospección para empresas sin documentos ingestados, indicando el motivo. RN-020, RN-021 MUST HAVE RF-027 El sistema debe permitir al Administrador cambiar estados de todos los código GRI que se analizo en la ingesta, los estados permitidos son OK, Baja sustancia y Sub-Reportado RN-016 MUST HAVE RF-028 El sistema debe registrar, para cada análisis, si cada dimensión (brechas GRI, sanciones) contó con evidencia analizable en el corpus. RN-021 MUST HAVE RF-029 El sistema debe permitir al Administrador consultar en lenguaje natural sobre el corpus indexado. RN-022 RN-037 MUST HAVE RF-030 El sistema debe restringir la recuperación de contexto a los documentos indexados. RN-022 MUST HAVE RF-031 El sistema debe incluir en cada respuesta la referencia al documento, empresa y año, cuando corresponda. RN-023 RN-022 MUST HAVE RF-032 El sistema debe suprimir toda afirmación que no cuente con fuente verificable en el corpus. RN-023 MUST HAVE RF-033 El sistema debe informar explícitamente cuando el corpus no contiene información suficiente para responder. RN-022, RN-023 MUST HAVE RF-034 El sistema debe conservar el historial de consultas del Administrador. RN-027 SHOULD HAVE RF-035 El sistema debe permitir al Administrador generar un reporte de prospección por empresa y un año en especifico. RN-025 MUST HAVE RF-036 El sistema debe mostrar para selección únicamente las empresas que cuenten con al menos un documento indexado para la generación de un reporte de prospección RN-020, RN-014 MUST HAVE RF-037 El sistema debe permitir  seleccionar el sector, la empresa y el año del prospecto que se va a utilizar como referencia para su posterior consulta. Si no se llenan las opciones el sistema no debe ser capaz de realizar consultas. RN-020, RN-021, RN-035 MUST HAVE

---

## Página 36

RF-038 El sistema debe presentar en el reporte de prospección el estado de cada código GRI desagregado por un año en específico , con su cita de respaldo. RN-024, RN-026 MUST HAVE RF-039 El sistema debe listar los códigos GRI identificados por año específico antes de generar el reporte de prospección, incluyendo las sanciones asociadas. Cada sanción debe indicar su monto cuando esté disponible en el documento; si el monto no está disponible, se conserva como nulo y se identifica como 'no cuantificada' sin omitirla del análisis. RN-024, RN-015, RN-032 RN-038 MUST HAVE RF-040 El reporte debe tener un campo por separado especificando el monto total de las sanciones cuantificadas y el número de sanciones sin monto determinado. RN-032 RN-034 MUST HAVE RF-041 El sistema debe generar automáticamente un resumen ejecutivo en el reporte de prospección que incluya:

- Puntaje ESG de la empresa
- Número total de brechas GRI por estado (OK,
Sub-reportado, Baja sustancia)

- Monto total de sanciones cuantificadas
- Número de sanciones sin monto determinado
El resumen se genera automáticamente sin intervención del usuario RN-024 RN-025, RN-034 MUST HAVE RF-042 El sistema debe generar el reporte de prospección a partir de los resultados de análisis almacenados, sin invocar al servicio de IA RN-025 MUST HAVE RF-043 El sistema debe generar el reporte de prospección en formato PDF. RN-024 MUST HAVE RF-044 El sistema debe permitir al Administrador visualizar, en una sección específica, el historial de reportes de prospección generados, mostrando como mínimo la empresa, el año y la fecha de generación. RN-026, RN-030 MUST HAVE RF-045 El sistema debe permitir descargar un reporte de prospección previamente generado. RN-030 SHOULD HAVE RF-046 El sistema debe registrar automáticamente los eventos de inicio de sesión, cambio de estado o rol de cuenta, ingesta, rechazo de documento y generación de reportes de prospección. RN-027 MUST HAVE RF-047 El sistema debe consignar en cada registro la cuenta que originó la acción, fecha y hora, tipo de acción.. RN-028 MUST HAVE RF-048 El sistema debe permitir al SuperAdmin consultar el registro de auditoría filtrando por usuario, fecha y tipo de evento. RN-027, RN-028, RN-029 SHOULD HAVE

---

## Página 37

RF-049 El sistema debe informar la indisponibilidad del servicio de IA sin bloquear los demás módulos. RN-030 SHOULD HAVE RF-050 El sistema debe aplicar el rol vigente de la cuenta en las sesiones activas tras una transferencia del rol SuperAdmin. RN-002, RN-009 MUST HAVE RF-051 El sistema debe calcular y mostrar el puntaje ESG de una empresa y año, a partir de los estados asignados a los códigos GRI (OK = 100, Baja sustancia = 50, Sub-reportado = 0) de dicho año. RN-034, RN-025 MUST HAVE RF-052 El sistema debe permitir al SuperAdmin ingresar una nueva empresa en el sistema. RN-035 MUST HAVE RF-053 El sistema cuando se ingresa una nueva empresa debe obligar al usuario colocarle un nombre y asignarlo a un sector (minería, petrolera o energía) RN-035 MUST HAVE RF-054 Si la ingesta es rechazada o interrumpida, el sistema debe revertir el procesamiento y eliminar cualquier contenido, fragmento, embedding o resultado de análisis generado parcialmente, conservando únicamente los datos y el motivo del rechazo para fines de historial y auditoría. RN-039

MUST HAVE RF-055 Si no se detectó ningún código GRI para una empresa y año, el sistema debe mostrar el puntaje ESG como 'no disponible' en el reporte de prospección, en lugar de calcularlo como cero. RN-031 RN-032 RN-034 MUST HAVE RF-056 El sistema debe tener una sección donde todos los administradores puedan ver los reportes de prospección generados por otros administradores o ellos mismos. RN-025 RN-026 MUST HAVE

6.5. REQUERIMIENTOS NO FUNCIONALES N° Descripción del Requerimiento No Funcional Deriva de RNF-001 Las contraseñas deben tener un mínimo de 8 caracteres e incluir al menos una mayúscula, una minúscula, un dígito y un carácter especial, y no pueden coincidir con el correo de la cuenta. RF-004, RF-010 RF-001 RNF-002 Las contraseñas se almacenan mediante una función de hash de un solo sentido con sal, con sal única por usuario. RF-004, RF-010 RNF-003 El rol de la cuenta se obtiene exclusivamente del token firmado por el servidor; nunca de parámetros de la petición. El token incorpora la identidad de la cuenta y su rol vigente. RN-003, RF-007 RNF-004 La autorización se evalúa en cada endpoint, con independencia de lo que exponga la interfaz. RN-003, RF-008

---

## Página 38

RNF-005 La revocación de sesión se verifica en cada petición, no únicamente al emitir el token. RN-005, RF-009 RNF-006 El tipo real del archivo se valida del lado del servidor, sin confiar en la extensión declarada. RF-018 RN-011, RN-012 RNF-007 Las respuestas de recuperación de contraseña son idénticas para todo tipo de cuenta. RF-002, RF-003, RN-010 RNF-008 El mensaje de error de autenticación no distingue entre credencial inválida y cuenta inexistente. RF-002 RF-003 RN-010 RNF-009 El token incluido en el enlace de recuperación debe generarse mediante un generador de números aleatorios criptográficamente seguro de modo que no sea posible predecirlo ni reconstruirlo a partir de información conocida de la cuenta. RF-002, RF-003 RN-010 RNF-010 La validación de unicidad documental emplea el algoritmo de hash SHA-256. RF-020 RN-033 RNF-011 La transferencia del rol SuperAdmin se ejecuta dentro de una transacción única; un fallo parcial revierte la operación completa. RN-002, RF-015 RNF-012 La unicidad del rol SuperAdmin se garantiza mediante una restricción de integridad en la base de datos, además de la validación en la capa de aplicación. RN-002 RNF-013 Los registros de auditoría se almacenan en estructuras de solo inserción, sin operaciones de actualización ni eliminación habilitadas RN-029

RNF-014 El sistema debe admitir y procesar documentos de hasta 50 MB por cada operación de ingesta. RN-012 RF-021 RNF-015 La ingesta e indexación de un documento de tamaño máximo se completa en menos de 120 segundos.

RF-022 RNF-016 La caída del servicio de IA externo no degrada la disponibilidad de los módulos de gestión, ingesta, reportes de prospección y auditoría. RF-049 RN-030 RNF-017 Cuando una ingesta sea rechazada o interrumpida por un fallo, el sistema debe revertir completamente el procesamiento, sin conservar contenido del documento, fragmentos, embeddings ni resultados de análisis generados parcialmente. Solo debe conservar los datos necesarios para registrar y auditar el rechazo. RF-027 RF-033

---

## Página 39

RNF-018 El sistema aplica un tiempo máximo de espera de 1 minuto a las llamadas al servicio de IA, tras el cual la operación se reporta como indisponible RN-030 RNF-019 El sistema distingue en el modelo de datos entre un valor no determinado y un valor igual a cero RN-032 RNF-020 Todo fragmento indexado conserva la referencia a su documento de origen y a su ubicación dentro de él RN-023, RF-023 RNF-021 El registro de auditoría conserva sus entradas durante todo el periodo de operación del sistema RN-030 RNF-022 El catálogo predefinido de 40 códigos GRI deberá cargarse automáticamente en la base de datos mediante un script de inicialización versionado en el repositorio del proyecto, garantizando que se utilice el mismo catálogo en todos los ambientes del sistema. RN-018, RN-019 RNF-023 Durante una ingesta síncrona el sistema mantiene informado al usuario del progreso de la operación RF-029 RNF-024 La autenticación emplea tokens JWT firmados, cuya integridad se verifica en cada petición RF-009 RNF-025 La clave de firma de los tokens se almacena fuera del código fuente y se rota sin redespliegue de la aplicación RF-001 RNF-026 El sistema verifica en cada petición que la cuenta asociada al token siga habilitada y conserve el rol declarado RN-005, RF-009 RNF-027

Toda respuesta del asistente se genera exclusivamente dentro del contexto seleccionado (sector, empresa y año). RF-037 RN-037, RN-038 RNF-028 El sistema debe contar con un proveedor de IA que proporcione servicios de embeddings y generación de respuestas mediante API. RF-025, RF-029 RNF-029 El sistema debe aplicar las mismas reglas de almacenamiento seguro y política de complejidad presente en el registro de contraseña como para el establecimiento de una nueva contraseña tras validar el enlace de recuperación. RF-002 RF-003 RNF-030 El sistema deberá ser compatible con diferentes modelos de IA mediante una interfaz de integración estandarizada. RF-025 RNF-031 El sistema debe bloquear temporalmente una cuenta tras 5 intentos fallidos consecutivos de inicio de sesión, impidiendo nuevos intentos durante 15 minutos. El evento de bloqueo debe RF-001

---

## Página 40

registrarse automáticamente en el módulo de auditoría. RNF-032 El sistema debe impedir generar un mismo reporte de prospección más de una vez, sin embargo sí debe permitir que todos los administradores puedan ver los PDF en el portal de reporte de prospección. RF-035 RN-026 RNF-033 El asistente de inteligencia artificial debe entregar una respuesta a una consulta del Administrador en un máximo de 15 segundos bajo condiciones normales de operación, exceptuando la latencia propia del proveedor externo de IA. RF-029 RNF-034 Todo registro de auditoría debe almacenar la fecha y hora en formato UTC, convirtiéndose a la zona horaria local (America/Lima) únicamente en la capa de presentación, para garantizar la consistencia cronológica de los eventos registrados. RF-046, RF-047, RN-028 RNF-035 El contenido recuperado de los documentos indexados debe tratarse exclusivamente como datos de referencia dentro del prompt enviado al modelo de lenguaje, nunca como instrucciones del sistema. El diseño del prompt debe delimitar claramente el contenido del corpus del resto de las instrucciones, de modo que texto contenido en un documento ingestado no pueda alterar el comportamiento, las reglas o las restricciones del asistente. RF-029 RNF-036 El sistema debe procesar y almacenar el contenido de los documentos ingestados utilizando codificación UTF-8, preservando correctamente tildes, la letra "ñ" y demás caracteres propios del idioma español, sin pérdida ni alteración de datos. RF-023 RF-017

---

## Página 41

7. MODELO DE DATOS
8. DICCIONARIO DE DATOS
Tabla: proyecto Descripción: Centraliza la información general de los proyectos inmobiliarios, su ubicación geográfica y características de certificación ecológica. Campo

Tamaño Tipo de Dato Descripción NULL

o

uuid_proyecto 36 UUID (PK) Identificador único del proyecto (GenerationType.UUID) NO nombre 255 VARCHAR Nombre comercial y oficial del proyecto inmobiliario, es unico NO descripcion 255 VARCHAR Descripción general o detalles adicionales del proyecto SÍ precertificacion_edge _le ed - BOOLEAN Indica si el proyecto posee certificación ecológica EDGE o LEED (Predeterminado: false) SÍ

---

## Página 42

link_recorrido_virtual 255 VARCHAR LInk de recorrido virtual del proyecto Si departamento 255 VARCHAR Departamento político/geográfico de ubicación del proyecto SÍ distrito direccion fecha_inicio fecha_fin 255 255 - - VARCHAR VARCHAR DATE DATE Distrito municipal donde se localiza el proyecto Dirección física detallada de la obra Fecha de inicio formal del proyecto Fecha estimada o real de finalización de la obra SÍ SÍ NO SÍ created_at - TIMESTAMP Fecha y hora automática de creación del registro NO

Tabla: torre Descripción: Representa las torres, bloques o etapas estructurales independientes pertenecientes a un proyecto específico. Campo Tamañ o Tipo de Dato Descripción NULL id_torre 20 BIGINT (PK) Identificador único de la torre (Auto-incremental) NO nombre 255 VARCHAR Nombre o código identificador de la torre (ej: Torre A) NO nro_piso - INTEGER número de pisos en la torre NO uuid_proyecto 36 UUID (FK) Vínculo con el proyecto al que pertenece la torre NO

Tabla: piso Descripción: Registra los diferentes niveles o pisos que componen una torre específica. Campo Tamaño Tipo de Dato Descripción NULL id_piso 20 BIGINT (PK) Identificador único del piso (Auto-incremental) NO nro_piso 10 INTEGER Número correlativo o nivel del piso NO

---

## Página 43

id_torre 20 BIGINT (FK) Vínculo con la torre a la que pertenece el piso NO

Tabla: activo Descripción: Unidades inmobiliarias específicas comerciables asociadas a un piso (departamentos, cocheras, depósitos). Campo Tamaño  Tipo de Dato Descripción NULL uuid_activo 36 UUID (PK) Identificador único del activo (GenerationType.UUID) NO nro 255 VARCHAR Número identificador físico comercial (ej: Dpto 401, Cochera 12) NO tipo 255 VARCHAR Tipo de unidad inmobiliaria (DEPARTAMENTO | COCHERA | DEPOSITO) NO area_m2 - NUMERIC Área total construida expresada en metros cuadrados NO area_techada - NUMERIC Área techada del activo NO estado_comercial precio descripcion tiene_recorrido_virt ua l 255 - 255 - VARCHAR NUMERIC VARCHAR BOOLEAN Situación actual de venta (DISPONIBLE | SEPARADO | VENDIDO | NO_APLICA) Precio de lista o comercial asignado al activo Notas o descripción técnica complementaria Determina si el activo tiene link de recorrido virtual. NO SÍ SÍ SÍ created_at - TIMESTAMP Fecha automática de creación del registro NO updated_at - TIMESTAMP Fecha y hora de la última modificación del registro SÍ

79 id_piso 20 BIGINT (FK) Vínculo con el piso donde se localiza físicamente el activo NO

---

## Página 44

uuid_usuario_activo 36 UUID (FK) Vínculo con el contrato/cliente actual asociado si aplica SÍ

Tabla: hito Descripción: Establece los hitos de control generales o fases constructivas globales definidas para un proyecto. Campo Tamaño Tipo de Dato Descripción NULL uuid_hito 36 UUID (PK) Identificador único del hito general (GenerationType.UUID) NO orden 10 INTEGER Orden secuencial cronológico del hito dentro del proyecto NO titulo 255 VARCHAR Título descriptivo del hito técnico u obra SÍ estado 255 VARCHAR Estado actual del hito global (PENDIENTE | EN_PROGRESO | COMPLETADO) NO

fecha_completado - DATEFecha real en la que se dio por concluido el hitoSÍ uuid_proyecto 36 UUID (FK) Vínculo directo con el proyecto asociado NO Tabla: hito_piso Descripción: Tabla intermedia para el seguimiento granular del estado físico de los hitos constructivos celda por celda (por cada piso). Campo Tamañ o Tipo de Dato Descripción NULL uuid_hito_piso 36 UUID (PK) Identificador único de la relación hito-piso NO estado 255 VARCHAR Estado específico del hito en este nivel (PENDIENTE | EN_PROGRESO | COMPLETADO) NO fecha_completado - DATE Fecha de conclusión del hito exclusivamente en este piso SÍ

observaciones 255 VARCHARAnotaciones de control, retrasos o especificaciones

---

## Página 45

técnicasSÍ created_at - TIMESTAMPFecha de registro inicial del seguimientoNO

---
