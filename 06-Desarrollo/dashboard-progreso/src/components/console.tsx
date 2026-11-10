"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import openproject from "@/data/openproject.json";
import curated from "@/data/curated.json";
import testcases from "@/data/testcases.json";
import phases from "@/data/phases.json";
import requirements from "@/data/requirements.json";
import traceability from "@/data/traceability.json";
import { Card, Empty, PageHeader, Pill, Progress, Stat, statusTone, typeTone } from "./console-ui";
import { Icon, type IconName } from "./icons";

type WP = (typeof openproject.workPackages)[number];
type CP = (typeof testcases)[number];
type Req = (typeof requirements)[number];
type View =
  | "overview"
  | "tasks"
  | "sprints"
  | "modules"
  | "team"
  | "bugs"
  | "testcases"
  | "evidence"
  | "analysis"
  | "changes"
  | "slides"
  | "slidesguide"
  | "requirements"
  | "trace"
  | "timeline";

const NAV: { label: string; items: { view: View; label: string; icon: IconName }[] }[] = [
  {
    label: "General",
    items: [
      { view: "overview", label: "Resumen", icon: "grid" },
      { view: "slides", label: "Presentación", icon: "timeline" },
      { view: "tasks", label: "Tareas", icon: "list" },
      { view: "sprints", label: "Sprints", icon: "sprint" },
      { view: "modules", label: "Módulos", icon: "module" },
      { view: "team", label: "Equipo", icon: "team" },
    ],
  },
  {
    label: "Calidad",
    items: [
      { view: "bugs", label: "Bugs y ACT", icon: "bug" },
      { view: "testcases", label: "Casos de prueba", icon: "check" },
      { view: "evidence", label: "Evidencias", icon: "evidence" },
    ],
  },
  {
    label: "Análisis",
    items: [
      { view: "analysis", label: "Brechas A&D", icon: "analysis" },
      { view: "changes", label: "Cambios A&D", icon: "analysis" },
      { view: "requirements", label: "Requisitos", icon: "check" },
      { view: "trace", label: "Trazabilidad", icon: "analysis" },
      { view: "slidesguide", label: "Guía de slides", icon: "grid" },
      { view: "timeline", label: "Timeline", icon: "timeline" },
    ],
  },
];

const MODULE_BY_PARENT: Record<string, string> = {
  "Módulo · Autenticación y Gestión de Sesión": "M1",
  "Módulo · Gestión de Usuarios": "M2",
  "Módulo · Catálogo de Empresas": "M3",
  "Módulo · Ingesta de Documentos": "M4",
  "Módulo · Análisis y Validación de Brechas GRI": "M5",
  "Módulo · Asistente de IA (RAG)": "M6",
  "Módulo · Generación de Reportes de Prospección": "M7",
  "Módulo · Auditoría Funcional": "M8",
};

const BUG_MODULE: Record<number, string> = Object.fromEntries(
  curated.bugs.todos.map((b) => [b.id, b.modulo]),
);

const WP_MODULE: Record<string, string> = curated.clasificacion.moduloWp;
const ACT_EXTRA = new Set<number>(curated.clasificacion.actExtra);

function esAct(w: WP) {
  return (w.asunto ?? "").startsWith("ACT-") || ACT_EXTRA.has(w.id);
}

function esBug(w: WP) {
  return w.tipo === "Bug" && !esAct(w);
}

const FLOWS = [
  { id: "F1", flujo: "Ingesta real con MinIO + OCI + DeepSeek", modulo: "M4/M6", estado: "Pendiente" },
  { id: "F2", flujo: "Reporte PDF real desde análisis validado", modulo: "M7", estado: "Pendiente" },
  { id: "F3", flujo: "Asistente RAG con corpus real y citas", modulo: "M6", estado: "Parcial" },
  { id: "F4", flujo: "Recuperación de contraseña con Gmail real", modulo: "M1", estado: "Pendiente" },
  { id: "F5", flujo: "UAT del PO: empresa → ingesta → análisis → reporte", modulo: "M3–M7", estado: "Parcial" },
  { id: "F6", flujo: "Roles y permisos en la UI", modulo: "M1/M2", estado: "Pendiente" },
  { id: "F7", flujo: "Observar/anular una ingesta mal subida", modulo: "M4", estado: "Por definir" },
  { id: "F8", flujo: "Sector “Otros”", modulo: "M3/M5", estado: "Por definir" },
  { id: "F9", flujo: "Comparación análisis manual vs IA", modulo: "M5–M7", estado: "No iniciado" },
  { id: "F10", flujo: "Evaluación RAG con set dorado", modulo: "M6", estado: "Parcial" },
  { id: "F11", flujo: "Condición de carrera al cambiar estados GRI", modulo: "M5", estado: "Bug #664" },
  { id: "F12", flujo: "Citas con Markdown y duplicados", modulo: "M6", estado: "Bugs #659–#662" },
];

const EVIDENCE_FOLDERS = [
  { carpeta: "PDF v1.8", uso: "Capturas de CP01–CP61 incluidas en el documento", pendientes: 0 },
  { carpeta: "01-Pruebas-Manuales", uso: "Capturas adicionales o complementarias", pendientes: 0 },
  { carpeta: "02-API-Postman", uso: "Exports y capturas de Newman", pendientes: 0 },
  { carpeta: "03-UAT", uso: "Observaciones y evidencias del PO", pendientes: 1 },
  { carpeta: "04-Jenkins", uso: "Builds, stages, JUnit", pendientes: 0 },
  { carpeta: "05-OWASP-ZAP", uso: "Reportes ZAP", pendientes: 0 },
  { carpeta: "06-Demo", uso: "Capturas de demo y reportes", pendientes: 0 },
];

function moduleOf(w: WP) {
  return (
    MODULE_BY_PARENT[w.padre ?? ""] ??
    MODULE_BY_PARENT[w.asunto] ??
    WP_MODULE[String(w.id)] ??
    BUG_MODULE[w.id] ??
    "Transversal"
  );
}

function fecha(valor: string | null | undefined) {
  if (!valor) return "—";
  const d = new Date(`${valor}T12:00:00`);
  if (Number.isNaN(d.getTime())) return valor;
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", timeZone: "America/Lima" });
}

function fechaHora(valor: string | null | undefined) {
  if (!valor) return "—";
  const d = new Date(valor.length <= 10 ? `${valor}T12:00:00` : valor);
  if (Number.isNaN(d.getTime())) return valor;
  return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric", timeZone: "America/Lima" });
}

function corto(texto: string, n = 90) {
  return texto.length > n ? `${texto.slice(0, n)}…` : texto;
}

export function Console() {
  const [view, setView] = useState<View>("overview");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sprintFilter, setSprintFilter] = useState("all");
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [bugTab, setBugTab] = useState<"bugs" | "act">("bugs");
  const [cpModule, setCpModule] = useState("all");
  const [selected, setSelected] = useState<WP | null>(null);
  const [selectedCp, setSelectedCp] = useState<CP | null>(null);
  const [selectedReq, setSelectedReq] = useState<Req | null>(null);
  const [reqType, setReqType] = useState("all");
  const [reqStatus, setReqStatus] = useState("all");
  const [reqModule, setReqModule] = useState("all");
  const [reqSearch, setReqSearch] = useState("");

  const wps = openproject.workPackages;
  const bugs = useMemo(() => wps.filter(esBug), [wps]);
  const acts = useMemo(() => wps.filter(esAct), [wps]);
  const abiertos = useMemo(() => wps.filter((w) => w.estado !== "Closed"), [wps]);
  const porTestear = useMemo(() => wps.filter((w) => w.estado === "Developed" || w.estado === "In testing"), [wps]);
  const bugsAbiertos = bugs.filter((b) => b.estado !== "Closed");
  const actsAbiertas = acts.filter((a) => a.estado !== "Closed");
  const evidencias = testcases.filter((c) => c.estado === "Aprobado").length;

  const sprints = openproject.versiones ?? [];
  const assignees = useMemo(
    () => Array.from(new Set(wps.map((w) => w.responsable ?? "Sin asignar"))).sort(),
    [wps],
  );
  const sprintNames = useMemo(
    () => Array.from(new Set(wps.map((w) => w.sprint ?? "Sin sprint"))),
    [wps],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return wps.filter((w) => {
      if (q && !`${w.id} ${w.asunto} ${w.responsable ?? ""} ${w.padre ?? ""}`.toLowerCase().includes(q)) return false;
      if (statusFilter !== "all" && w.estado !== statusFilter) return false;
      if (typeFilter !== "all" && w.tipo !== typeFilter) return false;
      if (sprintFilter !== "all" && (w.sprint ?? "Sin sprint") !== sprintFilter) return false;
      if (assigneeFilter !== "all" && (w.responsable ?? "Sin asignar") !== assigneeFilter) return false;
      if (moduleFilter !== "all" && moduleOf(w) !== moduleFilter) return false;
      return true;
    });
  }, [wps, search, statusFilter, typeFilter, sprintFilter, assigneeFilter, moduleFilter]);

  const bugsFiltered = useMemo(() => {
    const base = bugTab === "bugs" ? bugs : acts;
    const q = search.trim().toLowerCase();
    return base.filter((w) => {
      if (q && !`${w.id} ${w.asunto} ${w.responsable ?? ""}`.toLowerCase().includes(q)) return false;
      if (statusFilter !== "all" && w.estado !== statusFilter) return false;
      if (moduleFilter !== "all" && moduleOf(w) !== moduleFilter) return false;
      return true;
    });
  }, [bugTab, bugs, acts, search, statusFilter, moduleFilter]);

  const cpsFiltered = useMemo(
    () => testcases.filter((c) => (cpModule === "all" ? true : c.modulo === cpModule)),
    [cpModule],
  );

  const reqFiltered = useMemo(() => {
    const q = reqSearch.trim().toLowerCase();
    return requirements.filter((r) => {
      if (reqType !== "all" && r.tipo !== reqType) return false;
      if (reqStatus !== "all" && r.estado !== reqStatus) return false;
      if (reqModule !== "all" && r.modulo !== reqModule) return false;
      if (q && !`${r.id} ${r.titulo} ${r.nota}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [reqType, reqStatus, reqModule, reqSearch]);

  const reqById = useMemo(() => new Map(requirements.map((r) => [r.id, r])), []);

  const team = useMemo(() => {
    const map = new Map<string, { nombre: string; abiertos: number; progress: number; developed: number; testing: number; bugs: number; act: number }>();
    for (const w of wps) {
      const nombre = w.responsable ?? "Sin asignar";
      const row = map.get(nombre) ?? { nombre, abiertos: 0, progress: 0, developed: 0, testing: 0, bugs: 0, act: 0 };
      if (w.estado !== "Closed") row.abiertos += 1;
      if (w.estado === "In progress") row.progress += 1;
      if (w.estado === "Developed") row.developed += 1;
      if (w.estado === "In testing") row.testing += 1;
      if (esBug(w) && w.estado !== "Closed") row.bugs += 1;
      if (esAct(w) && w.estado !== "Closed") row.act += 1;
      map.set(nombre, row);
    }
    return Array.from(map.values()).sort((a, b) => b.abiertos - a.abiertos);
  }, [wps]);

  const recientes = useMemo(
    () => [...wps].sort((a, b) => (b.actualizado ?? "").localeCompare(a.actualizado ?? "")).slice(0, 10),
    [wps],
  );

  const irATareas = (parcial: Partial<{ status: string; sprint: string; assignee: string; module: string }>) => {
    if (parcial.status !== undefined) setStatusFilter(parcial.status);
    if (parcial.sprint !== undefined) setSprintFilter(parcial.sprint);
    if (parcial.assignee !== undefined) setAssigneeFilter(parcial.assignee);
    if (parcial.module !== undefined) setModuleFilter(parcial.module);
    setView("tasks");
  };

  const goToSlide = (id: string) => {
    setView("slides");
    setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  };

  const activeLabel = NAV.flatMap((g) => g.items).find((i) => i.view === view)?.label ?? "Resumen";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 flex-col border-r border-slate-800 bg-slate-950 lg:flex print:hidden">
        <div className="flex h-14 items-center gap-2 border-b border-slate-800 px-4">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-emerald-500 text-xs font-bold text-slate-950">I</div>
          <div>
            <p className="text-sm font-semibold text-white">Igualab</p>
            <p className="text-[10px] uppercase tracking-[0.16em] text-slate-500">Control de proyecto</p>
          </div>
        </div>
        <nav className="flex-1 space-y-5 overflow-y-auto px-2 py-4">
          {NAV.map((group) => (
            <div key={group.label}>
              <p className="px-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">{group.label}</p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = view === item.view;
                  return (
                    <button
                      key={item.view}
                      onClick={() => setView(item.view)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] transition ${
                        active ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                      }`}
                    >
                      <Icon name={item.icon} className={`h-4 w-4 ${active ? "text-emerald-400" : ""}`} />
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-slate-800 px-4 py-3 text-[11px] text-slate-500">
          <p>OpenProject en vivo</p>
          <p className="mt-0.5 text-slate-400">{openproject.resumen.total} WPs · {openproject.resumen.cerrados} cerrados</p>
          <p className="mt-1">Sync: {new Date(openproject.sincronizadoEn).toLocaleString("es-PE", { timeZone: "America/Lima" })}</p>
        </div>
      </aside>

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur print:hidden">
          <div className="flex h-14 items-center justify-between gap-3 px-4 sm:px-6">
            <div className="flex min-w-0 items-center gap-2 text-sm">
              <span className="hidden text-slate-400 sm:inline">Igualab</span>
              <Icon name="chevron" className="hidden h-3.5 w-3.5 text-slate-300 sm:block" />
              <span className="truncate font-medium text-slate-800">{activeLabel}</span>
              <span className="ml-2 hidden rounded-md border border-slate-200 bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-500 sm:inline">
                {openproject.resumen.abiertos} abiertos / {openproject.resumen.total}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Icon name="search" className="pointer-events-none absolute left-2.5 top-2 h-4 w-4 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    if (view !== "tasks") setView("tasks");
                  }}
                  placeholder="Buscar tarea, ID, responsable…"
                  className="h-8 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-xs text-slate-700 outline-none focus:border-slate-300 focus:bg-white lg:w-72"
                />
              </div>
              <span className="hidden rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-500 md:inline">
                BCK {curated.meta.codigo.bck} · FE {curated.meta.codigo.fe}
              </span>
              <select
                value={view}
                onChange={(e) => setView(e.target.value as View)}
                className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-700 lg:hidden"
              >
                {NAV.flatMap((g) => g.items).map((i) => (
                  <option key={i.view} value={i.view}>{i.label}</option>
                ))}
              </select>
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6">
          {view === "overview" && (
            <Overview
              abiertos={abiertos.length}
              porTestear={porTestear.length}
              bugsAbiertos={bugsAbiertos.length}
              actsAbiertas={actsAbiertas.length}
              cps={testcases.length}
              evidencias={evidencias}
              onGo={irATareas}
              sprints={sprints}
              onSprint={(s) => irATareas({ sprint: s })}
              recientes={recientes}
              onSelect={setSelected}
            />
          )}
          {view === "tasks" && (
            <TasksView
              wps={filtered}
              total={wps.length}
              search={search}
              setSearch={setSearch}
              status={statusFilter}
              setStatus={setStatusFilter}
              type={typeFilter}
              setType={setTypeFilter}
              sprint={sprintFilter}
              setSprint={setSprintFilter}
              assignee={assigneeFilter}
              setAssignee={setAssigneeFilter}
              module={moduleFilter}
              setModule={setModuleFilter}
              assignees={assignees}
              sprints={sprintNames}
              onSelect={setSelected}
              onClear={() => {
                setSearch("");
                setStatusFilter("all");
                setTypeFilter("all");
                setSprintFilter("all");
                setAssigneeFilter("all");
                setModuleFilter("all");
              }}
            />
          )}
          {view === "sprints" && (
            <SprintsView
              sprints={sprints}
              onOpen={(s) => irATareas({ sprint: s })}
            />
          )}
          {view === "modules" && (
            <ModulesView
              modules={curated.modulos}
              onOpen={(m) => irATareas({ module: m })}
            />
          )}
          {view === "team" && (
            <TeamView team={team} onOpen={(n) => irATareas({ assignee: n })} />
          )}
          {view === "bugs" && (
            <BugsView
              tab={bugTab}
              setTab={setBugTab}
              rows={bugsFiltered}
              totalBugs={bugs.length}
              totalActs={acts.length}
              search={search}
              setSearch={setSearch}
              status={statusFilter}
              setStatus={setStatusFilter}
              module={moduleFilter}
              setModule={setModuleFilter}
              onSelect={setSelected}
            />
          )}
          {view === "testcases" && (
            <TestCasesView
              cps={cpsFiltered}
              total={testcases.length}
              module={cpModule}
              setModule={setCpModule}
              evidencias={evidencias}
              onSelect={setSelectedCp}
            />
          )}
          {view === "evidence" && (
            <EvidenceView cps={testcases} onOpenCp={setSelectedCp} />
          )}
          {view === "requirements" && (
            <RequirementsView
              rows={reqFiltered}
              total={requirements.length}
              type={reqType}
              setType={setReqType}
              status={reqStatus}
              setStatus={setReqStatus}
              module={reqModule}
              setModule={setReqModule}
              search={reqSearch}
              setSearch={setReqSearch}
              onSelect={setSelectedReq}
            />
          )}
          {view === "trace" && (
            <TraceView
              onSelectReq={setSelectedReq}
              onSelectIssue={setSelected}
              reqById={reqById}
            />
          )}
          {view === "analysis" && <AnalysisView gaps={curated.analysisGaps} flows={FLOWS} />}
          {view === "changes" && <ChangesView changes={curated["cambiosA&D"]} />}
          {view === "slidesguide" && <SlidesGuideView onGoSlide={goToSlide} />}
          {view === "slides" && <SlidesView />}
          {view === "timeline" && <TimelineView sprints={sprints} />}
        </main>
      </div>

      {selected && <TaskDrawer wp={selected} onClose={() => setSelected(null)} />}
      {selectedCp && <CpDrawer cp={selectedCp} onClose={() => setSelectedCp(null)} />}
      {selectedReq && <ReqDrawer req={selectedReq} onClose={() => setSelectedReq(null)} />}
    </div>
  );
}

