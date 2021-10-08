//TODO toutes les Requests lmao
import  express  from "express";
import  HttpError  from "http-errors";
import ObservationsRepository from "../repositories/observations.repository.js";

const router = new express.Router();

class ObservationRoutes {

    constructor() {
        router.get('/:stationName', this.getAll); // obtenir la liste des observation d'une station
        router.get('/:stationName/:idObservation', this.getOne); //obtenir une observation spécifique d'une station
        router.post('/', this.post); // ajouter une observation météo
        router.delete('/:idObservation', this.deleteOne); //supprimer une observation spécifique
    }

    // ---------------------------------------------- à ne pas faire I guess?
    async deleteOne(req, res, next) {
        const idObservation = req.params.idObservation;

        try {

            let observationDestroyed = await ObservationsRepository.delete(idObservation);
            console.log(observationDestroyed);
            if (!observationDestroyed) {
                return next(HttpError.NotFound(`L'observation avec le id ${idObservation}n'existe pas`));
            } else {
                res.status(204).end();
            }

        } catch (error) {
            return next(error);
        }

    }

    async post(req, res, next) {
        const newObservation = req.body;
        if (Object.keys(newObservation).length === 0) {
            return next(HttpError.BadRequest("L'observation ne peut pas être vide"));
        }

        try {

            let ObservationAdded = await ObservationsRepository.create(newObservation);
            ObservationAdded = ObservationAdded.toObject({ getters: true, virtuals: false });
            ObservationAdded = ObservationsRepository.transform(ObservationAdded);

            res.status(201).json(ObservationAdded);

        } catch (err) {
            return next(err);
        }

    }

    async getOne(req, res, next) {
        const idObservation = req.params.idObservation;

        try {
            //paramètres de transformation
            const transformOption = {};
            if (req.query.unit) {

                if (req.query.unit === 'm' || req.query.unit === 's' || req.query.unit === 'f') {
                    transformOption.unit = req.query.unit;
                } else {
                    return next(HttpError.BadRequest('Le paramètre doit avoir la valeur m, s ou f'));
                }
            }

            let observation = await observationsRepository.retrieveById(idObservation);

            if (!observation) {
                return next(HttpError.NotFound(`L'observation avec le id ${idObservation}n'existe pas`));
            } else {
                observation = observation.toObject({ getters: true, virtuals: false });
                observation = observation.transform(observation, transformOption);
                res.status(200).json(observation);
            }

        } catch (error) {
            return next(error);
        }




    }

    async getAll(req, res, next) {

        //critères pour la BD
        const filter = req.params.stationName;


        //paramètres de transformation
        const transformOption = {};
        if (req.query.unit) {

            if (req.query.unit === 'm' || req.query.unit === 's' || req.query.unit === 'f') {
                transformOption.unit = req.query.unit;
            } else {
                return next(HttpError.BadRequest('Le paramètre doit avoir la valeur m, s ou f'));
            }
        }

        try {

            let observations = await ObservationsRepository.retrieveAll(filter);

            //je veux un nouveau tableau des observations transformées
            observations = observations.map(p => {
                p = p.toObject({ getters: true, virtuals: false });
                p = ObservationsRepository.transform(p, transformOption);
                return p;
            });

            res.status(200).json(observations);

        } catch (err) {
            return next(err);
        }

    }

}

new ObservationRoutes();
export default router;
