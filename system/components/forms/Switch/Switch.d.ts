import type { ChangeEventHandler } from "react";

/**
 * Props for `Switch` — a 44×26 pill toggle exposed as `role="switch"` with
 * `aria-checked` kept in sync. The 20px Canvas thumb slides from 3px to
 * 21px on a `--leaf-motion-base` transition; the track goes from Stone
 * hairline (off) to solid Coral (on).
 */
export interface SwitchProps {
  /** Optional label rendered beside the track. */
  label?: string;
  /** Controlled checked state. */
  checked?: boolean;
  /** Initial checked state for an uncontrolled switch. */
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

export declare function Switch(props: SwitchProps): JSX.Element;
