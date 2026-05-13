# Jointly — UX Case Study Prototype

An interactive, portfolio-quality prototype for the Jointly case study. Built with React + TypeScript, Vite, and Framer Motion. Exported Figma screens act as base images with interactive UI elements layered on top to demonstrate workflow continuity, contextual actions, annotations, automation, and a cinematic autoplay walkthrough.

---

## Setup

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

Production build:

```bash
npm run build
npm run preview
```

---

## Walkthrough narrative

The six steps follow a deliberate product story arc:

| #  | Step                | Title                                                       | Narrative beat                |
|----|---------------------|-------------------------------------------------------------|-------------------------------|
| 1  | Dashboard           | A single surface for every active deal                      | Operational visibility        |
| 2  | Offer Workspace     | One workspace for offers, conversations, and tasks          | Collaboration                 |
| 3  | Select Offers       | Configurable comparison, on the agent's terms               | Configurable comparison       |
| 4  | Comparison Report   | Confident decisions at a glance                             | Decision-making               |
| 5  | Offer Controls      | From evaluation to action, in context                       | From decision to action       |
| 6  | Document Mapping    | Guided transaction completion, automated                    | Execution                     |

---

## Autoplay

- Starts on load. Walks through all 6 steps.
- **30 seconds per slide** (`AUTOPLAY_DURATION_MS` in `src/data/prototypeData.ts`; CSS animation in `src/index.css` reads from `--autoplay-duration` so they stay in sync).
- The active pagination dot fills with a slow, subtle progress line over the full 30s.
- Clicking ⏸ pauses; clicking ▶ resumes (rewinds to step 1 if resumed from the last slide).
- Any manual action pauses autoplay: dot click, CTA click, panel interaction.
- Annotation toggle and hotspot hover **do not** pause autoplay.
- Autoplay stops at the last slide (no looping).

---

## Annotations

Each annotation has three pieces of copy (see `src/types.ts`):

```ts
{
  number: 1,
  x: 47, y: 11,            // % of laptop screen area
  label: 'Surface new activity early',           // chip — always visible
  title: 'Created a shared operational workspace', // hover only
  body:  'Gave agents visibility across active deals and tasks.', // hover only
  placement: 'bottom',
}
```

- **`label`**: short product-marketing phrase shown as a persistent chip beside the dot when annotations are toggled on.
- **`title` + `body`**: deeper detail shown in a callout on hover/focus, replacing the chip.

Hotspots animate in with a staggered spring (90 ms between dots) and have a calm pulsing glow. To move a hotspot, edit `x` / `y` in `src/data/prototypeData.ts` — percentages are of the laptop screen area, not the full PNG. Use `placement` to keep chips and callouts from being clipped near edges.

---

## Motion system

- **Easing**: Apple/Linear-style `cubic-bezier(0.22, 1, 0.36, 1)` (ease-out-quart) and `(0.32, 0.72, 0, 1)` for panel slides.
- **Intro choreography** (mount-only): title → toggle → laptop scale-in → pagination, each delayed slightly for a natural sequence.
- **Slide transitions**: image cross-fades with subtle Y rise (10 px) and scale settling (0.992 → 1) over 700 ms.
- **Annotation entry**: dots spring in with 90 ms stagger, chips slide in from the placement direction with 180 ms additional delay.
- **Hotspot pulse**: 3.4 s loop, opacity-driven so it never feels urgent.
- **Side panels**: 550 ms slide with a smooth Apple-style ease (no spring bounce).

---

## Device presentation

The PNGs ship with their own thin laptop chrome (dark bezel + silver chin) baked in. The prototype uses that chrome directly rather than drawing its own bezel on top — that previously caused a double-frame effect and made the UI feel constrained.

How it works:
- The image is cropped via CSS to the laptop region (verified by pixel analysis: x: 297→1564, y: 311→1187 in every source PNG)
- `.screen-frame` displays the cropped laptop with a subtle drop-shadow for ambient depth
- `.screen-frame__inner` is positioned over the actual screen content (x: 313→1547, y: 336→1100 in source pixels — the TRUE inner UI behind the bezel)
- All interactive layers (annotations, CTA hot-zones, side panels, dim) live inside `__inner`, so percentage-based coordinates map directly to UI elements

