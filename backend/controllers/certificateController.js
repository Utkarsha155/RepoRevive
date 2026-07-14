import Certificate from "../models/Certificate.js";
import PDFDocument from "pdfkit";

const getCertificate = async (req, res) => {
    try {

        const certificate = await Certificate.findById(req.params.id)
            .populate("buyer", "name email")
            .populate("seller", "name email")
            .populate("project", "title category projectType")
            .populate("payment", "amount paymentStatus razorpayPaymentId");

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }

        const userId = req.user.userId;

        if (
            certificate.buyer._id.toString() !== userId &&
            certificate.seller._id.toString() !== userId
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        return res.status(200).json({
            success: true,
            certificate
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

const downloadCertificate = async (req, res) => {
    try {
        const certificate = await Certificate.findById(req.params.id)
            .populate("buyer", "name email")
            .populate("seller", "name email")
            .populate("project", "title category projectType")
            .populate("payment", "amount paymentStatus razorpayPaymentId");

        if (!certificate) {
            return res.status(404).json({
                success: false,
                message: "Certificate not found"
            });
        }

        const userId = req.user.userId;

        if (
            certificate.buyer._id.toString() !== userId &&
            certificate.seller._id.toString() !== userId
        ) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized"
            });
        }

        const doc = new PDFDocument({
            size: "A4",
            margin: 40
        });

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename=RepoRevive-${certificate.certificateId}.pdf`
        );

        doc.pipe(res);

        // ===========================
        // BORDER (A4 dimensions: 595 x 842)
        // ===========================
        doc.lineWidth(2).strokeColor("#7c3aed").rect(20, 20, 555, 802).stroke();
        doc.lineWidth(1).strokeColor("#d8b4fe").rect(30, 30, 535, 782).stroke();

        // ===========================
        // HEADER SECTION
        // ===========================
        doc.font("Helvetica-Bold").fontSize(28).fillColor("#7c3aed").text("RepoRevive", 40, 55, {
            align: "center",
            width: 515
        });

        doc.font("Helvetica").fontSize(20).fillColor("black").text("PROJECT OWNERSHIP CERTIFICATE", 40, 95, {
            align: "center",
            width: 515
        });

        // =====================================================
        // VERIFIED GOLD SEAL
        // =====================================================

        const badgeX = 520;
        const badgeY = 78;
        const badgeRadius = 20;

        doc
            .circle(badgeX, badgeY, badgeRadius)
            .fillAndStroke("#FFD54F", "#B8860B");

        doc
            .fillColor("black")
            .font("Helvetica-Bold")
            .fontSize(6)
            .text(
                "VERIFIED",
                badgeX - 18,
                badgeY - 10,
                {
                    width: 36,
                    align: "center"
                }
            );

        doc
            .fontSize(5)
            .text(
                "REGISTRY",
                badgeX - 18,
                badgeY - 2,
                {
                    width: 36,
                    align: "center"
                }
            );

        doc
            .fontSize(5)
            .text(
                "2026",
                badgeX - 18,
                badgeY + 6,
                {
                    width: 36,
                    align: "center"
                }
            );

        // ===========================
        // MIDDLE TEXT CONTENT (Properly spaced down)
        // ===========================
        doc.font("Helvetica").fontSize(13).fillColor("#444").text("This certificate officially verifies that", 40, 150, {
            align: "center",
            width: 515
        });

        doc.font("Helvetica-Bold").fontSize(24).fillColor("#2563eb").text(certificate.buyer.name, 40, 175, {
            align: "center",
            width: 515
        });

        doc.font("Helvetica").fontSize(13).fillColor("#444").text("has successfully acquired ownership of", 40, 210, {
            align: "center",
            width: 515
        });

        doc.font("Helvetica-Bold").fontSize(22).fillColor("#7c3aed").text(`"${certificate.project.title}"`, 40, 235, {
            align: "center",
            width: 515
        });


        // ===========================
        // DETAILS BOX (TABLE) - Shifted down to Y: 280
        // ===========================
        const tableX = 57;
        const tableY = 280;
        const tableW = 480;
        const rowH = 22;

        // Background Box
        doc.roundedRect(tableX, tableY, tableW, 200, 6).fillAndStroke("#fafafa", "#dddddd");

        const labelX = tableX + 20;
        const valueX = tableX + 180;
        let currentY = tableY + 15;

        const drawRow = (label, value) => {
            doc.font("Helvetica-Bold").fontSize(11).fillColor("#333").text(label, labelX, currentY);
            doc.font("Helvetica").fontSize(11).fillColor("#555").text(String(value), valueX, currentY);
            currentY += rowH;
        };

        drawRow("Previous Owner", certificate.seller.name);
        drawRow("Buyer", certificate.buyer.name);
        drawRow("Project Category", certificate.project.category);
        drawRow("Project Type", certificate.project.projectType);
        drawRow("Amount Paid", `INR ${certificate.payment.amount}`);
        drawRow("Payment Status", certificate.payment.paymentStatus);
        drawRow("Certificate ID", certificate.certificateId);
        drawRow("Issued On", new Date(certificate.issuedAt).toLocaleDateString());


        // ===========================
        // VERIFIED STATUS (Pushed down safely below the box)
        // ===========================
        doc.font("Helvetica-Bold").fontSize(16).fillColor("#16a34a").text("✓ VERIFIED OWNERSHIP TRANSFER", 40, 505, {
            align: "center",
            width: 515
        });

        doc.font("Helvetica").fontSize(11).fillColor("#666").text("Ownership successfully transferred and verified by RepoRevive.", 40, 525, {
            align: "center",
            width: 515
        });


        // ===========================
        // SIGNATURES (Shifted down slightly)
        // ===========================
        const signY = 605;

        doc.strokeColor("#999").lineWidth(1);
        doc.moveTo(70, signY + 55).lineTo(250, signY + 55).stroke();
        doc.moveTo(345, signY + 55).lineTo(525, signY + 55).stroke();

        // Left Signature: Authority
        doc.font("Helvetica-Bold").fontSize(18).fillColor("#7c3aed").text("RepoRevive", 70, signY, {
            width: 180,
            align: "center"
        });
        doc.font("Helvetica").fontSize(10).fillColor("#777").text("Ownership Verification Authority", 70, signY + 22, {
            width: 180,
            align: "center"
        });
        doc.font("Helvetica").fontSize(10).fillColor("black").text("Authorized By RepoRevive", 70, signY + 60, {
            width: 180,
            align: "center"
        });

        // Right Signature: Digital Info
        doc.font("Helvetica-BoldOblique").fontSize(18).fillColor("#2563eb").text("Digitally Signed", 345, signY, {
            width: 180,
            align: "center"
        });
        doc.font("Helvetica").fontSize(9).fillColor("#777").text("Verified using RepoRevive Registry", 345, signY + 22, {
            width: 180,
            align: "center"
        });
        doc.fontSize(8).text(certificate.certificateId, 345, signY + 37, {
            width: 180,
            align: "center"
        });
        doc.font("Helvetica").fontSize(10).fillColor("black").text("Digital Signature", 345, signY + 60, {
            width: 180,
            align: "center"
        });


        // ===========================
        // FOOTER SECTION
        // ===========================
        doc.strokeColor("#dddddd").moveTo(70, 725).lineTo(525, 725).stroke();

        doc.fontSize(9).fillColor("#666").text(
            "This certificate is digitally generated by RepoRevive after successful verification of repository ownership transfer.",
            65, 735, { width: 465, align: "center" }
        );

        doc.font("Helvetica-Bold").fontSize(10).fillColor("#7c3aed").text(
            `Certificate No : ${certificate.certificateId}`,
            65, 760, { width: 465, align: "center" }
        );

        doc.font("Helvetica").fontSize(8).fillColor("#777").text(
            `Issued on ${new Date(certificate.issuedAt).toLocaleDateString()} • Verified by RepoRevive Registry`,
            65, 777, { width: 465, align: "center" }
        );

        doc.end();

    } catch (error) {
        console.error(error);
        if (!res.headersSent) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
};

const getMyCertificates = async (req, res) => {

    try {

        const certificates = await Certificate.find({

            $or: [

                {
                    buyer: req.user.userId
                },

                {
                    seller: req.user.userId
                }

            ]

        })

            .populate("buyer", "name email")

            .populate("seller", "name email")

            .populate("project", "title category projectType")

            .populate("payment", "amount paymentStatus razorpayPaymentId")

            .sort({
                createdAt: -1
            });

        return res.status(200).json({

            success: true,

            total: certificates.length,

            certificates

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

export {

    getCertificate,

    downloadCertificate,

    getMyCertificates

};