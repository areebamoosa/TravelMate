"use client";

import { useState, useEffect } from "react";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await fetch("http://localhost:8080/admin/blogs");

      const data = await response.json();

      if (response.ok) {
        setBlogs(data.blogs);
      } else {
        console.log("Error fetching blogs", data);
      }
    };

    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8080/admin/blog/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Blog deleted successfuly");

      setBlogs(blogs.filter((blog) => blog.id !== id));
    } else {
      console.log("Error deleting the blog");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-stone-900">Blogs</h1>
        <a
          href="/admin/blogs/create"
          className="rounded-full bg-brand px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-dark"
        >
          Create
        </a>
      </div>

      <div className="mt-6 grid gap-4">
        {blogs.map((blog) => {
          return (
            <div
              key={blog.id}
              className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm"
            >
              <h1 className="text-lg font-semibold text-stone-900">{blog.title}</h1>
              <h1 className="mt-2 text-sm leading-relaxed text-stone-600">{blog.description}</h1>
              <h1 className="mt-2 break-all text-xs text-stone-400">{blog.image}</h1>

              <div className="mt-4 flex gap-3 text-sm">
                <a
                  href={`/admin/blogs/${blog.id}`}
                  className="rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50"
                >
                  Update Blog
                </a>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="rounded-full bg-red-600 px-3 py-1.5 font-medium text-white hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
