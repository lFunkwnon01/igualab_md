# 04 · Comparación: RAG simple vs RAG + MCP (decisión de FASE 1)

> **Numeración alineada al A&D v6 (14/09)**: los códigos RN/RF/RNF de este documento siguen la numeración del Análisis y Diseño (fuente única).

> Conclusión previa: **FASE 1 usa solo RAG simple (sin MCP/function calling)** — corrección al acta-arquitectura anterior (mi error al proponerlo). El diagrama manual de la arquitectura de solución (IGUALAB · "RAG + Generación de Reportes | Modelos Gratuitos") es la versión válida. Este documento justifica la decisión y guarda la comparación para re-evaluarla en el futuro.

## 1. Los dos enfoques en una línea

| Enfoque | Cómo responde el asistente | ¿Qué se desarrolla extra? |
|---|---|---|
| **RAG simple** (elegido) | embed de la pregunta → búsqueda pgvector (k=4) → armar prompt con los chunks → el LLM redacta la respuesta con citas | **Nada extra** — un solo endpoint `/rag/chat` |
| **RAG + MCP** (descartado por ahora) | Lo mismo, pero además el backend expone **tools** (`buscar_chunks`, `listar_brechas`, …) y el LLM **decide** cuándo invocarlas (bucle agéntico) | Servidor MCP + esquemas de tool + bucle agéntico + manejo de errores de invocación |

## 2. Comparación detallada

| Criterio | RAG simple | RAG + MCP | Peso en nuestra decisión |
|---|---|---|---|
| **Esfuerzo de desarrollo** | 1 componente (`rag_chat`) | + servidor MCP, definición de schemas de tools, bucle de decisiones, validación de argumentos | Fase 1 limitada en tiempo (Gantt del plan v1.2: demos 5/10–23/10); **decide: simple** |
| **Complejidad de pruebas** | Flujo determinista y reproducible → fácil probar en el cronograma §7 del plan | Caminos no deterministas (el LLM puede invocar 0…n herramientas por turno) → casos de prueba combinatorios | Comprobamos calidad 9/11: mucho más fácil con determinismo |
| **Consumo del free tier (RN-024/RNF-11)** | 1 llamada LLM por pregunta | 1 llamada por *paso* del agente (la misma pregunta puede consumir 3–6 llamadas) | Con 200 req/día el enfoque agéntico quema el cupo de las demos |
| **Latencia (RNF-07 ≤ 30 s)** | 1 búsqueda + 1 generación | N herramientas + N generaciones | Simple garantiza el 30 s con margen |
| **Risk / trazabilidad** | Respuestas = interpolación controlada del contexto + citas verificadas (RS-09) | El path agéntico agrega modos de fallo nuevos (tool inexistente, argumentos mal formados, loops) | Menos superficie de error en fase 1 |
| **Capacidad de responder** | Todo lo que está en chunks + lo que ya está en tablas (brechas/sanciones se consultan **vía endpoints REST del frontend**, no vía LLM) | Además, "acciones": el asistente podría *crear* el reporte desde el chat | En fase 1 **no se necesita** que el LLM actúe: CU007 se hace desde la UI con estados ya validados (RN-018) |
| **Costo de ciertos datos estructurados** | Ya resuelto: la UI consulta la BD directamente (REST) y la base persistence el análisis (RN-019) | Redundante con MCP: tool `listar_brechas_gri` duplica lo que ya hace un GET | La BD + REST + vistas ya cubren los datos estructurados |
| **Evolución a fase 2** | Compatible: si un día se requiere agente, el `LlmClient` ya abstrae el proveedor y se agrega la capa de tools sin reescribir el retrieval | — | Decisión reversible a bajo costo |

## 3. Por qué el RAG simple ES suficiente en FASE 1 (el detalle fino)

1. **La cadena del negocio es fija**: ingesta `.md` → chunks → análisis contra `catalogo_gri` → estados validados por humano → reporte por plantilla. Ningún paso de esa cadena pide que el *modelo tome decisiones* — cada paso es determinista (RN-017/019/027). Un agente aportaría flexibilidad que el diseño **no quiere** (p. ej., habría riesgo de que el agente "marque" estados; se violaría RN-018).
2. **Los datos estructurados viven en la BD**:
   - brechas por empresa → pantalla del chat + tabla del reporte (SQL, determ.),
   - sanciones → tabla `sanciones` (con cita obligatoria, RS-16),
   - resumen ejecutivo → se arma determinísticamente desde la tabla del análisis (conteos por estado y sanciones); **el reporte no invoca al LLM**.
   Si el usuario pide "lista todas las brechas de Minera Andina", la UI lo responde con un endpoint directo (GET) — no hace falta que el LLM "llame" a nada.
3. **Presupuesto zero-cost apretado**: 1 llamada por pregunta + embeddings por API dejan la mayor parte de los 200 req/día para las demos con Oscar (2 reuniones/semana). El agéntico triplicaría el consumo en el peor caso.
4. **UAT benigna**: las pruebas del cronograma (§7 plan) evalúan precisión de citas y de brechas — con RAG simple hay un único camino y el fallo es siempre localizado.

## 4. ¿Cuándo justificaría MCP (re-evaluación en fase 2)?

| Disparador | Qué habilitaría |
|---|---|
| El PO pide que el hable al asistente y **reserve/generar reporte desde el chat** | tool `crear_reporte` (con las confirmaciones que pone RN-018) |
| Consultas cruzadas frecuentes ("compara GRI 401 de las 3 empresas") | tool `comparar_brechas(empresas, codigos)` en vez de fetch múltiple en la UI |
| Asistente multi-turno proactivo (sugerir próxima acción al Administrador) | agent context planning |

Ninguno de esos disparadores está en el alcance del plan v1.2 (fase 1 = núcleo de valor; dashboards al fase 2 — acta 5 REQ-19).

## 5. Reconciliación con el diagrama manual (imagen del equipo)

El diagrama manual es **coherente con esta decisión** una vez retirado el bloque "MCP Server (tools)" que persiste de la versión anterior:

| Bloque del diagrama manual | Estado | Nota |
|---|---|---|
| UI React 18 + Vite (2 roles), Vercel + HTTPS | ✔ igual | idéntico a la doc |
| API FastAPI (RBAC RNF-05, pydantic, errores RN-023/025) | ✔ igual | |
| Servicios monolito modular (7 servicios) | ✔ igual | |
| Pipeline de ingesta síncrona (Guard→Parseo→Chunking→Embeddings→Persistencia pgvector HNSW) | ✔ igual | RN-009…RN-015 |
| ~~MCP Server (tools)~~ | ✘ **eliminar cuadro | Debe salir del diagrama; en su lugar la flecha va directo Pipeline→BD y LLM↔API es chat-completions |
| LLM OpenRouter free (GLM-5.2, respaldos) + Embeddings por API ( universidad) | ✔ igual | sin function calling |
| PostgreSQL 16 + pgvector (12 tablas) | ✔ igual | coincidente con doc 02 |
| Almacenamiento archivos (.md originals, respaldo auditoría) | ✔ igual | |
| Docker compose / Vercel / Seguridad / Observabilidad / Decisiones clave | ✔ igual | — |

**Único ajuste requerido al diagrama**: borrar el cuadro "MCP Server (tools)" y sus 4 tools; todas las flechas del pipeline y de la BD quedan igual, y el servicio `rag_chat` dialoga con el LLM en modo chat-completions (contexto + citas). Todo lo demás del diagrama es exactamente el diseño aprobado.
