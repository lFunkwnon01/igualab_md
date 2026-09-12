# 08 · Especificación de Casos de Uso — FASE 1

> Formato estándar: Actores · Precondiciones · Flujo básico · Flujos alternativos · Postcondiciones · RF/RN asociados. La especificación de CU001 se aprovecha del del A&D v1.0 (ya aprobado y validado en el acta 4), limpiada al modelo de **2 roles**.

---

## CU001 · Autenticación y gestión de sesión

| Campo | Detalle |
|---|---|
| Actores | Superadmin, Administrador |
| RF / RN | RF-001, RF-002, RF-003 / RN-001, RN-004, RN-005, RN-006 |
| Precondiciones | Sistema desplegado; usuario registrado, habilitado y con rol. |
| Postcondición | Sesión activa con rol identificado y evento auditado. |

**Flujo básico**
1. El usuario accede a la URL de la plataforma.
2. El sistema muestra el formulario de inicio de sesión.
3. El usuario ingresa correo y contraseña y selecciona *Iniciar sesión*.
4. El sistema valida estado de cuenta, credenciales y rol (RN-001, RN-005, RN-007).
5. El sistema establece la sesión y registra el evento de login (CU009).
6. El sistema redirige a su vista según el rol (Superadmin: gestión; Administrador: analítica) — *mock: MENUS por rol*.

**Flujos alternativos**
- **A1 · Credenciales inválidas** (paso 4): mensaje «Credenciales inválidas». A los 5 intentos fallidos (RN-005): bloqueo 15 min.
- **A2 · Usuario deshabilitado** (paso 4): «Usuario deshabilitado. Contacte al administrador».
- **A3 · Recuperación de contraseña**: flujo completo del A&D v1.0 (enlace con vigencia limitada, confirmación, política de contraseñas RN-006).

---

## CU002 · Gestión de usuarios y roles

| Campo | Detalle |
|---|---|
| Actores | Superadmin |
| RF / RN | RF-005 / RN-001, RN-002, RN-003, RN-007 |
| Precondiciones | Sesión Superadmin activa. |
| Postcondición | Usuario creado/actualizado; máx. 1 Superadmin vigente; evento auditado. |

**Flujo básico (crear/editar/rol)**
1. El Superadmin abre *Usuarios y roles*.
2. El sistema lista usuarios (nombre, correo, rol, estado) — *mock `js/data.js`*.
3. El Superadmin crea un usuario (nombre, correo, rol inicial) o edita existente.
4. El sistema valida unicidad de correo, formato y estado (RN-001).
5. El sistema persiste y audita el cambio de rol/estado (CU009).

**Flujos alternativos**
- **A1 · Asignación de rol Superadmin a un Admin (RN-003)**: en el paso 4, si el rol elegido es Superadmin, el sistema **transfiere el rol**: el Superadmin actual devuelve automáticamente el rol a Administrador. Se muestra aviso: «Serás rebajado a Administrador. ¿Deseas continuar?»; si confirma, se ejecuta el cambio atómico; si no, no se altera nada.
- **A2 · Correo duplicado**: se rechaza con mensaje; lista intacta.
- **A3 · Deshabilitar usuario**: el sistema **cierra las sesiones activas** del usuario (RN-007) y audita.

---

## CU003 · Configuración del sistema

| Campo | Detalle |
|---|---|
| Actores | Superadmin |
| RF / RN | RF-006 / RN-004 |
| Postcondición | Parámetros persistidos y auditados. |

**Flujo básico**: minutos de inactividad (default 30), bloqueo por inactividad (on/off), notificaciones (toggle) — *mock config*; valida rangos y persiste.

---

## CU004 · Ingesta de documentos (.md) — SÍNCRONA

| Campo | Detalle |
|---|---|
| Actores | Superadmin; LLM/Embeddings (servicio externo) |
| RF / RN | RF-007, RF-008, RF-009 / RN-008…RN-016 |
| Precondiciones | Sesión Superadmin; empresa registrada; archivo .md listo (tablas con pipes, ≤ 15 MB). |
| Postcondición | Documento indexado (chunking + embeddings en pgvector) o estado RECHAZADO/OBSERVADO con motivo; auditoría ok. |

**Flujo básico**
1. El Superadmin abre *Ingesta de documentos*.
2. Selección a empresa y año (obligatorio, RN-014) y tipo (memoria anual / reporte de sostenibilidad).
3. Selección del archivo `.md` (solo acepta `.md`, RN-009) y *Subir*.
4. **Guard**: valida extensión, tamaño (15 MB), tablas con pipes y contenido mínimo (RF-008).
5. Anti-duplicado por sha256 (RN-015): si existe, informativo + enlace al doc ya indexado.
6. **Procesamiento síncrono**: parseo markdown → filas normalizadas → chunking → **embeddings locales** → upsert pgvector (RN-013).
7. La UI espera y muestra el resultado: nº de chunks indexados o estado *OBSERVADO* (sin secciones GRI/sanciones, RN-012).
8. Auditoría (CU009) con usuario, hash, tiempos.

**Flujos alternativos**
- **A1 · Rechazo por formato** (paso 4): mensaje exacto del guard («texto de corrido sin pipes», «pesa X MB», «archivo vacío») y **no se indexa nada**. Se permite reintentar con otro archivo.
- **A2 · Documento sin contenido analizable** (paso 4): estado *OBSERVADO* con motivo; corregible re-subiendo una versión nueva (RN-016).
- **A3 · Falla del embedding local**: la operación se completo con estado *OBSERVADO señalado (normalmente, falla del servidor universitario)*; reintentable sin duplicar (hash ya registrado).

