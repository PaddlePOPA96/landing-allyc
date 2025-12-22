"use client";

import { useEffect, useState } from "react";
import { addSponsor, getSponsors, deleteSponsor } from "@/lib/firebaseUtils";
import { Trash2 } from "lucide-react";
import Image from "next/image";

interface Sponsor {
    id: string;
    imageUrl: string;
    link: string;
}

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";

export default function SponsorsPage() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [newImage, setNewImage] = useState("");
    const [newLink, setNewLink] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSponsors();
    }, []);

    const fetchSponsors = async () => {
        const data = await getSponsors();
        setSponsors(data as Sponsor[]);
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newImage || !newLink) return;
        setLoading(true);
        try {
            await addSponsor(newImage, newLink);
            setNewImage("");
            setNewLink("");
            fetchSponsors();
        } catch (error) {
            console.error(error);
            alert("Failed to save sponsor. Check your permissions!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this sponsor?")) return;
        await deleteSponsor(id);
        fetchSponsors();
    };

    return (
        <div className="space-y-8 p-8">
            <h1 className="text-3xl font-bold tracking-tight">Manage Sponsors</h1>

            {/* Add Form */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Sponsor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAdd} className="flex gap-4 items-end">
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium leading-none">Logo URL</label>
                            <Input
                                value={newImage}
                                onChange={(e) => setNewImage(e.target.value)}
                                placeholder="https://..."
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-sm font-medium leading-none">Website Link</label>
                            <Input
                                value={newLink}
                                onChange={(e) => setNewLink(e.target.value)}
                                placeholder="https://example.com"
                            />
                        </div>
                        <Button type="submit" disabled={loading}>
                            {loading ? "Adding..." : "Add Sponsor"}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* List */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sponsors.map(sponsor => (
                    <Card key={sponsor.id} className="overflow-hidden">
                        <div className="relative w-full h-32 p-4 bg-gray-50 flex items-center justify-center">
                            <Image
                                src={sponsor.imageUrl}
                                alt="Sponsor"
                                fill
                                sizes="(max-width: 768px) 50vw, 25vw"
                                className="object-contain p-2"
                            />
                        </div>
                        <CardFooter className="p-3 flex justify-between items-center bg-muted/50 border-t">
                            <a href={sponsor.link} target="_blank" className="text-primary text-sm truncate max-w-[120px] hover:underline">
                                Visit Site
                            </a>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(sponsor.id)}
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
