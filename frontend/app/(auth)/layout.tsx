"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SiteFooter from "@/app/components/layout/SiteFooter";
import SiteHeader from "@/app/components/layout/SiteHeader";
import MediaSlot from "@/app/components/ui/MediaSlot";

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
      <div className="flex min-h-screen items-center justify-center bg-white px-4">
        <p className="text-sm text-stone-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="grid overflow-hidden rounded-xl bg-white shadow-2xl sm:grid-cols-2">
          <MediaSlot label="Illustration" className="min-h-64 md:min-h-full" />
          <div className="bg-brand px-8 py-10 text-white">{children}</div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
