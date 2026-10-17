"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isSignup = pathname.startsWith("/signup");

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
    <div className="flex min-h-screen flex-col bg-white">
      <Header />
      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-8 sm:py-16">
        <div className="grid overflow-hidden rounded-xl bg-white shadow-2xl md:grid-cols-2">
          <img
            src={isSignup ? "/assets/signup.png" : "/assets/signin.png"}
            alt={isSignup ? "Sign up" : "Sign in"}
            className="mx-auto h-64 w-full object-contain p-6 md:h-full md:min-h-80"
          />
          <div className="bg-brand px-8 py-10 text-white">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
