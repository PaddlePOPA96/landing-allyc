"use client";

import { useEffect, useState } from "react";
import { getGear } from "@/lib/firebaseUtils";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";

interface GearItem {
    id: string;
    imageUrl: string;
    name: string;
    category: string;
    link: string;
}

export default function Gear() {
    const [gearItems, setGearItems] = useState<GearItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const data = await getGear();
                setGearItems(data as GearItem[]);
            } catch (error) {
                console.error("Failed to fetch gear items", error);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    if (!loading && gearItems.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-sky-600">My Gear</h2>
                    <p className="text-gray-600 max-w-xl mx-auto">
                        The equipment I use to stream and dominate in Valorant.
                    </p>
                </div>

                {loading ? (
                    <div className="flex justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-600"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {gearItems.map((item) => (
                            <a
                                key={item.id}
                                href={item.link || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center p-6 border border-gray-100 hover:-translate-y-2 relative"
                            >
                                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-sky-600">
                                    <ShoppingBag size={18} />
                                </div>

                                <div className="relative w-32 h-32 mb-4 group-hover:scale-105 transition-transform duration-300">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.name}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-xs font-semibold text-sky-500 uppercase tracking-widest mb-1">{item.category}</p>
                                    <h4 className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">{item.name}</h4>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
