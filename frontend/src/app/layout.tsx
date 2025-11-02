'use client';

import { Inter } from "next/font/google";
import "@/globals.css";
import { AuthProvider } from "@/auth-context";
import Providers from "@/components/Providers";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLoginPage = pathname.startsWith('/login');
  const isLandingPage = pathname === '/';
  const showLayout = !isLoginPage && !isLandingPage;

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            {showLayout ? (
              <div className="flex h-screen overflow-hidden">
                <Sidebar />
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header />
                  <main className="flex-1 overflow-y-auto bg-gray-50">
                    <div className="max-w-7xl mx-auto p-8">{children}</div>
                  </main>
                  <Footer />
                </div>
              </div>
            ) : (
              children
            )}
            <Toaster position='top-right' richColors />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
