export default function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block rounded-full bg-brand px-4 py-1 font-script text-lg text-white">
      {children}
    </span>
  );
}
