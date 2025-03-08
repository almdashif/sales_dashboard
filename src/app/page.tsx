import Link from "next/link";

const page = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <Link href="/dashboard/sales" className='bg-gray-700 py-4 px-8 rounded text-white'>Go to Admin Dashboard</Link>
    </div>
  )
}

export default page;


