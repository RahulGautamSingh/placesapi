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
  } else return { status: true, obj: place };
};
const listPlaces = async (placeObj) => {
  if (placeObj.name === undefined) placeObj["name"] = [];
  if (placeObj.state === undefined) placeObj["state"] = [];
  if (placeObj.country === undefined) placeObj["country"] = [];

  let places = await Place.find({
    $or: [
      { name: { $in: placeObj.name } },
      { state: { $in: placeObj.state } },
      { country: { $in: placeObj.country } },
    ],
  });

  //   if (placeObj.state !== undefined) {
  //     let arr = await Place.find({ state: { $in: placeObj.state } });
  //     if (arr.length > 0) {
  //       arr.forEach((elem) => places.add(elem));
  //     }
  //   }
  //   if (placeObj.country !== undefined) {
  //     let arr = await Place.find({ country: { $in: placeObj.country } });
  //     if (arr.length > 0) {
  //       arr.forEach((elem) => places.add(elem));
  //     }
  //   }
  console.log(places);
  if (places.length === 0) {
    return { staus: false, message: "No similar places exist." };
  } else return { status: true, obj: places };
};

module.exports = {
  addPlace,
  findPlace,
  listPlaces,
};
