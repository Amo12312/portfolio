import React, { useState, useEffect } from 'react';
import { Download, Smartphone, X, Sparkles, Check } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already in standalone PWA mode
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true;
    if (isStandalone) {
      setIsInstalled(true);
      return;
    }

    // Check iOS Safari
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt on Chromium / Android
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      const dismissed = localStorage.getItem('pwa_prompt_dismissed');
      if (!dismissed) {
        setShowPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsInstalled(true);
      setShowPrompt(false);
    }
    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa_prompt_dismissed', 'true');
  };

  if (isInstalled || !showPrompt) return null;

  return (
    <aside 
      className="pwa-install-banner glass-panel"
      aria-label="Install mobile application"
    >
      <div className="pwa-banner-left">
        <div className="pwa-app-icon">
          <Smartphone size={20} />
        </div>
        <div className="pwa-banner-text">
          <strong>Install Portfolio & Admin App</strong>
          <span>Fast offline access, fullscreen mode & mobile admin tools</span>
        </div>
      </div>

      <div className="pwa-banner-actions">
        {deferredPrompt ? (
          <button 
            type="button" 
            className="btn btn-primary btn-xs pwa-install-btn"
            onClick={handleInstallClick}
          >
            <Download size={14} />
            <span>Install</span>
          </button>
        ) : isIOS ? (
          <span className="ios-install-hint">Tap Share &gt; "Add to Home Screen"</span>
        ) : null}

        <button 
          type="button" 
          className="pwa-dismiss-btn"
          onClick={handleDismiss}
          aria-label="Dismiss banner"
        >
          <X size={16} />
        </button>
      </div>
    </aside>
  );
}
