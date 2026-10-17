"use client";

import { useState, useEffect } from "react";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:8080/destinations");

      const data = await response.json();

      if (response.ok) {
        setDestinations(data.destinations);
      } else {
        console.log("Error fetching destinations");
      }
    }; 
    fetchDestinations();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Destinations</h1>
        <p className="mt-1 text-sm text-stone-500">
          Browse cities and countries to start a trip.
        </p>
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={destination.image}
              alt={destination.city}
              className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="p-5">
              <h1 className="text-lg font-semibold text-stone-900">{destination.city}</h1>
              <h1 className="text-sm text-stone-500">{destination.country}</h1>
              <a
                href={`/destinations/${destination.id}`}
                className="mt-4 inline-block rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                See details
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
