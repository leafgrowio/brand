import type { ReactNode } from "react";

/** A single column definition. */
export interface TableColumn {
  /** Key used to look up each row's value for this column. */
  key: string;
  /** Header label. */
  label: string;
  /** Explicit text alignment; defaults to `"right"` when `numeric` is true, `"left"` otherwise. */
  align?: "left" | "right";
  /** Renders the column right-aligned with tabular figures. */
  numeric?: boolean;
}

/** A rich cell value — use in place of a plain primitive to add a swatch, heat colour, or delta arrow. */
export interface TableCellValue {
  /** Displayed value. `null`/`undefined`/empty renders an em-dash in muted text. */
  value?: ReactNode;
  /** CSS colour for a small 9×9 dimension swatch rendered before the value. */
  swatch?: string;
  /** CSS colour used as the cell's background, e.g. a step on the diverging heatmap scale. */
  heat?: string;
  /** Renders a coloured delta arrow before the value: `up` is Fern ▲, `down` is Ember ▼. */
  delta?: "up" | "down";
}

/**
 * Props for `Table` — a real `<table>` with a quiet Stone-faint header,
 * tabular-figure numeric columns, and optional heatmap/delta cell styling.
 *
 * @startingPoint
 */
export interface TableProps {
  /** Column definitions, in display order. */
  columns: TableColumn[];
  /** Row data; each row is keyed by column `key`. A cell may be a plain value, `null`/`undefined`, or a `TableCellValue`. */
  rows: Array<Record<string, ReactNode | TableCellValue | null | undefined>>;
  /** Applies alternating Stone-faint row shading. */
  zebra?: boolean;
  /** Visually-hidden `<caption>` describing the table for assistive tech. */
  caption?: string;
}

export declare function Table(props: TableProps): JSX.Element;
