"use client";

import { useParams } from "next/navigation";
import { useState } from "react";

export default function CreateDestination() {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const params = useParams();

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
        console.log("Destination created successfully!", data);
      } else {
        console.error("Failed to create destination", data);
      }
    } catch (error) {
      console.error("Error creating destination:", error);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label htmlFor="city">
          Update City:
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
          Update Country:
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
          Update Description:
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
          Update Image:
          <input
            type="text"
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="latitude">
          Update Latitude:
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
          Update Longitude:
          <input
            type="text"
            name="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
      </div>

      <button type="submit"> Update Destination</button>
    </form>
  );
}
