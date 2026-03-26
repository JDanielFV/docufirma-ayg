'use client';

import { DeliveryProvider, useDelivery } from '@/hooks/useDeliveryStore';
import ProductForm from '@/components/delivery/ProductForm';
import ReviewSummary from '@/components/delivery/ReviewSummary';
import SignaturePad from '@/components/delivery/SignaturePad';
import SuccessView from '@/components/delivery/SuccessView';
import DeliveryPDFPreview from '@/components/delivery/DeliveryPDFPreview';
import EmailEntry from '@/components/delivery/EmailEntry';

function DeliveryFlow() {
  const { step } = useDelivery();

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-4 min-h-screen flex items-center justify-center">
      {step === 1 && <ProductForm />}
      {step === 2 && <DeliveryPDFPreview />}
      {step === 3 && <EmailEntry />}
      {step === 4 && <SignaturePad />}
      {step === 5 && <SuccessView />}
    </div>
  );
}

export default function Home() {
  return (
    <DeliveryProvider>
      <DeliveryFlow />
    </DeliveryProvider>
  );
}
