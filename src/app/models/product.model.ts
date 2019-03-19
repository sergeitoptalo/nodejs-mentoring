import { Document } from 'mongoose';

export interface IProduct {
    productId: number;
    price: string;
    reviews?: number;
}

export interface IProductDocument extends IProduct, Document {}
