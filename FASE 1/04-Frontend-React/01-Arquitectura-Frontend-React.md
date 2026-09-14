# 01 · Arquitectura de frontend (React) — FASE 1

> **Numeración alineada al A&D v4 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

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
      SuperAdminLayout.tsx   # menú: Dashboard, Usuarios, Ingesta, Configuración, Auditoría
      AdminLayout.tsx        # menú: Dashboard, Asistente IA, Reportes, Descargas
    pages/
      login/Login.tsx        # + recuperación de contraseña
      publico/Portal.tsx     # (diferido post-fase 1, se oculta)
      superadmin/
        Dashboard.tsx  Usuarios.tsx  Ingesta.tsx  Configuracion.tsx  Auditoria.tsx
      admin/
        Dashboard.tsx  AssistantIa.tsx  Reportes.tsx  Descargas.tsx
    components/    # Badges, Cards, Modal, Toast, TableSort, ChatBubbles (mock components)
    hooks/         # useAuth, useIdleTimer (RN-004), useChat (SSE/streaming opcional)
    store/         # estado de sesión y selectores ligeros (zustand o context)
    styles/        # tokens del mock (Inter, colores ASG)
```

## 2. Mapeo de pantallas del mock → páginas React

| Ruta | Rol | Contenido (mock viva) | RF |
|---|---|---|---|
| `/#/Login` | — | correo/contraseña + demoAccounts + recuperar contraseña | RF-001/002 |
| `/#/dashboard` | ambos | tarjetas resumen empresas/documentos/reportes | — |
| `/#/usuarios` | Superadmin | tabla usuarios (crear/editar rol/habilitar) + aviso y confirmación de transferencia de Superadmin (RN-003) | RF-005 |
| `/#/ingesta` | Superadmin | dropzone .md + selector empresa/año + **estado del pipeline síncrono** (guard → parseo → chunking → embedding) + histórico con escaneo (duplicados) | RF-007/008/009 |
| `/#/config` | Superadmin | minutos de inactividad, bloqueo, notificaciones | RF-003/006 |
| `/#/auditoria` | Superadmin | tabla filtrable (usuario/fecha/tipo), solo lectura | RF-016 |
| `/#/ia` | Administrador | chat con citación (doc + sección) y aviso de cuota/no disponible | RF-010/011/012/013 |
| `/#/reportes` | Administrador | selección empresa/año + listado de brechas validadas → Generar PDF | RF-014 |
| `/#/descargas` | Administrador | historial y descarga de versiones | RF-015 |

## 3. Flujos clave del UI

1. **Guard de sesión (RNF + RN-004)**: contador de inactividad como el mock (`idleTimer`); al expirar → bloqueo y redirección a login.
2. **Ingesta síncrona (RN-012)**: botón *Subir* deshabilitado mientras el pipeline corre; barra de pasos (guard → parsing → embeddings → listo) con estados RECHAZADO/OBSERVADO + motivo textual.
3. **Chat con citas (RF-010/011)**: los mensajes del asistente renderizan **chips de cita** (doc_id·sección) que abren el fragmento citado; si no hay fuente, el sistema muestra el mensaje de «sin información» tal como queda acordado (RN-021).
4. **CU006 en `/#/ia` (formulario «Estados GRI»)**: tabla de **códigos detectados** (código · tema · **cita de respaldo** · estado desplegable · observación). El estado inicia **sin asignar** y lo fija el Administrador; al guardar se registra el historial por fila. El botón **Generar reporte** está **deshabilitado** hasta completar todas las filas.
5. **Validación de estados antes del reporte**: si quedan brechas sin confirmar, el botón Generar queda deshabilitado y hace el vínculo con el detalle faltante (RF-014).

## 4. Reglas del front coherentes con las acciones

| Regla de negocio | Comportamiento de UI |
|---|---|
| RN-003 | al cambiar rol a Superadmin se muestra confirmación «perderás tu rol actual» |
| RN-009/010/011 | selector solo `.md`; validación de tamaño antes de enviar; mensaje con motivo del guard |
| RN-012 | bloqueo del botón subir hasta terminar el pipeline |
| RN-024 | indicador de cuota diaria en el chat (contador `uso_llm`) |
| RN-027 | Descargas lista versiones sin permitir edición |
| RNF-05 | navegación bloqueada al rol que no corresponde (guard de ruta + backend igualmente valida) |
