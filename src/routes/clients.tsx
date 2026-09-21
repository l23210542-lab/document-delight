import { createFileRoute } from "@tanstack/react-router";
import { Plus, Search } from "lucide-react";

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

const clients = [
  ["Norte Digital", "NDI940101H12", "USD", "billing@nortedigital.com", "Activo", "$18,400"],
  ["Grupo Andes", "GAN880411K92", "MXN", "finanzas@grupoandes.mx", "Activo", "$126,800"],
  ["Vela Labs", "VLA010620N35", "USD", "ap@velalabs.io", "Activo", "$9,650"],
  ["Cobalto Bank", "CBA760902M18", "MXN", "cfdi@cobalto.mx", "En pausa", "$72,300"],
  ["Lumen Health", "LHE021114P09", "USD", "billing@lumen.health", "Activo", "$4,900"],
];

export const Route = createFileRoute("/clients")({
  head: () => ({
    meta: [
      { title: "Clientes — Nexo IT·Fin" },
      {
        name: "description",
        content: "Gestión de clientes con RFC, moneda de facturación, correo y estado operativo.",
      },
      { property: "og:title", content: "Clientes — Nexo IT·Fin" },
      {
        property: "og:description",
        content: "Tabla de clientes para administrar facturación USD y MXN en el portal IT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ClientsPage,
});

function ClientsPage() {
  return (
    <PortalShell
      active="/clients"
      title="Clientes"
      subtitle="Directorio fiscal y moneda de cobro"
      action={
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="clay" size="sm"><Plus />Nuevo Cliente</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo Cliente</DialogTitle>
              <DialogDescription>Captura los datos requeridos para facturación.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="space-y-2"><Label htmlFor="client-name">Nombre</Label><Input id="client-name" placeholder="Norte Digital" /></div>
              <div className="space-y-2"><Label htmlFor="tax-id">RFC</Label><Input id="tax-id" placeholder="NDI940101H12" /></div>
              <div className="space-y-2"><Label>Moneda</Label><Select defaultValue="USD"><SelectTrigger><SelectValue /></SelectTrigger><SelectContent><SelectItem value="USD">USD</SelectItem><SelectItem value="MXN">MXN</SelectItem></SelectContent></Select></div>
            </div>
            <DialogFooter><Button variant="clay">Guardar cliente</Button></DialogFooter>
          </DialogContent>
        </Dialog>
      }
    >
      <Panel className="mb-16 md:mb-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <SectionTitle title="Gestión de Clientes" subtitle="Paginación, búsqueda y filtros" />
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <div className="flex h-9 w-64 max-w-full items-center gap-2 rounded-xl border border-line bg-background px-3 text-muted-foreground">
              <Search className="size-4" />
              <span className="font-mono text-[11px]">Buscar por nombre o RFC</span>
            </div>
            <Select defaultValue="todos">
              <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
              <SelectContent><SelectItem value="todos">Todos</SelectItem><SelectItem value="usd">USD</SelectItem><SelectItem value="mxn">MXN</SelectItem></SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 overflow-x-auto rounded-xl border border-line">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead className="bg-background font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              <tr><th className="px-3 py-2.5 font-medium">Cliente</th><th className="px-3 py-2.5 font-medium">RFC</th><th className="px-3 py-2.5 font-medium">Moneda</th><th className="px-3 py-2.5 font-medium">Billing Email</th><th className="px-3 py-2.5 font-medium">Estado</th><th className="px-3 py-2.5 text-right font-medium">Mes actual</th></tr>
            </thead>
            <tbody className="divide-y divide-line">
              {clients.map(([name, taxId, currency, email, status, amount]) => (
                <tr key={taxId} className="hover:bg-clay-soft/40">
                  <td className="px-3 py-3 text-xs font-bold">{name}</td>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{taxId}</td>
                  <td className="px-3 py-3"><span className="rounded-full bg-clay-soft px-2 py-0.5 font-mono text-[10px] font-medium text-clay">{currency}</span></td>
                  <td className="px-3 py-3 font-mono text-xs text-muted-foreground">{email}</td>
                  <td className="px-3 py-3"><span className="inline-flex items-center gap-1.5 text-xs font-medium"><StatusDot tone={status === "Activo" ? "accent" : "amber"} />{status}</span></td>
                  <td className="px-3 py-3 text-right font-mono text-xs font-bold">{amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span className="font-mono">Mostrando 5 de 14</span>
          <div className="flex gap-1"><Button variant="outline" size="icon">‹</Button><Button variant="clay" size="icon">1</Button><Button variant="outline" size="icon">2</Button><Button variant="outline" size="icon">›</Button></div>
        </div>
      </Panel>
    </PortalShell>
  );
}
