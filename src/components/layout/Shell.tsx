import { FileSignature } from 'lucide-react';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="flex flex-col min-h-screen relative z-10 selection:bg-[#D4AF37] selection:text-black">
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl text-white shadow-sm shadow-[#D4AF37]/5">
        <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#D4AF37]/10 p-1.5 rounded-md border border-[#D4AF37]/20">
              <FileSignature className="h-5 w-5 text-[#D4AF37]" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white leading-none">
                Papelería Notarial
              </h1>
              <p className="text-[10px] uppercase tracking-widest font-semibold text-[#D4AF37] mt-1">
                Plataforma de Entregas
              </p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col py-12 px-4 relative">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay"></div>
        <div className="w-full relative z-10">
          {children}
        </div>
      </main>
      
      <footer className="py-6 border-t border-slate-200 bg-white text-center">
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          &copy; {new Date().getFullYear()} Papelería Notarial | Todos los derechos reservados
        </p>
      </footer>
    </div>
  );
}
