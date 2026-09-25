// Source of truth for the Projects grid. Admin Mode edits this in memory
// (persisted to localStorage) and can export an updated copy of this file.
window.PROJECTS_DATA = [
  {
    id: "elastic",
    category: "AI Product (0→1)",
    name: "Elastic: Habit Tracking",
    headline: "A habit system designed for when motivation fails",
    description: "Most habit trackers assume constant motivation, so a bad week means a broken streak and, often, giving up entirely. Elastic flexes with real life instead of punishing it.",
    tags: ["Google AI Studio", "NotebookLM", "Stitch AI"],
    cover: "",
    links: [
      { label: "Prototype", url: "https://aistudio.google.com/apps/5c8db466-2e66-4b66-b290-d4c17ab80ef5?showPreview=true&showAssistant=true&fullscreenApplet=true" },
      { label: "GitHub Repo", url: "https://github.com/aabbagani/Elastic-Habit-Tracker" },
      { label: "Documentation", url: "https://hjxunlccgefcasxqamtj.supabase.co/storage/v1/object/public/portfolio-uploads/1781199932961-78369745.pdf" }
    ]
  },
  {
    id: "myp-vault",
    category: "AI Knowledge System",
    name: "MYP Vault: Why Knowing Isn't Scoring",
    headline: "Building a RAG System for Exam-Ready Answers",
    description: "IB MYP students often understand the material but lose marks because mark schemes are hard to interpret. MYP Vault maps answers directly to marks, so students see exactly where they lost points and why.",
    tags: ["Claude", "Gemini", "GPT", "Stitch AI"],
    cover: "",
    links: [
      { label: "Product Requirement Doc", url: "https://hjxunlccgefcasxqamtj.supabase.co/storage/v1/object/public/portfolio-uploads/1785180305659-623043615.pdf" }
    ]
  },
  {
    id: "beli",
    category: "Product Requirements Document",
    name: "Beli's Decision Gap",
    headline: "Turning fragmented restaurant discovery into confident, in-app decisions",
    description: "Beli helps people discover restaurants, but not decide. Users still bounce between Instagram, Yelp, and Maps to actually choose. This redesign consolidates that decision into one place.",
    tags: ["Google AI Studio", "Figma", "Canva"],
    cover: "",
    links: [
      { label: "Slide Deck", url: "https://canva.link/vvhw0ncowt1xv8t" },
      { label: "Prototype", url: "https://ai.studio/apps/8a146c78-c034-4eda-810b-9af6ede33f84" },
      { label: "PRD", url: "https://hjxunlccgefcasxqamtj.supabase.co/storage/v1/object/public/portfolio-uploads/1783551152284-280924403.pdf" }
    ]
  },
  {
    id: "duolingo",
    category: "Product Enhancement",
    name: "Duolingo Fluency Gap",
    headline: "From \"getting it right\" to actually speaking",
    description: "Duolingo rewards recognizing the right answer, not producing language independently. Users feel fluent in the app, then freeze in a real conversation.",
    tags: ["Figma", "StitchAI"],
    cover: "",
    links: [
      { label: "Documentation", url: "" }
    ]
  },
  {
    id: "rural-hiring",
    category: "Matching Engine",
    name: "Rural Hiring Platform (Rose Trust)",
    headline: "Connecting underserved communities to local work opportunities",
    description: "In rural India, hiring runs on informal trust, so workers struggle to find nearby jobs and employers struggle to find reliable talent. This platform matches both, ranked by rating and availability.",
    tags: ["Python", "CSV Data Handling"],
    cover: "",
    links: [
      { label: "Code", url: "" },
      { label: "Source CSV", url: "" }
    ]
  },
  {
    id: "pure-plate",
    category: "0→1 Product Design",
    name: "Pure Plate",
    headline: "Helping users make safe food decisions in health-critical moments",
    description: "People with food allergies need help deciding what's safe to eat right now, not just tracking what they've eaten. Pure Plate gives real-time guidance at the moment of choice.",
    tags: ["Figma", "WIX", "UX Prototyping"],
    cover: "",
    links: [
      { label: "Figma Prototype", url: "" },
      { label: "Website Prototype", url: "" }
    ]
  },
  {
    id: "goodreads",
    category: "Product Improvement (built solution)",
    name: "Goodreads: Niche Discovery Recommendations",
    headline: "Fixing popularity bias in Goodreads recommendations",
    description: "Goodreads recommendations favor popular books, so lesser-known titles that actually match a reader's taste rarely surface. This fixes the bias toward mainstream picks.",
    tags: ["Python", "Pandas", "Matplotlib", "BeautifulSoup", "NumPy", "Scikit-learn", "Data Modeling"],
    cover: "",
    links: [
      { label: "Code", url: "" },
      { label: "Documentation", url: "" },
      { label: "Presentation", url: "" }
    ]
  },
  {
    id: "linkedin",
    category: "Workflow Feature Design",
    name: "LinkedIn: Application Tracking & Feedback",
    headline: "Fixing the black hole after job applications",
    description: "After applying on LinkedIn, users get no visibility into what happens next; the process just goes quiet. This adds structured tracking and feedback after submission.",
    tags: ["Figma", "Product Thinking", "UX Design"],
    cover: "",
    links: [
      { label: "Slide Deck", url: "" }
    ]
  },
  {
    id: "clinicalm",
    category: "Trust & Data Quality",
    name: "CliniCalm: An Intake Quality Gate for Clinical Trial Data",
    headline: "A trust gate for AI-curated data, catching what dataset-level validation catches too late",
    description: "Flatiron Health proves its AI-curated oncology data trustworthy at the dataset level, after the fact. Nobody proves it for one record, in real time, before a human decides whether to trust it. CliniCalm flags exactly that gap, routes it to a named reviewer, and logs every decision, before anything reaches downstream analytics.",
    tags: ["Claude", "GitHub Pages", "JavaScript"],
    cover: "",
    links: [
      { label: "Prototype", url: "https://clinicalm.abbagani.com" },
      { label: "GitHub Repo", url: "https://github.com/aabbagani/clinicalm" },
      { label: "Product Requirements Doc", url: "" }
    ]
  }
];

// Presets offered in the Admin Mode category dropdown; a project can still
// carry any custom string as its category (typed via "Other...").
window.PROJECT_CATEGORY_PRESETS = [
  "AI Product (0→1)",
  "AI Knowledge System",
  "Product Requirements Document",
  "Product Enhancement",
  "Matching Engine",
  "0→1 Product Design",
  "Product Improvement (built solution)",
  "Workflow Feature Design",
  "Trust & Data Quality"
];
