//TODO: manipulations des stations
import Station from '../models/Station.model.js';
import objectToDotNotation from '../libs/objectToDotNotation.js';
import dayjs from 'dayjs';

class StationsRepository{

delete(idObservation)
{
    return Station.findByIdAndDelete(idObservation);
}

create(station)
{
    return Station.create(station);
}

}

export default new StationsRepository();