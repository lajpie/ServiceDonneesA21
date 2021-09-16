import Planet from '../models/planet.model.js';

class PlanetsRepository{
    retrieveById(idPlanet){
        return Planet.findById(idPlanet);
    }

    retireveAll(filter) {


        //équivalent des WHERE en SQL
        const testFilter = {
            discoveredBy:'Skadex',
            temperature: {$gt : 240},
            'position.y':{$lt :500}
        }

        const testFilterOr = {
            $or:[{discoveredBy:'Skadex'},
            {temperature: {$gt:240}}]
        }

        return Planet.find(filter);
    }
}

export default new PlanetsRepository();