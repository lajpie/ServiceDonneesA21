//TODO: manipulations des stations
import Station from '../models/Station.model.js';
import objectToDotNotation from '../libs/objectToDotNotation.js';
import dayjs from 'dayjs';

class StationsRepository{

delete(idStation)
{
    return Station.findByIdAndDelete(idStation);
}

create(station)
{
    return Station.create(station);
}

}