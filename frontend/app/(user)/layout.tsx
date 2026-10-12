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
            <a href="/login" className="text-stone-600 hover:text-teal-800">
              Login
            </a>
            <a
              href="/signup"
              className="whitespace-nowrap rounded-lg bg-teal-700 px-3 py-1.5 font-medium text-white hover:bg-teal-800"
            >
              Sign up
            </a>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
