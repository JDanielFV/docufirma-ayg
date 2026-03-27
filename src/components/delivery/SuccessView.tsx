'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { CheckCircle2, Package, Mail, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function SuccessView() {
  const { resetDelivery, emails } = useDelivery();

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-slate-200 text-center py-6">
      <CardHeader className="space-y-4">
        <div className="flex justify-center mb-2">
          <motion.div 
            initial={{ scale: 0.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-green-100 blur-[30px] rounded-full"></div>
            <CheckCircle2 className="relative text-green-500" size={80} />
          </motion.div>
        </div>
        <CardTitle className="text-4xl font-bold tracking-tight text-slate-900">
          Entrega Confirmada
        </CardTitle>
        <p className="text-slate-500 font-medium">
          Nos alegra que su producto sea lo que esperaba
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-md mx-auto text-left space-y-5">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <Package size={20} className="text-slate-400" />
            <span className="text-sm font-semibold text-slate-700">Documento Generado y Validado</span>
          </div>
          <div className="flex items-start gap-3">
            <Mail size={20} className="text-blue-500 mt-0.5" />
            <div>
              <span className="text-sm font-semibold text-slate-700 block mb-1">Enviado a:</span>
              <div className="space-y-1">
                {emails.filter(e => e !== '').map(email => (
                  <span key={email} className="block text-sm font-mono text-slate-600 bg-white px-2 py-1 rounded border border-slate-100">{email}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex justify-center pt-2">
        <Button
          onClick={resetDelivery}
          size="lg"
          className="bg-[#0F172A] hover:bg-[#1E293B] text-white font-semibold shadow-lg shadow-slate-900/20 px-8 h-12 transition-all active:scale-95"
        >
          <RefreshCw size={18} className="mr-2" />
          Nuevo Cotejo
        </Button>
      </CardFooter>
    </Card>
  );
}
