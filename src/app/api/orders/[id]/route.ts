import { NextResponse } from "next/server";
import orders from "@/data/orders.json";



export async function GET(request: Request, { params }: { params: { id: Number } }
) {
    try {
        const orderId = params.id;

        if (!orderId) {
            return NextResponse.json({ error: "Order ID is required" }, { status: 400 });
        }

        const order = await orders.filter(val => val.Order_ID == orderId)

        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }

        return NextResponse.json(order, { status: 200 });
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
