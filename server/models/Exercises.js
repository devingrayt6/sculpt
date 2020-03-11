import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.Schema.Types.ObjectId

const Exercise = new Schema(
  {
    title: { type: String },
    sets: { type: Number },
    reps: { type: Number },
    weight: { type: Number },
    distance: { type: Number },
    time: { type: String },
    creatorEmail: { type: String, required: true }
  // NOTE If you wish to add additional public properties for Workouts do so here
  },
  { timestamps: true, toJSON: { virtuals: true } })

Exercise.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Exercise;
