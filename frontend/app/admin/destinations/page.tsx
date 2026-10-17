"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/destinations"
        , {
          credentials: "include"
        });

        const data = await response.json();
        if (response.ok) {
          setDestinations(data.destinations);
        } else {
          console.error("Failed to fetch destinations", data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/delete-destination/${id}`,
        {
          method: "DELETE",
          credentials: "include"
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDestinations((prev) =>
          prev.filter((destination) => destination.id !== data.destinationId)
        );

        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to delete destination");
      }
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Destinations</h1>
        <a
          href="/admin/destinations/create"
          className="rounded-full bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Create
        </a>
      </div>

      <div className="mt-6 grid gap-4">
        {destinations.map((destination) => (
          <div
            key={destination.id}
            className="flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-sm sm:flex-row"
          >
            <img
              src={destination.image}
              alt="destination.city"
              className="h-36 w-full rounded-xl object-cover sm:w-48"
            />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold text-stone-900">
                {destination.city}
              </h2>
              <p className="text-sm text-brand">{destination.country}</p>
              <p className="mt-2 text-sm text-stone-600">
                {destination.description}
              </p>
              <div className="mt-2 flex gap-4 text-xs text-stone-500">
                <p>Lat {destination.latitude}</p>
                <p>Lng {destination.longitude}</p>
              </div>
              <div className="mt-4 flex gap-3 text-sm">
                <a
                  href={`/admin/destinations/${destination.id}/edit`}
                  className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50"
                >
                  Update destination
                </a>
                <button
                  onClick={() => handleDelete(destination.id)}
                  className="rounded-full bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
                >
                  Delete Destination
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
