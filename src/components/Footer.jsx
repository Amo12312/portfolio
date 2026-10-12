import { 
  ArrowUp, 
  Terminal, 
  Mail, 
  Phone,
  ShieldCheck,
  Smartphone
} from 'lucide-react';
import { LinkedinIcon, GithubIcon } from './Icons';
import { portfolioData } from '../data/portfolioData';

export default function Footer({ onOpenAdmin }) {
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-left">
          <div className="brand-logo footer-logo">
            <div className="brand-icon">
              <Terminal size={16} />
            </div>
            <span className="brand-name">Amogh<span className="text-gradient">.R</span></span>
          </div>
          <p className="footer-tagline">
            Technology. Business. Better Systems. • Based in Pune, Maharashtra.
          </p>
        </div>

        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#blog">Blog & Articles</a>
          <a href="#vision">Ideas & Vision</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="footer-right">
          <div className="footer-social-links">
            <a 
              href={personal.linkedin} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn" 
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a 
              href={personal.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-btn" 
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a 
              href={`mailto:${personal.email}`} 
              className="social-btn" 
              aria-label="Email"
            >
              <Mail size={16} />
            </a>
            <a 
              href={`tel:${personal.phone}`} 
              className="social-btn" 
              aria-label="Phone"
            >
              <Phone size={16} />
            </a>
          </div>

          <button 
            type="button" 
            className="back-to-top-btn" 
            onClick={scrollToTop} 
            title="Back to Top"
          >
            <ArrowUp size={16} />
          </button>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="container bottom-bar-inner">
          <p>© {new Date().getFullYear()} Amogh Ramteke. Built with curiosity, technology, and a focus on practical solutions.</p>
          <div className="footer-admin-trigger-wrap">
            <button 
              type="button" 
              className="footer-admin-link-btn"
              onClick={onOpenAdmin}
            >
              <ShieldCheck size={14} />
              <span>Admin Console</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
