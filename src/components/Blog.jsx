import React, { useState, useEffect } from 'react';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Eye, 
  Heart, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Tag, 
  SlidersHorizontal 
} from 'lucide-react';
import { getStoredArticles, incrementArticleViews } from '../data/blogData';
import ArticleReaderModal from './ArticleReaderModal';

export default function Blog({ onOpenAdmin }) {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isReaderOpen, setIsReaderOpen] = useState(false);

  // Load articles and subscribe to updates
  const loadArticles = () => {
    const list = getStoredArticles();
    // Show only published articles on the public blog
    setArticles(list.filter(a => a.status === 'published'));
  };

  useEffect(() => {
    loadArticles();

    const handleUpdate = () => loadArticles();
    window.addEventListener('articlesUpdated', handleUpdate);
    return () => window.removeEventListener('articlesUpdated', handleUpdate);
  }, []);

  // Categories
  const categories = ['All', 'IT Operations', 'Strategy & Systems', 'Web Engineering', 'Automation'];

  // Filtered list
  const filteredArticles = articles.filter(article => {
    const matchesCategory = activeCategory === 'All' || article.category === activeCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch = !q || 
      article.title.toLowerCase().includes(q) || 
      article.excerpt.toLowerCase().includes(q) ||
      (article.tags && article.tags.some(t => t.toLowerCase().includes(q)));
    return matchesCategory && matchesSearch;
  });

  const handleOpenArticle = (article) => {
    incrementArticleViews(article.id);
    setSelectedArticle(article);
    setIsReaderOpen(true);
    // Reload local count
    loadArticles();
  };

  return (
    <section id="blog" className="section blog-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header text-center">
          <div className="badge-pill section-badge">
            <BookOpen size={14} className="badge-icon" />
            <span>Field Notes & Technical Articles</span>
          </div>
          <h2 className="section-title">
            Perspectives, Systems & <span className="text-gradient">Playbooks</span>
          </h2>
          <p className="section-subtitle">
            Hands-on insights from production troubleshooting, business process automation, 
            e-commerce architecture, and competitive chess strategy applied to modern software.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="blog-controls-wrapper glass-panel">
          {/* Search Box */}
          <div className="blog-search-box">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search articles by title, topic, or tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="blog-search-input"
              aria-label="Search articles"
            />
            {searchQuery && (
              <button 
                type="button" 
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                &times;
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="blog-category-tabs">
            {categories.map(cat => {
              const count = cat === 'All' 
                ? articles.length 
                : articles.filter(a => a.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  className={`category-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  <span>{cat}</span>
                  <span className="category-count">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Articles Grid */}
        {filteredArticles.length > 0 ? (
          <div className="articles-grid">
            {filteredArticles.map((article, index) => (
              <article 
                key={article.id} 
                className={`article-card glass-panel ${article.featured ? 'featured-article-card' : ''}`}
              >
                {/* Visual Top Banner */}
                <div 
                  className="article-card-header"
                  style={{ background: article.coverGradient || 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.2) 100%)' }}
                >
                  <div className="article-badges-row">
                    <span className="article-category-badge">{article.category}</span>
                    {article.featured && (
                      <span className="featured-badge">
                        <Sparkles size={12} />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="article-read-time">
                    <Clock size={13} />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="article-card-body">
                  <div className="article-date-row">
                    <span className="article-publish-date">{article.publishedAt}</span>
                    <div className="article-stats">
                      <span className="stat-pill" title="Views">
                        <Eye size={13} />
                        <span>{article.views || 0}</span>
                      </span>
                      <span className="stat-pill" title="Likes">
                        <Heart size={13} />
                        <span>{article.likes || 0}</span>
                      </span>
                    </div>
                  </div>

                  <h3 className="article-card-title">
                    <button 
                      type="button" 
                      className="article-title-link"
                      onClick={() => handleOpenArticle(article)}
                    >
                      {article.title}
                    </button>
                  </h3>

                  <p className="article-card-excerpt">
                    {article.excerpt}
                  </p>

                  {/* Tags */}
                  {article.tags && article.tags.length > 0 && (
                    <div className="article-card-tags">
                      {article.tags.slice(0, 3).map((tag, i) => (
                        <span key={i} className="article-tag-item">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Read Trigger */}
                  <div className="article-card-footer">
                    <button 
                      type="button" 
                      className="read-article-btn"
                      onClick={() => handleOpenArticle(article)}
                    >
                      <span>Read Full Article</span>
                      <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="no-articles-state glass-panel text-center">
            <Layers size={36} className="empty-icon" />
            <h3>No articles match your search</h3>
            <p>Try searching for a different keyword or switch to another category filter.</p>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Admin Quick Action Prompt */}
        <div className="blog-admin-hint">
          <span>Need to publish a new article or edit posts?</span>
          <button 
            type="button" 
            className="blog-admin-link"
            onClick={onOpenAdmin}
          >
            Open Admin Console
          </button>
        </div>
      </div>

      {/* Reader Modal */}
      <ArticleReaderModal 
        article={selectedArticle}
        isOpen={isReaderOpen}
        onClose={() => setIsReaderOpen(false)}
        onArticleUpdated={loadArticles}
      />
    </section>
  );
}
