import AuthMenu from "@/app/components/AuthMenu";
import Logo from "@/app/components/layout/Logo";

export default function SiteFooter() {
  return (
    <footer className="border-t border-stone-100 bg-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Logo />
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
            <p>Plan a trip from destinations, tours, and your own schedule.</p>
          </div>
        </div>
      </div>
      <p className="border-t border-stone-100 py-4 text-center text-xs text-stone-500">
        © 2026 TravelMate. All rights reserved.
      </p>
    </footer>
  );
}
