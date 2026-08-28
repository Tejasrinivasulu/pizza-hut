'use client';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
const AUTH_PATHS = ['/login', '/register'];
export default function AppChrome({ children }) {
    const pathname = usePathname();
    const isAuthPage = AUTH_PATHS.includes(pathname);
    useEffect(() => {
        if (!isAuthPage)
            return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prev;
            document.documentElement.style.overflow = '';
        };
    }, [isAuthPage]);
    return (<>
      {!isAuthPage && <Header />}
      <main className={isAuthPage ? 'h-screen overflow-hidden' : undefined}>{children}</main>
      {!isAuthPage && <Footer />}
    </>);
}
