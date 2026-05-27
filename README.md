# Power Performance Chiro

Performance-focused chiropractic care in Bend, OR. ART, soft tissue, and rehab for athletes, active adults, and anyone tired of living in pain.

## For Claude (first session in this folder)

Read these in order before building:
1. `CLAUDE.md` — design rules + frontend-design skill trigger
2. `PROCESS.md` — StoryBrand framework + build flow
3. `intake.json` — client facts (phone, colors, fonts, services)
4. `brand_assets/` — logo + photography if provided

Then build from scratch: `index.html` first, follow the StoryBrand block order.

## Pages to create

| URL | File | Notes |
|-----|------|-------|
| `/` | `index.html` | StoryBrand home — replaces the placeholder |
| `/services` | `services.html` | Full service list |
| `/about` | `about.html` | Expanded guide narrative |
| `/contact` | `contact.html` | Contact form + info cards |
| `/estimate` | `estimate.html` | Lead-gen form (the "get started" page) |
| `/thank-you` | `thank-you.html` | Post-submit confirmation |
| `/privacy` | `privacy.html` | Privacy policy |

## Local dev

```bash
node serve.mjs                                        # localhost:3000
node screenshot.mjs http://localhost:3000             # desktop 1440px
node screenshot.mjs http://localhost:3000 hero --mobile  # mobile 390px, labeled
```

Screenshots save to `./temporary screenshots/screenshot-N[-label].png`.

## Deploy

```bash
git add .
git commit -m "Change description"
git push
```

Vercel picks it up in ~20 seconds. See `DEPLOY.md` for the full checklist.

## Brand quick reference

| | |
|---|---|
| Primary | #0EA5B7 |
| Primary dark | #0A7E8C |
| Background | #0B0F14 |
| Surface | #11161D |
| Display font | Oswald |
| Body font | Inter |
| Phone | (458) 600-9345 |
| Email | info@powerperformancechiro.com |
| Hours | Mon/Wed/Thu 9a-1p, 3-6p · Tue 12-6p · Fri 8a-12p |

---

Built by [Hoffmedia](https://hoffmediadesign.com) · 2026
