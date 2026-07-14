import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({

    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },

    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    type: {
        type: String,
        enum: ["Ownership", "Collaboration"],
        required: true
    },

    message: {
        type: String,
        default: ""
    },

    offerPrice: {
        type: Number,
        default: 0
    },

    status: {
        type: String,
        enum: [
            "Pending",
            "Accepted",
            "Awaiting Payment",
            "Completed",
            "Rejected",
            "Cancelled"
        ],
        default: "Pending"
    },

    paymentRequired: {
        type: Boolean,
        default: false
    },

    paymentCompleted: {
        type: Boolean,
        default: false
    },
    certificate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Certificate",
        default: null
    },
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
}, { timestamps: true });

export default mongoose.model("Request", requestSchema);