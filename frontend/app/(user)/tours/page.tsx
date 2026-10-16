"use client";

import { useState, useEffect } from "react";


export default function Tours() {
  const [tours, setTours] = useState([]);


  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch("http://localhost:8080/tours");

      const data = await response.json();

      if (response.ok) {
        setTours(data.tours);
      } else {
        console.log("Error fetching tours");
      }
    };

    fetchTours();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Tours</h1>
      <p className="mt-1 text-sm text-stone-500">
        Pick a tour and see what is included.
      </p>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <img
              src={tour.image}
              alt={tour.name}
              className="h-44 w-full object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold text-stone-900">{tour.name}</h1>
              <h1 className="mt-2 line-clamp-3 text-sm text-stone-600">{tour.description}</h1>
              <h1 className="mt-3 text-base font-semibold text-brand">{tour.price}</h1>
              <div className="mt-1 flex gap-1 text-sm text-stone-500">
                <h1>{tour.duration}</h1>
                <h1>{tour.durationUnit}</h1>
              </div>
              <a
                href={`/tours/${tour.id}`}
                className="mt-4 inline-block text-sm font-medium text-brand hover:text-brand-dark"
              >
                See details of tour
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
