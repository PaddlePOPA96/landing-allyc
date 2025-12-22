"use client";

import { useEffect, useState } from "react";
import { getSponsors } from "@/lib/firebaseUtils";
import Image from "next/image";

interface Sponsor {
    id: string;
    imageUrl: string;
    link: string;
}

export default function Sponsors() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState<string | null>(null); // Added error state

    useEffect(() => {
        const fetchSponsors = async () => { // Renamed fetch to fetchSponsors for clarity
            try {
                const data = await getSponsors();
                if (Array.isArray(data)) {
                    setSponsors(data as Sponsor[]);
                } else {
                    setError("Fetched data is not an array.");
                    setSponsors([]); // Ensure sponsors is an empty array on error
                }
            } catch (err) {
                console.error("Failed to fetch sponsors", err);
                setError("Failed to load sponsors.");
                setSponsors([]); // Ensure sponsors is an empty array on error
            } finally {
                setLoading(false);
            }
        };
        fetchSponsors();
    }, []);

    if (loading) return <div className="text-center py-12">Loading sponsors...</div>; // Display loading state
    if (error) return <div className="text-center py-12 text-red-500">{error}</div>; // Display error state
    if (sponsors.length === 0) return null;

    return (
        <section className="py-12 bg-white">
            <div className="container mx-auto px-4">
                <h3 className="text-center text-xl font-semibold text-gray-500 mb-8 uppercase tracking-wider">Partners & Sponsors</h3>
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                    {sponsors.map((sponsor) => (
                        <a
                            key={sponsor.id}
                            href={sponsor.link}
                            target="_blank"
                            className="relative w-32 h-16 md:w-40 md:h-20 transition-transform hover:scale-110"
                        >
                            <Image
                                src={sponsor.imageUrl}
                                alt="Sponsor"
                                fill
                                sizes="(max-width: 768px) 33vw, 20vw"
                                className="object-contain"
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}
