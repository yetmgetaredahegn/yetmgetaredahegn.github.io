# Portfolio brief: Yetmgeta Redahegn (Tey)

This file is the full specification for my portfolio website. Build exactly what it describes.

**Ground rules**
- Use ONLY the facts in this file. Do not invent clients, metrics, testimonials, logos, star counts or dates. If you need something that isn't here, ask me or leave a clearly marked `TODO` in the content file and list it at the end.
- The only numbers allowed on the site are the ones written in this brief.
- Lines that start with `OWNER NOTE:` are notes for me. Never render them.

---

## 1. Tech stack and constraints

- **Next.js (latest, App Router) + TypeScript + Tailwind CSS.**
- **Frontend only.** No backend, no API routes, no server actions, no database, no contact-form server.
- Static export: `output: "export"`, `images: { unoptimized: true }`, `trailingSlash: true`.
- Framer Motion for a few small, deliberate animations only. Everything must be visible at rest (no content hidden until scroll), and all motion must respect `prefers-reduced-motion`.
- Fonts with `next/font/google`: **Bricolage Grotesque** (display), **IBM Plex Sans** (body), **IBM Plex Mono** (labels, chips, diagrams).
- **All content lives in one typed file**, `src/content/site.ts`, so I can edit text without touching components. Case studies are data-driven from that file.
- Routes:
  - `/`: the one-page home
  - `/work/[slug]/`: one case-study page per project (3 total), generated with `generateStaticParams`
  - a custom 404 page
- Suggested components: `Nav`, `ThemeToggle`, `Hero`, `PipelineCard`, `ProofStrip`, `Services`, `ProjectCard`, `ArchitectureDiagram`, `Experience`, `Media`, `Process`, `Contact`, `Footer`, `CaseStudyLayout`.

---

## 2. Design direction

**Positioning:** "AI & Automation Engineer". The site should feel like a serious engineer's site, not a template: calm, precise, confident.

**Color tokens.** Define these as CSS variables and use them through Tailwind. Support light and dark: follow the system setting by default, with a toggle that overrides it.

| Token | Light | Dark |
|---|---|---|
| bg | `#EDF1F4` | `#0C141B` |
| surface | `#FFFFFF` | `#131E28` |
| ink (text) | `#0F1B26` | `#E6EDF3` |
| muted | `#52616D` | `#93A3B0` |
| line (borders) | `#D2DBE2` | `#243441` |
| accent | `#2246D6` | `#7E9BFF` |
| accent-soft | `#E2E8FC` | `#1B2A4F` |
| pass (evaluation/success only) | `#17804F` | `#5CCB93` |
| pass-soft | `#DDF2E7` | `#14342A` |

**Signature element: architecture diagrams.** Every project shows how data flows through the system as a row of labelled nodes joined by arrows, rendered from data (an `ArchitectureDiagram` component that takes a `nodes` array). Any evaluation, judge or verification step is highlighted in the green "pass" color. On desktop the diagram runs left to right; on phones it stacks vertically. It must never cause horizontal page scroll.

**Hero card.** Next to the hero text, a small card styled like a code/trace panel titled `rag_pipeline.run()` with a green chip `judge: grounded`. It lists 5 steps: Ingest your documents → Index & retrieve → Generate the answer → Serve it to users → **Score every answer (LLM-as-judge)**. The last step is highlighted green. Caption: "Step 5 is the one most builders skip. I build it in from the start."

**Avoid:** purple/blue gradient heroes, emoji icons, centering everything, identical rounded-and-shadowed cards everywhere, stock illustrations, fake stats, and the look of a generic AI template.

**Quality bar:**
- Fully responsive. It must look great at 390px phone width with no horizontal scroll.
- Accessible: semantic HTML, visible focus states, alt text, good contrast in both themes.
- Lighthouse 95+ on performance, accessibility, best practices and SEO.

---

## 3. Identity and links

- **Name:** Yetmgeta Redahegn (goes by Tey)
- **Title:** AI & Automation Engineer
- **Location:** Addis Ababa, Ethiopia (UTC+3). Full overlap with Europe, morning overlap with the US.
- **Email:** yetmgeta.tech@gmail.com. Show it as selectable text with a "Copy email" button; there's no form.
- **Upwork:** https://www.upwork.com/freelancers/~015f0e11537b6ecc3a
- **LinkedIn:** https://www.linkedin.com/in/yetmgeta-redahegn/
- **GitHub:** https://github.com/yetmgetaredahegn

---

## 4. Home page sections (in order)

