"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function MyTrips() {

  const router = useRouter()
  const [trips, setTrips] = useState([]);

  const [loggedIn, setIsLoggedIn] = useState(false);
  const [loginPopup, setLoginPop] = useState(false);

  useEffect(() => {

    const checkLogin = async () => {
      try {
        const response = await fetch("http://localhost:8080/me", {
          credentials: "include",
        });

        setIsLoggedIn(response.ok);
      } catch (err) {
        setIsLoggedIn(false);
      }
    };
    const fetchMyTrips = async () => {
      const response = await fetch("http://localhost:8080/my-trips", {
        credentials: "include"

      });

      if (response.ok) {
        const data = await response.json();

        setTrips(data.trips ?? [] );
      } else {
        console.log("Error fetching your trips")
      }
    };

    checkLogin()

    fetchMyTrips();
  }, []);


  const deleteTrip = async (id) => {
    const respsonse = await fetch(`http://localhost:8080/trip/${id}`, {
        method: "DELETE",
        credentials: "include"
    })

    if (respsonse.ok){
        console.log("Trip deleted successfully");
    } else {
        console.log("Error deleting the trip")
    }
  }



  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-stone-900">My Trips</h1>
          <p className="mt-1 text-sm text-stone-500">
            Trips you have planned.
          </p>
        </div>


        <button onClick={() => {
          if (loggedIn){
            router.push("/trips/create")


          } else {
            setLoginPop(true)
          }
        }}>Create Trip</button>

      </div>

      <div className="mt-6 grid gap-4">
        {trips.map((trip) => (
          <div
            key={trip.id}
            className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
          >
            <h1 className="text-lg font-semibold text-stone-900">{trip.title}</h1>
            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">Start</p>
                <h2 className="mt-1 text-stone-800">{trip.startDate}</h2>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">End</p>
                <h2 className="mt-1 text-stone-800">{trip.endDate}</h2>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-stone-500">Days</p>
                <h2 className="mt-1 text-stone-800">{trip.days}</h2>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              <a
                href={`/trips/${trip.id}`}
                className="rounded-full bg-brand px-3 py-1.5 font-medium text-white hover:bg-brand-dark"
              >
                View Trip details
              </a>
              <a
                href={`/trips/${trip.id}/update`}
                className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50"
              >
                Update Trip details
              </a>
              <button
                onClick={() => deleteTrip(trip.id)}
                className="rounded-full bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
              >
                Delete Trip
              </button>
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
                  Please log in to book this tour.
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
