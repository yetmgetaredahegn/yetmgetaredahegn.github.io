// All site copy lives in this file. Edit text here; components only read it.
// Inline `backticks` in any string are rendered as code.

export type LinkItem = { label: string; href: string };

export type Status = "Ongoing" | "Delivered";

/** One box in an architecture diagram. `pass: true` marks it as an AI evaluation / decision step (shown in green). */
export type DiagramNode = { label: string; pass?: boolean };

/**
 * One row of an architecture diagram. Use several for systems with more than one path.
 * `pass: true` marks the whole row as the AI evaluation / decision step: its nodes are
 * shown in green and the row's label carries the marker, instead of each node.
 */
export type Diagram = { label?: string; pass?: boolean; nodes: DiagramNode[] };

/** A bullet with an optional bold lead-in, e.g. `{ lead: "Privacy", text: "..." }`. */
export type Point = { lead?: string; text: string };

export type ProofItem = { title: string; detail: string };

export type Service = { title: string; description: string; tech: string[] };

export type CaseStudy = {
  slug: string;
  /** Short name for the hero tabs, e.g. "Blih". */
  short: string;
  /** Small label above the title: who it was for. */
  context: string;
  title: string;
  oneLiner: string;
  role: string;
  /** Leave out to hide the status chip. */
  status?: Status;
  stack: string[];
  /** Shows a "Private client repository" badge. */
  privateRepo?: boolean;
  /** Public repository URL. Leave out to hide the "View code" link. */
  codeUrl?: string;
  /** The featured project is shown first, larger, with an accent border. */
  featured?: boolean;
  problem: { paragraphs: string[]; bullets?: string[] };
  built: Point[];
  architecture: Diagram[];
  highlights: string[];
  /** Only include facts that were actually verified. Leave out to hide the section. */
  results?: string[];
};

export type ExperienceItem = {
  org: string;
  role: string;
  /** Contract type, shown next to the role. */
  kind: string;
  status: Status;
  summary: string;
  points?: string[];
  /** Slug of a case study to link to. */
  caseStudy?: string;
};

export type ProcessStep = { title: string; detail: string };

const links = {
  upwork: "https://www.upwork.com/freelancers/~015f0e11537b6ecc3a",
  linkedin: "https://www.linkedin.com/in/yetmgeta-redahegn/",
  github: "https://github.com/yetmgetaredahegn",
};

