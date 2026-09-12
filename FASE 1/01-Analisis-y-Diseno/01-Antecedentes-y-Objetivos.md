# 01 · Antecedentes, Objetivo y Alcance — FASE 1

> FASE 1 según **Plan de Proyecto v1.2** (línea base aprobada 11/09/2026, plan preliminar de reuniones §6, item 6: «Presentación final de Plan de proyecto y validación del cliente — 11/09/2026»).
> Alineado al **acto 5 (CS3081-005-2026)**: sin módulo Bolsa de Valores, sin LinkedIn, dashboards → fase 2, ingestión solo `.md`.
> Mock fidelizado de referencia: <https://igualab.vercel.app/>

## 1. ANTECEDENTES

Igualab es una organización peruana dedicada a la consultoría en Diversidad e Inclusión (DEI), sostenibilidad y Responsabilidad Social Empresarial (RSE), enfocada en promover entornos laborales inclusivos y prácticas ASG (Ambiental, Social y Gobernanza) en el sector empresarial peruano. Fundada en 2016, cuenta con certificaciones como Entidad Perceptora de Donaciones (EPD) y reconocimientos internacionales como el Corporate Live Wire Innovation & Excellence Awards.

En el contexto peruano, las empresas que cotizan en la Bolsa de Valores de Lima están obligadas a emitir memorias anuales financieras, mientras que los reportes de sostenibilidad son validados por auditores internacionales bajo estándares como el GRI (Global Reporting Initiative). Estos documentos contienen información crítica sobre **cumplimiento normativo, sanciones económicas, indicadores de gobernanza y métricas de desempeño ambiental y social** — y son la base del análisis de brechas del sistema (ver detalle en el documento «02-Antecedentes-de-Análisis-GRI.md»).

Actualmente, Igualab enfrenta un desafío operativo en su área comercial: opera de manera reactiva, recibiendo empresas de forma orgánica, sin herramientas que sistematicen el análisis de información pública para detectar oportunidades de acercamiento. Frente a ello, se plantea el desarrollo de una plataforma basada en inteligencia artificial (RAG) que permita procesar reportes de sostenibilidad y memorias anuales, identificar brechas en indicadores ASG/GRI y generar información procesada que facilite la toma de decisiones comerciales.

## 2. OBJETIVO GENERAL

Desarrollar una plataforma web de analítica de sostenibilidad que permita a Igualab procesar y consultar información pública de empresas (reportes de sostenibilidad y memorias anuales de la Bolsa de Valores de Lima), identificando brechas en indicadores ASG mediante un asistente de inteligencia artificial (RAG), para impulsar la prospección comercial de la organización de manera proactiva y fundamentada en datos.

### 2.1 Objetivos específicos de FASE 1 (derivados del plan v1.2)

1. Implementar la **ingesta de documentos** en formato `.md` con tablas con pipes (REQ-20 del acta 5), con validación de formato y tamaño.
2. Desarrollar el **asistente IA (RAG)** con citación obligatoria de fuentes de datos inestados.
3. Implementar la **detección y captura de brechas GRI y sanciones**, con estados validados por el humano (antes de generar el reporte).
4. Generar **reportes de prospección PDF** mediante plantilla con variables dinámicas desde la base de datos.
5. Establecer **RBAC de 2 roles** (Superadmin / Administrador) y el **registro de auditoría** de eventos sensibles.

## 3. ALCANCE DEL PROYECTO (FASE 1)

El proyecto comprende el diseño, desarrollo e implementación de una plataforma web que centralice la ingesta, indexación, consulta y explotación analítica de memorias anuales y reportes de sostenibilidad (GRI) de empresas que cotizan en la Bolsa de Valores de Lima, mediante una arquitectura cliente-servidor y un motor de inteligencia artificial basado en RAG (Retrieval-Augmented Generation), construido sobre un LLM gratuito con función de llamadas de herramientas (modelos famosos).

El sistema está orientado a optimizar las operaciones de **dos perfiles** (model cullet mock, acta 4 · REQ-10; 3 usuarios: 1 Superadmin + 2 Administradores):

- **Superadmin** (1 persona — gestión): crea usuarios, habilita/deshabilita, asigna roles, y es responsable de la **ingesta de documentos** `.md` (memorias anuales y reportes de sostenibilidad) al sistema, incluida la validación de su correcta indexación.
- **Administrador** (2 personas — explotación): realiza consultas al asistente de IA (RAG), **revisa y supervisa** las brechas GRI y sanciones detectadas (puede ajustar su estado crítico / ok con supervisión humana antes de generar), y genera **reportes de prospección comercial en PDF**.

El Superadmin concentra la administración de accesos y la carga de información fuente; el Administrador se enfoca exclusivamente en la explotación analítica y comercial de esa información.

### 3.1 FUERA DEL ALCANCE de FASE 1 (decidido en actas)

| Excluido de fase 1 | Referencia |
|---|---|
| Dashboards de visualización (KPIs ASG/ESG, índice ASG 0-100) | acta 5 · REQ-19 |
| Módulo de Bolsa de Valores (CU007, RF-018/019, RN-008) | acta 5 · REQ-16 |
| Búsqueda vía LinkedIn (mock CU010) | acta 5 · REQ-17 |
| Chatbot inclusivo & asistente vocal | fase 2 del plan |

Nota: los datos quedan estructurados para que en fase 2 un dashboard básico consuma **solo endpoints GET** sobre las tablas de agregación (ver Modelo de Datos en arquitectura de solución).

## 4. SECTORES EN ALCANCE (limitación acordada con el PO)

El análisis de brechas GRI / sanciones se limita a los sectores (**acta de análisis, coordinado con Oscar / PO**):

1. **Minería**
2. **Energía**
3. **Petróleo y Gas**

Las empresas de fuera de estos 3 sectores **no se analizan en fase 1** (queda para re-evaluar en fase 2 con el PO).
