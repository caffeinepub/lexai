import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface StrengthChartProps {
  plaintiffStrength: string;
  defendantStrength: string;
}

export default function StrengthChart({ plaintiffStrength, defendantStrength }: StrengthChartProps) {
  const { t } = useLanguage();

  const parsePercentage = (value: string): number => {
    const match = value.match(/(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  };

  const plaintiffValue = parsePercentage(plaintiffStrength);
  const defendantValue = parsePercentage(defendantStrength);

  const data = [
    {
      name: t('plaintiffStrength'),
      value: plaintiffValue,
      fill: 'oklch(0.646 0.222 41.116)',
    },
    {
      name: t('defendantStrength'),
      value: defendantValue,
      fill: 'oklch(0.6 0.118 184.704)',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 border-blue-200 dark:border-blue-800">
          <div className="text-center">
            <p className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">{t('plaintiffStrength')}</p>
            <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">{plaintiffStrength}</p>
          </div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 border-purple-200 dark:border-purple-800">
          <div className="text-center">
            <p className="text-sm font-medium text-purple-700 dark:text-purple-300 mb-1">{t('defendantStrength')}</p>
            <p className="text-3xl font-bold text-purple-900 dark:text-purple-100">{defendantStrength}</p>
          </div>
        </Card>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip
            contentStyle={{
              backgroundColor: 'oklch(var(--card))',
              border: '1px solid oklch(var(--border))',
              borderRadius: '8px',
            }}
          />
          <Legend />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
