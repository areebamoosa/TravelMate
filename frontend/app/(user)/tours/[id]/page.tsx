"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";

export default function Tour() {
  const [tour, setTour] = useState();

  const params = useParams();

  useEffect(() => {
    const fetchTour = async () => {
      const response = await fetch(`http://localhost:8080/tour/${params.id}`);

      const data = await response.json();

      if (response.ok) {
        setTour(data.tour);
      } else {
        console.log("Error fetching tour");
      }
    };

    fetchTour();
  }, [params.id]);

  return (
    <div>
      {tour && (
        <div key={tour.id}>
          <h1>{tour.name}</h1>
          <img src={tour.image} alt={tour.name} />
          <h1>{tour.description}</h1>
          <h1>{tour.price}</h1>
          <h1>{tour.duration}</h1>
          <h1>{tour.durationUnit}</h1>

          <h1>Places included in tour: </h1>

          {tour.places.map((tourPlace) => (
            <div key={tourPlace.place.id}>
              <h1>{tourPlace.place.name}</h1>
              <img src={tourPlace.place.image} alt={tourPlace.place.name} />
            </div>
          ))}
          <button>Book tour</button>
        </div>
      )}
    </div>
  );
}
