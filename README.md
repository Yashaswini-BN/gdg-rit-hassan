# GDG on Campus – RIT Hassan Website

A responsive, accessible website for **GDG on Campus – Rajeev Institute of Technology, Hassan**, built with plain HTML, CSS and JavaScript (no build step, no dependencies).

## Project description
The site presents the GDG chapter to students: who we are, what we teach, upcoming events, how to join and how to contact us. It is designed as a real community hub that the chapter can keep updating by editing one data file.

## Features
- **Responsive layout** for mobile, tablet and desktop, with a mobile hamburger menu
- **Light / Dark theme** (remembers your choice, respects system preference)
- **Event explorer** with live search and type filters (Workshops, Hackathons, Talks, Study Jams)
- **Interactive learning tracks** that expand to show topics
- **Animated hero** (particle canvas), counters, scroll-reveal animations and scroll-progress bar
- **Contact form** with client-side validation (opens the user's email app via `mailto:`)
- **FAQ accordion**, team section, footer with useful links
- **Accessibility**: skip link, semantic landmarks, ARIA labels, keyboard focus styles, reduced-motion support

## Required sections covered
Home · About · Main Content (Tracks + Events) · Features · Contact · Footer, plus all three official logos in the hero and footer.

## Folder structure
```
gdg-rit-hassan/
├── index.html
├── css/style.css
├── js/
│   ├── data.js      <- edit events, tracks, team, contact email here
│   └── main.js      <- site behaviour
├── assets/logos/    <- PUT THE OFFICIAL LOGO FILES HERE
└── README.md
```

## IMPORTANT: add the official logos
Copy the logo files provided by the organizers into `assets/logos/` using exactly these names:

| File name | Logo |
|-----------|------|
| `rit-logo.png` | Rajeev Institute of Technology |
| `cse-logo.png` | Computer Science and Engineering Department |
| `gdg-logo.png` | GDG on Campus – RIT Hassan |

If your files are `.svg` or `.jpg`, either rename them as above or update the `src` paths in `index.html` (they appear in the hero and the footer). Do not stretch or recolour the logos.

## Run locally
- **VS Code:** install the *Live Server* extension, right-click `index.html` → *Open with Live Server*.
- Or just double-click `index.html`.

## Customise
1. Edit `js/data.js` for events, tracks, team names and contact email.
2. Replace placeholder social links and address in `index.html` (Contact section and footer).
3. Update the sample stats in the Stats section.

## Deploy (public link)
**GitHub Pages**
1. Create a public GitHub repo and push this folder.
2. Repo → *Settings* → *Pages* → Source: `main` branch, `/ (root)`.
3. Your site will be live at `https://<username>.github.io/<repo>/`.

**Netlify / Vercel:** drag-and-drop the folder or import the repo; no build command needed.

## Tech stack
HTML5 · CSS3 (custom properties, grid, flexbox) · Vanilla JavaScript (ES5-compatible)

## Credits
Google and Google Developer Groups are trademarks of Google LLC. This is a student-run site and not an official Google product.
