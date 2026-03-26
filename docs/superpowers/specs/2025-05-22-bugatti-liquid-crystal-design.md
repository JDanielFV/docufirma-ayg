# Design Spec: Docufirma AyG - Bugatti Liquid Crystal Edition

**Estado:** Pendiente de Revisión
**Fecha:** 2025-05-22
**Tema:** Luxury Automotive (Bugatti) + Liquid Crystal (Fluidity)

## 1. Visión General
Rediseño premium de la aplicación de comprobantes de entrega. El objetivo es transmitir precisión técnica, lujo y fluidez, alejándose de estéticas tradicionales o anticuadas.

## 2. Experiencia de Usuario (Flujo)

### Paso 1: Captura Técnica (Products)
*   Formulario de alta precisión para agregar productos.
*   Estilo visual: Inputs oscuros con bordes de 1px y glows azules al hacer foco.
*   Lista de productos tipo "configurador" con animaciones de entrada.

### Paso 2: Cotejo (PDF Preview)
*   **Nueva Lógica:** Al dar clic en "Continuar al Cotejo", se genera una vista previa interactiva del PDF.
*   El usuario debe revisar y confirmar que los productos son correctos antes de avanzar.

### Paso 3: Destinatarios (Emails)
*   Pantalla para ingresar los correos de envío.
*   Dominio de salida configurado: `notificaciones@sivd.app` vía Resend.

### Paso 4: Firma Líquida (Signature)
*   Panel de firma con fondo de cristal líquido.
*   **Importante:** La firma se captura en Base64 para ser incrustada en el PDF final, pero **no se almacena** en Supabase (ni en Storage ni en la base de datos) para mayor privacidad y ligereza.

## 3. Identidad Visual (Bugatti Edition)

### Colores
*   **Fondo:** `#050505` (Deep Black) con textura sutil de fibra de carbono.
*   **Primario:** `#0066FF` (Bugatti Racing Blue) para acciones y neones.
*   **Superficies:** `rgba(10, 10, 10, 0.75)` con desenfoque de fondo (30px).
*   **Detalles:** Gradientes iridiscentes (`#0066FF` -> `#00D1FF`) en los bordes superiores.

### Tipografía
*   **Headings:** `Inter` (Extra Bold / Black) - Look técnico y agresivo.
*   **Body:** `Inter` (Regular / Light) - Legibilidad máxima.

### Efectos "Liquid Crystal"
*   Fondos con "Blobs" de color que mutan orgánicamente.
*   Bordes de tarjetas animados que simulan flujo de energía/datos.
*   Transiciones suaves (400ms - 600ms) entre estados.

## 4. Arquitectura Técnica

### Frontend
*   **Framework:** Next.js (App Router).
*   **UI Components:** Shadcn/ui (re-estilizado para el tema oscuro premium).
*   **Iconos:** Lucide-react (líneas finas).

### Backend & Integraciones
*   **Server Actions:** `submitDelivery` actualizado para:
    1.  Recibir datos de productos, emails y firma (Base64).
    2.  Generar el PDF final usando `@react-pdf/renderer`.
    3.  Enviar el correo con el adjunto usando **Resend** (desde `notificaciones@sivd.app`).
    4.  Guardar el registro de la entrega en Supabase `entregas` (ID, productos, emails, timestamp), **sin el campo de firma**.

## 5. Criterios de Éxito
1.  La interfaz se siente lujosa, rápida y "viva" (gracias a los efectos de cristal líquido).
2.  El flujo de 4 pasos es claro y sin fricciones.
3.  El correo llega correctamente con el PDF adjunto y la firma incrustada.
4.  No quedan rastros de la imagen de la firma en el servidor ni en la base de datos.
