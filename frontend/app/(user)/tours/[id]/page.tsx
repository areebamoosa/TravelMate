"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";

import TourModal from "@/app/components/TourModal";



export default function Tour() {
  const [tour, setTour] = useState();
  const [modal, setModal] = useState(false);

  const params = useParams();

  useEffect(() => {
    const fetchTour = async () => {
      const response = await fetch(`http://localhost:8080/tour/${params.id}`);

      const data = await response.json();

      if (response.ok) {
        setTour(data.tour);
      } else {
        console.log("Error fetching tour");
      }
    };

    fetchTour();
  }, [params.id]);

  return (
    <div>
      {tour && (
        <div key={tour.id}>
          <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
            <img
              src={tour.image}
              alt={tour.name}
              className="h-72 w-full object-cover"
            />
            <div className="p-6">
              <h1 className="text-3xl font-semibold text-stone-900">{tour.name}</h1>
              <h1 className="mt-3 max-w-3xl leading-relaxed text-stone-600">
                {tour.description}
              </h1>
              <div className="mt-4 flex flex-wrap gap-6">
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-500">Price</p>
                  <h1 className="text-xl font-semibold text-teal-800">{tour.price}</h1>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-stone-500">Duration</p>
                  <div className="flex gap-1 text-xl font-semibold text-stone-900">
                    <h1>{tour.duration}</h1>
                    <h1>{tour.durationUnit}</h1>
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => setModal(true)}
                className="mt-6 rounded-lg bg-teal-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-teal-800"
              >
                Book tour
              </button>
            </div>
          </div>

          <h1 className="mt-10 text-xl font-semibold text-stone-900">
            Places included in tour:{" "}
          </h1>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tour.places.map((tourPlace) => (
              <div
                key={tourPlace.place.id}
                className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm"
              >
                <img
                  src={tourPlace.place.image}
                  alt={tourPlace.place.name}
                  className="h-36 w-full object-cover"
                />
                <h1 className="p-4 text-base font-semibold text-stone-900">
                  {tourPlace.place.name}
                </h1>
              </div>
            ))}
          </div>

          {modal && <TourModal onClose = {() => setModal(false) }/>}
        </div>
      )}
    </div>
  );
}
