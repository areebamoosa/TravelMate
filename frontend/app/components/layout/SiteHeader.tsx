import AuthMenu from "@/app/components/AuthMenu";
import Logo from "@/app/components/layout/Logo";
import SiteNav from "@/app/components/layout/SiteNav";

export default function SiteHeader() {
  return (
    <header className="border-b border-stone-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <Logo />
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <SiteNav />
          <AuthMenu />
        </div>
      </div>
    </header>
  );
}
