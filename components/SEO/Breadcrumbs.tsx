import Link from "next/link";

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate JSON-LD for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item:
        item.href === "#"
          ? undefined
          : `https://dospordosgrupoimagen.com${item.href}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <ol className="breadcrumbs__list">
          {items.map((item, index) => (
            <li key={index} className="breadcrumbs__item">
              {index < items.length - 1 ? (
                <Link href={item.href} className="breadcrumbs__link">
                  {item.name}
                </Link>
              ) : (
                <span className="breadcrumbs__current" aria-current="page">
                  {item.name}
                </span>
              )}
              {index < items.length - 1 && (
                <span className="breadcrumbs__separator" aria-hidden="true">
                  /
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
