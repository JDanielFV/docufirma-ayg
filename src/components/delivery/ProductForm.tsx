'use client';

import React, { useState } from 'react';
import { useDelivery } from '@/hooks/useDeliveryStore';
import { Plus, Trash2, ArrowRight } from 'lucide-react';

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
    <div className="glass-card">
      <h1 className="title-premium">
        Cotejo de<br />Suministro
      </h1>
      <p className="subtitle-premium">
        Por favor verifique que todos los datos son correctos
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="form-label">
            Producto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAdd(e as any);
              }
            }}
            placeholder="Ej. Chiron Carbon Pack"
            className="form-input"
          />
        </div>

        <div className="flex-responsive">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">
              Cantidad
            </label>
            <input
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
              className="form-input"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', width: '100%' }}>
            <button
              type="button"
              onClick={handleAdd}
              className="btn-bugatti-outline"
              style={{ height: '54px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', width: '100%', touchAction: 'manipulation' }}
            >
              <Plus size={16} />
              Registrar
            </button>
          </div>
        </div>
      </div>

      {products.length > 0 && (
        <div className="premium-list">
          {products.map((product) => (
            <div key={product.id} className="premium-item">
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
                  {product.name}
                </div>
                <div style={{ fontSize: '0.6rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  ID: {product.id.slice(0, 8)}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <span style={{ color: 'var(--bugatti-blue)', fontWeight: 900, fontSize: '1.1rem' }}>
                  x{product.quantity}
                </span>
                <button
                  onClick={() => removeProduct(product.id)}
                  style={{ color: 'var(--text-muted)', background: 'none' }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={nextStep}
        disabled={products.length === 0}
        className="btn-bugatti-primary"
        style={{ marginTop: '2.5rem', opacity: products.length === 0 ? 0.3 : 1 }}
      >
        Continuar al Cotejo
        <ArrowRight size={16} />
      </button>
    </div>
  );
}
