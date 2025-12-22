"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { getPosts } from "@/lib/firebaseUtils";

interface Post {
    id: string;
    media_url: string;
    permalink: string;
}

export default function InstagramFeed() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getPosts();
                if (data && data.length > 0) {
                    setPosts(data as Post[]);
                }
            } catch (e) {
                console.error("Failed to fetch posts:", e);
            }
        };
        fetch();
    }, []);

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-center gap-2 mb-12">
                    <Instagram className="text-pink-600" />
                    <h2 className="text-3xl font-bold text-gray-800">Latest Posts</h2>
                </div>

                {posts.length === 0 ? (
                    <div className="text-center text-gray-500">Loading posts...</div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 max-w-5xl mx-auto">
                        {posts.map((post) => (
                            <Link
                                key={post.id}
                                href={post.permalink}
                                target="_blank"
                                className="aspect-[4/5] bg-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative group cursor-pointer block"
                            >
                                <Image
                                    src={post.media_url}
                                    alt={`Instagram Post ${post.id}`}
                                    fill
                                    sizes="(max-width: 768px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Instagram className="text-white drop-shadow-md" size={32} />
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        href="https://www.instagram.com/jasmine.allyc/"
                        target="_blank"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-pink-600 text-white rounded-full font-semibold hover:bg-pink-700 transition-colors"
                    >
                        <Instagram size={20} />
                        View on Instagram
                    </Link>
                </div>
            </div>
        </section>
    );
}
