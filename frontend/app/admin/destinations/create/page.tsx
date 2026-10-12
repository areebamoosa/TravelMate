"use client";

import { useState } from "react";

export default function CreateDestination() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("city", city);
    formData.append("country", country);
    formData.append("description", description);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/admin/create-destination",
        {
          method: "POST",

          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Destination created successfully!", data);
      } else {
        console.error("Failed to create destination", data);
      }
    } catch (error) {
      console.error("Error creating destination:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <h1 className="text-2xl font-semibold text-stone-900">Create destination</h1>
      <p className="mt-1 mb-6 text-sm text-stone-500">
        Add a city travelers can browse.
      </p>
      <div className="mb-4">
        <label htmlFor="city" className="block text-sm font-medium text-stone-700">
          City:
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="country" className="block text-sm font-medium text-stone-700">
          Country:
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-stone-700">
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-stone-700">
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-stone-600"
          />
        </label>
      </div>
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <label htmlFor="latitude" className="block text-sm font-medium text-stone-700">
          Latitude:
          <input
            type="text"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
        <label htmlFor="longitude" className="block text-sm font-medium text-stone-700">
          Longitude:
          <input
            type="text"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
      >
        Create Destination
      </button>
    </form>
  );
}
