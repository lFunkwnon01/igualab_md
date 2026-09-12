# Propuesta Técnica y Económica: Chatbot Corporativo Multi-Empresa

Esta propuesta detalla la arquitectura, el flujo del sistema, el stack tecnológico y la estimación de costos para la implementación de un chatbot web capaz de analizar memorias integradas y reportes de **115 empresas** públicas, interpretando texto, tablas complejas y métricas de penalizaciones o denuncias.

---

## 🏗️ 1. Flujo del Sistema (Pipeline RAG Corporativo)

El sistema opera bajo una arquitectura **RAG (Generación Aumentada por Recuperación)** optimizada con filtros de metadatos para garantizar precisión absoluta. El flujo se divide en dos procesos independientes:

### Flujo A: Ingesta y Procesamiento de Reportes (Back-Office)
1. **Carga del PDF:** El administrador sube la memoria integrada (PDF) desde el panel web asignándole la empresa y el año correspondiente.
2. **Extracción Estructurada:** El backend envía el documento a procesamiento (LlamaParse o Marker), convirtiendo el texto y las tablas complejas en formato **Markdown**.
3. **Fragmentación (Chunking):** El backend divide el archivo Markdown en fragmentos semánticos (ej. bloques de 1,000 caracteres con 200 de solapamiento) para no perder el contexto de las tablas.
4. **Generación de Embeddings:** Cada fragmento se convierte en un vector matemático de alta dimensionalidad (ej. 1536 dimensiones) usando un modelo de embeddings.
5. **Indexación y Almacenamiento:** Los fragmentos, sus vectores y sus **etiquetas de metadatos** (`empresa_id`, `año`, `sector`, `página`) se guardan en la base de datos vectorial (Supabase).

### Flujo B: Consulta en el Chatbox (Experiencia de Usuario)
1. **Entrada de Consulta:** El usuario selecciona una empresa en la web y escribe una pregunta en el chatbox.
2. **Filtrado por Metadatos:** El backend intercepta la consulta y genera un filtro estricto en la base de datos: `WHERE empresa_id = 'XYZ'`.
3. **Búsqueda Semántica:** `pgvector` en Supabase compara el vector de la pregunta con los vectores almacenados *únicamente* de esa empresa, extrayendo los 3 o 5 fragmentos de texto/tablas más relevantes.
4. **Inyección de Contexto:** El backend construye un prompt estructurado: *"Responde la siguiente pregunta basándote estrictamente en este contexto adjunto..."*.
5. **Generación de Respuesta:** El LLM (Claude o GPT) procesa el contexto y la pregunta, redacta la respuesta final incluyendo citas de páginas o tablas, y el backend la envía al chatbox en tiempo real.

---

## ⚙️ 2. Stack Tecnológico Especificado

| Componente | Tecnología | Tipo de Licencia | Justificación Técnica |
| :--- | :--- | :--- | :--- |
| **Frontend / Web** | **Next.js (React) + TailwindCSS** | Open Source (MIT) | Interfaz corporativa moderna, de carga ultra rápida y diseño responsivo para el chat. |
| **Backend / API** | **FastAPI (Python)** | Open Source (MIT) | El estándar de la industria para IA. Maneja procesos asíncronos rápidos y se conecta nativamente con librerías de datos. |
| **Extracción (PDF)** | **LlamaParse (API)** o **Marker (Local)** | Híbrido / Open Source | Esencial para convertir tablas financieras y regulatorias de los PDFs en estructuras Markdown legibles por la IA. |
| **Orquestador IA** | **LangChain** o **LlamaIndex** | Open Source (MIT) | Automatiza la lógica de fragmentación, manejo de historial del chat y la inyección de metadatos hacia la base de datos. |
| **Base de Datos** | **Supabase (PostgreSQL + pgvector)** | Open Source (Apache 2.0) | Base de datos relacional y vectorial unificada. Maneja usuarios, metadatos y vectores en un mismo ecosistema. |
| **Modelo de IA** | **Claude 3.5 Sonnet (API)** o **Llama 3.1 70B (Local)** | Propietario / Open Source | Claude 3.5 Sonnet ofrece la mayor precisión del mercado analizando tablas extensas y cumplimiento legal (*compliance*). |

---

## 💰 3. Estimación de Costos y Presupuesto

Para una carga inicial estimada de **115 empresas** con reportes anuales de aproximadamente **150 páginas cada uno** (Total aproximado: **17,250 páginas a procesar**):

### Escenario A: Arquitectura Cloud Premium (Pago por Uso - Recomendada)
*Ideal para un inicio rápido, máxima precisión y sin costos de servidores costosos.*

* **Procesamiento de PDFs (LlamaParse):** 
  * Plan Gratuito cubre 10,000 páginas/mes en modo básico. 
  * Modo Avanzado/Agentic (tablas pesadas) cuesta \$0.003 por página excedente.
  * **Costo Ingesta Inicial:** **~\$51.00 USD (Pago único)**.
* **Base de Datos y Hosting (Supabase + Vercel):**
  * Plan Pro de Supabase (Maneja millones de vectores y datos web fácilmente): **\$25.00 USD / mes**.
  * Hosting Frontend en Vercel (Plan Pro): **\$20.00 USD / mes**.
* **Consultas de IA (API Anthropic Claude 3.5 Sonnet):**
  * Calculando un uso activo de 2,000 consultas complejas al mes por parte de los usuarios corporativos.
  * **Costo mensual estimado:** **~\$60.00 USD / mes**.

> **Presupuesto Escenario A:** **~\$51.00 USD inicial** + **~\$105.00 USD mensuales** de mantenimiento cloud.

### Escenario B: Arquitectura 100% Open Source (Servidor Local)
*Ideal si la empresa exige independencia total de APIs de terceros y software libre.*

* **Procesamiento de PDFs (Marker - Open Source):** **\$0.00** (Ejecutado localmente en tu servidor).
* **Base de Datos (Supabase Open Source / Docker en VPS):** **\$0.00** (Costo de software).
* **Servidor VPS con GPU Dedicada (AWS / RunPod / Lambda Labs):**
  * Para ejecutar un modelo local potente como *Llama 3.1 70B* o *Qwen 2.5 72B* a velocidad comercial, requieres mínimo una GPU **NVIDIA A100 (80GB)** o dos **NVIDIA A10G**.
  * El alquiler de esta infraestructura 24/7 en la nube promedia: **~\$1,200.00 a \$2,500.00 USD / mes**.

> **Presupuesto Escenario B:** **\$0.00 inicial** + **~\$1,500.00+ USD mensuales** en infraestructura de servidores GPU.

---

## 📝 4. Recomendación del Desarrollador Backend

Para garantizar la viabilidad financiera del proyecto, la estrategia más inteligente es **desarrollar con el Stack del Escenario A (Cloud/API)**. El backend (FastAPI + LangChain + Supabase) quedará estructurado de tal forma que, si en el futuro la empresa decide migrar a un entorno 100% Open Source local (Escenario B), **solo tendrás que cambiar la URL de la API por la de tu servidor local con Ollama**, sin necesidad de reprogramar la lógica del chatbox ni la interfaz web.
