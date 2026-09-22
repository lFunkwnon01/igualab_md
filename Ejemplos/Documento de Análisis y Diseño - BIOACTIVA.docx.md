# Documento de Análisis y Diseño - BIOACTIVA.docx

> Conversión automática a Markdown desde el PDF original. Las tablas se representan con sintaxis Markdown para conservar filas y columnas de forma interpretable por modelos de IA.

**Páginas:** 160


---

## Página 1


---

## Página 2

                                    CONTENIDO
            HISTORIAL DE VERSIONES                                    4
            1. ANTECEDENTES                                           7
            2. OBJETIVO GENERAL                                       7
            3. ALCANCE DEL PROYECTO                                   7
            4. DISEÑO FUNCIONAL DETALLADO                             8
            5. DIAGRAMA DEL PROCESO                                  10
            6. REGLAS DE NEGOCIO                                     10
            7. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL                  15
              7.1. ACTORES                                           15
            DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN                 17
              7.2. LISTADO DE CASOS DE USO                           17
              7.3. ESPECIFICACIÓN DE CASOS                           17
                 CU001: Autenticación y recuperación de contraseña   17
                 CU002: Gestión de Usuarios                          27
                 CU003: Gestión de Organización                      39
                 CU004: Gestión de Contactos                         49
                 CU005: Gestión de Leads                             57
                 CU006: Gestión de las Cotizaciones                  67
                 CU007: Gestión de notificaciones                    74
                 CU008: Visualización de Dashboards                  87
                 CU009: Importación de datos                         91
                 CU010: Exportación de datos                         98
                 CU011: Gestión de Plantillas de Correo             101
              7.4. DIAGRAMA DE SECUENCIA                            108
              7.5. REQUERIMIENTOS FUNCIONALES                       134
              7.6. REQUERIMIENTOS NO FUNCIONALES                    140
            8. DICCIONARIO DE DATOS                                 141
              8.1. USUARIOS                                         141
              8.2. CONTACTOS                                        141
              8.3. ORGANIZACIONES                                   142
              8.4. LEADS                                            144
              8.5. ACTIVIDADES                                      145
              8.6. COTIZACIONES                                     146
              8.7. NOTIFICACIONES                                   148
              8.8. TEMPLATES_EMAIL                                  149
              8.9. USER_TOKENS                                      149
              8.10 NOTIFICACIONES_PROGRAMADAS                       150
              8.11 SEGUIMIENTO_INSTANCIA                            152
            9. VOLUMEN ESTIMADO                                     153
            10. DISEÑO ARQUITECTÓNICO                               155
              10.1. Vista Lógica                                    155
              10.2. Vista Física                                    156


---

## Página 3

              10.3. Vista de Despliegue                             156
              10.4. Vista de integración                            157
            11. PROTOTIPO                                           158
            12. ANEXO                                               158


---

## Página 4

                              HISTORIAL DE VERSIONES
           Fecha      Versión                   Descripción
          24/04/2026    1.0      Consolidación inicial del documento de análisis y diseño
          27/04/2026    1.1    Definición integral de los módulos que conforman el proyecto
                                  Especificación de los requerimientos funcionales y no
          30/04/2026    1.2
                                                 funcionales
                               Incorporación de los diagramas de modelado y representación
          04/05/2026    1.3
                                                 del sistema
                               Desarrollo del modelamiento de la base de datos y del diseño
          07/05/2026    1.4
                                                arquitectónico
          10/05/2026    1.5         Elaboración del prototipo funcional del sistema
          12/05/2026    1.6    Implementación de cambios mínimos sugeridos por el cliente
         Versión          Autores            Revisado por    Aprobado por
                 Josué Renzo Hernández Yataco Gonzalo Andrés Karien Diaz
           1.0
                 Joel Modesto Cayllahua Hilario Valladolid Jiménez Katia Samanud
                 Josué Renzo Hernández Yataco Gonzalo Andrés Karien Diaz
           1.1
                 Joel Modesto Cayllahua Hilario Valladolid Jiménez Katia Samanud
                 Josué Renzo Hernández Yataco Gonzalo Andrés Karien Diaz
           1.2
                 Joel Modesto Cayllahua Hilario Valladolid Jiménez Katia Samanud
                                           Gonzalo Andrés
                 Josué Renzo Hernández Yataco Valladolid Jiménez Karien Diaz
           1.3
                 Joel Modesto Cayllahua Hilario Paulo Isael Miranda Katia Samanud
                                           Barrientos


### Tablas de la página


#### Tabla 1

| Fecha | Versión | Descripción |
| --- | --- | --- |
| 24/04/2026 | 1.0 | Consolidación inicial del documento de análisis y diseño |
| 27/04/2026 | 1.1 | Definición integral de los módulos que conforman el proyecto |
| 30/04/2026 | 1.2 | Especificación de los requerimientos funcionales y no<br>funcionales |
| 04/05/2026 | 1.3 | Incorporación de los diagramas de modelado y representación<br>del sistema |
| 07/05/2026 | 1.4 | Desarrollo del modelamiento de la base de datos y del diseño<br>arquitectónico |
| 10/05/2026 | 1.5 | Elaboración del prototipo funcional del sistema |
| 12/05/2026 | 1.6 | Implementación de cambios mínimos sugeridos por el cliente |


#### Tabla 2

| Versión | Autores | Revisado por | Aprobado por |
| --- | --- | --- | --- |
| 1.0 | Josué Renzo Hernández Yataco<br>Joel Modesto Cayllahua Hilario | Gonzalo Andrés<br>Valladolid Jiménez | Karien Diaz<br>Katia Samanud |
| 1.1 | Josué Renzo Hernández Yataco<br>Joel Modesto Cayllahua Hilario | Gonzalo Andrés<br>Valladolid Jiménez | Karien Diaz<br>Katia Samanud |
| 1.2 | Josué Renzo Hernández Yataco<br>Joel Modesto Cayllahua Hilario | Gonzalo Andrés<br>Valladolid Jiménez | Karien Diaz<br>Katia Samanud |
| 1.3 | Josué Renzo Hernández Yataco<br>Joel Modesto Cayllahua Hilario | Gonzalo Andrés<br>Valladolid Jiménez<br>Paulo Isael Miranda<br>Barrientos | Karien Diaz<br>Katia Samanud |


---

## Página 5

                                           Fabricio Alonso
                                           Lanche Pacsi
                                           Gonzalo Andrés
                                           Valladolid Jiménez
                 Yuri Abel Escobar Perez   Paulo Isael Miranda Karien Diaz
           1.4
                 Joseph Anderson Cose Roja Barrientos        Katia Samanud
                                           Fabricio Alonso
                                           Lanche Pacsi
                                           Gonzalo Andrés
                                           Valladolid Jiménez
                 Jean Paul Cuzcano Ponce   Paulo Isael Miranda Karien Diaz
           1.6
                 Luis Anthony Romero Padilla Barrientos      Katia Samanud
                                           Fabricio Alonso
                                           Lanche Pacsi
            Autores:
            Project Manager: Gonzalo Andrés Valladolid Jiménez
            Analista Funcional: Josué Renzo Hernández Yataco
            Analista Funcional: Joel Modesto Cayllahua Hilario
            Frontend: Jean Paul Cuzcano Ponce
            Frontend: Luis Anthony Romero Padilla
            Backend: Yuri Abel Escobar Perez
            Backend: Joseph Anderson Cose Roja
            Tester: Paulo Isael Miranda Barrientos
            Tester: Fabricio Alonso Lanche Pacsi
            Revisores:
            TCH: Teofilo Chambilla Aquino
            Aprobadores
                              YY: Karien Diaz y Katia Samanud


### Tablas de la página


#### Tabla 1

|  |  | Fabricio Alonso<br>Lanche Pacsi |  |
| --- | --- | --- | --- |
| 1.4 | Yuri Abel Escobar Perez<br>Joseph Anderson Cose Roja | Gonzalo Andrés<br>Valladolid Jiménez<br>Paulo Isael Miranda<br>Barrientos<br>Fabricio Alonso<br>Lanche Pacsi | Karien Diaz<br>Katia Samanud |
| 1.6 | Jean Paul Cuzcano Ponce<br>Luis Anthony Romero Padilla | Gonzalo Andrés<br>Valladolid Jiménez<br>Paulo Isael Miranda<br>Barrientos<br>Fabricio Alonso<br>Lanche Pacsi | Karien Diaz<br>Katia Samanud |


---

## Página 6

                                GLOSARIO DE TÉRMINOS
          ● CRM: Sistema de gestión de relaciones con clientes que permite centralizar
            información comercial, realizar seguimientos y mantener registro de las interacciones
            con los clientes.
          ● CRM Bioactiva: Plataforma web de gestión de relaciones con clientes desarrollada
            para BioActiva. Permite centralizar y administrar información comercial de
            organizaciones, contactos, leads, actividades, cotizaciones, notificaciones, plantillas e
            indicadores, facilitando el seguimiento de oportunidades y la gestión del proceso
            comercial.
          ● Lead: Oportunidad comercial registrada en el CRM BioActiva que representa el interés
            de una organización en uno o más servicios ofrecidos por la empresa.
          ● Encargado: Usuario asignado para gestionar un lead dentro del CRM BioActiva.
          ● SUNAT: Entidad pública peruana utilizada como fuente de consulta para validar o
            completar información relacionada con organizaciones mediante RUC o razón social.
          ● Código interno: Identificador único asignado dentro del CRM BioActiva a una
            organización que no cuenta con RUC.
          ● Indicador comercial / KPI: Métrica utilizada para evaluar el desempeño comercial,
            como número de leads generados, tasa de conversión, monto en pipeline o tiempo
            promedio de cierre.
          ● Exportación de datos: Proceso mediante el cual se descarga información del CRM
            BioActiva en formato Excel, aplicando filtros definidos por el usuario.
          ● Microsoft Outlook: Servicio externo utilizado para apoyar el envío de correos de
            seguimiento, recordatorios y comunicaciones asociadas a actividades comerciales.
          ● Microsoft Teams: Servicio externo que puede utilizarse para generar o asociar
            enlaces de reunión vinculados a actividades comerciales.
          ● Token de autenticación: Código seguro generado por el sistema para mantener
            activa la sesión de un usuario autenticado.
          ● Token de activación: Código seguro enviado al correo de un nuevo usuario para
            permitir la configuración inicial de credenciales y activación de cuenta.
          ● Token de recuperación: Código seguro enviado por correo para permitir que un
            usuario restablezca su contraseña.
          ● Correo interno: Mensaje enviado al encargado para recordarle una acción pendiente
            o solicitar revisión.
          ● Correo externo: Mensaje enviado al cliente o contacto asociado a un lead como parte
            del seguimiento comercial.
          ● Historial comercial: Registro ordenado de las interacciones, actividades,


---

## Página 7

            cotizaciones, notificaciones y cambios de estado asociados a un lead, contacto u
            organización dentro del CRM BioActiva .
          1. ANTECEDENTES
            BioActiva es una empresa especializada en gestión de la innovación, formulación de
            proyectos de I+D+i, innovación abierta, vigilancia tecnológica, gestión de propiedad
            intelectual y fortalecimiento de capacidades empresariales. Su propuesta se orienta a
            acompañar a organizaciones en el desarrollo de proyectos de investigación, desarrollo
            e innovación, conectando tecnología, negocio y sostenibilidad para transformar ideas
            en soluciones concretas. Actualmente, BioActiva gestiona relaciones comerciales con
            diversas organizaciones interesadas en sus servicios. Sin embargo, el registro manual
            de la información mediante hojas de excel puede generar duplicidad de datos,
            dificultad para validar organizaciones, pérdida de seguimiento de oportunidades y
            menor visibilidad sobre el avance del proceso comercial. Frente a ello, se plantea el
            desarrollo de un CRM que centralice la información comercial, organice el seguimiento
            de oportunidades y facilite la gestión de contactos, actividades, notificaciones,
            cotizaciones e indicadores comerciales. Con esto, se busca mejorar la integridad de la
            información, optimizar el seguimiento comercial y apoyar la formalización de
            oportunidades de negocio.
          2. OBJETIVO GENERAL
            Desarrollar una aplicación web centralizada de tipo CRM para BioActiva, que permita
            gestionar la información comercial de manera ordenada, garantizar la unicidad de las
            entidades registradas y conservar el historial de las interacciones comerciales durante
            las distintas etapas del proceso de venta, desde la identificación de un prospecto hasta
            su cierre comercial. Asimismo, la aplicación permitirá gestionar notificaciones,
            consultar indicadores mediante dashboards y administrar información mediante
            criterios de búsqueda, filtrado, importación y exportación de datos.
          3. ALCANCE DEL PROYECTO
            El proyecto comprende el diseño, desarrollo e implementación de una plataforma web
            integral para la gestión de relaciones con clientes de BioActiva. La solución busca
            centralizar la información comercial actualmente gestionada de forma manual o
            dispersa, mediante una arquitectura cliente-servidor que favorezca la integridad,
            seguridad y disponibilidad de los datos. El sistema estará orientado a optimizar las
            operaciones de dos perfiles principales: Trabajador y Administrador. Ambos perfiles
            compartirán la mayoría de funcionalidades operativas, mientras que el Administrador


---

## Página 8

            contará con permisos adicionales para la gestión de usuarios y control de acceso.
          4. DISEÑO FUNCIONAL DETALLADO
            El proyecto comprende el diseño, desarrollo e implementación de los siguientes
            módulos:
            ●  Módulo de Seguridad: Este módulo ofrece control de acceso basado en los roles
               de Trabajador y Administrador, a la par que gestiona el uso de tokens para validar
               credenciales, mantener sesiones activas y gestionar la existencia de enlaces de
               recuperación de contraseña y registro de usuario. El sistema implementa un flujo
               de registro por invitación, donde el administrador genera una solicitud enviada al
               correo institucional del nuevo usuario. Esta invitación contiene un enlace que
               redirige a la plataforma para la configuración inicial de credenciales y activación de
               cuenta. Además, el módulo permite validar credenciales, mantener sesiones
               activas y controlar el acceso a las funcionalidades según el rol asignado.
            ●  Módulo de Gestión de Organizaciones: Este módulo permite registrar, consultar
               y editar organizaciones dentro del CRM BioActiva, garantizando que cada
               organización cuente con un identificador único. Además, el usuario podrá
               visualizar la información general registrada, los contactos asociados, el historial de
               leads vinculados y el historial de cotizaciones relacionadas con los leads de dicha
               organización.
            ●  Módulo de Administración de Contactos: Este módulo permite registrar,
               consultar y editar personas naturales vinculadas a organizaciones registradas en
               el CRM BioActiva. Cada contacto debe estar asociado obligatoriamente a una
               organización y contar con un correo electrónico principal único, el cual será
               validado dentro de este módulo para evitar duplicidades.
            ●  Módulo de Pipeline de Leads: Este módulo permite registrar, consultar y
               gestionar leads u oportunidades comerciales dentro del CRM BioActiva. Cada lead
               debe estar asociado obligatoriamente a una organización y puede estar asociado
               opcionalmente a un contacto. El sistema permite visualizar los leads en un pipeline
               comercial bajo estados definidos: En prospecto, Ofertado, Cierre con venta y
               Cierre sin venta. Para cada lead, el usuario puede registrar y consultar
               actividades de seguimiento, tales como correos, llamadas, reuniones u otro tipo de
               actividad definida por el usuario.


---

## Página 9

            ●  Módulo de Gestión de Cotizaciones: Este módulo permite registrar, consultar y
               editar cotizaciones asociadas a leads existentes dentro del CRM BioActiva. Las
               cotizaciones formalizan propuestas comerciales mediante información económica
               y técnica.
            ●  Módulo de Dashboards y Reportes Tácticos: Este módulo presenta una interfaz
               visual orientada a la toma de decisiones basada en datos registrados en leads,
               actividades y cotizaciones. Permite consultar indicadores comerciales como
               número de leads generados, tasa de conversión de propuesta a cierre con venta,
               tiempo promedio de cierre, tiempo en etapa de propuesta, número promedio de
               acciones de seguimiento por lead, monto total en pipeline, ingresos cerrados y
               porcentaje de leads con más de 30 días sin avance. La visualización de métricas
               podrá filtrarse por periodo de análisis, mediante fecha de inicio y fecha fin.
            ●  Módulo de Notificaciones y Plantillas: Este módulo permite programar
               notificaciones asociadas a actividades de seguimiento de un lead. El usuario
               podrá elegir entre dos configuraciones: Recordatorio o Seguimiento.
               El Recordatorio está dirigido únicamente al encargado y sirve para alertarlo sobre
               una acción pendiente en una fecha y hora definida. El Seguimiento involucra al
               encargado y al cliente/contacto asociado al lead: primero se envía un correo
               interno al encargado para que revise si la actividad fue atendida o completada; si
               el encargado marca la actividad como completada, se cancelan los pasos
               pendientes. Si no se marca como completada antes de la fecha programada, el
               sistema mantiene el envío del correo externo al cliente.
               El módulo también incluye la gestión de plantillas de correo, utilizadas como base
               para los mensajes enviados al encargado o al cliente. Estas plantillas podrán ser
               creadas, editadas, desactivadas o eliminadas según corresponda, y podrán
               personalizarse al momento de programar un recordatorio o seguimiento sin
               modificar la plantilla original.
               Las notificaciones se visualizan únicamente en las secciones Programadas y
               Enviadas. Las notificaciones canceladas se eliminan de la programación, no se
               ejecutan y no se almacenan en el historial visible.
            ●  Módulo de Gestión de Datos: Este módulo facilita la administración de
               información mediante procesos de importación y exportación de datos. Permite
               importar registros desde archivos Excel para agilizar la carga inicial o migración de
               información hacia la plataforma, respetando la estructura definida, los campos
               obligatorios, las relaciones entre entidades y las reglas de unicidad. Asimismo,


---

## Página 10

               permite exportar información del CRM BioActiva en formato Excel, aplicando filtros
               según el tipo de información seleccionada. La exportación conserva una
               estructura tabular con encabezados y registros por filas.
          5. DIAGRAMA DEL PROCESO
            El diagrama del proceso se presenta de manera detallada en el anexo del documento.
          6. REGLAS DE NEGOCIO
            Las Reglas de Negocio (RN) se detallan a continuación:
                     NOMBRE DE LA
               Nº                           DETALLE DE LA REGLA
                        REGLA
                                   Todo acceso al CRM BioActiva debe realizarse
                                   mediante credenciales válidas o mediante una
                                   sesión vigente y auténtica. Las credenciales de
                      Validación de acceso deben corresponder a un usuario registrado,
                         Sesión    habilitado y autorizado dentro del sistema. No
             RN-001
                         Activa    deberá otorgarse acceso al CRM BioActiva cuando
                                   las credenciales sean incorrectas, el usuario no se
                                   encuentre registrado, el usuario esté deshabilitado
                                   o la sesión haya expirado luego de 1 semana de
                                   haber ingresado al CRM BioActiva.
                                   El acceso al CRM BioActiva debe estar reservado
                                   únicamente para usuarios previamente registrados,
                                   habilitados y autorizados por el administrador. Cada
                                   usuario deberá contar con un rol asignado, el cual
                                   determinará el alcance de sus permisos dentro del
                                   sistema. Los usuarios con rol Trabajador podrán
                    Acceso Restringido
             RN-002
                                   visualizar y gestionar información operativa
                    y Control por Rol
                                   relacionada con organizaciones, contactos, leads,
                                   actividades, cotizaciones y notificaciones.
                                   Asimismo, podrán acceder a dashboards,
                                   importaciones, exportaciones y gestionar su
                                   información de usuario para el cambio de nombre y
                                   contraseña. El rol Administrador contará con los


### Tablas de la página


#### Tabla 1

| Nº | NOMBRE DE LA<br>REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
| RN-001 | Validación de<br>Sesión<br>Activa | Todo acceso al CRM BioActiva debe realizarse<br>mediante credenciales válidas o mediante una<br>sesión vigente y auténtica. Las credenciales de<br>acceso deben corresponder a un usuario registrado,<br>habilitado y autorizado dentro del sistema. No<br>deberá otorgarse acceso al CRM BioActiva cuando<br>las credenciales sean incorrectas, el usuario no se<br>encuentre registrado, el usuario esté deshabilitado<br>o la sesión haya expirado luego de 1 semana de<br>haber ingresado al CRM BioActiva. |
| RN-002 | Acceso Restringido<br>y Control por Rol | El acceso al CRM BioActiva debe estar reservado<br>únicamente para usuarios previamente registrados,<br>habilitados y autorizados por el administrador. Cada<br>usuario deberá contar con un rol asignado, el cual<br>determinará el alcance de sus permisos dentro del<br>sistema. Los usuarios con rol Trabajador podrán<br>visualizar y gestionar información operativa<br>relacionada con organizaciones, contactos, leads,<br>actividades, cotizaciones y notificaciones.<br>Asimismo, podrán acceder a dashboards,<br>importaciones, exportaciones y gestionar su<br>información de usuario para el cambio de nombre y<br>contraseña. El rol Administrador contará con los |


---

## Página 11

                     NOMBRE DE LA
               Nº                           DETALLE DE LA REGLA
                        REGLA
                                   mismos permisos operativos que el rol Trabajador y,
                                   adicionalmente, será el único autorizado para
                                   gestionar usuarios, incluyendo su creación,
                                   invitación, habilitación, deshabilitación, asignación y
                                   cambio de roles.
                                   Los registros principales del sistema, como
                                   usuarios, organizaciones, contactos, leads,
                                   actividades, cotizaciones, notificaciones y plantillas,
                       Unicidad y
                                   deben contar con identificadores únicos que
             RN-003  Conservación de
                                   permitan diferenciarlos correctamente y evitar
                         Datos
                                   duplicidades. Asimismo, no debe realizarse el
                                   borrado físico de organizaciones, contactos, leads y
                                   cotizaciones.
                                   Cuando la organización no cuente con RUC, deberá
                                   utilizarse un código interno único definido para su
                                   identificación dentro del CRM BioActiva. La
                       Registro e
                                   información obtenida mediante consulta
             RN-004  Identificación de
                                   automatizada a SUNAT por RUC o razón social
                      Organizaciones
                                   podrá utilizarse para completar los datos de la
                                   organización, siempre que la búsqueda retorne
                                   información válida.
                                   El sistema debe garantizar que un contacto este
                     Administración de
             RN-005                vinculado obligatoriamente a una organización
                       Contactos
                                   existente dentro del CRM BioActiva.
                                   Todo interés comercial formalizado en el CRM
                     Formalización de
                                   BioActiva debe registrarse como un lead dentro del
             RN-006
                         Leads
                                   pipeline comercial y debe estar vinculado
                                   obligatoriamente a una organización registrada.


### Tablas de la página


#### Tabla 1

| Nº | NOMBRE DE LA<br>REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
|  |  | mismos permisos operativos que el rol Trabajador y,<br>adicionalmente, será el único autorizado para<br>gestionar usuarios, incluyendo su creación,<br>invitación, habilitación, deshabilitación, asignación y<br>cambio de roles. |
| RN-003 | Unicidad y<br>Conservación de<br>Datos | Los registros principales del sistema, como<br>usuarios, organizaciones, contactos, leads,<br>actividades, cotizaciones, notificaciones y plantillas,<br>deben contar con identificadores únicos que<br>permitan diferenciarlos correctamente y evitar<br>duplicidades. Asimismo, no debe realizarse el<br>borrado físico de organizaciones, contactos, leads y<br>cotizaciones. |
| RN-004 | Registro e<br>Identificación de<br>Organizaciones | Cuando la organización no cuente con RUC, deberá<br>utilizarse un código interno único definido para su<br>identificación dentro del CRM BioActiva. La<br>información obtenida mediante consulta<br>automatizada a SUNAT por RUC o razón social<br>podrá utilizarse para completar los datos de la<br>organización, siempre que la búsqueda retorne<br>información válida. |
| RN-005 | Administración de<br>Contactos | El sistema debe garantizar que un contacto este<br>vinculado obligatoriamente a una organización<br>existente dentro del CRM BioActiva. |
| RN-006 | Formalización de<br>Leads | Todo interés comercial formalizado en el CRM<br>BioActiva debe registrarse como un lead dentro del<br>pipeline comercial y debe estar vinculado<br>obligatoriamente a una organización registrada. |


---

## Página 12

                     NOMBRE DE LA
               Nº                           DETALLE DE LA REGLA
                        REGLA
                                   La asociación con un contacto será opcional,
                                   según la disponibilidad de información al momento
                                   del registro.
                                   Toda oportunidad comercial que alcance una etapa
                                   de cierre debe contar con solamente una cotización
                                   asociada al lead correspondiente, donde se
                                   documenten los términos económicos y técnicos del
                                   servicio ofrecido. Toda cotización registrada en el
                                   CRM  BioActiva debe contar con un estado
                                   comercial válido, como Pendiente, Enviada,
                       Registro y
                                   Aceptada o Rechazada, según el avance real de la
                       Resultado
            RN-007                 propuesta. Cuando una cotización sea marcada
                      Comercial de
                                   como Aceptada, el lead asociado debe encontrarse
                      Cotizaciones
                                   o actualizarse al estado Cierre con venta, siempre
                                   que se cumplan las condiciones definidas para
                                   cerrar la oportunidad comercial. Del mismo modo,
                                   cuando una cotización sea marcada como
                                   Rechazada, el lead asociado debe encontrarse o
                                   actualizarse al estado Cierre sin venta, según
                                   corresponda al resultado comercial de la propuesta.
                                   Toda interacción comercial realizada sobre un lead
                                   debe quedar registrada como una actividad dentro
                                   del CRM BioActiva. Cada actividad deberá estar
                                   asociada obligatoriamente a un lead. Las
                                   actividades deberán gestionarse mediante estados
                                   definidos por el negocio, tales como Pendiente y
                     Registro y Control Completada. según corresponda al avance real del
            RN-008   de Actividades de seguimiento comercial.
                       Seguimiento


### Tablas de la página


#### Tabla 1

| Nº | NOMBRE DE LA<br>REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
|  |  | La asociación con un contacto será opcional,<br>según la disponibilidad de información al momento<br>del registro. |
| RN-007 | Registro y<br>Resultado<br>Comercial de<br>Cotizaciones | Toda oportunidad comercial que alcance una etapa<br>de cierre debe contar con solamente una cotización<br>asociada al lead correspondiente, donde se<br>documenten los términos económicos y técnicos del<br>servicio ofrecido. Toda cotización registrada en el<br>CRM BioActiva debe contar con un estado<br>comercial válido, como Pendiente, Enviada,<br>Aceptada o Rechazada, según el avance real de la<br>propuesta. Cuando una cotización sea marcada<br>como Aceptada, el lead asociado debe encontrarse<br>o actualizarse al estado Cierre con venta, siempre<br>que se cumplan las condiciones definidas para<br>cerrar la oportunidad comercial. Del mismo modo,<br>cuando una cotización sea marcada como<br>Rechazada, el lead asociado debe encontrarse o<br>actualizarse al estado Cierre sin venta, según<br>corresponda al resultado comercial de la propuesta. |
| RN-008 | Registro y Control<br>de Actividades de<br>Seguimiento | Toda interacción comercial realizada sobre un lead<br>debe quedar registrada como una actividad dentro<br>del CRM BioActiva. Cada actividad deberá estar<br>asociada obligatoriamente a un lead. Las<br>actividades deberán gestionarse mediante estados<br>definidos por el negocio, tales como Pendiente y<br>Completada. según corresponda al avance real del<br>seguimiento comercial. |


---

## Página 13

                     NOMBRE DE LA
               Nº                           DETALLE DE LA REGLA
                        REGLA
                                   No deberá registrarse una nueva próxima actividad
                                   si la actividad inmediata anterior permanece en
                                   estado Pendiente. Para continuar con una nueva
                                   programación, la actividad anterior deberá ser
                                   previamente marcada como COMPLETADA
                                   Todo lead registrado en el CRM BioActiva deberá
                                   encontrarse únicamente en uno de los estados
                                   definidos por el pipeline comercial: En prospecto,
                                   Ofertado, Cierre con venta o Cierre sin venta.
                    Control de Estados
            RN-009                 Todo cambio de estado deberá reflejar el avance
                    del Lead
                                   real de la oportunidad comercial. Un lead solo
                                   deberá considerarse cerrado cuando alcance uno
                                   de los estados finales definidos: Cierre con venta o
                                   Cierre sin venta.
                                   Los indicadores comerciales del CRM BioActiva
                                   deben calcularse a partir de la información
                                   registrada en leads, actividades y cotizaciones. La
                                   visualización de indicadores deberá considerar
                                   únicamente datos válidos y disponibles dentro del
                                   sistema, respetando los filtros definidos por el
                    Visualización de usuario, como el periodo de análisis. Los
            RN-010
                    Indicadores    indicadores deberán servir como soporte para el
                                   seguimiento del pipeline comercial, la identificación
                                   de oportunidades sin avance y la toma de
                                   decisiones operativas y comerciales. El dashboard
                                   no deberá modificar información registrada en el
                                   sistema; su finalidad será únicamente consultiva y
                                   analítica.
                                   La información registrada en el CRM BioActiva
            RN-011
                                   deberá poder consultarse y exportarse de acuerdo


### Tablas de la página


#### Tabla 1

| Nº | NOMBRE DE LA<br>REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
|  |  | No deberá registrarse una nueva próxima actividad<br>si la actividad inmediata anterior permanece en<br>estado Pendiente. Para continuar con una nueva<br>programación, la actividad anterior deberá ser<br>previamente marcada como COMPLETADA |
| RN-009 | Control de Estados<br>del Lead | Todo lead registrado en el CRM BioActiva deberá<br>encontrarse únicamente en uno de los estados<br>definidos por el pipeline comercial: En prospecto,<br>Ofertado, Cierre con venta o Cierre sin venta.<br>Todo cambio de estado deberá reflejar el avance<br>real de la oportunidad comercial. Un lead solo<br>deberá considerarse cerrado cuando alcance uno<br>de los estados finales definidos: Cierre con venta o<br>Cierre sin venta. |
| RN-010 | Visualización de<br>Indicadores | Los indicadores comerciales del CRM BioActiva<br>deben calcularse a partir de la información<br>registrada en leads, actividades y cotizaciones. La<br>visualización de indicadores deberá considerar<br>únicamente datos válidos y disponibles dentro del<br>sistema, respetando los filtros definidos por el<br>usuario, como el periodo de análisis. Los<br>indicadores deberán servir como soporte para el<br>seguimiento del pipeline comercial, la identificación<br>de oportunidades sin avance y la toma de<br>decisiones operativas y comerciales. El dashboard<br>no deberá modificar información registrada en el<br>sistema; su finalidad será únicamente consultiva y<br>analítica. |
| RN-011 |  | La información registrada en el CRM BioActiva<br>deberá poder consultarse y exportarse de acuerdo |


---

## Página 14

                     NOMBRE DE LA
               Nº                           DETALLE DE LA REGLA
                        REGLA
                                   con criterios de filtrado definidos por el negocio. La
                                   exportación deberá realizarse en formato Excel,
                                   manteniendo una estructura tabular con
                    Filtrado y     encabezados de columna y registros separados por
                    Exportación de filas. La exportación no deberá modificar, eliminar ni
                    Información    actualizar información registrada en el sistema. Su
                                   finalidad será únicamente facilitar el análisis,
                                   respaldo operativo y gestión comercial de la
                                   información.
                                   La información histórica o inicial de BioActiva podrá
                                   ser incorporada al CRM BioActiva mediante
                                   archivos de importación en formato permitido,
                                   siempre que cumpla con la estructura definida por
                                   el sistema.
                                   Los archivos importados deberán respetar los
                                   campos obligatorios, tipos de datos, relaciones
                                   entre entidades y reglas de unicidad establecidas
                                   para organizaciones, contactos, leads y
                    Importación de
            RN-012
                                   cotizaciones.
                    información
                                   No  deberán importarse registros duplicados,
                                   incompletos o con relaciones inválidas, como
                                   contactos sin organización asociada o leads sin
                                   organización registrada.
                                   La importación deberá conservar la integridad de la
                                   información y facilitar la migración ordenada desde
                                   los archivos operativos originales hacia la
                                   plataforma CRM BioActiva.
                    Programación y
                                   Toda actividad de seguimiento asociada a un lead
            RN - 013 automatización de
                                   podrá contar con notificaciones programadas para
                    notificaciones


### Tablas de la página


#### Tabla 1

| Nº | NOMBRE DE LA<br>REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
|  | Filtrado y<br>Exportación de<br>Información | con criterios de filtrado definidos por el negocio. La<br>exportación deberá realizarse en formato Excel,<br>manteniendo una estructura tabular con<br>encabezados de columna y registros separados por<br>filas. La exportación no deberá modificar, eliminar ni<br>actualizar información registrada en el sistema. Su<br>finalidad será únicamente facilitar el análisis,<br>respaldo operativo y gestión comercial de la<br>información. |
| RN-012 | Importación de<br>información | La información histórica o inicial de BioActiva podrá<br>ser incorporada al CRM BioActiva mediante<br>archivos de importación en formato permitido,<br>siempre que cumpla con la estructura definida por<br>el sistema.<br>Los archivos importados deberán respetar los<br>campos obligatorios, tipos de datos, relaciones<br>entre entidades y reglas de unicidad establecidas<br>para organizaciones, contactos, leads y<br>cotizaciones.<br>No deberán importarse registros duplicados,<br>incompletos o con relaciones inválidas, como<br>contactos sin organización asociada o leads sin<br>organización registrada.<br>La importación deberá conservar la integridad de la<br>información y facilitar la migración ordenada desde<br>los archivos operativos originales hacia la<br>plataforma CRM BioActiva. |
| RN - 013 | Programación y<br>automatización de<br>notificaciones | Toda actividad de seguimiento asociada a un lead<br>podrá contar con notificaciones programadas para |


---

## Página 15

                     NOMBRE DE LA
               Nº                           DETALLE DE LA REGLA
                        REGLA
                                   recordar acciones pendientes al encargado
                                   correspondiente. Las notificaciones deberán estar
                                   vinculadas a una actividad, lead, encargado y fecha
                                   de ejecución definida.
                                   Las actividades de seguimiento, reuniones y
                                   notificaciones del CRM BioActiva podrán integrarse
                                   con herramientas del ecosistema Microsoft, como
                                   Outlook Mail, Outlook Calendar y Teams, cuando
                                   dicha integración se encuentre habilitada y
                                   configurada.
                                   El uso de Outlook Mail deberá apoyar el envío de
                                   correos relacionados con  recordatorios,
                    Integración con seguimientos y notificaciones comerciales pero no
            RN-014  ecosistema     necesita la integración con la cuenta del usuario.
                    Microsoft      Por otro lado, el uso de Outlook Calendar y
                                   Microsoft Teams si requiere la integración y podrán
                                   utilizarse para registrar las actividades que
                                   involucren reuniones al calendario del usuario en
                                   conjunto con un enlace de Microsoft Teams.
                                   Cuando la integración no se encuentre disponible,
                                   el sistema deberá permitir continuar con el registro
                                   y seguimiento interno de la actividad, sin depender
                                   obligatoriamente de Microsoft.
          7. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL
            7.1. ACTORES
                A continuación, se describen los roles y sistemas externos que interactúan con la
                aplicación web de Bioactiva:


