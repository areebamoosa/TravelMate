"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation";

export default function TourModal({ onClose }) {

    const [tour, setTour] = useState();

    const [date, setDate] = useState("")
    const [travelers, setTravelers] = useState(1)

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


    const handleBooking = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:8080/admin/tour/booking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({ tourId: parseInt(tour.id), date, travelers: parseInt(travelers), totalPrice: parseInt(tour.price * travelers) })
        })

        if (response.ok) {
            console.log("Booking created successfully")
        } else {
            console.log("Error creating booking")
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4">
            {tour && (

                <div key={tour.id} className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">


                    <h1 className="text-xl font-semibold text-stone-900">Book Tour</h1>

                    <form onSubmit={handleBooking} className="mt-4 space-y-4">
                        <h1 className="text-lg font-medium text-stone-800">{tour.name}</h1>
                        <h2 id="price" className="text-sm text-stone-500">
                            <span className="block text-xs uppercase tracking-wide">Price</span>
                            <span className="text-base font-semibold text-teal-800">{tour.price}</span>
                        </h2>

                        <label className="block text-sm font-medium text-stone-700">
                            Date:
                            <input
                                type="date"
                                name="date"
                                id="date"
                                required
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                            />
                        </label>

                        <div>
                            <h2 className="text-sm font-medium text-stone-700">Number of travelers:</h2>
                            <input
                                type="number"
                                id="travelors"
                                value={travelers}
                                onChange={(e) => setTravelers(parseInt(e.target.value))}
                                min={1}
                                className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
                            />
                        </div>

                        <div className="rounded-lg bg-stone-50 px-3 py-2">
                            <h2 className="text-xs uppercase tracking-wide text-stone-500">Total Price: </h2>
                            <p className="text-lg font-semibold text-stone-900">{tour.price * travelers}</p>
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-lg bg-teal-700 py-2.5 text-sm font-medium text-white hover:bg-teal-800"
                        >
                            Confirm Booking
                        </button>
                    </form>

                    <button
                        onClick={onClose}
                        className="mt-3 w-full rounded-lg border border-stone-300 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50"
                    >
                        Cancel
                    </button>
                </div>



            )}


        </div>
    )
}
