import MediaSlot from "@/app/components/ui/MediaSlot";
import SectionBadge from "@/app/components/ui/SectionBadge";

const stats = [
  { value: "12k+", label: "Successful Trips" },
  { value: "2k+", label: "Regular Clients" },
  { value: "15+", label: "Years Experience" },
];

export default function Experience() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:grid-cols-2">
      <div>
        <SectionBadge>Experience</SectionBadge>
        <h2 className="mt-4 text-3xl font-bold text-stone-900">
          With our experience we will serve you
        </h2>
        <p className="mt-4 max-w-md leading-relaxed text-stone-500">
          Plan a destination, pick a tour, and build a day-by-day trip without leaving TravelMate.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="rounded-lg bg-brand px-4 py-3 text-lg font-bold text-white">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-stone-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      <MediaSlot
        label="Experience image"
        className="mx-auto h-72 w-72 rounded-full border-8 border-orange-100 sm:h-80 sm:w-80"
      />
    </section>
  );
}
