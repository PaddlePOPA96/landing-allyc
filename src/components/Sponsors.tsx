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

    useEffect(() => {
        const fetch = async () => {
            const data = await getSponsors();
            setSponsors(data as Sponsor[]);
        };
        fetch();
    }, []);

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
