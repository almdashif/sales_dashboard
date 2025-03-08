"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import orders from "@/data/orders.json";

export default function OrderTable({ section }: { section?: string }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const tableData =
        section === "products"
            ? orders
                .flatMap((order) => order.Items)
                .map((item: any, index: number) => ({
                    Order_ID: index + 1,
                    Item_Name: item.Item_Name,
                    Item_Price: item.Item_Price,
                    Item_Type: item.Item_Type,
                    Quantity_Instock: item.Quantity_Instock ?? Math.floor(Math.random() * 25),
                }))
                .filter((item) =>
                    item.Item_Name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            : orders.filter((item) =>
                item.Customer_Name.toLowerCase().includes(searchTerm.toLowerCase())
            );

    const totalPages = Math.ceil(tableData.length / itemsPerPage);
    const paginatedData = tableData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <Card className="pt-4">
            <CardHeader className="flex flex-row flex-wrap md:flex-nowrap justify-between items-center gap-2">
                <CardTitle>{section === "products" ? "All Products" : "Total Orders"}</CardTitle>
                <input
                    type="text"
                    placeholder={section === "products" ? "Search products..." : "Search customer..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm w-full md:w-48"
                />
            </CardHeader>

            <CardContent>
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[200px] border border-gray-200">
                        <thead className="bg-gray-600 text-white text-sm">
                            <tr>
                                {section === "products" ? (
                                    <>
                                        <th className="border px-2 py-2">Product ID</th>
                                        <th className="border px-2 py-2">Product Name</th>
                                        <th className="border px-2 py-2">Price</th>
                                        <th className="border px-2 py-2">Stock Quantity</th>
                                    </>
                                ) : (
                                    <>
                                        <th className="border px-2 py-2">Order ID</th>
                                        <th className="border px-2 py-2">Customer</th>
                                        <th className="border px-2 py-2 hidden md:table-cell">Phone</th>
                                        <th className="border px-2 py-2">Products</th>
                                        <th className="border px-2 py-2 hidden md:table-cell">Order Type</th>
                                        <th className="border px-2 py-2">Status</th>
                                        <th className="border px-2 py-2">Total Amount</th>
                                    </>
                                )}
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item: any, index: number) => (
                                <tr
                                    key={index}
                                    className={`text-center text-xs md:text-sm ${index % 2 === 0 ? "bg-gray-300" : "bg-gray-400"
                                        } hover:bg-gray-200`}
                                >
                                    {section === "products" ? (
                                        <>
                                            <td className="border px-2 py-2">{item.Order_ID}</td>
                                            <td className="border px-2 py-2">{item.Item_Name}</td>
                                            <td className="border px-2 py-2">
                                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                                    item.Item_Price)}</td>
                                            <td className="border px-2 py-2">{item.Quantity_Instock}</td>
                                        </>
                                    ) : (
                                        <>
                                            <td className="border px-2 py-2">{item.Order_ID}</td>
                                            <td className="border px-2 py-2">{item.Customer_Name}</td>
                                            <td className="border px-2 py-2 hidden md:table-cell">{item.Customer_Phone}</td>
                                            <td className="border px-2 py-2 text-ellipsis">
                                                {item.Items.map((orderItem: any, i: number) => (
                                                    <div key={i} className="whitespace-nowrap">
                                                        {orderItem.Item_Name} ({orderItem.Quantity}x)
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="border px-2 py-2 hidden md:table-cell">{item.Order_Type}</td>
                                            <td className="border px-2 py-2">{item.Order_Status}</td>
                                            <td className="border px-2 py-2">
                                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
                                                    item.totalAmount ?? 0
                                                )}
                                            </td>
                                        </>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Controls */}
                <div className="flex justify-between items-center mt-6">
                    <button
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={` py-2 px-4 text-white text-sm rounded cursor-pointer ${currentPage === 1 ? 'bg-gray-300' : 'bg-gray-500'}`}
                    >
                        Previous
                    </button>
                    <span className="text-sm font-medium">Page {currentPage} of {totalPages}</span>
                    <button
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={` py-2 px-4 text-white text-sm rounded cursor-pointer ${currentPage === totalPages ? 'bg-gray-300' : 'bg-gray-500'}`}
                    >
                        Next
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
