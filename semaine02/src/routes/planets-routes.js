import express from 'express';
import HttpError from 'http-errors';
import Http from 'http-status';

import PLANETS from '../data/planets.js';

const router = express.Router();

class PlanetsRoutes {
    constructor(){
        // Définition des routes pour la ressource planet
        router.get('/planets', this.getAll); //Retrieve toutes les planètes
        router.get('/planets/:idPlanet', this.getOne)
        router.post('/planets', this.post)
    }

    getAll(req, res){
        res.status(200);
        res.set('Content-Type', 'application/json');

        res.send(PLANETS);
    }

    getOne(req, res, next){
        const idPlanet = req.params.idPlanet;
        
        //1. La planete existe = 200 - ok
        // let planet;
        // for(let p of PLANETS){
        //     if (p.id == idPlanet) {
        //         planet = p;
        //         break;
        //     }
        // };
        const planet =PLANETS.find(p => p.id == idPlanet)
        console.log(planet);

        if(!planet){

           return next(HttpError.NotFound(`La plantète avec le id ${idPlanet} nexiste pas`));

        } else {
            res.status(200).json(planet); // fait le content type et send la reponse // ou res.json(planets[0]);
        }

        
    }

    post(req,res,next){
        
    }
}

//super important ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;