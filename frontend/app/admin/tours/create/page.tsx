"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Tour() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [placeIds, setPlaceIds] = useState([]);
  const [durationUnit, setDurationUnit] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:8080/admin/destinations", {
        credentials: "include"

      });

      const data = await response.json();

      if (response.ok) {
        setDestinations(data.destinations);
      } else {
        console.log("Error fetching destinations");
      }
    };

    const fetchPlaces = async () => {
      const response = await fetch("http://localhost:8080/admin/places", {
        credentials: "include"

      });

      const data = await response.json();

      if (response.ok) {
        setPlaces(data.places);
      } else {
        console.log("Error fetching places");
      }
    };

    fetchPlaces();
    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("duration", duration);
      formData.append("destinationId", destinationId);
      formData.append("placeIds", JSON.stringify(placeIds));
      formData.append("durationUnit", durationUnit);

      const response = await fetch(
        "http://localhost:8080/admin/tours/create-tour",
        {
          method: "POST",
          body: formData,
          credentials: "include"

        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Error creating the tour");
      }
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto w-full max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Create tour</h1>
          <p className="mt-1 text-sm text-stone-500">
            Set the price, length, and places.
          </p>
        </div>
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-stone-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-stone-700"
          >
            Description
          </label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label
            htmlFor="price"
            className="block text-sm font-medium text-stone-700"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label
            htmlFor="image"
            className="block text-sm font-medium text-stone-700"
          >
            Image
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-stone-600"
          />
        </div>
        <div>
          <label
            htmlFor="duration"
            className="block text-sm font-medium text-stone-700"
          >
            Duration
          </label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <select
            value={durationUnit}
            onChange={(e) => setDurationUnit(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          >
            <option>Set Duration Unit</option>

            <option value="hous">Hours</option>
            <option value="day">Day</option>
            <option value="days">Days</option>
            <option value="week">Week</option>
            <option value="weeks">Weeks</option>
            <option value="month">Month</option>
            <option value="months">Months</option>
          </select>
        </div>

        <div>
          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
            className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          >
            <option value="">Select destination: </option>

            {destinations.map((destination) => (
              <option value={destination.id} key={destination.id}>
                {destination.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            multiple
            value={placeIds}
            onChange={(e) => {
              const selectedIds = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );

              setPlaceIds(selectedIds);
            }}
            className="min-h-32 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          >
            <option value="">Select Places: </option>

            {places.map((place) => (
              <option value={place.id} key={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Create tour
        </button>
      </form>
    </div>
  );
}