### Tablas de la página


#### Tabla 1

| Nº | NOMBRE DE LA<br>REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
|  |  | recordar acciones pendientes al encargado<br>correspondiente. Las notificaciones deberán estar<br>vinculadas a una actividad, lead, encargado y fecha<br>de ejecución definida. |
| RN-014 | Integración con<br>ecosistema<br>Microsoft | Las actividades de seguimiento, reuniones y<br>notificaciones del CRM BioActiva podrán integrarse<br>con herramientas del ecosistema Microsoft, como<br>Outlook Mail, Outlook Calendar y Teams, cuando<br>dicha integración se encuentre habilitada y<br>configurada.<br>El uso de Outlook Mail deberá apoyar el envío de<br>correos relacionados con recordatorios,<br>seguimientos y notificaciones comerciales pero no<br>necesita la integración con la cuenta del usuario.<br>Por otro lado, el uso de Outlook Calendar y<br>Microsoft Teams si requiere la integración y podrán<br>utilizarse para registrar las actividades que<br>involucren reuniones al calendario del usuario en<br>conjunto con un enlace de Microsoft Teams.<br>Cuando la integración no se encuentre disponible,<br>el sistema deberá permitir continuar con el registro<br>y seguimiento interno de la actividad, sin depender<br>obligatoriamente de Microsoft. |


---

## Página 16

              ●  Administrador: Es el usuario con privilegios totales sobre la plataforma. Su
                 función principal es la gestión del Módulo de Seguridad (envío de correos para
                 el registro de los nuevos usuarios). También contará con acceso al módulo de
                 Notificaciones.
              ●  Trabajador: Representa al usuario operativo encargado del ciclo de vida del
                 cliente. Sus responsabilidades incluyen el registro de nuevas entidades en el
                 Módulo de Organizaciones, la vinculación de personas naturales en el Módulo
                 de Contactos y el avance de oportunidades a través del Módulo de Pipeline de
                 Leads hasta la formalización en el Módulo de Cotizaciones. Asimismo
                 interacciona con el Módulo de Dashboards y Reportes Tácticos, donde analiza
                 el desempeño del equipo comercial. Por último podrá importar y extraer
                 organizaciones/contactos/leads a través del módulo de Gestión de Datos.
              ●  Sistema SUNAT (Externo): Actor de tipo sistema que interactúa de forma
                 automatizada con el Módulo de Gestión de Organizaciones. Actúa como
                 proveedor de datos fidedignos, permitiendo que el sistema valide la existencia
                 legal y el estado fiscal de los RUCs ingresados para asegurar la integridad de
                 la base de datos institucional.
              ●  Outlook / Microsoft (Externo): Actor de tipo sistema externo que interactúa
                 con el Módulo de Notificaciones y, cuando corresponda, con el registro de
                 actividades comerciales. Actúa como servicio de apoyo para el envío de
                 correos de seguimiento, recordatorios al encargado y comunicaciones dirigidas
                 al cliente. Asimismo, puede integrarse con Outlook Calendar y Teams para
                 asociar reuniones a actividades registradas en un lead. Su uso está
                 condicionado a que la integración Microsoft se encuentre habilitada y
                 configurada en el sistema.


---

## Página 17

            DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN
            7.2. LISTADO DE CASOS DE USO
                CÓDIGO             NOMBRE               CU PADRE
                        Autenticación y recuperación de
                CU001
                        contraseña
                CU002   Gestión de usuarios              CU001
                CU003   Gestión de Organizaciones        CU001
                CU004   Gestión de Contactos             CU002
                CU005   Gestión de Leads                 CU003
                CU006   Gestión de las Cotizaciones      CU004
                CU007   Gestión de Notificaciones        CU004
                CU008   Visualización de Dashboards      CU004
                CU009   Importación de datos             CU004
                CU010   Exportación de datos             CU004
                CU011   Gestión de Plantillas de Correo  CU007
            7.3. ESPECIFICACIÓN DE CASOS
                CU001: Autenticación y recuperación de contraseña
                           El sistema debe permitir que los usuarios registrados
                           accedan al CRM BioActiva mediante correo electrónico y
                           contraseña.
                Descripción
                           Cuando el usuario intenta iniciar sesión, el sistema valida
                           sus credenciales contra los registros existentes en la
                           base de datos. El acceso solo se permite a usuarios


### Tablas de la página


#### Tabla 1

| CÓDIGO | NOMBRE | CU PADRE |
| --- | --- | --- |
| CU001 | Autenticación y recuperación de<br>contraseña |  |
| CU002 | Gestión de usuarios | CU001 |
| CU003 | Gestión de Organizaciones | CU001 |
| CU004 | Gestión de Contactos | CU002 |
| CU005 | Gestión de Leads | CU003 |
| CU006 | Gestión de las Cotizaciones | CU004 |
| CU007 | Gestión de Notificaciones | CU004 |
| CU008 | Visualización de Dashboards | CU004 |
| CU009 | Importación de datos | CU004 |
| CU010 | Exportación de datos | CU004 |
| CU011 | Gestión de Plantillas de Correo | CU007 |


#### Tabla 2

| Descripción | El sistema debe permitir que los usuarios registrados<br>accedan al CRM BioActiva mediante correo electrónico y<br>contraseña.<br>Cuando el usuario intenta iniciar sesión, el sistema valida<br>sus credenciales contra los registros existentes en la<br>base de datos. El acceso solo se permite a usuarios |
| --- | --- |


---

## Página 18

                           previamente registrados y habilitados.
                           Si las credenciales son válidas, el sistema permite el
                           acceso según su rol y establece la duración de la sesión
                           autenticada. Asimismo, el sistema debe permitir la
                           recuperación de contraseña mediante el envío de un
                           correo con un enlace seguro para definir una nueva
                           clave.
                Actores    Administrador, Trabajador, Outlook / Microsoft
                Precondiciones
                  1. El sistema debe estar desplegado y operativo.
                  2. El usuario debe estar registrado en el CRM BioActiva.
                  3. El usuario debe encontrarse habilitado.
                  4. El usuario debe contar con un rol asignado.
                  5. Para recuperación de contraseña, el correo del usuario debe estar
                     registrado en el sistema.
                  6. El servicio de correo debe estar disponible para enviar enlaces de
                     recuperación.
                Flujo Básico
                  1. El usuario accede a la URL del CRM BioActiva.
                  2. El sistema muestra el formulario de inicio de sesión según el
                     formato del prototipo.
                  3. El usuario ingresa su correo electrónico y contraseña.
                  4. El usuario selecciona el botón Iniciar sesión.
                  5. El sistema recibe las credenciales.
                  6. El sistema valida que el usuario se encuentre habilitado.
                  7. El sistema valida que la contraseña ingresada corresponda al
                     usuario registrado.
                  8. El sistema identifica el rol del usuario: Administrador o
                     Trabajador.
                  9. Si las credenciales son válidas, el sistema genera los mecanismos
                     de autenticación necesarios.


### Tablas de la página


#### Tabla 1

|  | previamente registrados y habilitados.<br>Si las credenciales son válidas, el sistema permite el<br>acceso según su rol y establece la duración de la sesión<br>autenticada. Asimismo, el sistema debe permitir la<br>recuperación de contraseña mediante el envío de un<br>correo con un enlace seguro para definir una nueva<br>clave. |
| --- | --- |
| Actores | Administrador, Trabajador, Outlook / Microsoft |
| Precondiciones |  |
| 1. El sistema debe estar desplegado y operativo.<br>2. El usuario debe estar registrado en el CRM BioActiva.<br>3. El usuario debe encontrarse habilitado.<br>4. El usuario debe contar con un rol asignado.<br>5. Para recuperación de contraseña, el correo del usuario debe estar<br>registrado en el sistema.<br>6. El servicio de correo debe estar disponible para enviar enlaces de<br>recuperación. |  |
| Flujo Básico |  |
| 1. El usuario accede a la URL del CRM BioActiva.<br>2. El sistema muestra el formulario de inicio de sesión según el<br>formato del prototipo.<br>3. El usuario ingresa su correo electrónico y contraseña.<br>4. El usuario selecciona el botón Iniciar sesión.<br>5. El sistema recibe las credenciales.<br>6. El sistema valida que el usuario se encuentre habilitado.<br>7. El sistema valida que la contraseña ingresada corresponda al<br>usuario registrado.<br>8. El sistema identifica el rol del usuario: Administrador o<br>Trabajador.<br>9. Si las credenciales son válidas, el sistema genera los mecanismos<br>de autenticación necesarios. |  |


---

## Página 19

                  10. El sistema establece una sesión autenticada para el usuario con la
                     vigencia definida en las reglas de negocio.
                  11. El usuario accede al sistema con sesión activa.
                  12. El sistema redirige al usuario al dashboard del CRM BioActiva.
                  13. Si el usuario no recuerda su contraseña, selecciona la opción
                     “¿Olvidaste tu contraseña?” desde la pantalla de inicio de
                     sesión según.
                  14. El sistema solicita el correo electrónico asociado a la cuenta
                     mediante un formulario como se observa en el prototipo.
                  15. El usuario ingresa su correo electrónico y selecciona el botón
                     Enviar correo.
                  16. El sistema muestra el mensaje “Si el correo está registrado en el
                     sistema, recibirás un enlace de recuperación en los próximos
                     minutos” y sigue el formato que se muestra en el prototipo.
                  17. El sistema no admite el reenvío de correos de recuperación al
                     mismo correo eléctronico hasta 5 minutos después del primer
                     correo enviado.
                  18. El sistema genera un enlace de recuperación con vigencia de 2
                     horas.
                  19. El sistema envía un correo al usuario con el enlace de
                     recuperación de contraseña.
                  20. El usuario abre el correo y selecciona el enlace recibido.
                  21. El enlace redirige al usuario a la pantalla de recuperación dentro
                     del CRM BioActiva.
                  22. El usuario ingresa una nueva contraseña.
                  23. El usuario confirma la nueva contraseña.
                  24. El sistema valida que ambas contraseñas coincidan y cumplan las
                     reglas mínimas de seguridad.
                  25. El sistema actualiza la contraseña del usuario.
                  26. El sistema muestra un mensaje indicando que la contraseña fue
                     actualizada correctamente.
                  27. El sistema redirecciona al usuario hacia el formulario de inicio de
                     sesión.
                Flujo Alternativo


### Tablas de la página


#### Tabla 1

| 10. El sistema establece una sesión autenticada para el usuario con la<br>vigencia definida en las reglas de negocio.<br>11. El usuario accede al sistema con sesión activa.<br>12. El sistema redirige al usuario al dashboard del CRM BioActiva.<br>13. Si el usuario no recuerda su contraseña, selecciona la opción<br>“¿Olvidaste tu contraseña?” desde la pantalla de inicio de<br>sesión según.<br>14. El sistema solicita el correo electrónico asociado a la cuenta<br>mediante un formulario como se observa en el prototipo.<br>15. El usuario ingresa su correo electrónico y selecciona el botón<br>Enviar correo.<br>16. El sistema muestra el mensaje “Si el correo está registrado en el<br>sistema, recibirás un enlace de recuperación en los próximos<br>minutos” y sigue el formato que se muestra en el prototipo.<br>17. El sistema no admite el reenvío de correos de recuperación al<br>mismo correo eléctronico hasta 5 minutos después del primer<br>correo enviado.<br>18. El sistema genera un enlace de recuperación con vigencia de 2<br>horas.<br>19. El sistema envía un correo al usuario con el enlace de<br>recuperación de contraseña.<br>20. El usuario abre el correo y selecciona el enlace recibido.<br>21. El enlace redirige al usuario a la pantalla de recuperación dentro<br>del CRM BioActiva.<br>22. El usuario ingresa una nueva contraseña.<br>23. El usuario confirma la nueva contraseña.<br>24. El sistema valida que ambas contraseñas coincidan y cumplan las<br>reglas mínimas de seguridad.<br>25. El sistema actualiza la contraseña del usuario.<br>26. El sistema muestra un mensaje indicando que la contraseña fue<br>actualizada correctamente.<br>27. El sistema redirecciona al usuario hacia el formulario de inicio de<br>sesión. |
| --- |
| Flujo Alternativo |


---

## Página 20

                Credenciales incorrectas
                  1. En el paso 7, el sistema detecta que la contraseña ingresada no
                     corresponde al usuario.
                  2. El sistema muestra el mensaje: “Credenciales inválidas”
                  3. El usuario permanece en la pantalla de inicio de sesión.
                  4. El usuario puede intentar ingresar nuevamente sus credenciales.
                Correo con formato inválido
                  1. En el paso 3 o 15, el usuario ingresa un correo con formato
                     inválido o no pertenece al dominio.
                  2. El sistema muestra el mensaje: “Ingrese un correo válido.”
                  3. El sistema no acepta el correo.
                Usuario deshabilitado
                  1. En el paso 6, el sistema detecta que el usuario se encuentra
                     deshabilitado.
                  2. El sistema bloquea el acceso.
                  3. El sistema muestra el mensaje: “Usuario deshabilitado.
                     Contacte al administrador.”
                  4. El usuario no puede ingresar al CRM BioActiva.
                Enlace de recuperación expirado
                  1. En el paso 18, el usuario abre el enlace después de que el token
                     de recuperación ha expirado.
                  2. El sistema muestra el mensaje: “El enlace de recuperación ha
                     expirado.”
                  3. El sistema solicita generar un nuevo enlace desde la opción
                     “¿Olvidaste tu contraseña?”.
                  4. No se permite cambiar la contraseña con el enlace vencido.
                Contraseñas no coinciden


### Tablas de la página


#### Tabla 1

| Credenciales incorrectas |
| --- |
| 1. En el paso 7, el sistema detecta que la contraseña ingresada no<br>corresponde al usuario.<br>2. El sistema muestra el mensaje: “Credenciales inválidas”<br>3. El usuario permanece en la pantalla de inicio de sesión.<br>4. El usuario puede intentar ingresar nuevamente sus credenciales. |
| Correo con formato inválido |
| 1. En el paso 3 o 15, el usuario ingresa un correo con formato<br>inválido o no pertenece al dominio.<br>2. El sistema muestra el mensaje: “Ingrese un correo válido.”<br>3. El sistema no acepta el correo. |
| Usuario deshabilitado |
| 1. En el paso 6, el sistema detecta que el usuario se encuentra<br>deshabilitado.<br>2. El sistema bloquea el acceso.<br>3. El sistema muestra el mensaje: “Usuario deshabilitado.<br>Contacte al administrador.”<br>4. El usuario no puede ingresar al CRM BioActiva. |
| Enlace de recuperación expirado |
| 1. En el paso 18, el usuario abre el enlace después de que el token<br>de recuperación ha expirado.<br>2. El sistema muestra el mensaje: “El enlace de recuperación ha<br>expirado.”<br>3. El sistema solicita generar un nuevo enlace desde la opción<br>“¿Olvidaste tu contraseña?”.<br>4. No se permite cambiar la contraseña con el enlace vencido. |
| Contraseñas no coinciden |


---

## Página 21

                  1. En el paso 22, el sistema detecta que la nueva contraseña y la
                     confirmación no coinciden.
                  2. El sistema muestra el mensaje: “Las contraseñas no coinciden.”
                  3. El sistema no actualiza la contraseña.
                  4. El usuario debe ingresar nuevamente ambos campos.
                Contraseña no cumple requisitos
                  1. En el paso 22, el sistema detecta que la nueva contraseña no
                     cumple las reglas mínimas de seguridad.
                  2. El sistema muestra el mensaje: “La contraseña debe tener al
                     menos 8 caracteres e incluir una letra mayúscula, una letra
                     minúscula, un número y un carácter especial”.
                  3. El sistema no actualiza la contraseña.
                  4. El usuario debe ingresar una nueva contraseña válida.
                Invalidar el enlace de recuperación
                  1. En el paso 17, el usuario vuelve a seleccionar el enlace de
                     recuperación.
                  2. El sistema redirecciona al usuario a la página y le muestra el
                     mensaje de error: “El enlace de recuperación ya fue utilizado.
                     Solicita uno nuevo.”
                  3. El sistema muestra el mensaje según el formato que se muestra
                     en el prototipo
                Postcondiciones
                  1. Si la autenticación es exitosa, el usuario accede al CRM BioActiva
                     con sesión activa.
                  2. El sistema genera y almacena un token de autenticación para
                     gestionar la sesión.
                  3. El usuario accede a las funcionalidades permitidas según su rol.
                  4. Si la autenticación falla, no se concede acceso al sistema.


### Tablas de la página


#### Tabla 1

| 1. En el paso 22, el sistema detecta que la nueva contraseña y la<br>confirmación no coinciden.<br>2. El sistema muestra el mensaje: “Las contraseñas no coinciden.”<br>3. El sistema no actualiza la contraseña.<br>4. El usuario debe ingresar nuevamente ambos campos. |
| --- |
| Contraseña no cumple requisitos |
| 1. En el paso 22, el sistema detecta que la nueva contraseña no<br>cumple las reglas mínimas de seguridad.<br>2. El sistema muestra el mensaje: “La contraseña debe tener al<br>menos 8 caracteres e incluir una letra mayúscula, una letra<br>minúscula, un número y un carácter especial”.<br>3. El sistema no actualiza la contraseña.<br>4. El usuario debe ingresar una nueva contraseña válida. |
| Invalidar el enlace de recuperación |
| 1. En el paso 17, el usuario vuelve a seleccionar el enlace de<br>recuperación.<br>2. El sistema redirecciona al usuario a la página y le muestra el<br>mensaje de error: “El enlace de recuperación ya fue utilizado.<br>Solicita uno nuevo.”<br>3. El sistema muestra el mensaje según el formato que se muestra<br>en el prototipo |
| Postcondiciones |
| 1. Si la autenticación es exitosa, el usuario accede al CRM BioActiva<br>con sesión activa.<br>2. El sistema genera y almacena un token de autenticación para<br>gestionar la sesión.<br>3. El usuario accede a las funcionalidades permitidas según su rol.<br>4. Si la autenticación falla, no se concede acceso al sistema. |


---

## Página 22

                  5. Si la recuperación de contraseña es exitosa, la nueva contraseña
                     queda registrada en el sistema.
                  6. El enlace de recuperación utilizado queda invalidado después del
                     cambio de contraseña.
                Restricciones
                  ●  La contraseña deberá tener una longitud mínima de 8
                     caracteres.
                  ●  La contraseña deberá contener al menos una letra mayúscula,
                     una letra minúscula, un número y un carácter especial.
                  ●  La contraseña no deberá mostrarse en texto visible durante su
                     ingreso.
                  ●  Si la contraseña no cumple las condiciones mínimas de
                     seguridad el sistema deberá impedir el registro, activación o
                     actualización de la contraseña.
               Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 5. Si la recuperación de contraseña es exitosa, la nueva contraseña<br>queda registrada en el sistema.<br>6. El enlace de recuperación utilizado queda invalidado después del<br>cambio de contraseña. |
| --- |
| Restricciones |
| ● La contraseña deberá tener una longitud mínima de 8<br>caracteres.<br>● La contraseña deberá contener al menos una letra mayúscula,<br>una letra minúscula, un número y un carácter especial.<br>● La contraseña no deberá mostrarse en texto visible durante su<br>ingreso.<br>● Si la contraseña no cumple las condiciones mínimas de<br>seguridad el sistema deberá impedir el registro, activación o<br>actualización de la contraseña. |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 23

               Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 24


---

## Página 25


---

## Página 26


---

## Página 27

                           CU002: Gestión de Usuarios
                               El administrador registra a un nuevo usuario
                               institucional para que pueda acceder al CRM
                               BioActiva. El sistema envía un correo con token
                Descripción    de activación para que el usuario configure sus
                               credenciales y active su cuenta.
                               El administrador puede deshabilitar usuarios,
                               impidiendo su acceso al CRM BioActiva.
                Actores        Administrador, Outlook / Microsoft
                Precondiciones


### Tablas de la página


#### Tabla 1

| Descripción | El administrador registra a un nuevo usuario<br>institucional para que pueda acceder al CRM<br>BioActiva. El sistema envía un correo con token<br>de activación para que el usuario configure sus<br>credenciales y active su cuenta.<br>El administrador puede deshabilitar usuarios,<br>impidiendo su acceso al CRM BioActiva. |
| --- | --- |
| Actores | Administrador, Outlook / Microsoft |
| Precondiciones |  |


---

## Página 28

                     1. El administrador ha iniciado sesión.
                     2. El administrador tiene permisos para gestionar usuarios.
                     3. El correo del nuevo usuario pertenece al dominio institucional o
                     está autorizado.
                     4. El usuario no debe estar registrado previamente.
                Flujo Básico
                  1. El administrador accede a la opción Gestión de usuarios desde el
                     menú principal del CRM BioActiva.
                  2. El sistema muestra las invitaciones enviadas en el formato que se
                     muestra en el prototipo.
                  3. El sistema muestra la tabla de usuarios registrados en el formato
                     que se muestra en el prototipo.
                  4. El sistema muestra la tabla de invitaciones enviadas en el formato
                     que se muestra en el prototipo.
                  5. El administrador selecciona el botón Invitar usuario y se muestra
                     como se definió en el prototipo.
                  6. El administrador ingresa el correo electrónico y el rol del usuario.
                  7. El sistema valida que el correo electrónico ha sido completado y
                     tenga un formato válido.
                  8. El sistema valida que el correo pertenezca al dominio institucional
                     permitido.
                  9. El sistema valida que el correo no se encuentre registrado
                     previamente.
                  10. El sistema genera token de activación.
                  11. El sistema envía un correo de invitación al usuario.
                  12. El sistema registra la invitación enviada con estado Pendiente en
                     la tabla de invitaciones enviadas
                  13. El administrador puede revocar una invitación a través del botón
                     Revocar.
                  14. El usuario invitado abre el enlace de activación recibido en su
                     correo.


### Tablas de la página


#### Tabla 1

| 1. El administrador ha iniciado sesión.<br>2. El administrador tiene permisos para gestionar usuarios.<br>3. El correo del nuevo usuario pertenece al dominio institucional o<br>está autorizado.<br>4. El usuario no debe estar registrado previamente. |
| --- |
| Flujo Básico |
| 1. El administrador accede a la opción Gestión de usuarios desde el<br>menú principal del CRM BioActiva.<br>2. El sistema muestra las invitaciones enviadas en el formato que se<br>muestra en el prototipo.<br>3. El sistema muestra la tabla de usuarios registrados en el formato<br>que se muestra en el prototipo.<br>4. El sistema muestra la tabla de invitaciones enviadas en el formato<br>que se muestra en el prototipo.<br>5. El administrador selecciona el botón Invitar usuario y se muestra<br>como se definió en el prototipo.<br>6. El administrador ingresa el correo electrónico y el rol del usuario.<br>7. El sistema valida que el correo electrónico ha sido completado y<br>tenga un formato válido.<br>8. El sistema valida que el correo pertenezca al dominio institucional<br>permitido.<br>9. El sistema valida que el correo no se encuentre registrado<br>previamente.<br>10. El sistema genera token de activación.<br>11. El sistema envía un correo de invitación al usuario.<br>12. El sistema registra la invitación enviada con estado Pendiente en<br>la tabla de invitaciones enviadas<br>13. El administrador puede revocar una invitación a través del botón<br>Revocar.<br>14. El usuario invitado abre el enlace de activación recibido en su<br>correo. |


---

## Página 29

                  15. El sistema muestra el formulario y solicita rellenar los campos
                     obligatorios según el formato del prototipo.
                  16. El usuario invitado define su contraseña 2 veces junto a su nombre
                     y apellido.
                  17. El sistema valida el token y activa la cuenta del usuario invitado.
                  18. El sistema registra al usuario invitado con estado Habilitado en la
                     tabla de usuarios registrados.
                  19. El usuario queda habilitado para iniciar sesión en el CRM
                     BioActiva.
                  20. El administrador puede deshabilitar/habilitar una cuenta a través
                     del icono dentro de acciones en la tabla de usuarios registrados.
                  21. El administrador puede editar el rol de los usuarios a través de un
                     selector.
                Flujo Alternativo
                Correo ya registrado
                  1. En el paso 9 la validación falla
                  2. El sistema muestra un mensaje de error indicando: “Ya existe un
                     usuario registrado con este correo.”
                Correo no institucional:
                  1. En el paso 8, la validación falla
                  2. El sistema muestra un mensaje de error indicando: “Debe ser un
                     correo institucional (@bioactiva.pe)”
                Token expirado
                  1. En el paso 14, el token de activación expiró
                  2. El sistema muestra un mensaje de error indicando: “El tiempo
                     para definir las credenciales venció y necesita volver a
                     solicitar el correo.”
                Formato de correo inválido


### Tablas de la página


#### Tabla 1

| 15. El sistema muestra el formulario y solicita rellenar los campos<br>obligatorios según el formato del prototipo.<br>16. El usuario invitado define su contraseña 2 veces junto a su nombre<br>y apellido.<br>17. El sistema valida el token y activa la cuenta del usuario invitado.<br>18. El sistema registra al usuario invitado con estado Habilitado en la<br>tabla de usuarios registrados.<br>19. El usuario queda habilitado para iniciar sesión en el CRM<br>BioActiva.<br>20. El administrador puede deshabilitar/habilitar una cuenta a través<br>del icono dentro de acciones en la tabla de usuarios registrados.<br>21. El administrador puede editar el rol de los usuarios a través de un<br>selector. |
| --- |
| Flujo Alternativo |
| Correo ya registrado |
| 1. En el paso 9 la validación falla<br>2. El sistema muestra un mensaje de error indicando: “Ya existe un<br>usuario registrado con este correo.” |
| Correo no institucional: |
| 1. En el paso 8, la validación falla<br>2. El sistema muestra un mensaje de error indicando: “Debe ser un<br>correo institucional (@bioactiva.pe)” |
| Token expirado |
| 1. En el paso 14, el token de activación expiró<br>2. El sistema muestra un mensaje de error indicando: “El tiempo<br>para definir las credenciales venció y necesita volver a<br>solicitar el correo.” |
| Formato de correo inválido |


---

## Página 30

                  1. En el paso 7, la validación falla.
                  2. El sistema muestra un mensaje de error indicando “Formato de
                     correo inválido”.
                Contraseña no cumple requisitos
                  1. El sistema detecta que la nueva contraseña no cumple las reglas
                     mínimas de seguridad.
                  2. El sistema muestra el mensaje: “La contraseña debe tener al
                     menos 8 caracteres e incluir una letra mayúscula, una letra
                     minúscula, un número y un carácter especial”.
                  3. El sistema no acepta la contraseña.
                  4. El usuario debe ingresar una nueva contraseña válida.
                Contraseñas no coinciden
                  1. El sistema detecta que la nueva contraseña y la confirmación no
                     coinciden.
                  2. El sistema muestra el mensaje: “Las contraseñas no coinciden.”
                  3. El sistema no acepta la contraseña.
                  4. El usuario debe ingresar nuevamente ambos campos.
                Edición del propio rol no permitida
                  1. En el paso 21, el sistema habilita el selector de editar rol en los
                     usuarios registrados, ya sean trabajadores u otros
                     administradores.
                  2. El sistema no habilita el selector de editar el rol para el
                     administrador que realiza la acción, es decir, un administrador no
                     puede editar su propio rol.
                Deshabilitar/habilitar cuenta


### Tablas de la página


#### Tabla 1

| 1. En el paso 7, la validación falla.<br>2. El sistema muestra un mensaje de error indicando “Formato de<br>correo inválido”. |
| --- |
| Contraseña no cumple requisitos |
| 1. El sistema detecta que la nueva contraseña no cumple las reglas<br>mínimas de seguridad.<br>2. El sistema muestra el mensaje: “La contraseña debe tener al<br>menos 8 caracteres e incluir una letra mayúscula, una letra<br>minúscula, un número y un carácter especial”.<br>3. El sistema no acepta la contraseña.<br>4. El usuario debe ingresar una nueva contraseña válida. |
| Contraseñas no coinciden |
| 1. El sistema detecta que la nueva contraseña y la confirmación no<br>coinciden.<br>2. El sistema muestra el mensaje: “Las contraseñas no coinciden.”<br>3. El sistema no acepta la contraseña.<br>4. El usuario debe ingresar nuevamente ambos campos. |
| Edición del propio rol no permitida |
| 1. En el paso 21, el sistema habilita el selector de editar rol en los<br>usuarios registrados, ya sean trabajadores u otros<br>administradores.<br>2. El sistema no habilita el selector de editar el rol para el<br>administrador que realiza la acción, es decir, un administrador no<br>puede editar su propio rol. |
| Deshabilitar/habilitar cuenta |


---

## Página 31

                  1. En el paso 20, administrador deshabilita/habilita una cuenta.
                  2. El administrador selecciona el ícono para deshabilitar una cuenta:
                       a. El sistema muestra la confirmación según el formato del
                          prototipo.
                       b. El administrador selecciona el botón “Sí, deshabilitar”.
                       c. El sistema muestra el mensaje “Usuario deshabilitado”.
                       d. El sistema impide que el usuario pueda iniciar sesión en el
                          CRM BioActiva.
                       e. Si el usuario deshabilitado intenta iniciar sesión, se seguirá
                          el procedimiento descrito en el flujo alternativo “Usuario
                          deshabilitado” del CU001: Autenticación de inicio de sesión.
                       f. Si el usuario tenía su cuenta iniciada y es deshabilitado, al
                          momento de interactuar con el CRM BioActiva su sesión
                          se cerrará.
                  3. El administrador selecciona el ícono para habilitar una cuenta:
                       a. El sistema muestra la confirmación según el formato del
                          prototipo.
                       b. El administrador selecciona el botón “Sí, habilitar”.
                       c. El sistema muestra el mensaje “Usuario habilitado”.
                       d. El sistema permite nuevamente que el usuario pueda iniciar
                          sesión en el CRM BioActiva.
                Revocar invitación
                  1. En el paso 13, el administrador selecciona el botón revocar.
                  2. El sistema inhabilita el link enviado al usuario invitado.
                  3. Si el usuario invitado abre el link, no le aparecerá el formulario
                     para definir nombre y contraseña.
                Auto inhabilitación no permitida
                  1. En el paso 20, el sistema habilita el ícono para deshabilitar en los
                     usuarios, ya sean trabajadores o administradores.


### Tablas de la página


#### Tabla 1

| 1. En el paso 20, administrador deshabilita/habilita una cuenta.<br>2. El administrador selecciona el ícono para deshabilitar una cuenta:<br>a. El sistema muestra la confirmación según el formato del<br>prototipo.<br>b. El administrador selecciona el botón “Sí, deshabilitar”.<br>c. El sistema muestra el mensaje “Usuario deshabilitado”.<br>d. El sistema impide que el usuario pueda iniciar sesión en el<br>CRM BioActiva.<br>e. Si el usuario deshabilitado intenta iniciar sesión, se seguirá<br>el procedimiento descrito en el flujo alternativo “Usuario<br>deshabilitado” del CU001: Autenticación de inicio de sesión.<br>f. Si el usuario tenía su cuenta iniciada y es deshabilitado, al<br>momento de interactuar con el CRM BioActiva su sesión<br>se cerrará.<br>3. El administrador selecciona el ícono para habilitar una cuenta:<br>a. El sistema muestra la confirmación según el formato del<br>prototipo.<br>b. El administrador selecciona el botón “Sí, habilitar”.<br>c. El sistema muestra el mensaje “Usuario habilitado”.<br>d. El sistema permite nuevamente que el usuario pueda iniciar<br>sesión en el CRM BioActiva. |
| --- |
| Revocar invitación |
| 1. En el paso 13, el administrador selecciona el botón revocar.<br>2. El sistema inhabilita el link enviado al usuario invitado.<br>3. Si el usuario invitado abre el link, no le aparecerá el formulario<br>para definir nombre y contraseña. |
| Auto inhabilitación no permitida |
| 1. En el paso 20, el sistema habilita el ícono para deshabilitar en los<br>usuarios, ya sean trabajadores o administradores. |


---

## Página 32

                  2. El sistema no habilita el ícono para deshabilitar para el
                     administrador que realiza la acción, es decir, un administrador no
                     puede deshabilitar su cuenta.
                Invalidar el enlace de invitación
                  1. En el paso 17, el usuario vuelve a seleccionar el enlace de
                     invitación
                  2. El sistema redirecciona al usuario a la página y le muestra el
                     mensaje de error: “Esta invitación ya fue utilizada. Si crees que es
                     un error, contacta al administrador.”
                  3. El sistema muestra el mensaje según el formato que se muestra
                     en el prototipo
                  Postcondiciones
                  1. El usuario es registrado en la base de datos con el rol asignado y
                     sus credenciales definidas por su correo y contraseña
                  2. Invitación registrada
                  Restricciones
                  ●  Solo usuarios previamente registrados y habilitados pueden
                     acceder al sistema.
                  ●  El acceso a las funcionalidades dependerá del rol asignado al
                     usuario.
                  ●  La contraseña deberá tener una longitud mínima de 8 caracteres.
                  ●  La contraseña deberá contener al menos una letra mayúscula,
                     una letra minúscula, un número y un carácter especial.
                  ●  La contraseña no deberá mostrarse en texto visible durante su
                     ingreso.
                  ●  Si la contraseña no cumple las condiciones mínimas de
                     seguridad el sistema deberá impedir el registro, activación o
                     actualización de la contraseña.


### Tablas de la página


#### Tabla 1

| 2. El sistema no habilita el ícono para deshabilitar para el<br>administrador que realiza la acción, es decir, un administrador no<br>puede deshabilitar su cuenta. |
| --- |
| Invalidar el enlace de invitación |
| 1. En el paso 17, el usuario vuelve a seleccionar el enlace de<br>invitación<br>2. El sistema redirecciona al usuario a la página y le muestra el<br>mensaje de error: “Esta invitación ya fue utilizada. Si crees que es<br>un error, contacta al administrador.”<br>3. El sistema muestra el mensaje según el formato que se muestra<br>en el prototipo |
| Postcondiciones |
| 1. El usuario es registrado en la base de datos con el rol asignado y<br>sus credenciales definidas por su correo y contraseña<br>2. Invitación registrada |
| Restricciones |
| ● Solo usuarios previamente registrados y habilitados pueden<br>acceder al sistema.<br>● El acceso a las funcionalidades dependerá del rol asignado al<br>usuario.<br>● La contraseña deberá tener una longitud mínima de 8 caracteres.<br>● La contraseña deberá contener al menos una letra mayúscula,<br>una letra minúscula, un número y un carácter especial.<br>● La contraseña no deberá mostrarse en texto visible durante su<br>ingreso.<br>● Si la contraseña no cumple las condiciones mínimas de<br>seguridad el sistema deberá impedir el registro, activación o<br>actualización de la contraseña. |


