# 01 · Arquitectura de frontend (React) — FASE 1

> **Numeración alineada al A&D v6 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Base: mock fidelizado <https://igualab.vercel.app/> (SPA vanilla ya finalizada). Se migra a **React 18 + Vite** conservando pantallas, menús por rol y flujos (sin dashboard, sin Bolsa, sin LinkedIn — acta 5).

## 1. Estructura de proyecto

```
frontend/
  index.html
  vite.config.ts
  src/
    main.tsx
    app/            # App, router, guards de rol, providers (auth, sesión-idle)
    api/            # LlmClient/axios… client.ts + endpoints tipados (del swagger del doc 05-api)
    layouts/
      SuperAdminLayout.tsx   # menú: Dashboard (fase 2), Usuarios, Ingesta, Configuración, Auditoría
      AdminLayout.tsx        # menú: Dashboard (fase 2), Asistente IA, Reportes, Descargas
    pages/
      login/Login.tsx        # + recuperación de contraseña
      publico/Portal.tsx     # (fase 2, fuera de alcance; se oculta)
      superadmin/
        Dashboard.tsx (fase 2)  Usuarios.tsx  Ingesta.tsx  Configuracion.tsx  Auditoria.tsx
      admin/
        Dashboard.tsx (fase 2)  AssistantIa.tsx  Reportes.tsx  Descargas.tsx
    components/    # Badges, Cards, Modal, Toast, TableSort, ChatBubbles (mock components)
    hooks/         # useAuth, useIdleTimer (RN-036), useChat (SSE/streaming opcional)
    store/         # estado de sesión y selectores ligeros (zustand o context)
    styles/        # tokens del mock (Inter, colores ASG)
```

## 2. Mapeo de pantallas del mock → páginas React

| Ruta | Rol | Contenido (mock viva) | RF |
|---|---|---|---|
| `/#/Login` | — | correo/contraseña + demoAccounts + recuperar contraseña | RF-001/002 |
| `/#/dashboard` (fase 2) | ambos | tarjetas resumen empresas/documentos/reportes | — |
| `/#/usuarios` | Superadmin | tabla usuarios (crear/editar rol/habilitar) + aviso y confirmación de transferencia de Superadmin (RN-009) | RF-010/012/014 |
| `/#/ingesta` | Superadmin | dropzone .md + selector empresa/año + **estado del pipeline síncrono** (guard → parseo → chunking → embedding) + histórico con escaneo (duplicados) | RF-017/018/020/022 |
| `/#/config` | Superadmin | minutos de inactividad, bloqueo, notificaciones | — |
| `/#/auditoria` | Superadmin | tabla filtrable (usuario/fecha/tipo), solo lectura | RF-046/047/048 |
| `/#/ia` | Administrador | chat con citación (doc + sección) y aviso de cuota/no disponible | RF-029/031/049 |
| `/#/reportes` | Administrador | selección empresa/año + listado de brechas validadas → Generar PDF | RF-035/038/043 |
| `/#/descargas` | Administrador | historial y descarga de versiones | RF-044/045 |

## 3. Flujos clave del UI

1. **Guard de sesión (RNF-005 + RN-036)**: contador de inactividad como el mock (`idleTimer`); al expirar → bloqueo y redirección a login.
2. **Ingesta síncrona (RF-022)**: botón *Subir* deshabilitado mientras el pipeline corre; barra de pasos (guard → parsing → embeddings → listo) con estados RECHAZADO/OBSERVADO + motivo textual.
3. **Chat con citas (RF-029/031)**: los mensajes del asistente renderizan **chips de cita** (doc_id·sección) que abren el fragmento citado; si no hay fuente, el sistema muestra el mensaje de «sin información» tal como queda acordado (RN-021).
4. **CU005 en `/#/ia` (formulario «Estados GRI»)**: tabla de **códigos detectados** (código · tema · **cita de respaldo** · estado desplegable · observación). El estado inicia **sin asignar** y lo fija el Administrador; al guardar se registra el historial por fila. El botón **Generar reporte** está **deshabilitado** hasta completar todas las filas.
5. **Validación de estados antes del reporte**: si quedan brechas sin confirmar, el botón Generar queda deshabilitado y hace el vínculo con el detalle faltante (RF-027/035).

## 4. Reglas del front coherentes con las acciones

| Regla de negocio | Comportamiento de UI |
|---|---|
| RN-009 | al cambiar rol a Superadmin se muestra confirmación «perderás tu rol actual» |
| RN-012 / RNF-014 | selector solo `.md`; validación de tamaño antes de enviar; mensaje con motivo del guard |
| RF-022 | bloqueo del botón subir hasta terminar el pipeline |
| RN-026 | Descargas lista versiones sin permitir edición |
| RNF-004 | navegación bloqueada al rol que no corresponde (guard de ruta + backend igualmente valida) |
