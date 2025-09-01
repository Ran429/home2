import RepresentiveBackground from "@/components/common/represent-background";
import { cn } from "@/lib/utils";
import CreatedMaintenanceBoardForm from "./create-form";

export default async function AdminBoardCreatePage() {
  return (
    <>
      <RepresentiveBackground
        type="board"
        rewriteText="유지보수 현황"
        className="mt-[100px]"
      />

      <section className={cn("container px-10", "pc lg:my-[100px]")}>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-bold">유자보수 현황 - 작성</h1>
        </div>

        <CreatedMaintenanceBoardForm />
      </section>
    </>
  );
}
