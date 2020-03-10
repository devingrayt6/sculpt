import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.Schema.Types.ObjectId

const Workout = new Schema(
  {
    title: { type: String, unique: true },
    creatorEmail: { type: String, required: true },
    exercises: [],
    type: { type: String }
    // NOTE If you wish to add additional public properties for Workouts do so here
  },
  { timestamps: true, toJSON: { virtuals: true } })

  Workout.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Workout;
