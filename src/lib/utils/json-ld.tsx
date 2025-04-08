import type { Thing, WithContext } from 'schema-dts';

export type JsonLdProps = {
    code: WithContext<Thing>;
};

export const JsonLd = ({ code }: JsonLdProps) => (
    <script
        key="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(code) }}
    />
);

// Re-export schema-dts types for convenience
export type {
    Article,
    BlogPosting,
    BreadcrumbList,
    Organization,
    Product,
    WebSite,
    WithContext,
} from 'schema-dts';

// Helper function to create URL strings for schema
export const createSchemaUrl = (url: URL | string) => {
    if (url instanceof URL) {
        return url.toString();
    }
    return url;
};

// Helper to create organization schema
export const createOrganizationSchema = (url: URL | string) => ({
    '@type': 'Organization' as const,
    name: 'Pekáreň Kromka',
    url: createSchemaUrl(url),
    logo: {
        '@type': 'ImageObject' as const,
        url: `${createSchemaUrl(url)}/images/kromka-logo.png`
    }
});
