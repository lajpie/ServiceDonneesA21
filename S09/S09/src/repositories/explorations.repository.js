import Exploration from '../models/exploration.model.js';
import planetRepository from './planet.repository.js';

class ExplorationsRepository {


    retrieveAll(retrieveOptions) {
       const retrieveQuery = Exploration.find().skip(retrieveOptions.skip).limit(retrieveOptions.limit);
       const countQuery = Exploration.countDocuments();

       return Promise.all([retrieveQuery,countQuery]);
    }

    retrieveById(idExploration, retrieveOptions) {

        const retrieveQuery = Exploration.findById(idExploration);

        if (retrieveOptions.planet) {
            retrieveQuery.populate('planet');
        }

        return retrieveQuery;
    }



    transform(exploration, transformOptions = {}) {

        if (transformOptions.embed && transformOptions.embed.planet) {
            //?embed = planet
            //On va devoir faire quelque chose ici
            //exploration.planet => un objet complet
            exploration.planet = planetRepository.transform(exploration.planet, transformOptions);

        } else {
            //on ne veut pas embed la planet
            //exploration.planet => juste un id
            exploration.planet = { href: `/planets/${exploration.planet}` };


        }

        //choix pour le BASE_URL
        //exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;
        exploration.href = `/explorations/${exploration._id}`;

        delete exploration._id;

        return exploration;
    }
}

export default new ExplorationsRepository();