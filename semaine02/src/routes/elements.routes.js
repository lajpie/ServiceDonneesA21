import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';


import ELEMENTS from '../data/elements.js';

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);

    }

    getAll(req, res, next) {
       res.status(200)
       res.set('Content-Type', 'application/json');

       res.send(ELEMENTS);
    }

    getOne(req, res, next) {
       const symbolElement = req.params.symbol;

       const element = ELEMENTS.find(e => e.symbol == symbolElement);

       if (!element) {
        return next(HttpError.NotFound(`L'element avec le symbole ${symbolElement} nexiste pas`));
       } else {
        res.status(200).json(element);
       }
    }

    post(req, res, next) {
        console.log(req.body);
        const newElement = req.body;

        const element = ELEMENTS.find(e => e.symbol == newElement.symbol);
        if(element) {
            return next(HttpError.Conflict(`L'element avec le symbole ${symbolElement} existe déjà`));
        } else {
            ELEMENTS.push(newElement);
            res.status(201);
            res.json(newElement);
        }
        
    }
    
    delete(req, res, next) {
        const symbolElement = req.params.symbol;

       const index = ELEMENTS.findIndex(e => e.symbol == symbolElement);
       if (index === -1) {
        return next(HttpError.NotFound(`L'element avec le symbole ${symbolElement} nexiste pas`));
    } else {
        ELEMENTS.splice(index, 1);
        res.status(204).end();
    }
    }
}

new ElementsRoutes();

export default router;