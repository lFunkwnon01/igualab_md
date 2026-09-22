# Promotick — Documento de Análisis y Diseño

> Conversión a Markdown del PDF original. Se conserva el contenido textual y se estructuran las tablas detectables con sintaxis Markdown para facilitar su interpretación por modelos de IA.


---

## Página 2

                                  HISTORIAL DE VERSIONES
                   FECHA                       VERSIÓN                  DESCRIPCIÓN
                  30/06/2026                     1.3                     Tercera Versión Oficial
VERSIÓN                    AUTORES                             REVISADO POR                APROBADO POR
                                                       -​   Rodrigo de la Puente        -​ Maria Karolay
            -​   Gracia Luz Mendoza Palacios
                                                            Rizo Patrón                    Tamayo Hilario
   1.3      -​   Sebastian Antonio Hernandez
                                                       -​   TIziano Abraham             -​ Christian Carbajal
                 Miñano
                                                            López Vargas                   (pendiente)
Autores:
Project Manager: Maria Karolay Tamayo Hilario
Analista Funcional: Gracia Luz Mendoza Palacios, Sebastian Antonio Hernandez Miñano
​
Tester: Tiziano Abraham López Vargas , Rodrigo de la Puente Rizo Patrón
Revisores:
TCH: Teofilo Chambilla Aquino
Aprobadores
CC: Christian Carbajal


### Tabla estructurada detectada

| FECHA | VERSIÓN | DESCRIPCIÓN |  |
| --- | --- | --- | --- |
| 30/06/2026 | 1.3 | Tercera Versión Oficial |  |
| VERSIÓN | AUTORES | REVISADO POR | APROBADO POR |
| -​ | Rodrigo de la Puente | -​ Maria Karolay |  |
| -​ | Gracia Luz Mendoza Palacios |  |  |
| Rizo Patrón | Tamayo Hilario |  |  |
| 1.3 | -​ | Sebastian Antonio Hernandez |  |
| -​ | TIziano Abraham | -​ Christian Carbajal |  |
| López Vargas | (pendiente) |  |  |


---

## Página 3

                                  Contenido
● ANTECEDENTES​                                              6
● OBJETIVO GENERAL​                                          6
● ALCANCE DEL PROYECTO​                                      6
● DISEÑO FUNCIONAL DETALLADO​                                7
● DIAGRAMA DEL PROCESO​                                      8
  ○ INTEGRACIÓN ENTRE LOS SISTEMAS DE LA EMPRESA​            8
  ○ INTEROPERACIÓN CON SISTEMAS EXTERNOS VINCULADOS CON LA
  EMPRESA​                                                   9
● REGLAS DE NEGOCIO​                                         9
● ANÁLISIS DE REQUERIMIENTOS FUNCIONAL​                      13
  ○ ACTORES​                                                 13
  ○ DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN​                14
  ○ DIAGRAMA DE SECUENCIA​                                   40
  ○ REQUERIMIENTOS FUNCIONALES​                              49
  ○ REQUERIMIENTOS NO FUNCIONALES​                           51
● MODELO DE DATOS​                                           53
● DICCIONARIO DE DATOS​                                      64
● VOLUMEN ESTIMADO​                                          72
● DISEÑO ARQUITECTÓNICO​                                     72
  ○ Vista lógica:​                                           72
  ○ Vista física:​                                           73
  ○ Vista de despliegue:​                                    73
  ○ Vista de integración:​                                   73
  ○ Calculadora de gastos AWS:​                              74
  ○ Diseño​                                                  75
● PROTOTIPO​                                                 75


### Tabla estructurada detectada

| ● ANTECEDENTES​ | 6 |
| --- | --- |
| ● OBJETIVO GENERAL​ | 6 |
| ● ALCANCE DEL PROYECTO​ | 6 |
| ● DISEÑO FUNCIONAL DETALLADO​ | 7 |
| ● DIAGRAMA DEL PROCESO​ | 8 |
| ○ INTEGRACIÓN ENTRE LOS SISTEMAS DE LA EMPRESA​ | 8 |
| EMPRESA​ | 9 |
| ● REGLAS DE NEGOCIO​ | 9 |
| ● ANÁLISIS DE REQUERIMIENTOS FUNCIONAL​ | 13 |
| ○ ACTORES​ | 13 |
| ○ DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN​ | 14 |
| ○ DIAGRAMA DE SECUENCIA​ | 40 |
| ○ REQUERIMIENTOS FUNCIONALES​ | 49 |
| ○ REQUERIMIENTOS NO FUNCIONALES​ | 51 |
| ● MODELO DE DATOS​ | 53 |
| ● DICCIONARIO DE DATOS​ | 64 |
| ● VOLUMEN ESTIMADO​ | 72 |
| ● DISEÑO ARQUITECTÓNICO​ | 72 |
| ○ Vista lógica:​ | 72 |
| ○ Vista física:​ | 73 |
| ○ Vista de despliegue:​ | 73 |
| ○ Vista de integración:​ | 73 |
| ○ Calculadora de gastos AWS:​ | 74 |
| ○ Diseño​ | 75 |
| ● PROTOTIPO​ | 75 |


---

## Página 4

                                  GLOSARIO DE TÉRMINOS
●​ API: Conjunto de interfaces que permite la comunicación entre el frontend, el backend y servicios
   externos. En el proyecto, la API será utilizada para exponer las funcionalidades del sistema web,
   tales como gestión de proveedores, carga de archivos, mapeo, validación y exportación.
●​ API REST: Estilo de arquitectura para servicios web basado en operaciones HTTP. Será utilizado
   por el frontend para consumir las funcionalidades del backend.
●​ Auditoría: Registro histórico de acciones realizadas dentro del sistema, como cargas de
   archivos, confirmaciones de lotes, exportaciones, cambios de precio, edición de productos, login
   y modificaciones de configuración.
●​ AWS: Amazon Web Services. Plataforma de servicios en la nube definida como entorno
   compatible para el despliegue de la solución. Incluye servicios como Amazon S3, AWS Lambda
   y SQS.
●​ AWS Lambda: Servicio serverless de AWS que permite ejecutar funciones sin administrar
   servidores. Puede ser utilizado para procesamiento de archivos, tareas ETL, validaciones y
   procesamiento asíncrono.
●​ Backlog: Lista priorizada de tareas, historias de usuario, mejoras y requerimientos pendientes
   del proyecto. Es uno de los artefactos principales dentro de la metodología Scrum.
●​ Backend: Capa del sistema encargada de ejecutar la lógica de negocio, procesar archivos,
   interactuar con la base de datos, gestionar seguridad, ejecutar validaciones y coordinar servicios
   externos.
●​ Base de Datos Maestra: Base de datos centralizada que consolida, normaliza y mantiene el
   registro único de productos de Promotick. Funciona como la fuente principal de verdad para
   exportaciones hacia NetSuite y aplicaciones web.
●​ Bucket S3: Contenedor de almacenamiento en Amazon S3 utilizado para guardar archivos
   Excel originales, archivos procesados, plantillas generadas, exportaciones y otros documentos
   relacionados con el sistema.
●​ Categoría​        Clasificación principal del catálogo maestro de productos. En el código
   NetSuite se representa mediante un código manual de letras, por ejemplo AL o EL.
●​ Cliente Destino​ Plataforma o sistema que recibirá las plantillas generadas por el sistema.
   Puede ser NetSuite, una aplicación web, marketplace u otro destino configurado por Promotick.
●​ Claude API: Servicio de inteligencia artificial de Anthropic utilizado para tareas como mapeo
   semántico de columnas, detección de duplicados.
●​ Código Legacy​ Código antiguo de producto utilizado antes de la implementación del nuevo
   formato NetSuite. Será conservado para productos migrados desde el catálogo actual de
   Promotick.
●​ Código NetSuite​Identificador único autogenerado para cada producto nuevo, con formato
   NSXXYYZZZZ. Está compuesto por prefijo de plataforma, código de categoría, código de
   subcategoría y serial incremental.
●​ Dashboard:​       Pantalla principal del sistema que muestra indicadores relevantes, como
   productos cargados, pendientes de revisión, duplicados detectados, cargas recientes y
   exportaciones generadas.
●​ ERP:​ Enterprise Resource Planning. Sistema empresarial de gestión. En el caso de
   Promotick, el ERP destino es NetSuite de Oracle.
●​ ETL:​ Extract, Transform, Load. Proceso de extracción, transformación y carga de datos. En el
   proyecto corresponde a la lectura de archivos de proveedores, limpieza/normalización de datos y
   preparación para su almacenamiento o exportación.
●​ Frontend​         Capa visual del sistema con la que interactúan los usuarios. Incluye pantallas


---

## Página 5

     como login, dashboard, gestión de proveedores, carga de plantillas, revisión de lotes y
     generación de exportaciones.
●​   GAP Analysis​ Análisis de brecha entre el proceso actual y el proceso propuesto. En el
     proyecto compara el flujo manual actual de normalización de archivos con el flujo automatizado
     planteado en la solución.
●​   Go-live​ Puesta en producción del sistema. A partir de este punto, los nuevos productos
     registrados deberán seguir el formato oficial de código NetSuite definido por el cliente.
●​   Log de auditoría​Registro detallado de eventos relevantes del sistema. Incluye usuario, fecha,
     acción, entidad afectada, cambios realizados, dirección IP y navegador utilizado.
●​   MVP​ Minimum Viable Product. Versión mínima funcional del sistema que incluye las
     características esenciales para validar el flujo principal del proyecto con el cliente.
●​   NetSuite​          ERP de Oracle utilizado por Promotick como sistema destino para la
     importación de productos. En el alcance actual, la integración se realizará mediante generación
     de archivos CSV para carga manual.
●​   Normalización de datos​ Proceso de limpieza, estandarización y conversión de datos
     provenientes de distintos proveedores. Incluye limpieza de precios, formatos de fecha, textos,
     unidades de medida, códigos y campos obligatorios.
●​   Parser​ Componente encargado de leer archivos Excel o CSV, detectar hojas, encabezados,
     columnas y filas de datos para preparar la información antes del mapeo y validación.
●​   Plantilla de mapeo​          Configuración que define cómo se relacionan las columnas de un
     proveedor con los campos de la Base de Datos Maestra. Una vez confirmada, puede reutilizarse
     en futuras cargas del mismo proveedor.
●​   Plantilla de salida​         Configuración que define las columnas, orden, formato, valores por
     defecto y transformaciones necesarias para generar archivos de exportación hacia NetSuite o
     aplicaciones web.
●​   Proveedor​         Empresa que entrega archivos con información de productos a Promotick.
     Debe estar registrada en el sistema antes de realizar una carga de archivos.
●​   Template​          Plantilla o configuración reutilizable. Puede referirse a plantillas de mapeo de
     proveedores o plantillas de salida para clientes destino.
●​   TO-BE​ Estado futuro propuesto del proceso. En el proyecto representa el flujo automatizado
     donde el usuario carga archivos, confirma mapeos, valida datos y genera archivos
     estandarizados.
●​   UAT​ User Acceptance Testing. Pruebas de aceptación realizadas con usuarios del cliente
     para validar que el sistema cumple con las necesidades funcionales y operativas antes de su
     entrega final.
●​   IA / LLM: Inteligencia Artificial / Large Language Model. Se usa la API de Claude (Anthropic)


### Tabla estructurada detectada

| ●​ | GAP Analysis​ Análisis de brecha entre el proceso actual y el proceso propuesto. En el |  |
| --- | --- | --- |
| ●​ | Go-live​ Puesta en producción del sistema. A partir de este punto, los nuevos productos |  |
| ●​ | Log de auditoría​Registro detallado de eventos relevantes del sistema. Incluye usuario, fecha, |  |
| ●​ | MVP​ Minimum Viable Product. Versión mínima funcional del sistema que incluye las |  |
| ●​ | NetSuite​ | ERP de Oracle utilizado por Promotick como sistema destino para la |
| ●​ | Normalización de datos​ Proceso de limpieza, estandarización y conversión de datos |  |
| ●​ | Parser​ Componente encargado de leer archivos Excel o CSV, detectar hojas, encabezados, |  |
| ●​ | Plantilla de mapeo​ | Configuración que define cómo se relacionan las columnas de un |
| ●​ | Plantilla de salida​ | Configuración que define las columnas, orden, formato, valores por |
| ●​ | Proveedor​ | Empresa que entrega archivos con información de productos a Promotick. |
| ●​ | Template​ | Plantilla o configuración reutilizable. Puede referirse a plantillas de mapeo de |
| ●​ | TO-BE​ Estado futuro propuesto del proceso. En el proyecto representa el flujo automatizado |  |
| ●​ | UAT​ User Acceptance Testing. Pruebas de aceptación realizadas con usuarios del cliente |  |
| ●​ | IA / LLM: Inteligencia Artificial / Large Language Model. Se usa la API de Claude (Anthropic) |  |


---

## Página 6

●​ ANTECEDENTES
   Promotick gestiona información de productos provenientes de múltiples proveedores para su
   posterior carga en NetSuite y aplicaciones web. Actualmente, estos proveedores envían archivos
   Excel con estructuras distintas, campos incompletos, formatos inconsistentes y posibles productos
   duplicados, lo que obliga al equipo a realizar tareas manuales de revisión, mapeo y normalización.
    Este proceso consume tiempo, genera riesgo de errores y dificulta mantener una base única y
    confiable de productos, precios, categorías y proveedores. Por ello, Promotick requiere un sistema
    web que centralice la información en una base maestra, automatice la carga y transformación de
    archivos, permita detectar duplicados y genere plantillas de salida para NetSuite y plataformas web.
    La solución propuesta actuará como una capa intermedia de normalización y gestión, sin integración
    directa en tiempo real con NetSuite ni con las aplicaciones web, ya que los archivos generados serán
    descargados e importados manualmente por los usuarios.
●​ OBJETIVO GENERAL
   Desarrollar e implementar un sistema web que permita al usuario seleccionar o registrar una plantilla
   destino, cargar el archivo Excel de un proveedor, y de forma automática reconocer, mapear y
   transformar los datos del archivo para completar los campos de la plantilla seleccionada, generando
   un archivo listo para descarga e importación directa en NetSuite o web.
●​ ALCANCE DEL PROYECTO
     El proyecto contempla el análisis, diseño y desarrollo de una solución web que funcione como
     una capa intermedia entre los archivos enviados por proveedores y los sistemas destino de
     Promotick.
     Dentro del alcance
             ●​ Gestión de proveedores.
             ●​ Carga de archivos Excel de proveedores.
             ●​ Detección de estructura del archivo, encabezados y columnas.
             ●​ Mapeo de columnas del proveedor contra los campos de la base maestra.
             ●​ Revisión y ajuste manual del mapeo sugerido.
             ●​ Normalización de datos como precios, textos, formatos y unidades.
             ●​ Validación de campos obligatorios, datos incompletos e inconsistencias.
             ●​ Detección de posibles duplicados por SKU, nombre u otros criterios definidos.
             ●​ Revisión y confirmación del lote antes de guardar la información.
             ●​ Gestión de categorías y subcategorías.
             ●​ Generación automática del código NetSuite para nuevos productos.
             ●​ Registro de precios por proveedor.
             ●​ Gestión de clientes destino, como NetSuite y aplicaciones web.
             ●​ Configuración de plantillas de salida por cliente.
             ●​ Generación de archivos CSV para NetSuite y XLSX para aplicaciones web.
             ●​ Administración de usuarios, roles y permisos.
    Fuera del alcance


---

## Página 7

            ●​   Integración directa en tiempo real con NetSuite.
            ●​   Carga automática de productos hacia aplicaciones web.
            ●​   Portal externo para proveedores.
            ●​   Panel de control con métricas generales del sistema.
            ●​   Módulos de inventario, logística, facturación, órdenes de compra o cuentas por
                 pagar.
            ●​   Conversión de monedas en tiempo real y soporte multimoneda con tasas FX en vivo
            ●​   Integración con SSO o directorios corporativos.
            ●​   Enriquecimiento automático con IA para completar campos vacíos de productos.
            ●​   Búsqueda automática en internet para completar descripciones, marcas, imágenes,
                 dimensiones u otros datos faltantes.
            ●​   Modificación directa de los sistemas destino de Promotick.
            ●​   Conversión en multimoneda
            ●​   Logs de auditoría
            ●​   Historial de precios
●​ DISEÑO FUNCIONAL DETALLADO
   El diseño funcional del sistema se basa en una arquitectura Serverless. Tras la autenticación segura
   mediante AWS Cognito, se habilita la carga de archivos hacia un motor de ingesta donde, mediante
   un procesamiento único con IA (Claude), se realiza un mapeo semántico automatizado de las
   columnas. Posteriormente, los datos atraviesan un proceso de normalización técnica (limpieza de
   símbolos y estandarización de valores numéricos) que clasifica el estado de cada registro : los
   productos duplicados (SKU) o con errores de formato se derivan al Panel de Saneamiento para su
   resolución manual, mientras que los registros que carecen de los atributos obligatorios (SKU y precio)
   se derivan a la sección de Errores, donde el usuario puede completarlos o corregirlos manualmente
   antes de confirmarlos. Asimismo, los productos con categorías no reconocidas se retienen bajo un
   estado de "Error" hasta la intervención manual. Solo los registros saneados y confirmados
   explícitamente por el usuario persisten en DynamoDB.Finalmente, la información validada alimenta el
   motor de salida para generar archivos CSV o XLSX compatibles con NetSuite, garantizando la
   trazabilidad total en el ciclo de vida del dato.
●​ DIAGRAMA DEL PROCESO


### Tabla estructurada detectada

| ●​ | Integración directa en tiempo real con NetSuite. |
| --- | --- |
| ●​ | Carga automática de productos hacia aplicaciones web. |
| ●​ | Portal externo para proveedores. |
| ●​ | Panel de control con métricas generales del sistema. |
| ●​ | Módulos de inventario, logística, facturación, órdenes de compra o cuentas por |
| ●​ | Conversión de monedas en tiempo real y soporte multimoneda con tasas FX en vivo |
| ●​ | Integración con SSO o directorios corporativos. |
| ●​ | Enriquecimiento automático con IA para completar campos vacíos de productos. |
| ●​ | Búsqueda automática en internet para completar descripciones, marcas, imágenes, |
| ●​ | Modificación directa de los sistemas destino de Promotick. |
| ●​ | Conversión en multimoneda |
| ●​ | Logs de auditoría |
| ●​ | Historial de precios |


---

## Página 8

○​   INTEGRACIÓN ENTRE LOS SISTEMAS DE LA EMPRESA
     El Sistema de Gestión de Productos se integra funcionalmente con las plataformas clave que
     conforman el ecosistema operativo de Promotick, permitiendo una consolidación centralizada,
     estandarizada y escalable del catálogo de artículos. Esta integración garantiza la existencia de
     una "fuente única de verdad", evitando duplicidades en el inventario y asegurando que la
     información de los productos y precios fluya correctamente hacia todos los canales de venta y
     operación. Los sistemas integrados son:
         1.​ ERP NetSuite: El Sistema de Gestión de Productos opera de forma complementaria al
             ERP mediante un modelo de interoperabilidad basado en archivos, sin requerir una
             conexión directa por API o en tiempo real. La articulación se garantiza a través de la
             autogeneración de códigos de artículo bajo la nomenclatura estricta de la empresa
             (NSXXYYZZZZ) y la creación de archivos de salida en formato CSV/XLSX
             pre-configurados según los requerimientos técnicos de NetSuite. Este flujo asegura
             que, tras la importación de dichos archivos al ERP, estos queden alineados
             operativamente, eliminando errores de transcripción manual y manteniendo la
             integridad de los datos en ambos sistemas.
         2.​ Aplicaciones Web y Plataformas de Destino (Web Apps): El ecosistema de
             e-commerce y catálogos digitales donde Promotick opera. El sistema se integra
             mediante un motor de mapeo que asocia las categorías maestras con el árbol de
             categorías de cada web en particular. Genera plantillas dinámicas (XLSX) aplicando de
             manera automática reglas de negocio como el factor de conversión de puntos o valores
             fijos exigidos por cada plataforma.
         3.​ Base de Datos Maestra de Productos (Amazon DynamoDB): Actúa como el núcleo
             de integración interno. Toda la información heterogénea ingresada converge en este
             repositorio NoSQL altamente escalable, que centraliza el catálogo unificado de
             productos, el historial de precios por proveedor y las especificaciones técnicas. Gracias
             a su esquema flexible, permite absorber de manera eficiente las múltiples variaciones
             de atributos y tags generados por la IA sin depender de migraciones estructurales
             rígidas.


---

## Página 9

   ○​    INTEROPERACIÓN CON SISTEMAS EXTERNOS VINCULADOS CON LA EMPRESA
         El sistema está diseñado para interoperar con plataformas externas que proveen capacidades
         avanzadas de procesamiento y almacenamiento, permitiendo que el flujo de gestión de
         productos sea inteligente y altamente disponible.
         Entre los sistemas externos previstos se encuentran:
             ●​ Motor de Inteligencia Artificial (API de Anthropic Claude): El sistema interopera con
                este modelo de lenguaje avanzado para ejecutar tareas críticas de forma asíncrona.
                Esta interoperación permite el mapeo semántico de plantillas de proveedores
                desconocidos y la detección de productos duplicados mediante análisis de similitud.
             ●​ Sistemas de Información de Proveedores (Ingesta de Datos): La plataforma
                interopera con los sistemas de los socios comerciales mediante la ingesta de archivos
                Excel dinámicos. El sistema es capaz de interpretar diversas estructuras de datos
                externas, realizando una limpieza automática de símbolos de moneda y normalizando la
                información para que sea compatible con los estándares internos de Promotick.
             ●​ Infraestructura de Almacenamiento en la Nube (Amazon S3): Para garantizar la
                persistencia de los insumos externos, el sistema se enlaza con Amazon S3. Aquí se
                almacenan de forma segura los archivos originales enviados por los proveedores y se
                depositan las plantillas de salida generadas para que los usuarios puedan descargarlas
                de manera asíncrona, optimizando el rendimiento del servidor de aplicaciones.
●​ REGLAS DE NEGOCIO
        Las Reglas de Negocio (RN) se detallan a continuación:
        NO      NOMBRE DE LA REGLA                         DETALLE DE LA REGLA
                                            El acceso al sistema está permitido únicamente para
  RN-0001             Autenticación         usuarios que hayan sido registrados previamente por un
                                            usuario con rol SÚPER o Administrador.
                                            Todo usuario registrado por un SÚPER o Administrador
                    Contraseña inicial
  RN-0002                                   debe contar con una contraseña temporal alfanumérica
                       (temporal)
                                            para su primer acceso a la plataforma.
                                            El acceso a cualquier funcionalidad del sistema requiere
                                            que el rol asociado a la cuenta del usuario cuente con el
                                            privilegio correspondiente para utilizarla.
  RN-0003       Control de Acceso por Rol
                                            Las funcionalidades de Inicio de Sesión (Login) y
                                            recuperación de credenciales son de acceso público para
                                            los usuarios que requieran autenticarse o restablecer sus
                                            credenciales, sin depender de un rol previamente


### Tabla estructurada detectada

| ○​ | INTEROPERACIÓN CON SISTEMAS EXTERNOS VINCULADOS CON LA EMPRESA |  |
| --- | --- | --- |
| NO | NOMBRE DE LA REGLA | DETALLE DE LA REGLA |
| RN-0001 | Autenticación | usuarios que hayan sido registrados previamente por un |
| RN-0002 | debe contar con una contraseña temporal alfanumérica |  |
| RN-0003 | Control de Acceso por Rol |  |


