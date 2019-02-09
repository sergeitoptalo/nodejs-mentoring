declare namespace Express {
    export interface Request {
       product?: {
          id: string,
          price: string,
       };
       productById?: string;
       reviews?: {
          reviews: number,
       };
    }
 }
