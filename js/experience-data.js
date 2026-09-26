// Source of truth for the Experience timeline. Admin Mode edits are
// overlaid on top of this via localStorage; use the "Export data file"
// button there to get an updated copy of this file.
//
// Each role can carry `stats` (the "AT A GLANCE" numbers) and
// `highlights` (the "WHAT I WORKED ON" cards) in addition to the plain
// `bullets`. When present, the render shows stats+highlights instead of
// the bullet list; `bullets` stays as the underlying source text and as
// a fallback for any role that doesn't have the richer fields yet.
window.EXPERIENCE_DATA = [
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
    id: "blumetra-apm",
    logo: "assets/experience/blumetra-logo.png",
    role: "Associate Product Manager",
    org: "Blumetra Solutions",
    location: "Pleasanton, CA",
    dates: "Dec 2025 – Present",
    tags: ["Replit", "Google AI Studio", "Antigravity", "Stitch AI", "Kiro"],
    stats: [
      { value: "5", label: "AI features RICE-prioritized" },
      { value: "3", label: "Sprints of backend planning" },
      { value: "1 of 4", label: "Finalists — won by Exelixis" }
    ],
    highlights: [
      { icon: "🧪", title: "Prototyped the core feature", description: "Built ClinOps Study Build on Replit for Clintelligence, automating EDC-ready study models, CRF forms, edit checks, and UAT plans directly from protocol text." },
      { icon: "📝", title: "Wrote the PRD", description: "Authored sections on autonomous protocol reasoning logic; partnered with engineering on CDISC ODM export and EDC system routing." },
      { icon: "📊", title: "Prioritized the roadmap", description: "Applied RICE prioritization across 5 AI features to define build order and sequencing." },
      { icon: "🏆", title: "Helped win the business", description: "Clintelligence beat 10 pitches to become 1 of 4 finalists, then was selected by Exelixis, a leading oncology biotech." },
      { icon: "🔁", title: "Ran the process", description: "Owned Jira stories, documented backend architecture in Confluence, and recapped progress in daily standups." }
    ],
    bullets: [
      "Prototyped ClinOps Study Build on Replit for Clintelligence, an agentic AI clinical trial SaaS — automating end-to-end generation of EDC-ready study models, CRF forms, data validation edit checks, and UAT test plans directly from protocol text.",
      "Authored PRD sections for the feature's autonomous protocol reasoning logic; partnered with engineering on backend architecture decisions covering CDISC ODM export and EDC system routing across 3 sprints.",
      "Applied RICE prioritization across 5 AI features to define build order and roadmap sequencing.",
      "Clintelligence beat 10 pitches to 4 finalists, then won selection by Exelixis, a leading oncology biotech.",
      "Owned Jira stories for the platform, collaborated with engineering on backend architecture documentation in Confluence, and recapped progress in daily standups."
    ],
    links: []
  },
  {
    id: "cure-foundation",
    role: "Product Operations Lead",
    org: "CURE Foundation",
    location: "Hyderabad, India",
    dates: "Dec 2025 – Feb 2026",
    tags: ["Tableau", "Microsoft Excel"],
    stats: [
      { value: "2,500+", label: "Attendees managed on-site" },
      { value: "700+", label: "Stakeholders coordinated" },
      { value: "4", label: "Tracking workflows built" },
      { value: "8th", label: "Edition of the championship" }
    ],
    highlights: [
      { icon: "🎤", title: "Led as the point of contact", description: "Head Intern for the 8th edition of the Cancer Crusaders Golf Championship, India's largest charity golf championship." },
      { icon: "📣", title: "Ran the press moment", description: "Anchored the official press meet and tournament inauguration alongside chief guests Jagapati Babu and Chaitanya Menon." },
      { icon: "🗂️", title: "Built the tracking systems", description: "Created 4 workflows from scratch for donor/sponsor data, registrations, and logistics — adopted as the standard for future events." },
      { icon: "🎯", title: "Ran the event floor", description: "Managed on-site operations for 2,500+ attendees, restructuring workflows in real time to maintain execution quality." }
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
    id: "stellantis",
    role: "IT Software Quality Assurance Analyst Intern",
    org: "Stellantis Financial Services",
    location: "Houston, Texas",
    dates: "Jun 2025 – Aug 2025",
    tags: ["Salesforce Sandbox", "UiPath Studio", "Copilot"],
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
    links: [{ label: "View Presentation", url: "" }]
  },
  {
    id: "louisa-ai",
    role: "Product Manager Intern",
    org: "Louisa AI",
    location: "New York, NY",
    dates: "Sep 2025 – Dec 2025",
    tags: [],
    stats: [
      { value: "18%", label: "Lift in feature engagement" },
      { value: "~20%", label: "Uptime improvement" },
      { value: "4", label: "Enterprise deployments onboarded" },
      { value: "7", label: "AI platforms benchmarked" }
    ],
    highlights: [
      { icon: "🤝", title: "Helped close an enterprise client", description: "Co-pitched Louisa's collective intelligence platform to Apollo on-site; demo feedback drove a navigation redesign that collapsed 6 tabs into 3." },
      { icon: "📈", title: "Grew engagement", description: "Drove an 18% lift in feature engagement for the AI-curated News feature by tracking MAUs and surfacing insights." },
      { icon: "🛠️", title: "Fixed what was breaking demos", description: "Partnered with engineering to resolve critical link redirect failures, improving platform uptime ~20% before demos at RBC and McKinsey." },
      { icon: "🎬", title: "Standardized onboarding", description: "Designed onboarding flows for 4 enterprise deployments using CapCut — adopted as the company standard post-internship." },
      { icon: "🔍", title: "Scoped the competition", description: "Conducted competitive analysis across 7 AI platforms to identify positioning gaps and inform the product roadmap." }
    ],
    bullets: [
      "Contributed to acquiring Apollo as an enterprise client by co-pitching Louisa's collective intelligence platform on-site, translating demo feedback into a navigation restructure that collapsed 6 tabs into Home, Explore, and My Network.",
      "Drove an 18% lift in feature engagement for the AI-curated News feature by tracking MAUs and surfacing insights that shaped product iterations.",
      "Partnered with engineering to resolve critical link redirect failures, improving platform uptime by ~20% before high-stakes demos at RBC and McKinsey.",
      "Designed onboarding flows for 4 enterprise client deployments using CapCut for custom video production — adopted as the company standard post-internship.",
      "Conducted competitive analysis across 7 AI platforms to identify positioning gaps and improvement opportunities, directly informing feature prioritization and product roadmap discussions."
    ],
    links: []
  },
  {
    id: "blumetra-apm-intern",
    logo: "assets/experience/blumetra-logo.png",
    role: "Associate Product Manager Intern",
    org: "Blumetra Solutions",
    location: "Pleasanton, California",
    dates: "May 2024 – Aug 2024",
    tags: [],
    stats: [
      { value: "20+", label: "User interviews conducted" },
      { value: "30%", label: "Cut in resolution time" }
    ],
    highlights: [
      { icon: "📄", title: "Defined the vision", description: "Wrote product vision, user stories, and KPIs for FileVantage, a no-code ETL platform, securing CPO alignment on GTM scope." },
      { icon: "✅", title: "Earned buy-in", description: "Earned C-suite approval for PixelPal UX by conducting 20+ user interviews and synthesizing findings into Figma user flows." },
      { icon: "📊", title: "Built the dashboards", description: "Built Tableau dashboards for FileSense and ran competitor analysis to identify market gaps, cutting resolution time by 30%." },
      { icon: "🗺️", title: "Aligned the team", description: "Authored problem statements, OKRs, and roadmap documentation to align cross-functional teams on MVP scope and priorities." }
    ],
    bullets: [
      "Wrote product vision, user stories, and KPIs for FileVantage, a no-code ETL platform, securing CPO alignment on GTM scope.",
      "Earned C-suite approval for PixelPal UX by conducting 20+ user interviews and synthesizing findings into Figma user flows.",
      "Built Tableau dashboards for FileSense; conducted competitor analysis to identify market gaps, cutting resolution time by 30%.",
      "Authored problem statements, OKRs, and roadmap documentation to align cross-functional teams on MVP scope and priorities."
    ],
    links: []
  },
  {
    id: "rose-trust",
    role: "Python Developer",
    org: "Rose Trust NGO",
    location: "Remote – Hyderabad, India",
    dates: "May 2024 – Aug 2024",
    tags: ["Python", "Excel"],
    stats: [
      { value: "8", label: "Rural communities connected" },
      { value: "20%", label: "Increase in job placements" },
      { value: "3", label: "Months to measurable impact" }
    ],
    highlights: [
      { icon: "🐍", title: "Built the platform", description: "Developed a Python job-matching platform connecting skilled workers across 8 rural Indian communities with local employers." },
      { icon: "🤝", title: "Shaped it with the NGO", description: "Collaborated with Rose Trust stakeholders to translate real user needs into a functional matching solution." },
      { icon: "📈", title: "Proved it worked", description: "Drove a 20% increase in job placements within 3 months; shared documentation to support ongoing adoption." }
    ],
    bullets: [
      "Built a Python job-matching platform connecting skilled workers across 8 rural Indian communities with local employers.",
      "Collaborated with NGO stakeholders to translate user needs into a functional matching solution.",
      "Drove a 20% increase in job placements within 3 months; shared documentation with Rose Trust to support ongoing adoption."
    ],
    links: [{ label: "View code in Projects section", url: "index.html#projects" }]
  },
  {
    id: "blumetra-ba",
    logo: "assets/experience/blumetra-logo.png",
    role: "Business Analyst",
    org: "Blumetra Solutions",
    location: "Pleasanton, CA",
    dates: "May 2023 – Aug 2023",
    tags: [],
    stats: [
      { value: "20+", label: "User interviews conducted" }
    ],
    highlights: [
      { icon: "🎨", title: "Designed the UX", description: "Built PixelPal's networking platform prototype from 20+ user interviews, synthesized into Figma user flows." },
      { icon: "📊", title: "Built the dashboards", description: "Applied SQL and Tableau to transform raw data into dynamic dashboards supporting data-driven product decisions." },
      { icon: "🎤", title: "Pitched leadership", description: "Presented the pitch deck to senior leadership, iteratively refining the product based on executive feedback." }
    ],
    bullets: [
      "Developed UX for PixelPal, a networking platform prototype, conducting 20+ user interviews and synthesizing findings into Figma user flows.",
      "Applied SQL and Tableau to transform raw data into dynamic dashboards supporting data-driven product decisions.",
      "Presented pitch deck to senior leadership, iteratively refining the product based on executive feedback."
    ],
    links: []
  },
  {
    id: "sthirta",
    role: "Founder",
    org: "Sthirta Thrift Store",
    location: "Hyderabad, India",
    dates: "Nov 2020 – Feb 2024",
    tags: [],
    stats: [
      { value: "$12K", label: "Revenue generated" },
      { value: "10", label: "Collections launched" },
      { value: "5.8K+", label: "Views per post" },
      { value: "20%", label: "Growth rate" }
    ],
    highlights: [
      { icon: "🚀", title: "Started from zero", description: "Built a thrift e-commerce brand from scratch at 16 with zero budget, zero team, and zero playbook — just a market gap and a Shopify store." },
      { icon: "🛍️", title: "Owned the full lifecycle", description: "Created and scaled a zero-to-one e-commerce platform on Shopify and Instagram, from market discovery through GTM execution." },
      { icon: "💰", title: "Generated real revenue", description: "Launched 10 collections generating $12K in revenue; content strategy drove 5.8K+ views per post." },
      { icon: "📈", title: "Improved the metrics", description: "Managed UX iterations and analyzed retention data to drive a 20% growth rate and 10% higher conversion." }
    ],
    bullets: [
      "Built a thrift e-commerce brand from scratch at 16 with zero budget, zero team, and zero playbook — just a market gap, a Shopify store, and an Instagram account.",
      "Created and scaled a zero-to-one e-commerce platform on Shopify and Instagram, owning the full product lifecycle from market discovery through GTM execution.",
      "Launched 10 collections generating $12K revenue; optimized content strategy driving 5.8K+ views per post.",
      "Managed UX iterations and analyzed retention data to drive a 20% growth rate and 10% higher conversion."
    ],
    links: []
  }
];
