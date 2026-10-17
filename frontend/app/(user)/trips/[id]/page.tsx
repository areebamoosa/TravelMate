"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function Trip() {
  const [trip, setTrip] = useState(null);
  const [schedules, setSchedules] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchTripDetails = async () => {
      const response = await fetch(`http://localhost:8080/trip/${params.id}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setTrip(data.trip);
      } else {
        console.log("Error fetching trip details");
      }
    };

    const fetchTripSchedules = async () => {
      const response = await fetch(
        `http://localhost:8080/trip/${params.id}/schedules`,
        { credentials: "include" }
      );
      const data = await response.json();

      if (response.ok) {
        setSchedules(data.tripSchedules);
      } else if (response.status === 404) {
        setSchedules([]);
      } else {
toast.error("Error fetching trip's schedules")
      }
    };

    fetchTripDetails();
    fetchTripSchedules();
  }, []);

  return (
    <div>
      {trip ? (
        <div className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-semibold text-stone-900">{trip.title}</h1>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <p className="text-stone-600">
              <span className="block text-xs uppercase tracking-wide text-stone-500">
                Start Date
              </span>
              <span className="mt-1 block text-base font-medium text-stone-900">
                {trip.startDate.split("T")[0]}
              </span>
            </p>
            <p className="text-stone-600">
              <span className="block text-xs uppercase tracking-wide text-stone-500">
                End Date
              </span>
              <span className="mt-1 block text-base font-medium text-stone-900">
                {trip.endDate.split("T")[0]}
              </span>
            </p>
            <p className="text-stone-600">
              <span className="block text-xs uppercase tracking-wide text-stone-500">
                Days
              </span>
              <span className="mt-1 block text-base font-medium text-stone-900">
                {trip.days}
              </span>
            </p>
            <p className="text-stone-600">
              <span className="block text-xs uppercase tracking-wide text-stone-500">
                Destination ID
              </span>
              <span className="mt-1 block text-base font-medium text-stone-900">
                {trip.destinationId}
              </span>
            </p>
          </div>

          <a
            href={`/trips/${trip.id}/schedule`}
            className="mt-6 inline-block rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Schedule days of your trip
          </a>
        </div>
      ) : (
        <p className="text-sm text-stone-500">Loading trip details...</p>
      )}

      {trip && schedules.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-stone-900">Schedule</h2>
          <div className="mt-4 grid gap-4">
            {[...schedules]
              .sort((a, b) => a.day - b.day)
              .map((schedule) => (
              <div
                key={schedule.id}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm sm:flex"
              >
                <img
                  src={schedule.place.image}
                  alt={schedule.place.name}
                  className="h-44 w-full object-cover sm:h-auto sm:w-48"
                />
                <div className="p-5">
                  <p className="text-xs font-medium uppercase tracking-wide text-brand">
                    Day {schedule.day}
                  </p>
                  <h1 className="mt-1 text-lg font-semibold text-stone-900">{schedule.title}</h1>
                  <h1 className="mt-1 text-sm text-stone-500">{schedule.place.name}</h1>
                  <h1 className="mt-3 text-sm leading-relaxed text-stone-600">{schedule.notes}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
