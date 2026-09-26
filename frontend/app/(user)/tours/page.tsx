"use client";

import { useState, useEffect } from "react";


export default function Tours() {
  const [tours, setTours] = useState([]);


  useEffect(() => {
    const fetchTours = async () => {
      const response = await fetch("http://localhost:8080/tours");

      const data = await response.json();

      if (response.ok) {
        setTours(data.tours);
      } else {
        console.log("Error fetching tours");
      }
    };

    fetchTours();
  }, []);

  return (
    <div>
      {tours.map((tour) => (
        <div key={tour.id}>
          <h1>{tour.name}</h1>
          <img src={tour.image} alt={tour.name} />
          <h1>{tour.description}</h1>
          <h1>{tour.price}</h1>
          <h1>{tour.duration}</h1>
          <h1>{tour.durationUnit}</h1>

          <a href={`/tours/${tour.id}`}>See details of tour</a>
        </div>
      ))}
    </div>
  );
}
