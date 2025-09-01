"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function useHash() {
  const params = useParams();
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const currentHash = window.location.hash;
    setHash(currentHash);
  }, [params]);

  return hash;
}
