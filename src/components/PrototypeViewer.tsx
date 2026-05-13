import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ScreenFrame } from './ScreenFrame';
import { AnnotationToggle } from './AnnotationToggle';
import { Pagination } from './Pagination';
import { SelectOffersPanel } from './SelectOffersPanel';
import { OfferControlsPanel } from './OfferControlsPanel';
import {
  steps,
  stepOrder,
  offers,
  AUTOPLAY_DURATION_MS,
} from '../data/prototypeData';
import type { StepId, OfferId, ActionId } from '../types';

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const;

/**
 * Cinematic mount choreography:
 *   t=0.00s  title fades in + rises
 *   t=0.10s  annotation toggle fades in
 *   t=0.20s  laptop stage reveals (opacity + scale 0.96 → 1 + y 24 → 0)
 *   t=0.50s  pagination fades in
 *   t=1.20s  laptop begins infinite ambient float (±6 px over 8 s)
 *
 * The stage is a single centered laptop with no transforms or ambient motion —
 * a clean Apple-product-page presentation:
 *
 *   .stage
 *     .stage__intro       ← fade-in on mount (opacity only)
 *       .stage__floater   ← static wrapper for centering
 *         <ScreenFrame />
 */
export function PrototypeViewer() {
  const [currentStepId, setCurrentStepId] = useState<StepId>('dashboard');
  const [annotationsVisible, setAnnotationsVisible] = useState(false);
  const [selectedOffers, setSelectedOffers] = useState<OfferId[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<OfferId | null>(null);
  const [selectedAction, setSelectedAction] = useState<ActionId | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const currentIndex = stepOrder.indexOf(currentStepId);
  const currentStep = steps[currentIndex];
  const isLastStep = currentIndex >= stepOrder.length - 1;

  // ---------------------------------------------------------------------------
  // Navigation
  // ---------------------------------------------------------------------------
  const pauseAutoplay = () => setIsPlaying(false);

  const goTo = (id: StepId) => {
    pauseAutoplay();
    setCurrentStepId(id);
  };

  const jumpTo = (index: number) => {
    if (index < 0 || index >= stepOrder.length) return;
    goTo(stepOrder[index]);
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (isLastStep) {
      setCurrentStepId(stepOrder[0]);
    }
    setIsPlaying(true);
  };

  // ---------------------------------------------------------------------------
  // Autoplay timer
  // ---------------------------------------------------------------------------
  useEffect(() => {
    if (!isPlaying) return;
    if (isLastStep) {
      setIsPlaying(false);
      return;
    }
    const timer = setTimeout(() => {
      setCurrentStepId(stepOrder[currentIndex + 1]);
    }, AUTOPLAY_DURATION_MS);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStepId, currentIndex, isLastStep]);

  // ---------------------------------------------------------------------------
  // Panel interactions — each pauses autoplay
  // ---------------------------------------------------------------------------
  const toggleOffer = (id: OfferId) => {
    pauseAutoplay();
    setSelectedOffers((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleCompareAll = () => {
    pauseAutoplay();
    setSelectedOffers((prev) =>
      prev.length === offers.length ? [] : offers.map((o) => o.id)
    );
  };

  const handleSelectOffer = (id: OfferId) => {
    pauseAutoplay();
    setSelectedOffer(id);
  };

  const handleSelectAction = (id: ActionId) => {
    pauseAutoplay();
    setSelectedAction(id);
  };

  const closeSelectOffers = () => goTo('offer-workspace');
  const closeOfferControls = () => goTo('comparison-report');

  const handleGenerateReport = () => {
    if (selectedOffers.length < 2) return;
    goTo('comparison-report');
  };

  const handleControlsContinue = () => {
    if (!selectedOffer || !selectedAction) return;
    if (selectedAction === 'map-signatures') {
      goTo('document-mapping');
    }
  };

  // ---------------------------------------------------------------------------
  // CTA hot-zones (percentages of the inner UI area — the TRUE screen content,
  // not including the bezel). Adjust values here if any hot-zone visibly drifts
  // off its baked-in button across viewport sizes.
  // ---------------------------------------------------------------------------
  const ctaHotzones = useMemo(() => {
    switch (currentStepId) {
      case 'dashboard':
        return [
          {
            label: 'View offers',
            x: 81, y: 7, width: 12, height: 10,
            onClick: () => goTo('offer-workspace'),
          },
        ];
      case 'offer-workspace':
        return [
          {
            label: 'Compare offers',
            x: 77, y: 32, width: 14, height: 8,
            onClick: () => goTo('select-offers'),
          },
        ];
      case 'comparison-report':
        return [
          {
            label: 'Open offer controls',
            x: 82, y: 18, width: 12, height: 9,
            onClick: () => goTo('offer-controls'),
          },
        ];
      default:
        return [];
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStepId]);

  // ---------------------------------------------------------------------------
  // Document Mapping toast
  // ---------------------------------------------------------------------------
  const [showFieldsToast, setShowFieldsToast] = useState(false);

  useEffect(() => {
    if (currentStepId !== 'document-mapping') {
      setShowFieldsToast(false);
      return;
    }
    const showT = setTimeout(() => setShowFieldsToast(true), 400);
    const hideT = setTimeout(() => setShowFieldsToast(false), 4200);
    return () => {
      clearTimeout(showT);
      clearTimeout(hideT);
    };
  }, [currentStepId]);

  // ---------------------------------------------------------------------------
  // Overlay (side panel + dim backdrop)
  // ---------------------------------------------------------------------------
  const overlay = (() => {
    if (currentStep.overlayPanel === 'select-offers') {
      return (
        <>
          <motion.div
            className="panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
            onClick={closeSelectOffers}
          />
          <SelectOffersPanel
            selectedOffers={selectedOffers}
            onToggleOffer={toggleOffer}
            onToggleCompareAll={toggleCompareAll}
            onGenerate={handleGenerateReport}
            onClose={closeSelectOffers}
          />
        </>
      );
    }
    if (currentStep.overlayPanel === 'offer-controls') {
      return (
        <>
          <motion.div
            className="panel-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
            onClick={closeOfferControls}
          />
          <OfferControlsPanel
            selectedOffer={selectedOffer}
            selectedAction={selectedAction}
            onSelectOffer={handleSelectOffer}
            onSelectAction={handleSelectAction}
            onContinue={handleControlsContinue}
            onClose={closeOfferControls}
          />
        </>
      );
    }
    return null;
  })();

  const topLayer = (
    <AnimatePresence>
      {showFieldsToast && currentStepId === 'document-mapping' && (
        <motion.div
          className="fields-detected-toast"
          initial={{ opacity: 0, y: -10, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.96 }}
          transition={{ duration: 0.5, ease: EASE_OUT_QUART }}
        >
          <span className="fields-detected-toast__dot" aria-hidden />
          Fields detected automatically
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="app">
      {/* Title — crossfades on step change */}
      <AnimatePresence mode="wait">
        <motion.h1
          key={currentStep.title}
          className="app__title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT_QUART }}
        >
          {currentStep.title}
        </motion.h1>
      </AnimatePresence>

      {/* Annotation toggle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.1, ease: EASE_OUT_QUART }}
      >
        <AnnotationToggle
          visible={annotationsVisible}
          onChange={setAnnotationsVisible}
        />
      </motion.div>

      {/* Stage — clean Apple-product-page presentation */}
      <div className="stage">
        <motion.div
          className="stage__intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1, ease: EASE_OUT_QUART }}
        >
          <div className="stage__floater">
            <ScreenFrame
              image={currentStep.baseImage}
              imageKey={currentStep.id}
              annotations={currentStep.annotations}
              showAnnotations={
                annotationsVisible && currentStep.annotations.length > 0
              }
              dim={currentStep.overlayPanel !== null}
              ctaHotzones={ctaHotzones}
              overlay={overlay}
              topLayer={topLayer}
            />
          </div>
        </motion.div>
      </div>

      {/* Pagination */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.3, ease: EASE_OUT_QUART }}
      >
        <Pagination
          total={stepOrder.length}
          current={currentIndex}
          isPlaying={isPlaying}
          onTogglePlay={togglePlay}
          onJump={jumpTo}
        />
      </motion.div>
    </div>
  );
}
