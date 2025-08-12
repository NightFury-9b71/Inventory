import React from 'react';
import '@/globals.css';

export const metadata = {
  title: 'Inventory Login Page',
  description: 'Need to sign in to interact with inventory',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}