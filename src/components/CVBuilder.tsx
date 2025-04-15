import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
import { DownloadCloud, Languages } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import ProfessionalLetter from './ProfessionalLetter';

export type Education = {
  degree: string;
  school: string;
  startDate: string;
  endDate: string;
  description: string;
};

export type WorkExperience = {
  title: string;
  company: string;
  startDate: string;
  endDate: string;
  description: string;
  location?: string;
};

export type Skill = {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
};

export type CVData = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  summary: string;
  socialLinks: {
    linkedin?: string;
    github?: string;
    website?: string;
  };
  experience: WorkExperience[];
  education: Education[];
  skills: Skill[];
  template: 'modern' | 'classic' | 'minimal' | 'professional' | 'creative';
  accentColor: string;
};

const initialData: CVData = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  photo: '',
  summary: '',
  socialLinks: {
    linkedin: '',
    github: '',
    website: ''
  },
  experience: [],
  education: [],
  skills: [],
  template: 'modern',
  accentColor: '#2563eb'
};

const CVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(initialData);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const [showLetter, setShowLetter] = React.useState(false);
  const { toast } = useToast();

  const handleDataChange = (newData: Partial<CVData>) => {
    setCVData((prev) => ({ ...prev, ...newData }));
  };

  const handleDownload = async (format: 'pdf' | 'docx' | 'image') => {
    try {
      const cvElement = document.querySelector('.a4-page');
      if (!cvElement) {
        toast({
          title: language === 'en' ? "Error" : "Erreur",
          description: language === 'en' 
            ? "Could not generate document. Please try again." 
            : "Impossible de générer le document. Veuillez réessayer.",
          variant: "destructive",
        });
        return;
      }

      switch (format) {
        case 'pdf':
          const { jsPDF } = await import('jspdf');
          const { default: html2canvas } = await import('html2canvas');
          
          const canvas = await html2canvas(cvElement as HTMLElement, {
            scale: 4,
            useCORS: true,
            logging: false,
            allowTaint: true,
            backgroundColor: '#ffffff',
            width: cvElement.scrollWidth,
            height: cvElement.scrollHeight
          });
          
          const imgData = canvas.toDataURL('image/jpeg', 1.0);
          
          const pdf = new jsPDF({
            format: 'a4',
            unit: 'mm',
            orientation: 'portrait',
            compress: true
          });
          
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          
          pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
          pdf.save('cv.pdf');
          break;

        case 'docx':
          const { Document, Packer, Paragraph, TextRun } = await import('docx');
          
          const doc = new Document({
            sections: [{
              properties: {},
              children: [
                new Paragraph({
                  children: [
                    new TextRun(cvElement.textContent || '')
                  ],
                }),
              ],
            }],
          });
          
          const blob = await Packer.toBlob(doc);
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = 'cv.docx';
          link.click();
          window.URL.revokeObjectURL(url);
          break;

        case 'image':
          const imageCanvas = await html2canvas(cvElement as HTMLElement, {
            scale: 4,
            useCORS: true,
            backgroundColor: '#ffffff'
          });
          
          const link2 = document.createElement('a');
          link2.download = 'cv.png';
          link2.href = imageCanvas.toDataURL('image/png');
          link2.click();
          break;
      }

      toast({
        title: language === 'en' ? "Success!" : "Succès !",
        description: language === 'en' 
          ? `Your CV has been downloaded as ${format.toUpperCase()}` 
          : `Votre CV a été téléchargé en format ${format.toUpperCase()}`,
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

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'fr' : 'en');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">
              {language === 'en' ? 'Professional CV Builder' : 'Créateur de CV Professionnel'}
            </h1>
            <p className="text-lg text-gray-600">
              {language === 'en' ? 'Create your standout resume in minutes' : 'Créez votre CV remarquable en quelques minutes'}
            </p>
          </div>
          <Button
            onClick={toggleLanguage}
            variant="outline"
            className="flex items-center gap-2"
          >
            <Languages className="h-4 w-4" />
            {language === 'en' ? 'Français' : 'English'}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <Tabs defaultValue="cv">
              <TabsList className="w-full mb-4">
                <TabsTrigger value="cv" className="flex-1">
                  {language === 'en' ? 'CV Builder' : 'Créateur de CV'}
                </TabsTrigger>
                <TabsTrigger value="letter" className="flex-1">
                  {language === 'en' ? 'Cover Letter' : 'Lettre de Motivation'}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="cv">
                <CVForm data={cvData} onChange={handleDataChange} language={language} />
              </TabsContent>

              <TabsContent value="letter">
                <ProfessionalLetter cvData={cvData} language={language} />
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="lg:sticky lg:top-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {language === 'en' ? 'Preview' : 'Aperçu'}
              </h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => handleDownload('pdf')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  PDF
                </Button>
                <Button
                  onClick={() => handleDownload('docx')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Word
                </Button>
                <Button
                  onClick={() => handleDownload('image')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Image
                </Button>
              </div>
            </div>
            <Card className="p-6 bg-white">
              <CVPreview data={cvData} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CVBuilder;
