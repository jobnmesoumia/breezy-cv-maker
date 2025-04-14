
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CVData } from './CVBuilder';
import ColorPicker from './ColorPicker';
import TemplateSelector from './TemplateSelector';

interface CVFormProps {
  data: CVData;
  onChange: (data: Partial<CVData>) => void;
}

const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const handleInputChange = (field: keyof CVData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({ [field]: e.target.value });
  };

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="personal" className="flex-1">Personal</TabsTrigger>
        <TabsTrigger value="experience" className="flex-1">Experience</TabsTrigger>
        <TabsTrigger value="styling" className="flex-1">Style</TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={handleInputChange('fullName')}
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">Job Title</Label>
          <Input
            id="jobTitle"
            value={data.jobTitle}
            onChange={handleInputChange('jobTitle')}
            placeholder="Software Engineer"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">Professional Summary</Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={handleInputChange('summary')}
            placeholder="Brief overview of your professional background and goals"
            className="h-32"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={handleInputChange('email')}
              placeholder="john@example.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={handleInputChange('phone')}
              placeholder="+1 234 567 890"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="experience" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Work Experience</h3>
          <Button
            variant="outline"
            onClick={() => {
              const newExperience = {
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                description: ''
              };
              onChange({
                experience: [...data.experience, newExperience]
              });
            }}
          >
            Add Experience
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="styling" className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Template</h3>
          <TemplateSelector
            selected={data.template}
            onSelect={(template) => onChange({ template })}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Color Theme</h3>
          <ColorPicker
            color={data.accentColor}
            onChange={(color) => onChange({ accentColor: color })}
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default CVForm;
