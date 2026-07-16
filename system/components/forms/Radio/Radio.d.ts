import type { ChangeEventHandler } from "react";

/**
 * Props for `Radio` — a real `<input type="radio">` visually hidden beneath
 * a styled 22×22 circle. Checked rings the circle in Coral and reveals an
 * 11px Coral dot; the focus ring lands on the styled circle via a
 * `:focus-visible` sibling selector on the real input.
 */
export interface RadioProps {
  /** Label rendered beside the circle. */
  label?: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state for an uncontrolled radio. */
  defaultChecked?: boolean;
  /** Disables interaction and dims the whole control to 40% opacity. */
  disabled?: boolean;
  /** Group name — radios sharing a `name` form one mutually exclusive set. */
  name?: string;
  /** Value submitted when this radio is checked. */
  value?: string;
  /** Change handler. */
  onChange?: ChangeEventHandler<HTMLInputElement>;
  /** Element id. */
  id?: string;
}

export declare function Radio(props: RadioProps): JSX.Element;
