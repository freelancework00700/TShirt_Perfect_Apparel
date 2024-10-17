import type { NextApiRequest, NextApiResponse } from 'next';
import { ColorController } from '../controllers/color.controller'; 
import { initializeDatabase } from './db';

const colorController = new ColorController();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    try {

       // Call the database initialization function
       await initializeDatabase();

        if (req.method === 'GET') {
            await colorController.getAllColor(res);   
        } else if (req.method === 'POST') {
            await colorController.createColor(res, req.body);
        } else if (req.method === 'PUT') {
            await colorController.updateColor(res, req.body);
        }else if (req.method === 'DELETE') {
            await colorController.deleteColor(res, req.query.id);
        }
        else {
            res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
            return res.status(405).end(`Method ${req.method} Not Allowed`);
        }
    } catch(error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};