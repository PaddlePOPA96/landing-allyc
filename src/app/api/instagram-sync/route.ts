import { NextResponse } from 'next/server';

// Instagram username - hardcoded untuk jasmine.allyc
const INSTAGRAM_USERNAME = "jasmine.allyc";

export async function GET() {
    try {
        // Note: Instagram tidak menyediakan RSS feed publik
        // Kita akan gunakan scraping sederhana dari halaman publik

        const url = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

        const response = await fetch(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            next: { revalidate: 0 }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch Instagram page');
        }

        const html = await response.text();

        // Extract posts dari shared data
        const posts = parseInstagramHTML(html);

        return NextResponse.json({
            success: true,
            posts
        });

    } catch (error) {
        console.error('Instagram scraping error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch posts",
            message: "Instagram scraping might be blocked. Please add posts manually via dashboard."
        }, { status: 500 });
    }
}

function parseInstagramHTML(html: string) {
    const posts = [];

    try {
        // Instagram embeds data in script tag
        const scriptMatch = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/);

        if (scriptMatch) {
            const data = JSON.parse(scriptMatch[1]);

            // Extract from structured data
            if (data['@type'] === 'ProfilePage' && data.mainEntity) {
                const images = data.mainEntity.image || [];

                for (const img of images.slice(0, 12)) {
                    if (typeof img === 'object' && img.url) {
                        posts.push({
                            media_url: img.url,
                            permalink: `https://www.instagram.com/p/${extractPostId(img.url)}/`,
                        });
                    }
                }
            }
        }

        // Fallback: try to extract from shared data
        if (posts.length === 0) {
            const sharedDataMatch = html.match(/window\._sharedData = ({.*?});<\/script>/);
            if (sharedDataMatch) {
                const sharedData = JSON.parse(sharedDataMatch[1]);
                const edges = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges || [];

                for (const edge of edges.slice(0, 12)) {
                    const node = edge.node;
                    posts.push({
                        media_url: node.display_url,
                        permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                    });
                }
            }
        }
    } catch (e) {
        console.error('Error parsing Instagram HTML:', e);
    }

    return posts;
}

function extractPostId(url: string): string {
    // Try to extract post ID from image URL
    const match = url.match(/\/p\/([\w-]+)\//);
    return match ? match[1] : 'unknown';
}
