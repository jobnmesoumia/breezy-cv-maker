
import React from 'react';
import { Card } from '@/components/ui/card';

interface TemplateSelectorProps {
  selected: 'modern' | 'classic' | 'minimal' | 'professional' | 'creative' | 'executive' | 'elegant' | 'tech';
  onSelect: (template: 'modern' | 'classic' | 'minimal' | 'professional' | 'creative' | 'executive' | 'elegant' | 'tech') => void;
  language: 'en' | 'fr';
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selected, onSelect, language }) => {
  const templates = [
    { 
      id: 'modern' as const,
      name: language === 'en' ? 'Modern' : 'Moderne',
      description: language === 'en' ? 'Clean and contemporary design' : 'Design épuré et contemporain',
      fontFamily: 'font-poppins',
      previewBg: 'bg-gradient-to-br from-blue-50 to-white border-l-4 border-blue-500'
    },
    { 
      id: 'executive' as const,
      name: language === 'en' ? 'Executive' : 'Exécutif',
      description: language === 'en' ? 'Sophisticated and bold' : 'Sophistiqué et audacieux',
      fontFamily: 'font-montserrat',
      previewBg: 'bg-gradient-to-br from-slate-100 to-white border-b-2 border-t-2 border-slate-800'
    },
    { 
      id: 'elegant' as const,
      name: language === 'en' ? 'Elegant' : 'Élégant',
      description: language === 'en' ? 'Refined and tasteful' : 'Raffiné et élégant',
      fontFamily: 'font-playfair',
      previewBg: 'bg-gradient-to-br from-amber-50 to-white border-double border-4 border-amber-800'
    },
    { 
      id: 'tech' as const,
      name: language === 'en' ? 'Tech' : 'Technologique',
      description: language === 'en' ? 'Modern tech aesthetic' : 'Esthétique technologique moderne',
      fontFamily: 'font-roboto',
      previewBg: 'bg-gradient-to-br from-cyan-50 to-white border-r-4 border-cyan-500'
    },
    { 
      id: 'classic' as const,
      name: language === 'en' ? 'Classic' : 'Classique',
      description: language === 'en' ? 'Traditional and elegant' : 'Traditionnel et élégant',
      fontFamily: 'font-serif',
      previewBg: 'bg-white border-b-4 border-gray-800'
    },
    { 
      id: 'minimal' as const,
      name: language === 'en' ? 'Minimal' : 'Minimaliste',
      description: language === 'en' ? 'Simple and focused' : 'Simple et concentré',
      fontFamily: 'font-sans',
      previewBg: 'bg-white border border-gray-200'
    },
    { 
      id: 'professional' as const,
      name: language === 'en' ? 'Professional' : 'Professionnel',
      description: language === 'en' ? 'Business-oriented layout' : 'Mise en page professionnelle',
      fontFamily: 'font-opensans',
      previewBg: 'bg-slate-50 shadow-md rounded-lg'
    },
    { 
      id: 'creative' as const,
      name: language === 'en' ? 'Creative' : 'Créatif',
      description: language === 'en' ? 'Bold and innovative design' : 'Design audacieux et innovant',
      fontFamily: 'font-lato',
      previewBg: 'bg-gradient-to-br from-purple-50 to-pink-50 border-t-4 border-purple-400'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {templates.map((template) => (
        <Card
          key={template.id}
          className={`p-4 cursor-pointer transition-all duration-200 hover:scale-105 overflow-hidden ${
            selected === template.id 
              ? 'ring-2 ring-primary shadow-lg transform scale-105' 
              : 'hover:shadow-md'
          }`}
          onClick={() => onSelect(template.id)}
        >
          <div className={`aspect-[210/297] ${template.previewBg} mb-2 overflow-hidden rounded shadow-sm`}>
            <div className={`w-full h-full p-4 ${template.fontFamily}`}>
              <div className="w-full h-3 bg-gray-300 rounded mb-2" />
              <div className="w-2/3 h-3 bg-gray-300 rounded mb-4" />
              <div className="space-y-2">
                <div className="w-full h-2 bg-gray-200 rounded" />
                <div className="w-full h-2 bg-gray-200 rounded" />
                <div className="w-3/4 h-2 bg-gray-200 rounded" />
              </div>
            </div>
          </div>
          <h4 className={`font-medium text-center ${template.fontFamily}`}>{template.name}</h4>
          <p className="text-xs text-gray-500 text-center mt-1">{template.description}</p>
        </Card>
      ))}
    </div>
  );
};

export default TemplateSelector;
