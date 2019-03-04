import express from 'express';
import productsController from '../controllers/productsController';
import { IProductDocument } from '../models/product.model';

const productRouter = express.Router();

productRouter.param('id', (req, res, next, id) => {
    req.body.productId = id;
    next();
});

productRouter.route('/')
    .get((req, res) => {
        productsController
            .getAllProducts()
            .then((products: IProductDocument[]) => {
                res.status(200).json(products);
            })
            .catch((error: Error) => {
                res.status(404).json({ error });
            });
    })
    .post((req, res) => {
        productsController
            .addNewProduct(req.body)
            .then((addedProduct: IProductDocument) => {
                res.status(200).json(addedProduct);
            })
            .catch((error: Error) => {
                res.status(500).json({ error });
            });
    });

productRouter
    .route('/:id')
    .get((req, res) => {
        productsController
            .getProductById(req.body.productId)
            .then((product: IProductDocument) => {
                res.status(200).json(product);
            })
            .catch((error: Error) => {
                res.status(404).json({ error });
            });
    })
    .delete((req, res) => {
        productsController
            .deleteProduct(req.body.productId)
            .then((data) => {
                res.status(200).json(data);
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
