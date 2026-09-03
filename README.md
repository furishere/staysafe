# Staysafe — Cybercrime Awareness & Prevention

A plain-language awareness site that teaches people to recognize common cybercrime
(phishing, SIM swap, UPI fraud, ransomware, and more), spot the red flags in the moment,
and know exactly what to do if something goes wrong. Built as a single-page site with
plain HTML, CSS, and JavaScript — no build tools or dependencies required.

## Structure

```
.
├── index.html   All page markup and content
├── style.css    Design tokens, layout, and responsive rules
├── script.js    Section navigation, live incident-feed animation, mobile menu
└── README.md
```

## Sections

The site is a single HTML page divided into four sections, switched client-side by
`script.js` (no page reloads, no router):

- **Home** — hero, a simulated "live" incident feed, and an overview of what the guide covers
- **Learn** — common cybercrime types grouped by severity (Critical / Common / Watch)
- **Spot the Scam** — universal red flags and a quick self-check before you click, tap, or pay
- **How to Report** — a four-step response process plus India-specific reporting contacts
  (1930 national cybercrime helpline, cybercrime.gov.in)

## Running it

No build step needed. Either:

- Open `index.html` directly in a browser, or
- Serve the folder locally for a cleaner experience (e.g. `python3 -m http.server`, then
  visit `http://localhost:8000`)

Keep all three files (`index.html`, `style.css`, `script.js`) in the same folder — the
HTML links to the other two by relative path.

## Design

- **Palette** — near-black background, warm cream text, green accent, with amber/red used
  sparingly to signal caution and critical severity
- **Type** — Instrument Serif for headings, JetBrains Mono for labels and data, Inter for body copy
- **Responsive** — fluid down to phone width; the navbar collapses into a hamburger menu below 760px

## Customizing content

- Threat types and red flags live directly in the `#learn` and `#spot` sections of `index.html`
- The simulated incident feed is a plain array (`feed`) at the top of `script.js` — edit or
  extend the entries there
- Reporting contacts are in the `.report-box` block inside the `#report` section