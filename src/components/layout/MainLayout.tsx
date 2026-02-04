import { ReactNode } from 'react';
import { TopNavigation } from './TopNavigation';

interface MainLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

export function MainLayout({ children, title, subtitle }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <TopNavigation />
      <div className="pt-16">
        {/* Page Header */}
        <div className="px-6 py-6 border-b border-border/50 bg-gradient-to-r from-primary/5 via-transparent to-transparent">
          <h1 className="text-2xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        
        {/* Main Content */}
        <main className="p-6 bg-gradient-to-b from-muted/20 to-background min-h-[calc(100vh-8rem)]">
          {children}
        </main>
      </div>
    </div>
  );
}