export const site = {
  name: "Yetmgeta Redahegn",
  nickname: "Tey",
  role: "AI & Automation Engineer",
  /** Production URL, used for canonical links, Open Graph and the sitemap. No trailing slash. */
  url: "https://yetmgetaredahegn.github.io",
  email: "yetmgeta.tech@gmail.com",
  location: "Addis Ababa, Ethiopia",
  availability: "Addis Ababa, Ethiopia (UTC+3). Full overlap with Europe, morning overlap with the US.",
  links,

  seo: {
    title: "Yetmgeta Redahegn · AI & Automation Engineer",
    description:
      "AI & Automation Engineer building RAG chatbots, AI agents and n8n automations with LangChain, LlamaIndex, FastAPI, Django and Next.js.",
    /** Social preview image in /public, 1200×630. */
    ogImage: "/og.png",
    ogImageAlt:
      "Yetmgeta Redahegn, AI & Automation Engineer: I build AI that works in production, and I measure it.",
  },

  /** Wording for green (pass) steps in architecture diagrams. */
  diagram: {
    passLabel: "AI evaluation / decision step",
    legend: "Green marks an AI evaluation / decision step.",
  },

  nav: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/#work" },
    { label: "Experience", href: "/#experience" },
    { label: "Process", href: "/#process" },
    { label: "Contact", href: "/#contact" },
  ] satisfies LinkItem[],

  hero: {
    eyebrow: "AI & Automation Engineer · Addis Ababa, Ethiopia (UTC+3)",
    headline: "I build AI that works in production, and I measure it.",
    /** Part of the headline underlined in green. Must appear in `headline`. */
    headlineEmphasis: "I measure it",
    /**
     * Small animated illustrations placed right after these words in the headline
     * (decorative, hidden from screen readers). Delete an entry to drop its glyph.
     */
    headlineGlyphs: { pipeline: "production," },
    sub: "RAG chatbots, AI agents and business automations, built end to end and tested the way AI labs test their models.",
    tech: ["Python", "LangChain", "LangGraph", "LlamaIndex", "n8n", "FastAPI", "Django", "Next.js"],
    primaryCta: { label: "Hire me on Upwork", href: links.upwork },
    secondaryCta: { label: "See my work", href: "#work" },
    /** The tabbed panel next to the hero text: the RAG pipeline first, then each case study. */
    showcase: {
      label: "System traces",
      pause: "Pause rotation",
      play: "Play rotation",
      caseStudyLink: "Read the case study",
    },
  },

  pipeline: {
    tab: "RAG pipeline",
    title: "rag_pipeline.run()",
    chip: "judge: grounded",
    steps: [
      { label: "Ingest your documents" },
      { label: "Index & retrieve" },
      { label: "Generate the answer" },
      { label: "Serve it to users" },
      { label: "Score every answer (LLM-as-judge)", pass: true },
    ] satisfies DiagramNode[],
    caption: "Step 5 is the one most builders skip. I build it in from the start.",
  },

  proof: [
    {
      title: "AfterQuery",
      detail: "Software engineer at a Y Combinator-backed AI research lab",
    },
    { title: "4 client organizations", detail: "sequa · AfriDev · Blih · AfterQuery" },
    { title: "Featured on EBS TV", detail: "Business process outsourcing segment" },
    {
      title: "Multilingual AI",
      detail: "Agents that work in English, Amharic, German and more",
    },
  ] satisfies ProofItem[],

  sections: {
    services: { id: "services", label: "Services", title: "What I build" },
    work: { id: "work", label: "Work", title: "Selected work" },
    experience: { id: "experience", label: "Experience", title: "Experience & education" },
    media: { id: "media", label: "Media", title: "In the media" },
    process: { id: "process", label: "Process", title: "How we'll work" },
    contact: { id: "contact", label: "Contact", title: "Have something to build?" },
  },

  services: [
    {
      title: "RAG chatbots & knowledge assistants",
      description: "Accurate, grounded answers from your docs, PDFs, websites or database.",
      tech: ["LlamaIndex", "LangChain", "Vector DB"],
    },
    {
      title: "AI agents",
      description:
        "Multi-step agents that take in voice, photos and documents, fill in structured forms, review and score submissions, and act across your tools, in several languages.",
      tech: ["LangChain", "LangGraph", "OpenAI", "Gemini"],
    },
    {
      title: "Business automation",
      description:
        "n8n workflows with scraping, databases, email and calendars, with retries, de-duplication and run logging built in.",
      tech: ["n8n", "Playwright", "PostgreSQL", "Gmail", "Google Calendar"],
    },
    {
      title: "Full-stack AI products",
      description:
        "Backends that serve your models and agents, with a clean frontend and background jobs.",
      tech: ["FastAPI", "Django REST", "Next.js", "Celery", "Redis"],
    },
    {
      title: "AI evaluation & QA",
      description:
        "Test suites and scoring pipelines that show whether your LLM feature is actually getting better.",
      tech: ["LLM-as-judge", "Benchmarks", "Python"],
    },
    {
      title: "Production-ready delivery",
      description:
        "Dockerized services, versioned database migrations and runbooks, so your team can run what I build.",
      tech: ["Docker", "PostgreSQL", "Docs"],
    },
  ] satisfies Service[],

  caseStudies: [
    {
      slug: "sequa-funding-agent",
      short: "sequa",
      featured: true,
      context: "Built for sequa",
      title: "Agentic Funding-Application Assistant",
      oneLiner:
        "Turns a small-business owner's spoken story, phone photos and paper licence into a complete, honest funding application, and helps reviewers produce a ranked shortlist they can defend.",
      role: "AI Engineer",
      status: "Delivered",
      stack: ["LangChain", "FastAPI", "Next.js", "LLMs", "Multilingual"],
      problem: {
        paragraphs: [
          "Funding for small Ethiopian businesses exists, but the application doesn't fit the people it's meant for. It asks eighteen sub-questions: five years of sales and employment split by gender and age, a management table, an organogram, a machinery list and fifteen declarations. A 100-point grid then scores it on nine weighted criteria, with three exclusion factors that end an application on the spot.",
          "A workshop owner with a feature phone can't do that alone, so she stays out. On the other side, a reviewer scores each batch by hand.",
        ],
      },
      built: [
        {
          lead: "Applicant path",
          text: "An intake agent that sits between someone who talks and a system that needs structured records. It takes a spoken story plus photos of the business licence and the workshop, and fills in the application form and a project draft (title, location, SDGs, funding target in ETB, beneficiaries, milestones, sector).",
        },
        {
          lead: "Honest by design",
          text: "Every field that isn't established goes on a gap list (what's missing, what it needs, and from whom) instead of being guessed.",
        },
        {
          lead: "Declarations",
          text: "Explained to the applicant in her own language, with a record that she understood. The agent never ticks a declaration on her behalf.",
        },
        {
          lead: "Eligibility and scoring",
          text: "Runs the eligibility gate and the weighted grid, gives reasoning for each criterion, and names any exclusion factors.",
        },
        {
          lead: "Reviewer path",
          text: "Takes a batch of applications, routes each to the right grid variant, scores it, and returns a ranked shortlist. Each company gets a justification paragraph, open questions for a site visit, and a list of self-contradictions (for example, a licence date that conflicts with the years in operation, or ownership percentages that don't add up).",
        },
        {
          lead: "Multilingual",
          text: "Works in English, Amharic, German and other languages.",
        },
      ],
      architecture: [
        {
          nodes: [
            { label: "Voice note + photos" },
            { label: "Intake agent (LangChain)" },
            { label: "Structured application + project draft" },
            { label: "Eligibility gate & weighted grid", pass: true },
            { label: "Gap list & declarations" },
            { label: "Reviewer agent", pass: true },
            { label: "Ranked shortlist" },
          ],
        },
      ],
      highlights: [
        "Agentic design with separate applicant and reviewer paths over one shared application schema",
        "Unverified fields are flagged, never guessed",
        "Per-criterion reasoning, so every score can be explained and defended",
      ],
    },
    {
      slug: "aquinas-ai-tutor",
      short: "Aquinas",
      context: "Client project via AfriDev (Upwork agency) · private repository",
      title: "Aquinas: Scholastic AI Tutor",
      oneLiner:
        "An end-to-end RAG tutoring platform grounded in Catholic scholastic philosophy, with answer quality measured before release.",
      role: "Backend & AI Engineer",
      status: "Delivered",
      stack: ["Next.js", "Django REST Framework", "LlamaIndex", "Celery", "Redis", "Docker", "LLM-as-judge"],
      privateRepo: true,
      problem: {
        paragraphs: [
          "The client needed a tutor whose answers stay grounded in scholastic philosophy sources instead of an LLM's general knowledge, delivered as a production-ready platform under a strict deadline.",
        ],
      },
      built: [
        { text: "A Retrieval-Augmented Generation (RAG) pipeline with LlamaIndex over the source material" },
        { text: "A Next.js frontend on a modular Django REST Framework backend" },
        {
          text: "Asynchronous background processing with Celery and a Redis broker, plus Redis caching for queries and responses",
        },
        { text: "An LLM-as-judge evaluation pipeline to score answer quality before release" },
        { text: "Every service Dockerized for production deployment" },
      ],
      architecture: [
        {
          label: "Request path",
          nodes: [
            { label: "Learner (Next.js)" },
            { label: "Django REST API" },
            { label: "Redis cache" },
            { label: "Celery worker" },
            { label: "LlamaIndex retrieval" },
            { label: "LLM answer" },
          ],
        },
        {
          label: "Evaluation loop",
          pass: true,
          nodes: [
            { label: "Test questions" },
            { label: "RAG pipeline" },
            { label: "LLM judge" },
            { label: "Quality scores" },
          ],
        },
      ],
      highlights: [
        "Heavy work runs in background jobs, so the API stays responsive",
        "Caching repeated queries cuts latency and LLM cost",
        "Quality is measured with an LLM judge instead of being eyeballed",
      ],
    },
    {
      slug: "blih-tender-automation",
      short: "Blih",
      context: "Client project · Blih Marketing and Communication PLC",
      title: "AI Tender Intelligence Automation",
      oneLiner:
        "Replaced a team's manual tender research with a pipeline that fetches, enriches, qualifies and schedules tenders automatically.",
      role: "AI Automation Engineer",
      status: "Delivered",
      stack: [
        "n8n",
        "PostgreSQL",
        "Node.js",
        "TypeScript",
        "Playwright",
        "Docker Compose",
        "LLM qualification",
        "Google Calendar API",
        "Gmail API",
      ],
      privateRepo: true,
      problem: {
        paragraphs: [
          "Blih is both a marketing/communications agency and a software development and IT outsourcing company, and its team was finding and screening tenders by hand. The first automated version judged tenders on their titles alone. The portal's list endpoint returned empty descriptions for all 197 tenders, so:",
        ],
        bullets: [
          "the keyword prefilter dropped relevant tenders with generic titles (like \"Procurement of Consultancy Services\") before the AI ever saw them;",
          "the AI's calls were brittle: two copies of the same tender, differing only by one capital letter, got opposite verdicts;",
          "32 of the 197 tenders (about 16%) were near-duplicates, which wasted AI calls and caused those inconsistent verdicts.",
        ],
      },
      built: [
        {
          lead: "Playwright fetcher service (Node.js/TypeScript)",
          text: "Logs in to the tender portal, saves and reuses the browser session, and logs in again when authentication expires. It parses the portal's JSON/HTML payloads, normalizes tenders and removes duplicates by source ID. The internal endpoints (`/health`, `/session-status`, `/fetch-tenders`) are protected with a shared secret.",
        },
        {
          lead: "Description enrichment",
          text: "Fetches each tender's detail page, 5 at a time with a 15-second timeout, and converts the HTML to clean text. It fails soft: one bad page never breaks the run.",
        },
        {
          lead: "n8n workflow (32 nodes)",
          text: "Fetch → upsert into PostgreSQL (never wiping a stored description) → fail-open prefilter → de-duplicate to one representative per normalized title → LLM qualification → propagate the verdict to duplicates → Google Calendar deadline events → Gmail summary → run logging.",
        },
        {
          lead: "Fail-open prefilter",
          text: "Keeps anything with a marketing/communications or software/IT/outsourcing angle and only drops clear non-fits.",
        },
        {
          lead: "AI as the authoritative filter",
          text: "The LLM judges each tender on its described scope of work against Blih's two service lines, and gives a firm qualified/rejected call unless the case is genuinely ambiguous. Temperature 0, and the model can be swapped with one environment variable.",
        },
        {
          lead: "Privacy",
          text: "The model only receives compact tender data (title, description, client, deadline, URL), never cookies, auth data or raw HTML.",
        },
        {
          lead: "Idempotent side effects",
          text: "Calendar events are created only once per tender, and every workflow run is recorded.",
        },
        {
          lead: "PostgreSQL",
          text: "Schema with 4 ordered migrations (tenders, qualifications, calendar events, workflow runs), reusable SQL snippets, and an operations runbook.",
        },
      ],
      architecture: [
        {
          nodes: [
            { label: "Tender portal" },
            { label: "Playwright fetcher" },
            { label: "n8n" },
            { label: "PostgreSQL" },
            { label: "Prefilter" },
            { label: "De-duplicate" },
            { label: "LLM qualification", pass: true },
            { label: "Verdict propagation" },
            { label: "Google Calendar + Gmail" },
          ],
        },
      ],
      // TODO(Tey): the brief lists no highlights for this project. These three only restate
      // facts from "What I built"; confirm or rewrite them.
      highlights: [
        "Descriptions are enriched before the AI sees a tender, so verdicts rest on the scope of work, not the title",
        "Near-duplicates are judged once and the verdict is propagated, so duplicates get one consistent call",
        "Side effects are idempotent and every run is logged",
      ],
      results: [
        "Live smoke test: 15 of 15 fetched tenders received real, HTML-stripped descriptions",
        "Verdict propagation dry-run against a real duplicate pair in a rolled-back database transaction",
        "Workflow JSON and wiring validated, and the new and changed SQL queries syntax-checked",
      ],
    },
  ] satisfies CaseStudy[],

  experience: [
    {
      org: "AfterQuery",
      role: "Software Engineer, AI Evaluation & Benchmark Engineering",
      kind: "Contract",
      status: "Ongoing",
      summary:
        "A Y Combinator-backed AI research lab. Work on Projects Silver, Pluto and Fenrir across two tracks: AI Model Evaluation & Benchmark Engineering, and Full-Stack Software Engineering (Testing & Evaluation).",
      points: [
        "Author SWE-bench-style coding benchmark tasks: real bugs grounded in a repository's base commit, with machine-verifiable test harnesses (null/oracle-gated) and reference solutions.",
        "Work on C++/Rust systems and memory-safety benchmarks (Project Fenrir).",
        "Review instructions and rubrics against strict evaluation criteria (leakage, ambiguity, verifier strength, reproducibility) to keep AI training data reliable.",
        "Document findings, failure modes and reproduction steps as structured, specific feedback.",
        "Delivered accepted benchmark tasks across multiple repositories, earning per-task and per-repository bonuses.",
      ],
    },
    {
      org: "sequa",
      role: "AI Engineer",
      kind: "Client Project",
      status: "Delivered",
      summary: "Built an agentic funding-application assistant for small Ethiopian businesses.",
      points: [
        "Applicant agent turns a spoken story, phone photos and a paper licence into a complete, structured funding application, in English, Amharic, German and more.",
        "Unverified fields go on a gap list (what's missing, what it needs, from whom) instead of being guessed; declarations are explained in the applicant's language and never ticked for her.",
        "Reviewer agent scores each application against the funder's weighted 100-point grid with per-criterion reasoning, runs the eligibility gate and exclusion factors, flags contradictions, and returns a ranked shortlist a reviewer can defend.",
        "Stack: LangChain, FastAPI, Next.js.",
      ],
      caseStudy: "sequa-funding-agent",
    },
    {
      org: "AfriDev (Upwork agency)",
      role: "Backend & AI Engineer",
      kind: "Freelance Contract",
      status: "Delivered",
      summary:
        "Freelance contract work through AfriDev, delivering Aquinas: Scholastic AI Tutor for an offshore client (private repository).",
      points: [
        "Designed and built an end-to-end RAG tutoring platform with LlamaIndex, grounded in Catholic scholastic philosophy.",
        "Next.js frontend on a modular Django REST Framework backend.",
        "Celery with a Redis broker for background processing, plus Redis caching for queries and responses.",
        "Evaluated answer quality with an LLM-as-judge pipeline before release.",
        "Dockerized all services for production and delivered under a strict client deadline.",
      ],
      caseStudy: "aquinas-ai-tutor",
    },
    {
      org: "Blih Marketing and Communication PLC",
      role: "AI Automation Engineer",
      kind: "Client Project",
      status: "Delivered",
      summary: "Built an AI tender intelligence system that replaced the team's manual tender research.",
      points: [
        "n8n, PostgreSQL and a Node.js/TypeScript Playwright fetcher, all in Docker Compose.",
        "The fetcher logs in to the tender portal, reuses and renews its session, de-duplicates listings and enriches each tender with its full scope of work.",
        "An LLM qualifies each tender against Blih's two service lines behind a fail-open prefilter that never silently drops a plausible tender.",
        "Found about 16% of tenders were near-duplicates getting inconsistent verdicts; added de-duplication before the AI step so each group gets one call and one consistent decision.",
        "Qualified tenders become Google Calendar deadline events and a Gmail summary; every run is logged.",
      ],
      caseStudy: "blih-tender-automation",
    },
  ] satisfies ExperienceItem[],

  education: {
    degree: "Software Engineering",
    school: "Adama Science and Technology University",
    extra: "ALX ProDev Backend graduate",
  },

  media: {
    title: "Featured on EBS TV",
    text: "Interviewed on EBS TV (Ethiopia) in a segment on business process outsourcing, as an Ethiopian engineer who works remotely for offshore businesses.",
    image: {
      /** File in /public. */
      src: "/ebs.jpg",
      alt: "Yetmgeta Redahegn interviewed on EBS TV in a segment on business process outsourcing",
      width: 1100,
      height: 618,
    },
  },

  process: [
    { title: "Share your idea", detail: "A rough description is enough." },
    { title: "Get a plan", detail: "I reply with a clear plan, timeline and quote." },
    {
      title: "See it early",
      detail: "A working first milestone arrives early, so you can check direction.",
    },
    {
      title: "Clean handover",
      detail: "Documented code, a setup guide, and support after delivery.",
    },
  ] satisfies ProcessStep[],

  contact: {
    text: "Tell me what you want automated or which AI feature you need, and I'll reply with a concrete plan.",
    primary: { label: "Hire me on Upwork", href: links.upwork },
    secondary: [
      { label: "LinkedIn", href: links.linkedin },
      { label: "GitHub", href: links.github },
    ] satisfies LinkItem[],
  },
};

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return site.caseStudies.find((c) => c.slug === slug);
}

/** The case study after `slug`, wrapping around to the first. */
export function getNextCaseStudy(slug: string): CaseStudy {
  const all = site.caseStudies;
  const i = all.findIndex((c) => c.slug === slug);
  return all[(i + 1) % all.length];
}
