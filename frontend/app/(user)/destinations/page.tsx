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
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <img
              src={destination.image}
              alt={destination.city}
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold text-stone-900">{destination.city}</h1>
              <h1 className="text-sm text-stone-500">{destination.country}</h1>
              <a
                href={`/destinations/${destination.id}`}
                className="mt-4 inline-block text-sm font-medium text-teal-700 hover:text-teal-800"
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
