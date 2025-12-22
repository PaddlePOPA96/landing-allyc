/**
 * Instagram Sync Script
 * 
 * Note: Instagram doesn't provide a public RSS feed.
 * This script helps you quickly add posts by providing URLs.
 * 
 * Usage: npm run sync-instagram
 */

const { initializeApp } = require("firebase/app");
const { getFirestore, collection, getDocs, addDoc, query, orderBy } = require("firebase/firestore");
const readline = require('readline');
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

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function question(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

async function addInstagramPost(imageUrl, permalink) {
    try {
        await addDoc(collection(db, "posts"), {
            media_url: imageUrl,
            permalink: permalink,
            createdAt: new Date(),
        });
        return true;
    } catch (error) {
        console.error("Error adding post:", error);
        return false;
    }
}

async function syncInstagram() {
    console.log("📸 Instagram Post Sync Tool");
    console.log("============================\n");
    console.log("💡 Tip: Go to https://www.instagram.com/jasmine.allyc/");
    console.log("   Right-click on a post → 'Copy image address' for image URL");
    console.log("   Click post → Copy URL from browser for permalink\n");

    // Get existing posts
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const existingPermalinks = new Set(querySnapshot.docs.map(doc => doc.data().permalink));

    console.log(`📊 Currently have ${existingPermalinks.size} posts in database\n`);

    let addedCount = 0;

    while (true) {
        console.log("\n--- Add New Post ---");

        const imageUrl = await question("Image URL (or 'done' to finish): ");
        if (imageUrl.toLowerCase() === 'done') break;

        const permalink = await question("Post URL (permalink): ");

        if (!imageUrl || !permalink) {
            console.log("⚠️  Both URLs are required!");
            continue;
        }

        if (existingPermalinks.has(permalink)) {
            console.log("⚠️  This post already exists!");
            continue;
        }

        const success = await addInstagramPost(imageUrl, permalink);
        if (success) {
            console.log("✅ Post added successfully!");
            existingPermalinks.add(permalink);
            addedCount++;
        } else {
            console.log("❌ Failed to add post");
        }
    }

    console.log(`\n🎉 Sync complete! Added ${addedCount} new post(s).`);
    rl.close();
    process.exit(0);
}

// Run the sync
syncInstagram();
