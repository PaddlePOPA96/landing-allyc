import { db } from "./firebase";
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, query, orderBy } from "firebase/firestore";

// Instagram Posts
export const addPost = async (image: string, permalink: string) => {
    try {
        const docRef = await addDoc(collection(db, "posts"), {
            media_url: image,
            permalink,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding post: ", e);
        throw e;
    }
};

export const getPosts = async () => {
    const { getCachedData, setCachedData, CACHE_CONFIG } = await import("./cache");

    // Check cache first
    const cached = getCachedData("instagram_posts", CACHE_CONFIG.INSTAGRAM_POSTS);
    if (cached) return cached;

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Cache the result
    setCachedData("instagram_posts", posts);
    return posts;
};

export const deletePost = async (id: string) => {
    await deleteDoc(doc(db, "posts", id));
};

// Sponsors
export const addSponsor = async (image: string, link: string) => {
    try {
        const docRef = await addDoc(collection(db, "sponsors"), {
            imageUrl: image,
            link,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding sponsor: ", e);
        throw e;
    }
};

export const getSponsors = async () => {
    const { getCachedData, setCachedData, CACHE_CONFIG } = await import("./cache");

    const cached = getCachedData("sponsors", CACHE_CONFIG.SPONSORS);
    if (cached) return cached;

    const q = query(collection(db, "sponsors"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const sponsors = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setCachedData("sponsors", sponsors);
    return sponsors;
};

export const deleteSponsor = async (id: string) => {
    await deleteDoc(doc(db, "sponsors", id));
};

// YouTube Videos
export const addYoutubeVideo = async (videoUrl: string, thumbnailUrl: string, title: string, views: string) => {
    try {
        const docRef = await addDoc(collection(db, "youtube_videos"), {
            videoUrl,
            thumbnailUrl,
            title,
            views,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding video: ", e);
        throw e;
    }
};

export const getYoutubeVideos = async () => {
    const { getCachedData, setCachedData, CACHE_CONFIG } = await import("./cache");

    const cached = getCachedData("youtube_videos", CACHE_CONFIG.YOUTUBE_VIDEOS);
    if (cached) return cached;

    const q = query(collection(db, "youtube_videos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const videos = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setCachedData("youtube_videos", videos);
    return videos;
};

export const deleteYoutubeVideo = async (id: string) => {
    await deleteDoc(doc(db, "youtube_videos", id));
};

// Gear
export const addGear = async (image: string, name: string, category: string, link: string) => {
    try {
        const docRef = await addDoc(collection(db, "gear"), {
            imageUrl: image,
            name,
            category,
            link,
            createdAt: new Date(),
        });
        return docRef.id;
    } catch (e) {
        console.error("Error adding gear: ", e);
        throw e;
    }
};

export const getGear = async () => {
    const { getCachedData, setCachedData, CACHE_CONFIG } = await import("./cache");

    const cached = getCachedData("gear", CACHE_CONFIG.GEAR);
    if (cached) return cached;

    const q = query(collection(db, "gear"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    const gear = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    setCachedData("gear", gear);
    return gear;
};

export const deleteGear = async (id: string) => {
    await deleteDoc(doc(db, "gear", id));
};

// Social Stats
export interface SocialConfig {
    instagramStats: string;
    youtubeStats: string;
    instagramLink: string;
    tiktokLink: string;
    whatsappLink: string;
    discordLink: string;
}

export const getSocialStats = async (): Promise<SocialConfig> => {
    const { getCachedData, setCachedData, CACHE_CONFIG } = await import("./cache");

    // Check cache first
    const cached = getCachedData<SocialConfig>("social_stats", CACHE_CONFIG.SOCIAL_STATS);
    if (cached) {
        return cached;
    }

    const docRef = doc(db, "configs", "social_stats");
    const { getDoc } = await import("firebase/firestore");

    try {
        // Create a timeout promise that rejects after 5 seconds to prevent hanging
        const timeout = new Promise<never>((_, reject) => {
            const id = setTimeout(() => {
                clearTimeout(id);
                reject(new Error("Firebase fetch timeout"));
            }, 5000);
        });

        // Race the fetch against the timeout
        const docSnap = await Promise.race([
            getDoc(docRef),
            timeout
        ]) as Awaited<ReturnType<typeof getDoc>>;

        if (docSnap.exists()) {
            const data = docSnap.data() as SocialConfig;
            // Cache the result
            setCachedData("social_stats", data);
            return data;
        } else {
            throw new Error("Social stats not initialized in Firebase. Please run the initialization script or set values in the dashboard.");
        }
    } catch (e) {
        console.error("Error fetching social stats from Firebase:", e);
        throw e;
    }
};

export const updateSocialStats = async (data: SocialConfig) => {
    const docRef = doc(db, "configs", "social_stats");
    const { setDoc } = await import("firebase/firestore");
    await setDoc(docRef, {
        ...data,
        updatedAt: new Date(),
    }, { merge: true });
};
