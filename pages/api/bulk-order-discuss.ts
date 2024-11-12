import type { NextApiRequest, NextApiResponse } from 'next';
import { BulkOrderDiscussController } from './controllers/bulk-order-discuss.controller';
import { initializeDatabase } from './db';

const bulkOrderDiscussController = new BulkOrderDiscussController();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

        // Call the database initialization function
        await initializeDatabase();

        if (req.method === 'GET') {
            await bulkOrderDiscussController.getAllBulkOrderDiscuss(res, req.query);
        } else if (req.method === 'POST') {
            await bulkOrderDiscussController.createBulkOrderDiscuss(res, req.body);
        } else {
            bulkOrderDiscussController
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};