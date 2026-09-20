"use client";

import { useState, useEffect } from "react";

export default function Places() {
  const [Places, SetPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const response = await fetch("http://localhost:8080/admin/places");

        const data = await response.json();
        if (response.ok) {
          SetPlaces(data.places);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchPlaces();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/delete-place/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        SetPlaces((prev) =>
          prev.filter((place) => place.id !== data.deletedPlaceId)
        );
      } else {
        console.error("Failed to delete place", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {Places.map((place) => {
        return (
          <div key={place.id}>
            <h2>{place.name}</h2>
            <p>{place.description}</p>
            <p>{place.image}</p>
            <p>{place.category}</p>
            <p>{place.longitude}</p>
            <p>{place.latitude}</p>

            <button onClick={() => handleDelete(place.id)}>Delete</button>

            <a href={`/admin/places/${place.id}`}>Update</a>
          </div>
        );
      })}
    </div>
  );
}
