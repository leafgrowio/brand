import type { ReactNode } from "react";

/**
 * Props for `Badge` — a status badge built from the state palette. The
 * soft tint fill, tinted border, and solid dot always share the same
 * state colour so the badge still communicates when colour is removed;
 * always render the dot alongside the label.
 */
export interface BadgeProps {
  /** Status state — drives the tint fill, border, and dot colour. */
  state?: "success" | "warning" | "error" | "info";
  /** Label content, set in Ink regardless of state. */
  children: ReactNode;
}

export declare function Badge(props: BadgeProps): JSX.Element;
