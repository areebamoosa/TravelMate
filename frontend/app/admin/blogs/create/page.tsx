"use client";

import { useState } from "react";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:8080/admin/blogs/create-blog",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title,
            description,
            image,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        return console.log("Blog created successfully", data);
      } else {
        return console.log("Error in creating blog", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">
          Title:
          <input
            type="text"
            id="title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
      </div>
      <div>
        <label htmlFor="image">
          Image:
          <input
            type="text"
            id="image"
            required
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
      </div>

      <button type="submit">Create Blog</button>

    </form>
  );
}
