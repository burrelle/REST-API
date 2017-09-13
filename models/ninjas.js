var mongoose = require('mongoose')
var Schema = mongoose.Schema;

//Create Geolocation Schema
var GeoSchema = new Schema({
    type: {
        type: String,
        default: 'Point'
    },
    coordinates: {
        type: [Number],
        index: '2dsphere'
    }
});

//Create ninjas Schema & model
var NinjaSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field is required']
  },
  rank: {
    type: String
  },
  available: {
    type: Boolean,
    default: false
  },
  geometry: GeoSchema
});

var Ninja = mongoose.model('ninja', NinjaSchema);

module.exports = Ninja;
