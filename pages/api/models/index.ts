import { Sequelize } from 'sequelize';
import Category from './category.model';
import SubCategory from './sub-category.model';
import Product from './product.model';
import ProductImages from './product-images.model';
import Color from './color.model';
import Size from './size.model';
import GetInTouch from './get-in-touch.model';
import ProductInquiry from './product-inquiry.model';
import BulkOrderDiscuss from './bulk-order-discuss.model';

export const initMySQLModels = (connection: Sequelize) => {
    Product.initModel(connection);
    ProductImages.initModel(connection);
    Category.initModel(connection);
    SubCategory.initModel(connection);
    Color.initModel(connection);
    Size.initModel(connection);
    GetInTouch.initModel(connection);
    ProductInquiry.initModel(connection);
    BulkOrderDiscuss.initModel(connection);

    Product.initAssociations();
    ProductImages.initAssociations();
    Category.initAssociations();
    SubCategory.initAssociations();
    Color.initAssociations();
    Size.initAssociations();
    GetInTouch.initAssociations();
    ProductInquiry.initAssociations();
    BulkOrderDiscuss.initAssociations();

}