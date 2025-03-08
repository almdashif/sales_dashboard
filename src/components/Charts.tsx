"use client";

import { useMemo } from "react";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import orders from "@/data/orders.json";
import { IOrders } from "@/types/ordersTypes";


const processOrders = (data: IOrders[]) => {
    const monthlyData: { [key: string]: { name: string; sales: number; profit: number } } = {};

    const monthOrder = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    data.forEach((order) => {
        const date = new Date(order.date ?? "");
        const month = monthOrder[date.getMonth()];

        if (!monthlyData[month]) {
            monthlyData[month] = { name: month, sales: 0, profit: 0 };
        }

        monthlyData[month].sales += order.totalAmount ?? 0;
        monthlyData[month].profit += order.profit || (order.totalAmount ?? 0 * 0.2); 
    });

    return Object.values(monthlyData).sort((a, b) => monthOrder.indexOf(a.name) - monthOrder.indexOf(b.name));
};


export default function Charts({ categoryName, data=orders }: { data?: IOrders[], categoryName: string }) {
    const salesData = useMemo(() => processOrders(data), [data]);


    const pieData = useMemo(() => {
        const categories: { [key: string]: number } = {};

        data.forEach((order: any) => {
            if (!categories[order.category]) {
                categories[order.category] = 0;
            }
            categories[order.category] += order.totalAmount;
        });

        return Object.entries(categories).map(([name, value]) => ({ name, value }));
    }, [data]);

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

    return (
        <div className="grid grid-cols-1 pb-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bar Chart - Total Sales */}
            <Card>
                <CardHeader>
                    <CardTitle>Total Sales</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={salesData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                            <Bar dataKey="sales" fill="#8884d8" />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Line Chart - Monthly Profit */}
            <Card>
                <CardHeader>
                    <CardTitle>Monthly Profit</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={salesData}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                            <Line type="monotone" dataKey="profit" stroke="#82ca9d" />
                        </LineChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

            {/* Pie Chart - Category Breakdown */}
            <Card>
                <CardHeader>
                    <CardTitle>{categoryName}</CardTitle>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={60} fill="#8884d8" dataKey="value" label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip formatter={(value) => `${value.toLocaleString()}`} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
