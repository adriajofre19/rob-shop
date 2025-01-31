import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { CartProvider } from '@/context/cart-context';
import { ToastProvider } from '@/components/ui/custom-toast';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <ToastProvider>
          <CartProvider>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}