# 🧩 Granularización de la Estructura del Proyecto — cómo partir el código por procesos

> **Propósito:** tener un mapa de **dónde va cada cosa** y **cómo se granulariza** el código, organizado por **proceso** (cada proceso = una carpeta) y dentro por **responsabilidad**. Así, al tocar algo, se toca un lugar concreto y no se rompe lo demás (radio de explosión pequeño).
> **Regla de Sonar:** archivos **> 1000 líneas** se marcan como defecto. Hoy `documento_service.py` (1370) y `deteccion_sanciones.py` (1134) lo superan → se parten.
> **Estado:** 🟡 **propuesta** (el código actual tiene la estructura `core/ + modules/` pero con estos 2 archivos aún sin partir).

---

## 1 · Principio de granularización

Se parte en **tres niveles**, de fuera hacia dentro:

| Nivel | Qué agrupa | Ejemplo | Nombre |
|---|---|---|---|
| **1. Proceso** (feature) | Un caso de uso funcional completo (un módulo del proyecto) | Ingesta de documentos | `modules/ingesta/` |
| **2. Responsabilidad** (capa) | Una parte del proceso con un rol claro | orquestar vs. reglas puras | `application/`, `domain/`, `infrastructure/`, `api/` |
| **3. Sub-proceso** (subcarpeta) | Solo cuando la carpeta crece mucho (>~500 líneas / +6 archivos) | detectar contenido | `domain/deteccion/` |

**Criterio de corte:** *una carpeta = una razón para cambiar*. Si una carpeta hace dos cosas distintas, se parte.

---

## 2 · Convención de nombres (nombres y subnombres)

| Elemento | Cómo se nombra | Ejemplo |
|---|---|---|
| Proceso | sustantivo singular, minúsculas | `ingesta`, `analisis_gri`, `asistente` |
| Capa | `api`, `application`, `domain`, `infrastructure` (fijos) | `modules/ingesta/domain/` |
| Sub-proceso | sustantivo que describe el grupo | `deteccion/`, `parsing/`, `ports/`, `storage/` |
| Archivo | un verbo/sustantivo = una responsabilidad | `reserva.py`, `compensacion.py`, `montos.py` |
| Contrato (puerto) | sustantivo de lo que necesita | `domain/ports/almacenamiento.py` |
| Adaptador | el proveedor concreto | `infrastructure/storage/s3.py` |

**Las 4 capas de cada proceso (siempre las mismas):**
- `api/` → entrada HTTP (`router.py` + `schemas.py`).
- `application/` → casos de uso / orquestación (el "cómo se hace el proceso").
- `domain/` → reglas puras, sin BD/HTTP/red (el "qué es correcto").
- `infrastructure/` → adaptadores al exterior (BD, S3, OCI, LLM).

---

## 3 · Árbol objetivo del BACKEND (toda la estructura)

