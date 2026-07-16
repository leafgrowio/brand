import type { ReactElement } from "react";

/**
 * Props for `Tooltip` — a presentational label shown on hover/focus of its
 * trigger. Never interactive and never the sole carrier of essential
 * information.
 */
export interface TooltipProps {
  /** Tooltip text. */
  label: string;
  /** The trigger element. Receives an `aria-describedby` pointing at the tooltip. */
  children: ReactElement;
  /** Which side of the trigger the tooltip appears on. */
  position?: "top" | "bottom" | "left" | "right";
}

export declare function Tooltip(props: TooltipProps): JSX.Element;
