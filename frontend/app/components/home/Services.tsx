import SectionBadge from "@/app/components/ui/SectionBadge";

const services = [
  {
    title: "Calculate Weather",
    text: "Check the weather for a destination before you go.",
    href: "/destinations",
  },
  {
    title: "Tour Guide",
    text: "Get a tour guide for your next adventure.",
    href: "/tours",
  },
  {
    title: "Customization",
    text: "Customize your trip as per your need.",
    href: "/trips/create",
  },
  {
    title: "Tours",
    text: "Discover amazing tours and destinations.",
    href: "/tours",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-16">
      <SectionBadge>What We Serve</SectionBadge>
      <h2 className="mt-4 text-3xl font-bold text-stone-900">
        We Offer Our Best Services
      </h2>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service) => (
          <a
            key={service.title}
            href={service.href}
            className="rounded-lg border border-orange-100 bg-white p-5 transition hover:shadow-md"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-lg text-white">
              {service.title.slice(0, 1)}
            </span>
            <h3 className="mt-4 font-semibold text-stone-900">{service.title}</h3>
            <p className="mt-2 text-sm text-stone-500">{service.text}</p>
          </a>
        ))}
      </div>
    </section>
  );
}
