import { Schema, model } from "mongoose";

const adminSchema = Schema(
  {
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
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // select:false
    },
  },
  {
    timestamps: true,
  }
);

const Admin = model("Admins", adminSchema);

export default Admin;
