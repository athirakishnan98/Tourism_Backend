import { Schema, model } from "mongoose";

const packageSchema = Schema(
  {
    location: {
      type: String,
      required: true,
      trim: true,
    },
    spe_location: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    rating: {
      type: Number,
    },
    amount: {
      type: Number,
      required: true,
    },
    no_of_days: {
      type: Number,
      required: true,
    },
    availability: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Package = model("Packages", packageSchema);

export default Package;
