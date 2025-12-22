"use client";

import { useEffect, useState } from "react";
import { addYoutubeVideo, getYoutubeVideos, deleteYoutubeVideo } from "@/lib/firebaseUtils";
import { Trash2, RefreshCw, Youtube } from "lucide-react";
import Image from "next/image";

interface YoutubeVideo {
    id: string;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    views: string;
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function YoutubeDashboardPage() {
    const [videos, setVideos] = useState<YoutubeVideo[]>([]);
    const [newUrl, setNewUrl] = useState("");
    const [newTitle, setNewTitle] = useState("");
    const [newThumb, setNewThumb] = useState("");
    const [newViews, setNewViews] = useState("");

    const [loading, setLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        const data = await getYoutubeVideos();
        setVideos(data as YoutubeVideo[]);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUrl || !newTitle) return;
        setLoading(true);
        await addYoutubeVideo(newUrl, newThumb || "https://placehold.co/600x400?text=No+Thumbnail", newTitle, newViews || "0 views");

        // Clear cache so new video appears immediately
        const { clearCache } = await import("@/lib/cache");
        clearCache("youtube_videos");

        setNewUrl("");
        setNewTitle("");
        setNewThumb("");
        setNewViews("");
        setLoading(false);
        fetchVideos();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this video?")) return;
        await deleteYoutubeVideo(id);

        // Clear cache so deletion reflects immediately
        const { clearCache } = await import("@/lib/cache");
        clearCache("youtube_videos");

        fetchVideos();
    };

    const handleSync = async () => {
        try {
            setSyncing(true);
            const res = await fetch('/api/youtube-sync');
            const data = await res.json();

            if (data.success && data.videos) {
                let addedCount = 0;
                const currentUrls = new Set(videos.map(v => v.videoUrl));

                for (const video of data.videos) {
                    if (!currentUrls.has(video.videoUrl)) {
                        await addYoutubeVideo(
                            video.videoUrl,
                            video.thumbnailUrl,
                            video.title,
                            "Recent"
                        );
                        addedCount++;
                    }
                }

                // Clear cache after sync
                const { clearCache } = await import("@/lib/cache");
                clearCache("youtube_videos");

                alert(`✅ Synced! Added ${addedCount} new video(s).`);
                fetchVideos();
            } else {
                alert(`❌ ${data.error || 'Failed to sync. Check API configuration.'}`);
            }
        } catch (e) {
            console.error(e);
            alert("❌ Error syncing from YouTube.");
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="space-y-8 p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">YouTube Videos</h1>
                <Button
                    onClick={handleSync}
                    disabled={syncing}
                    className="gap-2 bg-red-600 hover:bg-red-700 text-white"
                >
                    <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
                    {syncing ? "Syncing..." : "Sync from YouTube"}
                </Button>
            </div>

            {/* Add Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add Manual Video</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAdd} className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Video URL</label>
                            <Input value={newUrl} onChange={(e) => setNewUrl(e.target.value)} placeholder="https://youtube.com/watch?v=..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Title</label>
                            <Input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Video Title" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Thumbnail URL</label>
                            <Input value={newThumb} onChange={(e) => setNewThumb(e.target.value)} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium">Views</label>
                            <Input value={newViews} onChange={(e) => setNewViews(e.target.value)} placeholder="1.2K views" />
                        </div>
                        <div className="col-span-2">
                            <Button type="submit" disabled={loading} className="w-full">
                                {loading ? "Adding..." : "Add Video"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videos.map(video => (
                    <Card key={video.id} className="overflow-hidden group flex flex-col">
                        <div className="aspect-video relative bg-black">
                            <Image
                                src={video.thumbnailUrl || "https://placehold.co/600x400.png?text=No+Thumbnail"}
                                alt={video.title}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="object-cover"
                            />
                            <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                                {video.views}
                            </div>
                        </div>
                        <CardHeader className="p-4 pb-2">
                            <h3 className="font-semibold line-clamp-2 text-sm leading-tight h-10">{video.title}</h3>
                        </CardHeader>
                        <CardFooter className="p-4 pt-0 mt-auto flex justify-between items-center text-xs text-muted-foreground">
                            <a href={video.videoUrl} target="_blank" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                                <Youtube size={14} /> Watch
                            </a>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(video.id)}
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 size={14} />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
