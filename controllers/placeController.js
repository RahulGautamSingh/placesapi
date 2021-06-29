const Place = require("../models/place");

const addPlace = async (placeObj) => {
  placeObj["slug"] =
    placeObj.name +
    "-" +
    placeObj.city +
    "-" +
    placeObj.state +
    "-" +
    Date.now();
  let place = new Place(placeObj);
  await place.save().catch((err) => {
    console.log(err);
    return { staus: false, message: err };
  });

  return { status: true, obj: place };
};

const findPlace = async (placeSlug) => {
  let place = await Place.findOne({ slug: placeSlug });
  if (place === null) {
    return { staus: false, message: "No such place exists" };
  }

 else  return { status: true, obj: place };
};

module.exports = {
  addPlace,
  findPlace,
};
