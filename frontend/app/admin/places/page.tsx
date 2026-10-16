"use client";

import { useState, useEffect } from "react";

export default function Places() {
  const [Places, SetPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/places");

        const data = await response.json();
        if (response.ok) {
          SetPlaces(data.places);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/delete-place/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        SetPlaces((prev) =>
          prev.filter((place) => place.id !== data.deletedPlaceId)
        );
      } else {
        console.error("Failed to delete place", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Places</h1>
        <a
          href="/admin/places/create"
          className="rounded-full bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Create
        </a>
      </div>

      <div className="mt-6 grid gap-4">
        {Places.map((place) => {
          return (
            <div
              key={place.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-stone-900">{place.name}</h2>
              <p className="mt-1 text-sm text-stone-600">{place.description}</p>
              <p className="mt-2 break-all text-xs text-stone-400">{place.image}</p>
              <p className="mt-3 inline-block rounded-full bg-orange-50 px-2.5 py-1 text-xs font-medium text-brand">
                {place.category}
              </p>
              <div className="mt-2 flex gap-4 text-xs text-stone-500">
                <p>Lng {place.longitude}</p>
                <p>Lat {place.latitude}</p>
              </div>

              <div className="mt-4 flex gap-3 text-sm">
                <button
                  onClick={() => handleDelete(place.id)}
                  className="rounded-full bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
                <a
                  href={`/admin/places/${place.id}`}
                  className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50"
                >
                  Update
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
