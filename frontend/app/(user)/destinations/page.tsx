"use client";

import { useState, useEffect } from "react";

export default function Destinations() {
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:8080/destinations");

      const data = await response.json();

      if (response.ok) {
        setDestinations(data.destinations);
      } else {
        console.log("Error fetching destinations");
      }
    };

    fetchDestinations();
  }, []);

  return (
    <div>
      <div>
        <h1>Destinations</h1>
      </div>
      {destinations.map((destination) => (
        <div key={destination.id}>
          <h1>{destination.city}</h1>
          <h1>{destination.country}</h1>

          <img src={destination.image} alt={destination.city} />

          <a href={`/destinations/${destination.id}`}>See details</a>
        </div>
      ))}
    </div>
  );
}
