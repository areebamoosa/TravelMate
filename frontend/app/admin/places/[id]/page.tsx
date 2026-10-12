"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";

export default function CreatePlace() {
  const [updatedName, setName] = useState("");
  const [updatedDescription, setDescription] = useState("");
  const [updatedImage, setImage] = useState("");
  const [updatedCategory, setCategory] = useState("");
  const [updatedLatitude, setLatitude] = useState("");
  const [updatedLongitude, setLongitude] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [destination, setDestination] = useState([]);

  const params = useParams();

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/admin/place/${params.id}`)

       const data = await response.json()

       if (response.ok){
        setName(data.place.name)
        setDescription(data.place.description)
        setImage(data.place.image)
        setCategory(data.place.category)
        setLatitude(data.place.latitude)
        setLongitude(data.place.longitude)
        setDestinationId(data.place.destinationId)
       } else {
        console.log("Failed fetching place's existing data")
       }
    }

    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:8080/admin/destinations");

      const data = await response.json();

      if (response.ok) {
        setDestination(data.destinations);
      } else {
        console.log("Error fetching destinations", data);
      }
    };

    fetchData();
    fetchDestinations();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/admin/update-place/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updatedName,
            updatedDescription,
            updatedImage,
            updatedCategory,
            updatedLatitude,
            updatedLongitude,
           destinationId: parseInt( destinationId),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Place updated successfully", data);
      } else {
        console.log("Error updating place", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Update place</h1>
        <p className="mt-1 text-sm text-stone-500">Edit this place and save the changes.</p>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-stone-700">
          Update Name:
          <input
            type="text"
            value={updatedName}
            name="updatedName"
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-stone-700">
          Update Description:
          <input
            type="text"
            value={updatedDescription}
            name="updatedDescription"
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-stone-700">
          Update Image:
          <input
            type="text"
            value={updatedImage}
            name="updatedImage"
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>
      <div>
        <select
          value={updatedCategory}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
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
          className="w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
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
        <label htmlFor="latitude" className="block text-sm font-medium text-stone-700">
          Update Latitude:
          <input
            type="text"
            value={updatedLatitude}
            name="updatedLatitude"
            onChange={(e) => setLatitude(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
        <label htmlFor="longitude" className="block text-sm font-medium text-stone-700">
          Update Longitude:
          <input
            type="text"
            value={updatedLongitude}
            name="updatedLongitude"
            onChange={(e) => setLongitude(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
      >
        Update Place
      </button>
    </form>
  );
}