---

## Página 33

               Diagrama de caso de uso
               Prototipo


### Tablas de la página


#### Tabla 1

| Diagrama de caso de uso |
| --- |


#### Tabla 2

| Prototipo |
| --- |


---

## Página 34


---

## Página 35


---

## Página 36


---

## Página 37


---

## Página 38


---

## Página 39

              CU003: Gestión de Organización
                                 El sistema debe permitir a los usuarios registrar,
                                 consultar, visualizar y editar organizaciones
                                 dentro del CRM BioActiva.
                                 Cada organización debe ser identificada de
                                 manera única mediante su RUC. En caso de que
                                 la organización no cuente con RUC o no se
               Descripción
                                 encuentre registrada en SUNAT, el usuario
                                 deberá registrar un código interno único que
                                 permita identificarla dentro del sistema,
                                 garantizando la integridad de la información.
                                 El sistema podrá apoyar el registro mediante
                                 consultas externas a SUNAT por RUC o razón


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir a los usuarios registrar,<br>consultar, visualizar y editar organizaciones<br>dentro del CRM BioActiva.<br>Cada organización debe ser identificada de<br>manera única mediante su RUC. En caso de que<br>la organización no cuente con RUC o no se<br>encuentre registrada en SUNAT, el usuario<br>deberá registrar un código interno único que<br>permita identificarla dentro del sistema,<br>garantizando la integridad de la información.<br>El sistema podrá apoyar el registro mediante<br>consultas externas a SUNAT por RUC o razón |
| --- | --- |


---

## Página 40

                                 social, autocompletando información disponible
                                 de la organización.
                                 Asimismo, el sistema deberá permitir visualizar el
                                 detalle de cada organización, incluyendo sus
                                 datos generales, contactos asociados, historial de
                                 leads e historial de cotizaciones relacionadas.
               Actores           Administrador, Trabajador
               Precondiciones
                  1. El usuario debe haber iniciado sesión en el sistema.
                  2. El sistema debe estar operativo.
               Flujo Básico
                  1. El usuario accede a la opción Organizaciones desde el menú
                    principal del CRM BioActiva.
                  2. El sistema muestra la tabla de organizaciones según el formato que
                    se muestra en el prototipo.
                  3. El usuario puede filtrar organizaciones con respecto al nombre de
                    organización, sector, tamaño y tipo.
                  4. El usuario puede consultar información de alguna organización
                    usando su RUC o Razón social mediante el botón Validador SUNAT
                  5. Si el usuario hace uso de esta función, se muestra la información
                    obtenida desde SUNAT según el formato mostrado en el prototipo.
                  6. El usuario selecciona el botón Nueva organización
                  7. El sistema muestra el formulario de registro de organización con el
                    formato mostrado en el prototipo.
                  8. El usuario puede realizar una autocompletar datos mediante el
                    botón Autocompletar SUNAT.
                  9. El flujo de esta funcionalidad sigue siendo la misma que Validador
                    SUNAT, pero una vez obtenida la información obtenida el usuario
                    puede seleccionar el botón Usar estos datos.


### Tablas de la página


#### Tabla 1

|  | social, autocompletando información disponible<br>de la organización.<br>Asimismo, el sistema deberá permitir visualizar el<br>detalle de cada organización, incluyendo sus<br>datos generales, contactos asociados, historial de<br>leads e historial de cotizaciones relacionadas. |
| --- | --- |
| Actores | Administrador, Trabajador |
| Precondiciones |  |
| 1. El usuario debe haber iniciado sesión en el sistema.<br>2. El sistema debe estar operativo. |  |
| Flujo Básico |  |
| 1. El usuario accede a la opción Organizaciones desde el menú<br>principal del CRM BioActiva.<br>2. El sistema muestra la tabla de organizaciones según el formato que<br>se muestra en el prototipo.<br>3. El usuario puede filtrar organizaciones con respecto al nombre de<br>organización, sector, tamaño y tipo.<br>4. El usuario puede consultar información de alguna organización<br>usando su RUC o Razón social mediante el botón Validador SUNAT<br>5. Si el usuario hace uso de esta función, se muestra la información<br>obtenida desde SUNAT según el formato mostrado en el prototipo.<br>6. El usuario selecciona el botón Nueva organización<br>7. El sistema muestra el formulario de registro de organización con el<br>formato mostrado en el prototipo.<br>8. El usuario puede realizar una autocompletar datos mediante el<br>botón Autocompletar SUNAT.<br>9. El flujo de esta funcionalidad sigue siendo la misma que Validador<br>SUNAT, pero una vez obtenida la información obtenida el usuario<br>puede seleccionar el botón Usar estos datos. |  |


---

## Página 41

                  10. Si el usuario selecciona el botón el sistema rellena los campos RUC,
                    Razón social y, en caso tengan un valor definido, nombre comercial
                    y actividades económicas.
                  11. En caso de que la organización no cuente con RUC el usuario
                    puede registrar un código interno para identificarla dentro del CRM
                    BioActiva.
                  12. El usuario completa la información de la organización.
                  13. El sistema valida que los campos obligatorios no estén vacíos.
                  14. El sistema valida que la organización el RUC, razón social o el
                    código de cliente estén registrados en el CRM BioActiva.
                  15. El usuario selecciona el botón Guardar organización.
                  16. El usuario puede seleccionar una organización existente desde la
                    tabla de organizaciones.
                  17. Si el usuario selecciona una organización, el sistema muestra el
                    detalle de la organización.
                  18. El sistema muestra la información general registrada de la
                    organización según la información disponible en la pantalla de
                    detalle mostrada en el prototipo.
                  19. El sistema muestra los contactos asociados a la organización.
                  20. El sistema muestra el historial de leads asociados a la organización.
                  21. El sistema muestra el historial de cotizaciones asociadas a la
                    organización.
                  22. El usuario puede regresar al listado de organizaciones mediante el
                    botón Volver a Organizaciones.
                  23. Desde el detalle de la organización, el usuario puede seleccionar el
                    botón Editar organización.
                  24. El sistema muestra el formulario edición con la información actual de
                    la organización según el formato mostrado en el prototipo.
                  25. El sistema permite modificar la Razón social, nombre comercial,
                    área, tipo, tamaño, sector, ubicación, Linkedin y alianzas.
                  26. El usuario modifica la información de la organización.
                  27. El sistema valida que los campos obligatorios no estén vacíos.
                  28. El sistema valida que la razón social no se repita.
                  29. El usuario puede confirmar la actualización seleccionando el botón
                    Guardar cambios o cancelar la operación seleccionando el botón
                    Cancelar.


---

## Página 42

                  30. Si el usuario confirma la edición, el sistema guarda los cambios
                    realizados.
                  31. El sistema muestra la información actualizada de la organización.
               Flujo Alternativo
               RUC o razón social duplicado
                  1. En el paso 14 o 29 el sistema detecta que el RUC o razón social ya
                    existe en la base de datos.
                  2. El sistema no permite continuar con el registro o actualización de la
                    organización.
                  3. Si la RUC ya existe en la base de datos:
                       a. El sistema muestra el mensaje: "La organización con ruc
                         {insertar el número de ruc repetido} ya se encuentra
                         registrada".
                       b. El usuario puede corregir el RUC ingresado o cancelar la
                         operación.
                       c. El usuario corrige la información.
                       d. El sistema registra la organización
                  4. Si la razón social ya existe en la base de datos:
                       a. El sistema muestra el mensaje: "Ya existe un registro con
                         esos datos. Verifica e inténtalo nuevamente".
                       b. El usuario puede corregir la razón social ingresada o
                         cancelar la operación.
                       c. El usuario corrige la información.
                       d. El sistema registra la organización
               Código de cliente duplicado
                  1. En el paso 14, el sistema detecta que el código de cliente ya existe
                    en la base de datos.
                  2. El sistema muestra el mensaje: “El código de cliente {insertar el
                    código de cliente repetido} ya está registrado en otra organización.
                    Ingrese un código distinto.”.
                  3. El sistema no permite continuar hasta que se ingrese un código
                    interno único.


### Tablas de la página


#### Tabla 1

| 30. Si el usuario confirma la edición, el sistema guarda los cambios<br>realizados.<br>31. El sistema muestra la información actualizada de la organización. |
| --- |
| Flujo Alternativo |
| RUC o razón social duplicado |
| 1. En el paso 14 o 29 el sistema detecta que el RUC o razón social ya<br>existe en la base de datos.<br>2. El sistema no permite continuar con el registro o actualización de la<br>organización.<br>3. Si la RUC ya existe en la base de datos:<br>a. El sistema muestra el mensaje: "La organización con ruc<br>{insertar el número de ruc repetido} ya se encuentra<br>registrada".<br>b. El usuario puede corregir el RUC ingresado o cancelar la<br>operación.<br>c. El usuario corrige la información.<br>d. El sistema registra la organización<br>4. Si la razón social ya existe en la base de datos:<br>a. El sistema muestra el mensaje: "Ya existe un registro con<br>esos datos. Verifica e inténtalo nuevamente".<br>b. El usuario puede corregir la razón social ingresada o<br>cancelar la operación.<br>c. El usuario corrige la información.<br>d. El sistema registra la organización |
| Código de cliente duplicado |
| 1. En el paso 14, el sistema detecta que el código de cliente ya existe<br>en la base de datos.<br>2. El sistema muestra el mensaje: “El código de cliente {insertar el<br>código de cliente repetido} ya está registrado en otra organización.<br>Ingrese un código distinto.”.<br>3. El sistema no permite continuar hasta que se ingrese un código<br>interno único. |


---

## Página 43

                  4. El usuario corrige la información.
                  5. El sistema registra la organización
               Datos obligatorios incompletos
                  1. En los pasos 13, el sistema detecta que la información necesaria
                    para registrar la organización como código de cliente, razón social,
                    nombre comercial, tipo, tamaño o sector no ha sido completada.
                  2. En el paso 28, el sistema detecta que la información necesaria para
                    actualizar como razón social, nombre comercial, tipo, tamaño o no
                    ha sido completada.
                  3. El sistema muestra los mensajes de validación correspondientes en
                    la interfaz según el campo faltante.
                       a. Para tipo muestra “El tipo es obligatorio.”
                       b. Para sector muestra “El sector es obligatorio.”
                       c. Para tamaño muestra “El tamaño es obligatorio.”
                       d. Para nombre comercial muestra “El nombre comercial es
                         obligatorio.”
                       e. Para nombre comercial muestra “El nombre comercial es
                         obligatorio.”
                       f. Para razón social muestra “El nombre es obligatorio.”
                       g. Para código de cliente muestra “El código de cliente es
                         obligatorio.”
                  4. El sistema no permite completar el registro o la actualización.
                  5. El usuario corrige la información ingresada.
                  6. El sistema registra o actualiza la organización.
               Falla en la consulta externa SUNAT
                  1. En el paso 5 o 9, el sistema no encuentra resultados para la
                    consulta realizada.
                  2. El sistema muestra el mensaje:
                  3. "No se encontraron resultados en SUNAT para la organización
                    consultada"
                  4. El usuario puede realizar una nueva búsqueda o continuar con el
                    registro manual de la organización.


### Tablas de la página


#### Tabla 1

| 4. El usuario corrige la información.<br>5. El sistema registra la organización |
| --- |
| Datos obligatorios incompletos |
| 1. En los pasos 13, el sistema detecta que la información necesaria<br>para registrar la organización como código de cliente, razón social,<br>nombre comercial, tipo, tamaño o sector no ha sido completada.<br>2. En el paso 28, el sistema detecta que la información necesaria para<br>actualizar como razón social, nombre comercial, tipo, tamaño o no<br>ha sido completada.<br>3. El sistema muestra los mensajes de validación correspondientes en<br>la interfaz según el campo faltante.<br>a. Para tipo muestra “El tipo es obligatorio.”<br>b. Para sector muestra “El sector es obligatorio.”<br>c. Para tamaño muestra “El tamaño es obligatorio.”<br>d. Para nombre comercial muestra “El nombre comercial es<br>obligatorio.”<br>e. Para nombre comercial muestra “El nombre comercial es<br>obligatorio.”<br>f. Para razón social muestra “El nombre es obligatorio.”<br>g. Para código de cliente muestra “El código de cliente es<br>obligatorio.”<br>4. El sistema no permite completar el registro o la actualización.<br>5. El usuario corrige la información ingresada.<br>6. El sistema registra o actualiza la organización. |
| Falla en la consulta externa SUNAT |
| 1. En el paso 5 o 9, el sistema no encuentra resultados para la<br>consulta realizada.<br>2. El sistema muestra el mensaje:<br>3. "No se encontraron resultados en SUNAT para la organización<br>consultada"<br>4. El usuario puede realizar una nueva búsqueda o continuar con el<br>registro manual de la organización. |


---

## Página 44

                 Cancelación de Actualización
                  1. En el paso 30, el usuario selecciona la opción "Cancelar".
                  2. El sistema descarta los cambios no guardados.
                  3. La organización conserva su información original.
                  4. El sistema retorna a la pantalla de detalle de la organización.
               Organización con más de seis contactos asociados
                  1. En el paso 19, el sistema detecta que la organización posee más de
                    seis contactos asociados.
                  2. El sistema muestra una vista resumida de los contactos dentro de la
                    pantalla de detalle de la organización según el formato definido en el
                    prototipo.
                  3. El usuario puede hacer click en cada contacto para ver su detalle.
                  4. El sistema habilita el botón Ver los 1 contactos restantes en la
                    sección Contactos.
                  5. Si el usuario selecciona dicha opción, el sistema redirige
                    automáticamente al módulo de Contactos.
                  6. El sistema aplica el filtro correspondiente a la organización
                    seleccionada como se observa en el prototipo.
                  7. El usuario visualiza el listado completo de contactos asociados a la
                    organización.
                 Postcondiciones
                  1. La organización queda registrada correctamente en el sistema o
                    actualizada según la operación realizada por el usuario.
                  2. La organización queda identificada de manera única mediante su
                    RUC o mediante un código interno único en caso no cuente con
                    RUC.
                  3. El sistema asigna un identificador único a la organización.
                  4. La información de la organización queda disponible para consulta
                    desde el módulo de Organizaciones.
                  5. La organización puede ser utilizada en los módulos de Contactos,
                    Leads y Cotizaciones.


### Tablas de la página


#### Tabla 1

| Cancelación de Actualización |
| --- |
| 1. En el paso 30, el usuario selecciona la opción "Cancelar".<br>2. El sistema descarta los cambios no guardados.<br>3. La organización conserva su información original.<br>4. El sistema retorna a la pantalla de detalle de la organización. |
| Organización con más de seis contactos asociados |
| 1. En el paso 19, el sistema detecta que la organización posee más de<br>seis contactos asociados.<br>2. El sistema muestra una vista resumida de los contactos dentro de la<br>pantalla de detalle de la organización según el formato definido en el<br>prototipo.<br>3. El usuario puede hacer click en cada contacto para ver su detalle.<br>4. El sistema habilita el botón Ver los 1 contactos restantes en la<br>sección Contactos.<br>5. Si el usuario selecciona dicha opción, el sistema redirige<br>automáticamente al módulo de Contactos.<br>6. El sistema aplica el filtro correspondiente a la organización<br>seleccionada como se observa en el prototipo.<br>7. El usuario visualiza el listado completo de contactos asociados a la<br>organización. |
| Postcondiciones |
| 1. La organización queda registrada correctamente en el sistema o<br>actualizada según la operación realizada por el usuario.<br>2. La organización queda identificada de manera única mediante su<br>RUC o mediante un código interno único en caso no cuente con<br>RUC.<br>3. El sistema asigna un identificador único a la organización.<br>4. La información de la organización queda disponible para consulta<br>desde el módulo de Organizaciones.<br>5. La organización puede ser utilizada en los módulos de Contactos,<br>Leads y Cotizaciones. |


---

## Página 45

                  6. Los cambios realizados sobre una organización quedan reflejados
                    en las consultas posteriores.
                  7. Si la organización es desactivada, su estado pasa a inactivo,
                    manteniendo la información histórica registrada en el sistema.
                  8. La operación realizada queda asociada al usuario que efectuó el
                    registro o actualización.
                 Restricciones
               Diagrama de caso de uso
               Prototipo


### Tablas de la página


#### Tabla 1

| 6. Los cambios realizados sobre una organización quedan reflejados<br>en las consultas posteriores.<br>7. Si la organización es desactivada, su estado pasa a inactivo,<br>manteniendo la información histórica registrada en el sistema.<br>8. La operación realizada queda asociada al usuario que efectuó el<br>registro o actualización. |
| --- |
| Restricciones |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 46


---

## Página 47


---

## Página 48


---

## Página 49

               CU004: Gestión de Contactos
                                 El sistema debe permitir a los usuarios registrar,
                Descripción
                                 consultar, editar y gestionar contactos asociados
                                 a organizaciones registradas dentro del CRM


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir a los usuarios registrar,<br>consultar, editar y gestionar contactos asociados<br>a organizaciones registradas dentro del CRM |
| --- | --- |


---

## Página 50

                                 BioActiva.
                                 Cada contacto debe estar vinculado a una
                                 organización existente dentro del sistema,
                                 permitiendo mantener el historial comercial
                                 relacionado con la organización y facilitar su
                                 utilización en los procesos de gestión de leads.
                                 La información del contacto se administra
                                 mediante la pantalla de tabla de contactos
                                 registrados, detalle y edición definidas en el
                                 prototipo del sistema.
                Actores          Administrador, Trabajador
                Precondiciones
                  1. El usuario debe haber iniciado sesión en el sistema.
                  2. Debe existir al menos una organización registrada en el CRM
                     BioActiva.
                  3. El sistema debe estar operativo.
                Flujo Básico
                  1. El usuario accede a la opción Contactos desde el menú principal
                     del CRM BioActiva.
                  2. El sistema muestra la tabla de contactos registrados según el
                     formato mostrado en el prototipo.
                  3. El usuario puede filtrar los contactos con respecto al nombre del
                     contacto.
                  4. El usuario puede seleccionar registrar un contacto mediante el
                     botón Nuevo contacto.
                  5. El sistema muestra el formulario de registro de contacto según el
                     formato mostrado en el prototipo
                  6. El usuario completa la información del contacto.
                  7. El sistema valida que los campos obligatorios no estén vacíos.


### Tablas de la página


#### Tabla 1

|  | BioActiva.<br>Cada contacto debe estar vinculado a una<br>organización existente dentro del sistema,<br>permitiendo mantener el historial comercial<br>relacionado con la organización y facilitar su<br>utilización en los procesos de gestión de leads.<br>La información del contacto se administra<br>mediante la pantalla de tabla de contactos<br>registrados, detalle y edición definidas en el<br>prototipo del sistema. |
| --- | --- |
| Actores | Administrador, Trabajador |
| Precondiciones |  |
| 1. El usuario debe haber iniciado sesión en el sistema.<br>2. Debe existir al menos una organización registrada en el CRM<br>BioActiva.<br>3. El sistema debe estar operativo. |  |
| Flujo Básico |  |
| 1. El usuario accede a la opción Contactos desde el menú principal<br>del CRM BioActiva.<br>2. El sistema muestra la tabla de contactos registrados según el<br>formato mostrado en el prototipo.<br>3. El usuario puede filtrar los contactos con respecto al nombre del<br>contacto.<br>4. El usuario puede seleccionar registrar un contacto mediante el<br>botón Nuevo contacto.<br>5. El sistema muestra el formulario de registro de contacto según el<br>formato mostrado en el prototipo<br>6. El usuario completa la información del contacto.<br>7. El sistema valida que los campos obligatorios no estén vacíos. |  |


---

## Página 51

                  8. El sistema valida que el correo electrónico no esté registrado en el
                     CRM BioActiva.
                  9. El usuario selecciona el botón Guardar contacto.
                  10. El sistema registra el contacto y lo vincula con la organización
                     seleccionada.
                  11. El usuario puede seleccionar un contacto existente desde la tabla
                     de contactos registrados.
                  12. Si el usuario selecciona un contacto, el sistema muestra el detalle
                     del contacto.
                  13. El sistema muestra la información general del contacto según la
                     información disponible en la pantalla de detalle mostrada en el
                     prototipo.
                  14. El sistema muestra la organización asociada al contacto.
                  15. El sistema muestra los leads asociados al contacto.
                  16. Desde el detalle del contacto, el usuario puede seleccionar el botón
                     Editar.
                  17. El sistema muestra el formulario de edición con la información
                     actual del contacto según el formato definido en el prototipo.
                  18. El sistema permite modificar organización, vocativo, nombres,
                     apellidos, cargos, correo electrónico y correo secundario, teléfono y
                     comentarios.
                  19. El usuario modifica la información del contacto.
                  20. El sistema valida que los campos obligatorios no estén vacíos.
                  21. El sistema valida que el correo electrónico no esté registrado en el
                     CRM BioActiva
                  22. El usuario puede confirmar la actualización seleccionando el botón
                     Guardar cambios o cancelar la operación seleccionando el botón
                     Cancelar.
                  23. Si el usuario confirma la edición, el sistema guarda los cambios
                     realizados.
                  24. El sistema muestra la información actualizada del contacto.
                  25. Desde el detalle del contacto, el usuario puede definir el estado de
                     un contacto como vencido si selecciona el botón Marcar como
                     vencido.


---

## Página 52

                  26. Desde el detalle del contacto, el usuario puede definir el estado de
                     un contacto como vigente si selecciona el botón Marcar como
                     vigente.
                  27. El usuario confirma el cambio de estado.
                  28. El sistema actualiza el estado del contacto.
                Flujo Alternativo
                Correo duplicado
                  1. En los pasos 8 o 21, el sistema detecta que el correo electrónico
                     principal ya se encuentra registrado en otro contacto.
                  2. El sistema muestra el mensaje: "El correo electrónico {insertar
                     correo registrado} ya se encuentra registrado en el sistema."
                  3. El sistema no permite completar el registro o actualización.
                  4. El usuario puede corregir la información ingresada o cancelar la
                     operación.
                Datos obligatorios incompletos
                  1. En los pasos 7 o 19, el sistema detecta que la información
                     necesaria para registrar o actualizar el contacto como organización,
                     vocativo, nombres o correo electrónico no ha sido completada.
                  2. El sistema muestra los mensajes de validación correspondientes en
                     la interfaz según el campo faltante.
                       a. Para organización muestra “La organización es
                         obligatoria”
                       b. Para vocativo muestra “El campo Vocativo es obligatorio”
                       c. Para nombres muestra “El nombre es obligatorio”
                       d. Para correo electrónico muestra “Ingrese un correo válido”
                  3. El sistema no permite completar el registro o la actualización.
                  4. El usuario corrige la información ingresada.
                  5. El sistema registra o actualiza el contacto.
                Formato de correo inválido


### Tablas de la página


#### Tabla 1

| 26. Desde el detalle del contacto, el usuario puede definir el estado de<br>un contacto como vigente si selecciona el botón Marcar como<br>vigente.<br>27. El usuario confirma el cambio de estado.<br>28. El sistema actualiza el estado del contacto. |
| --- |
| Flujo Alternativo |
| Correo duplicado |
| 1. En los pasos 8 o 21, el sistema detecta que el correo electrónico<br>principal ya se encuentra registrado en otro contacto.<br>2. El sistema muestra el mensaje: "El correo electrónico {insertar<br>correo registrado} ya se encuentra registrado en el sistema."<br>3. El sistema no permite completar el registro o actualización.<br>4. El usuario puede corregir la información ingresada o cancelar la<br>operación. |
| Datos obligatorios incompletos |
| 1. En los pasos 7 o 19, el sistema detecta que la información<br>necesaria para registrar o actualizar el contacto como organización,<br>vocativo, nombres o correo electrónico no ha sido completada.<br>2. El sistema muestra los mensajes de validación correspondientes en<br>la interfaz según el campo faltante.<br>a. Para organización muestra “La organización es<br>obligatoria”<br>b. Para vocativo muestra “El campo Vocativo es obligatorio”<br>c. Para nombres muestra “El nombre es obligatorio”<br>d. Para correo electrónico muestra “Ingrese un correo válido”<br>3. El sistema no permite completar el registro o la actualización.<br>4. El usuario corrige la información ingresada.<br>5. El sistema registra o actualiza el contacto. |
| Formato de correo inválido |


---

## Página 53

                  1. En los pasos 7 o 20, el sistema detecta que el correo electrónico
                     ingresado no cumple el formato esperado.
                  2. El sistema muestra el mensaje: "Ingrese un correo válido”"
                  3. El sistema no permite completar la operación.
                  4. El usuario corrige la información.
                  5. El sistema registra o actualiza el contacto
                Formato de teléfono inválido
                  1. En los pasos 7 o 19, el sistema detecta que el número telefónico
                     ingresado no cumple el formato definido.
                  2. El sistema muestra el mensaje: "Ingresa solo los dígitos del
                     número (sin código de país)."
                  3. El sistema no permite completar la operación.
                  4. El usuario corrige la información.
                  5. El flujo retorna al paso correspondiente.
                Actualización cancelada
                  1. En el paso 22, el usuario selecciona la opción "Cancelar".
                  2. El sistema descarta los cambios no guardados.
                  3. El contacto conserva su información original.
                  4. El sistema retorna a la pantalla de detalle del contacto.
                  Postcondiciones
                  ●  El contacto queda registrado correctamente en el sistema o
                     actualizado según la operación realizada por el usuario.
                  ●  El contacto queda vinculado a una organización existente dentro
                     del CRM BioActiva.
                  ●  La información del contacto queda disponible para consulta desde
                     el módulo de Contactos.
                  ●  El contacto puede ser utilizado en los procesos de gestión de
                     Leads.
                  ●  Los cambios realizados sobre un contacto quedan reflejados en las
                     consultas posteriores.


### Tablas de la página


#### Tabla 1

| 1. En los pasos 7 o 20, el sistema detecta que el correo electrónico<br>ingresado no cumple el formato esperado.<br>2. El sistema muestra el mensaje: "Ingrese un correo válido”"<br>3. El sistema no permite completar la operación.<br>4. El usuario corrige la información.<br>5. El sistema registra o actualiza el contacto |
| --- |
| Formato de teléfono inválido |
| 1. En los pasos 7 o 19, el sistema detecta que el número telefónico<br>ingresado no cumple el formato definido.<br>2. El sistema muestra el mensaje: "Ingresa solo los dígitos del<br>número (sin código de país)."<br>3. El sistema no permite completar la operación.<br>4. El usuario corrige la información.<br>5. El flujo retorna al paso correspondiente. |
| Actualización cancelada |
| 1. En el paso 22, el usuario selecciona la opción "Cancelar".<br>2. El sistema descarta los cambios no guardados.<br>3. El contacto conserva su información original.<br>4. El sistema retorna a la pantalla de detalle del contacto. |
| Postcondiciones |
| ● El contacto queda registrado correctamente en el sistema o<br>actualizado según la operación realizada por el usuario.<br>● El contacto queda vinculado a una organización existente dentro<br>del CRM BioActiva.<br>● La información del contacto queda disponible para consulta desde<br>el módulo de Contactos.<br>● El contacto puede ser utilizado en los procesos de gestión de<br>Leads.<br>● Los cambios realizados sobre un contacto quedan reflejados en las<br>consultas posteriores. |


---

## Página 54

                  ●  Si el contacto es marcado como inactivo, su estado es actualizado
                     manteniendo la información histórica registrada.
                  ●  La operación realizada queda asociada al usuario que efectuó el
                     registro o actualización.
                  ●  El historial comercial asociado al contacto permanece disponible
                     para consulta.
                  Restricciones
               Diagrama de


### Tablas de la página


#### Tabla 1

| ● Si el contacto es marcado como inactivo, su estado es actualizado<br>manteniendo la información histórica registrada.<br>● La operación realizada queda asociada al usuario que efectuó el<br>registro o actualización.<br>● El historial comercial asociado al contacto permanece disponible<br>para consulta. |
| --- |
| Restricciones |


---

## Página 55

               Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 56


---

## Página 57

                 CU005: Gestión de Leads
                              El sistema debe permitir a los usuarios registrar,
                              consultar, actualizar y gestionar leads u
                              oportunidades comerciales dentro del CRM
                              BioActiva.
                              Cada lead debe estar asociado obligatoriamente a
                              una organización. El contacto es opcional, por lo que
                              el lead puede registrarse con o sin una persona de
                              contacto asociada.
                              El sistema permite visualizar los leads en un pipeline
                              comercial por estados: En prospecto, Ofertado,
                Descripción
                              Cierre con Venta y Cierre sin Venta. Asimismo, se
                              permite cambiar su estado mediante interacción con
                              las tarjetas del pipeline, registrar información
                              comercial del lead, programar actividades que podrán
                              ser del tipo “Email, Reunión, Llamada u Otro”,
                              definir un encargado que llevará a cabo el
                              seguimiento del lead hasta su proceso comercial
                              Además, se podrá visualizar la situación temporal de
                              la actividad de un lead a través de su estado del
                              seguimiento que presenta estos estados: Sin
                              actividades, Pendiente y Por vencer .
                Actores       Administrador, Trabajador
                Precondiciones
                  1. El usuario debe haber iniciado sesión en el sistema.
                  2. Debe existir al menos una organización registrada.
                  3. El sistema debe estar operativo.
                Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir a los usuarios registrar,<br>consultar, actualizar y gestionar leads u<br>oportunidades comerciales dentro del CRM<br>BioActiva.<br>Cada lead debe estar asociado obligatoriamente a<br>una organización. El contacto es opcional, por lo que<br>el lead puede registrarse con o sin una persona de<br>contacto asociada.<br>El sistema permite visualizar los leads en un pipeline<br>comercial por estados: En prospecto, Ofertado,<br>Cierre con Venta y Cierre sin Venta. Asimismo, se<br>permite cambiar su estado mediante interacción con<br>las tarjetas del pipeline, registrar información<br>comercial del lead, programar actividades que podrán<br>ser del tipo “Email, Reunión, Llamada u Otro”,<br>definir un encargado que llevará a cabo el<br>seguimiento del lead hasta su proceso comercial<br>Además, se podrá visualizar la situación temporal de<br>la actividad de un lead a través de su estado del<br>seguimiento que presenta estos estados: Sin<br>actividades, Pendiente y Por vencer . |
| --- | --- |
| Actores | Administrador, Trabajador |
| Precondiciones |  |
| 1. El usuario debe haber iniciado sesión en el sistema.<br>2. Debe existir al menos una organización registrada.<br>3. El sistema debe estar operativo. |  |
| Flujo Básico |  |


---

## Página 58

                  1. El usuario accede a la opción Pipeline desde el menú principal del
                     CRM BioActiva.
                  2. El sistema muestra el pipeline comercial en formato kanban con los
                     leads organizados por estado: En prospecto, Ofertado, Cierre con
                     venta y Cierre sin venta; siguiendo el diseño definido en el
                     prototipo.
                  3. El sistema muestra las tarjetas de leads existentes con información
                     resumida, como organización, servicio de interés, encargado, fecha
                     de creación, estado de seguimiento, contacto asociado en caso
                     tenga uno y monto de la cotización en caso se haya creado una
                     para lead o, sino, se muestra el mensaje “Por cotizar”.
                  4. El sistema habilita accesos directos a detalle del lead.
                  5. El sistema muestra inicialmente 20 leads en cada estado.
                  6. El usuario puede filtrar los leads según características de la
                     organización (nombre, sector y tipo), encargado, estado del lead,
                     estado de seguimiento y fecha de creación.
                  7. El usuario selecciona el botón Nuevo lead.
                  8. El sistema muestra el formulario de registro de nuevo lead definido
                     en el prototipo.
                  9. El usuario selecciona la organización a la que pertenece el lead.
                  10. El sistema muestra los contactos asociados a la organización
                     seleccionada.
                  11. El usuario puede seleccionar un contacto asociado a la
                     organización. Este campo es opcional y puede quedar vacío
                  12. Si el usuario selecciona un contacto, el sistema verifica que su
                     estado sea “Vigente”.
                  13. El usuario completa la información requerida del lead mediante un
                     formulario definido en el prototipo.
                  14. El sistema valida que los campos obligatorios hayan sido
                     completados.
                  15. El usuario confirma el registro seleccionando el botón Guardar
                     lead.
                  16. El sistema guarda el lead y lo vincula con la organización, con el
                     encargado asignado y, si aplica, con el contacto seleccionado.
                  17. El sistema genera automáticamente el ID del lead.


---

## Página 59

                  18. El lead queda disponible en el pipeline comercial, inicialmente en el
                     estado En prospecto.
                  19. El estado del seguimiento inicial del lead es “Sin actividades”.
                  20. El usuario puede hacer clic sobre una tarjeta de lead para visualizar
                     su vista rápida según el formato definido en el prototipo.
                  21. Desde la vista rápida, el usuario puede ir a detalle del lead
                     mediante el botón Gestionar lead.
                  22. Desde detalle del lead, el usuario puede editar el lead mediante el
                     botón Editar lead
                  23. El sistema muestra el formulario edición con la información actual
                     del lead según el formato mostrado en el prototipo.
                  24. El sistema permite modificar el servicio de interés y canal de
                     captación y verifica que servició de interés no esté vacío.
                  25. Desde el detalle del lead, el usuario puede ir a la sección
                     Información, Actividades o Cotizaciones y cada sección sigue el
                     formato mostrado en el prototipo.
                  26. Desde la sección Información, el sistema permite visualizar todo la
                     información registrada del lead
                  27. El usuario puede modificar comentarios y desafío u oportunidad
                     mediante Editar ubicado en la subsección Contexto Comercial.
                  28. Desde Actividades, el usuario programa una nueva actividad
                     asociada al lead, indicando tipo de actividad, fecha de fin y notas.
                  29. El sistema verifica que los campos obligatorios estén completados.
                  30. El sistema verifica que los campos de fecha inicio y fecha fin tengan
                     un formato válido.
                  31. El sistema asigna la actividad al encargado vigente del lead.
                  32. El usuario registra la actividad.
                  33. El sistema guarda la actividad y la muestra en la sección de
                     Actividades
                  34. El usuario puede registrar y editar comentarios sobre una actividad
                     antes y luego de terminarse.
                  35. El sistema actualiza el estado de seguimiento del lead a
                     “Pendiente” si se registra una actividad.
                  36. Si a la actividad le quedan 2 días para llegar a la fecha fin cambia a
                     “Por vencer”.


---

