import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { Scale } from 'lucide-react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const getAppIdentifier = () => {
    try {
      return encodeURIComponent(window.location.hostname || 'lexai-app');
    } catch {
      return 'lexai-app';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                <Scale className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">{t('appTitle')}</h1>
                <p className="text-xs text-muted-foreground">{t('appSubtitle')}</p>
              </div>
            </div>
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-border bg-card/30 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} {t('appTitle')}. {t('builtWith')} ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${getAppIdentifier()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
