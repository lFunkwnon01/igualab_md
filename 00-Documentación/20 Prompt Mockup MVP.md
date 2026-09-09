# 20 · Prompts para Mockup (Stitch → AI Studio)

> ⚠️ **Actualización post-actas (05-09):** numerado de mockups (CU001–CU013) es **anterior** al numerado oficial de [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|Análisis y Diseño]] (CU001–CU008). Cambios: **CU010 (LinkedIn) queda FUERA del alcance** (RF-17 eliminado); **ingesta (CU005/CU011) pasa a rol Superadmin**; portal público (CU012) → suscripción 2ª fase; chatbot citas (CU013) fuera.

> **Propósito:** prototipo navegable de la plataforma Igualab simulando CU001–CU013. Flujo de trabajo en dos etapas:
> 1. **Stitch (Google)** genera el *diseño visual* (flujo, pantallas, pestañas, colores, componentes) — entregable tipo Figma.
> 2. **AI Studio (Google)** recibe el diseño exportado de Stitch + el stack técnico y genera el *código HTML real* navegable con datos falsos.
>
> Por eso el prompt se divide en dos partes: **A) Prompt de Diseño (Stitch)** y **B) Prompt de Implementación (AI Studio)**.
> Entrega de mockup: viernes 28, 10:00 (M0 del roadmap). ✅ **Estado: entregado y ejecutado** — las 14 pantallas (CU001–CU013 + panel dashboard) están en `diseno/stitch_plataforma_igualab_sostenibilidad_e_inteligencia/` (cada una con `code.html` + `screen.png`), y el prototipo navegable en `frontend/` (desplegado en Vercel).

---

## 🅰️ PARTE A — PROMPT PARA STITCH (Diseño visual / UX)

> Pegar en **Stitch**. Enfocarse SOLO en lo visual: estructura, navegación, componentes, paleta, tipografía. NO pedir código.
> El entregable de Stitch (export de pantallas / mockups) se usará como input en la Parte B.

