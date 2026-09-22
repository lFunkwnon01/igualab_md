# 05 · Requerimientos Funcionales — FASE 1 (numeración vigente)

> **Fuente única:** `analisis-diseno-latex/main.pdf`. 30 RF atómicos, cada uno derivado de una o varias RN.

| N° | Descripción del Requerimiento Funcional | Reglas de Negocio | Prioridad | Analista |
|---|---|---|---|---|
| RF-001 | Autenticar a los usuarios con correo y contraseña. | RN-004, RN-007, RN-011 | MUST HAVE | C. Ordinola |
| RF-002 | Permitir la recuperación de contraseña mediante un enlace seguro de un solo uso. | RN-010, RN-011 | MUST HAVE | C. Ordinola |
| RF-003 | Permitir al usuario cambiar su propia contraseña estando autenticado. | RN-011 | NICE TO HAVE | L. Millones |
| RF-004 | Gestionar la sesión del usuario (expiración por inactividad, cierre de sesión y rol vigente). | RN-005, RN-013 | MUST HAVE | L. Millones |
| RF-005 | Bloquear temporalmente la cuenta tras 5 intentos fallidos consecutivos. | RN-012 | MUST HAVE | C. Ordinola |
| RF-006 | Crear cuentas de Administrador con nombre, correo y contraseña. | RN-002, RN-007, RN-008 | MUST HAVE | C. Ordinola |
| RF-007 | Habilitar y deshabilitar cuentas de Administrador. | RN-002, RN-005 | MUST HAVE | L. Millones |
| RF-008 | Transferir el rol SuperAdmin a una cuenta de Administrador habilitada. | RN-002, RN-006, RN-009 | MUST HAVE | L. Millones |
| RF-009 | Listar las cuentas existentes con su rol y estado. | RN-001, RN-003 | NICE TO HAVE | C. Ordinola |
| RF-010 | Registrar empresas asociándolas a un sector. | RN-014, RN-015, RN-016 | MUST HAVE | C. Ordinola |
| RF-011 | Activar y desactivar empresas del catálogo. | RN-017 | NICE TO HAVE | L. Millones |
| RF-012 | Cargar documentos Markdown (.md) asociándolos a una empresa, un año y un tipo. | RN-018, RN-019, RN-020, RN-022 | MUST HAVE | C. Ordinola |
| RF-013 | Validar el documento cargado (formato, tamaño hasta 50 MB y contenido mínimo). | RN-021, RN-025 | MUST HAVE | C. Ordinola |
| RF-014 | Rechazar documentos duplicados por contenido o por empresa, año y tipo. | RN-023, RN-024 | MUST HAVE | L. Millones |
| RF-015 | Procesar la ingesta de forma síncrona mostrando el progreso. | RN-026 | MUST HAVE | L. Millones |
| RF-016 | Indexar el documento para el asistente (fragmentos y embeddings). | RN-018, RN-025 | MUST HAVE | C. Ordinola |
| RF-017 | Ejecutar el análisis GRI y de sanciones al finalizar la ingesta. | RN-026, RN-027, RN-028 | MUST HAVE | C. Ordinola |
| RF-018 | Detectar los códigos GRI presentes y extraer su cita textual. | RN-027, RN-028 | MUST HAVE | L. Millones |
| RF-019 | Permitir al Administrador asignar manualmente el estado de cada código GRI. | RN-029, RN-030 | MUST HAVE | L. Millones |
| RF-020 | Identificar las sanciones mencionadas en los documentos. | RN-031 | MUST HAVE | C. Ordinola |
| RF-021 | Calcular el puntaje ESG de una empresa y un año. | RN-032 | MUST HAVE | C. Ordinola |
| RF-022 | Consultar el listado de documentos ingestados con su estado. | RN-022, RN-025 | NICE TO HAVE | L. Millones |
| RF-023 | Consultar al asistente en lenguaje natural sobre el corpus indexado. | RN-033, RN-034, RN-037 | MUST HAVE | C. Ordinola |
| RF-024 | Recibir respuestas con citas y con el dominio restringido a sostenibilidad. | RN-034, RN-035, RN-036 | MUST HAVE | L. Millones |
| RF-025 | Generar el reporte de prospección en PDF a partir de los resultados validados. | RN-038, RN-039, RN-040 | MUST HAVE | C. Ordinola |
| RF-026 | Visualizar el historial de reportes de prospección. | RN-041 | MUST HAVE | L. Millones |
| RF-027 | Descargar el historial de reportes de prospección. | RN-041 | NICE TO HAVE | L. Millones |
| RF-028 | Visualizar las brechas GRI de una empresa con su cita de respaldo. | RN-028, RN-034 | MUST HAVE | C. Ordinola |
| RF-029 | Visualizar los eventos de auditoría en un panel. | RN-042, RN-043, RN-044, RN-045 | NICE TO HAVE | L. Millones |
| RF-030 | Filtrar los eventos de auditoría por tipo de evento, usuario y fecha. | RN-042, RN-043, RN-044, RN-045 | NICE TO HAVE | L. Millones |
