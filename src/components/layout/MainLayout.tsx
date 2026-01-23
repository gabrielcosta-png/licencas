import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="pl-72 transition-all duration-300">
        <Header title={title} subtitle={subtitle} />
        <main className="p-8 max-w-[1600px]">{children}</main>
      </div>
    </div>
  );
}