
import React from 'react';
import { Card } from '@/components/ui/card';

interface TemplateSelectorProps {
  selected: 'modern' | 'classic' | 'minimal' | 'professional' | 'creative';
  onSelect: (template: 'modern' | 'classic' | 'minimal' | 'professional' | 'creative') => void;
  language: 'en' | 'fr';
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onSelect, language }) => {
  const templates = [
    { 
      id: 'modern',
      name: language === 'en' ? 'Modern' : 'Moderne',
      description: language === 'en' ? 'Clean and contemporary design' : 'Design épuré et contemporain'
    },
    { 
      id: 'classic',
      name: language === 'en' ? 'Classic' : 'Classique',
      description: language === 'en' ? 'Traditional and elegant' : 'Traditionnel et élégant'
    },
    { 
      id: 'minimal',
      name: language === 'en' ? 'Minimal' : 'Minimaliste',
      description: language === 'en' ? 'Simple and focused' : 'Simple et concentré'
    },
    { 
      id: 'professional',
      name: language === 'en' ? 'Professional' : 'Professionnel',
      description: language === 'en' ? 'Business-oriented layout' : 'Mise en page professionnelle'
    },
    { 
      id: 'creative',
      name: language === 'en' ? 'Creative' : 'Créatif',
      description: language === 'en' ? 'Bold and innovative design' : 'Design audacieux et innovant'
    }
  ] as const;

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`p-4 cursor-pointer hover:border-primary transition-colors ${
            selected === template.id ? 'border-primary' : 'border-gray-200'
          }`}
          onClick={() => onSelect(template.id)}
        >
          <div className="aspect-[210/297] bg-gray-100 mb-2 overflow-hidden rounded">
            {/* Template preview image would go here */}
            <div className={`w-full h-full ${template.id}-preview`} />
          </div>
          <h4 className="font-medium text-center">{template.name}</h4>
          <p className="text-sm text-gray-500 text-center mt-1">{template.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default TemplateSelector;
