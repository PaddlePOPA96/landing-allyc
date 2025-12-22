"use client";

import { useEffect, useState } from "react";
import { addPost, getPosts, deletePost } from "@/lib/firebaseUtils";
import { Trash2, RefreshCw } from "lucide-react";
import Image from "next/image";

interface Post {
    id: string;
    media_url: string;
    permalink: string;
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function PostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [newImage, setNewImage] = useState("");
    const [newLink, setNewLink] = useState("");
    const [loading, setLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const data = await getPosts();
        // @ts-ignore
        setPosts(data as Post[]);
    };

    const handleSync = async () => {
        try {
            setSyncing(true);
            const res = await fetch('/api/crawl');
            const data = await res.json();

            if (data.success && data.posts) {
                let addedCount = 0;
                // Add posts that don't exist yet (by permalink check ideally, but here just adding all crawled that are likely new)
                // Ideally we check if permalink exists in current posts.
                const currentPermalinks = new Set(posts.map(p => p.permalink));

                for (const post of data.posts) {
                    if (!currentPermalinks.has(post.permalink)) {
                        // Simply save the Instagram URL and Permalink
                        await addPost(post.media_url, post.permalink);
                        addedCount++;
                    }
                }
                alert(`Synced! Added ${addedCount} new posts.`);
                fetchPosts();
            } else {
                alert("Failed to sync. Instagram might be blocking access.");
            }
        } catch (e) {
            console.error(e);
            alert("Error syncing.");
        } finally {
            setSyncing(false);
        }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImage || !newLink) return;
        setLoading(true);
        await addPost(newImage, newLink);
        setNewImage("");
        setNewLink("");
        setLoading(false);
        fetchPosts();
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;
        await deletePost(id);
        fetchPosts();
    };

    return (
        <div className="space-y-8 p-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Instagram Posts</h1>
                <Button
                    onClick={handleSync}
                    disabled={syncing}
                    className="gap-2"
                >
                    <RefreshCw size={16} className={syncing ? "animate-spin" : ""} />
                    {syncing ? "Syncing..." : "Sync from Instagram"}
                </Button>
            </div>

            {/* Add Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Post</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAdd} className="flex gap-4 items-end">
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Image URL</label>
                            <Input
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Information / Link</label>
                            <Input
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                placeholder="https://instagram.com/..."
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Post"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* List */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {posts.map(post => (
                    <Card key={post.id} className="overflow-hidden group">
                        <div className="aspect-[4/5] relative">
                            <Image
                                src={post.media_url}
                                alt="Post"
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover"
                            />
                        </div>
                        <CardFooter className="p-3 flex justify-between items-center bg-muted/50">
                            <a href={post.permalink} target="_blank" className="text-primary text-sm truncate max-w-[120px] hover:underline">
                                View on Instagram
                            </a>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(post.id)}
                                className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 size={16} />
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
