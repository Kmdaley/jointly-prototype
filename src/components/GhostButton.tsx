import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface GhostButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Outlined secondary button — typically used for "Cancel" or non-destructive
 * alternative actions that sit next to a PrimaryButton.
 */
export function GhostButton({ children, className, ...rest }: GhostButtonProps) {
  return (
    <button className={`btn btn--ghost ${className ?? ''}`} {...rest}>
      {children}
    </button>
  );
}
