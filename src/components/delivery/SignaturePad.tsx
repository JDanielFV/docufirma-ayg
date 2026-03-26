'use client';

import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { submitDelivery } from '@/app/actions/submit-delivery';
import { Eraser, Send, ArrowLeft, Loader2 } from 'lucide-react';

export default function SignaturePad() {
  const { products, emails, nextStep, prevStep } = useDelivery();
  const sigCanvas = useRef<SignatureCanvas>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const handleSubmit = async () => {
    if (sigCanvas.current?.isEmpty()) {
      alert('Por favor, proporcione una firma');
      return;
    }

    setIsSubmitting(true);
    const signatureBase64 = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');

    if (signatureBase64) {
      const result = await submitDelivery({
        products,
        emails,
        signature: signatureBase64,
      });

      if (result.success) {
        nextStep();
      } else {
        alert(result.error || 'Error al procesar la entrega');
      }
    }
    setIsSubmitting(false);
  };

  return (
    <div className="glass-card p-8 md:p-12 w-full animate-in fade-in slide-in-from-top-4 duration-700">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Firma Digital
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-light mt-1">
            Validación de autenticidad y aceptación de entrega.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0066FF] block mb-2">
          Área de Firma Técnica
        </label>
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-[#0066FF] opacity-10 blur group-hover:opacity-20 transition duration-1000"></div>
          <div className="relative bg-black border border-white/10 rounded-sm overflow-hidden">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="#0066FF"
              canvasProps={{
                className: 'w-full h-64 cursor-crosshair',
              }}
            />
          </div>
          <button
            onClick={clear}
            className="absolute top-4 right-4 p-2 bg-white/5 text-gray-500 hover:text-white transition-colors rounded-sm"
            title="Limpiar firma"
          >
            <Eraser size={18} />
          </button>
        </div>
        <p className="text-[9px] text-gray-600 uppercase tracking-widest text-center mt-4">
          La firma será incrustada en el PDF y destruida tras el envío.
        </p>
      </div>

      <div className="pt-10 flex gap-4">
        <button
          onClick={prevStep}
          disabled={isSubmitting}
          className="flex-none p-5 border border-white/10 text-white hover:bg-white/5 transition-all duration-300 rounded-sm disabled:opacity-30"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-[#0066FF] text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,102,255,0.4)] transition-all duration-500 disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-3 overflow-hidden"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Procesando Ingeniería...
            </>
          ) : (
            <>
              <Send size={18} />
              Finalizar y Enviar
            </>
          )}
        </button>
      </div>
    </div>
  );
}
