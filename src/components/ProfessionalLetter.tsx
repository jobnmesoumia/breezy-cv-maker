
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { DownloadCloud } from 'lucide-react';
import type { CVData } from './CVBuilder';

interface ProfessionalLetterProps {
  cvData: CVData;
  language: 'en' | 'fr';
}

const ProfessionalLetter: React.FC<ProfessionalLetterProps> = ({ cvData, language }) => {
  const [recipient, setRecipient] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [letterBody, setLetterBody] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const { toast } = useToast();

  const currentDate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handleDownload = async (format: 'pdf' | 'docx' | 'image') => {
    try {
      const letterElement = document.querySelector('.letter-content');
      if (!letterElement) {
        toast({
          title: language === 'en' ? "Error" : "Erreur",
          description: language === 'en' 
            ? "Could not generate document. Please try again." 
            : "Impossible de générer le document. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }

      const originalStyle = letterElement.getAttribute('style') || '';

      switch (format) {
        case 'pdf':
          const { jsPDF } = await import('jspdf');
          const { default: html2canvas } = await import('html2canvas');
          
          const canvas = await html2canvas(letterElement as HTMLElement, {
            scale: 4,
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          const pdf = new jsPDF({
            format: 'a4',
            unit: 'mm'
          });
          
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
          pdf.save('cover-letter.pdf');
          break;

        case 'docx':
          const { Document, Packer, Paragraph, TextRun } = await import('docx');
          
          const doc = new Document({
            sections: [{
              properties: {},
              children: [
                new Paragraph({
                  children: [
                    new TextRun(letterElement.textContent || '')
                  ],
                }),
              ],
            }],
          });
          
          const blob = await Packer.toBlob(doc);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'cover-letter.docx';
          link.click();
          window.URL.revokeObjectURL(url);
          break;

        case 'image':
          const { default: html2canvasImage } = await import('html2canvas');
          
          const imageCanvas = await html2canvasImage(letterElement as HTMLElement, {
            scale: 4,
            useCORS: true,
            backgroundColor: '#ffffff'
          });
          
          const link2 = document.createElement('a');
          link2.download = 'cover-letter.png';
          link2.href = imageCanvas.toDataURL('image/png');
          link2.click();
          break;
      }

      toast({
        title: language === 'en' ? "Success!" : "Succès !",
        description: language === 'en' 
          ? `Your cover letter has been downloaded as ${format.toUpperCase()}` 
          : `Votre lettre de motivation a été téléchargée en format ${format.toUpperCase()}`,
      });
    } catch (error) {
      console.error('Document generation error:', error);
      toast({
        title: language === 'en' ? "Error" : "Erreur",
        description: language === 'en' 
          ? "Could not generate document. Please try again." 
          : "Impossible de générer le document. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label htmlFor="recipient">
            {language === 'en' ? 'Recipient Name' : 'Nom du destinataire'}
          </Label>
          <Input
            id="recipient"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder={language === 'en' ? 'Dr. Jane Smith' : 'Dr. Jane Smith'}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company">
            {language === 'en' ? 'Company Name' : 'Nom de l\'entreprise'}
          </Label>
          <Input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder={language === 'en' ? 'Company Name' : 'Nom de l\'entreprise'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="subject">
            {language === 'en' ? 'Subject' : 'Sujet'}
          </Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={language === 'en' ? 'Application for Senior Developer Position' : 'Candidature pour le poste de développeur senior'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="letter">
            {language === 'en' ? 'Letter Content' : 'Contenu de la lettre'}
          </Label>
          <Textarea
            id="letter"
            value={letterBody}
            onChange={(e) => setLetterBody(e.target.value)}
            className="min-h-[200px]"
            placeholder={
              language === 'en'
                ? "Dear [Recipient],\n\nI am writing to express my interest...\n\nSincerely,\n[Your Name]"
                : "Cher/Chère [Destinataire],\n\nJe vous écris pour manifester mon intérêt...\n\nCordialement,\n[Votre nom]"
            }
          />
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            onClick={() => handleDownload('pdf')}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <DownloadCloud className="h-4 w-4" />
            PDF
          </Button>
          <Button
            onClick={() => handleDownload('docx')}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <DownloadCloud className="h-4 w-4" />
            Word
          </Button>
          <Button
            onClick={() => handleDownload('image')}
            className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          >
            <DownloadCloud className="h-4 w-4" />
            Image
          </Button>
        </div>
      </div>

      <Card className="p-6 bg-white shadow-lg">
        <div className="space-y-6 font-serif letter-content">
          <div className="text-right">{currentDate}</div>
          
          <div className="space-y-2">
            <div>{recipient}</div>
            <div>{company}</div>
          </div>

          <div>
            {language === 'en' ? 'Subject: ' : 'Objet : '}{subject}
          </div>

          <div className="whitespace-pre-wrap">{letterBody}</div>

          <div className="mt-8">
            <div>{cvData.fullName}</div>
            <div>{cvData.email}</div>
            <div>{cvData.phone}</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfessionalLetter;

