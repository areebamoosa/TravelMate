"use client"

export default function AdminDashboard () {
    return (
        <div>
            <h1 className="text-2xl font-semibold text-stone-900">Dashboard</h1>
            <p className="mt-1 text-sm text-stone-500">
                Manage destinations, places, tours, blogs, and bookings.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-stone-900">Destinations</h2>
                    <p className="mt-1 text-sm text-stone-500">Cities and countries travelers can explore.</p>
                    <div className="mt-4 flex gap-3 text-sm">
                        <a href={`/admin/destinations/create`} className="rounded-full bg-brand px-3 py-1.5 font-medium text-white hover:bg-brand-dark">Create</a>
                        <a href={`/admin/destinations`} className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50">All</a>
                    </div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-stone-900">Places</h2>
                    <p className="mt-1 text-sm text-stone-500">Attractions, hotels, and spots inside a city.</p>
                    <div className="mt-4 flex gap-3 text-sm">
                        <a href={`/admin/places/create`} className="rounded-full bg-brand px-3 py-1.5 font-medium text-white hover:bg-brand-dark">Create</a>
                        <a href={`/admin/places`} className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50">All</a>
                    </div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-stone-900">Tours</h2>
                    <p className="mt-1 text-sm text-stone-500">Packaged trips with price and duration.</p>
                    <div className="mt-4 flex gap-3 text-sm">
                        <a href={`/admin/tours/create`} className="rounded-full bg-brand px-3 py-1.5 font-medium text-white hover:bg-brand-dark">Create</a>
                        <a href={`/admin/tours`} className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50">All</a>
                    </div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-stone-900">Blogs</h2>
                    <p className="mt-1 text-sm text-stone-500">Stories and guides for travelers.</p>
                    <div className="mt-4 flex gap-3 text-sm">
                        <a href={`/admin/blogs/create`} className="rounded-full bg-brand px-3 py-1.5 font-medium text-white hover:bg-brand-dark">Create</a>
                        <a href={`/admin/blogs`} className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50">All</a>
                    </div>
                </div>
                <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                    <h2 className="text-lg font-semibold text-stone-900">Bookings</h2>
                    <p className="mt-1 text-sm text-stone-500">Tour reservations and their status.</p>
                    <div className="mt-4 flex gap-3 text-sm">
                        <a href={`/admin/bookings`} className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50">All</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
