import ScrollButton from "@/components/common/scroll-button";

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex flex-col relative">
      {children}
      <ScrollButton />
    </main>
  );
}