```
Diseña la INTERFAZ VISUAL (wireframe de alta fidelidad, estilo Figma) de una plataforma web llamada "Igualab":
inteligencia de sostenibilidad y prospección comercial para una ONG peruana. NO generes código, solo el diseño de 
las pantallas, su flujo de navegación, componentes, colores y tipografía.

MARCA / ESTILO:
- Usa el logo de la marca en "Logo.webp" (ruta local: /home/lFunknown/Escritorio/igualab/02-Recursos-Media/Logo.webp; copia del app en frontend/assets/Logo.webp). Si no se puede 
  leer, usa una "I" estilizada en círculo verde.
- Paleta de sostenibilidad: verde bosque #1f7a4d (primario), teal #0f9b8e (secundario), fondo arena/claro #f6f8f7, 
  acento ámbar #e0a800 (alertas). Tipografía limpia moderna (Inter). Estilo profesional, accesible, mucho aire 
  (whitespace), tarjetas redondeadas, sombras suaves.
- Idioa de la UI en ESPAÑOL.

SISTEMA DE NAVEGACIÓN (diseñar estas piezas):
- Pantalla de LOGIN centrada (logo, correo, contraseño, "Iniciar sesión", "¿Olvidó su contraseña?").
- Layout de app: barra lateral izquierda (menú por rol) + cabecera superior (logo, usuario, rol, "Cerrar sesión") + 
  área de contenido. Incluir un "selector de rol demo" (esquina inferior) con 4 chips: Superadmin 🟡, Administrador 🟢, 
  Usuario Operativo 🔵, Público 🌐.
- Un PATRÓN de tarjeta KPI, un patrón de TABLA (con filtros), un patrón de CHAT (burbujas + panel lateral de fuentes), 
  un patrón de MODAL, y un patrón de DASHBOARD con gráficos.

PANTALLAS A DISEÑAR (mapa de CU), indicando QUÉ menú las habilita según rol:
1. Login (CU001) — todos.
2. Panel principal por rol (KPIs distintos por rol).
3. Gestión de usuarios (CU002) — 🟡: tabla usuario/rol/estado + acciones Crear/Editar/Dar de baja/Revocar.
4. Configuración (CU003) — 🟡: form slider "minutos inactividad", toggles.
5. Auditoría (CU004) — 🟡: tabla evento/fecha/usuario/acción + filtros + "Exportar".
6. Ingesta de datos (CU005) — 🟡 **Superadmin** (cambio post-actas): drag&drop + metadatos (empresa/año/sector/fuente) + lista documentos.
7. Asistente IA / chat RAG (CU006) — 🟢: chat + panel lateral "Brechas GRI" y "Sanciones" + chip de fuente citada.
8. Generar reporte prospección PDF (CU007) — 🟢: selector empresa/periodo + checkboxes secciones + preview A4.
9. Dashboards Bolsa (CU008) — 🟢 y 🔵: gráficos + tabla filtrable empresa/sector/periodo.
10. Descargar reportes (CU009) — 🔵: lista PDF + descargar.
11. Actualización BD (CU011) — 🟡 Superadmin: como CU005 etiquetado "Carga/Actualización", aviso reemplazo.
12. Portal público (CU012) — 🌐 → ⏸️ replanteado como suscripción (2ª fase).
13. ~~Buscar contactos LinkedIn (CU010)~~ — ⛔ **FUERA DEL ALCANCE** (RF-17 eliminado).
14. Chatbot citas inclusivo (CU013, Fase 2) — 🌐: widget chat accesible (texto grande, contraste).

REGLAS VISUALES:
- El Usuario Operativo y el Público NO deben mostrar en su menú el chat IA ni la ingesta. El Superadmin NO muestra el chat IA.
- Dashboard de Bolsa es la ÚNICA pantalla del Usuario Operativo; portal público la del Público.
- Marcar claramente la pantalla 14 como "Fase 2" y la 13 como "Exploratorio".
- Diseño responsive (móvil y desktop).

Entrega de Stitch: exporta las pantallas y, si la herramienta lo permite, un resumen de tokens de diseño 
(colores, tipografía, radios, espaciado) para reutilizarlos en la implementación.
```

---

## 🅱️ PARTE B — PROMPT PARA AI STUDIO (Implementación / código real)

> Pegar en **AI Studio** junto con el diseño exportado de Stitch (Parte A). Aquí SÍ va el stack técnico y la lógica.
> Input implícito: "Toma el diseño de Stitch adjunto y conviértelo en código real navegable".

