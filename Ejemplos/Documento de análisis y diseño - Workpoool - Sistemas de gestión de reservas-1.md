# Documento de análisis y diseño - Workpoool - Sistemas de gestión de reservas-1

> Conversión automática a Markdown desde el PDF original. Las tablas se representan con sintaxis Markdown para conservar filas y columnas de forma interpretable por modelos de IA.

**Páginas:** 143


---

## Página 1

                                          Documento   de análisis y diseño
                                                Sistema de Reservas


---

## Página 2

                                     CONTENIDO
          1. ANTECEDENTES                                              6
          2. OBJETIVO GENERAL                                          6
          3. ALCANCE DE PROYECTO                                       7
          4. DISEÑO FUNCIONAL DETALLADO                                7
          5. DIAGRAMA DE PROCESO                                       12
          6. INTEGRACIÓN ENTRE LOS SISTEMAS                            14
          7. INTEROPERACIÓN CON SISTEMAS EXTERNOS VINCULADOS CON LA EMPRESA 14
          8. REGLAS DE NEGOCIO                                         16
          9. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL                      28
          10. MODELO DE DATOS                                         131
          11. DICCIONARIO DE DATOS                                    131
          12. VOLUMEN ESTIMADO                                        139
          13. DISEÑO ARQUITECTÓNICO                                   141
          14. PROTOTIPO                                               142
          15. ANEXO                                                   142


---

## Página 3

                           HISTORIAL DE REVISIONES DEL DOCUMENTO
           Número de Fecha de
                                      Autor          Resumen de cambios
           revisión  Revisión
             0.1    10/05/2026 Joaquin Adrian Lopez del Carpio Elaboración de la primera
                              Nayeli Belén Guerrero Gutierrez versión del Documento de
                               Carlos Enrique Angel Oriundo Análisis y Diseño.
                                 Gino Jesus Daza Yalta
                              Hanks Jean Pierce Vargas Iglesias
                               Enzo Joaquin Santillán Málaga
                               Yaritza Milagros López Rojas
                                 Andrea Loyola Guevara
                                Anyeli Azumi Tamara Ureta
             1.1    21/05/2026  Anyeli Azumi Tamara Ureta Modificación de la
                              Joaquin Adrian Lopez del Carpio arquitectura y nuevo caso de
                              Nayeli Belén Guerrero Gutierrez uso de consultas a catálogo
                                                   de espacios (CU-019) .
             1.2    22/05/2026  Anyeli Azumi Tamara Ureta Cambio de roles del equipo
                                                   del proyecto.
                                                   Se actualizó la distribución de
                                                   responsabilidades debido a
                                                   las demandas actuales del
                                                   proyecto. Anteriormente, los
                                                   roles asignados eran:
                                                   Joaquín López y Nayeli
                                                   Guerrero como analistas;
                                                   Carlos Ángel y Gino Daza
                                                   como testers; Yaritza López y
                                                   Andrea Loyola como
                                                   desarrolladoras frontend;
                                                   Hanks Vargas y Enzo
                                                   Santillán    como
                                                   desarrolladores backend. La
                                                   nueva asignación de roles se
                                                   encuentra detallada en el
                                                   documento.
             1.3    03/06/2026  Anyeli Azumi Tamara Ureta Se añadieron y modificaron
                                 Gino Jesús Daza Yalta reglas de negocio
                                                   relacionadas a gestión de
                                                   roles y permisos. Asimismo,
                                                   se modificó el tiempo de
                                                   expiración de la pre-reserva.
             1.4    10/06/2026  Anyeli Azumi Tamara Ureta Se modificaron los
                                                   requerimientos no funcionales
                                                   según los límites de
                                                   infraestructura tecnológica
                                                   identificados.
             1.5    12/06/2026  Anyeli Azumi Tamara Ureta Cambio de roles del equipo
                                                   del proyecto. Se actualizó la
                                                   distribución   de
                                                   responsabilidades debido a
                                                   las demandas actuales del
                                                   proyecto que implicaba la
                                                   revisión final del producto.


### Tablas de la página


#### Tabla 1

| Número de<br>revisión | Fecha de<br>Revisión | Autor | Resumen de cambios |
| --- | --- | --- | --- |
| 0.1 | 10/05/2026 | Joaquin Adrian Lopez del Carpio<br>Nayeli Belén Guerrero Gutierrez<br>Carlos Enrique Angel Oriundo<br>Gino Jesus Daza Yalta<br>Hanks Jean Pierce Vargas Iglesias<br>Enzo Joaquin Santillán Málaga<br>Yaritza Milagros López Rojas<br>Andrea Loyola Guevara<br>Anyeli Azumi Tamara Ureta | Elaboración de la primera<br>versión del Documento de<br>Análisis y Diseño. |
| 1.1 | 21/05/2026 | Anyeli Azumi Tamara Ureta<br>Joaquin Adrian Lopez del Carpio<br>Nayeli Belén Guerrero Gutierrez | Modificación de la<br>arquitectura y nuevo caso de<br>uso de consultas a catálogo<br>de espacios (CU-019) . |
| 1.2 | 22/05/2026 | Anyeli Azumi Tamara Ureta | Cambio de roles del equipo<br>del proyecto.<br>Se actualizó la distribución de<br>responsabilidades debido a<br>las demandas actuales del<br>proyecto. Anteriormente, los<br>roles asignados eran:<br>Joaquín López y Nayeli<br>Guerrero como analistas;<br>Carlos Ángel y Gino Daza<br>como testers; Yaritza López y<br>Andrea Loyola como<br>desarrolladoras frontend;<br>Hanks Vargas y Enzo<br>Santillán como<br>desarrolladores backend. La<br>nueva asignación de roles se<br>encuentra detallada en el<br>documento. |
| 1.3 | 03/06/2026 | Anyeli Azumi Tamara Ureta<br>Gino Jesús Daza Yalta | Se añadieron y modificaron<br>reglas de negocio<br>relacionadas a gestión de<br>roles y permisos. Asimismo,<br>se modificó el tiempo de<br>expiración de la pre-reserva. |
| 1.4 | 10/06/2026 | Anyeli Azumi Tamara Ureta | Se modificaron los<br>requerimientos no funcionales<br>según los límites de<br>infraestructura tecnológica<br>identificados. |
| 1.5 | 12/06/2026 | Anyeli Azumi Tamara Ureta | Cambio de roles del equipo<br>del proyecto. Se actualizó la<br>distribución de<br>responsabilidades debido a<br>las demandas actuales del<br>proyecto que implicaba la<br>revisión final del producto. |


---

## Página 4

                                                   Anteriormente, los roles
                                                   asignados eran: Joaquín
                                                   López como desarrollador
                                                   backend y Andrea Loyola
                                                   como desarrolladora frontend.
                                                   A partir de la fecha, ambos
                                                   integrantes cambian de rol a
                                                   analistas funcionales.
             1.6    17/06/2026  Anyeli Azumi Tamara Ureta Se actualizaron los casos de
                              Joaquin Adrian Lopez del Carpio uso, modelo de datos y
                                 Andrea Loyola Guevara diseño funcional del producto.
          Este documento ha sido revisado por:
                     Nombre                        Rol
           Teofilo Chambilla Aquino  TCH
           Anyeli Azumi Tamara Ureta Jefe de proyecto
           Joaquin Adrian Lopez Del Carpio Analista Funcional
           Nayeli Belén Guerrero Gutierrez Analista Funcional hasta el 22/05/2026
           Andrea Loyola Guevara     Analista funcional
          Aprobaciones:
          Este documento ha sido aprobado por:
                     Nombre                        Rol
           Anyeli Azumi Tamara Ureta Jefe de proyecto


### Tablas de la página


#### Tabla 1

|  |  |  | Anteriormente, los roles<br>asignados eran: Joaquín<br>López como desarrollador<br>backend y Andrea Loyola<br>como desarrolladora frontend.<br>A partir de la fecha, ambos<br>integrantes cambian de rol a<br>analistas funcionales. |
| --- | --- | --- | --- |
| 1.6 | 17/06/2026 | Anyeli Azumi Tamara Ureta<br>Joaquin Adrian Lopez del Carpio<br>Andrea Loyola Guevara | Se actualizaron los casos de<br>uso, modelo de datos y<br>diseño funcional del producto. |


#### Tabla 2

| Nombre | Rol |
| --- | --- |
| Teofilo Chambilla Aquino | TCH |
| Anyeli Azumi Tamara Ureta | Jefe de proyecto |
| Joaquin Adrian Lopez Del Carpio | Analista Funcional |
| Nayeli Belén Guerrero Gutierrez | Analista Funcional hasta el 22/05/2026 |
| Andrea Loyola Guevara | Analista funcional |


#### Tabla 3

| Nombre | Rol |
| --- | --- |
| Anyeli Azumi Tamara Ureta | Jefe de proyecto |


---

## Página 5

                                   GLOSARIO DE TÉRMINOS
            -  Openpay: Pasarela de pagos seleccionada para procesar las transacciones económicas asociadas a
               las reservas del sistema.
            -  Credenciales: Datos utilizados para acceder al sistema, generalmente correo electrónico y contraseña.
            -  Token de verificación: Código o identificador temporal utilizado para validar procesos como el registro
               de usuario o la recuperación de contraseña.
            -  Módulo: Conjunto de funcionalidades relacionadas dentro del sistema, como seguridad, catálogo,
               reservas, pagos o administración.
            -  Regla de negocio: Condición o criterio operativo que define cómo debe comportarse el sistema ante
               determinados procesos o situaciones.
            -  Requerimiento funcional: Funcionalidad que el sistema debe cumplir para atender una necesidad del
               usuario o del negocio.
            -  Requerimiento no funcional: Condición de calidad, seguridad, rendimiento o tecnología que debe
               cumplir el sistema.
            -  Caso de uso: Descripción de una interacción entre un actor y el sistema para lograr un objetivo
               específico.
            -  Base de datos: Componente encargado de almacenar de forma estructurada la información del
               sistema, como usuarios, espacios, reservas y pagos.
            -  PostgreSQL: Sistema gestor de base de datos seleccionado para almacenar y administrar la
               información del sistema.
            -  Frontend: Parte visual del sistema con la que interactúan los usuarios.
            -  Backend: Parte interna del sistema encargada de procesar la lógica de negocio, gestionar datos y
               exponer servicios.
            -  API REST: Mecanismo de comunicación que permite al frontend interactuar con el backend mediante
               solicitudes y respuestas estructuradas.
            -  Arquitectura monolítica: Modelo de arquitectura donde las principales funcionalidades del backend se
               implementan dentro de una sola aplicación.
            -  HTTPS: Protocolo seguro utilizado para proteger la comunicación entre el usuario, el frontend, el
               backend y los servicios externos.
            -  SMTP: Protocolo utilizado para el envío de correos electrónicos, como confirmaciones, notificaciones o
               recuperación de contraseña.
            -  Webhook: Mecanismo que permite recibir automáticamente respuestas de servicios externos, como la
               pasarela de pagos, para actualizar el estado del sistema.
            -  Wally: Sistema utilizado por Workpool para la emisión de comprobantes de pago, cuya integración
               directa no forma parte del alcance inicial del MVP.
            -  Landing page: Página web institucional de Workpool con finalidad informativa y comercial,
               independiente del sistema de reservas.
            -  WordPress: Gestor de contenidos usado en la página web institucional de Workpool.
            -  Trazabilidad: Capacidad del sistema para registrar y seguir el historial de acciones, reservas, pagos y
               cambios realizados.
            -  Uptime: Porcentaje de tiempo en el que el sistema se mantiene disponible y operativo.
            -  Bcrypt: Algoritmo utilizado para almacenar contraseñas de forma segura mediante encriptación.
            -  Transacción ACID: Conjunto de propiedades que garantizan que una operación en base de datos sea
               atómica, consistente, aislada y durable.


---

## Página 6

           1.  ANTECEDENTES
               Workpool es una empresa dedicada al alquiler de oficinas privadas, espacios de coworking y salas de
               reuniones para profesionales, emprendedores y empresas que requieren ambientes de trabajo flexibles
               y funcionales.
               Actualmente, la gestión de reservas se realiza principalmente mediante WhatsApp y hojas de cálculo
               en Excel. Este proceso manual dificulta la consulta de disponibilidad en tiempo real, incrementa el
               riesgo de cruces de horarios y limita el seguimiento ordenado de clientes, solicitudes, cotizaciones y
               estados de reserva.
               Para atender esta necesidad, se plantea desarrollar un Sistema de Gestión de Reservas que permita
               centralizar la disponibilidad de espacios, registrar clientes y solicitudes, gestionar cotizaciones y apoyar
               la confirmación digital de reservas, contribuyendo a una gestión más eficiente, organizada y trazable
               para la empresa.
           2.  OBJETIVO GENERAL
               Diseñar, desarrollar e implementar, durante el periodo de ejecución del proyecto, un Sistema de
               Gestión de Reservas (MVP) para Workpool que centralice la disponibilidad de espacios, el registro de
               clientes y el flujo de reservas, con el fin de reducir los errores operativos asociados al proceso manual
               de reservas, evitar cruces de horarios y mejorar la eficiencia administrativa y la experiencia del cliente.
           3.  ALCANCE DE PROYECTO
               El alcance del proyecto comprende el análisis, diseño, desarrollo e implementación de un Sistema de
               Gestión de Reservas en versión MVP para Workpool, orientado a centralizar la disponibilidad de
               espacios, el registro de clientes, la gestión de solicitudes de reserva, la generación de cotizaciones y la
               confirmación digital mediante una pasarela de pago.
               El sistema incluirá los módulos de seguridad y acceso, catálogo de espacios, gestión de usuarios,
               reportes, reservas y cotizaciones, y pagos. A través de estos módulos, los usuarios podrán consultar la
               disponibilidad de ambientes, generar reservas, completar sus datos, realizar el pago correspondiente y
               visualizar el estado de su reserva. Por su parte, el administrador podrá gestionar espacios, usuarios,
               reservas, disponibilidad, reportes de desempeño y estados asociados al proceso.
               Quedan fuera del alcance del proyecto la emisión de comprobantes de pago o facturación electrónica,
               la gestión automática de devoluciones y la validación física de identidad para el ingreso a los espacios,
               ya que estos procesos serán gestionados externamente por Workpool según sus procedimientos
               actuales.
           4.  DISEÑO FUNCIONAL DETALLADO
               El diseño funcional del sistema se organiza en módulos, cada uno asociado a un conjunto de
               funcionalidades específicas que permiten cubrir el flujo completo de atención: desde el registro del
               usuario y la consulta de espacios disponibles, hasta la generación de una pre-reserva, el pago, la
               confirmación y el seguimiento posterior de la reserva.
               4.1. Módulo de Seguridad y Acceso
                    Este módulo tiene como finalidad controlar el ingreso seguro de usuarios y administradores al
                    sistema, así como proteger la información registrada en la plataforma.


---

## Página 7

                      -  Visualización de la pantalla de inicio de sesión para acceder al sistema de Workpool.
                      -  Inicio de sesión mediante correo electrónico y contraseña.
                      -  Opción para mostrar u ocultar la contraseña ingresada.
                      -  Acceso a la recuperación de contraseña mediante la opción “¿Olvidaste tu
                         contraseña?”.
                      -  Acceso al formulario de registro para usuarios que aún no tienen cuenta.
                      -  Visualización de una sección informativa en las pantallas de login y registro,
                         destacando beneficios como acceso 24/7, wifi de alta velocidad, reservas flexibles y
                         comunidad segura.
                      -  Registro de nuevos usuarios mediante un formulario con nombres, apellidos, DNI,
                         teléfono, correo electrónico, contraseña y confirmación de contraseña.
                      -  Validación de requisitos de contraseña antes de completar el registro.
                      -  Aceptación de términos y condiciones de uso antes de crear la cuenta.
                      -  Creación de cuenta para que el usuario pueda acceder a reservas, disponibilidad de
                         espacios y gestión de su perfil.
                      -  Asignación inicial de rol al usuario registrado, generalmente como cliente.
                      -  Visualización del panel de gestión de usuarios, orientado a administrar las cuentas
                         registradas en el sistema.
                      -  Visualización de indicadores generales, como usuarios activos, administradores
                         activos y total de roles existentes.
                      -  Listado de usuarios registrados con información resumida, incluyendo nombre, correo
                         electrónico, rol asignado, estado de cuenta y acciones disponibles.
                      -  Búsqueda de usuarios por nombre, correo electrónico, DNI o teléfono.
                      -  Visualización del estado de cada usuario, como activo o sin verificar.
                      -  Visualización del rol asignado a cada usuario, como cliente, gestor de usuarios o
                         superadministrador.
                      -  Acceso al detalle de un usuario específico, mostrando rol, estado, correo electrónico,
                         teléfono, DNI y fecha de creación de la cuenta.
                      -  Modificación del rol asignado a un usuario mediante una ventana de cambio de rol.
                      -  Selección de roles disponibles para asignar nuevos permisos o responsabilidades a
                         una cuenta.
                      -  Gestión de roles desde una vista administrativa centralizada.
                      -  Visualización de permisos agrupados por categoría, como gestión de usuarios,
                         gestión de espacios, gestión de reservas y análisis.
                      -  Visualización del estado de cada permiso, diferenciando entre permisos activos e
                         inactivos.
                      -  Activación o desactivación de permisos asociados a un rol.
                      -  Creación de nuevos roles personalizados por parte del administrador.
                      -  Registro del nombre del nuevo rol y selección de permisos correspondientes.
                      -  Eliminación de roles existentes cuando corresponda.
                      -  Guardado de cambios realizados en la configuración de permisos de un rol.
                      -  Control de acceso a funcionalidades del sistema según el rol y los permisos
                         asignados.
                      -  Administración centralizada de autenticación, usuarios, roles, estados y permisos
                         para mantener la seguridad y organización del sistema.


---

## Página 8

               4.2. Módulo de Catálogo de Espacios
                    Este módulo permite visualizar y administrar la información de los espacios ofrecidos por
                    Workpool, facilitando la consulta de oficinas, salas y espacios de coworking disponibles.
                      -  Visualización del panel de gestión de espacios, orientado a administrar oficinas, salas
                         de reuniones y ambientes disponibles en el catálogo de Workpool.
                      -  Visualización de indicadores generales del catálogo, como total de espacios,
                         espacios activos, capacidad total y tipos de salas registrados.
                      -  Listado de espacios registrados con información resumida, incluyendo imagen,
                         nombre, descripción, tipo de espacio, capacidad y estado.
                      -  Búsqueda de espacios mediante texto para ubicar rápidamente un ambiente
                         específico.
                      -  Filtro de espacios según su estado, como habilitados o deshabilitados.
                      -  Registro de nuevos espacios por parte del administrador.
                      -  Edición de espacios existentes, permitiendo actualizar nombre, capacidad, categoría
                         o tipo, descripción y condiciones de uso.
                      -  Gestión de galería de fotos del espacio, incluyendo la selección de imagen de
                         portada.
                      -  Visualización del detalle de cada espacio, incluyendo descripción, capacidad, tipo de
                         espacio, condiciones de uso y estado dentro del catálogo.
                      -  Habilitación o deshabilitación de espacios para controlar si se muestran o no como
                         disponibles dentro del catálogo.
                      -  Gestión de tarifas y planes asociados a los espacios.
                      -  Registro de nuevos planes tarifarios según tipo de sala, duración y precio por hora.
                      -  Visualización de planes registrados, incluyendo estado, duración, precio por hora,
                         costo total y categoría asociada.
                      -  Edición, inhabilitación o eliminación de planes tarifarios según corresponda.
                      -  Gestión de categorías o tipos de espacio, como salas de reuniones, oficinas u otros
                         ambientes configurados por el administrador.
                      -  Registro de nuevas categorías para clasificar los espacios del catálogo.
                      -  Visualización de categorías registradas junto con su estado.
                      -  Edición, deshabilitación o eliminación de categorías existentes.
                      -  Gestión de bloqueos administrativos por espacio para registrar periodos de
                         inactividad, cierres técnicos, mantenimiento o reservas externas corporativas.
                      -  Registro de bloqueos indicando fecha y hora de inicio, fecha y hora de fin, y motivo
                         del bloqueo.
                      -  Visualización del historial de bloqueos de cada espacio, con filtros según el estado
                         del bloqueo.
                      -  Administración de la información base necesaria para que los espacios puedan ser
                         utilizados posteriormente en los procesos de reserva y cotización.
                      -  Mantenimiento del catálogo actualizado para asegurar que los usuarios visualicen
                         espacios, categorías y tarifas vigentes.
               4.3. Módulo de Paneles y Perfil de Usuario
                    Este módulo permite que los usuarios gestionen su información personal y realicen
                    seguimiento a sus reservas. Asimismo, brinda a los administradores una vista general para
                    supervisar la operación del sistema.


---

## Página 9

                      -  Visualización del perfil personal del usuario con los datos registrados en el sistema.
                      -  Modificación de información personal del usuario, como nombres, apellidos y teléfono
                         móvil, manteniendo el correo electrónico como dato no editable.
                      -  Visualización diferenciada del perfil según el rol del usuario, considerando cuentas
                         cliente y cuentas administrativas.
                      -  Restricción de edición para cuentas especiales, como el superadministrador, cuando
                         corresponda según las reglas del sistema.
                      -  Dashboard personal para que el cliente consulte sus reservas de la semana y el
                         estado actual de cada una.
                      -  Visualización rápida de reservas activas, incluyendo sala, fecha, horario, invitados y
                         estacionamiento.
                      -  Acceso del cliente a la opción de crear una nueva reserva desde su panel principal.
                      -  Visualización del historial de reservas del cliente, incluyendo reservas confirmadas,
                         canceladas y reprogramadas.
                      -  Filtros en el historial de reservas por estado, rango de fechas y sala, facilitando la
                         búsqueda de registros específicos.
                      -  Visualización del detalle resumido de cada reserva, considerando espacio, fecha,
                         horario, cantidad de invitados, monto total y estado.
                      -  Panel administrativo para que los administradores visualicen información general del
                         sistema.
                      -  Visualización de indicadores administrativos como cantidad de usuarios, oficinas
                         activas, tipos de oficina, roles y permisos habilitados.
                      -  Visualización de los últimos usuarios registrados, incluyendo estado de cuenta, rol y
                         tiempo de registro.
                      -  Accesos rápidos para acciones administrativas como crear reserva, crear oficina,
                         configurar roles y permisos, y descargar reportes.
                      -  Visualización de oficinas por tipo y capacidad agregada, permitiendo conocer la
                         disponibilidad general de espacios.
                      -  Vista administrativa de todas las reservas registradas en el sistema.
                      -  Filtros administrativos para consultar reservas por estado, fecha, tipo de sala y
                         representante.
                      -  Visualización de reservas con información como sala, representante, fecha, horario,
                         invitados, placas, total, estado y acciones disponibles.
                      -  Gestión administrativa de reservas, incluyendo acciones como cancelación o revisión
                         de reservas según su estado.
                      -  Panel de reportes administrativos para analizar el rendimiento financiero y operativo
                         del sistema.
                      -  Consulta de indicadores como ingresos generados, horas de ocupación y reservas
                         confirmadas dentro de un rango de fechas.
                      -  Visualización de reportes de ingresos mensuales, usuarios más activos, ocupación
                         por espacio e historial de accesos.
                      -  Filtros en reportes por tipo de reporte, oficina, estado de reserva y canal de atención.
                      -  Exportación de reportes en formatos PDF y CSV para respaldo, análisis o
                         presentación administrativa.
               4.4. Módulo de Reservas y Cotizaciones


---

## Página 10

                    Este módulo constituye el núcleo funcional del sistema, ya que permite gestionar el flujo de
                    reserva desde la selección del espacio hasta la generación de la cotización correspondiente.
                      -  Visualización de los espacios disponibles para realizar una reserva.
                      -  Selección de sala u oficina según la disponibilidad registrada en el sistema.
                      -  Visualización del detalle de cada espacio, incluyendo nombre, tipo de sala,
                         capacidad, descripción, imagen y planes disponibles.
                      -  Consulta de disponibilidad mediante un calendario de horarios por días y horas.
                      -  Diferenciación visual de horarios disponibles, seleccionados, pasados y ocupados.
                      -  Selección del horario de reserva mediante clic o arrastre dentro del calendario.
                      -  Visualización del resumen previo de la reserva, incluyendo espacio, fecha, horario y
                         duración.
                      -  Cálculo del precio estimado de la reserva según el espacio, duración y plan
                         seleccionado.
                      -  Visualización del monto estimado en soles y su equivalente en dólares, cuando
                         corresponda.
                      -  Registro de datos del representante de la reserva, como nombres, apellidos y DNI.
                      -  Registro de la cantidad de personas que asistirán a la reserva, respetando la
                         capacidad máxima del espacio.
                      -  Registro opcional de estacionamientos solicitados por el usuario.
                      -  Registro obligatorio de placas vehiculares cuando se solicita estacionamiento.
                      -  Registro de invitados adicionales, incluyendo nombres, apellidos y DNI.
                      -  Generación de una pre-reserva con la información seleccionada antes de pasar al
                         proceso de pago.
                      -  Visualización de las reservas del usuario organizadas como próximas reservas y
                         reservas futuras.
                      -  Visualización del estado de cada reserva, como confirmada, expirada, cancelada o
                         reprogramada.
                      -  Solicitud de reprogramación de una reserva por parte del usuario.
                      -  Visualización del estado de las solicitudes de reprogramación, como aprobada o
                         rechazada.
                      -  Gestión administrativa de todas las reservas registradas en el sistema.
                      -  Filtros administrativos para buscar reservas por estado, fecha, tipo de sala y
                         representante.
                      -  Cancelación de reservas desde la vista administrativa, cuando el estado de la reserva
                         lo permita.
                      -  Registro de reservas manuales por parte del administrador, considerando datos del
                         espacio, representante, invitados y estacionamiento.
                      -  Gestión administrativa de solicitudes de reprogramación enviadas por los clientes.
                      -  Aprobación o rechazo de solicitudes de reprogramación por parte del administrador.
                      -  Asignación de nuevo espacio y horario al aprobar una solicitud de reprogramación.
                      -  Visualización del detalle de una reserva específica, incluyendo espacio, fecha,
                         horario, invitados, placas, estado y datos generales de la reserva.
               4.5. Módulo de Pagos


---

## Página 11

                    Este módulo permite completar la confirmación económica de la reserva mediante una
                    pasarela de pago segura, manteniendo visible el estado de la transacción para el usuario y el
                    administrador.
                      -  Integración con una pasarela de pago segura para procesar la transacción
                         correspondiente a la reserva.
                      -  Procesamiento del pago según el monto calculado para la reserva.
                      -  Visualización del monto a pagar antes de confirmar la transacción.
                      -  Visualización del estado del pago: pendiente, exitoso, fallido o expirado.
                      -  Confirmación automática de la reserva cuando el pago sea procesado correctamente.
                      -  Actualización automática del estado de la reserva en caso de pago exitoso, fallido o
                         expirado.
                      -  Emisión de mensajes de error cuando la transacción no pueda completarse.
                      -  Visualización de una pantalla de reserva confirmada luego de un pago exitoso.
                      -  Visualización del comprobante de pago, incluyendo número de operación, monto
                         pagado, sala, fecha y horario.
                      -  Registro del método de pago utilizado por el usuario.
                      -  Registro del resultado de la transacción para mantener la trazabilidad del proceso.
                      -  Asociación de la transacción con el identificador de la reserva correspondiente.
                      -  Envío de correo de confirmación de pago al usuario.
                      -  Gestión de pagos por cobro externo o cortesía en reservas manuales registradas por
                         el administrador, cuando corresponda.
           5.  DIAGRAMA DE PROCESO
               5.1. Diagrama del proceso actual (AS-IS)


---

## Página 12

                    Nota: Elaboración propia con base en el proceso actual de reservas de Workpool. El diagrama se
               presenta en el Anexo C.
               5.2. Problemas identificados
                    A partir del análisis del proceso actual de gestión de reservas de Workpool, se identificó que el
                    flujo presenta una alta dependencia de actividades manuales y canales no centralizados,
                    como WhatsApp, correo electrónico, formularios web y archivos Excel. Actualmente, el cliente
                    puede llegar por la web, Google, referido o directamente por WhatsApp, lo que genera
                    diferentes puntos de entrada sin un control único del proceso. Además, la validación de
                    disponibilidad, la generación de cotizaciones, la coordinación con el cliente, la confirmación
                    del pago y el registro de la reserva dependen principalmente del administrador. Esta situación
                    incrementa la carga operativa, genera riesgo de errores en la disponibilidad de espacios,
                    dificulta el seguimiento del estado de cada reserva y puede ocasionar demoras en la atención.
                    Asimismo, el uso de vouchers enviados por correo y el registro manual en Excel limitan la
                    trazabilidad del proceso y reducen la eficiencia en la confirmación de reservas.
               5.3. Diagrama del proceso propuesto (TO-BE)


---

## Página 13

               5.4. Brechas identificadas
                    Las principales brechas se evidencian al comparar el proceso actual con el proceso
                    propuesto. En el AS-IS, la disponibilidad de espacios se valida manualmente en Excel,
                    mientras que en el TO-BE se plantea que el sistema valide automáticamente los horarios
                    disponibles mediante un calendario digital. Asimismo, la generación de cotizaciones y la
                    coordinación con el cliente para las reservas se realizan actualmente por WhatsApp o correo,


---

## Página 14

                    mientras que el sistema propuesto busca centralizar el flujo desde una plataforma web.
                    También existe una brecha en la gestión de pagos, ya que actualmente el cliente realiza un
                    pago adelantado y envía el voucher por correo, mientras que el TO-BE considera una pasarela
                    de pagos que confirme o libere la reserva de forma automática. Finalmente, se identifica una
                    brecha en la trazabilidad y control de la información, debido a que las reservas se registran en
                    Excel, mientras que el sistema propuesto requiere registrar la información en una base de
                    datos centralizada, enviar confirmaciones automáticas y permitir la gestión ordenada de
                    reprogramaciones.
           6.  INTEGRACIÓN ENTRE LOS SISTEMAS
               La integración entre los sistemas permite que la información registrada en un módulo sea utilizada por
               los demás de forma coherente, evitando duplicidad de datos, inconsistencias en la disponibilidad de
               espacios y errores durante el proceso de reserva.
               En primer lugar, el Módulo de Seguridad y Acceso se integra con todos los módulos del sistema, ya que
               valida la identidad del usuario y determina las acciones que puede realizar según su rol. De esta
               manera, los usuarios podrán acceder únicamente a las funcionalidades permitidas, mientras que los
               administradores tendrán acceso a opciones de gestión, supervisión y configuración del sistema.
               El Módulo de Catálogo de Espacios se integra con el Módulo de Reservas y Cotizaciones, debido a que
               toda reserva depende de la disponibilidad real de los espacios registrados. Cuando un usuario consulta
               una oficina, sala de reuniones o espacio de coworking, el sistema debe mostrar información actualizada
               sobre capacidad, horarios, estado del espacio y disponibilidad. A partir de esta información, el usuario
               podrá seleccionar un horario disponible e iniciar el proceso de pre-reserva.
               Asimismo, el Módulo de Reservas y Cotizaciones se integra con el Módulo de Pagos, ya que la
               confirmación final de una reserva dependerá del resultado de la transacción económica. Una vez que el
               usuario genera una pre-reserva y completa los datos requeridos, el sistema debe enviar la información
               necesaria al módulo de pagos para iniciar el proceso de cobro. Si el pago es exitoso, la reserva será
               confirmada automáticamente; si el pago falla o expira, el sistema deberá actualizar el estado de la
               reserva y liberar el horario según las reglas establecidas.
               El Módulo de Paneles y Perfil de Usuario se integra con los módulos de reservas, catálogo y pagos,
               permitiendo que tanto el usuario como el administrador visualicen información actualizada. El usuario
               podrá consultar sus reservas activas, pasadas, canceladas o pendientes, mientras que el administrador
               podrá supervisar todas las reservas del sistema, revisar el historial por cliente o espacio, bloquear
               horarios por mantenimiento, cancelar reservas o realizar reprogramaciones cuando sea necesario.
               Finalmente, la integración entre los módulos permite mantener un flujo funcional continuo desde el
               inicio de sesión hasta la confirmación de la reserva. El sistema deberá asegurar que los cambios
               realizados en un módulo se reflejan automáticamente en los demás, garantizando trazabilidad,
               disponibilidad en tiempo real, consistencia de la información y una mejor experiencia tanto para los
               clientes como para el personal administrativo de Workpool.
           7.  INTEROPERACIÓN CON SISTEMAS EXTERNOS VINCULADOS CON LA EMPRESA
               7.1. Pasarela de pagos
                    Para el proceso de pago de reservas, se evaluaron distintas alternativas de pasarelas de
                    pago. Inicialmente, se consideró el uso de Mercado Pago; sin embargo, esta opción no resultó


---

## Página 15

                    viable para las necesidades del proyecto. Posteriormente, se analizó PagoEfectivo, pero fue
                    descartado debido a que sus costos no se ajustaban convenientemente al alcance y
                    condiciones del proyecto.
                    Finalmente, se optó por utilizar la pasarela de pagos Openpay, respetando los términos,
                    condiciones y acuerdos que se establezcan con la administración de Workpool para el registro
                    de la empresa y la habilitación del servicio. Esta pasarela será utilizada para procesar las
                    transacciones económicas asociadas a las reservas realizadas por los usuarios dentro del
                    sistema, debido a que cuenta con suscripción y comisiones accesibles que se contemplan
                    dentro de los precios
                    El Sistema de Gestión de Reservas deberá enviar a la pasarela la información necesaria de la
                    pre-reserva, como el monto, identificador de la reserva y datos básicos requeridos para iniciar
                    la transacción. Una vez realizado el pago, la pasarela deberá devolver una respuesta que
                    permita al sistema identificar el estado de la operación.
                    En función de dicha respuesta, el sistema actualizará automáticamente el estado de la
                    reserva. Si el pago es exitoso, la reserva será confirmada. Si el pago es fallido, pendiente o
                    expirado, el sistema deberá mostrar el estado correspondiente al usuario y aplicar las reglas
                    definidas para la liberación o mantenimiento temporal del horario seleccionado.
                    La implementación definitiva de esta pasarela estará sujeta a la disponibilidad de
                    credenciales, documentación técnica, validación de la empresa y cumplimiento de los
                    requisitos administrativos solicitados por el proveedor del servicio.
               7.2. Sistema Wally
                    Workpool utiliza actualmente el sistema Wally para la emisión de comprobantes de pago y
                    otros procesos relacionados con la facturación. Sin embargo, dentro del alcance inicial del
                    presente MVP, no se contempla una integración directa entre el Sistema de Gestión de
                    Reservas y Wally.
                    Esta decisión se toma debido a que la emisión de boletas, facturas u otros comprobantes
                    seguirá siendo gestionada manualmente por la empresa mediante su procedimiento actual.
                    Además, integrar directamente el sistema con Wally implicaría ingresar a un proceso
                    administrativo y técnico más complejo, lo cual excede el alcance definido para esta etapa del
                    proyecto.
                    No obstante, el Sistema de Gestión de Reservas sí deberá registrar y mostrar la información
                    necesaria para que el personal administrativo de Workpool pueda emitir los comprobantes de
                    manera manual en Wally. Entre estos datos se podrán considerar la información del cliente,
                    datos de la reserva, espacio reservado, fecha, horario, monto pagado y estado de la
                    transacción.
                    De esta manera, aunque no exista una conexión automática con Wally, el sistema brindará
                    información organizada y trazable que facilitará el trabajo administrativo de la empresa al
                    momento de emitir sus facturas o boletas.
               7.3. Canales externos de comunicación


---

