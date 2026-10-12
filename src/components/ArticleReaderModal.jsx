import React, { useEffect, useState } from 'react';
import { 
  X, 
  Clock, 
  Calendar, 
  Tag, 
  Heart, 
  Share2, 
  Check, 
  ArrowLeft, 
  User, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { toggleArticleLike } from '../data/blogData';

export default function ArticleReaderModal({ article, isOpen, onClose, onArticleUpdated }) {
  const [copied, setCopied] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    if (article) {
      setLikeCount(article.likes || 0);
      const liked = localStorage.getItem(`liked_${article.id}`) === 'true';
      setIsLiked(liked);
    }
  }, [article]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const handleLike = () => {
    const res = toggleArticleLike(article.id);
    setIsLiked(res.isLiked);
    setLikeCount(prev => res.isLiked ? prev + 1 : Math.max(0, prev - 1));
    if (onArticleUpdated) onArticleUpdated();
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/#blog-${article.slug}`;
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  // Render article content formatted
  const renderFormattedContent = (content) => {
    if (!content) return null;
    const lines = content.trim().split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeContent = [];
    let codeLanguage = '';

    lines.forEach((line, index) => {
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          // Close code block
          elements.push(
            <div key={`code-${index}`} className="article-code-block">
              <div className="code-header">
                <span>{codeLanguage || 'bash'}</span>
                <span className="code-dot"></span>
              </div>
              <pre><code>{codeContent.join('\n')}</code></pre>
            </div>
          );
          codeContent = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
          codeLanguage = line.replace('```', '').trim();
        }
        return;
      }

      if (inCodeBlock) {
        codeContent.push(line);
        return;
      }

      const trimmed = line.trim();
      if (!trimmed) {
        return;
      }

      if (trimmed.startsWith('### ')) {
        elements.push(
          <h3 key={`h3-${index}`} className="article-h3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('## ')) {
        elements.push(
          <h2 key={`h2-${index}`} className="article-h2">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('> ')) {
        elements.push(
          <blockquote key={`quote-${index}`} className="article-quote">
            {trimmed.replace('> ', '')}
          </blockquote>
        );
      } else if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        elements.push(
          <li key={`li-${index}`} className="article-bullet">
            {trimmed.substring(2)}
          </li>
        );
      } else if (/^\d+\.\s/.test(trimmed)) {
        elements.push(
          <li key={`num-li-${index}`} className="article-num-bullet">
            {trimmed.replace(/^\d+\.\s/, '')}
          </li>
        );
      } else if (trimmed === '---') {
        elements.push(<hr key={`hr-${index}`} className="article-divider" />);
      } else {
        elements.push(
          <p key={`p-${index}`} className="article-p">
            {trimmed}
          </p>
        );
      }
    });

    return elements;
  };

  return (
    <div className="modal-backdrop article-reader-backdrop" onClick={onClose}>
      <div 
        className="article-reader-container glass-panel" 
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={article.title}
      >
        {/* Top Floating App Bar */}
        <div className="reader-top-bar">
          <button 
            type="button" 
            className="reader-back-btn" 
            onClick={onClose}
            aria-label="Back to Articles"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>

          <div className="reader-actions">
            <button 
              type="button" 
              className={`reader-action-btn like-btn ${isLiked ? 'active' : ''}`}
              onClick={handleLike}
              title={isLiked ? "Unlike article" : "Like article"}
            >
              <Heart size={18} fill={isLiked ? "#ec4899" : "none"} color={isLiked ? "#ec4899" : "currentColor"} />
              <span>{likeCount}</span>
            </button>

            <button 
              type="button" 
              className="reader-action-btn share-btn"
              onClick={handleShare}
              title="Share article link"
            >
              {copied ? <Check size={18} color="#10b981" /> : <Share2 size={18} />}
              <span>{copied ? "Copied" : "Share"}</span>
            </button>

            <button 
              type="button" 
              className="reader-close-btn" 
              onClick={onClose}
              aria-label="Close reader"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Article Body */}
        <div className="reader-scroll-content">
          {/* Article Header */}
          <header className="reader-header">
            <div className="reader-meta-chips">
              <span className="category-pill">{article.category}</span>
              <span className="read-time-pill">
                <Clock size={13} />
                {article.readTime}
              </span>
              <span className="date-pill">
                <Calendar size={13} />
                {article.publishedAt}
              </span>
            </div>

            <h1 className="reader-title">{article.title}</h1>
            <p className="reader-lead">{article.excerpt}</p>

            {/* Author Byline */}
            <div className="reader-author-box">
              <div className="author-avatar-badge">
                <User size={18} />
              </div>
              <div className="author-details">
                <span className="author-name">{article.author || "Amogh Ramteke"}</span>
                <span className="author-title">{article.authorRole || "Technology & Business Professional"}</span>
              </div>
            </div>
          </header>

          {/* Decorative Gradient Banner */}
          <div 
            className="reader-decorative-banner"
            style={{ background: article.coverGradient || 'linear-gradient(135deg, rgba(99, 102, 241, 0.3) 0%, rgba(6, 182, 212, 0.3) 100%)' }}
          >
            <div className="banner-badge">
              <BookOpen size={16} />
              <span>Technical Field Insights</span>
            </div>
          </div>

          {/* Formatted Markdown Content */}
          <article className="reader-body">
            {renderFormattedContent(article.content)}
          </article>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="reader-tags-section">
              <div className="tags-label">
                <Tag size={15} />
                <span>Tagged under:</span>
              </div>
              <div className="tags-list">
                {article.tags.map((tag, i) => (
                  <span key={i} className="reader-tag-chip">#{tag}</span>
                ))}
              </div>
            </div>
          )}

          {/* Reader Footer Callout */}
          <div className="reader-footer-callout glass-panel">
            <div className="callout-icon">
              <Sparkles size={24} />
            </div>
            <div className="callout-text">
              <h4>Enjoyed this perspective?</h4>
              <p>I frequently document technical workflows, operational playbooks, and systems architecture. Let's discuss your next project or challenge.</p>
            </div>
            <a href="#contact" className="btn btn-primary btn-sm" onClick={onClose}>
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
