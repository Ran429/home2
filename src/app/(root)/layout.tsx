import ScrollButton from "@/components/common/scroll-button";
import Footer from "@/components/footer/footer";
import NavBar from "@/components/navbar/navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="w-full flex flex-col relative">
      <NavBar />
      {children}
      <ScrollButton />
      <Footer />
    </main>
  );
}
