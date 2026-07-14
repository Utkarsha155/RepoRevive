import crypto from "crypto";
import razorpay from "../config/razorpay.js";
import Payment from "../models/Payment.js";
import Request from "../models/Request.js";
import Project from "../models/Project.js";
import Certificate from "../models/Certificate.js";

const createOrder = async (req, res) => {

    try {

        const { requestId } = req.body;

        const request = await Request.findById(requestId)
            .populate("project")
            .populate("receiver")
            .populate("sender");

        if (!request) {

            return res.status(404).json({
                success: false,
                message: "Request not found"
            });

        }

        if (request.sender._id.toString() !== req.user.userId) {

            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });

        }

        if (request.status !== "Awaiting Payment") {

            return res.status(400).json({
                success: false,
                message: "This request cannot be paid."
            });

        }

        const options = {

            amount: request.offerPrice * 100,

            currency: "INR",

            receipt: `REQ_${request._id}`

        };

        const order = await razorpay.orders.create(options);

        const payment = new Payment({

            request: request._id,

            project: request.project._id,

            buyer: request.sender._id,

            seller: request.receiver._id,

            amount: request.offerPrice,

            razorpayOrderId: order.id

        });

        await payment.save();

        return res.status(200).json({

            success: true,

            order,

            payment

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

const verifyPayment = async (req, res) => {

    try {

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(razorpay_order_id + "|" + razorpay_payment_id)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {

            return res.status(400).json({
                success: false,
                message: "Invalid payment signature"
            });

        }

        const payment = await Payment.findOne({
            razorpayOrderId: razorpay_order_id
        });

        if (!payment) {

            return res.status(404).json({
                success: false,
                message: "Payment not found"
            });

        }

        payment.razorpayPaymentId = razorpay_payment_id;
        payment.razorpaySignature = razorpay_signature;
        payment.paymentStatus = "Success";

        await payment.save();

        const request = await Request.findById(payment.request);

        request.status = "Completed";

        await request.save();

        const project = await Project.findById(payment.project);

        project.owner = payment.buyer;
        project.adopted = true;

        await project.save();

        const certificate = await Certificate.create({

            buyer: request.sender,

            seller: request.receiver,

            project: project._id,

            payment: payment._id,

            certificateId: "RPV-" + Date.now()

        });
        request.certificate = certificate._id;

        await request.save();
        await Request.updateMany(
            {
                project: project._id,
                _id: { $ne: request._id },
                status: "Pending",
                type: "Ownership"
            },
            {
                status: "Rejected"
            }
        );

        return res.status(200).json({

            success: true,

            message: "Payment verified successfully",

            certificateId: certificate._id

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const demoPayment = async (req, res) => {

    try {

        const { requestId } = req.body;

        const request = await Request.findById(requestId);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        if (request.sender.toString() !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        if (request.status !== "Awaiting Payment") {
            return res.status(400).json({
                success: false,
                message: "Payment not allowed"
            });
        }

        const project = await Project.findById(request.project);

        const payment = new Payment({

            request: request._id,

            project: project._id,

            buyer: request.sender,

            seller: request.receiver,

            amount: request.offerPrice,

            paymentStatus: "Success",

            razorpayOrderId: "DEMO_ORDER_" + Date.now(),

            razorpayPaymentId: "DEMO_PAYMENT_" + Date.now(),

            razorpaySignature: "DEMO_SIGNATURE"

        });

        await payment.save();

        request.status = "Completed";

        await request.save();

        project.owner = request.sender;

        project.adopted = true;

        await project.save();
        const certificate = await Certificate.create({

            buyer: request.sender,

            seller: request.receiver,

            project: project._id,

            payment: payment._id,

            certificateId: "RPV-" + Date.now()

        });
        request.certificate = certificate._id;

        await request.save();
        await Request.updateMany(
            {
                project: project._id,
                _id: { $ne: request._id },
                type: "Ownership",
                status: "Pending"
            },
            {
                status: "Rejected"
            }
        );

        return res.status(200).json({

            success: true,

            message: "Demo Payment Successful",

            certificateId: certificate._id

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}

export {
    createOrder,
    verifyPayment,
    demoPayment
};