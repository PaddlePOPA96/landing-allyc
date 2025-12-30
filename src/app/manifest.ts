import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'RRQ Allyc',
        short_name: 'Allyc',
        description: 'Official website of RRQ Allyc (Jasmine Allyc).',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/logo-rrq.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    }
}
