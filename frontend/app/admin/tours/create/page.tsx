"use client";

import { useEffect, useState } from "react";

export default function Tour() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [duration, setDuration] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [destinations, setDestinations] = useState([]);
  const [places, setPlaces] = useState([]);
  const [placeIds, setPlaceIds] = useState([]);
  const [durationUnit, setDurationUnit] = useState("");

  useEffect(() => {
    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:8080/admin/destinations");

      const data = await response.json();

      if (response.ok) {
        setDestinations(data.destinations);
      } else {
        console.log("Error fetching destinations");
      }
    };

    const fetchPlaces = async () => {
      const response = await fetch("http://localhost:8080/admin/places");

      const data = await response.json();

      if (response.ok) {
        setPlaces(data.places);
      } else {
        console.log("Error fetching places");
      }
    };

    fetchPlaces();
    fetchDestinations();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", image);
      formData.append("duration", duration);
      formData.append("destinationId", destinationId);
      formData.append("placeIds", JSON.stringify(placeIds));
      formData.append("durationUnit", durationUnit);

      const response = await fetch(
        "http://localhost:8080/admin/tours/create-tour",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Tour created successfully", data);
      } else {
        console.log("Error creating tour");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>
        <div>
          <label htmlFor="duration">Duration</label>
          <input
            type="text"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>

        <div>
          <select
            value={durationUnit}
            onChange={(e) => setDurationUnit(e.target.value)}
          >
            <option>Set Duration Unit</option>

            <option value="hous">Hours</option>
            <option value="day">Day</option>
            <option value="days">Days</option>
            <option value="week">Week</option>
            <option value="weeks">Weeks</option>
            <option value="month">Month</option>
            <option value="months">Months</option>
          </select>
        </div>

        <div>
          <select
            value={destinationId}
            onChange={(e) => setDestinationId(e.target.value)}
          >
            <option value="">Select destination: </option>

            {destinations.map((destination) => (
              <option value={destination.id} key={destination.id}>
                {destination.country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            multiple
            value={placeIds}
            onChange={(e) => {
              const selectedIds = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );

              setPlaceIds(selectedIds);
            }}
          >
            <option value="">Select Places: </option>

            {places.map((place) => (
              <option value={place.id} key={place.id}>
                {place.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Create tour</button>
      </form>
    </div>
  );
}
