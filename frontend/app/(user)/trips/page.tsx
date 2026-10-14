"use client";

import { useState, useEffect } from "react";

export default function MyTrips() {
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    const fetchMyTrips = async () => {
      const response = await fetch("http://localhost:8080/my-trips", {
        credentials: "include"

      });

      if (response.ok) {
        const data = await response.json();

        setTrips(data.trips ?? [] );
      } else {
        console.log("Error fetching your trips")
      }
    };

    fetchMyTrips();
  }, []);


  const deleteTrip = async (id) => {
    const respsonse = await fetch(`http://localhost:8080/trip/${id}`, {
        method: "DELETE",
        credentials: "include"
    })

    if (respsonse.ok){
        console.log("Trip deleted successfully");
    } else {
        console.log("Error deleting the trip")
    }
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">My Trips</h1>
          <p className="mt-1 text-sm text-stone-500">
            Trips you have planned.
          </p>
        </div>
        <a
          href="/trips/create"
          className="rounded-lg bg-teal-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-teal-800"
        >
          Create trip
        </a>
      </div>

      <div className="mt-6 grid gap-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h1 className="text-lg font-semibold text-stone-900">{trip.title}</h1>
            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">Start</p>
                <h2 className="mt-1 text-stone-800">{trip.startDate}</h2>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">End</p>
                <h2 className="mt-1 text-stone-800">{trip.endDate}</h2>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">Days</p>
                <h2 className="mt-1 text-stone-800">{trip.days}</h2>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={`/trips/${trip.id}`}
                className="rounded-lg bg-teal-700 px-3 py-1.5 font-medium text-white hover:bg-teal-800"
              >
                View Trip details
              </a>
              <a
                href={`/trips/${trip.id}/update`}
                className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50"
              >
                Update Trip details
              </a>
              <button
                onClick={() => deleteTrip(trip.id)}
                className="rounded-lg bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
              >
                Delete Trip
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