---

## Página 10

                                        autenticado.
                                      El único usuario con rol Super, tiene como única
                                      funcionalidad Gestión de Usuarios, puede crear usuarios
RN-0004     Privilegios del Rol Super
                                      Administrador y desactivarlos, asimismo, puede crear otros
                                      de menor rango.
                                        El rol Administrador posee permisos de lectura, escritura,
                                        edición y desactivación sobre las siguientes
                                        funcionalidades:
                                            ●​ Gestión de proveedores.
                                            ●​ Gestión de usuarios y roles.
               Privilegios del Rol
RN-0005                                     ●​ Mapeo de categorías por cliente.
                 Administrador
                                            ●​ Configuración de plantillas de salida.
                                            ●​ Gestión de categorías y subcategorías, incluyendo
                                               la creación, edición de códigos y desactivación.
                                            ●​ Flujos de carga.
                                            ●​ Revisión de archivos.
                                            ●​ Exportación de archivos.
                                        El rol Ejecutivo tiene permisos limitados a las siguientes
                                        funcionalidades:
                                            ●​   Gestión de proveedores.
RN-0006 Privilegios del Rol Ejecutivo       ●​   Carga de plantillas.
                                            ●​   Revisión de archivos.
                                            ●​   Generación de exportaciones.
                                            ●​   Gestión de categorías y subcategorías (creación,
                                                 edición y activación o desactivación de registros)
                                      El rol Viewer está limitado exclusivamente a la visualización
                                      de productos en la plataforma y no posee permisos para
RN-0007    Privilegios del Rol Viewer
                                      realizar acciones de escritura, modificación o eliminación de
                                      información.
                                   Los permisos y capacidades operativas de cada usuario
                                   están determinados exclusivamente por el rol asignado a
        Inmutabilidad y Naturaleza
RN-0008                            su cuenta. No se permite la asignación dinámica de
          Estática de los Roles
                                   permisos individuales ni la modificación de las capacidades
                                   definidas para dicho rol durante una sesión o fuera de ella.
                                        Un producto se considera como duplicado cuando su
RN-0009     Detección de duplicados
                                        código SKU coincide exactamente con el código SKU de
                                        un registro existente en la Base de Datos Maestra.


### Tabla estructurada detectada

