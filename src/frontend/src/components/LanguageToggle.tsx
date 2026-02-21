import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setLanguage(language === 'en' ? 'ta' : 'en')}
      className="gap-2 font-medium"
    >
      <Languages className="w-4 h-4" />
      {language === 'en' ? 'தமிழ்' : 'English'}
    </Button>
  );
}
