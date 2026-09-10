# 25 · Flujo objetivo del Mockup (frontend) — 2 roles

> **Para:** Juan Renato Flores Pascual (Frontend) · **Revisan:** Fabricio (PM), Carlos/Luis (Analistas)
> **Fecha:** 10-09-2026 · **Base normativa:** Plan v1.1 aprobado + actas 1–4 + A&D v1.1
> **Alcance de este documento:** flujo objetivo de la demo con los cambios **ya respaldados documentalmente**. Los pendientes de acta (REQ-15 del 11-09) se marcan 🟡 y **no se ejecutan hasta decisión del PO**.

---

## 1 · Reglas que definen este flujo (evidencia base)

| Regla | Fuente | Estado |
|---|---|---|
| RBAC **2 roles / 3 personas**: Oscar = Superadmin + 2 Administradores — **sin rol "Usuario"** | Acta 4, REQ-10 ✅ definido | **Aplicar YA** |
| **El Superadmin ingesta** los documentos; el Administrador **solo consulta** | Plan obj. 3 + RN-002 + acta 4 | **Aplicar YA** (corrección de menú actual) |
| **El Superadmin NO usa la IA** (ni reportes de prospección); roles aislados, sin herencia | Acta 1 REQ-01 + RN-002 + [[03 Roles y Control de Accesos]] | **Aplicar YA** |
| Máximo **3 usuarios** reales en el sistema | Acta 1 REQ-03 + acta 4 | **Aplicar YA** (semilla demo: Oscar + 2 Admin) |
| **LinkedIn fuera del alcance** | Plan v1.1 aprobado (sin LinkedIn) · registro formal = REQ-16 (acta 5, 11-09) | **Quitar YA de la demo** |
| Módulo **Bolsa de Valores**: nombre y destino | **Pendiente REQ-15** (acta 5: eliminar vs renombrar "Dashboards de Sostenibilidad") | 🟡 **NO tocar hasta el acta** |
| Chatbot de citas / Portal público / i18n | Sin prioridad en Fase 1 ([[14 Requerimientos del Kick-off (RF-11+)]]) | Mantener como pantalla referencial, fuera del flujo principal |
| Sesión expira por inactividad (configurable 5–120 min) | RF-003 + RNF-001 + pendiente #3 | Mantener (mockup actual ya lo tiene) |

---

## 2 · Mapa maestro: pantalla ↔ numerado oficial ↔ vista JS

> ⚠️ El numerado de las **carpetas Stitch** NO coincide con el **CU oficial del A&D**. Esta tabla es la fuente única de verdad para la demo:

| Carpeta mockup (Stitch) | Pantalla en demo | CU oficial (A&D v1.1) | RF asociados | Rol que la usa |
|---|---|---|---|---|
| `login_cu001` | Login | **CU001** | RF-001…003 | Ambos (única puerta) |
| `gesti_n_de_usuarios_cu002` | Usuarios y roles | **CU002** | RF-005 (+RF-004) | 🟡 Superadmin |
| `ingesta_de_datos_cu005` + `actualizaci_n_bd_cu011` | Ingesta / Actualización BD (**unificar en una sola vista**) | **CU003** (Ingesta de documentos) | RF-006…009 | 🟡 Superadmin |
| `asistente_ia_rag_cu006` | Asistente IA (chat RAG) | **CU004** | RF-010…012 | 🟢 Administrador |
| *(panel lateral de CU006)* | Brechas GRI / Sanciones | **CU005** (+RN-006) | RF-013…015 | 🟢 Administrador |
| `generar_reporte_pdf_cu007` | Generar reporte PDF | **CU006** | RF-016/017 | 🟢 Administrador |
| `descargar_reportes_cu009` | Descargar reportes | **CU006** (descarga del reporte) | RF-016/017 | 🟢 Administrador |
| `dashboards_bolsa_cu008` | Dashboards "Bolsa" | **CU007** | RF-018/019 (+RN-008) | 🟢 Administrador (🟡 Superadmin: lectura general ✅*) — 🟡 **pendiente REQ-15** |
| `auditor_a_cu004` | Auditoría de eventos | **CU008** (en A&D) | RF-020/021 | 🟡 Superadmin |
| `configuraci_n_cu003` | Configuración del sistema | *(sin CU en A&D — hallazgo 7)* | RF-003 (parámetros sesión) | 🟡 Superadmin |
| `panel_principal_dashboard` | Dashboard (KPIs) | *(transversal)* | RF-009 visual | Ambos |
| `b_squeda_linkedin_cu010` | ~~Contactos LinkedIn~~ | ❌ fuera de alcance | — | **ELIMINAR** |
| `portal_p_blico_cu012` | Portal público (referencial) | 2ª fase / sin prioridad | — | ⏸️ fuera del flujo autenticado |
| `chatbot_inclusivo_cu013_fase_2` | Chatbot de citas | Fase 2 | RF-10 (F2) | ⏸️ mantener deshabilitado |

