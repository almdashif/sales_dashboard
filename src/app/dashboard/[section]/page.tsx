"use client";
import Charts from "@/components/Charts";
import SalesTable from "@/components/SalesTable";
import { useParams } from "next/navigation";
import orders from "@/data/orders.json";

const salesOrder = orders.filter(val => val.Order_Status.toLowerCase() == 'delivered')

export default function DynamicPage() {
  const { section } = useParams();


  return (
    <div>
      <h1 className="text-2xl font-bold capitalize pb-4">{section} Dashboard</h1>


      {section == 'products' ?
        <>
          {/* <Charts categoryName="Product Category"/> */}
          <SalesTable section={section} />
        </>
        :
        <>
          <Charts data={salesOrder} categoryName="Most Sold Category" />
          <SalesTable  />
        </>
      }
    </div>
  );
}
