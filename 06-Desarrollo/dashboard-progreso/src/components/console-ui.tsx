import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)] ${className}`}>
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  actions,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? (
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">{eyebrow}</p>
        ) : null}
        <h1 className="mt-0.5 text-xl font-semibold tracking-tight text-slate-900">{title}</h1>
        {description ? <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-500">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function Stat({
  label,
  value,
  suffix,
  hint,
  tone = "slate",
}: {
  label: string;
  value: string | number;
  suffix?: string;
  hint?: string;
  tone?: "emerald" | "blue" | "amber" | "rose" | "violet" | "slate";
}) {
  const tones: Record<string, string> = {
    emerald: "text-emerald-600",
    blue: "text-blue-600",
    amber: "text-amber-600",
    rose: "text-rose-600",
    violet: "text-violet-600",
    slate: "text-slate-900",
  };
  return (
    <Card className="px-4 py-3">
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className={`mt-1 text-2xl font-semibold tracking-tight ${tones[tone]}`}>
        {value}
        {suffix ? <span className="text-sm text-slate-400">{suffix}</span> : null}
      </p>
      {hint ? <p className="mt-0.5 text-[11px] text-slate-400">{hint}</p> : null}
    </Card>
  );
}

export function Progress({
  value,
  tone = "emerald",
  className = "",
}: {
  value: number;
  tone?: "emerald" | "blue" | "amber" | "rose" | "violet" | "slate";
  className?: string;
}) {
  const tones: Record<string, string> = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    violet: "bg-violet-500",
    slate: "bg-slate-500",
  };
  return (
    <div className={`h-1.5 overflow-hidden rounded-full bg-slate-100 ${className}`}>
      <div
        className={`h-full rounded-full ${tones[tone]}`}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function Pill({
  children,
  tone = "slate",
  className = "",
}: {
  children: ReactNode;
  tone?: "emerald" | "blue" | "amber" | "rose" | "violet" | "slate" | "teal" | "orange";
  className?: string;
}) {
  const tones: Record<string, string> = {
    emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
    rose: "border-rose-200 bg-rose-50 text-rose-700",
    violet: "border-violet-200 bg-violet-50 text-violet-700",
    slate: "border-slate-200 bg-slate-50 text-slate-600",
    teal: "border-teal-200 bg-teal-50 text-teal-700",
    orange: "border-orange-200 bg-orange-50 text-orange-700",
  };
  return (
    <span className={`inline-flex items-center whitespace-nowrap rounded-md border px-1.5 py-0.5 text-[11px] font-medium ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function statusTone(status: string): "emerald" | "blue" | "amber" | "rose" | "violet" | "slate" | "teal" | "orange" {
  switch (status) {
    case "Closed":
      return "emerald";
    case "Developed":
      return "blue";
    case "In progress":
      return "amber";
    case "In testing":
      return "violet";
    case "Tested":
      return "teal";
    case "Test failed":
      return "rose";
    case "Rejected":
      return "rose";
    default:
      return "slate";
  }
}

export function typeTone(type: string): "rose" | "blue" | "slate" | "violet" {
  switch (type) {
    case "Bug":
      return "rose";
    case "Feature":
      return "blue";
    case "User story":
      return "violet";
    default:
      return "slate";
  }
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="px-4 py-10 text-center text-sm text-slate-400">{children}</div>;
}
