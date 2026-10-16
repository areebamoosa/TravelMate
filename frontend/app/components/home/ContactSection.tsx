"use client";

import SectionBadge from "@/app/components/ui/SectionBadge";

export default function ContactSection() {
  return (
    <section id="contact" className="mx-auto max-w-3xl px-4 py-16">
      <SectionBadge>Contact Us</SectionBadge>
      <div className="mt-6 rounded-2xl border border-stone-200 px-6 py-5 text-sm text-stone-800">
        <p className="font-semibold">Contact No: +1 123-456-7890</p>
        <p className="mt-1 font-semibold">Email: contact@example.com</p>
      </div>

      <form
        className="mt-8 space-y-6"
        onSubmit={(event) => event.preventDefault()}
      >
        <input
          type="text"
          placeholder="Name"
          className="w-full border-b border-stone-200 py-3 text-sm outline-none focus:border-brand"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full border-b border-stone-200 py-3 text-sm outline-none focus:border-brand"
        />
        <input
          type="text"
          placeholder="Phone"
          className="w-full border-b border-stone-200 py-3 text-sm outline-none focus:border-brand"
        />
        <textarea
          placeholder="Message"
          className="min-h-24 w-full border-b border-stone-200 py-3 text-sm outline-none focus:border-brand"
        />
        <button
          type="submit"
          className="rounded-full bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Submit
        </button>
      </form>
    </section>
  );
}
