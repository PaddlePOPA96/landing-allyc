import Hero from "@/components/Hero";
import About from "@/components/About";
import InstagramFeed from "@/components/InstagramFeed";

import Sponsors from "@/components/Sponsors";

import YouTubeFeed from "@/components/YouTubeFeed";
import Gear from "@/components/Gear";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <YouTubeFeed />
      <Gear />
      <InstagramFeed />
      <Sponsors />

      <footer className="py-8 bg-sky-900 text-white text-center text-sm">
        <p>© {new Date().getFullYear()} Jasmine Allyc. All rights reserved.</p>
      </footer>
    </main>
  );
}
