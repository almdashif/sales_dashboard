export interface IOrders {
    "Order_ID": number,
    "Customer_Name": string,
    "Customer_Phone": string,
    "Customer_Address": string,
    "Items": {
        "Item_Name": string,
        "Item_Price": number,
        "Quantity": number,
        "Total_Price": number
    }[],
    "Order_Type"?: string,
    "Order_Status"?: string,
    "Delivery_Person"?: string,
    "profit"?: number,
    "Delivery_Status"?: string,
    "date"?: string | Date | undefined,
    "totalAmount"?: number | undefined,
    "category"?: string | undefined
};
