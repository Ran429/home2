import { UploadFile } from "@/@types/upload-file";
import RepresentiveBackground from "@/components/common/represent-background";
import { getUploadFileUrl } from "@/lib/client-file-util";
import { yyyymmddhhmmss } from "@/lib/time-util";
import { cn } from "@/lib/utils";
import AssociateCompanyDB from "@/server/prisma/associate-company.db";
import Image from "next/image";
import Link from "next/link";
import DeleteAssociateCompanyButton from "./(delete)/button";

export default async function AdminEmployeePage() {
  const associateCompanies = await AssociateCompanyDB.findAll();

  return (
    <>
      <RepresentiveBackground
        type="business"
        rewriteText="연관사이트 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">연관사이트 관리</h1>
          <Link
            href="/admin/associate-company/create"
            className="daisy-btn daisy-btn-primary"
          >
            추가
          </Link>
        </div>
        <div className="w-full overflow-x-auto mt-10">
          <table className="daisy-table">
            <colgroup>
              <col width="10%" />
              <col width="" />
              <col width="15%" />
              <col width="10%" />
              <col width="15%" />
              <col width="5%" />
              <col width="5%" />
              <col width="5%" />
            </colgroup>
            <thead>
              <tr className="*:text-center *:text-[18px]">
                <th>노출순서</th>
                <th>이미지</th>
                <th>링크</th>
                <th>설명</th>
                <th>변경시간</th>
                <th>수정</th>
                <th>노출상태</th>
                <th>삭제</th>
              </tr>
            </thead>
            <tbody>
              {associateCompanies.length > 0 ? (
                associateCompanies.map((company) => (
                  <tr key={company.id} className="text-center">
                    <td>{company.sortOrder}</td>
                    <td>
                      <Image
                        src={getUploadFileUrl(
                          (company.image as UploadFile[])[0]
                        )}
                        width={300}
                        height={50}
                        alt="company"
                      />
                    </td>
                    <td>{company.link}</td>
                    <td>{company.description}</td>
                    <td>{yyyymmddhhmmss(company.updatedAt)}</td>
                    <td>
                      <Link
                        href={`/admin/associate-company/${company.id}/update`}
                        className="daisy-btn daisy-btn-secondary"
                      >
                        수정
                      </Link>
                    </td>
                    <td>
                      {company.isActive ? (
                        <span className="text-blue-500 font-semibold">
                          노출 중
                        </span>
                      ) : (
                        <span className="text-gray-500">비노출</span>
                      )}
                    </td>
                    <td>
                      <DeleteAssociateCompanyButton entityId={company.id} />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="text-center py-8 font-semibold text-base"
                  >
                    연관사이트가 아직 등록되지 않았습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
