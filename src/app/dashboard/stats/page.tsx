"use client";

import { useEffect, useState } from "react";
import { getSocialStats, updateSocialStats } from "@/lib/firebaseUtils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Youtube, Save } from "lucide-react";

export default function StatsDashboardPage() {
    const [instagramStats, setInstagramStats] = useState("");
    const [youtubeStats, setYoutubeStats] = useState("");

    // Links
    const [instagramLink, setInstagramLink] = useState("");
    const [tiktokLink, setTiktokLink] = useState("");
    const [whatsappLink, setWhatsappLink] = useState("");
    const [discordLink, setDiscordLink] = useState("");

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchStats = async () => {
            setLoading(true);
            const stats = await getSocialStats();
            if (stats) {
                setInstagramStats(stats.instagramStats || "83k");
                setYoutubeStats(stats.youtubeStats || "49.3k");

                setInstagramLink(stats.instagramLink || "");
                setTiktokLink(stats.tiktokLink || "");
                setWhatsappLink(stats.whatsappLink || "");
                setDiscordLink(stats.discordLink || "");
            }
            setLoading(false);
        };
        fetchStats();
    }, []);

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            await updateSocialStats({
                instagramStats,
                youtubeStats,
                instagramLink,
                tiktokLink,
                whatsappLink,
                discordLink
            });
            alert("Social stats & links updated successfully!");
        } catch (error) {
            console.error("Error updating stats:", error);
            alert("Failed to update stats.");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 p-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Social Configs</h1>
                <p className="text-muted-foreground">Manage your follower counts and social media profile links securely.</p>
            </div>

            <Card className="border-none shadow-xl bg-white/50 backdrop-blur-md">
                <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Save className="text-blue-600" size={24} />
                        Update Statistics & Links
                    </CardTitle>
                    <CardDescription>Enter the numbers and full URLs (e.g., https://instagram.com/...).</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSave} className="space-y-8">

                        {/* STATS SECTION */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Statistics (Hero Orb)</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Instagram Followers</label>
                                    <Input
                                        value={instagramStats}
                                        onChange={(e) => setInstagramStats(e.target.value)}
                                        placeholder="e.g., 83k"
                                        className="bg-white/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">YouTube Subscribers</label>
                                    <Input
                                        value={youtubeStats}
                                        onChange={(e) => setYoutubeStats(e.target.value)}
                                        placeholder="e.g., 49.3k"
                                        className="bg-white/50"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* LINKS SECTION */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold border-b pb-2">Social Media Links</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2"><Instagram size={16} /> Instagram URL</label>
                                    <Input
                                        value={instagramLink}
                                        onChange={(e) => setInstagramLink(e.target.value)}
                                        placeholder="https://instagram.com/..."
                                        className="bg-white/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">TikTok URL</label>
                                    <Input
                                        value={tiktokLink}
                                        onChange={(e) => setTiktokLink(e.target.value)}
                                        placeholder="https://tiktok.com/@..."
                                        className="bg-white/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">WhatsApp URL</label>
                                    <Input
                                        value={whatsappLink}
                                        onChange={(e) => setWhatsappLink(e.target.value)}
                                        placeholder="https://wa.me/..."
                                        className="bg-white/50"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium flex items-center gap-2">Discord URL</label>
                                    <Input
                                        value={discordLink}
                                        onChange={(e) => setDiscordLink(e.target.value)}
                                        placeholder="https://discord.gg/..."
                                        className="bg-white/50"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button
                                type="submit"
                                disabled={saving}
                                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg h-12 text-lg"
                            >
                                {saving ? "Saving Changes..." : "Save Configs"}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
