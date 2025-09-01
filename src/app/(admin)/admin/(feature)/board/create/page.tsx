import { auth } from "@/auth";
import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import CreateBoardForm from "./create-form";

export default async function AdminBoardCreatePage() {
  const session = await auth();
  const adminName = session?.user?.email ?? "관리자";

  return (
    <>
      <RepresentiveBackground
        type="board"
        rewriteText="게시물 관리"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">게시물 작성</h1>
        </div>

        <CreateBoardForm adminName={adminName} />
      </section>
    </>
  );
}