## Página 60

                  37. El usuario puede marcar como completado la actividad desde la
                     sección Actividades.
                  38. El usuario puede eliminar únicamente la actividad que está activa
                     desde la sección Actividades.
                  39. Desde la sección Cotizaciones, el usuario puede crear una
                     cotización mediante el botón Nueva cotización.
                  40. Desde la tabla Kanban, el usuario puede cambiar el estado del lead
                     moviendo o trasladando la tarjeta del lead a otra columna del
                     pipeline.
                  41. El sistema actualiza el estado del lead en el pipeline.
                  42. Si el lead cambia del estado En prospecto al estado Ofertado, el
                     sistema genera automáticamente una cotización plantilla asociada
                     al lead.
                  43. El sistema muestra un mensaje que permite direccionar al usuario
                     hacia la cotización creada según el formato definido en el prototipo.
                  44. Si el lead cambia del estado Ofertado a Cierre con venta, el
                     estado de su cotización asignada cambia a Aceptada
                  45. Si el lead cambia del estado Ofertado a Cierre sin venta, el estado
                     de su cotización asignada cambia a Rechazada.
                  46. El sistema permite cambiar el estado de un lead en Cierre con
                     venta o Cierre sin venta, hacer ello cambia el estado de la
                     cotización, según el cambio del estado del lead.
                  47. Si el lead cambia del estado Cierre sin venta a Cierre con venta,
                     la cotización asociada cambia de Rechazada a Aceptada.
                  48. Si el lead cambia del estado Cierre con venta a Cierre sin venta,
                     la cotización asociada cambia de Aceptada a Rechazada.
                  49. Si el lead cambia del estado Cierre con venta a Ofertado, la
                     cotización asociada cambia de Aceptada a Pendiente.
                  50. Si el lead cambia del estado Cierre sin venta a Ofertado, la
                     cotización asociada cambia de Rechazada a Pendiente.
                  51. El sistema se encarga de verificar que cuando el lead cambie de
                     estado a Cierre sin venta, ya no mostrará el monto de la cotización
                     en su tarjeta de lead
                Flujo Alternativo


### Tablas de la página


#### Tabla 1

| 37. El usuario puede marcar como completado la actividad desde la<br>sección Actividades.<br>38. El usuario puede eliminar únicamente la actividad que está activa<br>desde la sección Actividades.<br>39. Desde la sección Cotizaciones, el usuario puede crear una<br>cotización mediante el botón Nueva cotización.<br>40. Desde la tabla Kanban, el usuario puede cambiar el estado del lead<br>moviendo o trasladando la tarjeta del lead a otra columna del<br>pipeline.<br>41. El sistema actualiza el estado del lead en el pipeline.<br>42. Si el lead cambia del estado En prospecto al estado Ofertado, el<br>sistema genera automáticamente una cotización plantilla asociada<br>al lead.<br>43. El sistema muestra un mensaje que permite direccionar al usuario<br>hacia la cotización creada según el formato definido en el prototipo.<br>44. Si el lead cambia del estado Ofertado a Cierre con venta, el<br>estado de su cotización asignada cambia a Aceptada<br>45. Si el lead cambia del estado Ofertado a Cierre sin venta, el estado<br>de su cotización asignada cambia a Rechazada.<br>46. El sistema permite cambiar el estado de un lead en Cierre con<br>venta o Cierre sin venta, hacer ello cambia el estado de la<br>cotización, según el cambio del estado del lead.<br>47. Si el lead cambia del estado Cierre sin venta a Cierre con venta,<br>la cotización asociada cambia de Rechazada a Aceptada.<br>48. Si el lead cambia del estado Cierre con venta a Cierre sin venta,<br>la cotización asociada cambia de Aceptada a Rechazada.<br>49. Si el lead cambia del estado Cierre con venta a Ofertado, la<br>cotización asociada cambia de Aceptada a Pendiente.<br>50. Si el lead cambia del estado Cierre sin venta a Ofertado, la<br>cotización asociada cambia de Rechazada a Pendiente.<br>51. El sistema se encarga de verificar que cuando el lead cambie de<br>estado a Cierre sin venta, ya no mostrará el monto de la cotización<br>en su tarjeta de lead |
| --- |
| Flujo Alternativo |


---

## Página 61

                Datos obligatorios incompletos en lead
                  1. En el paso 14 o 24 el sistema detecta que faltan campos
                     obligatorios, como organización, servicio de interés y encargado.
                  2. El sistema muestra los mensajes de validación correspondientes en
                     la interfaz según el campo faltante.
                       a. Para organización muestra “La organización es
                         obligatoria”
                       b. Para servicio de interés muestra “El servicio de interés es
                         obligatorio”
                       c. Para encargado muestra “El encargado es obligatorio”
                  3. El sistema no permite registrar el lead.
                  4. El usuario completa la información requerida.
                  5. El sistema registra el lead.
                Programación de actividad sin datos obligatorios
                  1. En el paso 11, el usuario intenta registrar una actividad sin
                     completar datos obligatorios, como tipo, fecha de inicio o fecha de
                     fin.
                  2. El sistema muestra alertas de validación en los campos pendientes
                     con el mensaje: “Campos obligatorios para el registro.”
                  3. El sistema deshabilita el botón “Registrar actividad.”
                Registrar comentarios a las actividades
                  1. En el paso 34, el usuario puede registrar comentarios a las
                     actividades
                  2. El usuario puede observar un historial de todas las actividades con
                     sus respectivos comentarios.
                Contacto vencido


### Tablas de la página


#### Tabla 1

| Datos obligatorios incompletos en lead |
| --- |
| 1. En el paso 14 o 24 el sistema detecta que faltan campos<br>obligatorios, como organización, servicio de interés y encargado.<br>2. El sistema muestra los mensajes de validación correspondientes en<br>la interfaz según el campo faltante.<br>a. Para organización muestra “La organización es<br>obligatoria”<br>b. Para servicio de interés muestra “El servicio de interés es<br>obligatorio”<br>c. Para encargado muestra “El encargado es obligatorio”<br>3. El sistema no permite registrar el lead.<br>4. El usuario completa la información requerida.<br>5. El sistema registra el lead. |
| Programación de actividad sin datos obligatorios |
| 1. En el paso 11, el usuario intenta registrar una actividad sin<br>completar datos obligatorios, como tipo, fecha de inicio o fecha de<br>fin.<br>2. El sistema muestra alertas de validación en los campos pendientes<br>con el mensaje: “Campos obligatorios para el registro.”<br>3. El sistema deshabilita el botón “Registrar actividad.” |
| Registrar comentarios a las actividades |
| 1. En el paso 34, el usuario puede registrar comentarios a las<br>actividades<br>2. El usuario puede observar un historial de todas las actividades con<br>sus respectivos comentarios. |
| Contacto vencido |


---

## Página 62

                  1. En el paso 12, el sistema no muestra a los contactos con estado
                     “Vencido”.
                Columna del pipeline con más de 20 tarjetas
                  1. En el paso 5 o 18, el sistema detecta que una columna del pipeline
                     supera las 20 tarjetas visibles.
                  2. El sistema muestra únicamente las primeras 20 tarjetas de la
                     columna.
                  3. El sistema habilita el botón “Ver más” para visualizar 5 leads
                     adicionales en esa columna.
                  4. La carga adicional se aplica únicamente sobre la columna
                     seleccionada, sin modificar la visualización de las demás columnas
                     del pipeline.
                  5. El botón se seguirá mostrando hasta cargar la totalidad de leads en
                     esa columna.
                Impedir creación de cotización
                  1. En el paso 28, el sistema detecta que hay una actividad sin
                     completar en el lead donde se quiere crear una cotización.
                  2. El sistema inhabilita el botón Nueva cotización.
                  3. Si el usuario lo presiona el sistema muestra el mensaje: “Debes
                     completar {insertar nombre de la actividad} antes de crear una
                     cotización”.
                Restricciones para las fechas de actividad
                  1. En el paso 30, el sistema detecta un formato inválido en las fechas


### Tablas de la página


#### Tabla 1

| 1. En el paso 12, el sistema no muestra a los contactos con estado<br>“Vencido”. |
| --- |
| Columna del pipeline con más de 20 tarjetas |
| 1. En el paso 5 o 18, el sistema detecta que una columna del pipeline<br>supera las 20 tarjetas visibles.<br>2. El sistema muestra únicamente las primeras 20 tarjetas de la<br>columna.<br>3. El sistema habilita el botón “Ver más” para visualizar 5 leads<br>adicionales en esa columna.<br>4. La carga adicional se aplica únicamente sobre la columna<br>seleccionada, sin modificar la visualización de las demás columnas<br>del pipeline.<br>5. El botón se seguirá mostrando hasta cargar la totalidad de leads en<br>esa columna. |
| Impedir creación de cotización |
| 1. En el paso 28, el sistema detecta que hay una actividad sin<br>completar en el lead donde se quiere crear una cotización.<br>2. El sistema inhabilita el botón Nueva cotización.<br>3. Si el usuario lo presiona el sistema muestra el mensaje: “Debes<br>completar {insertar nombre de la actividad} antes de crear una<br>cotización”. |
| Restricciones para las fechas de actividad |
| 1. En el paso 30, el sistema detecta un formato inválido en las fechas |


---

## Página 63

                       a. Si la fecha inicio es anterior a la fecha actual, el sistema
                         muestra el mensaje: “El valor debe ser igual o posterior a
                         {insertar fecha actual}.”
                       b. El sistema no permite seleccionar una fecha fin menor a la
                         fecha inicio.
                       c. Si la fecha incio es mayor a la fecha fin, el sistema cambia la
                         fecha fin para que sea igual a la fecha inicio.
                Datos obligatorios incompletos en actividad
                  1. En el paso 29, el sistema detecta que faltan campos obligatorios,
                     como nombre, fecha inicio o fecha fin
                  2. El sistema muestra los mensajes de validación correspondientes en
                     la interfaz según el campo faltante.
                       a. Para nombre muestra “El nombre de la actividad es
                         obligatorio”
                       b. Para fecha inicio muestra “La fecha de inicio es
                         obligatoria”
                       c. Para fecha fin muestra “La fecha de fin es obligatoria”
                  3. El sistema no permite registrar la actividad.
                  4. El usuario completa la información requerida.
                  5. El sistema registra la actividad.
                  Postcondiciones
                  1. El lead queda registrado correctamente en el sistema.
                  2. El lead queda vinculado obligatoriamente a una organización.
                  3. El lead puede quedar vinculado opcionalmente a un contacto.
                  4. El lead queda visible en el pipeline comercial según su estado.
                  5. El lead puede cambiar de estado dentro del pipeline.
                  6. El lead puede tener actividades de seguimiento asociadas.
                  7. Las actividades programadas quedan disponibles en el detalle del
                     lead.
                  8. El lead queda disponible para ser utilizado posteriormente en la
                     generación de cotizaciones.


### Tablas de la página


#### Tabla 1

| a. Si la fecha inicio es anterior a la fecha actual, el sistema<br>muestra el mensaje: “El valor debe ser igual o posterior a<br>{insertar fecha actual}.”<br>b. El sistema no permite seleccionar una fecha fin menor a la<br>fecha inicio.<br>c. Si la fecha incio es mayor a la fecha fin, el sistema cambia la<br>fecha fin para que sea igual a la fecha inicio. |
| --- |
| Datos obligatorios incompletos en actividad |
| 1. En el paso 29, el sistema detecta que faltan campos obligatorios,<br>como nombre, fecha inicio o fecha fin<br>2. El sistema muestra los mensajes de validación correspondientes en<br>la interfaz según el campo faltante.<br>a. Para nombre muestra “El nombre de la actividad es<br>obligatorio”<br>b. Para fecha inicio muestra “La fecha de inicio es<br>obligatoria”<br>c. Para fecha fin muestra “La fecha de fin es obligatoria”<br>3. El sistema no permite registrar la actividad.<br>4. El usuario completa la información requerida.<br>5. El sistema registra la actividad. |
| Postcondiciones |
| 1. El lead queda registrado correctamente en el sistema.<br>2. El lead queda vinculado obligatoriamente a una organización.<br>3. El lead puede quedar vinculado opcionalmente a un contacto.<br>4. El lead queda visible en el pipeline comercial según su estado.<br>5. El lead puede cambiar de estado dentro del pipeline.<br>6. El lead puede tener actividades de seguimiento asociadas.<br>7. Las actividades programadas quedan disponibles en el detalle del<br>lead.<br>8. El lead queda disponible para ser utilizado posteriormente en la<br>generación de cotizaciones. |


---

## Página 64

                  9. El registro queda asociado al usuario que creó el lead.
                  Restricciones
               Diagrama de caso de uso
                Prototipo


### Tablas de la página


#### Tabla 1

| 9. El registro queda asociado al usuario que creó el lead. |
| --- |
| Restricciones |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 65


---

## Página 66


---

## Página 67

                 CU006: Gestión de las Cotizaciones
                             El sistema debe permitir registrar, consultar, editar y
                             gestionar cotizaciones asociadas a oportunidades
                             comerciales existentes dentro del CRM BioActiva.
                             Toda cotización debe estar vinculada a un lead
                             previamente registrado. Al seleccionar un lead, el
               Descripción
                             sistema completa automáticamente información
                             relacionada, como cliente, contacto y servicio de
                             interés, de acuerdo con los datos disponibles del lead.
                             La cotización permite formalizar una propuesta
                             comercial mediante datos como fecha, contacto, cliente,
                             producto, remitente, nombre del servicio, monto,


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir registrar, consultar, editar y<br>gestionar cotizaciones asociadas a oportunidades<br>comerciales existentes dentro del CRM BioActiva.<br>Toda cotización debe estar vinculada a un lead<br>previamente registrado. Al seleccionar un lead, el<br>sistema completa automáticamente información<br>relacionada, como cliente, contacto y servicio de<br>interés, de acuerdo con los datos disponibles del lead.<br>La cotización permite formalizar una propuesta<br>comercial mediante datos como fecha, contacto, cliente,<br>producto, remitente, nombre del servicio, monto, |
| --- | --- |


---

## Página 68

                             moneda, estado, observación y enlace a la propuesta.
                             Cuando una cotización se registra con estado Enviada,
                             Aceptada o Rechazada, el sistema debe validar
                             previamente que el lead no tenga actividades
                             pendientes. Si no existen actividades pendientes, el
                             sistema actualiza el estado del lead a Cierre con venta
                             o Cierre sin venta, según corresponda y en caso el
                             lead se encuentre en Ofertado.
               Actores       Administrador, Trabajador
               Precondiciones
                  1. El usuario debe haber iniciado sesión en el sistema.
                  2. Debe existir al menos un lead registrado.
                  3. El sistema debe estar operativo.
               Flujo Básico
                  1. El usuario accede a la opción Cotizaciones desde el menú principal
                    del CRM BioActiva.
                  2. El sistema muestra la tabla cotizaciones registradas siguiendo
                    según el formato mostrado en el prototipo.
                  3. El usuario puede filtrar las cotizaciones mediante el nombre de la
                    organización y estado.
                  4. Si el usuario desea crear una cotización, dispone de dos maneras
                       a. La primera manera es que el usuario puede cambiar el
                         estado de un lead En prospecto a Ofertado, ello generará
                         una cotización automáticamente con el estado Pendiente,
                         rellenando automáticamente los campos de cliente (nombre
                         de la organización), dirigido (nombre del cliente, si existe, o
                         nulo en caso contrario), remitente (nombre del encargado del
                         lead que se está cotizando), monto (igual a 0 ), moneda
                         (soles) y nombre del servicio (Servicio de interés de lead).
                       b. La segunda manera es que el usuario, puede crear la
                         cotización para un lead en específico desde detalle del lead


### Tablas de la página


#### Tabla 1

|  | moneda, estado, observación y enlace a la propuesta.<br>Cuando una cotización se registra con estado Enviada,<br>Aceptada o Rechazada, el sistema debe validar<br>previamente que el lead no tenga actividades<br>pendientes. Si no existen actividades pendientes, el<br>sistema actualiza el estado del lead a Cierre con venta<br>o Cierre sin venta, según corresponda y en caso el<br>lead se encuentre en Ofertado. |
| --- | --- |
| Actores | Administrador, Trabajador |
| Precondiciones |  |
| 1. El usuario debe haber iniciado sesión en el sistema.<br>2. Debe existir al menos un lead registrado.<br>3. El sistema debe estar operativo. |  |
| Flujo Básico |  |
| 1. El usuario accede a la opción Cotizaciones desde el menú principal<br>del CRM BioActiva.<br>2. El sistema muestra la tabla cotizaciones registradas siguiendo<br>según el formato mostrado en el prototipo.<br>3. El usuario puede filtrar las cotizaciones mediante el nombre de la<br>organización y estado.<br>4. Si el usuario desea crear una cotización, dispone de dos maneras<br>a. La primera manera es que el usuario puede cambiar el<br>estado de un lead En prospecto a Ofertado, ello generará<br>una cotización automáticamente con el estado Pendiente,<br>rellenando automáticamente los campos de cliente (nombre<br>de la organización), dirigido (nombre del cliente, si existe, o<br>nulo en caso contrario), remitente (nombre del encargado del<br>lead que se está cotizando), monto (igual a 0 ), moneda<br>(soles) y nombre del servicio (Servicio de interés de lead).<br>b. La segunda manera es que el usuario, puede crear la<br>cotización para un lead en específico desde detalle del lead |  |


---

## Página 69

                         en la sección Cotización puede presionar el botón Nueva
                         cotización. Esto abrirá un formulario con el formato definido
                         en el prototipo, que rellena automáticamente los campos
                         lead, fecha de cotización, cliente, dirigido, remitente, nombre
                         del servicio y dispone como únicos campos editables para
                         que el usuario complete: producto, monto, moneda,
                         observación y link de propuesta. El sistema valida el formato
                         de monto, que los campos obligatorios no estén vacíos. El
                         usuario confirma el registro de la cotización mediante el
                         botón Guardar cotización.
                       c. En cualquiera de las dos maneras, se verifica que no haya
                         actividades creadas. Para la primera manera, se muestra el
                         mensaje: “El lead tiene una actividad pendiente. Complétala
                         o cancélala antes de cambiar el estado. Para la segunda
                         manera, se sigue el procedimiento mensaje que se definió
                         en el CU005: Gestión de leads; ”
                  5. La cotización queda disponible para consulta y seguimiento con
                    estado Pendiente.
                  6. El lead de la cotización creada pasa del estado En prospecto a
                    Ofertado
                  7. El usuario puede seleccionar una cotización existente desde la tabla
                    de cotizaciones registradas.
                  8. Si el usuario selecciona una cotización, el sistema muestra el detalle
                    de la organización según el formato definido en el prototipo.
                  9. Desde el detalle de la cotización, el usuario puede retornar al listado
                    o seleccionar el botón Editar.
                  10. Si el usuario selecciona Editar cotización, el sistema muestra el
                    formulario con la información actual de la cotización según el
                    formato del prototipo.
                  11. El usuario puede modificar el campo producto, nombre del servicio,
                    monto, moneda, observación o link de propuesta.
                  12. El sistema valida el formato de monto.
                  13. El sistema valida que los campos obligatorios no estén vacíos.
                  14. El usuario puede confirmar la actualización seleccionando el botón
                    Guardar cambios o Cancelar en caso contrario.


---

## Página 70

                  15. El usuario puede actualizar el estado de la cotización desde detalle,
                    donde podrá seleccionar Marca como enviada si el estado de la
                    cotización es Pendiente.
                  16. El usuario podrá seleccionar Rechazada o Aceptada si el estado de
                    la cotización es Enviada.
                  17. El sistema verifica que el lead asociado no tenga actividades
                    pendientes cuando se haga cualquier cambio de estado en
                    cotización, excepto cuando es de Pendiente a Enviada.
                  18. El sistema verifica si una cotización alcanza algún estado de cierre.
                  19. El sistema habilita el botón Reaperturar.
                  20. El usuario selecciona el botón Reaperturar.
                  21. El usuario confirma la reapertura según el formato mostrado en el
                    prototipo.
                  22. Luego de confirmar, el sistema verifica si el lead tiene actividades
                    pendientes.
                  23. Si el lead no tiene actividades, la cotización cambia a “Pendiente” y
                    el estado del lead asociado pasa a “Ofertado”.
               Flujo Alternativo
               Datos obligatorios incompletos
                  1. En el paso 4b o 13, el sistema detecta que faltan campos
                    obligatorios, como nombre.
                  2. El sistema muestra el mensaje de validación: “El nombre del
                    servicio es obligatorio.”
                  3. El sistema no permite registrar la cotización.
                  4. El usuario completa la información requerida.
                  5. El sistema permite registrar la cotización
               Lead con actividades pendientes
                  1. En el paso 17 o 23, el sistema detecta que el lead tiene actividades
                    pendientes.
                  2. El sistema no permite cambiar el estado de la cotización.
                  3. El sistema muestra el mensaje: “El lead tiene actividades
                    pendientes”


### Tablas de la página


#### Tabla 1

| 15. El usuario puede actualizar el estado de la cotización desde detalle,<br>donde podrá seleccionar Marca como enviada si el estado de la<br>cotización es Pendiente.<br>16. El usuario podrá seleccionar Rechazada o Aceptada si el estado de<br>la cotización es Enviada.<br>17. El sistema verifica que el lead asociado no tenga actividades<br>pendientes cuando se haga cualquier cambio de estado en<br>cotización, excepto cuando es de Pendiente a Enviada.<br>18. El sistema verifica si una cotización alcanza algún estado de cierre.<br>19. El sistema habilita el botón Reaperturar.<br>20. El usuario selecciona el botón Reaperturar.<br>21. El usuario confirma la reapertura según el formato mostrado en el<br>prototipo.<br>22. Luego de confirmar, el sistema verifica si el lead tiene actividades<br>pendientes.<br>23. Si el lead no tiene actividades, la cotización cambia a “Pendiente” y<br>el estado del lead asociado pasa a “Ofertado”. |
| --- |
| Flujo Alternativo |
| Datos obligatorios incompletos |
| 1. En el paso 4b o 13, el sistema detecta que faltan campos<br>obligatorios, como nombre.<br>2. El sistema muestra el mensaje de validación: “El nombre del<br>servicio es obligatorio.”<br>3. El sistema no permite registrar la cotización.<br>4. El usuario completa la información requerida.<br>5. El sistema permite registrar la cotización |
| Lead con actividades pendientes |
| 1. En el paso 17 o 23, el sistema detecta que el lead tiene actividades<br>pendientes.<br>2. El sistema no permite cambiar el estado de la cotización.<br>3. El sistema muestra el mensaje: “El lead tiene actividades<br>pendientes” |


---

## Página 71

                  4. El usuario puede completar o eliminar la actividad activa en el lead.
                  5. El usuario puede cambiar el estado de la cotización.
               Monto mayor a cero
                  1. En el paso 4b o 12, el monto es menor.
                  2. El sistema muestra un mensaje de error indicando: “El monto
                    ingresado debe ser mayor o igual que 0.
               Cotización rechazada
                  1. En el paso 16, el sistema identifica que la cotización tiene estado
                    Rechazada.
                  2. El sistema actualiza el estado del lead a Cierre sin venta.
               Cotización aceptada
                  1. En el paso 16, el sistema identifica que la cotización tiene estado
                    Aceptada.
                  2. El sistema actualiza el estado del lead a Cierre con venta.
               Unicidad de cotización
                  1. En el paso 4b el sistema identifica que ya existe una cotización
                    creada para el lead.
                  2. El sistema no muestra el botón de Nueva cotización en la sección
                    Cotizaciones de detalle de lead.
                 Postcondiciones
                  1. La cotización queda registrada correctamente en el sistema.
                  2. La cotización queda asociada a un lead existente.
                  3. La cotización queda vinculada indirectamente a la organización del
                    lead.
                  4. Si el lead cuenta con contacto asociado, la cotización puede mostrar
                    dicho contacto.


### Tablas de la página


#### Tabla 1

| 4. El usuario puede completar o eliminar la actividad activa en el lead.<br>5. El usuario puede cambiar el estado de la cotización. |
| --- |
| Monto mayor a cero |
| 1. En el paso 4b o 12, el monto es menor.<br>2. El sistema muestra un mensaje de error indicando: “El monto<br>ingresado debe ser mayor o igual que 0. |
| Cotización rechazada |
| 1. En el paso 16, el sistema identifica que la cotización tiene estado<br>Rechazada.<br>2. El sistema actualiza el estado del lead a Cierre sin venta. |
| Cotización aceptada |
| 1. En el paso 16, el sistema identifica que la cotización tiene estado<br>Aceptada.<br>2. El sistema actualiza el estado del lead a Cierre con venta. |
| Unicidad de cotización |
| 1. En el paso 4b el sistema identifica que ya existe una cotización<br>creada para el lead.<br>2. El sistema no muestra el botón de Nueva cotización en la sección<br>Cotizaciones de detalle de lead. |
| Postcondiciones |
| 1. La cotización queda registrada correctamente en el sistema.<br>2. La cotización queda asociada a un lead existente.<br>3. La cotización queda vinculada indirectamente a la organización del<br>lead.<br>4. Si el lead cuenta con contacto asociado, la cotización puede mostrar<br>dicho contacto. |


---

## Página 72

                  5. La cotización queda disponible para consulta y seguimiento.
                  6. Si la cotización fue aceptada y no existían actividades pendientes, el
                    lead queda actualizado como Cierre con venta.
                  7. Si la cotización fue rechazada o denegada y no existían actividades
                    pendientes, el lead queda actualizado como Cierre sin venta.
                  8. El registro queda asociado al usuario que creó la cotización.
                 Restricciones
               Diagrama de caso de uso
               Prototipo


### Tablas de la página


#### Tabla 1

| 5. La cotización queda disponible para consulta y seguimiento.<br>6. Si la cotización fue aceptada y no existían actividades pendientes, el<br>lead queda actualizado como Cierre con venta.<br>7. Si la cotización fue rechazada o denegada y no existían actividades<br>pendientes, el lead queda actualizado como Cierre sin venta.<br>8. El registro queda asociado al usuario que creó la cotización. |
| --- |
| Restricciones |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 73


---

## Página 74

                 CU007: Gestión de notificaciones
                              El sistema debe permitir programar, consultar,
                              cancelar y visualizar notificaciones asociadas al
                              seguimiento de leads y actividades comerciales
               Descripción
                              dentro del CRM BioActiva.
                              Las notificaciones se generan a partir de actividades
                              registradas en un lead, tales como Email, Reunión,


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir programar, consultar,<br>cancelar y visualizar notificaciones asociadas al<br>seguimiento de leads y actividades comerciales<br>dentro del CRM BioActiva.<br>Las notificaciones se generan a partir de actividades<br>registradas en un lead, tales como Email, Reunión, |
| --- | --- |


---

## Página 75

                              Llamada u Otro. Para toda actividad, el sistema debe
                              permitir programar recordatorios internos dirigidos al
                              encargado.
                              Cuando la notificación sea de tipo Seguimiento,
                              implicando el envío de un correo, al cliente y al
                              encargado, el sistema permitirá utilizar una plantilla
                              previamente registrada en la pestaña Plantillas. El
                              usuario podrá seleccionar una plantilla, editar el
                              asunto o cuerpo del correo para el caso específico y
                              conservar esa versión personalizada para su envío en
                              las fechas definidas, sin modificar la plantilla original.
                              Cuando la notificación sea de tipo Seguimiento,
                              implicará la programación de una única secuencia
                              asociada a una actividad comercial del lead. Esta
                              secuencia incluye el envío de un correo interno al
                              encargado y un correo externo al cliente o contacto
                              asociado al lead. Para ambos correos, el sistema
                              permitirá utilizar una plantilla previamente registrada
                              en la pestaña Plantillas. El usuario podrá seleccionar
                              una plantilla, editar el asunto o cuerpo del correo para
                              el caso específico y conservar esa versión
                              personalizada para su envío en las fechas definidas,
                              sin modificar la plantilla original.
                              Las notificaciones podrán visualizarse desde la
                              pestaña Notificaciones, donde el usuario podrá
                              consultar notificaciones programadas y enviadas. Las
                              notificaciones programadas podrán cancelarse, pero
                              no reprogramarse directamente. Si se requiere
                              cambiar la fecha, hora, plantilla o configuración, el
                              usuario deberá cancelar la notificación existente y
                              crear una nueva desde la actividad correspondiente.
               Actores        Administrador, Trabajador, Outlook / Microsoft


### Tablas de la página


#### Tabla 1

|  | Llamada u Otro. Para toda actividad, el sistema debe<br>permitir programar recordatorios internos dirigidos al<br>encargado.<br>Cuando la notificación sea de tipo Seguimiento,<br>implicando el envío de un correo, al cliente y al<br>encargado, el sistema permitirá utilizar una plantilla<br>previamente registrada en la pestaña Plantillas. El<br>usuario podrá seleccionar una plantilla, editar el<br>asunto o cuerpo del correo para el caso específico y<br>conservar esa versión personalizada para su envío en<br>las fechas definidas, sin modificar la plantilla original.<br>Cuando la notificación sea de tipo Seguimiento,<br>implicará la programación de una única secuencia<br>asociada a una actividad comercial del lead. Esta<br>secuencia incluye el envío de un correo interno al<br>encargado y un correo externo al cliente o contacto<br>asociado al lead. Para ambos correos, el sistema<br>permitirá utilizar una plantilla previamente registrada<br>en la pestaña Plantillas. El usuario podrá seleccionar<br>una plantilla, editar el asunto o cuerpo del correo para<br>el caso específico y conservar esa versión<br>personalizada para su envío en las fechas definidas,<br>sin modificar la plantilla original.<br>Las notificaciones podrán visualizarse desde la<br>pestaña Notificaciones, donde el usuario podrá<br>consultar notificaciones programadas y enviadas. Las<br>notificaciones programadas podrán cancelarse, pero<br>no reprogramarse directamente. Si se requiere<br>cambiar la fecha, hora, plantilla o configuración, el<br>usuario deberá cancelar la notificación existente y<br>crear una nueva desde la actividad correspondiente. |
| --- | --- |
| Actores | Administrador, Trabajador, Outlook / Microsoft |


---

## Página 76

               Precondiciones
                  1. El usuario debe haber iniciado sesión en el sistema.
                  2. Debe existir al menos un lead registrado que tenga un contacto
                    asociado.
                  3. El lead debe contar con una actividad registrada.
                  4. Para utilizar correos reutilizables, debe existir al menos una plantilla
                    activa en la pestaña Plantillas.
                  5. Para usar la notificación de Seguimiento, debe existir un lead con
                    una actividad registrada y un contacto asociado.
                  6. El sistema debe contar con servicio de correo disponible.
               Flujo Básico
                  1. El usuario accede a la opción Notificaciones desde el menú
                    principal del CRM BioActiva.
                  2. El sistema muestra la vista principal del módulo de Notificaciones
                    según lo mostrado en el prototipo.
                  3. El sistema muestra las secciones funcionales disponibles: Historial,
                    Recordatorio, Seguimiento y Calendario.
                  4. El usuario accede a la sección Historial.
                  5. El sistema muestra el historial de notificaciones organizado en dos
                    secciones: Programadas y Enviadas.
                  6. En la sección Programadas, el sistema muestra el recuento de
                    notificaciones programadas con el formato “Mostrando 6
                    programadas de {número de notificaciones programadas}”.
                    Además, en esta sección, el usuario ve solamente sus recordatorios
                    o seguimientos creados.
                  7. En la sección Enviadas, el sistema muestra las notificaciones que
                    ya fueron ejecutadas.
                  8. El sistema pagina las notificaciones programadas y de 6 en 6.
                  9. En cada tarjeta de notificación, el sistema muestra como mínimo el
                    lead, la actividad, el encargado, el tipo y la fecha.
                  10. El encargado de la notificación se obtiene automáticamente desde el
                    encargado del lead asociado.


### Tablas de la página


#### Tabla 1

| Precondiciones |
| --- |
| 1. El usuario debe haber iniciado sesión en el sistema.<br>2. Debe existir al menos un lead registrado que tenga un contacto<br>asociado.<br>3. El lead debe contar con una actividad registrada.<br>4. Para utilizar correos reutilizables, debe existir al menos una plantilla<br>activa en la pestaña Plantillas.<br>5. Para usar la notificación de Seguimiento, debe existir un lead con<br>una actividad registrada y un contacto asociado.<br>6. El sistema debe contar con servicio de correo disponible. |
| Flujo Básico |
| 1. El usuario accede a la opción Notificaciones desde el menú<br>principal del CRM BioActiva.<br>2. El sistema muestra la vista principal del módulo de Notificaciones<br>según lo mostrado en el prototipo.<br>3. El sistema muestra las secciones funcionales disponibles: Historial,<br>Recordatorio, Seguimiento y Calendario.<br>4. El usuario accede a la sección Historial.<br>5. El sistema muestra el historial de notificaciones organizado en dos<br>secciones: Programadas y Enviadas.<br>6. En la sección Programadas, el sistema muestra el recuento de<br>notificaciones programadas con el formato “Mostrando 6<br>programadas de {número de notificaciones programadas}”.<br>Además, en esta sección, el usuario ve solamente sus recordatorios<br>o seguimientos creados.<br>7. En la sección Enviadas, el sistema muestra las notificaciones que<br>ya fueron ejecutadas.<br>8. El sistema pagina las notificaciones programadas y de 6 en 6.<br>9. En cada tarjeta de notificación, el sistema muestra como mínimo el<br>lead, la actividad, el encargado, el tipo y la fecha.<br>10. El encargado de la notificación se obtiene automáticamente desde el<br>encargado del lead asociado. |


---

## Página 77

                  11. El sistema no permite editar directamente el encargado desde el
                    módulo de Notificaciones.
                  12. Si la notificación es de tipo Seguimiento, el sistema muestra la
                    opción Ver correos programados.
                  13. Al seleccionar Ver correos programados, el sistema muestra una
                    ventana de consulta con los correos asociados al seguimiento y
                    mostrará los correos definidos.
                  14. En la ventana de consulta, el sistema muestra por cada correo el
                    tipo de correo, fecha, hora, asunto y cuerpo del mensaje.
                  15. El sistema muestra los correos en modo solo lectura.
                  16. El sistema no permite modificar el asunto, cuerpo, fecha, hora ni
                    destinatario desde la ventana de consulta.
                  17. Si la notificación se encuentra en estado Programada, el sistema
                    muestra la opción Eliminar.
                  18. Si el usuario selecciona Eliminar, el sistema solicita confirmación
                    antes de cancelar la notificación programada.
                  19. Si el usuario confirma la eliminación, el sistema cancela la
                    notificación programada.
                  20. La notificación eliminada ya no será enviada ni ejecutada.
                  21. La notificación eliminada no se muestra en el historial visible de
                    notificaciones programadas.
                  22. Las notificaciones ejecutadas no pueden eliminarse ni cancelarse
                    desde el historial.
                  23. El usuario accede a la sección Recordatorio dentro del módulo de
                    Notificaciones.
                  24. El sistema muestra el formulario de programación de recordatorio
                    con el formato mostrado en el prototipo.
                  25. El sistema solo muestra como opciones de leads a los que el usuario
                    figura como encargado y tienen actividades registradas.
                  26. El usuario selecciona el lead al cual se asociará el recordatorio.
                  27. El sistema selecciona la actividad activa asociada al lead
                    seleccionado.
                  28. El sistema identifica automáticamente al encargado como
                    destinatario interno del recordatorio.
                  29. El sistema muestra el encargado identificado en modo solo lectura.


---

