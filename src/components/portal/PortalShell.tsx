import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  Clock3,
  FileText,
  FolderGit2,
  LayoutDashboard,
  LogOut,
  Search,
  UsersRound,
  Wifi,
} from "lucide-react";
import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  to: "/dashboard" | "/my-time" | "/clients" | "/projects" | "/invoices";
  icon: typeof LayoutDashboard;
};

const navItems: NavItem[] = [
  { label: "Dashboard ejecutivo", to: "/dashboard", icon: LayoutDashboard },
  { label: "Mi tiempo", to: "/my-time", icon: Clock3 },
  { label: "Clientes", to: "/clients", icon: UsersRound },
  { label: "Proyectos", to: "/projects", icon: FolderGit2 },
  { label: "Facturación", to: "/invoices", icon: FileText },
];

export function PortalShell({
  active,
  title,
  subtitle,
  children,
  action,
}: {
  active: NavItem["to"];
  title: string;
  subtitle: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background font-sans text-foreground antialiased">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col border-r border-line bg-surface/80 px-4 py-5 md:flex">
          <Link to="/dashboard" className="flex items-center gap-2.5 px-2">
            <div className="grid size-9 place-items-center rounded-xl bg-clay text-primary-foreground shadow-[var(--shadow-clay)]">
              <span className="font-mono text-sm font-bold">N</span>
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight">Nexo</p>
              <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                Portal IT·Fin
              </p>
            </div>
          </Link>

          <nav className="mt-7 space-y-1">
            <p className="px-3 pb-1 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Espacio
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.to === active;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                    isActive
                      ? "bg-clay-soft font-semibold text-clay ring-1 ring-clay/15"
                      : "font-medium text-muted-foreground hover:bg-background hover:text-foreground",
                  )}
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto space-y-3">
            <div className="rounded-2xl bg-clay-soft p-3 ring-1 ring-clay/10">
              <p className="font-mono text-[10px] uppercase tracking-wider text-clay">Telemetría</p>
              <p className="mt-1 text-xs text-foreground/70">12 repos conectados · sync 09:42</p>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl border border-line bg-surface p-2.5">
              <div className="grid size-8 place-items-center rounded-full bg-viol-soft font-mono text-xs font-bold text-viol">
                AR
              </div>
              <div className="leading-tight">
                <p className="text-xs font-semibold">Ana Ríos</p>
                <p className="font-mono text-[10px] text-muted-foreground">admin · finanzas</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-line bg-background/85 px-4 py-3.5 backdrop-blur-sm sm:px-6">
            <div>
              <h1 className="text-lg font-bold tracking-tight">{title}</h1>
              <p className="font-mono text-[11px] text-muted-foreground">{subtitle}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-2 rounded-xl border border-line bg-surface px-3 py-2 sm:flex">
                <span className="size-1.5 rounded-full bg-accent" />
                <span className="font-mono text-[11px] text-muted-foreground">Telemetría en vivo</span>
              </div>
              {action}
              <Button asChild variant="ghost" size="icon" aria-label="Cerrar sesión">
                <Link to="/login">
                  <LogOut />
                </Link>
              </Button>
            </div>
          </header>
          <div className="space-y-5 p-4 sm:p-6">{children}</div>
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid grid-cols-5 border-t border-line bg-surface/95 px-2 py-2 backdrop-blur md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.to === active;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-medium",
                isActive ? "bg-clay-soft text-clay" : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
              <span className="max-w-full truncate">{item.label.replace(" ejecutivo", "")}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export function SearchField({ placeholder = "Buscar" }: { placeholder?: string }) {
  return (
    <div className="flex h-9 min-w-0 items-center gap-2 rounded-xl border border-line bg-surface px-3 text-sm text-muted-foreground">
      <Search className="size-4 shrink-0" />
      <span className="truncate font-mono text-[11px]">{placeholder}</span>
    </div>
  );
}

export function StatusDot({ tone = "accent" }: { tone?: "accent" | "amber" | "rose" | "clay" }) {
  const toneClass = {
    accent: "bg-accent",
    amber: "bg-amberc",
    rose: "bg-rosec",
    clay: "bg-clay",
  }[tone];
  return <span className={cn("size-1.5 rounded-full", toneClass)} />;
}

export function LiveSyncPill() {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] font-medium text-accent">
      <Wifi className="size-3" />
      Auto-sync
    </span>
  );
}

export function KpiCard({
  label,
  value,
  detail,
  tone = "accent",
  delay = "0ms",
}: {
  label: string;
  value: string;
  detail: string;
  tone?: "accent" | "amber" | "muted";
  delay?: string;
}) {
  const detailClass = tone === "accent" ? "text-accent" : tone === "amber" ? "text-amberc" : "text-muted-foreground";
  return (
    <div
      className="rounded-2xl bg-surface p-4 ring-1 ring-border/70 animate-[rise_0.5s_var(--ease)_both]"
      style={{ animationDelay: delay }}
    >
      <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className="mt-2 font-mono text-2xl font-bold tracking-tight">{value}</p>
      <p className={cn("mt-1 font-mono text-[11px]", detailClass)}>{detail}</p>
    </div>
  );
}

export function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={cn("rounded-2xl bg-surface p-5 ring-1 ring-border/70", className)}>{children}</section>;
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div>
      <h2 className="text-sm font-bold tracking-tight">{title}</h2>
      {subtitle ? <p className="font-mono text-[11px] text-muted-foreground">{subtitle}</p> : null}
    </div>
  );
}
