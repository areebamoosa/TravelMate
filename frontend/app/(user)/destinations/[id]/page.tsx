"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import TravelMapLoader from "@/app/components/TravelMapLoader";
import Weather from "@/app/components/Weather";

export default function Destination() {
  const [destination, setDestination] = useState(null);
  const [places, setPlaces] = useState([]);

  const [tours, setTours] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchDestination = async () => {
      const response = await fetch(
        `http://localhost:8080/destination/${params.id}`
      );

      const data = await response.json();

      if (response.ok) {
        setDestination(data.destination);
      } else {
        console.log("Error fetching destination");
      }
    };

    const fetchDestinationPlaces = async () => {
      const response = await fetch(`http://localhost:8080/places/${params.id}`);

      const data = await response.json();

      if (response.ok) {
        setPlaces(data.places);
      } else {
        console.log("Error fetching destination places");
      }
    };

    const fetchTours = async () => {
      const response = await fetch(`http://localhost:8080/tours/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setTours(data.tours);
      } else {
        console.log("Error fetching tours of this destination");
      }
    };
    fetchTours();

    fetchDestination();
    fetchDestinationPlaces();
  }, [params.id]);

  return (
    <div>
      {destination && (
        <>
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <img
              src={destination.image}
              alt={destination.city}
              className="h-72 w-full object-cover"
            />

            <div className="p-6">
              <h1 className="text-3xl font-semibold text-stone-900">
                {destination.city}
              </h1>

              <h1 className="mt-1 text-sm font-medium uppercase tracking-wide text-brand">
                {destination.country}
              </h1>

              <p className="mt-4 max-w-3xl leading-relaxed text-stone-600">
                {destination.description}
              </p>
            </div>
          </div>

          {destination.latitude != null && destination.longitude != null && (
            <section className="mt-8 grid items-stretch gap-4 lg:grid-cols-5">
              <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm lg:col-span-3">
                <div className="border-b border-stone-100 px-5 py-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-stone-400">
                    Location
                  </p>
                  <h2 className="mt-1 text-lg font-semibold text-stone-900">
                    {destination.city}, {destination.country}
                  </h2>
                </div>
                <div className="h-[340px]">
                  <TravelMapLoader
                    latitude={Number(destination.latitude)}
                    longitude={Number(destination.longitude)}
                    name={`${destination.city}, ${destination.country}`}
                  />
                </div>
              </div>

              <div className="lg:col-span-2">
                <Weather
                  latitude={Number(destination.latitude)}
                  longitude={Number(destination.longitude)}
                />
              </div>
            </section>
          )}
        </>
      )}

      <h2 className="mt-10 text-xl font-semibold text-stone-900">Places</h2>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {places.map((place) => (
          <div
            key={place.id}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <img
              src={place.image}
              alt={place.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
              <h1 className="text-lg font-semibold text-stone-900">
                {place.name}
              </h1>
              <h1 className="mt-1 text-sm text-stone-600">
                {place.description}
              </h1>
              <h1 className="mt-3 inline-block rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-brand">
                {place.category}
              </h1>
              <div className="mt-3 text-xs text-stone-500">
                <h1>Lat {place.latitude}</h1>
                <h1>Lng {place.longitude}</h1>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h1 className="mt-10 text-xl font-semibold text-stone-900">
        See availaible tours for this destination:
      </h1>

      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => (
          <div
            key={tour.id}
            className="group overflow-hidden rounded-3xl border border-orange-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <img
              src={tour.image}
              alt={tour.name}
              className="h-56 w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="p-5">
              <h1 className="text-lg font-semibold text-stone-900">
                {tour.name}
              </h1>
              <h1 className="mt-2 text-base font-semibold text-brand">
                {tour.price}
              </h1>
              <div className="mt-1 flex gap-1 text-sm text-stone-500">
                <h1>{tour.duration}</h1>
                <h1>{tour.durationUnit}</h1>
              </div>
              <a
                href={`/tours/${tour.id}`}
                className="mt-4 inline-block rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-dark"
              >
                See details of Tour
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
