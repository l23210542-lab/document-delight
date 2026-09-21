import { Navigate, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexo — Portal de Asignación y Facturación IT" },
      {
        name: "description",
        content:
          "Portal interno para registrar tiempo por repositorio, gestionar clientes y generar pre-facturas de servicios IT.",
      },
      { property: "og:title", content: "Nexo — Portal de Asignación y Facturación IT" },
      {
        property: "og:description",
        content:
          "Dashboard operativo para telemetría automática, proyectos, clientes y facturación IT.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return <Navigate to="/login" />;
}
