// types/Product.ts

export type Category = {
    _id: string;
    name: string;
    description?: string;
};

export type ProductDisplayType = {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    categories: Category[];
};

export type ProductFormType = {
    _id?: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    categories: string[];
};
