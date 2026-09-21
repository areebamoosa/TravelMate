"use client"

export default function AdminDashboard () {
    return (
        <div>

            <div >
                <h2>Destinations</h2>
                <a href={`/admin/destinations/create`}>Create</a>
                <br />
                <a href={`/admin/destinations`}>All </a>
            </div>
            <div>
                <h2>Places</h2>
                <a href={`/admin/places/create`}>Create</a>
                <br />

                <a href={`/admin/places`}>All </a>
            </div>
            <div>
                <h2>Tours</h2>
                <a href={`/admin/tours/create`}>Create</a>
                <br />

                <a href={`/admin/tours`}>All </a>
            </div>
            <div>
                <h2>Blogs</h2>
                <a href={`/admin/blogs/create`}>Create</a>
                <br />

                <a href={`/admin/blogs`}>All </a>
            </div>

        </div>
    )
}