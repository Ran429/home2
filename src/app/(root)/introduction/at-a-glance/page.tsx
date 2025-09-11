import SinglePageView from "@/components/single-page/SinglePageView";
export const dynamic = "force-dynamic";

export const metadata = {
  title: "연구소 한눈에 보기 - 인간취약성연구소",
};

export default function Page() {
  return <SinglePageView slug="at-a-glance" />;
}