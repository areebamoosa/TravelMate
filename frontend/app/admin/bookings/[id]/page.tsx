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
  }, [params.id]);

  const handleStatus = async (status) => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/tour/booking/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingStatus: status,
          }),
        }
      );

      if (response.ok) {
        console.log("Status of booking updated successfully");

        setBooking((prevBooking) => ({
          ...prevBooking, 
          status: status
        }))
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
        <div className="max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Booking</h1>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-500">Date</p>
              <h1 className="mt-1 text-sm font-medium text-stone-900">{booking.date}</h1>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-500">Status</p>
              <h1 className="mt-1 inline-block rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                {booking.status}
              </h1>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-500">Total</p>
              <h1 className="mt-1 text-sm font-semibold text-teal-800">{booking.totalPrice}</h1>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-500">Travelers</p>
              <h1 className="mt-1 text-sm font-medium text-stone-900">{booking.travelers}</h1>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => handleStatus("Confirmed")}
              className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatus("Cancelled")}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
