# 19 · BPMN — Modelado de Procesos (Estándar de Industria)

Modelado en **BPMN 2.0** (*Business Process Model and Notation*), la notación estándar **OMG** usada en industria para procesos de negocio. Complementa la vista Mermaid de [[18 Diagramas de Procesos (Lógica de Negocio)]] con el formato que se usa en consultoría, auditoría y automatización de procesos.

## 📦 Archivos (`00-Documentación/bpmn/`)
| Archivo | Qué es |
|---|---|
| `prospeccion_comercial_e2e.bpmn` | Modelo BPMN 2.0 del proceso central de negocio (XML estándar con diagrama incluido) |
| `prospeccion_comercial_e2e.png` | **Imagen del diagrama (alta resolución, 2×)** — lista para compartir en Discord/WhatsApp |
| `visor_bpmn.html` | Visor autocontenido: ábrelo en el navegador (necesita internet la primera vez, usa bpmn-js por CDN). Permite **arrastrar cualquier `.bpmn`** y **exportar PNG/SVG** con un botón |

## 📤 Cómo compartir (Discord / WhatsApp / correo)
- **La forma que funciona siempre:** subir el **PNG** (`prospeccion_comercial_e2e.png`). Discord muestra las imágenes **directamente en el chat**; los archivos `.bpmn` y `.html` solo se suben como descargas (por eso "no deja verlo").
- **Para que el equipo lo explore interactivo:** enviar `visor_bpmn.html` (o el `.bpmn`) → quien lo recibe lo abre en su navegador o en [bpmn.io](https://demo.bpmn.io).
- **Generar la imagen tú mismo:** abrir `visor_bpmn.html` → botón **Exportar PNG** (o **Exportar SVG** si el canal admite vectorial).

## 🖥️ Cómo abrir / editar el modelo
1. **Visor rápido:** abrir `bpmn/visor_bpmn.html` en el navegador.
2. **Edición:** [bpmn.io](https://demo.bpmn.io) o **Camunda Modeler** (gratis) → abrir el `.bpmn`; también importa **draw.io / diagrams.net** (*Archivo → Abrir desde → dispositivo*).
3. **Enterprise:** Bizagi Modeler o Visio importan BPMN 2.0.

## 🧩 Elementos del estándar usados (leyenda)
| Símbolo | Elemento BPMN | Uso en Igualab |
|---|---|---|
| ○ (círculo fino) | **Evento de inicio** | Disparador: "información nueva analizada" |
| ⊙ (círculo grueso) | **Evento de fin** | Resultados: oportunidad descartada / en seguimiento / venta lograda |
| ▭ (caja redondeada) | **Tarea de usuario** (`userTask`) | Trabajo de la persona: preparar dossier, presentar propuesta |
| ▭⚙️ (caja con engranaje) | **Tarea de servicio** (`serviceTask`) | Paso automático de la plataforma: priorizar, generar perfil |
| ◇✕ (rombo con X) | **Compuerta excluyente** | Decisiones sí/no: ¿relevante?, ¿interesada?, ¿acepta? |
| ▦ (piscina) | **Pool** | La organización: "Igualab — Prospección comercial" |
| ▤ (franjas) | **Carriles (lanes)** | Responsabilidad: Plataforma (automático) · Analista comercial · Empresa objetivo |
| → (flecha sólida) | **Flujo de secuencia** | Orden del trabajo (puede cruzar carriles, nunca piscinas) |

> Regla BPMN aplicada: los flujos de secuencia cruzan carriles libremente; los **flujos de mensajes** (línea discontinua) se reservan para comunicación entre piscinas distintas (p. ej. Igualab ↔ empresa cliente).

## 🗺️ Modelo incluido: prospección comercial E2E
Un solo pool con **3 carriles** y el flujo completo del negocio (equivale al proceso 9 de [[18 Diagramas de Procesos (Lógica de Negocio)]], actualizado post-actas):

**Plataforma (🤖):** informa nueva data (base del cliente) → prioriza por brechas/sanciones → genera perfil.
**Analista (🟢):** prepara dossier → acercamiento como aliado → propuesta de consultoría → contrato → prestación del servicio.
**Empresa (🌐):** evalúa propuesta → coordina reunión.

Decisiones (compuertas excluyentes): ¿brecha o sanción relevante? · ¿contacto clave identificado? · ¿empresa interesada? · ¿acepta el servicio?

Caminos que cubre: **venta lograda** · **seguimiento sin contacto clave** · **seguimiento sin interés** · **descarte sin oportunidad**.

> 🔄 **Post-actas:** la tarea "Buscar contacto en canales profesionales (ej. LinkedIn)" fue **eliminada** (RF-17 fuera de alcance); su rama se sustituyó por "Registrar la oportunidad en seguimiento (contacto institucional)". El PNG y el visor ya están regenerados sin LinkedIn.

## 📌 Convención de nombres (para el resto del modelo)
- Tareas con **verbo + objeto** ("Priorizar empresas…").
- Compuertas con **pregunta** y flujos etiquetados **Sí/No**.
- Eventos de fin con **resultado de negocio**.

## 🔜 Pendiente (opcional)
Convertir los otros 13 procesos de [[18 Diagramas de Procesos (Lógica de Negocio)]] a `.bpmn` con la misma convención (el visor HTML ya los renderiza si se agregan).

## 🔗 Relacionado
- [[18 Diagramas de Procesos (Lógica de Negocio)]] · [[Diagramas de Procesos]] (vista técnica) · [[09 Planificación y Roadmap]] · [[13 Visión del CEO y Caso de Uso (Kick-off)]]
