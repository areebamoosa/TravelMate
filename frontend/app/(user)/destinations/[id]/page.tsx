"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Destination() {
  const [destination, setDestination] = useState(null);
  const [places, setPlaces] = useState([]);

  const params = useParams();

  useEffect(() => {
    const fetchDestination = async () => {
      const response = await fetch(
        `http://localhost:8080/destination/${params.id}`
      );

      const data = await response.json();

      if (response.ok) {
        setDestination(data.destination);
      } else {
        console.log("Error fetching destination");
      }
    };

    const fetchDestinationPlaces = async () => {
      const response = await fetch(`http://localhost:8080/places/${params.id}`);

      const data = await response.json();

      if (response.ok) {
        setPlaces(data.places);
      } else {
        console.log("Error fetching destination places");
      }
    };

    fetchDestination();
    fetchDestinationPlaces();
  }, [params.id]);

  return (
    <div>
      {destination && (
        <div>
          <h1>{destination.city}</h1>
          <h1>{destination.country}</h1>

          <p>{destination.description}</p>

          <img src={destination.image} alt={destination.city} />
        </div>
      )}

      {places.map((place) => (
        <div key={places.id}>
          <h1>{place.name}</h1>
          <h1>{place.description}</h1>
          <h1>{place.category}</h1>
          <h1>{place.latitude}</h1>
          <h1>{place.longitude}</h1>

          <img src={place.image} alt={place.name} />
        </div>
      ))}
    </div>
  );
}
