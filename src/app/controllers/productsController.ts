import fs, { readFile } from 'fs';
import { promisify } from 'util';
import { productsDataPath } from '../config/constants';
import { IProduct } from '../models/product.model';

class ProductController {
    public getAllProducts() {
        return new Promise((resolve, reject) => {
            const readFileAsync = promisify(readFile);
            try {
                const data = readFileAsync(productsDataPath)
                    .then((products: Buffer) => {
                        resolve(JSON.parse(products.toString()));
                    });
            } catch (error) {
                reject(error);
            }
        });
    }

    public getProductById(productId: string) {
        const writeAsync = promisify(fs.writeFile);

        return new Promise((resolve, reject) => {
            this.getAllProducts()
                .then((products: []) => {
                    const productsWithUpdatedReviews = products
                        .map((product: IProduct) => product.id === productId
                            ? { ...product, reviews: product.reviews ? ++product.reviews : 1 }
                            : product,
                        );
                    writeAsync(productsDataPath, JSON.stringify(productsWithUpdatedReviews));
                    return productsWithUpdatedReviews
                        .filter((product: IProduct) => product.id === productId)[0];
                })
                .then((product) => {
                    resolve(product);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public getProductReviews(productId: string) {
        return new Promise((resolve, reject) => {
            this.getAllProducts()
                .then((products: IProduct[]) => {
                    resolve(
                        products
                            .filter((product: IProduct) =>
                                product.id === productId)[0].reviews || 0,
                    );
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    public addNewProduct(newProduct: IProduct) {
        const writeAsync = promisify(fs.writeFile);

        return new Promise((resolve, reject) => {
            this.getAllProducts()
                .then((products: IProduct[]) => {
                    products.push(newProduct);
                    writeAsync(productsDataPath, JSON.stringify(products))
                        .then(() => {
                            resolve(newProduct);
                        })
                        .catch((error) => {
                            reject(error);
                        });
                });
        });
    }
}

export default new ProductController();
