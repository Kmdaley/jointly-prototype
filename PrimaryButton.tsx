import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Filled purple CTA button.
 *
 * Use for the primary action in a flow — "Generate Report", "Continue",
 * "Compare Offers" etc. Inherits all standard button props.
 */
export function PrimaryButton({ children, className, ...rest }: PrimaryButtonProps) {
  return (
    <button className={`btn btn--primary ${className ?? ''}`} {...rest}>
      {children}
    </button>
  );
}
