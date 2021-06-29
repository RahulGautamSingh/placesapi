
const mongoose = require("mongoose");

const PlaceSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: false,
  },
  city: {
    type: String,
    unique: false,
  },
  slug:{
    type:String,
    unique: true,
  },
  state: {
    type: String,
    unique: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const PlaceModel = mongoose.model('Place',PlaceSchema)

module.exports = PlaceModel