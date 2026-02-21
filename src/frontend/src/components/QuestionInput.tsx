import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import VoiceInputButton from './VoiceInputButton';
import { Loader2, Send } from 'lucide-react';

interface QuestionInputProps {
  value: string;
  onChange: (value: string) => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
  disabled?: boolean;
}

export default function QuestionInput({ value, onChange, onAnalyze, isAnalyzing, disabled }: QuestionInputProps) {
  const { t } = useLanguage();

  const handleSubmit = () => {
    if (value.trim() && !isAnalyzing && !disabled) {
      onAnalyze();
    }
  };

  const handleVoiceTranscript = (transcript: string) => {
    onChange(transcript);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question">{t('askQuestion')}</Label>
        <Textarea
          id="question"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t('questionPlaceholder')}
          className="min-h-[120px] resize-none"
          disabled={disabled || isAnalyzing}
        />
      </div>

      <div className="flex gap-2">
        <VoiceInputButton onTranscript={handleVoiceTranscript} disabled={disabled || isAnalyzing} />
        <Button
          onClick={handleSubmit}
          disabled={!value.trim() || isAnalyzing || disabled}
          className="flex-1 gap-2"
        >
          {isAnalyzing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              {t('analyzing')}
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              {t('analyze')}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
