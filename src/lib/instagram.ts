export interface InstagramPost {
    id: string;
    media_url: string;
    permalink: string;
    caption?: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    thumbnail_url?: string; // For videos
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN;

    if (!token) {
        console.warn("INSTAGRAM_ACCESS_TOKEN is not set. Using static data.");
        return [];
    }

    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${token}`;

    try {
        const response = await fetch(url, {
            next: { revalidate: 3600 }, // Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Instagram posts: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data.slice(0, 6); // Return latest 6 posts
    } catch (error) {
        console.error("Error fetching Instagram posts:", error);
        return [];
    }
}
