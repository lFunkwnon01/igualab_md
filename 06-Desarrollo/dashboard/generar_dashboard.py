#!/usr/bin/env python3
"""
Generador del tablero de avance de OpenProject (proyecto Igualab).

Lee las credenciales de .env (misma carpeta), consulta la API v3 de
OpenProject, calcula metricas de avance y escribe un HTML autocontenido
(avance.html) con todos los datos embebidos.

Uso:
    python3 generar_dashboard.py

Credenciales (.env, NO versionado):
    OP_URL=https://openproject.ingsoftware.lat
    OP_PROJECT=igualab
    OP_KEY=opapi-...
"""

import json
import os
import sys
import urllib.request
import urllib.error
from datetime import date, datetime
from pathlib import Path

HERE = Path(__file__).resolve().parent
OUT_HTML = HERE / "avance.html"


def load_env():
    env = {}
    f = HERE / ".env"
    if f.exists():
        for line in f.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            k, v = line.split("=", 1)
            env[k.strip()] = v.strip().strip('"').strip("'")
    for k in ("OP_URL", "OP_PROJECT", "OP_KEY"):
        if os.environ.get(k):
            env[k] = os.environ[k]
    return env


ENV = load_env()
OP_URL = ENV.get("OP_URL", "https://openproject.ingsoftware.lat").rstrip("/")
OP_PROJECT = ENV.get("OP_PROJECT", "igualab")
OP_KEY = ENV.get("OP_KEY", "")

if not OP_KEY:
    sys.exit("ERROR: falta OP_KEY en .env")


def api(path):
    req = urllib.request.Request(OP_URL + path, headers={"Authorization": "Bearer " + OP_KEY})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def link_title(el, name):
    l = el.get("_links", {}).get(name)
    return l.get("title") if isinstance(l, dict) else None


def link_id(el, name):
    l = el.get("_links", {}).get(name)
    if isinstance(l, dict) and l.get("href"):
        raw = l["href"].rstrip("/").split("/")[-1]
        return int(raw) if raw.isdigit() else raw
    return None


# ---------------------------------------------------------------- fetch
def fetch():
    project = api(f"/api/v3/projects/{OP_PROJECT}")
    versions = api(f"/api/v3/projects/{OP_PROJECT}/versions")["_embedded"]["elements"]
    statuses = api("/api/v3/statuses")["_embedded"]["elements"]

    wps = []
    offset = 0
    while True:
        data = api(f"/api/v3/projects/{OP_PROJECT}/work_packages?pageSize=200&offset={offset}")
        wps.extend(data["_embedded"]["elements"])
        if len(wps) >= data["total"]:
            break
        offset += 200
    return project, versions, statuses, wps


project, versions, statuses, wps = fetch()

status_info = {}
for s in statuses:
    status_info[s["name"]] = {
        "closed": bool(s.get("isClosed")),
        "done": s.get("defaultDoneRatio") or 0,
        "id": s["id"],
    }

STATUS_COLORS = {
    "New": "#64748b",
    "In specification": "#0ea5e9",
    "Specified": "#38bdf8",
    "Confirmed": "#6366f1",
    "To be scheduled": "#8b5cf6",
    "Scheduled": "#a855f7",
    "In progress": "#f59e0b",
    "Developed": "#eab308",
    "In testing": "#fb923c",
    "Tested": "#22c55e",
    "Test failed": "#ef4444",
    "Closed": "#10b981",
    "On hold": "#94a3b8",
    "Rejected": "#6b7280",
}


def parse_wp(e):
    name = link_title(e, "status") or "New"
    info = status_info.get(name, {"closed": False, "done": 0})
    pd = e.get("percentageDone")
    done = pd if pd is not None else info["done"]
    return {
        "id": e["id"],
        "subject": e.get("subject"),
        "type": link_title(e, "type"),
        "status": name,
        "closed": info["closed"],
        "done": done,
        "assignee": link_title(e, "assignee"),
        "version": link_title(e, "version"),
        "versionId": link_id(e, "version"),
        "parentId": link_id(e, "parent"),
        "startDate": e.get("startDate"),
        "dueDate": e.get("dueDate"),
    }


items = [parse_wp(e) for e in wps]
by_id = {it["id"]: it for it in items}
parent_ids = {it["parentId"] for it in items if it["parentId"]}
leaves = [it for it in items if it["id"] not in parent_ids]


def avg_done(group):
    if not group:
        return 0.0
    return round(sum(x["done"] for x in group) / len(group), 1)


# ---------------------------------------------------------------- overall
total_wps = len(items)
total_leaves = len(leaves)
closed = [x for x in leaves if x["closed"]]
in_prog = [x for x in leaves if not x["closed"] and x["done"] > 0]
not_started = [x for x in leaves if not x["closed"] and x["done"] == 0]

overall_real = avg_done(leaves)
closed_pct = round(len(closed) / total_leaves * 100, 1) if total_leaves else 0.0

# ---------------------------------------------------------------- cronograma
def d(s):
    return datetime.strptime(s, "%Y-%m-%d").date() if s else None


