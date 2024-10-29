import { NextApiResponse } from "next";
import { HttpStatus } from "../utils/http-status";
import ProductInquiry from "../models/product-inquiry.model";
import Product from "../models/product.model";
import Size from "../models/size.model";
import Color from "../models/color.model";
import { Op } from "sequelize";

export class ProductInquiryController extends HttpStatus {

    /** GET API: Get all product inquiries */
    public getAllProductInquiries = async (res: NextApiResponse) => {
        try {
            const product_inquiries: any = await ProductInquiry.findAll({
                include: [
                    { model: Product }
                ],
                where: { isDeleted: false }
            });

            if (!product_inquiries.length) {
                return this.sendBadRequestResponse(res, "Product inquiries not found.", product_inquiries);
            }

            for (const product of product_inquiries) {
                // Add size data
                if (product.size_ids) {
                    const sizes = await Size.findAll({
                        where: {
                            id: {
                                [Op.in]: product.size_ids,
                            }
                        }
                    });
                    product.dataValues.Sizes = sizes;
                } else {
                    product.dataValues.Sizes = [];
                }

                // Add color data
                if (product.color_ids) {
                    const colors = await Color.findAll({
                        where: {
                            id: {
                                [Op.in]: product.color_ids,
                            }
                        }
                    });
                    product.dataValues.Colors = colors;
                } else {
                    product.dataValues.Colors = [];
                }
            }

            return this.sendOkResponse(res, "Product inquiries get successfully.", product_inquiries);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error fetching categories.");
        }
    };

    /** POST API: Create a new Product inquiry API */
    public createProductInquiry = async (res: NextApiResponse, params: any) => {
        try {
            // Check product with same id exist or not.
            const product: any = await Product.findByPk(params.product_id);
            if (!product) {
                return this.sendBadRequestResponse(res, "Product not found.");
            }

            // Conver size id string to array
            params.size_ids = params.size_ids?.split(',').map(Number);

            // Conver color id string to array
            params.color_ids = params.color_ids?.split(',').map(Number);

            // Create product inquiry
            const product_inquiry = await ProductInquiry.create(params);
            if (!product_inquiry) {
                return this.sendBadRequestResponse(res, "Unable to create product inquiry.");
            }

            return this.sendOkResponse(res, "Product inquiry create successfully.", product_inquiry);
        } catch (error) {
            console.log('error: ', error);
            return this.sendInternalServerResponse(res, "Error creating product.");
        }
    };

}