import { createFileRoute } from "@tanstack/react-router";
import { GitBranch, Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Panel, PortalShell, SectionTitle, StatusDot } from "@/components/portal/PortalShell";

const projects = [
  ["billing-core", "Grupo Andes", "github.com/nexo/billing-core", "$125", "Active", "28.5 h"],
  ["api-gateway", "Norte Digital", "github.com/nexo/api-gateway", "$110", "Active", "32.0 h"],
  ["mobile-app", "Vela Labs", "github.com/vela/mobile-app", "$95", "Active", "24.0 h"],
  ["data-pipeline", "Cobalto Bank", "github.com/cobalto/data-pipeline", "$1,850 MXN", "Inactive", "18.5 h"],
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Proyectos — Nexo IT·Fin" },
      {
        name: "description",
        content: "Administración de proyectos con URL de repositorio, cliente asociado y tarifa por hora.",
      },
      { property: "og:title", content: "Proyectos — Nexo IT·Fin" },
      {
        property: "og:description",
        content: "Tabla de proyectos para enlazar telemetría del IDE con tarifas de facturación.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PortalShell
      active="/projects"
      title="Proyectos"
      subtitle="Repositorio, cliente y tarifa por hora"
      action={
        <Dialog>
          <DialogTrigger asChild><Button variant="clay" size="sm"><Plus />Nuevo Proyecto</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nuevo Proyecto</DialogTitle><DialogDescription>La URL del repositorio enlaza el tiempo automático con este proyecto.</DialogDescription></DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-2"><Label htmlFor="project-name">Nombre</Label><Input id="project-name" placeholder="billing-core" /></div>
              <div className="space-y-2"><Label>Cliente</Label><Select defaultValue="andes"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="andes">Grupo Andes</SelectItem><SelectItem value="norte">Norte Digital</SelectItem><SelectItem value="vela">Vela Labs</SelectItem></SelectContent></Select></div>
              <div className="space-y-2"><Label htmlFor="rate">Tarifa por hora</Label><Input id="rate" placeholder="$125" /></div>
              <div className="space-y-2"><Label htmlFor="repo">RepositoryUrl</Label><Input id="repo" placeholder="github.com/nexo/billing-core" /></div>
            </div>
            <DialogFooter><Button variant="clay">Guardar proyecto</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <Panel className="mb-16 md:mb-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionTitle title="Gestión de Proyectos" subtitle="Sin tareas ni tickets; el tiempo se liga al proyecto" />
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <div className="flex h-9 w-64 max-w-full items-center gap-2 rounded-xl border border-line bg-background px-3 text-muted-foreground"><Search className="size-4" /><span className="font-mono text-[11px]">Buscar proyecto o repo</span></div>
            <Select defaultValue="active"><SelectTrigger className="w-40"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="active">Active</SelectItem><SelectItem value="inactive">Inactive</SelectItem><SelectItem value="all">Todos</SelectItem></SelectContent></Select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-background font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-3 py-2.5 font-medium">Proyecto</th><th className="px-3 py-2.5 font-medium">Cliente</th><th className="px-3 py-2.5 font-medium">RepositoryUrl</th><th className="px-3 py-2.5 font-medium">Tarifa</th><th className="px-3 py-2.5 font-medium">Status</th><th className="px-3 py-2.5 text-right font-medium">Mes</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {projects.map(([name, client, repo, rate, status, month]) => (
                <tr key={repo} className="hover:bg-clay-soft/40">
                  <td className="px-3 py-3"><span className="inline-flex items-center gap-2 text-xs font-bold"><GitBranch className="size-4 text-clay" />{name}</span></td>
                  <td className="px-3 py-3 text-xs">{client}</td>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{repo}</td>
                  <td className="px-3 py-3 font-mono text-xs font-bold">{rate}</td>
                  <td className="px-3 py-3"><span className="inline-flex items-center gap-1.5 text-xs font-medium"><StatusDot tone={status === "Active" ? "accent" : "rose"} />{status}</span></td>
                  <td className="px-3 py-3 text-right font-mono text-xs font-bold">{month}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </PortalShell>
  );
}
