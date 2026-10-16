import MediaSlot from "@/app/components/ui/MediaSlot";
import SectionBadge from "@/app/components/ui/SectionBadge";

export default function FeaturedTours() {
  return (
    <section id="tours" className="mx-auto max-w-6xl px-4 py-16">
      <SectionBadge>Explore</SectionBadge>
      <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-3xl font-bold text-stone-900">Our Featured Tours</h2>
        <a
          href="/tours"
          className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          View all tours
        </a>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {["Tour photo", "Tour photo", "Tour photo"].map((label, index) => (
          <a
            key={label + index}
            href="/tours"
            className="overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-sm"
          >
            <MediaSlot label={label} className="h-44" />
            <div className="p-4">
              <p className="text-sm text-stone-500">
                Open the tours page to see prices, duration, and places.
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
