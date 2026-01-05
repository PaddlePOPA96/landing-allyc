export default function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        dateCreated: '2025-01-01T00:00:00+07:00',
        dateModified: new Date().toISOString(),
        mainEntity: {
            '@type': 'Person',
            name: 'Jasmine Allyc',
            alternateName: 'RRQ Allyc',
            description: 'Valorant Streamer & Content Creator',
            url: 'https://allyc.vercel.app',
            image: 'https://allyc.vercel.app/hero-image.webp',
            sameAs: [
                'https://www.instagram.com/jasmine.allyc/',
                'https://www.tiktok.com/@jasmine.mat',
                'https://www.youtube.com/@Allyccc',
                'https://saweria.co/Allyc'
            ],
            jobTitle: 'Streamer',
            worksFor: {
                '@type': 'Organization',
                name: 'RRQ'
            }
        }
    }

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    )
}
