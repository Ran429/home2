// src/app/(root)/activities/layout.tsx
import SubNavbar from "@/components/common/sub-navbar";
import { MENU_ITEMS, NavItem } from "@/constants/menu";

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const activitiesMenu: NavItem | undefined = MENU_ITEMS.find((item) =>
    item.href.startsWith("/activities")
  );

  return (
    <div className="container mx-auto py-16 md:py-24 px-4">
      <div className="flex flex-col lg:flex-row gap-12">
        {/* 왼쪽 사이드바 */}
        <SubNavbar currentMenu={activitiesMenu} />
        {/* 오른쪽 콘텐츠 영역 */}
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}