# 📌 Igualab — Vault de Proyecto

> **Vault de planificación del proyecto Igualab**
> Estado: 🟡 Kick-off inicial realizado · En fase de análisis y planificación detallada
> Fuentes: `Requerimientos-Igualab.pdf` · `Onepager Igualab.pdf`
> Responsable del proyecto (cliente): Oscar Baldeón — Fundador (oscarbaldeon@igualab.org)

---

## 🧭 Mapa del Vault (MOC)

Este vault organiza el análisis y la planificación del proyecto. Sigue el orden numerado para leerlo de forma progresiva.

### 1. Fundamentos
- [[01 Contexto del Proyecto]] — qué es Igualab, el problema y los dos alcances detectados
- [[02 Glosario]] — definición fija de términos (memorias, métricas, bolsa, IA)
- [[03 Roles y Control de Accesos]] — RBAC de 3 roles y matriz de permisos

### 2. Requerimientos
- [[04 Requerimientos Funcionales]] — RF-01 … RF-10
- [[05 Requerimientos No Funcionales]] — RNF-01 … RNF-04

### 3. Solución técnica
- [[06 Arquitectura (AWS)]] — componentes y stack propuesto
- [[15 Arquitectura de Solución]] — visión de solución, componentes y base de datos (relacional vs no relacional según presupuesto)
- [[16 Diagramas de Secuencia]] — flujos en Mermaid (ingesta, RAG, reporte PDF, rol público)
- [[17 Diagrama de Casos de Uso]] — actores y casos de uso (Mermaid) + mapeo a RF
- [[07 Flujos por Rol]] — caminos de Superadmin, Administrador y Usuario
- [[08 Ingesta de Datos]] — pipeline S3 → Bedrock → OpenSearch → Aurora/DynamoDB

### 4. Planificación
- [[09 Planificación y Roadmap]] — fases, MVP, desglose de tareas y hitos
- [[10 Pendientes y Supuestos]] — decisiones abiertas y riesgos
- [[11 Stakeholders y Contactos]] — cliente y equipo
- [[12 Análisis y Recomendaciones]] — reconciliación de documentos y riesgos
- [[13 Visión del CEO y Caso de Uso (Kick-off)]] — análisis del video kick-off (fuentes reales, GRI, sanciones, roles)
- [[14 Requerimientos del Kick-off (RF-11+)]] — nuevos RF del kick-off (unificación, brechas GRI, rol público, i18n, autonomía, LinkedIn, concursos)

### 5. Recursos
- [[Recursos y Adjuntos]] — enlaces a los PDF fuente

---

## 🗂️ Resumen ejecutivo

Igualab necesita una **plataforma de inteligencia de sostenibilidad y prospección** con control de accesos por roles, un asistente de IA (RAG + métricas), generación de reportes PDF, dashboards de la Bolsa de Valores y auditoría. El onboarding del cliente, sin embargo, describe inicialmente un **chatbot inclusivo público** para agendar citas (accesible para personas con discapacidad). 

**Conclusión del análisis:** ambos documentos describen alcances distintos que conviven. El chatbot inclusivo es el **RF-10 / Fase 2** de los requerimientos y el MVP se centra en la plataforma interna. Ver [[12 Análisis y Recomendaciones]].

**Nuevo (post kick-off, transcrito):** el CEO confirma el **pivot a consultoría** (modelo retribuido) centrado en **prospección comercial**. El agente RAG unifica **reportes de sostenibilidad (estándar GRI)** y **memorias anuales de la Bolsa de Valores de Lima** (estas SÍ son la fuente real y contienen sanciones) para detectar **brechas GRI y sanciones**, generar reportes PDF y acercarse a empresas como aliado estratégico. Hay además un **rol público** de solo lectura, soporte **multilingüe** (ES/lenguas originarias/EN), necesidad de **autonomía por web scraping** y meta de postular a **Premio Kunan / Democracia Digital**. Ver [[13 Visión del CEO y Caso de Uso (Kick-off)]] y [[14 Requerimientos del Kick-off (RF-11+)]].

---

## ✅ Próximos pasos inmediatos
1. **🔴 Preparar mockup de requerimientos + solución para el viernes 28 (10:00)** — compromiso de kick-off ([[09 Planificación y Roadmap]]).
2. Cerrar alcance: rol interno vs rol público; MVP de prospección ([[13 Visión del CEO y Caso de Uso (Kick-off)]]).
3. Obtener bases de Premio Kunan y Democracia Digital para alinear diseño ([[14 Requerimientos del Kick-off (RF-11+)|RF-18]]).
4. Elegir modelo de IA (ES + lenguas originarias + EN) y política de expiración de sesión.

> Última actualización: Kick-off · 2026-08-25
