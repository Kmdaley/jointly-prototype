interface PaginationProps {
  total: number;
  current: number;
  /** Whether autoplay is active — drives the icon swap and progress fill. */
  isPlaying: boolean;
  /** Toggle play / pause. */
  onTogglePlay: () => void;
  /** Manual jump to a specific step (should pause autoplay in the parent). */
  onJump: (index: number) => void;
}

/**
 * Bottom step pagination.
 *
 *   [• • • ▬ • •]  [▶ / ⏸]
 *
 * - The active step is rendered as a wider bar. While autoplay is running it
 *   fills with a thin progress line over 5 seconds, driven by a CSS
 *   animation. The mount/unmount cycle of the progress element handles
 *   restart on slide change and on play/pause toggling.
 * - The play button shows ▶ when paused/stopped, ⏸ while playing.
 *
 * Animation duration is in CSS (`pagination-progress` keyframes); keep it in
 * sync with AUTOPLAY_DURATION_MS in src/data/prototypeData.ts.
 */
export function Pagination({
  total,
  current,
  isPlaying,
  onTogglePlay,
  onJump,
}: PaginationProps) {
  return (
    <div className="pagination" role="group" aria-label="Step pagination">
      <div className="pagination__dots">
        {Array.from({ length: total }).map((_, i) => {
          const isCurrent = i === current;
          return (
            <button
              key={i}
              type="button"
              className={`pagination__dot ${
                isCurrent ? 'pagination__dot--active' : ''
              }`}
              onClick={() => onJump(i)}
              aria-label={`Go to step ${i + 1}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {isCurrent && isPlaying && (
                <span className="pagination__dot-progress" aria-hidden />
              )}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        className="pagination__btn"
        onClick={onTogglePlay}
        aria-label={isPlaying ? 'Pause autoplay' : 'Start autoplay'}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M3 1.5 L10 6 L3 10.5 Z" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="currentColor"
      aria-hidden="true"
    >
      <rect x="2.75" y="2" width="2.25" height="8" rx="0.5" />
      <rect x="7" y="2" width="2.25" height="8" rx="0.5" />
    </svg>
  );
}
