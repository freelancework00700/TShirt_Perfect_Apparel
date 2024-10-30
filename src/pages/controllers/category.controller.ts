import { NextApiResponse } from 'next';
import Category from '../models/category.model';
import { HttpStatus } from '../utils/http-status';
import { Op } from 'sequelize';
import sequelize from 'sequelize';

export class CategoryController extends HttpStatus {

    /** GET API: Get all Categories */
    public getAllCategories = async (res: NextApiResponse, params: any) => {
        try {

            // Sorting
            let column = params.sortColumn;
            let direction;
            if (column == null || column == '') {
                column = "id";
            }
            
            direction = params.sortDirection == null || params.sortDirection == "" ? "DESC" : params.sortDirection;
            const orderBy = sequelize.literal(`${column} ${direction}`);

            // Get categories
            const categories = await Category.findAll({ where: { isDeleted: false }, order: [orderBy] });

            if (!categories.length) {
                return this.sendBadRequestResponse(res, "Categories not found.", categories);
            }

            return this.sendOkResponse(res, "Categories get successfully.", categories);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching categories.");
        }
    };

    /** POST API: Create a new category */
    public createCategory = async (res: NextApiResponse, params: any) => {
        try {

            const existingCategory = await Category.findOne({ where: { name: params.name } });
            if (existingCategory) {
                return this.sendBadRequestResponse(res, "Category already exists.", existingCategory);
            }

            const category = await Category.create(params);

            if (!category) {
                return this.sendBadRequestResponse(res, "Unable to create category.", category);
            }

            return this.sendOkResponse(res, "Category create successfully.", category);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error creating category.");
        }
    };

    /** PUT API: Update a category */
    public updateCategory = async (res: NextApiResponse, params: any) => {
        try {

            const category: any = await Category.findOne({ where: { id: params.id } });
            if (!category) return this.sendBadRequestResponse(res, "Category not found.");

            const existingCategory = await Category.findOne({ where: { name: params.name, id: { [Op.ne]: params.id } } });
            if (existingCategory) {
                return this.sendBadRequestResponse(res, "Category already exists.", existingCategory);
            }

            category.name = params.name || category.name;
            await category.save();

            return this.sendOkResponse(res, "Category update successfully.", category);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error updating category.");
        }
    };

    /** DELETE API: Delete a category */
    public deleteCategory = async (res: NextApiResponse, id: any) => {
        try {

            const category: any = await Category.findOne({ where: { id, isDeleted: false } });
            if (!category) return this.sendBadRequestResponse(res, "Category not found.");

            category.isDeleted = true;
            await category.save();

            return this.sendOkResponse(res, "Category delete successfully.", category);
        } catch (error) {
            return this.sendInternalServerResponse(res, "Error deleting category.");
        }
    };
}