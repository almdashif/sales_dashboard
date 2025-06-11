'use client'

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {

  const router = useRouter();

  useEffect(() => {
    router.replace("/dashboard/sales");
  }, []);
  return (
    <div className="p-6 space-y-6 max-h-screen overflow-y-auto relative">

      Loading ...

    </div>

  );
}
