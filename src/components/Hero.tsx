import Image from "next/image";
import { Instagram, Music, Disc } from "lucide-react"; // Music for TikTok alternative if not available, or just use a generic icon. Lucide doesn't have TikTok specifically, usually people use a custom SVG or 'Music' or 'Clapperboard'. I will check usually available icons or use creating an SVG for TikTok if needed. 
// Lucide doesn't have TikTok. I'll use an SVG for TikTok.

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

// Discord icon from Lucide is 'Disc' or I can use an SVG for better accuracy if 'Disc' isn't what they mean (which is often CD). Lucide has 'Gamepad2' or similar. 
// Actually 'Disc' is often used for Discord in some sets, but let's be safe and use an SVG for Discord too if I want to be precise, or just use Lucide's if it exists. 
// "Discord" icon in Lucide is not standard. I'll use SVGs for specific brand icons to look good.
// Authentic Discord Logo
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 127.14 96.36"
    fill="currentColor"
    className={className}
  >
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.11,77.11,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22c1.24-23.28-13.26-47.57-18.9-72.15ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

// WhatsApp Logo
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);
// Wait, that Discord icon is generic. 
// I'll stick to Lucide 'Instagram' and simple SVGs for others to keep it clean, or just use text if simple. 
// But requested "icon". I'll use appropriate SVGs for branding.

export default function Hero() {
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
              href="https://www.instagram.com/jasmine.allyc/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-pink-600 hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="Instagram"
            >
              <Instagram size={24} className="md:w-6 md:h-6" />
            </a>

            <a
              href="#"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-black hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-6 h-6 md:w-6 md:h-6" />
            </a>

            <a
              href="https://wa.me/6281190052125"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-white/90 backdrop-blur-sm rounded-2xl text-green-600 hover:scale-110 hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
              aria-label="WhatsApp"
            >
              <WhatsAppIcon className="w-6 h-6 md:w-6 md:h-6" />
            </a>

            <a
              href="#"
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

          <div className="relative w-full h-full translate-y-12 md:translate-y-20">
            <Image
              src="/hero-image.png"
              alt="Jasmine Allyc"
              fill
              className="object-contain object-bottom md:object-right-bottom"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>

      </div>

      {/* Top Logos (RRQ & Valorant) */}
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
