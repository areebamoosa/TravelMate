"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Destination() {
  const [destination, setDestination] = useState(null);

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

    fetchDestination();
  }, [params.id]);

  return (
    <div>

{destination && (
  <div>
    <h1>{destination.city}</h1>
    <h1>{destination.country}</h1>

    <p>{destination.description}</p>

    <img
      src={destination.image}
      alt={destination.city}
    />
  </div>
)}
    </div>
  );
}
