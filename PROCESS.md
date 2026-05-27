# PROCESS.md — How to Build a Client Site From Scratch

This is the design playbook Claude follows in a new client repo. The site is **designed fresh for each client**, not cloned from a template. `CLAUDE.md` governs craft; this doc governs flow + narrative structure.

## Phase 0 — Start here

When opened in a new client folder, do this before anything else:

1. **Invoke the `frontend-design` skill.** Every session, no exceptions (`CLAUDE.md` rule).
2. **Read `intake.json`** — client name, industry, audience, phone, colors, fonts, domain.
3. **Read `brand_assets/`** — logos, photography, style guides. If real assets exist, use them. If not, use `https://placehold.co/` with the brand color until real assets arrive.
4. **Skim `CLAUDE.md`** — design rules, anti-generic guardrails, screenshot loop.

If any of `intake.json` fields are placeholders or missing, **ask the user** before designing. Don't invent phone numbers, service areas, or Web3Forms keys.

## Phase 1 — Pages to build

Every Hoffmedia client site ships with these 7 pages. Build in order:

1. `index.html` — home (StoryBrand narrative)
2. `services.html` — full service list
3. `about.html` — expanded guide narrative
4. `contact.html` — direct CTA, info cards, form
5. `estimate.html` — detailed lead-gen form (the "get started" page)
6. `thank-you.html` — post-submit confirmation
7. `privacy.html` — legal

## Phase 2 — StoryBrand structure for the home page

Donald Miller's 7-part framework. Use this **as the narrative spine** of `index.html`. The design itself is fresh — the story order is fixed.

| # | Story beat | Home page block | What it does |
|---|---|---|---|
| 1 | **Character** (a hero wants something) | Hero section | Name the audience. State their desired outcome in one headline. Primary CTA. |
| 2 | **Problem** (has a problem) | Problem section | External pain + internal frustration. 1–2 sentences, not a list. |
| 3 | **Guide** (meets a guide) | Guide / About snippet | Empathy + authority. 2–3 sentences. Include a quote or proof point. |
| 4 | **Plan** (who gives them a plan) | 3-step plan | 01 → 02 → 03. Short titles, short bodies. Must be do-able. |
| 5 | **Calls to action** | Primary + secondary CTAs | Direct ("Request Estimate") in hero + near close. Transitional ("See Services") for hesitant visitors. |
| 6 | **Success** (ends in success) | Service area / results / vision | Paint what winning looks like. Photos + location tags work well here. |
| 7 | **Failure** (helps avoid) | FAQ + final CTA | FAQ addresses objections (= friction that causes failure). Closing CTA is the last chance to act. |

**Nothing else.** No "our team" block unless the client's story genuinely hinges on it. No logo cloud unless they have real logos. No testimonial carousel unless they have real testimonials. Empty social proof is worse than none.

## Phase 3 — Visual design rules

From `CLAUDE.md`, the hard ones:

- **Colors** — use `intake.colors.primary` (never default Tailwind blue/indigo)
- **Typography** — display font for headings, body font for paragraphs; never same font for both
- **Gradients** — layered radial gradients, SVG noise filter for grain/depth
- **Shadows** — color-tinted, low-opacity, layered (not flat `shadow-md`)
- **Animations** — only `transform` and `opacity`; `cubic-bezier(0.22, 1, 0.36, 1)`; no `transition-all`
- **Images** — gradient overlay (`linear-gradient(to top, rgba(0,0,0,0.5), transparent)`) always
- **Depth** — layering system: bg → surface → surface-2 → elevated
- **States** — every clickable element gets hover, focus-visible, and active

## Phase 4 — Build loop per page

For each page:

1. **Draft** — write the HTML in one pass. Inline CSS. No build step.
2. **Serve** — `node serve.mjs` (background; start once per session).
3. **Screenshot** — `node screenshot.mjs http://localhost:3000/{page} {page}`
4. **Read the PNG** with the Read tool. Look at it.
5. **Critique against CLAUDE.md guardrails** — Is anything flat? Does the hero read clearly at 390px? Are colors right?
6. **Mobile screenshot** — `node screenshot.mjs http://localhost:3000/{page} {page}-mobile --mobile`
7. **Iterate** — edit, screenshot again. **Minimum 2 comparison rounds per page.**
8. **Stop** when no visible issues remain or user signs off.

## Phase 5 — Cross-cutting wiring

These live in the `<head>` of every page — set once, consistent everywhere:

- `<title>` — `{Page} | {SiteName}` or `{SiteName} | {Tagline}` on home
- `<meta name="description">` — unique per page, ~155 chars
- `<link rel="canonical">` — production URL per page
- Google Fonts `<link>` — matches `intake.fonts`
- Schema.org JSON-LD — on home page, include business type, phone, email, areaServed, openingHours
- Open Graph tags — if the client wants link previews

The nav + footer are shared. Design them once, paste into every page. Keep markup identical across pages so `active` states work off the current URL.

## Phase 6 — Forms (contact + estimate)

Forms use Web3Forms. The access key is in `intake.json` → `web3formsKey`. Every form needs:

```html
<form method="post" action="https://api.web3forms.com/submit">
  <input type="hidden" name="access_key" value="PLACEHOLDER-REPLACE-BEFORE-LAUNCH">
  <input type="hidden" name="redirect" value="https://powerperformancechiro.com/thank-you">
  <input type="hidden" name="subject" value="New {siteName} inquiry">
  <!-- real fields here -->
</form>
```

**Before deploying to production,** confirm:
- `access_key` is the real key, not `PLACEHOLDER-REPLACE-BEFORE-LAUNCH`
- `redirect` uses `https://{domain}`, not `localhost`

## Phase 7 — Deploy

```bash
git add .
git commit -m "Initial design pass"
git push
```

Vercel auto-deploys from `main` in ~20 seconds. See `DEPLOY.md` for domain setup, troubleshooting, and production signoff.

## Phase 8 — Handoff

Give the user:
- Live production URL (custom domain if set up, else `{slug}.vercel.app`)
- GitHub repo URL
- List of anything still placeholder (logo, photos, copy the client didn't provide)
- Test instructions — submit the contact form as a QA step

---

## Rules of engagement

- **Never "improve" a reference.** If the client provided a mockup or reference site, match it pixel-close. Your craft shows up in the details, not in deviating.
- **Never ship without 2 screenshot rounds.** One draft + one review is not enough.
- **Never invent facts.** If intake doesn't say the business has been around 15 years, don't write "15+ years" in a stat block. Ask.
- **Never skip mobile.** Every page gets a 390px screenshot check.
- **Never leave `{{` tokens** in final HTML. `grep "{{" *.html` must return nothing before deploy.
- **Never deploy with `localhost` in form redirects.** Grep check: `grep -r "localhost" *.html` must return nothing.

## When to ask the user

- Top 3 services aren't clear from intake
- Service area / cities aren't specified
- Origin story for the "Guide" block is missing
- Photos in `brand_assets/` are stock/irrelevant and you'd need better ones
- Client wants a section outside the StoryBrand spine (testimonials, team, blog) — confirm scope
