# 17 · Diagrama de Casos de Uso

Diagrama de casos de uso de la plataforma Igualab (Mermaid, renderizable en Obsidian). Complementa [[03 Roles y Control de Accesos]], [[04 Requerimientos Funcionales]] y [[16 Diagramas de Secuencia]].

## 👥 Actores
- **Superadmin (Gestión)**
- **Administrador (Análisis / Prospector)**
- **Usuario Operativo (Lectura interna)**
- **Usuario Público (Externo — lectura unificada)**

## 🧩 Diagrama
> Representado como `flowchart` porque tu versión de Mermaid en Obsidian no soporta `useCaseDiagram`. Cada actor (subgrafo) se enlaza a sus casos de uso.

```mermaid
flowchart LR
    subgraph SA["🟡 Superadmin (Gestión)"]
        sa1[Gestionar usuarios y roles]
        sa2[Configurar el sistema]
        sa3[Ver auditoría de accesos]
    end
    subgraph AD["🟢 Administrador (Análisis)"]
        ad1[Ingestar memorias y reportes GRI]
        ad2[Consultar asistente IA / RAG]
        ad3[Generar reportes PDF]
        ad4[Ver dashboards de la Bolsa]
        ad5[Buscar contactos vía LinkedIn]
    end
    subgraph UO["🔵 Usuario Operativo (Lectura)"]
        uo1[Ver dashboards de la Bolsa]
        uo2[Descargar reportes PDF]
    end
    subgraph UP["👥 Usuario Público (Externo)"]
        up1[Consultar documentos unificados - lectura]
        up2[Agendar citas - chatbot inclusivo - Fase 2]
    end
    SA --- sa1 & sa2 & sa3
    AD --- ad1 & ad2 & ad3 & ad4 & ad5
    UO --- uo1 & uo2
    UP --- up1 & up2
```

## 🗂️ Mapeo Actor → Caso de uso → RF
| Actor | Caso de uso | RF |
|---|---|---|
| Superadmin | Gestionar usuarios y roles | RF-02 |
| Superadmin | Configurar el sistema | RF-01 / RNF-01 |
| Superadmin | Ver auditoría de accesos | RF-09 |
| Administrador | Ingestar memorias y reportes GRI | RF-06 / RF-11 |
| Administrador | Consultar asistente IA / RAG | RF-05 / RF-12 / RF-13 |
| Administrador | Generar reportes PDF | RF-07 |
| Administrador | Ver dashboards de la Bolsa | RF-08 |
| Administrador | Buscar contactos vía LinkedIn | RF-17 (exploratorio) |
| Usuario Operativo | Ver dashboards de la Bolsa | RF-08 |
| Usuario Operativo | Descargar reportes PDF | RF-07 |
| Usuario Público | Consultar documentos unificados (lectura) | RF-14 |
| Usuario Público | Agendar citas (chatbot inclusivo) | RF-10 (Fase 2) |

## 🔗 Relacionado
- [[03 Roles y Control de Accesos]] · [[04 Requerimientos Funcionales]] · [[16 Diagramas de Secuencia]] · [[15 Arquitectura de Solución]]
