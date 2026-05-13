import { motion } from 'framer-motion';

interface AnnotationCalloutProps {
  title: string;
  body: string;
  placement: 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Floating callout card revealed on hover/focus of a hotspot. Replaces the
 * persistent label chip while open, occupying the same anchor position.
 */
export function AnnotationCallout({ title, body, placement }: AnnotationCalloutProps) {
  return (
    <motion.div
      className={`callout callout--${placement}`}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.12 } }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      role="tooltip"
    >
      <p className="callout__title">{title}</p>
      <p className="callout__body">{body}</p>
    </motion.div>
  );
}
