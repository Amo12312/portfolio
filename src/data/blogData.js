// Blog & Articles data model with localStorage sync for Amogh Ramteke Portfolio

export const initialArticles = [
  {
    id: "art-1",
    title: "Production Incident Triage: A 5-Step Playbook for Zero-Downtime Recovery",
    slug: "production-incident-triage-playbook",
    category: "IT Operations",
    readTime: "6 min read",
    publishedAt: "Oct 08, 2026",
    status: "published",
    views: 342,
    likes: 48,
    author: "Amogh Ramteke",
    authorRole: "IT Support & Systems Specialist",
    tags: ["DevOps", "Incident Management", "System Health", "Troubleshooting"],
    excerpt: "When critical business applications fail during peak hours, panic is the enemy. Here is the operational framework I use to diagnose root causes, isolate failures, and restore services without compounding collateral damage.",
    coverGradient: "linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(14, 165, 233, 0.25) 100%)",
    featured: true,
    content: `
### The Reality of Production Outages

Every system administrator and IT engineer eventually faces the high-stress moment when tickets flood in, executive stakeholders demand status updates, and critical business workflows grind to an abrupt halt. 

In my work supporting enterprise platforms and e-commerce transactions, the difference between a 10-minute resolution and a 4-hour disaster rarely comes down to sheer technical intellect—it comes down to having a disciplined triage protocol.

---

### Step 1: Containment Before Investigation
When an alert fires, resist the instinct to make spontaneous hotfixes directly in production. 
* **Quarantine bad traffic or jobs:** If an erratic cron job or memory-leaking background task is swamping CPU cores, terminate the worker or enable rate-limiting first.
* **Preserve operational evidence:** Save active process dumps, recent stack traces, and access logs to a temporary directory before cycling the service.
* **Isolate blast radius:** Route client traffic to a healthy failover node or a styled maintenance fallback.

> *"Fixing the problem before containing it is like mopping the floor while the faucet is still running full blast."*

---

### Step 2: The 3-Tier Diagnostic Trace
Once the immediate bleeding stops, trace the failure through three concentric layers:
1. **Network & Infrastructure:** DNS resolution, SSL certificate expirations, gateway reverse proxy timeouts (NGINX/Cloudflare 502/504 errors).
2. **Application State:** Node.js event-loop blockage, unhandled promise rejections, memory spikes, or thread pool exhaustion.
3. **External Dependencies:** Database connection pools, third-party webhook endpoints (payment gateways, CRM webhooks), or API rate limits.

---

### Step 3: Minimal Viable Patch (MVP)
Never introduce comprehensive refactorings during an active outage. Implement the most surgically precise change that safely brings core functionality back to 100%. If a new deployment caused the break, **roll back immediately**. Reverting to a known healthy build takes seconds; live debugging in a degraded state takes hours.

---

### Step 4: Verification Under Real Load
Do not close an incident simply because the service status ping turned green. Verify:
* Can a user complete an end-to-end checkout / inquiry submission?
* Are background queues draining at normal throughput?
* Is CPU and RAM consumption stable 10 minutes post-recovery?

---

### Step 5: The Blameless Post-Mortem
Every outage is free tuition if you learn from it. Document:
* Exactly what happened and the timeline of events.
* What alert caught it, or why monitoring missed it.
* Specific guardrails added to ensure this exact issue never recurs.
    `
  },
  {
    id: "art-2",
    title: "From Chess Board to Production Architecture: Tactical Thinking in Complex Systems",
    slug: "chess-tactics-to-software-architecture",
    category: "Strategy & Systems",
    readTime: "5 min read",
    publishedAt: "Sep 24, 2026",
    status: "published",
    views: 489,
    likes: 82,
    author: "Amogh Ramteke",
    authorRole: "Technology & Business Professional",
    tags: ["Strategy", "Problem Solving", "Mental Models", "Architecture"],
    excerpt: "Competitive chess taught me pattern recognition, calculation under time pressure, and second-order thinking. Here is how Grandmaster principles directly improve software decisions and technical debt mitigation.",
    coverGradient: "linear-gradient(135deg, rgba(236, 72, 153, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%)",
    featured: true,
    content: `
### Pattern Recognition Under The Clock

In tournament chess, you are presented with 64 squares, 32 pieces, and an astronomical tree of possible moves. If you attempt to calculate every permutation from scratch, you will quickly flag on time and lose. 

Mastery in chess is built on **chunking and pattern recognition**—identifying underlying structural motifs instantly, allowing your calculation to focus only on high-value candidate moves.

When approaching software architecture and system operations, the exact same cognitive law applies.

---

### 1. Second-Order Thinking (The Candidate Move)
Novice players often play the first tempting move they see: *"I see a piece, I can take it."* They fail to ask: *"What will my opponent play in response?"*

In software engineering, this is equivalent to adding a quick hack to resolve a bug without considering what downstream microservices or database queries break as a consequence. 

Before committing any structural change, ask:
* What happens to memory usage when traffic scales 10x?
* What happens if this API endpoint times out or returns malformed JSON?
* Does this temporary workaround create irreversible technical debt?

---

### 2. Guarding the King (Proactive Defenses)
In chess, a king left in the center is an inevitable target. You castle early to tuck your most valuable piece into a fortress before launching an offensive flank attack.

In application development:
* **Your King is your Data & State integrity:** Database backups, atomic transactions, validation schemas, and environment security secrets.
* Castle before attacking: Never rush feature releases while leaving input sanitization, error boundaries, or logging configurations unfortified.

---

### 3. Positional Advantage Beats Premature Attacks
A beautiful tactical sacrifice only works if your pieces are coordinated on active squares. Rushing an attack with uncoordinated pieces leads to an immediate collapse.

Similarly, building elaborate AI integrations or complex microservices before establishing clean data modeling, stable Git workflows, and reliable deployment pipelines is doomed to create chaotic friction. Establish positional control first!
    `
  },
  {
    id: "art-3",
    title: "Scaling E-Commerce Operations: Multi-Vendor Catalog Sync & Payment Reliability",
    slug: "scaling-ecommerce-operations-catalog-sync",
    category: "Web Engineering",
    readTime: "7 min read",
    publishedAt: "Aug 19, 2026",
    status: "published",
    views: 276,
    likes: 39,
    author: "Amogh Ramteke",
    authorRole: "Web Developer & E-Commerce Integrator",
    tags: ["E-Commerce", "Web Development", "Payment Gateways", "APIs"],
    excerpt: "Handling thousands of SKUs across fluctuating supplier inventories requires robust validation, atomic database updates, and graceful payment failovers. Key architectural lessons from the e-commerce trenches.",
    coverGradient: "linear-gradient(135deg, rgba(16, 185, 129, 0.25) 0%, rgba(59, 130, 246, 0.25) 100%)",
    featured: false,
    content: `
### When Inventory Disappears Between Cart and Checkout

Few things destroy a customer's trust faster than paying for an item only to receive an automated cancellation email three hours later stating: *"Sorry, this item was actually out of stock."*

Building an e-commerce platform that handles real-time stock fluctuations across multiple channels requires defensive system design.

---

### 1. Race Conditions in Stock Decrement
When two users click "Place Order" on the last remaining unit simultaneously, standard database read-modify-write patterns result in disastrous double-sells.

**The Solution:** Use atomic conditional SQL queries:
\`\`\`sql
UPDATE products 
SET stock_count = stock_count - 1 
WHERE id = :product_id AND stock_count > 0;
\`\`\`
If the rows affected count is 0, the transaction immediately alerts the client that inventory was claimed, preventing orphaned orders.

---

### 2. Idempotent Payment Webhooks
Payment gateways (Stripe, Razorpay, PayPal) communicate order fulfillment via webhooks. However, network retries mean your server might receive the same "payment.succeeded" webhook three times in two minutes.

Without idempotency keys, you risk:
* Generating triple invoice numbers.
* Decrementing stock three times.
* Sending three duplicate confirmation emails.

Always store webhook event IDs in an events ledger and wrap execution in a check:
\`\`\`javascript
if (await db.hasProcessedWebhook(event.id)) {
  return res.status(200).send("Already processed");
}
\`\`\`

---

### 3. Asset & Image Optimization at Scale
High-resolution supplier images can easily bloat product catalog pages to 15MB+, destroying mobile Core Web Vitals and search rankings.
* Convert all supplier uploads to modern **WebP** / **AVIF** formats.
* Serve responsive image \`srcset\` tags with strict dimensions.
* Implement lazy-loading for below-the-fold catalog grids.
    `
  },
  {
    id: "art-4",
    title: "Eliminating 15+ Hours of Repetitive Tasks with Webhooks & Automated Workflows",
    slug: "automating-repetitive-office-workflows",
    category: "Automation",
    readTime: "5 min read",
    publishedAt: "Jul 12, 2026",
    status: "published",
    views: 412,
    likes: 64,
    author: "Amogh Ramteke",
    authorRole: "Workflow & Product Systems Builder",
    tags: ["Automation", "Webhooks", "Productivity", "JavaScript"],
    excerpt: "Manual data entry between forms, email spreadsheets, and customer trackers wastes valuable talent. Here is how I architect lightweight automated pipelines that save companies tens of hours every single week.",
    coverGradient: "linear-gradient(135deg, rgba(245, 158, 11, 0.25) 0%, rgba(239, 68, 68, 0.25) 100%)",
    featured: false,
    content: `
### The Silent Cost of "Copy-Pasting"

In almost every operational department, someone is spending their morning manually downloading CSVs, copying rows into a Google Sheet, and emailing status notifications to team managers. 

Not only is this monotonous work soul-crushing for bright professionals, but human fatigue inevitably causes transcription errors, delayed customer replies, and dropped leads.

---

### Designing The Zero-Touch Workflow
A high-impact automation pipeline doesn't require a $50,000 enterprise tool. A combination of structured webhooks, serverless functions, and modern messaging APIs can automate 90% of recurring administrative tasks:

1. **Trigger:** A customer submits an inquiry or a new support ticket is logged.
2. **Transform:** A lightweight script cleans the payload, categorizes urgency using pattern heuristics, and formats the metadata.
3. **Dispatch:**
   * Logged directly to central database / Notion dashboard.
   * Instant priority alert sent to mobile device via Telegram / Slack webhook.
   * Auto-personalized acknowledgement dispatched to sender.

---

### Return on Investment (ROI)
Saving an employee 3 hours per workday returns **60 hours of high-leverage focus time every month**. When technology handles the mechanical friction, humans can focus on strategic growth, client relationships, and deep creative problem solving.
    `
  }
];

