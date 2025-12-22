"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { LayoutDashboard, Image as ImageIcon, Users, LogOut, Activity } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { user, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login");
        }
    }, [user, loading, router]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    if (!user) return null;

    const handleLogout = async () => {
        await signOut(auth);
        router.push("/login");
    };

    const navItems = [
        { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
        { name: "Social Stats", href: "/dashboard/stats", icon: Activity },
        { name: "Instagram Posts", href: "/dashboard/posts", icon: ImageIcon },
        { name: "YouTube Videos", href: "/dashboard/youtube", icon: Users },
        { name: "Sponsors", href: "/dashboard/sponsors", icon: Users },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50/50 relative overflow-hidden">
            {/* Cute Blue Blur Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob"></div>
                <div className="absolute top-[-10%] right-[-10%] w-[400px] h-[400px] bg-purple-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-pink-200/40 rounded-full blur-[100px] mix-blend-multiply animate-blob animation-delay-4000"></div>
            </div>

            {/* Sidebar */}
            <aside className="w-64 bg-white/80 backdrop-blur-md shadow-sm border-r flex-shrink-0 z-10">
                <div className="p-6 border-b">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Allyc Admin</h2>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? "bg-blue-100/50 text-blue-600 font-medium shadow-sm"
                                    : "text-gray-600 hover:bg-white/50 hover:text-gray-900"
                                    }`}
                            >
                                <Icon size={20} />
                                {item.name}
                            </Link>
                        );
                    })}
                </nav>
                <div className="p-4 border-t mt-auto">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto relative z-10">
                {children}
            </main>
        </div>
    );
}
