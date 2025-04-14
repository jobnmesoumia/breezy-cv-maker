
import React from 'react';
import type { CVData } from './CVBuilder';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Calendar, Building, GraduationCap, Star } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

const CVPreview: React.FC<CVPreviewProps> = ({ data }) => {
  return (
    <div className="w-full a4-page bg-white shadow-sm" style={{ minHeight: '29.7cm' }}>
      <div className="p-8">
        <header className="mb-8 flex items-start gap-6">
          {data.photo && (
            <img
              src={data.photo}
              alt={data.fullName}
              className="w-32 h-32 rounded-full object-cover border-4"
              style={{ borderColor: data.accentColor }}
            />
          )}
          <div className="flex-1">
            <h1 className="text-3xl font-playfair font-bold mb-2" style={{ color: data.accentColor }}>
              {data.fullName || 'Your Name'}
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">
              {data.jobTitle || 'Professional Title'}
            </h2>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {data.email && (
                <div className="flex items-center gap-1">
                  <Mail className="h-4 w-4" />
                  {data.email}
                </div>
              )}
              {data.phone && (
                <div className="flex items-center gap-1">
                  <Phone className="h-4 w-4" />
                  {data.phone}
                </div>
              )}
              {data.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {data.location}
                </div>
              )}
            </div>
          </div>
        </header>

        {data.summary && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-2" style={{ color: data.accentColor }}>
              Professional Summary
            </h3>
            <p className="text-gray-700">{data.summary}</p>
          </section>
        )}

        {data.experience.length > 0 && (
          <section className="mb-6">
            <h3 className="text-lg font-semibold mb-4" style={{ color: data.accentColor }}>
              Work Experience
            </h3>
            {data.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{exp.title}</h4>
                    <div className="text-gray-600 flex items-center gap-1">
                      <Building className="h-4 w-4" />
                      {exp.company}
                      {exp.location && ` • ${exp.location}`}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
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
                    <div className="text-gray-600 flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      {edu.school}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
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
                  <Star className="h-4 w-4" style={{ color: data.accentColor }} />
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
