import type { ChangeEventHandler, ReactNode } from "react";

/** A single option — a plain string, or an explicit `{ value, label }` pair. */
export type SelectOption = string | { value: string; label: ReactNode };

/**
 * Props for `Select` — matches `Input`'s field styling with a trailing
 * chevron affordance over a real `<select>`. The chevron is decorative;
 * the native element carries the click and keyboard behaviour.
 */
export interface SelectProps {
  /** Label rendered above the field. */
  label?: string;
  /** Options, each a plain string or `{ value, label }`. */
  options?: SelectOption[];
  /** Controlled value. */
  value?: string;
  /** Initial value for an uncontrolled field. */
  defaultValue?: string;
  /** Disables the field and dims the label, border, and text. */
  disabled?: boolean;
  /** Help text rendered below the field. Replaced by `error` when set. */
  help?: string;
  /** Error message. When set, the field takes the Ember border and this message replaces `help`. */
  error?: string;
  /** Element id, also used to associate the label. */
  id?: string;
  /** Form field name. */
  name?: string;
  /** Change handler. */
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

export declare function Select(props: SelectProps): JSX.Element;
