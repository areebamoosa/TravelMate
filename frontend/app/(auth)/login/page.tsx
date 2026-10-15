"use client";

import { useState } from "react";


import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok){
        if (data.errors){

          const fieldErrors = {}

          data.errors.forEach((error: {path; msg}) => {
            fieldErrors[error.path] = error.msg
          })

          setErrors(fieldErrors)

        } else {
          setErrors({general: data.message || "Login failed"})
        }
      }

      if (response.ok) {
        console.log("Login successful!", data);


        if (data.role === "Admin"){
          router.push("/admin");
        } else {

          router.push('/')

        }
      } else {
        console.error(" Login failed", data);
      }
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm"
    >
      <p className="text-sm font-medium text-teal-700">TravelMate</p>
      <h1 className="mt-1 text-2xl font-semibold text-stone-900">Login</h1>
      <p className="mt-1 text-sm text-stone-500">
        Sign in to continue planning your trips.
      </p>

      <label htmlFor="">Email</label>

      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-6 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
      />

{errors.email && (
  <p className="text-sm text-red-500">{errors.email}</p>
)}

<label htmlFor="">Password</label>


      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-3 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-teal-600"
      />

{errors.password && (
  <p className="text-sm text-red-500">{errors.password}</p>
)}

      <button
        type="submit"
        className="mt-5 w-full rounded-lg bg-teal-700 py-2.5 text-sm font-medium text-white hover:bg-teal-800"
      >
        Login
      </button>

      {errors.general && (
  <p className="text-sm text-red-500">{errors.general}</p>
)}

      <p className="mt-4 text-center text-sm text-stone-500">
        New here?{" "}
        <a href="/signup" className="font-medium text-teal-700 hover:text-teal-800">
          Sign up
        </a>
      </p>
    </form>
  );
}