export const initialInquiries = [
  {
    id: "inq-1",
    name: "Vikram Malhotra",
    email: "vikram.m@techventures.in",
    subject: "Full-Stack E-Commerce Project Inquiry",
    message: "Hi Amogh, I came across your portfolio and was impressed by your work in IT operations and web development. We have an upcoming retail platform project and would like to discuss a consultation or contract engagement.",
    createdAt: "2026-10-10T14:32:00Z",
    read: false
  },
  {
    id: "inq-2",
    name: "Sneha Patil",
    email: "sneha.patil@cloudscale.io",
    subject: "IT Support & Systems Coordination Role",
    message: "Hello Amogh, We are scaling our Pune infrastructure team and your combination of systems troubleshooting and product mindset looks like a strong fit. Let's connect this week!",
    createdAt: "2026-10-09T09:15:00Z",
    read: true
  }
];

// Storage keys
const ARTICLES_STORAGE_KEY = 'amogh_portfolio_articles_v1';
const INQUIRIES_STORAGE_KEY = 'amogh_portfolio_inquiries_v1';
const ADMIN_SETTINGS_KEY = 'amogh_portfolio_admin_settings_v1';

// Article storage helpers
export function getStoredArticles() {
  try {
    const raw = localStorage.getItem(ARTICLES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(initialArticles));
      return initialArticles;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading stored articles:', err);
    return initialArticles;
  }
}

