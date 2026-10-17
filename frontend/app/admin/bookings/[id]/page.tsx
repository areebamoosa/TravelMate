"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
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
  const [booking, setBooking] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchBooking = async () => {
      const response = await fetch(
        `http://localhost:8080/admin/tour/booking/${params.id}`,
        {
          method: "GET",
          credentials: "include",
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
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            bookingStatus: status,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);

        setBooking((prevBooking) => ({
          ...prevBooking,
          status: status,
        }));
      } else {
        toast.error(data.message || "Errorr updating the status of booking");
      }
    } catch (err) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <div>
      {booking && (
        <div className="mx-auto w-full max-w-xl rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold text-stone-900">Booking</h1>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
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

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => handleStatus("Confirmed")}
              className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
            >
              Approve
            </button>
            <button
              onClick={() => handleStatus("Cancelled")}
              className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
