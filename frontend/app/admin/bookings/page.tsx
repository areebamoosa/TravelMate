"use client"

import { useEffect, useState } from "react"

export default function Bookings() {
    const [bookings, setBookings] = useState([])

    useEffect(() => {
        const fetchBookings = async () => {
            const response = await fetch("http://localhost:8080/admin/tour/bookings", {
                method: "GET"
            })

            const data = await response.json()

            if (response.ok){
                setBookings(data.bookings)
            } else {
                console.log("Failed to fetch bookings")
            }
        }

        fetchBookings()
    }, [])

    return (
        <div>

            {bookings.map((booking) => (
                <div key={booking.id}>
                    <h1>{booking.date}</h1>
                    <h1>{booking.status}</h1>
                    <h1>{booking.totalPrice}</h1>
                    <h1>{booking.travelers}</h1>
                </div>
            ))}

        </div>
    )
}