starts = [d(v.get("startDate")) for v in versions if v.get("startDate")]
ends = [d(v.get("endDate")) for v in versions if v.get("endDate")]
proj_start = min(starts) if starts else date.today()
proj_end = max(ends) if ends else date.today()
today = date.today()
span = (proj_end - proj_start).days or 1
planned = round(max(0, min(100, (today - proj_start).days / span * 100)), 1)
days_left = (proj_end - today).days

# ---------------------------------------------------------------- sprints
version_by_id = {str(v["id"]): v for v in versions}
sprints = []
for v in sorted(versions, key=lambda x: x["id"]):
    vs = [x for x in leaves if x["versionId"] == v["id"]]
    vclosed = [x for x in vs if x["closed"]]
    s_start, s_end = d(v.get("startDate")), d(v.get("endDate"))
    tpct = 0.0
    if s_start and s_end and (s_end - s_start).days:
        tpct = round(max(0, min(100, (today - s_start).days / (s_end - s_start).days * 100)), 1)
    prog = avg_done(vs)
    state = "cerrado" if (vs and len(vclosed) == len(vs)) else ("en_curso" if prog > 0 else "sin_iniciar")
    sprints.append({
        "id": v["id"],
        "name": v.get("name"),
        "start": v.get("startDate"),
        "end": v.get("endDate"),
        "total": len(vs),
        "closed": len(vclosed),
        "progress": prog,
        "timePct": tpct,
        "state": state,
    })

# ---------------------------------------------------------------- modules
modules = []
for it in items:
    if it["parentId"]:
        continue
    children = [x for x in items if x["parentId"] == it["id"]]
    group = children if children else [it]
    prog = avg_done(group)
    all_closed = all(x["closed"] for x in group)
    state = "cerrado" if all_closed else ("en_curso" if prog > 0 else "sin_iniciar")
    owner = it["assignee"] or next((x["assignee"] for x in group if x["assignee"]), None)
    modules.append({
        "id": it["id"],
        "name": it["subject"],
        "type": it["type"],
        "sprint": it["version"],
        "total": len(group),
        "closed": sum(1 for x in group if x["closed"]),
        "progress": prog,
        "state": state,
        "owner": owner,
    })

total_modules = len(modules)
closed_modules = sum(1 for m in modules if m["state"] == "cerrado")
modules_closed_pct = round(closed_modules / total_modules * 100, 1) if total_modules else 0.0

# ---------------------------------------------------------------- status dist
status_counts = {}
for x in leaves:
    status_counts[x["status"]] = status_counts.get(x["status"], 0) + 1
status_dist = [
    {
        "name": k,
        "count": v,
        "pct": round(v / total_leaves * 100, 1) if total_leaves else 0,
        "color": STATUS_COLORS.get(k, "#64748b"),
        "closed": status_info.get(k, {}).get("closed", False),
    }
    for k, v in sorted(status_counts.items(), key=lambda kv: -kv[1])
]

# ---------------------------------------------------------------- people
people = {}
for x in leaves:
    name = x["assignee"] or "Sin asignar"
    p = people.setdefault(name, {"name": name, "total": 0, "closed": 0, "sum": 0})
    p["total"] += 1
    p["sum"] += x["done"]
    if x["closed"]:
        p["closed"] += 1
people_list = sorted(
    [{**p, "progress": round(p["sum"] / p["total"], 1)} for p in people.values()],
    key=lambda x: -x["progress"],
)

# ---------------------------------------------------------------- by type
type_counts = {}
for x in leaves:
    t = x["type"] or "—"
    c = type_counts.setdefault(t, {"name": t, "total": 0, "closed": 0, "sum": 0})
    c["total"] += 1
    c["sum"] += x["done"]
    if x["closed"]:
        c["closed"] += 1
type_list = sorted(
    [{**c, "progress": round(c["sum"] / c["total"], 1)} for c in type_counts.values()],
    key=lambda x: -x["progress"],
)

DATA = {
    "generatedAt": datetime.now().strftime("%Y-%m-%d %H:%M"),
    "project": {"name": project.get("name"), "identifier": project.get("identifier")},
    "overall": {
        "real": overall_real,
        "planned": planned,
        "closedPct": closed_pct,
        "modulesClosedPct": modules_closed_pct,
        "closedModules": closed_modules,
        "totalModules": total_modules,
        "totalWps": total_wps,
        "totalLeaves": total_leaves,
        "closed": len(closed),
        "inProgress": len(in_prog),
        "notStarted": len(not_started),
        "start": proj_start.isoformat(),
        "end": proj_end.isoformat(),
        "today": today.isoformat(),
        "daysLeft": days_left,
    },
    "sprints": sprints,
    "modules": modules,
    "statuses": status_dist,
    "people": people_list,
    "types": type_list,
}

# ---------------------------------------------------------------- render
template = (HERE / "template.html").read_text(encoding="utf-8")
html = template.replace("/*__DATA__*/", json.dumps(DATA, ensure_ascii=False))
OUT_HTML.write_text(html, encoding="utf-8")

print(f"OK -> {OUT_HTML}")
print(f"   avance real: {overall_real}% | cronograma: {planned}% | "
      f"cerrados: {len(closed)}/{total_leaves} | módulos cerrados: {closed_modules}/{total_modules}")
