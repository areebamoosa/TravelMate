"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function CreateTrip() {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [days, setDays] = useState(1);
  const [destinations, setDestinations] = useState([]);
  const [destinationId, setDestinationId] = useState();

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
    fetchDestinations();
  }, []);

  const calculateDays = (start, end) => {
    if (!start || !end) {
      setDays(1);
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const difference = endDate.getTime() - startDate.getTime();
    const totalDays = difference / (1000 * 60 * 60 * 24) + 1;

    setDays(totalDays > 0 ? totalDays : 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/create-trip", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          startDate,
          endDate,
          days,
          destinationId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to create a trip");
      }
    } catch (err) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Create trip</h1>
          <p className="mt-1 text-sm text-stone-500">
            Set the dates and the destination.
          </p>
        </div>
        <div>
          <label
            htmlFor=""
            className="block text-sm font-medium text-stone-700"
          >
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-stone-700"
            >
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => {
                const data = e.target.value;
                setStartDate(data);
                calculateDays(data, endDate);
              }}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
          <div>
            <label
              htmlFor=""
              className="block text-sm font-medium text-stone-700"
            >
              End Date
            </label>

            <input
              type="date"
              value={endDate}
              onChange={(e) => {
                const data = e.target.value;
                setEndDate(data);
                calculateDays(startDate, data);
              }}
              className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
            />
          </div>
        </div>

        <label htmlFor="" className="block text-sm font-medium text-stone-700">
          Trip Days
        </label>

        <input
          type="number"
          value={days}
          readOnly
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
        />

        <label htmlFor="" className="block text-sm font-medium text-stone-700">
          Select destination
        </label>

        <select
          value={destinationId ?? ""}
          onChange={(e) => setDestinationId(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
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
          className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Create trip
        </button>
      </form>
    </div>
  );
}
