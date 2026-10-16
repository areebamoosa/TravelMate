import MediaSlot from "@/app/components/ui/MediaSlot";
import SectionBadge from "@/app/components/ui/SectionBadge";

export default function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:grid-cols-2">
      <div>
        <SectionBadge>Know Before You Go</SectionBadge>
        <h1 className="mt-6 text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
          Traveling Opens The Door To Creating{" "}
          <span className="text-brand">Memories</span>
        </h1>
        <p className="mt-5 max-w-xl leading-relaxed text-stone-500">
          TravelMate is your all-in-one travel companion for discovering
          destinations, exploring places, and planning unforgettable trips.
          Discover new destinations, explore attractions and experiences, and
          organize your entire journey in one place.
        </p>
        <a
          href="/destinations"
          className="mt-8 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Explore Destinations
        </a>
      </div>

      <div className="grid grid-cols-3 items-end gap-3">
        <MediaSlot
          label="Hero image"
          className="h-64 rounded-[2rem] border-4 border-brand/80 sm:h-80"
        />
        <MediaSlot
          label="Hero image"
          className="h-52 rounded-[2rem] border-4 border-brand/80 sm:h-64"
        />
        <MediaSlot
          label="Hero image"
          className="h-72 rounded-[2rem] border-4 border-brand/80 sm:h-96"
        />
      </div>
    </section>
  );
}
