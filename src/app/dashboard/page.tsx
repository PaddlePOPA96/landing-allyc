"use client";

import Link from "next/link";
import { Image as ImageIcon, Users } from "lucide-react";

export default function DashboardOverview() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome, Admin</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link
                    href="/dashboard/posts"
                    className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center gap-4 group"
                >
                    <div className="p-4 bg-purple-100 rounded-full text-purple-600 group-hover:scale-110 transition-transform">
                        <ImageIcon size={48} />
                    </div>
                    <h2 className="text-xl font-semibold">Manage Instagram Posts</h2>
                    <p className="text-gray-500 text-center">Add, remove, or update the posts displayed on the landing page.</p>
                </Link>

                <Link
                    href="/dashboard/sponsors"
                    className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow flex flex-col items-center gap-4 group"
                >
                    <div className="p-4 bg-green-100 rounded-full text-green-600 group-hover:scale-110 transition-transform">
                        <Users size={48} />
                    </div>
                    <h2 className="text-xl font-semibold">Manage Sponsors</h2>
                    <p className="text-gray-500 text-center">Update the partners and sponsors logos.</p>
                </Link>
            </div>
        </div>
    );
}
