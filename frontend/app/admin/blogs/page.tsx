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
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <h1>{blog.title}</h1>
            <h1>{blog.description}</h1>
            <h1>{blog.image}</h1>

            <a href={`/admin/blogs/${blog.id}`}>Update Blog</a>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
}
