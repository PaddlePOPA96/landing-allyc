// Cache configuration for Firebase data
export const CACHE_CONFIG = {
    // Cache duration in milliseconds
    SOCIAL_STATS: 5 * 60 * 1000, // 5 minutes
    INSTAGRAM_POSTS: 10 * 60 * 1000, // 10 minutes
    YOUTUBE_VIDEOS: 24 * 60 * 60 * 1000, // 24 hours (1 day)
    SPONSORS: 30 * 60 * 1000, // 30 minutes
    GEAR: 30 * 60 * 1000, // 30 minutes
};

// Simple in-memory cache
const cache = new Map<string, { data: any; timestamp: number }>();

export function getCachedData<T>(key: string, maxAge: number): T | null {
    const cached = cache.get(key);
    if (!cached) return null;

    const age = Date.now() - cached.timestamp;
    if (age > maxAge) {
        cache.delete(key);
        return null;
    }

    return cached.data as T;
}

export function setCachedData(key: string, data: any): void {
    cache.set(key, {
        data,
        timestamp: Date.now(),
    });
}

export function clearCache(key?: string): void {
    if (key) {
        cache.delete(key);
    } else {
        cache.clear();
    }
}

// Helper to clear all caches at once
export function clearAllCaches(): void {
    cache.clear();
    console.log("✅ All caches cleared!");
}
