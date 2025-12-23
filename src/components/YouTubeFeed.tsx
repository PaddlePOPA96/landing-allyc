"use client";

import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { useEffect, useState } from "react";
import { getYoutubeVideos } from "@/lib/firebaseUtils";

interface YoutubeVideo {
    id: string;
    videoUrl: string;
    thumbnailUrl: string;
    title: string;
    views: string;
}

export default function YouTubeFeed() {
    const [videos, setVideos] = useState<YoutubeVideo[]>([]);
    const [visibleCount, setVisibleCount] = useState(6);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getYoutubeVideos();
                if (Array.isArray(data) && data.length > 0) {
                    setVideos(data);
                }
            } catch (e) {
                console.error("Failed to fetch videos:", e);
            }
        };
        fetch();
    }, []);

    // Load All handler
    const handleLoadMore = () => {
        setVisibleCount((prev) => prev + 6);
    };

    // Show Less handler
    const handleShowLess = () => {
        setVisibleCount(6);
    };

    const displayedVideos = videos.slice(0, visibleCount);

    return (
        <section id="streaming" className="container mx-auto px-6 py-24 bg-white light:bg-white-950">
            <div className="flex flex-col items-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black italic uppercase text-center mb-4">
                    Latest <span className="text-red-600">Streams</span>
                </h2>
                <a
                    href="https://www.youtube.com/@Allyccc/streams"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-zinc-500 hover:text-red-600 transition-colors uppercase tracking-widest text-sm font-bold flex items-center gap-2"
                >
                    View All on YouTube <Play size={16} fill="currentColor" />
                </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px] mb-12">
                {videos.length === 0 ? (
                    // Skeleton Loading State
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className={`rounded-2xl bg-zinc-200 dark:bg-zinc-800 animate-pulse aspect-video ${i < 2 ? 'md:col-span-1 lg:col-span-1' : ''}`} />
                    ))
                ) : (
                    displayedVideos.map((video, index) => (
                        <Link
                            key={video.id}
                            href={video.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`group relative rounded-2xl overflow-hidden aspect-video bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 transition-all hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-500/20 ${index < 2 ? 'md:col-span-1 lg:col-span-1' : '' /* Standard grid */
                                }`}
                        >
                            <Image
                                src={video.thumbnailUrl || "https://placehold.co/600x400.png?text=No+Thumbnail"}
                                alt={video.title}
                                fill
                                unoptimized
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                priority={index < 2} // Prioritize loading for the top videos
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                            {/* Play Button Overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-50 group-hover:scale-100">
                                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                                    <Play fill="white" className="text-white ml-1" />
                                </div>
                            </div>

                            <div className="absolute bottom-0 left-0 p-6 w-full">
                                <h3 className="text-white font-bold text-lg leading-tight mb-2 line-clamp-2 uppercase italic">
                                    {video.title?.replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'")}
                                </h3>
                                <div className="flex items-center gap-3 text-xs font-medium text-zinc-300">
                                    <span className="bg-red-600 px-2 py-0.5 rounded text-white">VOD</span>
                                    <span>{video.views}</span>
                                    {/* <span>•</span> */}
                                    {/* <span>{stream.time}</span> (Time not available in current crawler) */}
                                </div>
                            </div>
                        </Link>
                    ))
                )}
            </div>

            {/* Load More Controls */}
            {videos.length > 6 && (
                <div className="flex justify-center gap-4">
                    {visibleCount < videos.length && (
                        <button
                            onClick={handleLoadMore}
                            className="px-8 py-3 bg-zinc-100 dark:bg-zinc-800 hover:bg-red-600 hover:text-white text-zinc-900 dark:text-zinc-100 rounded-full font-bold transition-all uppercase tracking-wider text-sm shadow-sm hover:shadow-lg"
                        >
                            Load More
                        </button>
                    )}

                    {visibleCount > 6 && (
                        <button
                            onClick={handleShowLess}
                            className="px-8 py-3 border border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-red-600 hover:border-red-600 rounded-full font-bold transition-all uppercase tracking-wider text-sm"
                        >
                            Show Less
                        </button>
                    )}
                </div>
            )}
        </section>
    );
}