## Página 16

                    El sistema también se relaciona con canales externos de comunicación utilizados por
                    Workpool para atender consultas, coordinaciones u otras gestiones vinculadas a las reservas.
                    En el caso del correo electrónico, el sistema podrá utilizarlo para enviar notificaciones
                    automáticas relacionadas con el registro de usuario, recuperación de contraseña y estados de
                    la reserva. Esto permitirá mantener informado al usuario durante las principales etapas del
                    proceso.
                    Asimismo, se incorporará un botón de redirección hacia WhatsApp para aquellas gestiones
                    que requieran atención directa por parte de Workpool. Este botón permitirá que el usuario
                    pueda comunicarse con la empresa para consultas adicionales, coordinaciones especiales u
                    otros casos que no formen parte del flujo automatizado principal del sistema.
                    Sin embargo, el objetivo del sistema será reducir la dependencia de WhatsApp como medio
                    principal para gestionar reservas. La consulta de disponibilidad, el registro de datos, la
                    generación de pre-reservas, el pago y la confirmación deberán realizarse principalmente
                    desde la plataforma web.
               7.4. Página web institucional de Workpool
                    Workpool cuenta actualmente con una página web institucional que tiene finalidad
                    principalmente informativa y comercial, ya que presenta los servicios, espacios, datos de
                    contacto y propuesta de valor de la empresa.
                    Para el alcance del presente MVP, no se contempla una conexión técnica directa con la
                    landing page actual de Workpool, debido a que fue desarrollada por un proveedor externo y se
                    encuentra en WordPress. Por ello, el Sistema de Gestión de Reservas funcionará como una
                    plataforma independiente, sin integrarse con la base de datos, estructura interna o gestor de
                    contenidos de la página web.
                    No obstante, en una siguiente etapa la página institucional podrá redirigir a los usuarios hacia
                    el sistema de reservas mediante un enlace o botón, siempre que Workpool lo considere
                    conveniente. De esta manera, la landing page seguirá cumpliendo su función comercial,
                    mientras que el sistema desarrollado se encargará específicamente de la gestión de reservas.
           8.  REGLAS DE NEGOCIO
          N°       Nombre de la Regla Detalle de la Regla
          RN-001   Límites de Autenticación y El sistema permitirá un máximo de cinco (5) intentos fallidos
                   Bloqueos         consecutivos de inicio de sesión. Al superar este límite, la
                                    cuenta quedará bloqueada temporalmente por un periodo
                                    exacto de tres (3) minutos, durante el cual no se evaluará
                                    ninguna credencial.
          RN-002   Tiempo de Gracia para Cuando un usuario selecciona un horario, este se bloquea
                   Pre-reservas     temporalmente con una vigencia máxima de diez (10) minutos.
                                    Si el pago no se confirma dentro de este lapso, el horario se
                                    libera automáticamente.


### Tablas de la página


#### Tabla 1

| N° | Nombre de la Regla | Detalle de la Regla |
| --- | --- | --- |
| RN-001 | Límites de Autenticación y<br>Bloqueos | El sistema permitirá un máximo de cinco (5) intentos fallidos<br>consecutivos de inicio de sesión. Al superar este límite, la<br>cuenta quedará bloqueada temporalmente por un periodo<br>exacto de tres (3) minutos, durante el cual no se evaluará<br>ninguna credencial. |
| RN-002 | Tiempo de Gracia para<br>Pre-reservas | Cuando un usuario selecciona un horario, este se bloquea<br>temporalmente con una vigencia máxima de diez (10) minutos.<br>Si el pago no se confirma dentro de este lapso, el horario se<br>libera automáticamente. |


---

## Página 17

          RN-003   Lógica de Cotización El costo total de una reserva se calcula usando el precio por
                   Dinámica         hora del plan de precios que cubra la mayor cantidad de horas
                                    sin exceder el tiempo total solicitado. El cálculo es un producto
                                    entre el precio por hora seleccionado y la cantidad de horas que
                                    se quieren reservar.
          RN-004   Requisitos de Información Para considerar válida una solicitud de reserva, el cliente debe
                   para la Reserva  registrar obligatoriamente: el tipo de sala, horario, y datos del
                                    representante (nombres, apellidos y DNI). El registro de
                                    vehículos (placas, máximo 2) e invitados es opcional, pero debe
                                    realizarse antes de emitir el pago si se desean incluir.
          RN-005   Modificación  de El usuario podrá visualizar y modificar su información personal
                   información personal desde su cuenta, siempre que los datos actualizados cumplan
                                    con los formatos y validaciones definidos por el sistema. Los
                                    cambios no deberán alterar información histórica asociada a
                                    reservas ya confirmadas.
          RN-006   Política de Cancelación y Las reservas solo pueden ser canceladas por un Administrador
                   Reembolso        desde el panel administrativo. El cliente no puede cancelar su
                                    propia reserva desde el sistema, debe comunicarse vía
                                    WhatsApp el administrador evaluará el caso y realizará la
                                    acción correspondiente manualmente en el sistema. Una vez
                                    cancelado, se libera el horario inmediatamente para el público.
                                    No existen devoluciones ni reembolsos monetarios automáticos
                                    a través de la plataforma por reservas canceladas.
          RN-007   Expiración y Persistencia Toda sesión de usuario, activa o inactiva, tendrá una vigencia
                   de Sesiones      máxima de veinticuatro (24) horas desde su inicio. Al cumplirse
                                    este periodo, el sistema invalidará automáticamente la sesión y
                                    solicitará al usuario iniciar sesión nuevamente para continuar
                                    accediendo a las funcionalidades protegidas.
          RN-008   Asignación de Roles por Todo usuario nuevo registrado desde la página pública recibirá
                   Defecto          automáticamente el rol de "Cliente". Únicamente un
                                    "Administrador Principal" tiene la potestad de elevar los
                                    privilegios de una cuenta a "Administrador" o revocar dichos
                                    accesos.
          RN-009   Creación      de El Administrador Principal puede elevar el rol de cualquier
                   administradores  usuario registrado en el sistema al rol de Administrador desde el
                                    panel administrativo, sin necesidad de un proceso de registro
                                    separado.
          RN-010   Gestión de Reservas Las reservas creadas manualmente por un administrador no
                   Manuales (Administrador) pasarán por el proceso de validación de pago digital ni
                                    pre-reserva de 10 minutos. Ingresan directamente al sistema
                                    como "Confirmadas", asumiendo que el cobro se gestionó
                                    externamente (efectivo, transferencia o cortesía).


### Tablas de la página


#### Tabla 1

| RN-003 | Lógica de Cotización<br>Dinámica | El costo total de una reserva se calcula usando el precio por<br>hora del plan de precios que cubra la mayor cantidad de horas<br>sin exceder el tiempo total solicitado. El cálculo es un producto<br>entre el precio por hora seleccionado y la cantidad de horas que<br>se quieren reservar. |
| --- | --- | --- |
| RN-004 | Requisitos de Información<br>para la Reserva | Para considerar válida una solicitud de reserva, el cliente debe<br>registrar obligatoriamente: el tipo de sala, horario, y datos del<br>representante (nombres, apellidos y DNI). El registro de<br>vehículos (placas, máximo 2) e invitados es opcional, pero debe<br>realizarse antes de emitir el pago si se desean incluir. |
| RN-005 | Modificación de<br>información personal | El usuario podrá visualizar y modificar su información personal<br>desde su cuenta, siempre que los datos actualizados cumplan<br>con los formatos y validaciones definidos por el sistema. Los<br>cambios no deberán alterar información histórica asociada a<br>reservas ya confirmadas. |
| RN-006 | Política de Cancelación y<br>Reembolso | Las reservas solo pueden ser canceladas por un Administrador<br>desde el panel administrativo. El cliente no puede cancelar su<br>propia reserva desde el sistema, debe comunicarse vía<br>WhatsApp el administrador evaluará el caso y realizará la<br>acción correspondiente manualmente en el sistema. Una vez<br>cancelado, se libera el horario inmediatamente para el público.<br>No existen devoluciones ni reembolsos monetarios automáticos<br>a través de la plataforma por reservas canceladas. |
| RN-007 | Expiración y Persistencia<br>de Sesiones | Toda sesión de usuario, activa o inactiva, tendrá una vigencia<br>máxima de veinticuatro (24) horas desde su inicio. Al cumplirse<br>este periodo, el sistema invalidará automáticamente la sesión y<br>solicitará al usuario iniciar sesión nuevamente para continuar<br>accediendo a las funcionalidades protegidas. |
| RN-008 | Asignación de Roles por<br>Defecto | Todo usuario nuevo registrado desde la página pública recibirá<br>automáticamente el rol de "Cliente". Únicamente un<br>"Administrador Principal" tiene la potestad de elevar los<br>privilegios de una cuenta a "Administrador" o revocar dichos<br>accesos. |
| RN-009 | Creación de<br>administradores | El Administrador Principal puede elevar el rol de cualquier<br>usuario registrado en el sistema al rol de Administrador desde el<br>panel administrativo, sin necesidad de un proceso de registro<br>separado. |
| RN-010 | Gestión de Reservas<br>Manuales (Administrador) | Las reservas creadas manualmente por un administrador no<br>pasarán por el proceso de validación de pago digital ni<br>pre-reserva de 10 minutos. Ingresan directamente al sistema<br>como "Confirmadas", asumiendo que el cobro se gestionó<br>externamente (efectivo, transferencia o cortesía). |


---

## Página 18

          RN-011   Prioridad de Bloqueos de Los bloqueos manuales de horario realizados por un
                   Mantenimiento    administrador tendrán prioridad operativa para impedir nuevas
                                    reservas en el espacio seleccionado. Sin embargo, dichos
                                    bloqueos no podrán sobrescribir ni cancelar automáticamente
                                    reservas previamente confirmadas. En caso de existir reservas
                                    confirmadas en el horario afectado, el administrador deberá
                                    cancelarlas o reprogramarlas antes de aplicar el bloqueo.
          RN-012   Estados de la Reserva Toda reserva deberá encontrarse en uno de los siguientes
                                    estados: pendiente, confirmada, expirada, cancelada o
                                    reprogramada. Una reserva estará pendiente mientras se
                                    espera la confirmación del pago, confirmada cuando el pago
                                    sea validado o registrada manualmente por un administrador,
                                    expirada cuando venza el tiempo de pre-reserva sin pago,
                                    cancelada cuando sea anulada, y reprogramada cuando se
                                    apruebe un cambio de fecha u horario.
          RN-013   Validación    de El sistema no permitirá registrar dos reservas confirmadas o
                   Disponibilidad   pre-reservas vigentes sobre el mismo espacio en horarios que
                                    se crucen. Esta validación aplicará tanto para reservas
                                    realizadas por clientes como para reservas manuales creadas
                                    por administradores.
          RN-014   Manejo de permisos por rol Se debe permitir al “Administrador Principal” modificar,
                                    mediante asignación de permisos, a qué pueden acceder cada
                                    rol. Por otro lado, el mismo debe tener la capacidad de crear
                                    nuevos roles de forma arbitraria y asignarles permisos.
          RN-015   Sistema de roles dinámico Los permisos del sistema se aplican exclusivamente a
                                    funcionalidades administrativas. El rol Cliente no requiere
                                    permisos específicos, ya que basta con que el usuario esté
                                    autenticado para acceder a su flujo completo.
                                    Asimismo, el Administrador principal cuenta con acceso total a
                                    todas las funcionalidades del sistema y deberá ser creado
                                    directamente desde el backend.
                                    Los permisos admitidos por el sistema son los siguientes: ver
                                    todas las reservas, gestionar reservas, ver usuarios, modificar
                                    el estado de los usuarios, cambiar el rol de un usuario,
                                    gestionar espacios, editar los permisos de cada rol y ver
                                    reportes.
          RN-016   Unicidad de Identidad El correo electrónico es el identificador único e irrepetible para
                                    cada usuario. El sistema no permitirá el registro de dos cuentas
                                    con el mismo correo. Asimismo, los datos ingresados no deben
                                    contener caracteres inválidos según los estándares de
                                    seguridad.
          RN-017   Expiración de enlace de El token o enlace generado por el sistema para la recuperación
                   seguridad        de una contraseña tendrá una validez máxima y estricta de 15
                                    minutos. Pasado este tiempo, el usuario deberá generar una
                                    nueva solicitud.


### Tablas de la página


#### Tabla 1

| RN-011 | Prioridad de Bloqueos de<br>Mantenimiento | Los bloqueos manuales de horario realizados por un<br>administrador tendrán prioridad operativa para impedir nuevas<br>reservas en el espacio seleccionado. Sin embargo, dichos<br>bloqueos no podrán sobrescribir ni cancelar automáticamente<br>reservas previamente confirmadas. En caso de existir reservas<br>confirmadas en el horario afectado, el administrador deberá<br>cancelarlas o reprogramarlas antes de aplicar el bloqueo. |
| --- | --- | --- |
| RN-012 | Estados de la Reserva | Toda reserva deberá encontrarse en uno de los siguientes<br>estados: pendiente, confirmada, expirada, cancelada o<br>reprogramada. Una reserva estará pendiente mientras se<br>espera la confirmación del pago, confirmada cuando el pago<br>sea validado o registrada manualmente por un administrador,<br>expirada cuando venza el tiempo de pre-reserva sin pago,<br>cancelada cuando sea anulada, y reprogramada cuando se<br>apruebe un cambio de fecha u horario. |
| RN-013 | Validación de<br>Disponibilidad | El sistema no permitirá registrar dos reservas confirmadas o<br>pre-reservas vigentes sobre el mismo espacio en horarios que<br>se crucen. Esta validación aplicará tanto para reservas<br>realizadas por clientes como para reservas manuales creadas<br>por administradores. |
| RN-014 | Manejo de permisos por rol | Se debe permitir al “Administrador Principal” modificar,<br>mediante asignación de permisos, a qué pueden acceder cada<br>rol. Por otro lado, el mismo debe tener la capacidad de crear<br>nuevos roles de forma arbitraria y asignarles permisos. |
| RN-015 | Sistema de roles dinámico | Los permisos del sistema se aplican exclusivamente a<br>funcionalidades administrativas. El rol Cliente no requiere<br>permisos específicos, ya que basta con que el usuario esté<br>autenticado para acceder a su flujo completo.<br>Asimismo, el Administrador principal cuenta con acceso total a<br>todas las funcionalidades del sistema y deberá ser creado<br>directamente desde el backend.<br>Los permisos admitidos por el sistema son los siguientes: ver<br>todas las reservas, gestionar reservas, ver usuarios, modificar<br>el estado de los usuarios, cambiar el rol de un usuario,<br>gestionar espacios, editar los permisos de cada rol y ver<br>reportes. |
| RN-016 | Unicidad de Identidad | El correo electrónico es el identificador único e irrepetible para<br>cada usuario. El sistema no permitirá el registro de dos cuentas<br>con el mismo correo. Asimismo, los datos ingresados no deben<br>contener caracteres inválidos según los estándares de<br>seguridad. |
| RN-017 | Expiración de enlace de<br>seguridad | El token o enlace generado por el sistema para la recuperación<br>de una contraseña tendrá una validez máxima y estricta de 15<br>minutos. Pasado este tiempo, el usuario deberá generar una<br>nueva solicitud. |


---

