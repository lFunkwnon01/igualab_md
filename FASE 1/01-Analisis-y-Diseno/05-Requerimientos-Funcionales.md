# 05 · Análisis de Requerimientos Funcionales — FASE 1

> **Regla de calidad**: los RF (25) son menos que las RN (31), y siempre > 0 sin duplicados ni RF sin RN de respaldo. Cada RF tiene RN de respaldo; se eliminaron los RF del A&D v1.0 ligados a Bolsa de Valores (RF-018/019), dashboards y a duplicados marcados en revisión («se repiteeeee»).
> Mapeo al mock: cada RF indica la pantalla que lo materializa (mock viva <https://igualab.vercel.app/>).

| ID | Requerimiento funcional | RN de respaldo | Actores | Prioridad | Mock |
|---|---|---|---|---|---|
| **RF-001** | El sistema debe permitir a los usuarios autenticarse con correo y contraseña, validando cuenta habilitada. | RN-001, RN-005, RN-006 | Ambos | MUST HAVE | Login |
| **RF-002** | El sistema debe permitir la **recuperación de contraseña** mediante enlace seguro de vigencia limitada enviado al correo registrado. | RN-006 | Ambos | MUST HAVE | Login |
| **RF-003** | El sistema debe mantener la sesión activa y **expirar bloqueándola por inactividad** (tiempo configurable por el Superadmin). | RN-004, RN-007 | Ambos | MUST HAVE | Configuración |
| **RF-004** | El sistema debe **restringir menús y endpoints según el rol** (Superadmin / Administrador) — RBAC. | RN-001, RN-002 | Ambos | MUST HAVE | Menús |
| **RF-005** | El sistema debe permitir al Superadmin crear, habilitar/deshabilitar y **asignar roles**, con transferencia automática del rol Superadmin (se conserva 1 único Superadmin). | RN-003, RN-007 | Superadmin | MUST HAVE | Usuarios y roles |
| **RF-006** | El sistema debe permitir al Superadmin **configurar parámetros** del sistema (minutos de inactividad, bloqueo, notificaciones). | RN-004 | Superadmin | SHOULD HAVE | Configuración |
| **RF-007** | El sistema debe permitir la **carga síncrona de documentos `.md`** asociados a una empresa y un año, mostrando el resultado de la ingesta (éxito/observación/rechazo) en la misma operación. | RN-008…RN-016 | Superadmin | MUST HAVE | Ingesta |
| **RF-008** | El sistema debe **pre-validar** cada `.md`: extensión, tamaño ≤ 15 MB, tablas con pipes y contenido analizable, con motivo exacto de rechazo. | RN-009, RN-010, RN-011, RN-012 | Sistema | MUST HAVE | Ingesta |
| **RF-009** | El sistema debe **procesar e indexar automáticamente** cada documento válido (chunking + embeddings) y persistir los vectores con su metadata (doc_id, empresa, año, sección, código GRI). | RN-013, RN-014, RN-015 | Sistema | MUST HAVE | (interno) |
| **RF-010** | El sistema debe permitir al Administrador **consultar al asistente IA (RAG)** en lenguaje natural sobre los documentos indexados, con respuesta y **fuentes citadas** (documento + sección). | RN-022, RN-023 | Administrador | MUST HAVE | Asistente de IA |
| **RF-011** | El sistema debe informar cuando el asistente **no esté disponible** (o se agote la cuota del free tier), sin bloquear el resto de módulos. | RN-024, RN-025 | Administrador | MUST HAVE | Asistente de IA |
| **RF-012** | El sistema debe **listar las brechas GRI y sanciones** por empresa (sector permitido), con estado y cita, consumiendo el catálogo GRI como referencia. | RN-017, RN-018, RN-020, RN-021 | Administrador | MUST HAVE | Asistente de IA |
| **RF-013** | El sistema debe permitir **la revisión humana del estado de cada brecha**: sugerencia automática + cambio manual (OK / Sub-reportado / Baja sustancia / Crítico) **antes de generar el reporte**, dejando historial del cambio. | RN-019 | Administrador (supervisión PO) | MUST HAVE | Asistente de IA |
| **RF-014** | El sistema debe permitir **generar el reporte de prospección en PDF** con plantilla (brechas con estado validado, sanciones, métricas y resumen ejecutivo) alimentada con **variables desde la base de datos**. | RN-026, RN-027 | Administrador | MUST HAVE | Reportes de prospección |
| **RF-015** | El sistema debe conservar el **historial de reportes generados** (versiones, sin edición) y permitir su **descarga**. | RN-028, RN-031 | Administrador | MUST HAVE | Descargar reportes |
| **RF-016** | El sistema debe **registrar automáticamente los eventos sensibles** (login, cambio de rol, ingesta, generación de reporte) y permitir **consultarlos filtrando** por usuario, fecha y tipo. | RN-029, RN-030 | Superadmin (consulta) | MUST HAVE | Auditoría de accesos |
| **RF-017** | El sistema debe permitir al Superadmin **gestionar el catálogo de empresas**: crear, editar (nombre, ticker, **sector** — solo de los 3 permitidos) y activar/desactivar empresas; la ingesta y el análisis solo aceptan empresas del catálogo. | RN-014, RN-017 | Superadmin | MUST HAVE | (vía Ingesta/Dashboard) |
| **RF-018** | El sistema debe permitir al Superadmin **listar los documentos ingestados** con su estado del pipeline (indexado / observado / rechazado), versión, hash y fecha, y **re-subir una nueva versión** cuando el contenido difiere (estado OBSERVADO corregible). | RN-016, RN-031 | Superadmin | SHOULD HAVE | Ingesta |
| **RF-019** | El sistema debe mantener el **historial de la conversación del Administrador con el asistente** durante la sesión y permitir iniciar una **nueva conversación** (nuevo contexto, sin arrastre). | RNF-11 | Administrador | SHOULD HAVE | Asistente de IA |
| **RF-020** | El sistema debe **mostrar el contador de cuota diaria del asistente** (uso_llm) y avisar al alcanzar límites intermedios (75 %, 100 %). | RN-025, RNF-11 | Administrador | MUST HAVE | Asistente de IA |
| **RF-021** | El sistema debe **notificar el resultado de la ingesta con motivo exacto** (éxito: nº de chunks; observación; rechazo con regla incumplida) tanto en pantalla como en auditoría. | RN-009…RN-015 | Superadmin | MUST HAVE | Ingesta |
| **RF-022** | El sistema debe permitir **filtrar listados** por empresa, sector, año y estado (brechas GRI, documentos, historial de reportes, auditoría ya cubre su caso). | RN-017, RN-020 | Administrador / Superadmin | SHOULD HAVE | Múltiples vistas |
| **RF-023** | El sistema debe permitir el **cierre de sesión manual** y el automático por inactividad, invalidando el token en cada caso. | RN-004, RN-007 | Ambos | MUST HAVE | Navbar |
| **RF-024** | El sistema debe **restringir el análisis a empresas de los sectores permitidos** en todos los flujos (chat, brechas, reporte), informando el límite de alcance si se consulta otra. | RN-017 | Sistema | MUST HAVE | (todos) |
| **RF-025** | Al cambiar el estado de una brecha, el sistema debe requerir una **observación textual** cuando el estado final difiere del sugerido (sustento humano, RN-019). | RN-019 | Administrador | MUST HAVE | Asistente de IA |

## Notas de trazabilidad (cambios respecto al A&D v1.0)

- **RF-018 y RF-019 (dashboards de Bolsa, v1.0) → ELIMINADOS** (acta 5 · REQ-16/19: dashboards a fase 2).
- **RF-006/RF-007 (carga en PDF, v1.0) → REEMPLAZADOS** por RF-007/RF-008 en `.md` con guard (acta 5 · REQ-20).
- Los RF quedan numerados desde el 1 en esta nueva base de FASE 1 (no se conserva el numerado RF-001…021 del v1.0 para evitar referencias a elementos eliminados); la eliminancia se registra en la trazabilidad del acta 5 (REQ-16: renumeración de CU correspondiente).
