import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, image, url }) => {
    const siteTitle = 'PonteTIME | Official Store';
    const siteDescription = 'Discover our curated collection of certified pre-owned luxury watches. Rolex, Omega, Patek Philippe, and more.';
    const siteUrl = 'https://pontetime.com'; // Placeholder domain
    const defaultImage = '/images/hero_patek_studio.png';

    const fullTitle = title ? `${title} | PonteTIME` : siteTitle;

    // For the home page or when title is specifically requested to be first
    const displayTitle = title ? `PonteTIME — ${title}` : siteTitle;
    const fullDescription = description || siteDescription;
    const fullImage = image ? (image.startsWith('http') ? image : `${siteUrl}${image}`) : `${siteUrl}${defaultImage}`;
    const fullUrl = url ? `${siteUrl}${url}` : siteUrl;

    return (
        <Helmet>
            {/* Standard Metadata */}
            <title>{displayTitle}</title>
            <meta name="description" content={fullDescription} />
            <link rel="canonical" href={fullUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={fullUrl} />
            <meta property="og:title" content={displayTitle} />
            <meta property="og:description" content={fullDescription} />
            <meta property="og:image" content={fullImage} />

            {/* Twitter */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={fullUrl} />
            <meta property="twitter:title" content={displayTitle} />
            <meta property="twitter:description" content={fullDescription} />
            <meta property="twitter:image" content={fullImage} />
        </Helmet>
    );
};

export default SEO;
