import "./globals.css";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <html lang="en">
        <body className="min-h-screen bg-stone-50 text-stone-800 antialiased">{children}</body>
      </html>
    );
  }
