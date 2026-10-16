export default function Logo() {
  return (
    <a href="/" className="flex items-center gap-2">
      <span className="text-lg font-bold tracking-tight text-stone-900">
        TRAVEL
        <span className="text-brand">MATE</span>
      </span>
      <svg viewBox="0 0 32 32" className="h-6 w-6 text-brand" aria-hidden="true">
        <path
          fill="currentColor"
          d="M28 14.2 18.4 16l-3.2-6.2c-.4-.8-1.4-1.1-2.2-.7l-.6.3 2.2 7.2-6.4 1.2-1.8-2.2c-.3-.4-.8-.6-1.3-.5l-.8.2 1.6 4.4c.2.5.7.8 1.2.7l20.2-3.8c.8-.2 1.3-1 1.1-1.8-.1-.3-.3-.5-.6-.6Z"
        />
      </svg>
    </a>
  );
}
