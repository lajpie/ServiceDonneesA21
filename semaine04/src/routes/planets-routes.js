import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';
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

    async getAll(req, res, next){

        //critères pour la BD
        const filter = {};
        if(req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }
        
        //paramètres de transformation
        const transformOption = {};
        if (req.query.unit) {

            if (req.query.unit === 'c') {
                transformOption.unit = req.query.unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre doit avoir la valeur c pour Celsius'));
            }
        }

        try {
            
           let planets = await planetsRepository.retrieveAll(filter);

            //je veux un nouveau tableau des planetès transformée
            planets = planets.map(p=> {
                p = p.toObject({getters:true, virtuals:false});
                p = planetsRepository.transform(p, transformOption);
                return p;
            });

            res.status(200).json(planets);

        } catch (err) {
            return next(err);
        }
    }
    
    async getOne(req, res, next){
        const idPlanet = req.params.idPlanet;

        try{

            //paramètres de transformation
        const transformOption = {};
        if (req.query.unit) {

            if (req.query.unit === 'c') {
                transformOption.unit = req.query.unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre doit avoir la valeur c pour Celsius'));
            }
        }
            
            let planet = await planetsRepository.retrieveById(idPlanet);
            console.log(planet);


    
            if(!planet){
    
               return next(HttpError.NotFound(`La plantète avec le id ${idPlanet} nexiste pas`));
    
            } else {
                planet = planet.toObject({getters:true, virtuals:false});
                planet = planetsRepository.transform(planet, transformOption);
                res.status(200).json(planet); // fait le content type et send la reponse // ou res.json(planets[0]);

            }


        } catch (err) {
            return next(err);
        }

        
    }

    async post(req,res,next){
        const newPlanet = req.body;
        //TODO: validation rapide jusqu'à la semaine +/- 8
        if(Object.keys(newPlanet).length === 0){
            return next(HttpError.BadRequest('La planete ne peut pas être vide'));
        }
        
        try {
            
            let planetAdded = await planetsRepository.create(newPlanet);
            planetAdded = planetAdded.toObject({getters:true, virtuals:false});
            planetAdded = planetsRepository.transform(planetAdded);

            res.status(201).json(planetAdded);

        } catch (err) {
            return next(err);
        }
    }

    async deleteOne(req,res,next){
        const idPlanet = req.params.idPlanet;

        
        try {

            let planetDestroyed = await planetsRepository.delete(idPlanet);
            console.log(planetDestroyed);
            if (!planetDestroyed) {
                return next(HttpError.NotFound(`La plantète avec le id ${idPlanet} nexiste pas`));
            } else {
                
                res.status(204).end();
            }
        } catch (err) {
            return next(err);
        }

        

    }

    async patch(req,res,next){
        const planetModifs =req.body;


        if(Object.keys(newPlanet).length === 0){
            return next(HttpError.BadRequest('La planete ne peut pas être vide'));
        }

        try {
            
            let planet  = await planetsRepository.update(req.params.idPlanet ,planetModifs); 

            if (!planet) {
                return next(HttpError.NotFound(`La plantète avec le id ${req.params.idPlanet} nexiste pas`));
            }

            planet = planet.toObject({getters: false, virtuals: false});
            planet = planetsRepository.transform(planet);

            res.status(200).json(planet);

        } catch (err) {
            return next(err);
        }

    }

    put(req,res,next){
        return next(HttpError.NotImplemented());
    }
}

//super important ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;