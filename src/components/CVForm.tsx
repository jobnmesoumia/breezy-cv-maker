import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { CVData, Education, WorkExperience, Skill } from './CVBuilder';
import ColorPicker from './ColorPicker';
import TemplateSelector from './TemplateSelector';
import { Plus, Trash2 } from 'lucide-react';

interface CVFormProps {
  data: CVData;
  onChange: (data: Partial<CVData>) => void;
  language: 'en' | 'fr';
}

const CVForm: React.FC<CVFormProps> = ({ data, onChange, language }) => {
  const handleInputChange = (field: keyof CVData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({ [field]: e.target.value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSocialLinkChange = (field: keyof CVData['socialLinks']) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      socialLinks: {
        ...data.socialLinks,
        [field]: e.target.value
      }
    });
  };

  return (
    <Tabs defaultValue="personal" className="w-full">
      <TabsList className="w-full mb-4">
        <TabsTrigger value="personal" className="flex-1">
          {language === 'en' ? 'Personal' : 'Personnel'}
        </TabsTrigger>
        <TabsTrigger value="experience" className="flex-1">
          {language === 'en' ? 'Experience' : 'Expérience'}
        </TabsTrigger>
        <TabsTrigger value="education" className="flex-1">
          {language === 'en' ? 'Education' : 'Formation'}
        </TabsTrigger>
        <TabsTrigger value="skills" className="flex-1">
          {language === 'en' ? 'Skills' : 'Compétences'}
        </TabsTrigger>
        <TabsTrigger value="styling" className="flex-1">
          {language === 'en' ? 'Style' : 'Style'}
        </TabsTrigger>
      </TabsList>

      <TabsContent value="personal" className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="photo">
            {language === 'en' ? 'Profile Photo' : 'Photo de Profil'}
          </Label>
          <Input
            id="photo"
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="cursor-pointer"
          />
          {data.photo && (
            <img
              src={data.photo}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full mx-auto mt-2"
            />
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullName">
            {language === 'en' ? 'Full Name' : 'Nom Complet'}
          </Label>
          <Input
            id="fullName"
            value={data.fullName}
            onChange={handleInputChange('fullName')}
            placeholder={language === 'en' ? 'John Doe' : 'Jean Dupont'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="jobTitle">
            {language === 'en' ? 'Job Title' : 'Poste'}
          </Label>
          <Input
            id="jobTitle"
            value={data.jobTitle}
            onChange={handleInputChange('jobTitle')}
            placeholder={language === 'en' ? 'Software Engineer' : 'Ingénieur Logiciel'}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">
            {language === 'en' ? 'Location' : 'Localisation'}
          </Label>
          <Input
            id="location"
            value={data.location}
            onChange={handleInputChange('location')}
            placeholder={language === 'en' ? 'City, Country' : 'Ville, Pays'}
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
            <Label htmlFor="phone">
              {language === 'en' ? 'Phone' : 'Téléphone'}
            </Label>
            <Input
              id="phone"
              value={data.phone}
              onChange={handleInputChange('phone')}
              placeholder="+1 234 567 890"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="summary">
            {language === 'en' ? 'Professional Summary' : 'Résumé Professionnel'}
          </Label>
          <Textarea
            id="summary"
            value={data.summary}
            onChange={handleInputChange('summary')}
            placeholder={
              language === 'en'
                ? 'Brief overview of your professional background and goals'
                : 'Bref aperçu de votre parcours professionnel et de vos objectifs'
            }
            className="h-32"
          />
        </div>

        <div className="space-y-4 border-t pt-4 mt-4">
          <h3 className="font-medium">
            {language === 'en' ? 'Social Links' : 'Liens Sociaux'}
          </h3>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              type="url"
              value={data.socialLinks.linkedin}
              onChange={handleSocialLinkChange('linkedin')}
              placeholder="https://linkedin.com/in/username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="github">GitHub</Label>
            <Input
              id="github"
              type="url"
              value={data.socialLinks.github}
              onChange={handleSocialLinkChange('github')}
              placeholder="https://github.com/username"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">
              {language === 'en' ? 'Personal Website' : 'Site Personnel'}
            </Label>
            <Input
              id="website"
              type="url"
              value={data.socialLinks.website}
              onChange={handleSocialLinkChange('website')}
              placeholder="https://example.com"
            />
          </div>
        </div>
      </TabsContent>

      <TabsContent value="experience" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {language === 'en' ? 'Work Experience' : 'Expérience Professionnelle'}
          </h3>
          {data.experience.map((exp, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between">
                <h4 className="font-medium">
                  {language === 'en' ? 'Experience' : 'Expérience'} {index + 1}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newExperience = [...data.experience];
                    newExperience.splice(index, 1);
                    onChange({ experience: newExperience });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder={language === 'en' ? 'Job Title' : 'Poste'}
                value={exp.title}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].title = e.target.value;
                  onChange({ experience: newExperience });
                }}
              />
              <Input
                placeholder={language === 'en' ? 'Company' : 'Entreprise'}
                value={exp.company}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].company = e.target.value;
                  onChange({ experience: newExperience });
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={exp.startDate}
                  onChange={(e) => {
                    const newExperience = [...data.experience];
                    newExperience[index].startDate = e.target.value;
                    onChange({ experience: newExperience });
                  }}
                />
                <Input
                  type="date"
                  value={exp.endDate}
                  onChange={(e) => {
                    const newExperience = [...data.experience];
                    newExperience[index].endDate = e.target.value;
                    onChange({ experience: newExperience });
                  }}
                />
              </div>
              <Input
                placeholder={language === 'en' ? 'Location' : 'Localisation'}
                value={exp.location}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].location = e.target.value;
                  onChange({ experience: newExperience });
                }}
              />
              <Textarea
                placeholder={language === 'en' ? 'Description' : 'Description'}
                value={exp.description}
                onChange={(e) => {
                  const newExperience = [...data.experience];
                  newExperience[index].description = e.target.value;
                  onChange({ experience: newExperience });
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              const newExperience = {
                title: '',
                company: '',
                startDate: '',
                endDate: '',
                description: '',
                location: ''
              };
              onChange({
                experience: [...data.experience, newExperience]
              });
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Add Experience' : 'Ajouter une Expérience'}
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="education" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {language === 'en' ? 'Education' : 'Formation'}
          </h3>
          {data.education.map((edu, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between">
                <h4 className="font-medium">
                  {language === 'en' ? 'Education' : 'Formation'} {index + 1}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newEducation = [...data.education];
                    newEducation.splice(index, 1);
                    onChange({ education: newEducation });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder={language === 'en' ? 'Degree' : 'Diplôme'}
                value={edu.degree}
                onChange={(e) => {
                  const newEducation = [...data.education];
                  newEducation[index].degree = e.target.value;
                  onChange({ education: newEducation });
                }}
              />
              <Input
                placeholder={language === 'en' ? 'School' : 'École'}
                value={edu.school}
                onChange={(e) => {
                  const newEducation = [...data.education];
                  newEducation[index].school = e.target.value;
                  onChange({ education: newEducation });
                }}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={edu.startDate}
                  onChange={(e) => {
                    const newEducation = [...data.education];
                    newEducation[index].startDate = e.target.value;
                    onChange({ education: newEducation });
                  }}
                />
                <Input
                  type="date"
                  value={edu.endDate}
                  onChange={(e) => {
                    const newEducation = [...data.education];
                    newEducation[index].endDate = e.target.value;
                    onChange({ education: newEducation });
                  }}
                />
              </div>
              <Textarea
                placeholder={language === 'en' ? 'Description' : 'Description'}
                value={edu.description}
                onChange={(e) => {
                  const newEducation = [...data.education];
                  newEducation[index].description = e.target.value;
                  onChange({ education: newEducation });
                }}
              />
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              const newEducation = {
                degree: '',
                school: '',
                startDate: '',
                endDate: '',
                description: ''
              };
              onChange({
                education: [...data.education, newEducation]
              });
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Add Education' : 'Ajouter une Formation'}
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="skills" className="space-y-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {language === 'en' ? 'Skills' : 'Compétences'}
          </h3>
          {data.skills.map((skill, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-4">
              <div className="flex justify-between">
                <h4 className="font-medium">
                  {language === 'en' ? 'Skill' : 'Compétence'} {index + 1}
                </h4>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const newSkills = [...data.skills];
                    newSkills.splice(index, 1);
                    onChange({ skills: newSkills });
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Input
                placeholder={language === 'en' ? 'Skill Name' : 'Nom de la Compétence'}
                value={skill.name}
                onChange={(e) => {
                  const newSkills = [...data.skills];
                  newSkills[index].name = e.target.value;
                  onChange({ skills: newSkills });
                }}
              />
              <select
                className="w-full border rounded-md p-2"
                value={skill.level}
                onChange={(e) => {
                  const newSkills = [...data.skills];
                  newSkills[index].level = e.target.value as Skill['level'];
                  onChange({ skills: newSkills });
                }}
              >
                <option value="Beginner">
                  {language === 'en' ? 'Beginner' : 'Débutant'}
                </option>
                <option value="Intermediate">
                  {language === 'en' ? 'Intermediate' : 'Intermédiaire'}
                </option>
                <option value="Advanced">
                  {language === 'en' ? 'Advanced' : 'Avancé'}
                </option>
                <option value="Expert">
                  {language === 'en' ? 'Expert' : 'Expert'}
                </option>
              </select>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={() => {
              const newSkill = {
                name: '',
                level: 'Beginner' as const
              };
              onChange({
                skills: [...data.skills, newSkill]
              });
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Add Skill' : 'Ajouter une Compétence'}
          </Button>
        </div>
      </TabsContent>

      <TabsContent value="styling" className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {language === 'en' ? 'Template' : 'Modèle'}
          </h3>
          <TemplateSelector
            selected={data.template}
            onSelect={(template) => onChange({ template })}
            language={language}
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {language === 'en' ? 'Color Theme' : 'Thème Couleur'}
          </h3>
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
