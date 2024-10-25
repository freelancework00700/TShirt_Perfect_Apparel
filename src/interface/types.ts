export interface IProduct {
    category_id: number,
    color_ids: number,
    createdAt: string,
    fabric: string,
    fabric_care: string,
    fit: string,
    id: number,
    ideal_for: string,
    isDeleted: boolean,
    name: string,
    neck_type: string,
    net_quantity: string,
    pack_of: string,
    pattern: string,
    price: string,
    reversible: string,
    sales_package: string,
    size_ids: number[],
    sleeve: string,
    status: string,
    style_code: string,
    subcategory_id: number,
    suitable_for: string,
    type: string,
    updatedAt: string,
    Category: {
        id: number,
        name: string,
        isDeleted: boolean,
        createdAt: string,
        updatedAt: string,
    }
    Colors: [{
        id: number,
        name: string,
        isDeleted: boolean,
        createdAt: string,
        updatedAt: string,
    }],
    ProductImages: ProductImages[],
    Sizes: [{
        createdAt: string,
        id: number,
        isDeleted: boolean,
        name: string,
        updatedAt: string,
    }],
    SubCategory: {
        category_id: number,
        createdAt: string,
        id: number
        isDeleted: boolean,
        name: string,
        updatedAt: string,
    }
}

interface ProductImages {
    contentType: string,
    createdAt: string,
    fileName: string,
    fileSize: string,
    fileType: string,
    id: boolean,
    isDeleted: boolean,
    product_id: number,
    sysFileName: string,
    updatedAt: string,
}

export interface ICategories {
    createdAt: string;
    id: number;
    isDeleted: boolean;
    name: string;
    updatedAt: string;
}

export interface ISubCategories {
    category_id: number,
    createdAt: string,
    id: number
    isDeleted: boolean,
    name: string,
    updatedAt: string,
}

export interface IColor {
    createdAt: string;
    id: number;
    isDeleted: boolean;
    name: string;
    updatedAt: string;
}

export interface ISize {
    createdAt: string;
    id: number;
    isDeleted: boolean;
    name: string;
    updatedAt: string;
    Category: {
        createdAt: string;
        id: number;
        isDeleted: boolean;
        name: string;
        updatedAt: string;
    }
}
