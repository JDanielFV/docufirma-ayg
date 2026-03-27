'use client';

import React, { useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { submitDelivery } from '@/app/actions/submit-delivery';
import { Eraser, Send, ArrowLeft, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

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

    try {
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
    } catch (error) {
      console.error('Submission error:', error);
      alert('Error de conexión al servidor (Vercel Timeout o Network Error). Por favor revise la consola.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-slate-200">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
          Firma Digital
        </CardTitle>
        <CardDescription className="text-slate-500">
          Validación de autenticidad y aceptación.
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label className="text-slate-700 font-semibold">Área de Firma Técnica</Label>
          <div className="relative border-2 border-dashed border-slate-300 rounded-lg bg-slate-50 overflow-hidden">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="#0f172a"
              canvasProps={{
                className: 'w-full h-64 cursor-crosshair touch-none',
              }}
            />
            <Button
              type="button"
              variant="secondary"
              size="icon"
              onClick={clear}
              className="absolute top-2 right-2 h-8 w-8 bg-white/80 hover:bg-white shadow-sm border border-slate-200 text-slate-600"
              title="Limpiar firma"
            >
              <Eraser size={16} />
            </Button>
          </div>
          <p className="text-xs text-center text-slate-500 mt-2">
            La firma será incrustada en el PDF y destruida tras el envío.
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
        <Button
          type="button"
          onClick={prevStep}
          disabled={isSubmitting}
          variant="outline"
          className="w-full sm:w-auto h-12 border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft size={18} className="mr-2" />
          Atrás
        </Button>
        <Button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full sm:flex-1 h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} className="mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Send size={18} className="mr-2" />
              Finalizar y Enviar
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
