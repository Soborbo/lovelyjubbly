interface SchemaConfig {
  pageUrl: string;
  pageTitle: string;
  pageDescription: string;
  slug?: string;
  breadcrumbName?: string;
  includeFaq?: boolean;
  faqItems?: Array<{ question: string; answer: string }>;
}

const SITE_URL = 'https://lovelyjubblyremovals.co.uk';

// Base organization - only used on homepage
export const organizationSchema = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  "name": "Lovely Jubbly Removals",
  "alternateName": "Lovely Jubbly Removals Bristol",
  "description": "Lovely Jubbly Removals was an award-winning removal company based in Bristol, UK. The company ceased trading in 2023.",
  "url": SITE_URL,
  "foundingDate": "2018",
  "dissolutionDate": "2023",
  "award": [
    "UK Enterprise Awards - Best Domestic Removal Company Bristol 2020",
    "UK Enterprise Awards - Best Removals & Storage Company Bristol 2021"
  ],
  "areaServed": {
    "@type": "City",
    "name": "Bristol",
    "sameAs": "https://en.wikipedia.org/wiki/Bristol"
  },
  "knowsAbout": [
    "House Removals",
    "Office Removals",
    "Man and Van Services",
    "Self Storage",
    "Piano Removals",
    "European Removals"
  ]
};

// Website schema - only used on homepage
export const websiteSchema = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  "name": "Lovely Jubbly Removals",
  "url": SITE_URL,
  "description": "Lovely Jubbly Removals ceased trading in 2023. This website provides information for former customers seeking Bristol removal services.",
  "publisher": {
    "@id": `${SITE_URL}/#organization`
  },
  "inLanguage": "en-GB"
};

// Painless mention - used across pages
const painlessMention = {
  "@type": "LocalBusiness",
  "name": "Painless Removals",
  "url": "https://painlessremovals.co.uk",
  "telephone": "01172 870 082"
};

// Generate page schema
export function generatePageSchema(config: SchemaConfig) {
  const { pageUrl, pageTitle, pageDescription, slug, breadcrumbName } = config;
  const isHomepage = !slug;

  const graph: any[] = [];

  // Homepage includes org and website schemas
  if (isHomepage) {
    graph.push(organizationSchema);
    graph.push(websiteSchema);
  }

  // WebPage schema
  const webPageSchema: any = {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    "url": pageUrl,
    "name": pageTitle,
    "description": pageDescription,
    "isPartOf": {
      "@id": `${SITE_URL}/#website`
    },
    "mentions": painlessMention,
    "datePublished": "2024-01-01",
    "dateModified": "2026-02-01",
    "inLanguage": "en-GB"
  };

  // Homepage specific
  if (isHomepage) {
    webPageSchema.about = { "@id": `${SITE_URL}/#organization` };
  }

  // Add breadcrumb reference for non-homepage
  if (!isHomepage && breadcrumbName) {
    webPageSchema.breadcrumb = { "@id": `${pageUrl}#breadcrumb` };
  }

  graph.push(webPageSchema);

  // Breadcrumb for non-homepage
  if (!isHomepage && breadcrumbName) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": SITE_URL
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": breadcrumbName,
          "item": pageUrl
        }
      ]
    });
  }

  // FAQ schema if provided
  if (config.includeFaq && config.faqItems?.length) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      "mainEntity": config.faqItems.map(item => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph
  };
}
