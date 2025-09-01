import Image from "next/image";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full">
      <section className="w-full min-h-screen flex justify-center flex-col items-center p-10">
        <div className="flex items-center flex-col gap-3 mb-10">
          <Image
            src="/images/logo/logo_big.png"
            alt="logo"
            width={338}
            height={0}
            sizes="100vw"
            className="w-[338px] aspect-auto"
            priority
          />
        </div>
        {children}
      </section>
    </main>
  );
}
