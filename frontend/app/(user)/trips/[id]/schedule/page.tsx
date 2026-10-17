"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export default function ScheduleDay() {
  const [trip, setTrip] = useState(null);
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [day, setDay] = useState(1);
  const [notes, setNotes] = useState("");
  const [title, setTitle] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchTripDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/trip/${params.id}`,
          {
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();

          setTrip(data.trip);
          setPlaces(data.trip.destination.places);
        } else {
          console.log("Error fetching trip details");
        }
      } catch (err) {
        toast.error("Something went wrong, please try again.");
      }
    };

    fetchTripDetails();
  }, []);

  const scheduleDay = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/trip/${params.id}/schedule-day`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            placeId: selectedPlace,
            title,
            notes,
            day,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to schedule the day");
      }
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };
  return (
    <div>
      {trip ? (
        <form
          onSubmit={scheduleDay}
          className="mx-auto w-full max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
        >
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">
              Schedule a day
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Pick a day, a place, and a short note.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700">
              Day
            </label>
            <select
              value={day}
              onChange={(e) => setDay(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
            >
              {Array.from({ length: trip.days }, (_, index) => (
                <option key={index + 1} value={index + 1}>
                  Day {index + 1}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700">
              Place
            </label>
            <select
              value={selectedPlace ?? ""}
              onChange={(e) => setSelectedPlace(Number(e.target.value))}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
            >
              <option value="">Select a place</option>

              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>

          <input
            type="text"
            placeholder="Set title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />

          <textarea
            placeholder="Add notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-28 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />

          <button
            type="submit"
            className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
          >
            Schedule Day
          </button>
        </form>
      ) : (
        <p className="text-sm text-stone-500">Loading trip details...</p>
      )}
    </div>
  );
}
