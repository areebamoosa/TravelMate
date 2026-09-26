"use client";

import { useState, useEffect } from "react";

export default function Tour() {
  const [tour, setTour] = useState([]);

  useEffect(() => {
    const getTour = async () => {
      const response = await fetch("http://localhost:8080/admin/tours");

      const data = await response.json();

      if (response.ok) {
        setTour(data.tours);
      }
    };

    getTour();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/admin/tour/${id}`, {
      method: "Delete",
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Tour deleted successfully", data);

      setTour((prev) => prev.filter((tour) => tour.id !== id));
    } else {
      console.log("Error deleting the tour");
    }
  };

  return (
    <div>
      {tour.map((tour) => (
        <div key={tour.id}>
          <h1>{tour.name}</h1>
          <h1>{tour.description}</h1>
          <h1>{tour.price}</h1>
          <img src={tour.image} alt={tour.name} />
          <h1>{tour.duration}</h1>

          <h1>Places:</h1>

          {tour.places.map((tourPlace) => (
            <div key={tourPlace.placeId}>
              <h1>{tourPlace.place.name}</h1>
              <h1>{tourPlace.place.description}</h1>
              <img src={tourPlace.place.image} alt={tourPlace.place.name} />
            </div>
          ))}

          <button onClick={() => handleDelete(tour.id)}>Delete</button>
          <a href={`/admin/tours/${tour.id}`}>Update</a>
        </div>
      ))}
    </div>
  );
}
