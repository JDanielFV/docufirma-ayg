'use client';

import React, { useState } from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { Mail, Plus, X, ArrowLeft, Send } from 'lucide-react';

export default function EmailEntry() {
  const { emails, setEmails, nextStep, prevStep } = useDelivery();
  const [newEmail, setNewEmail] = useState('');

  const handleAddEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (newEmail.trim() && !emails.includes(newEmail)) {
      // Remove empty strings and add the new one
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
    <div className="glass-card p-8 md:p-12 w-full animate-in fade-in slide-in-from-right-4 duration-700">
      <div className="flex justify-between items-start mb-10">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
            Destinatarios
          </h1>
          <p className="text-[10px] text-gray-500 uppercase tracking-widest font-light mt-1">
            Configuración de canales de distribución del comprobante.
          </p>
        </div>
        <div className="bg-white/5 p-3 rounded-full">
          <Mail className="text-[#0066FF]" size={24} />
        </div>
      </div>

      <form onSubmit={handleAddEmail} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 block">
            Añadir Correo Electrónico
          </label>
          <div className="flex gap-2">
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder="ejemplo@dominio.com"
              className="flex-1 bg-white/[0.03] border border-white/10 p-4 text-white focus:outline-none focus:border-[#0066FF] transition-all duration-300 rounded-sm"
            />
            <button
              type="submit"
              className="px-6 bg-white/5 border border-white/10 text-white hover:border-[#0066FF] hover:text-[#0066FF] transition-all duration-300 rounded-sm"
            >
              <Plus size={20} />
            </button>
          </div>
        </div>
      </form>

      <div className="mt-8 space-y-3 min-h-[120px]">
        {filteredEmails.length === 0 ? (
          <div className="h-full flex items-center justify-center border border-dashed border-white/5 rounded-sm p-8">
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">No hay correos registrados</p>
          </div>
        ) : (
          filteredEmails.map((email) => (
            <div
              key={email}
              className="flex justify-between items-center p-4 bg-white/[0.02] border border-white/5 rounded-sm animate-in fade-in slide-in-from-top-2"
            >
              <span className="text-sm font-medium text-gray-300">{email}</span>
              <button
                onClick={() => removeEmail(email)}
                className="text-gray-600 hover:text-red-500 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))
        )}
      </div>

      <div className="pt-8 border-t border-white/5 mt-10 flex gap-4">
        <button
          onClick={prevStep}
          className="flex-none p-5 border border-white/10 text-white hover:bg-white/5 transition-all duration-300 rounded-sm"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          onClick={nextStep}
          disabled={filteredEmails.length === 0}
          className="flex-1 bg-[#0066FF] text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,102,255,0.4)] transition-all duration-500 disabled:opacity-30 disabled:hover:scale-100 flex items-center justify-center gap-3 group"
        >
          <Send size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          Preparar Documento Final
        </button>
      </div>
    </div>
  );
}
