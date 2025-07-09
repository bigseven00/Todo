"use client";

import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Layout({ children }) {
  const pathname = usePathname();
  const noHeaderFooterRoutes = ['/login', '/register'];
  const showHeaderFooter = !noHeaderFooterRoutes.includes(pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {showHeaderFooter && <Footer />}
    </div>
  );
}