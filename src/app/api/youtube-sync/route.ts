import { NextResponse } from 'next/server';

// Channel ID - hardcoded untuk channel Allyc
const CHANNEL_ID = "UCjqLfPpZetlzUye-ia1cixQ";

export async function GET() {
    try {
        // Fetch RSS feed dari YouTube (gratis, no API key needed!)
        const rssUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

        const response = await fetch(rssUrl, {
            next: { revalidate: 0 }, // Don't cache
            headers: {
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch YouTube RSS feed');
        }

        const xmlText = await response.text();

        // Parse XML sederhana untuk extract video data
        const videos = parseYouTubeRSS(xmlText);

        return NextResponse.json({
            success: true,
            videos
        });

    } catch (error) {
        console.error('YouTube RSS error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch videos"
        }, { status: 500 });
    }
}

function parseYouTubeRSS(xml: string) {
    const videos = [];

    // Simple regex parsing untuk YouTube RSS
    const entryRegex = /<entry>[\s\S]*?<\/entry>/g;
    const entries = xml.match(entryRegex) || [];

    for (const entry of entries.slice(0, 10)) { // Ambil 10 terbaru
        const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
        const title = entry.match(/<title>(.*?)<\/title>/)?.[1];

        if (videoId && title) {
            // Decode HTML entities
            const decodedTitle = title
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");

            videos.push({
                videoId,
                videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                title: decodedTitle,
            });
        }
    }

    return videos;
}
