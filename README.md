  # Lovely Jubbly Removals — Site Rebuild Project Brief

## Context

Lovely Jubbly Removals was an award-winning Bristol removal company that ceased trading in 2023. The domain `lovelyjubblyremovals.co.uk` has been acquired to capture residual branded traffic and preserve backlink equity before eventually 301 redirecting to `painlessremovals.co.uk`.

**Important:** The domain's Google index currently contains Japanese spam from a previous hack. This rebuild will replace that spam with legitimate content, allowing Google to reindex clean pages.

## Objective

Rebuild the site with:
- Same URL structure (to preserve backlinks)
- Fresh, original content (NOT copied from Wayback Machine)
- Clear messaging: "Lovely Jubbly has closed → contact Painless Removals"
- Callback request form on every page
- Temporary nofollow on all links to Painless (until index is clean)

## Technical Stack

- **Framework:** Astro.js
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Deployment:** Cloudflare Pages
- **Forms:** Use astro-forms skill (Zod validation, email via Resend/Brevo)
- **Images:** Use astro-images skill with Picture components

## Site Structure (Must Match These URLs Exactly)

```
/                                    → Homepage
/house-removals-bristol/             → House Removals (HAS BACKLINKS)
/self-storage-bristol/               → Self Storage (HAS BACKLINKS)
/man-and-van/                        → Man and Van (HAS BACKLINKS)
/packing-service/                    → Packing Service
/piano-removals/                     → Piano Removals
/european-removals-and-storage/      → European Removals
/contact/                            → Contact Page
```

**Do NOT create:**
- `/removals-company-reviews/` (no backlinks, relies on dead widget)
- Blog posts (no backlinks, not worth the effort)
- `/sitemap/` page (use XML sitemap only)

## Design Direction

### Brand Colors (from original site)
- Primary: `#2563EB` (blue - used in headers/CTAs)
- Secondary: `#DC2626` (red - used in accent buttons)
- Background: White
- Text: Dark gray/black

### Logo
The original logo was a simple house icon with red roof and blue walls. Create a similar placeholder or use text-only "Lovely Jubbly Removals" for now.

### Layout Pattern
- Blue header bar with navigation
- Hero section with headline + dual CTA buttons
- Content sections with icons/cards for services
- Footer with contact details

### Typography
- Clean sans-serif (Inter or similar)
- Large, clear headings
- Good readability

## Messaging Framework

### Every Page Must Include:

**Header Banner (sticky, prominent):**
```
⚠️ Lovely Jubbly Removals has closed. For Bristol removals, contact Painless Removals.
```

**Footer Section:**
```
Lovely Jubbly Removals ceased trading in 2023. 
This website is operated by Soborbo Ltd.
For removal services in Bristol, please contact Painless Removals.
```

### Tone:
- Acknowledge the closure upfront
- Helpful, not deceptive
- Direct people to Painless without being pushy

## Contact Details (Use These)

**Painless Removals:**
- Phone: 01172 870 082
- Email: hello@painlessremovals.com
- Address: Painless Removals, 290-294 Southmead Rd, Bristol BS10 5EN
- Hours: 9AM - 5PM

**Do NOT use the old Lovely Jubbly contact details:**
- ~~01179 902468~~
- ~~info@lovelyjubblyremovals.co.uk~~
- ~~29 Turtlegate Avenue, Bristol BS13 8NN~~

## Callback Form Requirements

Every page should have a callback request form:

**Fields:**
- Name (required)
- Phone (required)
- Email (optional)
- Preferred callback time (dropdown: Morning/Afternoon/Evening)
- Message (optional textarea)

**On Submit:**
- Send email to hello@painlessremovals.com
- Show thank you message
- UTM tracking: `utm_source=lovelyjubbly&utm_medium=acquired_domain`

**Form Protection:**
- Turnstile (Cloudflare)
- Honeypot field
- Rate limiting

## Page Content Guidelines

### Homepage (`/`)

**Hero:**
```
H1: Looking for Bristol Removals?
Subhead: Lovely Jubbly Removals has closed, but Painless Removals is here to help.
CTA 1: Request Callback
CTA 2: Call 01172 870 082
```

**Services Grid (link to subpages):**
- House Removals
- Man and Van
- Packing Service
- Self Storage
- Piano Removals
- European Removals

**Trust Signals:**
- "Lovely Jubbly was a UK Enterprise Award Winner 2020 & 2021"
- "Now served by Painless Removals — trusted Bristol movers"

**Callback Form**

---

### House Removals (`/house-removals-bristol/`)

**Hero:**
```
H1: House Removals Bristol
Subhead: Professional, reliable home moving services
```

**Content Sections (write fresh, ~300-400 words total):**
- What's included in a house removal
- Why use professional movers
- Service area (Bristol and surrounding)
- Pricing transparency (get a quote)

**Callback Form**

---

