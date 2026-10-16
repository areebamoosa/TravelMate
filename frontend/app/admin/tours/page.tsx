"use client";

import { useState, useEffect } from "react";

export default function Tour() {
  const [tour, setTour] = useState([]);

  useEffect(() => {
    const getTour = async () => {
      const response = await fetch("http://localhost:8080/admin/tours");

      const data = await response.json();

      if (response.ok) {
        setTour(data.tours);
      }
    };

    getTour();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/admin/tour/${id}`, {
      method: "Delete",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Tour deleted successfully", data);

      setTour((prev) => prev.filter((tour) => tour.id !== id));
    } else {
      console.log("Error deleting the tour");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Tours</h1>
        <a
          href="/admin/tours/create"
          className="rounded-full bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Create
        </a>
      </div>

      <div className="mt-6 grid gap-4">
        {tour.map((tour) => (
          <div
            key={tour.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row">
              <img
                src={tour.image}
                alt={tour.name}
                className="h-36 w-full rounded-xl object-cover sm:w-48"
              />
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold text-stone-900">{tour.name}</h1>
                <h1 className="mt-1 text-sm text-stone-600">{tour.description}</h1>
                <div className="mt-2 flex gap-4 text-sm">
                  <h1 className="font-semibold text-brand">{tour.price}</h1>
                  <h1 className="text-stone-500">{tour.duration}</h1>
                </div>
              </div>
            </div>

            <h1 className="mt-4 text-sm font-medium text-stone-700">Places:</h1>

            <div className="mt-2 grid gap-3 sm:grid-cols-2">
              {tour.places.map((tourPlace) => (
                <div
                  key={tourPlace.placeId}
                  className="flex gap-3 rounded-xl border border-stone-200 p-2"
                >
                  <img
                    src={tourPlace.place.image}
                    alt={tourPlace.place.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div>
                    <h1 className="text-sm font-semibold text-stone-900">
                      {tourPlace.place.name}
                    </h1>
                    <h1 className="text-xs text-stone-500">{tourPlace.place.description}</h1>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 flex gap-3 text-sm">
              <button
                onClick={() => handleDelete(tour.id)}
                className="rounded-full bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
              >
                Delete
              </button>
              <a
                href={`/admin/tours/${tour.id}`}
                className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50"
              >
                Update
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
