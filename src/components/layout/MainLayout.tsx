import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-72">
        <Header title={title} />
        <main className="p-6 bg-gradient-to-b from-sidebar-accent/30 to-background min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
