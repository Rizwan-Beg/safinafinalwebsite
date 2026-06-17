import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import MainLayoutClient from "../components/MainLayoutClient";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Safina Carpets",
  description: "Luxury Handmade Carpets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Libre+Franklin:wght@200;300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />
      </head>
      <body className="flex flex-col min-h-screen">
        <Providers>
          <Toaster 
            position="top-center" 
            toastOptions={{
              className: 'font-body',
              style: {
                borderRadius: '0px',
                background: '#000000',
                color: '#ffffff',
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '16px 24px',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              },
              success: {
                iconTheme: {
                  primary: '#7A0C13',
                  secondary: '#ffffff',
                },
              },
              error: {
                iconTheme: {
                  primary: '#ff3333',
                  secondary: '#ffffff',
                },
              },
            }}
          />
          <MainLayoutClient>
            {children}
          </MainLayoutClient>
        </Providers>
      </body>
    </html>
  );
}
