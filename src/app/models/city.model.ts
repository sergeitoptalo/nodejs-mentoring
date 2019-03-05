import { Document } from 'mongoose';

export interface ICity {
    name: string;
    country: string;
    capital: boolean;
    cityId: number;
    location: {
        lat: number;
        long: number;
    };
}

export interface ICityDocument extends ICity, Document {}
