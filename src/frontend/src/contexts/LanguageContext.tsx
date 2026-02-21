import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'ta';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const stored = sessionStorage.getItem('language');
    return (stored === 'ta' || stored === 'en') ? stored : 'en';
  });

  useEffect(() => {
    sessionStorage.setItem('language', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    appTitle: 'LexAI',
    appSubtitle: 'AI-Powered Legal Case Analyzer',
    uploadDocument: 'Upload Legal Document',
    uploadDescription: 'Upload PDF or DOCX files for analysis',
    selectFile: 'Select File',
    fileSelected: 'File Selected',
    askQuestion: 'Ask Your Legal Question',
    questionPlaceholder: 'Enter your legal question in English or Tamil...',
    analyze: 'Analyze Case',
    analyzing: 'Analyzing...',
    voiceInput: 'Voice Input',
    recording: 'Recording...',
    caseSummary: 'Case Summary',
    legalIssues: 'Legal Issues',
    lawSections: 'Applicable Law Sections',
    evidenceEvaluation: 'Evidence Evaluation',
    strengthAnalysis: 'Strength Analysis',
    plaintiffStrength: 'Plaintiff Strength',
    defendantStrength: 'Defendant Strength',
    strongPoints: 'Strong Points',
    weakPoints: 'Weak Points',
    riskAssessment: 'Risk Assessment',
    neutralOpinion: 'Neutral Opinion',
    legalDisclaimer: 'Legal Disclaimer',
    noFileSelected: 'No file selected',
    invalidFileType: 'Invalid file type. Please upload PDF or DOCX files only.',
    questionRequired: 'Please enter a question',
    analysisResults: 'Analysis Results',
    builtWith: 'Built with',
    supportedFormats: 'Supported formats: PDF, DOCX',
    maxFileSize: 'Maximum file size: 10MB',
  },
  ta: {
    appTitle: 'லெக்ஸ்ஏஐ',
    appSubtitle: 'செயற்கை நுண்ணறிவு சட்ட வழக்கு பகுப்பாய்வி',
    uploadDocument: 'சட்ட ஆவணத்தை பதிவேற்றவும்',
    uploadDescription: 'பகுப்பாய்வுக்கு PDF அல்லது DOCX கோப்புகளை பதிவேற்றவும்',
    selectFile: 'கோப்பைத் தேர்ந்தெடுக்கவும்',
    fileSelected: 'கோப்பு தேர்ந்தெடுக்கப்பட்டது',
    askQuestion: 'உங்கள் சட்ட கேள்வியைக் கேளுங்கள்',
    questionPlaceholder: 'ஆங்கிலம் அல்லது தமிழில் உங்கள் சட்ட கேள்வியை உள்ளிடவும்...',
    analyze: 'வழக்கை பகுப்பாய்வு செய்யவும்',
    analyzing: 'பகுப்பாய்வு செய்கிறது...',
    voiceInput: 'குரல் உள்ளீடு',
    recording: 'பதிவு செய்கிறது...',
    caseSummary: 'வழக்கு சுருக்கம்',
    legalIssues: 'சட்ட பிரச்சினைகள்',
    lawSections: 'பொருந்தும் சட்டப் பிரிவுகள்',
    evidenceEvaluation: 'சாட்சி மதிப்பீடு',
    strengthAnalysis: 'வலிமை பகுப்பாய்வு',
    plaintiffStrength: 'வாதியின் வலிமை',
    defendantStrength: 'பிரதிவாதியின் வலிமை',
    strongPoints: 'வலுவான புள்ளிகள்',
    weakPoints: 'பலவீனமான புள்ளிகள்',
    riskAssessment: 'இடர் மதிப்பீடு',
    neutralOpinion: 'நடுநிலை கருத்து',
    legalDisclaimer: 'சட்ட மறுப்பு',
    noFileSelected: 'கோப்பு தேர்ந்தெடுக்கப்படவில்லை',
    invalidFileType: 'தவறான கோப்பு வகை. PDF அல்லது DOCX கோப்புகளை மட்டும் பதிவேற்றவும்.',
    questionRequired: 'தயவுசெய்து ஒரு கேள்வியை உள்ளிடவும்',
    analysisResults: 'பகுப்பாய்வு முடிவுகள்',
    builtWith: 'உருவாக்கப்பட்டது',
    supportedFormats: 'ஆதரிக்கப்படும் வடிவங்கள்: PDF, DOCX',
    maxFileSize: 'அதிகபட்ச கோப்பு அளவு: 10MB',
  },
};
