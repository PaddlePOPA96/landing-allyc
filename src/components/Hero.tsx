"use client";

import { useEffect, useState } from "react";
import { getSocialStats, SocialConfig } from "@/lib/firebaseUtils";
import Image from "next/image";
import { Instagram, Youtube, MessageCircle, Heart } from "lucide-react";
import ParticlesBackground from "./ParticlesBackground";

export default function Hero() {
  const [stats, setStats] = useState<SocialConfig>({
    instagramStats: "0",
    youtubeStats: "0",
    instagramLink: "https://instagram.com",
    tiktokLink: "https://tiktok.com",
    whatsappLink: "https://wa.me",
    youtubeLink: "https://youtube.com",
    saweriaLink: "https://saweria.co",
    discordLink: "https://discord.com",
  });

  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      try {
        const data = await getSocialStats();
        if (mounted) {
          setStats(data);
        }
      } catch (error) {
        console.warn("Soft fail: Failed to load social stats (using defaults):", error);
      }
    };

    fetchStats();
    return () => { mounted = false; };
  }, []);

  return (
    <section className="min-h-screen w-full relative flex items-center overflow-hidden bg-[#87CEEB] pt-20 pb-0 md:pt-0">
      <ParticlesBackground />
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">

        {/* LEFT COLUMN: Content (Quote + Logos) */}
        <div className="flex flex-col items-start justify-center z-20 space-y-6 md:space-y-8 pt-10 md:pt-0">

          {/* Typography Quote */}
          <div className="flex flex-col items-start">
            <h2 className="text-white text-2xl md:text-3xl font-[family-name:var(--font-great-vibes)] tracking-wider mb-2 ml-1">
              The One & Only
            </h2>

            <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 leading-none tracking-tighter drop-shadow-xl mb-2"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>
              RRQ ALLYC
            </h1>

            <h2 className="text-4xl md:text-6xl font-black text-white/50 leading-none tracking-tighter"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>
              WONDERFULL
            </h2>

            <p className="text-white/90 text-sm md:text-lg max-w-md mt-6 font-light leading-relaxed">
              Exploring the beauty of the digital world, one stream at a time. Welcome to my universe.
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up">
            <a
              href={stats.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-pink-600 hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="Instagram"
            >
              <Instagram size={24} className="md:w-6 md:h-6" />
            </a>

            <a
              href={stats.tiktokLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-black hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="TikTok"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </a>

            <a
              href={stats.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-red-600 hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="YouTube"
            >
              <Youtube size={24} className="md:w-6 md:h-6" />
            </a>

            <a
              href={stats.saweriaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-yellow-600 hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="Saweria Donate"
            >
              <Heart size={24} className="md:w-6 md:h-6" />
            </a>
          </div>

          <div className="animate-fade-in-up delay-100">
            <a
              href={stats.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center gap-3 text-lg"
              aria-label="WhatsApp Business"
            >
              <MessageCircle size={24} />
              <span>Contact for Business</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Hero Image + Orbits */}
        <div className="relative h-[50vh] md:h-screen w-full flex items-end justify-center md:justify-end z-10">
          {/* Decorative Blob/Circle behind image */}
          <div className="absolute bottom-100 right-0 md:right-10 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white/20 rounded-full blur-3xl -z-10"></div>

          <div className="relative w-full h-full translate-y-12 md:translate-y-20 flex items-center justify-center">
            {/* Outer Orbit System (Instagram) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[720px] md:h-[720px] z-0">
              {/* Static Ring Border */}
              <div className="absolute w-full h-full border border-dashed border-white/20 rounded-full"></div>

              {/* Rotating Container for Instagram Badge */}
              <div className="absolute w-full h-full z-0" style={{ animation: 'hero-orbit 35s linear infinite', transformOrigin: 'center' }}>
                {/* Badge positioned at top center of rotation */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Counter-rotate badge to keep text upright - Duration MUST match the orbit */}
                  <div style={{ animation: 'hero-counter-orbit 35s linear infinite', transformOrigin: 'center' }}>
                    <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white px-2 py-1 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-1.5 md:gap-2 font-bold text-[10px] md:text-sm border md:border-2 border-white/40 backdrop-blur-md whitespace-nowrap">
                      <div className="bg-white rounded-full p-0.5 md:p-1">
                        <Instagram size={12} className="md:w-4 md:h-4 text-pink-600" />
                      </div>
                      <span>{stats.instagramStats} Followers</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inner Orbit System (YouTube) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] md:w-[480px] md:h-[480px] z-0">
              {/* Static Ring Border */}
              <div className="absolute w-full h-full border-2 border-dashed border-white/30 rounded-full"></div>

              {/* Rotating Container for YouTube Badge */}
              <div className="absolute w-full h-full z-0" style={{ animation: 'hero-orbit 25s linear infinite', transformOrigin: 'center' }}>
                {/* Badge positioned at top center of rotation */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  {/* Counter-rotate badge to keep text upright - Duration MUST match the orbit */}
                  <div style={{ animation: 'hero-counter-orbit 25s linear infinite', transformOrigin: 'center' }}>
                    <div className="bg-red-600 text-white px-2 py-1 md:px-5 md:py-2.5 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-1.5 md:gap-2 font-bold text-[10px] md:text-sm border md:border-2 border-white/50 backdrop-blur-sm whitespace-nowrap">
                      <div className="bg-white rounded-full p-0.5 md:p-1">
                        <Youtube size={12} className="md:w-4 md:h-4 text-red-600" />
                      </div>
                      <span>{stats.youtubeStats} Sub</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image with scale-up animation */}
            <Image
              src="/hero-image.webp"
              alt="Jasmine Allyc"
              fill
              className="object-contain object-bottom md:object-right-bottom z-10 animate-scale-up-from-bottom"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

      </div>

      {/* Top Logos (RRQ & Valorant) */}
      <div className="absolute top-2 right-2 md:top-4 md:right-4 z-40 flex items-center justify-center gap-2 md:gap-4 md:flex">
        {/* Valorant Partner */}
        <div className="relative w-12 h-12 md:w-20 md:h-20 opacity-100 drop-shadow-lg">
          <Image
            src="/valorant-partner.webp"
            alt="Valorant"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 48px, 80px"
          />
        </div>

        {/* RRQ Logo */}
        <div className="relative w-12 h-12 md:w-20 md:h-20 opacity-100 drop-shadow-lg">
          <Image
            src="/logo-rrq.png"
            alt="RRQ"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 48px, 80px"
          />
        </div>
      </div>
    </section>
  );
}
