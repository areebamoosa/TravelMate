"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";

export default function CreatePlace() {
  const [updatedName, setName] = useState("");
  const [updatedDescription, setDescription] = useState("");
  const [updatedImage, setImage] = useState("");
  const [updatedCategory, setCategory] = useState("");
  const [updatedLatitude, setLatitude] = useState("");
  const [updatedLongitude, setLongitude] = useState("");
  const [destinationId, setDestinationId] = useState("");
  const [destination, setDestination] = useState([]);

  const params = useParams();

  useEffect(() => {

    const fetchData = async () => {
      const response = await fetch(`http://localhost:8080/admin/place/${params.id}`)

       const data = await response.json()

       if (response.ok){
        setName(data.place.name)
        setDescription(data.place.description)
        setImage(data.place.image)
        setCategory(data.place.category)
        setLatitude(data.place.latitude)
        setLongitude(data.place.longitude)
        setDestinationId(data.place.destinationId)
       } else {
        console.log("Failed fetching place's existing data")
       }
    }

    const fetchDestinations = async () => {
      const response = await fetch("http://localhost:8080/admin/destinations");

      const data = await response.json();

      if (response.ok) {
        setDestination(data.destinations);
      } else {
        console.log("Error fetching destinations", data);
      }
    };

    fetchData();
    fetchDestinations();
  }, []);


  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/admin/update-place/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updatedName,
            updatedDescription,
            updatedImage,
            updatedCategory,
            updatedLatitude,
            updatedLongitude,
           destinationId: parseInt( destinationId),
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log("Place updated successfully", data);
      } else {
        console.log("Error updating place", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleUpdate}>
      <div>
        <label htmlFor="name">
          Update Name:
          <input
            type="text"
            value={updatedName}
            name="updatedName"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          Update Description:
          <input
            type="text"
            value={updatedDescription}
            name="updatedDescription"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="image">
          Update Image:
          <input
            type="text"
            value={updatedImage}
            name="updatedImage"
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
      </div>
      <div>
        <select
          value={updatedCategory}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          <option value="restaurant">Restaurant</option>
          <option value="hotel">Hotels</option>
          <option value="shopping">Shopping Malls</option>
          <option value="transport">Transport</option>
          <option value="activity">Activity</option>
        </select>
      </div>

      <div>
        <select
          value={destinationId}
          onChange={(e) => setDestinationId(e.target.value)}
        >
          <option value="">Select destination:</option>

          {destination.map((dest) => (
            <option value={dest.id} key={dest.id}>
              {dest.city}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="latitude">
          Update Latitude:
          <input
            type="text"
            value={updatedLatitude}
            name="updatedLatitude"
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="longitude">
          Update Longitude:
          <input
            type="text"
            value={updatedLongitude}
            name="updatedLongitude"
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Update Place</button>
    </form>
  );
}
