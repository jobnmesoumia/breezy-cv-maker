
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
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

  const currentDate = new Date().toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

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
                ? "Dear [Recipient],\n\nI am writing to express my interest in...\n\nSincerely,\n[Your Name]"
                : "Cher/Chère [Destinataire],\n\nJe vous écris pour manifester mon intérêt...\n\nCordialement,\n[Votre nom]"
            }
          />
        </div>
      </div>

      <Card className="p-6 bg-white shadow-lg">
        <div className="space-y-6 font-serif">
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
