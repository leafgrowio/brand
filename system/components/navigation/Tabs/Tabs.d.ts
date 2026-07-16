/** A single tab in a `Tabs` control. */
export interface TabItem {
  /** Stable identifier, matched against `activeId`. */
  id: string;
  /** Visible label. */
  label: string;
}

/**
 * Props for `Tabs` — slices an already-loaded page into sections.
 * Never use for top-level app navigation; that's `SidebarItem`.
 */
export interface TabsProps {
  /** The tabs to render, in order. */
  tabs: TabItem[];
  /** The `id` of the currently active tab. */
  activeId: string;
  /** Called with the `id` of the tab the user selected (click or arrow-key navigation). */
  onChange: (id: string) => void;
}

export declare function Tabs(props: TabsProps): JSX.Element;
