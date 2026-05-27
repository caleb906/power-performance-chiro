# Brand Assets

Drop client-provided brand materials here **before** running `new-site.mjs` so you can reference them during the content pass.

## Recommended structure

```
brand_assets/
├── logo/
│   ├── logo.svg              ← primary logo (preferred format)
│   ├── logo-dark.svg         ← if different from primary
│   ├── logo-light.svg        ← for dark backgrounds
│   └── favicon.png           ← 512x512 min
├── photography/
│   ├── hero-1.jpg            ← hero background candidates
│   ├── hero-2.jpg
│   ├── services-*.jpg        ← service card photos
│   ├── team-*.jpg            ← about page
│   └── area-*.jpg            ← service area / location
├── guidelines/
│   ├── brand-guide.pdf       ← if client has one
│   ├── style-guide.pdf
│   └── colors.txt            ← hex values, if brand guide is complex
└── README.md                 ← this file
```

## Rules

- **SVG > PNG > JPG** for logos (SVG scales cleanly at any size)
- **Minimum 1920px wide** for hero photography
- **Minimum 600px wide** for service card images
- If no logo exists, build a wordmark using the display font — see the wordmark examples in the frontend-design skill
- If no photography exists, use `https://placehold.co/1920x800/#0EA5B7/#F5F7FA?text=Power Performance Chiro` as a placeholder. Tell the user it needs replacing.

## Hosting

Local files in `brand_assets/` are ignored by git (see `.gitignore`). For production:

- **Logo** — upload to Vercel Blob, Cloudflare R2, or Imgix. Paste the URL into `content.json` → `brand.logo`.
- **Photography** — same, or use a CDN. Update `src=""` in HTML.
- **Short-term**: paste images into `<project-root>/assets/` and commit — Vercel serves them at `/assets/filename.jpg`.

## This folder is gitignored by default

Brand files shouldn't live in git — they bloat the repo and may be licensed. Upload to a CDN and reference by URL. If a client requires self-hosting, move assets into `public/` or `assets/` and update `.gitignore`.
