import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import DocumentUpload from '../components/DocumentUpload';
import QuestionInput from '../components/QuestionInput';
import AnalysisResults from '../components/AnalysisResults';
import { useAnalysis } from '../hooks/useQueries';
import type { LegalAnalysis } from '../backend';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function AnalysisPage() {
  const { t } = useLanguage();
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number; content: string } | null>(null);
  const [question, setQuestion] = useState('');
  const [analysisResult, setAnalysisResult] = useState<LegalAnalysis | null>(null);

  const { analyzeCase, isAnalyzing } = useAnalysis();

  const handleAnalyze = async () => {
    if (!uploadedFile || !question.trim()) {
      return;
    }

    const result = await analyzeCase({
      fileName: uploadedFile.name,
      fileSize: uploadedFile.size,
      content: uploadedFile.content,
      question: question.trim(),
    });

    if (result) {
      setAnalysisResult(result);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{t('appSubtitle')}</h2>
        <p className="text-muted-foreground">
          Upload your legal documents and ask questions to receive AI-powered analysis
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t('uploadDocument')}</CardTitle>
            <CardDescription>{t('uploadDescription')}</CardDescription>
          </CardHeader>
          <CardContent>
            <DocumentUpload onFileUploaded={setUploadedFile} />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>{t('askQuestion')}</CardTitle>
            <CardDescription>Enter your question in English or Tamil</CardDescription>
          </CardHeader>
          <CardContent>
            <QuestionInput
              value={question}
              onChange={setQuestion}
              onAnalyze={handleAnalyze}
              isAnalyzing={isAnalyzing}
              disabled={!uploadedFile}
            />
          </CardContent>
        </Card>
      </div>

      {analysisResult && (
        <>
          <Separator className="my-8" />
          <AnalysisResults analysis={analysisResult} />
        </>
      )}
    </div>
  );
}
