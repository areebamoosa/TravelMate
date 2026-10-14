"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch("http://localhost:8080/me", {
          credentials: "include",
        });

        if (response.ok) {
          router.replace("/");
          return;
        }
      } catch {
        // A failed check leaves the login and signup forms available.
      }

      setShowForm(true);
    };

    checkSession();
  }, [router]);

  if (!showForm) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4">
        <p className="text-sm text-stone-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 px-4 py-10">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
