export const metadata = { title: "파트너십 - 인간취약성연구소" };
export const dynamic = "force-dynamic";

export default function PartnershipsPage() {
  return (
    <div className="container mx-auto px-4 pt-32 pb-16">
      {/* ✅ pt-32로 상단 여백을 늘림 */}
      <h1 className="text-3xl font-bold mb-6">파트너십</h1>
      <p className="text-lg leading-relaxed text-gray-700">
        파트너십 관련 내용이 여기에 들어갑니다.
      </p>
    </div>
  );
}