import type { Metadata } from "next";
import "./globals.css";
import Shell from "@/components/layout/Shell";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "docufirma-ayg | Sistema de Suministros",
  description: "Sistema de firma digital para control de entregas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("font-sans light", geist.variable)}>
      <body className="min-h-screen bg-slate-50 antialiased overflow-x-hidden text-slate-900">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
