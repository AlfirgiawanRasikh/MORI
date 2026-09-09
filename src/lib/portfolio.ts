export type PortfolioProject = {
  title: string;
  category: string;
  year: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
};
export type PortfolioConfig = { next?: PortfolioProject; allWorkHref?: string };
// Supply verified project content and destinations before rendering this handoff.
export const portfolio: PortfolioConfig = {};
