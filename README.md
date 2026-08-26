# Infographics Portal

A web portal for College of Southern Nevada (CSN) students to access and download study infographics organized by course. Static site built with plain HTML, CSS, and JavaScript — no frameworks or external dependencies — designed to be deployed on GitHub Pages, Vercel, or any static hosting provider.

🔗 **Live demo:** https://gleimbek.github.io/infographics/

## Features

- **Course access codes**: each course (CIT 151, CIT 144, CIT 251) has its own access code. Entering the correct code unlocks that course's infographic list.
- **Thumbnail grid view**: infographics are displayed in a 3-column grid with small preview thumbnails.
- **Preview modal**: clicking "View" opens a modal window showing the image at a larger size without leaving the page.
- **Forced download**: the "Download" button uses `fetch` + `Blob` to download the PNG directly to the student's device, instead of opening it in a new tab.
- **Responsive design**: adapts to desktop, tablet, and mobile, including a 2-column thumbnail layout on very small screens.
- **"View All Courses"**: button to return to the full course view, which also re-locks the previously unlocked course (prompting for the code again).

## Project structure

```
├── index.html      # Page structure, course cards, and modal
├── styles.css       # Styles, institutional colors, and responsive media queries
├── script.js        # Unlock logic, thumbnail rendering, modal, and downloads
└── image/           # Folder containing the infographic PNG files
    ├── Unit A - HTML.png
    ├── Unit B - HTML.png
    └── ...
```

## How to add new infographics

Currently, the **CIT 151** course generates its thumbnails dynamically from a list of units defined in `script.js`:

```js
const cit151Units = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];
```

To publish a new unit:

1. Upload the PNG file to the `image/` folder using the naming format `Unit X - HTML.png` (matching case and the hyphen exactly, since hosts like GitHub Pages are case-sensitive).
2. Add the corresponding letter to the `cit151Units` array in `script.js`.
3. Save, commit, and push. The thumbnail will appear automatically on the portal.

**CIT 144** and **CIT 251** don't have any units published yet; they display the message "No units currently published." To activate them, follow a similar pattern to CIT 151 inside `script.js` (or add the markup manually inside their `resources-box` in `index.html`).

## How to change access codes

Access codes are defined directly in `index.html`, in the `onclick` attribute of each card's "Unlock" button:

```html
<button onclick="unlockCourse('cit151', 'web151')">Unlock</button>
```

The second parameter (`'web151'`) is the correct code for that course. Simply change that value to update the access code.

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

- **Access codes are not a real security measure.** Since this is a static site, anyone with basic technical knowledge can view the source code (`script.js`/`index.html`) and find the codes, or even run `unlockCourse()` manually from the browser console. This system is meant purely to organize content by course, not to securely restrict access.
- If real access restriction is needed in the future (e.g., limiting access to enrolled students only), validation would need to be moved to a backend with proper authentication.

## Tech stack

- Semantic HTML5
- CSS3 (CSS variables, Grid, Flexbox, media queries)
- Vanilla JavaScript (no frameworks or dependencies)
- Typography: [Inter](https://fonts.google.com/specimen/Inter) via Google Fonts

## Credits

Developed by Gustavo Leimbek.
