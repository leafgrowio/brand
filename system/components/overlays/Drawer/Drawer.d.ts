import type { ReactNode } from "react";

/**
 * Edge-anchored panel over the Ink scrim (`--leaf-scrim`) for scoped, longer
 * tasks that should keep the page in view. Square outer corners against the
 * viewport edge — no radius, unlike Modal.
 */
export interface DrawerProps {
  /** Whether the drawer is open. The component returns null when false. */
  open: boolean;
  /** Panel title, rendered in the header row next to the close button. */
  title: string;
  /** Scrollable body content. */
  children?: ReactNode;
  /** Called on × click or a click on the scrim. */
  onClose?: () => void;
  /** Footer content, typically one full-width Coral confirm button. */
  footer?: ReactNode;
  /** Which viewport edge the panel is anchored to. */
  side?: "right" | "left";
}

export declare function Drawer(props: DrawerProps): JSX.Element;
