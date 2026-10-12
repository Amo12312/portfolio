import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Vision from './components/Vision';
import Experience from './components/Experience';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import AdminPanel from './components/AdminPanel';
import AIAssistant from './components/AIAssistant';
import './App.css';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark';
  });
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(() => {
    // Check if launched as installed Standalone Mobile PWA or via ?view=admin
    if (typeof window !== 'undefined') {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
        window.navigator.standalone === true;
      const params = new URLSearchParams(window.location.search);
      return isStandalone || params.get('view') === 'admin';
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Global keyboard shortcut to open Admin Console: Ctrl+Shift+A or Alt+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) ||
          (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        setIsAdminOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="portfolio-app">
      {/* Navigation Bar */}
      <Navbar 
        theme={theme} 
        toggleTheme={toggleTheme} 
        onOpenResume={() => setIsResumeOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <Hero onOpenResume={() => setIsResumeOpen(true)} />
        <About />
        <Skills />
        <Projects />
        <Blog onOpenAdmin={() => setIsAdminOpen(true)} />
        <Vision />
        <Experience />
        <Education />
        <Contact onOpenResume={() => setIsResumeOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

      {/* Full Resume View & Print Modal */}
      <ResumeModal 
        isOpen={isResumeOpen} 
        onClose={() => setIsResumeOpen(false)} 
      />

      {/* Mobile-Friendly Admin Operations Console */}
      <AdminPanel 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
      />

      {/* Interactive AI Knowledge Assistant */}
      <AIAssistant onOpenResume={() => setIsResumeOpen(true)} />
    </div>
  );
}

