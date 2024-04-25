import { Schema, model } from "mongoose";

const bookpackageSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    package: 
      {
        type: Schema.Types.ObjectId,
        ref: "Packages",
      },
    name:{
      type:String,
    },
    phone:{
      type:Number,
    },
    email:{
      type:String
    },
    date_time: {
      type: Date,
      require: true,
    },
    booked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Bookpackage = model("Bookpackages", bookpackageSchema);

export default Bookpackage;