export function saveStoredArticles(articles) {
  try {
    localStorage.setItem(ARTICLES_STORAGE_KEY, JSON.stringify(articles));
    window.dispatchEvent(new CustomEvent('articlesUpdated', { detail: articles }));
  } catch (err) {
    console.error('Error saving stored articles:', err);
  }
}

export function incrementArticleViews(articleId) {
  const articles = getStoredArticles();
  const updated = articles.map(art => {
    if (art.id === articleId) {
      return { ...art, views: (art.views || 0) + 1 };
    }
    return art;
  });
  saveStoredArticles(updated);
  return updated;
}

export function toggleArticleLike(articleId) {
  const articles = getStoredArticles();
  const likedKey = `liked_${articleId}`;
  const alreadyLiked = localStorage.getItem(likedKey) === 'true';
  
  const updated = articles.map(art => {
    if (art.id === articleId) {
      const current = art.likes || 0;
      return { ...art, likes: alreadyLiked ? Math.max(0, current - 1) : current + 1 };
    }
    return art;
  });
  
  if (alreadyLiked) {
    localStorage.removeItem(likedKey);
  } else {
    localStorage.setItem(likedKey, 'true');
  }
  
  saveStoredArticles(updated);
  return { updated, isLiked: !alreadyLiked };
}

