import './globals.css';
import AppChrome from '@/components/layout/AppChrome';
import { AppContextProvider } from "../util/ContextProvider";
import { Toaster } from 'react-hot-toast';
import PrelineScript from '@/util/PrelineScript';
import { UIProvider } from '@/util/UIProvider';
export const metadata = {
    title: 'Pizza Fiesta: Order Delicious Pizzas Online',
    description: 'Welcome to PizzaFiesta, where every order is a celebration of flavors!',
};
export default function RootLayout({ children, }) {
    return (<html lang="en" className='scroll-smooth dark'>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;700&family=Poppins:wght@400;600&display=swap" rel="stylesheet"/>
      </head>
      <body className='min-h-screen bg-dark text-gray-100 font-poppins antialiased'>
        <UIProvider>
          <AppContextProvider>
            <Toaster />
            <AppChrome>{children}</AppChrome>
            <PrelineScript />
          </AppContextProvider>
        </UIProvider>
      </body>
    </html>);
}
