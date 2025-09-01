import Image from "next/image";

type Props = {
  image: string;
  title: string;
  desc: string;
};

export default function SymbolDesc({ desc, image, title }: Props) {
  return (
    <div className="min-w-[280px] min-h-[280px] border border-[#4181C4] rounded-[50px] flex flex-col items-center justify-end relative">
      <p className="text-[#4181C4] text-xl font-semibold absolute -top-8 z-10 bg-white p-3">
        {title}
      </p>

      <Image
        src={image}
        width={74}
        height={74}
        alt="icon_tree"
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
      />
      <p className="bg-[#F8F9FB] text-[#4181C4] px-5 py-5 rounded-b-[inherit] mt-8 text-base font-medium text-center">
        {desc}
      </p>
    </div>
  );
}
