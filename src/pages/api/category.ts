import type { NextApiRequest, NextApiResponse } from 'next';
import { CategoryController } from '../controllers/category.controller';
import { initializeDatabase } from './db';

const categoryController = new CategoryController();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

       // Call the database initialization function
       await initializeDatabase();

        if (req.method === 'GET') {
            await categoryController.getAllCategories(res);   
        } else if (req.method === 'POST') {
            await categoryController.createCategory(res, req.body);
        } else if (req.method === 'PUT') {
            await categoryController.updateCategory(res, req.body);
        }else if (req.method === 'DELETE') {
            await categoryController.deleteCategory(res, req.query.id);
        }
        else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};