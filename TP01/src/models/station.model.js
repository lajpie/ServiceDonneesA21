//TODO: modele de la station utilisé pour la création
import mongoose from "mongoose";

const stationSchema= mongoose.Schema({
    location:{
        station: {type:String, unique:true, required:true, uppercase:true},
        coord:{
            lon:Number,
            lat:Number
        }
    },
    temperature:Number,
    pressure:Number,
    humidity:Number,
    feelslike:Number,
    uvIndex:{type:Number, min:0, max:11},
    wind:{
    speed:Number,
    degree:{type:Number, min:0, max:360}
    },
    clouds:{
        cloudcover:{type:Number, min:0, max:1}
    },
    observationDate:{type:Date,  default:Date.now},
    hexMatrix:[String]


}, {
    collection:'stations',
    strict:'throw'
});

export default mongoose.model('Station', stationSchema);