### Self Storage (`/self-storage-bristol/`)

**Hero:**
```
H1: Self Storage Bristol
Subhead: Secure storage solutions for homes and businesses
```

**Content Sections:**
- Types of storage (domestic, business, student)
- Security features
- Flexible terms
- How to choose the right unit size

**Callback Form**

---

### Man and Van (`/man-and-van/`)

**Hero:**
```
H1: Man and Van Bristol
Subhead: Affordable, flexible moving help
```

**Content Sections:**
- What is man and van service
- Ideal for: small moves, single items, student moves
- What's included (fuel, insurance, etc.)
- Pricing structure

**Callback Form**

---

### Packing Service (`/packing-service/`)

**Hero:**
```
H1: Professional Packing Service Bristol
Subhead: Let the experts pack your home safely
```

**Content Sections:**
- Full packing service
- Fragile items handling
- Packing materials included
- Unpacking service available

**Callback Form**

---

### Piano Removals (`/piano-removals/`)

**Hero:**
```
H1: Piano Removals Bristol
Subhead: Specialist piano moving with care
```

**Content Sections:**
- Why pianos need specialist movers
- Equipment and expertise
- Insurance coverage
- Upright and grand pianos

**Callback Form**

---

### European Removals (`/european-removals-and-storage/`)

**Hero:**
```
H1: European Removals from Bristol
Subhead: Moving abroad? We can help.
```

**Content Sections:**
- Countries served
- What's involved in international moves
- Documentation and customs
- Storage during transition

**Callback Form**

---

### Contact (`/contact/`)

**Hero:**
```
H1: Contact Painless Removals
Subhead: Get in touch for a free quote
```

**Content:**
- Phone: 01172 870 082
- Email: hello@painlessremovals.com
- Address with embedded map (or placeholder)
- Opening hours: Mon-Fri 9AM-5PM

**Large Callback Form**

## Technical Requirements

### SEO
- Proper meta titles and descriptions per page
- Open Graph tags
- Canonical URLs
- XML sitemap at `/sitemap.xml`
- robots.txt allowing all crawlers

### Performance
- Lighthouse score 90+
- Images in AVIF/WebP with fallbacks
- Minimal JavaScript
- Critical CSS inlined

### Links to Painless
**IMPORTANT:** All links to painlessremovals.co.uk must have `rel="nofollow"` until the domain's spam is cleared from Google's index. This prevents passing toxic signals.

```html
<a href="https://painlessremovals.co.uk" rel="nofollow">Painless Removals</a>
```

### Legal Pages
- `/privacy-policy/` — Basic GDPR-compliant privacy policy
- `/terms/` — Simple terms of use

Footer: "© 2024 Soborbo Ltd. Lovely Jubbly Removals has ceased trading."

## Image Placeholders

Use placeholder images for now. Mark clearly in code where real images should go:

```astro
<!-- TODO: Replace with actual hero image -->
<div class="bg-gray-300 aspect-video flex items-center justify-center">
  <span class="text-gray-500">Hero Image Placeholder</span>
</div>
```

Suggested image slots:
- Hero image per service page
- Team/van photo on homepage
- Storage facility photo
- Packing materials photo

## File Structure

```
lovelyjubbly-site/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── ClosureBanner.astro
│   │   ├── CallbackForm.astro
│   │   ├── ServiceCard.astro
│   │   └── Hero.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── house-removals-bristol.astro
│   │   ├── self-storage-bristol.astro
│   │   ├── man-and-van.astro
│   │   ├── packing-service.astro
│   │   ├── piano-removals.astro
│   │   ├── european-removals-and-storage.astro
│   │   ├── contact.astro
│   │   ├── privacy-policy.astro
│   │   └── terms.astro
│   └── styles/
│       └── global.css
├── public/
│   ├── robots.txt
│   └── favicon.ico
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

## Deployment

- Deploy to Cloudflare Pages
- Custom domain: `lovelyjubblyremovals.co.uk` (will be connected after domain transfer completes)
- Preview URL for testing first

## Success Criteria

1. All URLs match the old structure exactly
2. Every page has closure messaging
3. Callback form works and sends emails
4. All Painless links are nofollow
5. Lighthouse 90+ on all pages
6. Mobile responsive
7. Clean, professional appearance

## What NOT To Do

- ❌ Do NOT copy content from Wayback Machine verbatim
- ❌ Do NOT use old Lovely Jubbly phone/email/address
- ❌ Do NOT pretend Lovely Jubbly is still operating
- ❌ Do NOT remove nofollow from Painless links yet
- ❌ Do NOT create pages that weren't in the original structure
- ❌ Do NOT add review widgets or third-party embeds

## Timeline Context

This site needs to be ready to deploy when the GoDaddy domain transfer completes (estimated 3-5 days from Jan 30, 2026). The sooner it's ready, the sooner we can replace the spam in Google's index.
