import { useRef, useCallback } from 'react';

type Language = 'en' | 'ta';

export function useVoiceInput(language: Language) {
  const recognitionRef = useRef<any>(null);
  const transcriptRef = useRef<string>('');

  const isSupported = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  const startRecording = useCallback(async (): Promise<boolean> => {
    if (!isSupported) return false;

    try {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();

      recognition.lang = language === 'ta' ? 'ta-IN' : 'en-US';
      recognition.continuous = true;
      recognition.interimResults = true;

      transcriptRef.current = '';

      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            interimTranscript += transcript;
          }
        }

        transcriptRef.current = finalTranscript || interimTranscript;
      };

      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
      };

      recognition.start();
      recognitionRef.current = recognition;
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      return false;
    }
  }, [language, isSupported]);

  const stopRecording = useCallback(async (): Promise<string> => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    return transcriptRef.current.trim();
  }, []);

  return {
    startRecording,
    stopRecording,
    isSupported,
  };
}
