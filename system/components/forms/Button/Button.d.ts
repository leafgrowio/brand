import type { MouseEventHandler, ReactNode } from "react";

/**
 * Props for `Button` — a pill-shaped action button set in Mona Sans 600.
 * `primary` is solid Coral for the one decisive action on a view;
 * `secondary` stays visually lighter (Coral outline, transparent fill) so
 * it never competes with it.
 *
 * @startingPoint
 */
export interface ButtonProps {
  /** Visual treatment. Only one `primary` button should appear per view. */
  variant?: "primary" | "secondary";
  /** Button size. */
  size?: "sm" | "md" | "lg";
  /** Disables interaction and dims the button to 40% opacity. */
  disabled?: boolean;
  /** Optional icon rendered before the label with an 8px gap. */
  icon?: ReactNode;
  /** Click handler. */
  onClick?: MouseEventHandler<HTMLButtonElement>;
  /** Button label content. */
  children?: ReactNode;
  /** Native button type. */
  type?: "button" | "submit" | "reset";
}

export declare function Button(props: ButtonProps): JSX.Element;
