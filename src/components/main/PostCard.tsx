// src/components/main/PostCard.tsx
import Link from "next/link";
import Image from "next/image";

export default function PostCard({
  id,
  title,
  content,
  imageUrl,
  href,
}: {
  id: number;
  title: string;
  content?: string;
  imageUrl?: string;
  href: string;
}) {
  return (
    <Link href={href} className="block group">
      <div className="overflow-hidden rounded-lg border">
        <Image
          src={imageUrl || "https://placehold.co/400x300/E2E8F0/4A5568?text=No+Image"}
          alt={title}
          width={400}
          height={300}
          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-1">
        <h3 className="mt-4 text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors truncate">
          {title}
        </h3>
        {content && (
          <p className="mt-2 text-gray-600 line-clamp-2 h-12">
            {content.slice(0, 80)}...
          </p>
        )}
      </div>
    </Link>
  );
}