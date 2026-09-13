# 05 · Análisis de Requerimientos Funcionales — FASE 1

> **Regla de calidad**: los RF (31) y las RN (36) están balanceados (menos RF que RN), y siempre > 0 sin duplicados ni RF sin RN de respaldo. Cada RF tiene RN de respaldo; se eliminaron los RF del A&D v1.0 ligados a Bolsa de Valores (RF-018/019), dashboards y a duplicados marcados en revisión («se repiteeeee»).
> Mapeo al mock: cada RF indica la pantalla que lo materializa (mock viva <https://igualab.vercel.app/>).

| ID | Requerimiento funcional | RN de respaldo | Actores | Prioridad | Mock |
|---|---|---|---|---|---|
| **RF-001** | El sistema debe permitir a los usuarios autenticarse con correo y contraseña, validando cuenta habilitada. | RN-001, RN-005, RN-006 | Ambos | MUST HAVE | Login |
| **RF-002** | El sistema debe permitir la **recuperación de contraseña** mediante enlace seguro de vigencia limitada enviado al correo registrado. | RN-006 | Ambos | MUST HAVE | Login |
| **RF-003** | El sistema debe mantener la sesión activa y **expirar bloqueándola por inactividad** (tiempo configurable por el Superadmin). | RN-004, RN-007 | Ambos | MUST HAVE | Configuración |
| **RF-004** | El sistema debe **restringir menús y endpoints según el rol** (Superadmin / Administrador) — RBAC. | RN-001, RN-002 | Ambos | MUST HAVE | Menús |
| **RF-005** | El sistema debe permitir al Superadmin crear, habilitar/deshabilitar y **asignar roles**, con transferencia automática del rol Superadmin (se conserva 1 único Superadmin). | RN-003, RN-007 | Superadmin | MUST HAVE | Usuarios y roles |
| **RF-006** | El sistema debe permitir al Superadmin **configurar parámetros** del sistema (minutos de inactividad, bloqueo, notificaciones). | RN-004 | Superadmin | SHOULD HAVE | Configuración |
| **RF-007** | El sistema debe permitir la **carga síncrona de documentos `.md`** asociados a una empresa y un año, mostrando el resultado de la ingesta (éxito/observación/rechazo) en la misma operación. | RN-008…RN-015 | Superadmin | MUST HAVE | Ingesta |
| **RF-008** | El sistema debe **pre-validar** cada `.md`: extensión, tamaño ≤ **50 MB**, tablas con pipes y contenido analizable, con motivo exacto de rechazo. | RN-009, RN-010, RN-011 | Sistema | MUST HAVE | Ingesta |
| **RF-009** | El sistema debe **procesar e indexar automáticamente** cada documento válido (chunking + embeddings) y persistir los vectores con su metadata (doc_id, empresa, año, sección, código GRI). | RN-012, RN-013, RN-014 | Sistema | MUST HAVE | (interno) |
| **RF-010** | El sistema debe permitir al Administrador **consultar al asistente IA (RAG)** en lenguaje natural sobre los documentos indexados, con respuesta y **fuentes citadas** (documento + sección). | RN-021, RN-022 | Administrador | MUST HAVE | Asistente de IA |
| **RF-011** | El sistema debe informar cuando el asistente **no esté disponible** (o se agote la cuota del free tier), sin bloquear el resto de módulos. | RN-023, RN-024 | Administrador | MUST HAVE | Asistente de IA |
| **RF-012** | El sistema debe **identificar los códigos GRI presentes** en el documento (catálogo de 40) con su **cita textual**, y listar brechas y sanciones por empresa (sector permitido). | RN-016, RN-017, RN-019, RN-020 | Administrador | MUST HAVE | Asistente de IA |
| **RF-013** | El sistema debe permitir al Administrador **asignar manualmente el estado** de cada código GRI (`OK` / `Baja sustancia` / `Sub-reportado`) tras revisar la **cita** extraída del documento, **sin inferencia automática**, dejando historial del cambio. | RN-018 | Administrador (supervisión PO) | MUST HAVE | Asistente de IA |
| **RF-014** | El sistema debe permitir **generar el reporte de prospección en PDF** con plantilla (estados GRI asignados, sanciones —incl. las sin monto—, **puntaje ESG** y resumen ejecutivo) alimentada con **variables desde la base de datos, sin invocar a la IA**. | RN-025, RN-026 | Administrador | MUST HAVE | Reportes de prospección |
| **RF-015** | El sistema debe conservar el **historial de reportes generados** (versiones, sin edición) y permitir su **descarga**. | RN-027, RN-030 | Administrador | MUST HAVE | Descargar reportes |
| **RF-016** | El sistema debe **registrar automáticamente los eventos sensibles** (login, cambio de rol, ingesta, generación de reporte) y permitir **consultarlos filtrando** por usuario, fecha y tipo. | RN-028, RN-029 | Superadmin (consulta) | MUST HAVE | Auditoría de accesos |
| **RF-017** | El sistema debe permitir al Superadmin **gestionar el catálogo de empresas**: crear, editar (nombre, ticker, **sector** — solo de los 3 permitidos) y activar/desactivar empresas; la ingesta y el análisis solo aceptan empresas del catálogo. | RN-013, RN-016 | Superadmin | MUST HAVE | (vía Ingesta/Dashboard) |
| **RF-018** | El sistema debe permitir al Superadmin **listar los documentos ingestados** con su estado del pipeline (indexado / observado / rechazado), versión, hash y fecha, y **re-subir una nueva versión** cuando el contenido difiere (estado OBSERVADO corregible). | RN-015, RN-030 | Superadmin | SHOULD HAVE | Ingesta |
| **RF-019** | El sistema debe mantener el **historial de la conversación del Administrador con el asistente** durante la sesión y permitir iniciar una **nueva conversación** (nuevo contexto, sin arrastre). | RNF-11 | Administrador | SHOULD HAVE | Asistente de IA |
| **RF-020** | El sistema debe **mostrar el contador de cuota diaria del asistente** (uso_llm) y avisar al alcanzar límites intermedios (75 %, 100 %). | RN-024, RNF-11 | Administrador | MUST HAVE | Asistente de IA |
| **RF-021** | El sistema debe **notificar el resultado de la ingesta con motivo exacto** (éxito: nº de chunks; observación; rechazo con regla incumplida) tanto en pantalla como en auditoría. | RN-009…RN-014 | Superadmin | MUST HAVE | Ingesta |
| **RF-022** | El sistema debe permitir **filtrar listados** por empresa, sector, año y estado (brechas GRI, documentos, historial de reportes, auditoría ya cubre su caso). | RN-016, RN-019 | Administrador / Superadmin | SHOULD HAVE | Múltiples vistas |
| **RF-023** | El sistema debe permitir el **cierre de sesión manual** y el automático por inactividad, invalidando el token en cada caso. | RN-004, RN-007 | Ambos | MUST HAVE | Navbar |
| **RF-024** | El sistema debe **restringir el análisis a empresas de los sectores permitidos** en todos los flujos (chat, brechas, reporte), informando el límite de alcance si se consulta otra. | RN-016 | Sistema | MUST HAVE | (todos) |
| **RF-025** | Al cambiar el estado de una brecha, el sistema debe requerir una **observación textual** cuando el estado final difiere del sugerido (sustento humano, RN-018). | RN-018 | Administrador | MUST HAVE | Asistente de IA |

## Notas de trazabilidad (cambios respecto al A&D v1.0)

- **RF-018 y RF-019 (dashboards de Bolsa, v1.0) → ELIMINADOS** (acta 5 · REQ-16/19: dashboards a fase 2).
- **RF-006/RF-007 (carga en PDF, v1.0) → REEMPLAZADOS** por RF-007/RF-008 en `.md` con guard (acta 5 · REQ-20).
- Los RF quedan numerados desde el 1 en esta nueva base de FASE 1 (no se conserva el numerado RF-001…021 del v1.0 para evitar referencias a elementos eliminados); la eliminancia se registra en la trazabilidad del acta 5 (REQ-16: renumeración de CU correspondiente).

## Adiciones del A&D v2 (13/09)

| ID | Requerimiento funcional | RN | Actores | Prioridad |
|---|---|---|---|---|
| **RF-026** | El sistema debe **dividir el documento en fragmentos (chunking)** y obtener su representación vectorial **con embeddings **por API** del proveedor de IA** (decisión del equipo; se corrige RF-026 del A&D v2 que proponía API del proveedor). | RN-010 | Sistema | MUST HAVE |
| **RF-027** | El sistema debe **rechazar la carga si ya existe** un documento indexado con la misma **empresa + tipo + año** (además del hash), indicando fecha y cuenta de la carga original. | RN-014, RN-030 | Superadmin | MUST HAVE |
| **RF-028** | El sistema debe **calcular y mostrar el puntaje ESG** de una empresa/año (OK=100, Baja=50, Sub=0) a partir de los estados manuales, e incluirlo en el reporte. | RN-031 | Administrador | MUST HAVE |
| **RF-029** | El sistema debe **identificar sanciones sin monto**, listarlas y reportarlas separadas del total cuantificado ("no determinado" ≠ 0). | RN-020, RN-033 | Administrador | MUST HAVE |
| **RF-030** | El sistema debe **registrar, por cada análisis, si hubo evidencia analizable** por dimensión (brechas GRI / sanciones) — distingue ausencia de hallazgo de falta de evidencia. | RN-032 | Sistema | MUST HAVE |
| **RF-031** | El sistema debe aplicar **borrado lógico** (marcado de estado) de documentos y fragmentos, sin borrado físico (los reportes se conservan: RN-028). | RN-034 | Superadmin | MUST HAVE |