### 4.1 Hero
- Eyebrow: `AI & Automation Engineer · Ethiopia (UTC+3)`
- Headline: **"I build AI that works in production, and I measure it."**
- Sub: "RAG chatbots, AI agents and business automations, built end to end and tested the way AI labs test their models."
- Tech line (mono): Python · LangChain · LangGraph · LlamaIndex · n8n · FastAPI · Django · Next.js
- Buttons: **Hire me on Upwork** (primary) and **See my work** (scrolls to Work)
- Right side: the `PipelineCard` described in section 2.

### 4.2 Proof strip (4 items)
1. **AfterQuery**: Software engineer at a Y Combinator-backed AI research lab
2. **Offshore clients**: Production AI systems for international businesses
3. **Featured on EBS TV**: Business process outsourcing segment
4. **Multilingual AI**: Agents that work in English, Amharic, German and more

### 4.3 Services (6)
Each service gets a one-line description and tech chips.
1. **RAG chatbots & knowledge assistants**: accurate, grounded answers from your docs, PDFs, websites or database. *(LlamaIndex, LangChain, Vector DB)*
2. **AI agents**: multi-step agents that take in voice, photos and documents, fill in structured forms, review and score submissions, and act across your tools, in several languages. *(LangChain, LangGraph, OpenAI, Gemini)*
3. **Business automation**: n8n workflows with scraping, databases, email and calendars, with retries, de-duplication and run logging built in. *(n8n, Playwright, PostgreSQL, Gmail, Google Calendar)*
4. **Full-stack AI products**: backends that serve your models and agents, with a clean frontend and background jobs. *(FastAPI, Django REST, Next.js, Celery, Redis)*
5. **AI evaluation & QA**: test suites and scoring pipelines that show whether your LLM feature is actually getting better. *(LLM-as-judge, benchmarks, Python)*
6. **Production-ready delivery**: Dockerized services, versioned database migrations and runbooks, so your team can run what I build. *(Docker, PostgreSQL, docs)*

### 4.4 Selected work
Three project cards. Each shows its context line, title, one-liner, a compact version of its architecture diagram, stack chips, and a "Read the case study →" link to `/work/[slug]/`. The first card is featured (larger, accent border). Full content is in section 5.

### 4.5 Experience
**Don't show dates.** Use a status chip instead (`Ongoing` or `Delivered`).

- **AfterQuery**, Software Engineer, AI Evaluation & Benchmark Engineering (Contract) · `Ongoing`
  A Y Combinator-backed AI research lab. Work on Projects Silver, Pluto and Fenrir across two tracks: AI Model Evaluation & Benchmark Engineering, and Full-Stack Software Engineering (Testing & Evaluation).
  - Author SWE-bench-style coding benchmark tasks: real bugs grounded in a repository's base commit, with machine-verifiable test harnesses (null/oracle-gated) and reference solutions.
  - Work on C++/Rust systems and memory-safety benchmarks (Project Fenrir).
  - Review instructions and rubrics against strict evaluation criteria (leakage, ambiguity, verifier strength, reproducibility) to keep AI training data reliable.
  - Document findings, failure modes and reproduction steps as structured, specific feedback.
  - Delivered accepted benchmark tasks across multiple repositories, earning per-task and per-repository bonuses.
- **AfriDev (Upwork agency)**, Backend & AI Engineer (Freelance Contract) · `Ongoing`
  Built Aquinas, a RAG AI tutor, for an offshore client. Links to the Aquinas case study.
- **Blih Marketing and Communication PLC**, AI Automation Engineer (Client Project) · `Delivered`
  Built the tender intelligence automation. Links to the Blih case study.
- **Education:** Software Engineering, Adama Science and Technology University · ALX ProDev Backend graduate

### 4.6 In the media
- Image: `public/ebs.jpg`, with alt text "Yetmgeta Redahegn interviewed on EBS TV in a segment on business process outsourcing".
- Heading: **Featured on EBS TV**
- Text: "Interviewed on EBS TV (Ethiopia) in a segment on business process outsourcing, as an Ethiopian engineer who works remotely for offshore businesses."

### 4.7 How we'll work (4 steps)
1. **Share your idea**: a rough description is enough.
2. **Get a plan**: I reply with a clear plan, timeline and quote.
3. **See it early**: a working first milestone arrives early, so you can check direction.
4. **Clean handover**: documented code, a setup guide, and support after delivery.

