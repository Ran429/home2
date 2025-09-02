import SubNavbar from "../../../components/common/sub-navbar";
import { MENU_ITEMS } from "../../../constants/menu";

export default function IntroduceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // '소개' 메뉴 (/introduce) 데이터를 찾습니다.
  const introduceMenu = MENU_ITEMS.find((item) =>
    item.href.startsWith("/introduce")
  );

  return (
    <div className="container mx-auto py-16 md:py-24 px-4">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* 왼쪽 사이드바: 방금 만든 sub-navbar 컴포넌트 사용 */}
        <SubNavbar currentMenu={introduceMenu} />
        {/* 오른쪽 콘텐츠 영역: 이 부분에 실제 글 내용이 표시됩니다. */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}

