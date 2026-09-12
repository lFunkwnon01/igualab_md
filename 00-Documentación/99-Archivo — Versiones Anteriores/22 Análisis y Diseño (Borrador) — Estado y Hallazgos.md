# 22 · Análisis y Diseño (Borrador) — Estado y Hallazgos

Seguimiento del documento oficial **`Análisis y Diseño - Igualab .pdf`** (`01-Mockups-y-Propuestas/`, autores: Luis Millones y Carlos Ordinola, revisión: Teofilo Chambilla). **Estado: 🚧 v1.1 subida el 08-09 (sobreescritura) con el proceso to-be. El análisis NO está cerrado: faltan los diagramas de casos de uso y el diagrama de BD con diccionario de datos (acta 4, REQ-13 — por definir, ~1–2 semanas; cierra los hallazgos 1 y 4 de la v1.0). El modelo de usuarios quedó definido: 2 roles / 3 personas, sin rol "Usuario" (acta 4, REQ-10). Los hallazgos 1–8 de la v1.0 quedan pendientes de re-verificar contra la nueva versión.**

---

## ✅ Lo que ya aporta (base para el vault)

### Casos de uso oficiales (nuevo numerado CU001–CU008)
| CU | Nombre | CU padre | Mockup (Stitch) equivalente |
|---|---|---|---|
| CU001 | Autenticación y gestión de sesión | – | login_cu001 |
| CU002 | Gestión de usuarios | CU001 | gesti_n_de_usuarios_cu002 |
| CU003 | **Ingesta de documentos** (memorias y reportes GRI) | CU001 | ingesta_de_datos_cu005 + actualizaci_n_bd_cu011 |
| CU004 | Consulta al asistente IA (RAG) | CU001 | asistente_ia_rag_cu006 |
| CU005 | Detección de brechas GRI y sanciones | CU003 | panel de CU006 |
| CU006 | Generación de reportes de prospección (PDF) | CU005 | generar_reporte_pdf_cu007 + descargar_reportes_cu009 |
| CU007 | Visualización de dashboards de Bolsa | CU001 | dashboards_bolsa_cu008 |
| CU008 | Auditoría de eventos | CU002 | auditor_a_cu004 |

> ⚠️ El numerado del borrador **no coincide** con el numerado de los mockups Stitch (donde CU003=configuración, CU004=auditoría, CU010=LinkedIn…). Los mockups son anteriores; el CU oficial es ahora el del borrador. Configuración quedó **sin CU** en el borrador (ver hallazgos).

### Requerimientos funcionales (RF-001…RF-021)
21 RF **MUST HAVE**, todos ligados a reglas de negocio: autenticación (RF-001..003), RBAC (RF-004), gestión de usuarios por SuperAdmin (RF-005), **ingesta por SuperAdmin** con PDF+empresa+año, dedup e indexación automática con notificación (RF-006..009), consulta RAG con citas (RF-010..011), aviso si la IA no está disponible (RF-012), brechas GRI + evolución histórica + sanciones (RF-013..015), reporte PDF de prospección inmutable (RF-016..017), dashboards de Bolsa solo lectura con filtros (RF-018..019), auditoría con filtros (RF-020..021).

### Requerimientos no funcionales (RNF-001…RNF-011)
Responsive web · **respuesta IA ≤ 30 s** · ingesta asíncrona (no bloquea módulos) · disponibilidad ≥ 95 % en horario laboral (L–V 8:00–20:00 Perú) · contraseñas cifradas · protección de datos (normativa peruana) · crecimiento progresivo sin degradar · extensibilidad de criterios GRI · respuestas verificables · integración LLM por API (servidor universitario) · **ahorro de tokens/cómputo** sin actividad real.

### Reglas de negocio (RN-001…RN-010)
Sesión válida obligatoria · RBAC con rol único · identificadores únicos y **sin borrado físico** (trazabilidad) · ingesta PDF + empresa identificable + no duplicado · **respuestas siempre citadas** · brechas GRI (RN-006, ver hallazgos) · reporte consolidado que no modifica la fuente · dashboards solo con data ingestada y validada · auditoría automática e inmutable · si el LLM no está disponible se informa sin bloquear el resto.

### Actores
SuperAdmin · Administrador · Usuario · **Sistema IA/LLM (externo, API universidad)** · **Bolsa de Valores de Lima (externo, fuente pública)**.

---

## 🚩 Hallazgos de revisión (corregir en la siguiente versión del borrador)

| # | Hallazgo | Impacto | Sugerencia |
|---|---|---|---|
| 1 | **Diccionario de datos ajeno al proyecto**: las tablas describen un dominio **inmobiliario** (proyecto, torre, piso, activo: departamentos/cocheras, hito, hito_piso) | Alto — no corresponde a Igualab | Redefinir el modelo para el dominio real: usuarios, roles, empresa, documento, indicador GRI, sanción, reporte, evento_auditoría |
| 2 | **Texto residual de IA** en §4 ("…consistencia con BioActiva/Llosa/BSF") — resto de un prompt/generación automática | Medio — credibilidad del documento | Reescribir el párrafo |
| 3 | **RN-006 vacía** (Detección de Brechas GRI sin detalle) y **RF-013** remite a "criterio definido con el Product Owner" | Alto — regla central del negocio sin definir | Completar RN-006 con la lógica del proceso 5 de [[18 Diagramas de Procesos (Lógica de Negocio)]] y cerrar criterios con Oscar (acta 3: sectores Minería/Energía/Petróleo) |
| 4 | **Modelo de datos §8 vacío** (solo número de página) | Alto | Completar con el ER y ligarlo al diccionario corregido |
| 5 | **Fuentes desalineadas con las actas**: §1/§3/§7.1 aún dicen "información pública… Bolsa de Valores de Lima" como fuente, pero el acta 1 decidió que la data proviene de **los propios reportes del cliente** (sin API ni acceso a bolsa) y el acta 3 delimita a 3 sectores | Alto — coherencia con acuerdos | Actualizar antecedentes/alcance/actores: fuente = base del cliente; acotado a Minería, Energía y Petróleo; ver [[21 Actas de Reunión y Acuerdos]] |
| 6 | **Latencia IA**: RNF-002 (≤ 30 s) del borrador vs RNF-02 del vault (< 5 s, del requerimiento antiguo) | Medio | Adoptar **30 s** (documento oficial en curso); el < 5 s queda como aspiración de UX, no requisito |
| 7 | **Configuración del sistema sin CU** (expiración de sesión, RNF-01/RF-003) y mockup CU003 sin equivalente | Bajo | Decidir si se agrega CU o se absorbe en CU002/CU008 |
| 8 | **Contradicción interna**: §3 dice "acceso de solo lectura a dashboards… de la Bolsa" para Usuario, pero el acta 1 limita la data a la base del cliente | Medio | Revisar qué ve el Usuario: dashboards sobre la data del cliente (ingestada), no un feed de bolsa externo |

> 📌 Estos hallazgos no invalidan el borrador: es la versión 1.0 en curso y la reunión del 07-09 (análisis GAP y backlog) es el momento natural para cerrarlos.

## 🔗 Relacionado
- [[21 Actas de Reunión y Acuerdos]] · [[04 Requerimientos Funcionales]] · [[05 Requerimientos No Funcionales]] · [[17 Diagrama de Casos de Uso]] · [[09 Planificación y Roadmap]] · [[10 Pendientes y Supuestos]]
