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

## Requirements

- A Chromium-based browser with Manifest V3 support (Chrome 88+, Edge 88+, or equivalent).

## Permissions

Declared in `manifest.json`:

- `storage` — persists the on/off toggle in `chrome.storage.sync`.
- `activeTab`, `scripting` — used by the popup to query the active tab and send the toggle message.
- `content_scripts` is registered with `matches: ["<all_urls>"]`, so the script is injected on every page; in practice it only touches DOM nodes matching TikTok Shop order-page selectors (`tr.goGcNp`, `.isUnTN`, `Seller SKU:` text). It makes no network requests and reads or transmits no account or order data outside the current page.

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

## License & Attribution / 许可与来源

Original project code authored for this repository is released under the MIT License; see [LICENSE](./LICENSE).

When reusing or redistributing a substantial portion, retain the LICENSE and its copyright notice. The copyright notice includes this original source URL: https://github.com/change979666/tk-order-picker. Please keep the source link visible in your redistributed source or project documentation.

This license applies only to original material that the repository maintainer has the right to license. Third-party libraries, vendor code, platform SDKs, trademarks, screenshots, icons, fonts, and other external assets remain subject to their respective licenses and terms. Review those terms before reuse.

**Project status:** personal/archived project, shared as-is. Maintenance, compatibility, and production readiness are not guaranteed.
