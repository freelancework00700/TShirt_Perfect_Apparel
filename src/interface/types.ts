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
    discount_price: number,
    final_price: string,
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
    description: string,
    inStock: boolean,
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
    category_id: number,
    Category: {
        createdAt: string;
        id: number;
        isDeleted: boolean;
        name: string;
        updatedAt: string;
    }
}

export interface Inquiry {
    id: number,
    email: string,
    phone: string,
    message: string,
    createdAt: string,
    updatedAt: string,
}

export interface ProductInquiry {
    id: number,
    product_id: number,
    color_ids: number[],
    size_ids: number[],
    quantity: string,
    inquiry_message: string,
    name: string,
    email: string,
    mobile_no: string,
    isDeleted: boolean,
    createdAt: string,
    updatedAt: string,
    Product: {
        id: number,
        category_id: number,
        subcategory_id: number,
        name: string,
        price: string,
        color_ids: number[],
        type: string,
        sleeve: string,
        fit: string,
        fabric: string,
        sales_package: string,
        pack_of: string,
        style_code: string,
        neck_type: string,
        ideal_for: string,
        size_ids: number[],
        pattern: string,
        suitable_for: string,
        reversible: string,
        fabric_care: string,
        net_quantity: string,
        status: string,
        description: string,
        discount_price: string,
        isDeleted: string,
        createdAt: string,
        updatedAt: string,
    },
    Sizes: [{
        id: number,
        name: string,
        category_id: string,
        isDeleted: string,
        createdAt: string,
        updatedAt: string,
    }],
    Colors: [{
        id: number,
        name: string,
        isDeleted: boolean,
        createdAt: string,
        updatedAt: string,
    }]
}


export type Filter = "T-Shirts" | "Track-Pants";