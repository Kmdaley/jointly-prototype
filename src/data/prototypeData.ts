import type { Step, Offer, OfferAction } from '../types';

// =================================================================
// Images are imported as ES modules so Vite resolves them to hashed
// asset URLs at build time. Do NOT use string paths like
// '/screens/dashboard.png' — Vite would try to serve them from
// public/screens/, which doesn't exist in this project. The JPGs
// live in src/assets/, which is where these imports point.
// =================================================================
import dashboardImg from '../assets/dashboard.jpg';
import offerWorkspaceImg from '../assets/offer-workspace.jpg';
import comparisonReportImg from '../assets/comparison-report.jpg';
import documentMappingImg from '../assets/document-mapping.jpg';
// `select-offers.jpg` and `offer-controls.jpg` aren't imported here —
// those steps reuse offer-workspace and comparison-report as their
// base images (the side panel overlays the prior screen).

// ============================================================================
// HOW TO ADJUST ANNOTATION POSITIONS
// ----------------------------------------------------------------------------
// `x` and `y` are percentages (0–100) of the LAPTOP SCREEN AREA — the actual
// UI behind the bezel, not the chrome itself. The bezel and chin sit OUTSIDE
// this coordinate system; see --screen-* CSS vars in index.css.
//
//   x = 0    → far left edge of the inner UI (just inside the bezel)
//   x = 100  → far right edge of the inner UI (just inside the bezel)
//   y = 0    → top of the inner UI (just below the bezel)
//   y = 100  → bottom of the inner UI (just above the chin)
//
// Each annotation has three pieces of copy:
//   - `label`: short punchy phrase (3–6 words) shown as a persistent chip
//              beside the dot. Visible while annotations are on.
//   - `title`: slightly longer headline shown in the hover callout.
//   - `body` : supporting sentence shown beneath the title in the callout.
//
// `placement` controls which side of the dot the chip and callout appear on:
// 'top' | 'bottom' | 'left' | 'right'. Use 'left' near the right edge and
// 'top' near the bottom edge so chips don't get clipped.
// ============================================================================

