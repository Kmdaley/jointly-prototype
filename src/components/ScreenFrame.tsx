import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AnnotationHotspot } from './AnnotationHotspot';
import type { Annotation } from '../types';

interface CtaHotzone {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  onClick: () => void;
}

interface ScreenFrameProps {
  image: string;
  imageKey: string;
  annotations: Annotation[];
  showAnnotations: boolean;
  dim: boolean;
  ctaHotzones?: CtaHotzone[];
  overlay?: ReactNode;
  topLayer?: ReactNode;
}

/**
 * Clean Apple-product-page laptop presentation.
 *
 *   .screen-frame                      ← aspect 2528:1335, no transforms
 *     <img className="__chrome" />     ← laptop frame PNG (bezel + chin + hinge)
 *     .screen-frame__screen            ← screen viewport (overflow:hidden)
 *       <img className="__image" />    ← UI screenshot, object-fit: contain
 *       .screen-frame__inner           ← annotations, CTAs, panels
 *
 * No perspective, no tilt, no parallax, no ambient float. Slide changes
 * crossfade on opacity only.
 */
export function ScreenFrame({
  image,
  imageKey,
  annotations,
  showAnnotations,
  dim,
  ctaHotzones = [],
  overlay,
  topLayer,
}: ScreenFrameProps) {
  return (
    <div className="screen-frame">
      <img
        src="/laptop-frame.png"
        alt=""
        className="screen-frame__chrome"
        draggable={false}
      />

      <div className="screen-frame__screen">
        <AnimatePresence mode="sync">
          <motion.img
            key={imageKey}
            src={image}
            alt=""
            className="screen-frame__image"
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>

        <div className="screen-frame__inner">
          <AnimatePresence>
            {dim && (
              <motion.div
                className="screen-frame__inner-dim"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
              />
            )}
          </AnimatePresence>

          {ctaHotzones.map((zone, i) => (
            <button
              key={`${imageKey}-cta-${i}`}
              type="button"
              className="cta-hotzone"
              aria-label={zone.label}
              onClick={zone.onClick}
              style={{
                left: `${zone.x}%`,
                top: `${zone.y}%`,
                width: `${zone.width}%`,
                height: `${zone.height}%`,
              }}
            />
          ))}

          <div className="screen-frame__annotations">
            <AnimatePresence>
              {showAnnotations &&
                annotations.map((annotation, i) => (
                  <AnnotationHotspot
                    key={annotation.id}
                    annotation={annotation}
                    index={i}
                  />
                ))}
            </AnimatePresence>
          </div>

          {topLayer}

          <div className="screen-frame__overlay">
            <AnimatePresence>{overlay}</AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
