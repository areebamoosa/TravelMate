import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

function ServiceIcon({ name }: { name: string }) {
  if (name === "weather") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M18.4 5.6 17 7M7 17l-1.4 1.4" />
      </svg>
    );
  }
  if (name === "guide") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  }
  if (name === "custom") {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
        <rect x="4" y="5" width="16" height="14" rx="2" />
        <path d="M8 15l2.5-3 2 2L16 10" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.2" />
    </svg>
  );
}

const services = [
  { name: "weather", title: "Calculate Weather", text: "Calculate weather based on location", href: "/destinations" },
  { name: "guide", title: "Tour Guide", text: "Get a tour guide for your next Adventure", href: "/tours" },
  { name: "custom", title: "Customization", text: "Customize your trip As per Your Need", href: "/trips/create" },
  { name: "tours", title: "Tours", text: "Discover amazing tours and destinations", href: "/tours" },
];

const customers = [
  { name: "John Doe", image: "/assets/customer-1.jpg" },
  { name: "Lia Frank", image: "/assets/customer-2.jpg" },
  { name: "Stefan Hawking", image: "/assets/customer-3.jpg" },
];

export default function TravelMate() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <span className="inline-block rounded-full bg-brand px-4 py-1 font-script text-xl text-white">
              Know Before You Go
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-tight text-stone-900 sm:text-5xl">
              Traveling Opens The Door To Creating
              <span className="mt-1 block text-brand">Memories</span>
            </h1>
            <p className="mt-5 max-w-md leading-relaxed text-stone-500">
              TravelMate is your all-in-one travel companion for discovering destinations, exploring places, and planning unforgettable trips.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:items-start">
            <img src="/assets/hero-1.jpg" alt="Louvre" className="h-80 w-full rounded-[2rem] border-4 border-brand/80 object-cover" />
            <video src="/assets/hero-video.mp4" autoPlay muted loop playsInline className="h-80 w-full rounded-[2rem] border-4 border-brand/80 object-cover sm:mt-10" />
            <img src="/assets/hero-2.jpg" alt="Mountain hike" className="h-80 w-full rounded-[2rem] border-4 border-brand/80 object-cover sm:mt-5" />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <p className="font-script text-2xl text-brand">What We Serve</p>
          <h2 className="mt-2 text-2xl font-bold text-stone-900 sm:text-3xl">We Offer Our Best Services</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => (
              <a key={service.title} href={service.href} className="rounded-lg border border-orange-200/80 p-5 hover:shadow-md">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-brand text-white">
                  <ServiceIcon name={service.name} />
                </span>
                <h3 className="mt-4 font-semibold text-stone-900">{service.title}</h3>
                <p className="mt-2 text-sm text-stone-500">{service.text}</p>
              </a>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 sm:py-16">
          <span className="inline-block rounded-full bg-brand px-4 py-1 font-script text-lg text-white">Explore</span>
          <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">Our Featured Tours</h2>
            <a href="/tours" className="w-fit rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark">View all tours</a>
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:grid-cols-2">
          <div>
            <span className="inline-block rounded-full bg-brand px-4 py-1 font-script text-lg text-white">Experience</span>
            <h2 className="mt-4 text-3xl font-bold text-stone-900">With our experience we will serve you</h2>
            <p className="mt-4 max-w-md text-stone-500">Plan a destination, pick a tour, and build a day-by-day trip.</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="text-center">
                <p className="rounded-lg bg-brand px-4 py-3 text-lg font-bold text-white">12k+</p>
                <p className="mt-2 text-sm text-stone-500">Successful Trips</p>
              </div>
              <div className="text-center">
                <p className="rounded-lg bg-brand px-4 py-3 text-lg font-bold text-white">2k+</p>
                <p className="mt-2 text-sm text-stone-500">Regular Clients</p>
              </div>
              <div className="text-center">
                <p className="rounded-lg bg-brand px-4 py-3 text-lg font-bold text-white">15+</p>
                <p className="mt-2 text-sm text-stone-500">Years Experience</p>
              </div>
            </div>
          </div>
          <img src="/assets/featured-tour.png" alt="Traveler with luggage" className="mx-auto max-h-96 w-full object-contain" />
        </section>

        <section className="mx-auto max-w-6xl px-4 py-16">
          <span className="inline-block rounded-full bg-brand px-4 py-1 font-script text-lg text-white">Testimonial</span>
          <h2 className="mt-4 text-3xl font-bold text-stone-900">What our Customers Say about us</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {customers.map((customer) => (
              <article key={customer.name}>
                <p className="text-sm leading-relaxed text-stone-500">
                  A place for a traveler story. Drop in a short quote when you are ready.
                </p>
                <div className="mt-4 flex items-center gap-3">
                  <img src={customer.image} alt={customer.name} className="h-12 w-12 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold text-stone-900">{customer.name}</p>
                    <p className="text-xs text-stone-500">Customer</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-4 py-16">
          <span className="inline-block rounded-full bg-brand px-4 py-1 font-script text-lg text-white">Contact Us</span>
          <div className="mt-6 rounded-2xl border border-stone-200 px-6 py-5 text-sm">
            <p className="font-semibold">Contact No: +1 123-456-7890</p>
            <p className="mt-1 font-semibold">Email: contact@example.com</p>
          </div>
          <form className="mt-8 space-y-6">
            <input type="text" placeholder="Name" className="w-full border-b border-stone-200 py-3 text-sm outline-none focus:border-brand" />
            <input type="email" placeholder="Email" className="w-full border-b border-stone-200 py-3 text-sm outline-none focus:border-brand" />
            <input type="text" placeholder="Phone" className="w-full border-b border-stone-200 py-3 text-sm outline-none focus:border-brand" />
            <textarea placeholder="Message" className="min-h-24 w-full border-b border-stone-200 py-3 text-sm outline-none focus:border-brand" />
            <button type="button" className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark">Submit</button>
          </form>
        </section>

        <section className="bg-sky-100">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 sm:grid-cols-2 sm:py-14">
            <div>
              <h2 className="text-2xl font-bold text-stone-900 sm:text-3xl">Register and start planning your trip</h2>
              <p className="mt-3 text-sm text-stone-600 sm:text-base">
                Create an account to book tours and save your trips.
              </p>
              <a href="/signup" className="mt-6 inline-block rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white hover:bg-brand-dark">
                Register
              </a>
            </div>
            <img src="/assets/register-image.png" alt="Traveler" className="mx-auto max-h-64 w-full object-contain sm:max-h-72" />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
