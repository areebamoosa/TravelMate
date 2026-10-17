"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function MyTrips() {
  const router = useRouter();
  const [trips, setTrips] = useState([]);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [loginPopup, setLoginPop] = useState(false);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:8080/me", {
          credentials: "include",
        });

        if (response.ok) {
          setIsLoggedIn(true);
          await fetchMyTrips();
        } else {
          setIsLoggedIn(false);
        }
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    const fetchMyTrips = async () => {
      try {
        const response = await fetch("http://localhost:8080/my-trips", {
          credentials: "include",
        });

        const data = await response.json();
        if (response.ok) {
          setTrips(data.trips ?? []);
        } else {
          toast.error(data.message || "Error fetching your trips");
        }
      } catch (err) {
        toast.error("Something went wrong, please try again.");
      }
    };

    checkLogin();
  }, []);

  const deleteTrip = async (id) => {
    try {
      const respsonse = await fetch(`http://localhost:8080/trip/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await respsonse.json();
      if (respsonse.ok) {
        toast.success(data.message);

        setTrips((currentTrips) => 
          currentTrips.filter((trip) => trip.id !== id)
        )
      } else {
        toast.error(data.message || "Error deleting this trip");
      }
    } catch (err) {
      toast.error("Something went wrong, please try again");
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        {trips.length > 0 ? (
          <div>
            <h1 className="text-2xl font-semibold text-stone-900">My Trips</h1>
            <p className="mt-1 text-sm text-stone-500">
              Trips you have planned.
            </p>
          </div>
        ) : (
          <p className="text-lg font-medium text-stone-700">You have no trips. Please create a personalised trip.</p>
        )}

        <button
          onClick={() => {
            if (loggedIn) {
              router.push("/trips/create");
            } else {
              setLoginPop(true);
            }
          }}
          className="rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark"
        >
          Create Trip
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm sm:flex"
          >
            <img
              src={trip.destination?.image}
              alt={trip.destination?.city || trip.title}
              className="h-48 w-full object-cover sm:h-auto sm:w-56"
            />
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-brand">
                    {trip.destination?.city}
                    {trip.destination?.country ? `, ${trip.destination.country}` : ""}
                  </p>
                  <h1 className="mt-1 text-lg font-semibold text-stone-900">{trip.title}</h1>
                </div>
                <button
                  type="button"
                  onClick={() => deleteTrip(trip.id)}
                  aria-label="Delete trip"
                  className="rounded-full p-2 text-red-600 hover:bg-red-50"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 7h16" />
                    <path d="M9 7V5h6v2" />
                    <path d="M8 7l1 12h6l1-12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Start</p>
                  <h2 className="mt-1 font-medium text-stone-800">{String(trip.startDate).split("T")[0]}</h2>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">End</p>
                  <h2 className="mt-1 font-medium text-stone-800">{String(trip.endDate).split("T")[0]}</h2>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-400">Days</p>
                  <h2 className="mt-1 font-medium text-stone-800">{trip.days}</h2>
                </div>
              </div>

              <div className="mt-auto flex flex-wrap gap-3 pt-5 text-sm">
                <a
                  href={`/trips/${trip.id}`}
                  className="rounded-full bg-brand px-4 py-2 font-semibold text-white hover:bg-brand-dark"
                >
                  View Trip details
                </a>
                <a
                  href={`/trips/${trip.id}/update`}
                  className="rounded-full border border-brand px-4 py-2 font-semibold text-brand hover:bg-orange-50"
                >
                  Update Trip details
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {loginPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <h2 className="text-xl font-semibold text-stone-900">
              Login Required
            </h2>

            <p className="mt-2 text-sm text-stone-600">
              Please log in to create a trip.
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={() => setLoginPop(false)}
                className="rounded-full border px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  window.location.href = "/login";
                }}
                className="rounded-full bg-brand px-4 py-2 text-sm text-white"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
