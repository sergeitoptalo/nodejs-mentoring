declare namespace Express {
    export interface Request {
       parsedCookies?: any;
       parsedQuery?: any;
       product?: {
          id: string,
          price: string,
       };
       productById?: string;
       query?: any;
       reviews?: {
          reviews: number,
       };
    }
 }