## Página 19

          RN-018   Restricción de eliminación Un usuario no podrá eliminar su cuenta del sistema si
                   de cuenta        actualmente posee reservas vigentes en estado “Pendiente”,
                                    “Reprogramada” o “Confirmada” cuya fecha de uso aún no haya
                                    expirado.
          RN-019   Privacidad y acceso a data La exportación de reportes y la visualización del historial
                   histórica        completo de ocupación es un privilegio exclusivo del rol
                                    Administrador.
          RN-020   Visibilidad y Modificación El historial de reservas en el panel personal del usuario es de
                   del historial    carácter estrictamente informativo y de solo lectura. El usuario
                                    no podrá alterar ni eliminar registros pasados, ni siquiera las
                                    reservas que hayan sido canceladas, garantizando la
                                    trazabilidad.
          RN-021   Límites en los criterios de Al definir los requisitos de la sala, el sistema validará que los
                   búsqueda         filtros ingresados sean lógicos: la fecha de búsqueda no puede
                                    ser en tiempo pasado, y la cantidad de asistentes solicitados no
                                    puede superar el aforo de la sala de mayor capacidad
                                    disponible en las instalaciones del Coworking.
          RN-022   Obligatoriedad de Los correos electrónicos relacionados a cambios de estado
                   notificaciones   críticos (como “Confirmación de Pago”, “Cancelación” o
                   transaccionales  "Reprogramación”) son considerados transaccionales y de
                                    carácter obligatorio.
          RN-023   Verificación de correo Todo usuario registrado deberá validar su correo electrónico
                   electrónico      mediante un código o enlace de verificación antes de acceder
                                    plenamente al sistema.
          RN-024   Datos obligatorios de Para completar el registro, el usuario deberá ingresar
                   registro         obligatoriamente nombres, apellidos, correo electrónico, número
                                    de documento, teléfono y contraseña.
          RN-025   Estado inicial de cuenta Toda cuenta nueva deberá crearse inicialmente en estado
                                    “pendiente de verificación” hasta que el usuario confirme su
                                    correo electrónico.
          RN-026   Política de contraseña Toda contraseña de cuenta debe tener mínimo 8 caracteres e
                   segura           incluir, al menos, una letra mayúscula, una letra minúscula, un
                                    dígito, un carácter especial (!@#$%^&*()_+-=[]{};:,.<>? ).
                                    Además, no puede coincidir con el correo del usuario. Debe
                                    tener una confirmación de coincidencia.
          RN-027   Aceptación de términos El usuario deberá aceptar los términos y condiciones o política
                                    de tratamiento de datos antes de completar su registro.
          RN-028   Validación de credenciales El sistema solo permitirá el inicio de sesión cuando el correo
                                    electrónico y la contraseña coincidan con una cuenta registrada
                                    en el sistema.
          RN-029   Estado requerido de la Solo podrán autenticarse las cuentas que se encuentren en
                   cuenta           estado “Activa”. Las cuentas bloqueadas, deshabilitadas o
                                    pendientes de verificación no podrán iniciar sesión.


### Tablas de la página


#### Tabla 1

| RN-018 | Restricción de eliminación<br>de cuenta | Un usuario no podrá eliminar su cuenta del sistema si<br>actualmente posee reservas vigentes en estado “Pendiente”,<br>“Reprogramada” o “Confirmada” cuya fecha de uso aún no haya<br>expirado. |
| --- | --- | --- |
| RN-019 | Privacidad y acceso a data<br>histórica | La exportación de reportes y la visualización del historial<br>completo de ocupación es un privilegio exclusivo del rol<br>Administrador. |
| RN-020 | Visibilidad y Modificación<br>del historial | El historial de reservas en el panel personal del usuario es de<br>carácter estrictamente informativo y de solo lectura. El usuario<br>no podrá alterar ni eliminar registros pasados, ni siquiera las<br>reservas que hayan sido canceladas, garantizando la<br>trazabilidad. |
| RN-021 | Límites en los criterios de<br>búsqueda | Al definir los requisitos de la sala, el sistema validará que los<br>filtros ingresados sean lógicos: la fecha de búsqueda no puede<br>ser en tiempo pasado, y la cantidad de asistentes solicitados no<br>puede superar el aforo de la sala de mayor capacidad<br>disponible en las instalaciones del Coworking. |
| RN-022 | Obligatoriedad de<br>notificaciones<br>transaccionales | Los correos electrónicos relacionados a cambios de estado<br>críticos (como “Confirmación de Pago”, “Cancelación” o<br>"Reprogramación”) son considerados transaccionales y de<br>carácter obligatorio. |
| RN-023 | Verificación de correo<br>electrónico | Todo usuario registrado deberá validar su correo electrónico<br>mediante un código o enlace de verificación antes de acceder<br>plenamente al sistema. |
| RN-024 | Datos obligatorios de<br>registro | Para completar el registro, el usuario deberá ingresar<br>obligatoriamente nombres, apellidos, correo electrónico, número<br>de documento, teléfono y contraseña. |
| RN-025 | Estado inicial de cuenta | Toda cuenta nueva deberá crearse inicialmente en estado<br>“pendiente de verificación” hasta que el usuario confirme su<br>correo electrónico. |
| RN-026 | Política de contraseña<br>segura | Toda contraseña de cuenta debe tener mínimo 8 caracteres e<br>incluir, al menos, una letra mayúscula, una letra minúscula, un<br>dígito, un carácter especial (!@#$%^&*()_+-=[]{};:,.<>? ).<br>Además, no puede coincidir con el correo del usuario. Debe<br>tener una confirmación de coincidencia. |
| RN-027 | Aceptación de términos | El usuario deberá aceptar los términos y condiciones o política<br>de tratamiento de datos antes de completar su registro. |
| RN-028 | Validación de credenciales | El sistema solo permitirá el inicio de sesión cuando el correo<br>electrónico y la contraseña coincidan con una cuenta registrada<br>en el sistema. |
| RN-029 | Estado requerido de la<br>cuenta | Solo podrán autenticarse las cuentas que se encuentren en<br>estado “Activa”. Las cuentas bloqueadas, deshabilitadas o<br>pendientes de verificación no podrán iniciar sesión. |


---

## Página 20

          RN-030   Mensaje genérico de Cuando el correo o la contraseña son incorrectos, el sistema
                   autenticación fallida deberá mostrar un mensaje general sin indicar cuál dato falló. Si
                                    el rechazo se debe al estado de la cuenta (no verificada,
                                    deshabilitada o bloqueada), el sistema mostrará un mensaje
                                    específico que oriente al usuario.
          RN-031   Inicio de sesión único por Una autenticación exitosa deberá generar una sesión válida
                   credenciales válidas asociada al usuario y a su rol correspondiente.
          RN-032   Bloqueo durante periodo Mientras una cuenta se encuentre bloqueada por superar los
                   de sanción       intentos fallidos permitidos, el sistema no deberá permitir
                                    nuevos intentos de autenticación hasta que termine el tiempo
                                    establecido.
          RN-033   Validación de campos El sistema no permitirá procesar formularios si existen campos
                   obligatorios     obligatorios vacíos, incompletos o con datos inválidos.
          RN-034   Formato de  correo Todo correo electrónico ingresado deberá cumplir un formato
                   electrónico      válido antes de ser registrado o utilizado en procesos de
                                    autenticación, reserva o notificación.
          RN-035   Formato de número El número telefónico registrado deberá cumplir el formato
                   telefónico       definido por Workpool. Para el MVP, se priorizará números
                                    peruanos de nueve dígitos.
          RN-036   Validación de documento El DNI del representante o usuario deberá contener ocho
                   de identidad     dígitos numéricos y no podrá incluir letras, símbolos ni
                                    espacios.
          RN-037   Restricción de caracteres Los campos de texto no deberán aceptar caracteres o patrones
                   inválidos        que puedan comprometer la seguridad del sistema, como
                                    scripts, comandos o símbolos no permitidos.
          RN-038   Validación previa al Ningún dato ingresado por el usuario podrá ser almacenado,
                   procesamiento    enviado a la pasarela de pago o usado para generar una
                                    reserva si antes no supera las validaciones definidas.
          RN-039   Mensajes de error por Cuando un dato no cumpla el formato requerido, el sistema
                   validación       deberá mostrar un mensaje claro indicando qué campo debe
                                    corregirse.
          RN-40    Conteo de  intentos El sistema deberá contar los intentos fallidos consecutivos de
                   consecutivos con ventana inicio de sesión. Si el tiempo entre el último fallo y el intento
                   de tiempo        actual supera los 5 minutos, el contador de intentos deberá
                                    reiniciarse a 0.
          RN-041   Reinicio del contador de Cuando el usuario inicie sesión correctamente, el contador de
                   intentos         intentos fallidos deberá reiniciarse a cero.
          RN-042   Restricción durante el Mientras la cuenta permanezca bloqueada, el sistema no
                   bloqueo          deberá permitir nuevos intentos de autenticación hasta que
                                    venza el tiempo de bloqueo.


### Tablas de la página


#### Tabla 1

| RN-030 | Mensaje genérico de<br>autenticación fallida | Cuando el correo o la contraseña son incorrectos, el sistema<br>deberá mostrar un mensaje general sin indicar cuál dato falló. Si<br>el rechazo se debe al estado de la cuenta (no verificada,<br>deshabilitada o bloqueada), el sistema mostrará un mensaje<br>específico que oriente al usuario. |
| --- | --- | --- |
| RN-031 | Inicio de sesión único por<br>credenciales válidas | Una autenticación exitosa deberá generar una sesión válida<br>asociada al usuario y a su rol correspondiente. |
| RN-032 | Bloqueo durante periodo<br>de sanción | Mientras una cuenta se encuentre bloqueada por superar los<br>intentos fallidos permitidos, el sistema no deberá permitir<br>nuevos intentos de autenticación hasta que termine el tiempo<br>establecido. |
| RN-033 | Validación de campos<br>obligatorios | El sistema no permitirá procesar formularios si existen campos<br>obligatorios vacíos, incompletos o con datos inválidos. |
| RN-034 | Formato de correo<br>electrónico | Todo correo electrónico ingresado deberá cumplir un formato<br>válido antes de ser registrado o utilizado en procesos de<br>autenticación, reserva o notificación. |
| RN-035 | Formato de número<br>telefónico | El número telefónico registrado deberá cumplir el formato<br>definido por Workpool. Para el MVP, se priorizará números<br>peruanos de nueve dígitos. |
| RN-036 | Validación de documento<br>de identidad | El DNI del representante o usuario deberá contener ocho<br>dígitos numéricos y no podrá incluir letras, símbolos ni<br>espacios. |
| RN-037 | Restricción de caracteres<br>inválidos | Los campos de texto no deberán aceptar caracteres o patrones<br>que puedan comprometer la seguridad del sistema, como<br>scripts, comandos o símbolos no permitidos. |
| RN-038 | Validación previa al<br>procesamiento | Ningún dato ingresado por el usuario podrá ser almacenado,<br>enviado a la pasarela de pago o usado para generar una<br>reserva si antes no supera las validaciones definidas. |
| RN-039 | Mensajes de error por<br>validación | Cuando un dato no cumpla el formato requerido, el sistema<br>deberá mostrar un mensaje claro indicando qué campo debe<br>corregirse. |
| RN-40 | Conteo de intentos<br>consecutivos con ventana<br>de tiempo | El sistema deberá contar los intentos fallidos consecutivos de<br>inicio de sesión. Si el tiempo entre el último fallo y el intento<br>actual supera los 5 minutos, el contador de intentos deberá<br>reiniciarse a 0. |
| RN-041 | Reinicio del contador de<br>intentos | Cuando el usuario inicie sesión correctamente, el contador de<br>intentos fallidos deberá reiniciarse a cero. |
| RN-042 | Restricción durante el<br>bloqueo | Mientras la cuenta permanezca bloqueada, el sistema no<br>deberá permitir nuevos intentos de autenticación hasta que<br>venza el tiempo de bloqueo. |


---

## Página 21

          RN-043   Mensaje de  cuenta Cuando una cuenta sea bloqueada por superar el número de
                   bloqueada        intentos fallidos permitidos, el sistema deberá informar al
                                    usuario que su cuenta ha sido bloqueada temporalmente e
                                    indicar el tiempo de espera.
          RN-044   Solicitud de recuperación El sistema solo permitirá iniciar el proceso de recuperación de
                   solo  para cuentas contraseña si el correo ingresado pertenece a una cuenta
                   registradas      registrada en el sistema.
          RN-045   Uso único del enlace de El enlace o token de recuperación sólo podrá utilizarse una vez.
                   recuperación     Después de cambiar la contraseña, quedará invalidado
                                    automáticamente.
          RN-046   Expiración del enlace de El enlace o token de recuperación tendrá una vigencia máxima
                   recuperación     de quince minutos. Pasado ese tiempo, el usuario deberá
                                    solicitar uno nuevo.
          RN-047   Rango  válido para El sistema solo permitirá exportar reportes cuando el
                   exportación      administrador seleccione un rango de fechas válidas, donde la
                                    fecha inicial no sea posterior a la fecha final.
          RN-048   Campos mínimos del Todo reporte exportado deberá incluir como mínimo: código de
                   reporte          reserva, cliente, espacio reservado, fecha, horario, estado de
                                    reserva, monto pagado y método de registro.
          RN-049   Exportación restringida por La exportación de reportes en PDF o Excel será permitida
                   rol              únicamente a usuarios con rol de Administrador o Administrador
                                    Principal.
          RN-050   Protección de datos en Los reportes exportados no deberán incluir datos sensibles
                   reportes         innecesarios del usuario, como contraseñas, tokens,
                                    credenciales o información no relacionada con la reserva.
          RN-051   Trazabilidad  de Cada exportación de reporte deberá registrar la fecha, hora,
                   exportaciones    usuario administrador responsable, formato exportado y rango
                                    de fechas consultado.
          RN-052   Consistencia del reporte La información exportada deberá coincidir con los datos
                   exportado        almacenados en el sistema al momento de generar el reporte.
          RN-053   Soporte informativo para Aunque el sistema no emitirá facturas automáticamente ni se
                   facturación manual integrará directamente con Wally, deberá registrar y mostrar la
                                    información necesaria de la reserva, cliente, monto pagado,
                                    fecha, horario y estado de pago para que Workpool pueda
                                    emitir el comprobante manualmente en Wally.
          RN-054   Integración  con El sistema no permitirá agregar automáticamente reservas a
                   calendarios externos fuera Google Calendar durante el MVP. La reserva confirmada solo
                   de alcance       será comunicada mediante correo electrónico con los datos
                                    necesarios de fecha, hora, espacio y estado, para que el
                                    usuario pueda registrar manualmente si lo desea.


### Tablas de la página


#### Tabla 1

| RN-043 | Mensaje de cuenta<br>bloqueada | Cuando una cuenta sea bloqueada por superar el número de<br>intentos fallidos permitidos, el sistema deberá informar al<br>usuario que su cuenta ha sido bloqueada temporalmente e<br>indicar el tiempo de espera. |
| --- | --- | --- |
| RN-044 | Solicitud de recuperación<br>solo para cuentas<br>registradas | El sistema solo permitirá iniciar el proceso de recuperación de<br>contraseña si el correo ingresado pertenece a una cuenta<br>registrada en el sistema. |
| RN-045 | Uso único del enlace de<br>recuperación | El enlace o token de recuperación sólo podrá utilizarse una vez.<br>Después de cambiar la contraseña, quedará invalidado<br>automáticamente. |
| RN-046 | Expiración del enlace de<br>recuperación | El enlace o token de recuperación tendrá una vigencia máxima<br>de quince minutos. Pasado ese tiempo, el usuario deberá<br>solicitar uno nuevo. |
| RN-047 | Rango válido para<br>exportación | El sistema solo permitirá exportar reportes cuando el<br>administrador seleccione un rango de fechas válidas, donde la<br>fecha inicial no sea posterior a la fecha final. |
| RN-048 | Campos mínimos del<br>reporte | Todo reporte exportado deberá incluir como mínimo: código de<br>reserva, cliente, espacio reservado, fecha, horario, estado de<br>reserva, monto pagado y método de registro. |
| RN-049 | Exportación restringida por<br>rol | La exportación de reportes en PDF o Excel será permitida<br>únicamente a usuarios con rol de Administrador o Administrador<br>Principal. |
| RN-050 | Protección de datos en<br>reportes | Los reportes exportados no deberán incluir datos sensibles<br>innecesarios del usuario, como contraseñas, tokens,<br>credenciales o información no relacionada con la reserva. |
| RN-051 | Trazabilidad de<br>exportaciones | Cada exportación de reporte deberá registrar la fecha, hora,<br>usuario administrador responsable, formato exportado y rango<br>de fechas consultado. |
| RN-052 | Consistencia del reporte<br>exportado | La información exportada deberá coincidir con los datos<br>almacenados en el sistema al momento de generar el reporte. |
| RN-053 | Soporte informativo para<br>facturación manual | Aunque el sistema no emitirá facturas automáticamente ni se<br>integrará directamente con Wally, deberá registrar y mostrar la<br>información necesaria de la reserva, cliente, monto pagado,<br>fecha, horario y estado de pago para que Workpool pueda<br>emitir el comprobante manualmente en Wally. |
| RN-054 | Integración con<br>calendarios externos fuera<br>de alcance | El sistema no permitirá agregar automáticamente reservas a<br>Google Calendar durante el MVP. La reserva confirmada solo<br>será comunicada mediante correo electrónico con los datos<br>necesarios de fecha, hora, espacio y estado, para que el<br>usuario pueda registrar manualmente si lo desea. |


---

## Página 22

          RN-055   Autenticación con Google Durante la versión MVP, el sistema no permitirá el registro ni el
                   fuera del alcance del MVP inicio de sesión mediante cuentas de Google. Los usuarios
                                    deberán registrarse e iniciar sesión únicamente mediante correo
                                    electrónico y contraseña creados dentro del sistema.
          RN-056   Recordatorios automáticos Los recordatorios previos a la fecha de uso del espacio serán
                   fuera del alcance del MVP gestionados manualmente por Workpool, mediante sus canales
                                    externos de comunicación, hasta que esta funcionalidad sea
                                    incorporada en una etapa posterior.
          RN-057   Reintento de pago sin Cuando el proceso de pago no se complete exitosamente, el
                   pérdida de información sistema deberá notificar al usuario el estado fallido de la
                                    transacción y permitirle reintentar el pago mientras la
                                    pre-reserva continúe vigente. Durante este periodo, la
                                    información registrada en la reserva deberá conservarse sin ser
                                    eliminada ni modificada automáticamente.
          RN-058   Registro de intentos de Todo intento de pago fallido, rechazado o interrumpido deberá
                   pago fallidos    quedar registrado en el sistema, incluyendo la reserva
                                    asociada, fecha, hora, estado de la transacción y respuesta
                                    recibida de la pasarela de pago, para mantener la trazabilidad
                                    del proceso.
          RN-059   Restricción de reintento El usuario solo podrá reintentar el pago mientras la pre-reserva
                   por  expiración de se encuentre vigente. Si el tiempo de pre-reserva expira, el
                   pre-reserva      sistema deberá liberar el horario y el usuario deberá iniciar un
                                    nuevo proceso de reserva.
          RN-060   Generación de reportes El sistema solo permitirá generar reportes de ocupación y
                   por rango de fechas reservas cuando el administrador seleccione un rango de
                                    fechas válido. La fecha inicial no podrá ser posterior a la fecha
                                    final, y el reporte deberá mostrar únicamente la información
                                    comprendida dentro del periodo seleccionado.
          RN-061   Criterios de ocupación de Para calcular la ocupación de un espacio, el sistema deberá
                   espacios         considerar las reservas confirmadas y los bloqueos
                                    administrativos vigentes dentro del rango de fechas
                                    seleccionado. Las reservas canceladas o expiradas no deberán
                                    contabilizarse como ocupación efectiva.
          RN-062   Filtros mínimos del reporte Los reportes de ocupación y reservas deberán permitir filtrar la
                   administrativo   información por rango de fechas, espacio, estado de reserva y
                                    tipo de operación, para facilitar el análisis administrativo.
          RN-063   Visualización restringida La generación y visualización de reportes de ocupación y
                   de reportes      reservas será permitida únicamente a usuarios con rol de
                                    Administrador o Administrador Principal.
          RN-064   Visualización    Los administradores podrán visualizar el historial de reservas de
                   administrativa del historial los usuarios, incluyendo reservas confirmadas, canceladas,
                   de reservas      expiradas, pendientes y reprogramadas, siempre que cuenten
                                    con los permisos correspondientes.


### Tablas de la página


#### Tabla 1

| RN-055 | Autenticación con Google<br>fuera del alcance del MVP | Durante la versión MVP, el sistema no permitirá el registro ni el<br>inicio de sesión mediante cuentas de Google. Los usuarios<br>deberán registrarse e iniciar sesión únicamente mediante correo<br>electrónico y contraseña creados dentro del sistema. |
| --- | --- | --- |
| RN-056 | Recordatorios automáticos<br>fuera del alcance del MVP | Los recordatorios previos a la fecha de uso del espacio serán<br>gestionados manualmente por Workpool, mediante sus canales<br>externos de comunicación, hasta que esta funcionalidad sea<br>incorporada en una etapa posterior. |
| RN-057 | Reintento de pago sin<br>pérdida de información | Cuando el proceso de pago no se complete exitosamente, el<br>sistema deberá notificar al usuario el estado fallido de la<br>transacción y permitirle reintentar el pago mientras la<br>pre-reserva continúe vigente. Durante este periodo, la<br>información registrada en la reserva deberá conservarse sin ser<br>eliminada ni modificada automáticamente. |
| RN-058 | Registro de intentos de<br>pago fallidos | Todo intento de pago fallido, rechazado o interrumpido deberá<br>quedar registrado en el sistema, incluyendo la reserva<br>asociada, fecha, hora, estado de la transacción y respuesta<br>recibida de la pasarela de pago, para mantener la trazabilidad<br>del proceso. |
| RN-059 | Restricción de reintento<br>por expiración de<br>pre-reserva | El usuario solo podrá reintentar el pago mientras la pre-reserva<br>se encuentre vigente. Si el tiempo de pre-reserva expira, el<br>sistema deberá liberar el horario y el usuario deberá iniciar un<br>nuevo proceso de reserva. |
| RN-060 | Generación de reportes<br>por rango de fechas | El sistema solo permitirá generar reportes de ocupación y<br>reservas cuando el administrador seleccione un rango de<br>fechas válido. La fecha inicial no podrá ser posterior a la fecha<br>final, y el reporte deberá mostrar únicamente la información<br>comprendida dentro del periodo seleccionado. |
| RN-061 | Criterios de ocupación de<br>espacios | Para calcular la ocupación de un espacio, el sistema deberá<br>considerar las reservas confirmadas y los bloqueos<br>administrativos vigentes dentro del rango de fechas<br>seleccionado. Las reservas canceladas o expiradas no deberán<br>contabilizarse como ocupación efectiva. |
| RN-062 | Filtros mínimos del reporte<br>administrativo | Los reportes de ocupación y reservas deberán permitir filtrar la<br>información por rango de fechas, espacio, estado de reserva y<br>tipo de operación, para facilitar el análisis administrativo. |
| RN-063 | Visualización restringida<br>de reportes | La generación y visualización de reportes de ocupación y<br>reservas será permitida únicamente a usuarios con rol de<br>Administrador o Administrador Principal. |
| RN-064 | Visualización<br>administrativa del historial<br>de reservas | Los administradores podrán visualizar el historial de reservas de<br>los usuarios, incluyendo reservas confirmadas, canceladas,<br>expiradas, pendientes y reprogramadas, siempre que cuenten<br>con los permisos correspondientes. |


---

## Página 23

          RN-65    Historial de reservas en El historial de reservas visualizado por los administradores
                   modo solo lectura tendrá carácter informativo y no podrá ser modificado
                                    directamente desde la vista de historial.
          RN-66    Filtros para consulta de El sistema deberá permitir que el administrador filtre el historial
                   historial        de reservas por usuario, espacio, estado de reserva, fecha o
                                    rango de fechas, para facilitar la consulta administrativa.
          RN-67    Protección de datos en La visualización del historial de reservas no deberá mostrar
                   historial de usuarios información sensible innecesaria del usuario, como
                                    contraseñas, tokens o datos no relacionados con la reserva.
          RN-68    Consulta administrativa de Los administradores podrán consultar la disponibilidad de salas
                   disponibilidad   considerando reservas confirmadas, pre-reservas vigentes,
                                    bloqueos manuales y horarios operativos configurados.
          RN-69    Filtros de consulta de La consulta de disponibilidad deberá permitir filtrar por fecha,
                   disponibilidad   rango horario, tipo de sala, capacidad, estado del espacio y
                                    disponibilidad.
          RN-70    Visualización de salas no El sistema deberá mostrar a los administradores las salas no
                   disponibles      disponibles indicando el motivo: reserva confirmada,
                                    pre-reserva vigente, bloqueo manual, mantenimiento o espacio
                                    desactivado.
          RN-71    Restricción de consulta Solo los usuarios con rol de Administrador o Administrador
                   administrativa   Principal podrán consultar la disponibilidad completa de todas
                                    las salas del sistema.
          RN-72    Restricción de cancelación Solo los usuarios con rol de Administrador o Administrador
                   por rol          Principal podrán cancelar reservas desde el panel
                                    administrativo.
          RN-73    Liberación de horario por Al cancelarse una reserva, el horario asociado deberá quedar
                   cancelación      disponible nuevamente para nuevas reservas, salvo que exista
                                    un bloqueo administrativo o mantenimiento registrado para ese
                                    mismo periodo.
          RN-74    Restricción de aprobación Solo los usuarios con rol de Administrador o Administrador
                   de reprogramaciones Principal podrán aprobar, rechazar o ejecutar manualmente la
                                    reprogramación de reservas en el sistema, previa coordinación
                                    con el usuario mediante WhatsApp. La aprobación no garantiza
                                    el mismo espacio ni horario, y queda a total discreción del
                                    administrador evaluar la disponibilidad. Si la solicitud de
                                    reprogramación es rechazada, la reserva conservará su fecha,
                                    horario, espacio y estado original.
          RN-75    Registro obligatorio de Todo bloqueo manual de horario deberá registrar
                   bloqueos manuales obligatoriamente el espacio afectado, fecha, hora de inicio, hora
                                    de fin, motivo del bloqueo y administrador responsable.
          RN-76    Validación de rango para El sistema no permitirá crear bloqueos manuales con fechas
                   bloqueo manual   pasadas, horarios inválidos o rangos donde la hora de inicio sea
                                    igual o posterior a la hora de fin.


### Tablas de la página


#### Tabla 1

| RN-65 | Historial de reservas en<br>modo solo lectura | El historial de reservas visualizado por los administradores<br>tendrá carácter informativo y no podrá ser modificado<br>directamente desde la vista de historial. |
| --- | --- | --- |
| RN-66 | Filtros para consulta de<br>historial | El sistema deberá permitir que el administrador filtre el historial<br>de reservas por usuario, espacio, estado de reserva, fecha o<br>rango de fechas, para facilitar la consulta administrativa. |
| RN-67 | Protección de datos en<br>historial de usuarios | La visualización del historial de reservas no deberá mostrar<br>información sensible innecesaria del usuario, como<br>contraseñas, tokens o datos no relacionados con la reserva. |
| RN-68 | Consulta administrativa de<br>disponibilidad | Los administradores podrán consultar la disponibilidad de salas<br>considerando reservas confirmadas, pre-reservas vigentes,<br>bloqueos manuales y horarios operativos configurados. |
| RN-69 | Filtros de consulta de<br>disponibilidad | La consulta de disponibilidad deberá permitir filtrar por fecha,<br>rango horario, tipo de sala, capacidad, estado del espacio y<br>disponibilidad. |
| RN-70 | Visualización de salas no<br>disponibles | El sistema deberá mostrar a los administradores las salas no<br>disponibles indicando el motivo: reserva confirmada,<br>pre-reserva vigente, bloqueo manual, mantenimiento o espacio<br>desactivado. |
| RN-71 | Restricción de consulta<br>administrativa | Solo los usuarios con rol de Administrador o Administrador<br>Principal podrán consultar la disponibilidad completa de todas<br>las salas del sistema. |
| RN-72 | Restricción de cancelación<br>por rol | Solo los usuarios con rol de Administrador o Administrador<br>Principal podrán cancelar reservas desde el panel<br>administrativo. |
| RN-73 | Liberación de horario por<br>cancelación | Al cancelarse una reserva, el horario asociado deberá quedar<br>disponible nuevamente para nuevas reservas, salvo que exista<br>un bloqueo administrativo o mantenimiento registrado para ese<br>mismo periodo. |
| RN-74 | Restricción de aprobación<br>de reprogramaciones | Solo los usuarios con rol de Administrador o Administrador<br>Principal podrán aprobar, rechazar o ejecutar manualmente la<br>reprogramación de reservas en el sistema, previa coordinación<br>con el usuario mediante WhatsApp. La aprobación no garantiza<br>el mismo espacio ni horario, y queda a total discreción del<br>administrador evaluar la disponibilidad. Si la solicitud de<br>reprogramación es rechazada, la reserva conservará su fecha,<br>horario, espacio y estado original. |
| RN-75 | Registro obligatorio de<br>bloqueos manuales | Todo bloqueo manual de horario deberá registrar<br>obligatoriamente el espacio afectado, fecha, hora de inicio, hora<br>de fin, motivo del bloqueo y administrador responsable. |
| RN-76 | Validación de rango para<br>bloqueo manual | El sistema no permitirá crear bloqueos manuales con fechas<br>pasadas, horarios inválidos o rangos donde la hora de inicio sea<br>igual o posterior a la hora de fin. |


---

## Página 24

          RN-77    Restricción de gestión de Solo los usuarios con rol de Administrador o Administrador
                   espacios y precios Principal podrán crear, editar, desactivar o eliminar espacios y
                                    planes de precios desde el panel administrativo.
          RN-78    Desactivación de espacios Un espacio que tenga reservas registradas no deberá
                   con historial    eliminarse definitivamente del sistema; en su lugar, deberá ser
                                    desactivado para conservar el historial y la trazabilidad de
                                    reservas.
          RN-79    Edición limitada de Si un espacio tiene reservas pendientes o confirmadas, el
                   espacios con reservas administrador no podrá modificar datos críticos que afecten
                   vigentes         dichas reservas, como capacidad, tipo de espacio,
                                    disponibilidad o condiciones principales de uso.
          RN-80    Vigencia de planes de Todo plan de precios deberá contar con un estado activo o
                   precios          inactivo. Solo los planes activos podrán ser mostrados al
                                    usuario y utilizados para calcular nuevas reservas.
          RN-81    Cambios de precio no La modificación de un plan de precios no afectará las reservas
                   retroactivos     ya confirmadas antes del cambio. Las nuevas tarifas solo
                                    aplican para reservas generadas después de la actualización.
          RN-82    Restricción de gestión de Solo los usuarios con rol de Administrador o Administrador
                   usuarios         Principal podrán gestionar cuentas de usuarios desde el panel
                                    administrativo, según los permisos asignados a su rol.
          RN-83    Control de estado de El administrador podrá cambiar el estado de una cuenta de
                   usuario          usuario a activa o deshabilitada desde el panel administrativo.
                                    El estado bloqueado es gestionado exclusivamente por el
                                    sistema ante intentos fallidos de inicio de sesión.
          RN-84    Restricción sobre usuarios Un usuario no podrá ser eliminado definitivamente si mantiene
                   con reservas vigentes reservas pendientes o confirmadas. En ese caso, la cuenta
                                    deberá ser deshabilitada para conservar la trazabilidad de sus
                                    reservas.
          RN-85    Restricción de gestión de Solo el Administrador Principal podrá crear, modificar,
                   administradores  desactivar, revocar accesos o modificar permisos de cuentas
                                    con rol de Administrador. Ningún Administrador común podrá
                                    asignar privilegios administrativos, quitar permisos ni modificar
                                    cuentas de otros administradores.
          RN-86    Notificación obligatoria por Cada vez que una reserva cambie de estado a confirmada,
                   cambio de estado cancelada o reprogramada, el sistema deberá enviar una
                                    notificación al correo electrónico registrado del usuario.
          RN-87    Contenido mínimo de la Toda notificación enviada al usuario deberá incluir como mínimo
                   notificación de reserva el código de reserva, espacio reservado, fecha, horario, estado
                                    actualizado y canal de contacto de Workpool.
          RN-88    Notificación al correo Las notificaciones de cambios de estado deberán enviarse
                   registrado       únicamente al correo electrónico asociado a la cuenta del
                                    usuario o registrado en la reserva.


### Tablas de la página


#### Tabla 1

| RN-77 | Restricción de gestión de<br>espacios y precios | Solo los usuarios con rol de Administrador o Administrador<br>Principal podrán crear, editar, desactivar o eliminar espacios y<br>planes de precios desde el panel administrativo. |
| --- | --- | --- |
| RN-78 | Desactivación de espacios<br>con historial | Un espacio que tenga reservas registradas no deberá<br>eliminarse definitivamente del sistema; en su lugar, deberá ser<br>desactivado para conservar el historial y la trazabilidad de<br>reservas. |
| RN-79 | Edición limitada de<br>espacios con reservas<br>vigentes | Si un espacio tiene reservas pendientes o confirmadas, el<br>administrador no podrá modificar datos críticos que afecten<br>dichas reservas, como capacidad, tipo de espacio,<br>disponibilidad o condiciones principales de uso. |
| RN-80 | Vigencia de planes de<br>precios | Todo plan de precios deberá contar con un estado activo o<br>inactivo. Solo los planes activos podrán ser mostrados al<br>usuario y utilizados para calcular nuevas reservas. |
| RN-81 | Cambios de precio no<br>retroactivos | La modificación de un plan de precios no afectará las reservas<br>ya confirmadas antes del cambio. Las nuevas tarifas solo<br>aplican para reservas generadas después de la actualización. |
| RN-82 | Restricción de gestión de<br>usuarios | Solo los usuarios con rol de Administrador o Administrador<br>Principal podrán gestionar cuentas de usuarios desde el panel<br>administrativo, según los permisos asignados a su rol. |
| RN-83 | Control de estado de<br>usuario | El administrador podrá cambiar el estado de una cuenta de<br>usuario a activa o deshabilitada desde el panel administrativo.<br>El estado bloqueado es gestionado exclusivamente por el<br>sistema ante intentos fallidos de inicio de sesión. |
| RN-84 | Restricción sobre usuarios<br>con reservas vigentes | Un usuario no podrá ser eliminado definitivamente si mantiene<br>reservas pendientes o confirmadas. En ese caso, la cuenta<br>deberá ser deshabilitada para conservar la trazabilidad de sus<br>reservas. |
| RN-85 | Restricción de gestión de<br>administradores | Solo el Administrador Principal podrá crear, modificar,<br>desactivar, revocar accesos o modificar permisos de cuentas<br>con rol de Administrador. Ningún Administrador común podrá<br>asignar privilegios administrativos, quitar permisos ni modificar<br>cuentas de otros administradores. |
| RN-86 | Notificación obligatoria por<br>cambio de estado | Cada vez que una reserva cambie de estado a confirmada,<br>cancelada o reprogramada, el sistema deberá enviar una<br>notificación al correo electrónico registrado del usuario. |
| RN-87 | Contenido mínimo de la<br>notificación de reserva | Toda notificación enviada al usuario deberá incluir como mínimo<br>el código de reserva, espacio reservado, fecha, horario, estado<br>actualizado y canal de contacto de Workpool. |
| RN-88 | Notificación al correo<br>registrado | Las notificaciones de cambios de estado deberán enviarse<br>únicamente al correo electrónico asociado a la cuenta del<br>usuario o registrado en la reserva. |


---

## Página 25

          RN-89    Registro de notificaciones Toda notificación enviada por el sistema deberá quedar
                   enviadas         registrada con fecha, hora, destinatario, reserva asociada y tipo
                                    de cambio notificado.
          RN-90    Manejo de error en envío Si el correo de notificación no puede enviarse, el sistema
                   de correo        deberá registrar el fallo, permitiendo que el administrador
                                    identifique la notificación pendiente o fallida.
          RN-91    Límite de solicitudes de Cada reserva confirmada sólo podrá tener una solicitud de
                   reprogramación por reprogramación registrada por el usuario. Una vez coordinada
                   reserva          esa primera solicitud el sistema no permitirá registrar una nueva
                                    solicitud para la misma reserva.
          RN-92    Restricción por estado de Solo podrán solicitar reprogramación las reservas que se
                   reserva      para encuentren en estado “confirmada”. Las reservas pendientes,
                   reprogramación   canceladas, expiradas o ya reprogramadas no podrán generar
                                    nuevas solicitudes de reprogramación.
          RN-93    Confirmación de reserva Una reserva sólo podrá cambiar al estado “confirmada” cuando
                   por pago validado la pasarela de pago externa devuelva una respuesta exitosa y
                                    válida de la transacción asociada a la pre-reserva. Si el pago se
                                    encuentra pendiente, fallido, interrumpido o expirado, la reserva
                                    no podrá ser confirmada.
          RN-94    Validación    de Antes de confirmar una reserva, el sistema deberá verificar que
                   correspondencia del pago la respuesta exitosa recibida desde la pasarela de pago
                                    corresponda a la pre-reserva correcta, al monto calculado por el
                                    sistema y a una pre-reserva aún vigente.
          RN-095   Cálculo de  tiempo Cuando la duración de una reserva exceda el tiempo base del
                   adicional        plan seleccionado, el sistema deberá calcular el tiempo
                                    adicional según la tarifa correspondiente definida para el
                                    espacio o plan de precios.
          RN-096   Visualización del desglose Antes de iniciar el pago, el sistema deberá mostrar al usuario el
                   del costo        desglose del costo total de la reserva, incluyendo plan
                                    seleccionado, precio por hora, tiempo adicional y monto final.
          RN-097   Moneda de visualización y Los precios de los espacios y planes podrán registrarse y
                   cobro            visualizarse en dólares durante la cotización. Antes de iniciar el
                                    pago, el sistema deberá convertir el monto total a soles usando
                                    el tipo de cambio vigente del día, mostrando al usuario el monto
                                    original en dólares, el tipo de cambio aplicado y el monto final a
                                    pagar en soles.
          RN-098   Registro operativo de la Al generar el proceso de pago, el sistema deberá registrar la
                   conversión aplicada información de conversión aplicada, incluyendo monto original
                                    en dólares, tipo de cambio usado y monto final en soles, en el
                                    historial o trazabilidad de la operación disponible para
                                    Workpool.


### Tablas de la página


#### Tabla 1

| RN-89 | Registro de notificaciones<br>enviadas | Toda notificación enviada por el sistema deberá quedar<br>registrada con fecha, hora, destinatario, reserva asociada y tipo<br>de cambio notificado. |
| --- | --- | --- |
| RN-90 | Manejo de error en envío<br>de correo | Si el correo de notificación no puede enviarse, el sistema<br>deberá registrar el fallo, permitiendo que el administrador<br>identifique la notificación pendiente o fallida. |
| RN-91 | Límite de solicitudes de<br>reprogramación por<br>reserva | Cada reserva confirmada sólo podrá tener una solicitud de<br>reprogramación registrada por el usuario. Una vez coordinada<br>esa primera solicitud el sistema no permitirá registrar una nueva<br>solicitud para la misma reserva. |
| RN-92 | Restricción por estado de<br>reserva para<br>reprogramación | Solo podrán solicitar reprogramación las reservas que se<br>encuentren en estado “confirmada”. Las reservas pendientes,<br>canceladas, expiradas o ya reprogramadas no podrán generar<br>nuevas solicitudes de reprogramación. |
| RN-93 | Confirmación de reserva<br>por pago validado | Una reserva sólo podrá cambiar al estado “confirmada” cuando<br>la pasarela de pago externa devuelva una respuesta exitosa y<br>válida de la transacción asociada a la pre-reserva. Si el pago se<br>encuentra pendiente, fallido, interrumpido o expirado, la reserva<br>no podrá ser confirmada. |
| RN-94 | Validación de<br>correspondencia del pago | Antes de confirmar una reserva, el sistema deberá verificar que<br>la respuesta exitosa recibida desde la pasarela de pago<br>corresponda a la pre-reserva correcta, al monto calculado por el<br>sistema y a una pre-reserva aún vigente. |
| RN-095 | Cálculo de tiempo<br>adicional | Cuando la duración de una reserva exceda el tiempo base del<br>plan seleccionado, el sistema deberá calcular el tiempo<br>adicional según la tarifa correspondiente definida para el<br>espacio o plan de precios. |
| RN-096 | Visualización del desglose<br>del costo | Antes de iniciar el pago, el sistema deberá mostrar al usuario el<br>desglose del costo total de la reserva, incluyendo plan<br>seleccionado, precio por hora, tiempo adicional y monto final. |
| RN-097 | Moneda de visualización y<br>cobro | Los precios de los espacios y planes podrán registrarse y<br>visualizarse en dólares durante la cotización. Antes de iniciar el<br>pago, el sistema deberá convertir el monto total a soles usando<br>el tipo de cambio vigente del día, mostrando al usuario el monto<br>original en dólares, el tipo de cambio aplicado y el monto final a<br>pagar en soles. |
| RN-098 | Registro operativo de la<br>conversión aplicada | Al generar el proceso de pago, el sistema deberá registrar la<br>información de conversión aplicada, incluyendo monto original<br>en dólares, tipo de cambio usado y monto final en soles, en el<br>historial o trazabilidad de la operación disponible para<br>Workpool. |


---

## Página 26

          RN-099   Aceptación del monto Antes de continuar con el pago, el usuario deberá visualizar y
                   convertido       aceptar el monto final convertido a soles. Si el usuario no
                                    acepta el monto mostrado, no se iniciará la transacción en la
                                    pasarela de pago. De iniciar el pago, el sistema deberá mostrar
                                    al usuario el desglose del costo de la reserva, incluyendo plan
                                    seleccionado, precio por hora, cantidad de horas, tiempo
                                    adicional si corresponde, monto original y monto final a pagar.
          RN-100   Persistencia del formulario La información ingresada por el usuario durante el proceso de
                   de reserva       reserva podrá conservarse temporalmente como borrador
                                    mientras la reserva no haya sido confirmada, expirada ni
                                    enviada al proceso de pago. Esta persistencia podrá realizarse
                                    mediante caché local del navegador, permitiendo que el usuario
                                    retome el formulario sin volver a registrar todos los datos,
                                    siempre que el borrador no haya sido eliminado o vencido.
          RN-101   Registro de invitados antes Los invitados asociados a una reserva deberán registrarse
                   del pago         antes de iniciar el pago, incluyendo como mínimo nombres,
                                    apellidos y DNI, si el cliente desea que figuren para control de
                                    ingreso.
          RN-102   Límite de vehículos por El sistema permitirá registrar como máximo dos placas
                   reserva          vehiculares por reserva, siempre que el usuario haya indicado
                                    que utilizará estacionamiento.
          RN-103   Modificación de asistentes Los datos de asistentes, invitados o vehículos sólo podrán
                   y servicios adicionales modificarse mientras la reserva se encuentre pendiente y antes
                                    de iniciar el proceso de pago.
          RN-104   Visualización del Durante el proceso de reserva, el sistema deberá mostrar al
                   temporizador  de usuario un temporizador visible con el tiempo restante de la
                   pre-reserva      pre-reserva, tomando como base los diez (10) minutos definidos
                                    en la RN-002.
          RN-105   Información mínima del Todo espacio registrado en el sistema deberá contar como
                   espacio          mínimo con nombre, tipo de espacio, descripción, capacidad
                                    máxima, estado de disponibilidad y condiciones básicas de uso.
                                    Los espacios que no cuenten con esta información completa no
                                    deberán mostrarse como disponibles para reserva.
          RN-106   Visualización de reservas El usuario solo podrá visualizar en su panel personal las
                   propias          reservas asociadas a su propia cuenta, incluyendo reservas
                                    vigentes, pasadas, pendientes, canceladas, expiradas o
                                    reprogramadas. No podrá acceder al historial de reservas de
                                    otros usuarios.
          RN-107   Mensaje de acceso no Cuando un usuario intente acceder a una funcionalidad, ruta o
                   autorizado       interfaz para la cual no cuenta con permisos, el sistema deberá
                                    impedir el acceso y mostrar un mensaje de error indicando que
                                    no tiene autorización para realizar dicha acción.
          RN-108   Restricción de permisos no Los permisos de cambiar rol de un usuario y editar permisos
                   delegables       son exclusivos del Administrador Principal y no pueden
                                    asignarse a ningún otro rol desde el panel de administración.


### Tablas de la página


#### Tabla 1

| RN-099 | Aceptación del monto<br>convertido | Antes de continuar con el pago, el usuario deberá visualizar y<br>aceptar el monto final convertido a soles. Si el usuario no<br>acepta el monto mostrado, no se iniciará la transacción en la<br>pasarela de pago. De iniciar el pago, el sistema deberá mostrar<br>al usuario el desglose del costo de la reserva, incluyendo plan<br>seleccionado, precio por hora, cantidad de horas, tiempo<br>adicional si corresponde, monto original y monto final a pagar. |
| --- | --- | --- |
| RN-100 | Persistencia del formulario<br>de reserva | La información ingresada por el usuario durante el proceso de<br>reserva podrá conservarse temporalmente como borrador<br>mientras la reserva no haya sido confirmada, expirada ni<br>enviada al proceso de pago. Esta persistencia podrá realizarse<br>mediante caché local del navegador, permitiendo que el usuario<br>retome el formulario sin volver a registrar todos los datos,<br>siempre que el borrador no haya sido eliminado o vencido. |
| RN-101 | Registro de invitados antes<br>del pago | Los invitados asociados a una reserva deberán registrarse<br>antes de iniciar el pago, incluyendo como mínimo nombres,<br>apellidos y DNI, si el cliente desea que figuren para control de<br>ingreso. |
| RN-102 | Límite de vehículos por<br>reserva | El sistema permitirá registrar como máximo dos placas<br>vehiculares por reserva, siempre que el usuario haya indicado<br>que utilizará estacionamiento. |
| RN-103 | Modificación de asistentes<br>y servicios adicionales | Los datos de asistentes, invitados o vehículos sólo podrán<br>modificarse mientras la reserva se encuentre pendiente y antes<br>de iniciar el proceso de pago. |
| RN-104 | Visualización del<br>temporizador de<br>pre-reserva | Durante el proceso de reserva, el sistema deberá mostrar al<br>usuario un temporizador visible con el tiempo restante de la<br>pre-reserva, tomando como base los diez (10) minutos definidos<br>en la RN-002. |
| RN-105 | Información mínima del<br>espacio | Todo espacio registrado en el sistema deberá contar como<br>mínimo con nombre, tipo de espacio, descripción, capacidad<br>máxima, estado de disponibilidad y condiciones básicas de uso.<br>Los espacios que no cuenten con esta información completa no<br>deberán mostrarse como disponibles para reserva. |
| RN-106 | Visualización de reservas<br>propias | El usuario solo podrá visualizar en su panel personal las<br>reservas asociadas a su propia cuenta, incluyendo reservas<br>vigentes, pasadas, pendientes, canceladas, expiradas o<br>reprogramadas. No podrá acceder al historial de reservas de<br>otros usuarios. |
| RN-107 | Mensaje de acceso no<br>autorizado | Cuando un usuario intente acceder a una funcionalidad, ruta o<br>interfaz para la cual no cuenta con permisos, el sistema deberá<br>impedir el acceso y mostrar un mensaje de error indicando que<br>no tiene autorización para realizar dicha acción. |
| RN-108 | Restricción de permisos no<br>delegables | Los permisos de cambiar rol de un usuario y editar permisos<br>son exclusivos del Administrador Principal y no pueden<br>asignarse a ningún otro rol desde el panel de administración. |


---

## Página 27

          RN-109   Duración mínima de Ninguna reserva puede tener una duración inferior a treinta (30)
                   reserva          minutos. El sistema rechazará cualquier solicitud que no cumpla
                                    con este tiempo mínimo.
          RN-110   Una pre-reserva activa por Un usuario solo puede tener una pre-reserva en estado
                   usuario          pendiente a la vez. Para iniciar una nueva reserva, debe
                                    completar el pago de la pre-reserva activa o esperar a que
                                    expire.
          RN-111   Liberación voluntaria de El usuario puede cancelar su propia pre-reserva mientras se
                   pre-reserva      encuentre en estado pendiente y antes de haber iniciado el
                                    proceso de pago. Esta acción libera el horario de forma
                                    inmediata. Una vez que la reserva ha sido confirmada, el
                                    usuario no puede cancelarla desde el sistema.
          RN-112   Redondeo Superior en el Al calcular la duración total de una reserva para propósitos de
                   Tiempo de Reserva cotización, el sistema redondea cualquier fracción de tiempo
                                    hacia la hora entera inmediatamente superior (ej. 1 hora y 30
                                    minutos se calcula como 2 horas), y en base a este resultado se
                                    selecciona el plan y el tiempo extra.
          RN-113   Condicionalidad de Para que un usuario pueda registrar las placas de sus
                   Registro Vehicular vehículos, es un requisito obligatorio y excluyente que haya
                                    indicado explícitamente en el formulario que hará uso del
                                    servicio de estacionamiento. Si no se indica el uso de
                                    estacionamiento, cualquier placa enviada será rechazada.
          RN-114   Resiliencia y Caché del El sistema almacena en memoria caché el tipo de cambio diario
                   Tipo de Cambio   obtenido de Dolar.pe para optimizar consultas. Si la pasarela de
                                    tipo de cambio falla, el sistema aplica una política de fallback:
                                    primero intenta usar el último valor histórico guardado en base
                                    de datos; de no existir, aplica un valor predeterminado
                                    configurado en el sistema.
          RN-115   Trazabilidad Segura de Todo intento de cobro registra primero una orden en base de
                   Transacciones de Pago datos con estado "PENDIENTE" de manera independiente a la
                                    transacción global y antes de enviar los datos a la pasarela
                                    externa. Esto previene condiciones de carrera, garantizando
                                    que si el webhook de OpenPay responde más rápido de lo
                                    esperado, la orden ya exista para conciliar el pago.
          RN-116   Validación Global de Aforo Al momento de consultar disponibilidad, el sistema valida que la
                   en Búsquedas     cantidad mínima de asistentes solicitada no supere la
                                    capacidad máxima absoluta de la sala más grande que se
                                    encuentre habilitada en todas las instalaciones, previniendo
                                    búsquedas que nunca tendrán un resultado exitoso.
          RN-117   Gestión Diferida de Las pre-reservas cuyo tiempo de gracia de 10 minutos ha
                   Expiración    de expirado no se limpian mediante un proceso programado (cron).
                   Pre-Reservas     El sistema implementa una lógica de Stale Draft que invalida el
                                    borrador caducado y libera el espacio de forma automática en el
                                    instante preciso en que el usuario intenta crear una nueva
                                    reserva o cuando se evalúan cruces de horarios.


### Tablas de la página


#### Tabla 1

| RN-109 | Duración mínima de<br>reserva | Ninguna reserva puede tener una duración inferior a treinta (30)<br>minutos. El sistema rechazará cualquier solicitud que no cumpla<br>con este tiempo mínimo. |
| --- | --- | --- |
| RN-110 | Una pre-reserva activa por<br>usuario | Un usuario solo puede tener una pre-reserva en estado<br>pendiente a la vez. Para iniciar una nueva reserva, debe<br>completar el pago de la pre-reserva activa o esperar a que<br>expire. |
| RN-111 | Liberación voluntaria de<br>pre-reserva | El usuario puede cancelar su propia pre-reserva mientras se<br>encuentre en estado pendiente y antes de haber iniciado el<br>proceso de pago. Esta acción libera el horario de forma<br>inmediata. Una vez que la reserva ha sido confirmada, el<br>usuario no puede cancelarla desde el sistema. |
| RN-112 | Redondeo Superior en el<br>Tiempo de Reserva | Al calcular la duración total de una reserva para propósitos de<br>cotización, el sistema redondea cualquier fracción de tiempo<br>hacia la hora entera inmediatamente superior (ej. 1 hora y 30<br>minutos se calcula como 2 horas), y en base a este resultado se<br>selecciona el plan y el tiempo extra. |
| RN-113 | Condicionalidad de<br>Registro Vehicular | Para que un usuario pueda registrar las placas de sus<br>vehículos, es un requisito obligatorio y excluyente que haya<br>indicado explícitamente en el formulario que hará uso del<br>servicio de estacionamiento. Si no se indica el uso de<br>estacionamiento, cualquier placa enviada será rechazada. |
| RN-114 | Resiliencia y Caché del<br>Tipo de Cambio | El sistema almacena en memoria caché el tipo de cambio diario<br>obtenido de Dolar.pe para optimizar consultas. Si la pasarela de<br>tipo de cambio falla, el sistema aplica una política de fallback:<br>primero intenta usar el último valor histórico guardado en base<br>de datos; de no existir, aplica un valor predeterminado<br>configurado en el sistema. |
| RN-115 | Trazabilidad Segura de<br>Transacciones de Pago | Todo intento de cobro registra primero una orden en base de<br>datos con estado "PENDIENTE" de manera independiente a la<br>transacción global y antes de enviar los datos a la pasarela<br>externa. Esto previene condiciones de carrera, garantizando<br>que si el webhook de OpenPay responde más rápido de lo<br>esperado, la orden ya exista para conciliar el pago. |
| RN-116 | Validación Global de Aforo<br>en Búsquedas | Al momento de consultar disponibilidad, el sistema valida que la<br>cantidad mínima de asistentes solicitada no supere la<br>capacidad máxima absoluta de la sala más grande que se<br>encuentre habilitada en todas las instalaciones, previniendo<br>búsquedas que nunca tendrán un resultado exitoso. |
| RN-117 | Gestión Diferida de<br>Expiración de<br>Pre-Reservas | Las pre-reservas cuyo tiempo de gracia de 10 minutos ha<br>expirado no se limpian mediante un proceso programado (cron).<br>El sistema implementa una lógica de Stale Draft que invalida el<br>borrador caducado y libera el espacio de forma automática en el<br>instante preciso en que el usuario intenta crear una nueva<br>reserva o cuando se evalúan cruces de horarios. |


---

## Página 28

          RN-118   Idempotencia en la Si un usuario intenta usar nuevamente el enlace o token de
                   Verificación de Correo verificación de correo electrónico cuando su cuenta ya fue
                                    marcada como verificada, el sistema procesa la solicitud de
                                    forma idempotente, sin arrojar alertas de "token expirado" o
                                    "token usado", garantizando una experiencia de usuario sin
                                    interrupciones.
          RN-119   Notificación de Integración Ante eventos de verificación disparados por OpenPay hacia el
                   de Webhook OpenPay Webhook del sistema, la plataforma captura el código de
                                    validación y envía de forma automática un correo electrónico
                                    transaccional al administrador técnico para que finalice el
                                    proceso de configuración en el dashboard de la pasarela.
          RN-120   Ventana permitida para El sistema permitirá que los clientes realicen reservas con una
                   realizar reservas anticipación máxima de tres (3) meses calendario contados
                                    desde la fecha actual. Asimismo, se permitirá realizar reservas
                                    para el mismo día, siempre que el horario seleccionado sea
                                    posterior a la hora actual y se encuentre disponible según la
                                    validación del sistema. No se permitirá registrar reservas para
                                    fechas u horarios pasados, ni para fechas que excedan el límite
                                    máximo de tres meses de anticipación.
           9.  ANÁLISIS DE REQUERIMIENTOS FUNCIONAL
               9.1. ACTORES
                      -  Administrador Principal
                      -  Administradores
                      -  Clientes de Workpool
               9.2. REQUERIMIENTOS FUNCIONALES
           N°          Descripción del Requerimiento Reglas de Negocio Prioridad
                       Funcional
           RF-001      El sistema debe permitir a los RN-008, RN-023, MUST HAVE
                       usuarios   registrarse RN-024, RN-025,
                       proporcionando  su RN-026, RN-027
                       información personal para
                       acceder a las funcionalidades
                       del sistema.
           RF-002      El sistema debe permitir a los RN-001, RN-028, MUST HAVE
                       usuarios  autenticarse RN-029, RN-030,
                       mediante  credenciales RN-031, RN-032
                       válidas.
           RF-003      El sistema debe validar que RN-016, RN-033, MUST HAVE
                       los datos ingresados por el RN-034, RN-035,
                       usuario cumplan con el RN-036, RN-037,
                       formato y restricciones RN-038, RN-039
                       definidas antes de ser
                       procesados.


### Tablas de la página


#### Tabla 1

| RN-118 | Idempotencia en la<br>Verificación de Correo | Si un usuario intenta usar nuevamente el enlace o token de<br>verificación de correo electrónico cuando su cuenta ya fue<br>marcada como verificada, el sistema procesa la solicitud de<br>forma idempotente, sin arrojar alertas de "token expirado" o<br>"token usado", garantizando una experiencia de usuario sin<br>interrupciones. |
| --- | --- | --- |
| RN-119 | Notificación de Integración<br>de Webhook OpenPay | Ante eventos de verificación disparados por OpenPay hacia el<br>Webhook del sistema, la plataforma captura el código de<br>validación y envía de forma automática un correo electrónico<br>transaccional al administrador técnico para que finalice el<br>proceso de configuración en el dashboard de la pasarela. |
| RN-120 | Ventana permitida para<br>realizar reservas | El sistema permitirá que los clientes realicen reservas con una<br>anticipación máxima de tres (3) meses calendario contados<br>desde la fecha actual. Asimismo, se permitirá realizar reservas<br>para el mismo día, siempre que el horario seleccionado sea<br>posterior a la hora actual y se encuentre disponible según la<br>validación del sistema. No se permitirá registrar reservas para<br>fechas u horarios pasados, ni para fechas que excedan el límite<br>máximo de tres meses de anticipación. |


#### Tabla 2

| N° | Descripción del Requerimiento<br>Funcional | Reglas de Negocio | Prioridad |
| --- | --- | --- | --- |
| RF-001 | El sistema debe permitir a los<br>usuarios registrarse<br>proporcionando su<br>información personal para<br>acceder a las funcionalidades<br>del sistema. | RN-008, RN-023,<br>RN-024, RN-025,<br>RN-026, RN-027 | MUST HAVE |
| RF-002 | El sistema debe permitir a los<br>usuarios autenticarse<br>mediante credenciales<br>válidas. | RN-001, RN-028,<br>RN-029, RN-030,<br>RN-031, RN-032 | MUST HAVE |
| RF-003 | El sistema debe validar que<br>los datos ingresados por el<br>usuario cumplan con el<br>formato y restricciones<br>definidas antes de ser<br>procesados. | RN-016, RN-033,<br>RN-034, RN-035,<br>RN-036, RN-037,<br>RN-038, RN-039 | MUST HAVE |


---

## Página 29

           RF-004      El sistema debe limitar los RN-001, RN-040, MUST HAVE
                       intentos fallidos de inicio de RN-041, RN-042,
                       sesión  y   bloquear RN-043
                       temporalmente la cuenta al
                       superar el número permitido.
           RF-005      El sistema debe permitir a los RN-017, RN-044, MUST HAVE
                       usuarios recuperar el acceso RN-045, RN-046
                       a su cuenta mediante un
                       proceso de restablecimiento
                       de contraseña.
           RF-006      El sistema debe permitir a los RN-016, RN-018, MUST HAVE
                       usuarios visualizar, modificar y RN-033, RN-038,
                       eliminar su información RN-039, RN-005
                       personal y su cuenta.
           RF-007      El sistema debe permitir a los RN-007 MUST HAVE
                       usuarios cerrar sesión de
                       manera segura.
           RF-008      El sistema debe restringir el RN-008, RN-014, MUST HAVE
                       acceso a funcionalidades, RN-015, RN-108
                       rutas e interfaces según el rol
                       del usuario autenticado,
                       mostrando un mensaje de
                       error en caso de acceso no
                       autorizado.
           RF-009      El sistema debe permitir a los RN-012, RN-020, MUST HAVE
                       usuarios acceder a un panel RN-005
                       personal para visualizar el
                       estado y el historial de sus
                       reservas pasadas y vigentes.
           RF-010      El sistema debe permitir a los RN-021, RN-106 MUST HAVE
                       usuarios definir los requisitos
                       de la sala que desean
                       reservar.
           RF-011      El sistema debe mostrar la RN-013, RN-011, MUST HAVE
                       disponibilidad de salas que RN-012, RN-106
                       cumplan con los requisitos del
                       usuario mediante un
                       calendario interactivo.
           RF-012      El sistema debe mostrar los RN-003, RN-080, MUST HAVE
                       planes de precios disponibles RN-081, RN-096,
                       y sus costos asociados según RN-097
                       el espacio seleccionado.
           RF-013      El sistema debe permitir a los RN-002, RN-013, MUST HAVE
                       usuarios seleccionar un RN-120
                       horario disponible para
                       realizar una reserva.


### Tablas de la página


#### Tabla 1

| RF-004 | El sistema debe limitar los<br>intentos fallidos de inicio de<br>sesión y bloquear<br>temporalmente la cuenta al<br>superar el número permitido. | RN-001, RN-040,<br>RN-041, RN-042,<br>RN-043 | MUST HAVE |
| --- | --- | --- | --- |
| RF-005 | El sistema debe permitir a los<br>usuarios recuperar el acceso<br>a su cuenta mediante un<br>proceso de restablecimiento<br>de contraseña. | RN-017, RN-044,<br>RN-045, RN-046 | MUST HAVE |
| RF-006 | El sistema debe permitir a los<br>usuarios visualizar, modificar y<br>eliminar su información<br>personal y su cuenta. | RN-016, RN-018,<br>RN-033, RN-038,<br>RN-039, RN-005 | MUST HAVE |
| RF-007 | El sistema debe permitir a los<br>usuarios cerrar sesión de<br>manera segura. | RN-007 | MUST HAVE |
| RF-008 | El sistema debe restringir el<br>acceso a funcionalidades,<br>rutas e interfaces según el rol<br>del usuario autenticado,<br>mostrando un mensaje de<br>error en caso de acceso no<br>autorizado. | RN-008, RN-014,<br>RN-015, RN-108 | MUST HAVE |
| RF-009 | El sistema debe permitir a los<br>usuarios acceder a un panel<br>personal para visualizar el<br>estado y el historial de sus<br>reservas pasadas y vigentes. | RN-012, RN-020,<br>RN-005 | MUST HAVE |
| RF-010 | El sistema debe permitir a los<br>usuarios definir los requisitos<br>de la sala que desean<br>reservar. | RN-021, RN-106 | MUST HAVE |
| RF-011 | El sistema debe mostrar la<br>disponibilidad de salas que<br>cumplan con los requisitos del<br>usuario mediante un<br>calendario interactivo. | RN-013, RN-011,<br>RN-012, RN-106 | MUST HAVE |
| RF-012 | El sistema debe mostrar los<br>planes de precios disponibles<br>y sus costos asociados según<br>el espacio seleccionado. | RN-003, RN-080,<br>RN-081, RN-096,<br>RN-097 | MUST HAVE |
| RF-013 | El sistema debe permitir a los<br>usuarios seleccionar un<br>horario disponible para<br>realizar una reserva. | RN-002, RN-013,<br>RN-120 | MUST HAVE |


---

## Página 30

           RF-014      El sistema debe evitar la RN-002, RN-013 MUST HAVE
                       asignación simultánea de un
                       mismo horario a múltiples
                       usuarios durante el proceso
                       de reserva.
           RF-015      El sistema debe mostrar al RN-002, RN-104 MUST HAVE
                       usuario el tiempo disponible
                       para completar el proceso de
                       reserva.
           RF-016      El sistema debe liberar RN-002, RN-012, MUST HAVE
                       automáticamente los horarios RN-059, RN-120
                       que  no  hayan sido
                       confirmados dentro del tiempo
                       establecido.
           RF-017      El sistema debe presentar un RN-004, RN-033, MUST HAVE
                       formulario para completar la RN-038, RN-039
                       información necesaria de la
                       reserva.
           RF-018      El sistema debe permitir RN-004   MUST HAVE
                       registrar asistentes y servicios
                       adicionales asociados a una
                       reserva.
           RF-019      El sistema debe conservar la RN-007, RN-100 MUST HAVE
                       información ingresada en caso
                       de interrupciones antes de
                       finalizar la reserva.
           RF-020      El sistema debe calcular RN-003,  MUST HAVE
                       automáticamente el costo total RN-095,RN-096,
                       de la reserva en función del RN-097, RN-098, RN-99
                       plan seleccionado y el tiempo
                       adicional.
           RF-021      El sistema debe permitir RN-002, RN-012, MUST HAVE
                       procesar pagos a través de RN-057, RN-058,
                       una pasarela externa y RN-059, RN-094
                       actualizar el estado de la
                       reserva.
           RF-022      El sistema debe asegurar que RN-002, RN-057, MUST HAVE
                       una reserva solo sea RN-058, RN-059,
                       confirmada cuando la RN-093, RN-094
                       transacción de pago haya sido
                       validada exitosamente por la
                       pasarela externa. En caso de
                       fallo o interrupción del proceso
                       de pago, la reserva no deberá
                       ser confirmada.
           RF-023      El sistema debe enviar una RN-012, RN-022, MUST HAVE


### Tablas de la página


#### Tabla 1

| RF-014 | El sistema debe evitar la<br>asignación simultánea de un<br>mismo horario a múltiples<br>usuarios durante el proceso<br>de reserva. | RN-002, RN-013 | MUST HAVE |
| --- | --- | --- | --- |
| RF-015 | El sistema debe mostrar al<br>usuario el tiempo disponible<br>para completar el proceso de<br>reserva. | RN-002, RN-104 | MUST HAVE |
| RF-016 | El sistema debe liberar<br>automáticamente los horarios<br>que no hayan sido<br>confirmados dentro del tiempo<br>establecido. | RN-002, RN-012,<br>RN-059, RN-120 | MUST HAVE |
| RF-017 | El sistema debe presentar un<br>formulario para completar la<br>información necesaria de la<br>reserva. | RN-004, RN-033,<br>RN-038, RN-039 | MUST HAVE |
| RF-018 | El sistema debe permitir<br>registrar asistentes y servicios<br>adicionales asociados a una<br>reserva. | RN-004 | MUST HAVE |
| RF-019 | El sistema debe conservar la<br>información ingresada en caso<br>de interrupciones antes de<br>finalizar la reserva. | RN-007, RN-100 | MUST HAVE |
| RF-020 | El sistema debe calcular<br>automáticamente el costo total<br>de la reserva en función del<br>plan seleccionado y el tiempo<br>adicional. | RN-003,<br>RN-095,RN-096,<br>RN-097, RN-098, RN-99 | MUST HAVE |
| RF-021 | El sistema debe permitir<br>procesar pagos a través de<br>una pasarela externa y<br>actualizar el estado de la<br>reserva. | RN-002, RN-012,<br>RN-057, RN-058,<br>RN-059, RN-094 | MUST HAVE |
| RF-022 | El sistema debe asegurar que<br>una reserva solo sea<br>confirmada cuando la<br>transacción de pago haya sido<br>validada exitosamente por la<br>pasarela externa. En caso de<br>fallo o interrupción del proceso<br>de pago, la reserva no deberá<br>ser confirmada. | RN-002, RN-057,<br>RN-058, RN-059,<br>RN-093, RN-094 | MUST HAVE |
| RF-023 | El sistema debe enviar una | RN-012, RN-022, | MUST HAVE |


---

## Página 31

                       confirmación de la reserva al RN-086, RN-087,
                       correo electrónico del usuario. RN-088, RN-089,
                                         RN-090
           RF-024      El sistema debe permitir a los RN-005, RN-91, RN-92 MUST HAVE
                       usuarios solicitar la
                       reprogramación de sus
                       reservas refiriendo a
                       Whatsapp para contactar a un
                       asesor.
           RF-025      El sistema debe limitar la RN-005, RN-91, RN-92 MUST HAVE
                       cantidad de solicitudes de
                       reprogramación por reserva
                       según reglas definidas.
           RF-026      El sistema debe notificar (por RN-012, RN-022, RN-86, MUST HAVE
                       correo) al usuario sobre RN-87, RN-88, RN89,
                       cambios en el estado de sus RN-90
                       reservas.
           RF-027      El sistema debe permitir al RN-008, RN-009, RN-85 NICE TO HAVE
                       “Administrador Principal”
                       gestionar cuentas de
                       administradores.
           RF-028      El sistema debe permitir a los RN-008, RN-009, MUST HAVE
                       administradores gestionar RN-014, RN-015, RN-82,
                       usuarios y controlar su RN-83, RN-84, RN-108
                       acceso.
           RF-029      El sistema debe permitir a los RN-77, RN-78, RN-79, MUST HAVE
                       administradores crear, editar, RN-80, RN-81
                       desactivar y eliminar espacios
                       y planes de precios.
           RF-030      El sistema debe permitir a los RN-011, RN-75, RN-76 MUST HAVE
                       administradores gestionar la
                       disponibilidad de horarios,
                       incluyendo  bloqueos
                       manuales.
           RF-031      El sistema debe permitir a los RN-005 MUST HAVE
                       administradores aprobar o
                       rechazar solicitudes de
                       reprogramación.
           RF-032      El sistema debe permitir a los RN-006, RN-72, RN-73 MUST HAVE
                       administradores cancelar
                       reservas.
           RF-033      El sistema debe permitir a los RN-68, RN-69, RN-70, MUST HAVE
                       administradores consultar RN-71
                       disponibilidad de salas.


### Tablas de la página


#### Tabla 1

|  | confirmación de la reserva al<br>correo electrónico del usuario. | RN-086, RN-087,<br>RN-088, RN-089,<br>RN-090 |  |
| --- | --- | --- | --- |
| RF-024 | El sistema debe permitir a los<br>usuarios solicitar la<br>reprogramación de sus<br>reservas refiriendo a<br>Whatsapp para contactar a un<br>asesor. | RN-005, RN-91, RN-92 | MUST HAVE |
| RF-025 | El sistema debe limitar la<br>cantidad de solicitudes de<br>reprogramación por reserva<br>según reglas definidas. | RN-005, RN-91, RN-92 | MUST HAVE |
| RF-026 | El sistema debe notificar (por<br>correo) al usuario sobre<br>cambios en el estado de sus<br>reservas. | RN-012, RN-022, RN-86,<br>RN-87, RN-88, RN89,<br>RN-90 | MUST HAVE |
| RF-027 | El sistema debe permitir al<br>“Administrador Principal”<br>gestionar cuentas de<br>administradores. | RN-008, RN-009, RN-85 | NICE TO HAVE |
| RF-028 | El sistema debe permitir a los<br>administradores gestionar<br>usuarios y controlar su<br>acceso. | RN-008, RN-009,<br>RN-014, RN-015, RN-82,<br>RN-83, RN-84, RN-108 | MUST HAVE |
| RF-029 | El sistema debe permitir a los<br>administradores crear, editar,<br>desactivar y eliminar espacios<br>y planes de precios. | RN-77, RN-78, RN-79,<br>RN-80, RN-81 | MUST HAVE |
| RF-030 | El sistema debe permitir a los<br>administradores gestionar la<br>disponibilidad de horarios,<br>incluyendo bloqueos<br>manuales. | RN-011, RN-75, RN-76 | MUST HAVE |
| RF-031 | El sistema debe permitir a los<br>administradores aprobar o<br>rechazar solicitudes de<br>reprogramación. | RN-005 | MUST HAVE |
| RF-032 | El sistema debe permitir a los<br>administradores cancelar<br>reservas. | RN-006, RN-72, RN-73 | MUST HAVE |
| RF-033 | El sistema debe permitir a los<br>administradores consultar<br>disponibilidad de salas. | RN-68, RN-69, RN-70,<br>RN-71 | MUST HAVE |


---

## Página 32

           RF-034      El sistema debe permitir a los RN-019, RN-64, RN-65, NICE TO HAVE
                       administradores visualizar el RN-66, RN-67
                       historial de reservas de los
                       usuarios.
           RF-035      El sistema debe permitir RN-011, RN-013, NICE TO HAVE
                       generar reportes de RN-019, RN-60, RN-61,
                       ocupación, reservas, ingresos RN-62, RN-63
                       y usuarios activos por rango
                       de fechas.
           RF-036      El sistema debe notificar al RN-002, RN-57, RN-58, MUST HAVE
                       usuario cuando el proceso de RN-59
                       pago no  se complete
                       exitosamente y permitirle
                       reintentar la transacción sin
                       perder la información de la
                       reserva.
           RF-037      El sistema debe permitir RN-47, RN-48, RN-49, NICE TO HAVE
                       exportar reportes de reservas RN-50, RN-51, RN-52
                       en formato PDF o CSV para
                       análisis administrativo.
           RF-038      El sistema debe enviar RN-56      OUT OF SCOPE
                       recordatorios automáticos
                       antes de la fecha de una
                       reserva confirmada.
           RF-039      El sistema debe permitir a los RN-010, RN-013 MUST HAVE
                       administradores registrar
                       reservas    manuales
                       directamente  como
                       "confirmadas" sin pasar por el
                       pago digital.
           RF-040      El sistema debe permitir al RN-111 MUST HAVE
                       usuario     cancelar
                       voluntariamente su
                       pre-reserva mientras esté en
                       estado pendiente liberando el
                       horario.
           RF-041      El sistema debe permitir a los RN-055 OUT OF SCOPE
                       usuarios registrarse e iniciar
                       sesión mediante cuenta de
                       Google.
           RF-042      El sistema debe permitir que RN-054 OUT OF SCOPE
                       los usuarios e invitados
                       registrados en una reserva
                       añadan a la misma en su
                       Google Calendar.
           RF-043      El sistema debe emitir RN-053     OUT OF SCOPE


### Tablas de la página


#### Tabla 1

| RF-034 | El sistema debe permitir a los<br>administradores visualizar el<br>historial de reservas de los<br>usuarios. | RN-019, RN-64, RN-65,<br>RN-66, RN-67 | NICE TO HAVE |
| --- | --- | --- | --- |
| RF-035 | El sistema debe permitir<br>generar reportes de<br>ocupación, reservas, ingresos<br>y usuarios activos por rango<br>de fechas. | RN-011, RN-013,<br>RN-019, RN-60, RN-61,<br>RN-62, RN-63 | NICE TO HAVE |
| RF-036 | El sistema debe notificar al<br>usuario cuando el proceso de<br>pago no se complete<br>exitosamente y permitirle<br>reintentar la transacción sin<br>perder la información de la<br>reserva. | RN-002, RN-57, RN-58,<br>RN-59 | MUST HAVE |
| RF-037 | El sistema debe permitir<br>exportar reportes de reservas<br>en formato PDF o CSV para<br>análisis administrativo. | RN-47, RN-48, RN-49,<br>RN-50, RN-51, RN-52 | NICE TO HAVE |
| RF-038 | El sistema debe enviar<br>recordatorios automáticos<br>antes de la fecha de una<br>reserva confirmada. | RN-56 | OUT OF SCOPE |
| RF-039 | El sistema debe permitir a los<br>administradores registrar<br>reservas manuales<br>directamente como<br>"confirmadas" sin pasar por el<br>pago digital. | RN-010, RN-013 | MUST HAVE |
| RF-040 | El sistema debe permitir al<br>usuario cancelar<br>voluntariamente su<br>pre-reserva mientras esté en<br>estado pendiente liberando el<br>horario. | RN-111 | MUST HAVE |
| RF-041 | El sistema debe permitir a los<br>usuarios registrarse e iniciar<br>sesión mediante cuenta de<br>Google. | RN-055 | OUT OF SCOPE |
| RF-042 | El sistema debe permitir que<br>los usuarios e invitados<br>registrados en una reserva<br>añadan a la misma en su<br>Google Calendar. | RN-054 | OUT OF SCOPE |
| RF-043 | El sistema debe emitir | RN-053 | OUT OF SCOPE |


---

## Página 33

                       facturas de   forma
                       automatizada usando el
                       servicio externo Wally.
           RF-044      El sistema debe notificar RN-119  MUST HAVE
                       automáticamente al
                       administrador técnico sobre
                       eventos de integración
                       requeridos por la pasarela de
                       pagos (Webhook).
           RF-045      El sistema debe proveer a los RN-060, RN-061, MUST HAVE
                       administradores un panel de RN-063
                       control (Dashboard) con
                       métricas clave en tiempo real
                       sobre la ocupación, ingresos,
                       y estado general de las
                       reservas.
           RF-046      El sistema debe permitir a los RN-077, RN-105 MUST HAVE
                       administradores crear, editar,
                       eliminar y gestionar las
                       categorías o tipos de espacios
                       (Kinds) para organizar la
                       oferta del coworking.
           RF-047      El sistema debe permitir a los RN-077 MUST HAVE
                       administradores subir,
                       gestionar y  eliminar
                       fotografías para cada espacio
                       registrado, conformando una
                       galería visual para el cliente.
           RF-048      El sistema debe ejecutar RN-012, RN-117 MUST HAVE
                       tareas programadas en
                       segundo plano (cron jobs) de
                       manera regular para el
                       mantenimiento automático de
                       los estados de las reservas.
           RF-049      El sistema debe enviar un RN-023  MUST HAVE
                       enlace o código de
                       verificación al correo del
                       usuario recién registrado y
                       permitirle validar su cuenta
                       para activarla antes del primer
                       inicio de sesión.
               9.3. REQUERIMIENTOS NO FUNCIONALES
           N°          Descripción del Requerimiento Reglas de Negocio Prioridad


### Tablas de la página


#### Tabla 1

|  | facturas de forma<br>automatizada usando el<br>servicio externo Wally. |  |  |
| --- | --- | --- | --- |
| RF-044 | El sistema debe notificar<br>automáticamente al<br>administrador técnico sobre<br>eventos de integración<br>requeridos por la pasarela de<br>pagos (Webhook). | RN-119 | MUST HAVE |
| RF-045 | El sistema debe proveer a los<br>administradores un panel de<br>control (Dashboard) con<br>métricas clave en tiempo real<br>sobre la ocupación, ingresos,<br>y estado general de las<br>reservas. | RN-060, RN-061,<br>RN-063 | MUST HAVE |
| RF-046 | El sistema debe permitir a los<br>administradores crear, editar,<br>eliminar y gestionar las<br>categorías o tipos de espacios<br>(Kinds) para organizar la<br>oferta del coworking. | RN-077, RN-105 | MUST HAVE |
| RF-047 | El sistema debe permitir a los<br>administradores subir,<br>gestionar y eliminar<br>fotografías para cada espacio<br>registrado, conformando una<br>galería visual para el cliente. | RN-077 | MUST HAVE |
| RF-048 | El sistema debe ejecutar<br>tareas programadas en<br>segundo plano (cron jobs) de<br>manera regular para el<br>mantenimiento automático de<br>los estados de las reservas. | RN-012, RN-117 | MUST HAVE |
| RF-049 | El sistema debe enviar un<br>enlace o código de<br>verificación al correo del<br>usuario recién registrado y<br>permitirle validar su cuenta<br>para activarla antes del primer<br>inicio de sesión. | RN-023 | MUST HAVE |


#### Tabla 2

| N° | Descripción del Requerimiento | Reglas de Negocio | Prioridad |
| --- | --- | --- | --- |


---

## Página 34

                       no Funcional
           RNF-001     Se utilizará obligatoriamente RN-016, RN-017, MUST HAVE
                       el protocolo HTTPS para RN-022, RN-023,
                       todas las peticiones. RN-026, RN-028,
                                         RN-029,   RN-037,
                                         RN-038, RN-45, RN-46,
                                         RN-088
           RNF-002     La   persistencia de RN-026, RN-028, MUST HAVE
                       contraseñas se realizará RN-029, RN-45
                       utilizando el algoritmo Bcrypt
                       con un factor de coste mínimo
                       de 12.
           RNF-003     Los mensajes de error de la RN-030, RN-039, NICE TO HAVE
                       API deben estar estructurados RN-043
                       bajo el estándar RFC-9457.
           RNF-004     El sistema debe entregar una RN-002, RN-013,
                       respuesta visual en un tiempo RN-021, RN-57, RN-68, NICE TO HAVE
                       no mayor a 3 segundos bajo RN-69, RN-088
                       carga normal.
           RNF-005     Implementación de índices RN-002, RN-011, NICE TO HAVE
                       GIST en la base de datos para RN-013, RN-021, RN-60,
                       optimizar consultas de rangos RN-61, RN-68, RN-69,
                       de tiempo.        RN-70, RN-73, RN-75,
                                         RN-76
           RNF-006     El sistema debe garantizar un RN-002, RN-007, NICE TO HAVE
                       uptime del 99.9% en régimen RN-013, RN-022, RN-57,
                       24/7.             RN-59, RN-088, RN-090,
                                         RN-100
           RNF-007     El sistema debe ser resiliente RN-002, RN-010, MUST HAVE
                       ante fallos de servicios RN-012, RN-057,
                       externos de terceros (pagos). RN-058, RN-059,
                                         RN-090,   RN-093,
                                         RN-094, RN-097
           RNF-008     Toda reserva debe ejecutarse RN-002, RN-010, MUST HAVE
                       bajo una transacción ACID RN-012, RN-013,
                       (Atomicidad, Consistencia, RN-057, RN-058,
                       Aislamiento, Durabilidad). RN-059, RN-073,
                                         RN-089,   RN-091,
                                         RN-092,   RN-093,
                                         RN-094,   RN-095,
                                         RN-097,   RN-098,
                                         RN-100,   RN-101,
                                         RN-102, RN-103
           RNF-009     El flujo principal de reserva RN-002, RN-004, MUST HAVE
                       debe ser ejecutable en menos RN-021, RN-023,
                       de 10 min por usuarios RN-024, RN-026,


### Tablas de la página


#### Tabla 1

|  | no Funcional |  |  |
| --- | --- | --- | --- |
| RNF-001 | Se utilizará obligatoriamente<br>el protocolo HTTPS para<br>todas las peticiones. | RN-016, RN-017,<br>RN-022, RN-023,<br>RN-026, RN-028,<br>RN-029, RN-037,<br>RN-038, RN-45, RN-46,<br>RN-088 | MUST HAVE |
| RNF-002 | La persistencia de<br>contraseñas se realizará<br>utilizando el algoritmo Bcrypt<br>con un factor de coste mínimo<br>de 12. | RN-026, RN-028,<br>RN-029, RN-45 | MUST HAVE |
| RNF-003 | Los mensajes de error de la<br>API deben estar estructurados<br>bajo el estándar RFC-9457. | RN-030, RN-039,<br>RN-043 | NICE TO HAVE |
| RNF-004 | El sistema debe entregar una<br>respuesta visual en un tiempo<br>no mayor a 3 segundos bajo<br>carga normal. | RN-002, RN-013,<br>RN-021, RN-57, RN-68,<br>RN-69, RN-088 | NICE TO HAVE |
| RNF-005 | Implementación de índices<br>GIST en la base de datos para<br>optimizar consultas de rangos<br>de tiempo. | RN-002, RN-011,<br>RN-013, RN-021, RN-60,<br>RN-61, RN-68, RN-69,<br>RN-70, RN-73, RN-75,<br>RN-76 | NICE TO HAVE |
| RNF-006 | El sistema debe garantizar un<br>uptime del 99.9% en régimen<br>24/7. | RN-002, RN-007,<br>RN-013, RN-022, RN-57,<br>RN-59, RN-088, RN-090,<br>RN-100 | NICE TO HAVE |
| RNF-007 | El sistema debe ser resiliente<br>ante fallos de servicios<br>externos de terceros (pagos). | RN-002, RN-010,<br>RN-012, RN-057,<br>RN-058, RN-059,<br>RN-090, RN-093,<br>RN-094, RN-097 | MUST HAVE |
| RNF-008 | Toda reserva debe ejecutarse<br>bajo una transacción ACID<br>(Atomicidad, Consistencia,<br>Aislamiento, Durabilidad). | RN-002, RN-010,<br>RN-012, RN-013,<br>RN-057, RN-058,<br>RN-059, RN-073,<br>RN-089, RN-091,<br>RN-092, RN-093,<br>RN-094, RN-095,<br>RN-097, RN-098,<br>RN-100, RN-101,<br>RN-102, RN-103 | MUST HAVE |
| RNF-009 | El flujo principal de reserva<br>debe ser ejecutable en menos<br>de 10 min por usuarios | RN-002, RN-004,<br>RN-021, RN-023,<br>RN-024, RN-026, | MUST HAVE |


---

## Página 35

                       nuevos.           RN-027,   RN-033,
                                         RN-057, RN-096, RN-99,
                                         RN-101, RN-103
           RNF-010     El frontend debe utilizar un RN-004, RN-021, MUST HAVE
                       framework de componentes RN-039, RN-069,
                       (ej. Tailwind o Bootstrap) que RN-096, RN-99, RN-101
                       garantice el diseño
                       Mobile-First.
               9.4. DIAGRAMA DE CASO DE USO Y SU ESPECIFICACIÓN
          Lista de casos de uso
           Código              Nombre               Cu padre (TODO)
           CU-001              Registrar usuario    -
           CU-002              Iniciar sesión       -
           CU-003              Cambiar de contraseña CU-002
           CU-004              Acceder al sistema   CU-002
           CU-005              Consultar disponibilidad de CU-004
                               espacios
           CU-006              Realizar una reserva CU-005
           CU-007              Realizar pago de reserva CU-006
           CU-008              Solicitar reprogramación de una CU-004
                               reserva
           CU-009              Crear nuevo rol      CU-004
           CU-010              Modificar permisos de un rol CU-004, CU-009
           CU-011              Cambiar roles de un usuario CU-004, CU-009
           CU-012              Cancelar una reserva CU-004, CU-006
           CU-013              Reprogramar una reserva como CU-004
                               administrador
           CU-014              Bloquear un horario  CU-004
           CU-015              Registrar reserva como CU-004
                               administrador
           CU-016              Consultar una reserva CU-004
           CU-017              Mantener catálogo de espacios y CU-004


### Tablas de la página


#### Tabla 1

|  | nuevos. | RN-027, RN-033,<br>RN-057, RN-096, RN-99,<br>RN-101, RN-103 |  |
| --- | --- | --- | --- |
| RNF-010 | El frontend debe utilizar un<br>framework de componentes<br>(ej. Tailwind o Bootstrap) que<br>garantice el diseño<br>Mobile-First. | RN-004, RN-021,<br>RN-039, RN-069,<br>RN-096, RN-99, RN-101 | MUST HAVE |


#### Tabla 2

| Código | Nombre | Cu padre (TODO) |
| --- | --- | --- |
| CU-001 | Registrar usuario | - |
| CU-002 | Iniciar sesión | - |
| CU-003 | Cambiar de contraseña | CU-002 |
| CU-004 | Acceder al sistema | CU-002 |
| CU-005 | Consultar disponibilidad de<br>espacios | CU-004 |
| CU-006 | Realizar una reserva | CU-005 |
| CU-007 | Realizar pago de reserva | CU-006 |
| CU-008 | Solicitar reprogramación de una<br>reserva | CU-004 |
| CU-009 | Crear nuevo rol | CU-004 |
| CU-010 | Modificar permisos de un rol | CU-004, CU-009 |
| CU-011 | Cambiar roles de un usuario | CU-004, CU-009 |
| CU-012 | Cancelar una reserva | CU-004, CU-006 |
| CU-013 | Reprogramar una reserva como<br>administrador | CU-004 |
| CU-014 | Bloquear un horario | CU-004 |
| CU-015 | Registrar reserva como<br>administrador | CU-004 |
| CU-016 | Consultar una reserva | CU-004 |
| CU-017 | Mantener catálogo de espacios y | CU-004 |


---

## Página 36

                               planes de precio
           CU-018              Gestionar envío de correos CU-001, CU-003, CU-007,
                                                    CU-012, CU-013, CU-024
           CU-019              Consultar catálogo de espacios CU-004 - CU-005
           CU-020              Consultar reportes y estadísticas CU-004
                               administrativas
           CU-021              Modificar perfil de usuario CU-004
           CU-022              Actualizar contraseña desde el CU-004
                               perfil de usuario
           CU-023              Consultar información detallada de CU-004
                               usuario
           CU-024              Rechazar  solicitud de CU-004
                               reprogramación
           CU-025              Consultar todas las reservas CU-004
                               registradas
           CU-026              Desactivar un usuario CU-004
           CU-027              Visualizar resumen administrativo CU-004
                               y accesos rápidos
           CU-028              Eliminar rol         CU-004, CU-009
          Especificación de casos
          CU001: Registrar Usuario
           Descripción     Permite al usuario registrarse en el sistema de la
                           plataforma configurando credenciales de acceso
                           (usuario y contraseña) mediante la introducción de un
                           conjunto de datos de identificación a través de un
                           formulario.
           Actores           -  Usuarios
           Precondiciones
             1. El sistema está operativo.
             2. El sistema tiene acceso al servicio de envío de correos electrónicos
             3. El usuario no debe tener una sesión activa en el navegador al momento de
                intentar el registro.
             4. El sistema debe tener configurado el rol de "Cliente" por defecto.
           Flujo Básico
             1. El usuario accede a la URL del sistema.
             2. El usuario ingresa al apartado de autenticación
             3. El sistema muestra formulario de inicio de sesión
             4. El usuario selecciona la opción de registro


### Tablas de la página


#### Tabla 1

|  | planes de precio |  |
| --- | --- | --- |
| CU-018 | Gestionar envío de correos | CU-001, CU-003, CU-007,<br>CU-012, CU-013, CU-024 |
| CU-019 | Consultar catálogo de espacios | CU-004 - CU-005 |
| CU-020 | Consultar reportes y estadísticas<br>administrativas | CU-004 |
| CU-021 | Modificar perfil de usuario | CU-004 |
| CU-022 | Actualizar contraseña desde el<br>perfil de usuario | CU-004 |
| CU-023 | Consultar información detallada de<br>usuario | CU-004 |
| CU-024 | Rechazar solicitud de<br>reprogramación | CU-004 |
| CU-025 | Consultar todas las reservas<br>registradas | CU-004 |
| CU-026 | Desactivar un usuario | CU-004 |
| CU-027 | Visualizar resumen administrativo<br>y accesos rápidos | CU-004 |
| CU-028 | Eliminar rol | CU-004, CU-009 |


#### Tabla 2

| Descripción | Permite al usuario registrarse en el sistema de la<br>plataforma configurando credenciales de acceso<br>(usuario y contraseña) mediante la introducción de un<br>conjunto de datos de identificación a través de un<br>formulario. |
| --- | --- |
| Actores | - Usuarios |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El sistema tiene acceso al servicio de envío de correos electrónicos<br>3. El usuario no debe tener una sesión activa en el navegador al momento de<br>intentar el registro.<br>4. El sistema debe tener configurado el rol de "Cliente" por defecto. |  |
| Flujo Básico |  |
| 1. El usuario accede a la URL del sistema.<br>2. El usuario ingresa al apartado de autenticación<br>3. El sistema muestra formulario de inicio de sesión<br>4. El usuario selecciona la opción de registro |  |


---

## Página 37

             5. El sistema muestra formulario de registro
             6. El usuario rellena campos vacíos de formulario con información personal
                requerido bajo los criterios de aceptación correspondiente
             7. El usuario envía el formulario de registro
             8. El sistema registra al usuario en estado "Sin Verificar" y envía un enlace de
                verificación a su correo electrónico
             9. El sistema redirige a una pantalla indicando que revise su buzón
             10. El usuario abre su correo y hace clic en el enlace de verificación
                proporcionado
             11. El sistema abre la plataforma, captura el token de verificación de la URL y
                lo valida automáticamente sin requerir interacción manual
             12. El sistema verifica la cuenta y muestra un mensaje de éxito
             13. El usuario está registrado y tiene acceso al sistema con sus respectivas
                credenciales
           Flujo Alternativo
           Formato de correo inválido
             1. En el paso 6, el usuario ingresa un correo con formato incorrecto.
             2. El sistema muestra mensaje de error
             3. El usuario deberá corregir dato
           Código de verificación inválido o expirado
             1. En el paso 11, el token capturado de la URL ya no es válido
             2. El sistema muestra un mensaje de error y permite reintento o reenvío
           Correo ya registrado
             1. En el paso 7, el sistema detecta que el correo ya existe
             2. Se muestra un mensaje y se solicita uno diferente.
           Post Condiciones
             -  Si el usuario se registra con éxito, entonces el usuario podrá autenticarse
                en el sistema posteriormente mediante el formulario de inicio de sesión
                (login)
             -  Los datos persisten en la base de datos
           Restricciones
             -  El correo debe tener formato válido
             -  La contraseña debe cumplir con los criterios de seguridad
             -  El correo no debe haber sido creado previamente
             -  El enlace de verificación tiene un tiempo de expiración
           Casos de Uso Padre
           -
           Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 5. El sistema muestra formulario de registro<br>6. El usuario rellena campos vacíos de formulario con información personal<br>requerido bajo los criterios de aceptación correspondiente<br>7. El usuario envía el formulario de registro<br>8. El sistema registra al usuario en estado "Sin Verificar" y envía un enlace de<br>verificación a su correo electrónico<br>9. El sistema redirige a una pantalla indicando que revise su buzón<br>10. El usuario abre su correo y hace clic en el enlace de verificación<br>proporcionado<br>11. El sistema abre la plataforma, captura el token de verificación de la URL y<br>lo valida automáticamente sin requerir interacción manual<br>12. El sistema verifica la cuenta y muestra un mensaje de éxito<br>13. El usuario está registrado y tiene acceso al sistema con sus respectivas<br>credenciales |
| --- |
| Flujo Alternativo |
| Formato de correo inválido |
| 1. En el paso 6, el usuario ingresa un correo con formato incorrecto.<br>2. El sistema muestra mensaje de error<br>3. El usuario deberá corregir dato |
| Código de verificación inválido o expirado |
| 1. En el paso 11, el token capturado de la URL ya no es válido<br>2. El sistema muestra un mensaje de error y permite reintento o reenvío |
| Correo ya registrado |
| 1. En el paso 7, el sistema detecta que el correo ya existe<br>2. Se muestra un mensaje y se solicita uno diferente. |
| Post Condiciones |
| - Si el usuario se registra con éxito, entonces el usuario podrá autenticarse<br>en el sistema posteriormente mediante el formulario de inicio de sesión<br>(login)<br>- Los datos persisten en la base de datos |
| Restricciones |
| - El correo debe tener formato válido<br>- La contraseña debe cumplir con los criterios de seguridad<br>- El correo no debe haber sido creado previamente<br>- El enlace de verificación tiene un tiempo de expiración |
| Casos de Uso Padre |
| - |


---

## Página 38

           Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 39

          CU002: Iniciar Sesión
           Descripción   Permite al usuario tener acceso al sistema mediante la
                         validación de sus credenciales
           Actores          - Usuarios
           Precondiciones
             1. El sistema debe estar operativo.
             2. El usuario debe estar previamente registrado en el sistema.
             3. La cuenta del usuario debe estar en estado "Habilitado" o "Activo".
             4. La cuenta no debe estar bajo el periodo de bloqueo por intentos fallidos.
             3. El sistema tiene acceso al servicio de envío de correos electrónicos
             4. El usuario tiene acceso a su correo electrónico asociado a su cuenta
           Flujo Básico
             1. El usuario accede a la URL del sistema.
             2. El usuario ingresa al apartado de autenticación
             3. El sistema muestra el formulario de inicio de sesión.
             4. El usuario ingresa credenciales de su usuario y contraseña
             5. El usuario envía el formulario de inicio de sesión.
             6. El sistema valida credenciales
             7. El usuario tiene acceso a la plataforma
           Flujo Alternativo
           Credenciales inválidas
             1. En el paso 6, la validación falla.
             2. El sistema muestra un mensaje de error indicando que las credenciales son
              incorrectas y permite volver a ingresarlas.
           Usuario deshabilitado
             1. En el paso 6, la validación detecta que el usuario está deshabilitado.
             2. El sistema muestra un mensaje de error indicando que el usuario debe
                comunicarse con el administrador del sistema.
           Usuario no registrado


### Tablas de la página


#### Tabla 1

| Descripción | Permite al usuario tener acceso al sistema mediante la<br>validación de sus credenciales |
| --- | --- |
| Actores | - Usuarios |
| Precondiciones |  |
| 1. El sistema debe estar operativo.<br>2. El usuario debe estar previamente registrado en el sistema.<br>3. La cuenta del usuario debe estar en estado "Habilitado" o "Activo".<br>4. La cuenta no debe estar bajo el periodo de bloqueo por intentos fallidos.<br>3. El sistema tiene acceso al servicio de envío de correos electrónicos<br>4. El usuario tiene acceso a su correo electrónico asociado a su cuenta |  |
| Flujo Básico |  |
| 1. El usuario accede a la URL del sistema.<br>2. El usuario ingresa al apartado de autenticación<br>3. El sistema muestra el formulario de inicio de sesión.<br>4. El usuario ingresa credenciales de su usuario y contraseña<br>5. El usuario envía el formulario de inicio de sesión.<br>6. El sistema valida credenciales<br>7. El usuario tiene acceso a la plataforma |  |
| Flujo Alternativo |  |
| Credenciales inválidas |  |
| 1. En el paso 6, la validación falla.<br>2. El sistema muestra un mensaje de error indicando que las credenciales son<br>incorrectas y permite volver a ingresarlas. |  |
| Usuario deshabilitado |  |
| 1. En el paso 6, la validación detecta que el usuario está deshabilitado.<br>2. El sistema muestra un mensaje de error indicando que el usuario debe<br>comunicarse con el administrador del sistema. |  |
| Usuario no registrado |  |


---

## Página 40

             1. En el paso 6, la validación detecta que el usuario no está registrado.
             2. El sistema muestra un mensaje de error indicando que el usuario no está
              registrado y solicita contactar al administrador del sistema para solicitar
              acceso.
           Correo inválido o no asociado
             1. En el paso 4, el correo ingresado no tiene el formato válido o no está
                asociado a ninguna cuenta habilitada.
             2. El sistema muestra un mensaje de error y permite corregirlo.
           Usuario temporalmente bloqueado por superar el límite de intentos de login
             1. En el paso 6, se detecta que el usuario ha enviado el formulario
                erróneamente 5 veces en un lapso menor a 1 minuto.
             2. El sistema muestra un mensaje informativo al usuario y bloquea cualquier
                intento de login en los próximos 3 minutos.
           Post Condiciones
             1. Si el inicio de sesión es exitoso, el usuario queda autenticado en el
                sistema y puede acceder a las funcionalidades según su rol.
           Restricciones
             -  Las credenciales deben cumplir con el formato definido (usuario y
                contraseña válidos).
             -  La nueva contraseña debe cumplir con las políticas de seguridad vigentes.
             -  El código o enlace de recuperación tiene un tiempo de validez limitado;
                una vez expirado, debe generarse uno nuevo.
             -  El proceso de recuperación de contraseña solo está disponible para
                usuarios registrados y habilitados en el sistema.
           Casos de Uso Padre
           -
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. En el paso 6, la validación detecta que el usuario no está registrado.<br>2. El sistema muestra un mensaje de error indicando que el usuario no está<br>registrado y solicita contactar al administrador del sistema para solicitar<br>acceso. |
| --- |
| Correo inválido o no asociado |
| 1. En el paso 4, el correo ingresado no tiene el formato válido o no está<br>asociado a ninguna cuenta habilitada.<br>2. El sistema muestra un mensaje de error y permite corregirlo. |
| Usuario temporalmente bloqueado por superar el límite de intentos de login |
| 1. En el paso 6, se detecta que el usuario ha enviado el formulario<br>erróneamente 5 veces en un lapso menor a 1 minuto.<br>2. El sistema muestra un mensaje informativo al usuario y bloquea cualquier<br>intento de login en los próximos 3 minutos. |
| Post Condiciones |
| 1. Si el inicio de sesión es exitoso, el usuario queda autenticado en el<br>sistema y puede acceder a las funcionalidades según su rol. |
| Restricciones |
| - Las credenciales deben cumplir con el formato definido (usuario y<br>contraseña válidos).<br>- La nueva contraseña debe cumplir con las políticas de seguridad vigentes.<br>- El código o enlace de recuperación tiene un tiempo de validez limitado;<br>una vez expirado, debe generarse uno nuevo.<br>- El proceso de recuperación de contraseña solo está disponible para<br>usuarios registrados y habilitados en el sistema. |
| Casos de Uso Padre |
| - |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 41

          CU003: Cambiar de contraseña
           Descripción   Permite al usuario establecer su contraseña en caso de
                         haberla olvidado o como método de seguridad, a través
                         de un código de verificación.
           Actores       Usuarios
                         Servicio de correo electrónico
           Precondiciones
             1. El sistema está operativo.
             2. El usuario está registrado y habilitado.
             3. El servicio de envío de correos electrónicos está disponible.
             4. El usuario tiene acceso al correo electrónico asociado a su cuenta.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite al usuario establecer su contraseña en caso de<br>haberla olvidado o como método de seguridad, a través<br>de un código de verificación. |
| --- | --- |
| Actores | Usuarios<br>Servicio de correo electrónico |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario está registrado y habilitado.<br>3. El servicio de envío de correos electrónicos está disponible.<br>4. El usuario tiene acceso al correo electrónico asociado a su cuenta. |  |
| Flujo Básico |  |


---

## Página 42

             1. El usuario accede a la URL del sistema.
             2. El usuario ingresa al apartado de autenticación
             3. El usuario selecciona la opción “¿Olvidaste tu contraseña?”.
             4. El usuario ingresa su correo electrónico
             5. El sistema valida que el correo existe y está habilitado
             6. El sistema envía un enlace de recuperación seguro al correo del usuario
             7. El usuario hace clic en el enlace desde su correo
             8. El sistema abre el formulario de restablecimiento.
             9. El sistema valida el token contenido en la URL
             10. El usuario define y confirma la nueva contraseña.
             11. El sistema actualiza la contraseña
             12. El sistema muestra un mensaje de confirmación exitosa
             13. El usuario puede iniciar sesión con la nueva credencial.
           Flujo Alternativo
           Correo electrónico no registrado o inhabilitado
             1. En el paso 5, el sistema detecta que el correo no está registrado o
              habilitado
             2. El sistema muestra un mensaje de error y solicita ingresar correo válido
              asociado a cuenta de usuario
           Formato de correo inválido
             1. En el paso 4, el usuario ingresa un correo con formato incorrecto.
             2. El sistema muestra un mensaje de error y solicita corregirlo
           Codigo de verificación inválido o expirado
             3. En el paso 9, la validación falla porque el token del enlace ha expirado
             4. El sistema muestra un mensaje de advertencia y permite reintento o
                reenvío
             Contraseña no cumple políticas de seguridad
              1. En el paso 11, la nueva contraseña ingresada no cumple con las políticas
                de seguridad definidas.
              2. El sistema muestra un mensaje indicando las restricciones y solicita
                nueva contraseña
           Post Condiciones
             1. Si el proceso de recuperación de contraseña es exitoso, la nueva
                credencial queda registrada y el usuario puede iniciar sesión
                inmediatamente.
             2. Si la autenticación o la recuperación de contraseña fallan, el sistema
                permanece en la pantalla correspondiente
             3. El código o enlace de verificación queda invalidado después de su uso.
           Restricciones


### Tablas de la página


#### Tabla 1

| 1. El usuario accede a la URL del sistema.<br>2. El usuario ingresa al apartado de autenticación<br>3. El usuario selecciona la opción “¿Olvidaste tu contraseña?”.<br>4. El usuario ingresa su correo electrónico<br>5. El sistema valida que el correo existe y está habilitado<br>6. El sistema envía un enlace de recuperación seguro al correo del usuario<br>7. El usuario hace clic en el enlace desde su correo<br>8. El sistema abre el formulario de restablecimiento.<br>9. El sistema valida el token contenido en la URL<br>10. El usuario define y confirma la nueva contraseña.<br>11. El sistema actualiza la contraseña<br>12. El sistema muestra un mensaje de confirmación exitosa<br>13. El usuario puede iniciar sesión con la nueva credencial. |
| --- |
| Flujo Alternativo |
| Correo electrónico no registrado o inhabilitado |
| 1. En el paso 5, el sistema detecta que el correo no está registrado o<br>habilitado<br>2. El sistema muestra un mensaje de error y solicita ingresar correo válido<br>asociado a cuenta de usuario |
| Formato de correo inválido |
| 1. En el paso 4, el usuario ingresa un correo con formato incorrecto.<br>2. El sistema muestra un mensaje de error y solicita corregirlo |
| Codigo de verificación inválido o expirado |
| 3. En el paso 9, la validación falla porque el token del enlace ha expirado<br>4. El sistema muestra un mensaje de advertencia y permite reintento o<br>reenvío |
| Contraseña no cumple políticas de seguridad |
| 1. En el paso 11, la nueva contraseña ingresada no cumple con las políticas<br>de seguridad definidas.<br>2. El sistema muestra un mensaje indicando las restricciones y solicita<br>nueva contraseña |
| Post Condiciones |
| 1. Si el proceso de recuperación de contraseña es exitoso, la nueva<br>credencial queda registrada y el usuario puede iniciar sesión<br>inmediatamente.<br>2. Si la autenticación o la recuperación de contraseña fallan, el sistema<br>permanece en la pantalla correspondiente<br>3. El código o enlace de verificación queda invalidado después de su uso. |
| Restricciones |


---

## Página 43

             -  Las credenciales deben cumplir con el formato válido definido para
                usuario y contraseña.
             -  El correo electrónico debe tener un formato válido
             -  La nueva contraseña debe cumplir con las políticas de seguridad
                establecidas.
             -  El enlace tiene un tiempo de validez limitado; una vez expirado, debe
                generarse uno nuevo en caso de nueva solicitud.
             -  El proceso de recuperación de contraseña solo está disponible para
                usuarios registrados y habilitados en el sistema.
           Casos de Uso Padre
           CU-002
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| - Las credenciales deben cumplir con el formato válido definido para<br>usuario y contraseña.<br>- El correo electrónico debe tener un formato válido<br>- La nueva contraseña debe cumplir con las políticas de seguridad<br>establecidas.<br>- El enlace tiene un tiempo de validez limitado; una vez expirado, debe<br>generarse uno nuevo en caso de nueva solicitud.<br>- El proceso de recuperación de contraseña solo está disponible para<br>usuarios registrados y habilitados en el sistema. |
| --- |
| Casos de Uso Padre |
| CU-002 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 44

          CU004: Acceder al sistema
           Descripción   Permite al usuario autenticado acceder a su panel
                         principal dentro del sistema, donde puede visualizar y
                         utilizar las funcionalidades disponibles según su rol


### Tablas de la página


#### Tabla 1

| Descripción | Permite al usuario autenticado acceder a su panel<br>principal dentro del sistema, donde puede visualizar y<br>utilizar las funcionalidades disponibles según su rol |
| --- | --- |


---

## Página 45

           Actores          - Usuarios
                            - Servicio de autenticación
           Precondiciones
             1. El sistema está operativo.
             2. El usuario tiene una cuenta registrada y activa.
             3. El usuario tiene un rol asignado.
           Flujo Básico
             1. El usuario inicia sesión en el sistema
             2. El sistema valida las credenciales y autentica al usuario
             3. El sistema identifica el rol asociado al usuario actual
             4. El sistema redirige automáticamente al panel correspondiente de acuerdo
                al rol (usuario, admin, superadmin)
             5. El sistema muestra el panel del sistema con las funcionalidades
                disponibles según su rol
           Flujo Alternativo
           Sesión expirada o no válida
             1. En el paso 2, el sistema detecta que la sesión es inválida o el token de
                sesión ha expirado
             2. El sistema redirige al usuario al apartado de inicio de sesión
             3. El usuario debe autenticarse nuevamente
           Error en la carga del panel
             1. En el paso 4, ocurre un error al cargar el panel correspondiente
             2. El sistema muestra un mensaje pop-up de error
             3. El sistema permite reintentar la carga del panel
           Post Condiciones
             -  El usuario accede al panel del sistema correspondiente a su rol actual
             -  El sistema mantiene la sesión activa durante su interacción con la
                plataforma
           Restricciones
             -  El acceso al sistema está restringido a usuarios autenticados o con sesión
                válida
             -  Las funcionalidades visibles dentro del panel del sistema están disponibles
                de acuerdo al rol del usuario
           Casos de Uso Padre
           CU-002 - Iniciar sesión
           Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| Actores | - Usuarios<br>- Servicio de autenticación |
| --- | --- |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario tiene una cuenta registrada y activa.<br>3. El usuario tiene un rol asignado. |  |
| Flujo Básico |  |
| 1. El usuario inicia sesión en el sistema<br>2. El sistema valida las credenciales y autentica al usuario<br>3. El sistema identifica el rol asociado al usuario actual<br>4. El sistema redirige automáticamente al panel correspondiente de acuerdo<br>al rol (usuario, admin, superadmin)<br>5. El sistema muestra el panel del sistema con las funcionalidades<br>disponibles según su rol |  |
| Flujo Alternativo |  |
| Sesión expirada o no válida |  |
| 1. En el paso 2, el sistema detecta que la sesión es inválida o el token de<br>sesión ha expirado<br>2. El sistema redirige al usuario al apartado de inicio de sesión<br>3. El usuario debe autenticarse nuevamente |  |
| Error en la carga del panel |  |
| 1. En el paso 4, ocurre un error al cargar el panel correspondiente<br>2. El sistema muestra un mensaje pop-up de error<br>3. El sistema permite reintentar la carga del panel |  |
| Post Condiciones |  |
| - El usuario accede al panel del sistema correspondiente a su rol actual<br>- El sistema mantiene la sesión activa durante su interacción con la<br>plataforma |  |
| Restricciones |  |
| - El acceso al sistema está restringido a usuarios autenticados o con sesión<br>válida<br>- Las funcionalidades visibles dentro del panel del sistema están disponibles<br>de acuerdo al rol del usuario |  |
| Casos de Uso Padre |  |
| CU-002 - Iniciar sesión |  |


---

## Página 46

           Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 47

          CU005: Consultar disponibilidad de espacios
           Descripción   Permite al usuario visualizar la disponibilidad de
                         espacios en la plataforma según sus necesidades de
                         reserva
           Actores          - Usuarios
           Precondiciones
             1. El sistema está operativo.
             2. El usuario tiene una sesión activa.
             3. Existen espacios configurados y habilitados en el catálogo.
           Flujo Básico
             1. El usuario accede al módulo de reservas de espacios
             2. El sistema muestra las opciones de tipos de espacios disponibles
             3. El usuario selecciona un tipo de espacio
             4. El sistema muestra un calendario con los horarios disponibles para el tipo
                de espacio seleccionado
             5. El usuario navega en el calendario
             6. El usuario selecciona un bloque de horario disponible
             7. El sistema resalta el bloque seleccionado como disponible para la reserva
           Flujo Alternativo
           No existen horarios disponibles
             1. En el paso 4, el sistema no encuentra disponibilidad para el tipo de
                espacio seleccionado
             2. El sistema muestra un mensaje indicando que no hay horarios
                disponibles para la selección
           Selección de bloque no disponible


### Tablas de la página


#### Tabla 1

| Descripción | Permite al usuario visualizar la disponibilidad de<br>espacios en la plataforma según sus necesidades de<br>reserva |
| --- | --- |
| Actores | - Usuarios |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario tiene una sesión activa.<br>3. Existen espacios configurados y habilitados en el catálogo. |  |
| Flujo Básico |  |
| 1. El usuario accede al módulo de reservas de espacios<br>2. El sistema muestra las opciones de tipos de espacios disponibles<br>3. El usuario selecciona un tipo de espacio<br>4. El sistema muestra un calendario con los horarios disponibles para el tipo<br>de espacio seleccionado<br>5. El usuario navega en el calendario<br>6. El usuario selecciona un bloque de horario disponible<br>7. El sistema resalta el bloque seleccionado como disponible para la reserva |  |
| Flujo Alternativo |  |
| No existen horarios disponibles |  |
| 1. En el paso 4, el sistema no encuentra disponibilidad para el tipo de<br>espacio seleccionado<br>2. El sistema muestra un mensaje indicando que no hay horarios<br>disponibles para la selección |  |
| Selección de bloque no disponible |  |


---

## Página 48

             1. En el paso 6, el usuario selecciona un bloque que ya no está disponiblee
             2. El sistema muestra un mensaje indicando que el horario no está
                disponible
             3. El sistema solicita seleccionar otro bloque de horario
           Postcondiciones
             El usuario identifica un horario disponible para realizar una reserva
           Restricciones
             -  El usuario debe estar autenticado
             -  La disponibilidad mostrada depende de las reservas registradas en el
                sistema
             -  La información se actualiza en tiempo real o bajo condiciones definidas
                por el sistema de actualización constante de bajo delay
           Casos de Uso Padre
           CU-004 - Acceder al sistema
           Diagrama de caso de uso
           Prototipo
          CU006: Realizar una reserva


### Tablas de la página


#### Tabla 1

| 1. En el paso 6, el usuario selecciona un bloque que ya no está disponiblee<br>2. El sistema muestra un mensaje indicando que el horario no está<br>disponible<br>3. El sistema solicita seleccionar otro bloque de horario |
| --- |
| Postcondiciones |
| El usuario identifica un horario disponible para realizar una reserva |
| Restricciones |
| - El usuario debe estar autenticado<br>- La disponibilidad mostrada depende de las reservas registradas en el<br>sistema<br>- La información se actualiza en tiempo real o bajo condiciones definidas<br>por el sistema de actualización constante de bajo delay |
| Casos de Uso Padre |
| CU-004 - Acceder al sistema |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 49

           Descripción   Permite al usuario registrar una reserva seleccionando
                         un bloque de horario disponible y confirmando operación
           Actores       Usuarios
           Precondiciones
             1. El sistema está operativo.
             2. El usuario tiene una sesión activa con el rol de "Cliente".
             3. El espacio y el bloque de horario seleccionados están disponibles y libres
                de cruces con otras reservas.
             4. El catálogo de precios y planes está configurado y vinculado al espacio
                seleccionado.
           Flujo Básico
             1. El usuario selecciona un bloque de horario disponible para su reserva
             2. El sistema cambia automáticamente el estado del bloque a “pre-reserva”
                para evitar conflictos con otros usuarios
             3. El sistema muestra el formulario de registro de reserva
             4. El usuario completa los datos requeridos para la reserva, incluyendo al
                responsable de la reserva
             5. Opcionalmente, el usuario registra placas vehiculares y lista de invitados
             6. El usuario confirma la información registrada
             7. El sistema valida la información registrada
             8. El sistema registra la “pre-reserva” asociada al usuario
             9. El sistema redirige al usuario al sistema de pago correspondiente
           Flujo Alternativo
           Datos incompletos o inválidos
             1. En el paso 7, el sistema detecta que un dato obligatorio está incompleto o
                es inválido según estándares definidos para el dato
             2. El sistema muestra mensaje de error indicando los campos a corregir
             3. El sistema permite modificar la información ingresada
           Tiempo de pre-reserva expirado
             1. Durante el proceso de llenado de formulario, el tiempo permitido de
                pre-reserva expira
             2. El sistema libera automáticamente el bloque de horario seleccionado
             3. El sistema muestra un mensaje indicando que la pre-reserva expiró
             4. El usuario debe volver a seleccionar nuevamente un bloque de horario
                disponible
           Usuario cancela la operación
             1. En el paso 6, el usuario decide cancelar el registro de reserva
             2. El sistema muestra un mensaje de advertencia de pérdida de progreso
             3. El sistema libera automáticamente el bloque de horario seleccionado
           Post Condiciones


### Tablas de la página


#### Tabla 1

| Descripción | Permite al usuario registrar una reserva seleccionando<br>un bloque de horario disponible y confirmando operación |
| --- | --- |
| Actores | Usuarios |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario tiene una sesión activa con el rol de "Cliente".<br>3. El espacio y el bloque de horario seleccionados están disponibles y libres<br>de cruces con otras reservas.<br>4. El catálogo de precios y planes está configurado y vinculado al espacio<br>seleccionado. |  |
| Flujo Básico |  |
| 1. El usuario selecciona un bloque de horario disponible para su reserva<br>2. El sistema cambia automáticamente el estado del bloque a “pre-reserva”<br>para evitar conflictos con otros usuarios<br>3. El sistema muestra el formulario de registro de reserva<br>4. El usuario completa los datos requeridos para la reserva, incluyendo al<br>responsable de la reserva<br>5. Opcionalmente, el usuario registra placas vehiculares y lista de invitados<br>6. El usuario confirma la información registrada<br>7. El sistema valida la información registrada<br>8. El sistema registra la “pre-reserva” asociada al usuario<br>9. El sistema redirige al usuario al sistema de pago correspondiente |  |
| Flujo Alternativo |  |
| Datos incompletos o inválidos |  |
| 1. En el paso 7, el sistema detecta que un dato obligatorio está incompleto o<br>es inválido según estándares definidos para el dato<br>2. El sistema muestra mensaje de error indicando los campos a corregir<br>3. El sistema permite modificar la información ingresada |  |
| Tiempo de pre-reserva expirado |  |
| 1. Durante el proceso de llenado de formulario, el tiempo permitido de<br>pre-reserva expira<br>2. El sistema libera automáticamente el bloque de horario seleccionado<br>3. El sistema muestra un mensaje indicando que la pre-reserva expiró<br>4. El usuario debe volver a seleccionar nuevamente un bloque de horario<br>disponible |  |
| Usuario cancela la operación |  |
| 1. En el paso 6, el usuario decide cancelar el registro de reserva<br>2. El sistema muestra un mensaje de advertencia de pérdida de progreso<br>3. El sistema libera automáticamente el bloque de horario seleccionado |  |
| Post Condiciones |  |


---

## Página 50

             1. La pre-reserva queda registrada en el sistema
             2. El bloque de horario queda temporalmente bloqueado para otros usuarios
             3. El usuario es redirigido al proceso de pago correspondiente
           Restricciones
             ●  El usuario debe estar autenticado
             ●  El usuario solo puede seleccionar bloques de horarios disponibles enteros
                y no fragmentados
             ●  El bloque de horario se mantiene en estado de pre-reserva únicamente
                durante el tiempo definido por el sistema
             ●  Los datos obligatorios de la reserva deben completarse correctamente
           Casos de Uso Padre
           CU-005
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. La pre-reserva queda registrada en el sistema<br>2. El bloque de horario queda temporalmente bloqueado para otros usuarios<br>3. El usuario es redirigido al proceso de pago correspondiente |
| --- |
| Restricciones |
| ● El usuario debe estar autenticado<br>● El usuario solo puede seleccionar bloques de horarios disponibles enteros<br>y no fragmentados<br>● El bloque de horario se mantiene en estado de pre-reserva únicamente<br>durante el tiempo definido por el sistema<br>● Los datos obligatorios de la reserva deben completarse correctamente |
| Casos de Uso Padre |
| CU-005 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 51

          CU007: Realizar pago de reserva
           Descripción   Permite al usuario realizar el pago correspondiente
                         mediante una pasarela de pago externa para confirmar
                         la reserva del espacio
           Actores          - Usuarios
                            - Pasarela de pagos Openpay
                            - Servicio de envío de correo electrónico
           Precondiciones
             1. El sistema está operativo.
             2. El usuario tiene una sesión activa.
             3. Existe una pre-reserva en estado "Pendiente" vinculada a la cuenta del
                usuario.
             4. El tiempo de gracia de 10 minutos no ha expirado.
             5. La pasarela de pagos externa (Openpay) está integrada y operativa.
             6. El costo total de la reserva está calculado y asignado a la pre-reserva.
             7. El servicio de envío de correos electrónicos está disponible.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite al usuario realizar el pago correspondiente<br>mediante una pasarela de pago externa para confirmar<br>la reserva del espacio |
| --- | --- |
| Actores | - Usuarios<br>- Pasarela de pagos Openpay<br>- Servicio de envío de correo electrónico |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario tiene una sesión activa.<br>3. Existe una pre-reserva en estado "Pendiente" vinculada a la cuenta del<br>usuario.<br>4. El tiempo de gracia de 10 minutos no ha expirado.<br>5. La pasarela de pagos externa (Openpay) está integrada y operativa.<br>6. El costo total de la reserva está calculado y asignado a la pre-reserva.<br>7. El servicio de envío de correos electrónicos está disponible. |  |
| Flujo Básico |  |


---

## Página 52

             1. El usuario accede al proceso de pago de la pre-reserva
             2. El sistema muestra el resumen de la reserva y el monto total a pagar
                junto con las opciones de pago disponibles.
             3. El usuario selecciona un método de pago disponible
             4. El sistema de redirige al usuario a la pasarela de pagos Openpay
             5. El usuario ingresa los datos requeridos por la pasarela de pagos.
             6. La pasarela de pago procesa la transacción.
             7. La pasarela de pago notifica al sistema el resultado de la operación.
             8. El sistema valida la confirmación del pago
             9. El sistema actualiza el estado de la pre-reserva a “reservada” o
                “confirmada”
             10. El sistema bloquea automáticamente el bloque de horario para el resto de
                usuarios.
             11. El sistema muestra un mensaje de pago exitoso al usuario.
             12. Se envía un correo electrónico de confirmación de pago y reserva al
                usuario.
           Flujo Alternativo
           Pago rechazado
             1. En el paso 6, la pasarela rechaza la transacción.
             2. El sistema registra el intento de reserva.
             3. Se muestra un mensaje al usuario informando que el pago no pudo
                proceder.
             4. Se permite al usuario reintentar el pago mientras la pre-reserva siga
                activa.
           Tiempo de pre-reserva expirado
             1. Antes de realizar el pago, el tiempo de pre-reserva expira.
             2. El sistema cancela la pre-reserva del usuario y libera el bloque de horario
                seleccionado en la plataforma
             3. El sistema muestra un mensaje indicando que la pre-reserva expiró
             4. El usuario debe iniciar nuevamente el proceso de reserva
           Pasarela de pagos tiene un error o no responde
             1. En el paso 7, ocurre un error de comunicación con la pasarela de pago
             2. El sistema registra el intento de reserva.
             3. El sistema muestra un mensaje indicando que no fue posible verificar el
                estado del pago
             4. El sistema permite reintentar la operación o consultar posteriormente el
                estado de la reserva
           Post Condiciones
             1. El pago queda registrado en el sistema, sea exitoso o inválido
             2. Si el pago es exitoso, la reserva queda confirmada en el sistema
             3. El horario seleccionado se bloquea para el resto de usuarios.
             4. El usuario ahora puede seleccionar el mismo horario para solicitar una
                reprogramación.


### Tablas de la página


#### Tabla 1

| 1. El usuario accede al proceso de pago de la pre-reserva<br>2. El sistema muestra el resumen de la reserva y el monto total a pagar<br>junto con las opciones de pago disponibles.<br>3. El usuario selecciona un método de pago disponible<br>4. El sistema de redirige al usuario a la pasarela de pagos Openpay<br>5. El usuario ingresa los datos requeridos por la pasarela de pagos.<br>6. La pasarela de pago procesa la transacción.<br>7. La pasarela de pago notifica al sistema el resultado de la operación.<br>8. El sistema valida la confirmación del pago<br>9. El sistema actualiza el estado de la pre-reserva a “reservada” o<br>“confirmada”<br>10. El sistema bloquea automáticamente el bloque de horario para el resto de<br>usuarios.<br>11. El sistema muestra un mensaje de pago exitoso al usuario.<br>12. Se envía un correo electrónico de confirmación de pago y reserva al<br>usuario. |
| --- |
| Flujo Alternativo |
| Pago rechazado |
| 1. En el paso 6, la pasarela rechaza la transacción.<br>2. El sistema registra el intento de reserva.<br>3. Se muestra un mensaje al usuario informando que el pago no pudo<br>proceder.<br>4. Se permite al usuario reintentar el pago mientras la pre-reserva siga<br>activa. |
| Tiempo de pre-reserva expirado |
| 1. Antes de realizar el pago, el tiempo de pre-reserva expira.<br>2. El sistema cancela la pre-reserva del usuario y libera el bloque de horario<br>seleccionado en la plataforma<br>3. El sistema muestra un mensaje indicando que la pre-reserva expiró<br>4. El usuario debe iniciar nuevamente el proceso de reserva |
| Pasarela de pagos tiene un error o no responde |
| 1. En el paso 7, ocurre un error de comunicación con la pasarela de pago<br>2. El sistema registra el intento de reserva.<br>3. El sistema muestra un mensaje indicando que no fue posible verificar el<br>estado del pago<br>4. El sistema permite reintentar la operación o consultar posteriormente el<br>estado de la reserva |
| Post Condiciones |
| 1. El pago queda registrado en el sistema, sea exitoso o inválido<br>2. Si el pago es exitoso, la reserva queda confirmada en el sistema<br>3. El horario seleccionado se bloquea para el resto de usuarios.<br>4. El usuario ahora puede seleccionar el mismo horario para solicitar una<br>reprogramación. |


---

## Página 53

           Restricciones
             -  El usuario debe estar autenticado.
             -  El usuario solo puede seleccionar métodos de pago disponibles en la
                pasarela.
             -  El pago debe realizarse antes de caducada la pre-reserva.
             -  El bloque de horario reservado deja de estar disponible para otros
                usuarios
           Casos de Uso Padre
           CU-006
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| Restricciones |
| --- |
| - El usuario debe estar autenticado.<br>- El usuario solo puede seleccionar métodos de pago disponibles en la<br>pasarela.<br>- El pago debe realizarse antes de caducada la pre-reserva.<br>- El bloque de horario reservado deja de estar disponible para otros<br>usuarios |
| Casos de Uso Padre |
| CU-006 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 54

          CU008: Solicitar reprogramación de una reserva
           Descripción   Permite al usuario solicitar la reprogramación (cambio de
                         fecha y/o horario) de alguna de sus próximas reservas
                         confirmadas
           Actores          - Usuarios
           Precondiciones
             -  El sistema está operativo
             -  El usuario tiene una sesión activa.
             -  El usuario tiene una reserva en estado Confirmada.
             -  La reserva elegida no ha sido reprogramada con anterioridad.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite al usuario solicitar la reprogramación (cambio de<br>fecha y/o horario) de alguna de sus próximas reservas<br>confirmadas |
| --- | --- |
| Actores | - Usuarios |
| Precondiciones |  |
| - El sistema está operativo<br>- El usuario tiene una sesión activa.<br>- El usuario tiene una reserva en estado Confirmada.<br>- La reserva elegida no ha sido reprogramada con anterioridad. |  |
| Flujo Básico |  |


---

## Página 55

             1. El usuario accede a una reserva anterior a través de su historial de
                reservas.
             2. El sistema muestra las reservas registradas por el usuario
             3. El usuario selecciona una reserva confirmada próxima.
             4. El sistema muestra el resumen informativo de esa reserva
             5. El usuario selecciona la opción “Solicitar reprogramación”
             6. El sistema muestra un aviso de confirmación de enviar solicitud
             7. El usuario acepta y envía solicitud
             8. El sistema muestra un botón de redireccionamiento y recomienda
                contactar por whatsapp al administrador para justificaciones y motivos
                necesarios para la solicitud de reprogramación
             9. El sistema notifica al administrador la solicitud de reprogramación de una
                reserva a través de su panel
             10. El usuario se comunica con el administrador mediante whatsapp
           Flujo Alternativo
           Reserva previamente reprogramada
             1. En el paso 3, el usuario selecciona una reserva previamente
                reprogramada.
             2. El botón “Solicitar Reprogramación” aparecerá bloqueado y no le permitirá
                acceder a dicha opción.
           Post Condiciones
             1. La reserva ahora se marcará como reprogramada y no se permitirá una
                reprogramación posterior.
             2. Los administradores serán notificados de una nueva solicitud de
                reprogramación.
           Restricciones
             -  Solo se permite una reprogramación por reserva.
             -  La aprobación depende de la administración de Workpool.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El usuario accede a una reserva anterior a través de su historial de<br>reservas.<br>2. El sistema muestra las reservas registradas por el usuario<br>3. El usuario selecciona una reserva confirmada próxima.<br>4. El sistema muestra el resumen informativo de esa reserva<br>5. El usuario selecciona la opción “Solicitar reprogramación”<br>6. El sistema muestra un aviso de confirmación de enviar solicitud<br>7. El usuario acepta y envía solicitud<br>8. El sistema muestra un botón de redireccionamiento y recomienda<br>contactar por whatsapp al administrador para justificaciones y motivos<br>necesarios para la solicitud de reprogramación<br>9. El sistema notifica al administrador la solicitud de reprogramación de una<br>reserva a través de su panel<br>10. El usuario se comunica con el administrador mediante whatsapp |
| --- |
| Flujo Alternativo |
| Reserva previamente reprogramada |
| 1. En el paso 3, el usuario selecciona una reserva previamente<br>reprogramada.<br>2. El botón “Solicitar Reprogramación” aparecerá bloqueado y no le permitirá<br>acceder a dicha opción. |
| Post Condiciones |
| 1. La reserva ahora se marcará como reprogramada y no se permitirá una<br>reprogramación posterior.<br>2. Los administradores serán notificados de una nueva solicitud de<br>reprogramación. |
| Restricciones |
| - Solo se permite una reprogramación por reserva.<br>- La aprobación depende de la administración de Workpool. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 56

          CU009: Crear nuevo rol
           Descripción   Permite al administrador principal crear un rol
                         personalizado dentro de la plataforma asignándole un
                         conjunto de permisos
           Actores          - Administrador Principal
           Precondiciones
             1. El sistema está operativo.
             2. El Administrador Principal tiene una sesión activa.
             3. El Administrador Principal cuenta con los permisos de acceso al módulo
                de gestión de usuarios.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite al administrador principal crear un rol<br>personalizado dentro de la plataforma asignándole un<br>conjunto de permisos |
| --- | --- |
| Actores | - Administrador Principal |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El Administrador Principal tiene una sesión activa.<br>3. El Administrador Principal cuenta con los permisos de acceso al módulo<br>de gestión de usuarios. |  |
| Flujo Básico |  |


---

## Página 57

             1. El administrador principal accede al módulo de gestión de usuarios.
             2. El sistema muestra la lista de usuarios en la plataforma.
             3. Se selecciona "Gestionar roles" y posteriormente “Crear rol”
             4. El sistema muestra un formulario con un campo para el nombre del rol y
                una lista de casillas con los distintos permisos habilitados en la plataforma
             5. El administrador principal ingresa la información requerida.
             6. El administrador presiona "Crear rol"
             7. El sistema valida el nombre y los permisos enviados
             8. El sistema guarda la nueva entidad en el servidor
             9. El rol pasa a estar disponible para asignación
           Flujo Alternativo
           Nombre duplicado
             1. En el paso 7, el backend reporta que el identificador del rol ya existe.
             2. El sistema muestra un error en rojo debajo del campo respectivo.
             3. El administrador debe elegir un nombre diferente y reintentar.
           Post Condiciones
             1. El nuevo rol aparece en las listas de roles disponibles para ser asignado
           Restricciones
             -  Solo un administrador principal puede ejecutar la creación de un nuevo rol
             -  Existen ciertos permisos exclusivos del Admin Principal que no permite ser
                asignados a estos nuevos roles
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El administrador principal accede al módulo de gestión de usuarios.<br>2. El sistema muestra la lista de usuarios en la plataforma.<br>3. Se selecciona "Gestionar roles" y posteriormente “Crear rol”<br>4. El sistema muestra un formulario con un campo para el nombre del rol y<br>una lista de casillas con los distintos permisos habilitados en la plataforma<br>5. El administrador principal ingresa la información requerida.<br>6. El administrador presiona "Crear rol"<br>7. El sistema valida el nombre y los permisos enviados<br>8. El sistema guarda la nueva entidad en el servidor<br>9. El rol pasa a estar disponible para asignación |
| --- |
| Flujo Alternativo |
| Nombre duplicado |
| 1. En el paso 7, el backend reporta que el identificador del rol ya existe.<br>2. El sistema muestra un error en rojo debajo del campo respectivo.<br>3. El administrador debe elegir un nombre diferente y reintentar. |
| Post Condiciones |
| 1. El nuevo rol aparece en las listas de roles disponibles para ser asignado |
| Restricciones |
| - Solo un administrador principal puede ejecutar la creación de un nuevo rol<br>- Existen ciertos permisos exclusivos del Admin Principal que no permite ser<br>asignados a estos nuevos roles |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 58

          CU010: Modificar permisos de un rol


---

## Página 59

           Descripción   Permite a los administradores asignar y revocar
                         permisos asociados a un rol específico.
           Actores          - Administrador Principal (superadmin).
                            - Administrador
           Precondiciones
             1. El sistema está operativo.
             2. El usuario está autenticado.
             3. El rol del usuario es “administrador” y tiene acceso habilitado al módulo de
                gestión de usuarios y al panel de permisos.
             4. Existen usuarios con roles distintos a “superadmin y admin”
           Flujo Básico
             1. El administrador accede al módulo de gestión de usuarios.
             2. Accede al panel “permisos de roles”.
             3. El administrador selecciona un tipo de rol.
             4. Se muestra el estado de permisos del rol seleccionado.
             5. El administrador habilita o deshabilita los permisos deseados.
             6. El administrador guarda los cambios.
             7. El sistema valida la operación y actualiza la configuración de permisos.
             8. Se muestra un mensaje de cambios guardados con éxito.
           Flujo Alternativo
           Se intentan modificar los permisos del administrador principal
             1. Un administrador o administrador principal intenta modificar los permisos
                asociados al rol “administrador principal”.
             2. El sistema no permite la modificación de este rol a modo de caso especial.
           Se intenta modificar un rol superior o igual al del usuario actual en la
           jerarquía de roles
             1. Un administrador intenta modificar los permisos del rol “administrador”.
             2. El sistema lo impide puesto que un usuario no puede aumentar sus
                permisos por sí mismo.
           Post Condiciones
             1. Los cambios al rol seleccionado se reflejan instantáneamente a todos los
                usuarios con ese rol en la página.
             2. Los permisos del rol modificado quedan guardados en el sistema.
           Restricciones
             -  Un usuario no puede modificar permisos de su mismo rol o roles
                superiores en la jerarquía de roles.
             -  El rol de “administrador principal” es inmutable respecto a permisos; es
                decir, siempre posee todos los permisos disponibles.
           Casos de Uso Padre


### Tablas de la página


#### Tabla 1

| Descripción | Permite a los administradores asignar y revocar<br>permisos asociados a un rol específico. |
| --- | --- |
| Actores | - Administrador Principal (superadmin).<br>- Administrador |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario está autenticado.<br>3. El rol del usuario es “administrador” y tiene acceso habilitado al módulo de<br>gestión de usuarios y al panel de permisos.<br>4. Existen usuarios con roles distintos a “superadmin y admin” |  |
| Flujo Básico |  |
| 1. El administrador accede al módulo de gestión de usuarios.<br>2. Accede al panel “permisos de roles”.<br>3. El administrador selecciona un tipo de rol.<br>4. Se muestra el estado de permisos del rol seleccionado.<br>5. El administrador habilita o deshabilita los permisos deseados.<br>6. El administrador guarda los cambios.<br>7. El sistema valida la operación y actualiza la configuración de permisos.<br>8. Se muestra un mensaje de cambios guardados con éxito. |  |
| Flujo Alternativo |  |
| Se intentan modificar los permisos del administrador principal |  |
| 1. Un administrador o administrador principal intenta modificar los permisos<br>asociados al rol “administrador principal”.<br>2. El sistema no permite la modificación de este rol a modo de caso especial. |  |
| Se intenta modificar un rol superior o igual al del usuario actual en la<br>jerarquía de roles |  |
| 1. Un administrador intenta modificar los permisos del rol “administrador”.<br>2. El sistema lo impide puesto que un usuario no puede aumentar sus<br>permisos por sí mismo. |  |
| Post Condiciones |  |
| 1. Los cambios al rol seleccionado se reflejan instantáneamente a todos los<br>usuarios con ese rol en la página.<br>2. Los permisos del rol modificado quedan guardados en el sistema. |  |
| Restricciones |  |
| - Un usuario no puede modificar permisos de su mismo rol o roles<br>superiores en la jerarquía de roles.<br>- El rol de “administrador principal” es inmutable respecto a permisos; es<br>decir, siempre posee todos los permisos disponibles. |  |
| Casos de Uso Padre |  |


---

## Página 60

           CU-004, CU-009
           Diagrama de caso de uso
           Prototipo
          CU011: Cambiar roles de un usuario
           Descripción   Permite a un administrador principal cambiar el rol de un
                         usuario ya registrado en la página.
           Actores          - Administrador principal (superadmin)
                            - Servicio de envío de correo electŕonico
           Precondiciones
             1. El sistema está operativo.
             2. El Administrador Principal está autenticado
             3. El usuario destino está registrado en la plataforma.
             4. Existen al menos dos roles distintos configurados en el sistema.
             5. El servicio de envío de correos electrónicos está disponible.


### Tablas de la página


#### Tabla 1

| Diagrama de caso de uso |
| --- |


#### Tabla 2

| Prototipo |
| --- |


#### Tabla 3

| Descripción | Permite a un administrador principal cambiar el rol de un<br>usuario ya registrado en la página. |
| --- | --- |
| Actores | - Administrador principal (superadmin)<br>- Servicio de envío de correo electŕonico |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El Administrador Principal está autenticado<br>3. El usuario destino está registrado en la plataforma.<br>4. Existen al menos dos roles distintos configurados en el sistema.<br>5. El servicio de envío de correos electrónicos está disponible. |  |


---

## Página 61

           Flujo Básico
             1. El administrador principal ingresa al módulo de gestión de usuarios.
             2. Se muestra la lista de usuarios registrados.
             3. El administrador principal selecciona a un usuario.
             4. Se selecciona la opción “Cambiar Rol”.
             5. El administrador selecciona el nuevo rol del usuario.
             6. El sistema valida la elección y procede con el cambio de rol.
             7. Se muestra un mensaje de confirmación de cambio de rol.
             8. Se notifica al usuario de su cambio de rol por correo electrónico.
           Flujo Alternativo
           Permisos insuficientes para seleccionar rol
             1. El usuario que intenta el cambio de rol no posee el rol adecuado para
                realizar la acción.
             2. El sistema manda un mensaje de error informativo.
           Post Condiciones
             1. El usuario modificado queda asignado a su nuevo rol en el sistema.
             2. El cambio de rol se debe ver reflejado automáticamente.
           Restricciones
             -  Solo el administrador principal puede asignar roles.
           Casos de Uso Padre
           CU-004, CU-009
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| Flujo Básico |
| --- |
| 1. El administrador principal ingresa al módulo de gestión de usuarios.<br>2. Se muestra la lista de usuarios registrados.<br>3. El administrador principal selecciona a un usuario.<br>4. Se selecciona la opción “Cambiar Rol”.<br>5. El administrador selecciona el nuevo rol del usuario.<br>6. El sistema valida la elección y procede con el cambio de rol.<br>7. Se muestra un mensaje de confirmación de cambio de rol.<br>8. Se notifica al usuario de su cambio de rol por correo electrónico. |
| Flujo Alternativo |
| Permisos insuficientes para seleccionar rol |
| 1. El usuario que intenta el cambio de rol no posee el rol adecuado para<br>realizar la acción.<br>2. El sistema manda un mensaje de error informativo. |
| Post Condiciones |
| 1. El usuario modificado queda asignado a su nuevo rol en el sistema.<br>2. El cambio de rol se debe ver reflejado automáticamente. |
| Restricciones |
| - Solo el administrador principal puede asignar roles. |
| Casos de Uso Padre |
| CU-004, CU-009 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 62

          CU012: Cancelar una reserva
           Descripción   Permite cancelar una reserva previamente registrada.
           Actores          - Administrador
           Precondiciones
             1. El sistema está operativo.
             2. El usuario tiene una sesión activa.
             3. Existe al menos una reserva en estado "Confirmada" asociada a la cuenta
                del usuario.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite cancelar una reserva previamente registrada. |
| --- | --- |
| Actores | - Administrador |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario tiene una sesión activa.<br>3. Existe al menos una reserva en estado "Confirmada" asociada a la cuenta<br>del usuario. |  |
| Flujo Básico |  |


---

## Página 63

             1. El administrador accede a su historial de reservas.
             2. El administrador selecciona la reserva a cancelar.
             3. El administrador presiona “Eliminar”.
             4. El administrador ingresa la información del formulario de cancelación y
                confirma la acción.
             5. El sistema procede con la cancelación de la reserva.
             6. El sistema libera el horario asociado a dicha reserva.
             7. El sistema muestra un mensaje de acción exitosa.
           Flujo Alternativo
           Error de actualización
             1. En el paso 5, el sistema retorna un error interno.
             2. Se aborta la cancelación de la reserva.
             3. El sistema presenta un mensaje de error al usuario.
           Post Condiciones
             1. El horario de la reserva cancelada queda liberado para nuevas reservas.
             2. La reserva se almacena en el historial del usuario como cancelada.
           Restricciones
             -  La cancelación de una reserva no implica reembolso monetario en ningún
                caso.
           Casos de Uso Padre
           CU-004, CU-006
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El administrador accede a su historial de reservas.<br>2. El administrador selecciona la reserva a cancelar.<br>3. El administrador presiona “Eliminar”.<br>4. El administrador ingresa la información del formulario de cancelación y<br>confirma la acción.<br>5. El sistema procede con la cancelación de la reserva.<br>6. El sistema libera el horario asociado a dicha reserva.<br>7. El sistema muestra un mensaje de acción exitosa. |
| --- |
| Flujo Alternativo |
| Error de actualización |
| 1. En el paso 5, el sistema retorna un error interno.<br>2. Se aborta la cancelación de la reserva.<br>3. El sistema presenta un mensaje de error al usuario. |
| Post Condiciones |
| 1. El horario de la reserva cancelada queda liberado para nuevas reservas.<br>2. La reserva se almacena en el historial del usuario como cancelada. |
| Restricciones |
| - La cancelación de una reserva no implica reembolso monetario en ningún<br>caso. |
| Casos de Uso Padre |
| CU-004, CU-006 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 64

          CU013: Reprogramar una reserva como administrador
           Descripción   Permite al administrador cambiar los valores de fecha y
                         hora de una reserva confirmada en un nuevo bloque de
                         horario disponible
           Actores          - Administrador
                            - Servicio de envío de correo electrónico


### Tablas de la página


#### Tabla 1

| Descripción | Permite al administrador cambiar los valores de fecha y<br>hora de una reserva confirmada en un nuevo bloque de<br>horario disponible |
| --- | --- |
| Actores | - Administrador<br>- Servicio de envío de correo electrónico |


---

## Página 65

           Precondiciones
             1. El sistema está operativo.
             2. El administrador tiene una sesión activa con los permisos
                correspondientes.
             3. Existe una reserva en estado "Confirmada" en el sistema.
             4. Existe una solicitud de reprogramación pendiente de gestión vinculada a
                dicha reserva.
             5. El servicio de envío de correos electrónicos está disponible.
             6. El usuario tiene acceso a su correo electrónico
           Flujo Básico
             1. El administrador revisa la bandeja de solicitudes de reprogramación de
                una reserva.
             2. El administrador selecciona la reserva de un usuario.
             3. El sistema redirige a la ventana de calendario para seleccionar un nuevo
                horario para la reserva a reprogramar.
             4. El administrador elige un nuevo bloque de horario.
             5. Se valida disponibilidad del bloque de horario.
             6. El sistema presenta un resumen de los cambios a realizar en la reserva.
             7. El administrador confirma la acción.
             8. El sistema muestra un mensaje de éxito al administrador.
             9. El sistema notifica por correo electrónico al usuario sobre la
                reprogramación de su reserva.
             10. El sistema libera automáticamente el bloque de horario original asociado a
                la reserva reprogramada.
           Flujo Alternativo
           Horario no disponible
             1. En el paso 4, el administrador elige un horario ocupado o no contiguo.
             2. El sistema informa del error al administrador y no permite proceder con la
                reprogramación.
           El administrador rechaza la solicitud de un usuario
             1. En caso el administrador anule la solicitud de reprogramación, el sistema
                ignora la solicitud y la elimina de las solicitudes pendientes.
           Post Condiciones
             1. La reserva queda actualizada con su nuevo horario.
             2. El horario anterior de la reserva se libera para nuevas reservas.
           Restricciones
             -  Solo reservas confirmadas pueden reprogramarse.
             -  El administrador elige arbitrariamente el nuevo horario.
             -  El nuevo bloque de horario debe poseer la misma cantidad de horas del
                bloque de horario original.
           Casos de Uso Padre


### Tablas de la página


#### Tabla 1

| Precondiciones |
| --- |
| 1. El sistema está operativo.<br>2. El administrador tiene una sesión activa con los permisos<br>correspondientes.<br>3. Existe una reserva en estado "Confirmada" en el sistema.<br>4. Existe una solicitud de reprogramación pendiente de gestión vinculada a<br>dicha reserva.<br>5. El servicio de envío de correos electrónicos está disponible.<br>6. El usuario tiene acceso a su correo electrónico |
| Flujo Básico |
| 1. El administrador revisa la bandeja de solicitudes de reprogramación de<br>una reserva.<br>2. El administrador selecciona la reserva de un usuario.<br>3. El sistema redirige a la ventana de calendario para seleccionar un nuevo<br>horario para la reserva a reprogramar.<br>4. El administrador elige un nuevo bloque de horario.<br>5. Se valida disponibilidad del bloque de horario.<br>6. El sistema presenta un resumen de los cambios a realizar en la reserva.<br>7. El administrador confirma la acción.<br>8. El sistema muestra un mensaje de éxito al administrador.<br>9. El sistema notifica por correo electrónico al usuario sobre la<br>reprogramación de su reserva.<br>10. El sistema libera automáticamente el bloque de horario original asociado a<br>la reserva reprogramada. |
| Flujo Alternativo |
| Horario no disponible |
| 1. En el paso 4, el administrador elige un horario ocupado o no contiguo.<br>2. El sistema informa del error al administrador y no permite proceder con la<br>reprogramación. |
| El administrador rechaza la solicitud de un usuario |
| 1. En caso el administrador anule la solicitud de reprogramación, el sistema<br>ignora la solicitud y la elimina de las solicitudes pendientes. |
| Post Condiciones |
| 1. La reserva queda actualizada con su nuevo horario.<br>2. El horario anterior de la reserva se libera para nuevas reservas. |
| Restricciones |
| - Solo reservas confirmadas pueden reprogramarse.<br>- El administrador elige arbitrariamente el nuevo horario.<br>- El nuevo bloque de horario debe poseer la misma cantidad de horas del<br>bloque de horario original. |
| Casos de Uso Padre |


---

## Página 66

           CU-004
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

## Página 67

          CU014: Bloquear un horario
           Descripción   Permite a un administrador inhabilitar la elección de
                         bloques de horarios de un determinado ambiente para
                         impedir nuevas reservas.
           Actores          - Administrador
           Precondiciones
             1. El sistema está operativo.
             2. El administrador está autenticado
             3. El ambiente o espacio existe en el sistema
             4. El bloque de horario seleccionado no cuenta con reservas confirmadas
                vigentes.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite a un administrador inhabilitar la elección de<br>bloques de horarios de un determinado ambiente para<br>impedir nuevas reservas. |
| --- | --- |
| Actores | - Administrador |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El administrador está autenticado<br>3. El ambiente o espacio existe en el sistema<br>4. El bloque de horario seleccionado no cuenta con reservas confirmadas<br>vigentes. |  |
| Flujo Básico |  |


---

## Página 68

             1. El administrador ingresa al módulo de reservas
             2. El administrador selecciona el ambiente a restringir.
             3. Se selecciona el horario a bloquear.
             4. El administrador confirma la acción.
             5. El sistema muestra una advertencia
             6. El sistema valida la acción
             7. El sistema registra el cambio de estado de la reserva a “bloqueado”.
           Flujo Alternativo
           Conflicto de horario
             1. En el paso 4, el sistema detecta que el horario que se quiere bloquear
                está asociado a al menos una reserva activa.
             2. El sistema impide la acción y muestra un mensaje de error.
             3. El sistema sugiere la reprogramación de las reservas confirmadas en el
                horario tentativo de bloqueo
           Se ingresa horario inválido
             1. En el paso 2, el administrador ingresa el horario de forma incorrecta.
             2. El sistema debe detectar el error y no permitir al administrador confirmar la
                acción.
           Post Condiciones
             1. El horario queda bloqueado para próximas reservas.
           Restricciones
             -  Solo un administrador puede bloquear un horario.
             -  El horario a bloquear no debe estar asociado a alguna reserva activa.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El administrador ingresa al módulo de reservas<br>2. El administrador selecciona el ambiente a restringir.<br>3. Se selecciona el horario a bloquear.<br>4. El administrador confirma la acción.<br>5. El sistema muestra una advertencia<br>6. El sistema valida la acción<br>7. El sistema registra el cambio de estado de la reserva a “bloqueado”. |
| --- |
| Flujo Alternativo |
| Conflicto de horario |
| 1. En el paso 4, el sistema detecta que el horario que se quiere bloquear<br>está asociado a al menos una reserva activa.<br>2. El sistema impide la acción y muestra un mensaje de error.<br>3. El sistema sugiere la reprogramación de las reservas confirmadas en el<br>horario tentativo de bloqueo |
| Se ingresa horario inválido |
| 1. En el paso 2, el administrador ingresa el horario de forma incorrecta.<br>2. El sistema debe detectar el error y no permitir al administrador confirmar la<br>acción. |
| Post Condiciones |
| 1. El horario queda bloqueado para próximas reservas. |
| Restricciones |
| - Solo un administrador puede bloquear un horario.<br>- El horario a bloquear no debe estar asociado a alguna reserva activa. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 69

          CU015: Registrar reserva como administrador
           Descripción   Permite a un administrador realizar una reserva sin
                         requerir de un proceso de pago ni su continua
                         confirmación.
           Actores          - Administrador
                            - Servicio de envío de correo electrónico
           Precondiciones
             1. El sistema está operativo.
             2. El administrador tiene una sesión activa.
             3. El espacio y el bloque de horario seleccionados están disponibles y libres
                de cruces con otras reservas o pre-reservas.
             4. El servicio de envío de correos electrónicos está disponible.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite a un administrador realizar una reserva sin<br>requerir de un proceso de pago ni su continua<br>confirmación. |
| --- | --- |
| Actores | - Administrador<br>- Servicio de envío de correo electrónico |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El administrador tiene una sesión activa.<br>3. El espacio y el bloque de horario seleccionados están disponibles y libres<br>de cruces con otras reservas o pre-reservas.<br>4. El servicio de envío de correos electrónicos está disponible. |  |
| Flujo Básico |  |


---

## Página 70

             1. El administrador accede al módulo de reserva de espacios.
             2. El administrador selecciona el tipo de sala a reservar.
             3. El administrador selecciona el horario de reserva según la disponibilidad
                del tipo de salsa solicitado.
             4. El administrador selecciona “Continuar”.
             5. Se procede al ingreso de la información necesaria.
             6. Se confirma la reserva.
             7. El sistema valida la información y bloquea el horario.
             8. El sistema muestra un mensaje de éxito.
             9. El sistema notifica al usuario al que se le asignó la reserva por correo.
           Flujo Alternativo
           Horario no disponible o inválido
             1. En el paso 3, el administrador no selecciona un horario válido.
             2. El sistema debe impedir continuar la reserva y presentar un mensaje de
                error pertinente.
           Falta de información para la reserva
             1. En el paso 5, el administrador no ingresa algún campo obligatorio en el
                formulario de reserva.
             2. El sistema debe notificarlo y permitir ingresar dicho valor.
           Post Condiciones
             1. La reserva queda confirmada automáticamente, sin necesidad de pago
                asociado.
             2. El horario se bloquea para futuras reservas.
           Restricciones
             -  Las reservas por parte de administradores no deben solicitar pago.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El administrador accede al módulo de reserva de espacios.<br>2. El administrador selecciona el tipo de sala a reservar.<br>3. El administrador selecciona el horario de reserva según la disponibilidad<br>del tipo de salsa solicitado.<br>4. El administrador selecciona “Continuar”.<br>5. Se procede al ingreso de la información necesaria.<br>6. Se confirma la reserva.<br>7. El sistema valida la información y bloquea el horario.<br>8. El sistema muestra un mensaje de éxito.<br>9. El sistema notifica al usuario al que se le asignó la reserva por correo. |
| --- |
| Flujo Alternativo |
| Horario no disponible o inválido |
| 1. En el paso 3, el administrador no selecciona un horario válido.<br>2. El sistema debe impedir continuar la reserva y presentar un mensaje de<br>error pertinente. |
| Falta de información para la reserva |
| 1. En el paso 5, el administrador no ingresa algún campo obligatorio en el<br>formulario de reserva.<br>2. El sistema debe notificarlo y permitir ingresar dicho valor. |
| Post Condiciones |
| 1. La reserva queda confirmada automáticamente, sin necesidad de pago<br>asociado.<br>2. El horario se bloquea para futuras reservas. |
| Restricciones |
| - Las reservas por parte de administradores no deben solicitar pago. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 71


---

## Página 72

          CU016: Consultar una reserva
           Descripción   Permite revisar detalles asociados a una reserva
                         registrada en el sistema desde el historial de un usuario.
           Actores          - Usuarios
           Precondiciones
             1. El sistema está operativo.
             2. El usuario tiene una sesión activa.
             3. Existe al menos una reserva registrada en el sistema vinculada al usuario
             4. Se debe seleccionar una reserva registrada en el sistema.
           Flujo Básico
             1. El usuario accede a su historial de reservas.
             2. El usuario selecciona una reserva.
             3. El sistema valida existencia de reserva y permisos
             4. El sistema expone un resumen de la reserva.
           Flujo Alternativo


### Tablas de la página


#### Tabla 1

| Descripción | Permite revisar detalles asociados a una reserva<br>registrada en el sistema desde el historial de un usuario. |
| --- | --- |
| Actores | - Usuarios |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario tiene una sesión activa.<br>3. Existe al menos una reserva registrada en el sistema vinculada al usuario<br>4. Se debe seleccionar una reserva registrada en el sistema. |  |
| Flujo Básico |  |
| 1. El usuario accede a su historial de reservas.<br>2. El usuario selecciona una reserva.<br>3. El sistema valida existencia de reserva y permisos<br>4. El sistema expone un resumen de la reserva. |  |
| Flujo Alternativo |  |


---

## Página 73

           Reserva inexistente
             1. El sistema recibe una solicitud de información sobre una reserva no
                registrada en la página.
             2. El sistema redirige a una página en la plataforma de “no encontrado” con
                un mensaje descriptivo.
           Falta de permisos
             1. El sistema recibe una solicitud de información sobre una reserva que no
                pertenece al usuario y este mismo no es un administrador.
             2. El sistema redirige a una página en la plataforma de “no encontrado” con
                un mensaje descriptivo.
           Post Condiciones
             1. El usuario debe poder visualizar la información por tiempo indefinido.
           Restricciones
             -  Los usuarios solo pueden consultar sus propias reservas.
             -  Los administradores pueden consultar cualquier reserva.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo
           Vista de Usuario:


### Tablas de la página


#### Tabla 1

| Reserva inexistente |
| --- |
| 1. El sistema recibe una solicitud de información sobre una reserva no<br>registrada en la página.<br>2. El sistema redirige a una página en la plataforma de “no encontrado” con<br>un mensaje descriptivo. |
| Falta de permisos |
| 1. El sistema recibe una solicitud de información sobre una reserva que no<br>pertenece al usuario y este mismo no es un administrador.<br>2. El sistema redirige a una página en la plataforma de “no encontrado” con<br>un mensaje descriptivo. |
| Post Condiciones |
| 1. El usuario debe poder visualizar la información por tiempo indefinido. |
| Restricciones |
| - Los usuarios solo pueden consultar sus propias reservas.<br>- Los administradores pueden consultar cualquier reserva. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |
| Vista de Usuario: |


---

## Página 74

           Vista de Admin:
          CU017: Mantener catálogo de espacios y planes de precio
           Descripción   Permite a los administradores gestionar espacios y
                         planes de precio en el sistema.
           Actores          - Administradores
           Precondiciones
             1. El sistema está operativo.
             2. El administrador tiene una sesión activa.
             3. El administrador principal o el rol “administrador” tiene el permiso para
                modificar el catálogo de espacios y planes de precio.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite a los administradores gestionar espacios y<br>planes de precio en el sistema. |
| --- | --- |
| Actores | - Administradores |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El administrador tiene una sesión activa.<br>3. El administrador principal o el rol “administrador” tiene el permiso para<br>modificar el catálogo de espacios y planes de precio. |  |
| Flujo Básico |  |


---

## Página 75

             1. El administrador accede al módulo de gestión de espacios.
             2. El sistema valida permisos del administrador
             3. El sistema lista los espacios registrados.
             4. El administrador puede crear, editar o deshabilitar un espacio.
             5. El administrador puede crear un plan de precio por tipo de espacio.
             6. El sistema permite habilitar e inhabilitar los planes.
             7. El administrador selecciona alguna opción.
             8. El sistema valida el cambio.
             9. El sistema guarda los cambios.
             10. Se muestra un mensaje de éxito.
           Flujo Alternativo
           Datos inválidos
             1. En la creación / modificación de un espacio o plan de precios, el
                administrador no ingresa todos los datos requeridos con un formato válido.
             2. El sistema informa el problema y permite cambiar los datos insertados.
           Falta de permisos
             1. En el paso 3, el sistema detecta permisos insuficientes del usuario.
             2. Se manda un mensaje de error y se le regresa al panel principal.
           Post Condiciones
             1. Los cambios realizados deben reflejarse inmediatamente en la página.
             2. Nuevos planes de pago serán usados a partir de ahora en la cotización de
                costos de las reservas
             3. Los espacios creados se añadirán a la disponibilidad en el apartado de
                reservas..
           Restricciones
             -  Solo usuarios con un rol que posee los permisos respectivo puede realizar
                acciones en el catálogo de espacios.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 1. El administrador accede al módulo de gestión de espacios.<br>2. El sistema valida permisos del administrador<br>3. El sistema lista los espacios registrados.<br>4. El administrador puede crear, editar o deshabilitar un espacio.<br>5. El administrador puede crear un plan de precio por tipo de espacio.<br>6. El sistema permite habilitar e inhabilitar los planes.<br>7. El administrador selecciona alguna opción.<br>8. El sistema valida el cambio.<br>9. El sistema guarda los cambios.<br>10. Se muestra un mensaje de éxito. |
| --- |
| Flujo Alternativo |
| Datos inválidos |
| 1. En la creación / modificación de un espacio o plan de precios, el<br>administrador no ingresa todos los datos requeridos con un formato válido.<br>2. El sistema informa el problema y permite cambiar los datos insertados. |
| Falta de permisos |
| 1. En el paso 3, el sistema detecta permisos insuficientes del usuario.<br>2. Se manda un mensaje de error y se le regresa al panel principal. |
| Post Condiciones |
| 1. Los cambios realizados deben reflejarse inmediatamente en la página.<br>2. Nuevos planes de pago serán usados a partir de ahora en la cotización de<br>costos de las reservas<br>3. Los espacios creados se añadirán a la disponibilidad en el apartado de<br>reservas.. |
| Restricciones |
| - Solo usuarios con un rol que posee los permisos respectivo puede realizar<br>acciones en el catálogo de espacios. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 76

           Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 77


---

## Página 78

          CU018: Gestionar envío de correos
           Descripción   Permite gestionar el envío automático de información
                         importante a clientes y administradores.
           Actores          - Sistema
                            - Servicio de correo electrónico
           Precondiciones


### Tablas de la página


#### Tabla 1

| Descripción | Permite gestionar el envío automático de información<br>importante a clientes y administradores. |
| --- | --- |
| Actores | - Sistema<br>- Servicio de correo electrónico |
| Precondiciones |  |


---

## Página 79

             1. El sistema está operativo.
             2. El servicio de mensajería externo está configurado y disponible.
             3. Se ha producido un evento desencadenante válido (ej. confirmación de
                pago, reprogramación o cambio de rol).
             4. El destinatario (usuario o administrador) cuenta con una dirección de
                correo electrónico válida registrada en el sistema.
           Flujo Básico
             1. Ocurre un evento en el sistema.
             2. El sistema genera el contenido del correo en función del evento.
             3. Se obtiene el correo del destinatario.
             4. El sistema se comunica con el servidor de correo.
             5. El servidor de correo maneja el envío del mismo y retorna una respuesta
                exitosa.
             6. El sistema recibe la respuesta
             7. El sistema muestra aviso de envío de correo
           Flujo Alternativo
           Error en el envío de correo
             1. En el paso 5, el servidor de correo notifica que hubo un error.
             2. El sistema muestra un mensaje de error y permite intentar reenviar el
                correo.
           Post Condiciones
             1. El usuario es notificado según el tipo de evento que disparó el envío de
                correo.
           Restricciones
             -  Los correos siguen formatos estandarizados por tipo de evento.
           Casos de Uso Padre
           CU-001, CU-003, CU-007, CU-012, CU-013, CU-024
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El sistema está operativo.<br>2. El servicio de mensajería externo está configurado y disponible.<br>3. Se ha producido un evento desencadenante válido (ej. confirmación de<br>pago, reprogramación o cambio de rol).<br>4. El destinatario (usuario o administrador) cuenta con una dirección de<br>correo electrónico válida registrada en el sistema. |
| --- |
| Flujo Básico |
| 1. Ocurre un evento en el sistema.<br>2. El sistema genera el contenido del correo en función del evento.<br>3. Se obtiene el correo del destinatario.<br>4. El sistema se comunica con el servidor de correo.<br>5. El servidor de correo maneja el envío del mismo y retorna una respuesta<br>exitosa.<br>6. El sistema recibe la respuesta<br>7. El sistema muestra aviso de envío de correo |
| Flujo Alternativo |
| Error en el envío de correo |
| 1. En el paso 5, el servidor de correo notifica que hubo un error.<br>2. El sistema muestra un mensaje de error y permite intentar reenviar el<br>correo. |
| Post Condiciones |
| 1. El usuario es notificado según el tipo de evento que disparó el envío de<br>correo. |
| Restricciones |
| - Los correos siguen formatos estandarizados por tipo de evento. |
| Casos de Uso Padre |
| CU-001, CU-003, CU-007, CU-012, CU-013, CU-024 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 80


---

## Página 81

          CU019: Consultar catálogo de espacios
           Descripción   Permite visualizar el catálogo de espacios disponibles
                         en la plataforma, aplicando filtros de acuerdo a sus
                         necesidades
           Actores          - Usuarios
           Precondiciones
             1. El sistema está operativo.
             2. El usuario tiene sesión activa
             3. Existens espacios activos registrados en el catálogo
             4. Existen planes vigentes asociados a los espacios activos
           Flujo Básico
             1. El usuario accede al módulo de catálogo de espacios desde su panel.
             2. El sistema muestra la lista de espacios activos indicando tipo de espacio,
                capacidad, descripción, imágenes referenciales.
             3. El usuario define los criterios de búsqueda según sus necesidades (tipo de
                sala, capacidad mínima, fecha tentativa)
             4. El sistema valida que los criterios ingresados sean lógicos
             5. El sistema filtra el catálogo y muestra los espacios que cumplen con los
                criterios, junto con el costo por hora del plan de precios activo.
             6. El usuario selecciona un espacio del catálogo
             7. El sistema muestra el detalle ampliado del espacio seleccionado,
                incluyendo características, capacidad, tipo de espacio, condiciones de uso
                y estado en catálogo.
             8. El usuario continúa el flujo hacia la consulta de disponibilidad del espacio
                seleccionado.
           Flujo Alternativo
           Filtros inválidos


### Tablas de la página


#### Tabla 1

| Descripción | Permite visualizar el catálogo de espacios disponibles<br>en la plataforma, aplicando filtros de acuerdo a sus<br>necesidades |
| --- | --- |
| Actores | - Usuarios |
| Precondiciones |  |
| 1. El sistema está operativo.<br>2. El usuario tiene sesión activa<br>3. Existens espacios activos registrados en el catálogo<br>4. Existen planes vigentes asociados a los espacios activos |  |
| Flujo Básico |  |
| 1. El usuario accede al módulo de catálogo de espacios desde su panel.<br>2. El sistema muestra la lista de espacios activos indicando tipo de espacio,<br>capacidad, descripción, imágenes referenciales.<br>3. El usuario define los criterios de búsqueda según sus necesidades (tipo de<br>sala, capacidad mínima, fecha tentativa)<br>4. El sistema valida que los criterios ingresados sean lógicos<br>5. El sistema filtra el catálogo y muestra los espacios que cumplen con los<br>criterios, junto con el costo por hora del plan de precios activo.<br>6. El usuario selecciona un espacio del catálogo<br>7. El sistema muestra el detalle ampliado del espacio seleccionado,<br>incluyendo características, capacidad, tipo de espacio, condiciones de uso<br>y estado en catálogo.<br>8. El usuario continúa el flujo hacia la consulta de disponibilidad del espacio<br>seleccionado. |  |
| Flujo Alternativo |  |
| Filtros inválidos |  |


---

## Página 82

             1. En el paso 4, el usuario ingresa una fecha en tiempo pasado o una
                capacidad superior al aforo máximo del Coworking.
             2. El sistema muestra un mensaje de error indicando el filtro a corregir.
             3. El sistema no ejecuta la búsqueda hasta que se corrijan los criterios.
           Sin resultados de búsqueda
             1. En el paso 5, ningún espacio activo cumple con los criterios ingresados.
             2. El sistema muestra un mensaje indicando que no se encontraron espacios
                para esos filtros.
             3. El sistema sugiere al usuario relajar criterios o ampliar la búsqueda.
           Espacio para fiesta pero sin flab
             1. En el paso 2, un espacio existe pero no tiene un plan de precios activo
                asociado.
             2. El sistema omite ese espacio del listado mostrado al usuario.
           Postcondiciones
             1. El usuario obtiene la información del catálogo filtrada según sus criterios.
             2. El usuario puede iniciar la consulta de disponibilidad sobre el espacio
                seleccionado.
             3. El sistema no modifica datos ni genera registros transaccionales
           Restricciones
             -  El usuario debe estar autenticado para acceder al catálogo.
             -  Solo se muestran espacios con estado "activo".
             -  Solo se muestran planes de precios con estado "activo".
             -  La fecha del filtro de búsqueda no puede ser en tiempo pasado.
             -  La capacidad solicitada no puede superar el aforo de la sala con mayor
                capacidad disponible.
             -  Los cambios de precio no aplican retroactivamente a reservas ya
                cconfirmadas.
             -  La información del catálogo se actualiza conforme a las modificaciones
                realizadas en CU-017.
           Casos de Uso Padre
           CU-004, CU-005
           Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 1. En el paso 4, el usuario ingresa una fecha en tiempo pasado o una<br>capacidad superior al aforo máximo del Coworking.<br>2. El sistema muestra un mensaje de error indicando el filtro a corregir.<br>3. El sistema no ejecuta la búsqueda hasta que se corrijan los criterios. |
| --- |
| Sin resultados de búsqueda |
| 1. En el paso 5, ningún espacio activo cumple con los criterios ingresados.<br>2. El sistema muestra un mensaje indicando que no se encontraron espacios<br>para esos filtros.<br>3. El sistema sugiere al usuario relajar criterios o ampliar la búsqueda. |
| Espacio para fiesta pero sin flab |
| 1. En el paso 2, un espacio existe pero no tiene un plan de precios activo<br>asociado.<br>2. El sistema omite ese espacio del listado mostrado al usuario. |
| Postcondiciones |
| 1. El usuario obtiene la información del catálogo filtrada según sus criterios.<br>2. El usuario puede iniciar la consulta de disponibilidad sobre el espacio<br>seleccionado.<br>3. El sistema no modifica datos ni genera registros transaccionales |
| Restricciones |
| - El usuario debe estar autenticado para acceder al catálogo.<br>- Solo se muestran espacios con estado "activo".<br>- Solo se muestran planes de precios con estado "activo".<br>- La fecha del filtro de búsqueda no puede ser en tiempo pasado.<br>- La capacidad solicitada no puede superar el aforo de la sala con mayor<br>capacidad disponible.<br>- Los cambios de precio no aplican retroactivamente a reservas ya<br>cconfirmadas.<br>- La información del catálogo se actualiza conforme a las modificaciones<br>realizadas en CU-017. |
| Casos de Uso Padre |
| CU-004, CU-005 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 83

           Prototipo
          Nota: Los diagramas de caso de uso se encuentran en el Anexo C, archivo diagramas.drawio en la hoja llamada “Ejercicio 1”. El prototipo
          se encuentra en el Anexo D.
          CU020: Consultar reportes y estadísticas administrativas
           Descripción   Permite a los administradores visualizar los indicadores
                         del sistema (KPIs), ingresos, porcentajes de ocupación
                         de espacios y ranking de los usuarios más activos.
                         Asimismo, permite a los superadministradores exportar
                         dicha data.
           Actores          - Administrador principal (superadmin)
                            - Administradores
           Precondiciones
             -  El sistema está operativo.
             -  El usuario tiene una sesión activa con los permisos necesarios para ver
                reportes
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


#### Tabla 2

| Descripción | Permite a los administradores visualizar los indicadores<br>del sistema (KPIs), ingresos, porcentajes de ocupación<br>de espacios y ranking de los usuarios más activos.<br>Asimismo, permite a los superadministradores exportar<br>dicha data. |
| --- | --- |
| Actores | - Administrador principal (superadmin)<br>- Administradores |
| Precondiciones |  |
| - El sistema está operativo.<br>- El usuario tiene una sesión activa con los permisos necesarios para ver<br>reportes |  |
| Flujo Básico |  |


---

## Página 84

             1. El administrador accede al módulo de reportes desde el menú del
                dashboard.
             2. El sistema carga un resumen estadístico, tabla de ingresos, usuarios top y
                ocupación.
             3. El administrador ajusta opcionalmente los filtros (fechas, oficinas, tipo de
                espacio).
             4. El sistema actualiza en vivo las gráficas y tablas según los filtros.
             5. El administrador principal (si aplica) selecciona "Exportar".
             6. El sistema genera el archivo y registra la exportación en el historial
           Flujo Alternativo
           Sin resultados en el rango de fechas
             1. En el paso 4, si los filtros seleccionados no poseen información de
                reservas.
             2. El sistema carga las tablas sin registros y refleja ceros en el panel de
                indicadores.
           Post Condiciones
             -  Los registros de reportes exportados se guardan en el "Historial de
                Exportaciones"
           Restricciones
             -  Solo los administradores con permisos para reportes pueden ejecutar
                exportaciones y visualizar la tabla de descargas anteriores
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El administrador accede al módulo de reportes desde el menú del<br>dashboard.<br>2. El sistema carga un resumen estadístico, tabla de ingresos, usuarios top y<br>ocupación.<br>3. El administrador ajusta opcionalmente los filtros (fechas, oficinas, tipo de<br>espacio).<br>4. El sistema actualiza en vivo las gráficas y tablas según los filtros.<br>5. El administrador principal (si aplica) selecciona "Exportar".<br>6. El sistema genera el archivo y registra la exportación en el historial |
| --- |
| Flujo Alternativo |
| Sin resultados en el rango de fechas |
| 1. En el paso 4, si los filtros seleccionados no poseen información de<br>reservas.<br>2. El sistema carga las tablas sin registros y refleja ceros en el panel de<br>indicadores. |
| Post Condiciones |
| - Los registros de reportes exportados se guardan en el "Historial de<br>Exportaciones" |
| Restricciones |
| - Solo los administradores con permisos para reportes pueden ejecutar<br>exportaciones y visualizar la tabla de descargas anteriores |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 85

          CU021: Modificar perfil de usuario
           Descripción   Permite a un usuario autenticado visualizar y modificar
                         sus datos personales de contacto, como nombres,
                         apellidos y número de teléfono
           Actores          - Usuarios
           Precondiciones
             -  El sistema está operativo.
             -  El usuario tiene una sesión activa.
             -  El usuario no tiene rol de administrador princpal.
           Flujo Básico
             1. El usuario accede al panel de configuración de su cuenta (Perfil Personal).
             2. El sistema muestra la información actual del perfil del usuario.
             3. El usuario selecciona la opción de "Modificar".
             4. El usuario edita los campos habilitados (nombre, apellidos o teléfono
                móvil).
             5. El usuario envía el formulario para guardar cambios.
             6. El sistema valida la información ingresada.
             7. El sistema actualiza los datos del usuario en la base de datos.
             8. El sistema muestra un mensaje de confirmación exitosa
           Flujo Alternativo
           Datos inválidos
             1. En el paso 6, la validación detecta que el formato del teléfono no es
                numérico válido (9 dígitos) o hay campos vacíos.
             2. El sistema muestra un mensaje de error debajo del campo
                correspondiente.
             3. El usuario debe corregir los datos antes de volver a enviar el formulario.


### Tablas de la página


#### Tabla 1

| Descripción | Permite a un usuario autenticado visualizar y modificar<br>sus datos personales de contacto, como nombres,<br>apellidos y número de teléfono |
| --- | --- |
| Actores | - Usuarios |
| Precondiciones |  |
| - El sistema está operativo.<br>- El usuario tiene una sesión activa.<br>- El usuario no tiene rol de administrador princpal. |  |
| Flujo Básico |  |
| 1. El usuario accede al panel de configuración de su cuenta (Perfil Personal).<br>2. El sistema muestra la información actual del perfil del usuario.<br>3. El usuario selecciona la opción de "Modificar".<br>4. El usuario edita los campos habilitados (nombre, apellidos o teléfono<br>móvil).<br>5. El usuario envía el formulario para guardar cambios.<br>6. El sistema valida la información ingresada.<br>7. El sistema actualiza los datos del usuario en la base de datos.<br>8. El sistema muestra un mensaje de confirmación exitosa |  |
| Flujo Alternativo |  |
| Datos inválidos |  |
| 1. En el paso 6, la validación detecta que el formato del teléfono no es<br>numérico válido (9 dígitos) o hay campos vacíos.<br>2. El sistema muestra un mensaje de error debajo del campo<br>correspondiente.<br>3. El usuario debe corregir los datos antes de volver a enviar el formulario. |  |


---

## Página 86

           Post Condiciones
             -  Los nuevos datos del usuario persisten en la base de datos.
             -  La información actualizada se refleja instantáneamente en el perfil del
                usuario en la plataforma.
           Restricciones
             -  El correo electrónico no puede ser modificado desde esta vista por el
                usuario.
             -  El número de teléfono debe cumplir con un formato válido.
             -  La cuenta del administrador principal está restringida para modificaciones
                desde este panel.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| Post Condiciones |
| --- |
| - Los nuevos datos del usuario persisten en la base de datos.<br>- La información actualizada se refleja instantáneamente en el perfil del<br>usuario en la plataforma. |
| Restricciones |
| - El correo electrónico no puede ser modificado desde esta vista por el<br>usuario.<br>- El número de teléfono debe cumplir con un formato válido.<br>- La cuenta del administrador principal está restringida para modificaciones<br>desde este panel. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 87

           Vista de admin:


---

## Página 88

          CU022: Actualizar contraseña desde el perfil de usuario
           Descripción   Permite a un usuario autenticado establecer una nueva
                         contraseña de acceso como medida de seguridad
                         periódica, requiriendo el ingreso de su contraseña actual
                         en lugar de un código al correo.
           Actores          - Usuarios
           Precondiciones
             -  El sistema está operativo.
             -  El usuario tiene una sesión activa.
             -  El usuario recuerda su contraseña actual.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite a un usuario autenticado establecer una nueva<br>contraseña de acceso como medida de seguridad<br>periódica, requiriendo el ingreso de su contraseña actual<br>en lugar de un código al correo. |
| --- | --- |
| Actores | - Usuarios |
| Precondiciones |  |
| - El sistema está operativo.<br>- El usuario tiene una sesión activa.<br>- El usuario recuerda su contraseña actual. |  |
| Flujo Básico |  |


---

## Página 89

             1. El usuario accede a la sección de Seguridad dentro de su cuenta.
             2. El sistema muestra el formulario de cambio de contraseña interno.
             3. El usuario ingresa su contraseña actual.
             4. El usuario ingresa una nueva contraseña y la repite para confirmarla.
             5. El usuario envía el formulario.
             6. El sistema valida que la contraseña actual sea la correcta y que la nueva
                cumpla con las políticas.
             7. El sistema encripta y actualiza la contraseña en la base de datos.
             8. El sistema muestra un mensaje de actualización exitosa
           Flujo Alternativo
           Contraseña actual incorrecta
             1. En el paso 6, el sistema detecta que la contraseña actual proporcionada
                no es correcta.
             2. El sistema detiene el proceso y muestra un error indicando la
                discrepancia.
           Nueva contraseña no cumple políticas de seguridad
             1. En el paso 6, el sistema advierte en tiempo real que la nueva contraseña
                no cumple con la longitud mínima u otros criterios.
             2. El sistema requiere que el usuario cambie la contraseña antes de poder
                enviarla.
           Post Condiciones
             -  La nueva credencial queda registrada y encriptada para futuros inicios de
                sesión.
           Restricciones
             -  La nueva contraseña no puede ser idéntica a la antigua contraseña.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El usuario accede a la sección de Seguridad dentro de su cuenta.<br>2. El sistema muestra el formulario de cambio de contraseña interno.<br>3. El usuario ingresa su contraseña actual.<br>4. El usuario ingresa una nueva contraseña y la repite para confirmarla.<br>5. El usuario envía el formulario.<br>6. El sistema valida que la contraseña actual sea la correcta y que la nueva<br>cumpla con las políticas.<br>7. El sistema encripta y actualiza la contraseña en la base de datos.<br>8. El sistema muestra un mensaje de actualización exitosa |
| --- |
| Flujo Alternativo |
| Contraseña actual incorrecta |
| 1. En el paso 6, el sistema detecta que la contraseña actual proporcionada<br>no es correcta.<br>2. El sistema detiene el proceso y muestra un error indicando la<br>discrepancia. |
| Nueva contraseña no cumple políticas de seguridad |
| 1. En el paso 6, el sistema advierte en tiempo real que la nueva contraseña<br>no cumple con la longitud mínima u otros criterios.<br>2. El sistema requiere que el usuario cambie la contraseña antes de poder<br>enviarla. |
| Post Condiciones |
| - La nueva credencial queda registrada y encriptada para futuros inicios de<br>sesión. |
| Restricciones |
| - La nueva contraseña no puede ser idéntica a la antigua contraseña. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 90

          CU023: Consultar información detallada de usuario
           Descripción   Permite a los administradores desplegar y revisar a
                         detalle la información de registro y estado de un usuario
                         dentro del módulo de gestión, a fin de validar
                         identidades u otra información de contacto.
           Actores          - Administrador principal (superadmin)
                            - Administradores
           Precondiciones
             -  El sistema está operativo.
             -  El administrador está autenticado y en el módulo de gestión de usuarios.
             -  El usuario consultado está registrado en la plataforma.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite a los administradores desplegar y revisar a<br>detalle la información de registro y estado de un usuario<br>dentro del módulo de gestión, a fin de validar<br>identidades u otra información de contacto. |
| --- | --- |
| Actores | - Administrador principal (superadmin)<br>- Administradores |
| Precondiciones |  |
| - El sistema está operativo.<br>- El administrador está autenticado y en el módulo de gestión de usuarios.<br>- El usuario consultado está registrado en la plataforma. |  |
| Flujo Básico |  |


---

## Página 91

             1. El administrador visualiza la lista de usuarios en la tabla principal.
             2. El administrador selecciona un usuario haciendo clic sobre él o en la
                opción correspondiente.
             3. El sistema despliega un panel modal que revela a fondo: Correo, Teléfono,
                Documento (DNI), Estado, Rol y Fecha de Creación.
             4. El administrador revisa la información.
             5. El administrador cierra el modal informativo.
           Flujo Alternativo
           Falla en carga de datos
             1. En el paso 3, el sistema no puede cargar o recuperar la data específica
                del usuario desde el backend.
             2. Se muestra una advertencia de error y el modal no se abre.
           Post Condiciones
             -  La información solo fue leída; la base de datos no sufre cambios.
           Restricciones
             -  Únicamente usuarios con los permisos de lectura de "Usuarios" pueden
                invocar este panel.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El administrador visualiza la lista de usuarios en la tabla principal.<br>2. El administrador selecciona un usuario haciendo clic sobre él o en la<br>opción correspondiente.<br>3. El sistema despliega un panel modal que revela a fondo: Correo, Teléfono,<br>Documento (DNI), Estado, Rol y Fecha de Creación.<br>4. El administrador revisa la información.<br>5. El administrador cierra el modal informativo. |
| --- |
| Flujo Alternativo |
| Falla en carga de datos |
| 1. En el paso 3, el sistema no puede cargar o recuperar la data específica<br>del usuario desde el backend.<br>2. Se muestra una advertencia de error y el modal no se abre. |
| Post Condiciones |
| - La información solo fue leída; la base de datos no sufre cambios. |
| Restricciones |
| - Únicamente usuarios con los permisos de lectura de "Usuarios" pueden<br>invocar este panel. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 92

          CU024: Rechazar solicitud de reprogramación
           Descripción   Permite a un administrador denegar y cerrar
                         definitivamente una solicitud de reprogramación enviada
                         por un usuario a causa de conflictos de disponibilidad o
                         justificaciones no válidas.
           Actores          - Administrador principal (superadmin)
                            - Administradores
           Precondiciones
             -  El sistema está operativo.
             -  Existe al menos una solicitud de reprogramación en estado pendiente.
             -  El administrador está autenticado en la plataforma.
           Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Permite a un administrador denegar y cerrar<br>definitivamente una solicitud de reprogramación enviada<br>por un usuario a causa de conflictos de disponibilidad o<br>justificaciones no válidas. |
| --- | --- |
| Actores | - Administrador principal (superadmin)<br>- Administradores |
| Precondiciones |  |
| - El sistema está operativo.<br>- Existe al menos una solicitud de reprogramación en estado pendiente.<br>- El administrador está autenticado en la plataforma. |  |
| Flujo Básico |  |


---

## Página 93

             1. El administrador ingresa a su bandeja de solicitudes de reprogramación.
             2. Identifica la solicitud de un usuario y selecciona la acción de "Rechazar".
             3. El sistema muestra un modal de confirmación advirtiendo las
                consecuencias del rechazo.
             4. El administrador confirma el rechazo de la solicitud.
             5. El sistema notifica al backend la resolución negativa.
             6. La solicitud cambia a estado rechazada, desapareciendo de las
                pendientes.
           Flujo Alternativo
           Solicitud ya procesada
             1. Al confirmar el rechazo en el paso 4, el sistema detecta que otro
                administrador ya procesó dicha solicitud.
             2. Se indica un mensaje de error o conflicto al administrador y se actualiza la
                tabla de solicitudes
           Post Condiciones
             -  La solicitud queda permanentemente denegada.
             -  La reserva asociada mantiene inalterado su estado de "Confirmada" en su
                fecha y hora originales.
           Restricciones
             -  Solo se pueden rechazar solicitudes que estén explícitamente en un
                estado de evaluación o "pendientes"
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| 1. El administrador ingresa a su bandeja de solicitudes de reprogramación.<br>2. Identifica la solicitud de un usuario y selecciona la acción de "Rechazar".<br>3. El sistema muestra un modal de confirmación advirtiendo las<br>consecuencias del rechazo.<br>4. El administrador confirma el rechazo de la solicitud.<br>5. El sistema notifica al backend la resolución negativa.<br>6. La solicitud cambia a estado rechazada, desapareciendo de las<br>pendientes. |
| --- |
| Flujo Alternativo |
| Solicitud ya procesada |
| 1. Al confirmar el rechazo en el paso 4, el sistema detecta que otro<br>administrador ya procesó dicha solicitud.<br>2. Se indica un mensaje de error o conflicto al administrador y se actualiza la<br>tabla de solicitudes |
| Post Condiciones |
| - La solicitud queda permanentemente denegada.<br>- La reserva asociada mantiene inalterado su estado de "Confirmada" en su<br>fecha y hora originales. |
| Restricciones |
| - Solo se pueden rechazar solicitudes que estén explícitamente en un<br>estado de evaluación o "pendientes" |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 94

          CU025: Consultar todas las reservas registradas
           Descripción   Permite al administrador visualizar, buscar y filtrar la lista
                         completa de reservas globales realizadas por todos los
                         usuarios del sistema.


### Tablas de la página


#### Tabla 1

| Descripción | Permite al administrador visualizar, buscar y filtrar la lista<br>completa de reservas globales realizadas por todos los<br>usuarios del sistema. |
| --- | --- |


---

## Página 95

           Actores          - Administrador principal (superadmin)
                            - Administradores
           Precondiciones
             -  El sistema está operativo.
             -  El administrador tiene una sesión activa y permisos para acceder al
                módulo de reservas.
           Flujo Básico
             1. El administrador ingresa al módulo de "Gestión de Reservas".
             2. El sistema muestra una tabla con todas las reservas registradas en la
                plataforma.
             3. El administrador puede visualizar detalles básicos como el cliente, sala,
                fecha, horario y estado.
             4. El administrador utiliza los filtros (estado, fechas, etc.) para refinar la
                búsqueda.
             5. El sistema actualiza la lista mostrada en base a los filtros aplicados
           Flujo Alternativo
           Sin resultados de búsqueda
             1. En el paso 4, el administrador aplica filtros muy restrictivos o busca un
                usuario sin reservas.
             2. El sistema muestra una tabla vacía con un mensaje indicando que no se
                encontraron coincidencias.
           Post Condiciones
             -  El administrador obtiene la información requerida sobre el estado global
                de las reservas.
           Restricciones
             -  Solo usuarios con rol administrativo pueden acceder a este listado general
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| Actores | - Administrador principal (superadmin)<br>- Administradores |
| --- | --- |
| Precondiciones |  |
| - El sistema está operativo.<br>- El administrador tiene una sesión activa y permisos para acceder al<br>módulo de reservas. |  |
| Flujo Básico |  |
| 1. El administrador ingresa al módulo de "Gestión de Reservas".<br>2. El sistema muestra una tabla con todas las reservas registradas en la<br>plataforma.<br>3. El administrador puede visualizar detalles básicos como el cliente, sala,<br>fecha, horario y estado.<br>4. El administrador utiliza los filtros (estado, fechas, etc.) para refinar la<br>búsqueda.<br>5. El sistema actualiza la lista mostrada en base a los filtros aplicados |  |
| Flujo Alternativo |  |
| Sin resultados de búsqueda |  |
| 1. En el paso 4, el administrador aplica filtros muy restrictivos o busca un<br>usuario sin reservas.<br>2. El sistema muestra una tabla vacía con un mensaje indicando que no se<br>encontraron coincidencias. |  |
| Post Condiciones |  |
| - El administrador obtiene la información requerida sobre el estado global<br>de las reservas. |  |
| Restricciones |  |
| - Solo usuarios con rol administrativo pueden acceder a este listado general |  |
| Casos de Uso Padre |  |
| CU-004 |  |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 96

           Prototipo
          CU026: Desactivar un usuario
           Descripción   Permite a un administrador cambiar el estado de cuenta
                         de un usuario registrado a "Deshabilitado", impidiendo
                         su futuro acceso a la plataforma.
           Actores          - Administrador principal (superadmin)
                            - Administradores
           Precondiciones
             -  El sistema está operativo.
             -  El administrador está autenticado en el módulo de gestión de usuarios.
             -  El usuario objetivo debe existir y no estar ya deshabilitado.
           Flujo Básico
             1. El administrador visualiza la lista de usuarios.
             2. Selecciona un usuario específico y elige la opción para cambiar su estado.
             3. El administrador selecciona "Deshabilitado" o confirma la inhabilitación.
             4. El sistema valida la operación y verifica que el administrador tenga
                permisos suficientes.
             5. El sistema actualiza el estado de la cuenta en la base de datos.
             6. El sistema muestra un mensaje de confirmación de cuenta deshabilitada.
           Flujo Alternativo
           Intento de desactivar a sí mismo
             1. En el paso 4, el sistema detecta que el usuario objetivo es la misma
                cuenta del administrador en sesión.
             2. El sistema bloquea la acción y muestra un error indicando que no puede
                deshabilitar su propia cuenta.
           Post Condiciones


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


#### Tabla 2

| Descripción | Permite a un administrador cambiar el estado de cuenta<br>de un usuario registrado a "Deshabilitado", impidiendo<br>su futuro acceso a la plataforma. |
| --- | --- |
| Actores | - Administrador principal (superadmin)<br>- Administradores |
| Precondiciones |  |
| - El sistema está operativo.<br>- El administrador está autenticado en el módulo de gestión de usuarios.<br>- El usuario objetivo debe existir y no estar ya deshabilitado. |  |
| Flujo Básico |  |
| 1. El administrador visualiza la lista de usuarios.<br>2. Selecciona un usuario específico y elige la opción para cambiar su estado.<br>3. El administrador selecciona "Deshabilitado" o confirma la inhabilitación.<br>4. El sistema valida la operación y verifica que el administrador tenga<br>permisos suficientes.<br>5. El sistema actualiza el estado de la cuenta en la base de datos.<br>6. El sistema muestra un mensaje de confirmación de cuenta deshabilitada. |  |
| Flujo Alternativo |  |
| Intento de desactivar a sí mismo |  |
| 1. En el paso 4, el sistema detecta que el usuario objetivo es la misma<br>cuenta del administrador en sesión.<br>2. El sistema bloquea la acción y muestra un error indicando que no puede<br>deshabilitar su propia cuenta. |  |
| Post Condiciones |  |


---

## Página 97

             -  El usuario queda con estado deshabilitado y no podrá iniciar sesión en la
                plataforma.
           Restricciones
             -  Solo el Administrador Principal puede deshabilitar a otros Administradores.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| - El usuario queda con estado deshabilitado y no podrá iniciar sesión en la<br>plataforma. |
| --- |
| Restricciones |
| - Solo el Administrador Principal puede deshabilitar a otros Administradores. |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 98

          CU027: Visualizar resumen administrativo y accesos rápidos
           Descripción   Permite a los administradores visualizar un panel central
                         (Dashboard) al iniciar sesión, que incluye accesos
                         directos a las funcionalidades más utilizadas y tarjetas
                         resumen de la operativa del día.
           Actores          - Administrador principal (superadmin)
                            - Administradores
           Precondiciones
             -  El sistema está operativo.
             -  El administrador tiene sesión activa.
           Flujo Básico
             1. El administrador inicia sesión y es redirigido automáticamente a su
                Dashboard.
             2. El sistema carga los accesos rápidos (ej. Crear reserva, Ver catálogo) y
                tarjetas resumen (ej. reservas de hoy, ingresos recientes).
             3. El administrador selecciona un acceso rápido.
             4. El sistema redirige al administrador al módulo correspondiente
           Flujo Alternativo
           Error de conexión a métricas
             1. En el paso 2, el backend no responde a tiempo para cargar los resúmenes
                del día.
             2. El sistema muestra las tarjetas en estado vacío o de error, pero mantiene
                funcionales los accesos rápidos.
           Post Condiciones
             -  El administrador navega hacia el módulo deseado utilizando el acceso
                rápido.
           Restricciones


### Tablas de la página


#### Tabla 1

| Descripción | Permite a los administradores visualizar un panel central<br>(Dashboard) al iniciar sesión, que incluye accesos<br>directos a las funcionalidades más utilizadas y tarjetas<br>resumen de la operativa del día. |
| --- | --- |
| Actores | - Administrador principal (superadmin)<br>- Administradores |
| Precondiciones |  |
| - El sistema está operativo.<br>- El administrador tiene sesión activa. |  |
| Flujo Básico |  |
| 1. El administrador inicia sesión y es redirigido automáticamente a su<br>Dashboard.<br>2. El sistema carga los accesos rápidos (ej. Crear reserva, Ver catálogo) y<br>tarjetas resumen (ej. reservas de hoy, ingresos recientes).<br>3. El administrador selecciona un acceso rápido.<br>4. El sistema redirige al administrador al módulo correspondiente |  |
| Flujo Alternativo |  |
| Error de conexión a métricas |  |
| 1. En el paso 2, el backend no responde a tiempo para cargar los resúmenes<br>del día.<br>2. El sistema muestra las tarjetas en estado vacío o de error, pero mantiene<br>funcionales los accesos rápidos. |  |
| Post Condiciones |  |
| - El administrador navega hacia el módulo deseado utilizando el acceso<br>rápido. |  |
| Restricciones |  |


---

## Página 99

             -  Las opciones mostradas dependen exclusivamente de los permisos que
                posea el rol del administrador.
           Casos de Uso Padre
           CU-004
           Diagrama de caso de uso
           Prototipo
          CU028: Eliminar rol
           Descripción   Permite al administrador principal remover
                         permanentemente un rol personalizado que ya no es
                         necesario en el sistema.
           Actores          - Administrador principal (superadmin)
           Precondiciones
             -  El sistema está operativo.
             -  El administrador principal está autenticado y en la sección de roles.
             -  El rol a eliminar no debe estar asignado a ningún usuario existente.


### Tablas de la página


#### Tabla 1

| - Las opciones mostradas dependen exclusivamente de los permisos que<br>posea el rol del administrador. |
| --- |
| Casos de Uso Padre |
| CU-004 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


#### Tabla 4

| Descripción | Permite al administrador principal remover<br>permanentemente un rol personalizado que ya no es<br>necesario en el sistema. |
| --- | --- |
| Actores | - Administrador principal (superadmin) |
| Precondiciones |  |
| - El sistema está operativo.<br>- El administrador principal está autenticado y en la sección de roles.<br>- El rol a eliminar no debe estar asignado a ningún usuario existente. |  |


---

## Página 100

             -  El rol a eliminar no debe ser un rol protegido del sistema (Cliente,
                Administrador Principal).
           Flujo Básico
             1. El administrador accede al listado de roles en el módulo de gestión.
             2. El administrador selecciona la opción "Eliminar" sobre un rol específico.
             3. El sistema muestra una advertencia de confirmación.
             4. El administrador confirma la eliminación.
             5. El sistema valida que el rol no sea protegido ni esté en uso.
             6. El sistema elimina el rol de la base de datos.
             7. El sistema muestra un mensaje de éxito y actualiza la lista.
           Flujo Alternativo
           Rol en uso o protegido
             1. En el paso 5, el sistema detecta que el rol está asignado a usuarios o es
                protegido por el sistema.
             2. El sistema rechaza la eliminación y muestra un mensaje de error
                explicando el motivo
           Post Condiciones
             -  El rol deja de existir y ya no puede ser asignado a ningún usuario nuevo o
                existente.
           Restricciones
             -  Acción exclusiva del Administrador Principal.
             -  Roles por defecto (CLIENTE, ADMINISTRADOR_PRINCIPAL) no pueden
                eliminarse.
           Casos de Uso Padre
           CU-004, CU-009
           Diagrama de caso de uso
           Prototipo


### Tablas de la página


#### Tabla 1

| - El rol a eliminar no debe ser un rol protegido del sistema (Cliente,<br>Administrador Principal). |
| --- |
| Flujo Básico |
| 1. El administrador accede al listado de roles en el módulo de gestión.<br>2. El administrador selecciona la opción "Eliminar" sobre un rol específico.<br>3. El sistema muestra una advertencia de confirmación.<br>4. El administrador confirma la eliminación.<br>5. El sistema valida que el rol no sea protegido ni esté en uso.<br>6. El sistema elimina el rol de la base de datos.<br>7. El sistema muestra un mensaje de éxito y actualiza la lista. |
| Flujo Alternativo |
| Rol en uso o protegido |
| 1. En el paso 5, el sistema detecta que el rol está asignado a usuarios o es<br>protegido por el sistema.<br>2. El sistema rechaza la eliminación y muestra un mensaje de error<br>explicando el motivo |
| Post Condiciones |
| - El rol deja de existir y ya no puede ser asignado a ningún usuario nuevo o<br>existente. |
| Restricciones |
| - Acción exclusiva del Administrador Principal.<br>- Roles por defecto (CLIENTE, ADMINISTRADOR_PRINCIPAL) no pueden<br>eliminarse. |
| Casos de Uso Padre |
| CU-004, CU-009 |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 101


---

## Página 102

               9.5. DIAGRAMA DE SECUENCIA
           CU001: Registrar Usuario


---

## Página 103

           CU-002 - Iniciar sesión


---

## Página 104

           CU-003 - Cambiar contraseña


---

## Página 105

           CU-004 - Acceder al sistema


---

## Página 106

           CU-005 - Consultar la disponibilidad de una reserva


---

## Página 107

           CU-006 - Realizar una reserva


---

## Página 108

           CU-007 - Realizar pago de reserva


---

## Página 109

           CU-008 - Solicitar reprogramación de una reserva


---

## Página 110

           CU-009 - Crear nuevo rol


---

## Página 111

           CU-010 - Modificar permisos de un rol


---

## Página 112

           CU-011 - Cambiar roles de usuario


---

## Página 113

           CU-012 - Cancelar una reserva


---

## Página 114

           CU-013 - Reprogramar una reserva como administrador


---

## Página 115

           CU-014 - Bloquear un horario


---

## Página 116

           CU-015 - Registrar reserva como administrador


---

## Página 117

           CU-016 - Consultar una reserva


---

## Página 118

           CU-017 - Mantener catálogo de espacios


---

## Página 119

           CU-018


---

## Página 120

           CU-019


---

## Página 121

           CU-020


---

## Página 122

           CU-021


---

## Página 123

           CU-022


---

## Página 124

           CU-023


---

## Página 125

           CU-024


---

## Página 126

           CU-025


---

## Página 127

           CU-026


---

## Página 128

           CU-027


---

## Página 129

           CU-028


---

## Página 130

          Nota: Los diagramas de secuencia de los casos de uso se encuentran en el Anexo C, archivo diagramas.drawio en la hoja llamada
          “Ejercicio 1”


---

## Página 131

           10. MODELO DE DATOS
          Nota: El diagrama Entidad Relación se encuentra en el Anexo B.
           11. DICCIONARIO DE DATOS
          user_roles
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único del rol
           role_name varchar No No No   Sí  —         Nombre del rol
           is_enabled boolean No No No  No  —         Indica si el rol está activo
           permissions jsonb No No No   No  —         Permisos asociados al rol
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del rol
                   z
                   timestampt
           updated_at     No  No   No   No  —         Última fecha de modificación del rol
                   z


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del rol |
| role_name | varchar | No | No | No | Sí | — | Nombre del rol |
| is_enabled | boolean | No | No | No | No | — | Indica si el rol está activo |
| permissions | jsonb | No | No | No | No | — | Permisos asociados al rol |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del rol |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación del rol |


---

## Página 132

          office_kinds
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único del tipo
           kind_name varchar No No No   Sí  —         Nombre del tipo
           is_enabled boolean No No No  No  —         Indica si el tipo está activo
                   timestampt
           deleted_at     Sí  No   No   No  —         Fecha de eliminación del tipo de sala
                   z
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del tipo
                   z
                   timestampt
           updated_at     No  No   No   No  —         Última fecha de modificación del tipo
                   z
          users
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único del usuario
           first_name varchar No No No  No  —         Nombre del usuario
           last_name varchar No No No   No  —         Apellido del usuario
           email   varchar No No   No   Sí  —         Correo del usuario
           phone_numb
                   varchar No No   No   No  —         Número del usuario
           er
           document_n
                   varchar No No   No   No  —         DNI del usuario
           umber
           birth_date date Sí No   No   No  —         Fecha de nacimiento del usuario
           password_ha
                   varchar No No   No   No  —         Contraseña encriptada del usuario
           sh
           user_role_id uuid No No Sí   No  user_roles (id) identificador del rol del usuario
           email_verifie
                   boolean No No   No   No  —         Indica si el usuario verificó su correo
           d
           terms_accep                                Indica si el usuario ha aceptado los
                   boolean No No   No   No  —
           ted                                        términos y condiciones de la app
           account_stat
                   varchar No No   No   No  —         Estado de la cuenta en la aplicación
           us
           failed_attem
                   int    No  No   No   No  —         Cantidad de intentos fallidos de login
           pts
                   timestampt                         Indica hasta cuándo el usuario se
           locked_until   Sí  No   No   No  —
                   z                                  encuentra bloqueado en la app
                   timestampt                         Fecha de último intento fallido de
           last_failed_at Sí  No   No   No  —
                   z                                  inicio de sesión
                   timestampt                         Fecha de último inicio de sesión
           last_login_at  Sí  No   No   No  —
                   z                                  exitoso
                   timestampt                         Fecha de eliminación de cuenta de
           deleted_at     Sí  No   No   No  —
                   z                                  usuario


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del tipo |
| kind_name | varchar | No | No | No | Sí | — | Nombre del tipo |
| is_enabled | boolean | No | No | No | No | — | Indica si el tipo está activo |
| deleted_at | timestampt<br>z | Sí | No | No | No | — | Fecha de eliminación del tipo de sala |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del tipo |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación del tipo |


#### Tabla 2

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del usuario |
| first_name | varchar | No | No | No | No | — | Nombre del usuario |
| last_name | varchar | No | No | No | No | — | Apellido del usuario |
| email | varchar | No | No | No | Sí | — | Correo del usuario |
| phone_numb<br>er | varchar | No | No | No | No | — | Número del usuario |
| document_n<br>umber | varchar | No | No | No | No | — | DNI del usuario |
| birth_date | date | Sí | No | No | No | — | Fecha de nacimiento del usuario |
| password_ha<br>sh | varchar | No | No | No | No | — | Contraseña encriptada del usuario |
| user_role_id | uuid | No | No | Sí | No | user_roles (id) | identificador del rol del usuario |
| email_verifie<br>d | boolean | No | No | No | No | — | Indica si el usuario verificó su correo |
| terms_accep<br>ted | boolean | No | No | No | No | — | Indica si el usuario ha aceptado los<br>términos y condiciones de la app |
| account_stat<br>us | varchar | No | No | No | No | — | Estado de la cuenta en la aplicación |
| failed_attem<br>pts | int | No | No | No | No | — | Cantidad de intentos fallidos de login |
| locked_until | timestampt<br>z | Sí | No | No | No | — | Indica hasta cuándo el usuario se<br>encuentra bloqueado en la app |
| last_failed_at | timestampt<br>z | Sí | No | No | No | — | Fecha de último intento fallido de<br>inicio de sesión |
| last_login_at | timestampt<br>z | Sí | No | No | No | — | Fecha de último inicio de sesión<br>exitoso |
| deleted_at | timestampt<br>z | Sí | No | No | No | — | Fecha de eliminación de cuenta de<br>usuario |


---

## Página 133

           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del usuario
                   z
                   timestampt                         Última fecha de modificación del
           updated_at     No  No   No   No  —
                   z                                  usuario
          verification_tokens
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único del token de
           id      uuid   No  Sí   No   Sí  —
                                                      verificación
                                                      Identificador del usuario al que
           user_id uuid   No  No   Sí   No  users (id)
                                                      pertenece el token
           token   uuid   No  No   No   Sí  —         Token de verificación
           used    boolean No No   No   No  —         Indica si el token está usado
                   timestampt
           expires_at     No  No   No   No  —         Fecha de expiración del token
                   z
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del token
                   z
          password_reset_tokens
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único del token de
           id      uuid   No  Sí   No   Sí  —
                                                      reinicio de contraseña
                                                      Identificador del usuario al que
           user_id uuid   No  No   Sí   No  users (id)
                                                      pertenece el token
           token   uuid   No  No   No   Sí  —         Token de reinicio de contraseña
           used    boolean No No   No   No  —         Indica si el token está usado
                   timestampt
           expires_at     No  No   No   No  —         Fecha de expiración del token
                   z
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del token
                   z
          offices
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único de la oficina
           name    varchar No No   No   No  —         Nombre de la oficina
           description text Sí No  No   No  —         Descripción de la oficina
                                                      Cantidad máxima de personas en la
           capacity int   No  No   No   No  —
                                                      oficina
           office_kind_i
                   uuid   No  No   Sí   No  office_kinds (id) identificador del tipo de oficina
           d


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del usuario |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación del<br>usuario |


#### Tabla 2

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del token de<br>verificación |
| user_id | uuid | No | No | Sí | No | users (id) | Identificador del usuario al que<br>pertenece el token |
| token | uuid | No | No | No | Sí | — | Token de verificación |
| used | boolean | No | No | No | No | — | Indica si el token está usado |
| expires_at | timestampt<br>z | No | No | No | No | — | Fecha de expiración del token |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del token |


#### Tabla 3

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del token de<br>reinicio de contraseña |
| user_id | uuid | No | No | Sí | No | users (id) | Identificador del usuario al que<br>pertenece el token |
| token | uuid | No | No | No | Sí | — | Token de reinicio de contraseña |
| used | boolean | No | No | No | No | — | Indica si el token está usado |
| expires_at | timestampt<br>z | No | No | No | No | — | Fecha de expiración del token |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del token |


#### Tabla 4

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único de la oficina |
| name | varchar | No | No | No | No | — | Nombre de la oficina |
| description | text | Sí | No | No | No | — | Descripción de la oficina |
| capacity | int | No | No | No | No | — | Cantidad máxima de personas en la<br>oficina |
| office_kind_i<br>d | uuid | No | No | Sí | No | office_kinds (id) | identificador del tipo de oficina |


---

## Página 134

           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           conditions text Sí No   No   No  —         Condiciones de uso de la oficina
           is_enabled boolean No No No  No  —         Indica si la oficina está activa
                   timestampt
           deleted_at     Sí  No   No   No  —         Fecha de eliminación de la oficina
                   z
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación de la oficina
                   z
                   timestampt                         Última fecha de modificación de la
           updated_at     No  No   No   No  —
                   z                                  oficina
          office_plans
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único del paquete de
           id      uuid   No  Sí   No   Sí  —
                                                      oficina
           office_kind_i
                   uuid   No  No   Sí   No  office_kinds (id) Identificador del tipo de oficina
           d
           price_per_ho
                   numeric No No   No   No  —         Precio por hora del paquete
           ur
           plan_duratio
                   int    No  No   No   No  —         Duración en horas del paquete
           n_hours
           is_enabled boolean No No No  No  —         Indica si el paquete está activo
                   timestampt
           deleted_at     Sí  No   No   No  —         Fecha de eliminación del paquete
                   z
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del paquete
                   z
                   timestampt                         Última fecha de modificación del
           updated_at     No  No   No   No  —
                   z                                  paquete
          office_blocks
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único del bloqueo de
           id      uuid   No  Sí   No   Sí  —
                                                      oficina
           office_id uuid No  No   Sí   No  offices (id) Identificador de la oficina bloqueada
                                                      Identificador del usuario que creó el
           blocked_by uuid No No   Sí   No  users (id)
                                                      bloqueo
                   timestampt
           begin_date     No  No   No   No  —         Fecha de inicio del bloqueo
                   z
                   timestampt
           end_date       No  No   No   No  —         Fecha de fin del bloqueo
                   z
           reason  text   No  No   No   No  —         Razón del bloqueo
                                                      Indica si el bloqueo se encuentra
           is_active boolean No No No   No  —
                                                      activo


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| conditions | text | Sí | No | No | No | — | Condiciones de uso de la oficina |
| is_enabled | boolean | No | No | No | No | — | Indica si la oficina está activa |
| deleted_at | timestampt<br>z | Sí | No | No | No | — | Fecha de eliminación de la oficina |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación de la oficina |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación de la<br>oficina |


#### Tabla 2

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del paquete de<br>oficina |
| office_kind_i<br>d | uuid | No | No | Sí | No | office_kinds (id) | Identificador del tipo de oficina |
| price_per_ho<br>ur | numeric | No | No | No | No | — | Precio por hora del paquete |
| plan_duratio<br>n_hours | int | No | No | No | No | — | Duración en horas del paquete |
| is_enabled | boolean | No | No | No | No | — | Indica si el paquete está activo |
| deleted_at | timestampt<br>z | Sí | No | No | No | — | Fecha de eliminación del paquete |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del paquete |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación del<br>paquete |


#### Tabla 3

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del bloqueo de<br>oficina |
| office_id | uuid | No | No | Sí | No | offices (id) | Identificador de la oficina bloqueada |
| blocked_by | uuid | No | No | Sí | No | users (id) | Identificador del usuario que creó el<br>bloqueo |
| begin_date | timestampt<br>z | No | No | No | No | — | Fecha de inicio del bloqueo |
| end_date | timestampt<br>z | No | No | No | No | — | Fecha de fin del bloqueo |
| reason | text | No | No | No | No | — | Razón del bloqueo |
| is_active | boolean | No | No | No | No | — | Indica si el bloqueo se encuentra<br>activo |


---

## Página 135

           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del bloqueo
                   z
                   timestampt                         Última fecha de modificación del
           updated_at     No  No   No   No  —
                   z                                  bloqueo
          office_photos
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único de la foto
                                                      Identificador de la oficina a la que
           office_id uuid No  No   Sí   No  offices (id)
                                                      pertenece la foto
           photo_data text No No   No   No  —         Foto de la oficina en base64
                                                      Indica si la foto es la que se muestra
           is_cover boolean No No  No   No  —
                                                      primero en la página
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del paquete
                   z
          payments
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único del pago
           external_id uuid No No  No   Sí  —         Identificador del pago en la pasarela
           amount_usd numeric No No No  No  —         Monto total a pagar en dólares
           amount_pen numeric No No No  No  —         Monto total a pagar en soles
           exchange_ra                                Tipo de cambio de USD/PEN
                   numeric No No   No   No  —
           te                                         utilizado
           payment_me
                   varchar No No   No   No  —         Método de pago
           thod
           status  varchar No No   No   No  —         Estado de la transacción
           error_messa                                Mensaje de error retornado por la
                   text   Sí  No   No   No  —
           ge                                         pasarela
                   timestampt
           confirmed_at   Sí  No   No   No  —         Fecha de confirmación de pago
                   z
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación del pago
                   z
                   timestampt
           updated_at     No  No   No   No  —         Fecha de actualización del pago
                   z
          payment_attempts
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único del intento de
           id      uuid   No  Sí   No   Sí  —
                                                      pago


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del bloqueo |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación del<br>bloqueo |


#### Tabla 2

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único de la foto |
| office_id | uuid | No | No | Sí | No | offices (id) | Identificador de la oficina a la que<br>pertenece la foto |
| photo_data | text | No | No | No | No | — | Foto de la oficina en base64 |
| is_cover | boolean | No | No | No | No | — | Indica si la foto es la que se muestra<br>primero en la página |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del paquete |


#### Tabla 3

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del pago |
| external_id | uuid | No | No | No | Sí | — | Identificador del pago en la pasarela |
| amount_usd | numeric | No | No | No | No | — | Monto total a pagar en dólares |
| amount_pen | numeric | No | No | No | No | — | Monto total a pagar en soles |
| exchange_ra<br>te | numeric | No | No | No | No | — | Tipo de cambio de USD/PEN<br>utilizado |
| payment_me<br>thod | varchar | No | No | No | No | — | Método de pago |
| status | varchar | No | No | No | No | — | Estado de la transacción |
| error_messa<br>ge | text | Sí | No | No | No | — | Mensaje de error retornado por la<br>pasarela |
| confirmed_at | timestampt<br>z | Sí | No | No | No | — | Fecha de confirmación de pago |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del pago |
| updated_at | timestampt<br>z | No | No | No | No | — | Fecha de actualización del pago |


#### Tabla 4

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único del intento de<br>pago |


---

## Página 136

           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           reservation_i                              Identificador de la reserva que se
                   uuid   No  No   Sí   No  reservations (id)
           d                                          intenta pagar
           status  varchar No No   No   No  —         Estado del intento de pago
           external_tran                              Identificador de la transacción en la
                   varchar Sí No   No   No  —
           saction_id                                 pasarela
           order_id varchar Sí No  No   No  —         Identificador de la orden de pago
           error_messa                                Mensaje de error retornado por la
                   text   Sí  No   No   No  —
           ge                                         pasarela
                   timestampt                         Fecha de realización del intento de
           attempted_at   No  No   No   No  —
                   z                                  pag
          reservations
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único de la reserva
                                                      Identificador del usuario que hizo la
           user_id uuid   No  No   Sí   No  users (id)
                                                      reserva
           office_id uuid No  No   Sí   No  offices (id) Identificador de la oficina reservada
           office_plan_i                              Identificador del paquete utilizado
                   uuid   No  No   Sí   No  office_plans (id)
           d                                          para la reserva
                                                      Posible identificador del pago
           payment_id uuid Sí No   Sí   No  payments (id)
                                                      asociado a la reserva
           status  varchar No No   No   No  —         Estado de la reserva
                   timestampt
           begin_date     No  No   No   No  —         Fecha de inicio de reserva
                   z
                   timestampt
           end_date       No  No   No   No  —         Fecha de final de reserva
                   z
           person_amo
                   int    No  No   No   No  —         Cantidad de asistentes en la reserva
           unt
           uses_parking boolean No No No No —         Indica si se usa estacionamiento
           price_per_ho
                   numeric No No   No   No  —         Precio por hora usado en la reserva
           ur
           total_price_u
                   numeric No No   No   No  —         Precio total cotizado en dólares
           d
           total_price_p
                   numeric No No   No   No  —         Precio total cotizado en soles
           en
           exchange_ra                                Tipo de cambio USD/PEN utilizado
                   numeric No No   No   No  —
           te                                         en la reserva
           representativ
                   varchar No No   No   No  —         Nombre del anfitrión de la reserva
           e_name
           representativ
                   varchar No No   No   No  —         Apellido del anfitrión de la reserva
           e_last_name


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| reservation_i<br>d | uuid | No | No | Sí | No | reservations (id) | Identificador de la reserva que se<br>intenta pagar |
| status | varchar | No | No | No | No | — | Estado del intento de pago |
| external_tran<br>saction_id | varchar | Sí | No | No | No | — | Identificador de la transacción en la<br>pasarela |
| order_id | varchar | Sí | No | No | No | — | Identificador de la orden de pago |
| error_messa<br>ge | text | Sí | No | No | No | — | Mensaje de error retornado por la<br>pasarela |
| attempted_at | timestampt<br>z | No | No | No | No | — | Fecha de realización del intento de<br>pag |


#### Tabla 2

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único de la reserva |
| user_id | uuid | No | No | Sí | No | users (id) | Identificador del usuario que hizo la<br>reserva |
| office_id | uuid | No | No | Sí | No | offices (id) | Identificador de la oficina reservada |
| office_plan_i<br>d | uuid | No | No | Sí | No | office_plans (id) | Identificador del paquete utilizado<br>para la reserva |
| payment_id | uuid | Sí | No | Sí | No | payments (id) | Posible identificador del pago<br>asociado a la reserva |
| status | varchar | No | No | No | No | — | Estado de la reserva |
| begin_date | timestampt<br>z | No | No | No | No | — | Fecha de inicio de reserva |
| end_date | timestampt<br>z | No | No | No | No | — | Fecha de final de reserva |
| person_amo<br>unt | int | No | No | No | No | — | Cantidad de asistentes en la reserva |
| uses_parking | boolean | No | No | No | No | — | Indica si se usa estacionamiento |
| price_per_ho<br>ur | numeric | No | No | No | No | — | Precio por hora usado en la reserva |
| total_price_u<br>d | numeric | No | No | No | No | — | Precio total cotizado en dólares |
| total_price_p<br>en | numeric | No | No | No | No | — | Precio total cotizado en soles |
| exchange_ra<br>te | numeric | No | No | No | No | — | Tipo de cambio USD/PEN utilizado<br>en la reserva |
| representativ<br>e_name | varchar | No | No | No | No | — | Nombre del anfitrión de la reserva |
| representativ<br>e_last_name | varchar | No | No | No | No | — | Apellido del anfitrión de la reserva |


---

## Página 137

           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           representativ
           e_document varchar No No No  No  —         DNI del anfitrión de la reserva
           _number
           created_by_                                Indica si la reserva fue creada por un
                   boolean No No   No   No  —
           admin                                      administrador
                   timestampt
           cancelled_at   Sí  No   No   No  —         Fecha de cancelación de la reserva
                   z
                                                      Identificador del usuario que cancela
           cancelled_by uuid Sí No Sí   No  users (id)
                                                      la reserva
                                                      Indica si la ventana de horario de la
           active_slot boolean No No No No  —         reserva se encuentra ocupado por la
                                                      reserva
                   timestampt
           expires_at     Sí  No   No   No  —         Fecha de expiración de la reserva
                   z
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación de la reserva
                   z
                   timestampt                         Última fecha de modificación de la
           updated_at     No  No   No   No  —
                   z                                  reserva
          reservation_reschedule_requests
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único de la solicitud de
           id      uuid   No  Sí   No   Sí  —
                                                      reprogramación
                                                      Identificador de usuario que realiza
           user_id uuid   No  No   Sí   No  users (id)
                                                      la solicitud
                                                      Identificador de la reserva a
           reservation_id uuid No No Sí No  reservations (id)
                                                      reprogramar
                                                      Estado de la solicitud de
           status  varchar No No   No   No  —
                                                      reprogramación
                                                      Identificador de usuario que procesó
           processed_by uuid Sí No Sí   No  users (id)
                                                      la solicitud
                   timestam                           Fecha de creación de la solicitud de
           created_at     No  No   No   No  —
                   ptz                                reprogramación
                   timestam                           Última fecha de modificación de la
           updated_at     No  No   No   No  —
                   ptz                                solicitud de reprogramación
          guests
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único de un invitado
           name    varchar No No   No   No  —         Nombre del invitado
           last_name varchar No No No   No  —         Apellido del invitado
           document_n
                   varchar No No   No   Sí  —         DNI del invitado
           umber


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| representativ<br>e_document<br>_number | varchar | No | No | No | No | — | DNI del anfitrión de la reserva |
| created_by_<br>admin | boolean | No | No | No | No | — | Indica si la reserva fue creada por un<br>administrador |
| cancelled_at | timestampt<br>z | Sí | No | No | No | — | Fecha de cancelación de la reserva |
| cancelled_by | uuid | Sí | No | Sí | No | users (id) | Identificador del usuario que cancela<br>la reserva |
| active_slot | boolean | No | No | No | No | — | Indica si la ventana de horario de la<br>reserva se encuentra ocupado por la<br>reserva |
| expires_at | timestampt<br>z | Sí | No | No | No | — | Fecha de expiración de la reserva |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación de la reserva |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación de la<br>reserva |


#### Tabla 2

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único de la solicitud de<br>reprogramación |
| user_id | uuid | No | No | Sí | No | users (id) | Identificador de usuario que realiza<br>la solicitud |
| reservation_id | uuid | No | No | Sí | No | reservations (id) | Identificador de la reserva a<br>reprogramar |
| status | varchar | No | No | No | No | — | Estado de la solicitud de<br>reprogramación |
| processed_by | uuid | Sí | No | Sí | No | users (id) | Identificador de usuario que procesó<br>la solicitud |
| created_at | timestam<br>ptz | No | No | No | No | — | Fecha de creación de la solicitud de<br>reprogramación |
| updated_at | timestam<br>ptz | No | No | No | No | — | Última fecha de modificación de la<br>solicitud de reprogramación |


#### Tabla 3

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único de un invitado |
| name | varchar | No | No | No | No | — | Nombre del invitado |
| last_name | varchar | No | No | No | No | — | Apellido del invitado |
| document_n<br>umber | varchar | No | No | No | Sí | — | DNI del invitado |


---

## Página 138

           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación de un invitado
                   z
                   timestampt                         Última fecha de modificación de un
           updated_at     No  No   No   No  —
                   z                                  invitado
          vehicles
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
           id      uuid   No  Sí   No   Sí  —         Identificador único de un vehículo
           plate   varchar No No   No   Sí  —         Placa del vehículo
                   timestampt
           created_at     No  No   No   No  —         Fecha de creación de un vehículo
                   z
                   timestampt                         Última fecha de modificación de un
           updated_at     No  No   No   No  —
                   z                                  vehículo
          notification_logs
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único del registro de
           id      uuid   No  Sí   No   No  —
                                                      notificación
           reservation_i                              Identificador de la reserva a la que
                   uuid   No  No   Sí   No  reservations (id)
           d                                          pertenece la notificación
                                                      Identificador del usuario al que
           user_id uuid   No  No   Sí   No  users (id)
                                                      pertenece la reserva
           recipient_em
                   varchar No No   No   No  —         Correo del recipiente
           ail
           notification_t
                   varchar No No   No   No  —         Tipo de notificación
           ype
                   timestampt                         Fecha en la que se envió la
           sent_at        Sí  No   No   No  —
                   z                                  notificación
                   timestampt                         Fecha en la que falló el envío de la
           failed_at      Sí  No   No   No  —
                   z                                  notificación
           error_messa
                   text   Sí  No   No   No  —         Mensaje de error retornado
           ge
                   timestampt                         Fecha de creación del registro de
           created_at     No  No   No   No  —
                   z                                  notificación
          exchange_rates
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único del cambio
           id      uuid   No  Sí   No   No  —
                                                      USD/PEN registrado
           rate_date date No  No   No   Sí  —         Fecha de validez de tipo de cambio
           rate    numeric No No   No   No  —         Tipo de cambio registrado


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación de un invitado |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación de un<br>invitado |


#### Tabla 2

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | Sí | — | Identificador único de un vehículo |
| plate | varchar | No | No | No | Sí | — | Placa del vehículo |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación de un vehículo |
| updated_at | timestampt<br>z | No | No | No | No | — | Última fecha de modificación de un<br>vehículo |


#### Tabla 3

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | No | — | Identificador único del registro de<br>notificación |
| reservation_i<br>d | uuid | No | No | Sí | No | reservations (id) | Identificador de la reserva a la que<br>pertenece la notificación |
| user_id | uuid | No | No | Sí | No | users (id) | Identificador del usuario al que<br>pertenece la reserva |
| recipient_em<br>ail | varchar | No | No | No | No | — | Correo del recipiente |
| notification_t<br>ype | varchar | No | No | No | No | — | Tipo de notificación |
| sent_at | timestampt<br>z | Sí | No | No | No | — | Fecha en la que se envió la<br>notificación |
| failed_at | timestampt<br>z | Sí | No | No | No | — | Fecha en la que falló el envío de la<br>notificación |
| error_messa<br>ge | text | Sí | No | No | No | — | Mensaje de error retornado |
| created_at | timestampt<br>z | No | No | No | No | — | Fecha de creación del registro de<br>notificación |


#### Tabla 4

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | No | — | Identificador único del cambio<br>USD/PEN registrado |
| rate_date | date | No | No | No | Sí | — | Fecha de validez de tipo de cambio |
| rate | numeric | No | No | No | No | — | Tipo de cambio registrado |


---

## Página 139

           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                   timestampt                         Fecha y hora de obtención de tipo de
           fetched_at     No  No   No   No  —
                   z                                  cambio
          report_export_logs
           Campo   Tipo   Nulo PK  FK   UK  Referencia Descripción
                                                      Identificador único de exportación
           id      uuid   No  Sí   No   No  —
                                                      del reporte
           exported_by                                Correo de usuario que exportó el
                   varchar No No   No   No  —
           _email                                     reporte
           export_forma                               Formato en el que se exportó el
                   varchar No No   No   No  —
           t                                          reporte
           report_type varchar No No No No  —         Tipo de reporte exportado
           date_from date No  No   No   No  —         Inicio de ventana de datos a exportar
           date_to date   No  No   No   No  —         Final de ventana de datos a exportar
                   timestampt
           exported_at    No  No   No   No  —         Fecha de exportación del reporte
                   z
           12. VOLUMEN ESTIMADO
          El análisis se basó en el historial de reservas de Workpool del periodo octubre 2025 al abril 2026, el cual
          registra un promedio de 114 reservas mensuales, con picos de hasta 139 en meses de alta demanda
          (octubre) y valles de 82 en meses con feriados (abril). Se identificaron 79 clientes activos en dicho periodo.
           Entidad        Registros iniciales Crecimiento mensual Proyección 1 año
                                         estimado
           User_Roles     3-5            sin cambios     3-5
           Users          79 (clientes activos) ~8       ~175
           Verification_Tokens —         ~8              ~100
           Password_Reset_Token —        ~3              ~40
           s
           Office_Kinds   2-3            sin cambios     2-3
           Offices        3              sin cambios     3
           Office_Plans   6-9            sin cambios     6-9
           Office_Blocks  —              <1              ~10
           Office_Photos  9-15           sin cambios     9-15


### Tablas de la página


#### Tabla 1

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| fetched_at | timestampt<br>z | No | No | No | No | — | Fecha y hora de obtención de tipo de<br>cambio |


#### Tabla 2

| Campo | Tipo | Nulo | PK | FK | UK | Referencia | Descripción |
| --- | --- | --- | --- | --- | --- | --- | --- |
| id | uuid | No | Sí | No | No | — | Identificador único de exportación<br>del reporte |
| exported_by<br>_email | varchar | No | No | No | No | — | Correo de usuario que exportó el<br>reporte |
| export_forma<br>t | varchar | No | No | No | No | — | Formato en el que se exportó el<br>reporte |
| report_type | varchar | No | No | No | No | — | Tipo de reporte exportado |
| date_from | date | No | No | No | No | — | Inicio de ventana de datos a exportar |
| date_to | date | No | No | No | No | — | Final de ventana de datos a exportar |
| exported_at | timestampt<br>z | No | No | No | No | — | Fecha de exportación del reporte |


#### Tabla 3

| Entidad | Registros iniciales | Crecimiento mensual<br>estimado |
| --- | --- | --- |
| User_Roles | 3-5 | sin cambios |
| Users | 79 (clientes activos) | ~8 |
| Verification_Tokens | — | ~8 |
| Password_Reset_Token<br>s | — | ~3 |
| Office_Kinds | 2-3 | sin cambios |
| Offices | 3 | sin cambios |
| Office_Plans | 6-9 | sin cambios |
| Office_Blocks | — | <1 |
| Office_Photos | 9-15 | sin cambios |


---

## Página 140

           Reservations   —              ~114            ~1370
           Payments       —              ~114            ~1370
           Payment_Attempts —            ~125            ~1500
           Guests         —              ~30             ~360
           Vehicles       —              ~35             ~420
           Reservation_Reschedule —      ~3              ~40
           _Requests
           Notification_Logs —           ~230            ~2750
           Exchange_Rates —              ~30             ~365
           Report_Export_Logs —          ~5              ~60
          Del total de reservas, el 18.8% incluye registro de visitantes y el 20.7% incluye vehículos. Asimismo, por cada reserva se genera
          al menos un registro de pago y se estima el envío de aproximadamente dos notificaciones (confirmación y recordatorio),
          además de registros auxiliares como intentos de pago, solicitudes de reprogramación, tokens de autenticación y bitácoras de
          exportación, cuyo volumen es considerablemente menor respecto al de las reservas.
          - Estimado de tamaño en disco
          Dado el volumen de registros proyectado, el tamaño total de la base de datos al primer año de operación se
          estima en aproximadamente 50–100 MB, incluyendo datos, índices y metadatos del sistema. Este es un
          volumen considerado bajo, que no representa ningún riesgo para el rendimiento del sistema.
          - Carga Operacional
          Basándose en el historial de reservas, se identificó que los días de mayor demanda son lunes, martes y
          miércoles en horario de mañana, así como los días de inicio, fin y quincena de mes. En estos picos se estiman
          entre 15 y 20 reservas en un mismo día, lo que representa una carga de operaciones muy baja para el sistema.
          En condiciones normales, el sistema no superará las 5 operaciones concurrentes en ningún momento del día,
          por lo que no se requieren mecanismos de escalado avanzados para el MVP.
          - Proyección de crecimiento
           Periodo  Reservas acumuladas Usuarios acumulados Tamaño de la BD
           6 Meses  ~684              ~128               ~25 MB
           1 Año    ~1370             ~175               ~50 MB
           2 Años   ~2740             ~350               ~100 MB
          El volumen de datos proyectado para el sistema de reservas de Workpool es considerado bajo a moderado.
          PostgreSQL, el motor de base de datos seleccionado para el proyecto, es ampliamente capaz de gestionar este


### Tablas de la página


#### Tabla 1

| Reservations | — | ~114 | ~1370 |
| --- | --- | --- | --- |
| Payments | — | ~114 | ~1370 |
| Payment_Attempts | — | ~125 | ~1500 |
| Guests | — | ~30 | ~360 |
| Vehicles | — | ~35 | ~420 |
| Reservation_Reschedule<br>_Requests | — | ~3 | ~40 |
| Notification_Logs | — | ~230 | ~2750 |
| Exchange_Rates | — | ~30 | ~365 |
| Report_Export_Logs | — | ~5 | ~60 |


#### Tabla 2

| Periodo | Reservas acumuladas | Usuarios acumulados | Tamaño de la BD |
| --- | --- | --- | --- |
| 6 Meses | ~684 | ~128 | ~25 MB |
| 1 Año | ~1370 | ~175 | ~50 MB |
| 2 Años | ~2740 | ~350 | ~100 MB |


---

## Página 141

          volumen sin necesidad de configuraciones especiales, particionamiento de tablas ni mecanismos de caché
          avanzados. La arquitectura definida es suficiente para soportar el crecimiento esperado del negocio durante los
          próximos años sin requerir cambios estructurales significativos.
           13. DISEÑO ARQUITECTÓNICO
          Nota: El diagrama de Diseño de arquitectura de solución del sistema se encuentra en el Anexo A.
            1) Vista Lógica
                 a) Actores
                      ●  Cliente / Admin
                 b) Componentes principales:
                      i) Frontend (Nextjs)
                           ○  Interfaz de usuario
                           ○  Manejo de vistas (reservas, pagos, gestión de espacios, reportes)
                     ii) Backend (Monolito REST)
                           ○  Lógica de negocio:
                                ■  Gestión de reservas
                                ■  Gestión de usuarios
                                ■  Disponibilidad de espacios
                                ■  Procesamiento de pagos
                           ○  Exposición de API REST
                     iii) Base de datos (PostgreSQL)
                           ○  Persistencia de:
                                ■  Usuarios
                                ■  Reservas
                                     ●  Espacios
                                     ●  Pagos
                                ■  Notificaciones
                                ■  Reportes
                     iv) Servicios externos:
                           ○  Pasarela de pagos (procesa transacciones)
                           ○  Servidor de correo (envía confirmaciones/notificaciones)


