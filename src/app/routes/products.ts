import express from 'express';
import productsController from '../controllers/productsController';
import { IProduct } from '../models/product.model';

const productRouter = express.Router();

productRouter.param('id', (req, res, next, id) => {
    req.body.productId = id;
    next();
});

productRouter.route('/')
    .get((req, res) => {
        productsController
            .getAllProducts()
            .then((products: IProduct[]) => {
                res.status(200).json(products);
            })
            .catch((error: Error) => {
                res.status(404).json({ error });
            });
    })
    .post((req, res) => {
        productsController
            .addNewProduct(req.body)
            .then((addedProduct: IProduct) => {
                res.status(200).json(addedProduct);
            })
            .catch((error: Error) => {
                res.status(500).json({ error });
            });
    });

productRouter.get('/:id', (req, res) => {
    productsController
        .getProductById(req.body.productId)
        .then((product: IProduct) => {
            res.status(200).json(product);
        })
        .catch((error: Error) => {
            res.status(404).json({ error });
        });
});

productRouter.get('/:id/reviews', (req, res) => {
    productsController.getProductReviews(req.body.productId)
    .then((reviews: number) => {
         res.status(200).json({ reviews });
     })
     .catch((error: Error) => {
         res.status(404).json(({ error }));
     });
});

export default productRouter;
