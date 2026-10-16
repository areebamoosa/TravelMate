export default function MediaSlot({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center bg-orange-50 text-center text-sm text-orange-700/80 ${className}`}
    >
      {label}
    </div>
  );
}
