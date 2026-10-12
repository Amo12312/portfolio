import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle, 
  Copy, 
  MessageSquare, 
  FileText, 
  Sparkles,
  Phone
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';
import { addInquiry } from '../data/blogData';

export default function Contact({ onOpenResume }) {
  const { personal } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    const emailSubject = encodeURIComponent(
      formData.subject || `Inquiry from Portfolio: ${formData.name}`
    );
    const emailBody = encodeURIComponent(
      `Hello Amogh,\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || 'Portfolio Inquiry'}\n\nMessage:\n${formData.message}\n\n---\nSent via Amogh Ramteke Portfolio`
    );

    // Direct Gmail web compose link
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personal.email)}&su=${emailSubject}&body=${emailBody}`;

    // Persist to Admin Panel Inbox
    addInquiry({
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Portfolio Inquiry',
      message: formData.message
    });

    // Open Gmail directly in a new window/tab
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');

    setIsSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <MessageSquare size={16} />
            Connect
          </span>
          <h2>Have a problem <span className="text-gradient">worth solving?</span></h2>
          <p>
            I am interested in connecting with people working on technology, digital business, IT operations, process improvement, and early-stage product ideas.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info & Channels */}
          <div className="contact-info-card glass-panel">
            <h3 className="contact-info-title">
              Let's Start a Conversation
            </h3>
            <p className="contact-info-desc">
              For professional opportunities, project collaborations, or technology discussions, feel free to get in touch.
            </p>

            <div className="contact-channels-list">
              {/* Email */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <Mail size={18} className="text-cyan" />
                </div>
                <div className="contact-item-details">
                  <span className="contact-label">Email</span>
                  <a href={`mailto:${personal.email}`} className="contact-value">
                    {personal.email}
                  </a>
                </div>
                <button 
                  type="button" 
                  className="copy-btn" 
                  onClick={copyEmail}
                  title="Copy email address"
                >
                  {copiedEmail ? <CheckCircle size={15} className="text-emerald" /> : <Copy size={15} />}
                </button>
              </div>

              {/* LinkedIn */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <LinkedinIcon size={18} className="text-cyan" />
                </div>
                <div className="contact-item-details">
                  <span className="contact-label">LinkedIn</span>
                  <a 
                    href={personal.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value link-accent"
                  >
                    linkedin.com/in/amogh-ramteke-127665275
                  </a>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <GithubIcon size={18} className="text-indigo" />
                </div>
                <div className="contact-item-details">
                  <span className="contact-label">GitHub</span>
                  <a 
                    href={personal.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="contact-value link-accent"
                  >
                    github.com/amoghramteke
                  </a>
                </div>
              </div>

              {/* Resume */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <FileText size={18} className="text-emerald" />
                </div>
                <div className="contact-item-details">
                  <span className="contact-label">Curriculum Vitae</span>
                  <button 
                    type="button" 
                    onClick={onOpenResume} 
                    className="contact-value resume-link-btn"
                  >
                    View Approved CV (PDF & Sheet)
                  </button>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item">
                <div className="contact-item-icon">
                  <MapPin size={18} className="text-accent" />
                </div>
                <div className="contact-item-details">
                  <span className="contact-label">Location</span>
                  <span className="contact-value">{personal.location}</span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="whatsapp-cta-box">
              <a 
                href={`https://wa.me/918080230723?text=Hi%20Amogh,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect!`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary w-full"
              >
                <span>Chat via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Inquiry Form */}
          <div className="contact-form-card glass-panel">
            <h3 className="contact-form-title">Send a Direct Message</h3>
            
            {isSubmitted ? (
              <div className="form-success-box">
                <div className="success-icon-wrap">
                  <CheckCircle size={36} className="text-emerald" />
                </div>
                <h4>Opening Gmail Compose...</h4>
                <p>
                  Your message draft has been prepared and opened directly in Gmail addressed to <strong>{personal.email}</strong>.
                </p>
                <div className="gmail-fallback-actions">
                  <a 
                    href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(personal.email)}&su=${encodeURIComponent(formData.subject || `Inquiry from Portfolio: ${formData.name}`)}&body=${encodeURIComponent(`Hello Amogh,\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject || 'Portfolio Inquiry'}\n\nMessage:\n${formData.message}\n\n---\nSent via Amogh Ramteke Portfolio`)}`}
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn btn-primary btn-sm"
                  >
                    <Mail size={14} />
                    <span>Reopen in Gmail</span>
                  </a>
                  <a 
                    href={`mailto:${personal.email}?subject=${encodeURIComponent(formData.subject || `Inquiry: ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                    className="btn btn-secondary btn-sm"
                  >
                    <span>Open in Default Mail App</span>
                  </a>
                </div>
                <button 
                  type="button" 
                  className="btn btn-outline btn-sm"
                  style={{ marginTop: '0.8rem' }}
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', subject: '', message: '' });
                  }}
                >
                  Write Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-group-row">
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      required 
                      placeholder="e.g. Anand Kulkarni"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Your Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      placeholder="e.g. anand@company.com"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    placeholder="e.g. Business Process / Web Collaboration"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Your Message *</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    rows={4} 
                    required 
                    placeholder="Describe your requirement, idea, or role opportunity..."
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary w-full">
                  <Send size={16} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
