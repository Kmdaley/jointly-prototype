import { SidePanel } from './SidePanel';
import { PrimaryButton } from './PrimaryButton';
import { GhostButton } from './GhostButton';
import { offers } from '../data/prototypeData';
import type { OfferId } from '../types';

interface SelectOffersPanelProps {
  selectedOffers: OfferId[];
  onToggleOffer: (id: OfferId) => void;
  onToggleCompareAll: () => void;
  onGenerate: () => void;
  onClose: () => void;
}

/**
 * Interactive Select Offers panel.
 *
 * Behavior:
 * - Every individual offer is a toggle that updates selectedOffers state.
 * - "Compare all" is purely derived: it appears selected iff every individual
 *   offer is selected. Clicking it calls onToggleCompareAll which either
 *   selects all or clears all (parent owns that logic).
 * - "Generate Report" is disabled until at least 2 offers are selected.
 */
export function SelectOffersPanel({
  selectedOffers,
  onToggleOffer,
  onToggleCompareAll,
  onGenerate,
  onClose,
}: SelectOffersPanelProps) {
  // Compare all visual state is derived from individual selections.
  const allSelected = selectedOffers.length === offers.length;

  // Per spec, Generate Report requires at least 2 selected offers.
  const canGenerate = selectedOffers.length >= 2;

  return (
    <SidePanel
      title="Select Offers"
      subtitle="Choose which offers to include in the comparison."
      onClose={onClose}
      footer={
        <>
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton onClick={onGenerate} disabled={!canGenerate}>
            Generate Report
          </PrimaryButton>
        </>
      }
    >
      {/* Compare all — derived state, toggles select-all / clear-all */}
      <button
        type="button"
        className="offer-option"
        data-selected={allSelected}
        onClick={onToggleCompareAll}
        aria-pressed={allSelected}
      >
        <span className="offer-option__avatar offer-option__avatar--all" aria-hidden />
        <span className="offer-option__name">Compare all</span>
        <span className="offer-option__check" aria-hidden>
          {allSelected && <CheckIcon />}
        </span>
      </button>

      <div style={{ height: 6 }} />

      {/* Individual offer toggles */}
      {offers.map((offer) => {
        const selected = selectedOffers.includes(offer.id);
        return (
          <button
            type="button"
            key={offer.id}
            className="offer-option"
            data-selected={selected}
            onClick={() => onToggleOffer(offer.id)}
            aria-pressed={selected}
          >
            <span
              className={`offer-option__avatar offer-option__avatar--${offer.id}`}
              aria-hidden
            />
            <span className="offer-option__name">{offer.name}</span>
            <span className="offer-option__check" aria-hidden>
              {selected && <CheckIcon />}
            </span>
          </button>
        );
      })}
    </SidePanel>
  );
}

function CheckIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M1.5 5 L4 7.5 L8.5 2.5" />
    </svg>
  );
}
