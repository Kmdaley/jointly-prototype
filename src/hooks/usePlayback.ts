import { useCallback, useEffect, useRef, useState } from 'react';

interface UsePlaybackOptions {
  /** Duration of the current section in ms. */
  duration: number;
  /** Whether playback is active. */
  isPlaying: boolean;
  /** Called when the section's timer completes. */
  onComplete: () => void;
}

/**
 * Drives a smooth 0→1 progress value for the current section.
 *
 * Uses requestAnimationFrame for fluid progress, and supports
 * pause/resume by tracking accumulated elapsed time. When the
 * section, duration, or play state changes, the timer is reset
 * appropriately so manual navigation feels instantaneous.
 */
export function usePlayback({ duration, isPlaying, onComplete }: UsePlaybackOptions) {
  const [progress, setProgress] = useState(0);
  const elapsedRef = useRef(0);
  const lastTickRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reset elapsed time whenever the duration changes (i.e. section change).
  useEffect(() => {
    elapsedRef.current = 0;
    setProgress(0);
    lastTickRef.current = null;
  }, [duration]);

  useEffect(() => {
    if (!isPlaying) {
      // Pause: stop the rAF loop but keep elapsedRef.
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      lastTickRef.current = null;
      return;
    }

    const tick = (now: number) => {
      if (lastTickRef.current === null) lastTickRef.current = now;
      const delta = now - lastTickRef.current;
      lastTickRef.current = now;
      elapsedRef.current += delta;

      const next = Math.min(1, elapsedRef.current / duration);
      setProgress(next);

      if (next >= 1) {
        onCompleteRef.current();
        return;
      }
      frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [isPlaying, duration]);

  const reset = useCallback(() => {
    elapsedRef.current = 0;
    lastTickRef.current = null;
    setProgress(0);
  }, []);

  return { progress, reset };
}
