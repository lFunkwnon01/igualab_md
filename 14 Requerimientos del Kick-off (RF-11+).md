	# 14 · Requerimientos del Kick-off (RF-11+)

RF derivados de la transcripción del kick-off (video 2026-08-25). Complementan los RF-01…10 del documento. Estado: *a confirmar en alcance* con Oscar Baldeón.

## Módulo: Inteligencia de Prospección (nuevo núcleo)
### RF-11 — Unificación de fuentes
Unificar en una base común los **reportes de sostenibilidad** (web de cada empresa, estándar GRI) y las **memorias anuales** (repositorio público de la Bolsa de Valores de Lima) para una "interpretación más sólida". Rol: interno/Administrador. Ver [[08 Ingesta de Datos]] y [[13 Visión del CEO y Caso de Uso (Kick-off)]].

### RF-12 — Detección de brechas GRI
El agente RAG debe identificar **códigos GRI sub-reportados / con poca sustancia** (ej. GRI 400 laboral/social) y señalarlos como oportunidad de prospección. Ej.: *"según empresa X del sector banca, ¿cuáles son sus métricas GRI más débiles?"*

### RF-13 — Análisis de sanciones
El agente debe extraer y cuantificar **sanciones económicas** desde las memorias anuales (minist. de trabajo, consulta previa, corrupción, etc.) y señalar los **puntos débiles de reputación** por empresa. Ej.: *"principales puntos débiles por sanciones económicas en la última memoria anual de la minera X"*.

## Módulo: Acceso y Canales
### RF-14 — Rol público/externo de solo lectura
Ciudadano/profesional accede unificado a reportes y memorias **sin prospectar**. Amplía al Usuario Operativo. Ver [[03 Roles y Control de Accesos]].

### RF-15 — Multilingüe (transversal)
Soporte de **español** (obligatorio), **lenguas originarias** (quechua/aimara) e **inglés**. Aplica a todo el uso (chat, UI). Relacionado con accesibilidad del onepager.

### RF-16 — Autonomía de actualización
Mecanismo de **recarga/actualización automática** (web scraping o búsqueda en web) porque los documentos son anuales y la base se desfasa. Reto principal señalado por el CEO.

### RF-17 — Sincronización con LinkedIn (exploratorio)
Para el rol analista comercial, encontrar contactos (gerente de sostenibilidad/financiero) vía LinkedIn. Sujeto a privacidad/TOS.

### RF-18 — Alineación concursos (Kunan / Democracia Digital)
El diseño debe responder a los criterios de evaluación de **Premio Kunan** y **Democracia Digital** desde el inicio. Oscar compartirá las bases.

### RF-19 — Canal flexible + agenda
Plataforma web y/o app externa (WhatsApp/Telegram); agenda de citas sincronizada con `consultas@igualab.org` (estilo Google Meet). Complementa [[04 Requerimientos Funcionales#RF-10 — Chatbot de Citas Fase 2|RF-10]].

## 📊 Resumen RF-11+
| ID | Módulo | Rol | Fase |
|---|---|---|---|
| RF-11 | Prospección | Interno | MVP |
| RF-12 | Prospección | Interno | MVP |
| RF-13 | Prospección | Interno | MVP |
| RF-14 | Acceso | Público | MVP |
| RF-15 | Transversal | Todos | MVP |
| RF-16 | Ingesta | Interno | MVP |
| RF-17 | Prospección | Interno | Exploratorio |
| RF-18 | Estratégico | Todos | MVP |
| RF-19 | Canales | Todos | MVP/F2 |

## 🔗 Relacionado
- [[13 Visión del CEO y Caso de Uso (Kick-off)]] · [[08 Ingesta de Datos]] · [[03 Roles y Control de Accesos]] · [[09 Planificación y Roadmap]]
