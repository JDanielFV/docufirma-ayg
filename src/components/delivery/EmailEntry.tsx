'use client';

import React, { useState } from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { Mail, Plus, X, ArrowLeft, Send } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-slate-200">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
              Destinatarios
            </CardTitle>
            <CardDescription className="text-slate-500 mt-1">
              Configuración de destinatarios
            </CardDescription>
          </div>
          <div className="p-3 bg-blue-50 rounded-full">
            <Mail className="text-blue-600" size={28} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email-input" className="text-slate-700 font-semibold">Añadir Correo Electrónico</Label>
          <div className="flex gap-3">
            <Input
              id="email-input"
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
              className="flex-1 border-slate-300 focus-visible:ring-slate-400"
            />
            <Button
              type="button"
              onClick={handleAddEmail}
              variant="outline"
              className="h-10 px-4 border-slate-300 hover:bg-slate-100 text-slate-700"
            >
              <Plus size={20} />
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Correos Registrados</h4>
          <div className="space-y-2 min-h-[120px]">
            {filteredEmails.length === 0 ? (
              <div className="h-full flex items-center justify-center border border-dashed border-slate-300 rounded-lg p-8 bg-slate-50">
                <p className="text-sm text-slate-400 font-medium">No hay correos registrados</p>
              </div>
            ) : (
              filteredEmails.map((email) => (
                <div
                  key={email}
                  className="flex justify-between items-center p-3 bg-white border border-slate-200 shadow-sm rounded-md"
                >
                  <span className="text-sm font-medium text-slate-700 truncate mr-4">{email}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeEmail(email)}
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50 h-8 w-8 flex-shrink-0"
                  >
                    <X size={16} />
                  </Button>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-100">
        <Button
          onClick={prevStep}
          variant="outline"
          className="w-full sm:w-auto h-12 border-slate-300 text-slate-700 hover:bg-slate-50"
        >
          <ArrowLeft size={18} className="mr-2" />
          Atrás
        </Button>
        <Button
          onClick={nextStep}
          disabled={filteredEmails.length === 0}
          className="w-full sm:flex-1 h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-all"
        >
          <Send size={18} className="mr-2" />
          Preparar Documento Final
        </Button>
      </CardFooter>
    </Card>
  );
}
