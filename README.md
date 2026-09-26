# yetmgetaredahegn.github.io

Portfolio site for Yetmgeta Redahegn, AI & Automation Engineer.

Next.js (App Router) + TypeScript + Tailwind CSS, exported as a fully static site. There is no backend: no API routes, no server actions, no forms.

## Run it locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

To check the production build the way GitHub Pages will serve it:

```bash
npm run build      # writes the static site to out/
npx serve out      # any static file server works
```

Before pushing, run `npm run lint` and `npm run build`. CI runs both and stops the deploy if either fails.

## Edit the content

All text lives in **`src/content/site.ts`**. Components only read from it, so you can change copy without touching any component.

| To change | Edit in `site.ts` |
|---|---|
| Hero headline, sub-line, tech line, buttons | `hero` |
| The `rag_pipeline.run()` card | `pipeline` |
| The four proof items under the hero | `proof` |
| Services | `services` |
| Case studies (home cards and `/work/<slug>/` pages) | `caseStudies` |
| Experience, education | `experience`, `education` |
| EBS TV section | `media` (the image is `public/ebs.jpg`) |
| Process steps, contact copy | `process`, `contact` |
| Title, meta description, social image | `seo` |

Notes:

- **Case studies are data.** Adding an entry to `caseStudies` adds a card on the home page and a page at `/work/<slug>/`. The next build generates it and adds it to the sitemap. Set `featured: true` on the one to show first and larger.
- **Architecture diagrams** come from each case study's `architecture` array. Each entry is one row of nodes with an optional `label`. Mark evaluation, judge or verification steps with `pass: true` to show them in green. Diagrams run left to right when there's room and stack vertically when there isn't, so long labels never cause horizontal scrolling.
- **Code links:** add `codeUrl` to a case study to show a "View code" link. `privateRepo: true` shows the "Private client repository" badge instead.
- Wrap text in backticks (`` `like this` ``) in any content string to render it as inline code.
- Status chips accept `"Ongoing"` or `"Delivered"`.

The social preview image is `public/og.png` (1200×630). The favicon files are `src/app/icon.svg`, `src/app/favicon.ico` and `src/app/apple-icon.png`.

## Deploy

Pushing to `main` (or `master`) runs `.github/workflows/deploy.yml`. It lints, builds, and publishes `out/` to GitHub Pages.

One-time setup:

1. Create a public repo named **`yetmgetaredahegn.github.io`** and push this project to it.
2. In the repo, go to **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**.
3. Push, or run the workflow manually from the **Actions** tab. The site goes live at https://yetmgetaredahegn.github.io.

**Using a different repo name** (for example `portfolio`): the site is then served from `/portfolio`, so

1. set `basePath: "/portfolio"` in `next.config.ts`;
2. set `url` in `src/content/site.ts` to `https://yetmgetaredahegn.github.io/portfolio`;
3. prefix the image paths in `site.ts` (`seo.ogImage`, `media.image.src`) with `/portfolio`.

`public/.nojekyll` stops GitHub Pages from ignoring the `_next/` folder.

**Deploy through the workflow, not a local Windows build.** Next.js 16.3 writes the router's prefetch files (`__next.*.txt`) into nested folders when you build on Windows, so each link prefetch logs a 404 in the browser console. Navigation still works, but the console fills with errors. The workflow builds on Linux, which writes the files correctly.
