//TODO toutes les Requests lmao
import { Express } from "express";
import { HttpError } from "http-errors";
import ObservationRepository from "../repositories/observations.repository";

const router = Express.router();

class ObservationRoutes{

    constructor(){
        router.get('/observations/:stationName', this.getAll); // obtenir la liste des observation d'une station
        router.get('/observations/:stationName/:idObservation', this.getOne); //obtenir une observation spécifique d'une station
        router.post('/observations', this.post); // ajouter une observation météo
        router.delete('/observations/:idObservation',this.deleteOne); //supprimer une observation spécifique
    }

    async deleteOne(req,res,next){
        const idObservation = req.params.idObservation;

        try {
            
            let observationDestroyed = await ObservationRepository.delete(idObservation);
            console.log(observationDestroyed);
            if (!observationDestroyed) {
                return next (HttpError.NotFound(`L'observation avec le id ${idObservation}n'existe pas`));
            } else {
                res.status(204).end();
            }

        } catch (error) {
            return next(error);
        }

    }

    async post(req,res,next){
        const newObservation = req.body;


    }

}

new ObservationRoutes();
export default router;