Single sources of truth in `index.css`:
```css
:root {
  --image-scale-w: 147%;        /* crop config for laptop chrome */
  --image-offset-left: -23.4%;
  --image-offset-top: -35.5%;
  --inner-left: 1.3%;           /* TRUE inner UI bounds within the crop */
  --inner-top: 2.9%;
  --inner-width: 97.4%;
  --inner-height: 87.2%;
}
```

If anything drifts visually, tweak these vars — annotation `x`/`y` in `prototypeData.ts` are percentages of the inner UI area, so they re-map automatically.

## Cinematic stage architecture

The laptop sits inside a four-element stage so each visual concern is isolated:

```
.stage
  .stage__intro          ← mount-only reveal (opacity + scale + Y)
    .stage__atmosphere   ← faint lavender glow behind the laptop
    .stage__floater      ← infinite ±6 px ambient float (8 s loop)
      <ScreenFrame />
    .stage__shadow       ← static floor shadow (doesn't follow the float)
```

The floor shadow staying put while the laptop gently floats is what sells the effect — when the laptop drifts up, the gap to the shadow grows, exactly as it would for an object hovering.

## Premium presentation details

- **Atmospheric background**: four stacked gradients on `body` — lavender glow centered above the laptop, cool silver vignettes on both edges, and an off-white → cool-gray base. `background-attachment: fixed` so it stays still as anything scrolls.
- **Atmosphere layer**: a separate larger lavender glow inside the stage, blurred to 48 px, sits behind the laptop for an additional halo.
- **Laptop**: a thin, minimal MacBook PNG (`public/laptop-frame.png`) is used as the device hardware. Its pure-black background was processed to transparency so the `drop-shadow` filter follows the laptop's outline rather than the image rectangle.
- **Screen area positioning**: CSS variables (`--screen-left`, `--screen-top`, `--screen-width`, `--screen-height`) match the laptop PNG's screen region exactly (13.4% / 4.61% / 72.42% / 83.93%). The cropped screenshot fills this area cleanly with no letterbox.
- **Crop math**: the source PNG screen content is extracted at 1192×729 (aspect 1.634) to match the laptop's screen area precisely.
- **Floor shadow**: blurred elliptical radial gradient (60% wide), positioned 8 px below the laptop, doesn't follow the ambient float — the laptop drifts up, the shadow stays put, selling the floating effect.
- **Glass chrome**: annotation chips, toggle, pagination, and callouts use `backdrop-filter: blur(14-20px) saturate(180%)` — the distinctive iOS material that lets the atmospheric background tint show through.
- **Annotation dots**: gradient (`#8b5cf6` → `#6d28d9`), triple-layer glow shadow, calmer 3.6 s pulse with 2.8× expansion.
- **Micro-interactions**: pagination dot hover scales 1.2×, play button lifts on hover, offer cards translate -1 px on hover, primary button lifts with deeper shadow.

---

## Adjusting the image crop

The source PNGs are 1862×1425 and contain the entire Figma slide (title, toggle, laptop, pagination baked in). The bezel crops to just the laptop screen area via three CSS variables at the top of `src/index.css`:

```css
--image-scale-w: 156.21%;     /* scales source so 1192px region = 100% wide  */
--image-offset-left: -27.94%; /* aligns source x=333 to container x=0        */
--image-offset-top: -41.6%;   /* aligns source y=332 to container y=0        */
```

If a screen's crop looks misaligned, nudge `--image-offset-top` by a percent.

---

## Project structure

```
src/
├── App.tsx
├── main.tsx
├── index.css                # design tokens, motion, layout, polish
├── types.ts                 # Annotation, Step, Offer types
├── data/
│   └── prototypeData.ts     # steps, labels, titles, autoplay duration
└── components/
    ├── PrototypeViewer.tsx  # state, autoplay, intro choreography
    ├── ScreenFrame.tsx      # bezel + cinematic image transitions
    ├── AnnotationToggle.tsx
    ├── AnnotationHotspot.tsx
    ├── AnnotationCallout.tsx
    ├── SidePanel.tsx
    ├── SelectOffersPanel.tsx
    ├── OfferControlsPanel.tsx
    ├── Pagination.tsx       # dots + play/pause + 30 s progress
    ├── PrimaryButton.tsx
    └── GhostButton.tsx
```

---

## Tech

- React 18 + TypeScript
- Vite 5
- Framer Motion 11
- Inter (via Google Fonts)
