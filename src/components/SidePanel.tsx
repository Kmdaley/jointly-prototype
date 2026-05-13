import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface SidePanelProps {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: ReactNode;
  footer: ReactNode;
}

/**
 * Right-side overlay panel that slides in. Uses an Apple-style ease curve
 * (0.32, 0.72, 0, 1) for a smoother, calmer arrival than a spring would give.
 */
export function SidePanel({
  title,
  subtitle,
  onClose,
  children,
  footer,
}: SidePanelProps) {
  return (
    <motion.div
      className="side-panel"
      role="dialog"
      aria-label={title}
      aria-modal="true"
      initial={{ x: '100%', opacity: 0.6 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100%', opacity: 0.6 }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
    >
      <div className="side-panel__header">
        <h2 className="side-panel__title">{title}</h2>
        <button
          type="button"
          className="side-panel__close"
          onClick={onClose}
          aria-label="Close panel"
        >
          <CloseIcon />
        </button>
      </div>
      {subtitle && <p className="side-panel__subtitle">{subtitle}</p>}
      <div className="side-panel__body">{children}</div>
      <div className="side-panel__footer">{footer}</div>
    </motion.div>
  );
}

function CloseIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M2 2 L12 12 M12 2 L2 12" />
    </svg>
  );
}
