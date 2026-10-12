import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  X, 
  LayoutDashboard, 
  FileText, 
  Mail, 
  Settings, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  CheckCircle, 
  Clock, 
  ArrowLeft, 
  Save, 
  Smartphone, 
  Download, 
  Upload, 
  RefreshCw, 
  Sparkles, 
  Search,
  ExternalLink,
  ShieldCheck,
  Check,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { 
  getStoredArticles, 
  saveStoredArticles, 
  getStoredInquiries, 
  saveStoredInquiries, 
  markInquiryAsRead, 
  deleteInquiry,
  getAdminSettings,
  saveAdminSettings,
  initialArticles
} from '../data/blogData';

export default function AdminPanel({ isOpen, onClose }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('admin_auth') === 'true';
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'articles', 'inquiries', 'settings'
  
  // Data states
  const [articles, setArticles] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [settings, setSettings] = useState(getAdminSettings());
  
  // Editor state
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState(null);
  const [editorMode, setEditorMode] = useState('edit'); // 'edit' | 'preview'
  const [editorForm, setEditorForm] = useState({
    title: '',
    category: 'IT Operations',
    readTime: '5 min read',
    status: 'published',
    featured: false,
    tags: '',
    excerpt: '',
    content: ''
  });
  const [saveSuccessNotice, setSaveSuccessNotice] = useState('');

  // PWA & Mobile Installation state
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [isStandalone, setIsStandalone] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  // Load data
  const refreshAllData = () => {
    setArticles(getStoredArticles());
    setInquiries(getStoredInquiries());
    setSettings(getAdminSettings());
  };

  useEffect(() => {
    // Check if running in standalone mode (installed PWA)
    const standalone = window.matchMedia('(display-mode: standalone)').matches || 
      window.navigator.standalone === true;
    setIsStandalone(standalone);

    const userAgent = window.navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));

    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshAllData();
      document.body.style.overflow = 'hidden';

      // Check URL parameters for shortcut actions
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        if (params.get('action') === 'new') {
          setActiveTab('articles');
          handleOpenCreate();
        } else if (params.get('tab') === 'inquiries') {
          setActiveTab('inquiries');
        }
      }
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleInstallPWA = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setIsStandalone(true);
      triggerNotice('Admin Studio app installed successfully!');
    }
    setDeferredPrompt(null);
  };

  if (!isOpen) return null;

  // Handle Authentication
  const handleLogin = (e) => {
    e.preventDefault();
    const storedPin = settings.pin || 'amogh2026';
    if (pinInput.trim() === storedPin) {
      setIsAuthenticated(true);
      sessionStorage.setItem('admin_auth', 'true');
      setPinError(false);
      setPinInput('');
    } else {
      setPinError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('admin_auth');
  };

  // Open Create/Edit Article
  const handleOpenCreate = () => {
    setEditingArticle(null);
    setEditorForm({
      title: '',
      category: 'IT Operations',
      readTime: '5 min read',
      status: 'published',
      featured: false,
      tags: 'Systems, IT, DevOps',
      excerpt: '',
      content: '### Section 1: Overview\n\nWrite your article insight here.\n\n* Key Takeaway 1\n* Key Takeaway 2\n\n> "Important operational rule or quote"\n'
    });
    setEditorMode('edit');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (article) => {
    setEditingArticle(article);
    setEditorForm({
      title: article.title,
      category: article.category,
      readTime: article.readTime,
      status: article.status || 'published',
      featured: !!article.featured,
      tags: (article.tags || []).join(', '),
      excerpt: article.excerpt,
      content: article.content
    });
    setEditorMode('edit');
    setIsEditorOpen(true);
  };

  const handleSaveArticle = (e) => {
    e.preventDefault();
    if (!editorForm.title.trim()) return;

    const parsedTags = editorForm.tags
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const nowFormatted = new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric'
    });

    let updatedList;
    if (editingArticle) {
      // Update existing
      updatedList = articles.map(art => {
        if (art.id === editingArticle.id) {
          return {
            ...art,
            title: editorForm.title,
            category: editorForm.category,
            readTime: editorForm.readTime,
            status: editorForm.status,
            featured: editorForm.featured,
            tags: parsedTags,
            excerpt: editorForm.excerpt,
            content: editorForm.content
          };
        }
        return art;
      });
    } else {
      // Create new
      const newArticle = {
        id: `art-${Date.now()}`,
        slug: editorForm.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
        title: editorForm.title,
        category: editorForm.category,
        readTime: editorForm.readTime,
        publishedAt: nowFormatted,
        status: editorForm.status,
        featured: editorForm.featured,
        views: 0,
        likes: 0,
        author: "Amogh Ramteke",
        authorRole: "Technology & Business Professional",
        tags: parsedTags,
        excerpt: editorForm.excerpt,
        content: editorForm.content,
        coverGradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(6, 182, 212, 0.25) 100%)"
      };
      updatedList = [newArticle, ...articles];
    }

    saveStoredArticles(updatedList);
    setArticles(updatedList);
    setIsEditorOpen(false);
    triggerNotice(editingArticle ? 'Article updated successfully!' : 'New article published!');
  };

  const handleDeleteArticle = (id) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      const updated = articles.filter(a => a.id !== id);
      saveStoredArticles(updated);
      setArticles(updated);
      triggerNotice('Article deleted.');
    }
  };

  const handleToggleArticleStatus = (article) => {
    const newStatus = article.status === 'published' ? 'draft' : 'published';
    const updated = articles.map(a => a.id === article.id ? { ...a, status: newStatus } : a);
    saveStoredArticles(updated);
    setArticles(updated);
    triggerNotice(`Article set to ${newStatus}.`);
  };

  const triggerNotice = (msg) => {
    setSaveSuccessNotice(msg);
    setTimeout(() => setSaveSuccessNotice(''), 3000);
  };

  // Availability status toggle
  const handleToggleAvailability = () => {
    const updated = { ...settings, availableForWork: !settings.availableForWork };
    saveAdminSettings(updated);
    setSettings(updated);
    triggerNotice(`Availability status updated to ${updated.availableForWork ? 'Available' : 'Busy'}`);
  };

  // Export JSON backup
  const handleExportBackup = () => {
    const backupData = {
      articles,
      inquiries,
      settings,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `amogh-portfolio-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Reset to demo initial data
  const handleResetData = () => {
    if (window.confirm('Reset articles to default initial portfolio articles?')) {
      saveStoredArticles(initialArticles);
      setArticles(initialArticles);
      triggerNotice('Articles reset to defaults.');
    }
  };

  // Stat computations
  const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
  const totalLikes = articles.reduce((sum, a) => sum + (a.likes || 0), 0);
  const publishedCount = articles.filter(a => a.status === 'published').length;
  const draftCount = articles.filter(a => a.status === 'draft').length;
  const unreadInquiries = inquiries.filter(i => !i.read).length;

  return (
    <div className="modal-backdrop admin-backdrop" onClick={onClose}>
      <div 
        className="admin-container glass-panel" 
        onClick={(e) => e.stopPropagation()}
        role="dialog" 
        aria-modal="true"
      >
        {/* Top Header Bar */}
        <header className="admin-header">
          <div className="admin-header-left">
            <div className="admin-logo-badge">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h2 className="admin-title">Admin Operations Console</h2>
              <span className="admin-subtitle">Mobile-Optimized Portfolio & Blog Manager</span>
            </div>
          </div>

          <div className="admin-header-right">
            {isAuthenticated && (
              <button 
                type="button" 
                className="admin-logout-btn" 
                onClick={handleLogout}
                title="Lock Console"
              >
                <Lock size={15} />
                <span>Lock</span>
              </button>
            )}
            <button 
              type="button" 
              className="admin-close-btn" 
              onClick={onClose}
              aria-label="Close Admin"
            >
              <X size={20} />
            </button>
          </div>
        </header>

        {/* Success toast notification */}
        {saveSuccessNotice && (
          <div className="admin-toast-banner">
            <Check size={15} />
            <span>{saveSuccessNotice}</span>
          </div>
        )}

        {/* If NOT Authenticated: Show PIN Entry Dialog */}
        {!isAuthenticated ? (
          <div className="admin-pin-screen">
            <div className="admin-pin-card glass-panel">
              <div className="pin-shield-icon">
                <Lock size={32} />
              </div>
              <h3>Administrator Sign In</h3>
              <p>Enter the security PIN to manage articles, inquiries, and mobile app settings.</p>

              <form onSubmit={handleLogin} className="pin-form">
                <div className="pin-input-group">
                  <input 
                    type="password" 
                    placeholder="Enter security PIN..."
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className={`pin-input ${pinError ? 'input-error' : ''}`}
                    autoFocus
                  />
                  <button type="submit" className="btn btn-primary btn-sm">
                    Unlock
                  </button>
                </div>
                {pinError && (
                  <p className="pin-error-text">Incorrect PIN passcode.</p>
                )}
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Admin Dashboard Layout */
          <div className="admin-authenticated-layout">
            {/* Mobile / Desktop Navigation Tab Bar */}
            <nav className="admin-nav-tabs">
              <button 
                type="button" 
                className={`admin-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </button>

              <button 
                type="button" 
                className={`admin-tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
                onClick={() => setActiveTab('articles')}
              >
                <FileText size={18} />
                <span>Articles ({articles.length})</span>
              </button>

              <button 
                type="button" 
                className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
                onClick={() => setActiveTab('inquiries')}
              >
                <Mail size={18} />
                <span>Inquiries</span>
                {unreadInquiries > 0 && (
                  <span className="unread-counter-badge">{unreadInquiries}</span>
                )}
              </button>

              <button 
                type="button" 
                className={`admin-tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
                onClick={() => setActiveTab('settings')}
              >
                <Smartphone size={18} />
                <span>PWA & Settings</span>
              </button>
            </nav>

            {/* Tab 1: Dashboard Overview */}
            {activeTab === 'dashboard' && (
              <div className="admin-content-pane">
                {/* Stats Row */}
                <div className="admin-stats-grid">
                  <div className="admin-stat-card glass-panel">
                    <div className="stat-card-header">
                      <span className="stat-label">Total Articles</span>
                      <FileText size={18} className="stat-icon-indigo" />
                    </div>
                    <div className="stat-value">{articles.length}</div>
                    <div className="stat-sub">{publishedCount} Published &bull; {draftCount} Drafts</div>
                  </div>

                  <div className="admin-stat-card glass-panel">
                    <div className="stat-card-header">
                      <span className="stat-label">Total Readers</span>
                      <Eye size={18} className="stat-icon-cyan" />
                    </div>
                    <div className="stat-value">{totalViews}</div>
                    <div className="stat-sub">{totalLikes} Total Article Likes</div>
                  </div>

                  <div className="admin-stat-card glass-panel">
                    <div className="stat-card-header">
                      <span className="stat-label">Client Inquiries</span>
                      <Mail size={18} className="stat-icon-emerald" />
                    </div>
                    <div className="stat-value">{inquiries.length}</div>
                    <div className="stat-sub">{unreadInquiries} Unread messages</div>
                  </div>

                  <div className="admin-stat-card glass-panel">
                    <div className="stat-card-header">
                      <span className="stat-label">Availability Status</span>
                      <Sparkles size={18} className="stat-icon-amber" />
                    </div>
                    <div className="stat-value-status">
                      <span className={`status-dot ${settings.availableForWork ? 'active' : 'busy'}`}></span>
                      <span>{settings.availableForWork ? 'Available' : 'Busy'}</span>
                    </div>
                    <button 
                      type="button" 
                      className="status-toggle-btn"
                      onClick={handleToggleAvailability}
                    >
                      {settings.availableForWork ? 'Set Busy' : 'Set Available'}
                    </button>
                  </div>
                </div>

                {/* Dedicated Mobile PWA Blogging Card */}
                <div className="admin-pwa-cta-card glass-panel">
                  <div className="pwa-cta-header">
                    <div className="pwa-cta-icon-badge">
                      <Smartphone size={24} />
                    </div>
                    <div className="pwa-cta-titles">
                      <div className="pwa-status-tag-row">
                        <span className="pwa-tag-pill">Mobile Blogging Studio</span>
                        {isStandalone ? (
                          <span className="pwa-installed-pill">
                            <CheckCircle size={12} />
                            Installed on Device
                          </span>
                        ) : (
                          <span className="pwa-installable-pill">PWA Ready</span>
                        )}
                      </div>
                      <h4>Install Admin Studio on Phone</h4>
                      <p>Add this Admin Console directly to your mobile home screen. Launches fullscreen with 1 tap to write, preview, and publish blog articles on the go.</p>
                    </div>
                  </div>

                  <div className="pwa-cta-actions">
                    {isStandalone ? (
                      <div className="pwa-installed-banner">
                        <Check size={16} color="#10b981" />
                        <span>Running as standalone mobile app. You can publish blogs anytime offline or online!</span>
                      </div>
                    ) : deferredPrompt ? (
                      <button 
                        type="button" 
                        className="btn btn-primary btn-sm pwa-primary-install-btn"
                        onClick={handleInstallPWA}
                      >
                        <Download size={16} />
                        <span>Install Admin App to Home Screen</span>
                      </button>
                    ) : isIOS ? (
                      <div className="ios-install-guide">
                        <span>📲 <strong>iPhone / iPad:</strong> Tap Safari's <strong>Share</strong> icon and select <strong>"Add to Home Screen"</strong></span>
                      </div>
                    ) : (
                      <div className="browser-install-guide">
                        <button 
                          type="button" 
                          className="btn btn-primary btn-sm"
                          onClick={() => {
                            alert('To install on your phone:\n1. Open this page in Chrome or Safari on your phone.\n2. Tap the browser menu (⋮ or Share).\n3. Select "Add to Home Screen" or "Install App".');
                          }}
                        >
                          <Download size={16} />
                          <span>Mobile Install Instructions</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="admin-quick-actions glass-panel">
                  <h4 className="pane-section-title">Quick Actions</h4>
                  <div className="quick-actions-btns">
                    <button 
                      type="button" 
                      className="btn btn-primary btn-sm"
                      onClick={() => { setActiveTab('articles'); handleOpenCreate(); }}
                    >
                      <Plus size={16} />
                      <span>Create New Article</span>
                    </button>

                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setActiveTab('inquiries')}
                    >
                      <Mail size={16} />
                      <span>Review Inquiries ({inquiries.length})</span>
                    </button>

                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm"
                      onClick={onClose}
                    >
                      <ExternalLink size={16} />
                      <span>View Live Portfolio</span>
                    </button>
                  </div>
                </div>

                {/* Recent Inquiries Preview */}
                <div className="admin-recent-pane glass-panel">
                  <div className="pane-header-row">
                    <h4 className="pane-section-title">Recent Contact Inquiries</h4>
                    <button 
                      type="button" 
                      className="text-link-btn"
                      onClick={() => setActiveTab('inquiries')}
                    >
                      View All
                    </button>
                  </div>

                  {inquiries.length > 0 ? (
                    <div className="recent-inquiries-list">
                      {inquiries.slice(0, 3).map(inq => (
                        <div key={inq.id} className={`inquiry-mini-card ${inq.read ? 'read' : 'unread'}`}>
                          <div className="inquiry-mini-header">
                            <strong>{inq.name}</strong>
                            <span className="inquiry-email">{inq.email}</span>
                          </div>
                          <p className="inquiry-subject">{inq.subject}</p>
                          <p className="inquiry-preview-snippet">{inq.message}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-sub-text">No incoming inquiries yet. Submissions from the contact form will show up here.</p>
                  )}
                </div>
              </div>
            )}

            {/* Tab 2: Articles Management */}
            {activeTab === 'articles' && (
              <div className="admin-content-pane">
                <div className="pane-header-row">
                  <div>
                    <h3 className="pane-main-title">Manage Articles</h3>
                    <p className="pane-sub-title">Publish, edit, or archive technical field notes.</p>
                  </div>
                  <button 
                    type="button" 
                    className="btn btn-primary btn-sm"
                    onClick={handleOpenCreate}
                  >
                    <Plus size={16} />
                    <span>New Article</span>
                  </button>
                </div>

                {/* Articles List */}
                <div className="admin-articles-list">
                  {articles.map(article => (
                    <div key={article.id} className="admin-article-item glass-panel">
                      <div className="article-item-main">
                        <div className="article-status-row">
                          <span className={`status-pill ${article.status === 'published' ? 'published' : 'draft'}`}>
                            {article.status === 'published' ? 'Published' : 'Draft'}
                          </span>
                          <span className="category-pill">{article.category}</span>
                          <span className="item-date">{article.publishedAt}</span>
                        </div>
                        <h4 className="article-item-title">{article.title}</h4>
                        <p className="article-item-excerpt">{article.excerpt}</p>
                        <div className="article-item-meta">
                          <span><Eye size={13} /> {article.views || 0} views</span>
                          <span><Clock size={13} /> {article.readTime}</span>
                        </div>
                      </div>

                      {/* Item Actions */}
                      <div className="article-item-actions">
                        <button 
                          type="button" 
                          className="action-icon-btn edit-btn"
                          onClick={() => handleOpenEdit(article)}
                          title="Edit article"
                        >
                          <Edit3 size={16} />
                          <span className="mobile-only-label">Edit</span>
                        </button>

                        <button 
                          type="button" 
                          className="action-icon-btn status-btn"
                          onClick={() => handleToggleArticleStatus(article)}
                          title={article.status === 'published' ? "Switch to Draft" : "Publish"}
                        >
                          {article.status === 'published' ? <ToggleRight size={18} color="#10b981" /> : <ToggleLeft size={18} />}
                          <span className="mobile-only-label">Toggle</span>
                        </button>

                        <button 
                          type="button" 
                          className="action-icon-btn delete-btn"
                          onClick={() => handleDeleteArticle(article.id)}
                          title="Delete article"
                        >
                          <Trash2 size={16} />
                          <span className="mobile-only-label">Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 3: Contact Inquiries Inbox */}
            {activeTab === 'inquiries' && (
              <div className="admin-content-pane">
                <div className="pane-header-row">
                  <div>
                    <h3 className="pane-main-title">Client Inquiries & Messages</h3>
                    <p className="pane-sub-title">Messages submitted via the contact form on your portfolio.</p>
                  </div>
                  {inquiries.length > 0 && (
                    <span className="badge-pill">{inquiries.length} Messages Total</span>
                  )}
                </div>

                <div className="admin-inquiries-list">
                  {inquiries.length > 0 ? (
                    inquiries.map(inq => (
                      <div key={inq.id} className={`inquiry-full-card glass-panel ${inq.read ? 'is-read' : 'is-unread'}`}>
                        <div className="inquiry-card-header">
                          <div>
                            <div className="inquiry-sender-name">
                              <strong>{inq.name}</strong>
                              {!inq.read && <span className="new-badge">New</span>}
                            </div>
                            <a href={`mailto:${inq.email}`} className="inquiry-sender-email">
                              {inq.email}
                            </a>
                          </div>
                          <span className="inquiry-date">
                            {new Date(inq.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>

                        <div className="inquiry-subject-box">
                          <strong>Subject:</strong> {inq.subject}
                        </div>

                        <div className="inquiry-body-content">
                          {inq.message}
                        </div>

                        <div className="inquiry-card-footer">
                          <a 
                            href={`mailto:${inq.email}?subject=Re: ${encodeURIComponent(inq.subject)}`}
                            className="btn btn-primary btn-xs"
                            onClick={() => {
                              markInquiryAsRead(inq.id);
                              setInquiries(getStoredInquiries());
                            }}
                          >
                            <Mail size={14} />
                            <span>Reply via Email</span>
                          </a>

                          {!inq.read && (
                            <button 
                              type="button" 
                              className="btn btn-secondary btn-xs"
                              onClick={() => {
                                markInquiryAsRead(inq.id);
                                setInquiries(getStoredInquiries());
                              }}
                            >
                              <CheckCircle size={14} />
                              <span>Mark Read</span>
                            </button>
                          )}

                          <button 
                            type="button" 
                            className="btn btn-danger-outline btn-xs"
                            onClick={() => {
                              deleteInquiry(inq.id);
                              setInquiries(getStoredInquiries());
                              triggerNotice('Message deleted.');
                            }}
                          >
                            <Trash2 size={14} />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="empty-inbox glass-panel text-center">
                      <Mail size={36} className="empty-icon" />
                      <h4>Your inbox is clear</h4>
                      <p>When clients contact you through the website, messages will appear here instantly.</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tab 4: PWA, Backup & Settings */}
            {activeTab === 'settings' && (
              <div className="admin-content-pane">
                <h3 className="pane-main-title">PWA & System Settings</h3>
                <p className="pane-sub-title">Mobile app installation, offline data backup, and settings.</p>

                <div className="settings-cards-stack">
                  {/* PWA Information Card */}
                  <div className="settings-card glass-panel">
                    <div className="settings-card-header">
                      <Smartphone size={20} className="stat-icon-indigo" />
                      <div>
                        <h4>Admin Studio Mobile PWA</h4>
                        <p>Dedicated standalone mobile app for writing and publishing blogs on your phone.</p>
                      </div>
                    </div>
                    <div className="pwa-features-list">
                      <div className="pwa-feature-item">
                        <CheckCircle size={15} color="#10b981" />
                        <span>Launch Target: <code>/?view=admin</code> (Opens directly into blogging console)</span>
                      </div>
                      <div className="pwa-feature-item">
                        <CheckCircle size={15} color="#10b981" />
                        <span>Manifest & Service Worker configured for standalone mobile execution</span>
                      </div>
                      <div className="pwa-feature-item">
                        <CheckCircle size={15} color="#10b981" />
                        <span>Status: <strong>{isStandalone ? "Running in Standalone Mobile Mode" : "Ready to install"}</strong></span>
                      </div>
                    </div>
                    {!isStandalone && deferredPrompt && (
                      <div style={{ marginTop: '1rem' }}>
                        <button 
                          type="button" 
                          className="btn btn-primary btn-sm"
                          onClick={handleInstallPWA}
                        >
                          <Download size={15} />
                          <span>Install Admin App Now</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Data Backup & Restore */}
                  <div className="settings-card glass-panel">
                    <div className="settings-card-header">
                      <Download size={20} className="stat-icon-cyan" />
                      <div>
                        <h4>Backup & Data Management</h4>
                        <p>Export all blog posts, inquiries, and settings to an offline JSON file.</p>
                      </div>
                    </div>
                    <div className="settings-card-actions">
                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm"
                        onClick={handleExportBackup}
                      >
                        <Download size={16} />
                        <span>Export Backup (JSON)</span>
                      </button>

                      <button 
                        type="button" 
                        className="btn btn-secondary btn-sm"
                        onClick={handleResetData}
                      >
                        <RefreshCw size={16} />
                        <span>Reset to Default Articles</span>
                      </button>
                    </div>
                  </div>

                  {/* Security PIN Change */}
                  <div className="settings-card glass-panel">
                    <div className="settings-card-header">
                      <ShieldCheck size={20} className="stat-icon-emerald" />
                      <div>
                        <h4>Console Security Passcode</h4>
                        <p>Change your private administrator PIN.</p>
                      </div>
                    </div>
                    <div className="pin-change-row">
                      <input 
                        type="text" 
                        defaultValue={settings.pin || 'amogh2026'} 
                        id="newPinInput"
                        className="pin-edit-input"
                        placeholder="New PIN"
                      />
                      <button 
                        type="button" 
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          const input = document.getElementById('newPinInput');
                          if (input && input.value.trim()) {
                            const updated = { ...settings, pin: input.value.trim() };
                            saveAdminSettings(updated);
                            setSettings(updated);
                            triggerNotice('Security PIN updated!');
                          }
                        }}
                      >
                        Save PIN
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal: Create / Edit Article Sheet */}
        {isEditorOpen && (
          <div className="editor-modal-backdrop" onClick={() => setIsEditorOpen(false)}>
            <div 
              className="editor-sheet-container glass-panel" 
              onClick={(e) => e.stopPropagation()}
            >
              <div className="editor-sheet-header">
                <div className="editor-title-group">
                  <h3>{editingArticle ? 'Edit Article' : 'Compose New Article'}</h3>
                  <span className="editor-sub">Mobile & Desktop Markdown Editor</span>
                </div>

                <div className="editor-header-actions">
                  <div className="mode-toggle-group">
                    <button 
                      type="button" 
                      className={`mode-btn ${editorMode === 'edit' ? 'active' : ''}`}
                      onClick={() => setEditorMode('edit')}
                    >
                      Write
                    </button>
                    <button 
                      type="button" 
                      className={`mode-btn ${editorMode === 'preview' ? 'active' : ''}`}
                      onClick={() => setEditorMode('preview')}
                    >
                      Preview
                    </button>
                  </div>
                  <button 
                    type="button" 
                    className="close-editor-btn"
                    onClick={() => setIsEditorOpen(false)}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              {editorMode === 'edit' ? (
                <form onSubmit={handleSaveArticle} className="editor-form">
                  <div className="editor-scroll-area">
                    {/* Title */}
                    <div className="form-group">
                      <label>Article Title *</label>
                      <input 
                        type="text" 
                        required
                        placeholder="e.g. Incident Response Playbook for Fast Triage"
                        value={editorForm.title}
                        onChange={(e) => setEditorForm({ ...editorForm, title: e.target.value })}
                        className="admin-input"
                      />
                    </div>

                    {/* Category & Read Time Row */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Category</label>
                        <select 
                          value={editorForm.category}
                          onChange={(e) => setEditorForm({ ...editorForm, category: e.target.value })}
                          className="admin-select"
                        >
                          <option value="IT Operations">IT Operations</option>
                          <option value="Strategy & Systems">Strategy & Systems</option>
                          <option value="Web Engineering">Web Engineering</option>
                          <option value="Automation">Automation</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label>Est. Read Time</label>
                        <input 
                          type="text" 
                          placeholder="e.g. 5 min read"
                          value={editorForm.readTime}
                          onChange={(e) => setEditorForm({ ...editorForm, readTime: e.target.value })}
                          className="admin-input"
                        />
                      </div>
                    </div>

                    {/* Status & Featured */}
                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Publication Status</label>
                        <select 
                          value={editorForm.status}
                          onChange={(e) => setEditorForm({ ...editorForm, status: e.target.value })}
                          className="admin-select"
                        >
                          <option value="published">Published (Visible to public)</option>
                          <option value="draft">Draft (Hidden)</option>
                        </select>
                      </div>

                      <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                          <input 
                            type="checkbox"
                            checked={editorForm.featured}
                            onChange={(e) => setEditorForm({ ...editorForm, featured: e.target.checked })}
                          />
                          <span>Pin as Featured Article</span>
                        </label>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="form-group">
                      <label>Tags (comma separated)</label>
                      <input 
                        type="text" 
                        placeholder="DevOps, Incident Management, Troubleshooting"
                        value={editorForm.tags}
                        onChange={(e) => setEditorForm({ ...editorForm, tags: e.target.value })}
                        className="admin-input"
                      />
                    </div>

                    {/* Excerpt */}
                    <div className="form-group">
                      <label>Short Summary / Excerpt *</label>
                      <textarea 
                        rows={2}
                        required
                        placeholder="A concise 1-2 sentence hook explaining what reader will learn..."
                        value={editorForm.excerpt}
                        onChange={(e) => setEditorForm({ ...editorForm, excerpt: e.target.value })}
                        className="admin-textarea"
                      />
                    </div>

                    {/* Markdown Body */}
                    <div className="form-group">
                      <label>Article Body (Markdown supported)</label>
                      <textarea 
                        rows={12}
                        placeholder="### Heading&#10;&#10;Write your deep operational insights here..."
                        value={editorForm.content}
                        onChange={(e) => setEditorForm({ ...editorForm, content: e.target.value })}
                        className="admin-textarea code-font"
                      />
                    </div>
                  </div>

                  <div className="editor-footer-bar">
                    <button 
                      type="button" 
                      className="btn btn-secondary btn-sm"
                      onClick={() => setIsEditorOpen(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary btn-sm"
                    >
                      <Save size={16} />
                      <span>{editingArticle ? 'Save Changes' : 'Publish Article'}</span>
                    </button>
                  </div>
                </form>
              ) : (
                /* Live Preview Mode */
                <div className="editor-preview-scroll">
                  <div className="preview-meta-chips">
                    <span className="category-pill">{editorForm.category}</span>
                    <span className="read-time-pill">{editorForm.readTime}</span>
                    <span className={`status-pill ${editorForm.status}`}>
                      {editorForm.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h1 className="preview-title">{editorForm.title || "Untitled Article"}</h1>
                  <p className="preview-excerpt">{editorForm.excerpt}</p>
                  <hr className="article-divider" />
                  <div className="preview-content">
                    {editorForm.content ? (
                      editorForm.content.split('\n').map((l, i) => {
                        const trimmed = l.trim();
                        if (!trimmed) return null;
                        if (trimmed.startsWith('### ')) return <h3 key={i} className="article-h3">{trimmed.replace('### ', '')}</h3>;
                        if (trimmed.startsWith('## ')) return <h2 key={i} className="article-h2">{trimmed.replace('## ', '')}</h2>;
                        if (trimmed.startsWith('> ')) return <blockquote key={i} className="article-quote">{trimmed.replace('> ', '')}</blockquote>;
                        if (trimmed.startsWith('* ')) return <li key={i} className="article-bullet">{trimmed.substring(2)}</li>;
                        return <p key={i} className="article-p">{trimmed}</p>;
                      })
                    ) : (
                      <p className="text-muted">Start typing in the Write tab to see preview.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
