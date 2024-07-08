import mongoose, { Schema, model } from "mongoose";

export interface OrderDocument {
    _id: string;
    business_name: string;
    ruth: string;
    commercial_business: string;
    commercial_address: string;
    oc_num: string;
    require_hes: string;
    mail: string;
    phone: string;
    client_name: string;
    customer_id: string;
    customer_email: string;
    customer_phone: string;
    delivery_type: string
    delivery_hour: string;
    delivery_date: string;
    deliver_name: string;
    deliver_phone: string;
    deliver_address: string;
    bill_name: string;
    bill_phone: string;
    bill_email: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema<OrderDocument>({
    business_name: {
        type: String,

    },
    ruth: {
        type: String,

    },
    commercial_business: {
        type: String,

    },
    commercial_address: {
        type: String,

    },
    oc_num: {
        type: String,

    },
    require_hes: {
        type: String,

    },
    mail: {
        type: String,

    },
    phone: {
        type: String,

    },
    client_name: {
        type: String,

    },
    customer_id: {
        type: String,

    },
    customer_email: {
        type: String,

    },
    customer_phone: {
        type: String,

    },
    delivery_type: {
        type: String,

    },
    delivery_hour: {
        type: String,

    },
    delivery_date: {
        type: String,

    },
    deliver_name: {
        type: String,

    },
    deliver_phone: {
        type: String,

    },
    deliver_address: {
        type: String,

    },
    bill_name: {
        type: String,

    },
    bill_phone: {
        type: String,

    },
    bill_email: {
        type: String,

    },
},
    {
        timestamps: true,
    }
);

const Order = mongoose.models?.Order || model<OrderDocument>('Order', OrderSchema);
export default Order;