## Página 78

                  30. El usuario define o confirma la fecha de vencimiento o fecha fin de la
                    actividad.
                  31. El sistema muestra opciones de 15 minutos, 30 minutos, 1 hora y 1
                    día con respecto al tiempo antes en que llegará el recordatorio.
                  32. El sistema valida que se eligió una opción, dado que este campo no
                    puede ser nulo.
                  33. El sistema muestra un selector con las plantillas activas disponibles
                    previamente registradas en la pestaña Plantillas.
                  34. La selección de plantilla es opcional.
                  35. Si el usuario selecciona una plantilla, el sistema muestra el asunto y
                    cuerpo de la plantilla seleccionada.
                  36. Si el usuario no selecciona una plantilla, el sistema permite registrar
                    manualmente el asunto y cuerpo del correo.
                  37. El usuario puede editar el asunto y cuerpo del correo interno para
                    adaptarlo al caso específico.
                  38. El sistema guarda la versión editada del correo para ese
                    recordatorio, sin modificar la plantilla original.
                  39. El usuario confirma la programación del recordatorio.
                  40. El sistema registra el recordatorio en el historial de notificaciones,
                    dentro de la sección Programadas.
                  41. Cuando llega la fecha y hora programada, el sistema envía el correo
                    interno al encargado.
                  42. El correo interno incluye un enlace que redirige al detalle del lead,
                    específicamente a la pestaña Actividades, donde el encargado
                    puede revisar la actividad asociada.
                  43. El sistema registra el recordatorio ejecutado en el historial de
                    notificaciones, dentro de la sección Enviadas.
                  44. El usuario accede a la sección Seguimiento dentro del módulo de
                    Notificaciones y se muestra con el formato definido en el prototipo.
                  45. El sistema muestra el formulario de programación de seguimiento
                  46. El sistema solo muestra como opciones de leads a los que el usuario
                    figura como encargado y tienen actividades registradas.
                  47. El usuario selecciona el lead al cual se asociará el seguimiento.
                  48. El sistema selecciona la actividad activa asociada al lead
                    seleccionado.


---

## Página 79

                  49. El sistema identifica automáticamente al encargado como
                    destinatario interno del seguimiento.
                  50. El sistema muestra el encargado identificado en modo solo lectura.
                  51. El sistema identifica al contacto asociado al lead como destinatario
                    externo del seguimiento.
                  52. Si el contacto tiene más de un correo registrado, el sistema permite
                    seleccionar cuál será utilizado para el envío al contacto.
                  53. El sistema permite registrar el seguimiento..
                  54. El sistema permite configurar un correo para el usuario encargado y
                    un correo para el contacto asociado al lead.
                  55. Para el correo del usuario, el sistema permite definir plantilla
                    opcional, asunto, cuerpo del mensaje, fecha de envío y hora de
                    envío.
                  56. Para el correo del contacto, el sistema permite definir plantilla
                    opcional, asunto, cuerpo del mensaje, fecha de envío y hora de
                    envío.
                  57. La fecha y la hora se registran en campos separados.
                  58. El sistema debe validar que todas las fechas que se definan deben
                    ser mayores a la fecha actual y menores a la fecha fin de la
                    actividad.
                  59. Si el usuario selecciona una plantilla, el sistema carga el asunto y
                    cuerpo de la plantilla seleccionada.
                  60. El usuario puede editar el asunto y cuerpo del correo.
                  61. El sistema guarda la versión editada del correo sin modificar la
                    plantilla original.
                  62. Si el usuario no selecciona una plantilla, el sistema permite registrar
                    manualmente el asunto y cuerpo del correo.
                  63. El usuario confirma la programación del seguimiento.
                  64. El sistema guarda el seguimiento asociada a la actividad y al lead.
                  65. El sistema registra el seguimiento en el historial de notificaciones,
                    dentro de la sección Programadas.
                  66. Cuando llega la fecha y hora configurada para cada correo, el
                    sistema ejecuta el envío correspondiente.
                  67. El correo dirigido al usuario incluye un enlace que redirige al detalle
                    del lead, específicamente a la pestaña Actividades, donde el
                    encargado puede revisar la actividad asociada.


---

## Página 80

                  68. El encargado ingresa al enlace y revisa si la actividad fue atendida,
                    respondida o completada.
                  69. El sistema muestra la opción Marcar como completado desde la
                    actividad asociada al lead.
                  70. Si el encargado selecciona Marcar como completado, el sistema
                    marca la actividad como completada.
                  71. El sistema registra los correos ejecutados o vencidos dentro de la
                    sección Enviadas del historial de notificaciones.
                  72. El usuario accede a la sección Calendario dentro del módulo de
                    Notificaciones y se muestra con el formato definido en el prototipo.
                  73. El sistema verifica si el usuario cuenta con integración Microsoft
                    activa.
                  74. La integración Microsoft se administra desde el perfil del usuario.
                  75. Si el usuario no cuenta con integración Microsoft activa, el sistema
                    no permite usar la sección Calendario.
                  76. El sistema muestra únicamente las actividades registradas de tipo
                    Reunión en las que el usuario figure como encargado.
                  77. El sistema muestra una tarjeta por cada actividad de tipo Reunión,
                    incluyendo nombre de la actividad, lead asociado, encargado, fecha
                    fecha fin.
                  78. Las tarjetas de actividades tienen un botón Crear evento en
                    Microsoft Calendar
                  79. El usuario selecciona el botón Crear evento en Microsoft
                    Calendar.
                  80. El sistema crea un evento en el calendario Microsoft del usuario
                    integrado.
                  81. El sistema genera un enlace de reunión de Microsoft Teams
                    asociado al evento.
                  82. El sistema registra el identificador del evento de Microsoft Calendar
                    en la actividad.
                  83. El sistema registra el enlace de Microsoft Teams en la actividad.
                  84. El sistema confirma al usuario que el evento fue creado
                    correctamente en su calendario Microsoft.
                  85. La actividad queda vinculada al evento de Microsoft Calendar y al
                    enlace de Teams generado.


---

## Página 81

                  86. La tarjeta de actividad cambia el botón de Crear evento en
                    Microsoft Calendar por el texto: “Evento creado en el calendario”
                  87. La tarjeta de actividad permanecerá visible en la sección Calendario
                    hasta que pase la fecha fin de la actividad, una vez superada
                    desaparecerá de la sección Calendario.
                  88. El usuario puede visualizar el detalle de una notificación desde el
                    historial.
                  89. Si el usuario desea cambiar la fecha, hora, plantilla o configuración
                    de una notificación, deberá eliminar la notificación existente y
                    registrar una nueva.
               Flujo Alternativo
               Notificación duplicada
                  1. El usuario intenta crear una notificación para una actividad.
                  2. El sistema detecta que ya existe una notificación programada para la
                    misma actividad.
                  3. El sistema ya no muestra al lead que tiene creada una notificación al
                    momento de ir al formulario de creación de recordatorio o
                    seguimiento.
                 Encargado marca la actividad como completada
                  1. El encargado recibe el correo interno para revisar la actividad.
                  2. El encargado ingresa al enlace del CRM BioActiva.
                  3. El encargado selecciona Marcar como completado.
                  4. El sistema marca la actividad como completada.
                  5. El sistema cancela el correo al contacto.
                  6. El sistema registra el resultado en la sección Enviadas.
                 Encargado no marca la actividad como completada
                  1. El encargado recibe la notificación interna para revisar la actividad.
                  2. El encargado no marca la actividad como completada antes de la
                    hora programada para el correo al cliente.
                  3. El sistema mantiene activo el correo pendiente del seguimiento.


### Tablas de la página


#### Tabla 1

| 86. La tarjeta de actividad cambia el botón de Crear evento en<br>Microsoft Calendar por el texto: “Evento creado en el calendario”<br>87. La tarjeta de actividad permanecerá visible en la sección Calendario<br>hasta que pase la fecha fin de la actividad, una vez superada<br>desaparecerá de la sección Calendario.<br>88. El usuario puede visualizar el detalle de una notificación desde el<br>historial.<br>89. Si el usuario desea cambiar la fecha, hora, plantilla o configuración<br>de una notificación, deberá eliminar la notificación existente y<br>registrar una nueva. |
| --- |
| Flujo Alternativo |
| Notificación duplicada |
| 1. El usuario intenta crear una notificación para una actividad.<br>2. El sistema detecta que ya existe una notificación programada para la<br>misma actividad.<br>3. El sistema ya no muestra al lead que tiene creada una notificación al<br>momento de ir al formulario de creación de recordatorio o<br>seguimiento. |
| Encargado marca la actividad como completada |
| 1. El encargado recibe el correo interno para revisar la actividad.<br>2. El encargado ingresa al enlace del CRM BioActiva.<br>3. El encargado selecciona Marcar como completado.<br>4. El sistema marca la actividad como completada.<br>5. El sistema cancela el correo al contacto.<br>6. El sistema registra el resultado en la sección Enviadas. |
| Encargado no marca la actividad como completada |
| 1. El encargado recibe la notificación interna para revisar la actividad.<br>2. El encargado no marca la actividad como completada antes de la<br>hora programada para el correo al cliente.<br>3. El sistema mantiene activo el correo pendiente del seguimiento. |


---

## Página 82

                  4. Cuando llega la fecha y hora definida para cada correo, el sistema
                    ejecuta el envío correspondiente.
               Fecha de seguimiento no válida
                  1. El usuario define la fecha y hora de envío para el seguimiento.
                  2. El sistema valida que las fechas y horas configuradas cumplan las
                    siguientes condiciones.
                       a. Deben ser mayores a la fecha y hora actual.
                       b. Deben ser menores o iguales a la fecha fin de la actividad.
                  3. Si alguna fecha u hora no cumple con las condiciones establecidas,
                    el sistema identifica el error correspondiente.
                  4. Si la fecha u hora definida no es mayor a la fecha y hora actual, el
                    sistema muestra el mensaje: “La fecha y hora de envío debe ser
                    mayor a la fecha y hora actual.”
                  5. Si la fecha u hora definida supera la fecha fin de la actividad, el
                    sistema muestra el mensaje: “La fecha y hora de envío debe ser
                    menor o igual a la fecha fin de la actividad.”
                  6. El sistema no permite guardar el seguimiento hasta que las fechas y
                    horas sean corregidas.
                  7. El usuario corrige las fechas u horas correspondientes.
                  8. El flujo continúa con la confirmación de la programación del
                    seguimiento.
               Fecha del correo al cliente no válida
                  1. El usuario define una fecha y hora de envío al cliente igual o anterior
                    a la fecha y hora del correo interno al encargado.
                  2. El sistema muestra el mensaje: “El correo al cliente debe
                    programarse después del recordatorio interno.”
                  3. El sistema no permite guardar el seguimiento hasta corregir la fecha
                    y hora.
                  4. El usuario corrige la programación.
                  5. El flujo continúa con la confirmación.


### Tablas de la página


#### Tabla 1

| 4. Cuando llega la fecha y hora definida para cada correo, el sistema<br>ejecuta el envío correspondiente. |
| --- |
| Fecha de seguimiento no válida |
| 1. El usuario define la fecha y hora de envío para el seguimiento.<br>2. El sistema valida que las fechas y horas configuradas cumplan las<br>siguientes condiciones.<br>a. Deben ser mayores a la fecha y hora actual.<br>b. Deben ser menores o iguales a la fecha fin de la actividad.<br>3. Si alguna fecha u hora no cumple con las condiciones establecidas,<br>el sistema identifica el error correspondiente.<br>4. Si la fecha u hora definida no es mayor a la fecha y hora actual, el<br>sistema muestra el mensaje: “La fecha y hora de envío debe ser<br>mayor a la fecha y hora actual.”<br>5. Si la fecha u hora definida supera la fecha fin de la actividad, el<br>sistema muestra el mensaje: “La fecha y hora de envío debe ser<br>menor o igual a la fecha fin de la actividad.”<br>6. El sistema no permite guardar el seguimiento hasta que las fechas y<br>horas sean corregidas.<br>7. El usuario corrige las fechas u horas correspondientes.<br>8. El flujo continúa con la confirmación de la programación del<br>seguimiento. |
| Fecha del correo al cliente no válida |
| 1. El usuario define una fecha y hora de envío al cliente igual o anterior<br>a la fecha y hora del correo interno al encargado.<br>2. El sistema muestra el mensaje: “El correo al cliente debe<br>programarse después del recordatorio interno.”<br>3. El sistema no permite guardar el seguimiento hasta corregir la fecha<br>y hora.<br>4. El usuario corrige la programación.<br>5. El flujo continúa con la confirmación. |


---

## Página 83

               Actividad con evento de Microsoft Calendar ya asociado
                  1. En el paso donde el usuario selecciona la opción Crear evento en
                    Microsoft Calendar, el sistema valida si la actividad ya cuenta con
                    un identificador de evento de Microsoft Calendar asociado.
                  2. Si la actividad ya tiene un evento asociado, el sistema no crea un
                    nuevo evento.
                  3. El sistema muestra el mensaje: “La reunión ya fue creada
                    previamente en Microsoft Calendar.”
                  4. El sistema mantiene la actividad vinculada al evento existente.
                  5. El usuario puede retornar a la sección Calendario o visualizar el
                    detalle de la actividad asociada.
               Cuenta Microsoft con dominio no válido
                  1. El usuario accede a su Perfil desde el CRM BioActiva.
                  2. El sistema muestra la tarjeta Integraciones dentro del perfil del
                    usuario.
                  3. El sistema muestra las integraciones disponibles para Microsoft
                    Teams y Microsoft Outlook.
                  4. El sistema muestra el estado de las integraciones como No
                    conectado cuando el usuario aún no ha vinculado una cuenta
                    Microsoft válida.
                  5. El usuario selecciona el botón Conectar con Microsoft.
                  6. El sistema redirige al usuario al flujo de autenticación de Microsoft.
                  7. El usuario ingresa sus credenciales o selecciona una cuenta
                    Microsoft.
                  8. El sistema recibe la cuenta Microsoft autenticada y valida el correo
                    asociado.
                  9. Si el correo de Microsoft no pertenece al dominio institucional
                    permitido de BioActiva, el sistema rechaza la integración.
                  10. El sistema no registra la cuenta Microsoft como integrada.
                  11. El sistema mantiene las integraciones de Microsoft Teams y
                    Microsoft Outlook en estado No conectado.


### Tablas de la página


#### Tabla 1

| Actividad con evento de Microsoft Calendar ya asociado |
| --- |
| 1. En el paso donde el usuario selecciona la opción Crear evento en<br>Microsoft Calendar, el sistema valida si la actividad ya cuenta con<br>un identificador de evento de Microsoft Calendar asociado.<br>2. Si la actividad ya tiene un evento asociado, el sistema no crea un<br>nuevo evento.<br>3. El sistema muestra el mensaje: “La reunión ya fue creada<br>previamente en Microsoft Calendar.”<br>4. El sistema mantiene la actividad vinculada al evento existente.<br>5. El usuario puede retornar a la sección Calendario o visualizar el<br>detalle de la actividad asociada. |
| Cuenta Microsoft con dominio no válido |
| 1. El usuario accede a su Perfil desde el CRM BioActiva.<br>2. El sistema muestra la tarjeta Integraciones dentro del perfil del<br>usuario.<br>3. El sistema muestra las integraciones disponibles para Microsoft<br>Teams y Microsoft Outlook.<br>4. El sistema muestra el estado de las integraciones como No<br>conectado cuando el usuario aún no ha vinculado una cuenta<br>Microsoft válida.<br>5. El usuario selecciona el botón Conectar con Microsoft.<br>6. El sistema redirige al usuario al flujo de autenticación de Microsoft.<br>7. El usuario ingresa sus credenciales o selecciona una cuenta<br>Microsoft.<br>8. El sistema recibe la cuenta Microsoft autenticada y valida el correo<br>asociado.<br>9. Si el correo de Microsoft no pertenece al dominio institucional<br>permitido de BioActiva, el sistema rechaza la integración.<br>10. El sistema no registra la cuenta Microsoft como integrada.<br>11. El sistema mantiene las integraciones de Microsoft Teams y<br>Microsoft Outlook en estado No conectado. |


---

## Página 84

                  12. El sistema no habilita el uso de la sección Calendario en el módulo
                    de Notificaciones.
                  13. El sistema muestra el mensaje: “El correo registrado no es válido.
                    Debe integrar una cuenta Microsoft perteneciente al dominio
                    institucional de BioActiva.”
                  14. El usuario puede intentar nuevamente la integración utilizando una
                    cuenta Microsoft válida desde la pestaña Perfil.
               Sin conexión con microsoft
                  1. El usuario ingresa a la sección Calendario.
                  2. El sistema detecta que el usuario no ha iniciado sesión con su
                    cuenta de Microsoft.
                  3. El sistema bloquea los botones Crear evento en Microsoft
                    Calendar.
                  4. El sistema muestra el mensaje “Conexión con Microsoft no activa,
                    inicie sesión desde su perfil”.
                  5. El usuario puede dirigirse a su perfil para conectarse a Microsoft.
                 Postcondiciones
                  1. La notificación queda registrada correctamente en el sistema cuando
                    corresponde a una programación activa.
                  2. Las notificaciones internas quedan asociadas al encargado de la
                    actividad o del lead.
                  3. Las notificaciones vinculadas a actividades quedan asociadas al
                    lead correspondiente.
                  4. Los recordatorios quedan programados según la fecha y hora
                    definidas por el usuario o, en su defecto, dentro del horario laboral
                    establecido.
                  5. Los correos de seguimiento quedan programados con base en las
                    plantillas seleccionadas y personalizadas para ese caso específico.
                  6. La plantilla original no se modifica cuando el usuario personaliza el
                    correo de una notificación o seguimiento.
                  7. Las notificaciones programadas quedan visibles en la sección
                    Programadas.


### Tablas de la página


#### Tabla 1

| 12. El sistema no habilita el uso de la sección Calendario en el módulo<br>de Notificaciones.<br>13. El sistema muestra el mensaje: “El correo registrado no es válido.<br>Debe integrar una cuenta Microsoft perteneciente al dominio<br>institucional de BioActiva.”<br>14. El usuario puede intentar nuevamente la integración utilizando una<br>cuenta Microsoft válida desde la pestaña Perfil. |
| --- |
| Sin conexión con microsoft |
| 1. El usuario ingresa a la sección Calendario.<br>2. El sistema detecta que el usuario no ha iniciado sesión con su<br>cuenta de Microsoft.<br>3. El sistema bloquea los botones Crear evento en Microsoft<br>Calendar.<br>4. El sistema muestra el mensaje “Conexión con Microsoft no activa,<br>inicie sesión desde su perfil”.<br>5. El usuario puede dirigirse a su perfil para conectarse a Microsoft. |
| Postcondiciones |
| 1. La notificación queda registrada correctamente en el sistema cuando<br>corresponde a una programación activa.<br>2. Las notificaciones internas quedan asociadas al encargado de la<br>actividad o del lead.<br>3. Las notificaciones vinculadas a actividades quedan asociadas al<br>lead correspondiente.<br>4. Los recordatorios quedan programados según la fecha y hora<br>definidas por el usuario o, en su defecto, dentro del horario laboral<br>establecido.<br>5. Los correos de seguimiento quedan programados con base en las<br>plantillas seleccionadas y personalizadas para ese caso específico.<br>6. La plantilla original no se modifica cuando el usuario personaliza el<br>correo de una notificación o seguimiento.<br>7. Las notificaciones programadas quedan visibles en la sección<br>Programadas. |


---

## Página 85

                  8. Las notificaciones ejecutadas quedan visibles en la sección
                    Enviadas .
                  9. Si una notificación programada es cancelada, el sistema la elimina
                    de la programación, no la envía, no la ejecuta y no la muestra en el
                    historial.
                  10. El historial de notificaciones queda disponible en la pestaña
                    Notificaciones, organizado únicamente en Programadas y
                    Enviadas.
                 Restricciones
               Diagrama de caso de uso
               Prototipo


### Tablas de la página


#### Tabla 1

| 8. Las notificaciones ejecutadas quedan visibles en la sección<br>Enviadas .<br>9. Si una notificación programada es cancelada, el sistema la elimina<br>de la programación, no la envía, no la ejecuta y no la muestra en el<br>historial.<br>10. El historial de notificaciones queda disponible en la pestaña<br>Notificaciones, organizado únicamente en Programadas y<br>Enviadas. |
| --- |
| Restricciones |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 86


---

## Página 87

                 CU008: Visualización de Dashboards
                            El sistema debe permitir a los usuarios visualizar
                            dashboards comerciales dentro del CRM BioActiva, con
                            métricas orientadas al seguimiento del desempeño del
                            pipeline, conversión de oportunidades, tiempos de
                            cierre, avance comercial y resultados económicos.
               Descripción
                            El dashboard permitirá consultar indicadores según un
                            periodo de análisis definido por el usuario y filtrar la
                            información por tipo de servicio, diferenciando entre
                            servicios de consultoría y formulación de proyecto.


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir a los usuarios visualizar<br>dashboards comerciales dentro del CRM BioActiva, con<br>métricas orientadas al seguimiento del desempeño del<br>pipeline, conversión de oportunidades, tiempos de<br>cierre, avance comercial y resultados económicos.<br>El dashboard permitirá consultar indicadores según un<br>periodo de análisis definido por el usuario y filtrar la<br>información por tipo de servicio, diferenciando entre<br>servicios de consultoría y formulación de proyecto. |
| --- | --- |


---

## Página 88

                  Actores   Administrador, Trabajador.
               Precondiciones
                  1. El usuario debe haber iniciado sesión en el sistema.
                  2. Deben existir leads, actividades o cotizaciones registradas para
                    calcular las métricas.
                  3. El usuario debe contar con permisos para visualizar dashboards.
                  4. El sistema debe estar operativo
               Flujo básico
                  1. El usuario accede a la opción Dashboard desde el menú principal
                    del CRM BioActiva.
                  2. El sistema muestra la vista general del dashboard comercial según
                    el formato mostrado en el prototipo.
                  3. El sistema presenta las métricas disponibles:
                    a. N.º de leads generados.
                    b. % propuesta → cierre con venta.
                    c. Tiempo promedio de cierre en días, calculado desde el primer
                    contacto hasta el cierre.
                    d. Tiempo en etapa propuesta, calculado como los días que el lead
                    permanece entre reunión y propuesta.
                    e. N.º promedio de acciones de seguimiento por lead.
                    f. Monto total en pipeline, considerando cotizaciones con estado
                    pendiente o marcar como enviada. Se muestra un monto total
                    contabilizando las cotizaciones en soles y otro monto total
                    contabilizando las cotizaciones en dólares


### Tablas de la página


#### Tabla 1

| Actores | Administrador, Trabajador. |
| --- | --- |
| Precondiciones |  |
| 1. El usuario debe haber iniciado sesión en el sistema.<br>2. Deben existir leads, actividades o cotizaciones registradas para<br>calcular las métricas.<br>3. El usuario debe contar con permisos para visualizar dashboards.<br>4. El sistema debe estar operativo |  |
| Flujo básico |  |
| 1. El usuario accede a la opción Dashboard desde el menú principal<br>del CRM BioActiva.<br>2. El sistema muestra la vista general del dashboard comercial según<br>el formato mostrado en el prototipo.<br>3. El sistema presenta las métricas disponibles:<br>a. N.º de leads generados.<br>b. % propuesta → cierre con venta.<br>c. Tiempo promedio de cierre en días, calculado desde el primer<br>contacto hasta el cierre.<br>d. Tiempo en etapa propuesta, calculado como los días que el lead<br>permanece entre reunión y propuesta.<br>e. N.º promedio de acciones de seguimiento por lead.<br>f. Monto total en pipeline, considerando cotizaciones con estado<br>pendiente o marcar como enviada. Se muestra un monto total<br>contabilizando las cotizaciones en soles y otro monto total<br>contabilizando las cotizaciones en dólares |  |


---

## Página 89

                    g. Ingresos cerrados, considerando la suma de cotizaciones de
                    servicios vendidos. Se muestra el total de cotizaciones cerradas en
                    soles y el total de cotizaciones cerradas en dolares
                    h. % de leads con más de 30 días sin avance.
                    i. Ticket promedio de los leads que están en cierre con venta. Se
                    muestra el ticket promedio de las cotizaciones en soles y el ticket
                    promedio de las cotizaciones en dólares.
                    j. Pipeline por etapa: Cantidad de leads por estado comercial.
                    k. Estado de cotizaciones: Distribución de propuestas del periodo.
                  4. El usuario define el periodo de análisis, ingresando fecha de inicio y
                    fecha de fin.
                  5. El usuario aplica los filtros seleccionados.
                  6. El sistema valida que el rango de fechas sea correcto.
                  7. El sistema consulta la información de leads, actividades y
                    cotizaciones correspondiente a los filtros aplicados.
                  8. El sistema recalcula las métricas del dashboard.
                  9. El sistema muestra los resultados actualizados en pantalla.
                  10. El usuario puede modificar los filtros y volver a actualizar la
                    visualización.
               Flujo Alternativo
               Fecha de análisis inválida
                  1. En el paso 7, el sistema impide seleccionar fechas anteriores a la
                    fecha de inicio definida.
               Sin datos para el periodo seleccionado


### Tablas de la página


#### Tabla 1

| g. Ingresos cerrados, considerando la suma de cotizaciones de<br>servicios vendidos. Se muestra el total de cotizaciones cerradas en<br>soles y el total de cotizaciones cerradas en dolares<br>h. % de leads con más de 30 días sin avance.<br>i. Ticket promedio de los leads que están en cierre con venta. Se<br>muestra el ticket promedio de las cotizaciones en soles y el ticket<br>promedio de las cotizaciones en dólares.<br>j. Pipeline por etapa: Cantidad de leads por estado comercial.<br>k. Estado de cotizaciones: Distribución de propuestas del periodo.<br>4. El usuario define el periodo de análisis, ingresando fecha de inicio y<br>fecha de fin.<br>5. El usuario aplica los filtros seleccionados.<br>6. El sistema valida que el rango de fechas sea correcto.<br>7. El sistema consulta la información de leads, actividades y<br>cotizaciones correspondiente a los filtros aplicados.<br>8. El sistema recalcula las métricas del dashboard.<br>9. El sistema muestra los resultados actualizados en pantalla.<br>10. El usuario puede modificar los filtros y volver a actualizar la<br>visualización. |
| --- |
| Flujo Alternativo |
| Fecha de análisis inválida |
| 1. En el paso 7, el sistema impide seleccionar fechas anteriores a la<br>fecha de inicio definida. |
| Sin datos para el periodo seleccionado |


---

## Página 90

                  1. En el paso 8, el sistema no encuentra información para el periodo y
                    filtros seleccionados.
                  2. El sistema muestra las métricas en cero y un mensaje indicando:
                    “No hay data para este periodo seleccionado.”
                  3. El usuario puede modificar el periodo o el tipo de servicio.
                  4. El flujo continúa con la aplicación de nuevos filtros.
                 Postcondiciones
                  1. El usuario visualiza las métricas comerciales del dashboard.
                  2. Las métricas se muestran según el periodo de análisis definido.
                  3. Las métricas se actualizan según el filtro de tipo de servicio
                    aplicado.
                  4. El dashboard no modifica registros del sistema.
                  5. La información visualizada sirve como apoyo para el análisis y
                    toma de decisiones comerciales.
                 Restricciones
                  ● El dashboard es solo de consulta y visualización.
               Diagrama de caso de uso
               Prototipo


### Tablas de la página


#### Tabla 1

| 1. En el paso 8, el sistema no encuentra información para el periodo y<br>filtros seleccionados.<br>2. El sistema muestra las métricas en cero y un mensaje indicando:<br>“No hay data para este periodo seleccionado.”<br>3. El usuario puede modificar el periodo o el tipo de servicio.<br>4. El flujo continúa con la aplicación de nuevos filtros. |
| --- |
| Postcondiciones |
| 1. El usuario visualiza las métricas comerciales del dashboard.<br>2. Las métricas se muestran según el periodo de análisis definido.<br>3. Las métricas se actualizan según el filtro de tipo de servicio<br>aplicado.<br>4. El dashboard no modifica registros del sistema.<br>5. La información visualizada sirve como apoyo para el análisis y<br>toma de decisiones comerciales. |
| Restricciones |
| ● El dashboard es solo de consulta y visualización. |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 91

                 CU009: Importación de datos
                              El sistema debe permitir importar información al CRM
                              BioActiva de forma masiva mediante la carga de un
                              archivo, evitando el registro manual de datos uno por
                 Descripción  uno.
                              La importación permite registrar organizaciones,
                              contactos, leads y cotizaciones en una misma
                              operación, a través de hojas independientes dentro


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir importar información al CRM<br>BioActiva de forma masiva mediante la carga de un<br>archivo, evitando el registro manual de datos uno por<br>uno.<br>La importación permite registrar organizaciones,<br>contactos, leads y cotizaciones en una misma<br>operación, a través de hojas independientes dentro |
| --- | --- |


---

## Página 92

                              del archivo Excel.
                              El sistema debe mostrar 3 etapas:
                                 ● Importar: Permite la subida del archivo excel
                                   y muestra una plantilla de la estructura que
                                   debe tener el archivo excel a subir.
                                 ● Verificación: Notifica los errores en el archivo
                                   subido como campos obligatorios faltantes o
                                   que los valores en algún registro no tengan un
                                   formato válido, estos errores se llaman
                                   errores bloqueantes y no permiten continuar
                                   con la importación. También muestran
                                   advertencias que informan problemas
                                   menores, por lo que no impiden la
                                   importación.
                                 ● Importación y validación: Valida y procesa el
                                   archivo para registrar la información. El
                                   sistema debe informar inmediatamente que la
                                   importación se encuentra en proceso y
                                   comunicar el resultado final.
               Actores        Administrador, Trabajador
               Precondiciones
                  1. El usuario debe haber iniciado sesión en el sistema.
                  2. El usuario debe contar con permisos para importar datos.
                  3. El sistema debe estar operativo.
                  4. El archivo debe contener una estructura compatible con la plantilla.
               Flujo Básico
                  1. El usuario accede a la opción Importar / Exportar desde el menú
                    principal del CRM BioActiva.
                  2. El sistema muestra las opciones Importar y Exportar.
                  3. El usuario selecciona la opción Importar.


### Tablas de la página


#### Tabla 1

|  | del archivo Excel.<br>El sistema debe mostrar 3 etapas:<br>● Importar: Permite la subida del archivo excel<br>y muestra una plantilla de la estructura que<br>debe tener el archivo excel a subir.<br>● Verificación: Notifica los errores en el archivo<br>subido como campos obligatorios faltantes o<br>que los valores en algún registro no tengan un<br>formato válido, estos errores se llaman<br>errores bloqueantes y no permiten continuar<br>con la importación. También muestran<br>advertencias que informan problemas<br>menores, por lo que no impiden la<br>importación.<br>● Importación y validación: Valida y procesa el<br>archivo para registrar la información. El<br>sistema debe informar inmediatamente que la<br>importación se encuentra en proceso y<br>comunicar el resultado final. |
| --- | --- |
| Actores | Administrador, Trabajador |
| Precondiciones |  |
| 1. El usuario debe haber iniciado sesión en el sistema.<br>2. El usuario debe contar con permisos para importar datos.<br>3. El sistema debe estar operativo.<br>4. El archivo debe contener una estructura compatible con la plantilla. |  |
| Flujo Básico |  |
| 1. El usuario accede a la opción Importar / Exportar desde el menú<br>principal del CRM BioActiva.<br>2. El sistema muestra las opciones Importar y Exportar.<br>3. El usuario selecciona la opción Importar. |  |


---

## Página 93

                  4. El sistema muestra la opción de descargar la plantilla.
                  5. El sistema permite subir un archivo mediante el botón Seleccionar
                    archivo o arrastrando un archivo hacía la sección enmarcada
                    mediante un rectángulo según el formato mostrado en el prototipo.
                  6. El sistema muestra el nombre del archivo cargado y su peso.
                  7. El sistema permite seleccionar el botón Validar archivo
                  8. El usuario selecciona el botón Validar archivo.
                  9. El sistema omite las filas que se encuentren completamente vacías.
                  10. El sistema verifica las columnas obligatorias, los tipos de datos, las
                    relaciones entre entidades y las reglas específicas de cada hoja.
                  11. El sistema verifica que los contactos tengan una organización
                    válida.
                  12. El sistema verifica que los leads tengan una organización válida.
                  13. El sistema verifica que las cotizaciones estén vinculadas a un Lead
                    válido dentro de la hoja Leads.
                  14. El sistema muestra el resultado de la verificación, mostrando errores
                    y advertencias según el formato mostrado en el prototipo.
                  15. En caso de reportar errores el usuario puede corregirlos y volver a
                    subir el archivo
                  16. En caso de no haber errores y solo advertencias el usuario puede
                    seleccionar el botón Importar ahora.
                  17. El usuario selecciona el botón Validar archivo.
                  18. El sistema muestra el proceso de importación según el formato
                    mostrado en el prototipo.
                  19. El sistema muestra el resultado de la importación según el formato
                    mostrado en el prototipo.
                  20. El sistema muestra un recuento del total de organizaciones,
                    contactos, leads y cotizaciones importados según el formato
                    mostrado en el prototipo.
                  21. El sistema muestra aquellos registros, indicando su hoja y número
                    de fila, dentro del excel subido que no fueron importados porque
                    conflictuaron con la información actual del CRM BioActiva según el
                    formato mostrado en el prototipo.
               Flujo Alternativo


### Tablas de la página


#### Tabla 1

| 4. El sistema muestra la opción de descargar la plantilla.<br>5. El sistema permite subir un archivo mediante el botón Seleccionar<br>archivo o arrastrando un archivo hacía la sección enmarcada<br>mediante un rectángulo según el formato mostrado en el prototipo.<br>6. El sistema muestra el nombre del archivo cargado y su peso.<br>7. El sistema permite seleccionar el botón Validar archivo<br>8. El usuario selecciona el botón Validar archivo.<br>9. El sistema omite las filas que se encuentren completamente vacías.<br>10. El sistema verifica las columnas obligatorias, los tipos de datos, las<br>relaciones entre entidades y las reglas específicas de cada hoja.<br>11. El sistema verifica que los contactos tengan una organización<br>válida.<br>12. El sistema verifica que los leads tengan una organización válida.<br>13. El sistema verifica que las cotizaciones estén vinculadas a un Lead<br>válido dentro de la hoja Leads.<br>14. El sistema muestra el resultado de la verificación, mostrando errores<br>y advertencias según el formato mostrado en el prototipo.<br>15. En caso de reportar errores el usuario puede corregirlos y volver a<br>subir el archivo<br>16. En caso de no haber errores y solo advertencias el usuario puede<br>seleccionar el botón Importar ahora.<br>17. El usuario selecciona el botón Validar archivo.<br>18. El sistema muestra el proceso de importación según el formato<br>mostrado en el prototipo.<br>19. El sistema muestra el resultado de la importación según el formato<br>mostrado en el prototipo.<br>20. El sistema muestra un recuento del total de organizaciones,<br>contactos, leads y cotizaciones importados según el formato<br>mostrado en el prototipo.<br>21. El sistema muestra aquellos registros, indicando su hoja y número<br>de fila, dentro del excel subido que no fueron importados porque<br>conflictuaron con la información actual del CRM BioActiva según el<br>formato mostrado en el prototipo. |
| --- |
| Flujo Alternativo |


