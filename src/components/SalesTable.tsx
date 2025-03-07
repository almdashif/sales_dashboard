"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import orders from "@/data/orders.json";
import { IOrders } from "@/types/ordersTypes";

export default function OrderTable({ section }: { section?: string }) {



    const tableData = section === "products"
        ? orders.flatMap((order) => order.Items)
            .map((item: any, index: number) => ({
                Order_ID: index + 1,
                Item_Name: item.Item_Name,
                Item_Price: item.Item_Price,
                Item_Type: item.Item_Type,
                Quantity_Instock: item.Quantity_Instock ?? Math.floor(Math.random() * 25),
            }))
        : orders;


    return (
        <Card className="pt-4">
            <CardHeader >
                <CardTitle>{section === "products" ? "All Products" : "Total Orders"}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[200px] border border-gray-200">
                        <thead className="bg-gray-600 text-white text-sm">
                            <tr>
                                {section === "products" ? (
                                    <>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Product ID</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Item Name</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Price</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Stock Quantity</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Order ID</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Customer</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2 hidden md:table-cell">Phone</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Items</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2 hidden md:table-cell">Order Type</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Status</th>
                                        <th className="border px-1 py-1 md:px-2 md:py-2">Total Amount</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {tableData.map((item: any, index: number) => (
                                <tr
                                    key={index}

                                    className={`text-center text-xs md:text-sm ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"} hover:bg-gray-200`}
                                >
                                    {section === "products" ? (
                                        <>
                                            <td className="border px-1 py-1 md:px-2 md:py-2">{item.Order_ID}</td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2">{item.Item_Name}</td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2">${item.Item_Price}</td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2">{item.Quantity_Instock}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border px-1 py-1 md:px-2 md:py-2">{item.Order_ID}</td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2">{item.Customer_Name}</td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2 hidden md:table-cell">{item.Customer_Phone}</td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2 text-ellipsis">
                                                {item.Items.map((orderItem: any, i: number) => (
                                                    <div key={i} className="whitespace-nowrap">
                                                        {orderItem.Item_Name} ({orderItem.Quantity}x)
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2 hidden md:table-cell">{item.Order_Type}</td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2">{item.Order_Status}</td>
                                            <td className="border px-1 py-1 md:px-2 md:py-2">
                                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(item.totalAmount ?? 0)}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>
    );
}
