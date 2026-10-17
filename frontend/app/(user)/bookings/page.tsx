"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

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
  const [loggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:8080/me", {
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true);
          await fetchBookings();
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };

    const fetchBookings = async () => {
      try {
        const response = await fetch("http://localhost:8080/bookings", {
          credentials: "include",
        });

        const data = await response.json();

        if (response.status === 404) {
          setBookings([]);
          return;
        }

        if (response.ok) {
          setBookings(data.bookings ?? []);
        } else {
          toast.error(data.message || "Failed to fetch bookings");
        }
      } catch (err) {
        toast.error("Something went wrong, please try again");
      }
    };

    checkLogin();
  }, []);

  return (
    <>
      {loggedIn ? (
        bookings.length > 0 ? (
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">
              My Bookings
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Tours you have reserved.
            </p>

            <div className="mt-6 grid gap-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <h2 className="text-lg font-semibold text-stone-900">
                      {booking.tour.name}
                    </h2>
                    <p className={`rounded-full px-3 py-1 text-xs font-medium uppercase ${statusStyle(booking.status)}`}>
                      {booking.status}
                    </p>
                  </div>

                  <div className="mt-4 grid gap-4 border-t border-stone-100 pt-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-400">
                        Date
                      </p>
                      <p className="mt-1 text-sm font-medium text-stone-800">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-400">
                        Total
                      </p>
                      <p className="mt-1 text-sm font-medium text-stone-800">
                        {booking.totalPrice}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-400">
                        Travelers
                      </p>
                      <p className="mt-1 text-sm font-medium text-stone-800">
                        {booking.travelers}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1 className="text-2xl font-semibold text-stone-900">You don't have any tours reserved.</h1>
        )
      ) : (
        <h1 className="text-2xl font-semibold text-stone-900">Please log in to view your bookings.</h1>
      )}
    </>
  );
}
