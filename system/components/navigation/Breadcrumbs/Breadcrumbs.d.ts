/** A single crumb in a `Breadcrumbs` trail. */
export interface BreadcrumbItem {
  /** Visible label. */
  label: string;
  /** Destination URL. Omit on the last item — it renders as the current page, not a link. */
  href?: string;
}

/**
 * Props for `Breadcrumbs` — shows the user's position in a hierarchy.
 * Ancestors render as Coral links; the last item is the current page.
 */
export interface BreadcrumbsProps {
  /** The trail, in order from root to current page. The last item is always treated as current. */
  items: BreadcrumbItem[];
}

export declare function Breadcrumbs(props: BreadcrumbsProps): JSX.Element;
