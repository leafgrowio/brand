import type { ChangeEventHandler } from "react";

/**
 * Props for `Checkbox` — a real `<input type="checkbox">` visually hidden
 * beneath a styled 22×22 box. Checked fills the box solid Coral with a
 * white check mark; the focus ring lands on the styled box via a
 * `:focus-visible` sibling selector on the real input.
 */
export interface CheckboxProps {
  /** Label rendered beside the box. */
  label?: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state for an uncontrolled checkbox. */
  defaultChecked?: boolean;
  /** Disables interaction and dims the whole control to 40% opacity. */
  disabled?: boolean;
  /** Change handler. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Element id. */
  id?: string;
  /** Form field name. */
  name?: string;
}

export declare function Checkbox(props: CheckboxProps): JSX.Element;