```
A partir del DISEÑO exportado de Stitch (pantallas y tokens de la Parte A), implementa un MOCKUP NAVEGABLE Y REAL 
de "Igualab" como UN SOLO archivo HTML autocontenido (HTML + CSS + JS, sin build), usando:

STACK TÉCNICO:
- Tailwind CSS por CDN (usa los mismos colores/tipografía/radios del diseño de Stitch como config en tailwind.config).
- Chart.js por CDN para los dashboards de la Bolsa.
- Vanilla JS para la navegación por hash (#vista) y el "selector de rol demo" que re-renderiza menú y pantallas (RBAC).
- Datos FALSOS hardcodeados en el JS (sin backend). Todo en memoria del navegador.
- Logo desde "Logo.webp" (o inicial "I" si falta).

COMPORTAMIENTO A PROGRAMAR (mapeo CU):
- LOGIN (CU001): validación falsa (correo con "error" -> credenciales incorrectas; "bloqueado" -> cuenta bloqueada; 
  "¿Olvidó su contraseña?" abre modal). "Entrar como demo" usa el rol del selector.
- RBAC: al cambiar rol en el selector, ocultar/motrar secciones del menú y del render. Superadmin 🟡 ve 3,4,5,11 y NO el 
  chat IA; Administrador 🟢 ve 6,7,8,9; Usuario 🔵 ve SOLO 9 y 10; Público 🌐 ve 12 y el widget 14. (RF-01..04, matriz).
- GESTIÓN USUARIOS (CU002): tabla; Crear/Editar/Dar de baja (baja lógica -> estado Inactivo)/Revocar rol, todo en memoria; 
  validar correo único falso.
- CONFIG (CU003): guardar muestra toast "aplicado y registrado en auditoría" y agrega fila a auditoría.
- AUDITORÍA (CU004): tabla solo lectura con filtros + exportar (CSV falso).
- INGESTA (CU005) y ACT. BD (CU011): drag&drop simulado + metadatos; al cargar muestra "Procesando e indexando..." -> 
  "Disponible"; aviso de reemplazo si nombre existe.
- CHAT IA (CU006): preguntas de ejemplo clicables; respuestas falsas pero realistas que SIEMPRE citan fuente 
  (ej. "Fuente: Memoria Anual 2024, Minera Andina S.A.A., p.142") y pueblan el panel lateral con Brechas GRI (RF-12) y 
  Sanciones (RF-13, montos en soles). Indicador latencia < 5 s.
- REPORTE PDF (CU007): modal preview A4 (portada Igualab, resumen, tabla brechas GRI, monto sanciones) + "Descargar" 
  (window.print o HTML).
- BOLSA (CU008): Chart.js con series falsas 2023-2025 por empresa + tabla filtrable.
- DESCARGAR (CU009): lista PDF falsos + descargar.
- PORTAL PÚBLICO (CU012): landing sin login, buscador, resultados solo lectura; selector idioma ES/EN/Quechua (RF-15), 
  sin prospección (RF-14).
- ~~LINKEDIN (CU010)~~: FUERA DE ALCANCE — no implementar.
- CHATBOT CITAS (CU013, Fase 2): flujo paso a paso (intención -> horarios -> confirmación) accesible.

DATOS FALSOS:
- Empresas: Minera Andina S.A.A. (Minería), Banco del Sur S.A. (Banca), Energía Lima S.A.C. (Energía), Pesquera del Pacífico (Pesca).
- Sanciones: Minera Andina S/ 4.2M (Consulta Previa 2024); Banco del Sur S/ 1.1M (laboral).
- Brechas GRI: GRI 401 "sub-reportado", GRI 413 "baja sustancia", GRI 306 "OK".
- Usuarios: Oscar Baldeón (Superadmin), María López (Administrador), Juan Pérez (Usuario Operativo).

REGLAS:
- Toda acción sensible (login, cambio rol, ingesta, reporte) agrega fila en auditoría (simulado).
- Responsive. Poco comentario en código. Entrega el HTML completo y ejecutable.
```

---

## 📎 Notas de flujo
- **Stitch → AI Studio:** exporta las pantallas/tokens de la Parte A y pásalas como contexto a la Parte B en AI Studio.
- **Logo:** reemplaza la referencia a `Logo.webp` por la URL que nos pases en ambas partes.
- **Alcance demo (post-actas):** pantallas 1–12 (con CU005/CU011 en rol Superadmin); CU010 fuera; 14 (chatbot) fuera; portal público → suscripción 2ª fase.
- Cuando nos des el **contexto de cómo se diseña hoy y si es fiable**, lo integramos/ajustamos aquí.
- ⚠ **Alineación (acta 4, 08-09):** en los mockups generados aparecen roles con nombres distintos a la matriz del vault — "Analista", "Visor" y "Operador". Tras el acta 4 el RBAC vigente es **Superadmin / Administrador** (2 roles, 3 personas — REQ-10: **sin rol "Usuario"**): **regenerar/ajustar las pantallas** quitando el rol Usuario y sus vistas. La pantalla de auditoría muestra un wordmark residual "**INABVERSITY**" que hay que reemplazar por Igualab. Ver [[03 Roles y Control de Accesos]] y [[10 Pendientes y Supuestos]].
- ⚠ **Acta 1 pidió "algo simplista"**: iterar la UI del mockup hacia menos elementos, manteniendo las respuestas necesarias.

## 🔗 Relacionado
- [[09 Planificación y Roadmap]] (M0 mockup) · [[03 Roles y Control de Accesos]] · [[04 Requerimientos Funcionales]] · [[14 Requerimientos del Kick-off (RF-11+)]]
