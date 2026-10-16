"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

export default function Tour() {
  const [updatedName, setName] = useState("");
  const [updatedDescription, setDescription] = useState("");
  const [updatedPrice, setPrice] = useState("");
  const [updatedImage, setImage] = useState("");
  const [updatedDuration, setDuration] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [updatedPlaceIds, setPlaceIds] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchTour = async () => {
      const response = await fetch(
        `http://localhost:8080/admin/tour/${params.id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setName(data.tour.name);
        setDescription(data.tour.description);
        setPrice(data.tour.price);
        setImage(data.tour.image);
        setDuration(data.tour.duration);
        setDestinationId(data.tour.destinationId);
        setPlaceIds(data.tour.places.map((place) => place.placeId.toString()));
      }
    };

    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:8080/admin/destinations");

      const data = await response.json();

      if (response.ok) {
        setDestinations(data.destinations);
      } else {
        console.log("Error fetching destinations");
      }
    };

    const fetchPlaces = async () => {
      const response = await fetch("http://localhost:8080/admin/places");

      const data = await response.json();

      if (response.ok) {
        setPlaces(data.places);
      } else {
        console.log("Error fetching places");
      }
    };

    fetchTour();
    fetchPlaces();
    fetchDestinations();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/admin/tour/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updatedName,
            updatedDescription,
            updatedPrice,
            updatedImage,
            updatedDuration,
            updatedPlaceIds,
            destinationId,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Tour created successfully", data);
      } else {
        console.log("Error creating tour");
      }
    } catch (err) {
      console.log("Error creating the form.");
    }
  };

  return (
    <div>
      <form
        onSubmit={handleUpdate}
        className="max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
      >
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">Update tour</h1>
          <p className="mt-1 text-sm text-stone-500">Change the tour details below.</p>
        </div>
        <div>
          <label htmlFor="updateName" className="block text-sm font-medium text-stone-700">Name</label>
          <input
            type="text"
            id="updateName"
            value={updatedName}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label htmlFor="updateDescription" className="block text-sm font-medium text-stone-700">Description</label>
          <input
            type="text"
            id="updateDescription"
            value={updatedDescription}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>

        <div>
          <label htmlFor="updatePrice" className="block text-sm font-medium text-stone-700">Price</label>
          <input
            type="text"
            id="updatePrice"
            value={updatedPrice}
            onChange={(e) => setPrice(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </div>
        <div>
          <label htmlFor="updateImage" className="block text-sm font-medium text-stone-700">Image</label>
          <input
            type="file"
            id="updateImage"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 block w-full text-sm text-stone-600"
          />
        </div>
        <div>
          <label htmlFor="updateDuration" className="block text-sm font-medium text-stone-700">Duration</label>
          <input
            type="text"
            id="updateDuration"
            value={updatedDuration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
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
            value={updatedPlaceIds}
            onChange={(e) => {
              const selectedIds = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );

              setPlaceIds(selectedIds);
            }}
            className="min-h-32 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          >
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
          Update tour
        </button>
      </form>
    </div>
  );
}
