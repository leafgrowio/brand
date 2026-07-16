import type { ChangeEventHandler } from "react";

/**
 * Props for `Input` — a Canvas text field with a hairline border and
 * `radius.md` corners. Coral is the active/focus state; Ember carries
 * errors, and the error message replaces the help text below the field.
 *
 * @startingPoint
 */
export interface InputProps {
  /** Label rendered above the field. */
  label?: string;
  /** Controlled value. */
  value?: string;
  /** Initial value for an uncontrolled field. */
  defaultValue?: string;
  /** Placeholder shown when the field is empty. */
  placeholder?: string;
  /** Help text rendered below the field. Replaced by `error` when set. */
  help?: string;
  /** Error message. When set, the field takes the Ember border and this message replaces `help`. */
  error?: string;
  /** Disables the field and dims the label, border, and text. */
  disabled?: boolean;
  /** Element id, also used to associate the label. */
  id?: string;
  /** Form field name. */
  name?: string;
  /** Native input type. */
  type?: string;
  /** Change handler. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export declare function Input(props: InputProps): JSX.Element;
