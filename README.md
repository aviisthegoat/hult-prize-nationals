# Hult Prize Nationals | Hult Boston 2026: event website

Participant-facing event website built with **Next.js 14 + TypeScript + Tailwind CSS**.

---

## Quick Start

```bash
# 1. Enter the project
cd hult-prize-nationals

# 2. Install dependencies (Node 18+ required)
npm install --ignore-scripts

# 3. Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Home: hero, event overview, quick-nav cards, sponsors shell |
| `/schedule` | Day 1 + Day 2 schedule with timeline UI |
| `/submissions` | Single attendee form submission CTA |
| `/faqs` | Accordion FAQ by category |
| `/travel` | Hotel, campus housing, transit info |
| `/contact` | Email + day-of help desk info |

---

## Editing Content (No Coding Required)

**All editable content lives in one file:**

```
lib/content.ts
```

### Common edits

| What to change | Where in `lib/content.ts` |
|---|---|
| Event dates | `siteConfig.dates` |
| Location / address | `siteConfig.location`, `siteConfig.address` |
| Contact email | `siteConfig.contactEmail` |
| Submission form link | `siteConfig.submissions.attendeeFormUrl` |
| Submission deadline | `siteConfig.submissions.deadlineDate` + `deadlineTime` |
| Schedule items | `siteConfig.schedule.day1.items[]` / `siteConfig.schedule.day2.items[]` |
| FAQs | `siteConfig.faqs[]`: add categories or questions |
| Sponsors | Set `siteConfig.sponsors.showSponsors = true`, then populate `tiers[].logos[]` |
| Travel notes | `siteConfig.travel.hotelNote`, `campusNote`, `transitNote` |

### Adding a schedule item

```ts
{
  time: "10:00 AM",
  endTime: "11:00 AM",
  title: "My New Session",
  location: "Room 101",
  description: "Brief description visible to participants.",
  type: "pitch",  // one of: logistics | ceremony | pitch | break | workshop | social
}
```

### Activating sponsors

```ts
sponsors: {
  showSponsors: true,   // flip this
  tiers: [
    {
      name: "Gold",
      logos: [
        {
          name: "Sponsor Inc.",
          logoUrl: "/sponsors/sponsor-inc.png",   // put image in /public/sponsors/
          websiteUrl: "https://sponsorinc.com",
        },
      ],
    },
  ],
},
```

---

## Adding Real Logos

Replace the placeholder logo blocks in `components/Navbar.tsx` and `app/page.tsx`:

```tsx
// Replace this:
<div className="w-8 h-8 bg-hp-red ...">HP</div>

// With:
<Image src="/logos/hult-prize.svg" alt="Hult Prize" width={100} height={32} />
```

Place logo files in `/public/logos/`.

---

## Deployment

### Vercel (recommended; free tier works)

```bash
npm install -g vercel
vercel
```

Follow prompts. Vercel auto-detects Next.js; no config needed.

### Custom domain

After deploying, update `metadataBase` in `app/layout.tsx`:

```ts
metadataBase: new URL("https://your-actual-domain.com"),
```

### Other platforms (Netlify, Railway, etc.)

Build command: `npm run build`
Output directory: `.next`
Node version: 18+

---

## Project Structure

```
hult-prize-nationals/
├── app/
│   ├── layout.tsx          # Root layout (Navbar + Footer)
│   ├── globals.css         # Global styles + Tailwind directives
│   ├── page.tsx            # Home page
│   ├── schedule/page.tsx
│   ├── submissions/page.tsx
│   ├── faqs/page.tsx
│   ├── travel/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Accordion.tsx
│   ├── CTAButton.tsx
│   ├── PageHero.tsx
│   └── SectionWrapper.tsx
├── lib/
│   └── content.ts          ← EDIT THIS FILE to update site content
├── public/
│   └── (place logos, og-image.png, sponsor logos here)
├── tailwind.config.ts
└── README.md
```

---

## Brand Notes

- **Hult Prize red:** `#C8102E` (token: `hp-red` in Tailwind)
- **Hult navy:** `#003057` (token: `hult-navy`)
- **Hult gold:** `#F2A900` (token: `hult-gold`)
- Font: Inter (loaded from Google Fonts via `next/font`)

---

## Adding the Excel Schedule

When you have the `Hult Prize Boston Nationals 2026.xlsx`:

1. Open the file and filter for participant-facing rows only (exclude staff ops, internal notes)
2. Translate each row into a schedule item in `lib/content.ts` following the structure above
3. Save; the dev server hot-reloads automatically

---

*Built for Hult Prize Nationals | Hult Boston 2026.*
