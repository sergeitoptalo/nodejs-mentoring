import express from 'express';
import cityController from '../controllers/city.controller';
import { ICity } from '../models/city.model';

const cityRouter = express.Router();

cityRouter.get('/', (req, res) => {
    cityController
        .getRandomCity()
        .then((city: ICity[]) => {
            res.status(200).json(city);
        })
        .catch((error: Error) => {
            res.status(404).json({ error });
        });
});

export default cityRouter;
