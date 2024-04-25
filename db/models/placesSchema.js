import { Schema, model } from "mongoose";

const placesSchema = Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
  },
});

const Place = model("Places", placesSchema);

export default Place;