---

## 3 · Flujo por rol (estado objetivo de la demo)

### 🟡 SUPERADMIN (Oscar Baldeón) — "Gestiona quién entra y qué entra"

```
Login CU001 (oscarbaldeon@igualab.org → Superadmin)
        │
        ▼
Dashboard (KPIs generales, solo lectura)
        │
        ├─► 👥 Usuarios y roles (CU002 / RF-005)
        │      • Ve EXACTAMENTE 3 usuarios: Oscar + 2 Administradores
        │      • Crear / editar / activar-desactivar / revocar rol
        │      • Selector de rol: SOLO [Superadmin, Administrador]  ← sin "Usuario"
        │      • Cada operación queda en Auditoría (RF-020/021)
        │
        ├─► 📥 Ingesta de documentos (CU003 / RF-006…009)
        │      • Carga PDF + empresa + año  (sector: Minería/Energía/Petróleo)
        │      • Validación anti-duplicados (RF-007)
        │      • Indexación automática + notificación éxito/error (RF-008/009)
        │      • Historial de cargas + advertencia "Acción Destructiva (respaldo)" (mockup CU011)
        │
        ├─► ⚙️ Configuración (RF-003)
        │      • Tiempo límite de inactividad (slider 5–120 min, default 15)
        │      • Toggles de funciones / modo mantenimiento
        │
        ├─► 🛡️ Auditoría de accesos (CU008 A&D / RF-020/021)
        │      • Filtros (usuario/rango de fechas) + exportar PDF/Excel
        │
        └─► 📊 Dashboards "Bolsa" (solo lectura) ← 🟡 visible, PENDIENTE REQ-15
               • Si REQ-15=(a): ocultar del menú + retirar vista
               • Si REQ-15=(b): renombrar "Dashboards de Sostenibilidad — empresas cotizadas"

   🔒 Sin acceso a: Asistente IA, brechas/sanciones, reportes PDF, descargas
```

### 🟢 ADMINISTRADOR (×2 — prospectores/analistas de Igualab)

```
Login CU001
        │
        ▼
Dashboard (KPIs de sostenibilidad, solo lectura)
        │
        ├─► 🤖 Asistente de IA / RAG (CU004 / RF-010…012)
        │      • Consulta NL sobre documentos INGESTADOS por el Superadmin
        │      • CITADO obligatorio [1] documento/empresa/año (RF-011)
        │      • Aviso si la IA no está disponible (RF-012, sin bloquear el resto)
        │      • Panel lateral: Brechas GRI (CU005) / Sanciones (RF-013…015)
        │
        ├─► 📄 Generar reporte de prospección PDF (CU006 / RF-016/017)
        │      • Secciones configurables (financiero OFF por defecto, riesgos ESG, fuentes)
        │      • Historial de reportes generado (inmutable)
        │
        ├─► ⬇️ Descargar reportes (mockup CU009)
        │      • Lista con categorías y filtros, solo lectura
        │
        └─► 📊 Dashboards "Bolsa" (solo lectura, filtros empresa/sector/periodo)
               ← 🟡 PENDIENTE REQ-15 (mismo tratamiento que arriba)

   🔒 Sin acceso a: Usuarios, roles, Ingesta/Actualizar BD, Configuración, Auditoría
```

---

## 4 · Cambios concretos en el código (`frontend/`) — checklist para Renato

> Archivos actuales: `js/app.js` (MENUS, líneas ~14–34), `js/data.js` (roleLabels/demoAccounts/users), `js/views/*.js` (12 vistas), `index.html` (role-switcher).

### A. Quitar el rol "Usuario" (acta 4 REQ-10) — OBLIGATORIO

