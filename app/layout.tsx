import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Comfortaa } from 'next/font/google';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import { ToastProvider } from '@/components/ui/custom-toast';
import { Footer } from '@/components/footer';

const comfortaa = Comfortaa({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'NiDEES - Artesanía Sostenible',
  description: 'Artesanía creada con bolsas de plástico recicladas. Reutilizamos artesanalmente las bolsas de plástico para convertirlas en diseños únicos.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={comfortaa.className}>
        <ToastProvider>
          <AuthProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}