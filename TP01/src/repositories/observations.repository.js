
import Observation from '../models/observation.model.js';
import objectToDotNotation from '../libs/objectToDotNotation.js';
import dayjs from 'dayjs';

class ObservationRepository{

delete(idObservation)
{
    return Station.findByIdAndDelete(idObservation);
}

create(observation)
{
    return Observation.create(observation);
}

}

export default new ObservationRepository();