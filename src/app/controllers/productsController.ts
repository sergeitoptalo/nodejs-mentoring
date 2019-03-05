import { MongoError } from 'mongodb';
import db from '../db/models';
import { IProductDocument } from '../models/product.model';
import { Product } from '../mongoDb/models';

class ProductController {
    public getAllProducts() {
        return Product.find({}, (err, products) => {
            if (err) {
                return err;
            }

            return products;
        });
        /* return db.Product.findAll()
            .then((products: IProduct[]) => products)
            .catch((error: Error) => error); */
    }

    public getProductById(productId: string, updateReviews: boolean = true) {
        return Product.findOne({
            productId: parseInt(productId, 10),
        },
            (error, product: IProductDocument) => {
                if (error) {
                    return error;
                }

                if (updateReviews) {
                    product.reviews = product.reviews + 1 || 0;
                    product.save((err: MongoError, updatedProduct: IProductDocument) => {
                        if (err) {
                            return err;
                        }

                        return updatedProduct;
                    });
                }

                return product;
            });
        /* return db.Product.findOne({ where: { id: parseInt(productId, 10) } })
            .then((product: any) => {
                if (product && updateReviews) {
                    product.update({
                        reviews: product.reviews
                            ? parseInt(product.reviews, 10) + 1
                            : 1,
                    });
                }
                return product;
            })
            .catch((error: Error) => error); */
    }

    public getProductReviews(productId: string) {
        return this.getProductById(productId, false)
            .then((product: IProductDocument) => {
                if (product) {
                    return product.reviews;
                } else {
                    return product;
                }
            })
            .catch((error: Error) => error);
    }

    public addNewProduct(newProduct: IProductDocument) {
        return new Promise((resolve, reject) => {
            Product.countDocuments({})
                .then((count: number) => {
                    newProduct.productId = count + 1;

                    Product.create(newProduct, (error: MongoError, product: IProductDocument) => {
                        if (error) {
                            reject(error);
                        }

                        resolve(product);
                    });
                })
                .catch((error) => {
                    reject(error);
                });
        });

        /* return db.Product.findOrCreate({ where: newProduct, defaults: newProduct })
            .spread((product: any, created: any) => {
                if (created) {
                    return product;
                } else {
                    return 'Product already exists';
                }
            })
            .then((product: any) => product)
            .catch((error: Error) => error); */
    }

    public deleteProduct(productId: string) {
        return Product.deleteOne({ productId: parseInt(productId, 10) }, (error: MongoError) => {
            if (error) {
                return error;
            }
            return 'Removed';
        });
    }
}

export default new ProductController();
