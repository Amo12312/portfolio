import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Download, 
  Copy, 
  Check, 
  ExternalLink, 
  FileText,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  const [copied, setCopied] = useState(false);
  const { personal, experiences, education, skillsCategories } = portfolioData;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const copyResumePlainText = () => {
    const text = `
AMOGH RAMTEKE
IT Support Executive | Application Support | Configuration & E-commerce
Pune, Maharashtra | +91-8080230723 | amoghramteke906@gmail.com
LinkedIn: ${personal.linkedin}

PROFESSIONAL SUMMARY
${personal.summary}

PROFESSIONAL EXPERIENCE
MB ASHTEKAR JEWELLERS, Pune, Maharashtra
IT Support Executive & E-commerce (May 2026 – Present)
• Provide day-to-day IT and application support, troubleshooting hardware, software, network, website, and system-related issues.
• Configure and maintain e-commerce platforms, website components, business applications, and related technical services.
• Support website deployment, configuration changes, testing, and production issue resolution.
• Coordinate with Marketing, Management, vendors, and technical teams to gather requirements, resolve issues, and implement changes.
• Manage product data, images, website updates, and e-commerce content uploads.
• Monitor website functionality and troubleshoot configuration and technical issues, escalating complex problems when required.
• Maintain technical documentation, issue records, operational updates, and reports for management and stakeholders.
• Support third-party services and integrations including payment, hosting, domain, cloud, and e-commerce tools.

TARS TECHNOLOGIES, Nagpur, Maharashtra
IT Operations / Technical Support (Nov 2025 – Mar 2026)
• Provided technical support and troubleshooting for systems, applications, hardware, software, and network-related issues.
• Assisted with configuration, installation, testing, and maintenance of IT systems and software.
• Supported application and website activities including deployment, updates, configuration changes, and issue resolution.
• Performed system analysis and troubleshooting to identify root causes and restore services within required timelines.
• Maintained technical records, issue logs, configuration information, and operational documentation.
• Coordinated with internal teams and stakeholders for requirements, issue resolution, system changes, and technical support.
• Assisted in maintaining IT infrastructure, user systems, peripherals, and basic networking equipment.

TECHNICAL SKILLS
Web: HTML, CSS, JavaScript, React.js, Bootstrap, PHP, WordPress
Backend & Database: Node.js, Express.js, MongoDB, Firebase
E-commerce: Shopify, Product Management, Razorpay, E-commerce Operations
Cloud & Deployment: DigitalOcean, Docker, Cloudinary, WinSCP, Website Deployment
IT Support: Windows, Hardware Troubleshooting, Software Installation, Networking, CCTV, Peripheral Support
Tools: Git/GitHub, MS Excel, Google Workspace, Documentation, MIS Reporting

EDUCATION
BCA – Savitribai Phule Pune University, Pune (2023)
HSC – Dada Ramchandra Bakru Sindhu Mahavidyalaya (2019)
SSC – Bishop Cotton School (2017)
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="resume-modal-backdrop" onClick={onClose}>
      <div className="resume-modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="modal-top-bar">
          <div className="modal-top-title">
            <FileText size={18} className="text-accent" />
            <span>Curriculum Vitae • Amogh Ramteke</span>
          </div>
          <div className="modal-actions-right">
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={copyResumePlainText}
              title="Copy plain text"
            >
              {copied ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
            <button 
              type="button" 
              className="btn btn-primary btn-sm"
              onClick={handlePrint}
              title="Print or Save as PDF"
            >
              <Printer size={14} />
              <span>Print / Save PDF</span>
            </button>
            <button 
              type="button" 
              className="modal-close-btn"
              onClick={onClose}
              aria-label="Close Modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet */}
        <div className="printable-resume-sheet" id="printable-resume">
          {/* Header */}
          <div className="resume-header">
            <h1 className="resume-candidate-name">{personal.name}</h1>
            <p className="resume-candidate-subtitle">
              IT Support Executive | Application Support | Configuration & E-commerce
            </p>
            <div className="resume-contact-inline">
              <span>{personal.location}</span>
              <span>•</span>
              <a href={`tel:${personal.phone}`}>{personal.phone}</a>
              <span>•</span>
              <a href={`mailto:${personal.email}`}>{personal.email}</a>
              <span>•</span>
              <a href={personal.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
          </div>

          <div className="resume-divider"></div>

          {/* Section: Professional Summary */}
          <div className="resume-section">
            <h2 className="resume-sec-title">PROFESSIONAL SUMMARY</h2>
            <p className="resume-sec-text">{personal.summary}</p>
          </div>

          {/* Section: Core Competencies */}
          <div className="resume-section">
            <h2 className="resume-sec-title">CORE COMPETENCIES</h2>
            <p className="resume-sec-text">
              Application Configuration • System Configuration • IT Support • Application Support • Troubleshooting • Incident & Issue Resolution • Change Management • Testing & Validation • Deployment Support • Patch/Upgrade Support • Configuration Documentation • MIS & Reporting • Stakeholder Coordination • Backend Support • E-commerce Operations
            </p>
          </div>

          {/* Section: Professional Experience */}
          <div className="resume-section">
            <h2 className="resume-sec-title">PROFESSIONAL EXPERIENCE</h2>
            
            {/* MB Ashtekar */}
            <div className="resume-job-entry">
              <div className="resume-job-top">
                <strong>MB ASHTEKAR JEWELLERS</strong>
                <span>Pune, Maharashtra</span>
              </div>
              <div className="resume-job-sub">
                <em>IT Support Executive & E-commerce</em>
                <span>May 2026 – Present</span>
              </div>
              <ul className="resume-job-bullets">
                <li>Provide day-to-day IT and application support, troubleshooting hardware, software, network, website, and system-related issues.</li>
                <li>Configure and maintain e-commerce platforms, website components, business applications, and related technical services.</li>
                <li>Support website deployment, configuration changes, testing, and production issue resolution.</li>
                <li>Coordinate with Marketing, Management, vendors, and technical teams to gather requirements, resolve issues, and implement changes.</li>
                <li>Manage product data, images, website updates, and e-commerce content uploads.</li>
                <li>Monitor website functionality and troubleshoot configuration and technical issues, escalating complex problems when required.</li>
                <li>Maintain technical documentation, issue records, operational updates, and reports for management and stakeholders.</li>
                <li>Support third-party services and integrations including payment, hosting, domain, cloud, and e-commerce tools.</li>
              </ul>
            </div>

            {/* Tars Technologies */}
            <div className="resume-job-entry">
              <div className="resume-job-top">
                <strong>TARS TECHNOLOGIES</strong>
                <span>Nagpur, Maharashtra</span>
              </div>
              <div className="resume-job-sub">
                <em>IT Operations / Technical Support</em>
                <span>Nov 2025 – Mar 2026</span>
              </div>
              <ul className="resume-job-bullets">
                <li>Provided technical support and troubleshooting for systems, applications, hardware, software, and network-related issues.</li>
                <li>Assisted with configuration, installation, testing, and maintenance of IT systems and software.</li>
                <li>Supported application and website activities including deployment, updates, configuration changes, and issue resolution.</li>
                <li>Performed system analysis and troubleshooting to identify root causes and restore services within required timelines.</li>
                <li>Maintained technical records, issue logs, configuration information, and operational documentation.</li>
                <li>Coordinated with internal teams and stakeholders for requirements, issue resolution, system changes, and technical support.</li>
                <li>Assisted in maintaining IT infrastructure, user systems, peripherals, and basic networking equipment.</li>
              </ul>
            </div>
          </div>

          {/* Section: Technical Skills */}
          <div className="resume-section">
            <h2 className="resume-sec-title">TECHNICAL SKILLS</h2>
            <div className="resume-skills-block">
              <div><strong>Web:</strong> HTML, CSS, JavaScript, React.js, Bootstrap, PHP, WordPress</div>
              <div><strong>Backend & Database:</strong> Node.js, Express.js, MongoDB, Firebase</div>
              <div><strong>E-commerce:</strong> Shopify, Product Management, Razorpay, E-commerce Operations</div>
              <div><strong>Cloud & Deployment:</strong> DigitalOcean, Docker, Cloudinary, WinSCP, Website Deployment</div>
              <div><strong>IT Support:</strong> Windows, Hardware Troubleshooting, Software Installation, Networking, CCTV, Peripheral Support</div>
              <div><strong>Tools:</strong> Git/GitHub, MS Excel, Google Workspace, Documentation, MIS Reporting</div>
            </div>
          </div>

          {/* Section: Education */}
          <div className="resume-section">
            <h2 className="resume-sec-title">EDUCATION</h2>
            <div className="resume-edu-list">
              <div className="resume-edu-row">
                <span><strong>BCA</strong> – Savitribai Phule Pune University, Pune</span>
                <span>2023</span>
              </div>
              <div className="resume-edu-row">
                <span><strong>HSC</strong> – Dada Ramchandra Bakru Sindhu Mahavidyalaya</span>
                <span>2019</span>
              </div>
              <div className="resume-edu-row">
                <span><strong>SSC</strong> – Bishop Cotton School</span>
                <span>2017</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
