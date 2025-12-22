import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;
        const CHANNEL_ID = process.env.YOUTUBE_CHANNEL_ID;

        if (!YOUTUBE_API_KEY || !CHANNEL_ID) {
            return NextResponse.json({
                success: false,
                error: "YouTube API key or Channel ID not configured"
            }, { status: 500 });
        }

        // Fetch latest videos from YouTube
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=10&type=video`,
            { next: { revalidate: 0 } } // Don't cache
        );

        if (!response.ok) {
            throw new Error('Failed to fetch from YouTube API');
        }

        const data = await response.json();

        // Transform to our format
        const videos = data.items.map((item: any) => ({
            videoId: item.id.videoId,
            videoUrl: `https://www.youtube.com/watch?v=${item.id.videoId}`,
            thumbnailUrl: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.default?.url,
            title: item.snippet.title,
            publishedAt: item.snippet.publishedAt,
        }));

        return NextResponse.json({
            success: true,
            videos
        });

    } catch (error) {
        console.error('YouTube API error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to fetch videos"
        }, { status: 500 });
    }
}
