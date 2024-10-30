import { NextApiRequest, NextApiResponse } from "next";
import { ProductInquiryController } from "../controllers/product-inquiry.controller";
import { initializeDatabase } from "./db";

const productInquiryController = new ProductInquiryController();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Call the database initialization function
        await initializeDatabase();

        if (req.method === 'GET') {
            await productInquiryController.getAllProductInquiries(res, req.query);
        } else if (req.method === 'POST') {
            await productInquiryController.createProductInquiry(res, req.body);
        } else if (req.method === 'DELETE') {
            await productInquiryController.deleteProductInquiry(res, req.query.id);
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};