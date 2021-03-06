const express = require("express");

const app = express();
const mongoose = require("mongoose");
const {
  addPlace,
  findPlace,
  listPlaces,
} = require("./controllers/placeController");
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/placedb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

app.get("/", (req, res) => {
  res.json({ message: "Good job!" });
});


app.post("/add", async (req, res) => {
  let result = await addPlace(req.body);
  if (result.status) {
    res.json({ place: result.obj });
  } else {
    res.send(400).json({ message: result.message });
  }
});


app.get("/getplace", async (req, res) => {
  let result = await findPlace(req.body.slug);
  if (result.status) {
    res.json({ place: result.obj });
  } else {
    res.send(400).json({ message: result.message });
  }
});


app.get("/place", async (req, res) => {
  let filters = req.query;
  let keys = Object.entries(filters);
  console.log(keys);
  keys.forEach((elem) => {
  
      filters[elem[0]] = filters[elem[0]].split(",");
  });
console.log(filters)
  let result = await listPlaces(filters);
  if (result.status) {
    res.json({ place: result.obj });
  } else {
    res.json({ message: result.message });
  }
});



const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Server is listening at http://localhost:${PORT}`);
});
