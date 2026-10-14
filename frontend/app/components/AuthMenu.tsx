"use client";

import { useEffect, useState } from "react";
import LogoutButton from "./LogoutButton";

export default function AuthMenu({ variant = "site" }: { variant?: "site" | "admin" }) {
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
      <LogoutButton className="whitespace-nowrap rounded-lg border border-stone-300 px-3 py-1.5 font-medium text-stone-700 hover:bg-stone-50" />
    );
  }

  return (
    <>
      <a href="/login" className="text-stone-600 hover:text-teal-800">
        Login
      </a>
      <a
        href="/signup"
        className="whitespace-nowrap rounded-lg bg-teal-700 px-3 py-1.5 font-medium text-white hover:bg-teal-800"
      >
        Sign up
      </a>
    </>
  );
}
