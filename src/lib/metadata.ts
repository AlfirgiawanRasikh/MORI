import type { Metadata } from "next";

const title = "MORI | A quieter place to begin";
const description =
  "A quieter way to understand how you feel and find one small thing to do next. An independent mental wellness concept.";
export function releaseMetadata(
  productionUrl?: string,
  socialImage?: string,
): Metadata {
  const metadata: Metadata = {
    title,
    description,
    applicationName: "MORI",
    robots: { index: false, follow: false },
  };
  if (!productionUrl) return metadata;
  const base = new URL(productionUrl);
  if (base.protocol !== "https:")
    throw new Error(
      "MORI_PRODUCTION_URL must be a verified HTTPS production URL.",
    );
  return {
    ...metadata,
    metadataBase: base,
    alternates: { canonical: "/" },
    openGraph: {
      type: "website",
      title,
      description,
      siteName: "MORI",
      url: "/",
      images: socialImage
        ? [
            {
              url: socialImage,
              width: 1200,
              height: 630,
              alt: "MORI. Less thinking. More grounding.",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: socialImage ? [socialImage] : undefined,
    },
  };
}
