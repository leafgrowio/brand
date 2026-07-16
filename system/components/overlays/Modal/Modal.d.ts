import type { ReactNode } from "react";

/**
 * Centred, scrim-backed dialog for a single decision. Renders nothing when
 * `open` is false. Sits on the Ink scrim (`--leaf-scrim`) — Modal is one of
 * the two overlays allowed to dim the page (the other is Drawer).
 *
 * One decision per modal. A destructive confirm uses Ember
 * (`--leaf-color-state-error`), never Coral; Cancel stays neutral (Ink text,
 * `1px rgba(23,20,18,0.16)` border, pill).
 * @startingPoint
 */
export interface ModalProps {
  /** Whether the modal is open. The component returns null when false. */
  open: boolean;
  /** Dialog title, rendered in the header row next to the close button. */
  title: string;
  /** Modal body content. */
  children?: ReactNode;
  /** Called on × click, Esc, or a click on the scrim. */
  onClose?: () => void;
  /** Footer actions (e.g. Cancel + confirm), right-aligned with a 10px gap. Build the buttons yourself so you control which is primary/destructive. */
  actions?: ReactNode;
  /** Documentation-only hint that this modal represents a destructive decision. Has no visual effect on Modal itself — style the destructive button inside `actions` with Ember, never Coral. */
  destructive?: boolean;
}

export declare function Modal(props: ModalProps): JSX.Element;
