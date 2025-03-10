"use client";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const handleNavigation = async() => {
    console.log('first')
    await router.replace("/dashboard/sales"); // Avoids history stacking, making it faster
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <button
        onClick={handleNavigation}
        className="bg-gray-700 py-4 px-8 rounded text-white cursor-pointer"
      >
        Go to Admin Dashboard
      </button>
    </div>
  );
};

export default Page;
