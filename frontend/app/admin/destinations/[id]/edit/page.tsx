"use client";

import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function CreateDestination() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/destination/${params.id}`,
          {
            method: "GET",
            credentials: "include"
          }
        );

        const data = await response.json();

        if (response.ok) {
          setCity(data.destination.city);
          setCountry(data.destination.country);
          setDescription(data.destination.description);
          setImage(data.destination.image);
          setLatitude(data.destination.latitude);
          setLongitude(data.destination.longitude);
        } else {
          console.log(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/admin/destination/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            updatedCity: city,
            updatedCountry: country,
            updatedDescription: description,
            updatedImage: image,
            updatedLatitude: latitude,
            updatedLongitude: longitude,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Failed to update destination");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again.");
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <h1 className="text-2xl font-semibold text-stone-900">
        Update destination
      </h1>
      <p className="mt-1 mb-6 text-sm text-stone-500">
        Edit the details for this destination.
      </p>
      <div className="mb-4">
        <label
          htmlFor="city"
          className="block text-sm font-medium text-stone-700"
        >
          Update City:
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>
      <div className="mb-4">
        <label
          htmlFor="country"
          className="block text-sm font-medium text-stone-700"
        >
          Update Country:
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>
      <div className="mb-4">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-stone-700"
        >
          Update Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>
      <div className="mb-4">
        <label
          htmlFor="image"
          className="block text-sm font-medium text-stone-700"
        >
          Update Image:
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
        <label
          htmlFor="latitude"
          className="block text-sm font-medium text-stone-700"
        >
          Update Latitude:
          <input
            type="text"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
        <label
          htmlFor="longitude"
          className="block text-sm font-medium text-stone-700"
        >
          Update Longitude:
          <input
            type="text"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
      >
        Update Destination
      </button>
    </form>
  );
}
