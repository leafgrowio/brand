import type { ReactNode } from "react";

/** The optional Coral text action shown below a Popover's body. */
export interface PopoverAction {
  /** Action label, e.g. "Change baseline". */
  label: string;
  /** Called when the action is chosen. */
  onClick?: () => void;
}

/**
 * Rich, interactive content anchored to its trigger with a small beak. No
 * scrim — the page stays live behind it.
 */
export interface PopoverProps {
  /** Optional title, rendered above the body. */
  title?: string;
  /** Popover body content. */
  children?: ReactNode;
  /** Optional Coral text action below the body. */
  action?: PopoverAction;
  /** Which corner the beak points from. */
  beak?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
}

export declare function Popover(props: PopoverProps): JSX.Element;
