
import Observation from '../models/observation.model.js';
import objectToDotNotation from '../libs/objectToDotNotation.js';
import dayjs from 'dayjs';

const ZERO_KELVIN = -273.15;

class ObservationsRepository {


    retrieveById(idObservation) {
        return Observation.findById(idObservation)
    }

    retrieveAll(filter) {
        const testFilter = {
            stationName: `${filter}`
        }

        return Observation.find(filter);
    }

    delete(idObservation) {
        return Observation.findByIdAndDelete(idObservation);
    }

    create(observation) {
        return Observation.create(observation);
    }

    transform(observation, transformOption = {}) {

        if (transformOption.unit) {

            switch (transformOption.unit) {
                case 's':
                    observation.temperature += ZERO_KELVIN;
                    observation.temperature = parseFloat(observation.temperature.toFixed(2));
                    observation.feelslike += ZERO_KELVIN;
                    observation.feelslike = parseFloat(observation.feelslike.toFixed(2));
                    break;

                case 'f':
                    observation.temperature = observation.temperature * (9 / 5) + 32;
                    observation.temperature = parseFloat(observation.temperature.toFixed(2));
                    observation.feelslike += observation.feelslike * (9 / 5) + 32;
                    observation.feelslike = parseFloat(observation.feelslike.toFixed(2));

                default:
                    break;
            }

        }

        observation.observationDate = dayjs(observation.observationDate).format('YYYY-MM-DD');

        


        let alpha = 0;
        let beta = 0;
        let gamma = 0;
        let delta = 0;
        observation.hexMatrix.forEach(h => {
            alpha += h.parseInt;
            beta *= h.parseInt;
        });
        gamma = beta / alpha;
        delta = beta % alpha;
        

        observation.hex = { alpha, beta, gamma, delta };

        delete observation.hexMatrix;
        delete observation.__v;

        return observation;

    }

}

export default new ObservationsRepository();