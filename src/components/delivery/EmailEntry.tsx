'use client';

import React, { useState } from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { Mail, Plus, X, ArrowLeft, Send } from 'lucide-react';

export default function EmailEntry() {
  const { emails, setEmails, nextStep, prevStep } = useDelivery();
  const [newEmail, setNewEmail] = useState('');

  const handleAddEmail = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (newEmail.trim() && !emails.includes(newEmail)) {
      const currentEmails = emails.filter(e => e !== '');
      setEmails([...currentEmails, newEmail]);
      setNewEmail('');
    }
  };

  const removeEmail = (emailToRemove: string) => {
    const updated = emails.filter(e => e !== emailToRemove);
    setEmails(updated.length > 0 ? updated : ['']);
  };

  const filteredEmails = emails.filter(e => e !== '');

  return (
    <div className="glass-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2.5rem' }}>
        <div>
          <h1 className="title-premium">Destinatarios</h1>
          <p className="subtitle-premium" style={{ marginBottom: 0 }}>
            Configuración de destinatarios
          </p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '0.75rem', borderRadius: '50%' }}>
          <Mail style={{ color: 'var(--bugatti-blue)' }} size={24} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label className="form-label">Añadir Correo Electrónico</label>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input
            type="email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddEmail(e as any);
              }
            }}
            placeholder="ejemplo@dominio.com"
            className="form-input"
          />
          <button
            type="button"
            onClick={handleAddEmail}
            className="btn-bugatti-outline"
            style={{ width: 'auto', padding: '0 1.5rem', touchAction: 'manipulation' }}
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem', minHeight: '120px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {filteredEmails.length === 0 ? (
          <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(255,255,255,0.05)', borderRadius: '2px', padding: '2rem' }}>
            <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>No hay correos registrados</p>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <div
              key={email}
              className="animate-up"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '2px', wordBreak: 'break-all' }}
            >
              <span style={{ fontSize: '0.85rem', color: '#ccc', marginRight: '10px' }}>{email}</span>
              <button
                onClick={() => removeEmail(email)}
                style={{ color: 'var(--text-muted)', background: 'none' }}
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="flex-responsive" style={{ paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '2.5rem' }}>
        <button
          onClick={prevStep}
          className="btn-bugatti-outline"
          style={{ width: '100%', padding: '1.25rem', display: 'flex', justifyContent: 'center' }}
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={nextStep}
          disabled={filteredEmails.length === 0}
          className="btn-bugatti-primary"
          style={{ opacity: filteredEmails.length === 0 ? 0.3 : 1 }}
        >
          <Send size={18} />
          Preparar Documento Final
        </button>
      </div>
    </div>
  );
}
