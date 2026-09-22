# 08 · Especificación de Casos de Uso — FASE 1

> **Numeración = A&D vigente** (`analisis-diseno-latex/main.pdf`, sección 7.2). Casos de uso **CU001…CU007**.
> Formato: Actores · Precondiciones · Flujo básico · Flujos alternativos · Postcondición · RF/RN asociados.

---

## CU001 · Autenticación y gestión de sesión

| Campo | Detalle |
|---|---|
| Actores | SuperAdmin, Administrador, Servicio de correo (externo) |
| RF / RN | RF-001…RF-005 / RN-004, RN-007, RN-010, RN-011, RN-012, RN-013 |
| Precondiciones | Sistema desplegado; usuario registrado, habilitado y con rol. |
| Postcondición | Sesión activa con rol vigente y evento auditado (CU007). |

**Flujo básico**
1. El usuario accede a la URL de la plataforma.
2. Ingresa correo y contraseña y selecciona *Iniciar sesión*.
3. El sistema valida que la cuenta exista y esté habilitada, y que la contraseña sea correcta.
4. El sistema identifica el rol y genera un token firmado (JWT) con la identidad y el rol vigente.
5. Establece la sesión y redirige a la vista del rol (SuperAdmin: gestión; Administrador: analítica).
6. Registra el evento de login en la auditoría.

**Flujos alternativos**
- **A1 · Credenciales inválidas:** mensaje «Credenciales inválidas» (idéntico si la cuenta no existe). Tras **5 intentos** fallidos, bloqueo **15 min** (RN-012) y registro en auditoría.
- **A2 · Cuenta deshabilitada:** «Usuario deshabilitado. Contacte al administrador».
- **A3 · Recuperación de contraseña:** enlace seguro de **un solo uso** con vigencia de **30 min** (RN-010, RN-011); al usarlo se invalida y se revocan las sesiones.
- **A4 · Cambio de contraseña (autenticado)**: aplica la misma política de complejidad (RN-011).
- **A5 · Cierre de sesión / inactividad**: la sesión expira tras **2 horas** de inactividad (RN-013).

---

## CU002 · Gestión de usuarios

| Campo | Detalle |
|---|---|
| Actores | SuperAdmin |
| RF / RN | RF-006…RF-009 / RN-001, RN-002, RN-005, RN-006, RN-007, RN-008, RN-009 |
| Precondiciones | Sesión SuperAdmin activa. |
| Postcondición | Cuenta creada/habilitada/deshabilitada o rol transferido; existe exactamente 1 SuperAdmin; evento auditado. |

**Flujo básico**
1. El SuperAdmin abre *Usuarios*.
2. El sistema lista las cuentas (nombre, correo, rol, estado).
3. El SuperAdmin crea una cuenta (nombre, correo y contraseña); el sistema le asigna el rol **Administrador** (RN-008).
4. El sistema valida unicidad de correo y formato (RN-007) y persiste.
5. Audita el cambio.

**Flujos alternativos**
- **A1 · Transferencia del rol SuperAdmin (RN-009):** se selecciona una cuenta de Administrador **habilitada**; se pide confirmación y el sistema ejecuta la transferencia **atómica** (destino→SuperAdmin, origen→Administrador). Las sesiones activas aplican el **rol vigente**.
- **A2 · Correo duplicado:** se rechaza con mensaje.
- **A3 · Deshabilitar cuenta:** invalida de inmediato sus sesiones activas (RN-005) y audita.
- **A4 · Intento de deshabilitar al SuperAdmin:** se impide; primero debe transferirse el rol (RN-002, RN-006).

---

## CU003 · Ingesta de documentos (memorias y reportes GRI)

| Campo | Detalle |
|---|---|
| Actores | SuperAdmin; Proveedor de IA (embeddings, externo) |
| RF / RN | RF-012…RF-017 / RN-018, RN-019, RN-020, RN-021, RN-022, RN-023, RN-024, RN-025, RN-026 |
| Precondiciones | Sesión SuperAdmin; empresa registrada; archivo `.md` (tablas de pipes, ≤ 50 MB). |
| Postcondición | Documento indexado y análisis GRI poblado, o estado rechazado/observado con motivo; auditoría ok. |

**Flujo básico**
1. El SuperAdmin abre *Ingesta*.
2. Selecciona sector y empresa, año y tipo (memoria anual / reporte de sostenibilidad GRI).
3. Selecciona el archivo `.md` y pulsa *Ingestar*.
4. **Guard**: valida el tipo real del archivo, el tamaño (≤ 50 MB), las tablas de pipes y el contenido mínimo (≥ 1 código GRI o mención de sanción).
5. Calcula el **SHA-256** y verifica unicidad (contenido y empresa/año/tipo).
6. **Procesamiento síncrono**: parseo → chunking → *embeddings* por API → indexación (pgvector).
7. Ejecuta el **análisis GRI/sanciones** como último paso (filas sin estado).
8. Muestra el resultado y registra el evento en auditoría.

**Flujos alternativos**
- **A1 · Empresa no registrada:** permite crearla (nombre + sector) y reintentar.
- **A2 · Documento duplicado** (mismo hash o misma empresa/año/tipo): rechaza e indica la carga original.
- **A3 · Sin contenido analizable:** estado **OBSERVADO** (no rechazado) hasta corregirse.
- **A4 · Rechazo/interrupción:** **rollback atómico**; conserva solo el motivo (sin fragmentos, embeddings ni análisis parciales) (RN-026).