```
app/
├── main.py                          # compone routers + lifespan (arranque)
│
├── core/                            # ⚙️ INFRAESTRUCTURA TRANSVERSAL (no conoce procesos)
│   ├── config.py                    #   variables de entorno (Settings)
│   ├── database.py                  #   engine transaccional + Base (ORM) + get_db
│   ├── database_vectorial.py        #   engine de la BD vectorial (pgvector)
│   ├── security.py                  #   JWT + bcrypt (firmar/verificar, hash de contraseñas)
│   ├── dependencies.py              #   get_db, usuario actual, roles (RBAC: SuperAdmin/Administrador)
│   ├── errors.py                    #   excepciones (AppException…) + codigo_seguro
│   ├── exception_handlers.py        #   traducción de errores → respuestas HTTP
│   ├── logging.py                   #   logging_config + request_id (trazabilidad)
│   └── email.py                     #   envío de correo (recuperación)
│
├── models/                          # 🗄️ ORM COMPARTIDO (entidades + FK entre procesos)
│   ├── usuarios.py                  #   Usuario, Sesion, TokenRecuperacion
│   ├── empresas.py                  #   Empresa
│   ├── auditoria.py                 #   RegistroAuditoria
│   ├── documento_ingesta.py         #   Documento, OperacionIngesta
│   ├── documentos.py                #   TipoDocumento (enum)
│   ├── analisis_gri.py              #   AnalisisGri* (4 tablas)
│   └── reportes.py                  #   ReporteProspeccion
│
├── schemas.py                       # 📄 Pydantic compartido (auth/usuarios/empresas)
│
├── migraciones/                     # 🧱 motor de migraciones + SQL versionado
│   ├── motor.py  catalogo.py
│   ├── transaccional/*.sql          #   0001..0004
│   └── vectorial/*.sql              #   v0001..v0002
│
└── modules/                         # 🧩 1 carpeta = 1 PROCESO (módulo funcional)
    │
    ├── auth/                        # PROCESO M1 · Identidad y sesión
    │   ├── api/router.py            #   /auth (login, logout, recuperar, restablecer, mi-contraseña)
    │   ├── schemas.py               #   LoginRequest/Response, etc.
    │   └── application/service.py   #   autenticar, sesiones, recuperación, bloqueo
    │
    ├── usuarios/                    # PROCESO M2 · Gestión de usuarios
    │   ├── api/router.py  schemas.py
    │   └── application/service.py   #   crear, listar, habilitar, transferir SuperAdmin
    │
    ├── empresas/                    # PROCESO M3 · Catálogo de empresas
    │   ├── api/router.py  schemas.py
    │   └── application/service.py   #   CRUD + activar/desactivar
    │
    ├── ingesta/                     # PROCESO M4 · Ingesta de documentos  ← EL GRANDE
    │   ├── api/router.py            #   /documentos (operaciones, ingesta, progreso…)
    │   ├── schemas.py               #   contratos HTTP de ingesta
    │   ├── application/             #   🎬 ORQUESTACIÓN (por etapas del pipeline)
    │   │   ├── reserva.py           #     ETAPA 1 · reservar documento + token de ejecución
    │   │   ├── procesamiento.py     #     ETAPAS 5/7 · máquina de estados, progreso, COMPLETADO/FALLIDO
    │   │   ├── compensacion.py      #     ante fallo · rollback y reintentos
    │   │   ├── publicacion.py       #     ETAPA 6 · publicar fragmentos en la BD vectorial
    │   │   ├── operaciones.py       #     ciclo de vida de la operación de carga
    │   │   ├── coordinador.py       #     encadena las 7 etapas
    │   │   ├── gestor.py            #     recursos HTTP + recuperación periódica
    │   │   └── analisis.py          #     ETAPA 4 · combina detectores y clasifica
    │   ├── domain/                  #   🧠 REGLAS PURAS (por sub-proceso)
    │   │   ├── ports/               #     contratos de lo que se necesita del exterior
    │   │   │   ├── almacenamiento.py
    │   │   │   └── embeddings.py
    │   │   ├── parsing/             #     entender Markdown
    │   │   │   └── markdown.py
    │   │   ├── fragmentacion.py     #     partir en fragmentos (ETAPA 3)
    │   │   ├── deteccion/           #     encontrar contenido (ETAPA 4)
    │   │   │   ├── gri.py           #       referencias GRI
    │   │   │   ├── sanciones/       #       sanciones (SE PARTE por ser grande — ver §4)
    │   │   │   └── catalogo.py      #       catálogo de estándares
    │   │   ├── texto.py             #     utilidades (recortar_cita)
    │   │   ├── reglas.py            #     reglas de admisión (50 MB, año…)
    │   │   ├── parametros.py        #     constantes y plazos
    │   │   ├── validacion.py        #     validación de entrada
    │   │   └── datos/catalogo_gri.json
    │   └── infrastructure/          #   🔌 ADAPTADORES (I/O externo)
    │       ├── storage/s3.py        #     MinIO/S3 (ETAPA 2 · almacenar original)
    │       ├── embeddings/oci.py    #     OCI (vectorizar)
    │       └── vector_store/pgvector.py  #  búsqueda de fragmentos (RAG)
    │
    ├── analisis_gri/                # PROCESO M5 · Análisis y validación GRI
    │   ├── api/router.py  schemas.py
    │   ├── application/servicio.py  #   consultar, asignar estado, historial, validar
    │   ├── application/arranque.py  #   prepara el esquema al arrancar
    │   └── domain/calculo.py        #   cálculo puro (filas, puntaje, pendientes)
    │
    ├── asistente/                   # PROCESO M6 · Asistente IA (RAG)
    │   ├── api/router.py  schemas.py
    │   ├── application/service.py   #   embed → buscar → filtrar → prompt → LLM → citas
    │   ├── domain/{prompt,citas}.py
    │   └── infrastructure/llm.py    #   cliente DeepSeek
    │
    ├── reportes/                    # PROCESO M7 · Reportes de prospección (PDF)
    │   ├── api/router.py  schemas.py
    │   ├── application/service.py   #   generar / listar / descargar
    │   ├── domain/plantilla.py      #   rellena la plantilla LaTeX
    │   ├── infrastructure/pdf.py    #   compila con tectonic
    │   └── plantillas/reporte_prospeccion.tex
    │
    └── auditoria/                   # PROCESO M8 · Auditoría (eventos)
        └── service.py               #   registrar_evento (lo usa todo)
```

---

## 4 · Cómo partir los archivos GRANDES

### 4.1 `documento_service.py` (1370 líneas · 49 funciones) → **5 archivos**

Hoy mezcla 5 responsabilidades. Se separa **por etapa del pipeline**:

