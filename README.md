# Infographics Portal

A web portal where the students I tutor can view and download study infographics, organized by topic. Static site built with plain HTML, CSS, and JavaScript — no frameworks or external dependencies — designed to be deployed on GitHub Pages, Vercel, or any static hosting provider.

🔗 **Live demo:** https://gleimbek.github.io/infographics/

## Features

- **Access codes per topic**: each topic (HTML & CSS, Introduction to Data Analytics, Responsive Design) has its own access code. Entering the correct code unlocks that topic's infographic list.
- **Thumbnail grid view**: infographics are displayed in a 3-column grid with small preview thumbnails.
- **Preview modal**: clicking "View" opens a modal window showing the image at a larger size without leaving the page.
- **Forced download**: the "Download" button uses `fetch` + `Blob` to download the PNG directly to the student's device, instead of opening it in a new tab.
- **Responsive design**: adapts to desktop, tablet, and mobile, including a 2-column thumbnail layout on very small screens.
- **"View All Courses"**: button to return to the full course view, which also re-locks the previously unlocked course (prompting for the code again).

## Project structure

```
├── index.html      # Page structure, course cards, and modal
├── styles.css       # Styles, colors, and responsive media queries
├── script.js        # Unlock logic, thumbnail rendering, modal, and downloads
└── image/           # Folder containing the infographic PNG files
    ├── Unit A - HTML.png
    ├── Unit B - HTML.png
    └── ...
```

## How to add new infographics

Each topic builds its thumbnails from a list in `script.js` (`htmlCssUnits`, `dataAnalyticsUnits`, `responsiveUnits`). Every entry is one image:

```js
{ title: 'Unit A - Getting Started with HTML', filename: 'Unit A - HTML.png' },
```

To publish a new infographic:

1. Upload the image to the `image/` folder. Match the file name exactly, including case and spaces, since GitHub Pages is case-sensitive.
2. Add an entry with its title and file name to the right list in `script.js`.
3. Commit and push. The thumbnail appears on the portal automatically.

## How to change access codes

Access codes are defined directly in `index.html`, in the `onclick` attribute of each card's "Unlock" button:

```html
<button onclick="unlockCourse('html-css', '******')">Unlock</button>
```

The second parameter (`'******'`) is the correct code for that topic. Simply change that value to update the access code.

## Local development

No installation or build step required. To test it locally:

```bash
# With Python installed
python -m http.server 8000
# then open http://localhost:8000
```

> ⚠️ It's important to open it through a local server (`http://`) rather than double-clicking the file directly (`file://`), since browsers block `fetch()` requests for security reasons under the `file://` protocol — which are required to force-download the images.

## Deployment

The project is designed to be deployed as a static site. Tested options:

- **GitHub Pages**: Settings → Pages → select branch and root folder. Only available on public repos with a free account.
- **Vercel**: import the repository (works with private repos on the free plan) and deploy with no extra configuration — Vercel detects the project as a static site.

## Known limitations

- **Access codes are not a real security measure.** Since this is a static site, anyone with basic technical knowledge can view the source code (`script.js`/`index.html`) and find the codes, or even run `unlockCourse()` manually from the browser console. This system is meant purely to organize content by topic, not to securely restrict access.
- If real access restriction is needed in the future (for example, limiting access to specific students), validation would need to be moved to a backend with proper authentication.

## Tech stack

- Semantic HTML5
- CSS3 (CSS variables, Grid, Flexbox, media queries)
- Vanilla JavaScript (no frameworks or dependencies)
- Typography: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## Credits

Developed by Gustavo Leimbek.
