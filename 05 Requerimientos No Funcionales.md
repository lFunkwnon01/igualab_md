# 05 · Requerimientos No Funcionales (RNF)

### RNF-01 — Seguridad y Privacidad
- Las **credenciales deben almacenarse cifradas/hasheadas**.
- La **sesión debe expirar por inactividad** para proteger información sensible (sostenibilidad y Bolsa de Valores).
- 🚩 *Pendiente de diseño:* política de expiración de sesión (ver [[10 Pendientes y Supuestos]]).

### RNF-02 — Disponibilidad y Rendimiento
- Panel interno y consultas al asistente de IA deben responder en **tiempo razonable (< 5 s** para consultas estándar en base de datos).
- Implicación para la arquitectura: índices en OpenSearch y DynamoDB, caché de dashboards. Ver [[06 Arquitectura (AWS)]].

### RNF-03 — Usabilidad
- Interfaz web **intuitiva, limpia y de fácil navegación**, tanto para consulta visual de datos como para el chat de IA.
- Para el [[04 Requerimientos Funcionales#RF-10 — Chatbot de Citas Fase 2|RF-10]] aplica además accesibilidad (lectores de pantalla, lenguaje claro, alternativas texto/voz) según el onepager.

### RNF-04 — Trazabilidad
- Todo acceso o modificación de datos sensibles debe quedar registrado. **Soporta [[04 Requerimientos Funcionales#RF-09 — Auditoría de accesos|RF-09]].**

---

## 🔗 Relacionado
- [[04 Requerimientos Funcionales]] · [[06 Arquitectura (AWS)]] · [[09 Planificación y Roadmap]]
