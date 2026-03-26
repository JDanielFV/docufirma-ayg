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
    <div className="glass-card" style={{ padding: '3rem' }}>
      <h1 className="title-premium">
        Suministro<br />Premium
      </h1>
      <p className="subtitle-premium">
        Configuración técnica de entrega. Nivel de precisión Bugatti.
      </p>

      <form onSubmit={handleAdd} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label className="form-label">
            Componente / Producto
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Chiron Carbon Pack"
            className="form-input"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label className="form-label">
              Cantidad
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="form-input"
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <button
              type="submit"
              className="btn-bugatti-outline"
              style={{ height: '54px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              <Plus size={16} />
              Registrar
            </button>
          </div>
        </div>
      </form>

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
