import React from 'react';
import { 
  Lightbulb, 
  ShieldAlert, 
  Workflow, 
  Building2, 
  Sparkles, 
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  ShieldAlert: ShieldAlert,
  Workflow: Workflow,
  Building2: Building2,
  Lightbulb: Lightbulb
};

export default function Vision() {
  const { ideasAndVision, problemSolvingFramework } = portfolioData;

  return (
    <section id="vision" className="vision-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Lightbulb size={16} />
            Ideas & Vision
          </span>
          <h2>{ideasAndVision.title.split('systems that')[0]}<span className="text-gradient">systems that solve real problems</span></h2>
          <p>{ideasAndVision.subtitle}</p>
        </div>

        {/* 4 Vision Pillars */}
        <div className="vision-pillars-grid">
          {ideasAndVision.pillars.map((pillar, idx) => {
            const IconComponent = iconMap[pillar.icon] || Lightbulb;
            return (
              <div key={idx} className="vision-card glass-panel">
                <div className="vision-icon-box">
                  <IconComponent size={24} className="text-cyan" />
                </div>
                <h3 className="vision-card-title">{pillar.title}</h3>
                <p className="vision-card-desc">{pillar.desc}</p>
              </div>
            );
          })}
        </div>

        <div className="vision-clarification-note">
          <p>
            <em>Note:</em> {ideasAndVision.clarification}
          </p>
        </div>

        {/* HOW I APPROACH PROBLEMS Framework */}
        <div className="framework-container glass-panel">
          <div className="framework-header">
            <span className="badge badge-emerald">Methodology</span>
            <h3 className="framework-title">How I Approach Problems</h3>
            <p className="framework-subtitle">
              A disciplined 5-step process from initial discovery to measurable outcomes.
            </p>
          </div>

          <div className="framework-steps-grid">
            {problemSolvingFramework.map((step) => (
              <div key={step.step} className="framework-step-card">
                <div className="step-num-badge">{step.step}</div>
                <h4 className="step-title">{step.name}</h4>
                <p className="step-desc">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
