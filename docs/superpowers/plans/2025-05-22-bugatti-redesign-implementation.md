# Docufirma AyG - Bugatti Liquid Crystal Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the delivery application with a "Bugatti Liquid Crystal" premium aesthetic, restructuring the flow to include a PDF preview before email entry and removing signature storage.

**Architecture:** A 4-step wizard (Capture -> Preview -> Emails -> Signature) using a centralized React context (`useDeliveryStore`). The UI will use custom Framer Motion animations for the "Liquid Crystal" effects and Tailwind CSS for the dark Bugatti theme.

**Tech Stack:** Next.js (App Router), Tailwind CSS, Framer Motion, Resend (notificaciones@sivd.app), Supabase (PostgreSQL), @react-pdf/renderer.

---

### Task 1: Bugatti & Liquid Crystal Foundation

**Files:**
- Create: `src/styles/bugatti.css`
- Modify: `tailwind.config.ts`
- Modify: `src/app/layout.tsx`

- [ ] **Step 1: Create global Bugatti styles**

```css
/* src/styles/bugatti.css */
@keyframes morph {
  0% { border-radius: 50%; transform: translate(-10%, -10%) scale(1); }
  33% { border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; transform: translate(10%, 5%) scale(1.1); }
  66% { border-radius: 70% 30% 50% 50% / 30% 30% 70% 70%; transform: translate(-5%, 10%) scale(0.9); }
  100% { border-radius: 50%; transform: translate(-10%, -10%) scale(1); }
}

.liquid-blob {
  position: fixed;
  width: 600px;
  height: 600px;
  background: #0066FF;
  filter: blur(120px);
  z-index: -1;
  opacity: 0.15;
  animation: morph 20s infinite alternate ease-in-out;
}
```

- [ ] **Step 2: Update Tailwind config for Bugatti colors**

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        bugatti: {
          blue: '#0066FF',
          black: '#050505',
          carbon: '#111111',
        }
      }
    }
  }
}
```

- [ ] **Step 3: Apply dark theme to layout**

Modify `src/app/layout.tsx` to include `src/styles/bugatti.css` and set `className="bg-bugatti-black text-white"`.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "style: add bugatti liquid crystal foundation"
```

---

### Task 2: Store Restructuring & Flow Update

**Files:**
- Modify: `src/hooks/useDeliveryStore.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update DeliveryContextType for 4 steps**

Modify `src/hooks/useDeliveryStore.tsx`:
- Change `step` initial state to 1.
- Ensure `nextStep` allows reaching step 4.
- Add `resetDelivery` logic to clear all states.

- [ ] **Step 2: Update Home page for the new steps**

```tsx
// src/app/page.tsx
{step === 1 && <ProductForm />}
{step === 2 && <DeliveryPDFPreview />}
{step === 3 && <EmailEntry />}
{step === 4 && <SignaturePad />}
{step === 5 && <SuccessView />}
```

- [ ] **Step 3: Commit**

```bash
git add src/hooks/useDeliveryStore.tsx src/app/page.tsx
git commit -m "feat: restructure delivery flow to 4 steps"
```

---

### Task 3: Premium Capture & PDF Preview (Paso 1 y 2)

**Files:**
- Modify: `src/components/delivery/ProductForm.tsx`
- Create: `src/components/delivery/DeliveryPDFPreview.tsx`

- [ ] **Step 1: Redesign ProductForm with Bugatti style**
- Use `bg-white/5` for inputs.
- Use `border-white/10` and `focus:border-bugatti-blue`.
- Add a "Liquid" border effect using a framer-motion div.

- [ ] **Step 2: Implement DeliveryPDFPreview**
- Use `@react-pdf/renderer`'s `PDFViewer` if available client-side, or a mock-up that looks like a technical spec.
- Requirement: Must show the list of products added in Step 1.

- [ ] **Step 3: Commit**

```bash
git add src/components/delivery/
git commit -m "feat: implement premium product form and pdf preview"
```

---

### Task 4: Email Configuration & Resend Integration (Paso 3)

**Files:**
- Create: `src/components/delivery/EmailEntry.tsx`
- Modify: `src/app/actions/submit-delivery.ts`

- [ ] **Step 1: Create EmailEntry component**
- Input for multiple emails.
- Validation for email format.

- [ ] **Step 2: Update submitDelivery action**
- Change `from` to `notificaciones@sivd.app`.
- **CRITICAL:** Remove `supabase.storage.upload` for the signature.
- **CRITICAL:** Remove the `firma` field from the Supabase DB `insert`.

- [ ] **Step 3: Commit**

```bash
git add src/components/delivery/EmailEntry.tsx src/app/actions/submit-delivery.ts
git commit -m "feat: configure resend domain and remove signature storage"
```

---

### Task 5: Liquid Signature & Final Submission (Paso 4)

**Files:**
- Modify: `src/components/delivery/SignaturePad.tsx`
- Modify: `src/components/delivery/SuccessView.tsx`

- [ ] **Step 1: Update SignaturePad**
- Use `react-signature-canvas`.
- Background should be a dark glass with a subtle blue glow.
- The "Submit" button should trigger `submitDelivery`.

- [ ] **Step 2: Implement SuccessView**
- Show a confirmation with a Bugatti-style "Precision Checkmark".
- Option to "Start New Delivery".

- [ ] **Step 3: Verify end-to-end flow**
- Run: `npm run dev`
- Test: Complete the 4 steps and verify the email arrives with the PDF but NO signature is saved in Supabase.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: complete bugatti liquid crystal redesign"
```
