import type { MouseEventHandler, ReactNode } from "react";

/**
 * Props for `Tag` — a utility chip for labels, counts, and filters. Unlike
 * `Badge`, tags carry no state-palette meaning; they use the neutral Stone
 * or Coral-tint treatments.
 */
export interface TagProps {
  /** Visual treatment. `removable` renders a trailing close button. */
  variant?: "neutral" | "featured" | "count" | "removable";
  /** Called when the close button is activated. Only used when `variant="removable"`. */
  onRemove?: MouseEventHandler<HTMLButtonElement>;
  /** Label content. */
  children: ReactNode;
}

export declare function Tag(props: TagProps): JSX.Element;
