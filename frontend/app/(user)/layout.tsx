import AuthMenu from "@/app/components/AuthMenu";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <a href="/" className="text-lg font-semibold text-teal-800">
            TravelMate
          </a>
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <a href="/destinations" className="text-stone-600 hover:text-teal-800">
              Destinations
            </a>
            <a href="/tours" className="text-stone-600 hover:text-teal-800">
              Tours
            </a>
            <a href="/trips" className="text-stone-600 hover:text-teal-800">
              Trips
            </a>
            <a href="/bookings" className="text-stone-600 hover:text-teal-800">
              Bookings
            </a>
            <AuthMenu />
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
