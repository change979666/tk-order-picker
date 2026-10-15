# TK Order Picker

A Manifest V3 Chrome extension that highlights Seller SKUs and multi-quantity rows on the TikTok Shop order management page to speed up order picking.

## Features

- Highlights Seller SKU values that start with `BD` in purple bold text.
- Highlights order rows with quantity >= 2 in red bold text and adds a blue border.
- Auto-expands "Show more items" buttons so hidden rows are also highlighted.
- Toggle on/off from the popup; state is persisted via `chrome.storage.sync`.

## Installation (Developer mode)

1. Open Chrome and go to `chrome://extensions/`.
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked** and select this folder.
4. Pin the extension and click its icon to toggle highlighting on the order page.

## Project structure

```
├── manifest.json        # Manifest V3 configuration
├── popup.html/popup.js # Toggle UI
├── content_script.js    # DOM highlighting logic
├── popup.css            # Popup styles
└── icons/               # Extension icons (16/48/128 px)
```

## Notes

- The extension relies on TikTok Shop's current DOM class names (e.g. `tr.goGcNp`, `.isUnTN`). If TikTok updates its frontend, the selectors in `content_script.js` may need to be updated.
- No data leaves the browser; the extension only reads and modifies the current page DOM.