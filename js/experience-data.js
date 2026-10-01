// Source of truth for the Experience timeline. Admin Mode edits are
// overlaid on top of this via localStorage; use the "Export data file"
// button there to get an updated copy of this file.
//
// Each role can carry `stats` (the "AT A GLANCE" numbers) and
// `highlights` (the "WHAT I WORKED ON" cards) in addition to the plain
// `bullets`. When present, the render shows stats+highlights instead of
// the bullet list; `bullets` stays as the underlying source text and as
// a fallback for any role that doesn't have the richer fields yet.
//
// Ordered most-recent-first by END date (ongoing roles first), matching
// how overlapping roles actually read on a career log.
window.EXPERIENCE_DATA = [
  {
    id: "blumetra-apm",
    logo: "assets/experience/blumetra-logo.png",
    role: "Associate Product Manager",
    org: "Blumetra Solutions",
    location: "Pleasanton, CA",
    dates: "Dec 2025 – Present",
    tags: ["Replit", "Google AI Studio", "Kiro", "Claude", "JIRA", "Confluence"],
    stats: [
      { value: "20 min", label: "Onboarding time, down from months" },
      { value: "5", label: "AI features RICE-prioritized" },
      { value: "1 of 4", label: "Finalists — won by Exelixis" },
      { value: "10", label: "Competing pitches beaten" }
    ],
    highlights: [
      { icon: "🏥", title: "Embedded on-site", description: "Scoped and built Clintelligence, a product to cut clinical trial data processing time across the raw-to-gold pipeline at a leading oncology biotech." },
      { icon: "🧪", title: "Prototyped the core feature", description: "Built ClinOps Study Build on Replit and Kiro for Clintelligence, automating EDC-ready study models, CRF forms, edit checks, and UAT plans directly from protocol text." },
      { icon: "🔧", title: "Fixed the onboarding bottleneck", description: "Traced an OCR ingestion failure to watermarked pages and shipped a pre-chunking fix with Claude — cutting study onboarding from months to 20 minutes." },
      { icon: "🛡️", title: "Wrote the guardrails", description: "Authored technical specs covering EDC routing logic and hallucination guardrails defining AI behavior under uncertainty." },
      { icon: "🏆", title: "Helped win the business", description: "Applied RICE prioritization across 5 AI features to define build order; Clintelligence beat 10 pitches to become 1 of 4 finalists, then was selected by Exelixis, a leading oncology biotech." },
      { icon: "🔁", title: "Ran the process", description: "Owned Jira stories, documented backend architecture in Confluence, and recapped progress in daily standups." }
    ],
    bullets: [
      "Embedded on-site at a leading oncology biotech; scoping a product to reduce clinical trial data processing time across raw-to-gold pipeline layers.",
      "Prototyped ClinOps Study Build for Clintelligence, an agentic AI clinical trial platform, on Kiro and Replit.",
      "Built and debugged SDTM metadata logic with Claude; traced an OCR ingestion failure to watermarked pages, implemented a pre-chunking fix, cutting onboarding from months to 20 minutes.",
      "Authored technical specs covering EDC routing logic and hallucination guardrails defining AI behavior under uncertainty.",
      "Applied RICE across 5 AI features to define build order; contributed to Clintelligence's selection over 9 competitors.",
      "Owned Jira stories for the platform, collaborated with engineering on backend architecture documentation in Confluence, and recapped progress in daily standups."
    ],
    links: []
  },
  {
    id: "lightskiddo",
    logo: "assets/experience/lightskiddo-logo.png",
    role: "Product Test Lead Intern",
    org: "LightsKiddo — an AI-powered OS for film production",
    location: "Remote / New York, NY",
    dates: "June 2026 – Present",
    tags: [],
    stats: [
      { value: "80+", label: "Bugs found" },
      { value: "30", label: "Production companies researched" },
      { value: "6", label: "Miramax stakeholders interviewed" },
      { value: "40%", label: "Est. reduction in manual search time" }
    ],
    highlights: [
      { icon: "🐛", title: "Tested the product", description: "Found 80+ bugs across front- and back-end releases and worked directly with the CTO to prioritize fixes." },
      { icon: "🤖", title: "Found an AI opportunity", description: "Specced recast matching logic using IMDb data across budget, availability, and fit." },
      { icon: "🔎", title: "Talked to real users", description: "Interviewed production teams to understand their workflows and identify gaps worth solving." },
      { icon: "⚙️", title: "Built the system behind the testing", description: "Created a repeatable bug-tracking and QA framework instead of handling testing ad hoc." }
    ],
    bullets: [
      "Led product testing across front- and back-end for the platform's beta website.",
      "Identified 80+ bugs across releases, collaborating directly with the CTO on fixes.",
      "Specced AI-powered recast matching logic that links IMDb profile data (budget, availability, fit) to cut manual search time by 40%.",
      "Built an internal bug-tracking process and testing framework to standardize QA documentation across releases.",
      "Conducted user research across 30 production companies, including interviewing 6 Miramax stakeholders directly, to surface behavioral patterns and feature gaps."
    ],
    links: []
  },
  {
    id: "cure-foundation",
    logo: "assets/experience/cure-foundation-logo.png",
    role: "Product Operations Lead",
    org: "CURE Foundation — India's largest charity golf championship",
    location: "Hyderabad, India",
    dates: "Dec 2025 – Feb 2026",
    tags: ["Tableau", "Microsoft Excel", "Power BI"],
    stats: [
      { value: "2,500+", label: "Attendees managed on-site" },
      { value: "700+", label: "Stakeholders coordinated" },
      { value: "4", label: "Tracking workflows built" },
      { value: "20+", label: "Press & news outlets present" }
    ],
    highlights: [
      { icon: "🎤", title: "Led as the point of contact", description: "Head Intern for the 8th edition of the Cancer Crusaders Golf Championship, India's largest charity golf championship." },
      { icon: "📣", title: "Ran the press moment", description: "Anchored the official press meet and tournament inauguration in front of 20+ press and news outlets, alongside chief guests Jagapati Babu and Chaitanya Menon." },
      { icon: "🗂️", title: "Built the tracking systems", description: "Created 4 workflows from scratch for donor/sponsor data, registrations, and logistics via Excel, Tableau, and Power BI — adopted as the standard for future events." },
      { icon: "🎯", title: "Ran the event floor", description: "Managed on-site operations for 2,500+ attendees and 50 golf players, restructuring workflows in real time to maintain execution quality." }
    ],
    bullets: [
      "Served as Head Intern and primary point of contact for the 8th edition of the Cancer Crusaders Golf Championship: India's largest charity golf championship, founded by Padma Shri Dr. Palkonda Vijay Anand Reddy, India's leading oncologist.",
      "Anchored the official press meet and inaugurated the tournament alongside chief guests Jagapati Babu and Chaitanya Menon, coordinating across internal teams, external vendors, and 700+ stakeholders for 2,500+ attendees.",
      "Built 4 structured tracking workflows from scratch spanning donor/sponsor data, player registrations, logistics, and event coordination — validated and cleaned data for 1,000+ stakeholders via Excel, Tableau, and Power BI; templates were adopted as the standard for all future events.",
      "Managed on-site operations for 2,500 attendees and 50 golf players, identifying process breakdowns in real time and restructuring workflows mid-event to maintain execution quality across all workstreams."
    ],
    links: []
  },
  {
    id: "louisa-ai",
    logo: "assets/experience/louisa-ai-logo.png",
    role: "Product Manager Intern",
    org: "Louisa AI",
    location: "New York, NY",
    dates: "Aug 2025 – Dec 2025",
    tags: ["Monday.com", "Google AI Studio", "CapCut"],
    stats: [
      { value: "18%", label: "Lift in feature engagement" },
      { value: "~20%", label: "Uptime improvement" },
      { value: "60%", label: "Drop in customer support tickets" },
      { value: "7", label: "AI platforms benchmarked" }
    ],
    highlights: [
      { icon: "🤝", title: "Helped close an enterprise client", description: "Co-pitched Louisa's collective intelligence platform to Apollo Global Management on day 3 of the internship; Apollo converted to a paying client." },
      { icon: "📈", title: "Grew engagement", description: "Drove an 18% lift in feature engagement for the AI-curated News feature by tracking MAUs and surfacing insights." },
      { icon: "🛠️", title: "Fixed what was breaking demos", description: "Partnered with engineering to resolve critical link redirect failures, improving platform uptime ~20% before demos at RBC and McKinsey." },
      { icon: "🎬", title: "Standardized onboarding", description: "Designed onboarding flows for 4 enterprise deployments using CapCut, cutting customer support tickets 60% — adopted as the company standard post-internship." },
      { icon: "🔍", title: "Scoped the competition", description: "Conducted competitive analysis across 7 AI platforms to identify positioning gaps and inform the product roadmap." }
    ],
    bullets: [
      "Co-pitched Louisa, an AI sales enablement platform, to Apollo Global Management on day 3 of the internship; Apollo converted to a paying client.",
      "Synthesized executive feedback into a navigation redesign collapsing 6 tabs into 3, converting Apollo into a paying client.",
      "Drove an 18% lift in feature engagement for the AI-curated News feature by tracking MAUs and surfacing insights that shaped product iterations.",
      "Partnered with engineering to resolve critical link redirect failures, improving platform uptime by ~20% before high-stakes demos at RBC and McKinsey.",
      "Produced video flows in CapCut for RBC and McKinsey, cutting support questions 60% with a replicable process adopted as company standard.",
      "Maintained competitive intelligence across 7 AI platforms; surfaced gaps to inform product positioning and feature prioritization."
    ],
    links: []
  },
  {
    id: "stellantis",
    logo: "assets/experience/stellantis-logo.png",
    role: "IT Software Quality Assurance Analyst Intern",
    org: "Stellantis Financial Services",
    location: "Houston, Texas",
    dates: "Jun 2025 – Aug 2025",
    tags: ["Salesforce Sandbox", "UiPath Studio", "Copilot", "JIRA", "Confluence"],
    stats: [
      { value: "100+", label: "Workflows automated" },
      { value: "15+", label: "RPA prototypes built" },
      { value: "150+", label: "UAT test cases executed" }
    ],
    highlights: [
      { icon: "🤖", title: "Automated the manual work", description: "Selected and used UiPath Studio to automate 100+ manually handled loan servicing workflows; built 15+ RPA prototypes end-to-end." },
      { icon: "🧪", title: "Tested it thoroughly", description: "Authored and executed 150+ UAT test cases across borrower and agent workflows, tracking defects in Jira and Confluence." },
      { icon: "🤝", title: "Aligned the stakeholders", description: "Organized 4 sessions with PMs, POs, and the CIO on prioritization and release planning — work spotlighted at the company-wide Town Hall." }
    ],
    bullets: [
      "Independently researched and selected UiPath Studio to automate 100+ manually handled loan servicing workflows; built 15+ RPA prototypes end-to-end and presented the business case and ROI directly to C-suite.",
      "Authored and executed 150+ UAT test cases across borrower and agent workflows; tracked defects in Jira and Confluence.",
      "Organized 4 sessions with PMs, POs, and the CIO on prioritization, journey mapping, and release planning; drove alignment across functions and unblocked a critical release; work spotlighted at company-wide Town Hall."
    ],
    links: [{ label: "View Presentation", url: "https://canva.link/ffpqbdoh3ctx122" }]
  },
  {
    id: "blumetra-apm-intern",
    logo: "assets/experience/blumetra-logo.png",
    role: "Associate Product Manager Intern",
    org: "Blumetra Solutions",
    location: "Pleasanton, California",
    dates: "May 2024 – Aug 2024",
    tags: ["SQL", "Tableau", "Figma", "JIRA"],
    stats: [
      { value: "20+", label: "User interviews conducted" },
      { value: "30%", label: "Cut in resolution time" },
      { value: "0→1", label: "Product discovery led (FileVantage)" }
    ],
    highlights: [
      { icon: "📄", title: "Defined the vision", description: "Wrote product vision, user stories, and KPIs for FileVantage, a no-code ETL platform, securing CPO alignment on GTM scope." },
      { icon: "✅", title: "Earned buy-in", description: "Earned C-suite approval for PixelPal UX by conducting 20+ user interviews and synthesizing findings into Figma user flows." },
      { icon: "📊", title: "Built the dashboards", description: "Built Tableau dashboards for FileVantage adoption and ran competitor analysis to identify market gaps, cutting resolution time by 30%." },
      { icon: "🗺️", title: "Aligned the team", description: "Authored problem statements, OKRs, and roadmap documentation to align cross-functional teams on MVP scope and priorities." }
    ],
    bullets: [
      "Led 0→1 discovery for FileVantage, a no-code ETL platform; conducted market analysis, competitive research, and stakeholder interviews; authored product vision, user stories, and KPIs presented to the CPO.",
      "Built Tableau dashboards tracking FileVantage adoption and test failures; contributed to a 30% reduction in bug fix resolution time.",
      "Authored OKRs, roadmap documentation, and problem statements to align cross-functional teams on MVP scope and priorities.",
      "Earned C-suite approval for PixelPal UX by conducting 20+ user interviews and synthesizing findings into Figma user flows."
    ],
    links: []
  },
  {
    id: "rose-trust",
    logo: "assets/experience/rose-trust-logo.png",
    role: "Python Developer",
    org: "Rose Trust NGO",
    location: "Remote – Hyderabad, India",
    dates: "May 2024 – Aug 2024",
    tags: ["Python", "Excel"],
    stats: [
      { value: "8", label: "Rural communities connected" },
      { value: "20%", label: "Increase in job placements" },
      { value: "3 months", label: "Gap identification → deployment" }
    ],
    highlights: [
      { icon: "🐍", title: "Built the platform", description: "Independently scoped, built, tested, and deployed a Python job-matching platform connecting skilled workers across 8 rural Indian communities with local employers." },
      { icon: "🤝", title: "Shaped it with the NGO", description: "Built a ranking algorithm sorting matches by occupation, rating, and availability; debugged edge cases across inconsistent rural employer data." },
      { icon: "📈", title: "Proved it worked", description: "A/B tested the review format after low adoption; simplified to a numeric rating, driving a 20% lift in job placements in 3 months via NGO-tracked surveys." }
    ],
    bullets: [
      "Independently scoped, built, tested, and deployed a Python job-matching platform connecting workers across 8 rural Indian communities with local employers.",
      "Built a ranking algorithm sorting matches by occupation, rating, and availability; debugged edge cases across inconsistent rural employer data.",
      "A/B tested review format after low adoption; simplified to numeric rating, driving 20% lift in job placements in 3 months via NGO-tracked surveys."
    ],
    links: [{ label: "View code in Projects section", url: "index.html#projects" }]
  },
  {
    id: "sthirta",
    logo: "assets/experience/sthirta-logo.png",
    role: "Founder",
    org: "Sthirta Thrift Store",
    location: "Hyderabad, India",
    dates: "Nov 2020 – Feb 2024",
    tags: ["Google Analytics", "Instagram", "MS Excel"],
    stats: [
      { value: "$12K", label: "Revenue generated" },
      { value: "10", label: "Collections launched" },
      { value: "5.8K+", label: "Views per post" },
      { value: "20%", label: "Growth rate" }
    ],
    highlights: [
      { icon: "🚀", title: "Started from zero", description: "Founded Sthirta, a non-profit thrift store on Instagram and Shopify, at 16 — zero budget, zero team, zero playbook — donating 100% of profits to rotating NGO causes." },
      { icon: "🛍️", title: "Owned the full lifecycle", description: "Generated $12K in revenue across 10 drops at 20% growth; used Shopify, Excel, and Google Analytics to track SKU-level engagement, forecast demand, and optimize assortment drop-over-drop." },
      { icon: "💰", title: "Generated real growth", description: "Drove a 10% higher conversion rate and 5.8K+ average views per post by analyzing SKU-level performance and refining GTM sequencing each drop." },
      { icon: "📣", title: "Turned customers into ambassadors", description: "Designed a zero-budget sticker campaign that turned customers into organic brand ambassadors, compounding word-of-mouth growth without paid ads." }
    ],
    bullets: [
      "Founded Sthirta, a non-profit thrift store on Instagram and Shopify donating 100% of profits to rotating NGO causes — hot meals for daily wage workers, vocational training for women, and school supplies for children.",
      "Generated $12K in revenue across 10 drops at 20% growth; used Shopify, Excel, and Google Analytics to track SKU-level engagement, forecast demand, and optimize assortment decisions drop-over-drop.",
      "Drove 10% higher conversion rate and 5.8K+ average views per post by analyzing SKU-level performance and refining GTM sequencing each drop.",
      "Designed a zero-budget sticker campaign that turned customers into organic brand ambassadors, compounding word-of-mouth growth without paid ads."
    ],
    links: []
  },
  {
    id: "digital-delane",
    logo: "assets/experience/digital-delane-logo.png",
    role: "Social Media Manager",
    org: "Digital Delane",
    location: "Los Angeles, CA — Remote",
    dates: "Feb 2023 – Oct 2023",
    tags: ["Amplitude", "TikTok", "Instagram"],
    stats: [
      { value: "36%", label: "Engagement lift across 6 creators" },
      { value: "20%", label: "Brand awareness increase" },
      { value: "30%", label: "Content performance improvement" },
      { value: "20%", label: "Brand reach expansion" }
    ],
    highlights: [
      { icon: "🎥", title: "Produced creator content", description: "Produced short-form videos, creator content, and influencer campaigns for 6 Fordham University influencers across TikTok and Instagram." },
      { icon: "📊", title: "Let the data steer the strategy", description: "Analyzed audience behavior and campaign metrics in Amplitude, iterating on creative strategy, messaging, and formats for a 30% lift in content performance." },
      { icon: "🤝", title: "Built the partnerships", description: "Built and managed creator partnerships, coordinating content production and optimizing campaign execution based on engagement insights." }
    ],
    bullets: [
      "Increased social media engagement for 6 influencers at Fordham University by 36% and brand awareness by 20% by producing short-form videos, creator content, and influencer campaigns across TikTok and Instagram.",
      "Improved content performance by 30% by analyzing audience behavior and campaign metrics on Amplitude, and iterating on creative strategy, messaging, and content formats.",
      "Expanded brand reach by 20% by building and managing creator partnerships, coordinating content production, and optimizing campaign execution based on engagement insights."
    ],
    links: []
  },
  {
    id: "blumetra-ba",
    logo: "assets/experience/blumetra-logo.png",
    role: "Business Analyst",
    org: "Blumetra Solutions",
    location: "Pleasanton, CA",
    dates: "May 2023 – Aug 2023",
    tags: ["SQL", "Tableau", "Figma"],
    stats: [
      { value: "20+", label: "User interviews conducted" },
      { value: "6", label: "Tableau dashboards built" },
      { value: "8", label: "Senior leadership presented to" }
    ],
    highlights: [
      { icon: "🎨", title: "Designed the UX", description: "Conducted 20+ user interviews for PixelPal, a photographer networking prototype; synthesized findings into Figma user flows that earned C-suite approval as the product prototype direction." },
      { icon: "📊", title: "Built the dashboards", description: "Applied SQL and Tableau to transform raw data into dynamic dashboards supporting data-driven product decisions." },
      { icon: "🎤", title: "Pitched leadership", description: "Presented the pitch deck to senior leadership, iteratively refining product direction based on executive feedback." }
    ],
    bullets: [
      "Conducted 20+ user interviews for PixelPal, a photographer networking prototype; synthesized findings into Figma user flows that earned C-suite approval as the product prototype direction.",
      "Applied SQL and Tableau to transform raw data into dynamic dashboards supporting data-driven product decisions.",
      "Presented pitch deck to senior leadership; iteratively refined product direction based on executive feedback."
    ],
    links: []
  }
];
