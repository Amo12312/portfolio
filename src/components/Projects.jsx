import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Layers, 
  Check, 
  Code, 
  Sparkles, 
  Server, 
  Smartphone,
  Workflow,
  ShoppingBag,
  Database,
  ArrowUpRight,
  ShieldAlert,
  AlertTriangle,
  Clock,
  Target,
  FileSearch
} from 'lucide-react';
import CaseStudyModal from './CaseStudyModal';
import { portfolioData } from '../data/portfolioData';

export default function Projects() {
  const { projects } = portfolioData;
  const [activeProjectModal, setActiveProjectModal] = useState(null);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <FolderGit2 size={16} />
            Selected Projects
          </span>
          <h2>Practical Systems & <span className="text-gradient">Product Thinking</span></h2>
          <p>
            From FinTech payment layers and business delegation systems to live e-commerce operations and hosting deployments.
          </p>
        </div>

        {/* 6 Selected Projects Grid */}
        <div className="projects-showcase-grid">
          {projects.map((project) => (
            <div key={project.id} className="selected-project-card glass-panel">
              {/* Card Header */}
              <div className="proj-card-top">
                <span className="proj-number text-gradient">{project.number}</span>
                <span className="badge badge-primary">{project.badge}</span>
              </div>

              {/* Title & Category */}
              <div className="proj-category-pill">{project.category}</div>
              <h3 className="proj-title">{project.title}</h3>
              <p className="proj-summary">{project.summary}</p>

              {/* The Idea / Problem Callout */}
              {project.theIdea && (
                <div className="proj-callout-box">
                  <span className="callout-label">The Idea:</span>
                  <p>{project.theIdea}</p>
                </div>
              )}

              {project.theProblem && (
                <div className="proj-callout-box">
                  <span className="callout-label">Problem Addressed:</span>
                  <p>{project.theProblem}</p>
                </div>
              )}

              {/* Project Focus / Areas of Contribution Checklist */}
              <div className="proj-deliverables">
                <span className="deliverables-title">Key Areas / Focus:</span>
                <ul className="deliverables-list">
                  {(project.projectFocus || project.proposedSolution || project.areasOfContribution || project.areasOfWork || project.relevantAreas || []).slice(0, 4).map((item, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Technologies */}
              <div className="proj-tech-wrap">
                <span className="tech-heading">Stack:</span>
                <div className="proj-tech-tags">
                  {project.technologies.map((t, idx) => (
                    <span key={idx} className="tech-badge">{t}</span>
                  ))}
                </div>
              </div>

              {/* My Focus & Next Milestone */}
              <div className="proj-focus-block">
                <p><strong>My Focus:</strong> {project.myFocus}</p>
                {project.nextMilestone && (
                  <p className="milestone-text">
                    <Target size={13} className="text-accent inline-icon" />
                    <strong>Next Milestone:</strong> {project.nextMilestone}
                  </p>
                )}
              </div>

              {/* Action Links & Case Study Trigger */}
              <div className="proj-actions-row">
                {project.caseStudy && (
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    onClick={() => setActiveProjectModal(project)}
                  >
                    <FileSearch size={14} />
                    <span>View Case Study</span>
                  </button>
                )}

                {project.websiteUrl && (
                  <a 
                    href={project.websiteUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-secondary btn-sm"
                  >
                    <span>Visit Live Site</span>
                    <ArrowUpRight size={14} />
                  </a>
                )}
              </div>

              {/* Disclaimer if present */}
              {project.disclaimer && (
                <div className="proj-disclaimer">
                  <AlertTriangle size={13} className="text-amber" />
                  <span>{project.disclaimer}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Interactive Case Study Modal */}
        {activeProjectModal && (
          <CaseStudyModal 
            caseStudy={activeProjectModal.caseStudy}
            websiteUrl={activeProjectModal.websiteUrl}
            company={activeProjectModal.title}
            onClose={() => setActiveProjectModal(null)}
          />
        )}
      </div>
    </section>
  );
}
