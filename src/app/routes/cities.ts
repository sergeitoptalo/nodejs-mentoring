import express from 'express';
import cityController from '../controllers/city.controller';
import { ICityDocument } from '../models/city.model';

const cityRouter = express.Router();

cityRouter.param('id', (req, res, next, id) => {
    req.body.cityId = id;
    next();
});

cityRouter
    .route('/')
    .get((req, res) => {
        cityController
            .getAllCities()
            .then((cities: ICityDocument[]) => {
                res.status(200).json(cities);
            })
            .catch((error: Error) => {
                res.status(404).json({ error });
            });
    })
    .post((req, res) => {
        cityController
            .addNewCity(req.body)
            .then((city: ICityDocument) => {
                res.status(200).json(city);
            })
            .catch((error: Error) => {
                res.status(404).json({ error });
            });
    });

cityRouter
    .route('/:id')
    .put((req, res) => {
        cityController
            .updateCity(req.body.cityId, req.body)
            .then((city: ICityDocument) => {
                res.status(200).json(city);
            })
            .catch((error: Error) => {
                res.status(404).json({ error });
            });
    })
    .delete((req, res) => {
        cityController
            .deleteCity(req.body.cityId)
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error: Error) => {
                res.status(404).json({ error });
            });
    });

cityRouter.get('/random', (req, res) => {
    cityController
        .getRandomCity()
        .then((city: ICityDocument) => {
            res.status(200).json(city);
        })
        .catch((error: Error) => {
            res.status(404).json({ error });
        });
});

export default cityRouter;