### 4.8 Contact
- Heading: **"Have something to build?"**
- Text: "Tell me what you want automated or which AI feature you need, and I'll reply with a concrete plan."
- Email with a copy button, plus Upwork (primary), LinkedIn and GitHub buttons.

---

## 5. Case studies (`/work/[slug]/`)

Every case-study page uses this layout:
1. Header: context line, title, one-liner, role, status chip, stack chips
2. **The problem**
3. **What I built**
4. **Architecture**: the full `ArchitectureDiagram`
5. **Engineering highlights**
6. **Results & verification** (only where facts are given below)
7. A contact call to action at the bottom, and "Next project" navigation

---

### 5.1 `sequa-funding-agent`

- **Context:** Built for sequa
- **Title:** Agentic Funding-Application Assistant
- **One-liner:** Turns a small-business owner's spoken story, phone photos and paper licence into a complete, honest funding application, and helps reviewers produce a ranked shortlist they can defend.
- **Role:** AI Engineer (no status chip on this one)
- **Stack:** LangChain, FastAPI, Next.js, LLMs, multilingual (English, Amharic, German and more)

**The problem**
Funding for small Ethiopian businesses exists, but the application doesn't fit the people it's meant for. It asks eighteen sub-questions: five years of sales and employment split by gender and age, a management table, an organogram, a machinery list and fifteen declarations. A 100-point grid then scores it on nine weighted criteria, with three exclusion factors that end an application on the spot. A workshop owner with a feature phone can't do that alone, so she stays out. On the other side, a reviewer scores each batch by hand.

OWNER NOTE: Tey, delete any bullet below that you didn't ship before running this.

