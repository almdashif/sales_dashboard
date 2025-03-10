"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
   const router = useRouter();
  
    useEffect(() => {
      router.prefetch("/dashboard/sales");
      router.replace("/dashboard/sales");
    }, []);
    return (
      <div className="p-6 space-y-6 max-h-screen overflow-y-auto relative">
  
        Loading ...
  
      </div>
  
    );
};

export default Page;
