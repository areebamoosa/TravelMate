import MediaSlot from "@/app/components/ui/MediaSlot";
import SectionBadge from "@/app/components/ui/SectionBadge";

const quotes = [
  { name: "John Doe", role: "Customer" },
  { name: "Lia Frank", role: "Customer" },
  { name: "Stefan Hawking", role: "Customer" },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <SectionBadge>Testimonial</SectionBadge>
      <h2 className="mt-4 text-3xl font-bold text-stone-900">
        What our Customers Say about us
      </h2>
      <div className="mt-8 grid gap-8 md:grid-cols-3">
        {quotes.map((quote) => (
          <article key={quote.name}>
            <p className="text-sm leading-relaxed text-stone-500">
              A place for a traveler story. Drop in a photo and a short quote when you are ready.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <MediaSlot label="" className="h-12 w-12 rounded-full" />
              <div>
                <p className="text-sm font-semibold text-stone-900">{quote.name}</p>
                <p className="text-xs text-stone-500">{quote.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
