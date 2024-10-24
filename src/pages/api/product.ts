import type { NextApiRequest, NextApiResponse } from 'next';
import { ProductController } from '../controllers/product.controller';
import { initializeDatabase } from './db';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v4 } from 'uuid';

const productController = new ProductController();

const imagePath = path.resolve('./public/product-image');

const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {

        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath);
        }

        cb(null, imagePath);
    },
    filename: (req: any, file: any, cb: any) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${v4()}.${ext}`);
    }
});

const upload = multer({ storage });

// Disable default body parser
export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Call the database initialization function
        await initializeDatabase();

        if (req.method === 'GET') {
            await productController.getAllProducts(res, req.query);
        } else if (req.method === 'POST') {

            upload.array('images')(req as any, res as any, async (err) => {
                if (err) {
                    console.log('err: ', err);
                    return res.status(500).json({ error: 'Image upload failed.' });
                }

                const files = (req as any).files;
                console.log('files: ', files);
                await productController.createProduct(res, req.body, files);
            });

        } else if (req.method === 'PUT') {

            upload.array('images')(req as any, res as any, async (err) => {
                if (err) {
                    console.log('err: ', err);
                    return res.status(500).json({ error: 'Image upload failed.' });
                }

                const files = (req as any).files;

                await productController.updateProduct(res, req.body, files);
            });

        } else if (req.method === 'DELETE') {
            await productController.deleteProduct(res, req.query.id);
        }
        else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};