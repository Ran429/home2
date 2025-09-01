import { TimeLineData, TimeLineDatum } from "@/constants/time-line-data";
import { cn } from "@/lib/utils";

export default function TimeLine() {
  return (
    <div
      className={cn(
        "after:absolute after:top-2 after:bottom-0 after:w-px after:bg-gray-500/20",
        "after:left-0 dark:after:bg-gray-400/20",
        "relative pl-6 grid gap-12 lg:gap-[100px] mt-14 lg:mt-[100px]"
      )}
    >
      {TimeLineData.map((datum, index) => (
        <TimeLineItem key={index} datum={datum} active={index === 0} />
      ))}
    </div>
  );
}

function TimeLineItem({
  datum,
  active,
}: {
  datum: TimeLineDatum;
  active?: boolean;
}) {
  return (
    <div className="grid gap-4 lg:gap-14 text-sm relative pl-3 lg:pl-10">
      <Dot active={active} />
      <div className="flex flex-row gap-5 lg:gap-12">
        <span className="text-xl lg:text-[30px] font-bold">{datum.year}</span>
        <ul className="flex flex-col gap-12">
          {datum.items.map((item, index) => (
            <li key={index} className="flex flex-row gap-12 pt-1">
              <span className="font-bold text-[15px] lg:text-[18px]">
                .{item.month}
              </span>
              {item.html ? (
                <p
                  className="font-normal text-[15px] lg:text-[18px] lg:leading-8"
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></p>
              ) : (
                <p className="font-normal text-[15px] lg:text-[18px] lg:leading-8">
                  {item.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Dot({ active }: { active?: boolean }) {
  return (
    <div
      className={cn(
        "absolute left-0 translate-x-[-28px] z-10 top-2",
        "aspect-square w-[11px] rounded-full dark:bg-gray-50",
        "ring-klea_text_primary/20 ",
        active ? "bg-klea_text_primary ring-[7px]" : "bg-[#BDBDBD]"
      )}
    />
  );
}
