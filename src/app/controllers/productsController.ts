import fs, { readFile } from 'fs';
import { promisify } from 'util';
import { productsDataPath } from '../config/constants';
import db from '../db/models';
import { IProduct } from '../models/product.model';

class ProductController {
    public getAllProducts() {
        db.Product.findAll()
            .then((products: IProduct[]) => products)
            .catch((error: Error) => error);
    }

    public getProductById(productId: string, updateReviews: boolean = true) {
        const writeAsync = promisify(fs.writeFile);

        return db.Product.findOne({ where: { id: +productId } })
            .then((product: any) => {
                if (product && updateReviews) {
                    product.update({ reviews: product.reviews ? +product.reviews + 1 : 1 });
                }
                return product;
            })
            .catch((error: Error) => error);
    }

    public getProductReviews(productId: string) {
        this.getProductById(productId, false)
            .then((product: IProduct) => {
                if (product) {
                    return product.reviews;
                } else {
                    return product;
                }
            })
            .catch((error: Error) => error);
    }

    public addNewProduct(newProduct: IProduct) {
        const writeAsync = promisify(fs.writeFile);

        db.Product.findOrCreate({ where: newProduct, defaults: newProduct })
            .spread((product: any, created: any) => {
                console.log(product.get({
                    plain: true,
                }));
                console.log(created);
                if (created) {
                    return product;
                } else {
                    return 'Product already exists';
                }
            })
            .then((product: any) => product)
            .catch((error: Error) => error);
    }
}

export default new ProductController();
