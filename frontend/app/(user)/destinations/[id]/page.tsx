"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Destination() {
  const [destination, setDestination] = useState(null);
  const [places, setPlaces] = useState([]);

  const [tours, setTours] = useState([]);

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

    const fetchTours = async () => {
      const response = await fetch(`http://localhost:8080/tours/${params.id}`);
      const data = await response.json();

      if (response.ok) {
        setTours(data.tours);
      } else {
        console.log("Error fetching tours of this destination");
      }
    };
    fetchTours();

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
        <div key={place.id}>
          <h1>{place.name}</h1>
          <h1>{place.description}</h1>
          <h1>{place.category}</h1>
          <h1>{place.latitude}</h1>
          <h1>{place.longitude}</h1>

          <img src={place.image} alt={place.name} />
        </div>
      ))}

      <h1>See availaible tours for this destination:</h1>

      {tours.map((tour) => (
        <div key={tour.id}>
          <h1>{tour.name}</h1>
          <h1>{tour.price}</h1>
          <h1>{tour.duration}</h1>
          <h1>{tour.durationUnit}</h1>
          <img src={tour.image} alt={tour.name} />

          <a href={`/tours/${tour.id}`}>See details of Tour</a>
        </div>
      ))}
    </div>
  );
}
