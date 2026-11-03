import { LogoMark } from "./icons";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={light ? "logo logo-light" : "logo"}
      href="#top"
      aria-label="New England Haven Home Watch"
    >
      <span className="logo-mark">
        <LogoMark />
      </span>
      <span>
        <strong>NEW ENGLAND HAVEN</strong>
        <small>HOME WATCH</small>
      </span>
    </a>
  );
}
