import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Mic, MicOff } from 'lucide-react';
import { useVoiceInput } from '../hooks/useVoiceInput';
import { toast } from 'sonner';

interface VoiceInputButtonProps {
  onTranscript: (transcript: string) => void;
  disabled?: boolean;
}

export default function VoiceInputButton({ onTranscript, disabled }: VoiceInputButtonProps) {
  const { t, language } = useLanguage();
  const [isRecording, setIsRecording] = useState(false);
  const { startRecording, stopRecording, isSupported } = useVoiceInput(language);

  const handleToggleRecording = async () => {
    if (!isSupported) {
      toast.error('Voice input is not supported in your browser');
      return;
    }

    if (isRecording) {
      const transcript = await stopRecording();
      setIsRecording(false);
      if (transcript) {
        onTranscript(transcript);
        toast.success('Voice input captured');
      }
    } else {
      const started = await startRecording();
      if (started) {
        setIsRecording(true);
        toast.info(t('recording'));
      } else {
        toast.error('Failed to start recording. Please check microphone permissions.');
      }
    }
  };

  return (
    <Button
      variant={isRecording ? 'destructive' : 'outline'}
      size="icon"
      onClick={handleToggleRecording}
      disabled={disabled}
      className={isRecording ? 'animate-pulse' : ''}
      title={t('voiceInput')}
    >
      {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </Button>
  );
}
