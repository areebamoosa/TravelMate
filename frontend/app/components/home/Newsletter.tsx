"use client";

import MediaSlot from "@/app/components/ui/MediaSlot";

export default function Newsletter() {
  return (
    <section className="bg-sky-100">
      <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 lg:grid-cols-2">
        <div>
          <h2 className="text-3xl font-bold text-stone-900">
            Subscribe to get Useful Traveling Information
          </h2>
          <form
            className="mt-6 flex max-w-md overflow-hidden rounded-lg bg-white"
            onSubmit={(event) => event.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full px-4 py-3 text-sm outline-none"
            />
            <button
              type="submit"
              className="m-1 rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Subscribe
            </button>
          </form>
          <p className="mt-4 max-w-md text-sm text-stone-600">
            Hear about new destinations and tours. This box is ready for you to connect later.
          </p>
        </div>
        <MediaSlot
          label="Newsletter image"
          className="h-56 rounded-3xl bg-sky-50 lg:h-64"
        />
      </div>
    </section>
  );
}