> Nota de diseño: al ser **síncrono**, el máximo de un documento grande está sujeto a UX (spinner con estado del pipeline: guard → parseo → chunking → embedding). Sin colas de mensajes.

---

## CU005 · Consulta al asistente IA (RAG)

| Campo | Detalle |
|---|---|
| Actores | Administrador; LLM (LLM free con function calling) |
| RF / RN | RF-010, RF-011 / RN-022, RN-023, RN-024, RN-025 |
| Precondiciones | Sesión activa; ≥ 1 documento indexado; cuota disponible. |
| Postcondición | Respuesta con citas + historial de chat en la sesión; evento opcional auditado. |

**Flujo básico**
1. El Administrador abre *Asistente de IA*.
2. Escribe su consulta en lenguaje natural (p. ej. «brechas de Minera Andina en GRI 400»).
3. El backend arma el **RAG**: búsqueda semántica pgvector (k=4, filtros empresa/año).
4. Si la pregunta abarca datos estructurados (listado de brechas, sanciones), el backend ya los tiene: las listas provienen de la base de datos y se muestran en la misma respuesta del chat (sin tools/agentes).
5. El sistema arma la respuesta con **fuentes citadas** (doc + sección) y la muestra (mock: chat con badges de citación).

**Flujos alternativos**
- **A1 · Sin información relevante** (paso 3–4): el asistente declara «el documento no aborda este punto» (RN-022), lista lo que sí hay.
- **A2 · LLM/cuota no disponible** (paso 4–5): mensaje de indisponibilidad y de sugerencia «intenta más tarde» (RF-011); el resto del sistema sigue operando (RNF-10).
- **A3 · Consulta sobre empresa/sector fuera de alcance** (fase 1): respuesta con el límite declarado (RN-017) y enlace al alcance.

---

## CU006 · Revisión y ajuste de estado de brechas (supervisión humana)

| Campo | Detalle |
|---|---|
| Actores | Administrador; PO (Oscar) supervisa |
| RF / RN | RF-013 / RN-018, RN-019, RN-020 |
| Precondición | Análisis GRI ejecutado para la empresa. |
| Postcondición | Estados confirmados en `gri_analisis` con historial; listos para el reporte. |

**Flujo básico**
1. El Administrador abre la tabla de resultados del análisis de una empresa (mock: filas GRI 401/413/306).
2. Cada fila tiene el estado **sugerido** por las reglas del catálogo GRI + LLM, siempre con cita (doc + sección).
3. El Administrador revisa cada fila y **valida el estado o lo cambia** (OK / Sub-reportado / Baja sustancia / Crítico) usando la cita como sustento.
4. El sistema guarda el cambio con autor, fecha y estado anterior→nuevo (RN-019).
5. Supervisión: el PO puede solicitar una re-verificación (rol humano de control acordado en actas).

**Flujos alternativos**
- **A1 · Desacuerdo con la sugerencia**: el humano escribe una observación que se guarda junto al cambio.
- **A2 · Estado CRITICO**: exige cita referida a sanción u omisión grave; quedará resaltado en el reporte.

---

## CU007 · Generación de reporte de prospección (PDF)

| Campo | Detalle |
|---|---|
| Actores | Administrador |
| RF / RN | RF-014 / RN-026, RN-027, RN-028 |
| Precondiciones | Brechas **validadas** para la empresa; línea comercial disponible. |
| Postcondición | PDF generado, versionado e inmutable; evento auditado. |

**Flujo básico**
1. El Administrador selecciona empresa y año (sector permitido — RN-017).
2. El sistema valida que **todas las brechas tengan estado confirmado** (RN-019); si falta alguna, la notifica y bloquea la generación.
3. El backend recolecta las **variables dinámicas con un SELECT determinista** a la **tabla del análisis** (`gri_analisis`) — que la ingesta ya pobló — y a `sanciones` (RN-027): sin llamadas al LLM.
4. El **resumen ejecutivo** se compone **determinísticamente desde la tabla del análisis** (`gri_analisis`): conteos por estado, sanciones y destino — **la generación del reporte no hace llamadas al LLM** (el RAG solo vive en el chat).
5. La plantilla Jinja2 se compone y **WeasyPrint genera el PDF**; se registra en `reportes_generados` (v1) y audita.

**Flujos alternativos**
- **A1 · Falta confirmar estados** (paso 2): volver a CU006.
- **A2 · Regeneración**: crea **nueva versión** (v2) sin modificar la previa (RN-028).

---

## CU008 · Historial y descarga de reportes

| Campo | Detalle |
|---|---|
| Actores | Administrador |
| RF / RN | RF-015 / RN-028, RN-031 |
| Flujo básico | listar (filtros empresa/fecha/versión) → descargar PDF → solo lectura (inmutabilidad). |

---

## CU009 · Auditoría de eventos del sistema

| Campo | Detalle |
|---|---|
| Actores | Superadmin (consulta); sistema escribe |
| RF / RN | RF-016 / RN-029, RN-030 |
| Flujo básico | Vista *Auditoría de accesos* → filtros usuario/fecha/tipo → tabla de eventos (solo lectura, append-only). |