/**
 * YouTube Sync Script
 * 
 * Fetches latest videos from YouTube RSS feed and adds them to Firebase
 * 
 * Usage: npm run sync-youtube
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, addDoc, query, orderBy } = require("firebase/firestore");
const https = require('https');
require('dotenv').config({ path: '.env.local' });

// Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// YouTube channel ID - ganti dengan channel ID Anda
const CHANNEL_ID = "UCxvJZITRthNHAf8Vo_RbPpQ"; // @Allyccc

function fetchYouTubeRSS(channelId) {
    return new Promise((resolve, reject) => {
        const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;

        https.get(url, (res) => {
            let data = '';

            res.on('data', (chunk) => {
                data += chunk;
            });

            res.on('end', () => {
                resolve(data);
            });
        }).on('error', (err) => {
            reject(err);
        });
    });
}

function parseYouTubeRSS(xml) {
    const videos = [];

    // Simple regex parsing (works for YouTube RSS)
    const entryRegex = /<entry>(.*?)<\/entry>/gs;
    const entries = xml.match(entryRegex) || [];

    entries.forEach(entry => {
        const videoId = entry.match(/<yt:videoId>(.*?)<\/yt:videoId>/)?.[1];
        const title = entry.match(/<title>(.*?)<\/title>/)?.[1];
        const published = entry.match(/<published>(.*?)<\/published>/)?.[1];

        if (videoId && title) {
            // Decode HTML entities in title
            const decodedTitle = title
                .replace(/&amp;/g, '&')
                .replace(/&lt;/g, '<')
                .replace(/&gt;/g, '>')
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'");

            videos.push({
                videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
                thumbnailUrl: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
                title: decodedTitle,
                views: "Recent", // RSS doesn't provide view count
                publishedAt: new Date(published)
            });
        }
    });

    return videos;
}

async function syncYouTube() {
    try {
        console.log("🎬 Fetching latest YouTube videos...");

        // Fetch RSS feed
        const rssData = await fetchYouTubeRSS(CHANNEL_ID);
        const videos = parseYouTubeRSS(rssData);

        console.log(`📺 Found ${videos.length} videos from RSS feed`);

        // Get existing videos from Firebase
        const q = query(collection(db, "youtube_videos"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const existingUrls = new Set(querySnapshot.docs.map(doc => doc.data().videoUrl));

        // Add new videos
        let addedCount = 0;
        for (const video of videos) {
            if (!existingUrls.has(video.videoUrl)) {
                await addDoc(collection(db, "youtube_videos"), {
                    videoUrl: video.videoUrl,
                    thumbnailUrl: video.thumbnailUrl,
                    title: video.title,
                    views: video.views,
                    createdAt: new Date(),
                });
                console.log(`✅ Added: ${video.title}`);
                addedCount++;
            }
        }

        if (addedCount === 0) {
            console.log("✨ No new videos to add. All up to date!");
        } else {
            console.log(`\n🎉 Successfully added ${addedCount} new video(s)!`);
        }

        process.exit(0);
    } catch (error) {
        console.error("❌ Error syncing YouTube:", error);
        process.exit(1);
    }
}

// Run the sync
syncYouTube();
