import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, addDoc } from 'firebase/firestore';

// Instagram username - hardcoded untuk jasmine.allyc
const INSTAGRAM_USERNAME = "jasmine.allyc";

export interface InstagramPost {
    media_url: string;
    permalink: string;
    caption?: string;
    media_type?: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
}

export async function GET() {
    try {
        let posts: InstagramPost[] = [];
        const source = "scraping";

        console.log("Starting Instagram sync via scraping...");

        try {
            const url = `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;
            const response = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                },
                next: { revalidate: 0 }
            });

            if (response.ok) {
                const html = await response.text();
                posts = parseInstagramHTML(html);
            } else {
                console.error("Failed to fetch Instagram page:", response.status);
            }
        } catch (scrapeError) {
            console.error("Scraping failed:", scrapeError);
        }

        // Fallback to Imginn if direct scraping failed
        if (posts.length === 0) {
            console.log("Direct scraping failed, trying Imginn fallback...");
            try {
                const url = `https://imginn.com/${INSTAGRAM_USERNAME}/`;
                const response = await fetch(url, {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
                    },
                });

                if (response.ok) {
                    const html = await response.text();
                    posts = parseImginnHTML(html);
                }
            } catch (e) {
                console.error("Imginn fallback failed:", e);
            }
        }

        if (posts.length === 0) {
            return NextResponse.json({
                success: false,
                message: "No posts found via scraping (Instagram & Fallback). Please try again later or add manual posts."
            }, { status: 404 });
        }

        // Sync to Firebase
        let addedCount = 0;
        const postsCollection = collection(db, "posts");

        for (const post of posts) {
            if (!post.media_url || !post.permalink) continue;

            // Check if exists
            const q = query(postsCollection, where("permalink", "==", post.permalink));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.empty) {
                await addDoc(postsCollection, {
                    media_url: post.media_url,
                    permalink: post.permalink,
                    createdAt: new Date(),
                    caption: post.caption || "",
                    media_type: post.media_type || "IMAGE",
                    source: source
                });
                addedCount++;
            }
        }

        // Clear cache
        if (addedCount > 0) {
            const { clearCache } = await import("@/lib/cache");
            clearCache("instagram_posts");
        }

        return NextResponse.json({
            success: true,
            source,
            found: posts.length,
            added: addedCount,
            message: `Successfully synced. Found ${posts.length} posts, added ${addedCount} new posts.`
        });

    } catch (error) {
        console.error('Instagram sync error:', error);
        return NextResponse.json({
            success: false,
            error: error instanceof Error ? error.message : "Failed to sync posts",
        }, { status: 500 });
    }
}

function parseImginnHTML(html: string): InstagramPost[] {
    const posts: InstagramPost[] = [];
    try {
        // Simple regex to find items
        // Imginn structure: <div class="item"><a href="/p/CODE/"><img src="URL" ...></a></div>
        const itemRegex = /<div class="item">([\s\S]*?)<\/div>/g;
        let match;

        while ((match = itemRegex.exec(html)) !== null) {
            const itemHtml = match[1];
            const linkMatch = itemHtml.match(/href="\/p\/([^"]+)\/"/);
            const imgMatch = itemHtml.match(/src="([^"]+)"/);
            const altMatch = itemHtml.match(/alt="([^"]*)"/); // caption often in alt

            if (linkMatch && imgMatch) {
                posts.push({
                    permalink: `https://www.instagram.com/p/${linkMatch[1]}/`,
                    media_url: imgMatch[1].replace(/&amp;/g, '&'), // Unescape entities
                    media_type: "IMAGE", // Assume image for simplicity, imginn usually serves thumbs for videos
                    caption: altMatch ? altMatch[1] : ""
                });
            }
        }
    } catch (e) {
        console.error("Error parsing Imginn:", e);
    }
    return posts.slice(0, 12);
}

function parseInstagramHTML(html: string): InstagramPost[] {
    const posts: InstagramPost[] = [];

    try {
        // Instagram embeds data in script tag
        const scriptMatch = html.match(/<script type="application\/ld\+json">[\s\S]*?<\/script>/);

        if (scriptMatch) {
            try {
                const data = JSON.parse(scriptMatch[1]);

                // Extract from structured data
                if (data['@type'] === 'ProfilePage' && data.mainEntity) {
                    const images = data.mainEntity.image || [];

                    for (const img of images.slice(0, 12)) {
                        if (typeof img === 'object' && img.url) {
                            posts.push({
                                media_url: img.url,
                                permalink: `https://www.instagram.com/p/${extractPostId(img.url)}/`,
                                media_type: "IMAGE"
                            });
                        }
                    }
                }
            } catch (e) {
                console.error("Error parsing JSON LD:", e);
            }
        }

        // Fallback: try to extract from shared data
        if (posts.length === 0) {
            const sharedDataMatch = html.match(/window\._sharedData = ({.*?});<\/script>/);
            if (sharedDataMatch) {
                try {
                    const sharedData = JSON.parse(sharedDataMatch[1]);
                    const edges = sharedData?.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges || [];

                    for (const edge of edges.slice(0, 12)) {
                        const node = edge.node;
                        if (node) {
                            posts.push({
                                media_url: node.display_url,
                                permalink: `https://www.instagram.com/p/${node.shortcode}/`,
                                media_type: node.is_video ? "VIDEO" : "IMAGE",
                                caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || ""
                            });
                        }
                    }
                } catch (e) {
                    console.error("Error parsing Shared Data:", e);
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
