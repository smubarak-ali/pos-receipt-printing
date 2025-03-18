export interface PrintRequest {
    items: PrintItems[];
    totalAmount: number;
    totalDiscount: number;
    posServiceFee: number;
    charge: number;
    netTotal: number;
}

export interface PrintItems {
    productId?: number;
    productName: string;
    quantity: string;
    price: string;
    gstRate: number;
    gstAmount: number;
    totalAmount: string;
}

