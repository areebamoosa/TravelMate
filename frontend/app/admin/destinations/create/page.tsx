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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="city">
          City:
          <input
            type="text"
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="country">
          Country:
          <input
            type="text"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          Description:
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="image">
          Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>
      </div>
      <div>
        <label htmlFor="latitude">
          Latitude:
          <input
            type="text"
            name="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="longitude">
          Longitude:
          <input
            type="text"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
      </div>

      <button type="submit"> Create Destination</button>
    </form>
  );
}
