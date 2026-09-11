"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

export default function UpdateBlog() {
  const [updateTitle, setTitle] = useState("");
  const [updateDescription, setDescription] = useState("");
  const [updateImage, setImage] = useState("");

  const params = useParams();

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="updateTitle">
          Title:
          <input
            type="text"
            id="updateTitle"
            required
            value={updateTitle}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label htmlFor="updateDescription">
          Description:
          <textarea
            id="updateDescription"
            value={updateDescription}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>
      </div>
      <div>
        <label htmlFor="updateDescription">
          Image:
          <input
            type="text"
            id="image"
            required
            value={updateDescription}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
      </div>
    </form>
  );
}
