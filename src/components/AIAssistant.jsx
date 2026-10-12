import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  User, 
  RotateCcw, 
  ChevronRight,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { getStoredArticles } from '../data/blogData';

export default function AIAssistant({ onOpenResume }) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 'msg-welcome',
      sender: 'bot',
      text: `Hello! I'm **Amogh's AI Assistant**. Ask me anything about his technical skills, IT operations experience, web projects, or chess problem-solving mindset!`,
      time: 'Just now'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  // Suggested quick prompts
  const quickPrompts = [
    "What are his core skills?",
    "Tell me about his work experience",
    "Show me his top projects",
    "How does chess help his coding?",
    "How do I contact or hire Amogh?"
  ];

  // Smart Knowledge Engine about Amogh
  const generateResponse = (query) => {
    const q = query.toLowerCase().trim();
    const { personal, whatIDo, skillsCategories, projects, experience } = portfolioData;
    const articles = getStoredArticles().filter(a => a.status === 'published');

    // 1. Skills & Tech Stack
    if (q.includes('skill') || q.includes('stack') || q.includes('tech') || q.includes('language') || q.includes('react') || q.includes('javascript') || q.includes('node') || q.includes('css')) {
      return `**Amogh's Core Technology Stack:**\n\n• **Frontend & Web:** React.js, JavaScript (ES6+), HTML5, CSS3/Vanilla CSS, Bootstrap.\n• **Backend & Server:** Node.js, Express.js, PHP, REST APIs.\n• **IT & Operations:** Linux, Windows Server, Nginx, Hosting/DNS, Incident Triage, E-Commerce Integrations.\n• **Database & Tools:** Git, GitHub, MySQL, MongoDB basics, Webhooks & Workflow Automation.\n\nHe specializes in bridging modern web development with robust IT infrastructure.`;
    }

    // 2. Experience & Roles
    if (q.includes('experience') || q.includes('job') || q.includes('company') || q.includes('work') || q.includes('history') || q.includes('career')) {
      return `**Amogh's Work Experience:**\n\n• **IT Support & Web Specialist** (Pune, India): Handled application support, enterprise troubleshooting, website maintenance, and e-commerce inventory sync.\n• **E-Commerce & Website Specialist:** Managed multi-vendor platform catalogs, payment gateway webhooks (Razorpay/Stripe), and DNS/SSL configurations.\n• **Problem Solving:** Known for disciplined 5-step incident triage and reducing operational downtime.`;
    }

    // 3. Projects & Portfolio
    if (q.includes('project') || q.includes('built') || q.includes('work') || q.includes('app') || q.includes('demo')) {
      return `**Key Projects Built by Amogh:**\n\n1. **High-Performance Multi-Channel E-Commerce Suite:** Built with React & Node with real-time stock sync and automated webhook validation.\n2. **IT Incident Response & Monitoring Console:** Tactical dashboard for system health, uptime tracking, and rapid triage.\n3. **Modern Portfolio & Mobile Blogging PWA Studio:** Fully responsive with local persistence, secret admin controls, and offline capabilities.\n\nYou can explore deep case studies in the **Projects** section!`;
    }

    // 4. Chess & Mindset
    if (q.includes('chess') || q.includes('strategy') || q.includes('mindset') || q.includes('think') || q.includes('tactics')) {
      return `**Chess & Software Architecture:**\n\nAmogh comes from a competitive tournament chess background. He applies Grandmaster mental models to engineering:\n\n• **Candidate Moves (Second-Order Thinking):** Considering downstream impacts before deploying code to production.\n• **Castling (Proactive Defense):** Securing databases and state integrity before expanding features.\n• **Composure Under Pressure:** Calm, methodical debugging during active high-stress production outages.`;
    }

    // 5. Contact / Hire / Location / Availability
    if (q.includes('hire') || q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('available') || q.includes('location') || q.includes('pune') || q.includes('reach')) {
      return `**Get in Touch with Amogh:**\n\n📍 **Location:** Pune, Maharashtra, India\n📧 **Email:** [${personal.email}](mailto:${personal.email})\n📱 **Phone / WhatsApp:** +91-8080230723\n💼 **LinkedIn:** [Amogh Ramteke LinkedIn](${personal.linkedin})\n\nHe is currently **open for full-time and high-impact contract opportunities**! You can also fill the contact form on this page to send a message directly.`;
    }

    // 6. Blog & Field notes
    if (q.includes('blog') || q.includes('article') || q.includes('write') || q.includes('read')) {
      return `Amogh writes technical field notes on systems architecture, incident response, and process automation. Currently published articles:\n\n${articles.slice(0, 3).map((a, i) => `${i+1}. **${a.title}** (${a.category})`).join('\n')}\n\nYou can read them in full in the **Blog** section!`;
    }

    // 7. Resume
    if (q.includes('resume') || q.includes('cv')) {
      return `You can view Amogh's complete curriculum vitae by clicking the **"Resume"** button at the top of the page, or ask me specific questions about his education and qualifications!`;
    }

    // Default Fallback
    return `Amogh is a **Technology & Business Professional** based in Pune, combining hands-on Web Development (React, JS, Node) with IT Support, systems triage, and business process automation.\n\nFeel free to ask about his **skills**, **projects**, **work experience**, or **how to contact him**!`;
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = generateResponse(query);
      const botMsg = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 450);
  };

  return (
    <div className="ai-assistant-wrapper">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button 
          type="button" 
          className="ai-floating-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open AI Assistant"
          title="Ask Amogh's AI Assistant"
        >
          <div className="ai-trigger-icon-pulse">
            <Bot size={22} />
          </div>
          <span className="ai-trigger-label">Ask Amogh AI</span>
          <span className="ai-online-status"></span>
        </button>
      )}

      {/* Interactive Chat Window */}
      {isOpen && (
        <div className="ai-chat-card glass-panel" role="dialog" aria-label="Amogh AI Assistant">
          {/* Header Bar */}
          <div className="ai-chat-header">
            <div className="ai-header-info">
              <div className="ai-avatar-badge">
                <Bot size={18} />
              </div>
              <div>
                <h4 className="ai-header-title">Amogh.AI</h4>
                <span className="ai-header-subtitle">
                  <span className="pulse-dot-green"></span>
                  Online • Portfolio Knowledge Assistant
                </span>
              </div>
            </div>

            <div className="ai-header-controls">
              <button 
                type="button" 
                className="ai-icon-btn"
                title="Reset Chat"
                onClick={() => setMessages([{
                  id: 'msg-welcome',
                  sender: 'bot',
                  text: `Chat reset. Ask me anything about Amogh's projects, tech stack, or operational experience!`,
                  time: 'Just now'
                }])}
              >
                <RotateCcw size={15} />
              </button>
              <button 
                type="button" 
                className="ai-icon-btn"
                onClick={() => setIsOpen(false)}
                aria-label="Close Assistant"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages Feed */}
          <div className="ai-chat-messages">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`ai-message-row ${msg.sender === 'user' ? 'is-user' : 'is-bot'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="ai-bot-avatar-mini">
                    <Bot size={14} />
                  </div>
                )}
                <div className="ai-message-bubble">
                  <div className="ai-bubble-text">
                    {msg.text.split('\n').map((line, i) => {
                      if (!line.trim()) return <br key={i} />;
                      // Bold formatting
                      const formatted = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      return <p key={i} dangerouslySetInnerHTML={{ __html: formatted }} />;
                    })}
                  </div>
                  <span className="ai-message-time">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="ai-message-row is-bot">
                <div className="ai-bot-avatar-mini">
                  <Bot size={14} />
                </div>
                <div className="ai-message-bubble ai-typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="ai-quick-chips">
            {quickPrompts.slice(0, 3).map((prompt, i) => (
              <button 
                key={i} 
                type="button" 
                className="ai-chip-btn"
                onClick={() => handleSend(prompt)}
              >
                <span>{prompt}</span>
              </button>
            ))}
          </div>

          {/* Input Form Bar */}
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSend(); }} 
            className="ai-chat-input-bar"
          >
            <input 
              type="text" 
              placeholder="Ask anything about Amogh..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="ai-chat-input"
            />
            <button 
              type="submit" 
              className="ai-send-btn"
              disabled={!input.trim()}
              aria-label="Send query"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
