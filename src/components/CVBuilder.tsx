
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
import { DownloadCloud, Languages } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

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
  experience: [],
  education: [],
  skills: [],
  template: 'modern',
  accentColor: '#2563eb'
};

const CVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(initialData);
  const [language, setLanguage] = useState<'en' | 'fr'>('en');
  const { toast } = useToast();

  const handleDataChange = (newData: Partial<CVData>) => {
    setCVData((prev) => ({ ...prev, ...newData }));
  };

  const handleDownload = () => {
    toast({
      title: "Coming soon!",
      description: "PDF download functionality will be available soon.",
    });
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
            <CVForm data={cvData} onChange={handleDataChange} language={language} />
          </Card>
          
          <div className="lg:sticky lg:top-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {language === 'en' ? 'Preview' : 'Aperçu'}
              </h2>
              <Button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <DownloadCloud className="mr-2 h-4 w-4" />
                {language === 'en' ? 'Download PDF' : 'Télécharger PDF'}
              </Button>
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
