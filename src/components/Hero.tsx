"use client";

import Image from "next/image";
import { Instagram, Music, Disc, Youtube } from "lucide-react";
import { useEffect, useState } from "react";
import { getSocialStats } from "@/lib/firebaseUtils";

// Custom Icon Components for those not in Lucide (or just use generic ones as placeholders)
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
);

const DiscordIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.086 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" />
  </svg>
);

export default function Hero() {
  const [stats, setStats] = useState({
    instagram: "83k",
    youtube: "49.3k",
    instagramLink: "https://www.instagram.com/jasmine.allyc/",
    tiktokLink: "#",
    whatsappLink: "https://wa.me/6281190052125",
    discordLink: "#"
  });

  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      try {
        const data = await getSocialStats();
        if (mounted && data) {
          setStats({
            instagram: data.instagramStats,
            youtube: data.youtubeStats,
            instagramLink: data.instagramLink,
            tiktokLink: data.tiktokLink,
            whatsappLink: data.whatsappLink,
            discordLink: data.discordLink
          });
        }
      } catch (e) {
        // Keep fallback values if Firebase data is not initialized
        console.warn("Using fallback stats. Please initialize Firebase data via dashboard or script:", e);
      }
    };

    fetchStats();

    return () => { mounted = false; };
  }, []);

  return (
    <section className="min-h-screen w-full relative flex items-center overflow-hidden bg-[#87CEEB] pt-20 pb-0 md:pt-0">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 h-full items-center">

        {/* LEFT COLUMN: Content (Quote + Logos) */}
        <div className="flex flex-col items-start justify-center z-20 space-y-8 md:space-y-12 pt-10 md:pt-0">

          {/* Typography Quote */}
          <div className="flex flex-col items-start">
            <h2 className="text-white text-2xl md:text-3xl font-[family-name:var(--font-great-vibes)] tracking-wider mb-2 ml-1">
              Create Something
            </h2>

            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white leading-none tracking-tighter drop-shadow-xl"
              style={{ fontFamily: "'Arial Black', sans-serif" }}>
              WONDER<br />FULL
            </h1>
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
              <TikTokIcon className="w-6 h-6 md:w-6 md:h-6" />
            </a>

            <a
              href={stats.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-green-600 hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-6 h-6 md:w-6 md:h-6" />
            </a>

            <a
              href={stats.discordLink}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-indigo-600 hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="Discord"
            >
              <DiscordIcon className="w-6 h-6 md:w-6 md:h-6" />
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN: Image */}
        <div className="relative h-[50vh] md:h-screen w-full flex items-end justify-center md:justify-end z-10">
          {/* Decorative Blob/Circle behind image */}
          <div className="absolute bottom-100 right-0 md:right-10 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-white/20 rounded-full blur-3xl -z-10"></div>

          <div className="relative w-full h-full translate-y-12 md:translate-y-20 flex items-center justify-center">
            {/* Outer Orbit (Instagram) - Delayed animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[380px] h-[380px] md:w-[720px] md:h-[720px] border border-dashed border-white/20 rounded-full z-0"
              style={{
                animation: 'orbit 40s linear infinite, fade-in-delayed 0.8s ease-out 0.8s forwards',
                opacity: 0
              }}>
              {/* Instagram Stat */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  animation: 'counter-orbit 40s linear infinite'
                }}>
                <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-xs md:text-sm border-2 border-white/40 backdrop-blur-md">
                  <div className="bg-white rounded-full p-1">
                    <Instagram size={16} className="text-pink-600" />
                  </div>
                  <span>{stats.instagram} Followers</span>
                </div>
              </div>
            </div>

            {/* Inner Orbit (YouTube) - Delayed animation */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[260px] h-[260px] md:w-[480px] md:h-[480px] border-2 border-dashed border-white/30 rounded-full z-0"
              style={{
                animation: 'orbit 30s linear infinite, fade-in-delayed 0.8s ease-out 1s forwards',
                opacity: 0
              }}>
              {/* YouTube Stat */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                style={{
                  animation: 'counter-orbit 30s linear infinite'
                }}>
                <div className="bg-red-600 text-white px-3 py-1.5 md:px-5 md:py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 font-bold text-xs md:text-sm border-2 border-white/50 backdrop-blur-sm">
                  <div className="bg-white rounded-full p-1">
                    <Youtube size={16} className="text-red-600" />
                  </div>
                  <span>{stats.youtube} Sub</span>
                </div>
              </div>
            </div>

            {/* Hero Image with scale-up animation */}
            <Image
              src="/hero-image.png"
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
      <div className="absolute top-4 right-4 md:top-6 md:right-10 z-30 flex items-center justify-center px-4 py-2 gap-4 hidden md:flex">
        {/* Valorant Partner */}
        <div className="relative w-16 h-16 md:w-32 md:h-32 opacity-100 drop-shadow-lg">
          <Image
            src="/valorant-partner.webp"
            alt="Valorant Partner"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 64px, 128px"
          />
        </div>

        {/* RRQ Logo */}
        <div className="relative w-10 h-10 md:w-20 md:h-20 opacity-90 hover:opacity-100 transition-opacity drop-shadow-md">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/RRQ_%28Rex_Regum_Qeon%29_Logo_%28SVG%29_-_Vector69Com.svg/2560px-RRQ_%28Rex_Regum_Qeon%29_Logo_%28SVG%29_-_Vector69Com.svg.png"
            alt="RRQ Logo"
            fill
            className="object-contain"
            sizes="(max-width: 768px) 40px, 80px"
          />
        </div>
      </div>

    </section>
  );
}
