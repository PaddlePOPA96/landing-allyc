/**
 * Firebase Data Initialization Script
 * 
 * This script initializes the social configuration data in Firebase.
 * Run this once to populate your Firebase database with initial values.
 * 
 * Usage:
 * 1. Make sure you're authenticated in your Firebase project
 * 2. Run: npx ts-node scripts/init-firebase-data.ts
 * 
 * Or use the dashboard to manually enter these values.
 */

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

// Firebase configuration - using environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initial social configuration data
const initialSocialConfig = {
    instagramStats: "83k",
    youtubeStats: "49.3k",
    instagramLink: "https://www.instagram.com/jasmine.allyc/",
    tiktokLink: "#",
    whatsappLink: "https://wa.me/6281190052125",
    discordLink: "#",
    createdAt: new Date(),
    updatedAt: new Date(),
};

async function initializeData() {
    try {
        console.log("🚀 Initializing Firebase data...");

        // Set social stats configuration
        const socialStatsRef = doc(db, "configs", "social_stats");
        await setDoc(socialStatsRef, initialSocialConfig, { merge: true });

        console.log("✅ Social configuration initialized successfully!");
        console.log("📊 Data:", initialSocialConfig);
        console.log("\n💡 You can now update these values through the dashboard at /dashboard/stats");

        process.exit(0);
    } catch (error) {
        console.error("❌ Error initializing data:", error);
        process.exit(1);
    }
}

// Run the initialization
initializeData();
