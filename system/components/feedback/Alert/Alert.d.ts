import type { ReactNode } from "react";

/**
 * Props for `Alert` — one structure across four states: soft tint fill,
 * 1px tinted border, 3px solid left accent, a solid state-colour round
 * badge, and Ink message text. Coral never appears in an alert.
 */
export interface AlertProps {
  /** State — drives the tint fill, border, left accent, and badge colour/glyph. */
  state?: "info" | "success" | "warning" | "error";
  /** Bold lead-in naming what happened. */
  title?: ReactNode;
  /** The consequence — regular-weight copy that follows the title. */
  children: ReactNode;
}

/** `role` is set automatically: `"alert"` for `warning`/`error`, `"status"` otherwise. */
export declare function Alert(props: AlertProps): JSX.Element;
