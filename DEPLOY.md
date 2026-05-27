# DEPLOY.md — Deploy Checklist

Run this checklist in the **client site folder** (not `_Starter/`) before shipping.

## Pre-deploy sanity check

```bash
# 1. No unreplaced tokens
grep -r "{{" . --include="*.html" --include="*.json" --include="*.xml" --include="*.txt"
# expect: no output

# 2. No Wright leftovers
grep -ri "wrightexcavation\|wright excavation" . --include="*.html"
# expect: no output

# 3. Web3Forms redirects point to production, NOT localhost
grep -r "localhost" . --include="*.html"
# expect: no output
```

If any of the above return hits, **stop and fix** before pushing.

## 1. GitHub repo (first time only)

If `new-site.mjs` skipped this (no `gh` CLI), do it manually:

```bash
# install gh once
winget install --id GitHub.cli
gh auth login

# inside client folder
gh repo create {slug} --public --source=. --remote=origin --push
```

Or via browser: create empty repo at https://github.com/new, then:
```bash
git remote add origin https://github.com/YOUR_USER/{slug}.git
git branch -M main
git push -u origin main
```

## 2. Vercel project (first time only)

```bash
vercel login                # once per machine
vercel link --yes --project {slug}
vercel --prod --yes
```

Or via browser: import the GitHub repo at https://vercel.com/new. Vercel auto-detects the static site — no build step needed.

## 3. Custom domain

In Vercel dashboard → {project} → Settings → Domains:
1. Add `{domain}` (apex) and `www.{domain}`
2. Set `{domain}` as primary, redirect `www` → apex
3. Copy the DNS records Vercel shows (A record + CNAME)
4. Add them to the client's DNS host (Cloudflare, Namecheap, GoDaddy, etc.)
5. Wait for SSL provisioning (~1–5 min)

## 4. Web3Forms verification

1. Visit `https://{domain}/contact` on production
2. Submit a test inquiry with your own email
3. Confirm:
   - The email lands in the configured inbox (check Web3Forms dashboard)
   - Browser redirects to `/thank-you` (not the localhost dev URL)
4. Spam check — add the client's domain to Web3Forms allowlist to prevent rate-limiting

## 5. SEO basics

- [ ] `sitemap.xml` uses production domain
- [ ] `robots.txt` references `sitemap.xml` at production domain
- [ ] `<link rel="canonical">` on every page uses production domain
- [ ] Schema.org JSON-LD on home page uses production domain + correct address/areaServed
- [ ] `<meta name="description">` set on every page (check `<head>` of each HTML file)
- [ ] Open Graph tags — add if client wants link previews (not in starter by default)

## 6. Standard day-to-day deploy

```bash
git add .
git commit -m "Update hero copy"
git push
# Vercel picks it up in ~20 seconds
```

## Troubleshooting

| Issue | Fix |
|---|---|
| 404 on `/services` (no `.html`) | `vercel.json` needs `cleanUrls: true` — it is by default. Check file wasn't overwritten. |
| Fonts don't load on prod | Google Fonts URL in `<head>` must match exact Google Fonts name. |
| Form submits but email never arrives | Web3Forms key in HTML differs from the dashboard key. `grep -r "access_key" *.html` to verify. |
| Vercel deploy is old | `vercel --prod --force` to redeploy latest commit. |
| Preview URL shown instead of prod | Make sure you used `--prod` flag. |
| Images broken on prod but fine on localhost | Images are relative — they must be absolute URLs or live under the project root. |

## Production-ready signoff

Before handing off to the client:

- [ ] Live on production domain (not `*.vercel.app`)
- [ ] SSL padlock shows in browser
- [ ] All 7 pages load without errors
- [ ] All nav + footer links work
- [ ] Forms submit and redirect to `/thank-you`
- [ ] Mobile responsive (screenshot at 390px)
- [ ] Desktop screenshot looks like the reference
- [ ] Client has Vercel access (or Hoffmedia owns it per contract)
