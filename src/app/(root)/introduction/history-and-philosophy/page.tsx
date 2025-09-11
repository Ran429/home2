import SinglePageView from "@/components/single-page/SinglePageView";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "연구소의 연혁과 철학 - 인간취약성연구소",
};

export default function Page() {
  return <SinglePageView slug="history-and-philosophy" />;
}