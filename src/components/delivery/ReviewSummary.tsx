'use client';

import { useDelivery } from '@/hooks/useDeliveryStore';
import styles from './ReviewSummary.module.css';
import { ArrowLeft, CheckCircle, Mail } from 'lucide-react';

export default function ReviewSummary() {
  const { products, emails, setEmails, nextStep, prevStep } = useDelivery();

  const handleEmailChange = (index: number, value: string) => {
    const newEmails = [...emails];
    newEmails[index] = value;
    setEmails(newEmails);
  };

  const isEmailsValid = emails[0].includes('@') && emails[1].includes('@');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Cotejo de Entrega</h2>
      
      <div className={styles.summaryBox}>
        <h3 className={styles.subtitle}>Productos a entregar:</h3>
        <div className={styles.productList}>
          {products.map((p) => (
            <div key={p.id} className={styles.productRow}>
              <span>{p.name}</span>
              <span className={styles.qty}>{p.quantity} pz</span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.emailSection}>
        <h3 className={styles.subtitle}>Enviar comprobante a:</h3>
        <div className={styles.emailInputs}>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email del cliente"
              value={emails[0]}
              onChange={(e) => handleEmailChange(0, e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.inputIcon} />
            <input
              type="email"
              placeholder="Email adicional (Control)"
              value={emails[1]}
              onChange={(e) => handleEmailChange(1, e.target.value)}
              className={styles.input}
            />
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button onClick={prevStep} className={styles.backButton}>
          <ArrowLeft size={20} />
          Corregir Lista
        </button>
        <button
          disabled={!isEmailsValid}
          onClick={nextStep}
          className={styles.confirmButton}
        >
          <CheckCircle size={20} />
          Confirmar Entrega
        </button>
      </div>
    </div>
  );
}
