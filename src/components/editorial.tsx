import type { ReactNode } from "react";
import Image from "next/image";

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
export function Arrow() {
  return <span aria-hidden="true">→</span>;
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
    <div className={`photograph photograph-${name} ${className}`}>
      <Image
        src={`/images/${name}.webp`}
        alt={alt}
        fill
        sizes={
          name === "pause"
            ? "(min-width: 1024px) 66vw, 100vw"
            : "(min-width: 1024px) 40vw, 100vw"
        }
        preload={priority}
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
