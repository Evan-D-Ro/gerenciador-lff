import './globals.css';

import { Analytics } from '@vercel/analytics/react';
import '../public/template/css/fontawesome-free/css/all.min.css'
import './styles.css'

export const metadata = {
  title: 'GERENCIADOR LFF',
  description:
    'Sistema de gerenciamento de turmas e chamada do Lar Francisco Franco'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">

      <body className="flex min-h-screen w-full flex-col">{children}</body>
      <Analytics />
    </html>
  );
}
