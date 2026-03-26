'use client';

import React from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { FileText, Check, ArrowLeft } from 'lucide-react';

export default function DeliveryPDFPreview() {
  const { products, nextStep, prevStep } = useDelivery();
  const date = new Date().toLocaleDateString('es-MX', { 
    dateStyle: 'medium',
    timeStyle: 'short' 
  } as any);

  return (
    <div className="glass-card p-8 md:p-12 w-full animate-in fade-in zoom-in duration-700">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Cotejo Técnico
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-light mt-1">
            Revisión de configuración previa a la firma.
          </p>
        </div>
        <div className="bg-white/5 p-3 rounded-full">
          <FileText className="text-[#0066FF]" size={24} />
        </div>
      </div>

      <div className="bg-white/[0.02] border border-white/5 rounded-sm p-6 space-y-8 mb-10">
        <div className="flex justify-between text-[10px] uppercase tracking-widest text-gray-600 font-bold border-b border-white/5 pb-4">
          <span>Documento: DRAFT-EST-2025</span>
          <span>Fecha: {date}</span>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0066FF]">
            Lista de Componentes
          </label>
          <div className="space-y-3">
            {products.map((product) => (
              <div key={product.id} className="flex justify-between items-end border-b border-dashed border-white/10 pb-2">
                <div className="text-sm font-bold uppercase tracking-tight text-gray-200">
                  {product.name}
                  <div className="text-[9px] text-gray-600 font-mono tracking-normal lowercase">uid: {product.id}</div>
                </div>
                <div className="text-[#0066FF] font-black tabular-nums">
                  QTY: {product.quantity.toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-white/5">
          <p className="text-[10px] text-gray-500 italic leading-relaxed">
            * Este documento es un borrador digital. Al confirmar, usted acepta que los productos listados coinciden con la entrega física.
          </p>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={prevStep}
          className="flex-none p-5 border border-white/10 text-white hover:bg-white/5 transition-all duration-300 rounded-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={nextStep}
          className="flex-1 bg-white/5 border border-[#0066FF]/30 text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#0066FF] hover:border-[#0066FF] transition-all duration-500 flex items-center justify-center gap-3 group"
        >
          <Check size={18} />
          Confirmar Configuración
        </button>
      </div>
    </div>
  );
}
