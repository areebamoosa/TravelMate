import AuthMenu from "@/app/components/AuthMenu";

export default function AdminLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <div className="flex min-h-screen flex-col bg-stone-100 sm:flex-row">
        <aside className="shrink-0 bg-stone-900 text-stone-100 sm:flex sm:w-56 sm:flex-col">
          <div className="px-5 py-4 sm:py-6">
            <a href="/admin" className="text-lg font-semibold tracking-tight">
              TravelMate
            </a>
            <p className="mt-1 text-xs uppercase tracking-wide text-stone-400">
              Admin
            </p>
          </div>
          <nav className="flex flex-wrap gap-1 px-3 pb-4 text-sm sm:flex-1 sm:flex-col sm:flex-nowrap sm:pb-0">
            <a href="/admin" className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-stone-800">
              Dashboard
            </a>
            <a href="/admin/destinations" className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-stone-800">
              Destinations
            </a>
            <a href="/admin/places" className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-stone-800">
              Places
            </a>
            <a href="/admin/tours" className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-stone-800">
              Tours
            </a>
            <a href="/admin/blogs" className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-stone-800">
              Blogs
            </a>
            <a href="/admin/bookings" className="whitespace-nowrap rounded-lg px-3 py-2 hover:bg-stone-800">
              Bookings
            </a>
            <a href="/" className="whitespace-nowrap rounded-lg px-3 py-2 text-stone-400 hover:bg-stone-800 hover:text-white sm:mt-4">
              Back to site
            </a>
            <AuthMenu variant="admin" />
          </nav>
        </aside>
        <main className="min-w-0 flex-1 p-4 sm:p-8">{children}</main>
      </div>
    );
  }
