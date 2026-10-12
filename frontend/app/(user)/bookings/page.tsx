"use client";

import { useState, useEffect } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async (e) => {
      try {
        const response = await fetch("http://localhost:8080/bookings", {
            credentials: "include"
        });

        if (response.ok) {
          const data = await response.json();
          setBookings(data.bookings);
        } else {
          console.log("Error fetching bookings");
        }
      } catch (err) {
        console.error("Error: ", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1>My Bookings</h1>

      {bookings.map((booking) => {
        <div key={booking.id}>
          <h1>{booking.tour.name}</h1>
          <h1>{booking.travelers}</h1>
          <h1>{booking.totalPrice}</h1>
          <h1>{booking.status}</h1>
          <h1>{booking.date}</h1>
        </div>;
      })}
    </div>
  );
}
