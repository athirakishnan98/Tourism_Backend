import { Schema, model } from "mongoose";

const feedbackSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    package: {
      type: Schema.Types.ObjectId,
      ref: "Packages",
    },
    feedback: {
      type: String,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const feedback = model("Feedbacks", feedbackSchema);

export default feedback;
