import { useState, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { FileText, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface DocumentUploadProps {
  onFileUploaded: (file: { name: string; size: number; content: string } | null) => void;
}

export default function DocumentUpload({ onFileUploaded }: DocumentUploadProps) {
  const { t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setError(null);

    if (!file) {
      setSelectedFile(null);
      onFileUploaded(null);
      return;
    }

    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!validTypes.includes(file.type)) {
      setError(t('invalidFileType'));
      setSelectedFile(null);
      onFileUploaded(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('File size exceeds 10MB limit');
      setSelectedFile(null);
      onFileUploaded(null);
      return;
    }

    setSelectedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    try {
      const reader = new FileReader();
      reader.onprogress = (e) => {
        if (e.lengthComputable) {
          setUploadProgress((e.loaded / e.total) * 100);
        }
      };
      reader.onload = () => {
        const content = reader.result as string;
        onFileUploaded({
          name: file.name,
          size: file.size,
          content: content,
        });
        setIsUploading(false);
        setUploadProgress(100);
      };
      reader.onerror = () => {
        setError('Failed to read file');
        setIsUploading(false);
        setSelectedFile(null);
        onFileUploaded(null);
      };
      reader.readAsText(file);
    } catch (err) {
      setError('Failed to process file');
      setIsUploading(false);
      setSelectedFile(null);
      onFileUploaded(null);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileSelect}
        className="hidden"
      />

      <Button
        onClick={() => fileInputRef.current?.click()}
        variant="outline"
        className="w-full h-32 border-2 border-dashed hover:border-primary transition-colors"
        disabled={isUploading}
      >
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-muted-foreground" />
          <span className="font-medium">{t('selectFile')}</span>
          <span className="text-xs text-muted-foreground">{t('supportedFormats')}</span>
        </div>
      </Button>

      {isUploading && (
        <div className="space-y-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-center text-muted-foreground">Uploading... {Math.round(uploadProgress)}%</p>
        </div>
      )}

      {selectedFile && !isUploading && (
        <Alert className="bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertDescription className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span className="font-medium">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">({formatFileSize(selectedFile.size)})</span>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <p className="text-xs text-muted-foreground text-center">{t('maxFileSize')}</p>
    </div>
  );
}
