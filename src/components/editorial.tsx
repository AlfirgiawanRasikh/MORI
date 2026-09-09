import type { ReactNode } from "react";
import Image from "next/image";
import { Wordmark } from "./wordmark";

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
      <picture>
        <source
          type="image/webp"
          srcSet={(name === "hero"
            ? [400, 640, 848]
            : name === "pause"
              ? [400, 640, 960, 1280, 1376]
              : [400, 640, 960, 1200]
          )
            .map(
              (width, index, widths) =>
                `/images/${name}${index === widths.length - 1 ? "" : `-${width}`}.webp ${width}w`,
            )
            .join(", ")}
          sizes={
            name === "hero"
              ? "(min-width: 1320px) 470px, (min-width: 640px) 40vw, calc(100vw - 68px)"
              : name === "pause"
                ? "(min-width: 1320px) 750px, (min-width: 640px) 60vw, calc(100vw - 48px)"
                : "(min-width: 1320px) 470px, (min-width: 640px) 40vw, calc(100vw - 48px)"
          }
        />
        <Image
          src={`/images/${name}.webp`}
          alt={alt}
          fill
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
        />
      </picture>
      {children}
    </div>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <div className="page-width flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4 lg:py-0">
        <a className="wordmark" href="#main" aria-label="MORI home">
          <Wordmark />
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
