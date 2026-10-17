"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const formData = new FormData()

      formData.append("title", title)
      formData.append("description", description)
      formData.append("image", image)

      const response = await fetch(
        "http://localhost:8080/admin/blogs/create-blog",
        {
          method: "POST",
          credentials: "include",
        
          body: formData
        }
      );



      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
      } else {
        toast.error(data.message || "Error in creating blog");
      }
    } catch (err) {
      toast.error("Something went wrong please try again");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl space-y-4 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm"
    >
      <div>
        <h1 className="text-2xl font-semibold text-stone-900">Create blog</h1>
        <p className="mt-1 text-sm text-stone-500">
          Write a short travel story.
        </p>
      </div>
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-stone-700"
        >
          Title:
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-stone-700"
        >
          Description:
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 min-h-28 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          ></textarea>
        </label>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block text-sm font-medium text-stone-700"
        >
          Image:
          <input
            type="file"
            id="image"
            name="image"
            required
accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-brand"
          />
        </label>
      </div>

      <button
        type="submit"
        className="rounded-full bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark"
      >
        Create Blog
      </button>
    </form>
  );
}
