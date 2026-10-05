# Ajay J — Portfolio

A responsive personal portfolio for AI, data engineering, analytics, and decision systems. It is a static website built with HTML, CSS, and vanilla JavaScript.

## Files

- `index.html` — page content and section structure
- `styles.css` — layout, responsive styling, and animations
- `script.js` — mobile navigation, responsive project and certificate controls
- `certificates.json` — certificate titles and destination links
- `Off-Campus-Resume.pdf` — résumé linked from the page (add this file to the project root before deployment)

## Run locally

Because the certificate list is loaded from JSON, open the site through a local web server rather than opening `index.html` directly as a `file://` URL.

```bash
python3 -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000).

## Update certificates

Edit `certificates.json` and add an object to the array for each certificate:

```json
{
  "title": "Certificate title",
  "url": "https://example.com/certificate",
  "label": "Certificate information"
}
```

`label` is optional. Keep the file valid JSON; the page automatically loads the entries and provides a responsive “View more certificates” control when some entries are collapsed.

## Deploy with GitHub Pages

1. Push the project files to the repository's default branch.
2. In GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select the default branch and `/ (root)`, then save.
4. Wait for the Pages deployment to finish and open the URL shown in the Pages settings.

Keep `index.html`, `styles.css`, `script.js`, and `certificates.json` together at the published site root. Add the résumé PDF there as well if the résumé button should work.
