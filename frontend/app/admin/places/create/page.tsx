"use client";

import { useState, useEffect } from "react";

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
      const response = await fetch("http://localhost:8080/admin/destinations");

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

    try {
      const response = await fetch("http://localhost:8080/admin/create-place", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          image,
          category,
          latitude,
          longitude,
          destinationId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Place created successfully", data);
      } else {
        console.log("Error creating place", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">
          Name:
          <input
            type="text"
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          {" "}
          Description:
          <input
            type="text"
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="image">
          {" "}
          Image:
          <input
            type="text"
            value={image}
            name="image"
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
      </div>
      <div>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
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
        >
          <option value="">Select destination:</option>

          {destination.map((dest) => (
            <option value={dest.id} key={dest.id}>
              {dest.city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="latitude">
          Latitude:
          <input
            type="text"
            value={latitude}
            name="latitude"
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="longitude">
          Longitude:
          <input
            type="text"
            value={longitude}
            name="longitude"
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Create Place</button>
    </form>
  );
}
