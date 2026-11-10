import type { ReactNode } from "react";

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-white/[0.04] p-5 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-5">
      {eyebrow ? (
        <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-emerald-300/80">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-1 max-w-3xl text-sm leading-relaxed text-slate-400">
          {description}
        </p>
      ) : null}
    </div>
  );
}

export function Kpi({
  label,
  value,
  suffix,
  hint,
  tone = "emerald",
}: {
  label: string;
  value: string | number;
  suffix?: string;
  hint?: string;
  tone?: "emerald" | "sky" | "amber" | "rose" | "violet" | "slate";
}) {
  const tones: Record<string, string> = {
    emerald: "from-emerald-400/20 to-transparent text-emerald-300",
    sky: "from-sky-400/20 to-transparent text-sky-300",
    amber: "from-amber-400/20 to-transparent text-amber-300",
    rose: "from-rose-400/20 to-transparent text-rose-300",
    violet: "from-violet-400/20 to-transparent text-violet-300",
    slate: "from-slate-400/20 to-transparent text-slate-300",
  };
  return (
    <Card className="relative overflow-hidden">
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b ${tones[tone]} opacity-70`}
      />
      <p className="relative text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
        {label}
      </p>
      <p className="relative mt-2 text-3xl font-semibold tracking-tight text-white">
        {value}
        {suffix ? <span className="text-lg text-slate-400">{suffix}</span> : null}
      </p>
      {hint ? <p className="relative mt-1 text-xs text-slate-400">{hint}</p> : null}
    </Card>
  );
}

export function ProgressBar({
  value,
  tone = "emerald",
  label,
}: {
  value: number;
  tone?: "emerald" | "sky" | "amber" | "rose" | "violet" | "slate";
  label?: string;
}) {
  const tones: Record<string, string> = {
    emerald: "bg-emerald-400",
    sky: "bg-sky-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    violet: "bg-violet-400",
    slate: "bg-slate-400",
  };
  return (
    <div>
      {label ? (
        <div className="mb-1 flex items-center justify-between text-xs text-slate-400">
          <span>{label}</span>
          <span className="font-semibold text-slate-200">{value}%</span>
        </div>
      ) : null}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full rounded-full ${tones[tone]} transition-all`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}

export function Badge({
  children,
  tone = "slate",
}: {
  children: ReactNode;
  tone?: "emerald" | "sky" | "amber" | "rose" | "violet" | "slate";
}) {
  const tones: Record<string, string> = {
    emerald: "border-emerald-400/30 bg-emerald-400/10 text-emerald-200",
    sky: "border-sky-400/30 bg-sky-400/10 text-sky-200",
    amber: "border-amber-400/30 bg-amber-400/10 text-amber-200",
    rose: "border-rose-400/30 bg-rose-400/10 text-rose-200",
    violet: "border-violet-400/30 bg-violet-400/10 text-violet-200",
    slate: "border-white/15 bg-white/5 text-slate-300",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
