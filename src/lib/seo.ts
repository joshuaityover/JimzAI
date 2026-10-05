export const SITE_URL = "https://jimzai.lovable.app";

export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  type?: string;
  noindex?: boolean;
}) {
  const url = `${SITE_URL}${opts.path}`;
  const meta: Array<Record<string, string>> = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:title", content: opts.title },
    { property: "og:description", content: opts.description },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:url", content: url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: opts.title },
    { name: "twitter:description", content: opts.description },
  ];
  if (opts.noindex) meta.push({ name: "robots", content: "noindex" });
  return { meta, links: opts.noindex ? [] : [{ rel: "canonical", href: url }] };
}

export function breadcrumbLd(items: Array<{ name: string; path: string }>) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((it, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: it.name,
        item: `${SITE_URL}${it.path}`,
      })),
    }),
  };
}
