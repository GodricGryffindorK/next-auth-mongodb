import { NextRequest, NextResponse } from "next/server";
import { orderRegister } from "@/actions/orderAdd"
import * as nodemailer from "nodemailer"
import { PDFDocument } from 'pdf-lib';
import * as fs from "fs"

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'hopeinninfo@gmail.com',
        pass: 'ztiqovfkiglvtmyx',
    },
});

const sendEmailWithAttachment = async (pdfData: Uint8Array) => {
    try {
        const mailOptions = {
            from: 'roman.olender1997@gmail.com',
            to: 'roman.olender1997@gmail.com',
            subject: 'Someone Ordered',
            text: 'View Orderinfo from Attached PDF File',
            attachments: [{
                filename: 'order.pdf',
                content: pdfData
            }]
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
    } catch (error) {
        console.error('Error:', error);
    }
}

const generatePDF = async (result: string): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage();
    page.drawText(result, {
        x: 50,
        y: 500,
        size: 12,
    });

    const pdfBytes = await pdfDoc.save();
    return pdfBytes;
}

export const PUT = async (req: Request) => {
    const body = await req.json();
    const result = await orderRegister(body);
    if (result) {
        const pdfData = await generatePDF(result.toString());
        await sendEmailWithAttachment(pdfData);
        return new NextResponse(JSON.stringify(result), {
            status: 200,
            statusText: "Created"
        })
    }
    else
        return new NextResponse(JSON.stringify(result), {
            status: 500,
            statusText: "Error"
        })
}