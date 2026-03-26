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
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-premium">Firma Digital</h1>
          <p className="subtitle-premium" style={{ marginBottom: 0 }}>
            Validación de autenticidad y aceptación.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <label className="form-label" style={{ color: 'var(--bugatti-blue)' }}>
          Área de Firma Técnica
        </label>
        <div style={{ position: 'relative', background: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '2px', overflow: 'hidden' }}>
          <SignatureCanvas
            ref={sigCanvas}
            penColor="#0066FF"
            canvasProps={{
              style: { width: '100%', height: '250px', cursor: 'crosshair', touchAction: 'none' }
            }}
          />
          <button
            onClick={clear}
            style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'rgba(255,255,255,0.05)', color: '#666', border: 'none', padding: '0.5rem', borderRadius: '2px', cursor: 'pointer' }}
          >
            <Eraser size={18} />
          </button>
        </div>
        <p style={{ fontSize: '0.6rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em', textAlign: 'center', marginTop: '1rem' }}>
          La firma será incrustada en el PDF y destruida tras el envío.
        </p>
      </div>

      <div className="flex-responsive" style={{ paddingTop: '2.5rem' }}>
        <button
          onClick={prevStep}
          disabled={isSubmitting}
          className="btn-bugatti-outline"
          style={{ width: '100%', padding: '1.25rem', opacity: isSubmitting ? 0.3 : 1, display: 'flex', justifyContent: 'center' }}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="btn-bugatti-primary"
          style={{ opacity: isSubmitting ? 0.5 : 1 }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} />
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
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}} />
    </div>
  );
}
