# Oasis Necta Astro Website

## Project tree

```text
oasis-necta/
├── public/
│   ├── documents/
│   │   └── oasis-necta-beekeeping-contract.pdf
│   ├── images/
│   │   ├── cards/
│   │   ├── banner-about.jpg
│   │   ├── banner-contact.jpg
│   │   ├── banner-contract.jpg
│   │   ├── hero-beehives.jpg
│   │   └── logo.png
│   └── photos/
│       ├── p/
│       └── t/
├── src/
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── package.json
├── package-lock.json
└── README.md
```

## Run in VS Code

1. Open this folder in VS Code.
2. Open **Terminal → New Terminal**.
3. Install dependencies:

```bash
npm install
```

4. Start the local website:

```bash
npm run dev
```

5. Open the local URL shown in the terminal, usually:

```text
http://localhost:4321
```

## Production build

```bash
npm run build
npm run preview
```

The generated production files are placed in `dist/`.
