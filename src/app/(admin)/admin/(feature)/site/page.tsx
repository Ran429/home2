import AdminInput from "@/components/admin/admin-input";
import RepresentiveBackground from "@/components/common/represent-background";
import { getDialogType } from "@/constants/dialog.const";
import { yyyymmddhhmmss } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import { getDialogValues } from "@/server/prisma/config.db";
import Link from "next/link";
import AdminOrganizationImage from "./admin-organization-image";

export default async function AdminSitePage() {
  const dialogValues = await getDialogValues();

  return (
    <>
      <RepresentiveBackground
        type="board"
        rewriteText="사이트 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <article>
          <h1 className="text-3xl font-bold">팝업 관리</h1>
          <div className="w-full overflow-x-auto mt-10">
            <table className="daisy-table">
              <colgroup>
                <col width="20%" />
                <col width="" />
                <col width="10%" />
                <col width="20%" />
              </colgroup>
              <thead>
                <tr className="*:text-center *:text-[18px]">
                  <th>팝업 제목</th>
                  <th>팝업 내용 미리보기</th>
                  <th>수정</th>
                  <th>수정날짜</th>
                </tr>
              </thead>
              <tbody>
                {dialogValues.map((dialog) => (
                  <tr key={dialog.id} className="daisy-hover">
                    <td className="text-center text-[17px]">
                      {getDialogType(dialog.key)?.text}
                    </td>
                    <td>
                      <div
                        className={cn(
                          "bg-white px-6 py-7 !mt-6 text-[#555555] min-h-[300px] max-h-[400px] overflow-y-auto",
                          "text-[15px] lg:text-base"
                        )}
                        dangerouslySetInnerHTML={{ __html: dialog.value }}
                      />
                    </td>
                    <td className="text-center text-[17px]">
                      <Link
                        className="daisy-btn daisy-btn-primary"
                        href={
                          "/admin/site/" +
                          (getDialogType(dialog.key)?.code ?? "") +
                          "/update"
                        }
                      >
                        수정
                      </Link>
                    </td>
                    <td className="text-center text-[17px]">
                      {yyyymmddhhmmss(dialog.updatedAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <AdminOrganizationImage />
      </section>
    </>
  );
}
