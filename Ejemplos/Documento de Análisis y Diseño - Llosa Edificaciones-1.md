# Documento de Análisis y Diseño - Llosa Edificaciones-1

> Conversión automática a Markdown desde el PDF original. Las tablas se representan con sintaxis Markdown para conservar filas y columnas de forma interpretable por modelos de IA.

**Páginas:** 95


---

## Página 1


---

## Página 2

                                HISTORIAL DE VERSIONES
                       FECHA          VERSIÓN        DESCRIPCIÓN
                      22/04/2026        1.0         Versión Inicial del documento
                  VER        AUTORES           REVISADO POR     APROBAD
                  SIÓ                                           O POR
                  N
                         Juan Carlos Ticlia Maqui
                 1.0     Leonardo Gabriel Sanchez
                              Terrazos
            Autores:
            Project Manager: Leonardo Fabian Chocce Rios
            Analista Funcional: Juan Carlos Ticlia Maqui
            Analista Funcional: Leonardo Gabriel Sanchez Terrazos
            Desarrollador backend: Jose Daniel Huaman Rosales
            Desarrollador backend: André Contreras Valera
            Desarrollador frontend: Jhogan Haldo Pachacutec Aguilar
            Desarrollador frontend: Henry Rutber Quispe Sutta
            Analista de calidad: Yeimi Adelmar Varela Villarreal
            Analista de calidad: Jireh Eliseo Cervantes Ordóñez
            Revisores:
            TCH: Teofilo Chambilla Aquino
            Aprobadores
            YY: Sofía Angeles Matto


### Tablas de la página


#### Tabla 1

| FECHA | VERSIÓN | DESCRIPCIÓN |
| --- | --- | --- |
| 22/04/2026 | 1.0 | Versión Inicial del documento |


#### Tabla 2

| VER<br>SIÓ<br>N | AUTORES | REVISADO POR | APROBAD<br>O POR |
| --- | --- | --- | --- |
| 1.0 | Juan Carlos Ticlia Maqui<br>Leonardo Gabriel Sanchez<br>Terrazos |  |  |


---

## Página 3

                                     Contenido
            1. ANTECEDENTES                                           5
            2. OBJETIVO GENERAL                                       5
            3. ALCANCE DEL PROYECTO                                   5
            4. DISEÑO FUNCIONAL DETALLADO                             6
            5. DIAGRAMA DEL PROCESO                                   7
              5.1. INTEGRACIÓN ENTRE LOS SISTEMAS DE LA EMPRESA       7
              5.2. INTEROPERACIÓN CON SISTEMAS EXTERNOS VINCULADOS CON LA EMPRESA 7
            6. REGLAS DE NEGOCIO                                      7
            7. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL                  10
              7.1. ACTORES                                           10
              7.2. DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN          11
              7.3. DIAGRAMA DE SECUENCIA                             62
              7.4. REQUERIMIENTOS FUNCIONALES                        71
              7.5. REQUERIMIENTOS NO FUNCIONALES                     74
            8. MODELO DE DATOS                                       75
            9. DICCIONARIO DE DATOS                                  76
            9. VOLUMEN ESTIMADO                                      89
            10. DISEÑO ARQUITECTÓNICO                                93
            11. PROTOTIPO                                            94


---

## Página 4

                                 GLOSARIO DE TÉRMINOS
              ●  Backoffice: Panel administrativo privado donde el personal de la empresa gestiona usuarios,
                 contenidos y avances de obra.
              ●  Etapas: Grandes fases cronológicas del proyecto inmobiliario (ej. Construcción, Entrega,
                 Saneamiento).
              ●  Hitos: Eventos específicos y medibles dentro de una etapa que marcan el progreso real (ej.
                 Inicio de excavación).
              ●  Unidad: Inmueble específico adquirido por el cliente (departamento, cochera o depósito).
              ●  RBAC: Sistema que otorga permisos en la plataforma según el rol del empleado (Ventas,
                 Marketing, etc.).
              ●  Firebase Auth: Servicio encargado de gestionar de forma segura los accesos y contraseñas de
                 los usuarios.
              ●  Minuta: Borrador del contrato de compraventa redactado por un abogado; paso previo a la
                 escritura pública.
              ●  Escritura pública: Documento final firmado ante notario que otorga validez legal definitiva al
                 contrato.
              ●  Adenda: Documento que modifica o añade cláusulas (fechas, montos) a un contrato ya firmado.
              ●  Crédito directo: Financiamiento otorgado directamente por la constructora en cuotas, sin
                 intervención bancaria.
              ●  Crédito hipotecario: Préstamo bancario donde la entidad financiera paga a la constructora y el
                 cliente le debe al banco.
              ●  Desembolso: Momento en que el banco transfiere el dinero del préstamo aprobado a la
                 constructora.
              ●  Carta de aprobación: Documento bancario que certifica las condiciones y montos del crédito;
                 tiene vigencia limitada.
              ●  Notaría: Oficina del notario público encargado de dar fe legal a los contratos y actos jurídicos.
              ●  Casco: Estructura básica del edificio (columnas, vigas, muros) sin acabados.
              ●  As Built: Planos finales que muestran cómo se construyó realmente la obra, incluyendo
                 modificaciones.
              ●  Kardex: Código interno para identificar el expediente administrativo del cliente en el sistema.
              ●  Independización: Acto de inscribir cada unidad (departamento o cochera) como una propiedad
                 individual en SUNARP.
              ●  Saneamiento: Proceso legal de formalización que incluye declaratoria de fábrica, reglamento
                 interno e independización.
              ●  SUNARP: Entidad estatal donde se inscriben y registran oficialmente las propiedades.
              ●  Partida registral: Documento emitido por SUNARP que funciona como el título de propiedad
                 definitivo.
              ●  Mora: Retraso en el pago de cuotas que genera intereses adicionales.
              ●  Cuota inicial: Pago inicial (generalmente entre el 10% y 20%) realizado al firmar el contrato.
              ●  Boleta: Comprobante de pago que emite la empresa por cada cuota cancelada.
              ●  Calidad Cloud: Plataforma digital para reportar observaciones o defectos en la etapa de
                 post-venta.
              ●  EDGE / LEED: Certificaciones de construcción sostenible que garantizan eficiencia energética
                 en el proyecto.


---

## Página 5

            1. ANTECEDENTES
              En el sector inmobiliario peruano, el periodo comprendido entre la compra y la entrega definitiva de
              un inmueble suele extenderse de 18 a 24 meses, lo que genera una etapa de alta incertidumbre para
              el comprador. Actualmente, Llosa Edificaciones gestiona la comunicación post-firma de manera
              fragmentada: el avance de obra se informa mediante correos masivos, los documentos legales se
              distribuyen por canales aislados y el seguimiento del saneamiento carece de una herramienta de
              consulta en tiempo real.
              Esta dispersión informativa no sólo satura operativamente a los equipos de Administración de Ventas
              y Postventa con consultas repetitivas, sino que también debilita la percepción de transparencia y
              modernidad de la empresa. La falta de un canal oficial único deja al cliente sin una ruta clara de
              contacto, incrementando su inseguridad frente a la inversión realizada.
            2. OBJETIVO GENERAL
              Desarrollar e implementar una plataforma digital centralizada que estructure la gestión integral del
              cliente, permitiendo a los clientes de Llosa Edificaciones realizar un seguimiento interactivo del
              avance de obra, estados financieros y trámites de saneamiento, con el fin de optimizar la eficiencia
              operativa interna y fortalecer la experiencia del usuario final.
            3. ALCANCE DEL PROYECTO
            El proyecto consiste en la implementación de un ecosistema digital unificado para la gestión integral del
            cliente desde la separación del inmueble hasta el saneamiento final. La solución optimiza la transparencia
            hacia el comprador y automatiza la operatividad interna mediante dos frentes:
            3.1 Portal del Cliente
            Orientado a centralizar la información del propietario bajo un modelo consultivo sobre el tracker de
            procesos y estados de su propiedad. Sus funciones generales son:
              -  Seguimiento de Obra: Visualización de avances porcentuales y galerías multimedia de hitos
                 constructivos.
              -  Gestión Documental: Consulta y descarga de documentos legales, minutas y partidas de
                 saneamiento.
              -  Estado Financiero: Monitoreo de cronogramas de pago, cuotas vigentes y comprobantes
                 validados.
              -  Agenda Interactiva: Confirmación y reprogramación de citas (entregas, firmas) con lógica de
                 disponibilidad horaria.
            3.2 Portal de la Empresa
            Herramienta administrativa para la orquestación de datos y activos digitales:
              -  Seguridad y Roles: accesos mediante Firebase Auth y panel dinámico para la gestión de
                 permisos.
              -  Estructura Inmobiliaria: configuración jerárquica de proyectos y gestión masiva de hitos por
                 unidad.
              -  Gestión de Activos: carga de contenidos multimedia y expedientes legales
              -  Control de Cartera: administración de cronogramas, conciliación de pagos y registro de gestión
                 de cobranza.
              -  Comunicaciones: calendario local con eventos que la empresa agende.


---

## Página 6

            4. DISEÑO FUNCIONAL DETALLADO
            La solución se estructura en cinco módulos funcionales:
            Módulo de Seguridad y Control de Accesos
              -  Gestión de Identidad: Autenticación mediante Firebase UID para vincular la identidad digital con
                 el perfil interno.
              -  Panel de Roles Dinámico (RBAC): Cada usuario empresarial se asigna a un rol base con
                 funciones predefinidas; el Administrador puede habilitar o restringir módulos adicionales de
                 forma granular por usuario.
              -  Administración de Perfiles: Centralización de datos de contacto para asegurar la comunicación.
            Módulo de Gestión de Activos (Proyectos)
              -  Jerarquía Inmobiliaria: Control integral (CRUD) de la estructura de activos: Proyecto > Torres >
                 Unidades (Departamentos, Cocheras, Depósitos).
              -  Vinculación Multipropiedad: Lógica que asocia a un cliente con una o más unidades, permitiendo
                 que el usuario gestione todo su patrimonio inmobiliario con Llosa Edificaciones.
              -  Motor de Hitos: Uso de plantilla para el despliegue masivo de etapas de obra, permitiendo
                 actualizaciones de estado a nivel de unidad o por grupo (pisos/torres).
            Tracker de Avance de Obra y Multimedia
              -  Motor de Hitos Constructivos: Despliegue masivo de etapas de obra (Demolición, Excavación,
                 Casco, Acabados) con capacidad de actualización por unidad, piso o torre completa.
              -  Gestión de Contenido: Repositorio de fotos, videos (MP4) y reportes mensuales de avance de
                 proyecto.
              -  Dashboard de Progreso: Visualización para el cliente del porcentaje de avance real frente al
                 proyectado, complementado con una galería multimedia para el acompañamiento visual de la
                 construcción.
            Tracker de Documentos Legales (Bóveda Digital)
              -  Expediente Digital: Almacenamiento y gestión de documentos legales (Minutas, Contratos de
                 Separación, Actas).
              -  Trazabilidad Legal: historial que permite al cliente visualizar en qué etapa legal se encuentra su
                 unidad.
              -  Consumo Seguro: Visualización y descarga de documentos protegida mediante validación previa
                 en el backend para garantizar que solo el propietario tenga acceso.
            Módulo de Gestión Financiera
              -  Cronograma y Recaudación: Generación y seguimiento de cuotas personalizadas. Incluye el
                 registro de pagos, cálculo automático de días de mora y notas de gestión de cobranza.
              -  Registro de comprobantes: Sistema de carga de vouchers.
              -  Agenda Interactiva: Integración con calendario local para la programación de hitos financieros y
                 comerciales (citas de firma, fechas límite).
              -  Panel de Disponibilidad: Lógica tipo When2meet para que, ante una reprogramación, el cliente
                 marque sus horarios libres y el sistema coordine automáticamente la nueva cita.
            5. DIAGRAMA DEL PROCESO
            https://miro.com/welcomeonboard/aEQ0TWRsRklyQVdBbEcwR1BBOSt0ZXNaN3RBa


---

## Página 7

            XF3dlNPbnRla3V6K2RUcFFnOUVjLzRxK0RpT1lUMVRob2RxRlJNNEREaEJob1diZH
            FqcVVYNVFHY2FNSkJmeE50SUI5R1lYNFlWTHB4V3ZCWEdNWlF0cUZ6cDhydVhH
            K0lUYkhyVmtkMG5hNDA3dVlncnBvRVB2ZXBnPT0hdjE=?share_link_id=8676140182
              5.1. INTEGRACIÓN ENTRE LOS SISTEMAS DE LA EMPRESA
                 Dado que la nueva plataforma ha sido concebida bajo un esquema de almacenamiento y
                 persistencia de datos independiente, el diseño actual no contempla la integración ni
                 sincronización con sistemas internos o legados de la empresa (como CRMs o Data Lakes
                 corporativos). La solución operará de manera autónoma gestionando sus propios activos
                 digitales y bases de datos.
              5.2. INTEROPERACIÓN CON SISTEMAS EXTERNOS VINCULADOS CON LA EMPRESA
                 El diseño contempla la integración mediante APIs con los siguientes servicios externos para
                 automatizar la comunicación y agendamiento:
                   -  API de Google Calendar: integración bidireccional para automatizar la creación, envío y
                      seguimiento de invitaciones (eventos, firmas, entregas), así como para gestionar la
                      lógica de reprogramación cruzando la disponibilidad de la empresa y los clientes.
                   -  Firebase Authentication: Integración para la gestión centralizada de identidades y
                      control de accesos. Delega el inicio de sesión corporativo (@llosaedificaciones.com) y
                      el flujo híbrido del cliente (Google Auth o correo/contraseña), la validación de
                      credenciales, la generación de tokens de seguridad y los flujos de recuperación de
                      contraseñas.
                   -  Google Cloud Storage (GCS): Integración para el almacenamiento seguro y escalable
                      de la bóveda digital. Gestiona la carga, alojamiento y recuperación de documentos
                      legales (PDFs), comprobantes de pago y contenido multimedia (fotos y videos del
                      avance de obra). Utiliza la generación de URLs firmadas temporales para garantizar la
                      privacidad y el acceso estrictamente restringido a los archivos.
            6. REGLAS DE NEGOCIO
                 Las Reglas de Negocio (RN) se detallan a continuación:
                    NO   NOMBRE DE LA REGLA      DETALLE DE LA REGLA
                                         El acceso al Portal de Clientes es estrictamente por
                         Acceso y Autenticación de invitación ("no auto-registro"). La creación de la cuenta
                 RN-001
                         Clientes        está condicionada a la validación de la separación del
                                         inmueble por parte de Asesor Comercial.
                                         El acceso al portal interno está restringido
                                         exclusivamente a personal activo con dominio
                                         institucional (@llosaedificaciones.com). Las capacidades
                                         se rigen por RBAC: cada usuario parte de un rol base
                         Acceso y Autenticación
                 RN-002                  (Asesor Comercial, Área Legal, Área Técnica, Postventa,
                         Corporativa
                                         Admin) con módulos y acciones predefinidos. El
                                         Administrador puede otorgar o revocar permisos
                                         adicionales por usuario (habilitar o bloquear módulos
                                         concretos) sin cambiar su rol base.
                                         El progreso constructivo y legal se basa en hitos
                         Control de Avance y estrictamente secuenciales. Regla de precedencia:
                 RN-003
                         Compras Tardías Ningún hito puede ser iniciado o marcado como
                                         "Completado" si el hito inmediatamente anterior no ha


### Tablas de la página


#### Tabla 1

| NO | NOMBRE DE LA REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
| RN-001 | Acceso y Autenticación de<br>Clientes | El acceso al Portal de Clientes es estrictamente por<br>invitación ("no auto-registro"). La creación de la cuenta<br>está condicionada a la validación de la separación del<br>inmueble por parte de Asesor Comercial. |
| RN-002 | Acceso y Autenticación<br>Corporativa | El acceso al portal interno está restringido<br>exclusivamente a personal activo con dominio<br>institucional (@llosaedificaciones.com). Las capacidades<br>se rigen por RBAC: cada usuario parte de un rol base<br>(Asesor Comercial, Área Legal, Área Técnica, Postventa,<br>Admin) con módulos y acciones predefinidos. El<br>Administrador puede otorgar o revocar permisos<br>adicionales por usuario (habilitar o bloquear módulos<br>concretos) sin cambiar su rol base. |
| RN-003 | Control de Avance y<br>Compras Tardías | El progreso constructivo y legal se basa en hitos<br>estrictamente secuenciales. Regla de precedencia:<br>Ningún hito puede ser iniciado o marcado como<br>"Completado" si el hito inmediatamente anterior no ha |


---

## Página 8

                    NO   NOMBRE DE LA REGLA      DETALLE DE LA REGLA
                                         alcanzado el estado de "Completado". Excepción por
                                         compra tardía: Si un cliente adquiere la unidad en una
                                         etapa constructiva avanzada, el sistema autocompletará
                                         automáticamente los hitos previos al momento de
                                         vincular la propiedad.
                                         Solo el personal autorizado (Área técnica) tiene la
                                         facultad de publicar y actualizar los reportes multimedia
                         Publicación y Consumo de avance de obra. El cliente posee un perfil
                 RN-004
                         de Avances de Obra estrictamente de "Solo Lectura" sobre estos reportes,
                                         garantizando la inmutabilidad de la información histórica
                                         de la construcción
                                         El Portal de Clientes es de carácter informativo y
                                         consultivo; no actúa como pasarela de pagos. Las fechas
                                         de vencimiento, número de cuotas y montos del
                         Inmutabilidad Financiera cronograma son inmutables para el cliente y su
                 RN-005
                         del Cliente     modificación es competencia exclusiva del Asesor
                                         Comercial (o usuarios con permiso). El cliente no está
                                         autorizado a autogestionar ni cargar comprobantes de
                                         pago directamente en el portal.
                                         El estado de una obligación financiera en el cronograma
                                         solo transicionará de "Pendiente" o "Mora" a "Pagado"
                                         tras una conciliación explícita. El sistema no asumirá
                         Conciliación Estricta de
                 RN-006                  pagos automáticos; un usuario empresarial con permiso
                         Pagos
                                         de conciliación debe validar el comprobante físico/digital
                                         y confirmar la transacción en el sistema, vinculando la
                                         evidencia al hito correspondiente.
                                         Todo documento legal (contratos, minutas) debe estar
                                         obligatoriamente vinculado a su hito correspondiente
                                         dentro del ciclo de vida de la unidad. El sistema debe
                         Vinculación Obligatoria garantizar que el acceso y descarga de estos
                 RN-007
                         del Expediente Digital expedientes sea de carácter temporal y restringido
                                         exclusivamente al titular de la unidad, prohibiendo por
                                         política de seguridad el acceso público o enlaces
                                         permanentes.
                                         Un cliente tendrá acceso única y exclusivamente a la
                                         información, cronogramas y expedientes legales de las
                         Gestión de Privacidad y unidades inmobiliarias explícitamente vinculadas a su
                 RN-008  Segregación     contrato. Un tercero no puede acceder a documentos o
                         Multi-propiedad estados financieros de unidades de clientes bajo
                                         cualquier circunstancia. Excepción: acceso de personal
                                         operativo de Llosa edificaciones.
                                         Toda documentación y estado de hito permanecerá
                                         accesible para el cliente durante la etapa de
                                         saneamiento. Sin embargo, una vez suscrita el Acta de
                         Disponibilidad de
                 RN-009                  Entrega Final, el cronograma de pagos transicionará a un
                         Documentos Históricos
                                         estado de "Histórico" (Inmutable), bloqueando cualquier
                                         edición futura para prevenir discrepancias con los cierres
                                         contables y auditorías de la empresa.
                                         La trazabilidad del ciclo de vida (hitos constructivos )
                         Independencia de opera a nivel de piso y no a nivel de proyecto global. Esto
                 RN-010  Estados Constructivos por permite y regula que múltiples unidades de un mismo
                         piso            proyecto puedan coexistir en etapas de construcción
                                         distintas.


### Tablas de la página


#### Tabla 1

| NO | NOMBRE DE LA REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
|  |  | alcanzado el estado de "Completado". Excepción por<br>compra tardía: Si un cliente adquiere la unidad en una<br>etapa constructiva avanzada, el sistema autocompletará<br>automáticamente los hitos previos al momento de<br>vincular la propiedad. |
| RN-004 | Publicación y Consumo<br>de Avances de Obra | Solo el personal autorizado (Área técnica) tiene la<br>facultad de publicar y actualizar los reportes multimedia<br>de avance de obra. El cliente posee un perfil<br>estrictamente de "Solo Lectura" sobre estos reportes,<br>garantizando la inmutabilidad de la información histórica<br>de la construcción |
| RN-005 | Inmutabilidad Financiera<br>del Cliente | El Portal de Clientes es de carácter informativo y<br>consultivo; no actúa como pasarela de pagos. Las fechas<br>de vencimiento, número de cuotas y montos del<br>cronograma son inmutables para el cliente y su<br>modificación es competencia exclusiva del Asesor<br>Comercial (o usuarios con permiso). El cliente no está<br>autorizado a autogestionar ni cargar comprobantes de<br>pago directamente en el portal. |
| RN-006 | Conciliación Estricta de<br>Pagos | El estado de una obligación financiera en el cronograma<br>solo transicionará de "Pendiente" o "Mora" a "Pagado"<br>tras una conciliación explícita. El sistema no asumirá<br>pagos automáticos; un usuario empresarial con permiso<br>de conciliación debe validar el comprobante físico/digital<br>y confirmar la transacción en el sistema, vinculando la<br>evidencia al hito correspondiente. |
| RN-007 | Vinculación Obligatoria<br>del Expediente Digital | Todo documento legal (contratos, minutas) debe estar<br>obligatoriamente vinculado a su hito correspondiente<br>dentro del ciclo de vida de la unidad. El sistema debe<br>garantizar que el acceso y descarga de estos<br>expedientes sea de carácter temporal y restringido<br>exclusivamente al titular de la unidad, prohibiendo por<br>política de seguridad el acceso público o enlaces<br>permanentes. |
| RN-008 | Gestión de Privacidad y<br>Segregación<br>Multi-propiedad | Un cliente tendrá acceso única y exclusivamente a la<br>información, cronogramas y expedientes legales de las<br>unidades inmobiliarias explícitamente vinculadas a su<br>contrato. Un tercero no puede acceder a documentos o<br>estados financieros de unidades de clientes bajo<br>cualquier circunstancia. Excepción: acceso de personal<br>operativo de Llosa edificaciones. |
| RN-009 | Disponibilidad de<br>Documentos Históricos | Toda documentación y estado de hito permanecerá<br>accesible para el cliente durante la etapa de<br>saneamiento. Sin embargo, una vez suscrita el Acta de<br>Entrega Final, el cronograma de pagos transicionará a un<br>estado de "Histórico" (Inmutable), bloqueando cualquier<br>edición futura para prevenir discrepancias con los cierres<br>contables y auditorías de la empresa. |
| RN-010 | Independencia de<br>Estados Constructivos por<br>piso | La trazabilidad del ciclo de vida (hitos constructivos )<br>opera a nivel de piso y no a nivel de proyecto global. Esto<br>permite y regula que múltiples unidades de un mismo<br>proyecto puedan coexistir en etapas de construcción<br>distintas. |


---

## Página 9

                    NO   NOMBRE DE LA REGLA      DETALLE DE LA REGLA
                                         Ante la desvinculación o resolución de contrato de una
                                         unidad, ésta traicionará a estado "Disponible" en el
                                         inventario, renovándose el acceso del cliente a la
                         Revocación por
                                         información de esa unidad. El perfil del cliente pasará a
                 RN-011  Resolución de Contrato
                                         estado "Inactivo" (sin acceso al portal) si ya no tiene
                         (Desistimiento)
                                         ninguna unidad vinculada. Por políticas de retención
                                         legal, el expediente histórico se preservará internamente,
                                         sin acceso desde el portal del cliente.
                                         El agendamiento de eventos (inspecciones, entrega de
                                         llaves) es gestionado como anfitrión por la inmobiliaria.
                                         La reprogramación por parte del cliente solo es factible si
                         Reprogramación
                 RN-012                  se habilita la opción, tras lo cual el cliente deberá
                         Controlada de Citas
                                         proponer su disponibilidad dentro de los bloques horarios
                                         permitidos por la empresa, delegando la confirmación
                                         final a la inmobiliaria.
                                         El sistema evaluará diariamente el cumplimiento del
                                         cronograma financiero. Si una obligación de pago supera
                                         su fecha de vencimiento sin contar con una conciliación
                         Transición Automática a explícita (estado 'Pagado'), la cuota transicionará
                 RN-013
                         Estado de Mora  automáticamente al estado 'Mora'. Esto iniciará el conteo
                                         de días de retraso visible para ambas partes y habilitará
                                         al Asesor Comercial para registrar las gestiones de
                                         cobranza correspondientes.
                                         Mientras la unidad inmobiliaria vinculada al cliente se
                                         encuentre en estado comercial "Separado" (previo a la
                                         firma de minuta legal y aprobación financiera), el Portal
                                         del Cliente operará en "Modo de Espera". En este
                         Restricción de Vistas por
                 RN-014                  estado, el sistema mostrará la información mínima
                         Estado de Contratación
                                         requerida (resumen de separación y estado del proceso).
                                         El acceso integral se habilitará automáticamente cuando
                                         el Asesor Comercial cambie el estado de la unidad a
                                         "Vendido" tras la formalización del contrato.
                                         En los casos de adquisición de una unidad inmobiliaria
                                         de manera colaborativa (régimen de copropiedad,
                                         sociedad conyugal o bienes mancomunados), el sistema
                                         permitirá la vinculación de múltiples perfiles de cliente a
                         Gestión de Acceso para un mismo contrato y unidad. Cada copropietario
                 RN-015  Copropiedad y Bienes dispondrá de una cuenta individual con credenciales de
                         Mancomunados    acceso independientes al Portal de Clientes. Todos los
                                         perfiles vinculados compartirán de manera sincronizada
                                         la misma visibilidad sobre el expediente digital,
                                         cronograma de pagos y avances de obra de la unidad
                                         compartida.
            7. ANÁLISIS DE REQUERIMIENTOS FUNCIONAL
              7.1. ACTORES
            La operación de las plataformas web de Llosa Edificaciones involucra la participación de diversos actores,
            clasificados en Actores Humanos (usuarios de los portales) y Actores de Sistema (componentes y
            servicios integrados), quienes interactúan para dar soporte al ciclo de vida del cliente, la gestión de obra y
            el flujo financiero.


### Tablas de la página


#### Tabla 1

| NO | NOMBRE DE LA REGLA | DETALLE DE LA REGLA |
| --- | --- | --- |
| RN-011 | Revocación por<br>Resolución de Contrato<br>(Desistimiento) | Ante la desvinculación o resolución de contrato de una<br>unidad, ésta traicionará a estado "Disponible" en el<br>inventario, renovándose el acceso del cliente a la<br>información de esa unidad. El perfil del cliente pasará a<br>estado "Inactivo" (sin acceso al portal) si ya no tiene<br>ninguna unidad vinculada. Por políticas de retención<br>legal, el expediente histórico se preservará internamente,<br>sin acceso desde el portal del cliente. |
| RN-012 | Reprogramación<br>Controlada de Citas | El agendamiento de eventos (inspecciones, entrega de<br>llaves) es gestionado como anfitrión por la inmobiliaria.<br>La reprogramación por parte del cliente solo es factible si<br>se habilita la opción, tras lo cual el cliente deberá<br>proponer su disponibilidad dentro de los bloques horarios<br>permitidos por la empresa, delegando la confirmación<br>final a la inmobiliaria. |
| RN-013 | Transición Automática a<br>Estado de Mora | El sistema evaluará diariamente el cumplimiento del<br>cronograma financiero. Si una obligación de pago supera<br>su fecha de vencimiento sin contar con una conciliación<br>explícita (estado 'Pagado'), la cuota transicionará<br>automáticamente al estado 'Mora'. Esto iniciará el conteo<br>de días de retraso visible para ambas partes y habilitará<br>al Asesor Comercial para registrar las gestiones de<br>cobranza correspondientes. |
| RN-014 | Restricción de Vistas por<br>Estado de Contratación | Mientras la unidad inmobiliaria vinculada al cliente se<br>encuentre en estado comercial "Separado" (previo a la<br>firma de minuta legal y aprobación financiera), el Portal<br>del Cliente operará en "Modo de Espera". En este<br>estado, el sistema mostrará la información mínima<br>requerida (resumen de separación y estado del proceso).<br>El acceso integral se habilitará automáticamente cuando<br>el Asesor Comercial cambie el estado de la unidad a<br>"Vendido" tras la formalización del contrato. |
| RN-015 | Gestión de Acceso para<br>Copropiedad y Bienes<br>Mancomunados | En los casos de adquisición de una unidad inmobiliaria<br>de manera colaborativa (régimen de copropiedad,<br>sociedad conyugal o bienes mancomunados), el sistema<br>permitirá la vinculación de múltiples perfiles de cliente a<br>un mismo contrato y unidad. Cada copropietario<br>dispondrá de una cuenta individual con credenciales de<br>acceso independientes al Portal de Clientes. Todos los<br>perfiles vinculados compartirán de manera sincronizada<br>la misma visibilidad sobre el expediente digital,<br>cronograma de pagos y avances de obra de la unidad<br>compartida. |


---

