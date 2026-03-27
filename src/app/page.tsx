'use client';

import { DeliveryProvider, useDelivery } from '@/hooks/useDeliveryStore';
import ProductForm from '@/components/delivery/ProductForm';
import ReviewSummary from '@/components/delivery/ReviewSummary';
import SignaturePad from '@/components/delivery/SignaturePad';
import SuccessView from '@/components/delivery/SuccessView';
import DeliveryPDFPreview from '@/components/delivery/DeliveryPDFPreview';
import EmailEntry from '@/components/delivery/EmailEntry';

import { AnimatePresence, motion } from 'framer-motion';

function DeliveryFlow() {
  const { step } = useDelivery();

  const variants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" as const } },
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 md:px-8 relative min-h-[600px] pb-12">
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" variants={variants} initial="initial" animate="animate" exit="exit">
            <ProductForm />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div key="step2" variants={variants} initial="initial" animate="animate" exit="exit">
            <DeliveryPDFPreview />
          </motion.div>
        )}
        {step === 3 && (
          <motion.div key="step3" variants={variants} initial="initial" animate="animate" exit="exit">
            <EmailEntry />
          </motion.div>
        )}
        {step === 4 && (
          <motion.div key="step4" variants={variants} initial="initial" animate="animate" exit="exit">
            <SignaturePad />
          </motion.div>
        )}
        {step === 5 && (
          <motion.div key="step5" variants={variants} initial="initial" animate="animate" exit="exit">
            <SuccessView />
          </motion.div>
        )}
      </AnimatePresence>
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
