import { SidePanel } from './SidePanel';
import { PrimaryButton } from './PrimaryButton';
import { GhostButton } from './GhostButton';
import { offers, offerActions } from '../data/prototypeData';
import type { OfferId, ActionId } from '../types';

interface OfferControlsPanelProps {
  selectedOffer: OfferId | null;
  selectedAction: ActionId | null;
  onSelectOffer: (id: OfferId) => void;
  onSelectAction: (id: ActionId) => void;
  onContinue: () => void;
  onClose: () => void;
}

/**
 * Offer Controls panel.
 *
 * The user picks an offer + an action, then clicks Continue. The parent
 * (PrototypeViewer) inspects the chosen action to decide where to route:
 * 'map-signatures' progresses to the Document Mapping step.
 */
export function OfferControlsPanel({
  selectedOffer,
  selectedAction,
  onSelectOffer,
  onSelectAction,
  onContinue,
  onClose,
}: OfferControlsPanelProps) {
  const canContinue = Boolean(selectedOffer && selectedAction);

  return (
    <SidePanel
      title="Offer Controls"
      subtitle="Select an option"
      onClose={onClose}
      footer={
        <>
          <GhostButton onClick={onClose}>Cancel</GhostButton>
          <PrimaryButton onClick={onContinue} disabled={!canContinue}>
            Continue
          </PrimaryButton>
        </>
      }
    >
      <div className="controls-section">
        <Select
          value=""
          placeholder="Manage selected offers"
          options={[]}
          onChange={() => {}}
          ariaLabel="Manage selected offers"
        />
      </div>

      <div className="controls-section">
        <Select
          value=""
          placeholder="Share comparison"
          options={[]}
          onChange={() => {}}
          ariaLabel="Share comparison"
        />
      </div>

      <hr className="controls-section__divider" />

      <h3 className="controls-section__heading">Offer actions</h3>

      <div className="controls-section">
        <label className="controls-section__label">Select Offer</label>
        <Select
          value={selectedOffer ?? ''}
          placeholder="Select offer…"
          options={offers.map((o) => ({ value: o.id, label: o.name }))}
          onChange={(v) => onSelectOffer(v as OfferId)}
          ariaLabel="Select offer"
        />
      </div>

      <div className="controls-section">
        <label className="controls-section__label">Select action</label>
        <Select
          value={selectedAction ?? ''}
          placeholder="Select action…"
          options={offerActions.map((a) => ({ value: a.id, label: a.label }))}
          onChange={(v) => onSelectAction(v as ActionId)}
          ariaLabel="Select action"
        />
      </div>
    </SidePanel>
  );
}

// ----------------------------------------------------------------------------
// Local Select component
// ----------------------------------------------------------------------------
interface SelectProps {
  value: string;
  placeholder: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  ariaLabel: string;
}

function Select({ value, placeholder, options, onChange, ariaLabel }: SelectProps) {
  return (
    <div className="select-input">
      <select
        className={`select-input__field ${
          value === '' ? 'select-input__field--placeholder' : ''
        }`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="select-input__chevron" aria-hidden>
        <ChevronIcon />
      </span>
    </div>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 4.5 L6 7.5 L9 4.5" />
    </svg>
  );
}
