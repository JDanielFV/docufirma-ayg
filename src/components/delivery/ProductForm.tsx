'use client';

import React, { useState } from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

export default function ProductForm() {
  const { products, addProduct, removeProduct, nextStep } = useDelivery();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addProduct(name, quantity);
      setName('');
      setQuantity(1);
    }
  };

  return (
    <div className="glass-card p-8 md:p-12 w-full animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <h1 className="text-3xl font-black uppercase tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
        Suministro<br />Premium
      </h1>
      <p className="text-xs text-gray-500 uppercase tracking-widest mb-10 font-light">
        Configuración técnica de entrega. Nivel de precisión Bugatti.
      </p>

      <form onSubmit={handleAdd} className="space-y-6">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 block">
            Componente / Producto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Chiron Carbon Pack"
            className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:outline-none focus:border-[#0066FF] focus:bg-white/[0.08] transition-all duration-300 rounded-sm"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-600 block">
              Cantidad
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-full bg-white/[0.03] border border-white/10 p-4 text-white focus:outline-none focus:border-[#0066FF] transition-all duration-300 rounded-sm"
            />
          </div>
          <div className="flex-none flex items-end">
            <button
              type="submit"
              className="h-[58px] px-6 border border-white/20 text-white hover:border-[#0066FF] hover:text-[#0066FF] transition-all duration-300 uppercase text-[10px] font-bold tracking-widest flex items-center gap-2"
            >
              <Plus size={16} />
              Registrar
            </button>
          </div>
        </div>
      </form>

      {products.length > 0 && (
        <div className="mt-12 space-y-1">
          <div className="h-px bg-white/5 w-full mb-4" />
          <div className="max-height-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center py-4 border-b border-white/5 group animate-in fade-in slide-in-from-left-2 duration-500"
              >
                <div>
                  <div className="font-bold text-sm text-white uppercase tracking-tight">
                    {product.name}
                  </div>
                  <div className="text-[10px] text-gray-500 font-mono">
                    ID: {product.id.slice(0, 8)}
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <span className="text-[#0066FF] font-black text-lg">x{product.quantity}</span>
                  <button
                    onClick={() => removeProduct(product.id)}
                    className="text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={nextStep}
        disabled={products.length === 0}
        className="w-full mt-10 bg-[#0066FF] text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:scale-[1.02] hover:shadow-[0_10px_30px_rgba(0,102,255,0.4)] transition-all duration-500 disabled:opacity-30 disabled:hover:scale-100 disabled:hover:shadow-none flex items-center justify-center gap-3 group"
      >
        Continuar al Cotejo
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
