"use client";

import { useState, useEffect } from "react";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async (e) => {
      try {
        const response = await fetch("http://localhost:8080/bookings", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Bookings data: ", data);
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
      <h1 className="text-2xl font-semibold text-stone-900">My Bookings</h1>
      <p className="mt-1 text-sm text-stone-500">Tours you have reserved.</p>

      <div className="mt-6 grid gap-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h1 className="text-lg font-semibold text-stone-900">{booking.tour.name}</h1>
            <div className="mt-4 grid gap-3 sm:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">Date</p>
                <h1 className="mt-1 text-sm font-medium text-stone-900">
                  {new Date(booking.date).toLocaleDateString()}
                </h1>
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
          </div>
        ))}
      </div>
    </div>
  );
}
