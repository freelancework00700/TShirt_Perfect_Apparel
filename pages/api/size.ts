import type { NextApiRequest, NextApiResponse } from 'next';
import { SizeController } from './controllers/size.controller';
import { initializeDatabase } from './db';

const sizeController = new SizeController();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        // Call the database initialization function
        await initializeDatabase();

        if (req.method === 'GET') {
            await sizeController.getAllSize(res, req.query);
        } else if (req.method === 'POST') {
            await sizeController.createSize(res, req.body);
        } else if (req.method === 'PUT') {
            await sizeController.updateSize(res, req.body);
        } else if (req.method === 'DELETE') {
            await sizeController.deleteSize(res, req.query.id);
        }
        else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};