import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({

    request: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Request",
        required: true
    },

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    razorpayOrderId: {
        type: String,
        default: ""
    },

    razorpayPaymentId: {
        type: String,
        default: ""
    },

    razorpaySignature: {
        type: String,
        default: ""
    },

    paymentStatus: {
        type: String,
        enum: [
            "Pending",
            "Success",
            "Failed",
            "Refunded"
        ],
        default: "Pending"
    }

}, { timestamps: true });

export default mongoose.model("Payment", paymentSchema);