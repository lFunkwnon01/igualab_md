"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const tooltipStyle = {
  background: "#0b1220",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  color: "#e2e8f0",
  fontSize: 12,
};

export function GlobalRadial({ value }: { value: number }) {
  const grados = Math.max(0, Math.min(100, value)) * 3.6;
  return (
    <div className="mx-auto grid h-44 w-44 place-items-center rounded-full"
      style={{
        background: `conic-gradient(#34d399 ${grados}deg, rgba(255,255,255,0.08) 0deg)`,
      }}
    >
      <div className="grid h-32 w-32 place-items-center rounded-full bg-[#0b1220]">
        <div className="text-center">
          <p className="text-3xl font-semibold text-white">{value}%</p>
          <p className="text-[10px] uppercase tracking-[0.18em] text-slate-500">global</p>
        </div>
      </div>
    </div>
  );
}

export function SprintBars({
  data,
}: {
  data: { id: string; codigo: number; openproject: number; pruebas: number }[];
}) {
  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey="id" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
          <Bar dataKey="codigo" name="Código" fill="#34d399" radius={[6, 6, 0, 0]} />
          <Bar dataKey="openproject" name="OpenProject cerrado" fill="#38bdf8" radius={[6, 6, 0, 0]} />
          <Bar dataKey="pruebas" name="Pruebas (estimado)" fill="#fbbf24" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

const BUG_COLORS: Record<string, string> = {
  New: "#fb7185",
  "In progress": "#fbbf24",
  "In testing": "#a78bfa",
  Developed: "#38bdf8",
  Closed: "#34d399",
};

export function BugsDonut({ data }: { data: { name: string; value: number }[] }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius={62} outerRadius={92} paddingAngle={3}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={BUG_COLORS[entry.name] ?? "#64748b"} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip contentStyle={tooltipStyle} />
          <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export function TestingBars({
  data,
}: {
  data: { name: string; value: number; fill: string }[];
}) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 4, right: 16, left: 8, bottom: 4 }}>
          <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
          <XAxis type="number" domain={[0, 100]} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" width={118} tick={{ fill: "#cbd5e1", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="value" radius={[0, 8, 8, 0]}>
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
