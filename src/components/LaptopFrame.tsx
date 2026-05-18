import type { ReactNode } from 'react';

interface Props {
  /** Content rendered inside the laptop's screen viewport (clipped). */
  children: ReactNode;
  /** Overlay rendered at the screen viewport's position with overflow visible —
   *  for side panels that may extend past the screen's right edge. */
  overlay?: ReactNode;
}

/**
 * LaptopFrame
 * ------------------------------------------------------------------
 * Pure presentational component. Renders the laptop chrome with the
 * screen content positioned precisely inside the bezel.
 *
 * The asset is a transparent PNG (public/laptop-frame.png, ~2.019:1),
 * so a CSS box-shadow can render a soft natural shadow under the
 * laptop chassis without showing a rectangular halo around the asset.
 *
 * Screen viewport position inside the PNG (measured directly from the
 * asset's actual transparency mask):
 *     left:   17.499%
 *     top:     6.692%
 *     width:  65.934%
 *     height: 83.045%
 *
 * Adjust these in index.css via the --screen-* custom properties if
 * the asset ever changes.
 */
export function LaptopFrame({ children, overlay }: Props) {
  return (
    <div className="laptop-frame">
      <img
        src="/laptop-frame.png"
        alt=""
        className="laptop-frame__chrome"
        draggable={false}
      />
      <div className="laptop-frame__screen">{children}</div>
      {overlay && <div className="laptop-frame__overlay">{overlay}</div>}
    </div>
  );
}
