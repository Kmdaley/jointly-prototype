# Layout fix — v2.4

## Standalone preview (open this first)

`preview/preview.html` is a static HTML file. **No build, no React, no
Vite needed.** Open it directly in any browser — Chrome, Safari, Firefox.

It uses the same CSS shape as the production build, so if it renders
correctly there, the CSS is sound and the issue in your Vite app is that
`ScreenFrame.tsx` is still your original file (not v2.3). If the preview
renders wrong, the CSS itself is wrong and we keep iterating on that.

The preview includes:
- Headline + centered annotation toggle + laptop with the dashboard
  screenshot inside + pagination beneath
- A working annotation toggle (click "Show annotations" to reveal the
  numbered hotspots)
- Hover-reveal cards and connector lines when a dot is hovered or
  keyboard-focused

To open: just double-click `preview/preview.html`. It needs to be in the
same folder as `laptop-frame.jpg` and `dashboard-screen.png` (both
included in the `preview/` folder).

## v2.4 visual changes

Adjustments after comparing the new reference mockups to v2.3:

| | v2.3 | v2.4 |
|---|---|---|
| Background | `#f5f3ff` (lavender) | `#ffffff` (matches references — they're solid white) |
| Atmosphere gradient | Two strong purple radial gradients | Single faint warm-tone radial at bottom — barely there |
| Headline size | `clamp(18, 1.6vw, 24)` | `clamp(22, 2.1vw, 30)` — bigger, matches reference weight |
| Headline margin-bottom | 28 px | 32 px |
| Pagination active bar | Purple | Medium gray — references show monochrome |
| Pagination play button | Dark filled circle | Light-gray bg with dark icon — references show subtle button |
| `.screen-frame` filter shadow | `drop-shadow(0 30px 60px …)` | None — JPG has its own ground shadow baked in; box-shadow would render around the white JPG bounds |

## Files in this drop

```
README.md
preview/
  preview.html                              ← standalone diagnostic
  laptop-frame.jpg
  dashboard-screen.png                       ← extracted from dashboard.png
public/laptop-frame.jpg                      ← for Vite app
src/index.html
src/index.css
src/components/ScreenFrame.tsx              ← v2.3, fully self-contained
src/components/AnnotationToggle.tsx
src/components/SidePanel.tsx
src/components/PrimaryButton.tsx
src/components/GhostButton.tsx
```

## Same drop-in steps as v2.3

The TSX files haven't changed since v2.3 — only `index.css` got the
visual adjustments above. The eight files for your Vite app:

```
public/laptop-frame.jpg
src/index.html
src/index.css
src/components/ScreenFrame.tsx
src/components/AnnotationToggle.tsx
src/components/SidePanel.tsx
src/components/PrimaryButton.tsx
src/components/GhostButton.tsx
```

Files you can delete:
- `src/components/AnnotationHotspot.tsx`
- `src/components/AnnotationCallout.tsx`

## How to use the preview to debug

1. Open `preview/preview.html` in a browser.
2. **If the preview looks right:** the CSS works. Your deployed app's
   problem is that `ScreenFrame.tsx` wasn't replaced. Open
   `src/components/ScreenFrame.tsx` in your editor and check that line 9
   reads `import { AnimatePresence, motion } from 'framer-motion';` and
   that's the last import. If a `./AnnotationHotspot` or
   `../assets/laptop-frame.jpg` import is there, the file's the original.
3. **If the preview looks wrong:** describe what's wrong (laptop missing,
   wrong colors, layout drifting) and I'll fix the CSS — the preview
   isolates the CSS from any Vite / file-replacement variables.

## What's still untouched in your project

`PrototypeViewer.tsx`, `prototypeData.ts`, `timeline.ts`, `Pagination.tsx`,
`SelectOffersPanel.tsx`, `OfferControlsPanel.tsx`, your `types.ts`,
autoplay, play/pause, pagination, section nav, the doc-mapping toast,
CTA hotzones, the panel flow logic, all Framer Motion transitions.
