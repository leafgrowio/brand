import type { ReactNode } from "react";

/** A single actionable row in a Menu. */
export interface MenuItemAction {
  /** Visible label. */
  label: string;
  /** Optional 16×16 stroke icon, supplied by the consumer (e.g. the pencil/duplicate/export/trash glyphs). */
  icon?: ReactNode;
  /** Renders the item in Ember with a hairline divider convention — pair with a `"divider"` entry immediately before it. */
  destructive?: boolean;
  /** Called when the item is chosen. */
  onSelect?: () => void;
}

/**
 * Anchor-free, presentational action list from a trigger (rename/duplicate/
 * export/delete style menus). No scrim — Menu never dims the page.
 */
export interface MenuProps {
  /** Ordered list of actions, or the literal `"divider"` to insert a hairline rule (typically just before a destructive item). */
  items: Array<MenuItemAction | "divider">;
  /** Whether the menu is rendered. The component returns null when false. */
  open?: boolean;
}

export declare function Menu(props: MenuProps): JSX.Element;
