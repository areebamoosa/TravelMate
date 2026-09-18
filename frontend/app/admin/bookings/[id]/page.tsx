"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

export default function Bookings() {
  const [booking, setBooking] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await fetch(
        `http://localhost:8080/admin/tour/booking/${params.id}`,
        {
          method: "GET",
        }
      );

      const data = await response.json();

      if (response.ok) {
        setBooking(data.booking);
      } else {
        console.log("Failed to fetch bookings");
      }
    };

    fetchBooking();
  }, []);

  const handleStatus = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/tour/booking/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: status,
          }),
        }
      );

      if (response.ok) {
        console.log("Status of booking updated successfully");
      } else {
        console.log("Could not update status of booking");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {booking && (
        <div>
          <h1>{booking.date}</h1>
          <h1>{booking.status}</h1>
          <h1>{booking.totalPrice}</h1>
          <h1>{booking.travelers}</h1>

          <button onClick={() => handleStatus("Confirmed")}>Approve</button>
          <button onClick={() => handleStatus("Cancelled")}>Cancel</button>
        </div>
      )}
    </div>
  );
}
