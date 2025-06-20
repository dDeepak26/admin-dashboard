export type InventoryFormType = {
    _id?: string;
    productId: string;
    available: number;
    sold: number;
};

export type InventoryDisplayType = {
    _id: string;
    productId: {
        _id: string;
        name: string;
    };
    available: number;
    sold: number;
};