import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnnotationCallout } from './AnnotationCallout';
import type { Annotation } from '../types';

interface AnnotationHotspotProps {
  annotation: Annotation;
  /** Stagger index — used to delay the entrance animation. */
  index?: number;
}

/**
 * Annotation hotspot composition:
 *
 *   ┌────────────────────────────────────┐
 *   │  [●]  ◀── label chip (default)      │
 *   │  [●]  ◀── full callout on hover     │
 *   └────────────────────────────────────┘
 *
 * - The dot scales in with a spring on mount, staggered by `index`.
 * - The label chip slides in slightly behind the dot from the placement
 *   direction, giving a coordinated reveal.
 * - On hover/focus, the chip fades out and the full callout (title + body)
 *   fades in, occupying the same anchor position.
 */
export function AnnotationHotspot({ annotation, index = 0 }: AnnotationHotspotProps) {
  const [open, setOpen] = useState(false);

  const placement = annotation.placement ?? 'right';

  // Direction the chip slides in from, mirrored by placement
  const chipInitial = (() => {
    switch (placement) {
      case 'left':   return { opacity: 0, x: 6  };
      case 'right':  return { opacity: 0, x: -6 };
      case 'top':    return { opacity: 0, y: 6  };
      case 'bottom': return { opacity: 0, y: -6 };
    }
  })();

  return (
    <motion.div
      className="hotspot"
      style={{ left: `${annotation.x}%`, top: `${annotation.y}%` }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => setOpen(true)}
      onHoverEnd={() => setOpen(false)}
    >
      {/* The numbered dot — springs in */}
      <motion.button
        type="button"
        className="hotspot__dot"
        data-active={open}
        aria-label={`Annotation ${annotation.number}: ${annotation.title}. ${annotation.body}`}
        aria-expanded={open}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onClick={() => setOpen((v) => !v)}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{
          delay: index * 0.09,
          type: 'spring',
          stiffness: 320,
          damping: 22,
          mass: 0.6,
        }}
      >
        <span className="hotspot__pulse" aria-hidden />
        {annotation.number}
      </motion.button>

      {/* Default state: label chip beside the dot.
          Hover state: chip swaps out for the full callout. */}
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.div
            key="label"
            className={`hotspot__label hotspot__label--${placement}`}
            initial={chipInitial}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{
              delay: index * 0.09 + 0.18,
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {annotation.label}
          </motion.div>
        ) : (
          <AnnotationCallout
            key="callout"
            title={annotation.title}
            body={annotation.body}
            placement={placement}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}
