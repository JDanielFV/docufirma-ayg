'use server'

import { resend } from '@/lib/resend';
import { supabase } from '@/lib/supabase';
import { renderToBuffer } from '@react-pdf/renderer';
import { DeliveryPDF } from '@/components/delivery/DeliveryPDF';
import { DeliveryEmail } from '@/components/emails/DeliveryEmail';
import React from 'react';
import { Product } from '@/hooks/useDeliveryStore';

interface DeliveryData {
  products: Product[];
  emails: string[];
  signature: string; // Base64
}

export async function submitDelivery(data: DeliveryData) {
  try {
    const date = new Date().toLocaleString('es-MX', { 
      timeZone: 'America/Mexico_City',
      dateStyle: 'medium',
      timeStyle: 'short'
    });
    
    // 1. Generar Buffer del PDF con la firma incrustada
    const pdfBuffer = await renderToBuffer(
      React.createElement(DeliveryPDF, { 
        products: data.products, 
        date, 
        signature: data.signature 
      }) as any
    );

    const deliveryId = crypto.randomUUID();

    // 2. Guardar registro en la Base de Datos (SIN LA FIRMA, solo metadata)
    if (supabase) {
      const { error: dbError } = await supabase
        .from('entregas')
        .insert({
          id: deliveryId,
          productos: data.products,
          emails: data.emails,
          pdf_path: null // Ya no guardamos el PDF en storage
        });

      if (dbError) console.error('Error en DB:', dbError);
    } else {
      console.warn('Skipping DB insert because Supabase client is not initialized.');
    }

    // 3. Enviar Email con Resend desde notificaciones@sivd.app
    const { data: resendData, error: resendError } = await resend.emails.send({
      from: 'notificaciones@sivd.app',
      to: data.emails,
      subject: 'Comprobante de Entrega',
      react: React.createElement(DeliveryEmail, { date }),
      attachments: [
        {
          filename: `Comprobante-${deliveryId.slice(0, 8)}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    if (resendError) {
      console.error('Error en Resend:', resendError);
      return { success: false, error: 'Error al enviar el correo' };
    }

    return { success: true, id: deliveryId };
  } catch (err) {
    console.error('Error general:', err);
    return { success: false, error: 'Error inesperado al procesar la entrega' };
  }
}