## Página 10

            ACTORES HUMANOS
            Cliente (Rol Externo)
            Es el consumidor principal y usuario del Portal del Cliente. Su interacción es consultiva sobre el tracker de
            procesos y estados de su propiedad (obra, trámites legales, finanzas): visualización y seguimiento sin
            modificar esos módulos. La excepción es el módulo de Agenda, donde puede confirmar citas o proponer
            disponibilidad. Ingresa mediante flujo híbrido (Google Auth o correo/contraseña). Como precondición,
            debe contar con al menos una unidad en estado Separado o Vendido.
            Equipo Operativo (Usuarios Internos)
            Actúan sobre el Portal de la Empresa. Son los responsables de la orquestación comercial, técnica, legal y
            de soporte que alimenta el ecosistema digital. Sus accesos y funciones están regulados por un sistema
            de permisos granulares, dividiéndose en los siguientes perfiles:
              -  Asesor (Comercial): Responsable de la interacción con el cliente en las etapas iniciales
                 (Separación y Financiamiento). Gestiona el alta de usuarios, vinculando el correo del cliente con
                 la unidad inmobiliaria adquirida. Es el encargado de controlar los cambios de estado del
                 inmueble (ej. de "Disponible" a "Separado" o "Vendido", lo cual gatilla el Modo de Espera en el
                 portal del cliente) y de alimentar los datos financieros iniciales para el Resumen de Pagos y el
                 Cronograma Detallado.
              -  Área Legal: Responsable de la gestión de los contratos y de todo el proceso de saneamiento
                 registral (Notaría, SUNARP). Bajo el perfil de Editor Documental, son los únicos autorizados para
                 actualizar los estados de los trámites legales y de saneamiento (ej. transiciones de "Revisión de
                 Minuta" a "En Notaría" o "Firmado"). Esta gestión alimenta directamente el Tracker de Trámites
                 que visualiza el cliente.
              -  Área Técnica: Encargada del seguimiento constructivo y de transparentar el estado del edificio.
                 Como Editor de Obra, su función es registrar y marcar como "Completados" los diversos hitos de
                 construcción (Demolición, Excavación, Casco habitable, etc.). Asimismo, son responsables de la
                 carga multimedia periódica (fotos, videos y reportes mensuales) que nutre la funcionalidad de
                 Avance de Obra en el portal del comprador.
              -  Postventa: Responsable de la transición durante la entrega de la unidad terminada y el soporte
                 continuo al propietario. Actúan como destinatarios principales del canal de soporte (recepción de
                 consultas vía WhatsApp o correo electrónico). Asimismo, suele liderar eventos de entrega de
                 llaves y confirmación de fechas.
              -  Administrador del Sistema (Admin): Posee un rol transversal enfocado en el mantenimiento y
                 seguridad de la plataforma. Administra el RBAC: asigna roles base a cada empleado y puede
                 habilitar o restringir módulos adicionales por usuario. Garantiza la segregación de funciones (por
                 ejemplo, que el Área Técnica no altere información del Área Legal salvo permiso explícito).
            ACTORES DE SISTEMA
              -  Firebase Authentication
            Gestor de identidad digital (IAM). Centraliza la autenticación y el control de accesos, asegurando que los
            clientes ingresen de forma segura (mediante Google Auth o correo/contraseña) y los empleados a través
            de cuentas corporativas. Como precondición, valida los identificadores únicos (UID) contra la base de
            datos para habilitar los permisos correspondientes.


---

## Página 11

              -  Almacenamiento de archivos
            Repositorio seguro de archivos (Bóveda Digital). Encargado de almacenar, proteger y gestionar la entrega
            de documentos legales (PDFs), comprobantes de pago y contenido multimedia (fotos y videos de avance
            de obra). Garantiza la privacidad y el acceso restringido a los recursos mediante la generación dinámica
            de URLs firmadas (Signed URLs) temporales. Se usa el api de Google Cloud Storage (GCS)
              7.2. DIAGRAMA CASO DE USO Y SU ESPECIFICACIÓN
                 7.2.1. Listado de casos de uso
                   ●  Casos de uso de la Empresa
                       CÓDIGO          NOMBRE              CU PADRE
                       CU001  Autenticar usuario corporativo
                       CU002  Gestionar empleados, roles y permisos
                       CU003  Gestionar proyectos e inventario
                       CU004  Gestionar clientes, vincular y
                              desvincular unidades
                       CU005  Actualizar Avance de Obra
                       CU006  Gestionar expedientes legales y
                              documentos
                       CU007  Gestionar cronogramas de pago y
                              financiamiento
                       CU008  Agendar eventos y citas
                   ●  Casos de uso Clientes
                       CÓDIGO          NOMBRE              CU PADRE
                       CU009  Autenticar usuario cliente
                       CU010  Consultar Inicio / Panel Principal
                       CU011  Consultar Proceso de Separación
                       CU012  Consultar Contrato
                       CU013  Consultar Pagos y Financiamiento
                       CU014  Consultar Avance del Proyecto
                       CU015  Consultar Entrega
                       CU016  Consultar Saneamiento
                       CU017  Gestionar Agenda y Citas
                 7.2.2. Especificación de casos
                      CU001: Autenticar usuario corporativo
                                    Este caso de uso permite a un empleado iniciar una
                                    sesión segura en el Portal Empresa. El sistema valida las
                      Descripción   credenciales a través de Firebase Authentication, exige
                                    pertenecer al dominio institucional y consulta al sistema
                                    para cargar los permisos dinámicos (RBAC) del usuario.


### Tablas de la página


#### Tabla 1

| CÓDIGO | NOMBRE | CU PADRE |
| --- | --- | --- |
| CU001 | Autenticar usuario corporativo |  |
| CU002 | Gestionar empleados, roles y permisos |  |
| CU003 | Gestionar proyectos e inventario |  |
| CU004 | Gestionar clientes, vincular y<br>desvincular unidades |  |
| CU005 | Actualizar Avance de Obra |  |
| CU006 | Gestionar expedientes legales y<br>documentos |  |
| CU007 | Gestionar cronogramas de pago y<br>financiamiento |  |
| CU008 | Agendar eventos y citas |  |


#### Tabla 2

| CÓDIGO | NOMBRE | CU PADRE |
| --- | --- | --- |
| CU009 | Autenticar usuario cliente |  |
| CU010 | Consultar Inicio / Panel Principal |  |
| CU011 | Consultar Proceso de Separación |  |
| CU012 | Consultar Contrato |  |
| CU013 | Consultar Pagos y Financiamiento |  |
| CU014 | Consultar Avance del Proyecto |  |
| CU015 | Consultar Entrega |  |
| CU016 | Consultar Saneamiento |  |
| CU017 | Gestionar Agenda y Citas |  |


#### Tabla 3

| Descripción | Este caso de uso permite a un empleado iniciar una<br>sesión segura en el Portal Empresa. El sistema valida las<br>credenciales a través de Firebase Authentication, exige<br>pertenecer al dominio institucional y consulta al sistema<br>para cargar los permisos dinámicos (RBAC) del usuario. |
| --- | --- |


---

## Página 12

                                    Equipo Operativo de la Empresa
                      Actores
                                    Firebase Authentication
                      Precondiciones
                         - El Portal Empresa debe estar operativo.
                         - El usuario empleado debe haber sido dado de alta por el Admin con un
                           correo @llosaedificaciones.com.
                      Flujo Básico
                         1. El usuario accede a la URL del Portal Empresa. El sistema muestra la
                           pantalla de inicio de sesión.
                         2. El usuario ingresa sus credenciales o selecciona "Acceder con Google".
                           Firebase Authentication recibe y valida las credenciales.
                         3. El sistema verifica que el correo pertenezca al dominio
                           @llosaedificaciones.com.
                         4. El sistema envía el UID al backend para consultar la base de datos de
                           usuarios. El módulo de seguridad valida el perfil y retorna los roles y
                           permisos dinámicos asignados.
                         5. El sistema muestra una animación de carga y redirige al usuario a su
                           panel de control (Backoffice).
                      Flujo Alternativo
                      Dominio no autorizado
                         - En el paso 3, si el correo no pertenece al dominio oficial de la empresa, el
                           sistema deniega el acceso, cierra la sesión de Firebase inmediatamente y
                           muestra un error de permisos.
                      Credenciales inválidas
                         1. En el paso 2, la validación de Firebase falla. Se muestra el mensaje
                           "Correo o contraseña inválido." y el usuario permanece en la pantalla de
                           inicio.
                      Contraseña olvidada
                         1. En el paso 2, el usuario selecciona "¿Olvidaste tu contraseña?". El
                           sistema solicita el correo y envía un enlace de recuperación operado por
                           Firebase Authentication.
                      Post Condiciones
                         1. Éxito: El usuario inicia una sesión segura y puede interactuar con el portal
                           corporativo, habilitándose únicamente los módulos y botones que sus
                           permisos dinámicos le autoricen.
                         2. Fallo: El usuario permanece en la pantalla de inicio de sesión sin acceso a
                           la plataforma interna.
                      Restricciones
                         1. El inicio de sesión corporativo está restringido exclusivamente a cuentas
                           con el dominio @llosaedificaciones.com.
                         2. La gestión criptográfica de contraseñas, tokens y recuperación depende
                           íntegramente de las políticas de seguridad de Firebase Authentication, no
                           guardándose contraseñas planas en la base de datos.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| Actores | Equipo Operativo de la Empresa<br>Firebase Authentication |
| --- | --- |
| Precondiciones |  |
| - El Portal Empresa debe estar operativo.<br>- El usuario empleado debe haber sido dado de alta por el Admin con un<br>correo @llosaedificaciones.com. |  |
| Flujo Básico |  |
| 1. El usuario accede a la URL del Portal Empresa. El sistema muestra la<br>pantalla de inicio de sesión.<br>2. El usuario ingresa sus credenciales o selecciona "Acceder con Google".<br>Firebase Authentication recibe y valida las credenciales.<br>3. El sistema verifica que el correo pertenezca al dominio<br>@llosaedificaciones.com.<br>4. El sistema envía el UID al backend para consultar la base de datos de<br>usuarios. El módulo de seguridad valida el perfil y retorna los roles y<br>permisos dinámicos asignados.<br>5. El sistema muestra una animación de carga y redirige al usuario a su<br>panel de control (Backoffice). |  |
| Flujo Alternativo |  |
| Dominio no autorizado |  |
| - En el paso 3, si el correo no pertenece al dominio oficial de la empresa, el<br>sistema deniega el acceso, cierra la sesión de Firebase inmediatamente y<br>muestra un error de permisos. |  |
| Credenciales inválidas |  |
| 1. En el paso 2, la validación de Firebase falla. Se muestra el mensaje<br>"Correo o contraseña inválido." y el usuario permanece en la pantalla de<br>inicio. |  |
| Contraseña olvidada |  |
| 1. En el paso 2, el usuario selecciona "¿Olvidaste tu contraseña?". El<br>sistema solicita el correo y envía un enlace de recuperación operado por<br>Firebase Authentication. |  |
| Post Condiciones |  |
| 1. Éxito: El usuario inicia una sesión segura y puede interactuar con el portal<br>corporativo, habilitándose únicamente los módulos y botones que sus<br>permisos dinámicos le autoricen.<br>2. Fallo: El usuario permanece en la pantalla de inicio de sesión sin acceso a<br>la plataforma interna. |  |
| Restricciones |  |
| 1. El inicio de sesión corporativo está restringido exclusivamente a cuentas<br>con el dominio @llosaedificaciones.com.<br>2. La gestión criptográfica de contraseñas, tokens y recuperación depende<br>íntegramente de las políticas de seguridad de Firebase Authentication, no<br>guardándose contraseñas planas en la base de datos. |  |
| Casos de Uso Padre |  |
| Ninguno |  |


---

## Página 13

                      Prototipo
                      CU002: Gestionar empleados, roles y permisos
                                    Este caso de uso permite al Admin realizar la
                      Descripción   administración integral (CRUD) de las cuentas del
                                    personal interno.
                                    Admin
                      Actores
                                    Firebase Authentication
                      Precondiciones
                         1. El Admin debe haber iniciado sesión exitosamente.
                         2. Para nuevos empleados, el correo ingresado debe tener el dominio
                           @llosaedificaciones.com.
                      Flujo Básico
                         1. Acceso al módulo: El Admin hace clic en "Gestión de Empleados" en el
                           panel lateral (sidebar) dentro de la sección "Administración".
                         2. Visualización del panel: El sistema carga automáticamente la lista de
                           empleados desde el backend y los roles disponibles, mostrando la vista
                           principal con tres pestañas de navegación horizontal: "Usuarios", "Roles"
                           y "Permisos". La pestaña "Usuarios" está activa por defecto.
                         3. Exploración de empleados: El Admin visualiza una tabla con columnas:
                           Usuario, Correo, Rol base, Estado ("Activo"/"Inactivo") y un botón de
                           acción (para desactivar). Al hacer clic en una fila, se selecciona el
                           empleado y se despliega un panel lateral derecho con detalles del
                           usuario: información general, selector de rol base (dropdown), lista de
                           permisos del rol y una sección de auditoría de accesos con eventos
                           recientes.
                         4. Consultar pestaña Roles: El Admin hace clic en la pestaña "Roles". El
                           sistema muestra tarjetas con cada rol: ícono, nombre del rol (ej. "Admin",


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


#### Tabla 2

| Descripción | Este caso de uso permite al Admin realizar la<br>administración integral (CRUD) de las cuentas del<br>personal interno. |
| --- | --- |
| Actores | Admin<br>Firebase Authentication |
| Precondiciones |  |
| 1. El Admin debe haber iniciado sesión exitosamente.<br>2. Para nuevos empleados, el correo ingresado debe tener el dominio<br>@llosaedificaciones.com. |  |
| Flujo Básico |  |
| 1. Acceso al módulo: El Admin hace clic en "Gestión de Empleados" en el<br>panel lateral (sidebar) dentro de la sección "Administración".<br>2. Visualización del panel: El sistema carga automáticamente la lista de<br>empleados desde el backend y los roles disponibles, mostrando la vista<br>principal con tres pestañas de navegación horizontal: "Usuarios", "Roles"<br>y "Permisos". La pestaña "Usuarios" está activa por defecto.<br>3. Exploración de empleados: El Admin visualiza una tabla con columnas:<br>Usuario, Correo, Rol base, Estado ("Activo"/"Inactivo") y un botón de<br>acción (para desactivar). Al hacer clic en una fila, se selecciona el<br>empleado y se despliega un panel lateral derecho con detalles del<br>usuario: información general, selector de rol base (dropdown), lista de<br>permisos del rol y una sección de auditoría de accesos con eventos<br>recientes.<br>4. Consultar pestaña Roles: El Admin hace clic en la pestaña "Roles". El<br>sistema muestra tarjetas con cada rol: ícono, nombre del rol (ej. "Admin", |  |


---

## Página 14

                           "Asesor (Comercial)"), descripción del perfil, y chips con los códigos de
                           permiso asignados (ej. PROY_VER, OBRA_VER, PAGOS_VER).
                         5. Consultar pestaña Permisos: El Admin hace clic en "Permisos". El sistema
                           muestra el catálogo completo de permisos del sistema, cada uno con su
                           código y descripción. Vista exclusivamente informativa.
                      Flujo Alternativo
                      Crear nuevo usuario
                         1. El Admin hace clic en el botón "Crear usuario" en la esquina superior
                           derecha. Se abre un modal con un formulario que contiene: campos
                           "Nombres", "Apellidos", "Correo corporativo", teléfono, rol (selector
                           dropdown con los roles disponibles: ADMIN, ASESOR, LEGAL,
                           TECNICO, POSTVENTA) y botones "Cancelar" y "Crear usuario". El
                           Admin completa los datos requeridos y hace clic en "Crear usuario". El
                           sistema valida el dominio del correo, envía la solicitud al backend que
                           registra el perfil en PostgreSQL y crea la identidad en Firebase, enviando
                           un correo de validación al nuevo empleado. El modal muestra "Usuario
                           interno creado correctamente" y se cierra automáticamente tras 900ms.
                         2. Si el correo ingresado no pertenece al dominio @llosaedificaciones.com,
                           el sistema bloquea la acción y muestra: "Error: Solo se permiten correos
                           institucionales para el personal de la empresa".
                      Cambiar rol base
                      En el paso 3, en el panel lateral de detalle de un empleado, el Admin selecciona un
                      nuevo rol del dropdown "Rol base". El sistema invoca al backend y actualiza el
                      perfil. Los cambios aplican en el próximo refresco de token del empleado.
                      Desactivar empleado
                      El Admin hace clic en el icono person_off en la fila del empleado o desde su
                      detalle. El sistema muestra una confirmación. Al confirmar, se actualiza el estado
                      en PostgreSQL y solicita a Firebase inhabilitar la cuenta. El acceso queda
                      revocado instantáneamente. El Admin no puede desactivar su propia cuenta (el
                      botón aparece deshabilitado).
                      Post Condiciones
                         1. Éxito: Los datos, credenciales y matriz de permisos del usuario quedan
                           guardados en la BD y sincronizados con Firebase.
                         2. Fallo: La transacción se cancela y se notifica el error al Admin.
                      Restricciones
                         1. Segregación: Solo el rol Admin puede acceder a este módulo.
                         2. Consistencia: No se puede eliminar/desactivar a un usuario que sea el
                           único responsable asignado a un proyecto activo sin reasignar el proyecto
                           primero.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| "Asesor (Comercial)"), descripción del perfil, y chips con los códigos de<br>permiso asignados (ej. PROY_VER, OBRA_VER, PAGOS_VER).<br>5. Consultar pestaña Permisos: El Admin hace clic en "Permisos". El sistema<br>muestra el catálogo completo de permisos del sistema, cada uno con su<br>código y descripción. Vista exclusivamente informativa. |
| --- |
| Flujo Alternativo |
| Crear nuevo usuario |
| 1. El Admin hace clic en el botón "Crear usuario" en la esquina superior<br>derecha. Se abre un modal con un formulario que contiene: campos<br>"Nombres", "Apellidos", "Correo corporativo", teléfono, rol (selector<br>dropdown con los roles disponibles: ADMIN, ASESOR, LEGAL,<br>TECNICO, POSTVENTA) y botones "Cancelar" y "Crear usuario". El<br>Admin completa los datos requeridos y hace clic en "Crear usuario". El<br>sistema valida el dominio del correo, envía la solicitud al backend que<br>registra el perfil en PostgreSQL y crea la identidad en Firebase, enviando<br>un correo de validación al nuevo empleado. El modal muestra "Usuario<br>interno creado correctamente" y se cierra automáticamente tras 900ms.<br>2. Si el correo ingresado no pertenece al dominio @llosaedificaciones.com,<br>el sistema bloquea la acción y muestra: "Error: Solo se permiten correos<br>institucionales para el personal de la empresa". |
| Cambiar rol base |
| En el paso 3, en el panel lateral de detalle de un empleado, el Admin selecciona un<br>nuevo rol del dropdown "Rol base". El sistema invoca al backend y actualiza el<br>perfil. Los cambios aplican en el próximo refresco de token del empleado. |
| Desactivar empleado |
| El Admin hace clic en el icono person_off en la fila del empleado o desde su<br>detalle. El sistema muestra una confirmación. Al confirmar, se actualiza el estado<br>en PostgreSQL y solicita a Firebase inhabilitar la cuenta. El acceso queda<br>revocado instantáneamente. El Admin no puede desactivar su propia cuenta (el<br>botón aparece deshabilitado). |
| Post Condiciones |
| 1. Éxito: Los datos, credenciales y matriz de permisos del usuario quedan<br>guardados en la BD y sincronizados con Firebase.<br>2. Fallo: La transacción se cancela y se notifica el error al Admin. |
| Restricciones |
| 1. Segregación: Solo el rol Admin puede acceder a este módulo.<br>2. Consistencia: No se puede eliminar/desactivar a un usuario que sea el<br>único responsable asignado a un proyecto activo sin reasignar el proyecto<br>primero. |
| Casos de Uso Padre |
| Ninguno |


---

## Página 15

                      Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 16

                      CU003: Gestionar proyectos e inventario
                                    Este caso de uso permite al Admin crear y administrar la
                                    estructura de los proyectos inmobiliarios. Esto abarca la
                      Descripción   creación del "cascarón" del proyecto, la jerarquía de torres
                                    y unidades (departamentos, cocheras, depósitos), y
                                    delimitación de hitos.
                      Actores       Admin
                      Precondiciones
                         1. El Admin debe haber iniciado sesión exitosamente.
                         2. El backend y la base de datos (PostgreSQL) deben estar operativos.
                      Flujo Básico
                         1. Listado de proyectos: El Admin hace clic en "Proyectos e Inventario" en el
                           sidebar. El sistema muestra un listado de proyectos, una barra de
                           búsqueda por nombre, y un grid de tarjetas de proyecto. Cada tarjeta
                           muestra: nombre, ubicación, fechas, 3 indicadores (departamentos,
                           clientes vinculados, % de avance con barra de progreso), y al seleccionar
                           se abre el detalle.
                         2. Vista de detalle del proyecto (Pestaña Resumen): El Admin hace clic en
                           una tarjeta de proyecto. El sistema muestra una vista de detalle del
                           proyecto con: un encabezado con nombre, dirección, fecha de inicio, 4
                           tarjetas métricas (Unidades totales, Disponibles, Separadas, Vendidas);
                           un boton "Volver a proyectos"; y una barra de navegación secundaria con


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite al Admin crear y administrar la<br>estructura de los proyectos inmobiliarios. Esto abarca la<br>creación del "cascarón" del proyecto, la jerarquía de torres<br>y unidades (departamentos, cocheras, depósitos), y<br>delimitación de hitos. |
| --- | --- |
| Actores | Admin |
| Precondiciones |  |
| 1. El Admin debe haber iniciado sesión exitosamente.<br>2. El backend y la base de datos (PostgreSQL) deben estar operativos. |  |
| Flujo Básico |  |
| 1. Listado de proyectos: El Admin hace clic en "Proyectos e Inventario" en el<br>sidebar. El sistema muestra un listado de proyectos, una barra de<br>búsqueda por nombre, y un grid de tarjetas de proyecto. Cada tarjeta<br>muestra: nombre, ubicación, fechas, 3 indicadores (departamentos,<br>clientes vinculados, % de avance con barra de progreso), y al seleccionar<br>se abre el detalle.<br>2. Vista de detalle del proyecto (Pestaña Resumen): El Admin hace clic en<br>una tarjeta de proyecto. El sistema muestra una vista de detalle del<br>proyecto con: un encabezado con nombre, dirección, fecha de inicio, 4<br>tarjetas métricas (Unidades totales, Disponibles, Separadas, Vendidas);<br>un boton "Volver a proyectos"; y una barra de navegación secundaria con |  |


---

## Página 17

                           dos pestañas: "Resumen" e "Inventario". En la pestaña Resumen se
                           visualiza el formulario de edición del proyecto.
                         3. Inventario (Pestaña Inventario): El Admin hace clic en "Inventario" en la
                           navegación secundaria. El sistema carga la vista de inventario que
                           muestra una tabla con todas las unidades del proyecto, su título, piso, tipo
                           (Dpto/Cochera/Depósito), área, área techada, precio, estado comercial y
                           un enlace al detalle individual.
                         4. Detalle de unidad: El Admin hace clic en una unidad. El sistema navega a
                           y muestra la vista de detalle de la unidad con la información específica:
                           número, tipo, área ocupada, área techada, precio, estado, piso,
                           características, recorrido virtual.
                      Flujo Alternativo
                      Edición de proyecto e inventario existente
                      Desde la pestaña Resumen en la vista de detalle del proyecto, el Admin modifica
                      los campos del formulario (Nombre, Descripción, Precertificación EDGE/LEED,
                      Departamento, Distrito, Dirección, Fecha de inicio, Fecha de fin) y hace clic en
                      "Guardar cambios". El sistema confirma "Proyecto actualizado correctamente".
                      Crear nuevo proyecto
                         1. El Admin hace clic en "Nuevo proyecto". El sistema carga un asistente de
                           creación que consta de 3 pasos:
                              a. Paso 1 — Datos generales: El Admin completa el formulario de
                                datos generales con: Nombre, Descripción, Precertificación
                                EDGE/LEED (casilla), Departamento, Distrito, Dirección, Fecha
                                de inicio, Fecha de fin, link de recorrido virtual .
                              b. Paso 2 — Previsualización de inventario: El sistema muestra una
                                sección de configuración de inventario donde el Admin configura
                                la estructura: Número de torres, Pisos por torre, Departamentos
                                por piso, Cocheras por piso, Depósitos por piso. El Admin puede
                                volver atrás para corregir datos generales o hacer clic en
                                “siguiente”.
                              c. Paso 3 — Editor: El usuario puede editar la estructura del
                                proyecto, unidad por unidad. Cuando se da a crear, el sistema
                                muestra un overlay con mensajes de progreso: "Creando
                                proyecto general..." → "Generando estructura física y
                                unidades..." → "Proyecto creado exitosamente".
                      Eliminar proyecto
                      En la sección "Zona de peligro" dentro de la pestaña Resumen, el Admin hace clic
                      en "Eliminar proyecto". Se abre un modal de confirmación con mensaje de
                      advertencia. Al confirmar, el sistema elimina el proyecto y redirige al listado.
                      Post Condiciones
                         1. Éxito: El proyecto y su inventario quedan guardados en PostgreSQL. Las
                           unidades nacen en estado "Disponible".
                         2. Fallo: No se registra el proyecto y el sistema muestra el error.
                      Restricciones
                         1. Segregación: Sólo el rol Admin puede crear la estructura base.
                         2. Inmutabilidad de hitos: Una vez creada la plantilla de hitos del proyecto,
                           su estructura no admite edición ni eliminación.
                      Casos de Uso Padre
                      Ninguno


### Tablas de la página


#### Tabla 1

| dos pestañas: "Resumen" e "Inventario". En la pestaña Resumen se<br>visualiza el formulario de edición del proyecto.<br>3. Inventario (Pestaña Inventario): El Admin hace clic en "Inventario" en la<br>navegación secundaria. El sistema carga la vista de inventario que<br>muestra una tabla con todas las unidades del proyecto, su título, piso, tipo<br>(Dpto/Cochera/Depósito), área, área techada, precio, estado comercial y<br>un enlace al detalle individual.<br>4. Detalle de unidad: El Admin hace clic en una unidad. El sistema navega a<br>y muestra la vista de detalle de la unidad con la información específica:<br>número, tipo, área ocupada, área techada, precio, estado, piso,<br>características, recorrido virtual. |
| --- |
| Flujo Alternativo |
| Edición de proyecto e inventario existente |
| Desde la pestaña Resumen en la vista de detalle del proyecto, el Admin modifica<br>los campos del formulario (Nombre, Descripción, Precertificación EDGE/LEED,<br>Departamento, Distrito, Dirección, Fecha de inicio, Fecha de fin) y hace clic en<br>"Guardar cambios". El sistema confirma "Proyecto actualizado correctamente". |
| Crear nuevo proyecto |
| 1. El Admin hace clic en "Nuevo proyecto". El sistema carga un asistente de<br>creación que consta de 3 pasos:<br>a. Paso 1 — Datos generales: El Admin completa el formulario de<br>datos generales con: Nombre, Descripción, Precertificación<br>EDGE/LEED (casilla), Departamento, Distrito, Dirección, Fecha<br>de inicio, Fecha de fin, link de recorrido virtual .<br>b. Paso 2 — Previsualización de inventario: El sistema muestra una<br>sección de configuración de inventario donde el Admin configura<br>la estructura: Número de torres, Pisos por torre, Departamentos<br>por piso, Cocheras por piso, Depósitos por piso. El Admin puede<br>volver atrás para corregir datos generales o hacer clic en<br>“siguiente”.<br>c. Paso 3 — Editor: El usuario puede editar la estructura del<br>proyecto, unidad por unidad. Cuando se da a crear, el sistema<br>muestra un overlay con mensajes de progreso: "Creando<br>proyecto general..." → "Generando estructura física y<br>unidades..." → "Proyecto creado exitosamente". |
| Eliminar proyecto |
| En la sección "Zona de peligro" dentro de la pestaña Resumen, el Admin hace clic<br>en "Eliminar proyecto". Se abre un modal de confirmación con mensaje de<br>advertencia. Al confirmar, el sistema elimina el proyecto y redirige al listado. |
| Post Condiciones |
| 1. Éxito: El proyecto y su inventario quedan guardados en PostgreSQL. Las<br>unidades nacen en estado "Disponible".<br>2. Fallo: No se registra el proyecto y el sistema muestra el error. |
| Restricciones |
| 1. Segregación: Sólo el rol Admin puede crear la estructura base.<br>2. Inmutabilidad de hitos: Una vez creada la plantilla de hitos del proyecto,<br>su estructura no admite edición ni eliminación. |
| Casos de Uso Padre |
| Ninguno |


---

## Página 18

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

## Página 19


---

## Página 20


---

## Página 21

                      CU004: Gestionar clientes, vincular y desvincular unidades
                                    Proceso mediante el cual el Asesor Comercial registra la
                                    identidad digital de un cliente y le vincula uno o más
                      Descripción
                                    activos inmobiliarios. Esta acción cambia el estado de la
                                    unidad a "Separado" y gatilla el "Modo de Espera".
                      Actores       Asesor Comercial
                      Precondiciones
                         - Asesor autenticado en el Backoffice.
                         - Cliente con correo electrónico válido.
                         - Unidad(es) inmobiliaria(s) en estado "Disponible".
                      Flujo Básico
                         1. Acceso al módulo: El Asesor hace clic en "Clientes y Asignaciones" en el
                           sidebar. El sistema muestra la página de clientes.
                         2. El sistema muestra una barra de búsqueda con filtro por proyecto, y una
                           tabla paginada con columnas: Nombre, Correo, Teléfono y Estado
                           (Activo/Inactivo). Cada fila es clickeable y navega al detalle del cliente. En
                           la esquina superior derecha se muestran los botones "Asignar propiedad"
                           y "Crear cliente".
                         3. Ver perfil de cliente: El Asesor hace clic en una fila de la tabla. El sistema
                           carga la vista de perfil del cliente que muestra:
                              a. Una tarjeta: nombre, email, DNI, teléfono, estado, con botones
                                para editar, eliminar.
                              b. Una tabla de unidades vinculadas: proyecto, unidad,
                                financiamiento, estado del trámite legal. Cada fila permite ir al
                                expediente legal.
                              c. Una sección de actividad reciente del cliente.
                      Flujo Alternativo
                      Crear nuevo cliente
                      El Asesor hace clic en "Crear cliente". Se abre un formulario modal con datos
                      básicos. Alternativamente, el Asesor puede hacer clic en el botón "Crear cliente" de
                      la esquina. El formulario contiene: Nombre, Apellidos, Correo electrónico, Teléfono,
                      DNI/RUC. Al enviar, el sistema registra el cliente en PostgreSQL y crea la identidad
                      en Firebase, y muestra "Cliente creado exitosamente".
                      Asignar propiedad
                         1. El Asesor hace clic en "Asignar propiedad". Se abre un asistente de
                           asignación con un flujo de 3 pasos:


### Tablas de la página


#### Tabla 1

| Descripción | Proceso mediante el cual el Asesor Comercial registra la<br>identidad digital de un cliente y le vincula uno o más<br>activos inmobiliarios. Esta acción cambia el estado de la<br>unidad a "Separado" y gatilla el "Modo de Espera". |
| --- | --- |
| Actores | Asesor Comercial |
| Precondiciones |  |
| - Asesor autenticado en el Backoffice.<br>- Cliente con correo electrónico válido.<br>- Unidad(es) inmobiliaria(s) en estado "Disponible". |  |
| Flujo Básico |  |
| 1. Acceso al módulo: El Asesor hace clic en "Clientes y Asignaciones" en el<br>sidebar. El sistema muestra la página de clientes.<br>2. El sistema muestra una barra de búsqueda con filtro por proyecto, y una<br>tabla paginada con columnas: Nombre, Correo, Teléfono y Estado<br>(Activo/Inactivo). Cada fila es clickeable y navega al detalle del cliente. En<br>la esquina superior derecha se muestran los botones "Asignar propiedad"<br>y "Crear cliente".<br>3. Ver perfil de cliente: El Asesor hace clic en una fila de la tabla. El sistema<br>carga la vista de perfil del cliente que muestra:<br>a. Una tarjeta: nombre, email, DNI, teléfono, estado, con botones<br>para editar, eliminar.<br>b. Una tabla de unidades vinculadas: proyecto, unidad,<br>financiamiento, estado del trámite legal. Cada fila permite ir al<br>expediente legal.<br>c. Una sección de actividad reciente del cliente. |  |
| Flujo Alternativo |  |
| Crear nuevo cliente |  |
| El Asesor hace clic en "Crear cliente". Se abre un formulario modal con datos<br>básicos. Alternativamente, el Asesor puede hacer clic en el botón "Crear cliente" de<br>la esquina. El formulario contiene: Nombre, Apellidos, Correo electrónico, Teléfono,<br>DNI/RUC. Al enviar, el sistema registra el cliente en PostgreSQL y crea la identidad<br>en Firebase, y muestra "Cliente creado exitosamente". |  |
| Asignar propiedad |  |
| 1. El Asesor hace clic en "Asignar propiedad". Se abre un asistente de<br>asignación con un flujo de 3 pasos: |  |


---

## Página 22

                         2. Paso 1 — Seleccionar personas: El Asesor busca clientes por nombre,
                           correo o DNI. Visualiza una lista de clientes activos con avatares y puede
                           seleccionar uno o varios (multiselección). Los seleccionados aparecen
                           como chips removibles. Hace clic en "Siguiente".
                         3. Paso 2 — Seleccionar unidades: El Asesor selecciona un proyecto
                           mediante buscador con sugerencias. El sistema carga las unidades
                           disponibles del proyecto, agrupadas por tipo (Departamentos,
                           Estacionamientos, Depósitos) en tarjetas seleccionables. El Asesor
                           selecciona una o varias unidades. Hace clic en "Siguiente".
                         4. Paso 3 — Confirmar asignación: El Asesor visualiza un resumen con los
                           clientes seleccionados y las unidades elegidas. Selecciona el tipo de
                           financiamiento entre "Crédito Hipotecario" o "Crédito Directo". Hace clic
                           en "Confirmar asignación". El sistema crea el contrato (expediente) en
                           backend y asigna los activos. Muestra "Asignación completada
                           correctamente".
                      Cliente ya registrado
                      Al crear un cliente, si ya existe en la plataforma muestra el sistema menciona que
                      ya está registrado.
                      Asignación múltiple
                      En el paso 2 del wizard de asignación, el Asesor puede seleccionar varias
                      unidades de diferentes tipos y el sistema las vinculará en bloque.
                      Desvincular unidad y resolver contrato
                      En el paso 3, desde el perfil del cliente, el usuario hace clic en el botón de
                      desvincular correspondiente a la unidad en la tabla de unidades vinculadas. Se
                      abre un modal que solicita una justificación o motivo (ej. "Desistimiento de
                      compra"). El usuario ingresa el motivo y hace clic en "Confirmar". El sistema envía
                      la solicitud al backend, rompe el vínculo en PostgreSQL, cambia el estado de la
                      unidad a "Disponible" y revoca el acceso del cliente a esa unidad. Si era la única
                      unidad del cliente, su perfil pasa a "Inactivo".
                      Cliente con múltiples unidades al desvincular
                      Al desvincular una unidad, si el cliente tiene otras unidades activas, solo se libera
                      la unidad seleccionada. El cliente permanece activo.
                      Cancelación de desvinculación
                      El usuario cierra el modal de desvinculación sin confirmar. No se realizan cambios.
                      Post Condiciones
                         - Éxito: Cliente habilitado con acceso al portal y unidad(es) reservada(s)
                           con ciclo de vida iniciado; o unidad liberada y cliente desvinculado según
                           corresponda.
                         - Fallo: La transacción se revierte y no se aplican cambios.
                      Restricciones
                         - Exclusividad: Una unidad no puede tener dos clientes asignados
                           simultáneamente.
                         - Dominios: El registro de clientes admite cualquier dominio público.
                         - Históricos: Los registros de contratos resueltos se archivan en el log de
                           auditoría, no se eliminan.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 2. Paso 1 — Seleccionar personas: El Asesor busca clientes por nombre,<br>correo o DNI. Visualiza una lista de clientes activos con avatares y puede<br>seleccionar uno o varios (multiselección). Los seleccionados aparecen<br>como chips removibles. Hace clic en "Siguiente".<br>3. Paso 2 — Seleccionar unidades: El Asesor selecciona un proyecto<br>mediante buscador con sugerencias. El sistema carga las unidades<br>disponibles del proyecto, agrupadas por tipo (Departamentos,<br>Estacionamientos, Depósitos) en tarjetas seleccionables. El Asesor<br>selecciona una o varias unidades. Hace clic en "Siguiente".<br>4. Paso 3 — Confirmar asignación: El Asesor visualiza un resumen con los<br>clientes seleccionados y las unidades elegidas. Selecciona el tipo de<br>financiamiento entre "Crédito Hipotecario" o "Crédito Directo". Hace clic<br>en "Confirmar asignación". El sistema crea el contrato (expediente) en<br>backend y asigna los activos. Muestra "Asignación completada<br>correctamente". |
| --- |
| Cliente ya registrado |
| Al crear un cliente, si ya existe en la plataforma muestra el sistema menciona que<br>ya está registrado. |
| Asignación múltiple |
| En el paso 2 del wizard de asignación, el Asesor puede seleccionar varias<br>unidades de diferentes tipos y el sistema las vinculará en bloque. |
| Desvincular unidad y resolver contrato |
| En el paso 3, desde el perfil del cliente, el usuario hace clic en el botón de<br>desvincular correspondiente a la unidad en la tabla de unidades vinculadas. Se<br>abre un modal que solicita una justificación o motivo (ej. "Desistimiento de<br>compra"). El usuario ingresa el motivo y hace clic en "Confirmar". El sistema envía<br>la solicitud al backend, rompe el vínculo en PostgreSQL, cambia el estado de la<br>unidad a "Disponible" y revoca el acceso del cliente a esa unidad. Si era la única<br>unidad del cliente, su perfil pasa a "Inactivo". |
| Cliente con múltiples unidades al desvincular |
| Al desvincular una unidad, si el cliente tiene otras unidades activas, solo se libera<br>la unidad seleccionada. El cliente permanece activo. |
| Cancelación de desvinculación |
| El usuario cierra el modal de desvinculación sin confirmar. No se realizan cambios. |
| Post Condiciones |
| - Éxito: Cliente habilitado con acceso al portal y unidad(es) reservada(s)<br>con ciclo de vida iniciado; o unidad liberada y cliente desvinculado según<br>corresponda.<br>- Fallo: La transacción se revierte y no se aplican cambios. |
| Restricciones |
| - Exclusividad: Una unidad no puede tener dos clientes asignados<br>simultáneamente.<br>- Dominios: El registro de clientes admite cualquier dominio público.<br>- Históricos: Los registros de contratos resueltos se archivan en el log de<br>auditoría, no se eliminan. |
| Casos de Uso Padre |
| Ninguno |


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

                      CU005: Actualizar Avance de Obra
                                    Este caso de uso permite al personal técnico registrar el
                                    cumplimiento de los hitos constructivos y,
                      Descripción   simultáneamente, subir la evidencia visual (fotos/videos)
                                    que los respalda. La actualización recalcula el avance
                                    porcentual y publica el contenido en el Portal del Cliente.
                      Actores       Área Técnica: Perfil de Editor de Obra.
                      Precondiciones
                         - Usuario autenticado con el rol correspondiente (RBAC).
                         - La jerarquía del proyecto (Torres/Unidades) y sus hitos deben estar
                           creados.
                         - Archivos en formatos permitidos (PNG, JPG, TIFF, MP4).
                      Flujo Básico
                         1. El usuario hace clic en "Avance de Obra" en el sidebar. El sistema
                           muestra un listado de proyectos con su % de avance general.
                         2. El usuario hace clic en "Abrir obra" o en una fila. El sistema navega a y
                           carga la vista de avance de obra.
                         3. Timeline: El sistema muestra una línea de tiempo con los hitos maestros
                           en una línea vertical. Cada nodo muestra ícono, nombre y estado
                           (COMPLETADO, EN_PROGRESO, PENDIENTE).
                         4. Tab Hitos: El usuario ve la pestaña "Hitos". En la vista "Por proyecto" se
                           listan los hitos maestros en tabla, se pueden cambiar los estados del
                           proyecto.


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite al personal técnico registrar el<br>cumplimiento de los hitos constructivos y,<br>simultáneamente, subir la evidencia visual (fotos/videos)<br>que los respalda. La actualización recalcula el avance<br>porcentual y publica el contenido en el Portal del Cliente. |
| --- | --- |
| Actores | Área Técnica: Perfil de Editor de Obra. |
| Precondiciones |  |
| - Usuario autenticado con el rol correspondiente (RBAC).<br>- La jerarquía del proyecto (Torres/Unidades) y sus hitos deben estar<br>creados.<br>- Archivos en formatos permitidos (PNG, JPG, TIFF, MP4). |  |
| Flujo Básico |  |
| 1. El usuario hace clic en "Avance de Obra" en el sidebar. El sistema<br>muestra un listado de proyectos con su % de avance general.<br>2. El usuario hace clic en "Abrir obra" o en una fila. El sistema navega a y<br>carga la vista de avance de obra.<br>3. Timeline: El sistema muestra una línea de tiempo con los hitos maestros<br>en una línea vertical. Cada nodo muestra ícono, nombre y estado<br>(COMPLETADO, EN_PROGRESO, PENDIENTE).<br>4. Tab Hitos: El usuario ve la pestaña "Hitos". En la vista "Por proyecto" se<br>listan los hitos maestros en tabla, se pueden cambiar los estados del<br>proyecto. |  |


---

## Página 26

                         5. Tab Reportes: El usuario hace clic en "Reportes". Visualiza tarjetas (Total,
                           Publicados, % avance) y la lista de reportes publicados. Al hacer clic en
                           un reporte existente, se abre su detalle con galería multimedia.
                         6. Tab Documentación: El usuario hace clic en "Documentación". Visualiza
                           las 5 categorías: Anteproyecto Aprobado, Licencia de Construcción,
                           Planos, Cuadro de Acabados, Certificación EDGE/LEED, con opción de
                           descargar archivos (mediante URL firmada).
                      Flujo Alternativo
                      Completar hitos por piso
                      En el paso 4, el usuario cambia a vista "Por piso". Selecciona una torre del selector
                      y luego un piso. El sistema carga los avances de ese piso. Se muestra una tabla
                      con: orden, hito, descripción, estado y botón "Completar". El usuario hace clic en
                      "Completar" para marcar un hito como completado. El sistema valida precedencia,
                      actualiza el avance, recalcula el % de avance del proyecto y actualiza la timeline.
                      Crear nuevo reporte
                      En el paso 5, desde la pestaña Reportes, el usuario hace clic en "Nuevo reporte" y
                      completa: título, fecha, hitos consolidados (casillas), comentarios. Sube archivos
                      multimedia. El sistema crea el reporte y luego sube cada archivo.
                      Subir y eliminar documentos
                      Desde la pestaña Documentación, el usuario puede subir archivos a cualquiera de
                      las 5 categorías, así como eliminar archivos existentes (con modal de
                      confirmación).
                      Violación de precedencia
                      Al completar un hito por piso, si el hito anterior no está completo, el sistema
                      bloquea y muestra alerta.
                      Error de formato/peso multimedia
                      Al crear un reporte o subir documentos, archivos inválidos son rechazados sin
                      afectar la operación.
                      Post Condiciones
                         - Éxito: El estado del hito se actualiza, el porcentaje avanza y el material
                           multimedia es visible inmediatamente en el Portal del Cliente.
                         - Fallo: Si la validación falla o el almacenamiento no responde, no se
                           registran cambios de estado ni se guardan archivos fragmentados.
                      Restricciones
                         - Inmutabilidad del Cliente: El material publicado es de "Solo Lectura" para
                           el comprador; no puede interactuar con él (ni borrar, ni comentar).
                         - Independencia Constructiva: El avance constructivo se registra a nivel de
                           unidad; el progreso de un departamento no bloquea a otro contiguo.
                         - Segregación Operativa: Este perfil técnico no tiene acceso para modificar
                           estados de trámites legales o financieros.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 5. Tab Reportes: El usuario hace clic en "Reportes". Visualiza tarjetas (Total,<br>Publicados, % avance) y la lista de reportes publicados. Al hacer clic en<br>un reporte existente, se abre su detalle con galería multimedia.<br>6. Tab Documentación: El usuario hace clic en "Documentación". Visualiza<br>las 5 categorías: Anteproyecto Aprobado, Licencia de Construcción,<br>Planos, Cuadro de Acabados, Certificación EDGE/LEED, con opción de<br>descargar archivos (mediante URL firmada). |
| --- |
| Flujo Alternativo |
| Completar hitos por piso |
| En el paso 4, el usuario cambia a vista "Por piso". Selecciona una torre del selector<br>y luego un piso. El sistema carga los avances de ese piso. Se muestra una tabla<br>con: orden, hito, descripción, estado y botón "Completar". El usuario hace clic en<br>"Completar" para marcar un hito como completado. El sistema valida precedencia,<br>actualiza el avance, recalcula el % de avance del proyecto y actualiza la timeline. |
| Crear nuevo reporte |
| En el paso 5, desde la pestaña Reportes, el usuario hace clic en "Nuevo reporte" y<br>completa: título, fecha, hitos consolidados (casillas), comentarios. Sube archivos<br>multimedia. El sistema crea el reporte y luego sube cada archivo. |
| Subir y eliminar documentos |
| Desde la pestaña Documentación, el usuario puede subir archivos a cualquiera de<br>las 5 categorías, así como eliminar archivos existentes (con modal de<br>confirmación). |
| Violación de precedencia |
| Al completar un hito por piso, si el hito anterior no está completo, el sistema<br>bloquea y muestra alerta. |
| Error de formato/peso multimedia |
| Al crear un reporte o subir documentos, archivos inválidos son rechazados sin<br>afectar la operación. |
| Post Condiciones |
| - Éxito: El estado del hito se actualiza, el porcentaje avanza y el material<br>multimedia es visible inmediatamente en el Portal del Cliente.<br>- Fallo: Si la validación falla o el almacenamiento no responde, no se<br>registran cambios de estado ni se guardan archivos fragmentados. |
| Restricciones |
| - Inmutabilidad del Cliente: El material publicado es de "Solo Lectura" para<br>el comprador; no puede interactuar con él (ni borrar, ni comentar).<br>- Independencia Constructiva: El avance constructivo se registra a nivel de<br>unidad; el progreso de un departamento no bloquea a otro contiguo.<br>- Segregación Operativa: Este perfil técnico no tiene acceso para modificar<br>estados de trámites legales o financieros. |
| Casos de Uso Padre |
| Ninguno |


---

## Página 27

                      Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 28


---

## Página 29

                      CU006: Gestionar expedientes legales y documentos
                                    Permite al Área Legal gestionar los expedientes legales
                                    de cada unidad, actualizando hitos del proceso de
                      Descripción
                                    formalización y saneamiento, y administrando los
                                    documentos de respaldo.
                      Actores       Área Legal (Editor Documental)
                      Precondiciones
                         - Usuario autenticado con el rol específico en el Portal de la Empresa.
                         - Unidad inmobiliaria asignada a un cliente.
                         - Documentos de respaldo en formato PDF..
                      Flujo Básico
                         1. El usuario hace clic en "Gestión Legal" en el sidebar. El sistema muestra
                           un listado de expedientes.
                         2. Vista general de expedientes: El sistema muestra 4 tarjetas (Total, En
                           proceso, Firma pendiente, Bloqueados), una barra de filtros (búsqueda
                           por texto, proyecto, torre, estado, etapa, toggle "Ocultar desistidos"), y
                           una tabla paginada. Cada fila muestra: ID de expediente,
                           Proyecto/Unidad, Titulares, Etapa, asesor y estado.
                         3. Seleccionar expediente: El usuario hace clic en una fila. El sistema carga
                           la vista de detalle del expediente. El header muestra breadcrumb "Volver
                           a Gestión Legal", EXP-ID, badge Vigente, badge Financiamiento, y fecha
                           de creación. Una barra de contexto muestra: Titulares, unidades
                           vinculadas, asesor, y fecha de entrega. Asimismo, debajo se muestra:
                              a. Tab Resumen: El sistema carga por defecto la pestaña
                                "Resumen". Muestra: hitos completados y totales, y un grid de 5
                                tarjetas de etapa (Separación, Contrato, Pagos, Entrega,
                                Saneamiento). Cada tarjeta tiene título, estado, barra de
                                progreso horizontal y % de avance.
                              b. Tab Proceso legal: muestra las etapas legales con sus hitos
                                respectivos, al marcar uno se marca en proceso y al volver a
                                marcar se pasa a un estado de completado.
                              c. Tab documentos: muestra todos los documentos legales
                                requeridos por etapa. En cada uno se muestra título, descripción,
                                nota y botón para editar y subir archivos.
                      Flujo Alternativo
                      Gestionar documentos


### Tablas de la página


#### Tabla 1

| Descripción | Permite al Área Legal gestionar los expedientes legales<br>de cada unidad, actualizando hitos del proceso de<br>formalización y saneamiento, y administrando los<br>documentos de respaldo. |
| --- | --- |
| Actores | Área Legal (Editor Documental) |
| Precondiciones |  |
| - Usuario autenticado con el rol específico en el Portal de la Empresa.<br>- Unidad inmobiliaria asignada a un cliente.<br>- Documentos de respaldo en formato PDF.. |  |
| Flujo Básico |  |
| 1. El usuario hace clic en "Gestión Legal" en el sidebar. El sistema muestra<br>un listado de expedientes.<br>2. Vista general de expedientes: El sistema muestra 4 tarjetas (Total, En<br>proceso, Firma pendiente, Bloqueados), una barra de filtros (búsqueda<br>por texto, proyecto, torre, estado, etapa, toggle "Ocultar desistidos"), y<br>una tabla paginada. Cada fila muestra: ID de expediente,<br>Proyecto/Unidad, Titulares, Etapa, asesor y estado.<br>3. Seleccionar expediente: El usuario hace clic en una fila. El sistema carga<br>la vista de detalle del expediente. El header muestra breadcrumb "Volver<br>a Gestión Legal", EXP-ID, badge Vigente, badge Financiamiento, y fecha<br>de creación. Una barra de contexto muestra: Titulares, unidades<br>vinculadas, asesor, y fecha de entrega. Asimismo, debajo se muestra:<br>a. Tab Resumen: El sistema carga por defecto la pestaña<br>"Resumen". Muestra: hitos completados y totales, y un grid de 5<br>tarjetas de etapa (Separación, Contrato, Pagos, Entrega,<br>Saneamiento). Cada tarjeta tiene título, estado, barra de<br>progreso horizontal y % de avance.<br>b. Tab Proceso legal: muestra las etapas legales con sus hitos<br>respectivos, al marcar uno se marca en proceso y al volver a<br>marcar se pasa a un estado de completado.<br>c. Tab documentos: muestra todos los documentos legales<br>requeridos por etapa. En cada uno se muestra título, descripción,<br>nota y botón para editar y subir archivos. |  |
| Flujo Alternativo |  |
| Gestionar documentos |  |


---

## Página 30

                      En el punto 3.c el usuario hace clic en "Documentos". Ve chips de filtro por etapa
                      (Todos/Separación/Contrato/Pago/Entrega/Saneamiento). Cada documento se
                      muestra en una tarjeta con acciones: Descargar (mediante URL firmada),
                      Subir/Reemplazar archivo, Editar metadatos (abre modal con campos: título,
                      descripción, nota corporativa, fecha de emisión, ícono), y Eliminar archivo (con un
                      modal de confirmación).
                      Violación de precedencia
                         1. En el punto 3.b, al actualizar un hito legal, si el hito predecesor no está
                           completado, el sistema bloquea el toggle y muestra alerta.
                         2. Error de formato/peso documento
                         3. Al subir o reemplazar un documento, archivos no válidos son rechazados.
                      Post Condiciones
                         - Éxito: El trámite de saneamiento se actualiza y el documento queda
                           custodiado de forma segura, quedando disponible para la consulta
                           restringida del cliente.
                         - Fallo: La transacción se revierte por completo; el estado legal anterior y el
                           repositorio no sufren alteraciones.
                      Restricciones
                         - Privacidad Estricta : Los archivos carecen de accesos públicos
                           permanentes. El acceso es restringido y exclusivo para el propietario de la
                           unidad y la empresa.
                         - Auditoría Interna: Cualquier carga, visualización o eliminación genera un
                           registro obligatorio en el log de auditoría (usuario, fecha y acción).
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso
                      Prototipo


### Tablas de la página


#### Tabla 1

| En el punto 3.c el usuario hace clic en "Documentos". Ve chips de filtro por etapa<br>(Todos/Separación/Contrato/Pago/Entrega/Saneamiento). Cada documento se<br>muestra en una tarjeta con acciones: Descargar (mediante URL firmada),<br>Subir/Reemplazar archivo, Editar metadatos (abre modal con campos: título,<br>descripción, nota corporativa, fecha de emisión, ícono), y Eliminar archivo (con un<br>modal de confirmación). |
| --- |
| Violación de precedencia |
| 1. En el punto 3.b, al actualizar un hito legal, si el hito predecesor no está<br>completado, el sistema bloquea el toggle y muestra alerta.<br>2. Error de formato/peso documento<br>3. Al subir o reemplazar un documento, archivos no válidos son rechazados. |
| Post Condiciones |
| - Éxito: El trámite de saneamiento se actualiza y el documento queda<br>custodiado de forma segura, quedando disponible para la consulta<br>restringida del cliente.<br>- Fallo: La transacción se revierte por completo; el estado legal anterior y el<br>repositorio no sufren alteraciones. |
| Restricciones |
| - Privacidad Estricta : Los archivos carecen de accesos públicos<br>permanentes. El acceso es restringido y exclusivo para el propietario de la<br>unidad y la empresa.<br>- Auditoría Interna: Cualquier carga, visualización o eliminación genera un<br>registro obligatorio en el log de auditoría (usuario, fecha y acción). |
| Casos de Uso Padre |
| Ninguno |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 31


---

## Página 32

                      CU007: Gestionar cronogramas de pago y financiamiento
                                    Permite al Asesor Comercial configurar, estructurar y
                                    editar los compromisos financieros y los hitos de
                                    desembolso por unidad inmobiliaria. El sistema adapta la
                      Descripción   interfaz según la modalidad de financiamiento
                                    seleccionada (Crédito Directo o Crédito Hipotecario) ,
                                    alimentando el Resumen de Pagos y el Estado de Cuenta
                                    que el comprador visualizará en su portal.
                      Actores       Asesor Comercial


### Tablas de la página


#### Tabla 1

| Descripción | Permite al Asesor Comercial configurar, estructurar y<br>editar los compromisos financieros y los hitos de<br>desembolso por unidad inmobiliaria. El sistema adapta la<br>interfaz según la modalidad de financiamiento<br>seleccionada (Crédito Directo o Crédito Hipotecario) ,<br>alimentando el Resumen de Pagos y el Estado de Cuenta<br>que el comprador visualizará en su portal. |
| --- | --- |
| Actores | Asesor Comercial |


---

## Página 33

                      Precondiciones
                         - El Asesor debe estar autenticado en el Portal Empresa.
                         - El cliente debe tener al menos una unidad inmobiliaria asignada (en
                           estado "Separado" o "Vendido").
                         - El tipo de financiamiento debe estar predefinido para la unidad.
                      Flujo Básico
                         1. El usuario hace clic en "Pagos y Cronogramas" en el sidebar. El sistema
                           muestra un asistente de gestión de pagos de 3 pasos.
                         2. Paso 1 — Buscar Cliente: El usuario escribe en el campo de búsqueda
                           (nombre, DNI o email). El sistema muestra resultados como tarjetas
                           clickeables con avatar, iniciales, nombre, documento, correo y badge de
                           estado. El usuario hace clic en un cliente.
                         3. Paso 2 — Seleccionar Contrato: El sistema muestra el cliente
                           seleccionado y lista los contratos activos consultados del backend. Cada
                           tarjeta de contrato muestra: identificador del contrato, unidad, proyecto,
                           piso, tipo de financiamiento. El usuario hace clic en un contrato.
                         4. Paso 3 — Gestión de Pagos: El sistema carga los datos financieros de la
                           unidad. En base al tipo de financiamiento se muestra:
                              a. Crédito directo: muestra el resumen de saldos (Total Pactado,
                                Total Pagado, Saldo Pendiente, Próximo Vencimiento) con badge
                                de estado global (Al día/En riesgo/En mora/Liquidado. Asimismo,
                                muestra la tabla de cuotas con acciones por fila (marcar pagado,
                                editar, subir comprobante, descargar voucher, eliminar). Cada
                                registro de pago contempla: número, concepto, vencimiento,
                                monto, estado, acciones.
                              b. Para Crédito Hipotecario, se pide completar un formulario donde
                                se detalla el monto pactado, el pago de separación, pago inicial.
                                Al registrar esta información se genera el cronograma de pagos
                                donde se muestra cada cuota correspondiente a este tipo de
                                crédito. Además, esta etapa muestra una serie de hitos
                                correspondientes al proceso de pago por crédito hipotecario.
                      Flujo Alternativo
                      Configurar cronograma de cuotas
                      En el paso 4.a, en la vista de Crédito Directo, si no existe cronograma el usuario
                      completa el formulario inline (Total Pactado, Cuota Inicial, monto de separación, N°
                      Cuotas) para crearlo. Si ya existe, puede hacer clic en "Editar" para modificarlo. Al
                      crear se genera la tabla de pagos de manera automática dividiendo el monto entre
                      las cuotas, luego se puede editar si el usuario lo desea.
                      Registrar pago de cuota
                      En el paso 4, en la tabla de cuotas, el usuario puede marcar una cuota como
                      "Pagado", subir un comprobante (auto-marca la cuota como PAGADO en una sola
                      acción) que despliega un panel para dejar comentarios y adjuntar archivos.
                      Agregar, eliminar y editar cuota
                      El usuario hace clic en "+ Agregar Cuota" para añadir una nueva cuota al
                      cronograma, o en el botón de eliminar para remover una cuota existente.
                      Asimismo, se tiene un botón para editar la información de la cuota.
                      Post Condiciones
                         - Éxito: Las cuotas y el resumen de fechas/montos quedan registrados
                           correctamente en la base de datos y disponibles para el control del asesor
                           y lectura del cliente.


### Tablas de la página


#### Tabla 1

| Precondiciones |
| --- |
| - El Asesor debe estar autenticado en el Portal Empresa.<br>- El cliente debe tener al menos una unidad inmobiliaria asignada (en<br>estado "Separado" o "Vendido").<br>- El tipo de financiamiento debe estar predefinido para la unidad. |
| Flujo Básico |
| 1. El usuario hace clic en "Pagos y Cronogramas" en el sidebar. El sistema<br>muestra un asistente de gestión de pagos de 3 pasos.<br>2. Paso 1 — Buscar Cliente: El usuario escribe en el campo de búsqueda<br>(nombre, DNI o email). El sistema muestra resultados como tarjetas<br>clickeables con avatar, iniciales, nombre, documento, correo y badge de<br>estado. El usuario hace clic en un cliente.<br>3. Paso 2 — Seleccionar Contrato: El sistema muestra el cliente<br>seleccionado y lista los contratos activos consultados del backend. Cada<br>tarjeta de contrato muestra: identificador del contrato, unidad, proyecto,<br>piso, tipo de financiamiento. El usuario hace clic en un contrato.<br>4. Paso 3 — Gestión de Pagos: El sistema carga los datos financieros de la<br>unidad. En base al tipo de financiamiento se muestra:<br>a. Crédito directo: muestra el resumen de saldos (Total Pactado,<br>Total Pagado, Saldo Pendiente, Próximo Vencimiento) con badge<br>de estado global (Al día/En riesgo/En mora/Liquidado. Asimismo,<br>muestra la tabla de cuotas con acciones por fila (marcar pagado,<br>editar, subir comprobante, descargar voucher, eliminar). Cada<br>registro de pago contempla: número, concepto, vencimiento,<br>monto, estado, acciones.<br>b. Para Crédito Hipotecario, se pide completar un formulario donde<br>se detalla el monto pactado, el pago de separación, pago inicial.<br>Al registrar esta información se genera el cronograma de pagos<br>donde se muestra cada cuota correspondiente a este tipo de<br>crédito. Además, esta etapa muestra una serie de hitos<br>correspondientes al proceso de pago por crédito hipotecario. |
| Flujo Alternativo |
| Configurar cronograma de cuotas |
| En el paso 4.a, en la vista de Crédito Directo, si no existe cronograma el usuario<br>completa el formulario inline (Total Pactado, Cuota Inicial, monto de separación, N°<br>Cuotas) para crearlo. Si ya existe, puede hacer clic en "Editar" para modificarlo. Al<br>crear se genera la tabla de pagos de manera automática dividiendo el monto entre<br>las cuotas, luego se puede editar si el usuario lo desea. |
| Registrar pago de cuota |
| En el paso 4, en la tabla de cuotas, el usuario puede marcar una cuota como<br>"Pagado", subir un comprobante (auto-marca la cuota como PAGADO en una sola<br>acción) que despliega un panel para dejar comentarios y adjuntar archivos. |
| Agregar, eliminar y editar cuota |
| El usuario hace clic en "+ Agregar Cuota" para añadir una nueva cuota al<br>cronograma, o en el botón de eliminar para remover una cuota existente.<br>Asimismo, se tiene un botón para editar la información de la cuota. |
| Post Condiciones |
| - Éxito: Las cuotas y el resumen de fechas/montos quedan registrados<br>correctamente en la base de datos y disponibles para el control del asesor<br>y lectura del cliente. |


---

## Página 34

                         - Fallo: No se guardan modificaciones en la base de datos y se mantiene
                           intacta la estructura financiera previa.
                      Restricciones
                         - IIndependencia por contrato: Los cronogramas se gestionan de forma
                           estrictamente separada por cada contrato, incluso si pertenecen al mismo
                           comprador.
                      Casos de Uso Padre
                      Diagrama de caso de uso
                      Prototipo


### Tablas de la página


#### Tabla 1

| - Fallo: No se guardan modificaciones en la base de datos y se mantiene<br>intacta la estructura financiera previa. |
| --- |
| Restricciones |
| - IIndependencia por contrato: Los cronogramas se gestionan de forma<br>estrictamente separada por cada contrato, incluso si pertenecen al mismo<br>comprador. |
| Casos de Uso Padre |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 35


---

## Página 36

                      CU008: Agendar eventos y citas
                                    Permite al equipo de Postventa programar, coordinar y
                                    formalizar las citas clave del proceso de entrega de la
                      Descripción   unidad (como la "Confirmación de fecha de entrega" y la
                                    entrega de llaves). El sistema registra el evento de forma
                                    interna y lo sincroniza con la agenda personal del cliente.
                      Actores       Equipo operativo
                      Precondiciones
                         - Usuario autenticado
                         - El cliente debe tener al menos una unidad inmobiliaria vinculada.
                      Flujo Básico
                         1. El usuario hace clic en "Agenda y Citas" en el sidebar. El sistema carga
                           muestra la vista de agenda con un calendario mensual interactivo y panel
                           lateral.
                         2. Calendario mensual: El sistema renderiza un grid de 7 columnas con
                           navegación. Cada celda de día muestra el número y eventos.
                         3. Ver detalle — Modal: El usuario hace clic en un evento. Se abre modal de
                           detalle con: título, estado (PROGRAMADA, CONFIRMADA,
                           CANCELADA, COMPLETADA, REPROGRAMACION PENDIENTE),
                           cliente, unidad, fecha/hora, lugar, estado de confirmación del cliente.


### Tablas de la página


#### Tabla 1

| Descripción | Permite al equipo de Postventa programar, coordinar y<br>formalizar las citas clave del proceso de entrega de la<br>unidad (como la "Confirmación de fecha de entrega" y la<br>entrega de llaves). El sistema registra el evento de forma<br>interna y lo sincroniza con la agenda personal del cliente. |
| --- | --- |
| Actores | Equipo operativo |
| Precondiciones |  |
| - Usuario autenticado<br>- El cliente debe tener al menos una unidad inmobiliaria vinculada. |  |
| Flujo Básico |  |
| 1. El usuario hace clic en "Agenda y Citas" en el sidebar. El sistema carga<br>muestra la vista de agenda con un calendario mensual interactivo y panel<br>lateral.<br>2. Calendario mensual: El sistema renderiza un grid de 7 columnas con<br>navegación. Cada celda de día muestra el número y eventos.<br>3. Ver detalle — Modal: El usuario hace clic en un evento. Se abre modal de<br>detalle con: título, estado (PROGRAMADA, CONFIRMADA,<br>CANCELADA, COMPLETADA, REPROGRAMACION PENDIENTE),<br>cliente, unidad, fecha/hora, lugar, estado de confirmación del cliente. |  |


---

## Página 37

                      Flujo Alternativo
                      Crear nueva cita
                      El usuario hace clic en "Nueva cita" o en una celda vacía del calendario. Se abre
                      modal con formulario: Cliente (selector de usuarios filtrado a clientes), Unidad
                      Vinculada (cargada dinámicamente según los expedientes del cliente), Tipo de
                      Evento (select con 8 tipos: Confirmación fecha de entrega, Entrega de llaves,
                      Revisión de observaciones, Firma de Minuta, Firma de Escritura, Inspección de
                      obra, Junta de propietarios, Otro), Día Protocolar (date), Hora Inicio/Fin (time),
                      Lugar (text, default "Oficina Principal") y boton para permitir reprogramación. El
                      usuario hace clic en "Guardar y sincronizar calendario".
                      Editar cita
                      Desde el modal de detalle, el usuario hace clic en "Editar". El formulario permite
                      modificar título, descripción, lugar, fecha, hora, estado y toggle permitir
                      reprogramación. Guarda mediante la actualización de la cita.
                      Cancelar cita
                      Desde el modal de detalle, el usuario hace clic en "Cancelar Cita". Se despliega
                      campo inline para "Motivo de cancelación". Confirma y se cancela la cita.
                      Confirmar reprogramación
                      Si la cita está en estado REPROGRAMACION PENDIENTE, el modal de detalle
                      muestra los bloques de disponibilidad propuestos por el cliente con botones
                      "Confirmar" para aceptar el bloque seleccionado.
                      Post Condiciones
                         - Éxito: El evento queda registrado en el Backoffice y en el panel del
                           cliente. El comprador recibe la notificación nativa de Google para aceptar
                           o rechazar la cita.
                         - Fallo: La transacción se cancela, el horario permanece libre y no se altera
                           la base de datos ni las agendas.
                      Restricciones
                         - Consistencia Cronológica: No se permite el agendamiento de citas en
                           fechas o de horas pasadas.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso
                      Prototipo


### Tablas de la página


#### Tabla 1

| Flujo Alternativo |
| --- |
| Crear nueva cita |
| El usuario hace clic en "Nueva cita" o en una celda vacía del calendario. Se abre<br>modal con formulario: Cliente (selector de usuarios filtrado a clientes), Unidad<br>Vinculada (cargada dinámicamente según los expedientes del cliente), Tipo de<br>Evento (select con 8 tipos: Confirmación fecha de entrega, Entrega de llaves,<br>Revisión de observaciones, Firma de Minuta, Firma de Escritura, Inspección de<br>obra, Junta de propietarios, Otro), Día Protocolar (date), Hora Inicio/Fin (time),<br>Lugar (text, default "Oficina Principal") y boton para permitir reprogramación. El<br>usuario hace clic en "Guardar y sincronizar calendario". |
| Editar cita |
| Desde el modal de detalle, el usuario hace clic en "Editar". El formulario permite<br>modificar título, descripción, lugar, fecha, hora, estado y toggle permitir<br>reprogramación. Guarda mediante la actualización de la cita. |
| Cancelar cita |
| Desde el modal de detalle, el usuario hace clic en "Cancelar Cita". Se despliega<br>campo inline para "Motivo de cancelación". Confirma y se cancela la cita. |
| Confirmar reprogramación |
| Si la cita está en estado REPROGRAMACION PENDIENTE, el modal de detalle<br>muestra los bloques de disponibilidad propuestos por el cliente con botones<br>"Confirmar" para aceptar el bloque seleccionado. |
| Post Condiciones |
| - Éxito: El evento queda registrado en el Backoffice y en el panel del<br>cliente. El comprador recibe la notificación nativa de Google para aceptar<br>o rechazar la cita.<br>- Fallo: La transacción se cancela, el horario permanece libre y no se altera<br>la base de datos ni las agendas. |
| Restricciones |
| - Consistencia Cronológica: No se permite el agendamiento de citas en<br>fechas o de horas pasadas. |
| Casos de Uso Padre |
| Ninguno |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 38

                      CU009: Autenticar usuario cliente
                                    Este caso de uso permite a un cliente iniciar sesión en el
                                    Portal Cliente. El sistema valida las credenciales y evalúa
                                    la etapa del proceso en la que se encuentra el cliente para
                      Descripción   determinar el nivel de acceso al Dashboard: si la etapa de
                                    separación está en curso, se despliega el 'Modo de
                                    Espera'; si la separación ha concluido, se habilita el
                                    acceso completo.
                                    Cliente
                      Actores
                                    Firebase Authentication


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite a un cliente iniciar sesión en el<br>Portal Cliente. El sistema valida las credenciales y evalúa<br>la etapa del proceso en la que se encuentra el cliente para<br>determinar el nivel de acceso al Dashboard: si la etapa de<br>separación está en curso, se despliega el 'Modo de<br>Espera'; si la separación ha concluido, se habilita el<br>acceso completo. |
| --- | --- |
| Actores | Cliente<br>Firebase Authentication |


---

## Página 39

                      Precondiciones
                         - El Portal Cliente se encuentra operativo y renderizado en el navegador del
                           usuario.
                         - El cliente cuenta con un perfil registrado en la base de datos de la
                           empresa y una cuenta activa en el servicio de autenticación; en caso de
                           no utilizar una cuenta de Google, el cliente debe haber configurado su
                           contraseña previamente.
                      Flujo Básico
                         1. El Cliente accede a la URL base del portal.
                         2. El sistema despliega la pantalla de inicio de sesión dividida en dos
                           secciones.
                         3. En el panel lateral izquierdo, el sistema muestra el título "Tu inversión,
                           siempre visible." acompañado del mensaje descriptivo: "Accede a tu portal
                           exclusivo para seguir el avance de tu propiedad, gestionar tus pagos y
                           revisar toda tu documentación en un solo lugar."
                         4. En el panel derecho, el sistema muestra el título "Inicia sesión" junto con
                           la instrucción: "Revisa tu correo: usa el enlace que te enviamos para crear
                           tu contraseña e iniciar sesión."
                         5. El Cliente ingresa su correo en el campo de texto etiquetado como
                           "Correo electrónico" (cuyo texto de relleno es "usuario@correo.com").
                         6. El Cliente ingresa su clave en el campo de texto etiquetado como
                           "Contraseña" (cuyo texto de relleno o placeholder es "••••••••").
                         7. El Cliente hace clic en el botón principal "Acceder".
                         8. El sistema oculta el texto del botón y en su lugar muestra un icono circular
                           animado de carga (spinner) para indicar el procesamiento.
                         9. El sistema valida las credenciales a través del servicio de autenticación.
                         10. Tras la validación exitosa de identidad, el sistema consulta los registros
                           internos para verificar el perfil del cliente y el estado comercial de su
                           propiedad vinculada.
                         11. El sistema muestra una pantalla de transición con el texto "Cargando..."
                           mientras resuelve los accesos correspondientes.
                         12. El sistema redirige al Cliente al panel principal (Dashboard).
                      Flujo Alternativo
                      Credenciales inválidas
                         1. En el paso 9, si el servicio rechaza la autenticación por datos inválidos, el
                           sistema detiene el icono de carga en el botón y despliega la alerta literal:
                           "Correo o contraseña incorrectos. Verifica tus credenciales." El flujo se
                           detiene a la espera de un nuevo intento del Cliente.
                      Cuenta Suspendida / Deshabilitada:
                         1. En el paso 9, si el sistema detecta que el acceso del usuario fue revocado
                           o suspendido, despliega la alerta literal: "Esta cuenta ha sido
                           deshabilitada. Contacta con tu asesor."
                      Recuperación de contraseña
                         1. En el paso 7, el Cliente hace clic en el enlace "¿Olvidaste tu
                           contraseña?". El sistema lo redirige a la vista de recuperación, la cual
                           muestra el título "Restablecer contraseña" y un botón para "Enviar enlace
                           de recuperación".
                      Cuenta No Registrada en la Empresa:
                         En el paso 10, si la identidad es válida pero el correo no está asociado a
                           ninguna propiedad o registro en la inmobiliaria, el sistema despliega la


### Tablas de la página


#### Tabla 1

| Precondiciones |
| --- |
| - El Portal Cliente se encuentra operativo y renderizado en el navegador del<br>usuario.<br>- El cliente cuenta con un perfil registrado en la base de datos de la<br>empresa y una cuenta activa en el servicio de autenticación; en caso de<br>no utilizar una cuenta de Google, el cliente debe haber configurado su<br>contraseña previamente. |
| Flujo Básico |
| 1. El Cliente accede a la URL base del portal.<br>2. El sistema despliega la pantalla de inicio de sesión dividida en dos<br>secciones.<br>3. En el panel lateral izquierdo, el sistema muestra el título "Tu inversión,<br>siempre visible." acompañado del mensaje descriptivo: "Accede a tu portal<br>exclusivo para seguir el avance de tu propiedad, gestionar tus pagos y<br>revisar toda tu documentación en un solo lugar."<br>4. En el panel derecho, el sistema muestra el título "Inicia sesión" junto con<br>la instrucción: "Revisa tu correo: usa el enlace que te enviamos para crear<br>tu contraseña e iniciar sesión."<br>5. El Cliente ingresa su correo en el campo de texto etiquetado como<br>"Correo electrónico" (cuyo texto de relleno es "usuario@correo.com").<br>6. El Cliente ingresa su clave en el campo de texto etiquetado como<br>"Contraseña" (cuyo texto de relleno o placeholder es "••••••••").<br>7. El Cliente hace clic en el botón principal "Acceder".<br>8. El sistema oculta el texto del botón y en su lugar muestra un icono circular<br>animado de carga (spinner) para indicar el procesamiento.<br>9. El sistema valida las credenciales a través del servicio de autenticación.<br>10. Tras la validación exitosa de identidad, el sistema consulta los registros<br>internos para verificar el perfil del cliente y el estado comercial de su<br>propiedad vinculada.<br>11. El sistema muestra una pantalla de transición con el texto "Cargando..."<br>mientras resuelve los accesos correspondientes.<br>12. El sistema redirige al Cliente al panel principal (Dashboard). |
| Flujo Alternativo |
| Credenciales inválidas |
| 1. En el paso 9, si el servicio rechaza la autenticación por datos inválidos, el<br>sistema detiene el icono de carga en el botón y despliega la alerta literal:<br>"Correo o contraseña incorrectos. Verifica tus credenciales." El flujo se<br>detiene a la espera de un nuevo intento del Cliente. |
| Cuenta Suspendida / Deshabilitada: |
| 1. En el paso 9, si el sistema detecta que el acceso del usuario fue revocado<br>o suspendido, despliega la alerta literal: "Esta cuenta ha sido<br>deshabilitada. Contacta con tu asesor." |
| Recuperación de contraseña |
| 1. En el paso 7, el Cliente hace clic en el enlace "¿Olvidaste tu<br>contraseña?". El sistema lo redirige a la vista de recuperación, la cual<br>muestra el título "Restablecer contraseña" y un botón para "Enviar enlace<br>de recuperación". |
| Cuenta No Registrada en la Empresa: |
| En el paso 10, si la identidad es válida pero el correo no está asociado a<br>ninguna propiedad o registro en la inmobiliaria, el sistema despliega la |


---

## Página 40

                           alerta literal: "Tu cuenta no está registrada en el sistema. Contacta con tu
                           asesor de Llosa Edificaciones."
                      Post Condiciones
                         - El Cliente posee una sesión activa y segura en el navegador.
                         - El Cliente es redirigido a las vistas protegidas del portal según las reglas
                           de negocio de su estado comercial actual.
                      Restricciones
                         - El acceso al portal de clientes es estrictamente por invitación (no existe el
                           "auto-registro" público).
                         - La gestión de contraseñas, encriptación, tokens y recuperación depende
                           íntegramente de las políticas de seguridad de Firebase Authentication.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso
                      Prototipo


### Tablas de la página


#### Tabla 1

| alerta literal: "Tu cuenta no está registrada en el sistema. Contacta con tu<br>asesor de Llosa Edificaciones." |
| --- |
| Post Condiciones |
| - El Cliente posee una sesión activa y segura en el navegador.<br>- El Cliente es redirigido a las vistas protegidas del portal según las reglas<br>de negocio de su estado comercial actual. |
| Restricciones |
| - El acceso al portal de clientes es estrictamente por invitación (no existe el<br>"auto-registro" público).<br>- La gestión de contraseñas, encriptación, tokens y recuperación depende<br>íntegramente de las políticas de seguridad de Firebase Authentication. |
| Casos de Uso Padre |
| Ninguno |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 41

                      CU010: Consultar Inicio / Panel Principal
                                    Este caso de uso permite al cliente autenticado visualizar
                                    un resumen consolidado de su inmueble desde la pantalla
                                    principal. El panel actúa como un orquestador inteligente
                                    que evalúa matemáticamente el porcentaje de progreso
                                    legal del expediente para decidir si renderiza el acceso
                      Descripción
                                    total o restringe la vista a un "Modo de Espera". Además,
                                    ejecuta peticiones asíncronas en segundo plano para
                                    recuperar datos financieros (tipo de crédito, cronograma) y
                                    recursos multimedia sin interrumpir la navegación del
                                    cliente con pantallas de carga invasivas.
                                    Cliente
                      Actores
                                    Sistema (Backend / API)
                      Precondiciones
                         - El cliente debe estar autenticado
                         - El cliente debe encontrarse en la ruta principal del panel de control.
                      Flujo Básico
                         1. El Cliente accede a la vista del panel principal.
                         2. El sistema evalúa silenciosamente el porcentaje de progreso legal del
                           cliente.
                         3. El sistema ejecuta consultas asíncronas en segundo plano para obtener el
                           esquema financiero y el enlace del recorrido virtual.
                         4. El sistema, al confirmar un porcentaje de avance legal válido, renderiza la
                           cabecera mostrando el saludo: "Bienvenido, [Nombre] [Apellido]".
                         5. En la barra superior, el sistema muestra el selector de inmueble activo con
                           el formato literal: "[TipoAbreviado] [Número] · [NombreProyecto]".
                         6. El sistema muestra la tarjeta de trámites legales con el título "El camino
                           hacia tu nuevo hogar".
                         7. El sistema muestra el bloque de progreso constructivo bajo los títulos
                           "Evolución de la Construcción" y "Avance de la etapa".
                         8. El sistema despliega el resumen financiero con el título "Gestión
                           Financiera", detallando el "Próximo Pago", el "Monto por regularizar" y la
                           "Fecha de Vencimiento".
                         9. El sistema completa la pantalla renderizando los indicadores globales:
                           "Total Pagado", "Por Pagar" y "Progreso Financiero".
                      Flujo Alternativo


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite al cliente autenticado visualizar<br>un resumen consolidado de su inmueble desde la pantalla<br>principal. El panel actúa como un orquestador inteligente<br>que evalúa matemáticamente el porcentaje de progreso<br>legal del expediente para decidir si renderiza el acceso<br>total o restringe la vista a un "Modo de Espera". Además,<br>ejecuta peticiones asíncronas en segundo plano para<br>recuperar datos financieros (tipo de crédito, cronograma) y<br>recursos multimedia sin interrumpir la navegación del<br>cliente con pantallas de carga invasivas. |
| --- | --- |
| Actores | Cliente<br>Sistema (Backend / API) |
| Precondiciones |  |
| - El cliente debe estar autenticado<br>- El cliente debe encontrarse en la ruta principal del panel de control. |  |
| Flujo Básico |  |
| 1. El Cliente accede a la vista del panel principal.<br>2. El sistema evalúa silenciosamente el porcentaje de progreso legal del<br>cliente.<br>3. El sistema ejecuta consultas asíncronas en segundo plano para obtener el<br>esquema financiero y el enlace del recorrido virtual.<br>4. El sistema, al confirmar un porcentaje de avance legal válido, renderiza la<br>cabecera mostrando el saludo: "Bienvenido, [Nombre] [Apellido]".<br>5. En la barra superior, el sistema muestra el selector de inmueble activo con<br>el formato literal: "[TipoAbreviado] [Número] · [NombreProyecto]".<br>6. El sistema muestra la tarjeta de trámites legales con el título "El camino<br>hacia tu nuevo hogar".<br>7. El sistema muestra el bloque de progreso constructivo bajo los títulos<br>"Evolución de la Construcción" y "Avance de la etapa".<br>8. El sistema despliega el resumen financiero con el título "Gestión<br>Financiera", detallando el "Próximo Pago", el "Monto por regularizar" y la<br>"Fecha de Vencimiento".<br>9. El sistema completa la pantalla renderizando los indicadores globales:<br>"Total Pagado", "Por Pagar" y "Progreso Financiero". |  |
| Flujo Alternativo |  |


---

## Página 42

                      Restricción por Modo de Espera
                         1. En el paso 2, si el sistema detecta que el porcentaje legal indica un
                           estado de "Separado", interrumpe el flujo normal. Cambia el saludo a
                           "¡Bienvenido, [Nombre] [Apellido]!" y bloquea la pantalla, mostrando el
                           título "Portal en fase de activación", con el mensaje "Tu expediente está
                           siendo revisado por nuestro equipo administrativo." y el aviso "Acceso
                           total habilitado tras completar tu Ficha del cliente."
                      Interacción con Selector de Inmuebles
                         1. En el paso 5, el Cliente hace clic en el selector de unidad. El sistema
                           despliega el menú "Mis Unidades Inmobiliarias". Al seleccionar otra
                           propiedad, el sistema reinicia las consultas en segundo plano (paso 3) sin
                           bloquear la pantalla y actualiza los indicadores.
                      Fallo de Carga Parcial (Fondo)
                         1. En el paso 3, si fallan las peticiones en segundo plano, el sistema no
                           interrumpe el uso; simplemente muestra un estado neutro en la tarjeta
                           específica afectada, renderizando la alerta "Información no disponible
                           temporalmente" y el mensaje "No se pudo cargar el detalle de tu unidad.
                           El resto del portal sigue operativo. Intenta refrescar la página."
                      Fallo por Sin Unidades Asignadas
                         1. Si el cliente no posee inmuebles, el sistema muestra el título "Sin
                           unidades asignadas" y el mensaje "No se encontraron unidades
                           inmobiliarias vinculadas a tu perfil. Comunícate con tu asesor."
                      Fallo por Acceso Restringido
                         1. Si el backend deniega los permisos de lectura, el sistema muestra el título
                           "Acceso restringido" y el mensaje "Tu cuenta no cuenta con los permisos
                           necesarios para visualizar la información de tus unidades. Por favor,
                           contacta a tu asesor para solicitar acceso."
                      Post Condiciones
                         - Éxito: El cliente visualiza su resumen patrimonial actualizado o la pantalla
                           restrictiva correspondiente a su estado legal.
                         - Fallo: El sistema oculta la información y renderiza los textos literales de
                           estado vacío o error.
                      Restricciones
                         - Estricto Sólo Lectura: Toda la experiencia de este flujo es puramente
                           informativa. El sistema no provee herramientas para modificar estados,
                           editar datos, eliminar registros ni cargar archivos por parte del comprador.
                         - Aislamiento y Privacidad: El backend válida rigurosamente en cada
                           petición que el identificador de la unidad consultada pertenezca de forma
                           estricta al cliente autenticado.
                         - Filtro Constructivo de Nivel: El módulo de avance del proyecto restringe la
                           información técnica de acabados e interiores exclusivamente al número
                           de piso contratado por el cliente, ocultando el progreso detallado de otros
                           niveles.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| Restricción por Modo de Espera |
| --- |
| 1. En el paso 2, si el sistema detecta que el porcentaje legal indica un<br>estado de "Separado", interrumpe el flujo normal. Cambia el saludo a<br>"¡Bienvenido, [Nombre] [Apellido]!" y bloquea la pantalla, mostrando el<br>título "Portal en fase de activación", con el mensaje "Tu expediente está<br>siendo revisado por nuestro equipo administrativo." y el aviso "Acceso<br>total habilitado tras completar tu Ficha del cliente." |
| Interacción con Selector de Inmuebles |
| 1. En el paso 5, el Cliente hace clic en el selector de unidad. El sistema<br>despliega el menú "Mis Unidades Inmobiliarias". Al seleccionar otra<br>propiedad, el sistema reinicia las consultas en segundo plano (paso 3) sin<br>bloquear la pantalla y actualiza los indicadores. |
| Fallo de Carga Parcial (Fondo) |
| 1. En el paso 3, si fallan las peticiones en segundo plano, el sistema no<br>interrumpe el uso; simplemente muestra un estado neutro en la tarjeta<br>específica afectada, renderizando la alerta "Información no disponible<br>temporalmente" y el mensaje "No se pudo cargar el detalle de tu unidad.<br>El resto del portal sigue operativo. Intenta refrescar la página." |
| Fallo por Sin Unidades Asignadas |
| 1. Si el cliente no posee inmuebles, el sistema muestra el título "Sin<br>unidades asignadas" y el mensaje "No se encontraron unidades<br>inmobiliarias vinculadas a tu perfil. Comunícate con tu asesor." |
| Fallo por Acceso Restringido |
| 1. Si el backend deniega los permisos de lectura, el sistema muestra el título<br>"Acceso restringido" y el mensaje "Tu cuenta no cuenta con los permisos<br>necesarios para visualizar la información de tus unidades. Por favor,<br>contacta a tu asesor para solicitar acceso." |
| Post Condiciones |
| - Éxito: El cliente visualiza su resumen patrimonial actualizado o la pantalla<br>restrictiva correspondiente a su estado legal.<br>- Fallo: El sistema oculta la información y renderiza los textos literales de<br>estado vacío o error. |
| Restricciones |
| - Estricto Sólo Lectura: Toda la experiencia de este flujo es puramente<br>informativa. El sistema no provee herramientas para modificar estados,<br>editar datos, eliminar registros ni cargar archivos por parte del comprador.<br>- Aislamiento y Privacidad: El backend válida rigurosamente en cada<br>petición que el identificador de la unidad consultada pertenezca de forma<br>estricta al cliente autenticado.<br>- Filtro Constructivo de Nivel: El módulo de avance del proyecto restringe la<br>información técnica de acabados e interiores exclusivamente al número<br>de piso contratado por el cliente, ocultando el progreso detallado de otros<br>niveles. |
| Casos de Uso Padre |
| Ninguno |


---

## Página 43

                      Prototipo
                      CU011: Consultar Proceso de Separación
                                    Este caso de uso permite al cliente consultar el estatus
                                    detallado de la primera etapa legal de su compra (la
                                    Separación). Presenta una línea de tiempo secuencial con
                      Descripción
                                    estados visuales predefinidos y proporciona una interfaz
                                    para la previsualización y descarga de la documentación
                                    corporativa y recibos asociados a esta fase.
                                    Cliente
                      Actores
                                    Sistema
                      Precondiciones
                         - Cliente autenticado en el portal.


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


#### Tabla 2

| Descripción | Este caso de uso permite al cliente consultar el estatus<br>detallado de la primera etapa legal de su compra (la<br>Separación). Presenta una línea de tiempo secuencial con<br>estados visuales predefinidos y proporciona una interfaz<br>para la previsualización y descarga de la documentación<br>corporativa y recibos asociados a esta fase. |
| --- | --- |
| Actores | Cliente<br>Sistema |
| Precondiciones |  |
| - Cliente autenticado en el portal. |  |


---

## Página 44

                         - El cliente debe tener al menos una unidad inmobiliaria activa
                           seleccionada.
                         - El cliente debe encontrarse navegando en la vista de separación
                      Flujo Básico
                         1. El Cliente accede al módulo de separación.
                         2. El sistema valida el porcentaje de progreso de esta etapa.
                         3. El sistema muestra la cabecera con el subtítulo "Etapa 1 de 5" y el título
                           principal "¡Tu nuevo hogar ya está reservado!".
                         4. El sistema despliega la sección bajo el título "Progreso de la Etapa".
                         5. El sistema renderiza la secuencia de hitos en el siguiente orden estricto:
                           "Proforma", "Pago de separación", "Ficha del cliente", "Separación".
                         6. El sistema asigna un estado visual a cada hito (ej. "Completado", "En
                           curso", "Pendiente").
                         7. El sistema despliega la sección "Documentos de tu Separación", listando
                           las tarjetas de archivos disponibles.
                         8. El Cliente posiciona el cursor sobre los botones de interacción de un
                           documento.
                         9. El sistema revela los globos de texto (tooltips) con las opciones literales
                           "Previsualizar" y "Descargar".
                      Flujo Alternativo
                      Separación Completada al 100%
                         1. En el paso 2, si el sistema detecta que el progreso es total, interrumpe el
                           paso 3. Transforma la cabecera en un banner dorado con el título "Ya
                           aseguraste tu unidad" y el mensaje "Esto es tuyo. [Proyecto] — cada
                           detalle ha sido cuidado para ti.", marcando todos los hitos con la leyenda
                           "Completado".
                      Estado Vacío de Documentos
                         1. En el paso 7, si el sistema detecta que no existen archivos subidos por el
                           asesor, oculta la lista de tarjetas y muestra un contenedor con el ícono de
                           una carpeta abierta y el texto exacto: "No hay documentos disponibles en
                           esta etapa."
                      Visualización de Nota Corporativa
                         1. En el paso 7, si el documento cuenta con un mensaje adjunto del asesor,
                           el sistema renderiza un enlace textual adicional en la tarjeta que indica
                           "Ver nota corporativa".
                      Previsualización de Documento (Visor Nativo)
                         1. En el paso 9, el Cliente hace clic en "Previsualizar". El sistema abre un
                           modal interno y delega la renderización del archivo directamente al visor
                           nativo del navegador del cliente, sin mostrar mensajes propios de carga.
                      Descarga Exitosa
                         1. En el paso 9, el Cliente hace clic en "Descargar". El sistema inicia la
                           transferencia del archivo al dispositivo local.
                      Documento sin archivo asociado
                         1. En el paso 9, si el Cliente intenta interactuar con un documento que no
                           posee un enlace registrado en el sistema, la interfaz bloquea la acción y
                           muestra el mensaje "Documento no disponible" acompañado del texto "No
                           hay un archivo asociado a este documento."
                      Error en Descarga o Previsualización (Enlace roto/denegado)


### Tablas de la página


#### Tabla 1

| - El cliente debe tener al menos una unidad inmobiliaria activa<br>seleccionada.<br>- El cliente debe encontrarse navegando en la vista de separación |
| --- |
| Flujo Básico |
| 1. El Cliente accede al módulo de separación.<br>2. El sistema valida el porcentaje de progreso de esta etapa.<br>3. El sistema muestra la cabecera con el subtítulo "Etapa 1 de 5" y el título<br>principal "¡Tu nuevo hogar ya está reservado!".<br>4. El sistema despliega la sección bajo el título "Progreso de la Etapa".<br>5. El sistema renderiza la secuencia de hitos en el siguiente orden estricto:<br>"Proforma", "Pago de separación", "Ficha del cliente", "Separación".<br>6. El sistema asigna un estado visual a cada hito (ej. "Completado", "En<br>curso", "Pendiente").<br>7. El sistema despliega la sección "Documentos de tu Separación", listando<br>las tarjetas de archivos disponibles.<br>8. El Cliente posiciona el cursor sobre los botones de interacción de un<br>documento.<br>9. El sistema revela los globos de texto (tooltips) con las opciones literales<br>"Previsualizar" y "Descargar". |
| Flujo Alternativo |
| Separación Completada al 100% |
| 1. En el paso 2, si el sistema detecta que el progreso es total, interrumpe el<br>paso 3. Transforma la cabecera en un banner dorado con el título "Ya<br>aseguraste tu unidad" y el mensaje "Esto es tuyo. [Proyecto] — cada<br>detalle ha sido cuidado para ti.", marcando todos los hitos con la leyenda<br>"Completado". |
| Estado Vacío de Documentos |
| 1. En el paso 7, si el sistema detecta que no existen archivos subidos por el<br>asesor, oculta la lista de tarjetas y muestra un contenedor con el ícono de<br>una carpeta abierta y el texto exacto: "No hay documentos disponibles en<br>esta etapa." |
| Visualización de Nota Corporativa |
| 1. En el paso 7, si el documento cuenta con un mensaje adjunto del asesor,<br>el sistema renderiza un enlace textual adicional en la tarjeta que indica<br>"Ver nota corporativa". |
| Previsualización de Documento (Visor Nativo) |
| 1. En el paso 9, el Cliente hace clic en "Previsualizar". El sistema abre un<br>modal interno y delega la renderización del archivo directamente al visor<br>nativo del navegador del cliente, sin mostrar mensajes propios de carga. |
| Descarga Exitosa |
| 1. En el paso 9, el Cliente hace clic en "Descargar". El sistema inicia la<br>transferencia del archivo al dispositivo local. |
| Documento sin archivo asociado |
| 1. En el paso 9, si el Cliente intenta interactuar con un documento que no<br>posee un enlace registrado en el sistema, la interfaz bloquea la acción y<br>muestra el mensaje "Documento no disponible" acompañado del texto "No<br>hay un archivo asociado a este documento." |
| Error en Descarga o Previsualización (Enlace roto/denegado) |


---

## Página 45

                         1. En el paso 9, si el enlace existe pero el servidor deniega el acceso o está
                           caído, el sistema detiene el proceso silenciosamente y fuerza la apertura
                           del enlace en una nueva pestaña. El sistema delega la visualización del
                           error (ej. página no encontrada o acceso denegado) enteramente al
                           navegador web del cliente.
                      Post Condiciones
                         - Éxito: El cliente visualiza el progreso actualizado de su etapa de
                           separación y accede correctamente a la previsualización o descarga de
                           los documentos asociados. Fallo: El sistema no logra cargar los
                           documentos o el progreso, renderizando estados vacíos o delegando el
                           error de visualización al navegador web del cliente.
                      Restricciones
                         - La captura de errores por enlaces caídos escapa del control gráfico de la
                           interfaz; recae en el comportamiento nativo del navegador al abrir una
                           nueva pestaña.
                         - Seguridad y Privacidad: El cliente solo puede visualizar e interactuar con
                           los eventos y paneles de disponibilidad.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 1. En el paso 9, si el enlace existe pero el servidor deniega el acceso o está<br>caído, el sistema detiene el proceso silenciosamente y fuerza la apertura<br>del enlace en una nueva pestaña. El sistema delega la visualización del<br>error (ej. página no encontrada o acceso denegado) enteramente al<br>navegador web del cliente. |
| --- |
| Post Condiciones |
| - Éxito: El cliente visualiza el progreso actualizado de su etapa de<br>separación y accede correctamente a la previsualización o descarga de<br>los documentos asociados. Fallo: El sistema no logra cargar los<br>documentos o el progreso, renderizando estados vacíos o delegando el<br>error de visualización al navegador web del cliente. |
| Restricciones |
| - La captura de errores por enlaces caídos escapa del control gráfico de la<br>interfaz; recae en el comportamiento nativo del navegador al abrir una<br>nueva pestaña.<br>- Seguridad y Privacidad: El cliente solo puede visualizar e interactuar con<br>los eventos y paneles de disponibilidad. |
| Casos de Uso Padre |
| Ninguno |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 46

                      Prototipo
                      CU012: Consultar Contrato
                                    Este caso de uso permite al cliente consultar el estatus
                                    detallado de la segunda etapa de su proceso de compra
                                    (Contrato). El sistema presenta una línea de tiempo del
                                    proceso de firma, la gestión de documentos contractuales
                      Descripción
                                    y, adicionalmente, despliega dos contenedores
                                    informativos clave: los datos de validación del contrato y el
                                    desglose de todas las unidades inmobiliarias vinculadas a
                                    dicha transacción comercial.


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


#### Tabla 2

| Descripción | Este caso de uso permite al cliente consultar el estatus<br>detallado de la segunda etapa de su proceso de compra<br>(Contrato). El sistema presenta una línea de tiempo del<br>proceso de firma, la gestión de documentos contractuales<br>y, adicionalmente, despliega dos contenedores<br>informativos clave: los datos de validación del contrato y el<br>desglose de todas las unidades inmobiliarias vinculadas a<br>dicha transacción comercial. |
| --- | --- |


---

## Página 47

                                    Cliente
                      Actores
                                    Sistema
                      Precondiciones
                         - Cliente autenticado en el portal.
                         - El cliente debe tener al menos una unidad inmobiliaria activa
                           seleccionada.
                         - El cliente debe encontrarse navegando en la vista del módulo de contrato
                      Flujo Básico
                         1. El Cliente accede a la pestaña de contrato.
                         2. El sistema valida la información del expediente y renderiza la cabecera
                           estática con el subtítulo "Etapa 2 de 5" y el título principal "¡Estás a un
                           paso de formalizar tu compra!".
                         3. El sistema muestra el párrafo descriptivo: "En esta etapa avanzamos con
                           la revisión y firma de los documentos contractuales de tu unidad. Aquí
                           encontrarás toda la documentación necesaria para que puedas revisar las
                           condiciones de compra con claridad y continuar el proceso con
                           confianza."
                         4. El sistema despliega la sección "Progreso de la Etapa" y renderiza la
                           secuencia de hitos, asignando un estado visual ("Completado", "En curso"
                           o "Pendiente") a cada uno de los siguientes ítems:
                              a. Separación
                              b. Revisión del contrato
                              c. Aprobación del contrato.
                              d. Cuota Inicial
                              e. Firma del Contrato
                         5. El sistema despliega la tarjeta "Información del Contrato", mostrando los
                           indicadores de "Firma de contrato" (fecha) y "Modalidad de Pago".
                         6. El sistema despliega el componente "Unidades del Contrato", encabezado
                           por el "Resumen del Contrato", el cual totaliza los indicadores: "Total
                           Unidades", "Área ocupada total", y la cantidad de "Departamentos" y
                           "Estacionamientos".
                         7. El sistema renderiza una tarjeta de desglose por cada inmueble asociado,
                           detallando su "Área ocupada", su "Aporte al contrato" y el "Precio Total".
                         8. El sistema despliega la sección "Documentos de tu Contrato", listando los
                           archivos adjuntos de forma paginada, con una extensión máxima de 4
                           documentos por página.
                         9. El Cliente interactúa con los documentos seleccionando "Previsualizar" o
                           "Descargar".
                      Flujo Alternativo
                      Progreso al 100%
                         1. A diferencia de otras etapas, si el sistema detecta que el contrato está
                           completamente firmado, no altera la interfaz gráfica principal. Mantiene la
                           cabecera y el título intactos, limitándose a marcar todos los hitos del
                           progreso como completados.
                      Estado Vacío de Documentos
                         1. En el paso 8, si no existen archivos subidos por el asesor legal, el sistema
                           muestra el contenedor vacío con el texto exacto: "No hay documentos
                           disponibles en esta etapa."
                      Interacción con Documentos
                         1. Al igual que en la etapa de separación, las acciones de previsualizar,
                           descargar y el manejo de errores (como enlaces caídos o archivos


### Tablas de la página


#### Tabla 1

| Actores | Cliente<br>Sistema |
| --- | --- |
| Precondiciones |  |
| - Cliente autenticado en el portal.<br>- El cliente debe tener al menos una unidad inmobiliaria activa<br>seleccionada.<br>- El cliente debe encontrarse navegando en la vista del módulo de contrato |  |
| Flujo Básico |  |
| 1. El Cliente accede a la pestaña de contrato.<br>2. El sistema valida la información del expediente y renderiza la cabecera<br>estática con el subtítulo "Etapa 2 de 5" y el título principal "¡Estás a un<br>paso de formalizar tu compra!".<br>3. El sistema muestra el párrafo descriptivo: "En esta etapa avanzamos con<br>la revisión y firma de los documentos contractuales de tu unidad. Aquí<br>encontrarás toda la documentación necesaria para que puedas revisar las<br>condiciones de compra con claridad y continuar el proceso con<br>confianza."<br>4. El sistema despliega la sección "Progreso de la Etapa" y renderiza la<br>secuencia de hitos, asignando un estado visual ("Completado", "En curso"<br>o "Pendiente") a cada uno de los siguientes ítems:<br>a. Separación<br>b. Revisión del contrato<br>c. Aprobación del contrato.<br>d. Cuota Inicial<br>e. Firma del Contrato<br>5. El sistema despliega la tarjeta "Información del Contrato", mostrando los<br>indicadores de "Firma de contrato" (fecha) y "Modalidad de Pago".<br>6. El sistema despliega el componente "Unidades del Contrato", encabezado<br>por el "Resumen del Contrato", el cual totaliza los indicadores: "Total<br>Unidades", "Área ocupada total", y la cantidad de "Departamentos" y<br>"Estacionamientos".<br>7. El sistema renderiza una tarjeta de desglose por cada inmueble asociado,<br>detallando su "Área ocupada", su "Aporte al contrato" y el "Precio Total".<br>8. El sistema despliega la sección "Documentos de tu Contrato", listando los<br>archivos adjuntos de forma paginada, con una extensión máxima de 4<br>documentos por página.<br>9. El Cliente interactúa con los documentos seleccionando "Previsualizar" o<br>"Descargar". |  |
| Flujo Alternativo |  |
| Progreso al 100% |  |
| 1. A diferencia de otras etapas, si el sistema detecta que el contrato está<br>completamente firmado, no altera la interfaz gráfica principal. Mantiene la<br>cabecera y el título intactos, limitándose a marcar todos los hitos del<br>progreso como completados. |  |
| Estado Vacío de Documentos |  |
| 1. En el paso 8, si no existen archivos subidos por el asesor legal, el sistema<br>muestra el contenedor vacío con el texto exacto: "No hay documentos<br>disponibles en esta etapa." |  |
| Interacción con Documentos |  |
| 1. Al igual que en la etapa de separación, las acciones de previsualizar,<br>descargar y el manejo de errores (como enlaces caídos o archivos |  |


---

## Página 48

                           inexistentes) son gestionados y delegados al visor nativo del navegador
                           del cliente.
                      Fallo de Carga de Módulo
                         1. Si la información del desglose de unidades falla en su consulta al servidor,
                           el sistema despliega la alerta global "Información no disponible
                           temporalmente".
                      Post Condiciones
                         - Éxito: El cliente comprende el estatus de su firma de contrato y visualiza
                           correctamente la distribución de unidades y costos vinculados a la
                           operación.
                         - Fallo: El sistema restringe la información en caso de fallo, mostrando los
                           estados vacíos.
                      Restricciones
                         - La interfaz es estrictamente de solo lectura (Read-Only). El cliente no
                           puede realizar acciones transaccionales directas desde esta vista, como
                           agendar su firma de contrato o aceptar términos virtualmente.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso
                      Prototipo


### Tablas de la página


#### Tabla 1

| inexistentes) son gestionados y delegados al visor nativo del navegador<br>del cliente. |
| --- |
| Fallo de Carga de Módulo |
| 1. Si la información del desglose de unidades falla en su consulta al servidor,<br>el sistema despliega la alerta global "Información no disponible<br>temporalmente". |
| Post Condiciones |
| - Éxito: El cliente comprende el estatus de su firma de contrato y visualiza<br>correctamente la distribución de unidades y costos vinculados a la<br>operación.<br>- Fallo: El sistema restringe la información en caso de fallo, mostrando los<br>estados vacíos. |
| Restricciones |
| - La interfaz es estrictamente de solo lectura (Read-Only). El cliente no<br>puede realizar acciones transaccionales directas desde esta vista, como<br>agendar su firma de contrato o aceptar términos virtualmente. |
| Casos de Uso Padre |
| Ninguno |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 49

                 CU013: Consultar Pagos y Financiamiento
                                    Este caso de uso permite al cliente consultar de manera
                                    detallada el estado financiero de su compra. El sistema
                                    proporciona un panel de indicadores globales y un
                      Descripción
                                    cronograma desglosado de cuotas, clasificando su
                                    situación actual mediante estados visuales. Asimismo,
                                    permite la visualización y descarga de comprobantes de


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite al cliente consultar de manera<br>detallada el estado financiero de su compra. El sistema<br>proporciona un panel de indicadores globales y un<br>cronograma desglosado de cuotas, clasificando su<br>situación actual mediante estados visuales. Asimismo,<br>permite la visualización y descarga de comprobantes de |
| --- | --- |


---

## Página 50

                                    pago asociados a las cuotas saldadas, restringiendo el
                                    acceso o la visualización de datos en función del estado
                                    comercial de la propiedad y la modalidad de
                                    financiamiento.
                                    Cliente
                      Actores
                                    Sistema
                      Precondiciones
                         - Cliente autenticado en el portal.
                         - El cliente debe tener al menos una unidad inmobiliaria activa
                           seleccionada.
                         - El cliente debe encontrarse navegando en la vista del módulo de pagos
                      Flujo Básico
                         1. El Cliente accede a la pestaña de pagos.
                         2. El sistema valida la etapa comercial actual del expediente.
                         3. El sistema muestra la cabecera con el antetítulo "Módulo de Finanzas" y
                           el título principal "Cronograma de Pagos".
                         4. El sistema despliega cuatro tarjetas de resumen financiero:
                              a. "Estado Global" (ej. "Al Día", "En Riesgo", "Activo").
                              b. "Monto Total" (acompañado del subtexto "Valor de contrato").
                              c. "Total Pagado" (acompañado del subtexto "Fondos abonados").
                              d. "Saldo Pendiente" (acompañado de una barra de progreso
                                visual).
                         5. El sistema renderiza la tabla de cuotas estructurada con las columnas:
                           "#", "Concepto de Cuota", "Vencimiento", "Monto", "Estado" y
                           "Comprobante".
                         6. El sistema inyecta indicadores visuales en la columna "Estado" para cada
                           cuota, asignando uno de los siguientes valores: "Pagado", "Por vencer",
                           "Pendiente" o "Vencido".
                         7. En la columna "Comprobante", para las cuotas con estado "Pagado", el
                           sistema habilita dos botones de interacción: "Ver" (con tooltip
                           "Previsualizar comprobante") y "Boleta" (con tooltip "Descargar
                           comprobante").
                         8. El Cliente hace clic en "Ver" o "Boleta" y el sistema delega la
                           previsualización o la descarga del recibo al visor nativo del navegador.
                      Flujo Alternativo
                      Restricción por Etapa Comercial (Separación)
                         1. En el paso 2, si el sistema detecta que la propiedad sigue en estado
                           comercial "Separado", interrumpe el flujo básico e intercepta la pantalla.
                           Despliega una vista de bloqueo total con el mensaje literal: "Tu
                           cronograma financiero está siendo preparado junto con tu Minuta de
                           Compraventa. Una vez firmado el contrato, podrás acceder al seguimiento
                           completo de tus cuotas."
                      Bloqueo de Comprobantes (Cuota Impaga)
                         1. En el paso 7, si la cuota evaluada se encuentra en un estado distinto a
                           "Pagado", el sistema no renderiza botones de acción. En su lugar, muestra
                           el texto inactivo "Bloqueado" acompañado de un ícono de candado.
                      Cronograma No Disponible (Estado Vacío)
                         1. Si el cliente ha superado la etapa de separación pero el sistema no
                           encuentra un flujo de cuotas activo (por desfase o pago al contado
                           absoluto), se omite el renderizado de la tabla en el paso 5. El sistema
                           muestra un contenedor central con el título "Cronograma no disponible" y


### Tablas de la página


#### Tabla 1

|  | pago asociados a las cuotas saldadas, restringiendo el<br>acceso o la visualización de datos en función del estado<br>comercial de la propiedad y la modalidad de<br>financiamiento. |
| --- | --- |
| Actores | Cliente<br>Sistema |
| Precondiciones |  |
| - Cliente autenticado en el portal.<br>- El cliente debe tener al menos una unidad inmobiliaria activa<br>seleccionada.<br>- El cliente debe encontrarse navegando en la vista del módulo de pagos |  |
| Flujo Básico |  |
| 1. El Cliente accede a la pestaña de pagos.<br>2. El sistema valida la etapa comercial actual del expediente.<br>3. El sistema muestra la cabecera con el antetítulo "Módulo de Finanzas" y<br>el título principal "Cronograma de Pagos".<br>4. El sistema despliega cuatro tarjetas de resumen financiero:<br>a. "Estado Global" (ej. "Al Día", "En Riesgo", "Activo").<br>b. "Monto Total" (acompañado del subtexto "Valor de contrato").<br>c. "Total Pagado" (acompañado del subtexto "Fondos abonados").<br>d. "Saldo Pendiente" (acompañado de una barra de progreso<br>visual).<br>5. El sistema renderiza la tabla de cuotas estructurada con las columnas:<br>"#", "Concepto de Cuota", "Vencimiento", "Monto", "Estado" y<br>"Comprobante".<br>6. El sistema inyecta indicadores visuales en la columna "Estado" para cada<br>cuota, asignando uno de los siguientes valores: "Pagado", "Por vencer",<br>"Pendiente" o "Vencido".<br>7. En la columna "Comprobante", para las cuotas con estado "Pagado", el<br>sistema habilita dos botones de interacción: "Ver" (con tooltip<br>"Previsualizar comprobante") y "Boleta" (con tooltip "Descargar<br>comprobante").<br>8. El Cliente hace clic en "Ver" o "Boleta" y el sistema delega la<br>previsualización o la descarga del recibo al visor nativo del navegador. |  |
| Flujo Alternativo |  |
| Restricción por Etapa Comercial (Separación) |  |
| 1. En el paso 2, si el sistema detecta que la propiedad sigue en estado<br>comercial "Separado", interrumpe el flujo básico e intercepta la pantalla.<br>Despliega una vista de bloqueo total con el mensaje literal: "Tu<br>cronograma financiero está siendo preparado junto con tu Minuta de<br>Compraventa. Una vez firmado el contrato, podrás acceder al seguimiento<br>completo de tus cuotas." |  |
| Bloqueo de Comprobantes (Cuota Impaga) |  |
| 1. En el paso 7, si la cuota evaluada se encuentra en un estado distinto a<br>"Pagado", el sistema no renderiza botones de acción. En su lugar, muestra<br>el texto inactivo "Bloqueado" acompañado de un ícono de candado. |  |
| Cronograma No Disponible (Estado Vacío) |  |
| 1. Si el cliente ha superado la etapa de separación pero el sistema no<br>encuentra un flujo de cuotas activo (por desfase o pago al contado<br>absoluto), se omite el renderizado de la tabla en el paso 5. El sistema<br>muestra un contenedor central con el título "Cronograma no disponible" y |  |


---

## Página 51

                           el mensaje: "El cronograma de pagos estará disponible una vez se
                           complete el proceso de contratación de tu unidad."
                      Post Condiciones
                         - Éxito: El cliente conoce con exactitud el estado global de su deuda, la
                           trazabilidad de sus cuotas y logra descargar sus boletas emitidas.
                         - Fallo: El sistema restringe exitosamente la vista financiera mostrando
                           pantallas de bloqueo o estados vacíos correspondientes a la situación del
                           expediente.
                      Restricciones
                         - La vista es estrictamente informativa y documental (Read-Only). No se
                           incluye ninguna pasarela de pago nativa dentro del componente para
                           saldar las cuotas directamente.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso
                      Prototipo


### Tablas de la página


#### Tabla 1

| el mensaje: "El cronograma de pagos estará disponible una vez se<br>complete el proceso de contratación de tu unidad." |
| --- |
| Post Condiciones |
| - Éxito: El cliente conoce con exactitud el estado global de su deuda, la<br>trazabilidad de sus cuotas y logra descargar sus boletas emitidas.<br>- Fallo: El sistema restringe exitosamente la vista financiera mostrando<br>pantallas de bloqueo o estados vacíos correspondientes a la situación del<br>expediente. |
| Restricciones |
| - La vista es estrictamente informativa y documental (Read-Only). No se<br>incluye ninguna pasarela de pago nativa dentro del componente para<br>saldar las cuotas directamente. |
| Casos de Uso Padre |
| Ninguno |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


#### Tabla 3

| Prototipo |
| --- |


---

## Página 52

                 CU014: Consultar Avance del Proyecto
                                    Este caso de uso permite al cliente consultar la evolución
                                    física y el progreso constructivo de su inmueble. El
                                    sistema expone un panel de indicadores porcentuales,
                                    una línea de tiempo dinámica que refleja las fases
                                    estructurales de la obra y una bitácora mensual
                      Descripción   multimedia. La interfaz permite la previsualización directa
                                    de fotografías, la reproducción nativa de reportes en video
                                    dentro de la misma vista y el acceso al recorrido virtual en
                                    caso de que la unidad cuente con este recurso,
                                    restringiendo la información únicamente si el expediente
                                    del cliente no cumple con la fase comercial requerida.
                                    Cliente
                      Actores
                                    Sistema
                      Precondiciones
                         - Cliente autenticado en el portal.
                         - El cliente debe tener al menos una unidad inmobiliaria activa
                           seleccionada.
                         - El cliente debe encontrarse navegando en la vista del módulo de de
                           avance de obra
                      Flujo Básico


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite al cliente consultar la evolución<br>física y el progreso constructivo de su inmueble. El<br>sistema expone un panel de indicadores porcentuales,<br>una línea de tiempo dinámica que refleja las fases<br>estructurales de la obra y una bitácora mensual<br>multimedia. La interfaz permite la previsualización directa<br>de fotografías, la reproducción nativa de reportes en video<br>dentro de la misma vista y el acceso al recorrido virtual en<br>caso de que la unidad cuente con este recurso,<br>restringiendo la información únicamente si el expediente<br>del cliente no cumple con la fase comercial requerida. |
| --- | --- |
| Actores | Cliente<br>Sistema |
| Precondiciones |  |
| - Cliente autenticado en el portal.<br>- El cliente debe tener al menos una unidad inmobiliaria activa<br>seleccionada.<br>- El cliente debe encontrarse navegando en la vista del módulo de de<br>avance de obra |  |
| Flujo Básico |  |


---

## Página 53

                         1. El Cliente accede a la pestaña de avance de obra.
                         2. El sistema valida la etapa comercial del expediente.
                         3. El sistema muestra la cabecera con el antetítulo "Módulo 3 · Ingeniería y
                           Construcción" y el título principal "¡Tu futuro hogar está tomando forma!".
                         4. El sistema despliega el panel de indicadores globales, renderizando la
                           métrica "Avance general" y "Avance de Obra" con sus respectivos
                           porcentajes.
                         5. El sistema muestra el indicador de estado actual con el formato: "Estado
                           Actual: [Nombre de la Fase]".
                         6. El sistema renderiza la línea de tiempo dinámica con las fases de
                           construcción, asignando visualmente los estados de leyenda:
                           "Completado", "En curso" y "Pendiente".
                         7. El sistema despliega la sección de la bitácora mensual, mostrando una
                           cuadrícula de fotografías estáticas en escala de grises y reproductores de
                           video integrados.
                         8. El Cliente posiciona el cursor sobre una fotografía y el sistema revela los
                           colores originales de la imagen.
                         9. El Cliente interactúa con los videos utilizando los controles de
                           reproducción nativos proporcionados por el sistema, sin salir del portal.
                      Flujo Alternativo
                      Restricción Comercial (Sin Contrato)
                         1. En el paso 2, si la propiedad no ha superado la etapa de separación, el
                           sistema interrumpe el flujo y bloquea la pantalla con el mensaje literal: "El
                           avance de obra estará disponible una vez completes tu proceso de
                           Separación."
                      Línea de Tiempo Vacía
                         1. En el paso 6, si el backend no provee un flujo de etapas dinámico, el
                           sistema muestra el texto literal: "No hay etapas registradas."
                      Detalle de Etapa Constructiva
                         1. En el paso 6, el Cliente hace clic sobre una fase específica de la línea de
                           tiempo. El sistema despliega una descripción textual según su estado:
                           "Etapa completada", "Etapa actualmente en ejecución" o "Etapa
                           pendiente".
                      Estado Vacío (Etapa Preventa o Planos)
                         1. En el paso 7, si el mes actual no contiene reportes multimedia, el sistema
                           omite la cuadrícula de fotos/videos. En su lugar, renderiza un ícono de
                           gráfico de barras con el título "Aún no hay reportes de avance" y el
                           mensaje: "El primer reporte mensual se generará al culminar el primer
                           periodo de construcción. Vuelve a consultar próximamente."
                      Post Condiciones
                         - Éxito: El cliente visualiza de forma exitosa el avance porcentual y el
                           material multimedia mensual correspondiente a su inmueble.
                         - Fallo: El sistema restringe el acceso al material constructivo mediante
                           pantallas de bloqueo comercial o vistas de estados vacíos para proyectos
                           en planos.
                      Restricciones
                         - La vista es puramente informativa y de solo lectura.
                         - La experiencia de reproducción de video no cuenta con controles
                           personalizados; depende en su totalidad del reproductor de medios
                           integrado en el navegador web del usuario.
                      Casos de Uso Padre


### Tablas de la página


#### Tabla 1

| 1. El Cliente accede a la pestaña de avance de obra.<br>2. El sistema valida la etapa comercial del expediente.<br>3. El sistema muestra la cabecera con el antetítulo "Módulo 3 · Ingeniería y<br>Construcción" y el título principal "¡Tu futuro hogar está tomando forma!".<br>4. El sistema despliega el panel de indicadores globales, renderizando la<br>métrica "Avance general" y "Avance de Obra" con sus respectivos<br>porcentajes.<br>5. El sistema muestra el indicador de estado actual con el formato: "Estado<br>Actual: [Nombre de la Fase]".<br>6. El sistema renderiza la línea de tiempo dinámica con las fases de<br>construcción, asignando visualmente los estados de leyenda:<br>"Completado", "En curso" y "Pendiente".<br>7. El sistema despliega la sección de la bitácora mensual, mostrando una<br>cuadrícula de fotografías estáticas en escala de grises y reproductores de<br>video integrados.<br>8. El Cliente posiciona el cursor sobre una fotografía y el sistema revela los<br>colores originales de la imagen.<br>9. El Cliente interactúa con los videos utilizando los controles de<br>reproducción nativos proporcionados por el sistema, sin salir del portal. |
| --- |
| Flujo Alternativo |
| Restricción Comercial (Sin Contrato) |
| 1. En el paso 2, si la propiedad no ha superado la etapa de separación, el<br>sistema interrumpe el flujo y bloquea la pantalla con el mensaje literal: "El<br>avance de obra estará disponible una vez completes tu proceso de<br>Separación." |
| Línea de Tiempo Vacía |
| 1. En el paso 6, si el backend no provee un flujo de etapas dinámico, el<br>sistema muestra el texto literal: "No hay etapas registradas." |
| Detalle de Etapa Constructiva |
| 1. En el paso 6, el Cliente hace clic sobre una fase específica de la línea de<br>tiempo. El sistema despliega una descripción textual según su estado:<br>"Etapa completada", "Etapa actualmente en ejecución" o "Etapa<br>pendiente". |
| Estado Vacío (Etapa Preventa o Planos) |
| 1. En el paso 7, si el mes actual no contiene reportes multimedia, el sistema<br>omite la cuadrícula de fotos/videos. En su lugar, renderiza un ícono de<br>gráfico de barras con el título "Aún no hay reportes de avance" y el<br>mensaje: "El primer reporte mensual se generará al culminar el primer<br>periodo de construcción. Vuelve a consultar próximamente." |
| Post Condiciones |
| - Éxito: El cliente visualiza de forma exitosa el avance porcentual y el<br>material multimedia mensual correspondiente a su inmueble.<br>- Fallo: El sistema restringe el acceso al material constructivo mediante<br>pantallas de bloqueo comercial o vistas de estados vacíos para proyectos<br>en planos. |
| Restricciones |
| - La vista es puramente informativa y de solo lectura.<br>- La experiencia de reproducción de video no cuenta con controles<br>personalizados; depende en su totalidad del reproductor de medios<br>integrado en el navegador web del usuario. |
| Casos de Uso Padre |


---

## Página 54

                      Ninguno
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

## Página 55

                 CU015: Consultar Entrega
                                    Este caso de uso permite al cliente consultar el estado y la
                                    trazabilidad del proceso legal y registral de su inmueble.
                                    El sistema proporciona visibilidad a través de una línea de
                                    tiempo estructurada en siete hitos de formalización y
                      Descripción   expone un repositorio centralizado para la documentación
                                    legal generada. Además, el sistema aplica un bloqueo de
                                    acceso preventivo si el expediente comercial del cliente no
                                    cumple con los requisitos mínimos de avance contractual
                                    para la etapa de saneamiento.
                                    Cliente
                      Actores
                                    Sistema
                      Precondiciones
                         - El cliente debe haber iniciado sesión de manera exitosa.
                         - El cliente debe tener al menos una unidad inmobiliaria activa en su
                           cuenta.
                         - El cliente debe encontrarse navegando en la vista del módulo de
                           saneamiento
                      Flujo Básico
                         1. El Cliente accede a la pestaña de entrega.


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite al cliente consultar el estado y la<br>trazabilidad del proceso legal y registral de su inmueble.<br>El sistema proporciona visibilidad a través de una línea de<br>tiempo estructurada en siete hitos de formalización y<br>expone un repositorio centralizado para la documentación<br>legal generada. Además, el sistema aplica un bloqueo de<br>acceso preventivo si el expediente comercial del cliente no<br>cumple con los requisitos mínimos de avance contractual<br>para la etapa de saneamiento. |
| --- | --- |
| Actores | Cliente<br>Sistema |
| Precondiciones |  |
| - El cliente debe haber iniciado sesión de manera exitosa.<br>- El cliente debe tener al menos una unidad inmobiliaria activa en su<br>cuenta.<br>- El cliente debe encontrarse navegando en la vista del módulo de<br>saneamiento |  |
| Flujo Básico |  |
| 1. El Cliente accede a la pestaña de entrega. |  |


---

## Página 56

                         2. El sistema evalúa el estado comercial del expediente para determinar los
                           permisos de acceso a la fase de entrega.
                         3. El sistema valida el acceso y renderiza la cabecera con el subtítulo
                           dinámico "Etapa 04: Entrega", el título principal "¡Llegó el momento de
                           recibir tu nuevo hogar!" y el párrafo descriptivo: "En esta etapa realizamos
                           la entrega física de tu departamento...".
                         4. El sistema despliega la sección de progreso y renderiza la secuencia de
                           hitos, asignando un estado visual ("Completado", "En curso" o
                           "Pendiente") a cada uno de los siguientes ítems:
                              a. Inmueble terminado
                              b. Inmueble cancelado
                              c. Comunicación de fecha de entrega
                              d. Confirmación de fecha de entrega
                              e. Entrega del inmueble
                         5. El sistema despliega la sección de documentos de entrega, mostrando la
                           lista de archivos disponibles para esta fase, la cual incluye: Planos As
                           Built, Acta de entrega, Manual del propietario, Manual de convivencia,
                           Manual de Calidad Cloud, Manual de saneamiento, Cartas de garantía,
                           Fichas técnicas, Lista de proveedores, Cuponera y Checklist de
                           implementación.
                         6. El Cliente interactúa con los documentos seleccionando la opción
                           "Previsualizar" o "Descargar".
                         7. El sistema procesa la solicitud mediante el componente modal interno o
                           delegando la descarga al navegador.
                         8.
                      Flujo Alternativo
                      Restricción Comercial (Bloqueo Total)
                         1. En el paso 2, si el sistema detecta que el expediente se encuentra en una
                           fase prematura (estado bloqueado), interrumpe el flujo básico. En su
                           lugar, despliega una pantalla de restricción identificada con la etiqueta
                           'Modo Espera' y un ícono de llave. El sistema muestra el título 'Entrega no
                           está disponible' acompañado de la descripción: 'La información de
                           entrega estará disponible una vez tu inmueble esté listo para ser
                           entregado.'. Finalmente, se incluye un breve mensaje de soporte para
                           contactar al equipo de asesoramiento y el botón '← Volver al Inicio' que
                           redirige al cliente al dashboard.
                      Post Condiciones
                         - Éxito: El cliente comprende la secuencia de pasos para recibir su
                           inmueble y accede exitosamente a los documentos de entrega emitidos.
                         - Fallo: El sistema protege la lógica de negocio al bloquear exitosamente la
                           vista para aquellos clientes en etapas tempranas (como preventa o
                           construcción).
                      Restricciones
                         - La interfaz es estrictamente informativa y documental (Read-Only). No
                           incluye opciones transaccionales para que el cliente firme actas de
                           entrega, levante observaciones o agende citas de inspección
                           directamente desde los documentos.
                      Casos de Uso Padre
                      Ninguno


### Tablas de la página


#### Tabla 1

| 2. El sistema evalúa el estado comercial del expediente para determinar los<br>permisos de acceso a la fase de entrega.<br>3. El sistema valida el acceso y renderiza la cabecera con el subtítulo<br>dinámico "Etapa 04: Entrega", el título principal "¡Llegó el momento de<br>recibir tu nuevo hogar!" y el párrafo descriptivo: "En esta etapa realizamos<br>la entrega física de tu departamento...".<br>4. El sistema despliega la sección de progreso y renderiza la secuencia de<br>hitos, asignando un estado visual ("Completado", "En curso" o<br>"Pendiente") a cada uno de los siguientes ítems:<br>a. Inmueble terminado<br>b. Inmueble cancelado<br>c. Comunicación de fecha de entrega<br>d. Confirmación de fecha de entrega<br>e. Entrega del inmueble<br>5. El sistema despliega la sección de documentos de entrega, mostrando la<br>lista de archivos disponibles para esta fase, la cual incluye: Planos As<br>Built, Acta de entrega, Manual del propietario, Manual de convivencia,<br>Manual de Calidad Cloud, Manual de saneamiento, Cartas de garantía,<br>Fichas técnicas, Lista de proveedores, Cuponera y Checklist de<br>implementación.<br>6. El Cliente interactúa con los documentos seleccionando la opción<br>"Previsualizar" o "Descargar".<br>7. El sistema procesa la solicitud mediante el componente modal interno o<br>delegando la descarga al navegador.<br>8. |
| --- |
| Flujo Alternativo |
| Restricción Comercial (Bloqueo Total) |
| 1. En el paso 2, si el sistema detecta que el expediente se encuentra en una<br>fase prematura (estado bloqueado), interrumpe el flujo básico. En su<br>lugar, despliega una pantalla de restricción identificada con la etiqueta<br>'Modo Espera' y un ícono de llave. El sistema muestra el título 'Entrega no<br>está disponible' acompañado de la descripción: 'La información de<br>entrega estará disponible una vez tu inmueble esté listo para ser<br>entregado.'. Finalmente, se incluye un breve mensaje de soporte para<br>contactar al equipo de asesoramiento y el botón '← Volver al Inicio' que<br>redirige al cliente al dashboard. |
| Post Condiciones |
| - Éxito: El cliente comprende la secuencia de pasos para recibir su<br>inmueble y accede exitosamente a los documentos de entrega emitidos.<br>- Fallo: El sistema protege la lógica de negocio al bloquear exitosamente la<br>vista para aquellos clientes en etapas tempranas (como preventa o<br>construcción). |
| Restricciones |
| - La interfaz es estrictamente informativa y documental (Read-Only). No<br>incluye opciones transaccionales para que el cliente firme actas de<br>entrega, levante observaciones o agende citas de inspección<br>directamente desde los documentos. |
| Casos de Uso Padre |
| Ninguno |


---

## Página 57

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

## Página 58

                 CU016: Consultar Saneamiento
                                    Este caso de uso permite al cliente consultar el estado y la
                                    trazabilidad del proceso legal y registral de su inmueble.
                                    El sistema proporciona visibilidad a través de una línea de
                                    tiempo estructurada en siete hitos de formalización y
                      Descripción   expone un repositorio centralizado para la documentación
                                    legal generada. Además, el sistema aplica un bloqueo de
                                    acceso preventivo si el expediente comercial del cliente no
                                    cumple con los requisitos mínimos de avance contractual
                                    para la etapa de saneamiento.
                                    Cliente
                      Actores
                                    Sistema
                      Precondiciones
                         - El cliente debe haber iniciado sesión de manera exitosa.
                         - El cliente debe tener al menos una unidad inmobiliaria activa en su
                           cuenta.
                         - El cliente debe encontrarse navegando en la vista del módulo de
                           saneamiento
                      Flujo Básico
                         1. El Cliente intenta acceder a la pestaña de saneamiento.
                         2. El sistema evalúa el estado comercial del expediente para determinar los
                           permisos de acceso a la fase de saneamiento.
                         3. El sistema valida el acceso y renderiza la cabecera estática con el
                           subtítulo "Etapa 05: Saneamiento" y el título principal "¡Estamos
                           formalizando tu propiedad!".
                         4. El sistema inyecta la sección de progreso y despliega la línea de tiempo
                           secuencial con los siguientes hitos literales:
                              a. "Entrega del inmueble"
                              b. "Conformidad de obra"
                              c. "Declaratoria de fábrica"
                              d. "Independización municipal"
                              e. "Transferencia municipal"
                              f. "Independización SUNARP"
                              g. "Transferencia registral"


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite al cliente consultar el estado y la<br>trazabilidad del proceso legal y registral de su inmueble.<br>El sistema proporciona visibilidad a través de una línea de<br>tiempo estructurada en siete hitos de formalización y<br>expone un repositorio centralizado para la documentación<br>legal generada. Además, el sistema aplica un bloqueo de<br>acceso preventivo si el expediente comercial del cliente no<br>cumple con los requisitos mínimos de avance contractual<br>para la etapa de saneamiento. |
| --- | --- |
| Actores | Cliente<br>Sistema |
| Precondiciones |  |
| - El cliente debe haber iniciado sesión de manera exitosa.<br>- El cliente debe tener al menos una unidad inmobiliaria activa en su<br>cuenta.<br>- El cliente debe encontrarse navegando en la vista del módulo de<br>saneamiento |  |
| Flujo Básico |  |
| 1. El Cliente intenta acceder a la pestaña de saneamiento.<br>2. El sistema evalúa el estado comercial del expediente para determinar los<br>permisos de acceso a la fase de saneamiento.<br>3. El sistema valida el acceso y renderiza la cabecera estática con el<br>subtítulo "Etapa 05: Saneamiento" y el título principal "¡Estamos<br>formalizando tu propiedad!".<br>4. El sistema inyecta la sección de progreso y despliega la línea de tiempo<br>secuencial con los siguientes hitos literales:<br>a. "Entrega del inmueble"<br>b. "Conformidad de obra"<br>c. "Declaratoria de fábrica"<br>d. "Independización municipal"<br>e. "Transferencia municipal"<br>f. "Independización SUNARP"<br>g. "Transferencia registral" |  |


---

## Página 59

                         5. El sistema despliega la sección "Documentación de saneamiento",
                           mostrando el listado de archivos (ej. partidas registrales, resoluciones)
                           subidos por el administrador.
                         6. El Cliente interactúa con los documentos seleccionando la opción
                           "Previsualizar" o "Descargar".
                         7. El sistema procesa la solicitud mediante el componente modal interno o
                           delegando la descarga al navegador, sin ejecutar acciones
                           transaccionales.
                      Flujo Alternativo
                      Restricción Comercial (Bloqueo Total)
                         1. En el paso 2, si el sistema detecta que la fase comercial del cliente es
                           prematura, el flujo básico se interrumpe. El sistema oculta la vista
                           principal y monta una pantalla restrictiva mostrando el mensaje principal:
                           "El acceso a los trámites de saneamiento se habilitará cuando la Minuta
                           de Compraventa esté firmada." y lista los siguientes requisitos previos a
                           esperar: "Declaratoria de Fábrica", "Partida registral individualizada" e
                           "Inscripción registral definitiva".
                      Post Condiciones
                         - Éxito: El cliente obtiene visibilidad clara sobre el progreso registral y legal
                           de su inmueble, y accede a los documentos respaldatorios de su
                           saneamiento.
                         - Fallo: El sistema protege la lógica de negocio restringiendo el acceso y
                           educando al cliente sobre los hitos necesarios (firma de minuta) para
                           desbloquear la vista.
                      Restricciones
                         - La interfaz de documentos recicla componentes genéricos de solo lectura.
                           No contiene formularios, interacciones transaccionales, ni flujos para
                           validación legal externa por parte del cliente.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso
                      Prototipo


### Tablas de la página


#### Tabla 1

| 5. El sistema despliega la sección "Documentación de saneamiento",<br>mostrando el listado de archivos (ej. partidas registrales, resoluciones)<br>subidos por el administrador.<br>6. El Cliente interactúa con los documentos seleccionando la opción<br>"Previsualizar" o "Descargar".<br>7. El sistema procesa la solicitud mediante el componente modal interno o<br>delegando la descarga al navegador, sin ejecutar acciones<br>transaccionales. |
| --- |
| Flujo Alternativo |
| Restricción Comercial (Bloqueo Total) |
| 1. En el paso 2, si el sistema detecta que la fase comercial del cliente es<br>prematura, el flujo básico se interrumpe. El sistema oculta la vista<br>principal y monta una pantalla restrictiva mostrando el mensaje principal:<br>"El acceso a los trámites de saneamiento se habilitará cuando la Minuta<br>de Compraventa esté firmada." y lista los siguientes requisitos previos a<br>esperar: "Declaratoria de Fábrica", "Partida registral individualizada" e<br>"Inscripción registral definitiva". |
| Post Condiciones |
| - Éxito: El cliente obtiene visibilidad clara sobre el progreso registral y legal<br>de su inmueble, y accede a los documentos respaldatorios de su<br>saneamiento.<br>- Fallo: El sistema protege la lógica de negocio restringiendo el acceso y<br>educando al cliente sobre los hitos necesarios (firma de minuta) para<br>desbloquear la vista. |
| Restricciones |
| - La interfaz de documentos recicla componentes genéricos de solo lectura.<br>No contiene formularios, interacciones transaccionales, ni flujos para<br>validación legal externa por parte del cliente. |
| Casos de Uso Padre |
| Ninguno |


#### Tabla 2

| Diagrama de caso de uso |
| --- |


---

## Página 60

                 CU017: Agenda y Citas
                                    Este caso de uso permite al cliente visualizar, gestionar y
                                    dar respuesta a las citas, visitas al proyecto y reuniones
                                    programadas o propuestas por su asesor comercial. El
                                    sistema presenta una interfaz híbrida interactiva
                                    compuesta por un calendario y un listado de eventos.
                      Descripción   Dado su diseño reactivo, el cliente no puede crear citas
                                    desde cero; sus interacciones se limitan a confirmar
                                    asistencia, proponer nuevos horarios o declinar
                                    propuestas. Adicionalmente, el sistema restringe el
                                    acceso al módulo si el expediente de la propiedad se
                                    encuentra en etapas tempranas.
                                    Cliente
                      Actores       Sistema
                                    Administrado/asesor
                      Precondiciones
                         - El cliente debe haber iniciado sesión de manera exitosa.
                         - El cliente debe tener al menos una unidad inmobiliaria activa en su
                           cuenta.
                         - El cliente debe encontrarse navegando en la vista de agenda
                      Flujo Básico
                         1. El Cliente intenta acceder al módulo de agenda.


### Tablas de la página


#### Tabla 1

| Descripción | Este caso de uso permite al cliente visualizar, gestionar y<br>dar respuesta a las citas, visitas al proyecto y reuniones<br>programadas o propuestas por su asesor comercial. El<br>sistema presenta una interfaz híbrida interactiva<br>compuesta por un calendario y un listado de eventos.<br>Dado su diseño reactivo, el cliente no puede crear citas<br>desde cero; sus interacciones se limitan a confirmar<br>asistencia, proponer nuevos horarios o declinar<br>propuestas. Adicionalmente, el sistema restringe el<br>acceso al módulo si el expediente de la propiedad se<br>encuentra en etapas tempranas. |
| --- | --- |
| Actores | Cliente<br>Sistema<br>Administrado/asesor |
| Precondiciones |  |
| - El cliente debe haber iniciado sesión de manera exitosa.<br>- El cliente debe tener al menos una unidad inmobiliaria activa en su<br>cuenta.<br>- El cliente debe encontrarse navegando en la vista de agenda |  |
| Flujo Básico |  |
| 1. El Cliente intenta acceder al módulo de agenda. |  |


---

## Página 61

                         2. El sistema evalúa la etapa en la que se encuentra el expediente: si sigue
                           en la etapa de separación, entonces se muestra el 'Modo de Espera'.
                         3. El sistema carga la vista principal mostrando el antetítulo "Calendario", el
                           título "Agenda & Citas" y la descripción "Gestiona tus visitas al proyecto y
                           reuniones con asesores."
                         4. El sistema despliega la interfaz dividida: un calendario visual interactivo a
                           la izquierda y un listado de citas a la derecha.
                         5. El sistema lista las citas identificando su modalidad (Visita, Firma,
                           Entrega, Reunión) y su estado. El Cliente visualiza una cita en estado
                           "Pendiente" (color dorado de la marca).
                         6. El Cliente selecciona la opción "Confirmar asistencia".
                         7. El sistema procesa la solicitud, actualiza el estado a "Confirmada" y
                           transforma visualmente el botón en una etiqueta estática de color dorado
                           con el texto "Asistencia confirmada".
                      Flujo Alternativo
                      Proponer reprogramación de horario
                         1. En el paso 6 del flujo básico, el Cliente selecciona la opción "Proponer
                           cambio".
                         2. El sistema despliega el modal interno .
                         3. El Cliente ingresa sus preferencias en los campos "Día" y "Hora".
                         4. El Cliente hace clic en "Confirmar horario".
                         5. El sistema envía la propuesta al backend y cierra el modal.
                      Declinar propuesta de cita
                         1. En el paso 6 del flujo básico, el Cliente hace clic en el botón "No
                           disponible".
                         2. El sistema ejecuta la cancelación inmediatamente contra la API (sin lanzar
                           alertas o pop-ups de confirmación).
                         3. El sistema transforma instantáneamente el botón en una etiqueta no
                           interactiva con el texto "No disponible" y un ícono de bloqueo
                      Post Condiciones
                         - Éxito: El cliente ha respondido a la propuesta del asesor (confirmado,
                           reprogramado o declinado) y el sistema actualiza el estado de la cita en el
                           calendario y listado. Las citas pasadas cambian a estado "Completada"
                           en tonos grises.
                         - Fallo: El sistema protege el módulo bloqueando la navegación a clientes
                           en etapas iniciales de compraventa.
                      Restricciones
                         - Naturaleza reactiva: Es estrictamente imposible para el cliente crear,
                           invitar o agendar una cita desde cero por su propia cuenta.
                         - Ausencia de fricción en rechazo: La acción de declinar ("No disponible")
                           se ejecuta en un solo clic, sin doble factor de confirmación.
                      Casos de Uso Padre
                      Ninguno
                      Diagrama de caso de uso


### Tablas de la página


#### Tabla 1

| 2. El sistema evalúa la etapa en la que se encuentra el expediente: si sigue<br>en la etapa de separación, entonces se muestra el 'Modo de Espera'.<br>3. El sistema carga la vista principal mostrando el antetítulo "Calendario", el<br>título "Agenda & Citas" y la descripción "Gestiona tus visitas al proyecto y<br>reuniones con asesores."<br>4. El sistema despliega la interfaz dividida: un calendario visual interactivo a<br>la izquierda y un listado de citas a la derecha.<br>5. El sistema lista las citas identificando su modalidad (Visita, Firma,<br>Entrega, Reunión) y su estado. El Cliente visualiza una cita en estado<br>"Pendiente" (color dorado de la marca).<br>6. El Cliente selecciona la opción "Confirmar asistencia".<br>7. El sistema procesa la solicitud, actualiza el estado a "Confirmada" y<br>transforma visualmente el botón en una etiqueta estática de color dorado<br>con el texto "Asistencia confirmada". |
| --- |
| Flujo Alternativo |
| Proponer reprogramación de horario |
| 1. En el paso 6 del flujo básico, el Cliente selecciona la opción "Proponer<br>cambio".<br>2. El sistema despliega el modal interno .<br>3. El Cliente ingresa sus preferencias en los campos "Día" y "Hora".<br>4. El Cliente hace clic en "Confirmar horario".<br>5. El sistema envía la propuesta al backend y cierra el modal. |
| Declinar propuesta de cita |
| 1. En el paso 6 del flujo básico, el Cliente hace clic en el botón "No<br>disponible".<br>2. El sistema ejecuta la cancelación inmediatamente contra la API (sin lanzar<br>alertas o pop-ups de confirmación).<br>3. El sistema transforma instantáneamente el botón en una etiqueta no<br>interactiva con el texto "No disponible" y un ícono de bloqueo |
| Post Condiciones |
| - Éxito: El cliente ha respondido a la propuesta del asesor (confirmado,<br>reprogramado o declinado) y el sistema actualiza el estado de la cita en el<br>calendario y listado. Las citas pasadas cambian a estado "Completada"<br>en tonos grises.<br>- Fallo: El sistema protege el módulo bloqueando la navegación a clientes<br>en etapas iniciales de compraventa. |
| Restricciones |
| - Naturaleza reactiva: Es estrictamente imposible para el cliente crear,<br>invitar o agendar una cita desde cero por su propia cuenta.<br>- Ausencia de fricción en rechazo: La acción de declinar ("No disponible")<br>se ejecuta en un solo clic, sin doble factor de confirmación. |
| Casos de Uso Padre |
| Ninguno |


---

## Página 62

                      Prototipo


### Tablas de la página


#### Tabla 1

| Prototipo |
| --- |


---

## Página 63

              7.3. DIAGRAMA DE SECUENCIA


---

## Página 64

            Caso de Uso   CU001: Autenticar usuario corporativo
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU001: Autenticar usuario corporativo |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 65

            Caso de Uso   CU002: Gestionar empleados, roles y permisos
            Diagrama de Secuencia
            Caso de Uso   CU003: Gestionar proyectos e inventario
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU002: Gestionar empleados, roles y permisos |
| --- | --- |
| Diagrama de Secuencia |  |


#### Tabla 2

| Caso de Uso | CU003: Gestionar proyectos e inventario |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 66

            Caso de Uso   CU004: Gestionar clientes, vincular y desvincular unidades
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU004: Gestionar clientes, vincular y desvincular unidades |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 67

            Caso de Uso   CU005: Actualizar Avance de Obra
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU005: Actualizar Avance de Obra |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 68

            Caso de Uso   CU006: Gestionar expedientes legales y documentos
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU006: Gestionar expedientes legales y documentos |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 69

            Caso de Uso   CU008: Agendar eventos y citas
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU008: Agendar eventos y citas |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 70

            Caso de Uso   CU009: Autenticar usuario cliente
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU009: Autenticar usuario cliente |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 71

            Caso de Uso   CU010: Consultar Inicio / Panel Principal
            Diagrama de Secuencia


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU010: Consultar Inicio / Panel Principal |
| --- | --- |
| Diagrama de Secuencia |  |


---

## Página 72

            Caso de Uso   CU017: Agenda y Citas
            Diagrama de Secuencia
              7.4. REQUERIMIENTOS FUNCIONALES
                                                     Reglas de
            N°        Descripción del Requerimiento Funcional Prioridad
                                                     Negocio
                 El sistema debe permitir a los usuarios autorizados (Asesor
         RF-001                                     RN-001   MUST HAVE
                 comercial) generar cuentas de acceso para clientes.
                 El sistema debe permitir a usuarios empresariales con
                 permiso de gestión financiera (por defecto rol base Asesor RN-005
         RF-002                                              MUST HAVE
                 Comercial) editar montos y fechas del cronograma de pago de RN-006
                 cada unidad asociada a un cliente.
                 El sistema debe autenticar usuarios empresariales, validando
                                                    RN-002
         RF-003  que ingresen exclusivamente con el dominio  MUST HAVE
                 @llosaedificaciones.com.


### Tablas de la página


#### Tabla 1

| Caso de Uso | CU017: Agenda y Citas |
| --- | --- |
| Diagrama de Secuencia |  |


#### Tabla 2

| N° | Descripción del Requerimiento Funcional | Reglas de<br>Negocio | Prioridad |
| --- | --- | --- | --- |
| RF-001 | El sistema debe permitir a los usuarios autorizados (Asesor<br>comercial) generar cuentas de acceso para clientes. | RN-001 | MUST HAVE |
| RF-002 | El sistema debe permitir a usuarios empresariales con<br>permiso de gestión financiera (por defecto rol base Asesor<br>Comercial) editar montos y fechas del cronograma de pago de<br>cada unidad asociada a un cliente. | RN-005<br>RN-006 | MUST HAVE |
| RF-003 | El sistema debe autenticar usuarios empresariales, validando<br>que ingresen exclusivamente con el dominio<br>@llosaedificaciones.com. | RN-002 | MUST HAVE |


---

## Página 73

                 El sistema debe proveer un panel administrativo para asignar
         RF-004
                 roles base y habilitar o restringir accesos a módulos y RN-002 MUST HAVE
                 acciones (CRUD) de forma granular por usuario.
                 El sistema debe permitir crear proyectos y unidades RN-003
         RF-005                                              MUST HAVE
                 desglosadas aplicando la plantilla de hitos predefinidos. RN-010
                 El sistema debe permitir desvincular a un cliente de una
                                                    RN-008
                 unidad. Al ejecutar esta acción, la unidad cambiará a
                                                    RN-011
         RF-006  “Disponible” en el inventario y se revocará el acceso a la data MUST HAVE
                 de esa unidad. Si, y solo si, era la única unidad vinculada al
                 cliente, su perfil pasará a estado “Inactivo”.
                 Al vincular un cliente a una unidad en etapa avanzada, el
         RF-007  sistema debe marcar en lote (batch) como "Completados" los RN-003 MUST HAVE
                 hitos anteriores en la base de datos.
                 El sistema debe permitir al Cliente visualizar su Dashboard
                                                    RN-008
         RF-008  con el estado actual, línea de tiempo (hitos) y el porcentaje de MUST HAVE
                                                    RN-010
                 avance general de su propiedad.
                 El sistema debe permitir a usuarios con permisos operativos RN-010
         RF-009  actualizar estados y porcentajes de hitos a nivel de unidad MUST HAVE
                 específica (ej. Dpto 101) o de forma masiva (ej. Torre A).
                 El sistema debe rechazar cualquier petición (retornando error)
         RF-010  que intente marcar un hito como "Completado" si el hito RN-003 MUST HAVE
                 predecesor directo no tiene el estado "Completado".
                 El sistema debe permitir a usuarios con permiso de obra subir
                                                    RN-004
                 fotos/videos (MP4, PNG, JPG, TIFF) a GCS asociados a un
         RF-011                                              MUST HAVE
                 hito y una o varias unidades. Incluye carga masiva para
                 múltiples unidades de un proyecto.
                 El sistema debe permitir a usuarios con permiso RN-006
         RF-012  documental/financiero subir documentos legales y RN-007 MUST HAVE
                 comprobantes de pago (PDF), vinculados a una propiedad.
                 El backend debe generar y retornar Signed URLs (URLs
                 firmadas) con tiempo de expiración (ej. 15 minutos) para
                                                    RN-007
         RF-013  permitir al cliente descargar o visualizar de forma segura sus MUST HAVE
                                                    RN-008
                 documentos legales (PDF) y comprobantes de pago validados
                 (PDF/JPG/PNG).
                 Los usuarios empresariales con permiso de conciliación de
                                                    RN-005
         RF-014  pagos deben poder actualizar el estado de las cuotas y MUST HAVE
                                                    RN-006
                 registrar los comprobantes asociados.
                 El sistema debe poder generar eventos de citas organizados
         RF-015                                     RN-012   MUST HAVE
                 por la inmobiliaria, añadiendo al cliente como invitado.
                 El sistema debe desplegar una interfaz de disponibilidad
                                                    RN-012
                 colaborativa en el Portal Cliente si se habilita la
         RF-016                                              MUST HAVE
                 reprogramación, permitiendo guardar en base de datos los
                 bloques horarios propuestos por el usuario.
                 El sistema debe enviar correos electrónicos que notifique al RN-001
         RF-017  usuario sobre actualizaciones relevantes como: bienvenida, RN-004 NICE TO HAVE
                 hitos cumplidos, alertas de pago.


### Tablas de la página


#### Tabla 1

| RF-004 | El sistema debe proveer un panel administrativo para asignar<br>roles base y habilitar o restringir accesos a módulos y<br>acciones (CRUD) de forma granular por usuario. | RN-002 | MUST HAVE |
| --- | --- | --- | --- |
| RF-005 | El sistema debe permitir crear proyectos y unidades<br>desglosadas aplicando la plantilla de hitos predefinidos. | RN-003<br>RN-010 | MUST HAVE |
| RF-006 | El sistema debe permitir desvincular a un cliente de una<br>unidad. Al ejecutar esta acción, la unidad cambiará a<br>“Disponible” en el inventario y se revocará el acceso a la data<br>de esa unidad. Si, y solo si, era la única unidad vinculada al<br>cliente, su perfil pasará a estado “Inactivo”. | RN-008<br>RN-011 | MUST HAVE |
| RF-007 | Al vincular un cliente a una unidad en etapa avanzada, el<br>sistema debe marcar en lote (batch) como "Completados" los<br>hitos anteriores en la base de datos. | RN-003 | MUST HAVE |
| RF-008 | El sistema debe permitir al Cliente visualizar su Dashboard<br>con el estado actual, línea de tiempo (hitos) y el porcentaje de<br>avance general de su propiedad. | RN-008<br>RN-010 | MUST HAVE |
| RF-009 | El sistema debe permitir a usuarios con permisos operativos<br>actualizar estados y porcentajes de hitos a nivel de unidad<br>específica (ej. Dpto 101) o de forma masiva (ej. Torre A). | RN-010 | MUST HAVE |
| RF-010 | El sistema debe rechazar cualquier petición (retornando error)<br>que intente marcar un hito como "Completado" si el hito<br>predecesor directo no tiene el estado "Completado". | RN-003 | MUST HAVE |
| RF-011 | El sistema debe permitir a usuarios con permiso de obra subir<br>fotos/videos (MP4, PNG, JPG, TIFF) a GCS asociados a un<br>hito y una o varias unidades. Incluye carga masiva para<br>múltiples unidades de un proyecto. | RN-004 | MUST HAVE |
| RF-012 | El sistema debe permitir a usuarios con permiso<br>documental/financiero subir documentos legales y<br>comprobantes de pago (PDF), vinculados a una propiedad. | RN-006<br>RN-007 | MUST HAVE |
| RF-013 | El backend debe generar y retornar Signed URLs (URLs<br>firmadas) con tiempo de expiración (ej. 15 minutos) para<br>permitir al cliente descargar o visualizar de forma segura sus<br>documentos legales (PDF) y comprobantes de pago validados<br>(PDF/JPG/PNG). | RN-007<br>RN-008 | MUST HAVE |
| RF-014 | Los usuarios empresariales con permiso de conciliación de<br>pagos deben poder actualizar el estado de las cuotas y<br>registrar los comprobantes asociados. | RN-005<br>RN-006 | MUST HAVE |
| RF-015 | El sistema debe poder generar eventos de citas organizados<br>por la inmobiliaria, añadiendo al cliente como invitado. | RN-012 | MUST HAVE |
| RF-016 | El sistema debe desplegar una interfaz de disponibilidad<br>colaborativa en el Portal Cliente si se habilita la<br>reprogramación, permitiendo guardar en base de datos los<br>bloques horarios propuestos por el usuario. | RN-012 | MUST HAVE |
| RF-017 | El sistema debe enviar correos electrónicos que notifique al<br>usuario sobre actualizaciones relevantes como: bienvenida,<br>hitos cumplidos, alertas de pago. | RN-001<br>RN-004 | NICE TO HAVE |


---

## Página 74

                 El sistema debe permitir a los clientes gestionar múltiples RN-008
         RF-018                                              MUST HAVE
                 propiedades inmobiliarias.         RN-010
                 El sistema debe verificar que el correo electrónico no esté ya
                                                    RN-001
         RF-019  registrado antes de crear un nuevo usuario. Si existe, retorna MUST HAVE
                                                    RN-002
                 error.
                 El sistema debe invalidar los tokens JWT y cerrar activamente
         RF-020  las sesiones de Firebase Auth de un usuario en todos los RN-011 MUST HAVE
                 dispositivos si su cuenta es desactivada.
                 El sistema debe permitir la recuperación de contraseña para
         RF-021                                     RN-001   MUST HAVE
                 todos los usuarios, menos el administrador.
                 El sistema debe evaluar el estado comercial de la unidad
                 vinculada al cliente ("Separado" vs "Vendido"). Si el estado es
                                                    RN-014
         RF-022  "Separado", el sistema debe renderizar el Modo de Espera: MUST HAVE
                                                    RN-008
                 bloquear todos los módulos del portal y mostrar únicamente la
                 información mínima requerida de la separación.
                 El sistema debe generar un registro automatizado (Audit Log)
                                                    RN-002
                 de toda acción de creación, modificación o eliminación sobre
         RF-023                                     RN-006   NICE TO HAVE
                 hitos legales, contratos y estados financieros, registrando el
                                                    RN-007
                 ID del usuario corporativo, marca de tiempo y dirección IP
                 Al crear un nuevo hito constructivo maestro en un proyecto, el
                                                    RN-004
         RF-024  sistema debe propagarlo automáticamente a todos los pisos MUST HAVE
                                                    RN-010
                 existentes, creando los registros correspondientes.
                 Al crear un proyecto, el sistema debe generar
                 automáticamente los hitos estándar de construcción definidos
                                                    RN-004
         RF-025  por la empresa (Anteproyecto, Licencia, Demolición, Inicio de MUST HAVE
                                                    RN-010
                 obra, Excavación, Cimentación, Casco, Acabados húmedos,
                 Acabados secos, Inmueble terminado).
                 El sistema debe impedir que el usuario Admin se desactive a
         RF-026                                     RN-002   MUST HAVE
                 sí mismo o cambie su propio rol, retornando un error explícito.
                 El sistema debe permitir gestionar la estructura física de un
                 proyecto (torres, pisos y unidades) mediante endpoints RN-003
         RF-027                                              MUST HAVE
                 individuales para crear, modificar y eliminar cada elemento de RN-010
                 la jerarquía de forma independiente.
                 El sistema debe permitir a usuarios con permiso de obra
                 crear, editar y eliminar reportes periódicos de avance de obra
         RF-028                                     RN-004   MUST HAVE
                 que incluyan título, hitos consolidados, descripción y archivos
                 multimedia asociados.
                 El sistema debe gestionar las etapas del proceso comercial
                 de un expediente (SEPARACION, CONTRATO, PAGO, RN-007
         RF-029                                              MUST HAVE
                 ENTREGA, SANEAMIENTO), permitiendo crear, actualizar RN-009
                 estado y consultar las etapas asociadas a cada contrato.
                 El sistema debe gestionar los hitos del proceso de compra
                 dentro de cada etapa comercial, permitiendo crearlos,
                                                    RN-007
         RF-030  actualizar su estado (PENDIENTE, EN_PROGRESO, MUST HAVE
                                                    RN-009
                 COMPLETADO) y eliminarlos, validando la precedencia entre
                 hitos.


### Tablas de la página


#### Tabla 1

| RF-018 | El sistema debe permitir a los clientes gestionar múltiples<br>propiedades inmobiliarias. | RN-008<br>RN-010 | MUST HAVE |
| --- | --- | --- | --- |
| RF-019 | El sistema debe verificar que el correo electrónico no esté ya<br>registrado antes de crear un nuevo usuario. Si existe, retorna<br>error. | RN-001<br>RN-002 | MUST HAVE |
| RF-020 | El sistema debe invalidar los tokens JWT y cerrar activamente<br>las sesiones de Firebase Auth de un usuario en todos los<br>dispositivos si su cuenta es desactivada. | RN-011 | MUST HAVE |
| RF-021 | El sistema debe permitir la recuperación de contraseña para<br>todos los usuarios, menos el administrador. | RN-001 | MUST HAVE |
| RF-022 | El sistema debe evaluar el estado comercial de la unidad<br>vinculada al cliente ("Separado" vs "Vendido"). Si el estado es<br>"Separado", el sistema debe renderizar el Modo de Espera:<br>bloquear todos los módulos del portal y mostrar únicamente la<br>información mínima requerida de la separación. | RN-014<br>RN-008 | MUST HAVE |
| RF-023 | El sistema debe generar un registro automatizado (Audit Log)<br>de toda acción de creación, modificación o eliminación sobre<br>hitos legales, contratos y estados financieros, registrando el<br>ID del usuario corporativo, marca de tiempo y dirección IP | RN-002<br>RN-006<br>RN-007 | NICE TO HAVE |
| RF-024 | Al crear un nuevo hito constructivo maestro en un proyecto, el<br>sistema debe propagarlo automáticamente a todos los pisos<br>existentes, creando los registros correspondientes. | RN-004<br>RN-010 | MUST HAVE |
| RF-025 | Al crear un proyecto, el sistema debe generar<br>automáticamente los hitos estándar de construcción definidos<br>por la empresa (Anteproyecto, Licencia, Demolición, Inicio de<br>obra, Excavación, Cimentación, Casco, Acabados húmedos,<br>Acabados secos, Inmueble terminado). | RN-004<br>RN-010 | MUST HAVE |
| RF-026 | El sistema debe impedir que el usuario Admin se desactive a<br>sí mismo o cambie su propio rol, retornando un error explícito. | RN-002 | MUST HAVE |
| RF-027 | El sistema debe permitir gestionar la estructura física de un<br>proyecto (torres, pisos y unidades) mediante endpoints<br>individuales para crear, modificar y eliminar cada elemento de<br>la jerarquía de forma independiente. | RN-003<br>RN-010 | MUST HAVE |
| RF-028 | El sistema debe permitir a usuarios con permiso de obra<br>crear, editar y eliminar reportes periódicos de avance de obra<br>que incluyan título, hitos consolidados, descripción y archivos<br>multimedia asociados. | RN-004 | MUST HAVE |
| RF-029 | El sistema debe gestionar las etapas del proceso comercial<br>de un expediente (SEPARACION, CONTRATO, PAGO,<br>ENTREGA, SANEAMIENTO), permitiendo crear, actualizar<br>estado y consultar las etapas asociadas a cada contrato. | RN-007<br>RN-009 | MUST HAVE |
| RF-030 | El sistema debe gestionar los hitos del proceso de compra<br>dentro de cada etapa comercial, permitiendo crearlos,<br>actualizar su estado (PENDIENTE, EN_PROGRESO,<br>COMPLETADO) y eliminarlos, validando la precedencia entre<br>hitos. | RN-007<br>RN-009 | MUST HAVE |


---

## Página 75

                 El sistema debe gestionar los requisitos documentales
                 asociados a cada etapa comercial, permitiendo crearlos,
         RF-031                                     RN-007   MUST HAVE
                 actualizar metadatos, eliminar, marcar estado y asociar
                 archivos de respaldo mediante carga directa.
                 El sistema debe proporcionar un stepper (visor secuencial)
                 completo del proceso comercial que consolide las 5 etapas
         RF-032  del expediente con sus hitos de compra y requisitos RN-008 MUST HAVE
                 documentales asociados, accesible tanto para el cliente como
                 para el personal autorizado.
                 El sistema debe permitir asignar y desasignar asesores
         RF-033  comerciales a contratos (expedientes), registrando el RN-001 NICE TO HAVE
                 responsable comercial de cada vinculación.
                 El sistema debe permitir al Asesor Comercial registrar y
                 asociar más de un perfil de cliente a una misma unidad
                 inmobiliaria y su respectivo contrato, cuando la adquisición se
         RF-034  realice bajo la modalidad de bienes mancomunados, sociedad RN-015 NICE TO HAVE
                 conyugal o copropiedad. Asimismo, debe habilitar el acceso
                 independiente a cada co-titular manteniendo la información
                 sincronizada.
                 El sistema debe obligar al Cliente a cambiar su contraseña
         RF-035                                     RN-001   NICE TO HAVE
                 temporal durante su primer inicio de sesión exitoso.
                 Cada activo inmobiliario debe contar con un link de recorrido
         RF-036                                     RN-015   NICE TO HAVE
                 virtual siempre que la empresa lo haya proporcionado.
                 El sistema debe permitir vincular a múltiples clientes
                 (copropietarios) como invitados a una misma cita agendada, RN-012
         RF-037                                              MUST HAVE
                 sincronizando el evento en los calendarios de todos los RN-015
                 perfiles asociados al contrato.
                 El sistema debe integrar la API de Google Calendar
                 exclusivamente para la sincronización y envío de citas
                                                             OUT OF
         RF-038  creadas por el equipo operativo. La interacción del cliente en RN-012
                                                             SCOPE
                 el portal se limitará a flujos reactivos (confirmar, proponer
                 reprogramación o declinar)
              7.5. REQUERIMIENTOS NO FUNCIONALES
            N°           Descripción del Requerimiento No Funcional Prioridad
                   La base de datos y el almacenamiento de archivos deben contar con
         RNF-001   cifrado en reposo (ej. AES-256) para proteger la información NICE TO HAVE
                   personal e identificable (PII) y los contratos de los clientes.
                   Las descargas de archivos deben realizarse estrictamente mediante
         RNF-002   Signed URLs con expiración máxima de 15 minutos para evitar MUST HAVE
                   exposición pública.
                   El sistema debe invalidar inmediatamente los tokens de sesión
         RNF-003   activos al desactivar un usuario desde el panel, y ejecutar un cierre MUST HAVE
                   automático tras 30 minutos de inactividad.


### Tablas de la página


#### Tabla 1

| RF-031 | El sistema debe gestionar los requisitos documentales<br>asociados a cada etapa comercial, permitiendo crearlos,<br>actualizar metadatos, eliminar, marcar estado y asociar<br>archivos de respaldo mediante carga directa. | RN-007 | MUST HAVE |
| --- | --- | --- | --- |
| RF-032 | El sistema debe proporcionar un stepper (visor secuencial)<br>completo del proceso comercial que consolide las 5 etapas<br>del expediente con sus hitos de compra y requisitos<br>documentales asociados, accesible tanto para el cliente como<br>para el personal autorizado. | RN-008 | MUST HAVE |
| RF-033 | El sistema debe permitir asignar y desasignar asesores<br>comerciales a contratos (expedientes), registrando el<br>responsable comercial de cada vinculación. | RN-001 | NICE TO HAVE |
| RF-034 | El sistema debe permitir al Asesor Comercial registrar y<br>asociar más de un perfil de cliente a una misma unidad<br>inmobiliaria y su respectivo contrato, cuando la adquisición se<br>realice bajo la modalidad de bienes mancomunados, sociedad<br>conyugal o copropiedad. Asimismo, debe habilitar el acceso<br>independiente a cada co-titular manteniendo la información<br>sincronizada. | RN-015 | NICE TO HAVE |
| RF-035 | El sistema debe obligar al Cliente a cambiar su contraseña<br>temporal durante su primer inicio de sesión exitoso. | RN-001 | NICE TO HAVE |
| RF-036 | Cada activo inmobiliario debe contar con un link de recorrido<br>virtual siempre que la empresa lo haya proporcionado. | RN-015 | NICE TO HAVE |
| RF-037 | El sistema debe permitir vincular a múltiples clientes<br>(copropietarios) como invitados a una misma cita agendada,<br>sincronizando el evento en los calendarios de todos los<br>perfiles asociados al contrato. | RN-012<br>RN-015 | MUST HAVE |
| RF-038 | El sistema debe integrar la API de Google Calendar<br>exclusivamente para la sincronización y envío de citas<br>creadas por el equipo operativo. La interacción del cliente en<br>el portal se limitará a flujos reactivos (confirmar, proponer<br>reprogramación o declinar) | RN-012 | OUT OF<br>SCOPE |


#### Tabla 2

| N° | Descripción del Requerimiento No Funcional | Prioridad |
| --- | --- | --- |
| RNF-001 | La base de datos y el almacenamiento de archivos deben contar con<br>cifrado en reposo (ej. AES-256) para proteger la información<br>personal e identificable (PII) y los contratos de los clientes. | NICE TO HAVE |
| RNF-002 | Las descargas de archivos deben realizarse estrictamente mediante<br>Signed URLs con expiración máxima de 15 minutos para evitar<br>exposición pública. | MUST HAVE |
| RNF-003 | El sistema debe invalidar inmediatamente los tokens de sesión<br>activos al desactivar un usuario desde el panel, y ejecutar un cierre<br>automático tras 30 minutos de inactividad. | MUST HAVE |


---

## Página 76

                   El backend debe validar en cada petición (vía Token JWT) que el ID
         RNF-004   del cliente coincida con el propietario de la unidad consultada, MUST HAVE
                   rechazando peticiones a nivel de backend.
                   El Dashboard inicial debe renderizarse en un tiempo < 3s y las
         RNF-005   consultas al backend deben responder en < 2s en condiciones de NICE TO HAVE
                   red estándar (3G/4G/Wifi).
                   El frontend debe validar formatos permitidos (PNG, JPG, TIFF, MP4
                   para multimedia; PDF para documentos legales; PDF, PNG, JPG
                   para comprobantes; y DWG, XLSX, DOCX para documentación MUST HAVE
         RNF-006
                   técnica de obra) y pesos máximos: PDF 5 MB, videos 100 MB,
                   imágenes 10 MB. Puede aplicar compresión en el navegador antes
                   de almacenarlos.
                   Los servicios expuestos para el Portal Cliente deben garantizar una
         RNF-007   alta disponibilidad de al menos 99.9% de uptime (excluyendo NICE TO HAVE
                   ventanas de mantenimiento programadas).
                   El frontend (Portal Empresa y Portal Cliente) debe ser 100%
         RNF-008   operativo y adaptable en resoluciones de dispositivos móviles NICE TO HAVE
                   (iOS/Android), tablets y monitores de escritorio.
                   La interfaz (modales y breadcrumbs) debe gestionar el estado global
         RNF-009   de la aplicación para permitir la navegación de ida y vuelta sin NICE TO HAVE
                   pérdida del contexto o filtros previamente aplicados por el usuario.
                   La aplicación backend debe estar empaquetada como una
                   aplicación Spring Boot 4.0.6 sobre Java 21, desplegable en
         RNF-010                                           MUST HAVE
                   contenedores Docker con perfiles diferenciados para desarrollo,
                   prueba y producción.
                   El sistema debe registrar todas las operaciones de creación,
         RNF-011   modificación y eliminación sobre entidades críticas, incluyendo el ID NICE TO HAVE
                   del usuario, dirección IP y marca de tiempo.
            8. MODELO DE DATOS


### Tablas de la página


#### Tabla 1

| RNF-004 | El backend debe validar en cada petición (vía Token JWT) que el ID<br>del cliente coincida con el propietario de la unidad consultada,<br>rechazando peticiones a nivel de backend. | MUST HAVE |
| --- | --- | --- |
| RNF-005 | El Dashboard inicial debe renderizarse en un tiempo < 3s y las<br>consultas al backend deben responder en < 2s en condiciones de<br>red estándar (3G/4G/Wifi). | NICE TO HAVE |
| RNF-006 | El frontend debe validar formatos permitidos (PNG, JPG, TIFF, MP4<br>para multimedia; PDF para documentos legales; PDF, PNG, JPG<br>para comprobantes; y DWG, XLSX, DOCX para documentación<br>técnica de obra) y pesos máximos: PDF 5 MB, videos 100 MB,<br>imágenes 10 MB. Puede aplicar compresión en el navegador antes<br>de almacenarlos. | MUST HAVE |
| RNF-007 | Los servicios expuestos para el Portal Cliente deben garantizar una<br>alta disponibilidad de al menos 99.9% de uptime (excluyendo<br>ventanas de mantenimiento programadas). | NICE TO HAVE |
| RNF-008 | El frontend (Portal Empresa y Portal Cliente) debe ser 100%<br>operativo y adaptable en resoluciones de dispositivos móviles<br>(iOS/Android), tablets y monitores de escritorio. | NICE TO HAVE |
| RNF-009 | La interfaz (modales y breadcrumbs) debe gestionar el estado global<br>de la aplicación para permitir la navegación de ida y vuelta sin<br>pérdida del contexto o filtros previamente aplicados por el usuario. | NICE TO HAVE |
| RNF-010 | La aplicación backend debe estar empaquetada como una<br>aplicación Spring Boot 4.0.6 sobre Java 21, desplegable en<br>contenedores Docker con perfiles diferenciados para desarrollo,<br>prueba y producción. | MUST HAVE |
| RNF-011 | El sistema debe registrar todas las operaciones de creación,<br>modificación y eliminación sobre entidades críticas, incluyendo el ID<br>del usuario, dirección IP y marca de tiempo. | NICE TO HAVE |


---

## Página 77

            9. DICCIONARIO DE DATOS
            Tabla: proyecto
            Descripción: Centraliza la información general de los proyectos inmobiliarios, su ubicación geográfica y
            características de certificación ecológica.
            Campo            Tamañ Tipo de Dato Descripción       NULL


### Tablas de la página


#### Tabla 1

| Campo | Tamañ | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |


---

## Página 78

                               o
                                             Identificador único del proyecto
            uuid_proyecto      36   UUID (PK)                      NO
                                             (GenerationType.UUID)
                                             Nombre comercial y oficial del
            nombre            255   VARCHAR                        NO
                                             proyecto inmobiliario, es unico
                                             Descripción general o detalles
            descripcion       255   VARCHAR                        SÍ
                                             adicionales del proyecto
                                             Indica si el proyecto posee
            precertificacion_edge_le
                               -    BOOLEAN  certificación ecológica EDGE o SÍ
            ed
                                             LEED (Predeterminado: false)
                                             LInk de recorrido virtual del
            link_recorrido_virtual 255 VARCHAR                    Si
                                             proyecto
                                             Departamento político/geográfico
            departamento      255   VARCHAR                        SÍ
                                             de ubicación del proyecto
                                             Distrito municipal donde se localiza
            distrito          255   VARCHAR                        SÍ
                                             el proyecto
                                             Dirección física detallada de la
            direccion         255   VARCHAR                        SÍ
                                             obra
            fecha_inicio       -      DATE   Fecha de inicio formal del proyecto SÍ
                                             Fecha estimada o real de
            fecha_fin          -      DATE                         SÍ
                                             finalización de la obra
                                             Fecha y hora automática de
            created_at         -    TIMESTAMP                      NO
                                             creación del registro
            Tabla: torre
            Descripción: Representa las torres, bloques o etapas estructurales independientes pertenecientes a un
            proyecto específico.
            Campo        Tamaño Tipo de Dato Descripción          NULL
                                         Identificador único de la torre
            id_torre       20   BIGINT (PK)                       NO
                                         (Auto-incremental)
                                         Nombre o código identificador de la torre
            nombre         255   VARCHAR                          NO
                                         (ej: Torre A)
            nro_piso       -     INTEGER número de pisos en la torre NO
                                         Vínculo con el proyecto al que pertenece
            uuid_proyecto  36    UUID (FK)                        NO
                                         la torre


### Tablas de la página


#### Tabla 1

|  | o |  |  |  |
| --- | --- | --- | --- | --- |
| uuid_proyecto | 36 | UUID (PK) | Identificador único del proyecto<br>(GenerationType.UUID) | NO |
| nombre | 255 | VARCHAR | Nombre comercial y oficial del<br>proyecto inmobiliario, es unico | NO |
| descripcion | 255 | VARCHAR | Descripción general o detalles<br>adicionales del proyecto | SÍ |
| precertificacion_edge_le<br>ed | - | BOOLEAN | Indica si el proyecto posee<br>certificación ecológica EDGE o<br>LEED (Predeterminado: false) | SÍ |
| link_recorrido_virtual | 255 | VARCHAR | LInk de recorrido virtual del<br>proyecto | Si |
| departamento | 255 | VARCHAR | Departamento político/geográfico<br>de ubicación del proyecto | SÍ |
| distrito | 255 | VARCHAR | Distrito municipal donde se localiza<br>el proyecto | SÍ |
| direccion | 255 | VARCHAR | Dirección física detallada de la<br>obra | SÍ |
| fecha_inicio | - | DATE | Fecha de inicio formal del proyecto | SÍ |
| fecha_fin | - | DATE | Fecha estimada o real de<br>finalización de la obra | SÍ |
| created_at | - | TIMESTAMP | Fecha y hora automática de<br>creación del registro | NO |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| id_torre | 20 | BIGINT (PK) | Identificador único de la torre<br>(Auto-incremental) | NO |
| nombre | 255 | VARCHAR | Nombre o código identificador de la torre<br>(ej: Torre A) | NO |
| nro_piso | - | INTEGER | número de pisos en la torre | NO |
| uuid_proyecto | 36 | UUID (FK) | Vínculo con el proyecto al que pertenece<br>la torre | NO |


---

## Página 79

            Tabla: piso
            Descripción: Registra los diferentes niveles o pisos que componen una torre específica.
            Campo       Tamaño Tipo de Dato Descripción           NULL
                                       Identificador único del piso
            id_piso      20   BIGINT (PK)                          NO
                                       (Auto-incremental)
            nro_piso     10    INTEGER Número correlativo o nivel del piso NO
                                       Vínculo con la torre a la que pertenece el
            id_torre     20   BIGINT (FK)                          NO
                                       piso
            Tabla: activo
            Descripción: Unidades inmobiliarias específicas comerciables asociadas a un piso (departamentos,
            cocheras, depósitos).
            Campo          Tamaño Tipo de Dato Descripción        NULL
                                           Identificador único del activo
            uuid_activo      36    UUID (PK)                       NO
                                           (GenerationType.UUID)
                                           Número identificador físico comercial
            nro              255   VARCHAR                         NO
                                           (ej: Dpto 401, Cochera 12)
                                           Tipo de unidad inmobiliaria
            tipo             255   VARCHAR (DEPARTAMENTO | COCHERA | NO
                                           DEPOSITO)
                                           Área total construida expresada en
            area_m2           -    NUMERIC                         NO
                                           metros cuadrados
            area_techada      -    NUMERIC Área techada del activo NO
                                           Situación actual de venta
            estado_comercial 255   VARCHAR (DISPONIBLE | SEPARADO | NO
                                           VENDIDO | NO_APLICA)
                                           Precio de lista o comercial asignado
            precio            -    NUMERIC                         SÍ
                                           al activo
                                           Notas o descripción técnica
            descripcion      255   VARCHAR                         SÍ
                                           complementaria
            tiene_recorrido_virtua         Determina si el activo tiene link de
                              -    BOOLEAN                         SÍ
            l                              recorrido virtual.
                                           Fecha automática de creación del
            created_at        -   TIMESTAMP                        NO
                                           registro
                                           Fecha y hora de la última
            updated_at        -   TIMESTAMP                        SÍ
                                           modificación del registro


### Tablas de la página


#### Tabla 1

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| id_piso | 20 | BIGINT (PK) | Identificador único del piso<br>(Auto-incremental) | NO |
| nro_piso | 10 | INTEGER | Número correlativo o nivel del piso | NO |
| id_torre | 20 | BIGINT (FK) | Vínculo con la torre a la que pertenece el<br>piso | NO |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_activo | 36 | UUID (PK) | Identificador único del activo<br>(GenerationType.UUID) | NO |
| nro | 255 | VARCHAR | Número identificador físico comercial<br>(ej: Dpto 401, Cochera 12) | NO |
| tipo | 255 | VARCHAR | Tipo de unidad inmobiliaria<br>(DEPARTAMENTO \| COCHERA \|<br>DEPOSITO) | NO |
| area_m2 | - | NUMERIC | Área total construida expresada en<br>metros cuadrados | NO |
| area_techada | - | NUMERIC | Área techada del activo | NO |
| estado_comercial | 255 | VARCHAR | Situación actual de venta<br>(DISPONIBLE \| SEPARADO \|<br>VENDIDO \| NO_APLICA) | NO |
| precio | - | NUMERIC | Precio de lista o comercial asignado<br>al activo | SÍ |
| descripcion | 255 | VARCHAR | Notas o descripción técnica<br>complementaria | SÍ |
| tiene_recorrido_virtua<br>l | - | BOOLEAN | Determina si el activo tiene link de<br>recorrido virtual. | SÍ |
| created_at | - | TIMESTAMP | Fecha automática de creación del<br>registro | NO |
| updated_at | - | TIMESTAMP | Fecha y hora de la última<br>modificación del registro | SÍ |


---

## Página 80

                                           Vínculo con el piso donde se localiza
            id_piso          20   BIGINT (FK)                      NO
                                           físicamente el activo
                                           Vínculo con el contrato/cliente actual
            uuid_usuario_activo 36 UUID (FK)                       SÍ
                                           asociado si aplica
            Tabla: hito
            Descripción: Establece los hitos de control generales o fases constructivas globales definidas para un
            proyecto.
                                  Tipo de
            Campo         Tamaño         Descripción              NULL
                                  Dato
                                         Identificador único del hito general
            uuid_hito       36   UUID (PK)                         NO
                                         (GenerationType.UUID)
                                         Orden secuencial cronológico del hito
            orden           10   INTEGER                           NO
                                         dentro del proyecto
            titulo         255   VARCHAR Título descriptivo del hito técnico u obra SÍ
                                         Estado actual del hito global
            estado         255   VARCHAR (PENDIENTE | EN_PROGRESO | NO
                                         COMPLETADO)
                                         Fecha real en la que se dio por concluido
            fecha_completado -    DATE                             SÍ
                                         el hito
            uuid_proyecto   36   UUID (FK) Vínculo directo con el proyecto asociado NO
            Tabla: hito_piso
            Descripción: Tabla intermedia para el seguimiento granular del estado físico de los hitos constructivos
            celda por celda (por cada piso).
            Campo         Tamaño Tipo de Dato Descripción         NULL
                                          Identificador único de la relación
            uuid_hito_piso  36    UUID (PK)                        NO
                                          hito-piso
                                          Estado específico del hito en este nivel
            estado         255    VARCHAR (PENDIENTE | EN_PROGRESO | NO
                                          COMPLETADO)
                                          Fecha de conclusión del hito
            fecha_completado -     DATE                            SÍ
                                          exclusivamente en este piso
                                          Anotaciones de control, retrasos o
            observaciones  255    VARCHAR                          SÍ
                                          especificaciones técnicas
                                          Fecha de registro inicial del
            created_at      -    TIMESTAMP                         NO
                                          seguimiento


### Tablas de la página


#### Tabla 1

| id_piso | 20 | BIGINT (FK) | Vínculo con el piso donde se localiza<br>físicamente el activo | NO |
| --- | --- | --- | --- | --- |
| uuid_usuario_activo | 36 | UUID (FK) | Vínculo con el contrato/cliente actual<br>asociado si aplica | SÍ |


#### Tabla 2

| Campo | Tamaño | Tipo de<br>Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_hito | 36 | UUID (PK) | Identificador único del hito general<br>(GenerationType.UUID) | NO |
| orden | 10 | INTEGER | Orden secuencial cronológico del hito<br>dentro del proyecto | NO |
| titulo | 255 | VARCHAR | Título descriptivo del hito técnico u obra | SÍ |
| estado | 255 | VARCHAR | Estado actual del hito global<br>(PENDIENTE \| EN_PROGRESO \|<br>COMPLETADO) | NO |
| fecha_completado | - | DATE | Fecha real en la que se dio por concluido<br>el hito | SÍ |
| uuid_proyecto | 36 | UUID (FK) | Vínculo directo con el proyecto asociado | NO |


#### Tabla 3

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_hito_piso | 36 | UUID (PK) | Identificador único de la relación<br>hito-piso | NO |
| estado | 255 | VARCHAR | Estado específico del hito en este nivel<br>(PENDIENTE \| EN_PROGRESO \|<br>COMPLETADO) | NO |
| fecha_completado | - | DATE | Fecha de conclusión del hito<br>exclusivamente en este piso | SÍ |
| observaciones | 255 | VARCHAR | Anotaciones de control, retrasos o<br>especificaciones técnicas | SÍ |
| created_at | - | TIMESTAMP | Fecha de registro inicial del<br>seguimiento | NO |


---

## Página 81

                                          Fecha de la última actualización
            updated_at      -    TIMESTAMP                         SÍ
                                          técnica de obra
            id_piso         20   BIGINT (FK) Vínculo con el piso evaluado NO
                                          Vínculo con el hito general de control.
            uuid_hito       36    UUID (FK) Configura índice único compuesto NO
                                          (id_piso, uuid_hito)
            Tabla: usuario_activo
            Descripción: Registra el contrato oficial, términos de adquisición y el vínculo comercial formal entre un
            cliente y el activo adquirido.
            Campo          Tamaño Tipo de Dato Descripción        NULL
                                           Identificador único del contrato o
            uuid_usuario_activo 36 UUID (PK)                       NO
                                           relación de adquisición
                                           Modalidad financiera elegida (Crédito
            tipo_financiamiento 255 VARCHAR                        SÍ
                                           Directo, Crédito Hipotecario, etc.)
                                           Fecha y hora formal de la firma de
            fecha_adquisicion -   TIMESTAMP                        SÍ
                                           adquisición o minuta
                                           Indica si la relación contractual
            vigente          -    BOOLEAN  permanece activa y válida SÍ
                                           (Predeterminado: true)
                                           fecha de entrega prevista de los
            fecha_completado .     INTEGER activos de un usuario, estipuladas en NO
                                           un contrato
                                           Asesor asociado al contrato del
            id_asesor        -     INTEGER                         SI
                                           cliente
                                           Fecha de inserción del contrato en el
            created_at       -    TIMESTAMP                        NO
                                           sistema
                                           Fecha del último cambio en el estado
            updated_at       -    TIMESTAMP                        SÍ
                                           del contrato
            Tabla: usuario_activo_clientes
            Descripción: Tabla intermedia M:N para asociar múltiples copropietarios o clientes a una sola relación
            contractual de activo.
                                   Tipo de
            Campo          Tamaño         Descripción             NULL
                                    Dato
                                  UUID (PK,
            uuid_usuario_activo 36        Vínculo con la relación contractual NO
                                    FK)


### Tablas de la página


#### Tabla 1

| updated_at | - | TIMESTAMP | Fecha de la última actualización<br>técnica de obra | SÍ |
| --- | --- | --- | --- | --- |
| id_piso | 20 | BIGINT (FK) | Vínculo con el piso evaluado | NO |
| uuid_hito | 36 | UUID (FK) | Vínculo con el hito general de control.<br>Configura índice único compuesto<br>(id_piso, uuid_hito) | NO |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_usuario_activo | 36 | UUID (PK) | Identificador único del contrato o<br>relación de adquisición | NO |
| tipo_financiamiento | 255 | VARCHAR | Modalidad financiera elegida (Crédito<br>Directo, Crédito Hipotecario, etc.) | SÍ |
| fecha_adquisicion | - | TIMESTAMP | Fecha y hora formal de la firma de<br>adquisición o minuta | SÍ |
| vigente | - | BOOLEAN | Indica si la relación contractual<br>permanece activa y válida<br>(Predeterminado: true) | SÍ |
| fecha_completado | . | INTEGER | fecha de entrega prevista de los<br>activos de un usuario, estipuladas en<br>un contrato | NO |
| id_asesor | - | INTEGER | Asesor asociado al contrato del<br>cliente | SI |
| created_at | - | TIMESTAMP | Fecha de inserción del contrato en el<br>sistema | NO |
| updated_at | - | TIMESTAMP | Fecha del último cambio en el estado<br>del contrato | SÍ |


#### Tabla 3

| Campo | Tamaño | Tipo de<br>Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_usuario_activo | 36 | UUID (PK,<br>FK) | Vínculo con la relación contractual | NO |


---

## Página 82

                                  INTEGER Vínculo con la entidad Usuario (Cliente
            id_usuario       10                                    NO
                                   (PK, FK) adquiriente)
            Tabla: reporte
            Descripción: Almacena los reportes periódicos formales emitidos sobre el avance general y porcentaje
            físico de la obra de un proyecto.
            Campo         Tamaño Tipo de Dato Descripción         NULL
                                           Identificador único del reporte
            uuid_reporte    36    UUID (PK)                        NO
                                           periódico
            uuid_proyecto   36    UUID (FK) Vínculo con el proyecto reportado NO
                                           Nombre identificador del periodo
            titulo_periodo  255   VARCHAR  reportado (ej: Avance Mensual - NO
                                           Junio 2026)
                                           Porcentaje acumulado de progreso
            porcentaje_avance 5,2 NUMERIC(5,2)                     NO
                                           de obra
                                           Comentarios narrativos extensos
            descripcion     -      TEXT                            SÍ
                                           sobre el estado del proyecto
                                           Fecha de emisión oficial del
            fecha           -      DATE                            NO
                                           documento de reporte
                                           Fecha técnica de almacenamiento
            created_at      -    TIMESTAMP                         NO
                                           del registro
            Tabla: reporte_hitos
            Descripción: Colección dependiente (ElementCollection) que enumera las descripciones de hitos
            puntuales alcanzados en un reporte específico.
            Campo        Tamaño Tipo de Dato Descripción          NULL
            uuid_reporte   36   UUID (FK) Vínculo con el reporte maestro asociado NO
                                        Breve descripción del logro o hito
            hito          255   VARCHAR                            SÍ
                                        constructivo consolidado en el periodo
            Tabla: usuario
            Descripción: Entidad central de usuarios. Centraliza credenciales de Firebase, datos de identidad,
            contacto y tipificación (empleados/clientes).
            Campo          Tamaño Tipo de Dato Descripción        NULL
            id               10   INTEGER (PK) Identificador único secuencial NO


### Tablas de la página


#### Tabla 1

| id_usuario | 10 | INTEGER<br>(PK, FK) | Vínculo con la entidad Usuario (Cliente<br>adquiriente) | NO |
| --- | --- | --- | --- | --- |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_reporte | 36 | UUID (PK) | Identificador único del reporte<br>periódico | NO |
| uuid_proyecto | 36 | UUID (FK) | Vínculo con el proyecto reportado | NO |
| titulo_periodo | 255 | VARCHAR | Nombre identificador del periodo<br>reportado (ej: Avance Mensual -<br>Junio 2026) | NO |
| porcentaje_avance | 5,2 | NUMERIC(5,2) | Porcentaje acumulado de progreso<br>de obra | NO |
| descripcion | - | TEXT | Comentarios narrativos extensos<br>sobre el estado del proyecto | SÍ |
| fecha | - | DATE | Fecha de emisión oficial del<br>documento de reporte | NO |
| created_at | - | TIMESTAMP | Fecha técnica de almacenamiento<br>del registro | NO |


#### Tabla 3

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_reporte | 36 | UUID (FK) | Vínculo con el reporte maestro asociado | NO |
| hito | 255 | VARCHAR | Breve descripción del logro o hito<br>constructivo consolidado en el periodo | SÍ |


#### Tabla 4

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| id | 10 | INTEGER (PK) | Identificador único secuencial | NO |


---

## Página 83

                                           autoincremental del usuario
                                   VARCHAR Identificador único correlacionado de
            firebase_uuid    128                                   NO
                                   (Unique) Firebase Authentication (Indexado)
                                           Clasificación del perfil de usuario
            tipo_usuario     20    VARCHAR                         NO
                                           (EMPLEADO | CLIENTE)
                                           Rol funcional asignado dentro del
            id_rol           10   INTEGER (FK)                     SÍ
                                           sistema de permisos
            nombre           100   VARCHAR Nombres de pila del usuario NO
                                           Apellidos paterno y materno del
            apellidos        100   VARCHAR                         SÍ
                                           usuario
                                   VARCHAR Número único de DNI, CE o
            documento_identidad 20                                 SÍ
                                   (Unique) Pasaporte
                                   VARCHAR Dirección de correo electrónico
            email            150                                   NO
                                   (Unique) (Indexado)
            telefono         20    VARCHAR Número telefónico de contacto SÍ
                                           Estado de habilitación del usuario
            activo            -    BOOLEAN                         NO
                                           para accesos (Predeterminado: true)
                                           Fecha y hora de alta del usuario en
            created_at        -   TIMESTAMP                        NO
                                           la plataforma
            Tabla: roles
            Descripción: Perfiles funcionales del negocio que agrupan un conjunto de permisos o funciones dentro de
            la aplicación.
            Campo       Tamaño Tipo de Dato Descripción           NULL
                                INTEGER Identificador único del rol
            id_rol        10                                      NO
                                 (PK)   (Auto-incremental)
                                        Código interno del rol (ADMIN | ASESOR |
                               VARCHAR
            nombre        50            LEGAL | TECNICO | POSTVENTA | NO
                                (Unique)
                                        CLIENTE)
                                        Explicación del alcance y área de negocio
            descripcion   200  VARCHAR                             SÍ
                                        asignada al rol
            Tabla: funcion
            Descripción: Catálogo granular de permisos o privilegios de grano fino del sistema requeridos para
            ejecutar operaciones.
            Campo        Tamaño Tipo de Dato Descripción          NULL


### Tablas de la página


#### Tabla 1

|  |  |  | autoincremental del usuario |  |
| --- | --- | --- | --- | --- |
| firebase_uuid | 128 | VARCHAR<br>(Unique) | Identificador único correlacionado de<br>Firebase Authentication (Indexado) | NO |
| tipo_usuario | 20 | VARCHAR | Clasificación del perfil de usuario<br>(EMPLEADO \| CLIENTE) | NO |
| id_rol | 10 | INTEGER (FK) | Rol funcional asignado dentro del<br>sistema de permisos | SÍ |
| nombre | 100 | VARCHAR | Nombres de pila del usuario | NO |
| apellidos | 100 | VARCHAR | Apellidos paterno y materno del<br>usuario | SÍ |
| documento_identidad | 20 | VARCHAR<br>(Unique) | Número único de DNI, CE o<br>Pasaporte | SÍ |
| email | 150 | VARCHAR<br>(Unique) | Dirección de correo electrónico<br>(Indexado) | NO |
| telefono | 20 | VARCHAR | Número telefónico de contacto | SÍ |
| activo | - | BOOLEAN | Estado de habilitación del usuario<br>para accesos (Predeterminado: true) | NO |
| created_at | - | TIMESTAMP | Fecha y hora de alta del usuario en<br>la plataforma | NO |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| id_rol | 10 | INTEGER<br>(PK) | Identificador único del rol<br>(Auto-incremental) | NO |
| nombre | 50 | VARCHAR<br>(Unique) | Código interno del rol (ADMIN \| ASESOR \|<br>LEGAL \| TECNICO \| POSTVENTA \|<br>CLIENTE) | NO |
| descripcion | 200 | VARCHAR | Explicación del alcance y área de negocio<br>asignada al rol | SÍ |


#### Tabla 3

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |


---

## Página 84

                                INTEGER Identificador único de la función
            id_funcion     10                                      NO
                                  (PK)  (Auto-incremental)
                                VARCHAR Código técnico único de verificación (ej:
            nombre_codigo  50                                      NO
                                 (Unique) PROY_VER, USER_GESTIONAR)
                                        Detalle específico de qué acción permite
            descripcion   200   VARCHAR                            SÍ
                                        realizar dicho código en el sistema
            Tabla: rol_funcion
            Descripción: Tabla intermedia M:N que mapea y asocia las funciones técnicas autorizadas a cada rol
            comercial.
            Campo       Tamaño Tipo de Dato Descripción           NULL
                                INTEGER
            id_rol        10            Vínculo de asociación con la tabla de Roles NO
                                (PK, FK)
                                INTEGER Vínculo de asociación con la tabla de
            id_funcion    10                                       NO
                                (PK, FK) Funciones
            Tabla: cronograma_pago
            Descripción: Estructura financiera principal asociada a un contrato, detallando el pacto económico global y
            cuotas programadas.
            Campo          Tamaño Tipo de Dato Descripción        NULL
                                            Identificador único de la cabecera
            uuid_cronograma 36     UUID (PK)                       NO
                                            del cronograma financiero
                                  UUID (Unique, Referencia única al contrato /
            uuid_usuario_activo 36                                 NO
                                     FK)    vínculo cliente-activo
                                            Monto total acordado para la venta
            total_pactado   12,2 NUMERIC(12,2)                     NO
                                            del inmueble
            pago_separacion 12,2 NUMERIC(12,2) Pago de separación del activo SÍ
            pago_inicial    12,2 NUMERIC(12,2) Pago inicial del contrato SI
                                            Cantidad total de armadas o cuotas
            numero_cuotas   10     INTEGER                         SÍ
                                            mensuales divididas
                                            Estado global del cronograma
            estado          20     VARCHAR  (VIGENTE, CANCELADO,   NO
                                            EN_MORA, etc.)
                                            Fecha de generación del plan
            created_at       -    TIMESTAMP                        NO
                                            financiero


### Tablas de la página


#### Tabla 1

| id_funcion | 10 | INTEGER<br>(PK) | Identificador único de la función<br>(Auto-incremental) | NO |
| --- | --- | --- | --- | --- |
| nombre_codigo | 50 | VARCHAR<br>(Unique) | Código técnico único de verificación (ej:<br>PROY_VER, USER_GESTIONAR) | NO |
| descripcion | 200 | VARCHAR | Detalle específico de qué acción permite<br>realizar dicho código en el sistema | SÍ |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| id_rol | 10 | INTEGER<br>(PK, FK) | Vínculo de asociación con la tabla de Roles | NO |
| id_funcion | 10 | INTEGER<br>(PK, FK) | Vínculo de asociación con la tabla de<br>Funciones | NO |


#### Tabla 3

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_cronograma | 36 | UUID (PK) | Identificador único de la cabecera<br>del cronograma financiero | NO |
| uuid_usuario_activo | 36 | UUID (Unique,<br>FK) | Referencia única al contrato /<br>vínculo cliente-activo | NO |
| total_pactado | 12,2 | NUMERIC(12,2) | Monto total acordado para la venta<br>del inmueble | NO |
| pago_separacion | 12,2 | NUMERIC(12,2) | Pago de separación del activo | SÍ |
| pago_inicial | 12,2 | NUMERIC(12,2) | Pago inicial del contrato | SI |
| numero_cuotas | 10 | INTEGER | Cantidad total de armadas o cuotas<br>mensuales divididas | SÍ |
| estado | 20 | VARCHAR | Estado global del cronograma<br>(VIGENTE, CANCELADO,<br>EN_MORA, etc.) | NO |
| created_at | - | TIMESTAMP | Fecha de generación del plan<br>financiero | NO |


---

## Página 85

                                            Fecha de última modificación de
            updated_at       -    TIMESTAMP                        SÍ
                                            montos o refinanciamiento
            Tabla: pago
            Descripción: Detalle individualizado por cada armada o cuota programada del cronograma, controlando
            los montos cobrados y pendientes.
            Campo         Tamaño  Tipo de Dato Descripción        NULL
                                           Identificador único de la transacción
            uuid_pago       36    UUID (PK)                        NO
                                           o cuota de pago
                                           Vínculo con el cronograma maestro
            uuid_cronograma 36    UUID (FK)                        NO
                                           al que pertenece la cuota
                                           Número correlativo de cuota
            nro_cuota       10     INTEGER                         NO
                                           correspondiente (ej: Cuota 1, 2, 3)
                                           Monto original obligatorio a pagar
            monto_programado 12,2 NUMERIC(12,2)                    NO
                                           según contrato
                                           Fecha máxima permitida de abono
            fecha_vencimiento -     DATE                           NO
                                           antes de incurrir en mora
                                           Estado de la cuota (PENDIENTE |
            estado          20    VARCHAR  PAGADO | VENCIDO |      NO
                                           REPROGRAMADO)
                                           Importe real total depositado y
            monto_pagado   12,2  NUMERIC(12,2)                     SÍ
                                           validado por el cliente
                                           Fecha y hora exacta en la que se
            fecha_pago      -     TIMESTAMP                        SÍ
                                           registró el cobro real
                                           Vínculo con el identificador del
            uuid_comprobante 36     UUID                           SÍ
                                           comprobante fiscal emitido
                                           ID del usuario interno (cajero/asesor)
            actualizado_por 10     INTEGER                         SÍ
                                           que procesó el pago
                                           Concepto de pago 'SEPARACION |
            concepto        20    VARCHAR                          NO
                                           INICIAL | CUOTA | COMPLETO'
            comentario      -       TEXT   comentario del pago     SI
            uuid_requisito_docu
                            -       UUID   requisito documental asociado SI
            mental
                                           cita asociada al pago como
            uuid_cita       -       UUID                           c
                                           recordatorio
                                           Fecha automática de creación de la
            created_at      -     TIMESTAMP                        NO
                                           cuota


### Tablas de la página


#### Tabla 1

| updated_at | - | TIMESTAMP | Fecha de última modificación de<br>montos o refinanciamiento | SÍ |
| --- | --- | --- | --- | --- |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_pago | 36 | UUID (PK) | Identificador único de la transacción<br>o cuota de pago | NO |
| uuid_cronograma | 36 | UUID (FK) | Vínculo con el cronograma maestro<br>al que pertenece la cuota | NO |
| nro_cuota | 10 | INTEGER | Número correlativo de cuota<br>correspondiente (ej: Cuota 1, 2, 3) | NO |
| monto_programado | 12,2 | NUMERIC(12,2) | Monto original obligatorio a pagar<br>según contrato | NO |
| fecha_vencimiento | - | DATE | Fecha máxima permitida de abono<br>antes de incurrir en mora | NO |
| estado | 20 | VARCHAR | Estado de la cuota (PENDIENTE \|<br>PAGADO \| VENCIDO \|<br>REPROGRAMADO) | NO |
| monto_pagado | 12,2 | NUMERIC(12,2) | Importe real total depositado y<br>validado por el cliente | SÍ |
| fecha_pago | - | TIMESTAMP | Fecha y hora exacta en la que se<br>registró el cobro real | SÍ |
| uuid_comprobante | 36 | UUID | Vínculo con el identificador del<br>comprobante fiscal emitido | SÍ |
| actualizado_por | 10 | INTEGER | ID del usuario interno (cajero/asesor)<br>que procesó el pago | SÍ |
| concepto | 20 | VARCHAR | Concepto de pago 'SEPARACION \|<br>INICIAL \| CUOTA \| COMPLETO' | NO |
| comentario | - | TEXT | comentario del pago | SI |
| uuid_requisito_docu<br>mental | - | UUID | requisito documental asociado | SI |
| uuid_cita | - | UUID | cita asociada al pago como<br>recordatorio | c |
| created_at | - | TIMESTAMP | Fecha automática de creación de la<br>cuota | NO |


---

## Página 86

                                           Fecha de última conciliación o
            updated_at      -     TIMESTAMP                        SÍ
                                           actualización de estado
            Tabla: cita
            Descripción: Módulo de agenda corporativa para la gestión de reuniones técnicas y comerciales entre
            asesores de la inmobiliaria y clientes.
                            Tamañ  Tipo de
            Campo                         Descripción             NULL
                              o     Dato
            uuid_cita        36   UUID (PK) Identificador único de la cita en agenda NO
                                   INTEGER ID del empleado interno encargado de
            id_gestor        10                                    NO
                                    (FK)  conducir la reunión/visita
                                   INTEGER ID del cliente comprador que asistirá al
            id_cliente       10                                    NO
                                    (FK)  evento
                                          Vínculo con el inmueble o lote objeto de
            uuid_activo      36   UUID (FK)                        NO
                                          la cita o inspección
                                          Finalidad de la reunión
                                          (CONFIRMACION_FECHA_ENTREGA
                                          | ENTREGA_LLAVES |
                                          REVISION_OBSERVACIONES |
            tipo_evento      50   VARCHAR                          NO
                                          FIRMA_MINUTA | FIRMA_ESCRITURA
                                          | INSPECCION_OBRA |
                                          JUNTA_PROPIETARIOS |
                                          RECORDATORIO_PAGO | OTRO)
            titulo           200  VARCHAR Asunto o título resumido de la cita SÍ
                                          Detalle de los puntos a tratar o
            descripcion       -     TEXT                           SÍ
                                          requerimientos previos de asistencia
                                          Lugar físico, sala, u enlace de
            ubicacion        300  VARCHAR                          SÍ
                                          videoconferencia (Meet/Zoom)
                                          Fecha y hora precisa de inicio
            fecha_inicio      -   TIMESTAMP                        NO
                                          programada del evento
                                          Fecha y hora de término programada
            fecha_fin         -   TIMESTAMP                        NO
                                          del evento
                                          Situación actual de la cita
                                          (PROGRAMADA | CONFIRMADA |
            estado_cita      30   VARCHAR                          NO
                                          CANCELADA | COMPLETADA |
                                          REPROGRAMACION_PENDIENTE)
                                          Validación explícita de aceptación
            confirmacion_cliente - BOOLEAN                         SÍ
                                          horaria por parte del cliente


### Tablas de la página


#### Tabla 1

| updated_at | - | TIMESTAMP | Fecha de última conciliación o<br>actualización de estado | SÍ |
| --- | --- | --- | --- | --- |


#### Tabla 2

| Campo | Tamañ<br>o | Tipo de<br>Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_cita | 36 | UUID (PK) | Identificador único de la cita en agenda | NO |
| id_gestor | 10 | INTEGER<br>(FK) | ID del empleado interno encargado de<br>conducir la reunión/visita | NO |
| id_cliente | 10 | INTEGER<br>(FK) | ID del cliente comprador que asistirá al<br>evento | NO |
| uuid_activo | 36 | UUID (FK) | Vínculo con el inmueble o lote objeto de<br>la cita o inspección | NO |
| tipo_evento | 50 | VARCHAR | Finalidad de la reunión<br>(CONFIRMACION_FECHA_ENTREGA<br>\| ENTREGA_LLAVES \|<br>REVISION_OBSERVACIONES \|<br>FIRMA_MINUTA \| FIRMA_ESCRITURA<br>\| INSPECCION_OBRA \|<br>JUNTA_PROPIETARIOS \|<br>RECORDATORIO_PAGO \| OTRO) | NO |
| titulo | 200 | VARCHAR | Asunto o título resumido de la cita | SÍ |
| descripcion | - | TEXT | Detalle de los puntos a tratar o<br>requerimientos previos de asistencia | SÍ |
| ubicacion | 300 | VARCHAR | Lugar físico, sala, u enlace de<br>videoconferencia (Meet/Zoom) | SÍ |
| fecha_inicio | - | TIMESTAMP | Fecha y hora precisa de inicio<br>programada del evento | NO |
| fecha_fin | - | TIMESTAMP | Fecha y hora de término programada<br>del evento | NO |
| estado_cita | 30 | VARCHAR | Situación actual de la cita<br>(PROGRAMADA \| CONFIRMADA \|<br>CANCELADA \| COMPLETADA \|<br>REPROGRAMACION_PENDIENTE) | NO |
| confirmacion_cliente | - | BOOLEAN | Validación explícita de aceptación<br>horaria por parte del cliente | SÍ |


---

## Página 87

            permite_reprogramacio         Bandera lógica que indica si la cita es
                              -   BOOLEAN                          NO
            n                             flexible para cambios de fecha
                                          Estado del webhook de sincronización
            estado_sincronizacion 20 VARCHAR (SINCRONIZADO | PENDIENTE | NO
                                          FALLIDO | NO_APLICA)
                                          Indicador de si el cliente posee
            cliente_usa_google -  BOOLEAN ecosistema Google para invitaciones NO
                                          directas
                                          Sustento o justificación ingresada en
            motivo_cancelacion -    TEXT                           SÍ
                                          caso de cancelarse la reunión
                                          Fecha técnica de reserva del espacio
            created_at        -   TIMESTAMP                        NO
                                          en agenda
                                          Fecha de último movimiento o
            updated_at        -   TIMESTAMP                        SÍ
                                          reprogramación
            Tabla: disponibilidad_cita
            Descripción: Control de bloques de horas opcionales sugeridos u ofrecidos al cliente para agendar una
            cita antes de su confirmación.
            Campo        Tamaño Tipo de Dato Descripción          NULL
                                         Identificador único del bloque de tiempo
            id            20    BIGINT (PK)                        NO
                                         (Auto-incremental)
                                         Cita preliminar asociada a las
            uuid_cita     36    UUID (FK)                          NO
                                         alternativas de horario
                                         Fecha y hora de inicio de la franja
            bloque_inicio  -    TIMESTAMP                          NO
                                         horaria disponible
                                         Fecha y hora de finalización de la franja
            bloque_fin     -    TIMESTAMP                          NO
                                         horaria disponible
                                         Indica si esta opción horaria específica
            seleccionado   -    BOOLEAN                            NO
                                         fue elegida por el cliente
            created_at     -    TIMESTAMP Fecha de registro de la disponibilidad NO
            Tabla: etapa_expediente
            Descripción: Representa las distintas fases o hitos comerciales a nivel de expediente legal y de trámites
            del cliente por cada compra.
                                    Tipo de
            Campo           Tamaño         Descripción            NULL
                                     Dato
                                           Identificador único de la fase del
            uuid_etapa_expediente 36 UUID (PK)                     NO
                                           expediente


### Tablas de la página


#### Tabla 1

| permite_reprogramacio<br>n | - | BOOLEAN | Bandera lógica que indica si la cita es<br>flexible para cambios de fecha | NO |
| --- | --- | --- | --- | --- |
| estado_sincronizacion | 20 | VARCHAR | Estado del webhook de sincronización<br>(SINCRONIZADO \| PENDIENTE \|<br>FALLIDO \| NO_APLICA) | NO |
| cliente_usa_google | - | BOOLEAN | Indicador de si el cliente posee<br>ecosistema Google para invitaciones<br>directas | NO |
| motivo_cancelacion | - | TEXT | Sustento o justificación ingresada en<br>caso de cancelarse la reunión | SÍ |
| created_at | - | TIMESTAMP | Fecha técnica de reserva del espacio<br>en agenda | NO |
| updated_at | - | TIMESTAMP | Fecha de último movimiento o<br>reprogramación | SÍ |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| id | 20 | BIGINT (PK) | Identificador único del bloque de tiempo<br>(Auto-incremental) | NO |
| uuid_cita | 36 | UUID (FK) | Cita preliminar asociada a las<br>alternativas de horario | NO |
| bloque_inicio | - | TIMESTAMP | Fecha y hora de inicio de la franja<br>horaria disponible | NO |
| bloque_fin | - | TIMESTAMP | Fecha y hora de finalización de la franja<br>horaria disponible | NO |
| seleccionado | - | BOOLEAN | Indica si esta opción horaria específica<br>fue elegida por el cliente | NO |
| created_at | - | TIMESTAMP | Fecha de registro de la disponibilidad | NO |


#### Tabla 3

| Campo | Tamaño | Tipo de<br>Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_etapa_expediente | 36 | UUID (PK) | Identificador único de la fase del<br>expediente | NO |


---

## Página 88

            uuid_usuario_activo 36 UUID (FK) Contrato de adquisición relacionado NO
                                           Identificación de la etapa
                                           (SEPARACION | CONTRATO | PAGO
            etapa_proceso   50     VARCHAR                         NO
                                           | ENTREGA | SANEAMIENTO |
                                           OTRO)
                                           Estado interno de cumplimiento de la
            estado            30   VARCHAR                         NO
                                           fase (COMPLETADO | PENDIENTE)
            Tabla: hito_proceso_compra
            Descripción: Metas u objetivos específicos que el cliente debe completar secuencialmente dentro de cada
            etapa de su expediente.
            Campo           Tamaño Tipo de Dato Descripción       NULL
                                            Identificador único del hito del
            uuid_hito_comercial 36 UUID (PK)                       NO
                                            proceso de compra
                                            Etapa del expediente a la cual
            uuid_etapa_expediente 36 UUID (FK)                     NO
                                            pertenece la meta
                                            Título descriptivo de la acción
            nombre_hito      255   VARCHAR                         NO
                                            comercial requerida
                                            Instrucciones detalladas orientadas
            descripcion       -      TEXT                          SÍ
                                            al cliente para cumplir el hito
                                            Número secuencial de orden de
            orden             10   INTEGER                         NO
                                            ejecución
                                            Estado actual del hito comercial
            estado           255   VARCHAR  (PENDIENTE | EN_PROGRESO | NO
                                            COMPLETADO)
                                            Fecha y hora exacta en la que se
            fecha_completado  -    TIMESTAMP                       SÍ
                                            validó el hito como completado
                                            Fecha automática de registro del
            created_at        -    TIMESTAMP                       NO
                                            hito comercial
            Tabla: requisito_documental
            Descripción: Checklist de documentos obligatorios exigidos al cliente en una fase particular del proceso
            de titulación o separación.
                                     Tipo de
            Campo             Tamaño        Descripción           NULL
                                      Dato
            uuid_requisito_document         Identificador único del requisito
                               36   UUID (PK)                      NO
            al                              documental exigido


### Tablas de la página


#### Tabla 1

| uuid_usuario_activo | 36 | UUID (FK) | Contrato de adquisición relacionado | NO |
| --- | --- | --- | --- | --- |
| etapa_proceso | 50 | VARCHAR | Identificación de la etapa<br>(SEPARACION \| CONTRATO \| PAGO<br>\| ENTREGA \| SANEAMIENTO \|<br>OTRO) | NO |
| estado | 30 | VARCHAR | Estado interno de cumplimiento de la<br>fase (COMPLETADO \| PENDIENTE) | NO |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_hito_comercial | 36 | UUID (PK) | Identificador único del hito del<br>proceso de compra | NO |
| uuid_etapa_expediente | 36 | UUID (FK) | Etapa del expediente a la cual<br>pertenece la meta | NO |
| nombre_hito | 255 | VARCHAR | Título descriptivo de la acción<br>comercial requerida | NO |
| descripcion | - | TEXT | Instrucciones detalladas orientadas<br>al cliente para cumplir el hito | SÍ |
| orden | 10 | INTEGER | Número secuencial de orden de<br>ejecución | NO |
| estado | 255 | VARCHAR | Estado actual del hito comercial<br>(PENDIENTE \| EN_PROGRESO \|<br>COMPLETADO) | NO |
| fecha_completado | - | TIMESTAMP | Fecha y hora exacta en la que se<br>validó el hito como completado | SÍ |
| created_at | - | TIMESTAMP | Fecha automática de registro del<br>hito comercial | NO |


#### Tabla 3

| Campo | Tamaño | Tipo de<br>Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_requisito_document<br>al | 36 | UUID (PK) | Identificador único del requisito<br>documental exigido | NO |


---

## Página 89

                                            Etapa del expediente que demanda
            uuid_etapa_expediente 36 UUID (FK)                     NO
                                            la entrega de este documento
                                            Nombre del documento solicitado
            titulo             200  VARCHAR                        NO
                                            (ej. Copia Literal, Recibo de Luz)
                                            Especificaciones o características
            descripcion         -     TEXT                         SÍ
                                            requeridas del documento
                                            Instrucciones o glosas aclaratorias
            nota_corporativa    -     TEXT                         SÍ
                                            internas de la inmobiliaria
                                            Estado de recepción/validación
            estado             30   VARCHAR física (COMPLETADO |   NO
                                            PENDIENTE)
                                            Fecha de emisión que figura
            fecha_emision       -     DATE                         SÍ
                                            impreso en el documento recibido
                                            Identificador del recurso gráfico o
            icono              100  VARCHAR tag para renderizado en interfaz SÍ
                                            web/app
            Tabla: documento
            Descripción: Metadatos de archivos físicos almacenados en Cloud Storage vinculados dinámicamente a
            cualquier entidad del sistema.
            Campo         Tamaño Tipo de Dato Descripción         NULL
                                          Identificador único de los metadatos
            uuid_documento  36    UUID (PK)                        NO
                                          del documento
                                          Ruta absoluta o URI del objeto binario
            ruta_gcs        500   VARCHAR                          NO
                                          en Google Cloud Storage
                                          Nombre de archivo original con el que
            nombre_original 255   VARCHAR                          NO
                                          fue subido por el usuario
                                          UUID o ID primario de la entidad de
            id_referencia   36    VARCHAR negocio asociada (ej. ID de un NO
                                          Proyecto)
                                          Nombre técnico de la tabla objetivo
            entidad_referencia 50 VARCHAR con la que se relaciona (proyecto, NO
                                          activo, etc.)
                                          Clasificación lógica (PDF_LEGAL |
            tipo_documento  50    VARCHAR COMPROBANTE | FOTO_OBRA | NO
                                          VIDEO_OBRA)
                                          Tipo de medio de internet oficial (ej:
            tipo_mime       50    VARCHAR                          SÍ
                                          application/pdf, image/jpeg)


### Tablas de la página


#### Tabla 1

| uuid_etapa_expediente | 36 | UUID (FK) | Etapa del expediente que demanda<br>la entrega de este documento | NO |
| --- | --- | --- | --- | --- |
| titulo | 200 | VARCHAR | Nombre del documento solicitado<br>(ej. Copia Literal, Recibo de Luz) | NO |
| descripcion | - | TEXT | Especificaciones o características<br>requeridas del documento | SÍ |
| nota_corporativa | - | TEXT | Instrucciones o glosas aclaratorias<br>internas de la inmobiliaria | SÍ |
| estado | 30 | VARCHAR | Estado de recepción/validación<br>física (COMPLETADO \|<br>PENDIENTE) | NO |
| fecha_emision | - | DATE | Fecha de emisión que figura<br>impreso en el documento recibido | SÍ |
| icono | 100 | VARCHAR | Identificador del recurso gráfico o<br>tag para renderizado en interfaz<br>web/app | SÍ |


#### Tabla 2

| Campo | Tamaño | Tipo de Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| uuid_documento | 36 | UUID (PK) | Identificador único de los metadatos<br>del documento | NO |
| ruta_gcs | 500 | VARCHAR | Ruta absoluta o URI del objeto binario<br>en Google Cloud Storage | NO |
| nombre_original | 255 | VARCHAR | Nombre de archivo original con el que<br>fue subido por el usuario | NO |
| id_referencia | 36 | VARCHAR | UUID o ID primario de la entidad de<br>negocio asociada (ej. ID de un<br>Proyecto) | NO |
| entidad_referencia | 50 | VARCHAR | Nombre técnico de la tabla objetivo<br>con la que se relaciona (proyecto,<br>activo, etc.) | NO |
| tipo_documento | 50 | VARCHAR | Clasificación lógica (PDF_LEGAL \|<br>COMPROBANTE \| FOTO_OBRA \|<br>VIDEO_OBRA) | NO |
| tipo_mime | 50 | VARCHAR | Tipo de medio de internet oficial (ej:<br>application/pdf, image/jpeg) | SÍ |


---

## Página 90

                                          Indica si el archivo contiene datos
            acceso_restringido -  BOOLEAN sensibles de acceso restringido NO
                                          (Default: true)
                                          ID del usuario de la plataforma que
            subido_por      10    INTEGER                          SÍ
                                          efectuó la carga del archivo
                                          Fecha y hora exacta del registro físico
            created_at      -    TIMESTAMP                         NO
                                          de carga
            Tabla: tipo_documento_config
            Descripción: Tabla de configuración técnica que define las políticas globales de tamaño y formatos MIME
            permitidos por tipo documental.
                                 Tipo de
            Campo        Tamaño         Descripción               NULL
                                  Dato
                                VARCHAR Código único del tipo de documento
            tipo_documento 50                                      NO
                                  (PK)  configurado
                                        Explicación del uso del tipo documental
            descripcion    255  VARCHAR                            NO
                                        dentro de las reglas de negocio
                                        Lista de tipos MIME aceptados separados
            mime_permitidos 255 VARCHAR                            NO
                                        por comas (ej: image/png,application/pdf)
                                        Tamaño máximo en bytes autorizado para
            max_size_bytes  -    BIGINT                            NO
                                        cargas de este tipo de archivo
            9. VOLUMEN ESTIMADO
                      Requerimiento Funcional    Cantidad de Usuarios Estimados
                RF-001 El sistema debe permitir a los usuarios
                autorizados (Administrador de Ventas) generar
                cuentas de acceso para clientes, enviando 3 concurrentes
                automáticamente un correo de bienvenida con
                credenciales temporales vía Firebase.
                RF-002 El sistema debe permitir a usuarios
                empresariales con permiso de gestión
                financiera (por defecto rol base Asesor
                                           5 concurrentes
                Comercial) editar montos y fechas del
                cronograma de pago de cada unidad asociada
                a un cliente.
                RF-003 El sistema debe autenticar usuarios vía
                Firebase Auth, validando que el personal
                                           10 concurrentes
                corporativo ingrese exclusivamente con el
                dominio @llosaedificaciones.com.
                RF-004 El sistema (Modulo-Seguridad) debe
                proveer un panel administrativo para asignar, 2 concurrentes.
                habilitar o restringir accesos a módulos y


### Tablas de la página


#### Tabla 1

| acceso_restringido | - | BOOLEAN | Indica si el archivo contiene datos<br>sensibles de acceso restringido<br>(Default: true) | NO |
| --- | --- | --- | --- | --- |
| subido_por | 10 | INTEGER | ID del usuario de la plataforma que<br>efectuó la carga del archivo | SÍ |
| created_at | - | TIMESTAMP | Fecha y hora exacta del registro físico<br>de carga | NO |


#### Tabla 2

| Campo | Tamaño | Tipo de<br>Dato | Descripción | NULL |
| --- | --- | --- | --- | --- |
| tipo_documento | 50 | VARCHAR<br>(PK) | Código único del tipo de documento<br>configurado | NO |
| descripcion | 255 | VARCHAR | Explicación del uso del tipo documental<br>dentro de las reglas de negocio | NO |
| mime_permitidos | 255 | VARCHAR | Lista de tipos MIME aceptados separados<br>por comas (ej: image/png,application/pdf) | NO |
| max_size_bytes | - | BIGINT | Tamaño máximo en bytes autorizado para<br>cargas de este tipo de archivo | NO |


#### Tabla 3

| Requerimiento Funcional | Cantidad de Usuarios Estimados |
| --- | --- |
| RF-001 El sistema debe permitir a los usuarios<br>autorizados (Administrador de Ventas) generar<br>cuentas de acceso para clientes, enviando<br>automáticamente un correo de bienvenida con<br>credenciales temporales vía Firebase. | 3 concurrentes |
| RF-002 El sistema debe permitir a usuarios<br>empresariales con permiso de gestión<br>financiera (por defecto rol base Asesor<br>Comercial) editar montos y fechas del<br>cronograma de pago de cada unidad asociada<br>a un cliente. | 5 concurrentes |
| RF-003 El sistema debe autenticar usuarios vía<br>Firebase Auth, validando que el personal<br>corporativo ingrese exclusivamente con el<br>dominio @llosaedificaciones.com. | 10 concurrentes |
| RF-004 El sistema (Modulo-Seguridad) debe<br>proveer un panel administrativo para asignar,<br>habilitar o restringir accesos a módulos y | 2 concurrentes. |


---

## Página 91

                acciones (CRUD) de forma granular por
                usuario, sin depender de roles estáticos.
                RF-005 El sistema debe permitir crear
                proyectos y unidades desglosadas aplicando la 2 concurrentes.
                plantilla de hitos predefinidos.
                RF-006 El sistema debe permitir desvincular a
                un cliente de una unidad. Al ejecutar esta
                acción, el perfil del cliente pasará a "Inactivo",
                                           2 concurrentes.
                la unidad cambiará a "Disponible" en el
                inventario, y se bloqueará el acceso del usuario
                a las URLs firmadas de sus documentos.
                RF-007 Al vincular un cliente a una unidad en
                etapa avanzada, el sistema debe marcar en
                lote (batch) como "Completados" los hitos 2 concurrentes.
                anteriores en la base de datos, suprimiendo los
                triggers de correos automáticos.
                RF-008 El sistema debe permitir al Cliente
                visualizar su Dashboard con el estado actual,
                                           30 concurrentes.
                línea de tiempo (hitos) y el porcentaje de
                avance general de su propiedad.
                RF-009 El sistema debe permitir a usuarios
                (Líder de Proyecto) con permisos operativos
                actualizar estados y porcentajes de hitos a 5 concurrentes.
                nivel de unidad específica (ej. Dpto 101) o de
                forma masiva (ej. Torre A).
                RF-010 El backend debe rechazar cualquier
                petición (retornando error) que intente marcar
                un hito como "Completado" si el hito 5 concurrentes.
                predecesor directo no tiene el estado
                "Completado".
                RF-011 El sistema debe permitir subir
                fotos/videos (MP4, PNG, JPG) directamente a
                Google Cloud Storage (GCS), guardando la
                                           5 concurrentes.
                URL generada asociada a la unidad y al hito.
                Asimismo, se incluye la opción de carga
                masiva para múltiples unidades de un proyecto.
                RF-012 El sistema debe permitir a los usuarios
                administrativos subir documentos legales
                (PDF) y comprobantes a Google Cloud Storage 10 concurrentes.
                (GCS), vinculándolos al UUID del hito
                correspondiente
                RF-013 El backend debe generar y retornar
                Signed URLs (URLs firmadas) con tiempo de
                expiración (ej. 15 minutos) para permitir al
                                           15 concurrentes.
                cliente descargar de forma segura sus PDFs
                directamente desde Google Cloud Storage
                (GCS).
                RF-014 El sistema debe exponer endpoints
                para que el personal autorizado edite montos y
                fechas del cronograma, y para que el personal 5 concurrentes.
                financiero registre la conciliación de un pago
                cambiando el estado a "Pagado".
                RF-016 El sistema debe desplegar una interfaz
                                           10 concurrentes.
                de disponibilidad colaborativa (tipo


### Tablas de la página


#### Tabla 1

| acciones (CRUD) de forma granular por<br>usuario, sin depender de roles estáticos. |  |
| --- | --- |
| RF-005 El sistema debe permitir crear<br>proyectos y unidades desglosadas aplicando la<br>plantilla de hitos predefinidos. | 2 concurrentes. |
| RF-006 El sistema debe permitir desvincular a<br>un cliente de una unidad. Al ejecutar esta<br>acción, el perfil del cliente pasará a "Inactivo",<br>la unidad cambiará a "Disponible" en el<br>inventario, y se bloqueará el acceso del usuario<br>a las URLs firmadas de sus documentos. | 2 concurrentes. |
| RF-007 Al vincular un cliente a una unidad en<br>etapa avanzada, el sistema debe marcar en<br>lote (batch) como "Completados" los hitos<br>anteriores en la base de datos, suprimiendo los<br>triggers de correos automáticos. | 2 concurrentes. |
| RF-008 El sistema debe permitir al Cliente<br>visualizar su Dashboard con el estado actual,<br>línea de tiempo (hitos) y el porcentaje de<br>avance general de su propiedad. | 30 concurrentes. |
| RF-009 El sistema debe permitir a usuarios<br>(Líder de Proyecto) con permisos operativos<br>actualizar estados y porcentajes de hitos a<br>nivel de unidad específica (ej. Dpto 101) o de<br>forma masiva (ej. Torre A). | 5 concurrentes. |
| RF-010 El backend debe rechazar cualquier<br>petición (retornando error) que intente marcar<br>un hito como "Completado" si el hito<br>predecesor directo no tiene el estado<br>"Completado". | 5 concurrentes. |
| RF-011 El sistema debe permitir subir<br>fotos/videos (MP4, PNG, JPG) directamente a<br>Google Cloud Storage (GCS), guardando la<br>URL generada asociada a la unidad y al hito.<br>Asimismo, se incluye la opción de carga<br>masiva para múltiples unidades de un proyecto. | 5 concurrentes. |
| RF-012 El sistema debe permitir a los usuarios<br>administrativos subir documentos legales<br>(PDF) y comprobantes a Google Cloud Storage<br>(GCS), vinculándolos al UUID del hito<br>correspondiente | 10 concurrentes. |
| RF-013 El backend debe generar y retornar<br>Signed URLs (URLs firmadas) con tiempo de<br>expiración (ej. 15 minutos) para permitir al<br>cliente descargar de forma segura sus PDFs<br>directamente desde Google Cloud Storage<br>(GCS). | 15 concurrentes. |
| RF-014 El sistema debe exponer endpoints<br>para que el personal autorizado edite montos y<br>fechas del cronograma, y para que el personal<br>financiero registre la conciliación de un pago<br>cambiando el estado a "Pagado". | 5 concurrentes. |
| RF-016 El sistema debe desplegar una interfaz<br>de disponibilidad colaborativa (tipo | 10 concurrentes. |


---

## Página 92

                When2meet) en el Portal Cliente si se habilita
                la reprogramación, permitiendo guardar en
                base de datos los bloques horarios propuestos
                por el usuario.
                RF-017 El sistema ejecutará disparadores
                (triggers) asíncronos para enviar correos
                                           50 concurrentes.
                transaccionales (bienvenida, hitos cumplidos,
                alertas de pago) consumiendo plantillas HTML.
                RF-018 El sistema debe aislar la navegación
                en el frontend mediante un selector de
                propiedades, garantizando que el árbol de
                                           10 concurrentes.
                componentes (documentos, hitos, pagos) se
                recargue únicamente con la data de la unidad
                activa.
                RF-019 El sistema debe verificar que el correo
                electrónico no esté ya registrado antes de crear 3 concurrentes.
                un nuevo usuario
                RF-020 El sistema debe invalidar los tokens
                JWT y cerrar activamente las sesiones de
                                           2 concurrentes.
                Firebase Auth de un usuario en todos los
                dispositivos si su cuenta es desactivada.
                RF-021 El sistema debe permitir enviar un
                enlace de recuperación de contraseña operado
                                           2 concurrentes.
                nativamente por los servicios de Firebase
                Authentication.
                RF-022 El sistema debe evaluar el estado
                comercial de la unidad vinculada al cliente
                ("Separado" vs "Vendido"). Si el estado es
                "Separado", el sistema debe renderizar el 10 concurrentes.
                Modo de Espera: bloquear todos los módulos
                del portal y mostrar únicamente la información
                mínima requerida de la separación.
                RF-023 El sistema debe generar un registro
                automatizado (Audit Log) de toda acción de
                creación, modificación o eliminación sobre hitos
                                           15 concurrentes.
                legales, contratos y estados financieros,
                registrando el ID del usuario corporativo, marca
                de tiempo y dirección IP.
                RF-024 Al crear un nuevo hito constructivo
                maestro en un proyecto, el sistema debe
                propagarlo automáticamente a todos los pisos 2 concurrentes.
                existentes, creando los registros
                correspondientes.
                RF-025 Al crear un proyecto, el sistema debe
                generar automáticamente los hitos estándar de
                construcción definidos por la empresa
                (Anteproyecto, Licencia, Demolición, Inicio de 2 concurrentes.
                obra, Excavación, Cimentación, Casco,
                Acabados húmedos, Acabados secos,
                Inmueble terminado).
                RF-026 El sistema debe impedir que el usuario
                Admin se desactive a sí mismo o cambie su 2 concurrentes.
                propio rol, retornando un error explícito.
                RF-027 El sistema debe permitir gestionar la 2 concurrentes.


### Tablas de la página


#### Tabla 1

| When2meet) en el Portal Cliente si se habilita<br>la reprogramación, permitiendo guardar en<br>base de datos los bloques horarios propuestos<br>por el usuario. |  |
| --- | --- |
| RF-017 El sistema ejecutará disparadores<br>(triggers) asíncronos para enviar correos<br>transaccionales (bienvenida, hitos cumplidos,<br>alertas de pago) consumiendo plantillas HTML. | 50 concurrentes. |
| RF-018 El sistema debe aislar la navegación<br>en el frontend mediante un selector de<br>propiedades, garantizando que el árbol de<br>componentes (documentos, hitos, pagos) se<br>recargue únicamente con la data de la unidad<br>activa. | 10 concurrentes. |
| RF-019 El sistema debe verificar que el correo<br>electrónico no esté ya registrado antes de crear<br>un nuevo usuario | 3 concurrentes. |
| RF-020 El sistema debe invalidar los tokens<br>JWT y cerrar activamente las sesiones de<br>Firebase Auth de un usuario en todos los<br>dispositivos si su cuenta es desactivada. | 2 concurrentes. |
| RF-021 El sistema debe permitir enviar un<br>enlace de recuperación de contraseña operado<br>nativamente por los servicios de Firebase<br>Authentication. | 2 concurrentes. |
| RF-022 El sistema debe evaluar el estado<br>comercial de la unidad vinculada al cliente<br>("Separado" vs "Vendido"). Si el estado es<br>"Separado", el sistema debe renderizar el<br>Modo de Espera: bloquear todos los módulos<br>del portal y mostrar únicamente la información<br>mínima requerida de la separación. | 10 concurrentes. |
| RF-023 El sistema debe generar un registro<br>automatizado (Audit Log) de toda acción de<br>creación, modificación o eliminación sobre hitos<br>legales, contratos y estados financieros,<br>registrando el ID del usuario corporativo, marca<br>de tiempo y dirección IP. | 15 concurrentes. |
| RF-024 Al crear un nuevo hito constructivo<br>maestro en un proyecto, el sistema debe<br>propagarlo automáticamente a todos los pisos<br>existentes, creando los registros<br>correspondientes. | 2 concurrentes. |
| RF-025 Al crear un proyecto, el sistema debe<br>generar automáticamente los hitos estándar de<br>construcción definidos por la empresa<br>(Anteproyecto, Licencia, Demolición, Inicio de<br>obra, Excavación, Cimentación, Casco,<br>Acabados húmedos, Acabados secos,<br>Inmueble terminado). | 2 concurrentes. |
| RF-026 El sistema debe impedir que el usuario<br>Admin se desactive a sí mismo o cambie su<br>propio rol, retornando un error explícito. | 2 concurrentes. |
| RF-027 El sistema debe permitir gestionar la | 2 concurrentes. |


---

## Página 93

                estructura física de un proyecto (torres, pisos y
                unidades) mediante endpoints individuales para
                crear, modificar y eliminar cada elemento de la
                jerarquía de forma independiente.
                RF-028 El sistema debe permitir a usuarios con
                permiso de obra crear, editar y eliminar
                reportes periódicos de avance de obra que 3 concurrentes.
                incluyan título, hitos consolidados, descripción
                y archivos multimedia asociados.
                RF-029 El sistema debe gestionar las etapas
                del proceso comercial de un expediente
                (SEPARACIÓN, CONTRATO, PAGO,
                                           5 concurrentes.
                ENTREGA, SANEAMIENTO), permitiendo
                crear, actualizar estado y consultar las etapas
                asociadas a cada contrato.
                RF-030 El sistema debe gestionar los hitos del
                proceso de compra dentro de cada etapa
                comercial, permitiendo crearlos, actualizar su
                                           5 concurrentes.
                estado (PENDIENTE, EN_PROGRESO,
                COMPLETADO) y eliminarlos, validando la
                precedencia entre hitos.
                RF-031 El sistema debe gestionar los
                requisitos documentales asociados a cada
                etapa comercial, permitiendo crearlos,
                                           5 concurrentes.
                actualizar metadatos, eliminar, marcar estado y
                asociar archivos de respaldo mediante carga
                directa.
                RF-032 El sistema debe proporcionar un
                stepper (visor secuencial) completo del proceso
                comercial que consolide las 5 etapas del
                expediente con sus hitos de compra y 30 concurrentes.
                requisitos documentales asociados, accesible
                tanto para el cliente como para el personal
                autorizado.
                RF-033 El sistema debe permitir asignar y
                desasignar asesores comerciales a contratos
                                           2 concurrentes.
                (expedientes), registrando el responsable
                comercial de cada vinculación.
                RF-034 El sistema debe permitir al Asesor
                Comercial registrar y asociar más de un perfil
                de cliente a una misma unidad inmobiliaria y su
                respectivo contrato, cuando la adquisición se
                realice bajo la modalidad de bienes 3 concurrentes.
                mancomunados, sociedad conyugal o
                copropiedad. Asimismo, debe habilitar el
                acceso independiente a cada co-titular
                manteniendo la información sincronizada.
                RF-035 El sistema debe obligar al Cliente a
                cambiar su contraseña temporal durante su 5 concurrentes.
                primer inicio de sesión exitoso.
                RF-036 El sistema debe permitir la carga y
                almacenamiento de formatos técnicos y
                                           5 concurrentes.
                ofimáticos (DWG, XLSX, DOCX) de manera
                exclusiva para la gestión de la documentación


### Tablas de la página


#### Tabla 1

| estructura física de un proyecto (torres, pisos y<br>unidades) mediante endpoints individuales para<br>crear, modificar y eliminar cada elemento de la<br>jerarquía de forma independiente. |  |
| --- | --- |
| RF-028 El sistema debe permitir a usuarios con<br>permiso de obra crear, editar y eliminar<br>reportes periódicos de avance de obra que<br>incluyan título, hitos consolidados, descripción<br>y archivos multimedia asociados. | 3 concurrentes. |
| RF-029 El sistema debe gestionar las etapas<br>del proceso comercial de un expediente<br>(SEPARACIÓN, CONTRATO, PAGO,<br>ENTREGA, SANEAMIENTO), permitiendo<br>crear, actualizar estado y consultar las etapas<br>asociadas a cada contrato. | 5 concurrentes. |
| RF-030 El sistema debe gestionar los hitos del<br>proceso de compra dentro de cada etapa<br>comercial, permitiendo crearlos, actualizar su<br>estado (PENDIENTE, EN_PROGRESO,<br>COMPLETADO) y eliminarlos, validando la<br>precedencia entre hitos. | 5 concurrentes. |
| RF-031 El sistema debe gestionar los<br>requisitos documentales asociados a cada<br>etapa comercial, permitiendo crearlos,<br>actualizar metadatos, eliminar, marcar estado y<br>asociar archivos de respaldo mediante carga<br>directa. | 5 concurrentes. |
| RF-032 El sistema debe proporcionar un<br>stepper (visor secuencial) completo del proceso<br>comercial que consolide las 5 etapas del<br>expediente con sus hitos de compra y<br>requisitos documentales asociados, accesible<br>tanto para el cliente como para el personal<br>autorizado. | 30 concurrentes. |
| RF-033 El sistema debe permitir asignar y<br>desasignar asesores comerciales a contratos<br>(expedientes), registrando el responsable<br>comercial de cada vinculación. | 2 concurrentes. |
| RF-034 El sistema debe permitir al Asesor<br>Comercial registrar y asociar más de un perfil<br>de cliente a una misma unidad inmobiliaria y su<br>respectivo contrato, cuando la adquisición se<br>realice bajo la modalidad de bienes<br>mancomunados, sociedad conyugal o<br>copropiedad. Asimismo, debe habilitar el<br>acceso independiente a cada co-titular<br>manteniendo la información sincronizada. | 3 concurrentes. |
| RF-035 El sistema debe obligar al Cliente a<br>cambiar su contraseña temporal durante su<br>primer inicio de sesión exitoso. | 5 concurrentes. |
| RF-036 El sistema debe permitir la carga y<br>almacenamiento de formatos técnicos y<br>ofimáticos (DWG, XLSX, DOCX) de manera<br>exclusiva para la gestión de la documentación | 5 concurrentes. |


---

## Página 94

                del proyecto por parte del Área Técnica.
                RF-037 El sistema debe permitir vincular a
                múltiples clientes (copropietarios) como
                invitados a una misma cita agendada, 10 concurrentes.
                sincronizando el evento en los calendarios de
                todos los perfiles asociados al contrato.
            10. DISEÑO ARQUITECTÓNICO
            Nota: esta arquitectura aún está en evaluación por parte de la empresa
            11. PROTOTIPO
                 Portal de clientes
                 https://fe-client-prot-qrz5x766r-jcarlos-projects1.vercel.app
                 Portal de empleados
                 https://prototipo-empresa-rho.vercel.app/login-empresa
            13. DIMENSIONAMIENTO
                 El sistema se desplegará mediante contenedores en un único servidor. El frontend, el backend y
                 la base de datos (PostgreSQL) operarán de forma independiente en dicha máquina. Los
                 documentos legales, comprobantes y archivos multimedia se guardarán de forma segura en la
                 nube utilizando Google Cloud Storage (GCS). La autenticación se delega a Firebase.
            13.1 SUPUESTOS CLAVE
              -  Usuarios: 1,000 clientes activos y 50 usuarios internos.
              -  Concurrencia: Picos máximos de 150 usuarios simultáneos tras notificaciones.


### Tablas de la página


#### Tabla 1

| del proyecto por parte del Área Técnica. |  |
| --- | --- |
| RF-037 El sistema debe permitir vincular a<br>múltiples clientes (copropietarios) como<br>invitados a una misma cita agendada,<br>sincronizando el evento en los calendarios de<br>todos los perfiles asociados al contrato. | 10 concurrentes. |


---

## Página 95

              -  Documentos por Cliente (subidos por personal interno): Se estima 20 a 40 documentos
                 almacenados por cliente con un peso en promedio de 3MB. El cliente solo puede consultar esta
                 información mediante consultas de lectura y descarga.
              -  Multimedia por Avance de obra (subidos por Área técnica): Existe una proyección de 300 hitos al
                 año. Cada hito contiene un paquete multimedia de 5 fotos y 2 videos, promediando un peso de
                 65 MB de almacenamiento por hito.
                 La estimación de 300 hitos nace de poder proyectar 5 proyectos en construcción al mismo
                 tiempo, donde el Área Técnica documenta 60 (15 pisos x 3 hitos + 15 hitos generales por
                 proyecto) avances significativos por edificio al año.
              -  Retención: 10 años. Los proyectos finalizados se archivarán en almacenamiento en frío externo
                 en GCS para optimizar costos.
            13.2 CÁLCULO BASE DE VOLUMEN DE DATOS
              -  Documentos de Clientes legal o comercial (GCS): ~88 GB.
                 Está basado en 1,000 clientes activos × 30 documentos promedio × 3 MB por documento =
                 90,000 MB resulta en 88 GB (90,000 MB / 1024).
              -  Multimedia de Obra (GCS): ~19 GB.
                 Basado en 300 hitos de obra anuales × 65 MB por hito (paquete de 5 fotos y 2 videos) = 19,500
                 MB resulta en 19 GB (19,500 MB / 1024).
              -  Base de Datos (PostgreSQL): ~1 GB.
                 Su propósito es el almacenamiento exclusivo de tablas relacionales, estados financieros,
                 identificadores de sesión (UIDs de Firebase) y logs de auditoría.
              -  Total Proyectado: ~108 GB / año.
            13.3 DIMENSIONAMIENTO DE HARDWARE / RENDIMIENTO
            El sistema delega el almacenamiento y transferencias de archivos pesados(documentos legales y videos)
            a Google Cloud Storage (GCS) mediante URLs firmadas temporalmente, gracias a eso el servidor queda
            libre de operaciones de escritura y lectura (I/O) en disco. Entonces el esfuerzo de la máquina virtual se
            centra en el procesamiento de la lógica transaccional y orquestar APIs.
              -  Procesamiento y Memoria: Servidor (VPS/Cloud) con al menos 4 vCPU y 8 GB - 16 GB de RAM
                 para soportar sin latencia los picos de 150 usuarios.
              -  Almacenamiento Local (Servidor): Disco SSD/NVMe se sugiere una capacidad inicial de 50 GB a
                 80GB, este almacenamiento es suficiente para desplegar las imágenes de los contenedores
                 Docker, alojar la base de datos PostgreSQL (cuyo crecimiento se estima en apenas ~1 GB
                 anual) y mantener la rotación de logs de auditoría.
              -  Almacenamiento en la Nube y Escalabilidad (GCS): Se utilizará un bucket estándar en GCS
                 diseñado para escalar de forma automática, elástico e ilimitado, capaz de absorber el
                 crecimiento continuo proyectado de 107 GB anuales en documentos y multimedia.
