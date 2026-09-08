import type { ReactNode } from "react";
import Image from "next/image";

export function Eyebrow({
  children,
  className = "",
  reveal = false,
}: {
  children: ReactNode;
  className?: string;
  reveal?: boolean;
}) {
  return (
    <p
      className={`eyebrow ${className}`}
      data-reveal={reveal ? "eyebrow" : undefined}
    >
      {children}
    </p>
  );
}
export function Arrow() {
  return (
    <span className="link-arrow" aria-hidden="true">
      →
    </span>
  );
}
export function BeginLink({
  children = "Check in with yourself",
  className = "",
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a className={`button ${className}`} href="#the-practice">
      {children}
    </a>
  );
}
export function Photograph({
  name,
  alt,
  priority = false,
  className = "",
  children,
}: {
  name: "hero" | "pause" | "privacy";
  alt: string;
  priority?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={`photograph photograph-${name} ${className}`}
      data-reveal={name === "hero" ? undefined : name}
    >
      <Image
        src={`/images/${name}.webp`}
        alt={alt}
        fill
        sizes={
          name === "pause"
            ? "(min-width: 1024px) 66vw, 100vw"
            : "(min-width: 1024px) 40vw, 100vw"
        }
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
      {children}
    </div>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <div className="page-width flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 lg:py-0">
        <a className="wordmark" href="#main" aria-label="MORI home">
          MORI
        </a>
        <span className="header-tagline">
          A quiet mental wellness companion
        </span>
        <nav aria-label="Main navigation" className="main-nav">
          <a href="#philosophy">Philosophy</a>
          <a href="#the-practice">The Practice</a>
          <a href="#privacy">Privacy</a>
          <a href="#the-practice" className="nav-begin">
            Begin with MORI <Arrow />
          </a>
        </nav>
      </div>
    </header>
  );
}
