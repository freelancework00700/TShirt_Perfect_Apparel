import { NextApiResponse } from 'next';
import Size from '../models/size.model';
import { HttpStatus } from '../utils/http-status';
import { Op } from 'sequelize';

export class SizeController extends HttpStatus {

    /** GET API: Get all size */
    public getAllSize = async (res: NextApiResponse) => {
        try {
            const size = await Size.findAll({ where: { isDeleted: false } });

            if (!size.length) {
                return this.sendBadRequestResponse(res, "Size not found.", size);
            }

            return this.sendOkResponse(res, "Size get successfully.", size);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching size.");
        }
    };

    /** POST API: Create a new size */
    public createSize = async (res: NextApiResponse, params: any) => {
        try {

            const existingSize = await Size.findOne({ where: { name: params.name } });
            if (existingSize) {
                return this.sendBadRequestResponse(res, "Size already exists.", existingSize);
            }

            const size = await Size.create(params);

            if (!size) {
                return this.sendBadRequestResponse(res, "Unable to create size.", size);
            }

            return this.sendOkResponse(res, "Size create successfully.", size);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error creating size.");
        }
    };

    /** PUT API: Update a size */
    public updateSize = async (res: NextApiResponse, params: any) => {
        try {

            const size: any = await Size.findOne({ where: { id: params.id } });
            if (!size) return this.sendBadRequestResponse(res, "Size not found.");

            const existingSize = await Size.findOne({ where: { name: params.name, id: { [Op.ne]: params.id } } });
            if (existingSize) {
                return this.sendBadRequestResponse(res, "Size already exists.", existingSize);
            }

            size.name = params.name || size.name;
            await size.save();

            return this.sendOkResponse(res, "Size update successfully.", size);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error updating size.");
        }
    };

    /** DELETE API: Delete a size */
    public deleteSize = async (res: NextApiResponse, id: any) => {
        try {

            const size: any = await Size.findOne({ where: { id, isDeleted: false } });
            if (!size) return this.sendBadRequestResponse(res, "size not found.");

            size.isDeleted = true;
            await size.save();

            return this.sendOkResponse(res, "Size delete successfully.", size);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error deleting size.");
        }
    };
}