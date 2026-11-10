import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Igualab · Control de proyecto",
  description: "Monitoreo interno de tareas, sprints, bugs, casos de prueba y evidencias del proyecto Igualab.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es">
      <body className="bg-slate-50 antialiased">{children}</body>
    </html>
  );
}
