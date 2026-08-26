# 08 · Ingesta de Datos

Cuando el **Administrador** sube una memoria, esta se guarda en **S3**; eso dispara un proceso que usa **Bedrock** para convertir el texto en vectores que se guardan en **OpenSearch** (la IA busca dentro de los documentos). Los datos numéricos van a **DynamoDB**. Cuando el Administrador pregunta en el chat, la IA **combina las dos fuentes: documentos + métricas**.

## 🔄 Pipeline de ingesta
```
S3 → Bedrock → OpenSearch → Aurora / DynamoDB
(documentos/   genera      búsqueda     métricas
 memorias)     vectores     RAG
```

## 📥 Tipos de ingesta (Administrador)
| Tipo | Origen | Destino | RF |
|---|---|---|---|
| **Memorias anuales** | Repositorio **público de la Bolsa de Valores de Lima** (PDF) — web scraping o carga manual | S3 → Bedrock → OpenSearch | [[14 Requerimientos del Kick-off (RF-11+)\|RF-11/RF-16]] |
| **Reportes de sostenibilidad** | Web de cada empresa (PDF) — web scraping o carga manual | S3 → Bedrock → OpenSearch | [[14 Requerimientos del Kick-off (RF-11+)\|RF-11]] |
| **Datos tabulares / métricas GRI** | Extraídos del análisis de los PDF (códigos GRI, montos de sanción) | DynamoDB / Aurora | [[14 Requerimientos del Kick-off (RF-11+)\|RF-12/RF-13]] |

## 🤖 Consulta híbrida (RF-05)
El asistente de IA combina:
- **RAG** sobre OpenSearch (memorias) — cita la fuente.
- **Métricas** sobre DynamoDB/Aurora (datos tabulares).

## 🚩 Pendientes de diseño
- **Web scraping** de la Bolsa de Valores de Lima y de las webs corporativas (autonomía anual, ver [[14 Requerimientos del Kick-off (RF-11+)\|RF-16]]).
- Modelo de IA en Bedrock (por elegir; debe soportar ES + lenguas originarias + EN).
- Ver [[10 Pendientes y Supuestos]].

## 🔗 Relacionado
- [[06 Arquitectura (AWS)]] · [[04 Requerimientos Funcionales#RF-05 — Asistente IA Híbrido solo Administrador|RF-05]] · [[04 Requerimientos Funcionales#RF-06 — Ingesta de datos|RF-06]]
