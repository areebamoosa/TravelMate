import AuthMenu from "@/app/components/AuthMenu";

export default function Footer() {
  return (
    <footer className="border-t border-stone-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href="/" className="inline-flex items-center gap-2 text-lg font-bold tracking-tight text-stone-900">
            TRAVEL<span className="text-brand">MATE</span>
            <svg viewBox="0 0 32 32" className="h-6 w-6 text-brand" aria-hidden="true">
              <path
                fill="currentColor"
                d="M28 14.2 18.4 16l-3.2-6.2c-.4-.8-1.4-1.1-2.2-.7l-.6.3 2.2 7.2-6.4 1.2-1.8-2.2c-.3-.4-.8-.6-1.3-.5l-.8.2 1.6 4.4c.2.5.7.8 1.2.7l20.2-3.8c.8-.2 1.3-1 1.1-1.8-.1-.3-.3-.5-.6-.6Z"
              />
            </svg>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-500">
            TravelMate helps you discover destinations, plan tours, and keep every trip in one place.
          </p>
        </div>
        <div>
          <h2 className="text-base font-semibold text-stone-900">Discover</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm text-stone-600">
            <a href="/" className="hover:text-brand">Home</a>
            <a href="/destinations" className="hover:text-brand">Destinations</a>
            <a href="/tours" className="hover:text-brand">Tours</a>
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold text-stone-900">Quick Links</h2>
          <div className="mt-4 flex flex-col gap-2 text-sm text-stone-600">
            <a href="/trips" className="hover:text-brand">Trips</a>
            <a href="/bookings" className="hover:text-brand">Bookings</a>
            <AuthMenu variant="footer" />
          </div>
        </div>
        <div>
          <h2 className="text-base font-semibold text-stone-900">Contact</h2>
          <div className="mt-4 space-y-2 text-sm text-stone-600">
            <p>Email: support@travelmate.com</p>
            <p>Phone: +1 123-456-7890</p>
          </div>
        </div>
      </div>
      <p className="border-t border-stone-100 py-4 text-center text-xs text-stone-500">
        © 2026 TravelMate. All rights reserved.
      </p>
    </footer>
  );
}