---

## Página 94

               Formato de archivo no permitido
                  1. El sistema detecta que el archivo no tiene formato .xlsx
                  2. El sistema muestra el mensaje: “Solo se aceptan archivos .xlsx
                    (usa la plantilla oficial)”
                  3. El sistema no permite continuar con la importación.
                  4. El usuario debe seleccionar un archivo válido.
               Archivo vacío
                  1. El sistema detecta que el archivo no contiene registros.
                  2. El sistema muestra el mensaje: “El archivo no contiene registros
                    para importar. Revisa que las hojas tengan datos
                  3. El sistema cancela la carga.
                  4. El usuario puede seleccionar otro archivo.
               Registros con valores obligatorios incompletos o formato inválido
                  1. El sistema detecta registros con campos obligatorios incompletos.
                  2. El sistema muestra dichos registros en la sección de conflictos.
                  3. El sistema no importa los registros inválidos.
                  4. El usuario puede corregir el archivo o continuar solo con los
                    registros válidos, si el sistema lo permite.
               Registros duplicados
                  1. En la etapa de importación y validación el sistema detecta registros
                    duplicados dentro del archivo o ya existentes en la base de datos.
                  2. En caso de ser duplicados en el mismo archivo, el sistema importará
                    el primero y mostrará la ubicación de esos registros dentro del
                    archivo excel.
                  3. En caso de ser duplicados porque ya existen en el CRM BioActiva,
                    el sistema no importará los registros y mostrará la ubicación de esos
                    registros dentro del archivo excel.
               Relaciones inexistentes


### Tablas de la página


#### Tabla 1

| Formato de archivo no permitido |
| --- |
| 1. El sistema detecta que el archivo no tiene formato .xlsx<br>2. El sistema muestra el mensaje: “Solo se aceptan archivos .xlsx<br>(usa la plantilla oficial)”<br>3. El sistema no permite continuar con la importación.<br>4. El usuario debe seleccionar un archivo válido. |
| Archivo vacío |
| 1. El sistema detecta que el archivo no contiene registros.<br>2. El sistema muestra el mensaje: “El archivo no contiene registros<br>para importar. Revisa que las hojas tengan datos<br>3. El sistema cancela la carga.<br>4. El usuario puede seleccionar otro archivo. |
| Registros con valores obligatorios incompletos o formato inválido |
| 1. El sistema detecta registros con campos obligatorios incompletos.<br>2. El sistema muestra dichos registros en la sección de conflictos.<br>3. El sistema no importa los registros inválidos.<br>4. El usuario puede corregir el archivo o continuar solo con los<br>registros válidos, si el sistema lo permite. |
| Registros duplicados |
| 1. En la etapa de importación y validación el sistema detecta registros<br>duplicados dentro del archivo o ya existentes en la base de datos.<br>2. En caso de ser duplicados en el mismo archivo, el sistema importará<br>el primero y mostrará la ubicación de esos registros dentro del<br>archivo excel.<br>3. En caso de ser duplicados porque ya existen en el CRM BioActiva,<br>el sistema no importará los registros y mostrará la ubicación de esos<br>registros dentro del archivo excel. |
| Relaciones inexistentes |


---

## Página 95

                  1. El sistema detecta registros que dependen de información
                    inexistente, por ejemplo, un contacto sin organización asociada o un
                    lead sin organización válida.
                  2. El sistema muestra el conflicto indicando la relación faltante.
                  3. El sistema no importa dichos registros hasta que la relación sea
                    corregida.
                  4. El usuario puede corregir el archivo y volver a cargarlo.
               Cancelación de importación
                  1. En la etapa de verificación, el usuario selecciona el botón Volver.
                  2. El sistema descarta la carga temporal del archivo.
                  3. No se guarda información en la base de datos.
                  4. El usuario retorna a la vista inicial de importación.
                 Postcondiciones
                  1. Los registros válidos del archivo quedan importados correctamente
                    en el CRM BioActiva.
                  2. Los datos importados quedan disponibles en los módulos
                    correspondientes: organizaciones, contactos, leads, actividades o
                    cotizaciones.
                  3. Los registros inválidos o conflictivos no se importan.
                  4. El sistema registra el resultado de la importación.
                  5. El usuario puede revisar cuántos registros fueron procesados,
                    importados y rechazados.
                  6. La importación queda asociada al usuario que la ejecutó.
                 Restricciones
                  ● El usuario debe contar con un archivo Excel en formato permitido:
                    .xlsx.
               Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 1. El sistema detecta registros que dependen de información<br>inexistente, por ejemplo, un contacto sin organización asociada o un<br>lead sin organización válida.<br>2. El sistema muestra el conflicto indicando la relación faltante.<br>3. El sistema no importa dichos registros hasta que la relación sea<br>corregida.<br>4. El usuario puede corregir el archivo y volver a cargarlo. |
| --- |
| Cancelación de importación |
| 1. En la etapa de verificación, el usuario selecciona el botón Volver.<br>2. El sistema descarta la carga temporal del archivo.<br>3. No se guarda información en la base de datos.<br>4. El usuario retorna a la vista inicial de importación. |
| Postcondiciones |
| 1. Los registros válidos del archivo quedan importados correctamente<br>en el CRM BioActiva.<br>2. Los datos importados quedan disponibles en los módulos<br>correspondientes: organizaciones, contactos, leads, actividades o<br>cotizaciones.<br>3. Los registros inválidos o conflictivos no se importan.<br>4. El sistema registra el resultado de la importación.<br>5. El usuario puede revisar cuántos registros fueron procesados,<br>importados y rechazados.<br>6. La importación queda asociada al usuario que la ejecutó. |
| Restricciones |
| ● El usuario debe contar con un archivo Excel en formato permitido:<br>.xlsx. |


---

## Página 96

               Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 97


---

## Página 98

                 CU010: Exportación de datos
                              El sistema debe permitir exportar información del
                              CRM BioActiva en formato .xlsx.
                              La   exportación puede realizarse sobre
                              organizaciones, contactos, leads o cotizaciones,
                              generando un archivo descargable con la información
               Descripción
                              registrada en el módulo seleccionado.
                              La exportación no modifica la información almacenada
                              en el sistema; únicamente genera un archivo para
                              consulta, análisis, seguimiento comercial o respaldo
                              operativo.
               Actores        Administrador, Trabajador
               Precondiciones
                  1. El sistema debe estar operativo.
                  2. Deben existir datos registrados en el módulo que se desea exportar.
               Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir exportar información del<br>CRM BioActiva en formato .xlsx.<br>La exportación puede realizarse sobre<br>organizaciones, contactos, leads o cotizaciones,<br>generando un archivo descargable con la información<br>registrada en el módulo seleccionado.<br>La exportación no modifica la información almacenada<br>en el sistema; únicamente genera un archivo para<br>consulta, análisis, seguimiento comercial o respaldo<br>operativo. |
| --- | --- |
| Actores | Administrador, Trabajador |
| Precondiciones |  |
| 1. El sistema debe estar operativo.<br>2. Deben existir datos registrados en el módulo que se desea exportar. |  |
| Flujo Básico |  |


---