---

## Página 142

            2) Vista física:
                 a) Frontend:
                      ●  Nextjs
                      ●  Comunicación vía HTTPS
                 b) Backend:
                      ●  Spring Boot (Java)
                      ●  Arquitectura monolítica
                      ●  API REST
                 c) Base de datos:
                      ●  PostgreSQL
                      ●  Conexión vía SQL
                 d) Protocolos:
                      ●  HTTPS → comunicación frontend-backend y pagos
                      ●  SMTP → envío de correos
                      ●  Webhooks → respuesta de la pasarela de pagos
            3) Vista de despliegue:
                 a) Nodo principal (Servidor):
                      ●  Frontend (Servidor de proporcionado por TAS)
                      ●  Backend (Spring Boot)
                      ●  Base de datos (PostgreSQL)
                 b) Nodos externos:
                      ●  Pasarela de pagos (servicio externo)
                      ●  Servidor de correo (Gmail SMTP)
            4) Flujo de despliegue:
                    Nodo principal (Servidor TAs):
                    ├── Frontend (Nextjs)
                    ├──  Backend (Spring Boot)
                    └── Base de datos (PostgreSQL)
                         Nodos externos:
                         ├── Pasarela de pagos (servicio en la nube)
                         └── Servidor de correo (Gmail SMTP)
           14. PROTOTIPO
               Enlace del prototipo
               https://workpool-frontend-ochre.vercel.app/client/dashboard
           15. ANEXO
               Anexo A
               Arquitectura de solución
               https://drive.google.com/file/d/138jiJuMS9txb3SragcIH5s_XjkLMigI8/view?usp=sharing
               Anexo B
               Diagrama entidad relación


