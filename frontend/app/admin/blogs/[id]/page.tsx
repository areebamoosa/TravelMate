"use client";

import { useState, useEffect } from "react";

import { useParams } from "next/navigation";

export default function UpdateBlog() {
  const [updateTitle, setTitle] = useState("");
  const [updateDescription, setDescription] = useState("");
  const [updateImage, setImage] = useState("");

  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:8080/admin/blog/${params.id}`
      );

      const data = await response.json();

      if (response.ok) {
        setTitle(data.blog.title);
        setDescription(data.blog.description);
        setImage(data.blog.description);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const responsee = await fetch(
        `http://localhost:8080/admin/blog/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            updateTitle,
            updateDescription,
            updateImage,
          }),
        }
      );

      const data = await responsee.json();

      if (responsee.ok) {
        return console.log("Blog updated successfully", data);
      } else {
        return console.log("Error in updating blog", data);
      }
    } catch (err) {
      console.log("Error in updating blog, pleasee try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Update blog</h1>
        <p className="mt-1 text-sm text-stone-500">Edit the title, story, and image.</p>
      </div>
      <div>
        <label htmlFor="updateTitle" className="block text-sm font-medium text-stone-700">
          Title:
          <input
            type="text"
            id="updateTitle"
            required
            value={updateTitle}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>
      <div>
        <label htmlFor="updateDescription" className="block text-sm font-medium text-stone-700">
          Description:
          <textarea
            id="updateDescription"
            value={updateDescription}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 min-h-28 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          ></textarea>
        </label>
      </div>
      <div>
        <label htmlFor="updateDescription" className="block text-sm font-medium text-stone-700">
          Image:
          <input
            type="text"
            id="image"
            required
            value={updateDescription}
            onChange={(e) => setImage(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
          />
        </label>
      </div>

      <button className="rounded-lg bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800">
        Update
      </button>
    </form>
  );
}
