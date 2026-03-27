'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { Plus, Trash2, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProductForm() {
  const { products, addProduct, removeProduct, nextStep } = useDelivery();
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleAdd = (e: React.FormEvent | React.MouseEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addProduct(name, quantity);
      setName('');
      setQuantity(1);
    } else {
      alert('Por favor, ingrese el nombre del producto.');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-slate-200">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold tracking-tight text-slate-900">
          Cotejo de Suministro
        </CardTitle>
        <CardDescription className="text-slate-500">
          Por favor verifique que todos los datos son correctos
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="product-name" className="text-slate-700 font-semibold">Producto</Label>
            <Input
              id="product-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd(e as any);
                }
              }}
              placeholder="Ej. Libro de Protocolo"
              className="border-slate-300 focus-visible:ring-slate-400"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 space-y-2">
              <Label htmlFor="product-quantity" className="text-slate-700 font-semibold">Cantidad</Label>
              <Input
                id="product-quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAdd(e as any);
                  }
                }}
                min="1"
                className="border-slate-300 focus-visible:ring-slate-400"
              />
            </div>
            <div className="flex items-end w-full sm:w-auto">
              <Button
                type="button"
                onClick={handleAdd}
                variant="outline"
                className="w-full h-10 border-slate-300 hover:bg-slate-100 text-slate-700"
              >
                <Plus size={16} className="mr-2" />
                Registrar
              </Button>
            </div>
          </div>
        </div>

        {products.length > 0 && (
          <div className="mt-8 space-y-3 pt-6 border-t border-slate-100 overflow-hidden">
            <AnimatePresence initial={false}>
              {products.map((product) => (
                <motion.div 
                  key={product.id} 
                  initial={{ opacity: 0, height: 0, scale: 0.95 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  exit={{ opacity: 0, height: 0, scale: 0.95, margin: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden origin-top mb-3"
                >
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-100 rounded-md">
                    <div>
                      <p className="font-semibold text-slate-800 text-sm">{product.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono mt-0.5">ID: {product.id.slice(0, 8)}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200 shadow-sm text-sm">
                        x{product.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeProduct(product.id)}
                        className="text-slate-400 hover:text-red-500 hover:bg-red-50 h-8 w-8"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-6">
        <Button
          onClick={nextStep}
          disabled={products.length === 0}
          className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-semibold tracking-wide transition-all"
        >
          Continuar al Cotejo
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </CardFooter>
    </Card>
  );
}
