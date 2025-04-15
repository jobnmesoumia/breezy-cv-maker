
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
      titleClass: '',
      fontFamily: '',
      socialLinkClass: ''
    };

    switch (data.template) {
      case 'modern':
        return {
          ...baseStyles,
          background: 'bg-gradient-to-br from-blue-50 to-white',
          headerClass: 'border-l-4 border-blue-500 pl-6 pb-6',
          sectionClass: 'border-l-2 border-blue-200 pl-4',
          titleClass: 'tracking-tight font-medium',
          fontFamily: 'font-poppins',
          socialLinkClass: 'text-blue-600'
        };
      case 'classic':
        return {
          ...baseStyles,
          background: 'bg-white',
          headerClass: 'border-b-2 border-gray-800 pb-6',
          sectionClass: 'border-b border-gray-200 pb-4',
          titleClass: 'font-serif',
          fontFamily: 'font-serif',
          socialLinkClass: 'text-gray-700 underline'
        };
      case 'minimal':
        return {
          ...baseStyles,
          background: 'bg-white',
          headerClass: 'pb-6',
          sectionClass: 'py-4',
          titleClass: 'font-light tracking-wide',
          fontFamily: 'font-sans',
          socialLinkClass: 'text-gray-500'
        };
      case 'professional':
        return {
          ...baseStyles,
          background: 'bg-slate-50',
          headerClass: 'bg-white shadow-sm p-6 rounded-lg',
          sectionClass: 'bg-white shadow-sm p-4 rounded-lg mb-4',
          titleClass: 'font-semibold',
          fontFamily: 'font-opensans',
          socialLinkClass: 'text-slate-700'
        };
      case 'creative':
        return {
          ...baseStyles,
          background: 'bg-gradient-to-br from-purple-50 to-pink-50',
          headerClass: 'border-t-4 border-purple-400 rounded-lg p-6 bg-white/80 backdrop-blur-sm',
          sectionClass: 'rounded-lg p-4 bg-white/80 backdrop-blur-sm mb-4',
          titleClass: 'font-bold tracking-wide',
          fontFamily: 'font-lato',
          socialLinkClass: 'text-purple-600'
        };
      case 'executive':
        return {
          ...baseStyles,
          background: 'bg-gradient-to-br from-slate-100 to-white',
          headerClass: 'border-b-2 border-t-2 border-slate-800 p-6',
          sectionClass: 'border-l-2 border-slate-300 pl-4 mb-4',
          titleClass: 'font-bold uppercase tracking-wider',
          fontFamily: 'font-montserrat',
          socialLinkClass: 'text-slate-800'
        };
      case 'elegant':
        return {
          ...baseStyles,
          background: 'bg-gradient-to-br from-amber-50 to-white',
          headerClass: 'border-double border-b-4 border-amber-800 pb-6',
          sectionClass: 'border-l border-amber-300 pl-4 mb-4',
          titleClass: 'font-medium italic',
          fontFamily: 'font-playfair',
          socialLinkClass: 'text-amber-800'
        };
      case 'tech':
        return {
          ...baseStyles,
          background: 'bg-gradient-to-br from-cyan-50 to-white',
          headerClass: 'border-r-4 border-cyan-500 pr-6 pb-6',
          sectionClass: 'border-b border-cyan-200 pb-4 mb-4',
          titleClass: 'font-medium',
          fontFamily: 'font-roboto',
          socialLinkClass: 'text-cyan-600'
        };
      default:
        return baseStyles;
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={`w-full a4-page ${styles.background} ${styles.fontFamily}`} style={{ minHeight: '29.7cm', width: '21cm' }}>
      <div className="p-8 h-full">
        <header className={`mb-8 ${styles.headerClass}`}>
          <div className="flex items-start gap-6">
            {data.photo && (
              <img
                src={data.photo}
                alt={data.fullName}
                className="w-32 h-32 rounded-full object-cover border-4"
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
                <div className="flex flex-col gap-1 mt-4 text-sm">
                  {data.socialLinks.linkedin && (
                    <div className="overflow-hidden text-ellipsis">
                      <a href={data.socialLinks.linkedin} className={styles.socialLinkClass} target="_blank" rel="noopener noreferrer">
                        {data.socialLinks.linkedin}
                      </a>
                    </div>
                  )}
                  {data.socialLinks.github && (
                    <div className="overflow-hidden text-ellipsis">
                      <a href={data.socialLinks.github} className={styles.socialLinkClass} target="_blank" rel="noopener noreferrer">
                        {data.socialLinks.github}
                      </a>
                    </div>
                  )}
                  {data.socialLinks.website && (
                    <div className="overflow-hidden text-ellipsis">
                      <a href={data.socialLinks.website} className={styles.socialLinkClass} target="_blank" rel="noopener noreferrer">
                        {data.socialLinks.website}
                      </a>
                    </div>
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
          <section className={`mb-6 ${styles.sectionClass}`}>
            <h3 className={`text-lg font-semibold mb-4 ${styles.titleClass}`} style={{ color: data.accentColor }}>
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
          <section className={`mb-6 ${styles.sectionClass}`}>
            <h3 className={`text-lg font-semibold mb-4 ${styles.titleClass}`} style={{ color: data.accentColor }}>
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
