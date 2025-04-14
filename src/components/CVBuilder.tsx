
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import CVForm from './CVForm';
import CVPreview from './CVPreview';
import { DownloadCloud } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export type CVData = {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
  template: 'modern' | 'classic' | 'minimal';
  accentColor: string;
};

const initialData: CVData = {
  fullName: '',
  jobTitle: '',
  email: '',
  phone: '',
  location: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  template: 'modern',
  accentColor: '#2563eb'
};

const CVBuilder = () => {
  const [cvData, setCVData] = useState<CVData>(initialData);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-playfair font-bold text-gray-900 mb-2">
            Professional CV Builder
          </h1>
          <p className="text-lg text-gray-600">
            Create your standout resume in minutes
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <CVForm data={cvData} onChange={handleDataChange} />
          </Card>
          
          <div className="lg:sticky lg:top-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Preview</h2>
              <Button
                onClick={handleDownload}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <DownloadCloud className="mr-2 h-4 w-4" />
                Download PDF
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
