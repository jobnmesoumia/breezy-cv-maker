
import React from 'react';
import { Card } from '@/components/ui/card';

interface TemplateSelectorProps {
  selected: 'modern' | 'classic' | 'minimal';
  onSelect: (template: 'modern' | 'classic' | 'minimal') => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onSelect }) => {
  const templates = [
    { id: 'modern', name: 'Modern' },
    { id: 'classic', name: 'Classic' },
    { id: 'minimal', name: 'Minimal' },
  ] as const;

  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`p-4 cursor-pointer hover:border-primary transition-colors ${
            selected === template.id ? 'border-primary' : 'border-gray-200'
          }`}
          onClick={() => onSelect(template.id)}
        >
          <div className="aspect-[210/297] bg-gray-100 mb-2" />
          <p className="text-center text-sm font-medium">{template.name}</p>
        </Card>
      ))}
    </div>
  );
};

export default TemplateSelector;
