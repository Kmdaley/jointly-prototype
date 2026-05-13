// ============================================================================
// Core types for the prototype
// ============================================================================

/** Identifier for each step in the prototype flow. */
export type StepId =
  | 'dashboard'
  | 'offer-workspace'
  | 'select-offers'
  | 'comparison-report'
  | 'offer-controls'
  | 'document-mapping';

/** Identifier for overlay side panels. */
export type PanelId = 'select-offers' | 'offer-controls' | null;

/** Identifier for a single offer. */
export type OfferId = 'jones' | 'garcia' | 'andrews';

/** Identifier for an action selectable inside the Offer Controls panel. */
export type ActionId =
  | 'map-signatures'
  | 'send-counter'
  | 'decline-offer'
  | 'accept-offer';

/**
 * A numbered annotation that sits on top of a screen image.
 *
 * Visual hierarchy:
 *   - `label` is a short product-marketing phrase shown as a chip beside the
 *     dot. Always visible when annotations are toggled on.
 *   - `title` + `body` provide deeper detail on hover/focus.
 *
 * Coordinates are percentages of the LAPTOP SCREEN AREA (the visible region
 * inside the bezel — not the full PNG).
 */
export interface Annotation {
  id: string;
  number: number;
  /** Horizontal position as percent of the laptop screen area. */
  x: number;
  /** Vertical position as percent of the laptop screen area. */
  y: number;
  /** Short, punchy phrase shown as the persistent chip. 3–6 words ideal. */
  label: string;
  /** Slightly longer headline shown on hover/focus. */
  title: string;
  /** Supporting detail shown on hover/focus. */
  body: string;
  /**
   * Which side of the hotspot the chip and callout prefer to appear on.
   * Use 'left' near the right edge, 'top' near the bottom edge so cards
   * never get clipped. Defaults to 'right'.
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

/** A single step in the walkthrough. */
export interface Step {
  id: StepId;
  title: string;
  baseImage: string;
  overlayPanel: PanelId;
  annotations: Annotation[];
}

/** Static data describing an offer. */
export interface Offer {
  id: OfferId;
  name: string;
}

/** Static data describing an offer-controls action. */
export interface OfferAction {
  id: ActionId;
  label: string;
}
