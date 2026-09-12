# Educare Result Portal — Frontend

React 18 + Vite + Tailwind CSS single-page app for the Educare WhatsApp Result Bot. A student taps
the "Check My Result" button in WhatsApp, lands here via a CTA link, picks their class, enters their
roll number, and sees an animated marksheet-style result with a Download PDF option.

## Stack

- React 18 + Vite
- Tailwind CSS (utility-first styling, no plain CSS beyond `index.css`'s Tailwind directives)
- `framer-motion` for step transitions and micro-interactions
- `lucide-react` for icons
- `axios` for API calls

## Getting started

```bash
npm install
npm run dev
```

The dev server runs on **http://localhost:5175** (see `vite.config.js`).

Other scripts:

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build locally
```

## Environment variables

Copy `.env.local.example` to `.env.local` and adjust as needed:

| Variable | Description | Default (example) |
|---|---|---|
| `VITE_API_BASE_URL` | Base URL of the Educare backend REST API | `http://localhost:9082/api/educare` |
| `VITE_WA_NUMBER` | WhatsApp number (country code, no `+`) for the floating "Chat with us on WhatsApp" button. Leave blank to hide the button entirely. | *(blank)* |

## How the backend is called

`src/api.js` wraps exactly four endpoints, per the project contract:

- `GET {VITE_API_BASE_URL}/school` — school branding (name, logo, board, address)
- `GET {VITE_API_BASE_URL}/classes` — list of class names for the Select Class step
- `GET {VITE_API_BASE_URL}/result?className=&rollNo=` — the student's result. The backend replies
  with HTTP 200 in both the found and not-found cases, using an envelope `code` field (`200` vs
  `404`) to signal the outcome — `api.js` treats any non-200 `code` *or* an actual HTTP error as
  "not found", so the UI always falls back to the friendly empty state instead of crashing.
- `GET {VITE_API_BASE_URL}/result/pdf?className=&rollNo=` — binary PDF, downloaded client-side as
  `Result_<rollNo>.pdf`.

## Query params (arriving from the WhatsApp CTA link)

- `?m=` — the student's mobile number
- `?n=` — the student's name, used to personalise the hero greeting ("Hi Ananya 👋"); falls back to
  "Hi Student 👋" when the site is opened directly without these params.

## Project structure

```
src/
├── main.jsx                     # React root
├── App.jsx                      # Step-flow orchestration (hero → class → roll → loading → result/not-found)
├── config.js                    # env vars + query-param reader
├── api.js                       # axios wrapper for the 4 backend endpoints
├── index.css                    # Tailwind directives + small global tweaks
└── components/
    ├── Header.jsx                # Sticky top branding bar (school logo/name/board) + back button
    ├── Hero.jsx                   # Step 1 — welcome + personalised greeting + CTA
    ├── ClassSelect.jsx            # Step 2 — responsive class chip/card grid
    ├── RollNumberEntry.jsx        # Step 3 — roll number input + validation
    ├── LoadingState.jsx           # Step 4 — spinner/skeleton while fetching
    ├── ResultCard.jsx             # Step 5 — animated marksheet, ring gauge, PDF download
    ├── NotFoundState.jsx          # Step 6 — friendly empty state
    └── WhatsAppFab.jsx            # Floating WhatsApp chat button (hidden if VITE_WA_NUMBER is blank)
```

## Notes

- No placeholder school hero image is hardcoded anywhere — the hero uses a `GraduationCap` icon
  illustration until a real logo/image URL is supplied via the backend's `/school` response
  (`logoUrl`). If `logoUrl` is empty, the branding header and hero gracefully fall back to the icon
  mark, never a broken `<img>`.
- The UI never crashes if the backend is unreachable: every API call in `api.js` is wrapped so a
  network failure surfaces as an empty/not-found state rather than an unhandled error.
