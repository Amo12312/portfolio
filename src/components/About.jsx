import React from 'react';
import { 
  UserCheck, 
  Target, 
  CheckCircle2, 
  Sparkles, 
  ShieldAlert, 
  Globe, 
  Workflow, 
  Lightbulb,
  ArrowRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  ShieldAlert: ShieldAlert,
  Globe: Globe,
  Workflow: Workflow,
  Lightbulb: Lightbulb
};

export default function About() {
  const { personal, whatIDo } = portfolioData;

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <UserCheck size={16} />
            About Me
          </span>
          <h2>I connect technology with <span className="text-gradient">business needs</span></h2>
          <p>
            My approach combines hands-on technical work with an understanding of day-to-day business operations.
          </p>
        </div>

        {/* Narrative Card */}
        <div className="about-main-card glass-panel">
          <div className="about-narrative-block">
            <h3 className="about-subheading">
              Practical Solutions That Help People Work Smarter
            </h3>
            <p className="about-paragraph">
              {personal.aboutNarrative}
            </p>
            <p className="about-paragraph highlight-dev">
              <strong>Ongoing Growth:</strong> {personal.developingCapabilities}
            </p>
          </div>

          {/* What Drives Me */}
          <div className="what-drives-me-block">
            <h4 className="drives-title">
              <Target size={18} className="text-accent" />
              What Drives Me
            </h4>
            <div className="drives-grid">
              {personal.whatDrivesMe.map((item, idx) => (
                <div key={idx} className="drive-item glass-panel">
                  <CheckCircle2 size={16} className="text-emerald drive-icon" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* Strategic Chess & Systems Thinking Callout */}
            {personal.strategicMindset && (
              <div className="strategic-chess-card glass-panel">
                <div className="chess-badge-icon">
                  <span className="chess-symbol">♟</span>
                </div>
                <div className="chess-text-content">
                  <div className="chess-card-top">
                    <h5 className="chess-card-title">{personal.strategicMindset.title}</h5>
                    <span className="badge badge-emerald">Tactical Execution</span>
                  </div>
                  <p className="chess-card-desc">{personal.strategicMindset.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* WHAT I DO 4 Pillars */}
        <div className="what-i-do-section">
          <div className="subsection-title-row">
            <span className="badge badge-primary">What I Do</span>
            <h3 className="subsection-title">Core Operating Areas</h3>
          </div>

          <div className="what-i-do-grid">
            {whatIDo.map((item, idx) => {
              const IconComp = iconMap[item.icon] || Globe;
              return (
                <div key={idx} className="what-card glass-panel">
                  <div className="what-icon-box">
                    <IconComp size={24} className="text-cyan" />
                  </div>
                  <h4 className="what-title">{item.title}</h4>
                  <p className="what-desc">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
