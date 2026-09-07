"use client";

import { useEffect, useState } from "react";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/destinations"
        );

        const data = await response.json();
        if (response.ok) {
          setDestinations(data.destinations);
        } else {
          console.error("Failed to fetch destinations", data);
        }
      } catch (error) {
        console.error("Error fetching destinations:", error);
      }
    };

    fetchDestinations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        "http://localhost:8080/admin/delete-destionation",
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setDestinations((prev) => {
          prev.filter(
            (destination) => destination.id !== data.deletedDestinationId
          );
        });
      } else {
        console.error("Failed to delete destination", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Destinations</h1>

      {destinations.map((destination) => (
        <div key={destination.id}>
          <h2>{destination.city}</h2>
          <p>{destination.country}</p>
          <p>{destination.description}</p>
          <p>{destination.image}</p>
          <p>{destination.latitude}</p>
          <p>{destination.longitude}</p>

          <a href={`/admin/destinations/${destination.id}/edit`}>
            Update destination
          </a>

          <button type="submit" onClick={() => handleDelete(destination.id)}>
            Delete Destination
          </button>
        </div>
      ))}
    </div>
  );
}
