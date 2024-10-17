import type { NextApiRequest, NextApiResponse } from 'next';
import { GetInTouchController } from '../controllers/get-in-touch.controller';
import { initializeDatabase } from './db';

const getInTouchController = new GetInTouchController();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

       // Call the database initialization function
       await initializeDatabase();

        if (req.method === 'GET') {
            await getInTouchController.getAllGetInTouch(res);   
        } else if (req.method === 'POST') {
            await getInTouchController.createGetInTouch(res, req.body);
        } else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};