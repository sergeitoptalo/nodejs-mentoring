import db from '../db/models';
import { IProduct } from '../models/product.model';

class ProductController {
    public getAllProducts() {
        return db.Product.findAll()
            .then((products: IProduct[]) => products)
            .catch((error: Error) => error);
    }

    public getProductById(productId: string, updateReviews: boolean = true) {
        return db.Product.findOne({ where: { id: parseInt(productId, 10) } })
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
            .catch((error: Error) => error);
    }

    public getProductReviews(productId: string) {
        return this.getProductById(productId, false)
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
        return db.Product.findOrCreate({ where: newProduct, defaults: newProduct })
            .spread((product: any, created: any) => {
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
