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
        body: JSON.stringify({ email, password, confirmPassword }),
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
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm text-center">
      <h1 className="text-3xl font-bold">Register</h1>

      <input
        type="text"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-6 w-full rounded-md bg-white px-3 py-2.5 text-sm text-stone-800 outline-none"
      />
      {errors.email && <p className="mt-1 text-left text-sm text-red-100">{errors.email}</p>}
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-3 w-full rounded-md bg-white px-3 py-2.5 text-sm text-stone-800 outline-none"
      />

      {errors.password && (
        <p className="mt-1 text-left text-sm text-red-100">{errors.password}</p>
      )}

      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mt-3 w-full rounded-md bg-white px-3 py-2.5 text-sm text-stone-800 outline-none"
      />

      {errors.confirmPassword && (
        <p className="mt-1 text-left text-sm text-red-100">{errors.confirmPassword}</p>
      )}

      {errors.general && (
        <p className="mt-3 text-sm text-red-100">{errors.general}</p>
      )}

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-stone-900 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
      >
        Create Account
      </button>

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <a href="/login" className="font-semibold underline">
          Login
        </a>
      </p>
    </form>
  );
}
