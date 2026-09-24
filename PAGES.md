# Publish Vermilion Path on GitHub Pages

This build runs the game entirely in the browser with **offline authored narration**. A hosted AI service is not connected. Your existing local Node/LM Studio edition remains supported.

## Upload and publish

1. Extract `Vermilion-Path-Pages-source.zip`.
2. Upload its contents to the root of your GitHub repository on the `main` branch. Include the hidden `.github` directory: it contains `.github/workflows/pages.yml`.
3. In repository **Settings → Pages → Build and deployment → Source**, choose **GitHub Actions**.
4. Open **Actions → Publish game to GitHub Pages → Run workflow**, choosing `main`. Subsequent pushes to main also run the workflow.
5. When deployment succeeds, open the URL shown in the deployment job on your phone. It will normally be `https://YOUR-NAME.github.io/YOUR-REPOSITORY/`.

If GitHub Actions is disabled by account or organization policy, enable it or request permission from the repository owner. The workflow runs tests before publishing. This package has not been uploaded or publicly deployed by the assistant.

## Simpler upload alternative

`Vermilion-Path-Pages-static.zip` contains only the ready-built website. Extract its contents into your repository root, then choose **Deploy from a branch**, `main`, `/(root)` in Pages settings. Do not mix this layout with the source workflow approach. Keep the source ZIP separately for development.

## Local development

Node.js 22 or newer; no npm dependencies required.

```
npm start
npm test
npm run build:pages
```

The Pages build is written to `dist/`. Publish only that directory, not server files or credentials. Paths work below a repository subdirectory. The Pages build disables local/online AI controls and does not attempt the local API. Normal local development still uses the original server and LM Studio settings.

## Saves and phone use

Saves live in the browser on each device; they do not sync automatically. Export your PC save through Settings and import it on the Pages site. The new website address has separate storage. Do not clear site data without exporting. `?test=1` is for disposable, tab-isolated testing, not your normal playthrough. No service worker is included yet, so loading the website still requires a connection.

## Verified in this package

96 automated tests passed. The built site was served by a plain static server under `/dist/` and tested in a browser: character creation, custom-art naming/creation, travel, reload persistence, disabled AI settings, and phone-width layout without horizontal overflow. No browser errors were recorded. Actual GitHub deployment and physical-phone testing remain unverified.

Official publishing documentation: https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages
