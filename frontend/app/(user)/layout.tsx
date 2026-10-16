import SiteFooter from "@/app/components/layout/SiteFooter";
import SiteHeader from "@/app/components/layout/SiteHeader";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-4 py-10">{children}</main>
      <SiteFooter />
    </div>
  );
}
