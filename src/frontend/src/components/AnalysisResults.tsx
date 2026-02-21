import { useLanguage } from '../contexts/LanguageContext';
import type { LegalAnalysis } from '../backend';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import StrengthChart from './StrengthChart';
import LegalDisclaimer from './LegalDisclaimer';
import { FileText, Scale, BookOpen, Shield, TrendingUp, TrendingDown, AlertTriangle, Info } from 'lucide-react';

interface AnalysisResultsProps {
  analysis: LegalAnalysis;
}

export default function AnalysisResults({ analysis }: AnalysisResultsProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold">{t('analysisResults')}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              {t('caseSummary')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed">{analysis.summary}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-purple-600" />
              {t('legalIssues')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.legal_issues.map((issue, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary font-bold mt-1">•</span>
                  <span className="text-muted-foreground">{issue}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              {t('lawSections')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.law_sections.map((section, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Badge variant="outline" className="shrink-0">
                    {index + 1}
                  </Badge>
                  <span className="text-muted-foreground">{section}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            {t('strengthAnalysis')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <StrengthChart
            plaintiffStrength={analysis.plaintiff_strength}
            defendantStrength={analysis.defendant_strength}
          />
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
              <TrendingUp className="w-5 h-5" />
              {t('strongPoints')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.strong_points.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-600 dark:text-green-400 font-bold mt-1">✓</span>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-red-200 dark:border-red-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
              <TrendingDown className="w-5 h-5" />
              {t('weakPoints')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {analysis.weak_points.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-red-600 dark:text-red-400 font-bold mt-1">✗</span>
                  <span className="text-muted-foreground">{point}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg border-orange-200 dark:border-orange-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
            <AlertTriangle className="w-5 h-5" />
            {t('riskAssessment')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" className="text-base px-4 py-2">
            {analysis.risk_level}
          </Badge>
        </CardContent>
      </Card>

      <LegalDisclaimer disclaimer={analysis.disclaimer} />
    </div>
  );
}
