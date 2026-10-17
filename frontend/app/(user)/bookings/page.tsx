"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

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
                  <h2 className="text-lg font-semibold text-stone-900">
                    {booking.tour.name}
                  </h2>

                  <div className="mt-4 grid gap-3 sm:grid-cols-4">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-500">
                        Date
                      </p>
                      <p className="mt-1 text-sm font-medium text-stone-900">
                        {new Date(booking.date).toLocaleDateString()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-500">
                        Status
                      </p>
                      <p className="mt-1 inline-block rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-800">
                        {booking.status}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-500">
                        Total
                      </p>
                      <p className="mt-1 text-sm font-semibold text-brand">
                        {booking.totalPrice}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs uppercase tracking-wide text-stone-500">
                        Travelers
                      </p>
                      <p className="mt-1 text-sm font-medium text-stone-900">
                        {booking.travelers}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <h1>You don't have any tours reserved.</h1>
        )
      ) : (
        <h1>Please log in to view your bookings.</h1>
      )}
    </>
  );
}