## Página 99

                  1. El usuario accede a la opción Importar / Exportar desde el menú
                    principal del CRM BioActiva.
                  2. El sistema muestra la pantalla de Importar y Exportar según lo
                    mostrado en el prototipo.
                  3. El usuario selecciona la opción Exportar.
                  4. El sistema muestra las opciones de exportación disponibles.
                  5. El usuario selecciona el tipo de información que desea exportar
                    como se ve en el prototipo:
                    a. Organizaciones.
                    b. Contactos.
                    c. Leads.
                    d. Cotizaciones.
                  6. El sistema obtiene la información correspondiente al módulo
                    seleccionado.
                  7. El sistema genera el archivo de exportación en formato .xlsx.
                  8. El usuario puede descargar el archivo de exportación mediante el
                    botón Exportar Excel (.xlsx.
                  9. La exportación finaliza se ejecuta sin modificar los datos
                    almacenados en el CRM BioActiva.
               Flujo Alternativo
               Sin datos para exportar
                  1. En el paso 6, el sistema no encuentra registros disponibles para
                    exportar.
                  2. El sistema muestra el mensaje: "Ocurrió un error inesperado"
                  3. El sistema no genera el archivo .xlsx.
                  4. El usuario puede seleccionar otro tipo de información o finalizar la
                    operación.
                 Postcondiciones


### Tablas de la página


#### Tabla 1

| 1. El usuario accede a la opción Importar / Exportar desde el menú<br>principal del CRM BioActiva.<br>2. El sistema muestra la pantalla de Importar y Exportar según lo<br>mostrado en el prototipo.<br>3. El usuario selecciona la opción Exportar.<br>4. El sistema muestra las opciones de exportación disponibles.<br>5. El usuario selecciona el tipo de información que desea exportar<br>como se ve en el prototipo:<br>a. Organizaciones.<br>b. Contactos.<br>c. Leads.<br>d. Cotizaciones.<br>6. El sistema obtiene la información correspondiente al módulo<br>seleccionado.<br>7. El sistema genera el archivo de exportación en formato .xlsx.<br>8. El usuario puede descargar el archivo de exportación mediante el<br>botón Exportar Excel (.xlsx.<br>9. La exportación finaliza se ejecuta sin modificar los datos<br>almacenados en el CRM BioActiva. |
| --- |
| Flujo Alternativo |
| Sin datos para exportar |
| 1. En el paso 6, el sistema no encuentra registros disponibles para<br>exportar.<br>2. El sistema muestra el mensaje: "Ocurrió un error inesperado"<br>3. El sistema no genera el archivo .xlsx.<br>4. El usuario puede seleccionar otro tipo de información o finalizar la<br>operación. |
| Postcondiciones |


---

## Página 100

                  1. El sistema genera un archivo .xlsx con la información
                    correspondiente al módulo seleccionado.
                  2. El usuario puede descargar el archivo exportado.
                  3. La información exportada corresponde a organizaciones, contactos,
                    leads o cotizaciones según la opción elegida.
                  4. La exportación no modifica, elimina ni actualiza información del CRM
                    BioActiva.
                  5. La operación queda registrada para fines de auditoría y trazabilidad.
                  6. La funcionalidad permanece disponible para usuarios autorizados.
                 Restricciones
                  ● Solo usuarios autorizados pueden realizar exportaciones de
                    información.
                  ● El archivo exportado debe generarse exclusivamente en formato
                    .xlsx.
                  ● La exportación únicamente considera información registrada en el
                    módulo seleccionado.
                  ● El archivo generado debe conservar una estructura tabular con
                    encabezados de columna y registros organizados por filas.
                  ● La exportación no debe modificar la información almacenada en el
                    CRM BioActiva.
               Diagrama de caso de uso
               Prototipo


### Tablas de la página


#### Tabla 1

| 1. El sistema genera un archivo .xlsx con la información<br>correspondiente al módulo seleccionado.<br>2. El usuario puede descargar el archivo exportado.<br>3. La información exportada corresponde a organizaciones, contactos,<br>leads o cotizaciones según la opción elegida.<br>4. La exportación no modifica, elimina ni actualiza información del CRM<br>BioActiva.<br>5. La operación queda registrada para fines de auditoría y trazabilidad.<br>6. La funcionalidad permanece disponible para usuarios autorizados. |
| --- |
| Restricciones |
| ● Solo usuarios autorizados pueden realizar exportaciones de<br>información.<br>● El archivo exportado debe generarse exclusivamente en formato<br>.xlsx.<br>● La exportación únicamente considera información registrada en el<br>módulo seleccionado.<br>● El archivo generado debe conservar una estructura tabular con<br>encabezados de columna y registros organizados por filas.<br>● La exportación no debe modificar la información almacenada en el<br>CRM BioActiva. |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 101

                 CU011: Gestión de Plantillas de Correo
                              El sistema debe permitir registrar, consultar,
                Descripción   actualizar y eliminar o desactivar plantillas de correo
                              dentro del CRM BioActiva.


### Tablas de la página


#### Tabla 1

| Descripción | El sistema debe permitir registrar, consultar,<br>actualizar y eliminar o desactivar plantillas de correo<br>dentro del CRM BioActiva. |
| --- | --- |


---

## Página 102

                              Las plantillas serán utilizadas como base para los
                              correos de seguimiento asociados a notificaciones,
                              ya sea dirigidos al encargado de una actividad o al
                              cliente/contacto externo. Cada plantilla deberá
                              contener, como mínimo, un nombre, asunto y cuerpo
                              del mensaje.
                              El usuario podrá editar una plantilla existente siempre
                              que cuente con permisos. Las plantillas activas
                              estarán disponibles para ser seleccionadas durante
                              la programación de notificaciones. Las plantillas
                              inactivas o eliminadas no podrán ser utilizadas en
                              nuevas notificaciones.
                Actores       Administrador, Trabajador
                Precondiciones
                  1. El usuario debe haber iniciado sesión en el sistema.
                  2. El usuario debe contar con permisos para gestionar plantillas.
                  3. El sistema debe estar operativo.
                  4. Para editar o eliminar una plantilla, esta debe existir previamente.
                Flujo Básico
                  1. El usuario accede a la opción Plantillas desde el menú principal del
                     CRM BioActiva.
                  2. El sistema muestra la tabla de plantillas registradas con el formato
                     mostrado en el prototipo.
                  3. El usuario puede seleccionar una de las siguientes acciones:
                       a. Crear nueva plantilla.
                       b. Visualizar detalles de una plantilla.
                       c. Editar plantilla existente.
                       d. Eliminar plantilla.
                  4. Si el usuario selecciona el botón Nueva plantilla, el sistema
                     muestra el formulario de registro según lo mostrado en el prototipo.


### Tablas de la página


#### Tabla 1

|  | Las plantillas serán utilizadas como base para los<br>correos de seguimiento asociados a notificaciones,<br>ya sea dirigidos al encargado de una actividad o al<br>cliente/contacto externo. Cada plantilla deberá<br>contener, como mínimo, un nombre, asunto y cuerpo<br>del mensaje.<br>El usuario podrá editar una plantilla existente siempre<br>que cuente con permisos. Las plantillas activas<br>estarán disponibles para ser seleccionadas durante<br>la programación de notificaciones. Las plantillas<br>inactivas o eliminadas no podrán ser utilizadas en<br>nuevas notificaciones. |
| --- | --- |
| Actores | Administrador, Trabajador |
| Precondiciones |  |
| 1. El usuario debe haber iniciado sesión en el sistema.<br>2. El usuario debe contar con permisos para gestionar plantillas.<br>3. El sistema debe estar operativo.<br>4. Para editar o eliminar una plantilla, esta debe existir previamente. |  |
| Flujo Básico |  |
| 1. El usuario accede a la opción Plantillas desde el menú principal del<br>CRM BioActiva.<br>2. El sistema muestra la tabla de plantillas registradas con el formato<br>mostrado en el prototipo.<br>3. El usuario puede seleccionar una de las siguientes acciones:<br>a. Crear nueva plantilla.<br>b. Visualizar detalles de una plantilla.<br>c. Editar plantilla existente.<br>d. Eliminar plantilla.<br>4. Si el usuario selecciona el botón Nueva plantilla, el sistema<br>muestra el formulario de registro según lo mostrado en el prototipo. |  |


---

## Página 103

                  5. El usuario ingresa los datos de la plantilla, como:
                     a. Nombre de la plantilla.
                     b. Asunto del correo.
                     c. Cuerpo del mensaje.
                  6. El sistema valida que los campos obligatorios hayan sido
                     completados.
                  7. El usuario confirma el registro seleccionando Guardar plantilla.
                  8. El sistema guarda la plantilla.
                  9. La plantilla queda disponible para ser utilizada en la programación
                     de notificaciones, siempre que se encuentre activa.
                  10. Si el usuario selecciona una plantilla existente, el sistema muestra
                     el detalle de la plantilla según lo mostrado en el prototipo.
                  11. Desde el detalle el usuario puede seleccionar el botón Editar
                     plantilla o el ícono de editar desde la tabla de plantillas registradas.
                  12. Si el usuario selecciona Editar plantilla, el sistema muestra el
                     formulario con la información actual según lo mostrado en el
                     prototipo.
                  13. El usuario modifica los campos nombre de la plantilla, asunto del
                     correo, cuerpo del mensaje, estado de la plantilla.
                  14. El sistema valida que los campos obligatorios estén completos.
                  15. El usuario confirma la actualización seleccionando el botón
                     Guardar cambios.
                  16. El sistema guarda los cambios realizados.
                  17. La plantilla actualizada queda disponible para nuevas
                     notificaciones.
                  18. Si el usuario selecciona el ícono de Eliminar plantilla, el sistema
                     valida si la plantilla está siendo utilizada en notificaciones.
                  19. Si la plantilla tiene asociada una notificación no permite el borrado y
                     la desactiva en su lugar.
                  20. Si la plantilla no tiene asociado, el sistema permite el borrado
                  21. El sistema solicita confirmación.
                  22. El usuario confirma la acción.
                  23. El sistema elimina la plantilla
                  24. La plantilla eliminada deja de estar disponible para nuevas
                     notificaciones.


---

## Página 104

                  25. En caso no se quiera eliminar la plantilla luego de desactivarse, el
                     usuario puede poner la plantilla como activa a través del formulario
                     de edición de la plantilla.
                Flujo Alternativo
                Datos obligatorios incompletos
                  1. Durante el registro o edición, el sistema detecta que faltan campos
                     obligatorios, como nombre, asunto o cuerpo.
                  2. El sistema muestra los mensajes de validación correspondientes en
                     la interfaz según el campo faltante.
                       a. Para Nombre de la plantilla muestra “El nombre es
                         obligatorio”
                       b. Para Asunto del correo muestra “El asunto es obligatorio”
                       c. Para Cuerpo del mensaje muestra “El cuerpo del mensaje
                         es obligatorio”
                  3. El sistema no permite guardar la plantilla.
                  4. El usuario completa la información requerida.
                  5. El sistema permite registrar o actualizar.
                Nombre de plantilla duplicado
                  1. El sistema detecta que ya existe una plantilla con el mismo nombre.
                  2. El sistema muestra el mensaje: “Ya existe una plantilla con el
                     nombre {insertar nombre de la plantilla}”
                  3. El sistema no permite guardar hasta que el nombre sea modificado.
                  4. El usuario ingresa un nombre diferente.
                  5. El sistema permite registrar la plantilla.
                Plantilla en uso
                  1. El usuario intenta eliminar una plantilla que está siendo utilizada en
                     alguna notificación.
                  2. El sistema no la eliminación
                  3. El sistema muestra el mensaje: “No se puede eliminar la plantilla
                     porque está asociada a notificaciones históricas. Desactívela


### Tablas de la página


#### Tabla 1

| 25. En caso no se quiera eliminar la plantilla luego de desactivarse, el<br>usuario puede poner la plantilla como activa a través del formulario<br>de edición de la plantilla. |
| --- |
| Flujo Alternativo |
| Datos obligatorios incompletos |
| 1. Durante el registro o edición, el sistema detecta que faltan campos<br>obligatorios, como nombre, asunto o cuerpo.<br>2. El sistema muestra los mensajes de validación correspondientes en<br>la interfaz según el campo faltante.<br>a. Para Nombre de la plantilla muestra “El nombre es<br>obligatorio”<br>b. Para Asunto del correo muestra “El asunto es obligatorio”<br>c. Para Cuerpo del mensaje muestra “El cuerpo del mensaje<br>es obligatorio”<br>3. El sistema no permite guardar la plantilla.<br>4. El usuario completa la información requerida.<br>5. El sistema permite registrar o actualizar. |
| Nombre de plantilla duplicado |
| 1. El sistema detecta que ya existe una plantilla con el mismo nombre.<br>2. El sistema muestra el mensaje: “Ya existe una plantilla con el<br>nombre {insertar nombre de la plantilla}”<br>3. El sistema no permite guardar hasta que el nombre sea modificado.<br>4. El usuario ingresa un nombre diferente.<br>5. El sistema permite registrar la plantilla. |
| Plantilla en uso |
| 1. El usuario intenta eliminar una plantilla que está siendo utilizada en<br>alguna notificación.<br>2. El sistema no la eliminación<br>3. El sistema muestra el mensaje: “No se puede eliminar la plantilla<br>porque está asociada a notificaciones históricas. Desactívela |


---

## Página 105

                     para ocultarla del selector.”
                  4. El usuario puede confirmar la desactivación.
                  5. El sistema cambia el estado de la plantilla a Inactiva.
                  Postcondiciones
                  1. La plantilla queda registrada, actualizada, eliminada o desactivada
                     correctamente.
                  2. Las plantillas activas quedan disponibles para ser seleccionadas en
                     la programación de notificaciones.
                  3. Las plantillas inactivas o eliminadas no estarán disponibles para
                     nuevas notificaciones.
                  4. La edición de una plantilla no modifica los correos ya
                     personalizados o programados anteriormente.
                  5. El registro queda asociado al usuario que creó o modificó la
                     plantilla.
                  Restricciones
                  ●  La modificación de una plantilla solo aplica para usos futuros.
                  ●  Las versiones personalizadas de correos en notificaciones no
                     deben modificar la plantilla original.
               Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| para ocultarla del selector.”<br>4. El usuario puede confirmar la desactivación.<br>5. El sistema cambia el estado de la plantilla a Inactiva. |
| --- |
| Postcondiciones |
| 1. La plantilla queda registrada, actualizada, eliminada o desactivada<br>correctamente.<br>2. Las plantillas activas quedan disponibles para ser seleccionadas en<br>la programación de notificaciones.<br>3. Las plantillas inactivas o eliminadas no estarán disponibles para<br>nuevas notificaciones.<br>4. La edición de una plantilla no modifica los correos ya<br>personalizados o programados anteriormente.<br>5. El registro queda asociado al usuario que creó o modificó la<br>plantilla. |
| Restricciones |
| ● La modificación de una plantilla solo aplica para usos futuros.<br>● Las versiones personalizadas de correos en notificaciones no<br>deben modificar la plantilla original. |


---

## Página 106

               Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 107


---

## Página 108

            7.4. DIAGRAMA DE SECUENCIA
            Caso de Uso   CU001: Autenticación de inicio de sesión
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU001: Autenticación de inicio de sesión |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 109


---

## Página 110

            Caso de Uso   CU002: Gestión de Usuarios
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU002: Gestión de Usuarios |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 111


---

## Página 112


---

## Página 113


---

## Página 114


---

## Página 115

            Caso de Uso   CU003: Gestión de Organización
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU003: Gestión de Organización |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 116

            Caso de Uso   CU003: Gestión de Organización
            Diagrama de Secuencia
            Caso de Uso   CU004: Gestión de Contactos
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU003: Gestión de Organización |
| --- | --- |
| Diagrama de Secuencia |  |


#### Tabla 2

| Caso de Uso | CU004: Gestión de Contactos |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 117

            Caso de Uso   CU004: Gestión de Contactos
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU004: Gestión de Contactos |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 118

            Caso de Uso   CU004: Gestión de Contactos
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU004: Gestión de Contactos |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 119


---

## Página 120

            Caso de Uso   CU005: Gestion de Leads
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU005: Gestion de Leads |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 121


---

## Página 122

            Caso de Uso   CU005: Gestion de Leads
            Diagrama de Secuencia
            Caso de Uso   CU006: Gestión de las cotizaciones
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU005: Gestion de Leads |
| --- | --- |
| Diagrama de Secuencia |  |


#### Tabla 2

| Caso de Uso | CU006: Gestión de las cotizaciones |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 123


---

## Página 124


---

## Página 125

            Caso de Uso   CU007: Gestión de Notificaciones
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU007: Gestión de Notificaciones |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 126


---

## Página 127


---

## Página 128


---

## Página 129

            Caso de Uso   CU008: Visualización de dashboards
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU008: Visualización de dashboards |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 130

            Caso de Uso   CU009: Importación de Datos
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU009: Importación de Datos |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 131


---

## Página 132

            Caso de Uso   CU010: Exportación de datos
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU010: Exportación de datos |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 133


---

## Página 134

            7.5. REQUERIMIENTOS FUNCIONALES
                                                         Regla de
              Nº      Descripción del Requerimiento Funcional    Prioridad
                                                         Negocio
                    El sistema debe permitir el inicio de sesión RN-001, MUST
            RF-0001
                    mediante credenciales válidas       RN-002     HAVE
                    El sistema debe permitir al usuario cambiar su
                                                        RN-001,    MUST
            RF-0002 contraseña mediante la opción “¿Olvidaste tu
                                                        RN-002     HAVE
                    contraseña?”
                    El sistema debe permitir al administrador registrar MUST
            RF-0003                                     RN-002
                    usuarios del sistema.                          HAVE
                    El sistema debe permitir al administrador      MUST
            RF-0004                                     RN-002
                    deshabilitar usuarios del sistema.             HAVE
                    El sistema debe permitir al Usuario conectarse a SHOULD
            RF-0005                                     RN-002
                    su cuenta de Microsoft desde su Perfil         HAVE
                    El sistema debe permitir registrar organizaciones
                                                        RN-003,    MUST
            RF-0006 mediante RUC, código interno único o razón
                                                        RN-004     HAVE
                    social.
                    El sistema debe permitir consultar información de
                                                                   MUST
            RF-0007 organizaciones mediante integración con SUNAT RN-004
                                                                   HAVE
                    cuando exista un RUC o razón social válida.
                    El sistema debe permitir visualizar un listado de las MUST
            RF-0008                                     RN-004
                    organizaciones registradas                     HAVE
                    El sistema debe permitir filtrar las organizaciones
                                                                   MUST
            RF-0009 con respeto al nombre de organización, sector, RN-004
                                                                   HAVE
                    tamaño y tipo.
                    El sistema debe permitir acceder a detalles de MUST
            RF-0010                                     RN-004
                    cada organización                              HAVE
                    El sistema debe permitir editar la información de MUST
            RF-0011                                     RN-004
                    las organizaciones previamente registradas.    HAVE
                    El sistema debe permitir visualizar, desde el detalle
                                                                   MUST
            RF-0012 de una organización, los contactos asociados a RN-004
                                                                   HAVE
                    dicha organización.
                    El sistema debe permitir visualizar, desde el detalle
                                                        RN-004,    MUST
            RF-0013 de una organización, el historial de leads
                                                        RN-006     HAVE
                    asociados a dicha organización.
                    El sistema debe permitir visualizar, desde el detalle
                                                        RN-004,    MUST
            RF-0014 de una organización, el historial de cotizaciones
                                                        RN-007     HAVE
                    vinculadas a los leads de dicha organización.


### Tablas de la página


#### Tabla 1

| Nº | Descripción del Requerimiento Funcional | Regla de<br>Negocio | Prioridad |
| --- | --- | --- | --- |
| RF-0001 | El sistema debe permitir el inicio de sesión<br>mediante credenciales válidas | RN-001,<br>RN-002 | MUST<br>HAVE |
| RF-0002 | El sistema debe permitir al usuario cambiar su<br>contraseña mediante la opción “¿Olvidaste tu<br>contraseña?” | RN-001,<br>RN-002 | MUST<br>HAVE |
| RF-0003 | El sistema debe permitir al administrador registrar<br>usuarios del sistema. | RN-002 | MUST<br>HAVE |
| RF-0004 | El sistema debe permitir al administrador<br>deshabilitar usuarios del sistema. | RN-002 | MUST<br>HAVE |
| RF-0005 | El sistema debe permitir al Usuario conectarse a<br>su cuenta de Microsoft desde su Perfil | RN-002 | SHOULD<br>HAVE |
| RF-0006 | El sistema debe permitir registrar organizaciones<br>mediante RUC, código interno único o razón<br>social. | RN-003,<br>RN-004 | MUST<br>HAVE |
| RF-0007 | El sistema debe permitir consultar información de<br>organizaciones mediante integración con SUNAT<br>cuando exista un RUC o razón social válida. | RN-004 | MUST<br>HAVE |
| RF-0008 | El sistema debe permitir visualizar un listado de las<br>organizaciones registradas | RN-004 | MUST<br>HAVE |
| RF-0009 | El sistema debe permitir filtrar las organizaciones<br>con respeto al nombre de organización, sector,<br>tamaño y tipo. | RN-004 | MUST<br>HAVE |
| RF-0010 | El sistema debe permitir acceder a detalles de<br>cada organización | RN-004 | MUST<br>HAVE |
| RF-0011 | El sistema debe permitir editar la información de<br>las organizaciones previamente registradas. | RN-004 | MUST<br>HAVE |
| RF-0012 | El sistema debe permitir visualizar, desde el detalle<br>de una organización, los contactos asociados a<br>dicha organización. | RN-004 | MUST<br>HAVE |
| RF-0013 | El sistema debe permitir visualizar, desde el detalle<br>de una organización, el historial de leads<br>asociados a dicha organización. | RN-004,<br>RN-006 | MUST<br>HAVE |
| RF-0014 | El sistema debe permitir visualizar, desde el detalle<br>de una organización, el historial de cotizaciones<br>vinculadas a los leads de dicha organización. | RN-004,<br>RN-007 | MUST<br>HAVE |


---

## Página 135

                    El sistema debe permitir redirigir a la pestaña
                    Contactos con el filtro de organización aplicado RN-004, MUST
            RF-0015
                    cuando una organización tenga más de seis RN-011 HAVE
                    contactos asociados.
                    El sistema debe permitir realizar la eliminación
                    lógica de organizaciones, evitando su visualización RN-003, MUST
            RF-0016
                    en los listados operativos sin realizar borrado físico RN-004 HAVE
                    del registro en la base de datos.
                    El sistema debe permitir registrar contactos   MUST
            RF-0017                                     RN-005
                    asociados a una organización.                  HAVE
                    El sistema debe validar que el correo electrónico RN-003, MUST
            RF-0018
                    principal del contacto no esté duplicado. RN-005 HAVE
                    El sistema debe permitir visualizar un listado de
                                                                   MUST
            RF-0019 todos los contactos guardados y acceder al detalle RN-005
                                                                   HAVE
                    de su información.
                    El sistema debe permitir filtrar contactos con MUST
            RF-0020                                     RN-005
                    respecto al nombre de contacto.                HAVE
                    El sistema debe permitir editar la información de MUST
            RF-0021                                     RN-005
                    los contactos asociados a una organización.    HAVE
                    El sistema debe permitir crear leads asociados MUST
            RF-0022                                     RN-006
                    obligatoriamente a una organización.           HAVE
                    El sistema debe permitir crear leads con o sin MUST
            RF-0023                                     RN-006
                    contacto asociado.                             HAVE
                    El sistema debe permitir registrar información
                    comercial del lead, como servicio de interés,  MUST
            RF-0024                                     RN-006
                    encargado, comentarios, desafío u oportunidad, HAVE
                    canal de captación.
                    El sistema debe permitir gestionar el estado de los MUST
            RF-0025                                     RN-009
                    leads dentro del pipeline comercial.           HAVE
                    El sistema debe permitir registrar actividades MUST
            RF-0026                                     RN-008
                    asociadas a un lead.                           HAVE
                    El sistema debe permitir visualizar y filtrar leads RN-006,
                                                                   MUST
            RF-0027 por estado de seguimiento: Sin actividades, RN-008,
                                                                   HAVE
                    Pendiente y Por vencer.             RN-011
                    El sistema debe permitir mostrar en el pipeline solo RN-006, MUST
            RF-0028
                    los leads asociados a un encargado. RN-011     HAVE


### Tablas de la página


#### Tabla 1

| RF-0015 | El sistema debe permitir redirigir a la pestaña<br>Contactos con el filtro de organización aplicado<br>cuando una organización tenga más de seis<br>contactos asociados. | RN-004,<br>RN-011 | MUST<br>HAVE |
| --- | --- | --- | --- |
| RF-0016 | El sistema debe permitir realizar la eliminación<br>lógica de organizaciones, evitando su visualización<br>en los listados operativos sin realizar borrado físico<br>del registro en la base de datos. | RN-003,<br>RN-004 | MUST<br>HAVE |
| RF-0017 | El sistema debe permitir registrar contactos<br>asociados a una organización. | RN-005 | MUST<br>HAVE |
| RF-0018 | El sistema debe validar que el correo electrónico<br>principal del contacto no esté duplicado. | RN-003,<br>RN-005 | MUST<br>HAVE |
| RF-0019 | El sistema debe permitir visualizar un listado de<br>todos los contactos guardados y acceder al detalle<br>de su información. | RN-005 | MUST<br>HAVE |
| RF-0020 | El sistema debe permitir filtrar contactos con<br>respecto al nombre de contacto. | RN-005 | MUST<br>HAVE |
| RF-0021 | El sistema debe permitir editar la información de<br>los contactos asociados a una organización. | RN-005 | MUST<br>HAVE |
| RF-0022 | El sistema debe permitir crear leads asociados<br>obligatoriamente a una organización. | RN-006 | MUST<br>HAVE |
| RF-0023 | El sistema debe permitir crear leads con o sin<br>contacto asociado. | RN-006 | MUST<br>HAVE |
| RF-0024 | El sistema debe permitir registrar información<br>comercial del lead, como servicio de interés,<br>encargado, comentarios, desafío u oportunidad,<br>canal de captación. | RN-006 | MUST<br>HAVE |
| RF-0025 | El sistema debe permitir gestionar el estado de los<br>leads dentro del pipeline comercial. | RN-009 | MUST<br>HAVE |
| RF-0026 | El sistema debe permitir registrar actividades<br>asociadas a un lead. | RN-008 | MUST<br>HAVE |
| RF-0027 | El sistema debe permitir visualizar y filtrar leads<br>por estado de seguimiento: Sin actividades,<br>Pendiente y Por vencer. | RN-006,<br>RN-008,<br>RN-011 | MUST<br>HAVE |
| RF-0028 | El sistema debe permitir mostrar en el pipeline solo<br>los leads asociados a un encargado. | RN-006,<br>RN-011 | MUST<br>HAVE |


---

## Página 136

                    El sistema debe mantener registro de las       MUST
            RF-0029                                     RN-008
                    actividades registradas en cada lead.          HAVE
                    El sistema debe permitir visualizar el historial de MUST
            RF-0030                                     RN-008
                    actividades de un lead.                        HAVE
                    El sistema debe permitir visualizar el pipeline MUST
            RF-0031                                     RN-009
                    comercial en formato Kanban.                   HAVE
                    El sistema debe permitir eliminar actividades  MUST
            RF-0032                                     RN-008
                    activas                                        HAVE
                    El sistema debe bloquear la creación de una
                                                                   MUST
            RF-0033 nueva próxima actividad si la actividad inmediata RN-008
                                                                   HAVE
                    anterior permanece en estado “Pendiente”.
                    El sistema debe generar automáticamente una RN-006,
                                                                   MUST
            RF-0034 cotización plantilla asociada al lead cuando este RN-007,
                                                                   HAVE
                    pase del estado En prospecto al estado Ofertado RN-009
                    El sistema debe permitir que el encargado marque MUST
            RF-0035                                     RN-008
                    una actividad como completada                  HAVE
                    El sistema debe permitir filtrar leads por su fecha RN-006, MUST
            RF-0036
                    de creación.                        RN-011     HAVE
                    El sistema no permite editar la actividad asociada RN-008, MUST
            RF-0037
                    al lead.                            RN-013     HAVE
                                                        RN-006,
                    El sistema debe permitir filtrar leads según las MUST
            RF-0038                                     RN-004,
                    características de la organización asociada    HAVE
                                                        RN-011
                    El sistema debe impedir la creación de leads con RN-005, MUST
            RF-0039
                    contactos vencidos.                 RN-006     HAVE
                    El sistema debe permitir cargar de forma
                                                        RN-006,
                    incremental las tarjetas de leads en la vista del MUST
            RF-0040                                     RN-009,
                    pipeline cuando una columna supere las 20      HAVE
                                                        RN-011
                    tarjetas visibles.
                    El sistema debe permitir visualizar inicialmente 20 RN-006,
                                                                   MUST
            RF-0041 leads por cada estado del pipeline y cargar 5 leads RN-009,
                                                                   HAVE
                    adicionales mediante el botón “Ver más”. RN-011


### Tablas de la página


#### Tabla 1

| RF-0029 | El sistema debe mantener registro de las<br>actividades registradas en cada lead. | RN-008 | MUST<br>HAVE |
| --- | --- | --- | --- |
| RF-0030 | El sistema debe permitir visualizar el historial de<br>actividades de un lead. | RN-008 | MUST<br>HAVE |
| RF-0031 | El sistema debe permitir visualizar el pipeline<br>comercial en formato Kanban. | RN-009 | MUST<br>HAVE |
| RF-0032 | El sistema debe permitir eliminar actividades<br>activas | RN-008 | MUST<br>HAVE |
| RF-0033 | El sistema debe bloquear la creación de una<br>nueva próxima actividad si la actividad inmediata<br>anterior permanece en estado “Pendiente”. | RN-008 | MUST<br>HAVE |
| RF-0034 | El sistema debe generar automáticamente una<br>cotización plantilla asociada al lead cuando este<br>pase del estado En prospecto al estado Ofertado | RN-006,<br>RN-007,<br>RN-009 | MUST<br>HAVE |
| RF-0035 | El sistema debe permitir que el encargado marque<br>una actividad como completada | RN-008 | MUST<br>HAVE |
| RF-0036 | El sistema debe permitir filtrar leads por su fecha<br>de creación. | RN-006,<br>RN-011 | MUST<br>HAVE |
| RF-0037 | El sistema no permite editar la actividad asociada<br>al lead. | RN-008,<br>RN-013 | MUST<br>HAVE |
| RF-0038 | El sistema debe permitir filtrar leads según las<br>características de la organización asociada | RN-006,<br>RN-004,<br>RN-011 | MUST<br>HAVE |
| RF-0039 | El sistema debe impedir la creación de leads con<br>contactos vencidos. | RN-005,<br>RN-006 | MUST<br>HAVE |
| RF-0040 | El sistema debe permitir cargar de forma<br>incremental las tarjetas de leads en la vista del<br>pipeline cuando una columna supere las 20<br>tarjetas visibles. | RN-006,<br>RN-009,<br>RN-011 | MUST<br>HAVE |
| RF-0041 | El sistema debe permitir visualizar inicialmente 20<br>leads por cada estado del pipeline y cargar 5 leads<br>adicionales mediante el botón “Ver más”. | RN-006,<br>RN-009,<br>RN-011 | MUST<br>HAVE |


---

## Página 137

                    El sistema debe permitir generar cotizaciones  MUST
            RF-0042                                     RN-007
                    asociadas a un lead.                           HAVE
                    El sistema debe permitir filtrar cotizaciones por MUST
            RF-0043                                     RN-007
                    nombre de organización y estados.              HAVE
                    El sistema debe permitir adjuntar enlaces o   SHOULD
            RF-0044                                     RN-007
                    referencias externas a propuestas comerciales. HAVE
                    El sistema debe permitir actualizar el estado de las
                                                                   MUST
            RF-0045 cotizaciones generadas entre Enviada, Aceptada o RN-007
                                                                   HAVE
                    Rechazada.
                    El sistema debe permitir visualizar un listado
                                                                   MUST
            RF-0046 consolidado de las cotizaciones generadas y RN-007
                                                                   HAVE
                    acceder al detalle de cada una.
                    El sistema debe automatizar el cambio de estado
                                                        RN-007,    MUST
            RF-0047 de un lead a “Cierre con venta” cuando una
                                                        RN-009     HAVE
                    cotización asociada pase al estado “Aceptada”.
                    El sistema debe automatizar el cambio de estado
                                                        RN-007,    MUST
            RF-0048 de un lead a “Cierre sin venta” cuando una
                                                        RN-009     HAVE
                    cotización asociada pase al estado “Rechazada”.
                    El sistema debe impedir la creación de una     MUST
            RF-0049                                     RN-007
                    cotización con monto menor a 0.                HAVE
                    El sistema debe permitir editar la información de
                                                        RN-007,    MUST
            RF-0050 una cotización, únicamente en los campos
                                                        RN-003     HAVE
                    permitidos.
                    El sistema debe actualizar automáticamente el
                                                        RN-006,
                    estado de un lead de En prospecto a Ofertado   MUST
            RF-0051                                     RN-007,
                    cuando se cree una cotización asociada a dicho HAVE
                                                        RN-009
                    lead.
                    El sistema debe permitir visualizar métricas   MUST
            RF-0052                                     RN-010
                    generales del pipeline comercial.              HAVE


### Tablas de la página


#### Tabla 1

| RF-0042 | El sistema debe permitir generar cotizaciones<br>asociadas a un lead. | RN-007 | MUST<br>HAVE |
| --- | --- | --- | --- |
| RF-0043 | El sistema debe permitir filtrar cotizaciones por<br>nombre de organización y estados. | RN-007 | MUST<br>HAVE |
| RF-0044 | El sistema debe permitir adjuntar enlaces o<br>referencias externas a propuestas comerciales. | RN-007 | SHOULD<br>HAVE |
| RF-0045 | El sistema debe permitir actualizar el estado de las<br>cotizaciones generadas entre Enviada, Aceptada o<br>Rechazada. | RN-007 | MUST<br>HAVE |
| RF-0046 | El sistema debe permitir visualizar un listado<br>consolidado de las cotizaciones generadas y<br>acceder al detalle de cada una. | RN-007 | MUST<br>HAVE |
| RF-0047 | El sistema debe automatizar el cambio de estado<br>de un lead a “Cierre con venta” cuando una<br>cotización asociada pase al estado “Aceptada”. | RN-007,<br>RN-009 | MUST<br>HAVE |
| RF-0048 | El sistema debe automatizar el cambio de estado<br>de un lead a “Cierre sin venta” cuando una<br>cotización asociada pase al estado “Rechazada”. | RN-007,<br>RN-009 | MUST<br>HAVE |
| RF-0049 | El sistema debe impedir la creación de una<br>cotización con monto menor a 0. | RN-007 | MUST<br>HAVE |
| RF-0050 | El sistema debe permitir editar la información de<br>una cotización, únicamente en los campos<br>permitidos. | RN-007,<br>RN-003 | MUST<br>HAVE |
| RF-0051 | El sistema debe actualizar automáticamente el<br>estado de un lead de En prospecto a Ofertado<br>cuando se cree una cotización asociada a dicho<br>lead. | RN-006,<br>RN-007,<br>RN-009 | MUST<br>HAVE |
| RF-0052 | El sistema debe permitir visualizar métricas<br>generales del pipeline comercial. | RN-010 | MUST<br>HAVE |


---

## Página 138

                    El sistema debe poder mostrar las métricas del
                                                                  SHOULD
            RF-0053 dashboard por medio de trimestres o un periodo RN-010
                                                                   HAVE
                    definido por el usuario
                    El sistema debe permitir visualizar el historial de
                    notificaciones dividido en las secciones
                    Programadas y Enviadas. En la sección          MUST
            RF-0054                                     RN-013
                    Programadas, el sistema deberá mostrar el      HAVE
                    recuento de notificaciones visibles y aplicar
                    paginación de 6 en 6.
                    El sistema debe asociar automáticamente las
                    notificaciones al encargado correspondiente de la MUST
            RF-0055                                     RN-013
                    actividad o lead, sin permitir su edición directa HAVE
                    desde el módulo de Notificaciones.
                    El sistema debe permitir configurar plantillas MUST
            RF-0056                                     RN-013
                    editables para notificaciones y seguimientos.  HAVE
                    El sistema debe permitir crear eventos en
                    Microsoft Calendar y generar enlaces de Microsoft
                    Teams desde la sección Calendario del módulo de SHOULD
            RF-0057                                     RN-014
                    Notificaciones, siempre que el usuario cuente  HAVE
                    previamente con integración Microsoft activa
                    desde su perfil.
                                                                   MUST
            RF-0058 El sistema debe permitir programar recordatorios RN-013
                                                                   HAVE
                                                                   MUST
            RF-0059 El sistema debe permitir configurar un seguimiento RN-013
                                                                   HAVE
                    El  sistema debe   permitir seleccionar
                    opcionalmente una plantilla de correo para el  MUST
            RF-0060                                     RN-013
                    recordatorio interno, para el correo dirigido al HAVE
                    usuario y para el correo dirigido al contacto.
                    El sistema debe permitir personalizar el asunto y
                    cuerpo de  cada correo configurado en
                                                                   MUST
            RF-0061 recordatorios o seguimientos, ya sea a partir de RN-013
                                                                   HAVE
                    una plantilla seleccionada o mediante registro
                    manual, sin modificar la plantilla original.


### Tablas de la página


#### Tabla 1

| RF-0053 | El sistema debe poder mostrar las métricas del<br>dashboard por medio de trimestres o un periodo<br>definido por el usuario | RN-010 | SHOULD<br>HAVE |
| --- | --- | --- | --- |
| RF-0054 | El sistema debe permitir visualizar el historial de<br>notificaciones dividido en las secciones<br>Programadas y Enviadas. En la sección<br>Programadas, el sistema deberá mostrar el<br>recuento de notificaciones visibles y aplicar<br>paginación de 6 en 6. | RN-013 | MUST<br>HAVE |
| RF-0055 | El sistema debe asociar automáticamente las<br>notificaciones al encargado correspondiente de la<br>actividad o lead, sin permitir su edición directa<br>desde el módulo de Notificaciones. | RN-013 | MUST<br>HAVE |
| RF-0056 | El sistema debe permitir configurar plantillas<br>editables para notificaciones y seguimientos. | RN-013 | MUST<br>HAVE |
| RF-0057 | El sistema debe permitir crear eventos en<br>Microsoft Calendar y generar enlaces de Microsoft<br>Teams desde la sección Calendario del módulo de<br>Notificaciones, siempre que el usuario cuente<br>previamente con integración Microsoft activa<br>desde su perfil. | RN-014 | SHOULD<br>HAVE |
| RF-0058 | El sistema debe permitir programar recordatorios | RN-013 | MUST<br>HAVE |
| RF-0059 | El sistema debe permitir configurar un seguimiento | RN-013 | MUST<br>HAVE |
| RF-0060 | El sistema debe permitir seleccionar<br>opcionalmente una plantilla de correo para el<br>recordatorio interno, para el correo dirigido al<br>usuario y para el correo dirigido al contacto. | RN-013 | MUST<br>HAVE |
| RF-0061 | El sistema debe permitir personalizar el asunto y<br>cuerpo de cada correo configurado en<br>recordatorios o seguimientos, ya sea a partir de<br>una plantilla seleccionada o mediante registro<br>manual, sin modificar la plantilla original. | RN-013 | MUST<br>HAVE |


---

## Página 139

                    El sistema debe permitir seleccionar el correo del
                                                        RN-013,    MUST
            RF-0062 contacto cuando el contacto asociado al lead
                                                        RN-005     HAVE
                    tenga más de un correo registrado.
                    El sistema debe cancelar los correos pendientes
                                                                   MUST
            RF-0063 asociados a una actividad cuando el encargado RN-013
                                                                   HAVE
                    marque dicha actividad como completada.
                    El sistema debe enviar los correos dirigidos al
                    contacto según la fecha y hora configuradas en el
                                                                   MUST
            RF-0064 seguimiento, siempre que la actividad asociada no RN-013
                                                                   HAVE
                    haya sido marcada como completada antes de su
                    ejecución.
                    El sistema debe permitir cancelar una notificación
                    programada antes de su ejecución, solicitando  MUST
            RF-0065                                     RN-013
                    confirmación al usuario antes de completar la  HAVE
                    cancelación.
                    El sistema debe permitir eliminar únicamente
                                                                   MUST
            RF-0066 notificaciones programadas, evitando que sean RN-013
                                                                   HAVE
                    ejecutadas.
                    El sistema debe quitar la tarjeta de las actividades
                                                                   MUST
            RF-0067 en la sección de calendario, una vez superada su RN-013
                                                                   HAVE
                    fecha fin.
                    El sistema debe permitir registrar, editar o eliminar MUST
            RF-0068                                     RN-013
                    lógicamente plantillas de correo.              HAVE
                    El sistema debe permitir visualizar los correos
                    configurados en una notificación de tipo RN-013, MUST
            RF-0069
                    Seguimiento, mostrando el tipo de correo, asunto y RN-003 HAVE
                    cuerpo del mensaje en modo solo lectura.
                    El sistema debe impedir la creación de una nueva
                    notificación, recordatorio o seguimiento cuando ya RN-013, MUST
            RF-0070
                    exista una notificación programada asociada a la RN-003 HAVE
                    misma actividad.
                    El sistema debe impedir que las organizaciones
                                                        RN-011     MUST
            RF-0071 eliminadas lógicamente sean incluidas en los
                                                                   HAVE
                    procesos de exportación


### Tablas de la página


#### Tabla 1

| RF-0062 | El sistema debe permitir seleccionar el correo del<br>contacto cuando el contacto asociado al lead<br>tenga más de un correo registrado. | RN-013,<br>RN-005 | MUST<br>HAVE |
| --- | --- | --- | --- |
| RF-0063 | El sistema debe cancelar los correos pendientes<br>asociados a una actividad cuando el encargado<br>marque dicha actividad como completada. | RN-013 | MUST<br>HAVE |
| RF-0064 | El sistema debe enviar los correos dirigidos al<br>contacto según la fecha y hora configuradas en el<br>seguimiento, siempre que la actividad asociada no<br>haya sido marcada como completada antes de su<br>ejecución. | RN-013 | MUST<br>HAVE |
| RF-0065 | El sistema debe permitir cancelar una notificación<br>programada antes de su ejecución, solicitando<br>confirmación al usuario antes de completar la<br>cancelación. | RN-013 | MUST<br>HAVE |
| RF-0066 | El sistema debe permitir eliminar únicamente<br>notificaciones programadas, evitando que sean<br>ejecutadas. | RN-013 | MUST<br>HAVE |
| RF-0067 | El sistema debe quitar la tarjeta de las actividades<br>en la sección de calendario, una vez superada su<br>fecha fin. | RN-013 | MUST<br>HAVE |
| RF-0068 | El sistema debe permitir registrar, editar o eliminar<br>lógicamente plantillas de correo. | RN-013 | MUST<br>HAVE |
| RF-0069 | El sistema debe permitir visualizar los correos<br>configurados en una notificación de tipo<br>Seguimiento, mostrando el tipo de correo, asunto y<br>cuerpo del mensaje en modo solo lectura. | RN-013,<br>RN-003 | MUST<br>HAVE |
| RF-0070 | El sistema debe impedir la creación de una nueva<br>notificación, recordatorio o seguimiento cuando ya<br>exista una notificación programada asociada a la<br>misma actividad. | RN-013,<br>RN-003 | MUST<br>HAVE |
| RF-0071 | El sistema debe impedir que las organizaciones<br>eliminadas lógicamente sean incluidas en los<br>procesos de exportación | RN-011 | MUST<br>HAVE |


---

## Página 140

                    El sistema debe permitir exportar información del RN-011 MUST
            RF-0072
                    CRM en formato EXCEL                           HAVE
                    El sistema debe permitir importar información RN-012 MUST
            RF-0073
                    mediante archivos EXCEL                        HAVE
            7.6. REQUERIMIENTOS NO FUNCIONALES
                N°        Descripción del Requerimiento No Funcional Prioridad
                      El sistema deberá implementar mecanismos de protección
                                                                MUST
             RNF-0001 contra accesos automatizados y ataques de fuerza bruta en
                                                                HAVE
                      los procesos de autenticación.
                      Las consultas principales del sistema, como registros,
                                                                MUST
             RNF-0002 búsquedas, visualización de pestañas no deberán superar
                                                                HAVE
                      los 3 segundos bajo condiciones normales de operación.
                      La generación de indicadores comerciales en el dashboard
                                                                SHOULD
                      no deberá superar los 5 segundos bajo condiciones
             RNF-0003
                                                                HAVE
                      normales de operación.
                      El sistema deberá mantenerse disponible durante el 99% del
                                                                MUST
             RNF-0004 horario laboral institucional para permitir el uso continuo.
                                                                HAVE
                      La interfaz del sistema deberá adaptarse correctamente a
                      diferentes resoluciones de pantalla en computadoras, SHOULD
             RNF-0005
                      laptops y tablets, manteniendo legibilidad y acceso HAVE
                      adecuado a las funcionalidades principales.
                      El sistema deberá tolerar fallas temporales de servicios
                      externos como SUNAT y Microsoft, mostrando mensajes
                                                                MUST
             RNF-006  informativos al usuario y evitando que dichas fallas afecten
                                                                HAVE
                      las funcionalidades internas no relacionadas con la
                      integración.


### Tablas de la página


#### Tabla 1

| RF-0072 | El sistema debe permitir exportar información del<br>CRM en formato EXCEL | RN-011 | MUST<br>HAVE |
| --- | --- | --- | --- |
| RF-0073 | El sistema debe permitir importar información<br>mediante archivos EXCEL | RN-012 | MUST<br>HAVE |


#### Tabla 2

| N° | Descripción del Requerimiento No Funcional | Prioridad |
| --- | --- | --- |
| RNF-0001 | El sistema deberá implementar mecanismos de protección<br>contra accesos automatizados y ataques de fuerza bruta en<br>los procesos de autenticación. | MUST<br>HAVE |
| RNF-0002 | Las consultas principales del sistema, como registros,<br>búsquedas, visualización de pestañas no deberán superar<br>los 3 segundos bajo condiciones normales de operación. | MUST<br>HAVE |
| RNF-0003 | La generación de indicadores comerciales en el dashboard<br>no deberá superar los 5 segundos bajo condiciones<br>normales de operación. | SHOULD<br>HAVE |
| RNF-0004 | El sistema deberá mantenerse disponible durante el 99% del<br>horario laboral institucional para permitir el uso continuo. | MUST<br>HAVE |
| RNF-0005 | La interfaz del sistema deberá adaptarse correctamente a<br>diferentes resoluciones de pantalla en computadoras,<br>laptops y tablets, manteniendo legibilidad y acceso<br>adecuado a las funcionalidades principales. | SHOULD<br>HAVE |
| RNF-006 | El sistema deberá tolerar fallas temporales de servicios<br>externos como SUNAT y Microsoft, mostrando mensajes<br>informativos al usuario y evitando que dichas fallas afecten<br>las funcionalidades internas no relacionadas con la<br>integración. | MUST<br>HAVE |


---

## Página 141

                      La exportación de datos no deberá superar los 5 segundos
                                                                SHOULD
             RNF-007  bajo condiciones normales de operación.
                                                                HAVE
         8. DICCIONARIO DE DATOS
            8.1. USUARIOS
             Nombre del
                        Tipo de Dato   Descripción    Reglas y Observaciones
               Campo
                                    Identificador único del Clave primaria (PK). Auto
            id         INT
                                    usuario          incremental.
            nombres    VARCHAR(90)  Nombres del usuario No puede ser nulo.
            apellidos  VARCHAR(90)  Apellidos del usuario No puede ser nulo.
                                    Rol asignado dentro Valor por defecto:
            rol        ENUM
                                    del sistema      “Trabajador”.
                                    Estado actual de la Valor por defecto:
            estado     ENUM
                                    cuenta de usuario “Pendiente”.
                                    Correo electrónico
            correo     VARCHAR(254) institucional del Único. No puede ser nulo.
                                    usuario
                                                     No puede ser nulo. Debe
                                    Contraseña cifrada del
            password   VARCHAR(255)                  almacenarse de forma
                                    usuario
                                                     segura.
                                    Fecha de creación de Generado automáticamente
            created_At TIMESTAMP
                                    la cuenta        mediante now().
                                    Fecha de actualización
            updated_At TIMESTAMP                     Actualizado automáticamente.
                                    de la cuenta
            8.2. CONTACTOS
              Nombre del
                          Tipo de Dato   Descripción   Reglas y Observaciones
                Campo
                                      Identificador único del Clave primaria (PK). Auto
            id           INT
                                      contacto         incremental.


### Tablas de la página


#### Tabla 1

| RNF-007 | La exportación de datos no deberá superar los 5 segundos<br>bajo condiciones normales de operación. | SHOULD<br>HAVE |
| --- | --- | --- |


#### Tabla 2

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único del<br>usuario | Clave primaria (PK). Auto<br>incremental. |
| nombres | VARCHAR(90) | Nombres del usuario | No puede ser nulo. |
| apellidos | VARCHAR(90) | Apellidos del usuario | No puede ser nulo. |
| rol | ENUM | Rol asignado dentro<br>del sistema | Valor por defecto:<br>“Trabajador”. |
| estado | ENUM | Estado actual de la<br>cuenta de usuario | Valor por defecto:<br>“Pendiente”. |
| correo | VARCHAR(254) | Correo electrónico<br>institucional del<br>usuario | Único. No puede ser nulo. |
| password | VARCHAR(255) | Contraseña cifrada del<br>usuario | No puede ser nulo. Debe<br>almacenarse de forma<br>segura. |
| created_At | TIMESTAMP | Fecha de creación de<br>la cuenta | Generado automáticamente<br>mediante now(). |
| updated_At | TIMESTAMP | Fecha de actualización<br>de la cuenta | Actualizado automáticamente. |


#### Tabla 3

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único del<br>contacto | Clave primaria (PK). Auto<br>incremental. |


---

## Página 142

            nombres      VARCHAR(90)  Nombres del contacto No puede ser nulo.
            apellidos    VARCHAR(90)  Apellidos del contacto Puede ser nulo.
                                      Tratamiento formal del Valores definidos en
            vocativo     ENUM
                                      contacto         Vocativo.
                                      Cargo laboral del
            cargo        VARCHAR(120)                  Puede ser nulo.
                                      contacto
                                      Correo electrónico
            correo       VARCHAR(254)                  Único. No puede ser nulo.
                                      principal
                                      Número telefónico del Debe almacenarse con
            telefono     VARCHAR(20)
                                      contacto         formato internacional.
                                      Correo electrónico
            correo2      VARCHAR(254)                  Único. Puede ser nulo.
                                      secundario
                                      Observaciones
            comentarios  VARCHAR(500) relacionadas al  Puede ser nulo.
                                      contacto
                                      Organización asociada Clave foránea (FK) hacia
            id_organizacion UUID
                                      al contacto      Organizaciones.id.
                                      Usuario creador del Clave foránea (FK) hacia
            id_author    INT
                                      registro         Usuarios.id.
                                                       Generado
                                      Fecha de creación del
            created_at   TIMESTAMP                     automáticamente mediante
                                      registro
                                                       now().
                                      Fecha de actualización Actualizado
            updated_at   TIMESTAMP
                                      del registro     automáticamente.
                                                       Generado
                                      Estado actual del
            estado_correo ENUM                         automáticamente como
                                      correo
                                                       Vigente.
            8.3. ORGANIZACIONES
               Nombre del
                            Tipo de Dato  Descripción  Reglas y Observaciones
                 Campo
                                        Identificador único Clave primaria (PK). No
            id             UUID
                                        de la organización puede ser nulo.


### Tablas de la página


#### Tabla 1

| nombres | VARCHAR(90) | Nombres del contacto | No puede ser nulo. |
| --- | --- | --- | --- |
| apellidos | VARCHAR(90) | Apellidos del contacto | Puede ser nulo. |
| vocativo | ENUM | Tratamiento formal del<br>contacto | Valores definidos en<br>Vocativo. |
| cargo | VARCHAR(120) | Cargo laboral del<br>contacto | Puede ser nulo. |
| correo | VARCHAR(254) | Correo electrónico<br>principal | Único. No puede ser nulo. |
| telefono | VARCHAR(20) | Número telefónico del<br>contacto | Debe almacenarse con<br>formato internacional. |
| correo2 | VARCHAR(254) | Correo electrónico<br>secundario | Único. Puede ser nulo. |
| comentarios | VARCHAR(500) | Observaciones<br>relacionadas al<br>contacto | Puede ser nulo. |
| id_organizacion | UUID | Organización asociada<br>al contacto | Clave foránea (FK) hacia<br>Organizaciones.id. |
| id_author | INT | Usuario creador del<br>registro | Clave foránea (FK) hacia<br>Usuarios.id. |
| created_at | TIMESTAMP | Fecha de creación del<br>registro | Generado<br>automáticamente mediante<br>now(). |
| updated_at | TIMESTAMP | Fecha de actualización<br>del registro | Actualizado<br>automáticamente. |
| estado_correo | ENUM | Estado actual del<br>correo | Generado<br>automáticamente como<br>Vigente. |


#### Tabla 2

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y Observaciones |
| --- | --- | --- | --- |
| id | UUID | Identificador único<br>de la organización | Clave primaria (PK). No<br>puede ser nulo. |


---

## Página 143

                                        Código interno
                                        asignado por el
            codigo_cliente VARCHAR(20)                 Único. No puede ser nulo.
                                        cliente o definido
                                        automáticamente
                                        Nombre legal de la
            nombre         VARCHAR(120)                Único. No puede ser nulo.
                                        organización
                                        Nombre comercial
            nombre_comercial VARCHAR(100)              No puede ser nulo.
                                        de la organización
                                        Área o subunidad de
            sub_area       VARCHAR(60)                 Puede ser nulo.
                                        la organización
                                        Número de RUC de Puede ser nulo. Debe
            ruc            VARCHAR(11)
                                        la organización contener 11 caracteres.
                                                       No puede ser nulo.
                                        Tipo de organización
            tipo           ENUM                        Valores definidos en
                                        registrada
                                                       TipoEmpresa.
                                        Enlace al perfil
            linkedin       VARCHAR(255) empresarial de Puede ser nulo.
                                        LinkedIn
                                        Ubicación geográfica
            ubicacion      VARCHAR(100)                Puede ser nulo.
                                        de la organización
                                        Sector económico de Valores definidos en
            sector         ENUM
                                        la organización Sector.
                                                       No puede ser nulo.
                                        Tamaño empresarial
            tamaño         ENUM                        Valores definidos en
                                        de la organización
                                                       Tamaño.
            actividad_economic          Actividad económica
                           VARCHAR(120)                Puede ser nulo.
            a                           principal
            alianzas_estrategic         Información sobre
                           VARCHAR(300)                Puede ser nulo.
            as                          alianzas estratégicas
                                        Contacto principal
                                                       Clave foránea (FK) hacia
            id_contacto_activo INT      asociado a la
                                                       Contactos.id.
                                        organización
                                                       Generado
                                        Fecha de creación
            created_at     TIMESTAMP                   automáticamente
                                        del registro
                                                       mediante now().


### Tablas de la página


#### Tabla 1

| codigo_cliente | VARCHAR(20) | Código interno<br>asignado por el<br>cliente o definido<br>automáticamente | Único. No puede ser nulo. |
| --- | --- | --- | --- |
| nombre | VARCHAR(120) | Nombre legal de la<br>organización | Único. No puede ser nulo. |
| nombre_comercial | VARCHAR(100) | Nombre comercial<br>de la organización | No puede ser nulo. |
| sub_area | VARCHAR(60) | Área o subunidad de<br>la organización | Puede ser nulo. |
| ruc | VARCHAR(11) | Número de RUC de<br>la organización | Puede ser nulo. Debe<br>contener 11 caracteres. |
| tipo | ENUM | Tipo de organización<br>registrada | No puede ser nulo.<br>Valores definidos en<br>TipoEmpresa. |
| linkedin | VARCHAR(255) | Enlace al perfil<br>empresarial de<br>LinkedIn | Puede ser nulo. |
| ubicacion | VARCHAR(100) | Ubicación geográfica<br>de la organización | Puede ser nulo. |
| sector | ENUM | Sector económico de<br>la organización | Valores definidos en<br>Sector. |
| tamaño | ENUM | Tamaño empresarial<br>de la organización | No puede ser nulo.<br>Valores definidos en<br>Tamaño. |
| actividad_economic<br>a | VARCHAR(120) | Actividad económica<br>principal | Puede ser nulo. |
| alianzas_estrategic<br>as | VARCHAR(300) | Información sobre<br>alianzas estratégicas | Puede ser nulo. |
| id_contacto_activo | INT | Contacto principal<br>asociado a la<br>organización | Clave foránea (FK) hacia<br>Contactos.id. |
| created_at | TIMESTAMP | Fecha de creación<br>del registro | Generado<br>automáticamente<br>mediante now(). |


---

## Página 144

                                        Fecha de
                                                       Actualizado
            updated_at     TIMESTAMP    actualización del
                                                       automáticamente.
                                        registro
                                        Usuario creador del Clave foránea (FK) hacia
            id_author      INT
                                        registro       Usuarios.id.
                                                       Puede ser nulo. Se utiliza
                                                       para implementar
                                        Fecha de
                                                       eliminación lógica (Soft
            deleted_at     TIMESTAMP    eliminación lógica
                                                       Delete). Cuando es NULL,
                                        del registro
                                                       el registro se considera
                                                       activo.
            8.4. LEADS
               Nombre del   Tipo de Dato   Descripción        Reglas y
                Campo                                      Observaciones
            id             INT          Identificador único del Clave primaria (PK).
                                        lead.           Auto incremental.
            id_org         UUID         Organización    Clave foránea (FK) hacia
                                        asociada al lead. Organizaciones.id. No
                                                        puede ser nulo.
            id_contacto    INT          Contacto principal Clave foránea (FK) hacia
                                        asociado al lead. Contactos.id. Puede ser
                                                        nulo.
            estado         ENUM         Estado actual del No puede ser nulo.
                                        lead dentro del Valores definidos en
                                        pipeline comercial. LeadState.
            servicio_interes VARCHAR(120) Servicio de interés No puede ser nulo.
                                        del cliente potencial.
            comentarios    VARCHAR(500) Comentarios     Puede ser nulo.
                                        generales sobre el
                                        lead.
            desafio_oportunida VARCHAR(500) Problema u  Puede ser nulo.
            d                           oportunidad
                                        identificada.
            canal_captacion VARCHAR(60) Medio por el cual se Puede ser nulo.
                                        captó el lead.


### Tablas de la página


#### Tabla 1

| updated_at | TIMESTAMP | Fecha de<br>actualización del<br>registro | Actualizado<br>automáticamente. |
| --- | --- | --- | --- |
| id_author | INT | Usuario creador del<br>registro | Clave foránea (FK) hacia<br>Usuarios.id. |
| deleted_at | TIMESTAMP | Fecha de<br>eliminación lógica<br>del registro | Puede ser nulo. Se utiliza<br>para implementar<br>eliminación lógica (Soft<br>Delete). Cuando es NULL,<br>el registro se considera<br>activo. |


#### Tabla 2

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y<br>Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único del<br>lead. | Clave primaria (PK).<br>Auto incremental. |
| id_org | UUID | Organización<br>asociada al lead. | Clave foránea (FK) hacia<br>Organizaciones.id. No<br>puede ser nulo. |
| id_contacto | INT | Contacto principal<br>asociado al lead. | Clave foránea (FK) hacia<br>Contactos.id. Puede ser<br>nulo. |
| estado | ENUM | Estado actual del<br>lead dentro del<br>pipeline comercial. | No puede ser nulo.<br>Valores definidos en<br>LeadState. |
| servicio_interes | VARCHAR(120) | Servicio de interés<br>del cliente potencial. | No puede ser nulo. |
| comentarios | VARCHAR(500) | Comentarios<br>generales sobre el<br>lead. | Puede ser nulo. |
| desafio_oportunida<br>d | VARCHAR(500) | Problema u<br>oportunidad<br>identificada. | Puede ser nulo. |
| canal_captacion | VARCHAR(60) | Medio por el cual se<br>captó el lead. | Puede ser nulo. |


---

## Página 145

            id_encargado   INT          Usuario responsable Clave foránea (FK) hacia
                                        del seguimiento del Usuarios.id. No puede
                                        lead.           ser nulo.
            id_author      INT          Usuario creador del Clave foránea (FK) hacia
                                        registro.       Usuarios.id. No puede
                                                        ser nulo.
            created_at     TIMESTAMP    Fecha de creación Generado
                                        del lead.       automáticamente
                                                        mediante now().
            updated_at     TIMESTAMP    Fecha de        Actualizado
                                        actualización del automáticamente.
                                        lead.
            deleted_at     TIMESTAMP    Fecha de eliminación Puede ser nulo. Se
                                        lógica del lead. utiliza para eliminación
                                                        lógica (Soft Delete);
                                                        cuando es NULL, el
                                                        registro permanece
                                                        activo.
            8.5. ACTIVIDADES
             Nombre del Campo  Tipo de Dato  Descripción      Reglas y
                                                            Observaciones
            id               INT          Identificador único Clave primaria (PK).
                                          de la actividad. Auto incremental.
            id_lead          INT          Lead asociado a la Clave foránea (FK)
                                          actividad.     hacia Leads.id. No
                                                         puede ser nulo.
            nombre_actividad VARCHAR(90)  Nombre descriptivo No puede ser nulo.
                                          de la actividad.
            fecha_inicio     TIMESTAMP    Fecha y hora de No puede ser nulo.
                                          inicio de la
                                          actividad.
            fecha_fin        TIMESTAMP    Fecha y hora de No puede ser nulo.
                                          finalización de la
                                          actividad.
            tipo             ENUM         Tipo de actividad No puede ser nulo.
                                          comercial.     Valores definidos en
                                                         TipoActividad.


### Tablas de la página


#### Tabla 1

| id_encargado | INT | Usuario responsable<br>del seguimiento del<br>lead. | Clave foránea (FK) hacia<br>Usuarios.id. No puede<br>ser nulo. |
| --- | --- | --- | --- |
| id_author | INT | Usuario creador del<br>registro. | Clave foránea (FK) hacia<br>Usuarios.id. No puede<br>ser nulo. |
| created_at | TIMESTAMP | Fecha de creación<br>del lead. | Generado<br>automáticamente<br>mediante now(). |
| updated_at | TIMESTAMP | Fecha de<br>actualización del<br>lead. | Actualizado<br>automáticamente. |
| deleted_at | TIMESTAMP | Fecha de eliminación<br>lógica del lead. | Puede ser nulo. Se<br>utiliza para eliminación<br>lógica (Soft Delete);<br>cuando es NULL, el<br>registro permanece<br>activo. |


#### Tabla 2

| Nombre del Campo | Tipo de Dato | Descripción | Reglas y<br>Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único<br>de la actividad. | Clave primaria (PK).<br>Auto incremental. |
| id_lead | INT | Lead asociado a la<br>actividad. | Clave foránea (FK)<br>hacia Leads.id. No<br>puede ser nulo. |
| nombre_actividad | VARCHAR(90) | Nombre descriptivo<br>de la actividad. | No puede ser nulo. |
| fecha_inicio | TIMESTAMP | Fecha y hora de<br>inicio de la<br>actividad. | No puede ser nulo. |
| fecha_fin | TIMESTAMP | Fecha y hora de<br>finalización de la<br>actividad. | No puede ser nulo. |
| tipo | ENUM | Tipo de actividad<br>comercial. | No puede ser nulo.<br>Valores definidos en<br>TipoActividad. |


---

## Página 146

            estado           ENUM         Estado actual de la Valor por defecto:
                                          actividad.     "Pendiente".
            notas            VARCHAR(1000) Comentarios o Puede ser nulo.
                                          notas adicionales.
            outlook_event_id VARCHAR(255) Identificador del Puede ser nulo.
                                          evento
                                          sincronizado con
                                          Microsoft Outlook.
            outlook_imported BOOLEAN      Indica si la   Valor por defecto:
                                          actividad fue  false.
                                          importada desde
                                          Outlook.
            teams_meeting_url TEXT        URL de la reunión Puede ser nulo.
                                          de Microsoft Teams
                                          asociada a la
                                          actividad.
            seguimiento_automati BOOLEAN  Indica si la   Valor por defecto:
            co                            actividad cuenta false.
                                          con seguimiento
                                          automatizado.
            id_responsable   INT          Usuario        Clave foránea (FK)
                                          responsable de la hacia Usuarios.id. No
                                          actividad.     puede ser nulo.
            created_at       TIMESTAMP    Fecha de creación Generado
                                          del registro.  automáticamente
                                                         mediante now().
            updated_at       TIMESTAMP    Fecha de       Actualizado
                                          actualización del automáticamente.
                                          registro.
            8.6. COTIZACIONES
              Nombre del
                           Tipo de Dato   Descripción   Reglas y Observaciones
                Campo
                                                       Clave primaria (PK). Auto
                                       Identificador único de
            id            INT                          incremental. No puede ser
                                       la cotización
                                                       nulo.


### Tablas de la página


#### Tabla 1

| estado | ENUM | Estado actual de la<br>actividad. | Valor por defecto:<br>"Pendiente". |
| --- | --- | --- | --- |
| notas | VARCHAR(1000) | Comentarios o<br>notas adicionales. | Puede ser nulo. |
| outlook_event_id | VARCHAR(255) | Identificador del<br>evento<br>sincronizado con<br>Microsoft Outlook. | Puede ser nulo. |
| outlook_imported | BOOLEAN | Indica si la<br>actividad fue<br>importada desde<br>Outlook. | Valor por defecto:<br>false. |
| teams_meeting_url | TEXT | URL de la reunión<br>de Microsoft Teams<br>asociada a la<br>actividad. | Puede ser nulo. |
| seguimiento_automati<br>co | BOOLEAN | Indica si la<br>actividad cuenta<br>con seguimiento<br>automatizado. | Valor por defecto:<br>false. |
| id_responsable | INT | Usuario<br>responsable de la<br>actividad. | Clave foránea (FK)<br>hacia Usuarios.id. No<br>puede ser nulo. |
| created_at | TIMESTAMP | Fecha de creación<br>del registro. | Generado<br>automáticamente<br>mediante now(). |
| updated_at | TIMESTAMP | Fecha de<br>actualización del<br>registro. | Actualizado<br>automáticamente. |


#### Tabla 2

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único de<br>la cotización | Clave primaria (PK). Auto<br>incremental. No puede ser<br>nulo. |


---

## Página 147

                                       Identificador del lead Clave foránea (FK) hacia
            id_lead       INT          asociado a la   Leads.id. No puede ser
                                       cotización      nulo.
                                       Identificador del Clave foránea (FK) hacia
            id_remitente  INT          usuario remitente de Usuarios.id. No puede ser
                                       la cotización   nulo.
                                       Fecha y hora de
            fecha_cot     TIMESTAMP    generación de la No puede ser nulo.
                                       cotización
                                       Nombre de la
            dirigido      VARCHAR(90)  persona a quien va No puede ser nulo.
                                       dirigida la propuesta
                                       Nombre de la
            cliente       VARCHAR(120) organización o cliente Puede ser nulo.
                                       relacionado
                                       Producto o solución
            producto      VARCHAR(120)                 Puede ser nulo.
                                       ofertada
                                       Nombre del remitente
            nombre_remitent
                          VARCHAR(120) de la propuesta No puede ser nulo.
            e
                                       comercial
                                       Nombre del servicio
            nombre_servicio VARCHAR(150)               No puede ser nulo.
                                       cotizado
                                                       No puede ser nulo. Debe
                                       Monto económico de
            monto         DECIMAL(12,2)                almacenar valores
                                       la cotización
                                                       monetarios positivos.
                                       Tipo de moneda  No puede ser nulo.
            tipo          ENUM         utilizada en la Valores definidos en
                                       cotización      TipoMoneda.
                                                       No puede ser nulo.
                                       Estado actual de la
            estado        ENUM                         Valores definidos en
                                       cotización
                                                       EstadoCot.
                                       Observaciones
                                       adicionales
            observacion   VARCHAR(1000)                Puede ser nulo.
                                       relacionadas a la
                                       propuesta
                                       Enlace al documento
            link_propuesta VARCHAR(500) o propuesta    Puede ser nulo.
                                       comercial


### Tablas de la página


#### Tabla 1

| id_lead | INT | Identificador del lead<br>asociado a la<br>cotización | Clave foránea (FK) hacia<br>Leads.id. No puede ser<br>nulo. |
| --- | --- | --- | --- |
| id_remitente | INT | Identificador del<br>usuario remitente de<br>la cotización | Clave foránea (FK) hacia<br>Usuarios.id. No puede ser<br>nulo. |
| fecha_cot | TIMESTAMP | Fecha y hora de<br>generación de la<br>cotización | No puede ser nulo. |
| dirigido | VARCHAR(90) | Nombre de la<br>persona a quien va<br>dirigida la propuesta | No puede ser nulo. |
| cliente | VARCHAR(120) | Nombre de la<br>organización o cliente<br>relacionado | Puede ser nulo. |
| producto | VARCHAR(120) | Producto o solución<br>ofertada | Puede ser nulo. |
| nombre_remitent<br>e | VARCHAR(120) | Nombre del remitente<br>de la propuesta<br>comercial | No puede ser nulo. |
| nombre_servicio | VARCHAR(150) | Nombre del servicio<br>cotizado | No puede ser nulo. |
| monto | DECIMAL(12,2) | Monto económico de<br>la cotización | No puede ser nulo. Debe<br>almacenar valores<br>monetarios positivos. |
| tipo | ENUM | Tipo de moneda<br>utilizada en la<br>cotización | No puede ser nulo.<br>Valores definidos en<br>TipoMoneda. |
| estado | ENUM | Estado actual de la<br>cotización | No puede ser nulo.<br>Valores definidos en<br>EstadoCot. |
| observacion | VARCHAR(1000) | Observaciones<br>adicionales<br>relacionadas a la<br>propuesta | Puede ser nulo. |
| link_propuesta | VARCHAR(500) | Enlace al documento<br>o propuesta<br>comercial | Puede ser nulo. |


---

## Página 148

                                                       Generado
                                       Fecha de creación
            created_at    TIMESTAMP                    automáticamente
                                       del registro
                                                       mediante now().
                                       Fecha de
                                                       Actualizado
            updated_at    TIMESTAMP    actualización del
                                                       automáticamente.
                                       registro
                                                       Clave foránea (FK) hacia
                                       Usuario creador del
            id_author     INT                          Usuarios.id. No puede ser
                                       registro
                                                       nulo.
            8.7. NOTIFICACIONES
             Nombre del
                         Tipo de Dato   Descripción    Reglas y Observaciones
               Campo
                                     Identificador único de la Clave primaria (PK). Auto
            id          INT
                                     notificación     incremental.
                                     Usuario destinatario de Clave foránea (FK) hacia
            id_usuario  INT
                                     la notificación  Usuarios.id.
                                     Actividad relacionada Clave foránea (FK) hacia
            id_actividad INT
                                     con la notificación Actividades.id.
                                     Título descriptivo de la
            titulo      VARCHAR(120)                  No puede ser nulo.
                                     notificación
                                     Contenido de la
            mensaje     VARCHAR(300)                  No puede ser nulo.
                                     notificación
                                     Estado de lectura de la Valor por defecto: “No
            estado      ENUM
                                     notificación     Leida”.
                                     Fecha de creación de la Generado automáticamente
            created_at  TIMESTAMP
                                     notificación     mediante now().
                                                      Clave foránea (FK) hacia
                                                      Leads.id. Puede ser nulo.
                                     Lead asociado a la Se utiliza cuando la
            id_lead     INT
                                     notificación.    notificación está
                                                      relacionada con un lead
                                                      específico.


### Tablas de la página


#### Tabla 1

| created_at | TIMESTAMP | Fecha de creación<br>del registro | Generado<br>automáticamente<br>mediante now(). |
| --- | --- | --- | --- |
| updated_at | TIMESTAMP | Fecha de<br>actualización del<br>registro | Actualizado<br>automáticamente. |
| id_author | INT | Usuario creador del<br>registro | Clave foránea (FK) hacia<br>Usuarios.id. No puede ser<br>nulo. |


#### Tabla 2

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único de la<br>notificación | Clave primaria (PK). Auto<br>incremental. |
| id_usuario | INT | Usuario destinatario de<br>la notificación | Clave foránea (FK) hacia<br>Usuarios.id. |
| id_actividad | INT | Actividad relacionada<br>con la notificación | Clave foránea (FK) hacia<br>Actividades.id. |
| titulo | VARCHAR(120) | Título descriptivo de la<br>notificación | No puede ser nulo. |
| mensaje | VARCHAR(300) | Contenido de la<br>notificación | No puede ser nulo. |
| estado | ENUM | Estado de lectura de la<br>notificación | Valor por defecto: “No<br>Leida”. |
| created_at | TIMESTAMP | Fecha de creación de la<br>notificación | Generado automáticamente<br>mediante now(). |
| id_lead | INT | Lead asociado a la<br>notificación. | Clave foránea (FK) hacia<br>Leads.id. Puede ser nulo.<br>Se utiliza cuando la<br>notificación está<br>relacionada con un lead<br>específico. |


---

## Página 149

            8.8. TEMPLATES_EMAIL
             Nombre del
                        Tipo de Dato    Descripción    Reglas y Observaciones
               Campo
                                    Identificador único de la Clave primaria (PK). Auto
            id         INT
                                    plantilla de correo incremental.
                                    Nombre descriptivo de la Debe ser único. No puede
            nombre     VARCHAR(100)
                                    plantilla          ser nulo.
                                    Asunto predeterminado
            asunto     VARCHAR(255)                    No puede ser nulo.
                                    del correo electrónico
                                    Contenido principal de la
            cuerpo     TEXT                            No puede ser nulo.
                                    plantilla de correo
                                    Estado de disponibilidad
            activo     BOOL                            Valor por defecto: true.
                                    de la plantilla
                                                       Generado
                                    Fecha de creación del
            created_at TIMESTAMP                       automáticamente
                                    registro
                                                       mediante now().
                                    Fecha de actualización Actualizado
            updated_at TIMESTAMP
                                    del registro       automáticamente.
            8.9. USER_TOKENS
             Nombre del
                         Tipo de Dato   Descripción   Reglas y Observaciones
               Campo
                                    Identificador único del Clave primaria (PK). Auto
            id          INT
                                    token            incremental.
                                    Correo asociado al
            correo      VARCHAR(254)                 No puede ser nulo.
                                    token
                                    Hash del token
            token_hash  VARCHAR(255)                 Único. No puede ser nulo.
                                    generado
                                    Finalidad del token No puede ser nulo. Valores
            proposito   ENUM
                                    generado         definidos en TokenPurpose.
                                    Usuario relacionado al Clave foránea (FK) hacia
            id_usuario  INT
                                    token            Usuarios.id.
                                    Rol asignado durante
            rol         ENUM                         Puede ser nulo.
                                    invitaciones


### Tablas de la página


#### Tabla 1

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único de la<br>plantilla de correo | Clave primaria (PK). Auto<br>incremental. |
| nombre | VARCHAR(100) | Nombre descriptivo de la<br>plantilla | Debe ser único. No puede<br>ser nulo. |
| asunto | VARCHAR(255) | Asunto predeterminado<br>del correo electrónico | No puede ser nulo. |
| cuerpo | TEXT | Contenido principal de la<br>plantilla de correo | No puede ser nulo. |
| activo | BOOL | Estado de disponibilidad<br>de la plantilla | Valor por defecto: true. |
| created_at | TIMESTAMP | Fecha de creación del<br>registro | Generado<br>automáticamente<br>mediante now(). |
| updated_at | TIMESTAMP | Fecha de actualización<br>del registro | Actualizado<br>automáticamente. |


#### Tabla 2

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único del<br>token | Clave primaria (PK). Auto<br>incremental. |
| correo | VARCHAR(254) | Correo asociado al<br>token | No puede ser nulo. |
| token_hash | VARCHAR(255) | Hash del token<br>generado | Único. No puede ser nulo. |
| proposito | ENUM | Finalidad del token<br>generado | No puede ser nulo. Valores<br>definidos en TokenPurpose. |
| id_usuario | INT | Usuario relacionado al<br>token | Clave foránea (FK) hacia<br>Usuarios.id. |
| rol | ENUM | Rol asignado durante<br>invitaciones | Puede ser nulo. |


---

## Página 150

                                    Usuario que generó la Clave foránea (FK) hacia
            invitador_id INT
                                    invitación       Usuarios.id.
                                    Estado actual del Valor por defecto:
            estado      ENUM
                                    token            “Pendiente”.
                                    Fecha de expiración
            expires_at  TIMESTAMP                    No puede ser nulo.
                                    del token
                                    Fecha de consumo o
            consumed_at TIMESTAMP                    Puede ser nulo.
                                    utilización del token
                                    Fecha de creación del Generado automáticamente
            created_at  TIMESTAMP
                                    token            mediante now().
            8.10 NOTIFICACIONES_PROGRAMADAS
              Nombre del   Tipo de Dato Descripción       Reglas y
                Campo                                   Observaciones
            id            INT         Identificador único Clave primaria (PK).
                                      de la notificación Auto incremental.
                                      programada.
            tipo          ENUM        Tipo de notificación No puede ser nulo.
                                      programada.    Valores definidos en
                                                     TipoNotificacion.
            estado        ENUM        Estado actual de la Valor por defecto:
                                      notificación   Programada.
                                      programada.
            id_actividad  INT         Actividad asociada Clave foránea (FK) hacia
                                      a la notificación Actividades.id. No
                                      programada.    puede ser nulo.
            id_lead       INT         Lead asociado a la Clave foránea (FK) hacia
                                      notificación   Leads.id. No puede ser
                                      programada.    nulo.


### Tablas de la página


#### Tabla 1

| invitador_id | INT | Usuario que generó la<br>invitación | Clave foránea (FK) hacia<br>Usuarios.id. |
| --- | --- | --- | --- |
| estado | ENUM | Estado actual del<br>token | Valor por defecto:<br>“Pendiente”. |
| expires_at | TIMESTAMP | Fecha de expiración<br>del token | No puede ser nulo. |
| consumed_at | TIMESTAMP | Fecha de consumo o<br>utilización del token | Puede ser nulo. |
| created_at | TIMESTAMP | Fecha de creación del<br>token | Generado automáticamente<br>mediante now(). |


#### Tabla 2

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y<br>Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador único<br>de la notificación<br>programada. | Clave primaria (PK).<br>Auto incremental. |
| tipo | ENUM | Tipo de notificación<br>programada. | No puede ser nulo.<br>Valores definidos en<br>TipoNotificacion. |
| estado | ENUM | Estado actual de la<br>notificación<br>programada. | Valor por defecto:<br>Programada. |
| id_actividad | INT | Actividad asociada<br>a la notificación<br>programada. | Clave foránea (FK) hacia<br>Actividades.id. No<br>puede ser nulo. |
| id_lead | INT | Lead asociado a la<br>notificación<br>programada. | Clave foránea (FK) hacia<br>Leads.id. No puede ser<br>nulo. |


---

## Página 151

            id_responsable INT        Usuario        Clave foránea (FK) hacia
                                      responsable de la Usuarios.id. No puede
                                      notificación   ser nulo.
                                      programada.
            asunto_interno VARCHAR(25 Asunto del correo Puede ser nulo.
                          5)          interno.
            cuerpo_interno TEXT       Contenido del  Puede ser nulo.
                                      correo interno.
            fecha_envio_inter TIMESTAMP Fecha programada Puede ser nulo.
            no                        para el envío del
                                      correo interno.
            id_template_inter INT     Identificador de la Puede ser nulo.
            no                        plantilla de correo
                                      interno.
            job_id_interno VARCHAR(15 Identificador del Puede ser nulo.
                          0)          proceso
                                      automatizado de
                                      envío.
            enviado_interno BOOL      Indica si el correo Valor por defecto: false.
                                      interno fue enviado.
            correo_cliente VARCHAR(25 Correo electrónico Puede ser nulo.
                          4)          del cliente
                                      destinatario.
            created_at    TIMESTAMP   Fecha de creación Generado
                                      del registro.  automáticamente
                                                     mediante now().
            updated_at    TIMESTAMP   Fecha de       Actualizado
                                      actualización del automáticamente.
                                      registro.


### Tablas de la página


#### Tabla 1

| id_responsable | INT | Usuario<br>responsable de la<br>notificación<br>programada. | Clave foránea (FK) hacia<br>Usuarios.id. No puede<br>ser nulo. |
| --- | --- | --- | --- |
| asunto_interno | VARCHAR(25<br>5) | Asunto del correo<br>interno. | Puede ser nulo. |
| cuerpo_interno | TEXT | Contenido del<br>correo interno. | Puede ser nulo. |
| fecha_envio_inter<br>no | TIMESTAMP | Fecha programada<br>para el envío del<br>correo interno. | Puede ser nulo. |
| id_template_inter<br>no | INT | Identificador de la<br>plantilla de correo<br>interno. | Puede ser nulo. |
| job_id_interno | VARCHAR(15<br>0) | Identificador del<br>proceso<br>automatizado de<br>envío. | Puede ser nulo. |
| enviado_interno | BOOL | Indica si el correo<br>interno fue enviado. | Valor por defecto: false. |
| correo_cliente | VARCHAR(25<br>4) | Correo electrónico<br>del cliente<br>destinatario. | Puede ser nulo. |
| created_at | TIMESTAMP | Fecha de creación<br>del registro. | Generado<br>automáticamente<br>mediante now(). |
| updated_at | TIMESTAMP | Fecha de<br>actualización del<br>registro. | Actualizado<br>automáticamente. |


---

## Página 152

            8.11 SEGUIMIENTO_INSTANCIA
              Nombre del   Tipo de Dato Descripción Reglas y Observaciones
                Campo
            id            INT         Identificador Clave primaria (PK). Auto
                                      único de la incremental.
                                      instancia de
                                      seguimiento.
            orden         INT         Orden de   No puede ser nulo. Debe ser
                                      ejecución  único por notificación.
                                      dentro del
                                      seguimiento.
            id_notificacion INT       Notificación Clave foránea (FK) hacia
                                      programada NotificacionesProgramadas.
                                      asociada.  id. No puede ser nulo.
            asunto_interno VARCHAR(25 Asunto del No puede ser nulo.
                          5)          correo interno
                                      al
                                      responsable.
            cuerpo_interno TEXT       Contenido del No puede ser nulo.
                                      correo
                                      interno.
            fecha_envio_inter TIMESTAMP Fecha    No puede ser nulo.
            no                        programada
                                      para enviar el
                                      correo
                                      interno.
            id_template_inter INT     Identificador Puede ser nulo.
            no                        de la plantilla
                                      interna
                                      utilizada.
            job_id_interno VARCHAR(15 Identificador Puede ser nulo.
                          0)          del proceso
                                      automatizado
                                      del correo
                                      interno.
            enviado_interno BOOL      Indica si el Valor por defecto: false.
                                      correo interno
                                      fue enviado.


### Tablas de la página


#### Tabla 1

| Nombre del<br>Campo | Tipo de Dato | Descripción | Reglas y Observaciones |
| --- | --- | --- | --- |
| id | INT | Identificador<br>único de la<br>instancia de<br>seguimiento. | Clave primaria (PK). Auto<br>incremental. |
| orden | INT | Orden de<br>ejecución<br>dentro del<br>seguimiento. | No puede ser nulo. Debe ser<br>único por notificación. |
| id_notificacion | INT | Notificación<br>programada<br>asociada. | Clave foránea (FK) hacia<br>NotificacionesProgramadas.<br>id. No puede ser nulo. |
| asunto_interno | VARCHAR(25<br>5) | Asunto del<br>correo interno<br>al<br>responsable. | No puede ser nulo. |
| cuerpo_interno | TEXT | Contenido del<br>correo<br>interno. | No puede ser nulo. |
| fecha_envio_inter<br>no | TIMESTAMP | Fecha<br>programada<br>para enviar el<br>correo<br>interno. | No puede ser nulo. |
| id_template_inter<br>no | INT | Identificador<br>de la plantilla<br>interna<br>utilizada. | Puede ser nulo. |
| job_id_interno | VARCHAR(15<br>0) | Identificador<br>del proceso<br>automatizado<br>del correo<br>interno. | Puede ser nulo. |
| enviado_interno | BOOL | Indica si el<br>correo interno<br>fue enviado. | Valor por defecto: false. |


---

## Página 153

            asunto_externo VARCHAR(25 Asunto del No puede ser nulo.
                          5)          correo
                                      dirigido al
                                      cliente.
            cuerpo_externo TEXT       Contenido del No puede ser nulo.
                                      correo
                                      dirigido al
                                      cliente.
            fecha_envio_exter TIMESTAMP Fecha    No puede ser nulo.
            no                        programada
                                      para enviar el
                                      correo al
                                      cliente.
            id_template_exter INT     Identificador Puede ser nulo.
            no                        de la plantilla
                                      externa
                                      utilizada.
            job_id_externo VARCHAR(15 Identificador Puede ser nulo.
                          0)          del proceso
                                      automatizado
                                      del correo
                                      externo.
            enviado_externo BOOL      Indica si el Valor por defecto: false.
                                      correo
                                      externo fue
                                      enviado.
            created_at    TIMESTAMP   Fecha de   Generado automáticamente
                                      creación del mediante now().
                                      registro.
            updated_at    TIMESTAMP   Fecha de   Actualizado automáticamente.
                                      actualización
                                      del registro.
          9. VOLUMEN ESTIMADO
                Requerimiento Funcional           Volumen Estimado
          RF-0001 – Inicio de sesión y autenticación Hasta 10 usuarios concurrentes durante
                                          horario laboral.
          RF-0002 – Gestión de usuarios   1 administrador encargado de la gestión de
                                          accesos y permisos.


### Tablas de la página


#### Tabla 1

| asunto_externo | VARCHAR(25<br>5) | Asunto del<br>correo<br>dirigido al<br>cliente. | No puede ser nulo. |
| --- | --- | --- | --- |
| cuerpo_externo | TEXT | Contenido del<br>correo<br>dirigido al<br>cliente. | No puede ser nulo. |
| fecha_envio_exter<br>no | TIMESTAMP | Fecha<br>programada<br>para enviar el<br>correo al<br>cliente. | No puede ser nulo. |
| id_template_exter<br>no | INT | Identificador<br>de la plantilla<br>externa<br>utilizada. | Puede ser nulo. |
| job_id_externo | VARCHAR(15<br>0) | Identificador<br>del proceso<br>automatizado<br>del correo<br>externo. | Puede ser nulo. |
| enviado_externo | BOOL | Indica si el<br>correo<br>externo fue<br>enviado. | Valor por defecto: false. |
| created_at | TIMESTAMP | Fecha de<br>creación del<br>registro. | Generado automáticamente<br>mediante now(). |
| updated_at | TIMESTAMP | Fecha de<br>actualización<br>del registro. | Actualizado automáticamente. |


#### Tabla 2

| Requerimiento Funcional | Volumen Estimado |
| --- | --- |
| RF-0001 – Inicio de sesión y autenticación | Hasta 10 usuarios concurrentes durante<br>horario laboral. |
| RF-0002 – Gestión de usuarios | 1 administrador encargado de la gestión de<br>accesos y permisos. |


---

## Página 154

          RF-0003 – Registro de organizaciones Aproximadamente 15–30 organizaciones
                                          registradas mensualmente.
          RF-0004 – Consulta automatizada SUNAT Hasta 20 consultas diarias de validación de
                                          RUC o razón social.
          RF-0005 – Registro de contactos Aproximadamente 50–100 contactos
                                          registrados mensualmente.
          RF-0007 – Gestión de leads      Entre 20 - 30 leads activos en seguimiento
                                          comercial mensual.
          RF-0010 – Gestión del pipeline  Actualización diaria del estado comercial de
                                          leads activos.
          RF-0011 – Registro de actividades Entre 5-10 actividades registradas
                                          diariamente.
          RF-0013 – Gestión de cotizaciones Aproximadamente 10-20 cotizaciones
                                          generadas mensualmente.
          RF-0016 – Visualización de notificaciones Hasta 9 usuarios visualizando alertas y
                                          seguimientos diariamente.
          RF-0018 – Búsqueda y filtrado   Consultas frecuentes realizadas por todos
                                          los usuarios operativos.
          RF-0019 – Exportación Excel     Hasta 5 exportaciones semanales
                                          realizadas por administración y gerencia.
          RF-0020 – Importación Excel     Hasta 3 cargas masivas mensuales de
                                          organizaciones o contactos.
          RF-0021 – Dashboard e indicadores Consultas diarias realizadas por gerencia y
                                          administración.
          RF-0029 – Integración Outlook y Teams Notificaciones automáticas generadas
                                          diariamente según actividades pendientes.


### Tablas de la página


#### Tabla 1

| RF-0003 – Registro de organizaciones | Aproximadamente 15–30 organizaciones<br>registradas mensualmente. |
| --- | --- |
| RF-0004 – Consulta automatizada SUNAT | Hasta 20 consultas diarias de validación de<br>RUC o razón social. |
| RF-0005 – Registro de contactos | Aproximadamente 50–100 contactos<br>registrados mensualmente. |
| RF-0007 – Gestión de leads | Entre 20 - 30 leads activos en seguimiento<br>comercial mensual. |
| RF-0010 – Gestión del pipeline | Actualización diaria del estado comercial de<br>leads activos. |
| RF-0011 – Registro de actividades | Entre 5-10 actividades registradas<br>diariamente. |
| RF-0013 – Gestión de cotizaciones | Aproximadamente 10-20 cotizaciones<br>generadas mensualmente. |
| RF-0016 – Visualización de notificaciones | Hasta 9 usuarios visualizando alertas y<br>seguimientos diariamente. |
| RF-0018 – Búsqueda y filtrado | Consultas frecuentes realizadas por todos<br>los usuarios operativos. |
| RF-0019 – Exportación Excel | Hasta 5 exportaciones semanales<br>realizadas por administración y gerencia. |
| RF-0020 – Importación Excel | Hasta 3 cargas masivas mensuales de<br>organizaciones o contactos. |
| RF-0021 – Dashboard e indicadores | Consultas diarias realizadas por gerencia y<br>administración. |
| RF-0029 – Integración Outlook y Teams | Notificaciones automáticas generadas<br>diariamente según actividades pendientes. |


---

## Página 155

          RF-0039 – Automatización de cierre con Actualización automática de estados
          venta                           comerciales ante aceptación de
                                          cotizaciones.
          10.  DISEÑO ARQUITECTÓNICO
            El sistema CRM BioActiva propuesto se diseña bajo una arquitectura de monolito
            modular orientada a servicios, desplegada sobre un entorno centralizado de
            producción.
            10.1. Vista Lógica
              La arquitectura lógica del sistema se basa en un modelo por capas, permitiendo
              desacoplar la interfaz de usuario, la lógica de negocio, los mecanismos de
              integración y la persistencia de datos.
              Componentes principales:
              ●  Capa de Presentación
                 ○  SPA (Single Page Application): Aplicación web desarrollada con Next.js
                    encargada de proporcionar una interfaz interactiva para los usuarios del
                    sistema. Esta capa gestiona la navegación, visualización de información
                    comercial, formularios de captura y operaciones relacionadas con el
                    pipeline de leads, contactos y organizaciones.
              ●  Capa de Aplicación y Lógica de Negocio
                 ○  Backend CRM BioActiva: Desarrollado con NestJS, constituye el núcleo
                    funcional del sistema. Implementa controladores REST para la exposición
                    de endpoints, servicios de negocio para la gestión comercial y módulos
                    encargados de:
                     ⧽ administración de organizaciones y contactos
                     ⧽ gestión del pipeline de leads
                     ⧽ seguimiento de interacciones
                     ⧽ automatización de procesos
                     ⧽ scoring de leads
                     ⧽ validaciones de negocio y control de acceso.
                     ⧽ Capa de Integración
                 ○  Microsoft Graph API: Servicio utilizado para la integración con el
                    ecosistema Microsoft 365, permitiendo la sincronización de calendarios,
                    reuniones y correos electrónicos asociados al seguimiento comercial.
                 ○  Azure AD App Registration: Mecanismo encargado de gestionar
                    autenticación, autorización y permisos necesarios para el acceso seguro a


### Tablas de la página


#### Tabla 1

| RF-0039 – Automatización de cierre con<br>venta | Actualización automática de estados<br>comerciales ante aceptación de<br>cotizaciones. |
| --- | --- |


---

## Página 156

                    los servicios de Microsoft.
                 ○  Integración SUNAT: Módulo de integración encargado de consultar
                    información de organizaciones mediante RUC o razón social, permitiendo
                    automatizar el registro y validación de datos empresariales.
              ●  Capa de Persistencia
                 ○  Base de Datos Relacional (PostgreSQL): Repositorio centralizado de
                    información encargado de almacenar entidades relacionadas con
                    organizaciones, contactos, leads, cotizaciones, usuarios y registros de
                    seguimiento, garantizando integridad referencial y consistencia
                    transaccional.
                 ○  Capa de Caché (Redis): Componente utilizado para optimizar consultas
                    frecuentes, almacenamiento temporal de sesiones y reducción de latencia
                    en operaciones recurrentes del sistema.
            10.2. Vista Física
              La infraestructura física del sistema contempla un entorno centralizado de ejecución
              sobre un servidor on-premise, donde se alojan los componentes principales del
              CRM BioActiva.
              Infraestructura propuesta
              ●  Servidor de Producción Centralizado: Entorno encargado de alojar la
                 aplicación frontend, el backend, los mecanismos de persistencia y los servicios
                 de caché requeridos por el sistema.
              ●  Acceso de Clientes Web: Los usuarios administrativos y operativos acceden
                 al sistema mediante navegador web desde equipos conectados a la red
                 institucional o internet.
              ●  Conectividad con Servicios Externos: El servidor de aplicación establece
                 comunicación con servicios externos de Microsoft 365 y SUNAT mediante
                 conexiones seguras sobre protocolos HTTP/HTTPS.administrativos y
                 operativos conectados a internet.
            10.3. Vista de Despliegue
              La estrategia de despliegue del sistema se basa en la contenerización de los
              componentes principales mediante Docker, permitiendo mantener consistencia
              entre entornos de desarrollo, pruebas y producción.
              Componentes de despliegue
              ●  Contenedor Frontend: Instancia encargada de ejecutar la aplicación web
                 desarrollada en Next.js y exponer la interfaz de usuario del sistema CRM
                 BioActiva.


---

## Página 157

              ●  Contenedor Backend: Servicio principal desarrollado en NestJS encargado de
                 la lógica de negocio, exposición de APIs REST, autenticación e integración con
                 servicios externos.
              ●  Contenedor de Base de Datos: Instancia PostgreSQL destinada al
                 almacenamiento persistente de la información comercial y operativa del
                 sistema.
              ●  Contenedor de Caché: Instancia Redis utilizada para optimización de
                 consultas frecuentes, almacenamiento temporal y reducción de latencia en
                 operaciones recurrentes.
              ●  Red Interna de Contenedores: Los servicios desplegados se comunican
                 mediante una red interna controlada, centralizando el acceso a persistencia,
                 caché e integraciones externas desde el backend del sistema.
            10.4. Vista de integración
              El sistema CRM BioActiva se plantea como una plataforma integrada orientada a
              centralizar la información comercial y reducir la dependencia de procesos manuales
              y repositorios dispersos.
              ●  Integración con Microsoft 365
                  ○ Protocolo: REST API mediante Microsoft Graph API.
                  ○ Funcionalidades integradas:
                     ⧽ sincronización de calendarios
                     ⧽ gestión de reuniones
                     ⧽ trazabilidad de correos electrónicos
                     ⧽ vinculación de interacciones comerciales con leads y contactos
                  ○ Seguridad:
                    La autenticación y autorización se gestionan mediante OAuth 2.0 y Azure
                    Active Directory, garantizando acceso seguro a los recursos corporativos.
              ●  Integración con SUNAT
                  ○ Protocolo: Extracción automatizada de datos (Web Scraping).
                  ○ Funcionalidad: Recuperación de información empresarial en tiempo real
                    directamente desde el portal de consultas de la SUNAT. El sistema
                    automatiza la navegación para obtener datos por RUC o razón social,
                    eliminando el registro manual y garantizando que la información sea
                    idéntica a la fuente oficial sin depender de intermediarios o APIs de
                    terceros.
              ●  Integración interna entre componentes
                 El frontend se comunica con el backend mediante APIs REST, mientras que el
                 backend centraliza el acceso a servicios externos, persistencia de datos y


---

## Página 158

                 mecanismos de caché, garantizando desacoplamiento funcional y control
                 centralizado de la lógica de negocio.
          11.  PROTOTIPO
                 Enlace del prototipo es: https://bioactiva.ingsoftware.lat/login
                 Cuenta admin demo es:
                      usuario : admin@bioactiva.local
                      contraseña: admin_local_123
          12.  ANEXO
            12.1. Diagrama del proceso
            12.2. Template de notificaciones


---

## Página 159


---

## Página 160
