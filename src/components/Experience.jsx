import React from 'react';
import { 
  Briefcase, 
  Calendar, 
  MapPin, 
  CheckCircle2, 
  Building2, 
  Info,
  Layers
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Experience() {
  const { experiences } = portfolioData;

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Briefcase size={16} />
            Professional Experience
          </span>
          <h2>Hands-On <span className="text-gradient">Experience</span></h2>
          <p>
            Describing substantiated responsibilities and operational deliverables across retail operations and digital IT services.
          </p>
        </div>

        {/* Experience Timeline Grid */}
        <div className="experience-timeline-container">
          {experiences.map((exp, idx) => (
            <div key={exp.id} className="experience-card-full glass-panel">
              {/* Header */}
              <div className="exp-card-header">
                <div className="exp-company-info">
                  <div className="exp-avatar-box">
                    <Building2 size={22} className="text-cyan" />
                  </div>
                  <div>
                    <h3 className="exp-org-name">{exp.company}</h3>
                    <h4 className="exp-org-role">{exp.role}</h4>
                  </div>
                </div>

                <div className="exp-meta-badges">
                  <span className="badge badge-primary">
                    <Calendar size={13} />
                    {exp.period}
                  </span>
                  <span className="badge badge-indigo">
                    <MapPin size={13} />
                    {exp.location}
                  </span>
                  {exp.isCurrent && (
                    <span className="badge badge-emerald">Ongoing Professional Work</span>
                  )}
                </div>
              </div>

              {/* Summary Statement */}
              <div className="exp-summary-box">
                <p>{exp.summary}</p>
              </div>

              {/* Key Deliverables & Responsibilities */}
              <div className="exp-points-container">
                <h5 className="points-heading">Verified Responsibilities & Deliverables</h5>
                <ul className="exp-points-list">
                  {exp.points.map((point, pIdx) => (
                    <li key={pIdx} className="exp-point-item">
                      <CheckCircle2 size={15} className="text-cyan exp-point-icon" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies / Skills */}
              <div className="exp-skills-footer">
                <span className="skills-footer-label">Competencies:</span>
                <div className="exp-skills-chips">
                  {exp.skills.map((skill, sIdx) => (
                    <span key={sIdx} className="skill-chip-item">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