function Overview({
  abiertos,
  porTestear,
  bugsAbiertos,
  actsAbiertas,
  cps,
  evidencias,
  onGo,
  sprints,
  onSprint,
  recientes,
  onSelect,
}: {
  abiertos: number;
  porTestear: number;
  bugsAbiertos: number;
  actsAbiertas: number;
  cps: number;
  evidencias: number;
  onGo: (p: Partial<{ status: string; sprint: string; assignee: string; module: string }>) => void;
  sprints: { id: number; nombre: string; inicio: string | null; fin: string | null; total: number; cerrados: number }[];
  onSprint: (s: string) => void;
  recientes: WP[];
  onSelect: (w: WP) => void;
}) {
  const queues = [
    { status: "Developed", label: "Developed · por testear", tone: "blue" as const },
    { status: "In testing", label: "In testing", tone: "violet" as const },
    { status: "In progress", label: "In progress", tone: "amber" as const },
    { status: "New", label: "New", tone: "slate" as const },
  ];
  const opPct = Math.round((openproject.resumen.cerrados / openproject.resumen.total) * 100);
  const sinSprint = openproject.workPackages.filter((w) => !w.sprint);
  const sinSprintClosed = sinSprint.filter((w) => w.estado === "Closed").length;
  const sinSprintPct = sinSprint.length ? Math.round((sinSprintClosed / sinSprint.length) * 100) : 0;
  const actsWps = openproject.workPackages.filter(esAct);
  const actsClosed = actsWps.filter((w) => w.estado === "Closed").length;
  const sinActTotal = openproject.resumen.total - actsWps.length;
  const sinActClosed = openproject.resumen.cerrados - actsClosed;
  const opPctSinAct = sinActTotal ? Math.round((sinActClosed / sinActTotal) * 100) : 0;
  const healthRows = [
    ...sprints.map((s) => {
      const [id, ...resto] = s.nombre.split(" · ");
      return {
        id,
        nombre: resto.join(" · ") || s.nombre,
        total: s.total,
        cerrados: s.cerrados,
        opPct: s.total ? Math.round((s.cerrados / s.total) * 100) : 0,
      };
    }),
    { id: "—", nombre: "Bugs y ACT", total: sinSprint.length, cerrados: sinSprintClosed, opPct: sinSprintPct },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Operación diaria"
        title="Resumen del proyecto"
        description="Vista interna de trabajo: qué está abierto, qué espera tester, qué está en progreso y cómo va cada sprint. No es una presentación: es el tablero de control del equipo."
        actions={
          <>
            <button onClick={() => onGo({})} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
              Ver todas las tareas
            </button>
            <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
              Sync {new Date(openproject.sincronizadoEn).toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", timeZone: "America/Lima" })}
            </span>
          </>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Avance OpenProject" value={`${opPct}%`} hint={`${openproject.resumen.cerrados}/${openproject.resumen.total} WPs cerrados`} tone="emerald" />
        <Stat label="Bugs y ACT cerrados" value={`${sinSprintPct}%`} hint={`${sinSprintClosed}/${sinSprint.length} sin sprint`} tone="violet" />
        <Stat label="WPs abiertos" value={abiertos} hint="Todos los sprints" tone="slate" />
        <Stat label="Por testear" value={porTestear} hint="Developed + In testing" tone="blue" />
        <Stat label="Bugs abiertos" value={bugsAbiertos} hint="Defectos reales" tone="rose" />
        <Stat label="ACT abiertas" value={actsAbiertas} hint="Feedback / alcance extra" tone="violet" />
        <Stat label="CPs documentados" value={cps} hint="v1.8 · CP01–CP61" tone="emerald" />
        <Stat label="Evidencias aprobadas" value={evidencias} hint="61/61 en el PDF v1.8" tone="amber" />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Avance con ACT · alcance actual</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-blue-600">{opPct}%</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{openproject.resumen.cerrados}/{openproject.resumen.total} WPs · incluye {actsWps.length} ACT</p>
            </div>
            <div className="w-32 shrink-0"><Progress value={opPct} tone="blue" /></div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Avance sin ACT · solo alcance base + bugs</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-emerald-600">{opPctSinAct}%</p>
              <p className="mt-0.5 text-[11px] text-slate-400">{sinActClosed}/{sinActTotal} WPs · excluye {actsWps.length} ACT ({actsWps.length - actsClosed} abiertas)</p>
            </div>
            <div className="w-32 shrink-0"><Progress value={opPctSinAct} tone="emerald" /></div>
          </div>
        </Card>
      </div>
      <p className="mt-3 text-xs leading-relaxed text-slate-400">
        Criterio aplicado al 2026-11-05: los defectos corregidos se reflejan en OpenProject; el doble check y las mejoras
        pedidas por el cliente (deshabilitar una ingesta, buscadores, prompts ESG, tooltips, etc.) se contabilizan como ACT,
        no como bugs. Backlog sin sprint: {sinSprintClosed}/{sinSprint.length} ({sinSprintPct}%). Si se excluye todo el alcance ACT,
        el avance queda en {opPctSinAct}% ({sinActClosed}/{sinActTotal} WPs).
      </p>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Cola de trabajo</h2>
              <p className="text-[11px] text-slate-400">Lo que el equipo debe mover hoy. Click en una tarea para ver el detalle.</p>
            </div>
          </div>
          <div className="grid gap-3 p-3 sm:grid-cols-2">
            {queues.map((q) => {
              const rows = openproject.workPackages.filter((w) => w.estado === q.status).slice(0, 5);
              const total = openproject.workPackages.filter((w) => w.estado === q.status).length;
              return (
                <div key={q.status} className="rounded-lg border border-slate-200 bg-slate-50/60 p-3">
                  <div className="mb-2 flex items-center justify-between">
                    <Pill tone={q.tone}>{q.label}</Pill>
                    <span className="text-xs font-semibold text-slate-500">{total}</span>
                  </div>
                  <div className="space-y-1.5">
                    {rows.map((w) => (
                      <button
                        key={w.id}
                        onClick={() => onSelect(w)}
                        className="block w-full rounded-md border border-transparent bg-white px-2 py-1.5 text-left shadow-sm hover:border-slate-200"
                      >
                        <p className="line-clamp-1 text-[12px] font-medium text-slate-700">{w.asunto}</p>
                        <p className="mt-0.5 text-[10px] text-slate-400">#{w.id} · {w.responsable ?? "Sin asignar"}</p>
                      </button>
                    ))}
                    {rows.length === 0 && <p className="text-[11px] text-slate-400">Sin tareas.</p>}
                  </div>
                  <button onClick={() => onGo({ status: q.status })} className="mt-2 text-[11px] font-medium text-blue-600 hover:text-blue-700">
                    Ver todas ({total}) →
                  </button>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-800">Salud por sprint</h2>
              <p className="text-[11px] text-slate-400">Cierre en OpenProject vs fechas reales.</p>
            </div>
          </div>
          <div className="divide-y divide-slate-100">
            {healthRows.map((s) => (
              <button key={s.id} onClick={() => onSprint(s.id === "—" ? "Sin sprint" : `${s.id} · ${s.nombre}`)} className="flex w-full items-center gap-3 px-4 py-2 text-left hover:bg-slate-50">
                <div className="w-24 shrink-0">
                  <p className="text-[12px] font-medium text-slate-700">{s.id} · {s.nombre}</p>
                  <p className="text-[10px] text-slate-400">{s.cerrados}/{s.total} WPs</p>
                </div>
                <div className="flex-1">
                  <Progress value={s.opPct} tone={s.opPct === 100 ? "emerald" : s.opPct >= 60 ? "blue" : "amber"} />
                </div>
                <span className="w-9 text-right text-[11px] font-semibold text-slate-500">{s.opPct}%</span>
              </button>
            ))}
          </div>
        </Card>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-[1.35fr_1fr]">
        <Card>
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-800">Módulos</h2>
            <button onClick={() => onGo({})} className="text-[11px] font-medium text-blue-600">Ver tareas</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[12px]">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
                <tr>
                  <th className="px-4 py-2 font-semibold">Módulo</th>
                  <th className="px-4 py-2 font-semibold">Código</th>
                  <th className="px-4 py-2 font-semibold">OpenProject</th>
                  <th className="px-4 py-2 font-semibold">Manual</th>
                  <th className="px-4 py-2 font-semibold">Bugs</th>
                  <th className="px-4 py-2 font-semibold">Estado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {curated.modulos.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-700">{m.id} · {m.nombre}</td>
                    <td className="px-4 py-2 text-emerald-600">{m.codigo}%</td>
                    <td className="px-4 py-2 text-slate-500">{m.opClosed}/{m.opTotal}</td>
                    <td className="px-4 py-2 text-slate-500">{m.manual}%</td>
                    <td className="px-4 py-2 text-rose-600">{m.bugsOpen}</td>
                    <td className="px-4 py-2"><Pill tone={m.estado.includes("Probado") ? "emerald" : "amber"}>{m.estado}</Pill></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card>
          <div className="border-b border-slate-100 px-4 py-3">
            <h2 className="text-sm font-semibold text-slate-800">Actividad reciente</h2>
            <p className="text-[11px] text-slate-400">Últimos WPs actualizados en OpenProject.</p>
          </div>
          <div className="divide-y divide-slate-100">
            {recientes.map((w) => (
              <button key={w.id} onClick={() => onSelect(w)} className="flex w-full items-center gap-2 px-4 py-2 text-left hover:bg-slate-50">
                <span className="w-10 text-[10px] font-semibold text-slate-400">#{w.id}</span>
                <span className="min-w-0 flex-1 truncate text-[12px] text-slate-600">{w.asunto}</span>
                <Pill tone={statusTone(w.estado)}>{w.estado}</Pill>
              </button>
            ))}
          </div>
        </Card>
      </div>
    </>
  );
}

function TasksView({
  wps,
  total,
  search,
  setSearch,
  status,
  setStatus,
  type,
  setType,
  sprint,
  setSprint,
  assignee,
  setAssignee,
  module,
  setModule,
  assignees,
  sprints,
  onSelect,
  onClear,
}: {
  wps: WP[];
  total: number;
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  type: string;
  setType: (v: string) => void;
  sprint: string;
  setSprint: (v: string) => void;
  assignee: string;
  setAssignee: (v: string) => void;
  module: string;
  setModule: (v: string) => void;
  assignees: string[];
  sprints: string[];
  onSelect: (w: WP) => void;
  onClear: () => void;
}) {
  const statuses = ["all", "New", "In progress", "Developed", "In testing", "Closed"];
  const types = ["all", "Bug", "Feature", "Task", "User story"];
  return (
    <>
      <PageHeader
        eyebrow="Backlog operativo"
        title="Tareas"
        description={`${wps.length} de ${total} work packages. Filtra, busca y abre el detalle de cada tarea.`}
        actions={<button onClick={onClear} className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">Limpiar filtros</button>}
      />
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-2.5">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar…" className="h-8 w-52 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-xs outline-none focus:bg-white" />
          </div>
          <Select value={status} onChange={setStatus} options={statuses} label="Estado" />
          <Select value={type} onChange={setType} options={types} label="Tipo" />
          <Select value={sprint} onChange={setSprint} options={["all", ...sprints]} label="Sprint" />
          <Select value={assignee} onChange={setAssignee} options={["all", ...assignees]} label="Responsable" />
          <Select value={module} onChange={setModule} options={["all", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "Transversal"]} label="Módulo" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[12px]">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-3 py-2 font-semibold">ID</th>
                <th className="px-3 py-2 font-semibold">Asunto</th>
                <th className="px-3 py-2 font-semibold">Tipo</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="px-3 py-2 font-semibold">Sprint</th>
                <th className="px-3 py-2 font-semibold">Responsable</th>
                <th className="px-3 py-2 font-semibold">Actualizado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {wps.map((w) => (
                <tr key={w.id} onClick={() => onSelect(w)} className="cursor-pointer hover:bg-slate-50">
                  <td className="px-3 py-2 font-mono text-[11px] text-slate-400">#{w.id}</td>
                  <td className="max-w-[420px] px-3 py-2">
                    <p className="truncate font-medium text-slate-700">{w.asunto}</p>
                    <p className="text-[10px] text-slate-400">{moduleOf(w)} · {w.padre ?? "Sin padre"}</p>
                  </td>
                  <td className="px-3 py-2"><Pill tone={typeTone(w.tipo)}>{w.tipo}</Pill></td>
                  <td className="px-3 py-2"><Pill tone={statusTone(w.estado)}>{w.estado}</Pill></td>
                  <td className="px-3 py-2 text-slate-500">{w.sprint ?? "Sin sprint"}</td>
                  <td className="px-3 py-2 text-slate-500">{w.responsable ?? "Sin asignar"}</td>
                  <td className="px-3 py-2 text-slate-400">{fecha(w.actualizado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {wps.length === 0 && <Empty>No hay tareas con esos filtros.</Empty>}
      </Card>
    </>
  );
}

function Select({ value, onChange, options, label }: { value: string; onChange: (v: string) => void; options: string[]; label: string }) {
  return (
    <label className="flex items-center gap-1.5 text-[11px] text-slate-400">
      <span className="hidden sm:inline">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-8 max-w-[150px] rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none">
        {options.map((o) => (
          <option key={o} value={o}>{o === "all" ? "Todos" : o}</option>
        ))}
      </select>
    </label>
  );
}

function SprintsView({
  sprints,
  onOpen,
}: {
  sprints: { id: number; nombre: string; inicio: string | null; fin: string | null; total: number; cerrados: number; estado: string | null }[];
  onOpen: (s: string) => void;
}) {
  return (
    <>
      <PageHeader eyebrow="Planificación" title="Sprints" description="Cada sprint con sus fechas reales, avance de cierre y acceso a sus tareas." />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {sprints.map((s) => {
          const pct = s.total ? Math.round((s.cerrados / s.total) * 100) : 0;
          return (
            <Card key={s.id} className="p-4">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-slate-800">{s.nombre}</p>
                  <p className="mt-0.5 text-[11px] text-slate-400">{fecha(s.inicio)} → {fecha(s.fin)}</p>
                </div>
                <Pill tone={pct === 100 ? "emerald" : pct >= 60 ? "blue" : "amber"}>{pct}%</Pill>
              </div>
              <div className="mt-3">
                <Progress value={pct} tone={pct === 100 ? "emerald" : pct >= 60 ? "blue" : "amber"} />
              </div>
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span>{s.cerrados}/{s.total} WPs cerrados</span>
                <button onClick={() => onOpen(s.nombre)} className="font-medium text-blue-600 hover:text-blue-700">Ver tareas →</button>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function ModulesView({ modules, onOpen }: { modules: typeof curated.modulos; onOpen: (m: string) => void }) {
  return (
    <>
      <PageHeader eyebrow="Producto" title="Módulos" description="Estado de cada módulo: código, OpenProject, CPs documentados, evidencia, UAT, bugs y ACT. Sin porcentajes estimados de auto/manual." />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-[12px]">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-4 py-2 font-semibold">Módulo</th>
                <th className="px-4 py-2 font-semibold">Sprint</th>
                <th className="px-4 py-2 font-semibold">Código</th>
                <th className="px-4 py-2 font-semibold">OpenProject</th>
                <th className="px-4 py-2 font-semibold">CPs</th>
                <th className="px-4 py-2 font-semibold">Evidencia</th>
                <th className="px-4 py-2 font-semibold">UAT</th>
                <th className="px-4 py-2 font-semibold">Bugs</th>
                <th className="px-4 py-2 font-semibold">ACT</th>
                <th className="px-4 py-2 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modules.map((m) => {
                const cps = testcases.filter((c) => c.modulo === m.id);
                const conEvidencia = cps.filter((c) => c.evidencia).length;
                const uat = m.bugsOpen + m.act === 0 ? "Validado" : "Con observaciones";
                return (
                  <tr key={m.id} onClick={() => onOpen(m.id)} className="cursor-pointer hover:bg-slate-50">
                    <td className="px-4 py-2">
                      <p className="font-medium text-slate-700">{m.id} · {m.nombre}</p>
                      <p className="max-w-[280px] text-[10px] text-slate-400">{m.nota}</p>
                    </td>
                    <td className="px-4 py-2 text-slate-500">{m.sprint}</td>
                    <td className="px-4 py-2 text-emerald-600">{m.codigo}%</td>
                    <td className="px-4 py-2 text-slate-500">{m.opClosed}/{m.opTotal}</td>
                    <td className="px-4 py-2 text-slate-600">{cps.length} CPs</td>
                    <td className="px-4 py-2 text-emerald-600">{conEvidencia}/{cps.length}</td>
                    <td className="px-4 py-2"><Pill tone={uat === "Validado" ? "emerald" : "amber"}>{uat}</Pill></td>
                    <td className="px-4 py-2 text-rose-600">{m.bugsOpen}</td>
                    <td className="px-4 py-2 text-violet-600">{m.act}</td>
                    <td className="px-4 py-2"><Pill tone={m.estado.includes("Probado") ? "emerald" : "amber"}>{m.estado}</Pill></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function TeamView({
  team,
  onOpen,
}: {
  team: { nombre: string; abiertos: number; progress: number; developed: number; testing: number; bugs: number; act: number }[];
  onOpen: (n: string) => void;
}) {
  const max = Math.max(1, ...team.map((t) => t.abiertos));
  return (
    <>
      <PageHeader eyebrow="Carga de trabajo" title="Equipo" description="Tareas abiertas por responsable. Sirve para ver dónde se concentra el trabajo y quién tiene cosas por testear." />
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[12px]">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-4 py-2 font-semibold">Responsable</th>
                <th className="px-4 py-2 font-semibold">Abiertos</th>
                <th className="px-4 py-2 font-semibold">In progress</th>
                <th className="px-4 py-2 font-semibold">Developed</th>
                <th className="px-4 py-2 font-semibold">In testing</th>
                <th className="px-4 py-2 font-semibold">Bugs</th>
                <th className="px-4 py-2 font-semibold">ACT</th>
                <th className="px-4 py-2 font-semibold">Carga</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {team.map((t) => (
                <tr key={t.nombre} onClick={() => onOpen(t.nombre)} className="cursor-pointer hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium text-slate-700">{t.nombre}</td>
                  <td className="px-4 py-2 font-semibold text-slate-700">{t.abiertos}</td>
                  <td className="px-4 py-2 text-amber-600">{t.progress}</td>
                  <td className="px-4 py-2 text-blue-600">{t.developed}</td>
                  <td className="px-4 py-2 text-violet-600">{t.testing}</td>
                  <td className="px-4 py-2 text-rose-600">{t.bugs}</td>
                  <td className="px-4 py-2 text-violet-600">{t.act}</td>
                  <td className="w-40 px-4 py-2"><Progress value={(t.abiertos / max) * 100} tone="blue" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function BugsView({
  tab,
  setTab,
  rows,
  totalBugs,
  totalActs,
  search,
  setSearch,
  status,
  setStatus,
  module,
  setModule,
  onSelect,
}: {
  tab: "bugs" | "act";
  setTab: (t: "bugs" | "act") => void;
  rows: WP[];
  totalBugs: number;
  totalActs: number;
  search: string;
  setSearch: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  module: string;
  setModule: (v: string) => void;
  onSelect: (w: WP) => void;
}) {
  const statuses = ["all", "New", "In progress", "Developed", "In testing", "Closed"];
  const anterior = curated.historial.anterior;
  const wps = openproject.workPackages;
  const bugsAhora = wps.filter((w) => esBug(w) && w.estado !== "Closed").length;
  const actAhora = wps.filter((w) => esAct(w) && w.estado !== "Closed").length;
  const bugsNuevos = wps.filter((w) => esBug(w) && (w.creado ?? "") > anterior.fecha).length;
  const actNuevas = wps.filter((w) => esAct(w) && (w.creado ?? "") > anterior.fecha).length;
  const bugsCerrados = anterior.bugsAbiertos + bugsNuevos - bugsAhora;
  const actCerradas = anterior.actAbiertas + actNuevas - actAhora;
  const wpsNuevos = wps.filter((w) => (w.creado ?? "") > anterior.fecha).length;
  const wpsEliminados = anterior.wps + wpsNuevos - openproject.resumen.total;
  const pctAntes = Math.round((anterior.cerrados / anterior.wps) * 100);
  const pctAhora = Math.round((openproject.resumen.cerrados / openproject.resumen.total) * 100);
  const actsTotal = actAhora + actCerradas;
  const sinActTotalAhora = openproject.resumen.total - actsTotal;
  const sinActClosedAhora = openproject.resumen.cerrados - actCerradas;
  const pctSinActAhora = sinActTotalAhora ? Math.round((sinActClosedAhora / sinActTotalAhora) * 100) : 0;
  const sinActTotalAntes = anterior.wps - anterior.actAbiertas;
  const pctSinActAntes = sinActTotalAntes ? Math.round((anterior.cerrados / sinActTotalAntes) * 100) : 0;
  const etiquetaCorte = (fecha: string) => {
    const d = new Date(`${fecha}T12:00:00`);
    return d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", timeZone: "America/Lima" }).replace(".", "").replace(" ", "-");
  };
  const corteAnterior = etiquetaCorte(anterior.fecha);
  const corteActual = etiquetaCorte(openproject.sincronizadoEn.slice(0, 10));
  const bugsWaterfall: WaterfallItem[] = [
    { label: corteAnterior, start: 0, end: anterior.bugsAbiertos, color: "#fb7185", display: String(anterior.bugsAbiertos) },
    { label: "Nuevos", start: anterior.bugsAbiertos, end: anterior.bugsAbiertos + bugsNuevos, color: "#fbbf24", display: `+${bugsNuevos}` },
    { label: "Cerrados", start: anterior.bugsAbiertos + bugsNuevos, end: bugsAhora, color: "#34d399", display: `−${bugsCerrados}` },
    { label: corteActual, start: 0, end: bugsAhora, color: "#38bdf8", display: String(bugsAhora) },
  ];
  const actWaterfall: WaterfallItem[] = [
    { label: corteAnterior, start: 0, end: anterior.actAbiertas, color: "#a78bfa", display: String(anterior.actAbiertas) },
    { label: "Nuevas", start: anterior.actAbiertas, end: anterior.actAbiertas + actNuevas, color: "#fbbf24", display: `+${actNuevas}` },
    { label: "Cerradas", start: anterior.actAbiertas + actNuevas, end: actAhora, color: "#34d399", display: `−${actCerradas}` },
    { label: corteActual, start: 0, end: actAhora, color: "#38bdf8", display: String(actAhora) },
  ];
  const maxBugs = Math.max(1, ...bugsWaterfall.flatMap((i) => [i.start, i.end]));
  const maxAct = Math.max(1, ...actWaterfall.flatMap((i) => [i.start, i.end]));
  return (
    <>
      <PageHeader
        eyebrow="Calidad"
        title="Bugs y ACT (feedback del cliente)"
        description="Bugs = defectos reales del producto. ACT = feedback del cliente o alcance extra (doble check, deshabilitar una ingesta, buscadores, etc.). Los estados son los de OpenProject."
        actions={
          <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
            <button onClick={() => setTab("bugs")} className={`rounded-md px-2.5 py-1 text-xs font-medium ${tab === "bugs" ? "bg-slate-900 text-white" : "text-slate-500"}`}>Bugs ({totalBugs})</button>
            <button onClick={() => setTab("act")} className={`rounded-md px-2.5 py-1 text-xs font-medium ${tab === "act" ? "bg-slate-900 text-white" : "text-slate-500"}`}>ACT ({totalActs})</button>
          </div>
        }
      />

      <Card className="mb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-800">Evolución del testing</h2>
            <p className="text-[11px] text-slate-400">Cómo entraron y se cerraron bugs y ACT entre el corte anterior y la sincronización actual.</p>
          </div>
          <Pill tone="blue">{corteAnterior} → {corteActual}</Pill>
        </div>
        <p className="px-4 pt-3 text-[10px] text-slate-400">
          Barras acumuladas: rojo/violeta = punto de partida · ámbar = nuevos · verde = cerrados · azul = estado actual.
        </p>
        <div className="grid gap-6 p-4 lg:grid-cols-2">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-700">Bugs reales</p>
              <p className="text-[11px] text-slate-500">
                {anterior.bugsAbiertos} → <span className="font-semibold text-slate-800">{bugsAhora}</span>{" "}
                <span className={bugsAhora <= anterior.bugsAbiertos ? "text-emerald-600" : "text-rose-600"}>
                  ({bugsAhora - anterior.bugsAbiertos})
                </span>
              </p>
            </div>
            <Waterfall items={bugsWaterfall} max={maxBugs} />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-700">ACT / feedback</p>
              <p className="text-[11px] text-slate-500">
                {anterior.actAbiertas} → <span className="font-semibold text-slate-800">{actAhora}</span>{" "}
                <span className={actAhora <= anterior.actAbiertas ? "text-emerald-600" : "text-violet-600"}>
                  (+{actAhora - anterior.actAbiertas})
                </span>
              </p>
            </div>
            <Waterfall items={actWaterfall} max={maxAct} />
          </div>
        </div>
        <div className="overflow-x-auto border-t border-slate-100">
          <table className="w-full min-w-[760px] text-left text-[12px]">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-4 py-2 font-semibold">Métrica</th>
                <th className="px-3 py-2 font-semibold">{corteAnterior}</th>
                <th className="px-3 py-2 font-semibold">Nuevos</th>
                <th className="px-3 py-2 font-semibold">Cerrados</th>
                <th className="px-3 py-2 font-semibold">{corteActual}</th>
                <th className="px-3 py-2 font-semibold">Neto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">Bugs reales</td>
                <td className="px-3 py-2 text-slate-600">{anterior.bugsAbiertos}</td>
                <td className="px-3 py-2 text-amber-600">+{bugsNuevos}</td>
                <td className="px-3 py-2 text-emerald-600">−{bugsCerrados}</td>
                <td className="px-3 py-2 font-semibold text-slate-800">{bugsAhora}</td>
                <td className={`px-3 py-2 font-semibold ${bugsAhora - anterior.bugsAbiertos <= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                  {bugsAhora - anterior.bugsAbiertos > 0 ? "+" : ""}{bugsAhora - anterior.bugsAbiertos}
                </td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">ACT / feedback</td>
                <td className="px-3 py-2 text-slate-600">{anterior.actAbiertas}</td>
                <td className="px-3 py-2 text-amber-600">+{actNuevas}</td>
                <td className="px-3 py-2 text-emerald-600">−{actCerradas}</td>
                <td className="px-3 py-2 font-semibold text-slate-800">{actAhora}</td>
                <td className="px-3 py-2 font-semibold text-violet-600">+{actAhora - anterior.actAbiertas}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">WPs totales</td>
                <td className="px-3 py-2 text-slate-600">{anterior.wps}</td>
                <td className="px-3 py-2 text-amber-600">+{wpsNuevos}</td>
                <td className="px-3 py-2 text-slate-500">−{wpsEliminados} eliminados</td>
                <td className="px-3 py-2 font-semibold text-slate-800">{openproject.resumen.total}</td>
                <td className="px-3 py-2 font-semibold text-slate-700">+{openproject.resumen.total - anterior.wps}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">WPs cerrados</td>
                <td className="px-3 py-2 text-slate-600">{anterior.cerrados}</td>
                <td className="px-3 py-2 text-slate-400">—</td>
                <td className="px-3 py-2 text-emerald-600">+{openproject.resumen.cerrados - anterior.cerrados}</td>
                <td className="px-3 py-2 font-semibold text-slate-800">{openproject.resumen.cerrados}</td>
                <td className="px-3 py-2 font-semibold text-emerald-600">+{openproject.resumen.cerrados - anterior.cerrados}</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">Avance OpenProject</td>
                <td className="px-3 py-2 text-slate-600">{pctAntes}%</td>
                <td className="px-3 py-2 text-slate-400">—</td>
                <td className="px-3 py-2 text-slate-400">—</td>
                <td className="px-3 py-2 font-semibold text-slate-800">{pctAhora}%</td>
                <td className="px-3 py-2 font-semibold text-emerald-600">+{pctAhora - pctAntes} pp</td>
              </tr>
              <tr>
                <td className="px-4 py-2 font-medium text-slate-700">Avance sin ACT</td>
                <td className="px-3 py-2 text-slate-600">{pctSinActAntes}%</td>
                <td className="px-3 py-2 text-slate-400">—</td>
                <td className="px-3 py-2 text-slate-400">—</td>
                <td className="px-3 py-2 font-semibold text-emerald-700">{pctSinActAhora}%</td>
                <td className="px-3 py-2 font-semibold text-emerald-600">+{pctSinActAhora - pctSinActAntes} pp</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="px-4 py-2 text-[10px] leading-relaxed text-slate-400">
          “Cerrados” incluye bugs/ACT nuevos que ya se resolvieron en el periodo. “WPs totales” descuenta {wpsEliminados} WPs
          eliminados en OpenProject; por eso el neto no coincide con la resta simple de altas y bajas. “Avance sin ACT”
          excluye los {actsTotal} WPs de feedback/alcance extra del cálculo.
        </p>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-2.5">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar…" className="h-8 w-52 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-xs outline-none focus:bg-white" />
          </div>
          <Select value={status} onChange={setStatus} options={statuses} label="Estado" />
          <Select value={module} onChange={setModule} options={["all", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "Integración", "Calidad", "Transversal"]} label="Módulo" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[12px]">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-3 py-2 font-semibold">ID</th>
                <th className="px-3 py-2 font-semibold">Asunto</th>
                <th className="px-3 py-2 font-semibold">Módulo</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="px-3 py-2 font-semibold">Responsable</th>
                <th className="px-3 py-2 font-semibold">Sprint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((w) => (
                <tr key={w.id} onClick={() => onSelect(w)} className="cursor-pointer hover:bg-slate-50">
                  <td className="px-3 py-2 font-mono text-[11px] text-slate-400">#{w.id}</td>
                  <td className="max-w-[460px] px-3 py-2">
                    <p className="truncate font-medium text-slate-700">{w.asunto}</p>
                    <p className="text-[10px] text-slate-400">
                      {ACT_EXTRA.has(w.id) ? "Bug en OpenProject · reclasificado a ACT" : w.tipo}
                    </p>
                  </td>
                  <td className="px-3 py-2 text-slate-500">{moduleOf(w)}</td>
                  <td className="px-3 py-2"><Pill tone={statusTone(w.estado)}>{w.estado}</Pill></td>
                  <td className="px-3 py-2 text-slate-500">{w.responsable ?? "Sin asignar"}</td>
                  <td className="px-3 py-2 text-slate-400">{w.sprint ?? "Sin sprint"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <Empty>No hay registros con esos filtros.</Empty>}
      </Card>
    </>
  );
}

function TestCasesView({
  cps,
  total,
  module,
  setModule,
  evidencias,
  onSelect,
}: {
  cps: CP[];
  total: number;
  module: string;
  setModule: (v: string) => void;
  evidencias: number;
  onSelect: (cp: CP) => void;
}) {
  const mods = ["all", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8"];
  return (
    <>
      <PageHeader
        eyebrow="Calidad"
        title="Casos de prueba"
        description={`Documento v1.8 (21/10/2026) · ${total} CPs para M1–M8 · ${evidencias}/${total} con evidencia aprobada.${evidencias === total ? " Todos los CPs están aprobados." : ` Quedan ${total - evidencias} pendientes.`}`}
      />
      <div className="mb-3 flex flex-wrap items-center gap-1.5">
        {mods.map((m) => (
          <button key={m} onClick={() => setModule(m)} className={`rounded-md border px-2 py-1 text-[11px] font-medium ${module === m ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"}`}>
            {m === "all" ? "Todos" : m}
          </button>
        ))}
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-[12px]">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-3 py-2 font-semibold">CP</th>
                <th className="px-3 py-2 font-semibold">Módulo</th>
                <th className="px-3 py-2 font-semibold">Caso</th>
                <th className="px-3 py-2 font-semibold">Documentado</th>
                <th className="px-3 py-2 font-semibold">Evidencia</th>
                <th className="px-3 py-2 font-semibold">Entorno</th>
                <th className="px-3 py-2 font-semibold">Resultado</th>
                <th className="px-3 py-2 font-semibold">Responsable</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cps.map((c) => (
                <tr key={c.cp} onClick={() => onSelect(c)} className="cursor-pointer hover:bg-slate-50">
                  <td className="px-3 py-2 font-mono text-[11px] font-semibold text-slate-600">{c.cp}</td>
                  <td className="px-3 py-2 text-slate-500">{c.modulo}</td>
                  <td className="max-w-[460px] px-3 py-2 text-slate-700">{c.titulo}</td>
                  <td className="px-3 py-2"><Pill tone="emerald">v{c.version}</Pill></td>
                  <td className="px-3 py-2">
                    <Pill tone={c.evidencia ? "emerald" : "amber"} className={c.evidencia ? "cursor-help" : ""}>
                      <span title={c.evidencia ?? undefined}>{c.evidencia ? "Archivada" : "Pendiente"}</span>
                    </Pill>
                    {c.evidencia && <p className="mt-0.5 text-[10px] text-slate-400">{c.evidencia.replace("PDF v1.8, ", "")}</p>}
                  </td>
                  <td className="px-3 py-2 text-slate-400">{c.entorno ?? "—"}</td>
                  <td className="px-3 py-2 font-medium text-emerald-600">{c.resultado ?? "—"}</td>
                  <td className="px-3 py-2 text-[10px] text-slate-500">{c.responsable ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {cps.length === 0 && <Empty>No hay CPs en ese módulo.</Empty>}
      </Card>
    </>
  );
}

function EvidenceView({ cps, onOpenCp }: { cps: CP[]; onOpenCp: (cp: CP) => void }) {
  return (
    <>
      <PageHeader
        eyebrow="Calidad"
        title="Evidencias"
        description="La evidencia principal está incluida en el PDF v1.8. Este apartado registra capturas adicionales y observaciones del PO."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {EVIDENCE_FOLDERS.map((f) => (
          <Card key={f.carpeta} className="p-4">
            <div className="flex items-center gap-2">
              <Icon name="folder" className="h-4 w-4 text-amber-500" />
              <p className="text-sm font-semibold text-slate-800">{f.carpeta}</p>
            </div>
            <p className="mt-1 text-[11px] text-slate-400">{f.uso}</p>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{f.pendientes === 0 ? "Completo" : f.pendientes}</p>
            <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">{f.pendientes === 0 ? "sin pendientes" : "pendiente(s)"}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-800">Evidencias registradas</h2>
          <p className="text-[11px] text-slate-400">Cada CP aprobado con la página del PDF v1.8 donde está su captura.</p>
        </div>
        <div className="grid gap-1 p-3 sm:grid-cols-2 lg:grid-cols-3">
          {cps.map((c) => (
            <button key={c.cp} onClick={() => onOpenCp(c)} className="flex items-center justify-between rounded-md border border-slate-100 px-2.5 py-1.5 text-left hover:bg-slate-50">
              <span className="text-[12px] text-slate-600"><span className="font-mono text-[11px] text-slate-400">{c.cp}</span> · {c.titulo}</span>
              <Pill tone={c.estado === "Aprobado" ? "emerald" : "amber"}>{c.estado}</Pill>
            </button>
          ))}
        </div>
      </Card>
    </>
  );
}

function AnalysisView({ gaps, flows }: { gaps: typeof curated.analysisGaps; flows: typeof FLOWS }) {
  return (
    <>
      <PageHeader eyebrow="Documentación" title="Brechas A&D" description="Lo que el análisis debe reflejar del desarrollo real y de las observaciones del PO." />
      <div className="grid gap-3 lg:grid-cols-2">
        {gaps.map((g) => (
          <Card key={g.tema} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-sm font-semibold text-slate-800">{g.tema}</h3>
              <Pill tone={g.prioridad === "Alta" ? "rose" : "amber"}>{g.prioridad}</Pill>
            </div>
            <p className="mt-1 text-[12px] leading-relaxed text-slate-500">{g.detalle}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-800">Flujos que dependen de prueba manual</h2>
          <p className="text-[11px] text-slate-400">Registro operativo de lo que no está 100% automatizado.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-[12px]">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-3 py-2 font-semibold">ID</th>
                <th className="px-3 py-2 font-semibold">Flujo</th>
                <th className="px-3 py-2 font-semibold">Módulo</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {flows.map((f) => (
                <tr key={f.id}>
                  <td className="px-3 py-2 font-mono text-[11px] text-slate-400">{f.id}</td>
                  <td className="px-3 py-2 text-slate-700">{f.flujo}</td>
                  <td className="px-3 py-2 text-slate-500">{f.modulo}</td>
                  <td className="px-3 py-2"><Pill tone={f.estado.includes("Pendiente") || f.estado.includes("No iniciado") ? "amber" : "blue"}>{f.estado}</Pill></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}

function ChangesView({ changes }: { changes: typeof curated["cambiosA&D"] }) {
  const [estado, setEstado] = useState("all");
  const [q, setQ] = useState("");
  const filtrados = changes.filter((c) => {
    if (estado !== "all" && c.concordancia !== estado) return false;
    const texto = `${c.id} ${c.artefacto} ${c.tipo} ${c.analisis} ${c.implementacion} ${c.accion} ${c.evidencia}`.toLowerCase();
    return !q || texto.includes(q.toLowerCase());
  });
  const cuenta = (v: string) => changes.filter((c) => c.concordancia === v).length;
  const tono = (v: string): "rose" | "amber" | "emerald" | "slate" =>
    v === "No concuerda" ? "rose" : v === "Parcial" ? "amber" : v === "Concuerda" ? "emerald" : "slate";
  return (
    <>
      <PageHeader
        eyebrow="Documentación"
        title="Cambios y no concordancias A&D"
        description="Mapa entre lo que dice el Análisis y Diseño y lo que ya implementa el frontend/backend. Las filas en rojo son contradicciones que deben corregirse en la documentación."
      />
      <div className="mb-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <Stat label="Artefactos mapeados" value={changes.length} hint="RN · RF · RNF · modelo · CU · API · UI · pruebas" tone="slate" />
        <Stat label="No concuerda" value={cuenta("No concuerda")} hint="Requiere reescritura" tone="rose" />
        <Stat label="Parcial" value={cuenta("Parcial")} hint="Falta precisión o alcance" tone="amber" />
        <Stat label="Concuerda" value={cuenta("Concuerda")} hint="Sin acción" tone="emerald" />
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-2.5">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar RN, RF, modelo, CU…"
              className="h-8 w-64 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-xs outline-none focus:bg-white"
            />
          </div>
          <Select value={estado} onChange={setEstado} options={["all", "No concuerda", "Parcial", "Concuerda", "Pendiente"]} label="Concordancia" />
          <span className="ml-auto text-[11px] text-slate-400">{filtrados.length} de {changes.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1100px] text-left text-[12px]">
            <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-3 py-2 font-semibold">Artefacto</th>
                <th className="px-3 py-2 font-semibold">Tipo</th>
                <th className="px-3 py-2 font-semibold">A&D dice</th>
                <th className="px-3 py-2 font-semibold">Implementación actual</th>
                <th className="px-3 py-2 font-semibold">Concordancia</th>
                <th className="px-3 py-2 font-semibold">Acción</th>
                <th className="px-3 py-2 font-semibold">Evidencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtrados.map((c) => (
                <tr key={c.id} className="align-top hover:bg-slate-50">
                  <td className="px-3 py-2">
                    <p className="font-mono text-[11px] text-slate-400">{c.id}</p>
                    <p className="font-medium text-slate-700">{c.artefacto}</p>
                  </td>
                  <td className="px-3 py-2">
                    <Pill tone={c.tipo === "RN" ? "violet" : c.tipo === "RF" ? "blue" : c.tipo === "RNF" ? "slate" : "amber"}>{c.tipo}</Pill>
                  </td>
                  <td className="max-w-[220px] px-3 py-2 text-slate-500">{c.analisis}</td>
                  <td className="max-w-[240px] px-3 py-2 text-slate-600">{c.implementacion}</td>
                  <td className="px-3 py-2"><Pill tone={tono(c.concordancia)}>{c.concordancia}</Pill></td>
                  <td className="max-w-[220px] px-3 py-2 text-slate-600">{c.accion}</td>
                  <td className="max-w-[180px] px-3 py-2 text-[11px] text-slate-400">{c.evidencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtrados.length === 0 && <Empty>No hay artefactos con ese filtro.</Empty>}
      </Card>
    </>
  );
}

function TimelineView({
  sprints,
}: {
  sprints: { id: number; nombre: string; inicio: string | null; fin: string | null; total: number; cerrados: number }[];
}) {
  const validas = sprints.filter((s) => s.inicio && s.fin);
  if (!validas.length) return <Empty>Sin fechas de sprints.</Empty>;
  const inicio = Math.min(...validas.map((s) => new Date(s.inicio as string).getTime()));
  const fin = Math.max(...validas.map((s) => new Date(s.fin as string).getTime()));
  const rango = Math.max(1, fin - inicio);
  return (
    <>
      <PageHeader eyebrow="Tiempo" title="Timeline de sprints" description="Fechas reales de OpenProject y avance de cierre. El código M1–M8 ya está implementado." />
      <Card className="p-4">
        <div className="space-y-2.5">
          {validas.map((s) => {
            const ini = new Date(s.inicio as string).getTime();
            const f = new Date(s.fin as string).getTime();
            const left = ((ini - inicio) / rango) * 100;
            const width = Math.max(2, ((f - ini) / rango) * 100);
            const pct = s.total ? Math.round((s.cerrados / s.total) * 100) : 0;
            return (
              <div key={s.id} className="grid gap-2 sm:grid-cols-[190px_1fr] sm:items-center">
                <div>
                  <p className="text-[12px] font-medium text-slate-700">{s.nombre}</p>
                  <p className="text-[10px] text-slate-400">{fecha(s.inicio)} → {fecha(s.fin)} · {s.cerrados}/{s.total} WPs</p>
                </div>
                <div className="relative h-6 rounded-md bg-slate-100">
                  <div className="absolute top-0 h-6 overflow-hidden rounded-md border border-blue-200 bg-blue-100" style={{ left: `${left}%`, width: `${width}%` }} title={`${s.nombre}: ${pct}%`}>
                    <div className="h-full bg-blue-500/80" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="absolute right-1.5 top-1 text-[10px] font-semibold text-slate-500">{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </>
  );
}

function SlidesGuideView({ onGoSlide }: { onGoSlide: (id: string) => void }) {
  const rows = [
    {
      n: "00",
      target: "slide-00",
      preview: "/slides/slide-00-20261029.png",
      ppt: "Porcentaje de avances",
      title: "Porcentaje de avances",
      grafica: "Donut de total + barras desarrollo/testeo/total/falta",
      datos: "Desarrollo 100% · Testeo 73% · Total 87% · Falta 13% · OpenProject 76% (sin ACT 89%)",
      regla: "Total = promedio simple; testeo incluye correcciones abiertas.",
    },
    {
      n: "01",
      target: "slide-01",
      preview: "/slides/slide-01-20261029.png",
      ppt: "Avance por módulo",
      title: "Avance por módulo",
      grafica: "Tabla módulo / desarrollo / CPs / evidencia / bugs / ACT",
      datos: "M1–M8 con 100% desarrollo y evidencia 61/61",
      regla: "Aquí sí se ve el detalle por módulo.",
    },
    {
      n: "02",
      target: "slide-02",
      preview: "/slides/slide-02-20261029.png",
      ppt: "Casos de prueba por módulo",
      title: "Casos de prueba por módulo",
      grafica: "Tabla CPs/documentados/evidencia/bugs/ACT + barra de casos",
      datos: "M1 12 · M2 7 · M3 7 · M4 7 · M5 7 · M6 11 · M7 6 · M8 4 · evidencia 61/61",
      regla: "61 documentados; 61/61 con evidencia en el PDF y resultado OK.",
    },
    {
      n: "03",
      target: "slide-03",
      preview: "/slides/slide-03-20261029.png",
      ppt: "Avance por sprint",
      title: "Avance por sprint",
      grafica: "Tabla S0–S10 + barra de cierre",
      datos: "101/133 WPs (76%) · S2 100% · S8 100% · S9 88% · S10 17%",
      regla: "Este porcentaje es administrativo de OpenProject, no de código.",
    },
    {
      n: "04",
      target: "slide-04",
      preview: "/slides/slide-04-20261029.png",
      ppt: "Sprints Testers",
      title: "Fases de prueba · testers",
      grafica: "Tabla P01–P08 + barra de avance plan",
      datos: "P01–P06 100% · P07 0% · P08 60% · evidencia en PDF v1.8",
      regla: "El avance plan viene del cronograma de pruebas v1.8.",
    },
    {
      n: "05",
      target: "slide-05",
      preview: "/slides/slide-05-20261029.png",
      ppt: "Security",
      title: "Security & Quality",
      grafica: "Tarjetas ZAP / Trivy / CSP + tabla de controles",
      datos: "33 operaciones (19/14) · 4 IGNORE · 41 checks · 13/11 stages",
      regla: "Mostrar el pipeline sin bypasses y los límites declarados.",
    },
    {
      n: "06",
      target: "slide-06",
      preview: "/slides/slide-06-20261029.png",
      ppt: "E2E e integración",
      title: "E2E & Integration",
      grafica: "4 métricas + tabla por nivel",
      datos: "158 integración · 377 aserciones · 73 E2E API · 68 Playwright",
      regla: "La UI usa servicio simulado; el contrato real se prueba con Newman.",
    },
    {
      n: "07",
      target: "slide-07",
      preview: "/slides/slide-07-20261029.png",
      ppt: "Cumplimiento de requisitos",
      title: "Cumplimiento de requisitos",
      grafica: "3 tarjetas + tabla de brechas",
      datos: "105 requisitos · 82 cumple · 15 observaciones · 4 parcial/brecha · 4 no verificable",
      regla: "No marcar “cumple” si no hay evidencia.",
    },
  ];
  return (
    <>
      <PageHeader
        eyebrow="Presentación"
        title="Guía de slides"
        description="Cada tarjeta muestra la vista previa, qué gráfica usar, qué datos mostrar y el enlace directo a la slide correspondiente."
        actions={
          <button onClick={() => onGoSlide("slide-00")} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            Abrir presentación completa →
          </button>
        }
      />
      <div className="grid gap-4 lg:grid-cols-2">
        {rows.map((r) => (
          <Card key={r.target} className="overflow-hidden">
            <div className="grid gap-4 p-4 sm:grid-cols-[190px_1fr]">
              <button onClick={() => onGoSlide(r.target)} className="group relative block overflow-hidden rounded-lg border border-slate-200 bg-slate-50 text-left">
                <Image src={r.preview} alt={`Vista previa de ${r.title}`} width={380} height={214} className="h-auto w-full object-cover transition duration-200 group-hover:scale-[1.02]" />
                <span className="absolute inset-0 grid place-items-center bg-slate-900/0 text-[11px] font-semibold text-white opacity-0 transition group-hover:bg-slate-900/40 group-hover:opacity-100">
                  Abrir slide
                </span>
              </button>
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Para tu slide</p>
                    <h3 className="mt-0.5 text-sm font-semibold text-slate-800">{r.ppt}</h3>
                  </div>
                  <Pill tone="blue">Slide {r.n}</Pill>
                </div>
                <dl className="mt-2 space-y-1 text-[11px] leading-relaxed text-slate-500">
                  <div><dt className="inline font-semibold text-slate-600">Usar: </dt><dd className="inline">{r.title}</dd></div>
                  <div><dt className="inline font-semibold text-slate-600">Gráfica: </dt><dd className="inline">{r.grafica}</dd></div>
                  <div><dt className="inline font-semibold text-slate-600">Datos: </dt><dd className="inline">{r.datos}</dd></div>
                  <div><dt className="inline font-semibold text-slate-600">Regla: </dt><dd className="inline">{r.regla}</dd></div>
                </dl>
                <button onClick={() => onGoSlide(r.target)} className="mt-3 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 hover:text-blue-700">
                  Abrir slide {r.n} →
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-sm font-semibold text-slate-800">Reglas para no confundir porcentajes</h2>
          <ul className="mt-2 space-y-1.5 text-[12px] leading-relaxed text-slate-500">
            <li><strong className="text-slate-700">Desarrollo</strong> = código implementado. Hoy 100% en M1–M8.</li>
            <li><strong className="text-slate-700">Sprint</strong> = WPs cerrados / total en OpenProject. Hoy 101/133 (76%).</li>
            <li><strong className="text-slate-700">Bugs y ACT</strong> = 36/62 cerrados (58%) en el backlog sin sprint.</li>
            <li><strong className="text-slate-700">CP documentado</strong> = caso escrito y aprobado. Hoy 61/61.</li>
            <li><strong className="text-slate-700">Evidencia</strong> = captura dentro del PDF v1.8 o archivo adicional.</li>
            <li><strong className="text-slate-700">Bug</strong> = defecto real (6 abiertos). <strong className="text-slate-700">ACT</strong> = feedback del cliente o alcance extra (20 abiertas); no son fallos de CP.</li>
          </ul>
        </Card>
        <Card className="p-4">
          <h2 className="text-sm font-semibold text-slate-800">Antes de capturar</h2>
          <ol className="mt-2 list-decimal space-y-1.5 pl-4 text-[12px] leading-relaxed text-slate-500">
            <li>Ejecutar <code className="rounded bg-slate-100 px-1">npm run sync</code>.</li>
            <li>Ejecutar <code className="rounded bg-slate-100 px-1">npm run sync:evidence</code>.</li>
            <li>Entrar a <strong className="text-slate-700">Presentación</strong> o usar los enlaces de esta guía.</li>
            <li>Capturar cada slide o usar <strong className="text-slate-700">Imprimir / PDF</strong>.</li>
            <li>Verificar que el número de la slide coincida con esta guía.</li>
          </ol>
        </Card>
      </div>
    </>
  );
}

function SlidesView() {
  const opPct = Math.round((openproject.resumen.cerrados / openproject.resumen.total) * 100);
  const capturas = testcases.filter((c) => c.evidencia).length;
  const aprobados = testcases.filter((c) => c.estado === "Aprobado").length;
  const bugsAbiertos = openproject.workPackages.filter((w) => esBug(w) && w.estado !== "Closed").length;
  const actsAbiertas = openproject.workPackages.filter((w) => esAct(w) && w.estado !== "Closed").length;
  const actsWps = openproject.workPackages.filter(esAct);
  const actsClosed = actsWps.filter((w) => w.estado === "Closed").length;
  const sinActTotal = openproject.resumen.total - actsWps.length;
  const sinActClosed = openproject.resumen.cerrados - actsClosed;
  const opPctSinAct = sinActTotal ? Math.round((sinActClosed / sinActTotal) * 100) : 0;
  const modulos = curated.modulos.map((m) => {
    const cps = testcases.filter((c) => c.modulo === m.id);
    const conCaptura = cps.filter((c) => c.evidencia).length;
    return { ...m, cps: cps.length, conCaptura };
  });
  const maxCps = Math.max(1, ...modulos.map((m) => m.cps));
  const reqTotal = requirements.length;
  const reqCumple = requirements.filter((r) => r.estado === "Cumple").length;
  const reqObs = requirements.filter((r) => r.estado === "Cumple con observaciones").length;
  const reqParcial = requirements.filter((r) => r.estado === "Parcial" || r.estado === "Brecha").length;
  const reqNoVer = requirements.filter((r) => r.estado === "No verificable").length;
  const reqCriticos = requirements.filter((r) => ["Parcial", "Brecha", "No verificable"].includes(r.estado));
  const sprintRows = curated.sprints
    .filter((s) => s.id !== "—")
    .map((s) => {
      const version = (openproject.versiones ?? []).find((v) => v.nombre.startsWith(`${s.id} ·`));
      return { ...s, inicio: version?.inicio ?? null, fin: version?.fin ?? null };
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <PageHeader
          eyebrow="Presentación"
          title="Slides con datos reales"
          description="Cada bloque está pensado para capturarlo o imprimirlo como diapositiva. Los porcentajes están separados por definición para no mezclar desarrollo, sprint y evidencia."
          actions={<button onClick={() => window.print()} className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">Imprimir / PDF</button>}
        />
      </div>

      <section id="slide-00" className="mx-auto w-full max-w-[1180px] scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:break-after-page">
        <SlideHead
          n="00"
          title="Porcentaje de avances"
          subtitle={`Desarrollo 100% · Testeo ${curated.global.testeo}% · Total ${Math.round((100 + curated.global.testeo) / 2)}% · Falta ${100 - Math.round((100 + curated.global.testeo) / 2)}%.`}
        />
        <div className="mt-6 grid gap-6 lg:grid-cols-[220px_1fr] lg:items-center">
          <Donut value={Math.round((100 + curated.global.testeo) / 2)} label="Total" sublabel="Desarrollo + testeo" />
          <div className="space-y-4">
            <ChartBar label="Desarrollo" value={100} tone="emerald" note="M1–M8 implementados" />
            <ChartBar label="Testeo" value={curated.global.testeo} tone="blue" note="Automatización 85 · Manual/API 95 · UAT 50 · RAG 60 · 6 bugs + 20 ACT abiertas" />
            <ChartBar label="Total completado" value={Math.round((100 + curated.global.testeo) / 2)} tone="violet" note="Promedio simple de desarrollo y testeo" />
            <ChartBar label="Falta" value={100 - Math.round((100 + curated.global.testeo) / 2)} tone="slate" note="Cierre de bugs/ACT, UAT y evidencias" />
          </div>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-5">
          <Mini label="OpenProject con ACT" value={`${opPct}%`} />
          <Mini label="OpenProject sin ACT" value={`${opPctSinAct}%`} />
          <Mini label="Evidencia en PDF" value="61/61" />
          <Mini label="Bugs abiertos" value={String(bugsAbiertos)} />
          <Mini label="ACT abiertas" value={String(actsAbiertas)} />
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Total = promedio simple de desarrollo (100%) y testeo ({curated.global.testeo}%). Falta = 100 − total.
          Testeo incluye automatización, manual/API, UAT, RAG y corrección de bugs/ACT. Si se excluye el alcance ACT/feedback,
          OpenProject queda en {opPctSinAct}% ({sinActClosed}/{sinActTotal} WPs).
        </p>
      </section>

      <section id="slide-01" className="mx-auto w-full max-w-[1180px] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:break-after-page scroll-mt-24">
        <SlideHead n="01" title="Avance por módulo" subtitle="Desarrollo, casos documentados, evidencia y pendientes por módulo." />
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-[13px]">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-[0.14em] text-slate-400">
              <tr>
                <th className="py-2 pr-3 font-semibold">Módulo</th>
                <th className="px-3 py-2 font-semibold">Desarrollo</th>
                <th className="px-3 py-2 font-semibold">CPs documentados</th>
                <th className="px-3 py-2 font-semibold">Captura PDF</th>
                <th className="px-3 py-2 font-semibold">Resultado</th>
                <th className="px-3 py-2 font-semibold">Bugs abiertos</th>
                <th className="px-3 py-2 font-semibold">ACT abiertas</th>
                <th className="px-3 py-2 font-semibold">Sprint</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modulos.map((m) => (
                <tr key={m.id}>
                  <td className="py-2.5 pr-3 font-medium text-slate-700">{m.id} · {m.nombre}</td>
                  <td className="px-3 py-2.5"><span className="font-semibold text-emerald-600">100%</span></td>
                  <td className="px-3 py-2.5 text-slate-600">{m.cps}/{m.cps} <span className="text-slate-400">(v1.8)</span></td>
                  <td className="px-3 py-2.5"><span className="text-emerald-600">{m.conCaptura}/{m.cps}</span></td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-600">OK</td>
                  <td className="px-3 py-2.5 text-rose-600">{m.bugsOpen}</td>
                  <td className="px-3 py-2.5 text-violet-600">{m.act}</td>
                  <td className="px-3 py-2.5 text-slate-500">{m.sprint}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          “Desarrollo” es código implementado. “CPs documentados” es el documento de pruebas v1.8. “Evidencia” son las capturas incluidas en el PDF (61/61); “Resultado” son los CP aprobados (61/61).
        </p>
      </section>

      <section id="slide-02" className="mx-auto w-full max-w-[1180px] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:break-after-page scroll-mt-24">
        <SlideHead n="02" title="Casos de prueba por módulo" subtitle="61 CPs documentados · 61/61 con evidencia en el PDF v1.8 · 61/61 con resultado OK." />
        <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <table className="w-full text-left text-[13px]">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-[0.14em] text-slate-400">
              <tr>
                <th className="py-2 pr-3 font-semibold">Módulo</th>
                <th className="px-3 py-2 font-semibold">Casos</th>
                <th className="px-3 py-2 font-semibold">Documentados</th>
                <th className="px-3 py-2 font-semibold">Captura PDF</th>
                <th className="px-3 py-2 font-semibold">Resultado</th>
                <th className="px-3 py-2 font-semibold">Bugs</th>
                <th className="px-3 py-2 font-semibold">ACT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {modulos.map((m) => (
                <tr key={m.id}>
                  <td className="py-2.5 pr-3 text-slate-700">{m.id}</td>
                  <td className="px-3 py-2.5 font-semibold text-slate-800">{m.cps}</td>
                  <td className="px-3 py-2.5 text-emerald-600">{m.cps}/{m.cps}</td>
                  <td className="px-3 py-2.5 text-amber-600">{m.conCaptura}/{m.cps}</td>
                  <td className="px-3 py-2.5 font-semibold text-emerald-600">OK</td>
                  <td className="px-3 py-2.5 text-rose-600">{m.bugsOpen}</td>
                  <td className="px-3 py-2.5 text-violet-600">{m.act}</td>
                </tr>
              ))}
              <tr className="bg-slate-50 font-semibold text-slate-800">
                <td className="py-2.5 pr-3">Total</td>
                <td className="px-3 py-2.5">61</td>
                <td className="px-3 py-2.5 text-emerald-700">61/61</td>
                <td className="px-3 py-2.5 text-amber-700">{capturas}/61</td>
                <td className="px-3 py-2.5 font-semibold text-emerald-700">{aprobados}/61</td>
                <td className="px-3 py-2.5 text-rose-700">{bugsAbiertos}</td>
                <td className="px-3 py-2.5 text-violet-700">{actsAbiertas}</td>
              </tr>
            </tbody>
          </table>
          <div className="space-y-2.5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Casos por módulo</p>
            {modulos.map((m) => (
              <div key={m.id} className="grid grid-cols-[28px_1fr_32px] items-center gap-2">
                <span className="text-[11px] font-semibold text-slate-500">{m.id}</span>
                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-slate-800" style={{ width: `${(m.cps / maxCps) * 100}%` }} />
                </div>
                <span className="text-right text-[11px] text-slate-500">{m.cps}</span>
              </div>
            ))}
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          La barra muestra casos documentados. La columna “Captura PDF” cuenta evidencia incluida en el PDF (61/61); “Resultado” cuenta CP aprobados (61/61).
        </p>
      </section>

      <section id="slide-03" className="mx-auto w-full max-w-[1180px] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:break-after-page scroll-mt-24">
        <SlideHead n="03" title="Avance por sprint" subtitle="Cierre administrativo en OpenProject. No es avance de código." />
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[780px] text-left text-[13px]">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-[0.14em] text-slate-400">
              <tr>
                <th className="py-2 pr-3 font-semibold">Sprint</th>
                <th className="px-3 py-2 font-semibold">Fechas</th>
                <th className="px-3 py-2 font-semibold">WPs</th>
                <th className="px-3 py-2 font-semibold">Cerrados</th>
                <th className="px-3 py-2 font-semibold">Avance</th>
                <th className="px-3 py-2 font-semibold">Lectura</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {sprintRows.map((s) => (
                <tr key={s.id}>
                  <td className="py-2.5 pr-3 font-medium text-slate-700">{s.id} · {s.nombre}</td>
                  <td className="px-3 py-2.5 text-slate-500">{fecha(s.inicio)} → {fecha(s.fin)}</td>
                  <td className="px-3 py-2.5 text-slate-600">{s.total}</td>
                  <td className="px-3 py-2.5 text-slate-600">{s.cerrados}</td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><Progress value={s.opPct} tone={s.opPct === 100 ? "emerald" : "amber"} className="w-16" /><span className={s.opPct === 100 ? "font-semibold text-emerald-600" : "font-semibold text-amber-600"}>{s.opPct}%</span></div></td>
                  <td className="px-3 py-2.5 text-slate-500">{s.estado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Avance de sprint = WPs cerrados / total en OpenProject. El desarrollo de M1–M8 ya está al 100%, por eso no se usa este porcentaje para decir “código pendiente”.
        </p>
      </section>

      <section id="slide-04" className="mx-auto w-full max-w-[1180px] rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:break-after-page scroll-mt-24">
        <SlideHead n="04" title="Fases de prueba · testers" subtitle="Plan de pruebas v1.8. La evidencia está en el PDF; las observaciones del PO siguen en bugs/ACT." />
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[820px] text-left text-[13px]">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-[0.14em] text-slate-400">
              <tr>
                <th className="py-2 pr-3 font-semibold">Fase</th>
                <th className="px-3 py-2 font-semibold">Tipo</th>
                <th className="px-3 py-2 font-semibold">Módulo</th>
                <th className="px-3 py-2 font-semibold">Inicio</th>
                <th className="px-3 py-2 font-semibold">Fin</th>
                <th className="px-3 py-2 font-semibold">Avance plan</th>
                <th className="px-3 py-2 font-semibold">Evidencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {phases.map((f) => (
                <tr key={f.id}>
                  <td className="py-2.5 pr-3 font-semibold text-slate-700">{f.id}</td>
                  <td className="px-3 py-2.5 text-slate-500">{f.tipo}</td>
                  <td className="px-3 py-2.5 text-slate-600">{f.modulo}</td>
                  <td className="px-3 py-2.5 text-slate-500">{fecha(f.inicio)}</td>
                  <td className="px-3 py-2.5 text-slate-500">{fecha(f.fin)}</td>
                  <td className="px-3 py-2.5"><div className="flex items-center gap-2"><Progress value={f.avance} tone={f.avance === 100 ? "emerald" : "amber"} className="w-16" /><span className={f.avance === 100 ? "font-semibold text-emerald-600" : "font-semibold text-amber-600"}>{f.avance}%</span></div></td>
                  <td className="px-3 py-2.5"><span className={f.avance === 100 ? "text-emerald-600" : "text-amber-600"}>{f.avance === 100 ? "En PDF v1.8" : f.avance > 0 ? "Parcial" : "Pendiente"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          “Avance plan” viene del cronograma de pruebas v1.8. “Evidencia” está incluida en el PDF v1.8; las observaciones del PO se siguen en bugs/ACT.
        </p>
      </section>

      <section id="slide-05" className="mx-auto w-full max-w-[1180px] scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:break-after-page">
        <SlideHead n="05" title="Security & Quality" subtitle="OWASP ZAP, Trivy, CSP y Quality Gate dentro del pipeline." />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <Mini label="Operaciones OpenAPI ZAP" value="33 (19/14)" />
          <Mini label="Reglas IGNORE justificadas" value="4" />
          <Mini label="Comprobaciones del ejecutor" value="41" />
        </div>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">ZAP API Scan · backend</p>
            <ul className="mt-2 space-y-1 text-[12px] leading-relaxed text-slate-600">
              <li>Análisis activo con dos roles reales (SuperAdmin y Administrador).</li>
              <li>FAIL para SQLi, XSS, path traversal, RFI, RCE, XXE, XPath, EL, SSTI/SSI.</li>
              <li>WARN para 5xx, cabeceras y divulgación.</li>
              <li>4 IGNORE justificados: OAST externo (3) y Proxy Disclosure (bypass del servidor).</li>
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">ZAP Full Scan · frontend</p>
            <ul className="mt-2 space-y-1 text-[12px] leading-relaxed text-slate-600">
              <li>CSP con nonce y cabeceras duras: HSTS, X-Frame-Options, COOP/COEP/CORP.</li>
              <li>Solo GET/HEAD y páginas de error propias.</li>
              <li>La fixture de Playwright falla si hay violaciones de CSP.</li>
              <li>Trivy escanea la imagen antes del despliegue; SonarQube aplica Quality Gate.</li>
            </ul>
          </div>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Pipeline: 13 stages BCK / 11 FE, sin <code className="rounded bg-slate-100 px-1">|| true</code>, con evidencias archivadas.
          Límite declarado: ZAP excluye operaciones que consumen OCI/DeepSeek o envían correo; SSRF no está cubierto.
        </p>
      </section>

      <section id="slide-06" className="mx-auto w-full max-w-[1180px] scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:break-after-page">
        <SlideHead n="06" title="E2E & Integration" subtitle="Contrato HTTP real, flujos de negocio y UI en navegador." />
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <Mini label="Integración" value="158" />
          <Mini label="Aserciones" value="377" />
          <Mini label="E2E API" value="73" />
          <Mini label="Playwright" value="68" />
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-[12px]">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-[0.14em] text-slate-400">
              <tr>
                <th className="py-2 pr-3 font-semibold">Nivel</th>
                <th className="px-3 py-2 font-semibold">Qué comprueba</th>
                <th className="px-3 py-2 font-semibold">Herramienta</th>
                <th className="px-3 py-2 font-semibold">Magnitud</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 pr-3 font-medium text-slate-700">Integración</td>
                <td className="px-3 py-2.5 text-slate-500">Contrato HTTP real: 200, 401, 403, 422, 404, 409</td>
                <td className="px-3 py-2.5 text-slate-500">Postman + Newman</td>
                <td className="px-3 py-2.5 text-slate-700">158 peticiones · 377 aserciones</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-3 font-medium text-slate-700">E2E API</td>
                <td className="px-3 py-2.5 text-slate-500">7 flujos de negocio + cierre de datos</td>
                <td className="px-3 py-2.5 text-slate-500">Newman contra QA</td>
                <td className="px-3 py-2.5 text-slate-700">73 peticiones (A–G + Z)</td>
              </tr>
              <tr>
                <td className="py-2.5 pr-3 font-medium text-slate-700">E2E UI</td>
                <td className="px-3 py-2.5 text-slate-500">Flujos de usuario en navegador real</td>
                <td className="px-3 py-2.5 text-slate-500">Playwright 1.64.1</td>
                <td className="px-3 py-2.5 text-slate-700">68 tests · 10 specs</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          La UI usa un servicio simulado que respeta el contrato y bloquea llamadas reales; el contrato real se prueba con Newman.
          Pipeline: Integration → E2E → ZAP, sin bypass.
        </p>
      </section>

      <section id="slide-07" className="mx-auto w-full max-w-[1180px] scroll-mt-24 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm print:break-after-page">
        <SlideHead
          n="07"
          title="Cumplimiento de requisitos"
          subtitle={`${reqTotal} requisitos · ${reqCumple} cumplen · ${reqObs} con observaciones · ${reqParcial} parcial/brecha · ${reqNoVer} no verificable.`}
        />
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-blue-600">RF · 30</p>
            <p className="mt-1 text-2xl font-semibold text-blue-700">22 cumple</p>
            <p className="text-[11px] text-blue-600/80">8 con observaciones</p>
          </div>
          <div className="rounded-xl border border-violet-200 bg-violet-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-600">RN · 45</p>
            <p className="mt-1 text-2xl font-semibold text-violet-700">35 cumple</p>
            <p className="text-[11px] text-violet-600/80">7 observaciones · 1 parcial · 2 brechas</p>
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-600">RNF · 30</p>
            <p className="mt-1 text-2xl font-semibold text-amber-700">25 cumple</p>
            <p className="text-[11px] text-amber-600/80">1 brecha · 4 no verificables</p>
          </div>
        </div>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-[12px]">
            <thead className="border-b border-slate-200 text-[10px] uppercase tracking-[0.14em] text-slate-400">
              <tr>
                <th className="py-2 pr-3 font-semibold">ID</th>
                <th className="px-3 py-2 font-semibold">Requisito</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="px-3 py-2 font-semibold">Observación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reqCriticos.map((r) => (
                <tr key={r.id}>
                  <td className="py-2.5 pr-3 font-mono text-[11px] font-semibold text-slate-500">{r.id}</td>
                  <td className="max-w-[380px] px-3 py-2.5 text-slate-700">{r.titulo}</td>
                  <td className="px-3 py-2.5"><Pill tone={reqTone(r.estado)}>{r.estado}</Pill></td>
                  <td className="max-w-[360px] px-3 py-2.5 text-[11px] text-slate-500">{r.nota}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          Los 15 requisitos con observaciones están abiertos por bugs/ACT. Detalle completo en el apartado Requisitos y en TRAZABILIDAD-REQUISITOS-2026-10-29.md.
        </p>
      </section>
    </div>
  );
}

function SlideHead({ n, title, subtitle }: { n: string; title: string; subtitle: string }) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">Igualab · Control de proyecto</p>
        <h2 className="mt-1 text-2xl font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="hidden text-[10px] text-slate-400 sm:inline">Datos al {curated.meta.generadoEn}</span>
        <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-semibold text-slate-400">{n}</span>
      </div>
    </div>
  );
}

function SlideNumber({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: "emerald" | "blue" | "amber" }) {
  const colors = { emerald: "text-emerald-600 border-emerald-200 bg-emerald-50", blue: "text-blue-600 border-blue-200 bg-blue-50", amber: "text-amber-600 border-amber-200 bg-amber-50" };
  return (
    <div className={`rounded-xl border p-5 ${colors[tone]}`}>
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] opacity-70">{label}</p>
      <p className="mt-2 text-4xl font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs opacity-70">{detail}</p>
    </div>
  );
}

function ChartBar({ label, value, tone, note }: { label: string; value: number; tone: "emerald" | "blue" | "amber" | "rose" | "violet" | "slate"; note: string }) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[12px]">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="font-semibold text-slate-900">{value}%</span>
      </div>
      <Progress value={value} tone={tone} className="h-2" />
      <p className="mt-1 text-[11px] text-slate-400">{note}</p>
    </div>
  );
}

function Donut({ value, label, sublabel }: { value: number; label: string; sublabel: string }) {
  const grados = Math.max(0, Math.min(100, value)) * 3.6;
  return (
    <div className="grid place-items-center">
      <div
        className="grid h-48 w-48 place-items-center rounded-full"
        style={{ background: `conic-gradient(#7c3aed ${grados}deg, #e2e8f0 0deg)` }}
      >
        <div className="grid h-36 w-36 place-items-center rounded-full bg-white text-center shadow-inner">
          <div>
            <p className="text-4xl font-semibold text-slate-900">{value}%</p>
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">{label}</p>
          </div>
        </div>
      </div>
      <p className="mt-2 text-xs text-slate-500">{sublabel}</p>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-1 text-xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}

type WaterfallItem = {
  label: string;
  start: number;
  end: number;
  color: string;
  display: string;
};

function Waterfall({ items, max }: { items: WaterfallItem[]; max: number }) {
  return (
    <div className="space-y-2">
      {items.map((item) => {
        const left = (Math.min(item.start, item.end) / max) * 100;
        const width = (Math.abs(item.end - item.start) / max) * 100;
        return (
          <div key={item.label} className="grid grid-cols-[56px_1fr_42px] items-center gap-2">
            <span className="text-[9px] font-semibold uppercase tracking-[0.1em] text-slate-400">{item.label}</span>
            <div className="relative h-5 rounded bg-slate-100">
              <span className="absolute inset-y-0 w-px bg-slate-300" style={{ left: `${(item.start / max) * 100}%` }} />
              <span
                className="absolute inset-y-0 rounded-sm"
                style={{ left: `${left}%`, width: `${Math.max(width, 1.5)}%`, backgroundColor: item.color }}
              />
            </div>
            <span className="text-right text-[11px] font-semibold text-slate-600">{item.display}</span>
          </div>
        );
      })}
    </div>
  );
}

function reqTone(estado: string): "emerald" | "amber" | "orange" | "rose" | "slate" {
  switch (estado) {
    case "Cumple": return "emerald";
    case "Cumple con observaciones": return "amber";
    case "Parcial": return "orange";
    case "Brecha": return "rose";
    default: return "slate";
  }
}

function ReqChart() {
  const estados = [
    { key: "Cumple", label: "Cumple", color: "#10b981", bg: "bg-emerald-500" },
    { key: "Cumple con observaciones", label: "Con observaciones", color: "#f59e0b", bg: "bg-amber-500" },
    { key: "Parcial", label: "Parcial", color: "#f97316", bg: "bg-orange-500" },
    { key: "Brecha", label: "Brecha", color: "#f43f5e", bg: "bg-rose-500" },
    { key: "No verificable", label: "No verificable", color: "#94a3b8", bg: "bg-slate-400" },
  ];
  const total = requirements.length;
  const counts = (items: typeof requirements) =>
    Object.fromEntries(estados.map((e) => [e.key, items.filter((r) => r.estado === e.key).length]));
  const global = counts(requirements);
  const tipos = ["RF", "RN", "RNF"].map((tipo) => {
    const items = requirements.filter((r) => r.tipo === tipo);
    return { tipo, total: items.length, counts: counts(items) };
  });

  let start = 0;
  const gradiente = estados
    .map((e) => {
      const valor = global[e.key] ?? 0;
      const fin = start + (valor / total) * 360;
      const parte = `${e.color} ${start}deg ${fin}deg`;
      start = fin;
      return parte;
    })
    .join(", ");

  return (
    <Card className="mt-4">
      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-800">Cumplimiento de requisitos</h2>
        <p className="text-[11px] text-slate-400">Distribución por estado y por tipo. El “cumple” exige implementación + evidencia.</p>
      </div>
      <div className="grid gap-6 p-4 lg:grid-cols-[220px_1fr] lg:items-center">
        <div className="grid place-items-center">
          <div
            className="grid h-40 w-40 place-items-center rounded-full"
            style={{ background: `conic-gradient(${gradiente})` }}
          >
            <div className="grid h-28 w-28 place-items-center rounded-full bg-white text-center">
              <div>
                <p className="text-3xl font-semibold text-slate-900">{global["Cumple"]}/{total}</p>
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-400">cumplen</p>
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap justify-center gap-x-3 gap-y-1">
            {estados.map((e) => (
              <span key={e.key} className="inline-flex items-center gap-1 text-[10px] text-slate-500">
                <span className="h-2 w-2 rounded-full" style={{ background: e.color }} />
                {e.label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {tipos.map((t) => (
            <div key={t.tipo}>
              <div className="mb-1 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-slate-700">{t.tipo} · {t.total} requisitos</span>
                <span className="text-slate-400">
                  {t.counts["Cumple"]} cumplen · {t.counts["Cumple con observaciones"]} obs.
                </span>
              </div>
              <div className="flex h-3 overflow-hidden rounded-full bg-slate-100">
                {estados.map((e) => {
                  const valor = t.counts[e.key] ?? 0;
                  if (!valor) return null;
                  return (
                    <div
                      key={e.key}
                      className={e.bg}
                      style={{ width: `${(valor / t.total) * 100}%` }}
                      title={`${e.label}: ${valor}`}
                    />
                  );
                })}
              </div>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-2 pt-1 text-[10px] text-slate-500 sm:grid-cols-5">
            {estados.map((e) => (
              <div key={e.key} className="rounded-md border border-slate-100 bg-slate-50 px-2 py-1.5">
                <p className="flex items-center gap-1 font-medium text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: e.color }} />
                  {e.label}
                </p>
                <p className="mt-0.5 text-base font-semibold text-slate-800">{global[e.key] ?? 0}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

function RequirementsView({
  rows,
  total,
  type,
  setType,
  status,
  setStatus,
  module,
  setModule,
  search,
  setSearch,
  onSelect,
}: {
  rows: Req[];
  total: number;
  type: string;
  setType: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  module: string;
  setModule: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  onSelect: (r: Req) => void;
}) {
  const count = (e: string) => requirements.filter((r) => r.estado === e).length;
  const statuses = ["all", "Cumple", "Cumple con observaciones", "Parcial", "Brecha", "No verificable"];
  const modules = ["all", "M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M1–M2", "M4–M7", "M5–M6", "Transversal"];
  const criticos = requirements.filter((r) => ["Parcial", "Brecha", "No verificable"].includes(r.estado));
  return (
    <>
      <PageHeader
        eyebrow="Análisis ↔ desarrollo"
        title="Requisitos"
        description="Cruce de RN, RF y RNF con módulos, sprints, código, CP y OpenProject. No se marca “cumple” lo que no tiene evidencia."
      />
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <Stat label="Requisitos" value={total} hint="RN + RF + RNF" tone="slate" />
        <Stat label="Cumplen" value={count("Cumple")} hint="Implementados y cubiertos" tone="emerald" />
        <Stat label="Con observaciones" value={count("Cumple con observaciones")} hint="Bugs/ACT abiertas" tone="amber" />
        <Stat label="Parcial / brecha" value={count("Parcial") + count("Brecha")} hint="Requieren cambio" tone="rose" />
        <Stat label="No verificable" value={count("No verificable")} hint="Falta evidencia" tone="violet" />
      </div>

      <ReqChart />

      <Card className="mt-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-2.5">
          <div className="relative">
            <Icon name="search" className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar ID o requisito…" className="h-8 w-60 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-xs outline-none focus:bg-white" />
          </div>
          <Select value={type} onChange={setType} options={["all", "RF", "RN", "RNF"]} label="Tipo" />
          <Select value={status} onChange={setStatus} options={statuses} label="Estado" />
          <Select value={module} onChange={setModule} options={modules} label="Módulo" />
          <span className="ml-auto text-[11px] text-slate-400">{rows.length} de {total}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-[12px]">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-3 py-2 font-semibold">ID</th>
                <th className="px-3 py-2 font-semibold">Requisito</th>
                <th className="px-3 py-2 font-semibold">Tipo</th>
                <th className="px-3 py-2 font-semibold">Módulo</th>
                <th className="px-3 py-2 font-semibold">Sprint</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="px-3 py-2 font-semibold">Evidencia</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.id} onClick={() => onSelect(r)} className="cursor-pointer align-top hover:bg-slate-50">
                  <td className="px-3 py-2 font-mono text-[11px] font-semibold text-slate-500">{r.id}</td>
                  <td className="max-w-[480px] px-3 py-2">
                    <p className="font-medium text-slate-700">{r.titulo}</p>
                    {r.nota ? <p className="mt-0.5 text-[10px] text-slate-400">{r.nota}</p> : null}
                  </td>
                  <td className="px-3 py-2"><Pill tone={r.tipo === "RF" ? "blue" : r.tipo === "RN" ? "violet" : "slate"}>{r.tipo}</Pill></td>
                  <td className="px-3 py-2 text-slate-500">{r.modulo}</td>
                  <td className="px-3 py-2 text-slate-500">{r.sprint}</td>
                  <td className="px-3 py-2"><Pill tone={reqTone(r.estado)}>{r.estado}</Pill></td>
                  <td className="max-w-[260px] px-3 py-2 text-[10px] text-slate-500">{r.evidencia}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {rows.length === 0 && <Empty>No hay requisitos con esos filtros.</Empty>}
      </Card>

      <Card className="mt-4">
        <div className="border-b border-slate-100 px-4 py-3">
          <h2 className="text-sm font-semibold text-slate-800">Brechas y pendientes de evidencia</h2>
          <p className="text-[11px] text-slate-400">Lo que no se puede afirmar como “cumple” todavía.</p>
        </div>
        <div className="grid gap-2 p-3 sm:grid-cols-2">
          {criticos.map((r) => (
            <button key={r.id} onClick={() => onSelect(r)} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3 text-left hover:border-slate-200 hover:bg-white">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[11px] font-semibold text-slate-500">{r.id}</span>
                <Pill tone={reqTone(r.estado)}>{r.estado}</Pill>
              </div>
              <p className="mt-1 text-[12px] font-medium text-slate-700">{r.titulo}</p>
              <p className="mt-0.5 text-[10px] text-slate-400">{r.nota}</p>
            </button>
          ))}
        </div>
      </Card>
    </>
  );
}

type TraceIssue = {
  id: number;
  tipo: string;
  estado: string;
  asunto: string;
  creado: string | null;
  actualizado: string | null;
  sprint: string | null;
  responsable: string | null;
  modulo: string | null;
  senal: string;
  reqDirectos: string[];
  reqDesconocidos: string[];
  reqModulo: string[];
  cpsDirectos: string[];
  impacto: string;
  motivo: string;
};

type TraceReq = {
  id: string;
  tipo: string;
  titulo: string;
  estado: string;
  nota: string;
  modulo: string;
  sprint: string;
  issuesDirectos: number[];
  issuesModulo: number[];
  cps: string[];
  enCambios: boolean;
  concordancia: string | null;
  pendiente: boolean;
  accion: string;
};

type TraceUpdate = {
  origen: string;
  ref: string;
  detalle: string;
  accion: string;
  concordancia: string;
  prioridad: string;
};

type TraceData = {
  generadoEn: string;
  fuentes: Record<string, string>;
  resumen: {
    total: number;
    abiertos: number;
    cerrados: number;
    conRefDirecta: number;
    actualizarAnd: number;
    contemplado: number;
    sinRelacion: number;
    requisitosTocados: number;
    requisitosPendientes: number;
    cpsRelacionados: number;
    actualizaciones: number;
  };
  issues: TraceIssue[];
  requisitos: TraceReq[];
  actualizaciones: TraceUpdate[];
};

const traceData = traceability as unknown as TraceData;

function impactoTone(impacto: string): "rose" | "emerald" | "slate" {
  if (impacto === "actualizar-and") return "rose";
  if (impacto === "contemplado") return "emerald";
  return "slate";
}

function impactoLabel(impacto: string): string {
  if (impacto === "actualizar-and") return "Actualizar A&D";
  if (impacto === "contemplado") return "Contemplado";
  return "Sin relación";
}

function TraceView({
  onSelectReq,
  onSelectIssue,
  reqById,
}: {
  onSelectReq: (r: Req) => void;
  onSelectIssue: (w: WP) => void;
  reqById: Map<string, Req>;
}) {
  const [q, setQ] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [rango, setRango] = useState("todos");
  const [estadoSel, setEstadoSel] = useState("all");
  const [impacto, setImpacto] = useState("all");
  const [tab, setTab] = useState<"issues" | "requisitos" | "actualizaciones">("issues");
  const [reqFiltro, setReqFiltro] = useState("directos");

  const wpsById = useMemo(
    () => new Map(openproject.workPackages.map((w) => [w.id, w])),
    [],
  );

  const filtrados = useMemo(() => {
    const texto = q.trim().toLowerCase();
    return traceData.issues.filter((i) => {
      if (desde && (i.creado ?? "") < desde) return false;
      if (hasta && (i.creado ?? "") > hasta) return false;
      if (rango === "abiertos" && i.estado === "Closed") return false;
      if (rango === "cerrados" && i.estado !== "Closed") return false;
      if (estadoSel !== "all" && i.estado !== estadoSel) return false;
      if (impacto !== "all" && i.impacto !== impacto) return false;
      if (
        texto &&
        !`${i.id} ${i.asunto} ${i.responsable ?? ""} ${i.modulo ?? ""} ${i.reqDirectos.join(" ")} ${i.cpsDirectos.join(" ")}`
          .toLowerCase()
          .includes(texto)
      )
        return false;
      return true;
    });
  }, [q, desde, hasta, rango, estadoSel, impacto]);

  const reqRows = useMemo(() => {
    if (reqFiltro === "directos") return traceData.requisitos.filter((r) => r.issuesDirectos.length > 0);
    if (reqFiltro === "tocados")
      return traceData.requisitos.filter((r) => r.issuesDirectos.length > 0 || r.issuesModulo.length > 0);
    if (reqFiltro === "pendientes") return traceData.requisitos.filter((r) => r.pendiente);
    return traceData.requisitos;
  }, [reqFiltro]);

  const comparacion = useMemo(
    () => traceData.issues.filter((i) => i.impacto !== "sin-relacion"),
    [],
  );

  const res = traceData.resumen;
  const estados = useMemo(
    () => Array.from(new Set(traceData.issues.map((i) => i.estado))).sort(),
    [],
  );

  return (
    <>
      <PageHeader
        eyebrow="OpenProject ↔ A&D"
        title="Trazabilidad de issues"
        description="Todos los issues de OpenProject con su fecha de creación y estado, y la comparación contra los RN/RF/RNF y casos de prueba del análisis. Las filas en rojo son cambios que el A&D aún debe reflejar."
        actions={
          <span className="rounded-md border border-slate-200 bg-white px-2 py-1 text-[10px] text-slate-500">
            A&D: analisis_y_diseno_oficial.pdf · CP: Plan v1.8 · Sync:{" "}
            {new Date(traceData.generadoEn).toLocaleString("es-PE", { timeZone: "America/Lima" })}
          </span>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-6">
        <Stat label="Issues" value={res.total} hint="Todos los de Igualab" tone="slate" />
        <Stat label="Abiertos" value={res.abiertos} hint="Estado ≠ Closed" tone="amber" />
        <Stat label="Cerrados" value={res.cerrados} hint="Estado Closed" tone="emerald" />
        <Stat label="Ref. directa" value={res.conRefDirecta} hint="Mencionan RN/RF/RNF o CP" tone="blue" />
        <Stat label="Actualizar A&D" value={res.actualizarAnd} hint="Issues con cambio pendiente" tone="rose" />
        <Stat label="Pendientes A&D" value={res.actualizaciones} hint="Acciones de documento" tone="violet" />
      </div>

      <Card className="mt-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-2.5">
          <span className="text-[11px] font-semibold text-slate-600">1 · Issues en OpenProject</span>
          <div className="relative ml-2">
            <Icon name="search" className="pointer-events-none absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Buscar ID, asunto, RN-001, CP01…"
              className="h-8 w-56 rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-2 text-xs outline-none focus:bg-white"
            />
          </div>
          <label className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="hidden sm:inline">Desde</span>
            <input
              type="date"
              value={desde}
              onChange={(e) => setDesde(e.target.value)}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none"
            />
          </label>
          <label className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <span className="hidden sm:inline">Hasta</span>
            <input
              type="date"
              value={hasta}
              onChange={(e) => setHasta(e.target.value)}
              className="h-8 rounded-lg border border-slate-200 bg-white px-2 text-[11px] text-slate-600 outline-none"
            />
          </label>
          <div className="flex overflow-hidden rounded-lg border border-slate-200">
            {[
              { v: "todos", l: "Todos" },
              { v: "abiertos", l: "Abiertos" },
              { v: "cerrados", l: "Cerrados" },
            ].map((o) => (
              <button
                key={o.v}
                onClick={() => setRango(o.v)}
                className={`px-2.5 py-1.5 text-[11px] transition ${
                  rango === o.v ? "bg-slate-800 text-white" : "bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
          <Select
            value={estadoSel}
            onChange={setEstadoSel}
            options={["all", ...estados]}
            label="Estado"
          />
          <Select
            value={impacto}
            onChange={setImpacto}
            options={["all", "actualizar-and", "contemplado", "sin-relacion"]}
            label="A&D"
          />
          {(desde || hasta || q || rango !== "todos" || impacto !== "all" || estadoSel !== "all") && (
            <button
              onClick={() => {
                setDesde("");
                setHasta("");
                setQ("");
                setRango("todos");
                setEstadoSel("all");
                setImpacto("all");
              }}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              Limpiar
            </button>
          )}
          <span className="ml-auto text-[11px] text-slate-400">{filtrados.length} de {res.total}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1180px] text-left text-[12px]">
            <thead className="sticky top-0 bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
              <tr>
                <th className="px-3 py-2 font-semibold">ID</th>
                <th className="px-3 py-2 font-semibold">Asunto</th>
                <th className="px-3 py-2 font-semibold">Tipo</th>
                <th className="px-3 py-2 font-semibold">Estado</th>
                <th className="px-3 py-2 font-semibold">Señal</th>
                <th className="px-3 py-2 font-semibold">Módulo</th>
                <th className="px-3 py-2 font-semibold">Creado</th>
                <th className="px-3 py-2 font-semibold">RN/RF/RNF</th>
                <th className="px-3 py-2 font-semibold">CP</th>
                <th className="px-3 py-2 font-semibold">A&D</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtrados.map((i) => (
                <tr
                  key={i.id}
                  onClick={() => {
                    const wp = wpsById.get(i.id);
                    if (wp) onSelectIssue(wp);
                  }}
                  className="cursor-pointer align-top hover:bg-slate-50"
                >
                  <td className="px-3 py-2 font-mono text-[11px] font-semibold text-slate-500">#{i.id}</td>
                  <td className="max-w-[340px] px-3 py-2">
                    <p className="font-medium text-slate-700">{i.asunto}</p>
                    <p className="mt-0.5 text-[10px] text-slate-400">
                      {i.responsable ?? "Sin asignar"}
                      {i.sprint ? ` · ${i.sprint}` : ""}
                    </p>
                  </td>
                  <td className="px-3 py-2">
                    <Pill tone={typeTone(i.tipo)}>{i.tipo}</Pill>
                  </td>
                  <td className="px-3 py-2">
                    <Pill tone={statusTone(i.estado)}>{i.estado}</Pill>
                  </td>
                  <td className="max-w-[160px] px-3 py-2 text-[11px] text-slate-500">{i.senal}</td>
                  <td className="px-3 py-2 text-slate-500">{i.modulo ?? "—"}</td>
                  <td className="whitespace-nowrap px-3 py-2 text-slate-500">{fecha(i.creado)}</td>
                  <td className="px-3 py-2">
                    {i.reqDirectos.length ? (
                      <div className="flex flex-wrap gap-1">
                        {i.reqDirectos.map((r) => (
                          <span
                            key={r}
                            className={`rounded border px-1 py-0.5 font-mono text-[10px] ${
                              reqById.has(r)
                                ? "border-violet-200 bg-violet-50 text-violet-700"
                                : "border-rose-200 bg-rose-50 text-rose-600"
                            }`}
                            title={reqById.has(r) ? reqById.get(r)?.titulo : "No existe en el A&D"}
                          >
                            {r}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {i.cpsDirectos.length ? (
                      <div className="flex flex-wrap gap-1">
                        {i.cpsDirectos.map((c) => (
                          <span key={c} className="rounded border border-teal-200 bg-teal-50 px-1 py-0.5 font-mono text-[10px] text-teal-700">
                            {c}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-[11px] text-slate-300">—</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Pill tone={impactoTone(i.impacto)}>{impactoLabel(i.impacto)}</Pill>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtrados.length === 0 && <Empty>No hay issues con esos filtros.</Empty>}
      </Card>

      <Card className="mt-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-3 py-2.5">
          <span className="text-[11px] font-semibold text-slate-600">2 · Comparación con el análisis (RN/RF/RNF + CP)</span>
          <div className="ml-2 flex overflow-hidden rounded-lg border border-slate-200">
            {[
              { v: "issues", l: `Issues vs A&D (${comparacion.length})` },
              { v: "requisitos", l: `Por requisito (${res.requisitosTocados} tocados)` },
              { v: "actualizaciones", l: `Actualizar análisis (${res.actualizaciones})` },
            ].map((o) => (
              <button
                key={o.v}
                onClick={() => setTab(o.v as typeof tab)}
                className={`px-2.5 py-1.5 text-[11px] transition ${
                  tab === o.v ? "bg-slate-800 text-white" : "bg-white text-slate-500 hover:bg-slate-50"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
          {tab === "issues" && (
            <Select
              value={impacto}
              onChange={setImpacto}
              options={["all", "actualizar-and", "contemplado", "sin-relacion"]}
              label="Veredicto"
            />
          )}
          {tab === "requisitos" && (
            <Select
              value={reqFiltro}
              onChange={setReqFiltro}
              options={["directos", "tocados", "pendientes", "todos"]}
              label="Mostrar"
            />
          )}
          <span className="ml-auto text-[11px] text-slate-400">
            {tab === "issues"
              ? `${filtrados.filter((i) => i.impacto !== "sin-relacion").length} con relación`
              : tab === "requisitos"
                ? `${reqRows.length} requisitos`
                : `${traceData.actualizaciones.length} acciones`}
          </span>
        </div>

        {tab === "issues" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px] text-left text-[12px]">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-semibold">Issue</th>
                  <th className="px-3 py-2 font-semibold">Estado</th>
                  <th className="px-3 py-2 font-semibold">Señal</th>
                  <th className="px-3 py-2 font-semibold">Requisitos</th>
                  <th className="px-3 py-2 font-semibold">CP</th>
                  <th className="px-3 py-2 font-semibold">Veredicto</th>
                  <th className="px-3 py-2 font-semibold">Por qué</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtrados
                  .filter((i) => i.impacto !== "sin-relacion")
                  .map((i) => (
                    <tr
                      key={i.id}
                      onClick={() => {
                        const wp = wpsById.get(i.id);
                        if (wp) onSelectIssue(wp);
                      }}
                      className="cursor-pointer align-top hover:bg-slate-50"
                    >
                      <td className="max-w-[300px] px-3 py-2">
                        <p className="font-mono text-[10px] text-slate-400">#{i.id}</p>
                        <p className="font-medium text-slate-700">{i.asunto}</p>
                        <p className="mt-0.5 text-[10px] text-slate-400">{i.modulo ?? "Sin módulo"} · {fecha(i.creado)}</p>
                      </td>
                      <td className="px-3 py-2">
                        <Pill tone={statusTone(i.estado)}>{i.estado}</Pill>
                      </td>
                      <td className="max-w-[150px] px-3 py-2 text-[11px] text-slate-500">{i.senal}</td>
                      <td className="px-3 py-2">
                        <div className="flex flex-wrap gap-1">
                          {[...i.reqDirectos, ...i.reqDesconocidos.filter((r) => !i.reqDirectos.includes(r))].map((r) => (
                            <span
                              key={r}
                              className={`cursor-pointer rounded border px-1 py-0.5 font-mono text-[10px] ${
                                reqById.has(r)
                                  ? "border-violet-200 bg-violet-50 text-violet-700 hover:bg-violet-100"
                                  : "border-rose-200 bg-rose-50 text-rose-600"
                              }`}
                              onClick={(e) => {
                                e.stopPropagation();
                                const req = reqById.get(r);
                                if (req) onSelectReq(req);
                              }}
                            >
                              {r}
                            </span>
                          ))}
                          {!i.reqDirectos.length && i.reqModulo.length ? (
                            <span className="text-[10px] text-slate-400">
                              implícitos por módulo: {i.reqModulo.slice(0, 4).join(", ")}
                              {i.reqModulo.length > 4 ? ` +${i.reqModulo.length - 4}` : ""}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-3 py-2">
                        {i.cpsDirectos.length ? i.cpsDirectos.join(", ") : <span className="text-slate-300">—</span>}
                      </td>
                      <td className="px-3 py-2">
                        <Pill tone={impactoTone(i.impacto)}>{impactoLabel(i.impacto)}</Pill>
                      </td>
                      <td className="max-w-[320px] px-3 py-2 text-[11px] leading-relaxed text-slate-500">{i.motivo}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            {filtrados.filter((i) => i.impacto !== "sin-relacion").length === 0 && (
              <Empty>Ningún issue con esos filtros toca requisitos del A&D.</Empty>
            )}
          </div>
        )}

        {tab === "requisitos" && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-[12px]">
              <thead className="bg-slate-50 text-[10px] uppercase tracking-[0.12em] text-slate-400">
                <tr>
                  <th className="px-3 py-2 font-semibold">Requisito</th>
                  <th className="px-3 py-2 font-semibold">Tipo</th>
                  <th className="px-3 py-2 font-semibold">Módulo</th>
                  <th className="px-3 py-2 font-semibold">Estado A&D</th>
                  <th className="px-3 py-2 font-semibold">Issues directos</th>
                  <th className="px-3 py-2 font-semibold">Issues del módulo</th>
                  <th className="px-3 py-2 font-semibold">CP</th>
                  <th className="px-3 py-2 font-semibold">Acción sobre el análisis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {reqRows.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => {
                      const req = reqById.get(r.id);
                      if (req) onSelectReq(req);
                    }}
                    className="cursor-pointer align-top hover:bg-slate-50"
                  >
                    <td className="max-w-[280px] px-3 py-2">
                      <p className="font-mono text-[10px] text-slate-400">{r.id}</p>
                      <p className="font-medium text-slate-700">{r.titulo}</p>
                    </td>
                    <td className="px-3 py-2">
                      <Pill tone={r.tipo === "RF" ? "blue" : r.tipo === "RN" ? "violet" : "slate"}>{r.tipo}</Pill>
                    </td>
                    <td className="px-3 py-2 text-slate-500">{r.modulo}</td>
                    <td className="px-3 py-2">
                      <Pill tone={reqTone(r.estado)}>{r.estado}</Pill>
                      {r.enCambios ? (
                        <span className="mt-1 block text-[10px] font-medium text-rose-500">{r.concordancia}</span>
                      ) : null}
                    </td>
                    <td className="px-3 py-2">
                      {r.issuesDirectos.length ? (
                        <div className="flex flex-wrap gap-1">
                          {r.issuesDirectos.map((id) => (
                            <span
                              key={id}
                              onClick={(e) => {
                                e.stopPropagation();
                                const wp = wpsById.get(id);
                                if (wp) onSelectIssue(wp);
                              }}
                              className="cursor-pointer rounded border border-slate-200 bg-slate-50 px-1 py-0.5 font-mono text-[10px] text-slate-600 hover:bg-slate-100"
                            >
                              #{id}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-3 py-2 text-[11px] text-slate-400">
                      {r.issuesModulo.length ? `${r.issuesModulo.length} implícitos` : "—"}
                    </td>
                    <td className="px-3 py-2 text-[11px] text-slate-500">
                      {r.cps.length ? r.cps.slice(0, 6).join(", ") + (r.cps.length > 6 ? ` +${r.cps.length - 6}` : "") : "—"}
                    </td>
                    <td className="max-w-[300px] px-3 py-2 text-[11px] leading-relaxed">
                      <span className={r.pendiente ? "font-medium text-rose-600" : "text-slate-500"}>{r.accion}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {reqRows.length === 0 && <Empty>No hay requisitos con ese filtro.</Empty>}
          </div>
        )}

        {tab === "actualizaciones" && (
          <div className="grid gap-2 p-3 sm:grid-cols-2 xl:grid-cols-3">
            {traceData.actualizaciones.map((a, idx) => (
              <div key={`${a.ref}-${idx}`} className="rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-mono text-[11px] font-semibold text-slate-600">{a.ref}</span>
                  <div className="flex items-center gap-1">
                    <Pill tone={a.prioridad === "Alta" ? "rose" : a.prioridad === "Media" ? "amber" : "slate"}>
                      {a.prioridad}
                    </Pill>
                    <Pill tone="violet">{a.origen}</Pill>
                  </div>
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-600">{a.detalle}</p>
                <p className="mt-2 rounded-md border border-amber-100 bg-amber-50 px-2 py-1.5 text-[11px] font-medium leading-relaxed text-amber-800">
                  {a.accion}
                </p>
              </div>
            ))}
          </div>
        )}
      </Card>
    </>
  );
}

function ReqDrawer({ req, onClose }: { req: Req; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30" onClick={onClose}>
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-slate-400">{req.id}</span>
              <Pill tone={req.tipo === "RF" ? "blue" : req.tipo === "RN" ? "violet" : "slate"}>{req.tipo}</Pill>
              <Pill tone={reqTone(req.estado)}>{req.estado}</Pill>
            </div>
            <h2 className="mt-1 text-base font-semibold text-slate-900">{req.titulo}</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"><Icon name="close" className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 px-5 py-4 text-[12px]">
          <Meta label="Módulo" value={req.modulo} />
          <Meta label="Sprint" value={req.sprint} />
          <Meta label="Categoría" value={req.categoria} />
          <Meta label="Prioridad" value={req.prioridad || "—"} />
        </div>
        <div className="border-t border-slate-100 px-5 py-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Evidencia</p>
          <p className="text-[12px] leading-relaxed text-slate-600">{req.evidencia}</p>
        </div>
        <div className="border-t border-slate-100 px-5 py-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Observación</p>
          <p className="text-[12px] leading-relaxed text-slate-600">{req.nota || "Sin observaciones."}</p>
        </div>
        <div className="border-t border-slate-100 px-5 py-4 text-[11px] leading-relaxed text-slate-400">
          Fuente: A&D vigente + código `BCK@8bcbabe`/`FE@1d36b8a` + casos de prueba v1.8 + OpenProject.
        </div>
      </div>
    </div>
  );
}

function TaskDrawer({ wp, onClose }: { wp: WP; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30" onClick={onClose}>
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-slate-400">#{wp.id}</span>
              <Pill tone={typeTone(wp.tipo)}>{wp.tipo}</Pill>
              <Pill tone={statusTone(wp.estado)}>{wp.estado}</Pill>
            </div>
            <h2 className="mt-1 text-base font-semibold text-slate-900">{wp.asunto}</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"><Icon name="close" className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 px-5 py-4 text-[12px]">
          <Meta label="Sprint" value={wp.sprint ?? "Sin sprint"} />
          <Meta label="Responsable" value={wp.responsable ?? "Sin asignar"} />
          <Meta label="Módulo" value={moduleOf(wp)} />
          <Meta label="Padre" value={wp.padre ?? "—"} />
          <Meta label="Inicio" value={fecha(wp.inicio)} />
          <Meta label="Fin" value={fecha(wp.fin)} />
          <Meta label="Creado" value={fechaHora(wp.creado)} />
          <Meta label="Actualizado" value={fechaHora(wp.actualizado)} />
        </div>
        <div className="border-t border-slate-100 px-5 py-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Descripción</p>
          <div className="whitespace-pre-wrap text-[12px] leading-relaxed text-slate-600">
            {wp.descripcion?.trim() ? wp.descripcion : "Sin descripción en OpenProject."}
          </div>
        </div>
        <div className="border-t border-slate-100 px-5 py-4">
          <a href={`https://openproject.ingsoftware.lat/work_packages/${wp.id}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            Abrir en OpenProject <Icon name="external" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}

function CpDrawer({ cp, onClose }: { cp: CP; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/30" onClick={onClose}>
      <div className="h-full w-full max-w-lg overflow-y-auto bg-white shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 flex items-start justify-between gap-3 border-b border-slate-100 bg-white px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-slate-400">{cp.cp}</span>
              <Pill tone="emerald">v{cp.version}</Pill>
              <Pill tone="amber">{cp.estado}</Pill>
            </div>
            <h2 className="mt-1 text-base font-semibold text-slate-900">{cp.titulo}</h2>
          </div>
          <button onClick={onClose} className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"><Icon name="close" className="h-4 w-4" /></button>
        </div>
        <div className="grid grid-cols-2 gap-3 px-5 py-4 text-[12px]">
          <Meta label="Módulo" value={cp.modulo} />
          <Meta label="Documento" value={`v${cp.version} (21/10/2026)`} />
          <Meta label="Entorno" value={cp.entorno ?? "—"} />
          <Meta label="Resultado" value={cp.resultado ?? "—"} />
          <Meta label="Responsable" value={cp.responsable ?? "—"} />
          <Meta label="Evidencia" value={cp.evidencia ?? "Pendiente"} />
        </div>
        <div className="border-t border-slate-100 px-5 py-4 text-[12px] leading-relaxed text-slate-600">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">Cómo archivar la evidencia</p>
          <p>1. La evidencia principal ya está en el PDF v1.8; si agregas una captura, guárdala en la carpeta indicada.</p>
          <p>2. Guarda la captura en <code className="rounded bg-slate-100 px-1">03-Calidad/03-Evidencias/01-Pruebas-Manuales/</code>.</p>
          <p>3. Nombra: <code className="rounded bg-slate-100 px-1">{cp.cp}_{cp.modulo}_uat_2026-10-29_pass.png</code>.</p>
          <p>4. Actualiza <code className="rounded bg-slate-100 px-1">00-REGISTRO-EVIDENCIAS.md</code>.</p>
        </div>
      </div>
    </div>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{label}</p>
      <p className="mt-0.5 text-[12px] text-slate-600">{value}</p>
    </div>
  );
}
