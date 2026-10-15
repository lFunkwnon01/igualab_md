# 01 · Arquitectura de frontend (React) — FASE 1

> ## ⚠️ NOTA AS-BUILT (2026-10-14 · `FE-IGUALAB@705cc78`)
> El frontend **real** (React 18.3 + TypeScript 5.6 strict + Vite 5 + Tailwind + react-router-dom 6 + framer-motion + sonner) difiere del diseño:
> - **Estructura real:** `src/{api, auth, components, data, lib, pages}` + `App.tsx` + `main.tsx`. **No** existen `layouts/`, `hooks/`, `store/`, `styles/` (el layout es `components/Layout.tsx`, el estado de sesión vive en `auth/AuthContext.tsx`).
> - **Rutas reales:** `/login`, `/restablecer` (públicas) · `/usuarios`, `/empresas`, `/ingesta`, `/auditoria` (SuperAdmin) · `/ia`, `/analisis`, `/reportes`, `/descargas` (Administrador) · `/mi-cuenta`.
> - **Conectadas al backend (7 páginas):** Login, Restablecer, MiCuenta, Usuarios, Empresas, Ingesta, AnalisisGri. **Mock (4 páginas):** Asistente, Reportes, Descargas, Auditoría (usan `data/seed.ts` + `data/DomainContext.tsx` + `PendienteBanner`).
> - **Tests:** Vitest + jsdom, **11 archivos** solo de lógica pura/API. **No** hay `@testing-library` → **cero tests de componentes/páginas**.
> - **Bug conocido:** `src/api/client.ts:104-105` (`detallesToStrings`) solo lee `details.errores`; el backend envía `details.errors` → se pierden mensajes por-regla.

> **Numeración alineada al A&D V2 (LaTeX)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Base: mock fidelizado <https://igualab.vercel.app/> (SPA vanilla ya finalizada). Se migra a **React 18 + Vite** conservando pantallas, menús por rol y flujos (sin dashboard, sin Bolsa, sin LinkedIn — acta 5).

## 1. Estructura de proyecto (real)

```
frontend/
  index.html
  vite.config.ts
  src/
    main.tsx
    App.tsx            # router + ProtectedRoute + InicioSegunRol
    api/               # client.ts (fetch + ApiError + eventos) · auth · usuarios · empresas · documentos · analisis
    auth/              # AuthContext.tsx (sesión) · ProtectedRoute.tsx (guard de rol)
    components/        # Layout · LoadingOverlay · Modal · Badge · KpiCard · SectionHeader · Spinner · ToastProvider · PendienteBanner · ReporteA4
    data/              # seed.ts + DomainContext.tsx (SOLO para las 4 páginas mock)
    lib/               # dominio.ts (etiquetas/validación) · format.ts · password.ts · token.ts · validacion.ts
    pages/             # Login · Restablecer · MiCuenta · Usuarios · Empresas · Ingesta · AnalisisGri · Asistente · Reportes · Descargas · Auditoria
    types.ts           # contratos API reales + (bloque legacy) dominio mock
```

> Regla: las páginas conectadas importan de `api/` + `lib/dominio`; las 4 mock importan de `data/`. `types.ts` mantiene ambos dominios (deuda a saldar cuando M6/M7/M8 tengan backend).

## 2. Mapeo de pantallas del mock → páginas React

| Ruta | Rol | Contenido (mock viva) | RF |
|---|---|---|---|
| `/#/Login` | — | correo/contraseña + demoAccounts + recuperar contraseña | RF-001/002 |
| `/#/dashboard` (fase 2) | ambos | tarjetas resumen empresas/documentos/reportes | — |
| `/#/usuarios` | Superadmin | tabla usuarios (crear/editar rol/habilitar) + aviso y confirmación de transferencia de Superadmin (RN-009) | RF-006/012/014 |
| `/#/ingesta` | Superadmin | dropzone .md + selector empresa/año + **estado del pipeline síncrono** (guard → parseo → chunking → embedding) + histórico con escaneo (duplicados) | RF-012/018/020/022 |
| `/#/auditoria` | Superadmin | tabla filtrable (usuario/fecha/tipo), solo lectura | RF-029/030 |
| `/#/ia` | Administrador | chat con citación (doc + sección) y aviso de cuota/no disponible | RF-023/024 |
| `/#/reportes` | Administrador | selección empresa/año + listado de brechas validadas → Generar PDF | RF-025/028 |
| `/#/descargas` | Administrador | historial y descarga de versiones | RF-026/027 |

## 3. Flujos clave del UI

1. **Guard de sesión (RNF-006 + RN-013)**: contador de inactividad como el mock (`idleTimer`); al expirar → bloqueo y redirección a login.
2. **Ingesta síncrona (RF-015)**: botón *Subir* deshabilitado mientras el pipeline corre; barra de pasos (guard → parsing → embeddings → listo) con estados RECHAZADO/OBSERVADO + motivo textual.
3. **Chat con citas (RF-023/024)**: los mensajes del asistente renderizan **chips de cita** (doc_id·sección) que abren el fragmento citado; si no hay fuente, el sistema muestra el mensaje de «sin información» tal como queda acordado (RN-035).
4. **CU005 en `/#/ia` (formulario «Estados GRI»)**: tabla de **códigos detectados** (código · tema · **cita de respaldo** · estado desplegable · observación). El estado inicia **sin asignar** y lo fija el Administrador; al guardar se registra el historial por fila. El botón **Generar reporte** está **deshabilitado** hasta completar todas las filas.
5. **Validación de estados antes del reporte**: si quedan brechas sin confirmar, el botón Generar queda deshabilitado y hace el vínculo con el detalle faltante (RF-019/025).

## 4. Reglas del front coherentes con las acciones

| Regla de negocio | Comportamiento de UI |
|---|---|
| RN-009 | al cambiar rol a Superadmin se muestra confirmación «perderás tu rol actual» |
| RN-019 / RNF-020 | selector solo `.md`; validación de tamaño antes de enviar; mensaje con motivo del guard |
| RF-015 | bloqueo del botón subir hasta terminar el pipeline |
| RN-041 | Descargas lista versiones sin permitir edición |
| RNF-005 | navegación bloqueada al rol que no corresponde (guard de ruta + backend igualmente valida) |