---

## Página 143

               https://mermaid.live/edit#pako:eNrNWG1T2zgQ_isef047BEqAfMsF8zJATBPT691kRqPYSqLDljySTEm
               B_34r2caOX0hCuenNdGi8u5Z2H-0-u_KT7fOA2H2biFOKFwJHUzZllnU3ccZo7F47E-tJP1tWktDAgn-3V
               -nzAxb-EgtL8JAghiNi3WWaGQcRZhaViDA8C0mQyv-RnM2smIiISkk5k6lY0YhIhaNY_bR8QbAiAcKqrkv
               ioKR7Kfzc6OKcCqmMj-vyEDeKSYRp-BpNLo2XnEGgSTQjYl0TcD-JCFNrSu2rNaNCLZH-WVkLS_mDi
               wAtsVyWfE8kEcgACg9nFTiNW-iBCDqnOaS5TgGoEmHfJ7HKdflmIOUJeAc4qiTDnDJlzWE5A6cigG_D
               YYTcvwcDeJeGDVoN3usaLfqQLyhrVAckJG0nvXMWfHPGl2eXw4F36Y6Q5145o9acKHAuQWyEit8TVkt
               iMA3qXpDHmAoit_A-8_B2MJn86Y5P0diZON7_00f3DDB00NXl6HRjSd1TFmxX9f_ZoafubvS0qG9FHh
               W4IH1BYwX8U5SCj2PsU7UqrcTnc-oTZOIsnYJZw-csoKpgsN8UOrq9HmxIopYogKiARnwrFloLjIyWPBE
               FHnGIGQoSgXWQRvebI_3j2h1ebRVqtWJmGYvNVsUZljadEU1QBUOvFRCAVtLokwf3ZZ44JSywr-gD-
               cCDvXA9d9dwjYPQpRTXXuOakz5_yJvTFnT1140z8jYWF2xJBMOh9uOuklw4Mm0nkUGjPCZsXU4eYU
               m2IEg09MuVabARUUteaW_ltmYgIEJwAaZS4kXTmXAG80D0UQmq-Xz8zXSed_B5S9JmYlOGVV2OR
               UneCMW7ktwUPxGQ4yg9plqjkSjGAvhksZlJcp3iCjIktahlQ1m5S0oIEkNzAyCwLr2GKa5i0DLrVawaR7k8
               -jw3ZiuEg4iyhuzBzCdheSIyR1aISyyUr5pyB5IhV7_Sw7dI1fM7Z-Lt0C83jMmNWP3iGHdxOdziygF1ocjH
               1q6ey4YXzundtQM_v76JVHs561QSD2nX3FCfaS0L7gNPtbennUPKiBsNPM-5ud0Qww7u1ghfCcykzl3z
               7roR3GwMONuTcnYJqUYzcr1irr92z98VTuNxFfXv05jqLDbXq0opcAV3LT9dUa3iBsc1dTSeTvVmtE1nau
               rEzvfhxWB0Dlk58Norw9w2NUkaLq-1YtFYL3Oi_GW9Jm7dsYec7-a_tzAvUiLmIuPFBhBTNZpzEeVglMh
               XqwpkjfP6D5oLHlVlijcSZLp5w1eBF_7p0_Nz-VNGH-agQv_8DPqnxstj3-I_WN208RZX2OY3kmzjtftUvvX
               a6L7Z8HXrtUFY26Bssq05WbE0Zm-smM2aLRHXKrCvS4ZAx5K16af9lbSQ2l-pslbfKn-V2ETTpXMux7Hj
               azkX7_LuWiz5znbHXgga2H0lEtKxoQKhKODRNnU0tdWSQCu1-_AzIHOchGpqd1JViFc8UamOhPdTe8
               peYLkYs785j_IVBU8WS7s_x6GEp7QNZB_vXk1grCNiqCc4u39w2DNr2P0n-9Hud_e7n3u97peDvYPD4
               -Pj3tF-x16B1d7nk72Tk6Pu_sFR93i_1z166dg_zbag6R58OeweH3Z7-92jvcNuxyZwA-biJv14aL4hvvwL1J
               vgZQ
               Anexo C
               Diagramas casos de uso y secuencias
               https://drive.google.com/drive/folders/131tbFEo2tJ95VNVaCDPQEk6EMvYjiXDI?usp=drive_link
               Anexo D
               Prototipo Front-End
               https://github.com/rouuhehe/workpool-frontend.git
