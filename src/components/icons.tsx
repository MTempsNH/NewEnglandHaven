import type { ReactNode } from "react";

type IconProps = {
  size?: number;
  className?: string;
};

const stroke = {
  fill: "none" as const,
  xmlns: "http://www.w3.org/2000/svg",
};

function Group({ children }: { children: ReactNode }) {
  return (
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7">
      {children}
    </g>
  );
}

export function LogoMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48">
      <path d="m5 24 19-15 19 15M10 21v12M38 21v12M17 33v-9h14v9M5 35c5-3 9 3 14 0s9 3 14 0 7 1 10 0M8 41c5-3 9 3 14 0s9 3 14 0" />
    </svg>
  );
}

export function ArrowRight({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </Group>
    </svg>
  );
}

export function ShieldCheck({ size = 22 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="M12 22s8-3 8-10V5l-8-3-8 3v7c0 7 8 10 8 10Z" />
        <path d="m9 12 2 2 4-4" />
      </Group>
    </svg>
  );
}

export function House({ size = 26 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10M9 20v-6h6v6" />
      </Group>
    </svg>
  );
}

export function Droplet({ size = 26 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="M12 2S5 10 5 15a7 7 0 0 0 14 0c0-5-7-13-7-13Z" />
      </Group>
    </svg>
  );
}

export function Key({ size = 26 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <circle cx="8" cy="15" r="4" />
        <path d="m11 12 8-8M16 7l2 2M14 9l2 2" />
      </Group>
    </svg>
  );
}

export function Leaf({ size = 26 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="M20 4C12 4 5 8 5 15c0 3 2 5 5 5 7 0 10-8 10-16Z" />
        <path d="M4 21c3-6 7-9 12-12" />
      </Group>
    </svg>
  );
}

export function Calendar({ size = 20 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="M6 2v4M18 2v4M3 9h18" />
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M8 13h3M8 17h6" />
      </Group>
    </svg>
  );
}

export function Check({ size = 14 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="m5 12 4 4L19 6" />
      </Group>
    </svg>
  );
}

export function Thermometer({ size = 19 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="M14 14.8V5a4 4 0 0 0-8 0v9.8a6 6 0 1 0 8 0Z" />
        <path d="M10 12V6" />
      </Group>
    </svg>
  );
}

export function Menu({ size = 24 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="M4 7h16M4 12h16M4 17h16" />
      </Group>
    </svg>
  );
}

export function Close({ size = 24 }: IconProps) {
  return (
    <svg aria-hidden="true" {...stroke} height={size} viewBox="0 0 24 24" width={size}>
      <Group>
        <path d="M6 6l12 12M18 6 6 18" />
      </Group>
    </svg>
  );
}
