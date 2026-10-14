"use client";

import { useState } from "react";
import AuthMenu from "@/app/components/AuthMenu";

export default function TravelMate() {
  return (
    <div className="min-h-screen bg-stone-50">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4">
          <span className="text-lg font-semibold text-teal-800">TravelMate</span>
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

      <main className="mx-auto max-w-6xl px-4 py-20">
        <p className="text-sm font-medium uppercase tracking-wide text-teal-700">
          Your travel companion
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-stone-900">
          Travel Mate
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-stone-600">
          TravelMate is your all-in-one travel companion for discovering
          destinations, exploring places, and planning unforgettable trips.
          Discover new destinations, explore attractions and experiences, and
          organize your entire journey in one place.
        </p>
        <a
          href={`/destinations`}
          className="mt-8 inline-block rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800"
        >
          Explore Destinations
        </a>
      </main>
    </div>
  );
}
