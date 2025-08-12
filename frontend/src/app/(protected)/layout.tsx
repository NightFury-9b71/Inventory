import '@/globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';
import { AuthProvider } from '@/auth-context';


export const metadata = {
  title: 'Inventory Dashboard',
  description: 'A modern dashboard application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
          <AuthProvider>
            <LayoutWrapper>
              {children}
            </LayoutWrapper>
          </AuthProvider>
      </body>
    </html>
  );
}