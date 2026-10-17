"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function CreatePlace() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [destination, setDestination] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:8080/admin/destinations", {
        credentials: "include"

      });

      const data = await response.json();

      if (response.ok) {
        setDestination(data.destinations);
      } else {
        console.log("Error fetching destinations", data);
      }
    };

    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("destinationId", destinationId);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        "http://localhost:8080/admin/places/create-place",
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
        toast.error(data.message || "Failed to create a place");
      }
    } catch (err) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Create place</h1>
        <p className="mt-1 text-sm text-stone-500">
          Add a spot inside a destination.
        </p>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-stone-700"
        >
          Name:
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-stone-700"
        >
          {" "}
          Description:
          <input
            type="text"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-stone-700"
        >
          {" "}
          Image:
          <input
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-stone-600"
          />
        </label>
      </div>
      <div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="">Select Category</option>
          <option value="restaurant">Restaurant</option>
          <option value="hotel">Hotels</option>
          <option value="shopping">Shopping Malls</option>
          <option value="transport">Transport</option>
          <option value="activity">Activity</option>
        </select>
      </div>

      <div>
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
        >
          <option value="">Select destination:</option>

          {destination.map((dest) => (
            <option value={dest.id} key={dest.id}>
              {dest.city}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label
          htmlFor="latitude"
          className="block text-sm font-medium text-stone-700"
        >
          Latitude:
          <input
            type="text"
            value={latitude}
            name="latitude"
            onChange={(e) => setLatitude(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
        <label
          htmlFor="longitude"
          className="block text-sm font-medium text-stone-700"
        >
          Longitude:
          <input
            type="text"
            value={longitude}
            name="longitude"
            onChange={(e) => setLongitude(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
      >
        Create Place
      </button>
    </form>
  );
}