**What I built**
- **Applicant path:** an intake agent that sits between someone who talks and a system that needs structured records. It takes a spoken story plus photos of the business licence and the workshop, and fills in the application form and a project draft (title, location, SDGs, funding target in ETB, beneficiaries, milestones, sector).
- **Honest by design:** every field that isn't established goes on a gap list (what's missing, what it needs, and from whom) instead of being guessed.
- **Declarations:** explained to the applicant in her own language, with a record that she understood. The agent never ticks a declaration on her behalf.
- **Eligibility and scoring:** runs the eligibility gate and the weighted grid, gives reasoning for each criterion, and names any exclusion factors.
- **Reviewer path:** takes a batch of applications, routes each to the right grid variant, scores it, and returns a ranked shortlist. Each company gets a justification paragraph, open questions for a site visit, and a list of self-contradictions (for example, a licence date that conflicts with the years in operation, or ownership percentages that don't add up).
- **Multilingual:** works in English, Amharic, German and other languages.

**Architecture (nodes)**
Voice note + photos → Intake agent (LangChain) → Structured application + project draft → Eligibility gate & weighted grid → Gap list & declarations → Reviewer agent → Ranked shortlist *(green: the eligibility/scoring and reviewer steps)*

**Engineering highlights**
- Agentic design with separate applicant and reviewer paths over one shared application schema
- Unverified fields are flagged, never guessed
- Per-criterion reasoning, so every score can be explained and defended

---

### 5.2 `aquinas-ai-tutor`

- **Context:** Client project via AfriDev (Upwork agency) · private repository
- **Title:** Aquinas: Scholastic AI Tutor
- **One-liner:** An end-to-end RAG tutoring platform grounded in Catholic scholastic philosophy, with answer quality measured before release.
- **Role:** Backend & AI Engineer · **Status:** Delivered
- **Stack:** Next.js, Django REST Framework, LlamaIndex, Celery, Redis, Docker, LLM-as-judge

**The problem**
The client needed a tutor whose answers stay grounded in scholastic philosophy sources instead of an LLM's general knowledge, delivered as a production-ready platform under a strict deadline.

**What I built**
- A Retrieval-Augmented Generation (RAG) pipeline with LlamaIndex over the source material
- A Next.js frontend on a modular Django REST Framework backend
- Asynchronous background processing with Celery and a Redis broker, plus Redis caching for queries and responses
- An LLM-as-judge evaluation pipeline to score answer quality before release
- Every service Dockerized for production deployment

**Architecture (nodes)**
Request path: Learner (Next.js) → Django REST API → Redis cache → Celery worker → LlamaIndex retrieval → LLM answer
Evaluation loop *(green)*: Test questions → RAG pipeline → LLM judge → Quality scores

**Engineering highlights**
- Heavy work runs in background jobs, so the API stays responsive
- Caching repeated queries cuts latency and LLM cost
- Quality is measured with an LLM judge instead of being eyeballed

Show a "Private client repository" badge. **Do not link any code.**

---

### 5.3 `blih-tender-automation`

- **Context:** Client project · Blih Marketing and Communication PLC
- **Title:** AI Tender Intelligence Automation
- **One-liner:** Replaced a team's manual tender research with a pipeline that fetches, enriches, qualifies and schedules tenders automatically.
- **Role:** AI Automation Engineer · **Status:** Delivered
- **Stack:** n8n, PostgreSQL, Node.js, TypeScript, Playwright, Docker Compose, LLM qualification, Google Calendar API, Gmail API

**The problem**
Blih is both a marketing/communications agency and a software development and IT outsourcing company, and its team was finding and screening tenders by hand. The first automated version judged tenders on their titles alone. The portal's list endpoint returned empty descriptions for all 197 tenders, so:
- the keyword prefilter dropped relevant tenders with generic titles (like "Procurement of Consultancy Services") before the AI ever saw them;
- the AI's calls were brittle: two copies of the same tender, differing only by one capital letter, got opposite verdicts;
- 32 of the 197 tenders (about 16%) were near-duplicates, which wasted AI calls and caused those inconsistent verdicts.

**What I built**
- **Playwright fetcher service (Node.js/TypeScript):** logs in to the tender portal, saves and reuses the browser session, and logs in again when authentication expires. It parses the portal's JSON/HTML payloads, normalizes tenders and removes duplicates by source ID. The internal endpoints (`/health`, `/session-status`, `/fetch-tenders`) are protected with a shared secret.
- **Description enrichment:** fetches each tender's detail page, 5 at a time with a 15-second timeout, and converts the HTML to clean text. It fails soft: one bad page never breaks the run.
- **n8n workflow (32 nodes):** fetch → upsert into PostgreSQL (never wiping a stored description) → fail-open prefilter → de-duplicate to one representative per normalized title → LLM qualification → propagate the verdict to duplicates → Google Calendar deadline events → Gmail summary → run logging.
- **Fail-open prefilter:** keeps anything with a marketing/communications or software/IT/outsourcing angle and only drops clear non-fits.
- **AI as the authoritative filter:** the LLM judges each tender on its described scope of work against Blih's two service lines, and gives a firm qualified/rejected call unless the case is genuinely ambiguous. Temperature 0, and the model can be swapped with one environment variable.
- **Privacy:** the model only receives compact tender data (title, description, client, deadline, URL), never cookies, auth data or raw HTML.
- **Idempotent side effects:** calendar events are created only once per tender, and every workflow run is recorded.
- **PostgreSQL** schema with 4 ordered migrations (tenders, qualifications, calendar events, workflow runs), reusable SQL snippets, and an operations runbook.

**Architecture (nodes)**
Tender portal → Playwright fetcher → n8n → PostgreSQL → Prefilter → De-duplicate → LLM qualification *(green)* → Verdict propagation → Google Calendar + Gmail

**Results & verification**
- Live smoke test: 15 of 15 fetched tenders received real, HTML-stripped descriptions
- Verdict propagation dry-run against a real duplicate pair in a rolled-back database transaction
- Workflow JSON and wiring validated, and the new and changed SQL queries syntax-checked

Don't link any code (private client work), and don't name the tender portal.

---

## 6. GitHub links

I'm logged in to the GitHub CLI. Run `gh repo list yetmgetaredahegn --limit 100 --json name,description,isPrivate,url` and show me which public repos might match the projects. Only add a "View code" link after I confirm. **Never link Aquinas or Blih**: they are private client work.

---

## 7. SEO and metadata

- Title: "Yetmgeta Redahegn · AI & Automation Engineer"
- Meta description: "AI & Automation Engineer building RAG chatbots, AI agents and n8n automations with LangChain, LlamaIndex, FastAPI, Django and Next.js."
- Open Graph and Twitter cards with a 1200×630 image (a static image in `public/` is fine), a favicon, `sitemap.xml` and `robots.txt`.
- Each case study gets its own title and description.

---

## 8. When you're done

1. Run `npm run build` and `npm run lint`, and fix every error and warning.
2. Check the site at 390px and 1280px wide, in both themes. There must be no horizontal scroll, and every diagram must be readable on a phone.
3. Add `public/.nojekyll` and a GitHub Actions workflow that deploys the static export to GitHub Pages. The target repo is **yetmgetaredahegn.github.io**, so no `basePath` is needed. If I use a different repo name, set `basePath` to match.
4. Write a short README covering how to run it locally, how to edit content in `src/content/site.ts`, and how to deploy.
5. List any `TODO`s or open questions.
