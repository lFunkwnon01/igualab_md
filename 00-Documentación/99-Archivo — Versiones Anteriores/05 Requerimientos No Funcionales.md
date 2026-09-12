# 05 · Requerimientos No Funcionales (RNF)

> **Fuente oficial:** *Análisis y Diseño - Igualab* v1.0 (borrador) — numerado **RNF-001…RNF-011**, todos **MUST HAVE**. Ajustado por [[21 Actas de Reunión y Acuerdos]] (costo mínimo, acta 1 REQ-05).

### RNF-001 — Interfaz responsiva
Web responsiva para navegadores de escritorio, accesible a los dos roles del portal (acta 4 REQ-10).

### RNF-002 — Tiempo de respuesta del asistente IA
Consultas del asistente respondidas en **máximo 30 segundos** en condiciones normales (documentos ya indexados).
> ⚠️ El numerado antiguo exigía < 5 s (RNF-02); el documento oficial en curso fija **30 s**. El < 5 s queda como aspiración de UX. Ver [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos|hallazgo 6]].

### RNF-003 — Ingesta asíncrona
La ingesta y el procesamiento de documentos **no bloquean** el resto de módulos.

### RNF-004 — Disponibilidad
Disponible **≥ 95 % del tiempo** en horario laboral (lunes a viernes, 8:00–20:00, hora Perú).

### RNF-005 — Seguridad de credenciales
Contraseñas almacenadas **cifradas, nunca en texto plano**.

### RNF-006 — Protección de datos
Controles básicos de protección de datos personales conforme a la **normativa peruana** aplicable.

### RNF-007 — Escalabilidad de volumen
Soportar el **crecimiento progresivo** de documentos ingestados sin degradar el tiempo de respuesta.

### RNF-008 — Extensibilidad analítica
Incorporar nuevos indicadores o criterios de análisis GRI **sin rediseñar** el sistema.

### RNF-009 — Verificabilidad
Toda respuesta del asistente de IA debe ser **verificable**, referenciando el documento fuente exacto.

### RNF-010 — Integración con el LLM (universidad)
Integrarse con el servicio de LLM provisto por el **servidor de la universidad mediante API** (etapa de desarrollo — acta 2). ⚠️ **Acta 4 (REQ-11): la fase 1 no tendrá despliegue a producción** — opera íntegramente en el entorno de desarrollo universitario ([[21 Actas de Reunión y Acuerdos|acta 4]]).

### RNF-011 — Eficiencia de tokens y cómputo
El diseño de sesión y del contexto conversacional debe **evitar consumo innecesario de tokens/cómputo** sin actividad real del usuario.
> Refuerza el acuerdo del acta 1 (REQ-05): minimizar costo de tokens y servidor — el cliente busca el costo más bajo posible.

---

## 🔗 Relacionado
- [[04 Requerimientos Funcionales]] · [[22 Análisis y Diseño (Borrador) — Estado y Hallazgos]] · [[21 Actas de Reunión y Acuerdos]] · [[10 Pendientes y Supuestos]]
