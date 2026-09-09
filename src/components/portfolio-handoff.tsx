import Image from "next/image";
import type { PortfolioConfig } from "@/lib/portfolio";
import { Arrow } from "./editorial";

export function PortfolioHandoff({ config }: { config: PortfolioConfig }) {
  const project = config.next;
  if (!project && !config.allWorkHref) return null;
  return (
    <aside className="portfolio-handoff" aria-label="Continue exploring">
      <div className="page-width">
        <p className="portfolio-intro">Continue exploring</p>
        {project && (
          <article>
            <p className="eyebrow">Next project</p>
            <a href={project.href} className="portfolio-project">
              <div className="portfolio-visual">
                <Image
                  src={project.image}
                  alt={project.imageAlt}
                  fill
                  sizes="(min-width: 1320px) 1224px, 100vw"
                />
              </div>
              <h2>{project.title}</h2>
              <p className="small-copy">
                {project.category} / {project.year}
              </p>
              <p className="body-copy">{project.description}</p>
              <span className="text-link">
                View project <Arrow />
              </span>
            </a>
          </article>
        )}
        {config.allWorkHref && (
          <a className="text-link" href={config.allWorkHref}>
            View all work <Arrow />
          </a>
        )}
      </div>
    </aside>
  );
}
