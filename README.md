# Oasis Necta Ltd website

Open `index.html` in a browser, or in VS Code right-click it and choose **Open with Live Server**.

```
oasis-necta/
├── index.html        page content (all pages live here; the menu switches between them)
├── css/styles.css    all styling (colours are the variables at the top)
├── js/data.js        things you edit: prices, steps, WhatsApp number, gallery photo list
├── js/main.js        site behaviour (menu, quote basket, gallery) - rarely needs touching
├── images/           site pictures (logo.png, hero-team.jpg)
└── photos/           gallery pictures
```

## Add gallery photos
1. Copy the picture into `photos/`.
2. Open `js/data.js` and add a line to `GALLERY`: `["file-name.jpg", "short description"],`
3. Save. Missing files show a "Photo coming soon" box instead of a broken picture.

Tip: resize photos to about 1200 px wide before adding them so the page loads fast on mobile data.

## Update prices
Edit `BUY` (buying prices) and `CAT` (hives and equipment) in `js/data.js`.

## Hover zoom
Wrap any picture in `<div class="zoom"> ... </div>` and it zooms gently on hover
(computers only; it switches off for visitors who prefer reduced motion).
