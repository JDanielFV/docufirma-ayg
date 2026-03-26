'use client';

import React from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { CheckCircle2, Package, Mail, RefreshCw } from 'lucide-react';

export default function SuccessView() {
  const { resetDelivery, emails } = useDelivery();

  return (
    <div className="glass-card p-12 w-full text-center animate-in fade-in zoom-in-95 duration-1000">
      <div className="flex justify-center mb-10">
        <div className="relative">
          <div className="absolute inset-0 bg-[#0066FF] blur-[40px] opacity-30 animate-pulse"></div>
          <CheckCircle2 className="relative text-[#0066FF]" size={80} />
        </div>
      </div>

      <h1 className="text-4xl font-black uppercase tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">
        Entrega Finalizada
      </h1>
      
      <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold mb-10">
        Protocolo Bugatti Edition completado con éxito.
      </p>

      <div className="bg-white/[0.02] border border-white/5 rounded-sm p-8 space-y-6 mb-12 text-left">
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <Package size={18} className="text-gray-500" />
          <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Documento Generado y Validado</span>
        </div>
        <div className="flex items-center gap-4 border-b border-white/5 pb-4">
          <Mail size={18} className="text-[#0066FF]" />
          <div>
            <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Enviado a:</span>
            <div className="space-y-1">
              {emails.filter(e => e !== '').map(email => (
                <span key={email} className="block text-xs font-mono text-gray-300">{email}</span>
              ))}
            </div>
          </div>
        </div>
        <p className="text-[9px] text-[#0066FF] font-bold uppercase tracking-widest text-center pt-2">
          &bull; Sin almacenamiento de firma detectado &bull;
        </p>
      </div>

      <button
        onClick={resetDelivery}
        className="w-full bg-white/5 border border-white/10 text-white py-6 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#0066FF] hover:border-[#0066FF] transition-all duration-500 flex items-center justify-center gap-3 group"
      >
        <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-700" />
        Iniciar Nuevo Protocolo
      </button>
    </div>
  );
}
