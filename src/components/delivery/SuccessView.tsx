'use client';

import React from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { CheckCircle2, Package, Mail, RefreshCw } from 'lucide-react';

export default function SuccessView() {
  const { resetDelivery, emails } = useDelivery();

  return (
    <div className="glass-card" style={{ padding: '4rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', position: 'relative' }}>
        <div style={{ position: 'absolute', width: '120px', height: '120px', background: 'var(--bugatti-blue)', filter: 'blur(40px)', opacity: 0.3 }}></div>
        <CheckCircle2 style={{ color: 'var(--bugatti-blue)', position: 'relative' }} size={80} />
      </div>

      <h1 className="title-premium" style={{ fontSize: '2.5rem' }}>Entrega Finalizada</h1>
      <p className="subtitle-premium">Protocolo Bugatti Edition completado.</p>

      <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px', padding: '2rem', marginBottom: '3rem', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '1rem', marginBottom: '1rem' }}>
          <Package size={18} style={{ color: '#666' }} />
          <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888' }}>Documento Generado y Validado</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Mail size={18} style={{ color: 'var(--bugatti-blue)' }} />
          <div>
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#888', display: 'block', marginBottom: '0.5rem' }}>Enviado a:</span>
            {emails.filter(e => e !== '').map(email => (
              <span key={email} style={{ display: 'block', fontSize: '0.75rem', fontFamily: 'monospace', color: '#ccc' }}>{email}</span>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={resetDelivery}
        className="btn-bugatti-primary"
      >
        <RefreshCw size={18} />
        Iniciar Nuevo Protocolo
      </button>
    </div>
  );
}