| Archivo nuevo | Qué contiene | Funciones que se mueven |
|---|---|---|
| `application/reserva.py` | reservar documento, sha256, token de ejecución, vigencia | `reservar_*`, token/vigencia |
| `application/procesamiento.py` | máquina de estados, progreso, COMPLETADO/FALLIDO | `marcar_*`, `progreso`, estados |
| `application/compensacion.py` | rollback/reintentos ante fallo | `compensar_*`, `_fallar_y_compensar` |
| `application/publicacion.py` | publicación vectorial de fragmentos | `publicar_fragmentos`, vector_* |
| `application/consultas.py` | lecturas: `documentos_recuperables`, listar, detalle | `documentos_recuperables`, `_consultas` |

> Cada archivo queda con ~6-10 funciones relacionadas. El "quién orquesta" sigue en `coordinador.py`.

### 4.2 `deteccion_sanciones.py` (1134 líneas · 51 funciones) → **paquete `deteccion/sanciones/`**

Hoy es **una clase `_Analizador` gigante**. Se parte **por sub-proceso**:

```
domain/deteccion/sanciones/
├── __init__.py        # fachada: analizar(texto) → resultado
├── modelos.py         # dataclasses (_Borrador, hallazgos)
├── tokenizacion.py    # segmentación / unidades (filas, oraciones)
├── tablas.py          # detección dentro de filas de tabla
├── oraciones.py       # detección en prosa
├── montos.py          # extracción de montos y monedas
└── entidades.py       # entidades / autoridades emisoras
```

> `deteccion/gri.py` (659 líneas) se queda como está (por debajo del umbral); solo se refactoriza si crece.

---

## 5 · Frontend (mismo principio)

```
src/
├── main.tsx  App.tsx                # composición (router + providers)
├── core/                            # ⚙️ compartido
│   ├── api/client.ts                #   fetch + ApiError + eventos
│   ├── auth/                        #   AuthContext, ProtectedRoute
│   ├── lib/                         #   dominio, format, token, validacion, password
│   └── components/ui/               #   Badge, Modal, Spinner, KpiCard, Layout…
└── features/                        # 🧩 1 carpeta = 1 PROCESO
    ├── auth/  usuarios/  empresas/  ingesta/  analisis-gri/
    ├── asistente/  reportes/  auditoria/  descargas/   (hoy mock)
    └── cada una: { api.ts, pages/, components/, types.ts, hooks/ }
```

---

## 6 · Tests y scripts (espejan la estructura)

```
tests/
├── modules/<proceso>/test_*.py      # espeja app/modules/<proceso>/
├── core/test_*.py
└── ...

scripts/
├── crear_tablas.py  crear_superadmin_inicial.py
├── inspeccionar_bd.py               # herramienta: ver tablas (solo-lectura)
└── ...
```

---

## 7 · Tabla de mapeo actual → destino (archivo por archivo)

| Actual | Destino | Proceso/Responsabilidad |
|---|---|---|
| `core/*` | igual | infraestructura |
| `models/*` | igual | ORM compartido |
| `modules/ingesta/application/documento_service.py` | → **5**: `reserva/procesamiento/compensacion/publicacion/consultas` | ingesta · application |
| `modules/ingesta/domain/deteccion_sanciones.py` | → **paquete** `deteccion/sanciones/*` | ingesta · domain |
| `modules/ingesta/domain/{markdown,fragmentacion,validacion,reglas,parametros,texto,catalogo_gri,deteccion_gri}.py` | `domain/{parsing/markdown, fragmentacion, …, deteccion/{gri,catalogo}}` | ingesta · domain |
| `modules/ingesta/domain/{almacenamiento,embeddings}.py` | `domain/ports/` | ingesta · domain (contratos) |
| `modules/ingesta/infrastructure/{almacenamiento_s3,proveedor_oci,fragmentos_vectoriales}.py` | `infrastructure/{storage/s3, embeddings/oci, vector_store/pgvector}` | ingesta · infrastructure |
| resto (`auth`, `usuarios`, `empresas`, `analisis_gri`, `asistente`, `reportes`, `auditoria`) | igual (ya están bien) | sus procesos |

---

## 8 · Orden de trabajo sugerido (incremental, tests verdes)

1. Partir `documento_service.py` → 5 archivos (mayor impacto + quita alerta de Sonar).
2. Partir `deteccion_sanciones.py` → `deteccion/sanciones/`.
3. Reordenar `domain/` de ingesta en `ports/parsing/deteccion` (movimientos + imports).
4. Frontend: `features/` (opcional).
5. Tests: espejar `tests/modules/<proceso>/`.

> Cada paso = un PR con `pytest`/`vitest`/`tsc` verdes. **Sin cambios de comportamiento**, solo mover código.