- [x] `app.js` → `MENUS`: **eliminar el bloque `usuario`** (dashboard/bolsa/descargas) completo
- [x] `data.js` → `roleLabels`: eliminar `usuario: "Usuario Operativo"`
- [ ] `data.js` → `demoAccounts`: eliminar cuenta demo `usuario` (Juan Pérez)
- [ ] `data.js` → `users` (semilla demo): dejar **exactamente 3 registros activos** — Oscar (superadmin) + 2 Administradores; **los Administradores son 2 personas de Igualab definidas por el cliente (acta 4)** → usar placeholders neutros (p. ej. "Administrador 1 / Administrador 2") hasta confirmar nombres; eliminar/convertir las filas sobrantes (Juan Pérez, Diego Torres) y ajustar María López/Rosa Quispe como los 2 Admin
- [ ] `app.js` → función **revocar rol** (~línea 237): cambiar el texto "…acceso más restringido (Usuario Operativo, solo lectura)" → "…rol de Administrador revocado / acceso deshabilitado"
- [ ] `usuarios.js` (vista): el selector de rol ya lee `roleLabels` → se corrige solo; **verificar** que no exista hardcode "usuario"
- [ ] `index.html` → **role-switcher** (selector de rol demo): solo opciones `Superadmin` y `Administrador`
- [ ] Búsqueda final: `grep -rn "usuario\b" js/views usuarios form` → cero referencias al rol eliminado (usar "usuarios" solo como concepto de gestión)

### B. Quitar LinkedIn (Plan v1.1 sin LinkedIn; registro REQ-16)

- [ ] `app.js` → `MENUS.administrador`: **eliminar el item `linkedin`**
- [ ] Eliminar `js/views/linkedin.js` y su import/routing en `app.js`/`index.html`
- [ ] `data.js`: retirar cualquier dataset/contacto demo asociado a LinkedIn

### C. Corregir el RBAC del menú (ingesta es del Superadmin — no del Administrador)

- [ ] `MENUS.administrador`: **eliminar el item `ingesta`** (hoy el Administrador puede ingestar → contradice RF-006 y la matriz de permisos)
- [ ] `MENUS.superadmin`: el item `actualizar` (Actualizar base de datos) y la vista `ingesta` deben **unificarse**: menú del Superadmin con etiqueta "Ingesta de documentos" → vista `ingesta.js` que incluya historial/carga/advertencia del mockup CU011 (una sola pantalla que cumple CU003 + RF-006…009)
- [ ] `MENUS.administrador`: **agregar `descargas`** (Descargar reportes — hoy solo está en el menú del rol `usuario`, que desaparece); el Administrador es quien descarga (RF-016/017)

### D. Bolsa — 🟡 NO tocar (pendiente REQ-15, se decide hoy 11-09 en el acta 5)

- [ ] Mantener `bolsa` tal cual (nombre y contenido) hasta la decisión del PO
- [ ] Preparado condicional: si **(a) eliminar** → quitar item de `MENUS` (ambos roles) + retirar `bolsa.js` de la demo; si **(b) renombrar** → cambiar `label` a "Dashboards de Sostenibilidad — empresas cotizadas" (en `MENUS`, título de vista y badges) y **quitar el gráfico "Valor de Acción (USD)"** / cualquier dato de mercado del dataset demo

### E. Flujos fuera del demo (no borrar, solo deshabilitar del flujo principal)

- [ ] `publico` (Portal público CU012) y chatbot de citas (CU013): mantenerlos **fuera del hash principal** `#/…` — al nivel de pantallas referenciales "Fase 2" en la presentación, **sin menú para roles internos**
- [ ] No mostrar en la demo i18n/rol público como funciones de Fase 1 (estados RF-11+ en [[14 Requerimientos del Kick-off (RF-11+)]])

---

## 5 · Criterios de aceptación de la demo (para Fabricio presentar)

1. Login demo permite entrar **solo** como Superadmin o Administrador (2 cuentas admin, 1 superadmin).
2. Menú del Superadmin: Dashboard · Usuarios y roles · **Ingesta** · Configuración · Auditoría ✔ — **sin** IA/reportes.
3. Menú del Administrador: Dashboard · **IA RAG** · Brechas/Sanciones · Reportes PDF · Descargas · Dashboards.
4. Ninguna pantalla ni texto menciona "Usuario Operativo", "rol Usuario" o "LinkedIn".
5. Toda acción sensible genera registro en Auditoría (trazabilidad).
6. El título de dashboards dice "Bolsa de Valores" **sigue tal cual hasta el acta** (o el nombre decidido si REQ-15 se cierra en la reunión).

## 🔗 Relacionado
- [[03 Roles y Control de Accesos]] · [[07 Flujos por Rol]] · [[24 Control de Cambios post-Plan — Trazabilidad (Usuario, Bolsa, Renombrado)]] · [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]] · [[21 Actas de Reunión y Acuerdos]] · [[20 Prompt Mockup MVP]]
