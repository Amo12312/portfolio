import React, { useState, useEffect } from 'react';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  FileText, 
  Terminal, 
  Sparkles,
  ShieldCheck,
  BookOpen
} from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onOpenResume, onOpenAdmin }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      const sections = ['about', 'skills', 'projects', 'blog', 'vision', 'experience', 'education', 'contact'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Blog', href: '#blog' },
    { name: 'Vision', href: '#vision' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-container ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-content">
        {/* Brand Logo */}
        <a href="#hero" className="brand-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          <div className="brand-icon">
            <Terminal size={18} />
          </div>
          <div className="brand-text">
            <span className="brand-name">Amogh<span className="text-gradient">.R</span></span>
            <span className="brand-subtitle">Technology & Business</span>
          </div>
        </a>

        {/* Desktop Nav Links */}
        <nav className="desktop-nav">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`nav-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="nav-actions">
          {/* Theme Toggle Button */}
          <button 
            type="button" 
            className="theme-toggle-btn" 
            onClick={toggleTheme}
            aria-label="Toggle Dark/Light Mode"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? <Sun size={18} className="sun-icon" /> : <Moon size={18} className="moon-icon" />}
          </button>

          {/* Resume Modal Trigger */}
          <button 
            type="button" 
            className="btn btn-primary btn-sm resume-btn"
            onClick={onOpenResume}
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>

          {/* Admin Panel Console Button */}
          <button 
            type="button" 
            className="admin-nav-trigger-btn"
            onClick={onOpenAdmin}
            aria-label="Open Admin Console"
            title="Open Admin Console (Manage Blog & Inquiries)"
          >
            <ShieldCheck size={17} />
            <span className="admin-nav-text">Admin</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            type="button" 
            className="mobile-toggle-btn" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay glass-panel">
          <div className="mobile-links">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`mobile-link ${activeSection === link.href.substring(1) ? 'active' : ''}`}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <div className="mobile-actions">
              <button 
                type="button" 
                className="btn btn-primary w-full"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
              >
                <FileText size={16} />
                <span>View Full Resume</span>
              </button>

              <button 
                type="button" 
                className="btn btn-secondary w-full admin-mobile-menu-btn"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
              >
                <ShieldCheck size={16} />
                <span>Admin Operations Console</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
