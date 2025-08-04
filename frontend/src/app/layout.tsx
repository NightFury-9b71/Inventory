import './globals.css';
import LayoutWrapper from '@/components/LayoutWrapper';


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
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}