// Inquiries storage helpers
export function getStoredInquiries() {
  try {
    const raw = localStorage.getItem(INQUIRIES_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(initialInquiries));
      return initialInquiries;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading stored inquiries:', err);
    return initialInquiries;
  }
}

export function saveStoredInquiries(inquiries) {
  try {
    localStorage.setItem(INQUIRIES_STORAGE_KEY, JSON.stringify(inquiries));
    window.dispatchEvent(new CustomEvent('inquiriesUpdated', { detail: inquiries }));
  } catch (err) {
    console.error('Error saving stored inquiries:', err);
  }
}

export function addInquiry(inquiry) {
  const inquiries = getStoredInquiries();
  const newEntry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false
  };
  const updated = [newEntry, ...inquiries];
  saveStoredInquiries(updated);
  return updated;
}

export function markInquiryAsRead(id) {
  const inquiries = getStoredInquiries();
  const updated = inquiries.map(item => item.id === id ? { ...item, read: true } : item);
  saveStoredInquiries(updated);
  return updated;
}

export function deleteInquiry(id) {
  const inquiries = getStoredInquiries();
  const updated = inquiries.filter(item => item.id !== id);
  saveStoredInquiries(updated);
  return updated;
}

// Admin settings helper
export function getAdminSettings() {
  try {
    const raw = localStorage.getItem(ADMIN_SETTINGS_KEY);
    if (!raw) {
      const defaults = {
        pin: 'amogh2026',
        availableForWork: true,
        statusBadgeText: 'Available for New Opportunities',
        customTagline: 'Technology. Business. Better Systems.'
      };
      localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(defaults));
      return defaults;
    }
    return JSON.parse(raw);
  } catch {
    return { pin: 'amogh2026', availableForWork: true, statusBadgeText: 'Available for New Opportunities' };
  }
}

export function saveAdminSettings(settings) {
  try {
    localStorage.setItem(ADMIN_SETTINGS_KEY, JSON.stringify(settings));
    window.dispatchEvent(new CustomEvent('adminSettingsUpdated', { detail: settings }));
  } catch (err) {
    console.error('Error saving admin settings:', err);
  }
}
