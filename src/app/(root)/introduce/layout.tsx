import SubNavbar from "../../components/common/sub-navbar";
import { MENU_ITEMS } from "../../constants/menu";

export default function IntroductionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // '소개' 메뉴 (/introduction) 데이터를 찾습니다.
  const introductionMenu = MENU_ITEMS.find((item) =>
    item.href.startsWith("/introduction")
  );

  return (
    <div className="container mx-auto py-16 md:py-24 px-4">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* 왼쪽 사이드바 */}
        <SubNavbar currentMenu={introductionMenu} />
        {/* 오른쪽 콘텐츠 영역 */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
