export interface ICity {
    name: string;
    country: string;
    capital: boolean;
    location: {
        lat: number;
        long: number;
    };
}
