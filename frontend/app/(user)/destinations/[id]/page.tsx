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
            <section className="mt-10">
              <h2 className="mb-4 text-xl font-semibold text-stone-900">
                Explore on Map
              </h2>

              <div className="overflow-hidden rounded-2xl border border-stone-200 shadow-sm">
                <TravelMapLoader
                  latitude={Number(destination.latitude)}
                  longitude={Number(destination.longitude)}
                  name={`${destination.city}, ${destination.country}`}
                />
              </div>
            </section>
          )}
        </>
      )}

      {destination &&
        destination.latitude != null &&
        destination.longitude != null && (
          <Weather
            latitude={Number(destination.latitude)}
            longitude={Number(destination.longitude)}
          />
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
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
          >
            <img
              src={tour.image}
              alt={tour.name}
              className="h-40 w-full object-cover"
            />
            <div className="p-4">
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
                className="mt-4 inline-block text-sm font-medium text-brand hover:text-brand-dark"
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
