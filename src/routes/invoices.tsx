import { createFileRoute } from "@tanstack/react-router";
import { Calculator, CreditCard, FileCheck2 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Panel, PortalShell, SectionTitle } from "@/components/portal/PortalShell";
import { cn } from "@/lib/utils";

const invoices = [
  { id: "FAC-2025-0142", client: "Grupo Andes", status: "Draft", currency: "MXN", total: "$126,800", method: "SAT CFDI 4.0" },
  { id: "FAC-2025-0141", client: "Norte Digital", status: "Sent", currency: "USD", total: "$4,150", method: "Stripe Link" },
  { id: "FAC-2025-0139", client: "Vela Labs", status: "Sent", currency: "USD", total: "$3,800", method: "Stripe Link" },
  { id: "FAC-2025-0136", client: "Andes Cloud", status: "Paid", currency: "MXN", total: "$212,900", method: "SAT CFDI 4.0" },
];

export const Route = createFileRoute("/invoices")({
  head: () => ({
    meta: [
      { title: "Facturación — Nexo IT·Fin" },
      {
        name: "description",
        content: "Módulo de facturación con cierre mensual, borradores, estado de cobro y vista previa.",
      },
      { property: "og:title", content: "Facturación — Nexo IT·Fin" },
      {
        property: "og:description",
        content: "Genera cierres, revisa facturas y dispara timbrado o cobro desde una vista dividida.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvoicesPage,
});

function InvoicesPage() {
  const [selected, setSelected] = useState(invoices[0]);

  if (!selected) {
    return null;
  }

  return (
    <PortalShell
      active="/invoices"
      title="Facturación"
      subtitle="Cierre mensual · Draft, Sent y Paid"
      action={
        <Button variant="clay" size="sm"><Calculator />Generar Cierre</Button>
      }
    >
      <section className="grid gap-4 lg:grid-cols-[390px_1fr]">
        <Panel className="mb-16 md:mb-0">
          <div className="flex items-center justify-between gap-3">
            <SectionTitle title="Facturas" subtitle="Selecciona un documento" />
            <div className="flex rounded-xl bg-background p-1 font-mono text-[10px]">
              <span className="rounded-lg bg-clay-soft px-2 py-1 text-clay">Draft</span>
              <span className="px-2 py-1 text-muted-foreground">Sent</span>
              <span className="px-2 py-1 text-muted-foreground">Paid</span>
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {invoices.map((invoice) => (
              <Button
                key={invoice.id}
                type="button"
                variant="outline"
                onClick={() => setSelected(invoice)}
                className={cn(
                  "h-auto w-full justify-start rounded-xl p-3 text-left",
                  selected.id === invoice.id ? "border-clay bg-clay-soft/70" : "border-line bg-background hover:bg-clay-soft/40",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-bold">{invoice.id}</span>
                  <StatusBadge status={invoice.status} />
                </div>
                <p className="mt-1 text-sm font-medium">{invoice.client}</p>
                <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                  <span>{invoice.method}</span>
                  <span className="font-bold text-foreground">{invoice.total}</span>
                </div>
              </Button>
            ))}
          </div>
        </Panel>

        <Panel>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <SectionTitle title="Vista previa del documento" subtitle={`${selected.id} · ${selected.currency}`} />
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><FileCheck2 />Validar</Button>
              <Button variant="clay" size="sm"><CreditCard />Timbrar / Cobrar</Button>
            </div>
          </div>

          <div className="mt-5 rounded-2xl border border-line bg-background p-5">
            <div className="flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-xl font-bold">Nexo</p>
                <p className="mt-1 font-mono text-[11px] text-muted-foreground">Servicios profesionales IT</p>
              </div>
              <div className="text-right">
                <StatusBadge status={selected.status} />
                <p className="mt-2 font-mono text-[11px] text-muted-foreground">Emisión · 14 jun 2025</p>
              </div>
            </div>

            <div className="my-6 h-px bg-line" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Cliente</p>
                <p className="mt-1 font-bold">{selected.client}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">Método</p>
                <p className="mt-1 font-bold">{selected.method}</p>
              </div>
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-line">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  <tr><th className="px-3 py-2.5 font-medium">Proyecto</th><th className="px-3 py-2.5 text-right font-medium">Horas</th><th className="px-3 py-2.5 text-right font-medium">Tarifa</th><th className="px-3 py-2.5 text-right font-medium">Subtotal</th></tr>
                </thead>
                <tbody className="divide-y divide-line">
                  <tr><td className="px-3 py-3 font-mono text-xs">api-gateway</td><td className="px-3 py-3 text-right font-mono text-xs">32.0</td><td className="px-3 py-3 text-right font-mono text-xs">$110</td><td className="px-3 py-3 text-right font-mono text-xs font-bold">$3,520</td></tr>
                  <tr><td className="px-3 py-3 font-mono text-xs">billing-core</td><td className="px-3 py-3 text-right font-mono text-xs">28.5</td><td className="px-3 py-3 text-right font-mono text-xs">$125</td><td className="px-3 py-3 text-right font-mono text-xs font-bold">$3,562</td></tr>
                  <tr><td className="px-3 py-3 font-mono text-xs">mobile-app</td><td className="px-3 py-3 text-right font-mono text-xs">24.0</td><td className="px-3 py-3 text-right font-mono text-xs">$95</td><td className="px-3 py-3 text-right font-mono text-xs font-bold">$2,280</td></tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex items-center justify-between rounded-xl bg-surface p-4">
              <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">Total</span>
              <span className="font-mono text-2xl font-bold">{selected.total}</span>
            </div>
          </div>
        </Panel>
      </section>
    </PortalShell>
  );
}

function StatusBadge({ status }: { status: string }) {
  const classes = status === "Draft" ? "bg-clay-soft text-clay" : status === "Sent" ? "bg-amberc-soft text-amberc" : "bg-mint-soft text-mint";
  return <span className={cn("rounded-full px-2 py-0.5 font-mono text-[10px] font-medium", classes)}>{status}</span>;
}