---

## CU004 · Consulta al asistente de IA (RAG)

| Campo | Detalle |
|---|---|
| Actores | Administrador; Proveedor de IA (RAG simple, sin *function calling*) |
| RF / RN | RF-023, RF-024 / RN-033, RN-034, RN-035, RN-036, RN-037 |
| Precondiciones | Sesión activa; ≥ 1 documento indexado; cuota del proveedor disponible. |
| Postcondición | Respuesta **con citas** (documento/empresa/año) o declinación explícita. |

**Flujo básico**
1. El Administrador abre *Asistente de IA*.
2. Selecciona **sector, empresa y año** (obligatorio — RN-037).
3. Formula su consulta en lenguaje natural.
4. El backend arma el RAG: búsqueda semántica (pgvector, k=4) con el contexto seleccionado.
5. Devuelve la respuesta **fundada solo en el corpus**, con **citación** de documento y sección (RN-033, RN-034).

**Flujos alternativos**
- **A1 · Sin información suficiente:** el asistente lo **declara explícitamente**, sin inventar (RN-035).
- **A2 · Consulta fuera de dominio:** declina explícitamente (RN-036).
- **A3 · Proveedor de IA no disponible:** informa el error sin bloquear el resto de módulos (RNF-019).

---

## CU005 · Detección de brechas GRI y sanciones

| Campo | Detalle |
|---|---|
| Actores | Administrador; PO (Oscar) supervisa |
| RF / RN | RF-018…RF-022, RF-028 / RN-027, RN-028, RN-029, RN-030, RN-031, RN-032 |
| Precondición | Empresa con al menos un documento indexado; análisis GRI poblado al finalizar la ingesta. |
| Postcondición | Estados confirmados en la tabla del análisis, con historial; listos para el reporte. |

**Flujo básico**
1. El Administrador selecciona la empresa y el año.
2. El sistema muestra los códigos GRI detectados **con su cita textual** (documento y sección) y las sanciones identificadas.
3. El Administrador revisa cada cita y **asigna manualmente** el estado: `OK`, `Baja sustancia` o `Sub-reportado` (RN-029, RN-030).
4. El sistema guarda el cambio con autor, fecha y estado anterior→nuevo.
5. Calcula el puntaje ESG a partir de los estados asignados (RN-032).
6. Habilita la generación del reporte cuando todas las filas tienen estado.

**Flujos alternativos**
- **A1 · Sin códigos detectados:** el puntaje ESG se muestra **«no disponible»** (nunca cero).
- **A2 · Documentación insuficiente:** informa y no genera resultado.
- **A3 · Proveedor de IA no disponible:** informa el error y permite reintentar.

> El sistema **no** compara contra el estándar GRI ni infiere el estado; solo detecta códigos y extrae la cita (RN-028).

---

## CU006 · Generación de reportes de prospección (PDF)

| Campo | Detalle |
|---|---|
| Actores | Administrador |
| RF / RN | RF-025, RF-026, RF-027 / RN-038, RN-039, RN-040, RN-041 |
| Precondiciones | Empresa + un año seleccionados; todas las brechas con estado asignado; empresa con ≥ 1 documento indexado. |
| Postcondición | PDF generado, **inmutable**, con snapshot congelado; evento auditado. |

**Flujo básico**
1. El Administrador selecciona empresa y año.
2. El sistema valida que todas las brechas tengan estado confirmado (RN-038).
3. Recolecta las variables con un **SELECT determinista** a la tabla del análisis y a `sanciones`, **sin invocar al LLM** (RN-040).
4. Compone el **resumen ejecutivo** (conteos por estado, sanciones y puntaje ESG) de forma determinística.
5. Genera el PDF (Jinja2 → WeasyPrint), registra el reporte y audita.

**Flujos alternativos**
- **A1 · Faltan estados:** bloquea la generación e indica las filas pendientes.
- **A2 · Sin sanciones:** imprime el bloque determinístico «no se registraron sanciones… (doc + sección, período)»; no inventa ni omite.
- **A3 · Reporte ya existente** para la misma empresa/año: no se genera un segundo (RN-041).

---

## CU007 · Auditoría de eventos del sistema

| Campo | Detalle |
|---|---|
| Actores | SuperAdmin (consulta); el sistema escribe |
| RF / RN | RF-029, RF-030 / RN-042, RN-043, RN-044, RN-045 |
| Precondición | Sesión SuperAdmin activa; existe al menos un evento. |
| Postcondición | Eventos consultables; la consulta no modifica el registro. |

**Flujo básico**
1. El sistema registra automáticamente los eventos sensibles (inicio de sesión, cambio de rol/estado, ingesta, rechazo y generación de reporte) con cuenta, fecha/hora (UTC) y tipo.
2. El SuperAdmin accede al módulo de *Auditoría*.
3. Aplica filtros (usuario, fecha y tipo de evento) y consulta el registro (solo lectura).

**Flujos alternativos**
- **A1 · Sin coincidencias:** informa que no hay eventos para el criterio.
- **A2 · Acceso no autorizado:** un rol distinto de SuperAdmin es denegado (HTTP 403) y el intento queda registrado.