export const steps: Step[] = [
  // --------------------------------------------------------------------------
  // STEP 1 — Dashboard
  // --------------------------------------------------------------------------
  {
    id: 'dashboard',
    title: 'A single surface for every active deal',
    baseImage: dashboardImg,
    overlayPanel: null,
    annotations: [
      { id: 'dash-1', number: 1, x: 47, y: 12, label: 'Surface new activity early',  title: 'Created a shared operational workspace',      body: 'Gave agents visibility across active deals and tasks.',           placement: 'bottom' },
      { id: 'dash-2', number: 2, x: 35, y: 62, label: 'Every deal at a glance',       title: 'Surfaced time-sensitive actions early',       body: 'Reduced missed follow-ups and stalled transactions.',             placement: 'right'  },
      { id: 'dash-3', number: 3, x: 83, y: 34, label: 'Act without switching tools', title: 'Turned the dashboard into an action surface', body: 'Reduced navigation between tools and workflows.',                 placement: 'left'   },
      { id: 'dash-4', number: 4, x: 83, y: 88, label: 'Track readiness in real time', title: 'Made system updates visible in real time',   body: 'Improved coordination across participants.',                       placement: 'left'   },
    ],
  },

  // --------------------------------------------------------------------------
  // STEP 2 — Offer Workspace
  // --------------------------------------------------------------------------
  {
    id: 'offer-workspace',
    title: 'One workspace for offers, conversations, and tasks',
    baseImage: offerWorkspaceImg,
    overlayPanel: null,
    annotations: [
      { id: 'ows-1', number: 1, x: 23, y: 86, label: 'Coordinate communication in context', title: 'Centralized communication',                   body: 'Reduced coordination across disconnected tools.',                  placement: 'right' },
      { id: 'ows-2', number: 2, x: 52, y: 48, label: 'Evaluate offers side by side',        title: 'Offer evaluation in context',                 body: 'Enabled side-by-side review without leaving the workflow.',        placement: 'right' },
      { id: 'ows-3', number: 3, x: 85, y: 37, label: 'Move forward without leaving',        title: 'Contextual actions',                          body: 'Enabled users to advance the deal without leaving the workflow.',  placement: 'left'  },
      { id: 'ows-4', number: 4, x: 79, y: 57, label: 'Lead with the strongest signals',     title: 'Surfaced strongest offer signals first',      body: 'Reduced decision time during evaluation.',                          placement: 'left'  },
      { id: 'ows-5', number: 5, x: 79, y: 94, label: 'Keep next steps tied to state',       title: 'Embedded next steps into the workflow',       body: 'Actions stay tied to transaction state.',                           placement: 'left'  },
    ],
  },

  // --------------------------------------------------------------------------
  // STEP 3 — Select Offers panel (overlay on Offer Workspace)
  // --------------------------------------------------------------------------
  {
    id: 'select-offers',
    title: 'Configurable comparison, on the agent\u2019s terms',
    baseImage: offerWorkspaceImg,
    overlayPanel: 'select-offers',
    annotations: [],
  },

  // --------------------------------------------------------------------------
  // STEP 4 — Comparison Report
  // --------------------------------------------------------------------------
  {
    id: 'comparison-report',
    title: 'Confident decisions at a glance',
    baseImage: comparisonReportImg,
    overlayPanel: null,
    annotations: [
      { id: 'cmp-1', number: 1, x: 31, y: 68, label: 'Prioritize what matters most', title: 'Prioritized high-value decision factors', body: 'Reduced cognitive load during comparison.',                        placement: 'right' },
      { id: 'cmp-2', number: 2, x: 66, y: 62, label: 'Focused side-by-side review',   title: 'Offer evaluation in context',             body: 'Enabled side-by-side review without leaving the workflow.',        placement: 'top'   },
      { id: 'cmp-3', number: 3, x: 86, y: 24, label: 'Take action from comparison',   title: 'Quick actions',                            body: 'Offer management, sharing, and transaction actions in one place.', placement: 'left'  },
      { id: 'cmp-4', number: 4, x: 52, y: 40, label: 'Focus on active contenders',    title: 'Focused comparison on active contenders',  body: 'Reduced unnecessary information density.',                          placement: 'top'   },
    ],
  },

  // --------------------------------------------------------------------------
  // STEP 5 — Offer Controls panel (overlay on Comparison Report)
  // --------------------------------------------------------------------------
  {
    id: 'offer-controls',
    title: 'From evaluation to action, in context',
    baseImage: comparisonReportImg,
    overlayPanel: 'offer-controls',
    annotations: [],
  },

  // --------------------------------------------------------------------------
  // STEP 6 — Document Mapping
  // --------------------------------------------------------------------------
  {
    id: 'document-mapping',
    title: 'Guided transaction completion, automated',
    baseImage: documentMappingImg,
    overlayPanel: null,
    annotations: [
      { id: 'doc-1', number: 1, x: 45, y: 25, label: 'Detect fields automatically',  title: 'Reduced repetitive setup work',           body: 'Through automated field recognition.',       placement: 'bottom' },
      { id: 'doc-2', number: 2, x: 33, y: 88, label: 'Required vs. flexible inputs', title: 'Separated required and flexible inputs',  body: 'Supported complex transaction variability.', placement: 'right'  },
      { id: 'doc-3', number: 3, x: 69, y: 82, label: 'Map responsibilities by role', title: 'Mapped responsibilities by participant role', body: 'Reduced document completion error.',    placement: 'top'    },
      { id: 'doc-4', number: 4, x: 86, y: 59, label: 'Edit without leaving flow',    title: 'Enabled in-context editing',              body: 'Without workflow interruption.',             placement: 'left'   },
      { id: 'doc-5', number: 5, x: 90, y: 12, label: 'Trigger downstream actions',   title: 'Triggered downstream workflow actions',   body: 'Automatically, once mapping is complete.',   placement: 'left'   },
    ],
  },
];

// ============================================================================
// Offers available for selection in the Select Offers panel
// ============================================================================
export const offers: Offer[] = [
  { id: 'jones',   name: 'Jones'   },
  { id: 'garcia',  name: 'Garcia'  },
  { id: 'andrews', name: 'Andrews' },
];

// ============================================================================
// Actions available in the Offer Controls panel
// Only 'map-signatures' currently progresses the flow to Document Mapping.
// ============================================================================
export const offerActions: OfferAction[] = [
  { id: 'map-signatures', label: 'Map signatures'      },
  { id: 'send-counter',   label: 'Send counter offer'  },
  { id: 'decline-offer',  label: 'Decline offer'       },
  { id: 'accept-offer',   label: 'Accept offer'        },
];

/** Convenience: ordered list of step IDs for navigation. */
export const stepOrder = steps.map((s) => s.id);

/** Autoplay duration per slide, in ms. Keep in sync with the
    `pagination-progress` CSS animation duration in index.css. */
export const AUTOPLAY_DURATION_MS = 30000;
