import type { MouseEventHandler, ReactNode } from "react";

/**
 * Props for `SidebarItem` — a single row in the primary navigation sidebar.
 * The only Coral signal in the app shell: active items get a tint fill,
 * Coral text and icon, and an inset left accent. Collapses to a 36×36
 * icon-only tile when the sidebar is minimised.
 *
 * @startingPoint
 */
export interface SidebarItemProps {
  /** A 19×19 stroke icon element (stroke-width 1.7, round caps/joins). Rendered inside a fixed-size slot. */
  icon: ReactNode;
  /** Visible label. Becomes the `title`/`aria-label` when `collapsed` is true. */
  label: string;
  /** Marks this item as the current page: tint fill, Coral text/icon, 3px inset accent, `aria-current="page"`. */
  active?: boolean;
  /** Optional count shown as a right-aligned Coral-tint pill. Hidden when `collapsed` is true. */
  count?: number;
  /** Destination URL. Defaults to `"#"`. */
  href?: string;
  /** Click handler, e.g. for client-side routing. */
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  /** Renders a 36×36 icon-only tile with the label moved to `title`/`aria-label`. */
  collapsed?: boolean;
}

export declare function SidebarItem(props: SidebarItemProps): JSX.Element;
