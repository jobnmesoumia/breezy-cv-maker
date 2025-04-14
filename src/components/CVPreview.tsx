
import React from 'react';
import type { CVData } from './CVBuilder';
import { Card } from '@/components/ui/card';

interface CVPreviewProps {
  data: CVData;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  const getTemplateStyles = () => {
    const baseStyles = {
      background: '',
      headerClass: '',
      sectionClass: '',
      titleClass: ''
    };

    switch (data.template) {
      case 'modern':
        return {
          ...baseStyles,
          background: 'bg-gradient-to-br from-gray-50 to-white',
          headerClass: 'border-b border-gray-200 pb-6',
          sectionClass: 'border-l-2 pl-4',
          titleClass: 'tracking-tight'
        };
      case 'classic':
        return {
          ...baseStyles,
          background: 'bg-white',
          headerClass: 'border-b-2 border-gray-800 pb-6',
          sectionClass: 'border-b border-gray-200 pb-4',
          titleClass: 'font-serif'
        };
      case 'minimal':
        return {
          ...baseStyles,
          background: 'bg-white',
          headerClass: 'pb-6',
          sectionClass: 'py-4',
          titleClass: 'font-light tracking-wide'
        };
      case 'professional':
        return {
          ...baseStyles,
          background: 'bg-slate-50',
          headerClass: 'bg-white shadow-sm p-6 rounded-lg',
          sectionClass: 'bg-white shadow-sm p-4 rounded-lg mb-4',
          titleClass: 'font-semibold'
        };
      case 'creative':
        return {
          ...baseStyles,
          background: 'bg-gradient-to-br from-purple-50 to-pink-50',
          headerClass: 'rounded-lg p-6 bg-white/80 backdrop-blur-sm',
          sectionClass: 'rounded-lg p-4 bg-white/80 backdrop-blur-sm mb-4',
          titleClass: 'font-bold tracking-wide'
        };
      default:
        return baseStyles;
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={`w-full a4-page ${styles.background}`} style={{ minHeight: '29.7cm' }}>
      <div className="p-8 h-full">
        <header className={`mb-8 ${styles.headerClass}`}>
          <div className="flex items-start gap-6">
            {data.photo && (
              <img
                src={data.photo}
                alt={data.fullName}
                className="w-32 h-32 rounded-full object-cover"
                style={{ borderColor: data.accentColor }}
              />
            )}
            <div className="flex-1">
              <h1 className={`text-3xl ${styles.titleClass} mb-2`} style={{ color: data.accentColor }}>
                {data.fullName || 'Your Name'}
              </h1>
              <h2 className="text-xl text-gray-600 mb-4">
                {data.jobTitle || 'Professional Title'}
              </h2>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {data.email && (
                  <span>{data.email}</span>
                )}
                {data.phone && (
                  <span>{data.phone}</span>
                )}
                {data.location && (
                  <span>{data.location}</span>
                )}
              </div>

              {(data.socialLinks.linkedin || data.socialLinks.github || data.socialLinks.website) && (
                <div className="flex gap-4 mt-4 text-sm">
                  {data.socialLinks.linkedin && (
                    <a
                      href={data.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      LinkedIn
                    </a>
                  )}
                  {data.socialLinks.github && (
                    <a
                      href={data.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:underline"
                    >
                      GitHub
                    </a>
                  )}
                  {data.socialLinks.website && (
                    <a
                      href={data.socialLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      Website
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </header>

        {data.summary && (
          <section className={`mb-6 ${styles.sectionClass}`}>
            <h3 className={`text-lg font-semibold mb-2 ${styles.titleClass}`} style={{ color: data.accentColor }}>
              Professional Summary
            </h3>
            <p className="text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className={`mb-6 ${styles.sectionClass}`}>
            <h3 className={`text-lg font-semibold mb-4 ${styles.titleClass}`} style={{ color: data.accentColor }}>
              Work Experience
            </h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{exp.title}</h4>
                    <div className="text-gray-600">
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {exp.startDate} - {exp.endDate}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{exp.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.education.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: data.accentColor }}>
              Education
            </h3>
            {data.education.map((edu, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{edu.degree}</h4>
                    <div className="text-gray-600">
                      {edu.school}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
                <p className="text-gray-700 mt-2">{edu.description}</p>
              </div>
            ))}
          </section>
        )}

        {data.skills.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: data.accentColor }}>
              Skills
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {data.skills.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="font-medium">{skill.name}</span>
                  <span className="text-sm text-gray-500">• {skill.level}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CVPreview;
