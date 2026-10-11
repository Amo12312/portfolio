import React from 'react';
import { 
  X, 
  FileSearch, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink, 
  Zap, 
  ShieldAlert, 
  Workflow, 
  Layers 
} from 'lucide-react';

export default function CaseStudyModal({ caseStudy, websiteUrl, company, onClose }) {
  if (!caseStudy) return null;

  return (
    <div className="case-study-backdrop" onClick={onClose}>
      <div className="case-study-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="case-study-top-bar">
          <div className="case-study-badge-wrap">
            <span className="badge badge-primary">
              <FileSearch size={14} />
              Technical Case Study
            </span>
            <span className="case-study-company">{company}</span>
          </div>
          <button 
            type="button" 
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close Case Study"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="case-study-body">
          <h2 className="case-study-headline">{caseStudy.title}</h2>
          
          {/* Context Card */}
          <div className="case-study-section-box">
            <h4 className="case-sec-heading text-cyan">Operational Context</h4>
            <p>{caseStudy.context}</p>
          </div>

          {/* Problem Statement Card */}
          <div className="case-study-section-box border-warning">
            <h4 className="case-sec-heading text-amber">The Problem Encountered</h4>
            <p>{caseStudy.problemStatement}</p>
          </div>

          {/* Steps Taken Breakdown */}
          <div className="case-study-steps-wrapper">
            <h3 className="case-steps-title">
              <Workflow size={18} className="text-accent" />
              Investigation, Solution & Implementation Steps
            </h3>
            <div className="case-steps-list">
              {caseStudy.stepsTaken.map((step, idx) => (
                <div key={idx} className="case-step-card glass-panel">
                  <div className="case-step-num">Step {idx + 1}</div>
                  <div className="case-step-content">
                    <h5 className="case-step-name">{step.step}</h5>
                    <p className="case-step-desc">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verified Outcomes */}
          <div className="case-outcomes-box glass-panel">
            <h4 className="case-sec-heading text-emerald">
              <Zap size={16} />
              Verified Outcomes & Business Impact
            </h4>
            <ul className="outcomes-list">
              {caseStudy.verifiedOutcome.map((outcome, idx) => (
                <li key={idx}>
                  <CheckCircle2 size={16} className="text-emerald outcome-check-icon" />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom Actions */}
          <div className="case-study-footer">
            {websiteUrl && (
              <a 
                href={websiteUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-secondary btn-sm"
              >
                <span>Visit Store Website</span>
                <ExternalLink size={14} />
              </a>
            )}
            <button 
              type="button" 
              className="btn btn-primary btn-sm" 
              onClick={onClose}
            >
              Close Case Study
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
