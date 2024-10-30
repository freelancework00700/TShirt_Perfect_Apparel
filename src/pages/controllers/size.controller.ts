import { NextApiResponse } from 'next';
import Size from '../models/size.model';
import { HttpStatus } from '../utils/http-status';
import { Op } from 'sequelize';
import Category from '../models/category.model';
import sequelize from 'sequelize';

export class SizeController extends HttpStatus {

    /** GET API: Get all size */
    public getAllSize = async (res: NextApiResponse, params: any) => {
        try {

            // Sorting
            let column = params.sortColumn;
            let direction;
            if (column == null || column == '') {
                column = "id";
            } else if (column === "category_name") {
                column = 'Category.name';
            }
            direction = params.sortDirection == null || params.sortDirection == "" ? "DESC" : params.sortDirection;
            const orderBy = sequelize.literal(`${column} ${direction}`);

            // Get all size
            const size = await Size.findAll({
                include: [
                    { model: Category }
                ],
                where: { isDeleted: false },
                order: [orderBy]
            });

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

            const existingSize = await Size.findOne({ where: { name: params.name, category_id: params.category_id } });
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
            size.category_id = params.category_id || size.category_id; 
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