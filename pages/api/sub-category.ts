import type { NextApiRequest, NextApiResponse } from 'next';
import { SubCategoryController } from './controllers/sub-category.controller';
import { initializeDatabase } from './db';

const subcategoryController = new SubCategoryController();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {

        // Call the database initialization function
        await initializeDatabase();

        if (req.method === 'GET') {
            await subcategoryController.getAllSubCategories(res, req.query);
        } else if (req.method === 'POST') {
            await subcategoryController.createSubCategory(res, req.body);
        } else if (req.method === 'PUT') {
            await subcategoryController.updateSubCategory(res, req.body);
        } else if (req.method === 'DELETE') {
            await subcategoryController.deleteSubCategory(res, req.query.id);
        }
        else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};