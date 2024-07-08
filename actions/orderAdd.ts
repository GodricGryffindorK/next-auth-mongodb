"use server"
import { connectDB } from "@/lib/mongodb";
import Order from "@/models/Order";

export const orderRegister = async (values: any) => {
    try {
        await connectDB();
        const order = new Order(values);
        const result = await order.save()
        return result
    } catch (e) {
        console.log(e)
        return false;
    }
}
