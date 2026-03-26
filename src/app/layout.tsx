import type { Metadata } from "next";
import "./globals.css";
import "../styles/bugatti.css";
import Shell from "@/components/layout/Shell";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "docufirma-ayg | Bugatti Edition",
  description: "Sistema de firma digital premium para control de entregas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={cn("font-sans", geist.variable)}>
      <body className="antialiased">
        <div className="liquid-blob"></div>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
