import styles from './Shell.module.css';
import { FileSignature } from 'lucide-react';

interface ShellProps {
  children: React.ReactNode;
}

export default function Shell({ children }: ShellProps) {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <FileSignature className={styles.icon} />
            <h1>docufirma-ayg</h1>
          </div>
          <p className={styles.tagline}>Control de Entregas</p>
        </div>
      </header>
      <main className={styles.main}>
        <div className={styles.container}>
          {children}
        </div>
      </main>
      <footer className={styles.footer}>
        <p>&copy; 2026 AYG - Todos los derechos reservados</p>
      </footer>
    </div>
  );
}
