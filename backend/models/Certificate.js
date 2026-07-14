import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema(

    {

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

        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true
        },

        payment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Payment",
            required: true
        },
        certificate: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Certificate",
            default: null
        },
        certificateId: {
            type: String,
            required: true,
            unique: true
        },

        pdfUrl: {
            type: String,
            default: ""
        },

        issuedAt: {
            type: Date,
            default: Date.now
        }

    },

    { timestamps: true }

);

export default mongoose.model(
    "Certificate",
    certificateSchema
);