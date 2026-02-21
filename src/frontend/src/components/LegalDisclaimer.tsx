import { useLanguage } from '../contexts/LanguageContext';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

interface LegalDisclaimerProps {
  disclaimer: string;
}

export default function LegalDisclaimer({ disclaimer }: LegalDisclaimerProps) {
  const { t } = useLanguage();

  return (
    <Alert variant="destructive" className="border-2 shadow-lg">
      <AlertTriangle className="h-5 w-5" />
      <AlertTitle className="text-lg font-bold">{t('legalDisclaimer')}</AlertTitle>
      <AlertDescription className="mt-2 text-base leading-relaxed">
        {disclaimer}
      </AlertDescription>
    </Alert>
  );
}
