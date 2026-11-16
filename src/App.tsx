import { Contents } from "@/components/Contents";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScrollProvider } from "@/lib/scroll";
import { About } from "@/sections/About";
import { Gracht } from "@/sections/Gracht";
import { Slot } from "@/sections/Slot";
import { Turfhaven } from "@/sections/Turfhaven";
import { Uitgevoerd } from "@/sections/Uitgevoerd";
import { Wijnhaven } from "@/sections/Wijnhaven";
import { Zevensprong } from "@/sections/Zevensprong";

export default function App() {
  return (
    <ScrollProvider>
      <a
        href="#inhoud"
        className="spatie fixed left-4 top-4 z-[80] -translate-y-24 bg-mangaan px-4 py-3 text-papier focus:translate-y-0"
      >
        naar de inhoud
      </a>
      <Header />
      <Hero />
      <main>
        <Contents />
        <About />
        <Turfhaven />
        <Gracht />
        <Wijnhaven />
        <Zevensprong />
        <Uitgevoerd />
      </main>
      <Slot />
    </ScrollProvider>
  );
}