| RN-0004 | Privilegios del Rol Super |  |
| --- | --- | --- |
| RN-0005 | ●​ Mapeo de categorías por cliente. |  |
| ●​ | Gestión de proveedores. |  |
| RN-0006 Privilegios del Rol Ejecutivo | ●​ | Carga de plantillas. |
| ●​ | Revisión de archivos. |  |
| ●​ | Generación de exportaciones. |  |
| ●​ | Gestión de categorías y subcategorías (creación, |  |
| RN-0007 | Privilegios del Rol Viewer |  |
| RN-0008 | su cuenta. No se permite la asignación dinámica de |  |
| RN-0009 | Detección de duplicados |  |


---

## Página 11

                                    Los archivos de salida deben generarse en el formato
           Formato de archivo de definido por el cliente para la plataforma de destino,
RN-0010
                   salida           pudiendo utilizarse formatos CSV o XLSX según
                                    corresponda.
          Selección Obligatoria de Todo proceso de carga de archivos requiere la selección
RN-0011
                 Proveedor          previa de un proveedor registrado en el sistema.
                                    Solo se admiten archivos en formato .xlsx o .csv para su
                                    procesamiento en la plataforma. Cualquier archivo que no
RN-0012    Validación de Archivo
                                    cumpla con estos formatos se considera inválido y no
                                    puede ser procesado.
                                    Todo mapeo confirmado debe conservarse en la Base de
RN-0013   Persistencia de Plantilla Datos Maestra para su reutilización en futuras cargas del
                                    mismo proveedor.
                                    El código SKU de cada producto debe ser único dentro del
RN-0014    Unicidad de producto
                                    sistema.
                                    Todo proveedor registrado en el sistema debe contar con un
RN-0015       Registro de RUC       RUC compuesto por exactamente 11 dígitos y dicho RUC
                                    debe ser único dentro de la plataforma.
                                    Los archivos cargados deben mantener la correspondencia
                                    entre la cantidad de cabeceras y la plantilla predefinida
                                    asociada.
RN-0016   Validación de cabeceras Cuando exista una discrepancia en las cabeceras, ésta
                                  deberá ser validada antes de su incorporación y sólo podrá
                                  conservarse si el usuario confirma expresamente su
                                  aceptación.
                                   Los códigos de las categorías deben ser únicos entre todas
                                   las categorías registradas y los códigos de las
RN-0017   Categoría o subcategoría subcategorías deben ser únicos dentro de la categoría a la
                                   que pertenecen.
                                    Todo proceso de recuperación de contraseña de un usuario
                                    registrado requiere la validación mediante un código
              Recuperación de       temporal de seis (6) dígitos enviado al correo electrónico
RN-0018
                contraseña          asociado a la cuenta, como requisito previo para establecer
                                    una nueva contraseña.
                                     La creación y actualización de productos en el Catálogo
                                     Maestro solo puede ejecutarse a través del flujo de ingesta
          Vía única de escritura del
RN-0019                              automatizado (normalización, inteligencia artificial y
              Catálogo Maestro
                                     detección de duplicados). No existe una vía de escritura
                                     directa que omita estas etapas.


### Tabla estructurada detectada

| salida | pudiendo utilizarse formatos CSV o XLSX según |  |
| --- | --- | --- |
| Proveedor | previa de un proveedor registrado en el sistema. |  |
| RN-0012 | Validación de Archivo |  |
| RN-0013 | Persistencia de Plantilla Datos Maestra para su reutilización en futuras cargas del |  |
| RN-0014 | Unicidad de producto |  |
| RN-0015 | Registro de RUC | RUC compuesto por exactamente 11 dígitos y dicho RUC |
| RN-0016 | Validación de cabeceras Cuando exista una discrepancia en las cabeceras, ésta |  |
| RN-0017 | Categoría o subcategoría subcategorías deben ser únicos dentro de la categoría a la |  |
| Recuperación de | temporal de seis (6) dígitos enviado al correo electrónico |  |
| contraseña | asociado a la cuenta, como requisito previo para establecer |  |
| RN-0019 | automatizado (normalización, inteligencia artificial y |  |


---

## Página 12

                                   Ningún usuario puede modificar el rol asignado a su propia
RN-0020 Restricción de Autogestión cuenta ni desactivar su propia cuenta corporativa,
                                   independientemente de los privilegios que posea.
                                    Solo las cuentas con estado Activo pueden acceder a la
RN-0021    Desactivación de usuario plataforma. Las cuentas con estado Inactivo no deben tener
                                    acceso hasta que su estado sea restablecido a Activo.
                                 Todo número telefónico registrado o actualizado en la
                                 plataforma debe cumplir con el formato internacional E.164,
        Validación de números de iniciando con el símbolo (+), seguido de uno de los códigos
RN-0022
                 teléfono        de país operativos de Promotick (54, 51, 56, 57, 591, 593,
                                 34, 502, 52, 507) y una longitud total de 8 a 12 caracteres.
                                      Todos los precios gestionados por la plataforma deben
              Estandarización de      expresarse y tratarse exclusivamente en Soles (PEN). No
RN-0023                               se permite el uso de otras monedas ni la realización de
             Moneda Única (Soles)
                                      conversiones cambiarias dentro del sistema.
                                    Todo lote de productos procesado en la plataforma exige la
                                    presencia obligatoria y válida de los atributos SKU y precio
                                    para la totalidad de sus registros, permitiendo la admisión
          Validación de Campos de hasta un máximo de 5 tuplas con omisiones o datos
RN-0024 Obligatorios en la Carga de faltantes en cualquier otro atributo general para su posterior
                Productos           regularización en la etapa de edición, procediendo con el
                                    rechazo íntegro del lote únicamente al exceder dicha
                                    tolerancia.
                                  El sistema debe contar con una única cuenta con el rol
                                  SUPER, creada durante el proceso de inicialización
                                  (bootstrap). No se permite la creación de cuentas
RN-0025 Unicidad del Superusuario adicionales con dicho rol por ningún medio. Asimismo, la
                                  cuenta SUPER es inmutable: no puede ser modificada
                                  (cambio de rol, desactivación o edición de datos) por ningún
                                  actor, incluida ella misma.
           Privilegios exclusivos del El rol Super tiene la facultad de modificar el rol asignado o
RN-0026       Superusuario sobre      desactivar cualquier cuenta con rol Administrador, sin
           cuentas de Administrador restricciones derivadas de la jerarquía de permisos.
           Desactivación en cascada
RN-0027        de categorías y      La desactivación de una categoría implica la desactivación
                subcategorías       de todas las subcategorías asociadas. Mientras una


### Tabla estructurada detectada

| RN-0021 | Desactivación de usuario plataforma. Las cuentas con estado Inactivo no deben tener |  |
| --- | --- | --- |
| teléfono | de país operativos de Promotick (54, 51, 56, 57, 591, 593, |  |
| Estandarización de | expresarse y tratarse exclusivamente en Soles (PEN). No |  |
| RN-0023 | se permite el uso de otras monedas ni la realización de |  |
| Productos | regularización en la etapa de edición, procediendo con el |  |
| RN-0026 | Superusuario sobre | desactivar cualquier cuenta con rol Administrador, sin |
| RN-0027 | de categorías y | La desactivación de una categoría implica la desactivación |
| subcategorías | de todas las subcategorías asociadas. Mientras una |  |


---

## Página 13

                                      categoría permanezca inactiva, sus subcategorías tampoco
                                      pueden utilizarse para la clasificación de productos.
                                   La reactivación de una categoría no implica la reactivación
        Restauración del estado de de sus subcategorías. Todas las subcategorías asociadas
RN-0028 subcategorías al reactivar deben permanecer inactivas hasta que sean reactivadas de
              una categoría        forma independiente.
                                   Solo los proveedores con estado ‘Activo’ pueden ser
RN-0029 Uso de proveedores activos seleccionados y asociados en los procesos de carga,
                                   ingesta de archivos y catálogos operativos.
                                   El proceso de carga de archivos de proveedores se ejecuta
        Independencia del flujo de de forma autónoma. Se basa en el desacoplamiento
RN-0030                            operativo de los flujos, por lo cual no obliga ni desencadena
                 carga
                                   una exportación posterior de datos del catálogo maestro.
                                      Toda contraseña registrada o actualizada en la plataforma
                                      debe cumplir con los siguientes requisitos:
                                          ●​   Tener una longitud mínima de 8 caracteres
RN-0031    Estructura de contraseña       ●​   Contener al menos una letra mayúscula.
                                          ●​   Contener al menos una letra minúscula.
                                          ●​   Contener al menos un número.
                                          ●​   Contener al menos un carácter especial.
                                   Cuando un producto sea registrado por primera vez y se
           Asignación de Proveedor encuentre asociado a un único proveedor, dicho proveedor
RN-0032
             Principal por Defecto será considerado el proveedor principal o preferido por
                                   defecto para ese producto.
                                     Al consolidar productos duplicados mediante la operación
                                     de combinación, el sistema conserva el código NetSuite del
            Política de Precio en la registro existente y transfiere automáticamente el precio del
RN-0033        Combinación de        registro entrante al catálogo maestro, sobrescribiendo el
                   Duplicados        precio existente. El usuario no selecciona el precio durante
                                     la combinación; únicamente puede editar el precio de un
                                     registro en el flujo previo de corrección de errores.


### Tabla estructurada detectada

| una categoría | forma independiente. |  |  |
| --- | --- | --- | --- |
| RN-0030 | operativo de los flujos, por lo cual no obliga ni desencadena |  |  |
| ●​ | Tener una longitud mínima de 8 caracteres |  |  |
| RN-0031 | Estructura de contraseña | ●​ | Contener al menos una letra mayúscula. |
| ●​ | Contener al menos una letra minúscula. |  |  |
| ●​ | Contener al menos un número. |  |  |
| ●​ | Contener al menos un carácter especial. |  |  |
| RN-0033 | Combinación de | registro entrante al catálogo maestro, sobrescribiendo el |  |
| Duplicados | precio existente. El usuario no selecciona el precio durante |  |  |


---

## Página 14

                                      El SKU es el identificador principal del producto: cadena
RN-0034          Formato SKU          alfanumérica de hasta 100 caracteres, incluyendo símbolos y
                                      espacios.
                                      Todo identificador NetSuite generado para un producto
RN-0035      Código de categoría      debe incorporar el código manual de dos letras asignado a
                                      la categoría a la que pertenece dicho producto.
                                    Toda nueva subcategoría debe recibir el menor código
           Asignación del código de numérico libre disponible dentro de su categoría, utilizando
RN-0036
                subcategoría        valores comprendidos entre 01 y 99.
                                      Todo identificador NetSuite generado para un producto
             Serial incremental por   debe incluir un serial incremental de cuatro dígitos
RN-0037                               correspondiente a la secuencia de la subcategoría a la que
                 subcategoría
                                      pertenece.
                                      Todo producto aprobado para su traslado al
                                      almacenamiento definitivo debe recibir un identificador
                                      único generado automáticamente por la plataforma, el cual
              Autogeneración del      debe cumplir estrictamente con la estructura de 10
RN-0038
             identificador NetSuite   caracteres: NSXXYYZZZZ (donde X representa las letras de
                                      la categoría y Y los dígitos numéricos de la subcategoría y
                                      Z el serial), sin espacios ni guiones intermedios.
                                   El código numérico 20 está reservado exclusivamente para
        Reserva del código 20 para la identificación de subcategorías correspondientes a Packs
RN-0039                            de productos y no puede asignarse a ningún otro tipo de
                 Packs
                                   subcategoría.
            Longitud máxima de la     La descripción de un producto debe tener una longitud
RN-0040          descripción          máxima de 2000 caracteres.
                                  Los campos de precios procesados durante la ingesta de
        Sanitización de campos de archivos deben almacenarse libres de espacios dobles
RN-0041                           consecutivos y de caracteres especiales ajenos a la
                  precios
                                  descripción comercial, incluyendo !, @, #, $, %, ^, *, ~ y |.
                                      Toda fecha procesada por la plataforma debe ajustarse al
RN-0042       Formato de fechas       formato estándar DD-MM-YYYY.


### Tabla estructurada detectada

| RN-0034 | Formato SKU | alfanumérica de hasta 100 caracteres, incluyendo símbolos y |
| --- | --- | --- |
| RN-0035 | Código de categoría | debe incorporar el código manual de dos letras asignado a |
| subcategoría | valores comprendidos entre 01 y 99. |  |
| Serial incremental por | debe incluir un serial incremental de cuatro dígitos |  |
| RN-0037 | correspondiente a la secuencia de la subcategoría a la que |  |
| Autogeneración del | debe cumplir estrictamente con la estructura de 10 |  |
| identificador NetSuite | caracteres: NSXXYYZZZZ (donde X representa las letras de |  |
| RN-0039 | de productos y no puede asignarse a ningún otro tipo de |  |
| Longitud máxima de la | La descripción de un producto debe tener una longitud |  |
| RN-0040 | descripción | máxima de 2000 caracteres. |
| RN-0041 | consecutivos y de caracteres especiales ajenos a la |  |
| RN-0042 | Formato de fechas | formato estándar DD-MM-YYYY. |


---

## Página 15

                                      Todo producto entrante que el sistema detecte como
                                      coincidencia contra el Catálogo Maestro debe resolverse
                                      mediante una de las siguientes acciones:
                                          ●​ Combinar (merge): actualiza el registro existente
                                             del catálogo con los datos del producto entrante.
                                             Conserva la categoría/subcategoría del registro
                                             existente (solo se sobrescribe si el usuario la
                                             corrige); el precio se sobrescribe siempre con el
                                             del producto entrante. No crea un registro nuevo.
                                          ●​ Mantener ambos (keep_both): crea el producto
                                             entrante como un registro separado en el catálogo,
                                             conservando también el existente. El entrante
                                             hereda la categoría/subcategoría del producto
          Acciones de resolución de          coincidente en el maestro salvo corrección del
RN-0043          duplicados                  usuario.
                                          ●​ Rechazar nuevo (reject_new): descarta el producto
                                             entrante; el registro existente no se modifica. Es
                                             también el resultado por defecto si el usuario no
                                             toma ninguna decisión (el entrante se omite al
                                             confirmar el lote).
                                      Las acciones disponibles dependen del tipo de conflicto:
                                          ●​ Duplicado por SKU exacto: únicamente Combinar
                                             o Rechazar nuevo. Mantener ambos no está
                                             permitido porque el SKU colisionaría.
                                          ●​ Coincidencia por similitud (≥ umbral configurable,
                                             sin SKU exacto): Combinar, Mantener ambos o
                                             Rechazar nuevo.
                                 La finalización explícita de una sesión por parte de un
                                 usuario invalida su autorización de acceso a los recursos
        Caducidad del Acceso por
RN-0044                          protegidos de la plataforma. Para recuperar el acceso es
            Cierre de Sesión
                                 obligatorio realizar un nuevo proceso de autenticación
                                 válido.
                                     Las categorías y subcategorías sugeridas automáticamente
        Prioridad de la decisión del para un producto tienen carácter de recomendación y
RN-0045      usuario sobre las       pueden ser modificadas por el usuario antes de su
         sugerencias automáticas confirmación definitiva, independientemente del nivel de
                                     confianza asociado a la sugerencia.


### Tabla estructurada detectada

| Acciones de resolución de | coincidente en el maestro salvo corrección del |  |
| --- | --- | --- |
| RN-0043 | duplicados | usuario. |
| RN-0044 | protegidos de la plataforma. Para recuperar el acceso es |  |
| RN-0045 | usuario sobre las | pueden ser modificadas por el usuario antes de su |


---

## Página 16

           Estructura permitida para Los archivos Excel admitidos por la plataforma deben
RN-0046         archivos Excel       contener una única hoja de trabajo.
                                     El EAN es un código de barras numérico de exactamente
RN-0047          Formato EAN
                                     13 dígitos.
                                     El MPN (Manufacturer Part Number) es un identificador
RN-0048          Formato MPN
                                     alfanumérico de 14 a 15 caracteres.
                                       La exportación de datos del catálogo maestro está
                                       disponible para su ejecución en cualquier momento. Se
           Disponibilidad del flujo de
RN-0049                                aplica utilizando la información registrada en el sistema
                 exportación
                                       hasta ese instante y no requiere la finalización previa de
                                       una carga de archivos de proveedores.
                                   El sistema compara cada producto entrante contra los
                                   existentes de la misma categoría y subcategoría. Primero
                                   verifica coincidencia exacta por SKU (sin evaluar texto). Si
                                   no hay match exacto, concatena nombre, descripción de
                                   venta y especificaciones en un único texto y calcula su
                                   similitud; si ambos registros tienen marca y difieren, el par
RN-0050 Detección de coincidencias se descarta sin calcular. Un resultado ≥ 80 marca el par
                                   como posible coincidencia retenida para decisión manual.
                                   Si la categorización del producto (categoría o subcategoría)
                                   no fue resuelta con confianza, la evaluación se omite. El
                                   umbral es configurable (DEDUP_THRESHOLD, por defecto
                                   80).
           Restricción de valores en Los precios de los productos no pueden contener letras ni
RN-0051             precios          registrar valores negativos.
                                     El registro de un producto en la base de datos maestra
                                     exige de forma obligatoria la coexistencia tanto del precio
                                     neto (sin IGV) como del precio bruto (con IGV), requiriendo
           Estandarización y cálculo
RN-0052                              la especificación explícita del tipo de precio ingresado y
              de precios con IGV
                                     determinando el valor faltante mediante la aplicación del
                                     factor de conversión correspondiente (1.18) cuando solo se
                                     disponga de uno de los dos datos.
                  Exclusión de
                                    Si el sistema asigna o mapea un producto a una categoría o
RN-0053    categorías/subcategorías
                                    subcategoría durante la ingesta/categorización, entonces
             inactivas en el mapeo
                                    solo puede usar categorías/subcategorías en estado activo.


### Tabla estructurada detectada

| RN-0046 | archivos Excel | contener una única hoja de trabajo. |
| --- | --- | --- |
| RN-0047 | Formato EAN |  |
| RN-0048 | Formato MPN |  |
| RN-0049 | aplica utilizando la información registrada en el sistema |  |
| RN-0051 | precios | registrar valores negativos. |
| RN-0052 | la especificación explícita del tipo de precio ingresado y |  |
| RN-0053 | categorías/subcategorías |  |


---

## Página 17

                                      Las inactivas se excluyen del catálogo de coincidencia, y
                                      todo producto que recaiga en una inactiva se marca para
                                      revisión manual sin asignación automática.
                                      Los tipos de plataforma corresponden a un catálogo
RN-0054      Tipos de Plataforma      maestro gestionado por usuarios con rol Administrador o
                                      Ejecutivo.
                                   Cada plataforma registrada en el sistema debe poseer
        Vinculación Obligatoria de
RN-0055                            única y obligatoriamente una sola plantilla de salida
                 Plantilla
                                   configurada para la estructura de sus archivos.
                                      El formato del archivo (Excel o CSV) y la inclusión o
                                      exclusión de la fila de cabecera son características fijas
              Atributos Fijos de la
RN-0056                               definidas a nivel de la plantilla de la plataforma, por lo que
                    Plantilla
                                      no pueden ser modificadas por el usuario al solicitar una
                                      exportación.
                                   Toda solicitud para generar un archivo de exportación tiene
                                   un carácter irrevocable desde el momento de su registro en
RN-0057 Restricción de Cancelación el sistema, quedando estrictamente prohibida la
                                   cancelación, anulación o reversión de dicho proceso.
                                    Las columnas mapeadas y calculadas solo pueden utilizar
           Restricción de Origen de campos que pertenezcan al catálogo oficial de la base
RN-0058              Datos          maestra de productos del sistema, impidiendo el ingreso
                                    manual de campos arbitrarios.
                                   Las fuentes de datos para columnas de origen directo o
           Validación con Catálogo cálculo derivado están restringidas estrictamente al
RN-0059            Maestro         catálogo oficial de campos de la base de datos maestra de
                                   productos.
            Integridad de Tipos de    Un tipo de plataforma asignado a una o más plataformas se
RN-0060           Plataforma          considera no eliminable.
                                  Los estados válidos para cualquier solicitud de generación
        Ciclo de Vida de Procesos
RN-0061                           de archivos se limitan a la secuencia controlada de: Espera,
                 de Salida
                                  Procesamiento, Completado, Fallido y Cancelado.


### Tabla estructurada detectada

| RN-0054 | Tipos de Plataforma | maestro gestionado por usuarios con rol Administrador o |
| --- | --- | --- |
| RN-0055 | única y obligatoriamente una sola plantilla de salida |  |
| RN-0056 | definidas a nivel de la plantilla de la plataforma, por lo que |  |
| RN-0058 | Datos | maestra de productos del sistema, impidiendo el ingreso |
| RN-0059 | Maestro | catálogo oficial de campos de la base de datos maestra de |
| Integridad de Tipos de | Un tipo de plataforma asignado a una o más plataformas se |  |
| RN-0060 | Plataforma | considera no eliminable. |
| RN-0061 | de archivos se limitan a la secuencia controlada de: Espera, |  |


---

## Página 18

                                     El valor de las columnas de tipo calculado se obtiene
                                     multiplicando el precio base del artículo por el factor de
             Cálculo de Puntos en    conversión de puntos asignado a la plataforma de destino.
RN-0062          Exportación         Las modificaciones sobre el factor de conversión solo
                                     aplican a exportaciones futuras y no alteran los cálculos de
                                     los registros históricos del sistema.
                                     El factor de conversión admite una longitud máxima de
RN-0063      Factor de Conversión    hasta 6 números enteros y 4 decimales, utilizando el punto
                                     (.) como separador decimal.
                                     No es posible realizar exportaciones de datos a través de
RN-0064      Plataformas inactivas
                                     plataformas que se encuentren en estado inactivo.
                                     Todo código NetSuite (NSXXYYZZZZ) generado por la
             Unicidad del código
RN-0065                              plataforma debe ser único e irrepetible dentro del catálogo
                  NetSuite
                                     maestro de productos.
                                     El serial incremental por subcategoría admite un máximo de
              Tope del serial por    9999 productos (4 dígitos). Alcanzado el límite, el sistema
RN-0066         subcategoría         debe impedir la generación de nuevos códigos NetSuite en
                                     esa subcategoría y notificar la condición.
                                     Los valores decimales procesados por la plataforma deben
            Formato de separador
RN-0067                              emplear un único separador decimal representado por el
                  decimal
                                     punto (.).
                                   El precio oficial de un producto (official_price) debe
RN-0068 Longitud máxima del precio contener un máximo de 12 dígitos.
                              Los campos numéricos no obligatorios (peso, alto, ancho,
                              largo/profundidad, volumen), así como potencia, voltaje y
                              capacidad se almacenan con el valor original provisto por el
                              proveedor, sin forzar su conversión a tipo numérico. Sobre
                              estos campos la plataforma solo aplica dos validaciones
        Tratamiento de campos
RN-0069 numéricos opcionales  cuando el valor es interpretable como número: (1) no puede
                              ser negativo y (2) no puede exceder los 12 dígitos de
                              magnitud; si el valor no es numérico, se conserva tal cual.
                              Esta regla no aplica al precio oficial (official_price), que es
                              obligatorio, numérico y está sujeto a sus propias reglas
                              (RN-0068, RN-0051).


### Tabla estructurada detectada

| Cálculo de Puntos en | conversión de puntos asignado a la plataforma de destino. |  |
| --- | --- | --- |
| RN-0062 | Exportación | Las modificaciones sobre el factor de conversión solo |
| RN-0063 | Factor de Conversión | hasta 6 números enteros y 4 decimales, utilizando el punto |
| RN-0064 | Plataformas inactivas |  |
| RN-0065 | plataforma debe ser único e irrepetible dentro del catálogo |  |
| Tope del serial por | 9999 productos (4 dígitos). Alcanzado el límite, el sistema |  |
| RN-0066 | subcategoría | debe impedir la generación de nuevos códigos NetSuite en |
| RN-0067 | emplear un único separador decimal representado por el |  |
| RN-0069 numéricos opcionales | cuando el valor es interpretable como número: (1) no puede |  |


---

## Página 19

                                        Los valores de texto provenientes de archivos de
                                        proveedores que comiencen con un carácter interpretable
                                        como inicio de fórmula (=, +, -, @) deben neutralizarse al
            Sanitización de fórmulas al
                                        momento de parsear el archivo, antes de su revisión y
    RN-0070       ingerir datos de
                                        persistencia en la Base de Datos Maestra. Esta sanitización
                    proveedores
                                        no se reaplica sobre correcciones realizadas durante la
                                        revisión ni sobre ediciones posteriores del producto ya
                                        persistido.
                                           Los datos externos (nombre, descripción, especificaciones
                                           de producto) deben neutralizarse antes de enviarse al motor
                                           de inteligencia artificial para evitar que instrucciones
                    Neutralización de
                                           incrustadas alteren su comportamiento. Si la respuesta de
    RN-0071       manipulación en datos
                                           la IA no cumple el formato esperado o referencia una
                       hacia la IA
                                           categoría inexistente, el sistema debe aplicar un
                                           comportamiento de reserva seguro en lugar de propagar el
                                           error o el dato inválido.
​
●​ ANÁLISIS DE REQUERIMIENTOS FUNCIONALES
    ○​   ACTORES
         Actores Humanos
         Las personas que tendrán credenciales de acceso a la plataforma web y ejecutarán acciones
         directas. Basado en los roles que definimos anteriormente, los actores serían:
         ● Superusuario (SUPER): Actor de máxima jerarquía y cuenta única creada durante el
         bootstrap del sistema; está aislado del flujo operativo y solo accede al Panel de Configuración
         Avanzada.
         - Funciones principales: gestión de cuentas de Administrador (activar/desactivar y cambiar su
         rol).
              ●​ Administrador (Admin): Actor con privilegios absolutos en el sistema. Es el encargado
                 de la configuración inicial y el mantenimiento crítico de la plataforma.
                      -​ Funciones principales: Gestión de usuarios, administración estructural del
                           Árbol de Categorías Maestro.
              ●​ Ejecutivo (o Analista de Catálogo / Operador): Es el actor principal del flujo de negocio
                 diario. Su objetivo es alimentar y mantener actualizada la Base de Datos Maestra.
                      -​ Funciones principales: Carga de archivos Excel de proveedores, validación de
                           las reglas de mapeo de columnas y ejecución por Inteligencia Artificial,
                           confirmación o rechazo de lotes, y generación de archivos de exportación
                           (NetSuite y Web Apps).
              ●​ Visualizador (Viewer): Actor con permisos restringidos de solo lectura. Su función es la
                 consulta de información de la tabla maestra (productos) sin capacidad de alterar los
                 datos.
                      -​ Funciones principales: Visualización y búsqueda en el Catálogo Maestro de
                           productos.


### Tabla estructurada detectada

| RN-0070 | ingerir datos de |
| --- | --- |
| RN-0071 | manipulación en datos |
| ○​ | ACTORES |


---

## Página 20

Actores de Sistema Externos
En la ingeniería de requerimientos, cualquier sistema automatizado o API que envía o recibe
información de tu plataforma se considera un actor, ya que gatilla o participa en los casos de
uso:
     ●​ Motor de Inteligencia Artificial (API LLM / Claude): Actor externo que interactúa
        asíncronamente con el sistema, el flujo de detección de errores se hará apenas se
        detecte.
             -​ Rol: Recibe datos crudos o mapeos incompletos y devuelve respuestas
                 procesadas (tags generados, o índices de similitud para detectar duplicados).
     ●​ ERP Corporativo (NetSuite): Actor receptor (destino).
             -​ Rol: Recibe la información procesada y normalizada (mediante los archivos
                 CSV autogenerados con el código NSXXYYZZZZ) para actualizar sus módulos
                 de inventario y facturación.
     ●​ Plataformas E-commerce (Web Apps): Actores receptores (destinos).
             -​ Rol: Consumen las plantillas XLSX generadas por el sistema, las cuales ya
                 incluyen el factor de conversión de puntos y el árbol de categorías específico
                 de cada web.
     ●​ Sistemas de Proveedores (Fuentes de Datos): Actor emisor.
             -​ Rol: Aunque la carga del Excel la hace el "Ejecutivo" o “Administrador”, el
                 sistema del proveedor actúa como el ente que origina la estructura
                 heterogénea de datos y los precios en soles que el sistema debe normalizar.
■​    DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN
     ●​ Listado de casos de uso
             o​ Módulo de Seguridad: Autenticación, Roles, Usuarios.
           CÓDIGO                      NOMBRE                               CU PADRE
           CU001        Autenticación de inicio de sesión
           CU002        Visualización de Roles                                CU001
           CU003        Gestión de Usuarios                               CU001, CU002
             o​ Módulo Maestro: Proveedores, Categorías, Catálogo.
           CÓDIGO                      NOMBRE                               CU PADRE
           CU004        Registro de proveedores                               CU001
           CU005        Gestión de Categorías y Subcategorías                 CU001
           CU006        Gestión del Catálogo Maestro de                       CU001
                        Productos
             o​ Módulo de Ingesta: Carga, Mapeo, Saneamiento.
           CÓDIGO                      NOMBRE                               CU PADRE
           CU007        Carga y Detección de Archivo                      CU001, CU004
           CU008        Mapeo Semántico de Columnas                       CU001, CU007


### Tabla estructurada detectada

| ■​ | DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN |  |
| --- | --- | --- |
| CÓDIGO | NOMBRE | CU PADRE |
| CU001 | Autenticación de inicio de sesión |  |
| CU002 | Visualización de Roles | CU001 |
| CU003 | Gestión de Usuarios | CU001, CU002 |
| CÓDIGO | NOMBRE | CU PADRE |
| CU004 | Registro de proveedores | CU001 |
| CU005 | Gestión de Categorías y Subcategorías | CU001 |
| CU006 | Gestión del Catálogo Maestro de | CU001 |
| CÓDIGO | NOMBRE | CU PADRE |
| CU007 | Carga y Detección de Archivo | CU001, CU004 |
| CU008 | Mapeo Semántico de Columnas | CU001, CU007 |


---

## Página 21

     CÓDIGO                        NOMBRE                               CU PADRE
     CU009         Saneamiento y Resolución de Conflictos              CU001, CU007,
                                                                          CU008
        o​ Módulo de Salida: Clientes, Mapeo Cliente, Plantillas, Generación.
     CÓDIGO                        NOMBRE                               CU PADRE
     CU010         Mapeo de Categorías por Cliente                     CU001, CU005,
                                                                       CU007, CU008
     CU011         Configuración de Plantillas de Salida               CU001, CU004,
                                                                          CU010
     CU012         Generación de Archivo de Salida                     CU001, CU006,
                                                                       CU010, CU011
     CU013         Panel de configuración avanzada                     CU001, CU003
●​ Especificación de casos
    CU001: Autenticación de inicio de sesión
                             Si un usuario intenta ingresar al sistema, entonces este
    Descripción
                             debe validar sus credenciales.
    Actores                  Super, Administrador, Ejecutivo, Viewer
    Precondiciones
    1.​ La aplicación debe estar publicada y operativa en el entorno de AWS .
    2.​ El usuario debe estar previamente registrado por un Administrador o el Super
        (RN-0001, RF-001).
    3.​ El usuario debe tener un rol predefinido asignado (RF-002, RN-0004).
    Flujo Básico
     1.​ El usuario accede a la aplicación a través del dominio de la plataforma.
     2.​ El sistema redirige automáticamente a la pantalla de login.
     3.​ El usuario ingresa su correo y contraseña, o puede seleccionar la opción
         “¿Olvidaste tu contraseña?”.
     4.​ El servicio de autenticación verifica las credenciales.
     5.​ La plataforma recibe la confirmación del token de sesión generado.
     6.​ Se corrobora el rol y se validan los permisos correspondientes al rol.
     7.​ Se muestra la animación de carga y se ingresa a la aplicación.
     8.​ La aplicación habilita la vista inicial correspondiente al rol del usuario (por
         defecto: Proveedores para Administrador y Ejecutivo, Productos para Viewer,
         Usuarios para Super).
    Flujo Alternativo
    Primer inicio de sesión con contraseña temporal


### Tabla estructurada detectada

| CÓDIGO | NOMBRE | CU PADRE |
| --- | --- | --- |
| CU009 | Saneamiento y Resolución de Conflictos | CU001, CU007, |
| CÓDIGO | NOMBRE | CU PADRE |
| CU010 | Mapeo de Categorías por Cliente | CU001, CU005, |
| CU011 | Configuración de Plantillas de Salida | CU001, CU004, |
| CU012 | Generación de Archivo de Salida | CU001, CU006, |
| CU013 | Panel de configuración avanzada | CU001, CU003 |
| Actores | Super, Administrador, Ejecutivo, Viewer |  |


---

## Página 22

    1.​ En el paso 3 del flujo básico, el sistema detecta que el usuario ingresa
        con una credencial temporal (desafío de cambio obligatorio) (RF-041).
    2.​ El sistema redirige al usuario a la interfaz de "Actualizar contraseña".
    3.​ El sistema solicita al usuario ingresar su nueva contraseña y la
        confirmación de la misma.
    4.​ El usuario ingresa los datos y confirma.
    5.​ El sistema valida que la nueva contraseña cumpla con las políticas de
        seguridad (RN-0002, RF-042) (Si no cumple las políticas, el sistema no
        aceptará la nueva contraseña)
    6.​ El sistema actualiza el estado del usuario a confirmado, genera los tokens
        de sesión y redirige a la vista inicial correspondiente a su rol
        (Administrador y Ejecutivo a Proveedores, Viewer a Productos, Super a
        Usuarios), volviendo al paso 5 del flujo básico.
Credenciales inválidas
     1.​ En el paso 4, la validación falla.
     2.​ Se muestra un mensaje de error, no se emite token y el usuario
         permanece en la pantalla de login.
Usuario deshabilitado
      1.​ En el paso 4, la validación detecta que el usuario tiene una cuenta
          deshabilitada.
      2.​ Rechaza el acceso y muestra un error indicando que el usuario no está
          habilitado para el ingreso
Usuario no registrado
      1. En el paso 4, la validación detecta que el usuario no está registrado.
      2. Por política de seguridad (prevención de enumeración de cuentas), el
          sistema no revela si el correo está registrado: muestra el mensaje
          genérico "Correo y/o contraseña incorrectos", no emite token y el
          usuario permanece en la pantalla de login.
Recuperación de contraseña
      1.​ En el paso 3, se selecciona la opción “¿Olvidaste tu contraseña?”.
      2.​ El sistema redirige a la pantalla de recuperación dentro de la aplicación;
          el usuario ingresa su correo, recibe un código de verificación de 6
          dígitos, ingresa el código y define una nueva contraseña que cumpla las
          políticas de seguridad, tras lo cual el sistema la restablece y habilita
          nuevamente el inicio de sesión (RF-021).
      Post Condiciones
      1.​ Autenticación exitosa aplicando los límites visuales del rol (RF-002,
          RN-0003, RF-039).
      2.​ Si falla, no se otorga acceso y el usuario permanece en el portal de
          login.
      Restricciones
      -​   Las políticas de autenticación (contraseñas seguras, tiempo de sesión,
           etc.) son las definidas por la plataforma (RN-0002).


---

## Página 23

      -​    Los accesos están sujetos a las políticas de seguridad de la plataforma
            (Tiempos de expiración de sesión y Rate Limiting) (RNF-0001,
            RNF-0002).
Casos de Uso Padre
Ninguno
Diagrama de Caso de uso
Prototipo
CU002: Visualización de Roles
                         Permite al usuario Administrador o SUPER visualizar los 4
                         roles estáticos del sistema (SUPER, Administrador,
Descripción
                         Ejecutivo, Viewer; el rol SUPER es informativo y no
                         asignable).


---

## Página 24

Actores                  Administrador, SUPER
Precondiciones
    1.​ La aplicación debe estar publicada y operativa en el entorno de AWS.
    2.​ El usuario debe haber iniciado sesión exitosamente.
    3.​ El usuario debe poseer el rol Administrador para tener acceso a la vista
        "Usuarios" (RN-0003, RF-002).
Flujo Básico
    1.​ El Administrador accede a la aplicación y selecciona la pestaña "usuarios"
        en el menú lateral.
    2.​ El sistema carga la interfaz.
    3.​ El sistema expone visualmente a todos los usuarios, con su rol estáticos
        del sistema (SUPER, Administrador, Ejecutivo, Viewer).
Flujo Alternativo
Ninguno
Ninguno. Al ser una funcionalidad estrictamente de consulta estática, no existen
flujos de error por actualización de bases de datos o envío de formularios.
Post Condiciones
    1.​ El Administrador comprende los alcances y restricciones de cada rol para
        su posterior asignación en el módulo de Gestión de Usuarios (CU003).
Restricciones
    -​    Los roles y sus permisos son inmutables en el código fuente (RN-0004).
    -​    El Administrador no puede crear nuevos roles, eliminar los existentes, ni
          editar la matriz de permisos.
Casos de Uso Padre
CU001 (Autenticación de inicio de sesión)
Diagrama de caso de uso
Prototipo


### Tabla estructurada detectada

| Actores | Administrador, SUPER |
| --- | --- |
| -​ | Los roles y sus permisos son inmutables en el código fuente (RN-0004). |
| -​ | El Administrador no puede crear nuevos roles, eliminar los existentes, ni |


---

## Página 25

CU003: Gestión de Usuarios
                        Permite gestionar el ciclo de vida de las cuentas de
                        acceso al sistema (crear, editar, visualizar, desactivar y
                        reactivar usuarios, y asignar o cambiar sus roles),
                        repartido entre dos actores según su alcance. El
                        Administrador puede crear cuentas, Ejecutivo y
Descripción
                        Visualizador, y editar, cambiar el rol y activar/desactivar
                        cuentas Ejecutivo y Visualizador; no puede modificar ni
                        desactivar a otra cuenta Administrador. El SUPER
                        gestiona además las cuentas Administrador (cambiar su
                        rol y activarlas/desactivarlas).
Actores                 Administrador, SUPER
Precondiciones
    1.​ La aplicación debe estar operativa en el entorno de AWS.
    2.​ El actor (Administrador o SUPER) debe haber iniciado sesión
        exitosamente (RN-0003, RF-001).
Flujo Básico
    1.​ El actor (Administrador o SUPER) ingresa al módulo de Usuarios desde la
        sección "Usuarios" del menú lateral.
    2.​ El sistema muestra una grilla con los usuarios registrados, indicando el
        Usuario (nombre y correo), el Rol, el Estado (Activo/Inactivo), la fecha de
        creación (Creado) y las Acciones (cambiar rol/desactivar).
    3.​ El actor hace clic en el botón "Crear usuario".
    4.​ El sistema despliega un formulario solicitando: Nombre Completo, Correo
        Electrónico (Email) y un selector desplegable para asignar el Rol. El selector
        solo ofrece roles asignables (Administrador, Ejecutivo, Visualizador); el rol
        SUPER nunca aparece.
    5.​ El actor completa los datos y presiona "Guardar".
    6.​ El backend registra al usuario en la base de datos y delega la creación de la
        identidad de forma segura al servicio de autenticación.


---

## Página 26

    7.​ El sistema muestra una notificación de éxito, actualiza la grilla y se dispara
        automáticamente un correo de bienvenida al nuevo usuario para que
        configure su contraseña (RF-015).
Flujo Alternativo
Correo ya registrado (Duplicado)
    1.​ En el paso 6, se detecta que el email ingresado ya existe.
    2.​ El sistema aborta la creación y muestra una alerta: "El correo ya está
        asociado a una cuenta existente".
Cambio de Rol de un usuario existente
    1.​ El actor selecciona un usuario de la grilla y presiona el botón “...”
        (columna “Acciones”) al costado de este.
    2.​ El Administrador cambia el rol asignado y guarda. Un Administrador solo
        puede cambiar el rol de cuentas Administrador Ejecutivo y Visualizador; el
        rol de una cuenta Administrador solo puede modificarlo el SUPER
        (RF-020). Ningún actor puede cambiar su propio rol.
    3.​ El sistema actualiza el registro y remueve la sesión del usuario. Los
        nuevos permisos se aplicarán la próxima vez que el usuario afectado
        inicie sesión.
Desactivación de Usuario
    1.​ En el paso 2, el usuario selecciona el botón “Desactivar” según su alcance:
        el Administrador solo cuentas Ejecutivo y Visualizador, y el SUPER también
        cuentas Administrador (RF-020). Ningún actor puede desactivar su propia
        cuenta.
    2.​ El sistema actualiza el estado e inhabilita al usuario, la sesión se elimina y el
        usuario pierde inmediatamente la capacidad de hacer login en el sistema.
Reactivación de cuenta
    3.​ En el paso 2, el actor reactiva una cuenta en estado Inactivo dentro de su
        alcance: el Administrador, cuentas Ejecutivo y Visualizador; el SUPER
        cuentas Administrador.
    4.​ El sistema restablece el acceso del usuario; las cuentas nunca se eliminan
        físicamente, solo alternan entre Activo e Inactivo.
Post Condiciones
    1.​ El nuevo usuario queda registrado en la infraestructura y listo para
        configurar sus credenciales de acceso (RN-0001).
Restricciones
    -​   Ningún actor digita contraseñas manuales por razones de seguridad; la
         credencial inicial se delega al proceso de recuperación/bienvenida del
         servicio de autenticación.


---

## Página 27

    -​   El Administrador puede crear cuentas Ejecutivo y Visualizador, y solo puede
         editar, cambiar el rol o desactivar cuentas Ejecutivo y Visualizador; no puede
         modificar ni desactivar a otra cuenta Administrador (reservado al SUPER,
         RN-0026) o SUPER.
    -​   El sistema no admite eliminación física de cuentas: la baja es siempre lógica
         (estado Inactivo).
    -​   El SUPER es el único que puede cambiar el rol o desactivar cuentas
         Administrador (RN-0026, RF-020)
    -​   La cuenta SUPER no puede ser modificada por ningún actor, ni siquiera por
         sí misma (RN-0025)
    -​   Ningún actor puede asignar el rol SUPER, es una cuenta única creada en el
         bootstrap, cualquier intento se rechaza con HTTP 403 (RN-0025).
    -​   Ningún usuario puede cambiar su propio rol ni desactivar su propia cuenta
         (RN-0020)
    -​   Asignación de rol estático obligatoria (RN-0004, RN-0008).
Casos de Uso Padre
CU001 (Autenticación de inicio de sesión)
CU002 (Visualización de Roles)
Diagrama de caso de uso
Prototipo


### Tabla estructurada detectada

| -​ | El Administrador puede crear cuentas Ejecutivo y Visualizador, y solo puede |
| --- | --- |
| -​ | El sistema no admite eliminación física de cuentas: la baja es siempre lógica |
| -​ | El SUPER es el único que puede cambiar el rol o desactivar cuentas |
| -​ | La cuenta SUPER no puede ser modificada por ningún actor, ni siquiera por |
| -​ | Ningún actor puede asignar el rol SUPER, es una cuenta única creada en el |
| -​ | Ningún usuario puede cambiar su propio rol ni desactivar su propia cuenta |
| -​ | Asignación de rol estático obligatoria (RN-0004, RN-0008). |


---

## Página 28

CU004: Gestión de Proveedores
                         Permite al usuario registrar, buscar, visualizar, editar y
Descripción              cambiar el estado (activar/desactivar) de los proveedores
                         del catálogo.
Actores                  Administrador, Ejecutivo
Precondiciones
    1.​ La aplicación debe estar operativa en el entorno de AWS.
    2.​ El usuario debe haber iniciado sesión exitosamente.
    3.​ El usuario debe poseer un rol con el permiso habilitado para interactuar
        con el módulo de Proveedores (RN-0003).
Flujo Básico
    1.​ El usuario accede a la sección "Proveedores" desde el menú lateral
        izquierdo.
    2.​ El sistema carga la interfaz principal listando los proveedores existentes en
        una grilla de datos (Razón social, RUC, email, teléfono, actualizado, estado,
        acciones (editar, desactivar)).
    3.​ El usuario hace clic en el botón "Nuevo Proveedor".
    4.​ El sistema despliega el panel lateral "Crear Proveedor" (subtítulo "Nuevo
        registro en el maestro"), solicitando los datos requeridos por la base de
        datos maestra (Razón Social/Nombre, RUC, Descripción, Contacto (email
        de la empresa) y número de teléfono).
    5.​ El usuario completa la información y hace clic en "Guardar".
    6.​ El backend valida la información: evalúa la duplicidad por RUC, razón social,
        email y teléfono (un conflicto en cualquiera de estos campos rechaza el
        registro) y verifica la consistencia; si es válida, persiste el nuevo registro en
        la base de datos.
    7.​ El sistema muestra una notificación de éxito ("Proveedor [Nombre] creado
        correctamente") y la grilla se actualiza dinámicamente incluyendo el nuevo
        registro con estado "Activo".


---

## Página 29

Flujo Alternativo
Proveedor o RUC duplicado
    1.​ En el paso 6, el sistema identifica que la Razón Social, el RUC, el email, el
        teléfono ya existen en la base de datos.
    2.​ El sistema aborta la inserción y muestra un mensaje de error según el
        campo en conflicto: por RUC, "El RUC ya está registrado para otro
        proveedor."; por correo, "El correo electrónico ya está registrado para otro
        proveedor."; y un mensaje genérico de respaldo, "Ya existe el proveedor
        [Razón Social] con RUC [RUC]. Revisa la lista (incluye inactivos) o usa otro
        RUC.".
Búsqueda y Filtrado
    1.​ El usuario utiliza la barra de búsqueda para encontrar un proveedor por
        nombre, email, RUC o Descripción, o utiliza el selector "Todos los
        estados" para filtrar por Activo/Inactivo.
    2.​ El sistema filtra los resultados de la grilla en tiempo real.
Edición o Desactivación (Cambio de Estado)
    1.​ El usuario hace clic en el botón con ícono de lápiz (columna Acciones) de
        un proveedor específico en la grilla; el sistema despliega el panel lateral
        "Editar proveedor" (subtítulo "Razón social y RUC no son editables"),
        donde solo se editan los datos de contacto (email y teléfono).
    2.​ El sistema guarda los cambios, muestra la notificación "Proveedor
        actualizado" y actualiza la fila en la grilla.
    1.​ El usuario hace clic en el botón con ícono de apagado (columna
        Acciones) de un proveedor específico en la grilla; el sistema abre un
        diálogo de confirmación titulado "Desactivar" o "Activar" según el estado
        actual.
    2.​ Al confirmar, el sistema guarda el nuevo estado, muestra el toast
        "Proveedor desactivado" o "Proveedor activado" y actualiza la columna de
        estado (Activo/Inactivo).
Post Condiciones
    1.​ Si se registra o activa un proveedor, este queda inmediatamente habilitado y
        visible en el listado desplegable del módulo "Cargar plantilla" para empezar
        a recibir catálogos (RF-003).
    2.​ Si se desactiva un proveedor, este queda inmediatamente deshabilitado
        para su uso y visualización en el listado desplegable del módulo “Cargar
        plantilla” para recibir catálogos.
Restricciones
    -​   Un proveedor no se elimina físicamente de la base de datos; únicamente
         puede ser desactivado (baja lógica), conservando su historial de archivos
         y productos asociados.


---

## Página 30

    -​   El RUC debe tener exactamente 11 dígitos y ser único (RN-0015); la
         Razón Social, el email, el teléfono también deben ser únicos. El teléfono
         debe registrarse con prefijo internacional de país válido (RN-0022).
Casos de Uso Padre
CU001 (Autenticación de inicio de sesión)
Diagrama de caso de uso
Prototipo


---

## Página 31

CU005: Gestión de Categorías y Subcategorías
                        Permite al Administrador estructurar y administrar el árbol
                        jerárquico de taxonomía del catálogo maestro. Este
                        módulo es crítico ya que define los segmentos que
Descripción
                        componen el código NetSuite autogenerado para cada
                        producto.
Actores                 Administrador, Ejecutivo
Precondiciones
    1.​ La aplicación debe estar operativa en el entorno de AWS.
    2.​ Rol con permisos habilitados para el módulo (RN-0003, RN-0005, RN-0006).
Flujo Básico (Creación de Categoría)
    1.​ El Administrador selecciona "Categorías" en el menú lateral izquierdo.
    2.​ El sistema muestra un árbol expandible con las categorías y
        subcategorías asociadas.
    3.​ El Administrador hace clic en el botón "Nueva Categoría".
    4.​ El sistema despliega un formulario solicitando: Código de 2 letras,
        Nombre y Descripción.
    5.​ El Administrador completa los datos y presiona "Guardar".
    6.​ El sistema valida que el nombre y el código de letras sean únicos en todo
        el catálogo maestro. Para la unicidad del nombre, la comparación
        normaliza mayúsculas/minúsculas y los espacios sobrantes ("Audio Pro"
        se considera igual a "audio pro").
    7.​ Se muestra un toas que dice “Categoría [Categoría] creada
        correctamente”
    8.​ El sistema persiste la categoría en la base de datos y actualiza la vista del
        árbol.
Flujo Básico (Creación de Subcategoría)
    1.​ Dentro de la vista de categorías, el Administrador hace clic en el botón
        "Nueva Subcategoría" ubicado dentro de expandir una categoría
        específica.
    2.​ El sistema solicita: Nombre y Descripción.
    3.​ El Administrador completa la información y presiona "Guardar".
    4.​ El sistema asigna automáticamente de manera secuencial dentro de esa
        categoría padre (En caso el nombre de la subcategoría sea “Packs”, el
        código número debe ser forzosamente 20) y valida que el nombre no esté
        repetido.
    5.​ El sistema persiste la subcategoría (tabla subcategory), inicializa la
        secuencia actual en 01 para los nuevos productos y actualiza el árbol.
Flujo Alternativo
Código Duplicado


---

## Página 32

    1.​ En el paso 6 (Categoría), el sistema detecta que el código ingresado ya
        existe.
    2.​ El sistema bloquea el guardado y muestra una alerta: "El código ya está
        registrado. Usa uno distinto".
Edición y Desactivación
    1.​ El Administrador selecciona una categoría o subcategoría existente y
        presiona el símbolo del lápiz (Editar (categoría o subcategoría)).
    2.​ Modifica los campos permitidos y guarda los cambios. La edición y la
        desactivación están reservadas al Administrador; el Ejecutivo únicamente
        puede crear categorías y subcategorías.
    3.​ Si se desactiva una categoría, todas sus subcategorías asociadas quedan
        inhabilitadas para nuevas cargas de productos (RN-0053).
Post Condiciones
    1.​ La estructura queda disponible para el mapeo de productos durante la
        ingesta de archivos.
    2.​ Se habilita la generación automática del serial de producto basado en la
        secuencia de la subcategoría creada.
Restricciones
    -​   Sin eliminación física: las categorías y subcategorías no se eliminan;
         únicamente se desactivan (baja lógica), conservando su historial. Las
         categorías y subcategorías inactivas quedan excluidas del proceso de
         categorización automática; cualquier producto asignado a una inactiva se
         retiene para revisión manual (RN-0053).
    -​   Formato estricto: el código de categoría es de 2 letras; el código de
         subcategoría es de 2 dígitos numéricos del 01 al 99, asignados
         automáticamente por el sistema de manera secuencial (RN-0036). El
         código 20 está reservado exclusivamente para la subcategoría cuyo
         nombre es Packs: dicha subcategoría recibe obligatoriamente el código
         20 y ninguna otra puede usarlo (RN-0039).
    -​   El código asignado debe ser único y no pertenecer ya a otra
         categoría/subcategoría existente (RN-0017).
    -​   El rol Ejecutivo solo puede editar y desactivar categorías y subcategorías.
         Las operaciones de desactivación de entidades existentes y la
         modificación de códigos de categoría están reservadas al Administrador
         por impacto directo en el código NetSuite
Casos de Uso Padre
CU001 (Autenticación de inicio de sesión)
Diagrama de caso de uso


### Tabla estructurada detectada

| -​ | Sin eliminación física: las categorías y subcategorías no se eliminan; |
| --- | --- |
| -​ | Formato estricto: el código de categoría es de 2 letras; el código de |
| -​ | El código asignado debe ser único y no pertenecer ya a otra |
| -​ | El rol Ejecutivo solo puede editar y desactivar categorías y subcategorías. |


---

## Página 33

Prototipo
CU006: Gestión de Productos
                        Permite a los usuarios consultar, buscar, filtrar y visualizar
                        el detalle de todos los productos consolidados y saneados
Descripción
                        en el sistema. Funciona como la única fuente antes de
                        realizar cualquier exportación.
Actores                 Administrador, Ejecutivo, Visualizador (solo lectura)
Precondiciones
    1.​ La aplicación debe estar operativa en el entorno de AWS.
    2.​ El usuario debe haber iniciado sesión exitosamente.
    3.​ Permisos de lectura y cambio de estado según el rol (RN-0003)
Flujo Básico
    1.​ El usuario selecciona la opción "Productos" en el menú lateral izquierdo.
    2.​ El sistema consulta la base de datos (DynamoDB) y carga una grilla de
        datos paginada mostrando: Código NS (NetSuite), SKU, Nombre,
        Categoría, Precio (soles) sin IGV, Estado (Activo/Inactivo) y Acciones.
    3.​ El usuario hace clic en la acción "Ver detalle" (icono de ojo) en acciones.
    4.​ El sistema despliega la Ficha de Detalle del Producto


---

## Página 34

Flujo Alternativo
Desactivación de Producto (Soft Delete)
    1.​ En la vista de detalle o desde la grilla, el usuario cambia el estado del
        producto a "Inactivo".
    2.​ El sistema actualiza el estado. El producto ya no será incluido en futuras
        generaciones de plantillas de salida (CU012), pero se mantiene el
        histórico por integridad de datos.
Post Condiciones
    1.​ Todo cambio de estado de un producto (Activo/Inactivo) es capturado en
        tiempo real por DynamoDB.
Restricciones
    -​   El producto no puede ser editado una vez que ha sido persistido en el
         catálogo.
    -​   Por reglas de auditoría corporativa, los productos no pueden ser borrados
         de la base de datos, solo pueden ser pasados a estado "Inactivo".
    -​   El Código de NetSuite debe ser único y no duplicable (RN-0027).
Casos de Uso Padre
CU001 (Autenticación de inicio de sesión)
Diagrama de caso de uso
Prototipo


### Tabla estructurada detectada

| -​ | El producto no puede ser editado una vez que ha sido persistido en el |
| --- | --- |
| -​ | Por reglas de auditoría corporativa, los productos no pueden ser borrados |
| -​ | El Código de NetSuite debe ser único y no duplicable (RN-0027). |


---

## Página 35

CU007: Carga y Detección de Archivo
                       Permite al usuario seleccionar un proveedor y cargar un
                       archivo Excel para iniciar el proceso de ingesta. El
                       sistema realiza validaciones preventivas en el cliente y
Descripción
                       ejecuta un parser automático para detectar la estructura
                       técnica del archivo (cabeceras y columnas), en caso sean
                       múltiples hojas el sistema lanza error.
Actores                Administrador, Ejecutivo
Precondiciones
    1.​ El usuario debe estar autenticado en el sistema (CU001).
    2.​ El proveedor debe estar previamente registrado y en estado activo
        (CU004).
    3.​ Los servicios de almacenamiento de archivos y de procesamiento del
        backend deben estar operativos en la infraestructura.
    4.​ Debe seleccionarse un proveedor activo obligatoriamente antes de cargar
        (RN-0011, RN-0029, RF-002).
Flujo Básico
    1.​ El usuario accede a la sección "Cargar plantilla" desde el menú lateral
        izquierdo.
    2.​ El usuario selecciona un proveedor del listado desplegable (selector con
        búsqueda).
    3.​ El usuario arrastra el archivo al área de Dropzone o lo selecciona desde
        su explorador local.
    4.​ El sistema valida que el archivo tenga un formato compatible (.xlsx o
        .csv), que el límite de tamaño (5 MB), que máximo hayan habido 5 cargas
        en los últimos 10 minutos por usuario, si tiene una sola hoja en el excel
        (RN-0046, RF-036), si tiene al menos una fila que funcione como
        cabecera con etiquetas legibles (no con datos numéricos o SKUs
        directamente), si tiene al menos una fila de datos debajo de las
        cabeceras, si al menos una columna tiene un nombre reconocible como


---

## Página 36

        SKU y si al menos una columna tiene un nombre reconocible como precio
        (RF-034).
    5.​ Al confirmar, el frontend envía el archivo al backend, que lo almacena en
        el repositorio de archivos.
    6.​ Tras la carga, el backend ejecuta de forma asíncrona el motor de
        detección estructural; el frontend consulta el estado del procesamiento
        hasta que finaliza.
    7.​ El sistema identifica la hoja activa (única hoja permitida, RN-0046),
        localiza la fila de encabezados y contabiliza las columnas totales. El
        criterio es el siguiente: entre las primeras 20 filas, el sistema selecciona la
        que mejor puntúa como cabecera, la fila con más celdas que parecen
        etiquetas de texto (penalizando celdas numéricas o con datos) y con al
        menos 2 celdas con contenido; si la fila candidata contiene datos (SKU,
        precios) en más de la mitad de sus celdas, el archivo se rechaza por no
        tener cabeceras válidas. Tras la cabecera, se omiten hasta 3 filas de
        instrucciones o ejemplos antes de los datos.
    8.​ El sistema captura las primeras filas como muestra de la estructura
        detectada. La previsualización en pantalla se presenta más adelante, en
        la etapa de Mapeo (CU008): allí el usuario ve las primeras filas (hasta 5)
        ya emparejadas según el mapeo y valida la lectura antes de confirmar.
Flujo Alternativo
Archivo excede los límites
    1.​ El usuario intenta cargar un archivo que pesa más de 5MB
    2.​ El backend rechaza la carga y el frontend muestra el error: "El archivo es
        demasiado grande para subirlo. Reduce su tamaño e inténtalo de nuevo.
Formato no compatible
    1.​ El usuario sube un archivo con extensión diferente a .xlsx o .csv.
    2.​ El sistema rechaza el archivo e indica los formatos permitidos.
Detección de cabeceras
    1.​ En el paso 6, el backend compara las cabeceras extraídas del nuevo
        archivo con la configuración de mapeo guardada para ese proveedor.
    2.​ Si detecta una discrepancia estructural (columnas renombradas,
        eliminadas o añadidas), el sistema deriva el flujo al re-mapeo semántico
        (CU008), donde la IA propone un nuevo emparejamiento que el usuario
        revisa y confirma con "Guardar plantilla y continuar"; el detalle del mapeo
        se describe en CU008 y no se repite aquí.
Post Condiciones
    1.​ El archivo original queda almacenado en la base de datos para auditoría y
        futuras consultas (RF-006).
    2.​ Se crea un registro de sesión de carga (supplier_upload) en la base de
        datos con estado "Cargado".
    3.​ El sistema queda habilitado para proceder al Mapeo Semántico (CU008).
Restricciones
    -​   El archivo debe ser .xlsx o .csv (RN-0012, RF-004).


---

## Página 37

    -​   No debe superar los 5MB (RNF-0007).
    -​   Se verifica que las cabeceras coincidan con la plantilla predefinida o se
         notifica (RN-0016).
    -​   Los valores de precio del archivo no pueden contener letras ni ser
         negativos; de detectarse, el sistema rechaza la carga inmediatamente
         (RF-040, RN-0051).
Casos de Uso Padre
CU001 (Autenticación), CU004 (Gestión de Proveedores)
Diagrama de caso de uso
Prototipo
CU008: Mapeo Semántico de Columnas


### Tabla estructurada detectada

| -​ | No debe superar los 5MB (RNF-0007). |
| --- | --- |
| -​ | Se verifica que las cabeceras coincidan con la plantilla predefinida o se |
| -​ | Los valores de precio del archivo no pueden contener letras ni ser |


---

## Página 38

                         El sistema utiliza un motor de IA para analizar
                         semánticamente las cabeceras detectadas en el archivo
Descripción              del proveedor y sugerir su vinculación con los campos de
                         la Base de Datos Maestra. El usuario actúa como
                         validador final de esta sugerencia.
Actores                  Administrador, Ejecutivo
Precondiciones
    1.​ El archivo debe haber sido cargado y analizado estructuralmente con
        éxito (CU007).
    2.​ El motor de IA debe estar disponible y configurado.
Flujo Básico
    1.​ El sistema verifica si el proveedor ya cuenta con una plantilla de mapeo
        guardada para esa estructura específica.
    2.​ Al no existir una plantilla previa, el sistema envía los nombres de las
        columnas detectadas y los nombres de los campos maestros al motor de
        IA.
    3.​ La IA procesa la relación y devuelve una sugerencia de mapeo.
    4.​ El sistema despliega la interfaz de mapeo mostrando las columnas del
        proveedor a la izquierda y los campos sugeridos de la base de datos
        maestra a la derecha.
    5.​ El usuario revisa la propuesta, realiza ajustes manuales si es necesario
        mediante selectores desplegables y presiona "Guardar plantilla y
        continuar".
    6.​ El sistema guarda esta configuración como una nueva plantilla asociada
        al proveedor para automatizar futuras cargas.
Flujo Alternativo
Existencia de Plantilla Previa
    1.​ En el paso 1, el sistema reconoce la estructura del archivo.
    2.​ El sistema aplica el mapeo guardado automáticamente y muestra una
        notificación al usuario ("La plantilla tiene las mismas columnas que una
        carga anterior. Se reutilizó el mapeo anterior.") antes de saltar a la
        visualización para confirmación rápida.
Fallo en la API de IA (Resiliencia)
    1.​ En el paso 2, la conexión con el motor de IA falla o excede el tiempo de
        espera.
    2.​ El sistema aplica los reintentos automáticos del motor de IA (hasta 5, con
        backoff exponencial).
    3.​ Si el fallo persiste, la carga se marca como fallida y el frontend muestra el
        mensaje "No se pudo contactar la API de Claude para analizar el archivo.
        Intenta nuevamente en unos minutos."; el usuario debe volver a cargar el
        archivo desde el inicio (no hay reanudación automática).
Mapeo Ambiguo o de Baja Confianza
    1.​ La IA devuelve un mapeo con un nivel de confianza bajo para ciertos
        campos.


---

## Página 39

    2.​ El sistema muestra el nivel de confianza (porcentaje) de cada
        emparejamiento para que el usuario revise los de menor coincidencia.
Post Condiciones
    1.​ La plantilla de mapeo queda persistida en el registro del proveedor
        (template_column_mappings) (RN-0013)
    2.​ El sistema queda habilitado para iniciar la normalización de datos y la
        detección de duplicados (CU009).
Restricciones
    -​   Costo Operativo: Solo se realiza una llamada lógica a la IA por cada
         estructura de archivo nueva detectada (con hasta 5 reintentos
         automáticos ante fallos transitorios).
    -​   El sistema debe emparejar las cabeceras; si hay inconsistencias se alerta
         al UI para corrección (RN-0016).
    -​   Integridad: El usuario no puede avanzar si existen columnas críticas
         (como SKU o Precio) que no han sido mapeadas a un campo maestro o si
         existen dos columnas mapeadas al mismo campo.
    -​   La confirmación del mapeo debe realizarse en ≤ 10 min; vencido el plazo,
         el lote expira (RNF-0022).
Casos de Uso Padre
CU001 (Autenticación)
CU007 (Carga y Detección de Archivo)
Diagrama de caso de uso
Prototipo


### Tabla estructurada detectada

| -​ | Costo Operativo: Solo se realiza una llamada lógica a la IA por cada |
| --- | --- |
| -​ | El sistema debe emparejar las cabeceras; si hay inconsistencias se alerta |
| -​ | Integridad: El usuario no puede avanzar si existen columnas críticas |
| -​ | La confirmación del mapeo debe realizarse en ≤ 10 min; vencido el plazo, |


---

## Página 40

CU009: Saneamiento y Resolución de Conflictos
Descripción           El sistema permite al usuario validar, corregir y aprobar los


---

## Página 41

                        productos procesados tras la ingesta. En esta etapa se
                        resuelven las inconsistencias técnicas (normalización) y
                        de negocio (coincidencias o campos faltantes) para
                        garantizar que solo información de alta calidad llegue al
                        catálogo maestro.
Actores                 Administrador, Ejecutivo
Precondiciones
    1.​ El usuario debe haber iniciado sesión exitosamente.
    2.​ Se debe haber completado la carga y el mapeo de columnas (CU007 y
        CU008).
    3.​ El backend debe haber finalizado el proceso de normalización de datos
        (RF-005).
Flujo Básico
    1.​ El sistema muestra los KPIs del lote (Total Procesados, Nuevos,
        Duplicados Detectados, Coincidencias y Errores) y una barra de
        navegación con un tab por KPI para su revisión (Nuevos, Duplicados
        Detectados, Coincidencias y Errores).
    2.​ Para los productos del tab "Nuevos", el usuario puede aprobar cada uno
        con el botón de check individual o usar "Confirmar todos" para aprobar
        todos de una vez; los no marcados explícitamente se aprueban por
        defecto al confirmar el lote. La creación en el catálogo se realiza al
        presionar "Confirmar Lote".
    3.​ Al confirmar, el sistema persiste en el Catálogo Maestro todos los
        productos aprobados y genera automáticamente el Código NetSuite para
        cada uno.
    4.​ El sistema muestra una pantalla de resultados con el resumen del lote
        (creados, actualizados, rechazados, ya existían y con error) y el Código
        NetSuite de cada producto creado.
Flujo Alternativo
Bloqueo Duro (Error Crítico)
    1.​ El sistema detecta que un registro no tiene Precio (con IGV) o SKU
        (campos obligatorios), o que la IA no pudo asignarle
        categoría/subcategoría con confianza suficiente.
    2.​ El producto cae en el tab "Errores" y su botón de aprobación permanece
        desactivado con un indicador visual que señala el problema.
    3.​ El usuario debe usar la acción "Completar campos" (ícono de lápiz),
        corregir los datos en el modal de edición y guardar para habilitar la
        aprobación.
    4.​ Si el usuario no corrige ni rechaza explícitamente el registro, este se omite
        al confirmar el lote.
Bloqueo Blando (Detección de Coincidencias/Duplicados)
    1.​ El sistema identifica una posible coincidencia por coincidencia exacta de
        SKU.


---

## Página 42

    2.​ El producto cae en el tab Duplicados Detectados con las opciones:
        Combinar o Rechazar nuevo (RN-0043).
    3.​ Si el usuario elige Combinar: el producto existente se actualiza con los
        datos del nuevo. El precio oficial del catálogo se conserva; el operador
        puede sobreescribirlo manualmente en el panel de revisión.
    4.​ Si el usuario elige Rechazar nuevo: el producto entrante se descarta sin
        modificar el existente.
    5.​ Si el usuario no toma ninguna decisión, el producto se omite al confirmar
        el lote.
Coincidencias (similitud por nombre, descripción o especificaciones ≥ 80 %, sin
match exacto de SKU (RN-0050))
    1.​ El sistema detecta que el producto entrante es probable que ya exista en
        el catálogo.
    2.​ El producto cae en el tab Coincidencias. El usuario debe decidir antes de
        poder confirmar el lote; sin decisión, el botón "Confirmar Lote" permanece
        bloqueado.
    3.​ Las opciones disponibles son: Combinar, Mantener ambos o Rechazar
        nuevo (RN-0043).
    4.​ Si el usuario elige Combinar: igual que en Duplicados — actualiza el
        existente con el precio del catálogo conservado; el operador puede
        sobreescribirlo manualmente.
    5.​ Si el usuario elige Mantener ambos: el producto entrante se crea como un
        registro separado en el catálogo.
    6.​ Si el usuario elige Rechazar nuevo: el producto entrante se descarta.
Rechazo de Producto
    1.​ En el tab Nuevos, el usuario puede marcar cualquier producto con el
        ícono de rechazo (X).
    2.​ El producto queda marcado visualmente como rechazado; el usuario
        puede revertirlo en cualquier momento con el ícono de aceptar (check).
    3.​ Al confirmar el lote, los productos marcados como rechazados se omiten y
        no se guardan en el catálogo.
Post Condiciones
    1.​ Los registros aprobados quedan disponibles inmediatamente en el
        Catálogo Maestro (CU006) para su exportación.
    2.​ El estado del lote se actualiza a "Completado" una vez procesados todos
        los items.
    3.​ Productos aprobados persisten en base de datos Maestra (RF-006).
Restricciones
    -​   Validación Humana Obligatoria (RF-006): Ningún producto persiste en la
         base de datos definitiva sin una confirmación explícita del usuario.
    -​   Toda confirmación, rechazo o fusión de productos ejecutada en este
         módulo queda registrada en el log de auditoría (RNF-0008).
    -​   La revisión debe completarse en ≤ 30 min y la ejecución global del lote en
         ≤ 2 h; vencido cualquiera, el lote expira (RNF-0022).
Casos de Uso Padre


### Tabla estructurada detectada

| -​ | Validación Humana Obligatoria (RF-006): Ningún producto persiste en la |
| --- | --- |
| -​ | Toda confirmación, rechazo o fusión de productos ejecutada en este |
| -​ | La revisión debe completarse en ≤ 30 min y la ejecución global del lote en |


---

## Página 43

CU001 (Autenticación), CU007 (Carga de Archivo), CU008 (Mapeo Semántico)
Diagrama de caso de uso
Prototipo


---

## Página 44

CU010: Mapeo de Categorías por Cliente
                       Permite al Administrador o Ejecutivo seleccionar qué
                       categorías de la Base de Datos Maestra se exportan a
                       una plataforma (cliente destino). Esta configuración
Descripción
                       predefinida garantiza que el motor de exportación
                       estructure los archivos de salida de forma instantánea y
                       determinista.
Actores                Administrador, Ejecutivo
Precondiciones
    1.​ La aplicación debe estar operativa en el entorno de AWS.
    2.​ El usuario debe haber iniciado sesión exitosamente.
    3.​ El usuario debe poseer un rol con el permiso habilitado para interactuar
        con el módulo de Proveedores (RN-0003).
    4.​ El árbol de Categorías y Subcategorías maestras debe existir en la base
        de datos (CU005).


---

## Página 45

    5.​ El Cliente Destino debe haber sido registrado previamente en el sistema
        (CU004).
Flujo Básico
    1.​ El usuario accede a la sección "Plataformas" desde el menú lateral.
        (RN-0003, RF-039)
    2.​ El sistema muestra la tabla de plataformas registradas.
    3.​ El usuario hace clic en el ícono de categorías de la plataforma deseada.
    4.​ El sistema carga la interfaz de configuración, mostrando todas las
        categorías maestras disponibles con sus estados de selección actuales y
        el total de categorías seleccionadas.
    5.​ El usuario puede buscar categorías por nombre o código mediante la
        barra de búsqueda.
    6.​ El usuario selecciona o deselecciona las categorías que desea vincular a
        la plataforma. Puede usar "Seleccionar todas" o "Deseleccionar todas"
        para operaciones masivas.
    7.​ El usuario presiona el botón "Guardar categorías". (RF-007)
    8.​ El sistema persiste la selección y la vincula a la plataforma.
    9.​ El sistema muestra el mensaje: "Categorías de la plataforma guardadas".
Flujo Alternativo
Error al cargar las categorías
    1.​ El sistema no puede obtener las categorías maestras o la plataforma.
    2.​ El sistema muestra un mensaje de error y un botón "Reintentar".
    3.​ El usuario presiona "Reintentar" y el sistema vuelve a cargar los datos.
Usuario Visualizador (solo lectura)
    1.​ Un usuario con rol Visualizador accede a la configuración de categorías
        de la plataforma.
    2.​ El sistema muestra las categorías en modo de solo lectura, con los
        checkboxes deshabilitados.
    3.​ No se muestran los botones "Seleccionar todas", "Deseleccionar todas" ni
        "Guardar categorías".
Post Condiciones
    1.​ La selección de categorías queda vinculada a la plataforma en la base de
        datos. (RN-0013)
    2.​ El motor de exportación queda habilitado para generar las plantillas de
        salida de este cliente (RF-007, RF-008).
Restricciones
    -​   Solo los productos de las categorías seleccionadas se incluyen en las
         exportaciones del cliente; la selección es determinista. (RF-007)
Casos de Uso Padre
CU001 (Autenticación), CU004 (Gestión de proveedores), CU005 (Gestión de
categorías)


---

## Página 46

Prototipo
CU011: Configuración de Plantillas de Salida
                        Permite al Administrador o Ejecutivo definir la estructura
                        técnica de los archivos (XLSX/CSV) que se enviarán a
                        cada cliente o sistema externo. El usuario configura el
Descripción
                        nombre de las columnas, su orden de aparición y vincula
                        cada una con un campo específico de la Base de Datos
                        Maestra.
Actores                 Administrador, Ejecutivo
Precondiciones
     1.​ La aplicación debe estar operativa en el entorno de AWS.
     2.​ El usuario debe haber iniciado sesión exitosamente.
     3.​ El usuario debe poseer un rol con el permiso habilitado para interactuar
         con el módulo de Proveedores (RN-0003, RN-0005 y RN-0006).
     4.​ El Cliente Destino debe estar registrado en el sistema.


---

## Página 47

    5.​ Los campos de origen deben estar definidos en el esquema de la BD
        Maestra (DynamoDB).
Flujo Básico
    1.​ El usuario accede a la sección "Plataformas" desde el menú lateral.
         (RN-0003, RF-039)
    2.​ El sistema muestra la tabla de plataformas registradas.
    3.​ El usuario hace clic en el ícono de plantillas (plantillas de salida) de la
         plataforma deseada.
    4.​ El sistema carga la plantilla existente para esa plataforma. Si no existe,
         muestra la tabla vacía. (RN-0055)
    5.​ El usuario configura las opciones generales de la plantilla:
              -​ Selecciona el Formato de salida: XLSX o CSV. (RN-0010,
                    RN-0056)
              -​ Activa o desactiva el checkbox "Incluir encabezado". (RN-0056)
    6.​ El usuario presiona "Agregar columna". El sistema añade una fila nueva
         con tipo "Campo del catálogo" por defecto. (RF-009)
    7.​ Por cada columna el usuario define:
              -​ Columna de salida: nombre que tendrá en el archivo exportado.
              -​ Tipo: "Campo del catálogo", "Campo calculado" o "Vacío".
              -​ Campo origen: campo del catálogo maestro (depende del tipo
                    elegido). (RN-0058, RN-0059)
    8.​ El usuario puede reordenar las columnas arrastrando el ícono de agarre
         lateral. (RF-009)
    9.​ El usuario presiona "Guardar plantilla". (RF-008)
    10.​ El sistema persiste la configuración y muestra el mensaje "Plantilla de
         salida guardada". (RN-0055, RF-008)
Flujo Alternativo
Columna de campo calculado
    1.​ En el paso 7 del flujo básico, el usuario selecciona el tipo "Campo
        calculado". (RN-0062)
    2.​ El selector de campo origen muestra los campos calculables disponibles
        (ej. puntos derivados del precio). (RN-0058, RN-0059)
    3.​ El usuario selecciona el campo calculado deseado.
    4.​ Continúa en el paso 8 del flujo básico.
Columna vacía
    1.​ En el paso 7 del flujo básico, el usuario selecciona el tipo "Vacío".
    2.​ El selector de campo origen desaparece (se muestra —). La columna se
        exportará sin valor de origen.
    3.​ Continúa en el paso 8 del flujo básico.
Eliminar una columna
    1.​ El usuario hace clic en el icono de papelera de una fila. (RF-009)
    2.​ El sistema elimina esa fila de la tabla local.
    3.​ El cambio se hace efectivo únicamente al presionar "Guardar plantilla".
        (RF-008)


---

## Página 48

Navegación con cambios sin guardar
    1.​ El usuario modifica la plantilla sin guardar y hace clic en otra sección o
        tab.
    2.​ El sistema interrumpe la navegación y muestra el modal "Cambios sin
        guardar".
    3.​ El usuario elige:
             -​ "Seguir editando": cierra el modal y regresa al editor.
Post Condiciones
    1.​ La plantilla queda vinculada a la plataforma y disponible para el motor de
        exportación. La lista de plataformas se actualiza para reflejar el estado de
        configuración. (RF-010). (RN-0055, RF-008)
    2.​ 2. El estado local del editor se sincroniza con lo persistido (el snapshot
        limpio se actualiza para que el indicador de "cambios sin guardar" se
        resetee).
Restricciones
    -​   No se permite guardar la plantilla si existen campos obligatorios del cliente
         sin un origen asignado.
    -​   El formato del archivo debe respetar estrictamente lo definido por el cliente
         destino (CSV o XLSX) (RN-0010, RN-0056).
    -​   Lógica Determinista: No se permite el uso de IA en este módulo para
         asegurar que el archivo de salida sea exacto y predecible para el ERP
         receptor.
    -​   Las filas sin nombre de columna de salida son ignoradas al guardar (se
         filtran en el cliente antes de enviar).
Casos de Uso Padre
CU001 (Autenticación), CU004 (Registro de proveedores), CU010 (Mapeo de
categorías).
Diagrama de caso de uso


### Tabla estructurada detectada

| -​ | No se permite guardar la plantilla si existen campos obligatorios del cliente |
| --- | --- |
| -​ | El formato del archivo debe respetar estrictamente lo definido por el cliente |
| -​ | Lógica Determinista: No se permite el uso de IA en este módulo para |
| -​ | Las filas sin nombre de columna de salida son ignoradas al guardar (se |


---

## Página 49

Prototipo
CU012: Generación de Archivo de Salida
                       Permite al usuario generar un archivo físico estructurado
                       (XLSX o CSV) a partir de los datos consolidados en el
                       Catálogo Maestro. El motor de exportación aplica de
Descripción
                       manera automática la plantilla de columnas y el
                       diccionario de categorías configurados para el cliente
                       destino.
Actores                Administrador, Ejecutivo
Precondiciones
    1.​ La aplicación debe estar operativa en el entorno de AWS.
    2.​ El usuario debe haber iniciado sesión exitosamente.
    3.​ El usuario debe poseer un rol con el permiso habilitado para interactuar
        con el módulo de Proveedores (RN-0003).


---

## Página 50

    4.​ El Cliente Destino debe contar con una Plantilla de Salida (CU011) y su
        Mapeo de Categorías configurado (CU010).
    5.​ Deben existir productos en estado "Activo" en el Catálogo Maestro
        (CU006).
Flujo Básico
    1.​ El usuario accede a la sección "Exportar" desde el menú lateral izquierdo.
        (RN-0003, RF-039)
    2.​ Selecciona la Plataforma desde el menú desplegable.
    3.​ El sistema carga las opciones de filtro. El usuario aplica los filtros:
        Categoría, Estado del Producto (Todos, Activos o Inactivos) y rango de
        fechas (Desde y Hasta). (RN-0049)
    4.​ El usuario presiona el botón "Generar Archivo". (RF-008)
    5.​ El sistema muestra "Exportación iniciada" y registra la exportación en
        estado "Pendiente". (RN-0061)
    6.​ El sistema actualiza el estado en el Historial de Exportaciones (Pendiente,
        Procesando, Completado), aplicando la plantilla y el mapeo configurados
        en el formato definido. (RN-0010)
    7.​ Con la exportación en "Completado", el usuario presiona "Descargar" y
        obtiene el archivo.
Flujo Alternativo
Sin resultados para los filtros
    1.​ En el paso 4, no existen productos que cumplan los filtros seleccionados.
    2.​ El sistema interrumpe la exportación y notifica: "No hay productos que
        coincidan con los filtros seleccionados".
Post Condiciones
    1.​ El usuario obtiene el archivo listo para importar manualmente al ERP
        NetSuite o plataforma cliente.
    2.​ Archivo estructurado entregado en el formato definido (CSV/XLSX)
        (RN-0010, RF-010).
Restricciones
    -​   La exportación es un proceso determinista. No se utiliza inteligencia
         artificial, para asegurar que el archivo de salida sea exacto y predecible.
    -​   Límite de volumen: la exportación está limitada a un máximo de registros
         por ejecución; si se supera, el archivo se entrega particionado.
    -​   El archivo de exportación expira a los 30 días; la URL de descarga es
         válida 15 min; el registro del trabajo se conserva 90 días (RNF-0023).
Casos de Uso Padre
CU001 (Autenticación), CU006 (Catálogo Maestro), CU010 (Mapeo de Categorías
por Cliente), CU011 (Configuración de Plantillas de Salida).
Diagrama de caso de uso


### Tabla estructurada detectada

| -​ | La exportación es un proceso determinista. No se utiliza inteligencia |
| --- | --- |
| -​ | Límite de volumen: la exportación está limitada a un máximo de registros |
| -​ | El archivo de exportación expira a los 30 días; la URL de descarga es |


---

## Página 51

Prototipo
CU013: Panel de Configuración Para Super
                       Permite al Superusuario (SUPER) acceder a la Gestión de
                       usuarios del sistema para visualizar todas las cuentas,
                       crear nuevas cuentas y administrar las cuentas de
Descripción            Administrador (activación/desactivación y cambio de rol).
                       Este módulo constituye el único punto de acceso funcional
                       disponible para el rol SUPER y se encuentra aislado de
                       las operaciones del negocio.
Actores                SUPER
Precondiciones
    1.​ La aplicación debe estar operativa en el entorno de AWS.
    2.​ El usuario debe haber iniciado sesión exitosamente.
    3.​ El usuario autenticado debe poseer el rol SUPER.


---

## Página 52

    4.​ La cuenta SUPER debe corresponder a la cuenta única creada durante el
        proceso de bootstrap del sistema (RN-0025).
Flujo Básico
    1.​ El Superusuario inicia sesión en la plataforma.
    2.​ El sistema valida que el usuario posee el rol SUPER.
    3.​ El sistema redirige automáticamente a la Gestión de usuarios (única
        funcionalidad del rol SUPER). (RN-0004)
    4.​ El Superusuario visualiza las opciones de administración disponibles:
             ○​ Gestión de cuentas de Administrador.
             ○​ Visualización de todas las cuentas del sistema y activación o
                 desactivación de cualquiera de ellas (baja lógica; sin eliminación
                 física).
             ○​ Modificación de roles asignados a usuarios Administrador.
             ○​ Creación de cuentas de usuario y asignación de roles:
                 Administrador, Ejecutivo o Visualizador. (RF-001, RF-015)
    5.​ El Superusuario selecciona una cuenta de Administrador.
    6.​ El sistema presenta la información y las acciones permitidas.
    7.​ El Superusuario realiza la modificación correspondiente (cambio de rol o
        activación/desactivación). (RF-020, RN-0026)
    8.​ El sistema valida la solicitud y ejecuta la operación.
    9.​ El sistema registra la acción en la auditoría y notifica la ejecución exitosa.
        (RF-010)
Flujo Alternativo
Intento de acceso por un usuario que no es SUPER
En el paso 2, si el usuario autenticado no posee el rol SUPER:
    1.​ El sistema deniega el acceso al panel.
    2.​ Se muestra el mensaje:​
        "No posee permisos para acceder a la Gestión de usuarios."
    3.​ La operación finaliza.
Intento de crear una segunda cuenta SUPER
Durante cualquier operación de creación o actualización de usuarios:
    ●​ Si se intenta asignar el rol SUPER a una nueva cuenta o modificar una
       existente para dicho rol
    ●​ El sistema no debe mostrar la opción de realizar esta operación; es decir, el
       rol SUPER no puede encontrarse en el listado de roles a asignar durante la
       creación. En el caso que esto sea posible, el sistema rechaza la operación
       con código HTTP 403.
    ●​ Se muestra el mensaje:​
       "El rol SUPER es único y no puede ser asignado."
Post Condiciones


---

## Página 53

    1.​ Las modificaciones sobre cuentas de Administrador quedan persistidas en
        la base de datos.
    2.​ Todas las operaciones realizadas quedan registradas para fines de
        auditoría.
    3.​ Se mantiene la unicidad del rol SUPER dentro del sistema.
Restricciones
    El sistema solo puede existir con una única cuenta de rol SUPER (RN-0025).
    El rol SUPER no puede acceder a módulos operativos como:
    ●​   Gestión de Productos.
    ●​   Catálogo Maestro.
    ●​   Gestión de Proveedores.
    ●​   Gestión de Categorías.
    ●​   Plantillas de Salida.
    ●​   Exportaciones.
    ●​   Dashboard de Métricas.
    El rol SUPER únicamente tiene acceso a la Gestión de usuarios (RN-0004).
    Las operaciones sobre cuentas de Administrador no están sujetas a
         restricciones jerárquicas para el SUPER (RN-0026).
    Ningún Administrador podrá modificar o desactivar a otro Administrador;
         dichas acciones quedan reservadas exclusivamente al SUPER
         (RN-0026).
Casos de Uso Padre
CU001 (Autenticación) CU003 (Gestión de Usuarios).
Diagrama de caso de uso
Prototipo


### Tabla estructurada detectada

| ●​ | Gestión de Productos. |
| --- | --- |
| ●​ | Catálogo Maestro. |
| ●​ | Gestión de Proveedores. |
| ●​ | Gestión de Categorías. |
| ●​ | Plantillas de Salida. |
| ●​ | Exportaciones. |
| ●​ | Dashboard de Métricas. |


---

## Página 54

 ○​ DIAGRAMA DE SECUENCIA
Caso de Uso             CU001 Autenticación de inicio de sesión
Diagrama de Secuencia


---

## Página 55

Caso de Uso             CU002 Visualización de Roles
Diagrama de Secuencia


---

## Página 56

Caso de Uso             CU003 Gestión de usuarios
Diagrama de Secuencia


---

## Página 57

Caso de Uso             CU004 Gestión de proveedores
Diagrama de Secuencia


---

## Página 58

Caso de Uso             CU005 Gestión de categorías y subcategorías
Diagrama de Secuencia


---

## Página 59

Caso de Uso             CU006 Gestión del Catálogo Maestro de productos
Diagrama de Secuencia


---

## Página 60

Caso de Uso             CU007 Carga y detección de archivos
Diagrama de Secuencia


---

## Página 61

Caso de Uso             CU008 Mapeo semántico de Columna
Diagrama de Secuencia


---

## Página 62

Caso de Uso             CU009 Saneamiento y Resolución de conflictos
Diagrama de Secuencia


---

## Página 63

Caso de Uso             CU010 Mapeo de Categorías por cliente
Diagrama de Secuencia


---

## Página 64

Caso de Uso             CU011 Configuración de Plantillas de Salida
Diagrama de Secuencia


---

## Página 65

Caso de Uso             CU012 Generación de Archivo de Salida
Diagrama de Secuencia


---

## Página 66

Caso de Uso             CU013 Panel de Configuración Avanzada
Diagrama de Secuencia


---

## Página 67

○​    REQUERIMIENTOS FUNCIONALES
                                                                    Reglas de
     N°         Descripción del Requerimiento Funcional                          Prioridad
                                                                     Negocio
       El sistema debe contar con una cuenta SUPER; este podrá
                                                                      RN-0001
RF-001 asignar roles (Admin, Ejecutivo, Viewer), cada uno con                   MUST HAVE
                                                                      RN-0002
       permisos de acceso específicos.
       El sistema debe permitir la creación, lectura, actualización y
       desactivación de registros de proveedores. Es obligatorio
       como paso previo a la carga de archivos: toda carga se RN-0015
RF-002                                                                          MUST HAVE
       realiza en nombre de un proveedor registrado y activo, y los RN-0029
       productos de ese archivo quedan vinculados a dicho
       proveedor.
                                                                      RN-0017
       El sistema debe permitir la creación, lectura, actualización y RN-0027
RF-003                                                                          MUST HAVE
       desactivación de categorías y subcategorías.                   RN-0028
                                                                      RN-0053


### Tabla estructurada detectada

| ○​ | REQUERIMIENTOS FUNCIONALES |  |
| --- | --- | --- |
| N° | Descripción del Requerimiento Funcional | Prioridad |
| RF-001 asignar roles (Admin, Ejecutivo, Viewer), cada uno con | MUST HAVE |  |
| RF-002 | MUST HAVE |  |
| RF-003 | MUST HAVE |  |
| desactivación de categorías y subcategorías. | RN-0028 |  |


---

## Página 68

       El sistema debe proporcionar al Administrador y al Ejecutivo RN-0011
       la funcionalidad necesaria para cargar archivos de datos de RN-0012
RF-004 proveedores a través de la interfaz del Módulo de Ingesta RN-0013             MUST HAVE
       para su posterior normalización y procesamiento mediante RN-0016
       inteligencia artificial.                                     RN-0024
         Antes de la validación final, el sistema debe ejecutar un
         proceso de normalización. Esto incluye: eliminar símbolos de
         moneda de campos numéricos, convertir formatos de fecha a
                                                                          RN-0042,
         un        estándar         único,      estandarizar        texto
                                                                          RN-0043,
         (mayúsculas/minúsculas) y validar tipos de datos (ej.
RF-005                                                                    RN-0067,   MUST HAVE
         asegurar que, tras eliminar el símbolo de moneda, el precio
                                                                          RN-0068,
         quede como un valor numérico válido; campos como el peso,
                                                                          RN-0069
         al no ser obligatorios, se almacenan sin forzar su conversión
         a número). Los datos deben quedar listos para su
         persistencia en la Base de Datos Maestra.
         El sistema debe presentar al usuario un panel de revisión
         que lista todos los registros clasificados en pestañas
         (Nuevos, Duplicados, Coincidencias, Errores). El usuario
         tendrá la capacidad de confirmar, rechazar o editar productos RN-0009
RF-006   individuales. Solo los productos confirmados persistirán en la RN-0014      MUST HAVE
         Base de Datos Maestra. Si se confirma un producto RN-0016
         duplicado, el sistema fusiona los datos automáticamente
         utilizando el precio del archivo entrante, sin selección manual
         de cuál registro prevalece.
         El sistema debe permitir asociar las categorías de la Base de
         Datos Maestra con las plataformas (clientes destino). Esto se
RF-007   configura por cliente y sirve como base para la generación de RN-0010       MUST HAVE
         las plantillas de salida, asegurando que los productos se
         exporten en la estructura correcta para cada destino.
         El sistema debe contar con un motor de exportación
         configurable que genere archivos en formato XLSX (para
RF-008   aplicaciones web) o CSV (para NetSuite). Posteriormente, RN-0010            MUST HAVE
         como último paso del flujo, se podrán aplicar filtros para los
         campos de: categorías, rango de fechas y estado.
         Durante la configuración de la plantilla de salida, el usuario
RF-009   podrá definir dinámicamente qué columnas incluir y el orden -               MUST HAVE
         de las mismas.
         El sistema debe registrar todas las acciones críticas
         realizadas por los usuarios. Esto incluye: Login/Logout,
         creación/edición/eliminación de entidades, cargas de
                                                                                     NICE   TO
RF-010   archivos, confirmaciones de lotes, exportaciones, cambios de -
                                                                                     HAVE
         precio y cambios de mapeo. El log debe incluir fecha, hora,
         usuario, entidad afectada y el detalle del cambio (JSON con
         valores antes y después).


### Tabla estructurada detectada

| RF-004 proveedores a través de la interfaz del Módulo de Ingesta RN-0013 | MUST HAVE |  |  |  |
| --- | --- | --- | --- | --- |
| inteligencia artificial. | RN-0024 |  |  |  |
| un | estándar | único, | estandarizar | texto |
| RF-005 | RN-0067, | MUST HAVE |  |  |
| RF-006 | individuales. Solo los productos confirmados persistirán en la RN-0014 | MUST HAVE |  |  |
| RF-007 | configura por cliente y sirve como base para la generación de RN-0010 | MUST HAVE |  |  |
| RF-008 | aplicaciones web) o CSV (para NetSuite). Posteriormente, RN-0010 | MUST HAVE |  |  |
| RF-009 | podrá definir dinámicamente qué columnas incluir y el orden - | MUST HAVE |  |  |
| NICE | TO |  |  |  |
| RF-010 | archivos, confirmaciones de lotes, exportaciones, cambios de - |  |  |  |


---

## Página 69

         El sistema debe proveer una funcionalidad para la carga
         manual inicial de los aproximadamente 20,000 productos
         existentes que tienen códigos "legacy". Estos productos
         deben ser migrados al nuevo formato NSXXYYZZZZ (XX =
                                                                                  NICE   TO
RF-011   código de categoría, YY = código de subcategoría, ZZZZ = -
                                                                                  HAVE
         número de secuencia de 4 dígitos), formato que el sistema
         genera automáticamente y continúa utilizando, antes del
         go-live productivo, asegurando que el sistema arranque con
         una base de datos unificada y estandarizada.
         El sistema debe mostrar un dashboard principal accesible a
         todos los usuarios logueados. Debe presentar métricas clave
         en tiempo real: total de productos en catálogo, productos
                                                                                  OUT   OF
RF-012   pendientes de revisión, duplicados detectados, número de -
                                                                                  SCOPE
         cargas realizadas en el mes, y un gráfico de distribución de
         productos por categoría. También debe mostrar las últimas
         10 actividades del sistema.
         Para productos con campos incompletos (ej. falta descripción
         larga, marca o peso), el sistema debe invocar a la IA para
         buscar información en internet utilizando el nombre del
                                                                                  OUT   OF
RF-013   producto o su código (SKU). La IA debe autocompletar los -
                                                                                  SCOPE
         campos vacíos con datos estructurados (especificaciones
         técnicas, dimensiones, imágenes URL) y presentar estos
         datos al usuario en el panel de revisión para su confirmación.
         Cada configuración de plantilla de salida por cliente debe
         tener control de versiones. Cuando un administrador modifica
         la estructura de una plantilla (cambia columnas, añade reglas
         de transformación), el sistema debe guardar la nueva versión
                                                                                  OUT   OF
RF-014   y mantener las anteriores. Esto permite volver a una versión -
                                                                                  SCOPE
         anterior si un cambio introduce errores en la importación del
         cliente. Además, se debe registrar quién hizo el cambio,
         cuándo y qué modificaciones específicas se realizaron (diff
         de la configuración).
         La plataforma genera automáticamente una contraseña
                                                                        RN-0002
         provisoria al registrar un nuevo usuario desde un perfil
RF-015                                                                  RN-0031   MUST HAVE
         Administrador o Super, efectuando el envío inmediato de las
                                                                        RN-0044
         credenciales de acceso al correo electrónico configurado.
         La plataforma permite que cualquier usuario autenticado
RF-016   finalice su sesión de forma explícita mediante una opción RN-0044        MUST HAVE
         dedicada en la interfaz de usuario.
         Cuando el sistema detecte que un mismo producto (mismo
         SKU) es ofrecido por múltiples proveedores con costos
         diferentes, deberá presentar al usuario responsable la
                                                                        RN-0019
RF-017   información de los proveedores y sus respectivos costos. El              MUST HAVE
                                                                        RN-0032
         sistema actualiza automáticamente el catálogo maestro con
         el costo del archivo entrante, sin selección manual del
         usuario.


### Tabla estructurada detectada

| NICE | TO |  |
| --- | --- | --- |
| RF-011 | código de categoría, YY = código de subcategoría, ZZZZ = - |  |
| OUT | OF |  |
| RF-012 | pendientes de revisión, duplicados detectados, número de - |  |
| OUT | OF |  |
| RF-013 | producto o su código (SKU). La IA debe autocompletar los - |  |
| OUT | OF |  |
| RF-014 | y mantener las anteriores. Esto permite volver a una versión - |  |
| RF-015 | RN-0031 | MUST HAVE |
| RF-016 | finalice su sesión de forma explícita mediante una opción RN-0044 | MUST HAVE |
| RF-017 | información de los proveedores y sus respectivos costos. El | MUST HAVE |


---

## Página 70

       El sistema deberá validar automáticamente los números
       telefónicos ingresados por los usuarios antes de permitir su
       almacenamiento, exigiendo el símbolo (+), uno de los
RF-018                                                                RN-0022   MUST HAVE
       códigos de país operativos (54, 51, 56, 57, 591, 593, 34, 502,
       52, 507) y una longitud total de 8 a 12 caracteres (ver
       RN-0022).
       El sistema debe proveer al rol Superusuario acceso exclusivo
       a la Gestión de Usuarios (administración de cuentas
       Administrador y creación de cuentas), aislado de toda                    NICE   TO
RF-019                                                              RN-0004
       funcionalidad operativa. La configuración de parámetros                  HAVE
       críticos (modelo de IA, API Key) se gestiona a nivel de
       infraestructura y no por interfaz.
       El sistema debe permitir al usuario con rol SUPER desactivar
                                                                    RN-0020,
       cuentas de usuarios con rol Administrador y modificar el rol
RF-020                                                              RN-0025,    MUST HAVE
       asignado a dichas cuentas. Estas operaciones estarán
                                                                    RN-0026
       bloqueadas para el propio rol Administrador.
       El sistema debe permitir a cualquier usuario registrado
       recuperar su contraseña mediante el envío de un código
       temporal al correo electrónico registrado, validando el
RF-021                                                              RN-0018     MUST HAVE
       cumplimiento de la política de complejidad de contraseña
       (mínimo 8 caracteres, mayúscula, minúscula, dígito y símbolo
       — ver RF-042) antes de permitir el cambio.
       El sistema debe invalidar la sesión activa del usuario y
RF-022 revocar los identificadores de acceso correspondientes al RN-0044        MUST HAVE
       momento de confirmar el cierre de sesión.
       El sistema debe permitir registrar un proveedor preferido por
       producto (preferred_supplier_id); este campo se persiste de
                                                                     RN-0019
RF-023 forma independiente del precio oficial, el cual se actualiza             MUST HAVE
                                                                     RN-0032
       con los datos del proveedor/archivo que se esté procesando
       en cada ingesta.
       El sistema debe aislar en una pestaña dedicada ("Errores")
       del panel de revisión aquellos registros que no cumplan con
RF-024                                                             RN-0024      MUST HAVE
       los campos obligatorios establecidos, indicando su estado
       mediante tarjetas codificadas por color.
RF-025                                                                          MUST HAVE
         El sistema debe permitir al usuario filtrar y buscar registros


### Tabla estructurada detectada

| RF-018 | RN-0022 | MUST HAVE |
| --- | --- | --- |
| Administrador y creación de cuentas), aislado de toda | NICE | TO |
| RF-019 | RN-0004 |  |
| funcionalidad operativa. La configuración de parámetros | HAVE |  |
| RF-020 | RN-0025, | MUST HAVE |
| RF-021 | RN-0018 | MUST HAVE |
| RF-022 revocar los identificadores de acceso correspondientes al RN-0044 | MUST HAVE |  |
| RF-023 forma independiente del precio oficial, el cual se actualiza | MUST HAVE |  |
| RF-024 | RN-0024 | MUST HAVE |
| RF-025 | MUST HAVE |  |


---

## Página 71

        en el módulo de Gestión de Categorías y Subcategorías
        mediante la aplicación simultánea de criterios por estado
        (Activo/Inactivo) y búsqueda por prefijo, aplicable tanto a
        categorías como a subcategorías.
       El sistema debe impedir que un usuario modifique el rol o
       desactive su propia cuenta sin excepción, que cualquier actor
       modifique la cuenta con rol SUPER, y que un Administrador
RF-026                                                               RN-0025     MUST HAVE
       modifique el rol o desactive la cuenta de otro Administrador,
       esta última acción solo puede ejecutarla un usuario con rol
       SUPER.
       Cuando el sistema detecte que un producto entrante ya
       existe en el catálogo maestro (mismo SKU) pero con un
       proveedor diferente, debe retener el registro en la pestaña de RN-0009
RF-027 Duplicados y habilitar las acciones "Combinar" y "Rechazar RN-0033        MUST HAVE
       nuevo". Al presionar "Combinar", se transfiere RN-0043
       automáticamente el precio del archivo entrante al catálogo
       maestro.
       El sistema debe orquestar de forma automatizada y
                                                                     RN-0041,
       secuencial las reglas de limpieza de datos (sanitización de
RF-028                                                               RN-0042,    MUST HAVE
       precios, normalización de fechas, formato de separador
                                                                     RN-0067
       decimal, entre otras) durante la carga de archivos e ingesta.
       El sistema debe retener y listar en la interfaz de usuario
       todos los productos cuyo SKU coincida de forma exacta con
       un registro existente en la Base de Datos Maestra, obligando
                                                                      RN-0009,
RF-029 al operador a resolver la inconsistencia antes de finalizar la            MUST HAVE
                                                                      RN-0014
       ingesta. Las coincidencias por similitud (sin SKU exacto) se
       listan de forma separada, en un apartado propio de
       "Coincidencias".
       La plataforma elimina toda la información temporal
RF-030 almacenada localmente en el dispositivo del usuario de forma RN-0044      MUST HAVE
       inmediata al ejecutarse el cierre de sesión.
       El sistema debe proveer una interfaz de usuario centralizada
                                                                      RN-0009
       para la revisión de lotes procesados, organizada en pestañas
                                                                      RN-0014
RF-031 (Nuevos, Duplicados, Coincidencias, Errores), que permita al              MUST HAVE
                                                                      RN-0016
       operador visualizar los registros de cada categoría,
                                                                      RN-0024
       habilitando la edición de productos mediante un modal, el
       rechazo de entradas individuales inconsistentes, y una


### Tabla estructurada detectada

| RF-026 | RN-0025 | MUST HAVE |
| --- | --- | --- |
| RF-027 Duplicados y habilitar las acciones "Combinar" y "Rechazar RN-0033 | MUST HAVE |  |
| RF-028 | RN-0042, | MUST HAVE |
| RF-029 al operador a resolver la inconsistencia antes de finalizar la | MUST HAVE |  |
| RF-030 almacenada localmente en el dispositivo del usuario de forma RN-0044 | MUST HAVE |  |
| RF-031 (Nuevos, Duplicados, Coincidencias, Errores), que permita al | MUST HAVE |  |


---

## Página 72

         confirmación masiva final ("Confirmar Lote") que autoriza el
         traslado definitivo de los datos limpios hacia el catálogo
         maestro.
       El sistema debe revocar automáticamente todas las sesiones
                                                                                  NICE   TO
RF-032 activas de un usuario cuando otro usuario le cambia el rol o RN-0044
                                                                                  HAVE
       desactiva su cuenta.
       El sistema debe evaluar de forma automatizada la columna
       de moneda durante el procesamiento de archivos Excel y, en
       caso de identificar un tipo de divisa distinto a Soles (PEN),
       debe desplegar una alerta explícita en el frontend notificando
RF-033                                                                RN-0023     MUST HAVE
       al operador que los importes serán tratados y almacenados
       en la base de datos bajo Soles (PEN), permitiendo la
       continuación del flujo de carga bajo la estricta
       responsabilidad del usuario.
       El sistema debe evaluar la estructura de cada archivo
       cargado mediante heurísticas de cabeceras y, si identifica
       que más de 20 filas carecen de candidatos reconocibles para
       campos críticos (SKU, precio), debe abortar el procesamiento
                                                                       RN-0024,
RF-034 de forma inmediata; esta validación de integridad se                       MUST HAVE
                                                                       RN-0068
       ejecutará de manera obligatoria tanto en la fase temprana
       (previo al procesamiento con Claude AI) como en la fase
       tardía (posterior a la confirmación del mapping) para evitar el
       almacenamiento de registros huérfanos.
       Además de la detección exacta de SKU duplicado, el sistema       RN-0009
       detecta posibles coincidencias entre productos por similitud     RN-0043
RF-035                                                                            MUST HAVE
       de nombre, descripción y especificaciones dentro de la           RN-0050
       misma categoría.                                                 RN-0069
       Si el archivo Excel tiene múltiples hojas, el sistema lo
RF-036 rechaza síncronamente (sin arrancar el procesamiento). Solo RN-0046        MUST HAVE
       se acepta un archivo con una única hoja activa.
       El sistema debe sanitizar los valores de texto provenientes
       de archivos de proveedores al momento de parsear el
RF-037 archivo, neutralizando caracteres que puedan interpretarse RN-0070         MUST HAVE
       como fórmulas para prevenir inyección de fórmulas en el dato
       persistido.


### Tabla estructurada detectada

| NICE | TO |  |
| --- | --- | --- |
| RF-033 | RN-0023 | MUST HAVE |
| RF-034 de forma inmediata; esta validación de integridad se | MUST HAVE |  |
| Además de la detección exacta de SKU duplicado, el sistema | RN-0009 |  |
| detecta posibles coincidencias entre productos por similitud | RN-0043 |  |
| RF-035 | MUST HAVE |  |
| de nombre, descripción y especificaciones dentro de la | RN-0050 |  |
| misma categoría. | RN-0069 |  |
| RF-036 rechaza síncronamente (sin arrancar el procesamiento). Solo RN-0046 | MUST HAVE |  |
| RF-037 archivo, neutralizando caracteres que puedan interpretarse RN-0070 | MUST HAVE |  |


---

## Página 73

       El usuario debe poder sobrescribir la categoría y
       subcategoría sugerida por Claude para cualquier producto
RF-038                                                           RN-0045         MUST HAVE
       del bucket nuevos, aunque el sistema la haya aceptado con
       alta confianza.
       Antes de permitir el acceso a cualquier pantalla, o
       funcionalidad protegida, el sistema deberá verificar que el rol
       asociado al usuario autenticado posea el permiso requerido
RF-039                                                                 RN-0003   MUST HAVE
       para dicha operación. Si el usuario no cuenta con el privilegio
       correspondiente, el sistema deberá denegar el acceso e
       informar que no dispone de autorización suficiente.
       La plataforma niega la carga de cualquier archivo que
       contenga productos con letras o valores negativos en el RN-0051,
RF-040                                                                           MUST HAVE
       campo de precio, interrumpiendo el proceso de importación RN-0068
       de forma inmediata.
       La plataforma restringe el acceso a todas sus
       funcionalidades durante el primer inicio de sesión de
RF-041 cualquier usuario, exigiendo la actualización obligatoria de la RN-0002   MUST HAVE
       clave provisoria antes de otorgar el ingreso definitivo al
       sistema.
       La plataforma verifica que toda nueva contraseña ingresada
       cumpla estrictamente con las políticas de complejidad
RF-042                                                               RN-0031     MUST HAVE
       establecidas, desplegando alertas de error si los datos no se
       adecúan a las restricciones de seguridad.
       El sistema debe neutralizar intentos de manipulación
       presentes en los datos externos antes de enviarlos al motor
RF-043 de inteligencia artificial, y debe aplicar un comportamiento de RN-0071   MUST HAVE
       reserva seguro si la respuesta de la IA no cumple el formato
       esperado o referencia una categoría inexistente.
       El sistema debe garantizar que la creación y actualización de
       productos en el Catálogo Maestro ocurra exclusivamente a
RF-044 través del flujo de ingesta automatizado, sin exponer una vía RN-0019     MUST HAVE
       de escritura directa que omita las etapas de normalización,
       inteligencia artificial y detección de duplicados.


### Tabla estructurada detectada

| RF-038 | RN-0045 | MUST HAVE |
| --- | --- | --- |
| RF-039 | RN-0003 | MUST HAVE |
| RF-040 | MUST HAVE |  |
| RF-041 cualquier usuario, exigiendo la actualización obligatoria de la RN-0002 | MUST HAVE |  |
| RF-042 | RN-0031 | MUST HAVE |
| RF-043 de inteligencia artificial, y debe aplicar un comportamiento de RN-0071 | MUST HAVE |  |
| RF-044 través del flujo de ingesta automatizado, sin exponer una vía RN-0019 | MUST HAVE |  |


---

## Página 74

                                                                     RN-0035,
       El sistema debe autogenerar automáticamente el
                                                                     RN-0036,
       identificador NetSuite (NSXXYYZZZZ) para cada producto
                                                                     RN-0037,
       aprobado, incorporando el código de categoría (2 letras), el
                                                                     RN-0038,
RF-045 de subcategoría (2 dígitos, con el código 20 reservado para              MUST HAVE
                                                                     RN-0039,
       Packs) y un serial incremental de 4 dígitos por subcategoría;
                                                                     RN-0040,
       los productos con código legacy conservan su identificador y
                                                                     RN-0065,
       no reciben uno nuevo.
                                                                     RN-0066
       El sistema debe permitir gestionar (crear, editar y eliminar)
                                                                     RN-0054,
RF-046 los tipos de plataforma como catálogo maestro, impidiendo                MUST HAVE
                                                                     RN-0060
       eliminar un tipo asignado a una plataforma activa.
       El sistema debe permitir configurar una única plantilla de
                                                                  RN-0055,
       salida por plataforma, definiendo formato (XLSX/CSV) e
                                                                  RN-0056,
RF-047 inclusión de cabecera como atributos fijos, y las columnas               MUST HAVE
                                                                  RN-0058,
       (campo del catálogo, calculado o vacío), su nombre y su
                                                                  RN-0059
       orden.
       El sistema debe permitir al usuario cancelar una solicitud de
       exportación únicamente mientras se encuentre en estado de RN-0057,       NICE    TO
RF-048
       espera; si el procesamiento ya inició, la cancelación debe RN-0061       HAVE
       rechazarse.
       El sistema debe permitir definir columnas de tipo calculado
       cuyo valor sea el precio base multiplicado por el factor de RN-0062,
RF-049                                                                          MUST HAVE
       conversión de puntos de la plataforma; los cambios en el RN-0063
       factor solo aplican a exportaciones futuras.
       El sistema debe excluir las plataformas inactivas del flujo de
RF-050 exportación, impidiendo seleccionarlas o generar archivos a RN-0064      MUST HAVE
       través de ellas.
       El sistema debe estandarizar todos los precios a valor neto
       (sin IGV): cuando el archivo declare un precio con IGV debe RN-0023,
RF-051                                                                          MUST HAVE
       calcular el neto dividiendo entre el factor de IGV, y operar RN-0052
       exclusivamente en Soles (PEN).
○​        REQUERIMIENTOS NO FUNCIONALES
     N°            Descripción del Requerimiento No Funcional          RF        Prioridad


### Tabla estructurada detectada

| RF-045 de subcategoría (2 dígitos, con el código 20 reservado para | MUST HAVE |  |  |
| --- | --- | --- | --- |
| RF-046 los tipos de plataforma como catálogo maestro, impidiendo | MUST HAVE |  |  |
| RF-047 inclusión de cabecera como atributos fijos, y las columnas | MUST HAVE |  |  |
| exportación únicamente mientras se encuentre en estado de RN-0057, | NICE | TO |  |
| espera; si el procesamiento ya inició, la cancelación debe RN-0061 | HAVE |  |  |
| RF-049 | MUST HAVE |  |  |
| RF-050 exportación, impidiendo seleccionarlas o generar archivos a RN-0064 | MUST HAVE |  |  |
| RF-051 | MUST HAVE |  |  |
| ○​ | REQUERIMIENTOS NO FUNCIONALES |  |  |
| N° | Descripción del Requerimiento No Funcional | RF | Prioridad |


---

## Página 75

           Seguridad y Acceso Centralizado: La plataforma debe
                                                                         RF-001
           centralizar la autenticación y el control de accesos                   MUST
RNF-0000                                                                 RF-002
           (RBAC) mediante un proveedor de identidad centralizado                 HAVE
           (AWS Cognito).
           Timeout de Expiración de Sesión: los tokens de acceso
           e identidad (JWT) emitidos por el proveedor de identidad
                                                                         RF-001   MUST
RNF-0001   caducarán a la 1 hora de su emisión y el refresh token a
                                                                         RF-002   HAVE
           los 30 días. El sistema forzará una redirección automática
           al Login tras la expiración.
           Prevención de Fuerza Bruta (Rate Limiting). El sistema
           bloqueará la cuenta temporalmente por 5 minutos si
                                                                                  MUST
RNF-0002   detecta 5 intentos fallidos de autenticación en un lapso de   RF-001
                                                                                  HAVE
           1 minuto, mediante el mecanismo propio de control de
           fuerza bruta de la plataforma.
           Política de Roles: Configuración de políticas de control
           de acceso de mínimo privilegio (RBAC: SUPER > ADMIN                    MUST
RNF-0003                                                                 -
           > EJEC > VIEWER) para que las funciones de cómputo                     HAVE
           solo accedan a los recursos mínimos necesarios.
           Latencia de Procesamiento: el motor de ingesta debe
           ingerir, mapear con IA y normalizar cada archivo (hasta 5
                                                                         RF-005
           MB) dentro de los límites de ejecución de la plataforma:               MUST
RNF-0004                                                                 RF-006
           hasta 600 segundos por función Lambda y hasta 7200                     HAVE
                                                                         RF-007
           segundos (2 h) para la ejecución global orquestada por
           Step Functions.
           Flexibilidad de Esquema (NoSQL): La capa de
           persistencia debe soportar la inserción de atributos
                                                                                  MUST
RNF-0005   dinámicos sin requerir alteraciones estructurales (DDL).      RF-008
                                                                                  HAVE
           La base de datos NoSQL almacenará los catálogos con
           esquemas flexibles.
           Uso exclusivo de cómputo serverless en toda la                RF-004
           arquitectura: asegura que el sistema escale de forma          RF-005   MUST
RNF-0006
           transparente si el volumen sube y que el costo sea cero si    RF-006   HAVE
           no hay carga.                                                 RF-011
           Restricción de Memoria y Payload: Para prevenir
           desbordamientos de memoria (OOM) en la arquitectura           RF-005   MUST
RNF-0007
           Serverless, el sistema debe rechazar (validación en el        RF-006   HAVE
           backend) cualquier archivo que exceda los 5 MB de peso.
           Trazabilidad (Audit Log): Toda operación de
                                                                                  OUT OF
RNF-0008   saneamiento o edición manual debe persistir con el            RF-010
                                                                                  SCOPE
           diferencial (diff before/after).
           Integridad Estructural de Salida: los productos
           persistidos deben cumplir con la estructura de campos
                                                                                  MUST
RNF-0009   canónicos definida (sku, official_price, etc.), como base     RF-008
                                                                                  HAVE
           para una futura exportación (XLSX/CSV) 100%
           compatible en nombres de cabeceras, formato de


### Tabla estructurada detectada

| centralizar la autenticación y el control de accesos | MUST |  |
| --- | --- | --- |
| RNF-0000 | RF-002 |  |
| (RBAC) mediante un proveedor de identidad centralizado | HAVE |  |
| RF-001 | MUST |  |
| RNF-0001 | caducarán a la 1 hora de su emisión y el refresh token a |  |
| RF-002 | HAVE |  |
| RNF-0002 | detecta 5 intentos fallidos de autenticación en un lapso de | RF-001 |
| de acceso de mínimo privilegio (RBAC: SUPER > ADMIN | MUST |  |
| RNF-0003 | - |  |
| > EJEC > VIEWER) para que las funciones de cómputo | HAVE |  |
| MB) dentro de los límites de ejecución de la plataforma: | MUST |  |
| RNF-0004 | RF-006 |  |
| hasta 600 segundos por función Lambda y hasta 7200 | HAVE |  |
| RNF-0005 | dinámicos sin requerir alteraciones estructurales (DDL). | RF-008 |
| Uso exclusivo de cómputo serverless en toda la | RF-004 |  |
| arquitectura: asegura que el sistema escale de forma | RF-005 | MUST |
| transparente si el volumen sube y que el costo sea cero si | RF-006 | HAVE |
| no hay carga. | RF-011 |  |
| desbordamientos de memoria (OOM) en la arquitectura | RF-005 | MUST |
| Serverless, el sistema debe rechazar (validación en el | RF-006 | HAVE |
| RNF-0008 | saneamiento o edición manual debe persistir con el | RF-010 |
| RNF-0009 | canónicos definida (sku, official_price, etc.), como base | RF-008 |


---

## Página 76

           codificación (UTF-8) y tipos de datos obligatorios
           requeridos por los sistemas destino (NetSuite/Web).
           Feedback Visual en Tiempo Real: El frontend debe
           proporcionar indicadores de estado durante los procesos
                                                                        RF-004   NICE TO
RNF-0010   de latencia extendida (ej. spinners o barra de progreso
                                                                        RF-005   HAVE
           durante los 60s de procesamiento de IA) para evitar que
           el usuario interrumpa el flujo.
           Resiliencia de Integración (API): El backend debe
           implementar un mecanismo de reintentos con retroceso
                                                                        RF-004
           exponencial (exponential backoff) ante fallos temporales              MUST
RNF-0011                                                                RF-005
           de red o límite de cuota al comunicarse con el servicio               HAVE
           externo de IA (LLM), mediante el mecanismo de
           reintentos del SDK oficial de Anthropic (max_retries=5).
           Límite de Paginación UI. Las consultas masivas al
           Catálogo Maestro estarán limitadas a devolver un máximo               MUST
RNF-0012                                                                RF-008
           de 100 registros por página para proteger la capacidad de             HAVE
           lectura de la base de datos.
           Almacenamiento Intacto. Los archivos originales
                                                                                 MUST
RNF-0013   subidos por proveedores no se modificarán ni eliminarán;     RF-006
                                                                                 HAVE
           se conservan en S3.
           Recuperación ante borrados. La base de datos
           mantendrá activado un mecanismo de recuperación a un
                                                                        RF-004   OUT OF
RNF-0014   punto en el tiempo (point-in-time) que permita restaurarla
                                                                        RF-006   SCOPE
           a cualquier segundo de los últimos 35 días ante un
           borrado accidental.
           Cambio de almacenamiento. Configurar una política de
           ciclo de vida para que estos archivos transicionen
                                                                                 OUT OF
RNF-0015   automáticamente a una capa de almacenamiento en frío         RF-006
                                                                                 SCOPE
           (archivado) después de 90 días, con el fin de optimizar
           costos de almacenamiento a largo plazo
           Prompts Versionados en Base de Datos: Se descarta
           la creación de una tabla de configuración de prompts                  OUT OF
RNF-0016                                                                -
           (ai_prompt_config) en base de datos para el                           SCOPE
           almacenamiento dinámico de instrucciones del LLM.
           Desacoplamiento de Cargas mediante un sistema de
           mensajería/colas: El procesamiento de archivos no                     OUT OF
RNF-0017                                                                -
           utilizará un sistema de mensajería (colas) para gestionar             SCOPE
           múltiples subidas simultáneas o balanceo de carga.
           IA en la Generación de Exportaciones: Se descarta la
                                                                                 OUT OF
RNF-0018   generación automática de tags y etiquetas mediante IA        -
                                                                                 SCOPE
           por cada evento de exportación.
           Diseño Responsivo (Mobile-First): La plataforma no
           implementará vistas adaptativas para dispositivos
                                                                                 OUT OF
RNF-0019   móviles. Al ser un sistema BackOffice de procesamiento       -
                                                                                 SCOPE
           masivo se optimizará estrictamente para resoluciones de
           escritorio (Desktop).


### Tabla estructurada detectada

| RF-004 | NICE TO |  |
| --- | --- | --- |
| RNF-0010 | de latencia extendida (ej. spinners o barra de progreso |  |
| RF-005 | HAVE |  |
| exponencial (exponential backoff) ante fallos temporales | MUST |  |
| RNF-0011 | RF-005 |  |
| de red o límite de cuota al comunicarse con el servicio | HAVE |  |
| Catálogo Maestro estarán limitadas a devolver un máximo | MUST |  |
| RNF-0012 | RF-008 |  |
| de 100 registros por página para proteger la capacidad de | HAVE |  |
| RNF-0013 | subidos por proveedores no se modificarán ni eliminarán; | RF-006 |
| RF-004 | OUT OF |  |
| RNF-0014 | punto en el tiempo (point-in-time) que permita restaurarla |  |
| RF-006 | SCOPE |  |
| RNF-0015 | automáticamente a una capa de almacenamiento en frío | RF-006 |
| la creación de una tabla de configuración de prompts | OUT OF |  |
| RNF-0016 | - |  |
| (ai_prompt_config) en base de datos para el | SCOPE |  |
| mensajería/colas: El procesamiento de archivos no | OUT OF |  |
| RNF-0017 | - |  |
| utilizará un sistema de mensajería (colas) para gestionar | SCOPE |  |
| RNF-0018 | generación automática de tags y etiquetas mediante IA | - |
| RNF-0019 | móviles. Al ser un sistema BackOffice de procesamiento | - |


---

## Página 77

                Persistencia Dinámica de Prompts en BD: Se descarta
                la creación de entidades en la base de datos para
                almacenar o editar las instrucciones base del modelo de
                                                                                      OUT OF
RNF-0020        IA desde la interfaz de usuario. El prompt semántico del     -
                                                                                      SCOPE
                sistema se manejará de forma inmutable y segura a nivel
                de infraestructura mediante Variables de Entorno en el
                pipeline de despliegue.
                Validez de credenciales temporales: la contraseña
                temporal de invitación enviada al correo tiene una validez   RF-015   MUST
RNF-0021
                de 24 horas; el código de recuperación de 6 dígitos usa la   RF-021   HAVE
                validez por defecto del proveedor de identidad.
                Tiempo de Vida de Sesiones de Ingesta: el sistema
                debe limitar la duración máxima de cada etapa del
                proceso de ingesta de la siguiente manera: 10 minutos        RF-004
                                                                                      MUST
RNF-0022        (600 s) para la etapa de mapeo, 30 minutos (1800 s) para     RF-005
                                                                                      HAVE
                la etapa de revisión y 2 horas (7200 s) para la ejecución    RF-006
                global; al superarse estos límites, el lote se considera
                expirado.
                Retención de artefactos de salida: las plantillas de
                salida se conservan de forma indefinida (con trazabilidad
                de cambios); los archivos de exportación generados           RF-008   MUST
RNF-0023
                expiran a los 30 días; las URL de descarga tienen una        RF-047   HAVE
                validez de 15 minutos; y el registro del trabajo de
                exportación se conserva 90 días.
                Retención y purga de sesiones de carga: las sesiones
                de carga (supplier_uploads) deben contar con una
                                                                                      NICE TO
RNF-0024        política de expiración/purga para evitar el crecimiento      RF-004
                                                                                      HAVE
                ilimitado de la tabla utilizada por el control de cuota de
                cargas.
                Rate-limiting de recuperación de contraseña: el
                proceso de recuperación de contraseña debe limitarse a
                                                                                      MUST
RNF-0025        3 intentos por correo cada 15 minutos y 10 intentos por      RF-021
                                                                                      HAVE
                dirección IP cada 5 minutos, bloqueando temporalmente
                durante 15 minutos ante el exceso.
●​ MODELO DE DATOS
  masterTable
  {
      "title": "Master",
      "type": "object",
      "x-dynamodb": {
        "table": "promotick-utec-master-{stage}",
        "partition_key": "entity_id",
        "gsi": [


### Tabla estructurada detectada

| RNF-0020 | IA desde la interfaz de usuario. El prompt semántico del | - |
| --- | --- | --- |
| temporal de invitación enviada al correo tiene una validez | RF-015 | MUST |
| de 24 horas; el código de recuperación de 6 dígitos usa la | RF-021 | HAVE |
| proceso de ingesta de la siguiente manera: 10 minutos | RF-004 |  |
| RNF-0022 | (600 s) para la etapa de mapeo, 30 minutos (1800 s) para | RF-005 |
| la etapa de revisión y 2 horas (7200 s) para la ejecución | RF-006 |  |
| de cambios); los archivos de exportación generados | RF-008 | MUST |
| expiran a los 30 días; las URL de descarga tienen una | RF-047 | HAVE |
| RNF-0024 | política de expiración/purga para evitar el crecimiento | RF-004 |
| RNF-0025 | 3 intentos por correo cada 15 minutos y 10 intentos por | RF-021 |


---

## Página 78

    {
      "name": "by_entity_type",
      "partition_key": "entity_type",
      "sort_key": null,
      "purpose": "Listar entidades por tipo: SUPPLIER, CATEGORY,
SUBCATEGORY, PRODUCT"
    },
    {
      "name": "by_supplier_ruc",
      "partition_key": "ruc",
      "sort_key": null,
      "purpose": "búsqueda exacta de proveedor por RUC"
    },
    {
      "name": "by_supplier_contact_email",
      "partition_key": "contact_email",
      "sort_key": null,
      "purpose": "búsqueda exacta de proveedor por email de contacto"
    },
    {
      "name": "by_supplier_contact_phone",
      "partition_key": "contact_phone",
      "sort_key": null,
      "purpose": "búsqueda exacta de proveedor por teléfono de contacto"
    },
    {
      "name": "by_category_code",
      "partition_key": "code",
      "sort_key": null,
      "purpose": "búsqueda exacta de categoría por código"
    },
    {
      "name": "by_subcategory_category_code",
      "partition_key": "category_id",
      "sort_key": "code",
      "purpose": "Listar subcategorías de una categoría y resolver códigos
generados"
    },
    {
      "name": "by_supplier_name",
      "partition_key": "supplier_name_partition",
      "sort_key": "normalized_name",
      "purpose": "Búsqueda exacta y por prefijo de proveedores por nombre
normalizado"
    },
    {
      "name": "by_category_name",


---

## Página 79

        "partition_key": "category_name_partition",
        "sort_key": "normalized_name",
        "purpose": "Búsqueda exacta y por prefijo de categorías por nombre
normalizado"
      },
      {
        "name": "by_subcategory_name",
        "partition_key": "subcategory_name_partition",
        "sort_key": "normalized_name",
        "purpose": "Búsqueda exacta y por prefijo de subcategorías dentro de
una categoría"
      },
      {
        "name": "by_product_sku",
        "partition_key": "product_sku",
        "sort_key": null,
        "purpose": "Búsqueda exacta de producto por SKU"
      },
      {
        "name": "by_product_netsuite_code",
        "partition_key": "product_netsuite_code",
        "sort_key": null,
        "purpose": "Búsqueda exacta de producto por código NetSuite"
      },
      {
        "name": "by_product_name",
        "partition_key": "product_name_partition",
        "sort_key": "normalized_name",
        "purpose": "Búsqueda por prefijo de productos por nombre normalizado"
      },
      {
        "name": "by_product_category",
        "partition_key": "product_category_id",
        "sort_key": "updated_at",
        "purpose": "Listar productos por categoría ordenados por fecha de
actualización"
      },
      {
        "name": "by_product_subcategory",
        "partition_key": "product_subcategory_id",
        "sort_key": "updated_at",
        "purpose": "Listar productos por subcategoría ordenados por fecha de
actualización"
      }
    ],
    "x-notes": [
    "ProjectionType=ALL en todos los GSIs.",


---

## Página 80

    "La unicidad se controla con registros guard cuyo entity_id empieza con
UNIQUE# y entity_type='UNIQUE'.",
    "Las secuencias de productos se guardan como
SEQUENCE#PRODUCT#<subcategory_id> con
entity_type='PRODUCT_SEQUENCE'.",
    "Stream NEW_AND_OLD_IMAGES habilitado para proyecciones y
auditoría.",
    "Point-in-Time Recovery habilitado."
    ]
  },
  "discriminator": {
    "propertyName": "entity_type"
  },
  "properties": {
    "entity_id": {
      "type": "string",
      "description": "PK de la tabla. Formatos: SUP#<uuid>, CAT#<uuid>,
SUBCAT#<uuid>, PROD#<uuid>, UNIQUE#...,
SEQUENCE#PRODUCT#<subcategory_id>."
    },
    "entity_type": {
      "type": "string",
      "enum": ["SUPPLIER", "CATEGORY", "SUBCATEGORY", "PRODUCT",
"PRODUCT_SEQUENCE"],
      "description": "Discriminador de tipo de registro."
    },
    "name": {
      "type": ["string", "null"],
      "description": "Nombre original. Requerido en SUPPLIER, CATEGORY y
SUBCATEGORY. Opcional en PRODUCT. 1-120 caracteres cuando está
presente; whitespace normalizado."
    },
    "normalized_name": {
      "type": "string",
      "description": "Nombre normalizado para búsqueda: case-insensitive,
accent-insensitive y whitespace-normalized. Se almacena en PRODUCT solo si
name está presente."
    },
    "description": {
      "type": ["string", "null"],
      "description": "SUPPLIER: opcional. CATEGORY/SUBCATEGORY:
requerido. 1-2000 caracteres cuando está presente."
    },
    "is_active": {
      "type": "boolean",
      "default": true,
      "description": "Estado lógico de la entidad."


---

## Página 81

   },
   "created_at": {
     "type": "string",
     "format": "date-time",
     "description": "Timestamp UTC de creación en ISO 8601."
   },
   "created_by": {
     "type": "string",
     "description": "Actor que creó el registro. Normalmente USER#<subject>."
   },
   "updated_at": {
     "type": "string",
     "format": "date-time",
     "description": "Timestamp UTC de última actualización en ISO 8601."
   },
   "updated_by": {
     "type": "string",
     "description": "Actor que actualizó el registro."
   },
    "supplier_id": {
      "type": "string",
      "description": "Solo SUPPLIER. Mismo valor que entity_id. Formato
SUP#<uuid>."
    },
    "supplier_name_partition": {
      "type": "string",
      "enum": ["SUPPLIER"],
      "description": "Solo SUPPLIER. PK del GSI by_supplier_name."
    },
    "ruc": {
      "type": "string",
      "pattern": "^\\d{11}$",
      "description": "Solo SUPPLIER. RUC peruano de 11 dígitos. Único entre
proveedores."
    },
    "contact_email": {
      "type": "string",
      "format": "email",
      "description": "Solo SUPPLIER. Email válido, trimmed y lowercase. Único
entre proveedores."
    },
    "contact_phone": {
      "type": "string",
      "description": "Solo SUPPLIER. 8-12 caracteres. Debe iniciar con +, usar
prefijo permitido y luego solo dígitos. Prefijos: 54, 591, 57, 56, 593, 34, 502, 52,
507, 51. Único entre proveedores."


---

## Página 82

    },
    "template_column_mappings": {
      "type": "object",
      "additionalProperties": { "type": "string" },
      "default": {},
      "description": "Solo SUPPLIER. Mapeo de columnas de template. Al
actualizar requiere al menos un mapping; keys y values se limpian con
trim/whitespace normalization."
    },
    "template_ai_suggested": {
      "type": "boolean",
      "default": false,
      "description": "Solo SUPPLIER. Indica si el mapping fue sugerido por IA."
    },
    "template_confirmed_by": {
      "type": ["string", "null"],
      "description": "Solo SUPPLIER. Actor que confirmó el template."
    },
    "template_confirmed_at": {
      "type": ["string", "null"],
      "format": "date-time",
      "description": "Solo SUPPLIER. Timestamp UTC de confirmación del
template."
    },
    "category_id": {
      "type": "string",
      "description": "CATEGORY: mismo valor que entity_id, formato
CAT#<uuid>. SUBCATEGORY/PRODUCT: FK a categoría padre."
    },
    "category_name_partition": {
      "type": "string",
      "enum": ["CATEGORY"],
      "description": "Solo CATEGORY. PK del GSI by_category_name."
    },
    "code": {
      "type": "string",
      "description": "CATEGORY: código de 2 letras ASCII, uppercase, único
globalmente. SUBCATEGORY: código generado de 2 dígitos, único dentro de
category_id."
    },
    "category_code": {
      "type": "string",
      "description": "Solo SUBCATEGORY. Código de la categoría padre,
desnormalizado."
    },


---

## Página 83

  "subcategory_id": {
    "type": "string",
    "description": "SUBCATEGORY: mismo valor que entity_id, formato
SUBCAT#<uuid>. PRODUCT: FK a subcategoría."
  },
  "subcategory_name_partition": {
    "type": "string",
    "description": "Solo SUBCATEGORY. Valor
SUBCATEGORY#<category_id>. PK del GSI by_subcategory_name."
  },
    "product_id": {
      "type": "string",
      "description": "Solo PRODUCT. Mismo valor que entity_id. Formato
PROD#<uuid>."
    },
    "product_sku": {
      "type": "string",
      "description": "Solo PRODUCT. Key de índice:
PRODUCT#<sku.casefold()>."
    },
    "product_netsuite_code": {
      "type": "string",
      "description": "Solo PRODUCT. Key de índice:
PRODUCT#<netsuite_code.upper()>."
    },
    "product_name_partition": {
      "type": "string",
      "enum": ["PRODUCT"],
      "description": "Solo PRODUCT con name presente. PK del GSI
by_product_name."
    },
    "product_category_id": {
      "type": "string",
      "description": "Solo PRODUCT. Key de índice:
PRODUCT#<category_id>."
    },
    "product_subcategory_id": {
      "type": "string",
      "description": "Solo PRODUCT. Key de índice:
PRODUCT#<subcategory_id>."
    },
    "netsuite_code": {
      "type": "string",
      "description": "Solo PRODUCT. Generado como
NS<category_code><subcategory_code><4-digit-sequence>. Único
globalmente."


---

## Página 84

    },
    "sku": {
      "type": "string",
      "description": "Solo PRODUCT. 1-100 caracteres. Único
case-insensitively."
    },
    "ean": {
      "type": ["string", "null"],
      "pattern": "^\\d{13}$",
      "description": "Solo PRODUCT. EAN-13 de exactamente 13 dígitos ASCII
con checksum válido."
    },
    "mpn": {
      "type": ["string", "null"],
      "description": "Solo PRODUCT. Máximo 100 caracteres; whitespace
normalizado; blank se convierte en null."
    },
    "sale_description": {
      "type": ["string", "null"],
      "description": "Solo PRODUCT. 1-2000 caracteres cuando está presente;
whitespace normalizado; blank se convierte en null."
    },
    "brand": {
      "type": ["string", "null"],
      "description": "Solo PRODUCT. 1-100 caracteres cuando está presente;
whitespace normalizado; blank se convierte en null."
    },
    "model": {
      "type": ["string", "null"],
      "description": "Solo PRODUCT. 1-100 caracteres cuando está presente;
whitespace normalizado; blank se convierte en null."
    },
    "category_name": {
      "type": "string",
      "description": "Solo PRODUCT. Nombre de categoría desnormalizado."
    },
    "subcategory_name": {
      "type": "string",
      "description": "Solo PRODUCT. Nombre de subcategoría desnormalizado."
    },
    "specifications": {
      "type": "object",
      "default": {},
      "description": "Solo PRODUCT. Objeto JSON libre para atributos por
categoría."
    },
    "s3_url": {


---

## Página 85

       "type": ["string", "null"],
       "format": "uri",
       "description": "Solo PRODUCT. URL válida aceptada por Pydantic AnyUrl;
puede incluir s3://."
     },
     "preferred_supplier_id": {
       "type": ["string", "null"],
       "description": "Solo PRODUCT. FK a SUP#<uuid>. El proveedor debe
existir y estar activo."
     },
     "preferred_supplier_name": {
       "type": ["string", "null"],
       "description": "Solo PRODUCT. Nombre de proveedor preferido
desnormalizado."
     },
     "official_price": {
       "type": ["number", "null"],
       "description": "Solo PRODUCT. Precio oficial sin impuesto. Debe ser >= 0
cuando está presente."
     },
     "official_price_with_tax": {
       "type": "number",
       "description": "Solo PRODUCT. Precio oficial con impuesto. Requerido.
Debe ser >= 0 y >= official_price cuando official_price está presente."
     },
     "last_price": {
       "type": ["number", "null"],
       "description": "Solo PRODUCT. Precio anterior con impuesto cuando
official_price_with_tax cambia."
     },
     "last_price_update": {
       "type": ["string", "null"],
       "format": "date",
       "description": "Solo PRODUCT. Fecha ISO 8601 de creación o último
cambio de official_price_with_tax."
     },
    "owner_entity_id": {
      "type": "string",
      "description": "Solo registros UNIQUE#. Entity owner del guard de
unicidad."
    },
    "current_value": {
      "type": "number",
      "description": "Solo PRODUCT_SEQUENCE. Secuencia actual por
subcategoría para generar netsuite_code."
    }


---

## Página 86

   },
   "required": ["entity_id", "entity_type", "is_active", "created_at", "created_by",
"updated_at", "updated_by"]
 }
SupplierUpload
{
 "title": "SupplierUpload",
 "type": "object",
 "x-dynamodb": {
   "table": "promotick-utec-supplier-uploads-{stage}",
   "partition_key": "upload_id",
   "stream": "NEW_AND_OLD_IMAGES",
   "point_in_time_recovery": true,
   "gsi": [
     {
       "name": "by_supplier_created",
       "partition_key": "supplier_id",
       "sort_key": "created_at",
       "purpose": "Historial de uploads de un proveedor, ordenados del más
reciente al más antiguo"
     }
   ]
 },
 "properties": {
   "upload_id":        { "type": "string", "description": "UUID. PK de la tabla." },
   "supplier_id":      { "type": "string", "description": "FK -> Master.entity_id
(entity_type='SUPPLIER'), formato SUP#<uuid>. PK del GSI
by_supplier_created." },
   "supplier_name": { "type": "string", "description": "Desnormalizado desde
Master." },
   "template_snapshot": {
     "type": "object",
     "description": "Foto congelada del template del proveedor al momento del
upload.",
     "properties": {
       "column_mappings": { "type": "object", "additionalProperties": { "type":
"string" }, "description": "Copia de MasterTable.template_column_mappings
vigente al momento del upload." },
       "ai_suggested": { "type": "boolean", "description": "Copia de
template_ai_suggested." },
       "confirmed_by": { "type": ["string", "null"], "description": "Copia de
template_confirmed_by." },
       "confirmed_at": { "type": ["string", "null"], "format": "date-time",
"description": "Copia de template_confirmed_at." }


### Tabla estructurada detectada

| "upload_id": | { "type": "string", "description": "UUID. PK de la tabla." }, |
| --- | --- |
| "supplier_id": | { "type": "string", "description": "FK -> Master.entity_id |


---

## Página 87

      },
      "required": ["column_mappings"]
    },
    "s3_key":            { "type": "string", "description": "Key S3 del archivo original,
ej: 'uploads/{upload_id}/archivo_proveedor.xlsx'." },
    "original_filename": { "type": "string" },
    "file_size_bytes": { "type": "integer" },
    "file_type":        { "type": "string", "enum": ["xlsx", "csv", "xls"], "description":
"Lowercase por ser formato/extensión, no estado de máquina." },
    "status": {
      "type": "string",
      "enum": ["PENDING", "PROCESSING", "NEEDS_REVIEW",
"CONFIRMED", "FAILED"],
      "description": "PENDING: subido, esperando. PROCESSING: Lambda
extrayendo filas. NEEDS_REVIEW: hay duplicados o errores. CONFIRMED:
lote aprobado. FAILED: error irrecuperable."
    },
    "processing_summary": {
      "type": "object",
      "properties": {
        "total_rows":        { "type": "integer" },
        "processed_rows": { "type": "integer" },
        "new_products": { "type": "integer" },
        "updated_products": { "type": "integer" },
        "duplicates_found": { "type": "integer" },
        "errors_found": { "type": "integer" }
      }
    },
    "error_message": { "type": "string", "description": "Mensaje de error si
status='FAILED'." },
    "uploaded_by": { "type": "string", "description": "FK -> Users.user_id." },
    "confirmed_by": { "type": ["string", "null"], "description": "FK ->
Users.user_id. Usuario que aprobó el lote." },
    "confirmed_at": { "type": ["string", "null"], "format": "date-time" },
    "created_at": { "type": "string", "format": "date-time" },
    "created_by": { "type": "string", "description": "Igual a uploaded_by; se
duplica por consistencia con Master." },
    "updated_at": { "type": "string", "format": "date-time" },
    "updated_by": { "type": "string" }
  },
  "required": [
    "upload_id", "supplier_id", "template_snapshot", "s3_key",
"original_filename",
    "file_type", "status", "uploaded_by", "created_at", "created_by", "updated_at",
"updated_by"
  ]
}


### Tabla estructurada detectada

| "s3_key": | { "type": "string", "description": "Key S3 del archivo original, |
| --- | --- |
| "file_type": | { "type": "string", "enum": ["xlsx", "csv", "xls"], "description": |
| "total_rows": | { "type": "integer" }, |


---

## Página 88

platform
{
  "title": "PlatformsTable",
  "type": "object",
  "x-dynamodb": {
    "table": "promotick-utec-platforms-{stage}",
    "partition_key": "entity_id",
    "ttl_attribute": "expires_at",
    "stream": "NEW_AND_OLD_IMAGES",
    "point_in_time_recovery": true,
    "gsi": [
      { "name": "by_entity_type",           "partition_key": "entity_type",
"sort_key": null,        "purpose": "Listar entidades por tipo: PLATFORM,
CLIENT_CATEGORY, OUTPUT_TEMPLATE, EXPORT_JOB" },
      { "name": "by_platform_name",            "partition_key":
"platform_name_partition", "sort_key": "normalized_name", "purpose":
"Búsqueda exacta y por prefijo de plataformas por nombre normalizado" },
      { "name": "by_export_platform_created", "partition_key":
"export_platform_id",        "sort_key": "created_at","purpose": "Historial de export
jobs por plataforma, del más reciente al más antiguo" }
    ],
    "x-notes": [
      "ProjectionType=ALL en todos los GSIs.",
      "TTL habilitado en expires_at: usar sólo en EXPORT_JOB",
      "PLATFORM, CLIENT_CATEGORY y OUTPUT_TEMPLATE son
permanentes: no setear expires_at.",
      "Stream NEW_AND_OLD_IMAGES habilitado."
    ]
  },
  "discriminator": { "propertyName": "entity_type" },
  "properties": {
    "entity_id": { "type": "string", "description": "PK. Formatos: PLAT#<uuid>,
CLICAT#<uuid>, OUTTPL#<uuid>, EXPJOB#<uuid>." },
    "entity_type": { "type": "string", "enum": ["PLATFORM",
"CLIENT_CATEGORY", "OUTPUT_TEMPLATE", "EXPORT_JOB"],
"description": "Discriminador." },
  "is_active": { "type": "boolean", "default": true },
  "created_at": { "type": "string", "format": "date-time" },
  "created_by": { "type": "string" },
  "updated_at": { "type": "string", "format": "date-time" },
  "updated_by": { "type": "string" },
  "expires_at": { "type": ["integer", "null"], "description": "Epoch seconds. Solo
EXPORT_JOB u otros efímeros; DynamoDB borra al expirar." },
  "platform_id":           { "type": "string", "description": "Solo PLATFORM.


### Tabla estructurada detectada

| { "name": "by_entity_type", | "partition_key": "entity_type", |
| --- | --- |
| "sort_key": null, | "purpose": "Listar entidades por tipo: PLATFORM, |
| { "name": "by_platform_name", | "partition_key": |
| "export_platform_id", | "sort_key": "created_at","purpose": "Historial de export |
| "platform_id": | { "type": "string", "description": "Solo PLATFORM. |


---

## Página 89

Mismo valor que entity_id. Formato PLAT#<uuid>." },
  "platform_name_partition": { "type": "string", "enum": ["PLATFORM"],
"description": "Solo PLATFORM. PK del GSI by_platform_name." },
  "name":                   { "type": "string", "description": "Solo
PLATFORM/CLIENT_CATEGORY/OUTPUT_TEMPLATE." },
  "normalized_name":               { "type": "string", "description": "Solo PLATFORM.
Case-insensitive, accent-insensitive, whitespace-normalized." },
  "code":                  { "type": "string", "description": "Solo PLATFORM. Slug
corto, ej: 'falabella-pe'. Único (guard vía
UNIQUE#PLATFORM_CODE#<code>)." },
  "platform_type":             { "type": "string", "enum": ["MARKETPLACE", "ERP",
"ECOMMERCE", "OTHER"], "description": "Solo PLATFORM." },
  "status":               { "type": "string", "enum": ["ACTIVE", "INACTIVE"],
"default": "ACTIVE", "description": "Solo PLATFORM." },
  "settings":              { "type": "object", "description": "Solo PLATFORM.
Configuración libre (credenciales, encoding, delimitadores)." },
  "client_category_id": { "type": "string", "description": "Solo
CLIENT_CATEGORY. Mismo valor que entity_id. Formato CLICAT#<uuid>." },
  "platform_id_ref":   { "type": "string", "description": "Solo
CLIENT_CATEGORY/OUTPUT_TEMPLATE. FK -> PLAT#<uuid>." },
  "external_code":      { "type": "string", "description": "Solo
CLIENT_CATEGORY. Código en el sistema del cliente (marketplace, ERP)." },
   "output_template_id": { "type": "string", "description": "Solo
OUTPUT_TEMPLATE. Mismo valor que entity_id. Formato OUTTPL#<uuid>." },
   "export_format":         { "type": "string", "enum": ["xlsx", "csv", "json", "xml"],
"description": "Solo OUTPUT_TEMPLATE." },
   "column_mappings":           { "type": "object", "additionalProperties": { "type":
"string" }, "description": "Solo OUTPUT_TEMPLATE. Mapeo campo interno ->
columna de salida." },
  "export_job_id":      { "type": "string", "description": "Solo EXPORT_JOB.
Mismo valor que entity_id. Formato EXPJOB#<uuid>." },
  "export_platform_id": { "type": "string", "description": "Solo EXPORT_JOB.
FK -> PLAT#<uuid>. PK del GSI by_export_platform_created." },
  "export_template_id": { "type": "string", "description": "Solo EXPORT_JOB.
FK -> OUTTPL#<uuid>." },
  "export_status":      { "type": "string", "enum": ["PENDING",
"PROCESSING", "COMPLETED", "FAILED"], "description": "Solo
EXPORT_JOB." },
  "s3_output_key":        { "type": ["string", "null"], "description": "Solo
EXPORT_JOB. Key S3 del archivo generado cuando status=COMPLETED." },
  "row_count":         { "type": ["integer", "null"], "description": "Solo
EXPORT_JOB. Filas exportadas." },
  "error_message":         { "type": ["string", "null"], "description": "Solo
EXPORT_JOB. Mensaje si export_status='FAILED'." }


### Tabla estructurada detectada

| "name": | { "type": "string", "description": "Solo |
| --- | --- |
| "normalized_name": | { "type": "string", "description": "Solo PLATFORM. |
| "code": | { "type": "string", "description": "Solo PLATFORM. Slug |
| "platform_type": | { "type": "string", "enum": ["MARKETPLACE", "ERP", |
| "status": | { "type": "string", "enum": ["ACTIVE", "INACTIVE"], |
| "settings": | { "type": "object", "description": "Solo PLATFORM. |
| "platform_id_ref": | { "type": "string", "description": "Solo |
| "external_code": | { "type": "string", "description": "Solo |
| "export_format": | { "type": "string", "enum": ["xlsx", "csv", "json", "xml"], |
| "column_mappings": | { "type": "object", "additionalProperties": { "type": |
| "export_job_id": | { "type": "string", "description": "Solo EXPORT_JOB. |
| "export_status": | { "type": "string", "enum": ["PENDING", |
| "s3_output_key": | { "type": ["string", "null"], "description": "Solo |
| "row_count": | { "type": ["integer", "null"], "description": "Solo |
| "error_message": | { "type": ["string", "null"], "description": "Solo |


---

## Página 90

  },
  "required": ["entity_id", "entity_type", "is_active", "created_at", "created_by",
"updated_at", "updated_by"]
}
user
{
   "title": "User",
   "type": "object",
   "x-dynamodb": {
     "table": "promotick-utec-users-{stage}",
     "partition_key": "user_id",
     "gsi": [
       {
         "name": "by_email",
         "partition_key": "email",
         "sort_key": null,
         "purpose": "Lookup al hacer login o al verificar unicidad de email"
       },
       {
         "name": "by_cognito_sub",
         "partition_key": "cognito_sub",
         "sort_key": null,
         "purpose": "Resolver identidad al recibir un JWT de Cognito (sub claim →
user_id interno)"
       }
     ],
     "x-auth-note": "Las credenciales viven en AWS Cognito. Esta tabla solo
guarda el perfil de aplicación (rol, scope, estado) enlazado por cognito_sub."
   },
   "properties": {
     "user_id":        { "type": "string", "description": "UUID interno. PK de la tabla."
},
     "cognito_sub": { "type": "string", "description": "sub del JWT de AWS
Cognito. Indexado por by_cognito_sub." },
     "email":         { "type": "string", "format": "email", "description": "Único.
Indexado por by_email." },
     "full_name": { "type": "string" },
     "role":        {
       "type": "string",
       "enum": ["SUPER", "ADMIN", "EJEC", "VIEWER"],
       "description": "SUPER: mantenimiento de la plataforma. ADMIN: acceso
total al negocio. EJEC: gestiona productos, uploads y exports. VIEWER: solo
lectura."
     },


### Tabla estructurada detectada

| "user_id": | { "type": "string", "description": "UUID interno. PK de la tabla." |
| --- | --- |
| "email": | { "type": "string", "format": "email", "description": "Único. |
| "role": | { |


---

## Página 91

     "supplier_id": { "type": "string", "description": "FK -> MasterTable.entity_id
(entity_type='supplier'). Solo aplica cuando role='VIEWER' y se quiere limitar la
visibilidad a un proveedor
  concreto. Si está vacío, el VIEWER ve todo el catálogo." },
     "status":     { "type": "string", "enum": ["active", "inactive"], "default":
"active" },
     "last_login_at": { "type": "string", "format": "date-time" },
     "created_at": { "type": "string", "format": "date-time" },
     "updated_at": { "type": "string", "format": "date-time" }
   },
   "required": ["user_id", "cognito_sub", "email", "full_name", "role", "status",
"created_at", "updated_at"]
 }
auditLog
{
 "title": "AuditLog",
 "type": "object",
 "x-dynamodb": {
   "table": "promotick-utec-audit-logs-{stage}",
   "partition_key": "event_id",
   "ttl_attribute": "expires_at",
   "gsi": [
     {
       "name": "by_target_created",
       "partition_key": "target_key",
       "sort_key": "created_at",
       "purpose": "Historial de eventos de una entidad concreta. target_key =
entity_id de la entidad afectada."
     }
   ],
   "x-notes": [
     "target_key es el entity_id directo (ya lleva prefijo único como SUP#, CAT#,
PROD#, PLAT#, USER#).",
     "expires_at usa TTL de DynamoDB para purga automática.",
     "PITR y stream NO habilitados (audit-logs no necesita rewinds ni
proyecciones downstream)."
   ]
 },
 "properties": {
   "event_id": { "type": "string", "description": "UUID del evento. PK." },
   "target_key": { "type": "string", "description": "entity_id de la entidad afectada
(SUP#<uuid>, CAT#<uuid>, PROD#<uuid>, PLAT#<uuid>, USER#<uuid>,
etc.). PK del GSI by_target_created." },
   "target_entity_type": {


---

## Página 92

auditLog
      "type": "string",
      "enum": [
        "SUPPLIER", "CATEGORY", "SUBCATEGORY", "PRODUCT",
        "SUPPLIER_UPLOAD",
        "PLATFORM", "CLIENT_CATEGORY", "OUTPUT_TEMPLATE",
"EXPORT_JOB",
        "USER"
      ],
      "description": "Redundante con el prefijo de target_key pero facilita filtros
in-memory."
    },
    "user_id": { "type": ["string", "null"], "description": "FK -> Users.user_id.
Ausente si fue acción de sistema." },
    "user_name": { "type": ["string", "null"], "description": "Desnormalizado desde
Users." },
    "action": {
      "type": "string",
      "enum": ["CREATE", "UPDATE", "DELETE", "LOGIN", "UPLOAD",
"CONFIRM_BATCH", "EXPORT", "RESOLVE_DUPLICATE"]
    },
    "changes": {
      "type": "object",
      "properties": {
        "before": { "type": "object" },
        "after": { "type": "object" }
      }
    },
    "ip_address":        { "type": ["string", "null"], "maxLength": 45 },
    "user_agent":        { "type": ["string", "null"] },
    "created_at":       { "type": "string", "format": "date-time" },
    "retention_class": {
      "type": "string",
      "enum": ["STANDARD_90D", "COMPLIANCE_7Y"],
      "description": "Política de retención. El writer traduce a expires_at:
STANDARD_90D = +90 días; COMPLIANCE_7Y = +2555 días.
COMPLIANCE_7Y para cambios de precio y logins ADMIN/SUPER."
    },
    "expires_at":       { "type": "integer", "description": "Epoch seconds.
DynamoDB borra al expirar. Derivado de retention_class." }
  },
  "required": ["event_id", "target_key", "target_entity_type", "action",
"created_at", "retention_class", "expires_at"]
}


### Tabla estructurada detectada

| "ip_address": | { "type": ["string", "null"], "maxLength": 45 }, |
| --- | --- |
| "user_agent": | { "type": ["string", "null"] }, |
| "created_at": | { "type": "string", "format": "date-time" }, |
| "expires_at": | { "type": "integer", "description": "Epoch seconds. |


---

## Página 93

●​ VOLUMEN ESTIMADO
     Requerimiento Funcional                            Cantidad de Usuarios Estimados
     RF-001 Registro y gestión de usuarios              5 concurrentes
     RF-002 El sistema debe permitir el registro        5 concurrentes
     de nuevos proveedores
     RF-003 El sistema debe permitir el registro        5 concurrentes
     de nuevas categorías y subcategorías
     RF-004 El sistema debe permitir el registro        5 concurrentes
     de nuevas plantillas de salida.
     RF-009/RF-047 El sistema debe permitir la          5 MB
     carga de productos según proveedor
●​ DISEÑO ARQUITECTÓNICO
   ○​ Vista lógica:
      ■​ Frontend: Aplicación web construida con Next.js (App Router), con renderizado en
           servidor (Server Components/SSR) y navegación fluida del lado del cliente, optimizada
           para resoluciones de escritorio (Desktop). Permite un acceso diferenciado basado en un
           control de acceso por roles (RBAC) estático e inmutable: SUPER, Administrador, Ejecutivo
           y Viewer.
      ■​ Backend (Arquitectura Orientada a Dominios):
          ●​     Módulo de Seguridad: Gestión de autenticación, emisión de tokens y control de
                 accesos.
          ●​     Módulo de Ingesta: Lógica de carga de archivos Excel, parser estructural de
                 documentos, y saneamiento de datos.
          ●​     Módulo Maestro: Gestión del catálogo centralizado, CRUD de proveedores, y
                 administración del árbol de categorías.
          ●​     Módulo Plataformas: Gestión de plataformas de exportación, motor de exportación,
                 gestión de plantillas de clientes y generación de archivos finales (CSV/XLSX).
      ■​ Capa de Datos (DynamoDB):
          ●​     Se utiliza una base de datos NoSQL (DynamoDB) para permitir un esquema
                 extensible. El sistema está diseñado para validar una estructura base obligatoria
                 (SKU, Nombre, Categoría), pero posee la capacidad de almacenar atributos
                 adicionales variables que el proveedor pueda incluir en sus archivos, sin requerir
                 cambios estructurales en la base de datos ni migraciones rígidas.
          ●​     Object Storage (Amazon S3): Repositorio inmutable para guardar archivos Excel
                 originales subidos por proveedores y los archivos de exportación generados.
      ■​ Orquestación Asíncrona (Serverless):
          ●​     Procesamiento asíncrono directo. Las funciones de carga pesada (como el motor de
                 exportación) se ejecutan en segundo plano liberando la petición HTTP principal y
                 notificando al frontend al finalizar.
      ■​ Servicios de IA:
          ●​     Integración con un LLM (claude) para realizar el mapeo semántico de cabeceras


### Tabla estructurada detectada

| Requerimiento Funcional | Cantidad de Usuarios Estimados |
| --- | --- |
| RF-001 Registro y gestión de usuarios | 5 concurrentes |
| RF-002 El sistema debe permitir el registro | 5 concurrentes |
| RF-003 El sistema debe permitir el registro | 5 concurrentes |
| RF-004 El sistema debe permitir el registro | 5 concurrentes |
| RF-009/RF-047 El sistema debe permitir la | 5 MB |
| ●​ | Módulo de Seguridad: Gestión de autenticación, emisión de tokens y control de |
| ●​ | Módulo de Ingesta: Lógica de carga de archivos Excel, parser estructural de |
| ●​ | Módulo Maestro: Gestión del catálogo centralizado, CRUD de proveedores, y |
| ●​ | Módulo Plataformas: Gestión de plataformas de exportación, motor de exportación, |
| ●​ | Se utiliza una base de datos NoSQL (DynamoDB) para permitir un esquema |
| ●​ | Object Storage (Amazon S3): Repositorio inmutable para guardar archivos Excel |
| ●​ | Procesamiento asíncrono directo. Las funciones de carga pesada (como el motor de |
| ●​ | Integración con un LLM (claude) para realizar el mapeo semántico de cabeceras |


---

## Página 94

                 desconocidas y la detección de registros duplicados o similares.
○​    Vista física:
     ■​ Entorno Cloud (Amazon Web Services - AWS):
         ●​       AWS API Gateway + AWS Lambda: Capa de cómputo serverless para ejecutar la
                  lógica de negocio (Backend). Escala automáticamente a cero cuando no hay uso.
         ●​       Amazon DynamoDB: Base de datos NoSQL de baja latencia y alta disponibilidad.
         ●​       Amazon S3: Almacenamiento seguro y versionado para archivos físicos.
         ●​       Amazon Cognito: Servicio de gestión y autenticación de usuarios.
     ■​ Clientes:
         ●​       Navegador Web de escritorio utilizado por los actores del sistema.
○​    Vista de despliegue:
     ■​ Nodo 1 – Cliente: Navegador Web del usuario renderizando la aplicación Next.js 16.2.6.
     ■​ Nodo 2 – Servidor de Autenticación: Amazon Cognito, encargado de validar
           credenciales y devolver tokens de sesión.
     ■​ Nodo 3 – Capa de API y Cómputo: AWS API Gateway exponiendo los endpoints hacia
           funciones AWS Lambda en Python que ejecutan los casos de uso.
     ■​ Nodo 4 – Base de Datos: Amazon DynamoDB alojando las tablas core.
     ■​ Nodo 5 – Almacenamiento de Archivos: Buckets de Amazon S3.
     ■​ Nodo 6 – Servicio Externo de IA: Servidores de Anthropic procesando las peticiones a la
           API de Claude.
           Ecosistema Backend (cómputo serverless):
     ■​    promotick-auth: Python 3.12; Serverless Framework v4; gestor pip.
     ■​    promotick-ingesta: Python 3.12 (arm64); Serverless Framework v4; gestor pip;
           orquestación con AWS Step Functions.
     ■​    promotick-master: Python 3.11+; AWS Chalice 2.0; gestor pip.
           Ecosistema Frontend e Infraestructura:
     ■​    promotick-frontend: Node.js, Next.js 16.2.6, React 19.2.4, TypeScript 5.9.3, TailwindCSS
           4, gestor pnpm 10.33.2.
     ■​    promotick-infrastructure: Serverless Framework v3 (stack de tablas) / v4 (stacks de
           cómputo); ejecución con Node.js; gestor npm.
           Servicios de AWS y externos:
     ■​    AWS API Gateway, AWS Lambda, Amazon DynamoDB, Amazon S3, Amazon Cognito
           (User Pools), AWS Step Functions; integración externa con la API de Anthropic Claude.


### Tabla estructurada detectada

| ○​ | Vista física: |
| --- | --- |
| ●​ | AWS API Gateway + AWS Lambda: Capa de cómputo serverless para ejecutar la |
| ●​ | Amazon DynamoDB: Base de datos NoSQL de baja latencia y alta disponibilidad. |
| ●​ | Amazon S3: Almacenamiento seguro y versionado para archivos físicos. |
| ●​ | Amazon Cognito: Servicio de gestión y autenticación de usuarios. |
| ●​ | Navegador Web de escritorio utilizado por los actores del sistema. |
| ○​ | Vista de despliegue: |
| ■​ | promotick-auth: Python 3.12; Serverless Framework v4; gestor pip. |
| ■​ | promotick-ingesta: Python 3.12 (arm64); Serverless Framework v4; gestor pip; |
| ■​ | promotick-master: Python 3.11+; AWS Chalice 2.0; gestor pip. |
| ■​ | promotick-frontend: Node.js, Next.js 16.2.6, React 19.2.4, TypeScript 5.9.3, TailwindCSS |
| ■​ | promotick-infrastructure: Serverless Framework v3 (stack de tablas) / v4 (stacks de |
| ■​ | AWS API Gateway, AWS Lambda, Amazon DynamoDB, Amazon S3, Amazon Cognito |


---

## Página 95

    ○​    Vista de integración:
         ■​ APIs REST Internas:
             ●​       Gestión de catálogos y proveedores (lectura/escritura).
             ●​       Gestión de usuarios e invocación de vistas estáticas por rol.
             ●​       Llamadas asíncronas para la generación de plantillas de salida.
         ■​    Módulo de Inteligencia Artificial:
              ●​   Integración vía API REST HTTPs hacia Anthropic Claude.
    ○​   Calculadora de gastos AWS:
​


### Tabla estructurada detectada

| ○​ | Vista de integración: |
| --- | --- |
| ●​ | Gestión de catálogos y proveedores (lectura/escritura). |
| ●​ | Gestión de usuarios e invocación de vistas estáticas por rol. |
| ●​ | Llamadas asíncronas para la generación de plantillas de salida. |
| ■​ | Módulo de Inteligencia Artificial: |
| ●​ | Integración vía API REST HTTPs hacia Anthropic Claude. |
| ○​ | Calculadora de gastos AWS: |


---

## Página 96

    ○​   Diseño
●​ PROTOTIPO
   Enlace del prototipo: https://promotick-prototipov2.vercel.app/catalogo


---

## Página 97

Credenciales:​
- correo: admin@promotick.com
- contraseña: 12345678
- correo: user@promotick.com
* contraseña: 12345678
