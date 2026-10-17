"use client";

import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

export default function AuthMenu({ variant = "site" }: { variant?: "site" | "admin" | "footer" }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;

    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8080/me", {
          credentials: "include",
        });

        if (active) {
          setLoggedIn(response.ok);
        }
      } catch {
        if (active) {
          setLoggedIn(false);
        }
      } finally {
        if (active) {
          setReady(true);
        }
      }
    };

    checkSession();

    return () => {
      active = false;
    };
  }, []);

  if (!ready) {
    return null;
  }

  if (variant === "footer") {
    if (loggedIn) {
      return (
        <LogoutButton className="text-left text-sm text-stone-600 hover:text-brand" />
      );
    }

    return (
      <>
        <a href="/login" className="hover:text-brand">Login</a>
        <a href="/signup" className="hover:text-brand">Register</a>
      </>
    );
  }

  if (variant === "admin") {
    if (!loggedIn) {
      return null;
    }

    return (
      <LogoutButton className="whitespace-nowrap rounded-lg px-3 py-2 text-left text-stone-300 hover:bg-stone-800 hover:text-white" />
    );
  }

  if (loggedIn) {
    return (
      <LogoutButton className="whitespace-nowrap rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark" />
    );
  }

  return (
    <>
      <a href="/login" className="text-sm font-medium text-stone-800 hover:text-brand">
        Login
      </a>
      <a
        href="/signup"
        className="whitespace-nowrap rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Register
      </a>
    </>
  );
}
