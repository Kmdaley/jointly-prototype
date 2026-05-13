import { motion } from 'framer-motion';

interface AnnotationToggleProps {
  visible: boolean;
  onChange: (visible: boolean) => void;
}

/**
 * The pill-style toggle that sits above each screen. Uses a shared
 * Framer Motion layoutId to slide the white indicator between options.
 */
export function AnnotationToggle({ visible, onChange }: AnnotationToggleProps) {
  return (
    <div
      className="annotation-toggle"
      role="tablist"
      aria-label="Annotation visibility"
    >
      <button
        type="button"
        role="tab"
        aria-selected={visible}
        className={`annotation-toggle__btn ${
          visible ? 'annotation-toggle__btn--active' : ''
        }`}
        onClick={() => onChange(true)}
      >
        {visible && (
          <motion.span
            layoutId="annotation-toggle-indicator"
            className="annotation-toggle__indicator"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        <span className="annotation-toggle__label">Show annotations</span>
      </button>

      <span className="annotation-toggle__divider" aria-hidden />

      <button
        type="button"
        role="tab"
        aria-selected={!visible}
        className={`annotation-toggle__btn ${
          !visible ? 'annotation-toggle__btn--active' : ''
        }`}
        onClick={() => onChange(false)}
      >
        {!visible && (
          <motion.span
            layoutId="annotation-toggle-indicator"
            className="annotation-toggle__indicator"
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          />
        )}
        <span className="annotation-toggle__label">Hide annotations</span>
      </button>
    </div>
  );
}
