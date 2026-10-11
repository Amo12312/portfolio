import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Cpu, 
  Check, 
  Code2, 
  Database, 
  Globe, 
  Server, 
  Workflow, 
  FileSpreadsheet,
  Info
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export default function Skills() {
  const { skillsCategories } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    return ['All', ...skillsCategories.map(c => c.category)];
  }, [skillsCategories]);

  // Flattened & filtered list
  const filteredSkills = useMemo(() => {
    let list = [];
    skillsCategories.forEach(cat => {
      cat.skills.forEach(skill => {
        list.push({
          ...skill,
          categoryName: cat.category
        });
      });
    });

    if (selectedCategory !== 'All') {
      list = list.filter(s => s.categoryName === selectedCategory);
    }

    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(s => 
        s.name.toLowerCase().includes(q) ||
        s.tag.toLowerCase().includes(q) ||
        s.categoryName.toLowerCase().includes(q) ||
        (s.example && s.example.toLowerCase().includes(q))
      );
    }

    return list;
  }, [skillsCategories, selectedCategory, searchQuery]);

  const getLevelBadgeClass = (level) => {
    switch (level) {
      case 'Expert':
        return 'badge-emerald';
      case 'Advanced':
        return 'badge-primary';
      default:
        return 'badge-indigo';
    }
  };

  const getLevelPercentage = (level) => {
    switch (level) {
      case 'Expert':
        return '95%';
      case 'Advanced':
        return '85%';
      default:
        return '72%';
    }
  };

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">
            <Cpu size={16} />
            Skills & Technologies
          </span>
          <h2>Technical & <span className="text-gradient">Operational Stack</span></h2>
          <p>
            Skills labelled according to verified practical proficiency with concrete implementation examples.
          </p>
        </div>

        {/* Controls: Search and Filter Tabs */}
        <div className="skills-controls">
          {/* Search bar */}
          <div className="skills-search-wrapper">
            <Search size={18} className="search-icon text-muted" />
            <input 
              type="text" 
              placeholder="Search skills (e.g. PostgreSQL, Prisma, Docker, Shopify, Apps Script)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="skills-search-input"
            />
            {searchQuery && (
              <button 
                type="button" 
                onClick={() => setSearchQuery('')}
                className="clear-search-btn"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="skills-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Counter */}
        <div className="skills-result-meta">
          <span>Showing <strong>{filteredSkills.length}</strong> technologies & competencies</span>
          {selectedCategory !== 'All' && <span className="active-filter-badge">Filter: {selectedCategory}</span>}
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill, idx) => (
            <div key={`${skill.name}-${idx}`} className="skill-card glass-panel">
              <div className="skill-card-top">
                <div className="skill-main-info">
                  <h4 className="skill-name">{skill.name}</h4>
                  <span className="skill-tag">{skill.tag}</span>
                </div>
                <span className={`badge ${getLevelBadgeClass(skill.level)}`}>
                  {skill.level}
                </span>
              </div>

              {/* Concrete Implementation Example if available */}
              {skill.example && (
                <div className="skill-example-box">
                  <span className="example-label">Implementation:</span>
                  <p className="example-text">{skill.example}</p>
                </div>
              )}

              {/* Visual meter */}
              <div className="skill-meter-container">
                <div className="skill-meter-bg">
                  <div 
                    className="skill-meter-fill"
                    style={{ width: getLevelPercentage(skill.level) }}
                  ></div>
                </div>
                <div className="skill-category-label">
                  <span>{skill.categoryName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredSkills.length === 0 && (
          <div className="no-skills-found glass-panel">
            <p>No skills found matching "{searchQuery}". Try another keyword or reset the filter.</p>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm"
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
