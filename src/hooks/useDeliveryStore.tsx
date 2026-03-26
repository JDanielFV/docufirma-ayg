'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  quantity: number;
}

interface DeliveryContextType {
  products: Product[];
  emails: string[];
  signature: string | null;
  step: number;
  addProduct: (name: string, quantity: number) => void;
  removeProduct: (id: string) => void;
  setEmails: (emails: string[]) => void;
  setSignature: (signature: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetDelivery: () => void;
}

const DeliveryContext = createContext<DeliveryContextType | undefined>(undefined);

export function DeliveryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [emails, setEmailsState] = useState<string[]>(['', '']);
  const [signature, setSignature] = useState<string | null>(null);
  const [step, setStep] = useState(1);

  const addProduct = (name: string, quantity: number) => {
    const newProduct: Product = {
      id: crypto.randomUUID(),
      name,
      quantity,
    };
    setProducts([...products, newProduct]);
  };

  const removeProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const setEmails = (newEmails: string[]) => {
    setEmailsState(newEmails);
  };

  const nextStep = () => setStep((s) => Math.min(5, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));
  const resetDelivery = () => {
    setProducts([]);
    setEmailsState(['', '']);
    setSignature(null);
    setStep(1);
  };

  return (
    <DeliveryContext.Provider
      value={{
        products,
        emails,
        signature,
        step,
        addProduct,
        removeProduct,
        setEmails,
        setSignature,
        nextStep,
        prevStep,
        resetDelivery,
      }}
    >
      {children}
    </DeliveryContext.Provider>
  );
}

export function useDelivery() {
  const context = useContext(DeliveryContext);
  if (context === undefined) {
    throw new Error('useDelivery must be used within a DeliveryProvider');
  }
  return context;
}
