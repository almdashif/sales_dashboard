"use client";
import Charts from "@/components/Charts";
import SalesTable from "@/components/SalesTable";
import { useParams } from "next/navigation";
import orders from "@/data/orders.json";
import Link from "next/link";
import { MdOutlineLogout } from "react-icons/md";
const salesOrder = orders.filter(val => val.Order_Status.toLowerCase() == 'delivered')

export default function DynamicPage() {
  const { section } = useParams();


  return (
    <div>
      <div className="flex flex-row justify-between items-center py-4">
        <h1 className="text-2xl font-bold capitalize pb-4">{section} Dashboard</h1>
        {/* <Link href="/" className='bg-gray-700 py-2 px-4 rounded text-white'><MdOutlineLogout /></Link> */}
      </div>



      {section == 'products' ?
        <>
          {/* <Charts categoryName="Product Category"/> */}
          <SalesTable section={section} />
        </>
        :
        <>
          <Charts data={salesOrder} categoryName="Most Sold Category" />
          <SalesTable />
        </>
      }
    </div>
  );
}
