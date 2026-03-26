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
    <div className="glass-card" style={{ padding: '3rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-premium">Cotejo Técnico</h1>
          <p className="subtitle-premium" style={{ marginBottom: 0 }}>
            Revisión de configuración previa a la firma.
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '50%' }}>
          <FileText style={{ color: 'var(--bugatti-blue)' }} size={24} />
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px', padding: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--text-muted)', fontWeight: 800, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <span>Documento: DRAFT-EST-2025</span>
          <span>Fecha: {date}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label className="form-label" style={{ color: 'var(--bugatti-blue)' }}>
            Lista de Componentes
          </label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {products.map((product) => (
              <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px dashed rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, textTransform: 'uppercase', color: '#eee' }}>
                  {product.name}
                  <div style={{ fontSize: '0.55rem', color: 'var(--text-muted)', fontFamily: 'monospace', letterSpacing: 0, textTransform: 'lowercase', marginTop: '0.2rem' }}>uid: {product.id}</div>
                </div>
                <div style={{ color: 'var(--bugatti-blue)', fontWeight: 900, fontFamily: 'monospace' }}>
                  QTY: {product.quantity.toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <p style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', fontStyle: 'italic', lineHeight: 1.5 }}>
            * Este documento es un borrador digital. Al confirmar, usted acepta que los productos listados coinciden con la entrega física.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button
          onClick={prevStep}
          className="btn-bugatti-outline"
          style={{ width: 'auto', padding: '1.25rem' }}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={nextStep}
          className="btn-bugatti-primary"
        >
          <Check size={18} />
          Confirmar Configuración
        </button>
      </div>
    </div>
  );
}
