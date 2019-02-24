import fs, { readFile } from 'fs';
import { promisify } from 'util';
import { productsDataPath } from '../config/constants';
import db from '../db/models';
import { IProduct } from '../models/product.model';

class ProductController {
    public getAllProducts() {
        return new Promise((resolve, reject) => {
            db.Product.findAll()
                .then((products: IProduct[]) => {
                    resolve(products);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }

    public getProductById(productId: string, updateReviews: boolean = true) {
        const writeAsync = promisify(fs.writeFile);

        return new Promise((resolve, reject) => {
            db.Product.findOne({ where: { id: +productId } })
                .then((product: any) => {
                    if (product && updateReviews) {
                        product.update({ reviews: product.reviews ? +product.reviews + 1 : 1 });
                    }
                    resolve(product);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }

    public getProductReviews(productId: string) {
        return new Promise((resolve, reject) => {
            this.getProductById(productId, false)
                .then((product: IProduct) => {
                    if (product) {
                        resolve(product.reviews);
                    } else {
                        resolve(product);
                    }
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }

    public addNewProduct(newProduct: IProduct) {
        const writeAsync = promisify(fs.writeFile);

        return new Promise((resolve, reject) => {
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
                .then((product: any) => {
                    resolve(product);
                })
                .catch((error: Error) => {
                    reject(error);
                });
        });
    }
}

export default new ProductController();
