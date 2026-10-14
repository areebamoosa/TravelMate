"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";

export default function Trip() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [destinationId, setDestinationId] = useState();

  const params = useParams();

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

    const fetchTripDetails = async () => {
      const response = await fetch(`http://localhost:8080/trip/${params.id}`, {
        credentials: "include",
      });

      const data = await response.json();

      if (response.ok) {
        setTitle(data.trip.title);
        setStartDate(data.trip.startDate.split("T")[0]);
        setEndDate(data.trip.endDate.split("T")[0]);
        setDays(data.trip.days);
        setDestinationId(String(data.trip.destinationId));
      }
    };

    fetchTripDetails();
    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:8080/trip/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          title,
          startDate,
          endDate,
          days,
          destinationId,
        }),
      });
      if (response.ok) {
        console.log("Trip updated successfully");
      } else {
        console.error("Error updating trip");
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Update trip</h1>
          <p className="mt-1 text-sm text-stone-500">
            Change the title, dates, or destination.
          </p>
        </div>
        <div>
          <label htmlFor="" className="block text-sm font-medium text-stone-700">
            Update Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="" className="block text-sm font-medium text-stone-700">
              Update Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
            />
          </div>
          <div>
            <label htmlFor="" className="block text-sm font-medium text-stone-700">
              {" "}
              Update End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
            />
          </div>
        </div>

        <label htmlFor="" className="block text-sm font-medium text-stone-700">
          Update Trip Days
        </label>

        <input
          type="number"
          value={days}
          onChange={(e) => setDays(parseInt(e.target.value))}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
        />

        <label htmlFor="" className="block text-sm font-medium text-stone-700">
          Update destination
        </label>

        <select
          value={destinationId ?? ""}
          onChange={(e) => setDestinationId(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
        >
          <option value="">Select a destination</option>

          {destinations.map((destination) => (
            <option key={destination.id} value={destination.id}>
              {destination.country}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
        >
          Update trip
        </button>
      </form>
    </div>
  );
}
