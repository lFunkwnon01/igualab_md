# 09 · Planificación y Roadmap

Plan de trabajo detallado derivado de los requerimientos y el onepager. El **MVP** cubre la plataforma interna; el **chatbot inclusivo** es Fase 2.

## 🎯 Alcance por fase

### FASE 1 — MVP (Plataforma interna de Sostenibilidad e IA)
Cubre RF-01 a RF-09 y RNF-01 a RNF-04.

### FASE 2 — Asistencia Externa (Chatbot inclusivo de citas)
Cubre RF-10 + criterios de accesibilidad del onepager.

---

## 🗓️ Roadmap por sprints (estimado)

> Estimaciones en semanas-hombre (SM). Ajustar tras kick-off técnico.

### Sprint 0 — Descubrimiento, diseño y MOCKUP (2 SM)
- [ ] **Entregar mockup de requerimientos + solución para el viernes 28 (10:00)** — reunión con Oscar.
- [ ] Cerrar alcance: rol interno vs rol público; MVP de prospección ([[13 Visión del CEO y Caso de Uso (Kick-off)]]).
- [ ] Confirmar fuentes: memorias anuales (Bolsa de Valores de Lima) + reportes de sostenibilidad (web empresas); web scraping ([[08 Ingesta de Datos]]).
- [ ] Elegir modelo Bedrock (soporte ES/lenguas originarias/EN) y política de expiración de sesión.
- [ ] Wireframes de roles interno/público (RNF-03) + canales (web/WhatsApp/Telegram).
- [ ] Obtener bases de **Premio Kunan** y **Democracia Digital** para alinear criterios ([[14 Requerimientos del Kick-off (RF-11+)|RF-18]]).

### Sprint 1 — Fundación de seguridad (RF-01, RF-02, RF-03, RF-04)
- [ ] Cognito + API Gateway (auth y validación de rol).
- [ ] `λ Usuarios` + Aurora: alta/baja y asignación de roles (Superadmin).
- [ ] Hasheo de credenciales (RNF-01).
- [ ] Matriz de permisos aplicada en backend.

### Sprint 2 — Ingesta y almacenamiento (RF-06)
- [ ] S3 para memorias + trigger a Bedrock → OpenSearch.
- [ ] DynamoDB/Aurora para métricas y bolsa.
- [ ] UI de carga para el Administrador.

### Sprint 3 — Asistente de IA híbrido (RF-05)
- [ ] `λ IA chat` combinando RAG (OpenSearch) + métricas.
- [ ] Citado de fuentes en respuestas.
- [ ] Pruebas de latencia < 5 s (RNF-02).

### Sprint 4 — Reportes y Bolsa (RF-07, RF-08)
- [ ] `λ Reportes` → generación/descarga PDF.
- [ ] `λ Bolsa` → dashboards y tablas (solo lectura para Usuario).

### Sprint 5 — Auditoría y hardening (RF-09, RNF-04)
- [ ] Registro de eventos sensibles.
- [ ] Vista de auditoría para Superadmin.
- [ ] Expiración de sesión y pruebas de seguridad.

### Sprint 6 — Fase 2: Chatbot inclusivo (RF-10) — opcional/post-MVP
- [ ] Investigar criterios de accesibilidad (lectores de pantalla, lenguaje claro, texto/voz).
- [ ] Mapear flujo actual de atención y agendamiento de citas.
- [ ] Prototipar flujo conversacional + integración de citas.

---

## 📦 Desglose de épicas → tareas

| Épica | Tareas clave | RF |
|---|---|---|
| Autenticación y RBAC | Cognito, API GW, λ Usuarios, Aurora, hash | RF-01,02,03,04 |
| Ingesta | S3, Bedrock, OpenSearch, DynamoDB, UI carga | RF-06 |
| Asistente IA | λ IA, RAG, métricas, citado | RF-05 |
| Reportes | λ Reportes, plantilla PDF | RF-07 |
| Bolsa | λ Bolsa, dashboards, tablas | RF-08 |
| Auditoría | Tabla auditoría, vista Superadmin | RF-09 |
| Chatbot (F2) | Accesibilidad, mapeo, prototipo, citas | RF-10 |
| Unificación + GRI + sanciones | Ingesta memorias/reportes, RAG gap-detection, análisis sanciones | RF-11,12,13 |
| Rol público + i18n | Lectura ciudadana, ES/lenguas originarias/EN | RF-14,15 |
| Autonomía | Web scraping recarga anual | RF-16 |
| LinkedIn + canales + concursos | Contactos, WhatsApp/Telegram, Kunan/Democracia Digital | RF-17,18,19 |

---

## 🚦 Hitos (milestones)
0. **M0 — Mockup de requerimientos + solución** (viernes 28, 10:00) ← compromiso de kick-off
1. **M1 — Login + roles funcionando** (fin Sprint 1)
2. **M2 — Datos ingestados y buscables** (fin Sprint 2)
3. **M3 — Chat de IA responde con fuentes** (fin Sprint 3)
4. **M4 — PDF + dashboards + rol público** (fin Sprint 4)
5. **M5 — Auditoría + seguridad cerrrada** (fin Sprint 5)
6. **M6 — Prototipo chatbot inclusivo + i18n + LinkedIn** (fin Sprint 6/Fase 2)

---

## ⚠️ Dependencias y riesgos tempranos
- Definición de fuente de bolsa bloquea RF-08 completo.
- Elección de modelo Bedrock afecta costo y latencia (RNF-02).
- Accesibilidad del onepager debe incluirse desde diseño si Fase 2 se adelanta.

## 🔗 Relacionado
- [[10 Pendientes y Supuestos]] · [[12 Análisis y Recomendaciones]] · [[04 Requerimientos Funcionales]]
