# kuzmanich.com

Portfolio site for Justin Kuzmanich showcasing AI-built tools. One `index.html` plus an `images/` folder of optimized WebP screenshots. No build step, no dependencies. Deploys as-is. Image paths are relative (`images/name.webp`, no leading slash) so the site works both at the domain root on Netlify and under the `/kuzmanich.com/` subpath on GitHub Pages staging. When replacing an image, give the file a new name: Netlify serves `/images/` with a one-year immutable cache, so a changed file behind the same name stays stale for repeat visitors.

## Deploy

- GitHub repo -> Netlify (Justin's standard workflow).
- After first deploy, activate form notifications: Netlify dashboard -> Site configuration -> Forms -> Form notifications -> Add email notification -> recipient `justin.kuzmanich@gmail.com`.
- Test the contact form on the live URL, not a local file. Locally the AJAX post to `/` fails by design and shows the email fallback message.

## Voice and copy rules (non-negotiable)

1. **No em or en dashes anywhere.** Not in copy, titles, meta tags, alt text, or comments. Rewrite with commas, colons, or periods. Hyphens in compound words are fine (pay-at-the-table, mobile-first, AI-assisted).
2. **Studio voice.** "We", not "I". Section labels are "What we built". The one exception: CheckMate copy names Justin directly because it predates the studio.
3. **CheckMate honesty framing.** Justin is co-founder of the venture, NOT co-inventor of the patent. Fleming Trane is the sole inventor of record on US 7,370,794 B2. Never write "patent holder" or "co-inventor". This matches his resumes and application materials and must stay consistent because employers have seen those materials.
4. **Malugani's Tire Center** (if ever added): established 1948, "78 years in business". Always 78.
5. Headline is "Tools for removing friction in your business." with the hand-drawn underline on "friction". Statement, no question mark.

## Design system

- Palette (CSS vars in `:root`): `--paper #F1ECE1` warm oat background, `--card #FBF8F1`, `--ink #21221C`, `--ink-soft #56544A`, `--forest #24372B` (nav + footer + buttons), `--sage #3E5C46` (labels), `--clay #BD6B3E` (marker underline, accents).
- Fonts: Fraunces (serif headlines), Hanken Grotesk (body), JetBrains Mono (labels, tags, buttons). Loaded from Google Fonts.
- Top nav and footer are forest green; body is warm oat. Green bookends, light middle.
- Status pills: live (green tint), demo (clay tint), proto -> renders as "Concept", acq -> renders as "Acquired" (solid forest). Defined in the `STATUS` map in the JS.
- Rows alternate image left / image right automatically (`.flip` on odd indices). Numbering (01, 02...) is automatic from array order.
- Scroll reveal animations; `prefers-reduced-motion` fully supported. When screenshotting the page headless, use reduced motion or elements appear blank.

## SEO and AEO

- Canonical URL is `https://kuzmanich.com/` (set in the canonical link, OG tags, JSON-LD, robots.txt, and sitemap.xml). The GitHub Pages staging copy canonicalizes to it, which keeps staging out of search results.
- The project rows are baked into `index.html` as static markup between the `PROJECTS:STATIC` comment markers inside `#rows`, so crawlers that do not run JavaScript (GPTBot, ClaudeBot, PerplexityBot) can read the portfolio. The browser JS re-renders the same rows from the `PROJECTS` array at runtime, so the visible site never depends on the static block.
- **After any edit to the `PROJECTS` array, run `node scripts/render-projects.mjs`** to regenerate the static block. If you forget, the site still looks right; only the crawler-visible copy goes stale.
- JSON-LD in the head: WebSite, Person (Justin), and an ItemList of the six projects. Keep its descriptions consistent with the on-page copy and the CheckMate honesty framing (rule 3 above). Update it when projects change.
- Social card is `images/og-card.jpg` (1200x630, hero shot on paper). Favicon is `images/favicon.svg` plus `images/apple-touch-icon.png` (forest K with clay dot).

## Editing projects

Everything lives in the `PROJECTS` array near the bottom of `index.html`. One object per project, rendered in array order. After editing, regenerate the static crawler copy: `node scripts/render-projects.mjs`. Fields:

- `title`, `type` (e.g. "CRM \u00B7 Internal tool" - the dot is \u00B7), `status` (live | demo | proto | acq), `mono` (2-3 letters for the placeholder panel)
- `challenge` and `build`: the two copy blocks. `build` may contain `<b>` tags. Keep each roughly 20-45 words. Challenge states the real business problem; build states what was made. No dashes.
- `tools`: array of short tag strings
- `image`: relative path like `images/name.webp`, or `""` for the styled placeholder panel
- `live`: URL for the primary button, `""` shows "Link pending"
- `label`: optional button text override (CheckMate uses "View patent")
- `repo`: GitHub URL or `""`

Current order: CheckMate (01, Acquired, opens the page as the origin story), TableOps, Blu Sky Pipeline, Scoop Alert, AI B-Roll Editor, Listing Website Builder. Hero copy says "Six of them, below." Update that count if projects are added or removed.

## Product shot treatment

All screenshots are pre-composited before embedding, on a `#FBF8F1` cream canvas, pasted with rounded corners (radius ~12-14) and a soft green-tinted drop shadow (rgba(36,55,43,.7) blurred). Three styles:

- **Web apps**: wrapped in a mac-style browser window. Chrome bar `#ECE6DA`, three traffic-light dots, URL pill `#F7F3EB` with the real URL in mono type.
- **Mobile apps** (TableOps): device screenshots side by side as a paired phone shot.
- **Desktop apps / photos** (Resolve, CheckMate device): no browser chrome, just the rounded panel with shadow. Photos get ~1.5% edge trim to remove video-player corner artifacts.

To add a shot: composite with PIL following the above, export as WebP quality ~82 (method 6) into `images/` with a kebab-case name matching the project, set the relative path as the project's `image` value. Hero image (Pipeline crop, 1660x712 source crop) uses the same browser treatment on the `#F1ECE1` paper color so it blends with the hero background and lives at `images/hero-pipeline.webp`.

## Contact form (Netlify Forms)

- Static form in the footer: `name="contact"`, `data-netlify="true"`, honeypot `netlify-honeypot="bot-field"`, hidden `form-name` input. Fields: name, email, message.
- Submits via AJAX: urlencoded POST to `/`, inline status states (.ok green, .err salmon with mailto fallback). No page redirect.
- Nav "Let's build" button scrolls to `#contact`.
- Visible fallback under the form: mailto justin.kuzmanich@gmail.com.

## Known open items

- Listing Website Builder and TableOps have no `live` links yet ("Link pending"). Scoop Alert live: justinkuzmanich.github.io/scoop-alert. Pipeline live: justinkuzmanich.github.io/blu-sky-pipeline (plus repo link).
- CheckMate copy dropped the "$14M+ raised" stat during a trim; "170+ restaurant groups" kept (174 is the precise figure if Justin confirms it).
- The Vanguard listing screenshot's own headline reads "My Bonne Chere an Impeccable..." on the source site; flagged to Justin as a possible typo on the live property site.
- `index_fallback.html` is a byte-identical safety copy of the design before the contact form was added; `variation_ink.html` and `variation_night.html` are alternate theme explorations (CSS override blocks appended to the same content).
