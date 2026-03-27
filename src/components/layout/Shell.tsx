import { FileSignature } from 'lucide-react';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className="flex flex-col min-h-screen relative z-10">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-[#0F172A] text-white">
        <div className="container mx-auto max-w-5xl px-4 h-16 flex items-center">
          <div className="flex items-center gap-3">
            <div className="bg-amber-600/20 p-1.5 rounded-md">
              <FileSignature className="h-5 w-5 text-[#B45309]" />
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-white leading-none">
                Papelería Notarial y Corporativa A&amp;G
              </h1>
              <p className="text-[10px] uppercase tracking-wider font-semibold text-amber-500 mt-0.5">
                Control de Entregas
              </p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full">
          {children}
        </div>
      </main>
      
      <footer className="py-6 border-t border-slate-200 bg-white text-center">
        <p className="text-xs uppercase tracking-wider font-semibold text-slate-400">
          &copy; 2025 A&amp;G | NEXTCODE
        </p>
      </footer>
    </div>
  );
}
