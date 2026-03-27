'use client';

import React from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { FileText, Check, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function DeliveryPDFPreview() {
  const { products, nextStep, prevStep } = useDelivery();
  const date = new Date().toLocaleString('es-MX', { 
    dateStyle: 'medium',
    timeStyle: 'short' 
  } as any);

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-slate-200">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
              Papelería Notarial
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Comprobante Oficial de Entrega
            </CardDescription>
          </div>
          <div className="p-3 bg-[#D4AF37]/10 rounded-full">
            <FileText className="text-[#D4AF37]" size={28} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4 mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">REF: DOC-AYG-2026</span>
            <span className="text-xs font-medium text-slate-400">{date}</span>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide border-l-4 border-[#D4AF37] pl-3">
              Lista de Componentes
            </h4>
            <div className="space-y-3">
              {products.map((product) => (
                <div key={product.id} className="flex justify-between items-end border-b border-dashed border-slate-100 pb-3">
                  <div>
                    <p className="font-semibold text-slate-800">{product.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-0.5">UID: {product.id}</p>
                  </div>
                  <div className="font-bold text-[#D4AF37] tabular-nums bg-[#D4AF37]/5 px-2 py-1 rounded border border-[#D4AF37]/20">
                    QTY: {product.quantity.toString().padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <p className="text-[10px] text-slate-400 italic leading-relaxed">
              * Este documento es un comprobante borrador digital. Al continuar al paso de firma, usted acepta que los productos listados coinciden de conformidad con la entrega física.
            </p>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4">
        <Button
          onClick={prevStep}
          variant="outline"
          className="w-full sm:w-auto h-12 border-slate-300 text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} className="mr-2" />
          Atrás
        </Button>
        <Button
          onClick={nextStep}
          className="w-full sm:flex-1 h-12 bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white font-semibold border border-[#D4AF37] shadow-md shadow-[#D4AF37]/10"
        >
          <Check size={18} className="mr-2 text-[#D4AF37]" />
          Confirmar y Firmar
        </Button>
      </CardFooter>
    </Card>
  );
}
