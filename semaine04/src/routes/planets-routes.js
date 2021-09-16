import express from 'express';
import HttpError from 'http-errors';
import HttpStatus from 'http-status';

import PLANETS from '../data/planets.js';

import planetsRepository from '../repositories/planets.repository.js';

const router = express.Router();

class PlanetsRoutes {
    constructor(){
        // Définition des routes pour la ressource planet
        router.get('/', this.getAll); //Retrieve toutes les planètes
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet',this.deleteOne);
        router.patch('/:idPlanet',this.patch);
        router.put('/:idPlanet',this.put);
    }

    async getAll(req, res){

        const filter = {};
        if(req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }

        try {
            
            const planets = await planetsRepository.retireveAll(filter);
            res.status(200).json(planets);

        } catch (err) {
            return next(err);
        }
    }
    
    async getOne(req, res, next){
        const idPlanet = req.params.idPlanet;

        try{

            
            
            const planet = await planetsRepository.retrieveById(idPlanet);
            console.log(planet);
    
            if(!planet){
    
               return next(HttpError.NotFound(`La plantète avec le id ${idPlanet} nexiste pas`));
    
            } else {
                res.status(200).json(planet); // fait le content type et send la reponse // ou res.json(planets[0]);
            }


        } catch (err) {
            return next(err);
        }

        
    }

    post(req,res,next){
        //console.log(req.body);

        const newPlanet = req.body;

        const planet =PLANETS.find(p => p.id == newPlanet.id);
        if (planet) {
            //find as trouver une planette, Jai un doublon ===== Erreur
            return next(HttpError.Conflict(`Une planète avec l'identifiant ${newPlanet.id} existe déjà`));
        } else {
            PLANETS.push(newPlanet);
            res.status(201);
            res.json(newPlanet);
        }
    }

    deleteOne(req,res,next){
        const idPlanet = req.params.idPlanet;

        const index = PLANETS.findIndex(i => i.id == idPlanet);
        if (index === -1) {
            return next(HttpError.NotFound(`La plantète avec le id ${idPlanet} nexiste pas`));
        } else {
            PLANETS.splice(index, 1);
            res.status(204).end();
        }

    }

    patch(req,res,next){
        return next(HttpError.NotImplemented());
    }

    put(req,res,next){
        return next(HttpError.NotImplemented());
    }
}

//super important ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;