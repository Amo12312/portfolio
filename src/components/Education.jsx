import React from 'react';
import { 
  GraduationCap, 
  Award, 
  Calendar, 
  Building, 
  BookOpen 
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Education() {
  const { education } = portfolioData;

  return (
    <section id="education" className="education-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <GraduationCap size={16} />
            Academic Background
          </span>
          <h2>Education & <span className="text-gradient">Qualifications</span></h2>
          <p>
            Academic foundation in Computer Applications, Software Systems, and Information Technology.
          </p>
        </div>

        {/* Education Timeline Cards */}
        <div className="education-grid">
          {education.map((item, idx) => (
            <div key={idx} className="edu-card glass-panel">
              <div className="edu-top-row">
                <div className="edu-icon-box">
                  {idx === 0 ? <GraduationCap size={24} className="text-accent" /> : <BookOpen size={22} className="text-indigo" />}
                </div>
                <div className="edu-year-badge">
                  <Calendar size={13} />
                  <span>{item.year}</span>
                </div>
              </div>

              <h3 className="edu-degree">{item.degree}</h3>
              <h4 className="edu-institution">
                <Building size={15} className="text-muted" />
                <span>{item.institution}</span>
              </h4>

              <div className="edu-grade-tag">
                <Award size={14} className="text-emerald" />
                <span>{item.grade}</span>
              </div>

              <p className="edu-details">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
