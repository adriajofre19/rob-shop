import { Comfortaa } from 'next/font/google';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';

const comfortaa = Comfortaa({ subsets: ['latin'] });


export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="es">
            <body className={comfortaa.className}>
                <Navbar />
                {children}
                <Footer />
            </body>
        </html>
    );
}