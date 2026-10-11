import React, { useState } from 'react';
import { 
  ArrowRight, 
  Download, 
  MapPin, 
  Mail, 
  Phone, 
  CheckCircle, 
  Copy, 
  Server, 
  ShieldCheck, 
  Activity, 
  Terminal, 
  Layers,
  Workflow,
  Sparkles
} from 'lucide-react';
import { LinkedinIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const { personal } = portfolioData;
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Bio & Core Pitch */}
          <div className="hero-left">
            {/* Live Availability Pill */}
            <div className="hero-badge-wrapper">
              <span className="badge badge-emerald">
                <span className="pulse-dot"></span>
                <span>Technology & Business Professional • Available for Roles</span>
              </span>
            </div>

            {/* Main Greeting & Name */}
            <h1 className="hero-title">
              {personal.name}
            </h1>

            {/* Impact Headline */}
            <div className="hero-tagline-heading">
              <span className="text-gradient">{personal.taglineHeading}</span>
            </div>

            <div className="hero-role-title">
              {personal.roleTitle}
            </div>

            {/* Core Value Proposition Narrative */}
            <p className="hero-desc">
              {personal.tagline}
            </p>

            <p className="hero-subdesc">
              {personal.subtagline}
            </p>

            {/* Quick Contact Chips */}
            <div className="hero-contact-chips">
              <div className="chip">
                <MapPin size={15} className="chip-icon text-accent" />
                <span>{personal.location}</span>
              </div>
              <button 
                type="button" 
                className="chip chip-clickable" 
                onClick={copyEmail}
                title="Click to copy email"
              >
                <Mail size={15} className="chip-icon text-accent" />
                <span>{personal.email}</span>
                {copiedEmail ? (
                  <CheckCircle size={14} className="text-emerald" />
                ) : (
                  <Copy size={13} className="chip-copy-icon" />
                )}
              </button>
              <a href={`tel:${personal.phone}`} className="chip chip-clickable">
                <Phone size={15} className="chip-icon text-accent" />
                <span>{personal.phone}</span>
              </a>
            </div>

            {/* Primary Action Buttons */}
            <div className="hero-cta-group">
              <a href="#projects" className="btn btn-primary">
                <span>Explore My Work</span>
                <ArrowRight size={17} />
              </a>
              <a href="#contact" className="btn btn-secondary">
                <span>Get in Touch</span>
              </a>
              <button 
                type="button" 
                className="btn btn-outline" 
                onClick={onOpenResume}
              >
                <span>Resume</span>
                <Download size={15} />
              </button>
              <a 
                href={personal.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline btn-icon-only"
                aria-label="LinkedIn Profile"
                title="View LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive System & Architecture Console */}
          <div className="hero-right">
            <div className="interactive-card glass-panel floating-anim">
              {/* Card Header bar */}
              <div className="card-top-bar">
                <div className="window-dots">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                </div>
                <div className="card-top-title">
                  <Terminal size={13} />
                  <span>amogh.systems // architecture-hub</span>
                </div>
                <div className="card-top-badge">
                  <span className="pulse-dot"></span>
                  <span>ACTIVE</span>
                </div>
              </div>

              {/* Console Body */}
              <div className="card-body">
                <div className="profile-snippet">
                  <div className="avatar-box">
                    <span className="avatar-initials">AR</span>
                  </div>
                  <div>
                    <h3 className="profile-name">Amogh Ramteke</h3>
                    <p className="profile-role">Technology • Operations • Solutions</p>
                  </div>
                </div>

                {/* Operations & System Live Indicators */}
                <div className="sys-metrics-list">
                  <div className="sys-metric-item">
                    <div className="metric-header">
                      <span className="metric-title">
                        <Workflow size={15} className="text-cyan" />
                        Business Process & Workflow Design
                      </span>
                      <span className="metric-val text-cyan">Structured</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-fill fill-cyan" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div className="sys-metric-item">
                    <div className="metric-header">
                      <span className="metric-title">
                        <Server size={15} className="text-indigo" />
                        Web Development & E-Commerce Ops
                      </span>
                      <span className="metric-val text-indigo">Active</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-fill fill-indigo" style={{ width: '92%' }}></div>
                    </div>
                  </div>

                  <div className="sys-metric-item">
                    <div className="metric-header">
                      <span className="metric-title">
                        <ShieldCheck size={15} className="text-emerald" />
                        IT Operations & System Reliability
                      </span>
                      <span className="metric-val text-emerald">Reliable</span>
                    </div>
                    <div className="progress-bar-bg">
                      <div className="progress-fill fill-emerald" style={{ width: '98%' }}></div>
                    </div>
                  </div>
                </div>

                {/* Quick tech tags in console */}
                <div className="console-tech-tags">
                  <span className="tech-tag">React.js</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">Prisma</span>
                  <span className="tech-tag">PostgreSQL</span>
                  <span className="tech-tag">Shopify</span>
                  <span className="tech-tag">Docker</span>
                  <span className="tech-tag">Apps Script</span>
                  <span className="tech-tag">IT Ops</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
