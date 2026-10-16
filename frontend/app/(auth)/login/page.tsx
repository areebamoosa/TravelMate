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
    <form onSubmit={handleSubmit} className="mx-auto max-w-sm text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-lg font-semibold">
        TM
      </div>
      <h1 className="text-3xl font-bold">Login</h1>

      <label htmlFor="" className="mt-6 block text-left text-sm font-medium">
        Email
      </label>

      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/40 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none"
      />

{errors.email && (
  <p className="mt-1 text-left text-sm text-red-100">{errors.email}</p>
)}

<label htmlFor="" className="mt-4 block text-left text-sm font-medium">Password</label>


      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mt-2 w-full rounded-md border border-white/40 bg-white px-3 py-2.5 text-sm text-stone-800 outline-none"
      />

{errors.password && (
  <p className="mt-1 text-left text-sm text-red-100">{errors.password}</p>
)}

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-stone-900 py-2.5 text-sm font-semibold text-white hover:bg-stone-800"
      >
        Login
      </button>

      {errors.general && (
  <p className="mt-3 text-sm text-red-100">{errors.general}</p>
)}

      <p className="mt-4 text-center text-sm">
        New here?{" "}
        <a href="/signup" className="font-semibold underline">
          Register
        </a>
      </p>
    </form>
  );
}
