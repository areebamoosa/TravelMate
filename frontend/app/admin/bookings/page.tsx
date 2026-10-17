"use client";

import { useEffect, useState } from "react";

function statusStyle(status) {
  const value = String(status || "").toLowerCase();
  if (value === "confirmed" || value === "approved") {
    return "bg-green-100 text-green-700";
  }
  if (value === "cancelled" || value === "canceled") {
    return "bg-red-100 text-red-700";
  }
  return "bg-sky-100 text-sky-700";
}

export default function Bookings() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/admin/tour/bookings",
          {
            method: "GET",
            credentials: "include",
          }
        );

        const data = await response.json();

        if (response.ok) {
          setBookings(data.bookings);
        } else {
          console.log("Failed to fetch bookings");
        }
      } catch (err) {
        console.error("Fetch Error: ", err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-stone-900">Bookings</h1>
      <p className="mt-1 text-sm text-stone-500">
        Tour reservations waiting for review.
      </p>

      <div className="mt-6 grid gap-4">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <div className="grid gap-3 sm:grid-cols-4">
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">
                  Date
                </p>
                <h1 className="mt-1 text-sm font-medium text-stone-900">
                  {booking.date}
                </h1>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">
                  Status
                </p>
                <h1 className={`mt-1 inline-block rounded-full px-2.5 py-1 text-xs font-medium uppercase ${statusStyle(booking.status)}`}>
                  {booking.status}
                </h1>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">
                  Total
                </p>
                <h1 className="mt-1 text-sm font-semibold text-brand">
                  {booking.totalPrice}
                </h1>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">
                  Travelers
                </p>
                <h1 className="mt-1 text-sm font-medium text-stone-900">
                  {booking.travelers}
                </h1>
              </div>
            </div>
            <a
              href={`/admin/bookings/${booking.id}`}
              className="mt-4 inline-block text-sm font-medium text-brand hover:text-brand-dark"
            >
              View booking
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
