"use client";

import { useState } from "react";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch("http://localhost:8080/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.errors) {
          const fieldErrors = {};

          data.errors.forEach((error) => {
            fieldErrors[error.path] = error.msg;
          });

          setErrors(fieldErrors);
        } else {
          setErrors({ general: data.message || "Signup failed" });
        }
      }

      if (response.ok) {
        console.log("Signup successful!", data);
      } else {
        console.error(" Signup failed", data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
    >
      <p className="text-sm font-medium text-teal-700">TravelMate</p>
      <h1 className="mt-1 text-2xl font-semibold text-stone-900">Sign up</h1>
      <p className="mt-1 text-sm text-stone-500">
        Create an account to book tours and save trips.
      </p>

      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-6 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
      />
      {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
      <input
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-3 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
      />

      {errors.password && (
        <p className="text-sm text-red-500">{errors.password}</p>
      )}

      <input
        type="text"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mt-3 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
      />

      {errors.confirmPassword && (
        <p className="text-sm text-red-500">{errors.confirmPassword}</p>
      )}

      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-teal-700 py-2.5 text-sm font-medium text-white hover:bg-teal-800"
      >
        Sign Up
      </button>

      <p className="mt-4 text-center text-sm text-stone-500">
        Already have an account?{" "}
        <a
          href="/login"
          className="font-medium text-teal-700 hover:text-teal-800"
        >
          Login
        </a>
      </p>
    </form>
  );
}
