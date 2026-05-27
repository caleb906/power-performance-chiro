# CLAUDE.md — Client Site Rules

Rules Claude follows in every Hoffmedia client site.

## Always Do First
- **Invoke the `frontend-design` skill** before writing any frontend code, every session, no exceptions.

## Reference Images
- If a reference image is provided: match layout, spacing, typography, and color exactly. Swap in placeholder content (images via `https://placehold.co/`, generic copy). Do not improve or add to the design.
- If no reference image: design from scratch with high craft (see guardrails below).
- Screenshot your output, compare against reference, fix mismatches, re-screenshot. Do at least 2 comparison rounds. Stop only when no visible differences remain or user says so.

## Local Server
- **Always serve on localhost** — never screenshot a `file:///` URL.
- Start the dev server: `node serve.mjs` (serves the project root at `http://localhost:3000`)
- `serve.mjs` lives in the project root. Start it in the background before taking any screenshots.
- If the server is already running, do not start a second instance.

## Screenshot Workflow
- **Always screenshot from localhost:** `node screenshot.mjs http://localhost:3000`
- Screenshots are saved automatically to `./temporary screenshots/screenshot-N.png` (auto-incremented, never overwritten).
- Mobile viewport: `node screenshot.mjs http://localhost:3000 mobile-label --mobile`
- Optional label: `node screenshot.mjs http://localhost:3000 hero-v2` → `screenshot-N-hero-v2.png`
- After screenshotting, read the PNG with the Read tool — Claude can see and analyze the image directly.
- When comparing, be specific: "heading is 32px but reference shows ~24px", "card gap is 16px but should be 24px"
- Check: spacing/padding, font size/weight/line-height, colors (exact hex), alignment, border-radius, shadows, image sizing

## Output Defaults
- Inline CSS in each HTML file (matches Wright pattern, no build step)
- Google Fonts via `<link>` in `<head>`
- Placeholder images: `https://placehold.co/WIDTHxHEIGHT/COLOR/COLOR?text=LABEL`
- Mobile-first responsive (breakpoint at 900px for nav, 768px for content)

## Brand Assets
- Always check the `brand_assets/` folder before designing. Real logos/photos live there.
- If assets exist, use them. Do not use placeholders where real assets are available.
- If a logo is present, use it. If a color palette is defined, use those exact values — do not invent brand colors.

## Content Rules (this starter)
- All 7 pages already have correct nav, footer, and branding tokens replaced.
- Copy (hero headlines, service descriptions, FAQ, etc.) is still Wright-industry. **Rewrite per client** using `PROCESS.md`.
- Never change the layout/structure of blocks. If the hero has `eyebrow + h1 + subhead + 2 CTAs + 3 stats`, keep that shape — just rewrite the text.
- Preserve all `class` names, `id`s, and inline styles. They're referenced by the `_Builder` CMS.

## Anti-Generic Guardrails
- **Colors:** Never use default Tailwind palette (indigo-500, blue-600, etc.). Use the client's brand color from intake.
- **Shadows:** Never use flat `shadow-md`. Use layered, color-tinted shadows with low opacity.
- **Typography:** Pair a display font (Anton, Bebas Neue, Oswald-family) with a clean sans (DM Sans, Inter, Manrope). Tight tracking on large headings, generous line-height on body.
- **Gradients:** Layer multiple radial gradients. Add grain/texture via SVG noise filter for depth (see index.html hero overlay).
- **Animations:** Only animate `transform` and `opacity`. Never `transition-all`. Use `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Interactive states:** Every clickable element needs hover, focus-visible, and active states.
- **Images:** Add a gradient overlay (`linear-gradient(to top, rgba(0,0,0,0.5), transparent)`) on hero/service images.
- **Depth:** Surfaces have a layering system (bg → surface → surface-2), not all one plane.

## Hard Rules
- Do not add sections, features, or content not in the reference or the template
- Do not "improve" a reference design — match it
- Do not stop after one screenshot pass
- Do not use `transition-all`
- Do not use default Tailwind blue/indigo as primary color
- Do not rename CSS classes or IDs — they're bound to the `_Builder` CMS

## Analytics (centralized — one file, all pages)
- Every site has a single `/analytics.js` in the project root that owns GA4 + auto-event tracking.
- Each HTML page gets exactly ONE line in the `<head>` (right after the viewport meta):
  ```
  <!-- Analytics (centralized — see /analytics.js) -->
  <script src="/analytics.js"></script>
  ```
- To swap or update the GA4 ID, edit only the `GA_ID` constant at the top of `analytics.js`. Never inline gtag in individual pages.
- `analytics.js` auto-tracks: pageviews, `tel:`/`mailto:` clicks, outbound links, form_start, generate_lead on form submit, and conversion on any URL containing `thank-you`.
- Reference implementation: `Wright Excavation/analytics.js`. Copy + change the ID for new sites.

## Deploy
- Git push auto-deploys to Vercel from `main`.
- Before deploying, ensure Web3Forms `redirect` values point to production domain, not localhost. (See `DEPLOY.md`.)
