import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.Schema.Types.ObjectId

const Workout = new Schema(
  {
    title: [{ type: String, unique: true }],
    userId: { type: ObjId, ref: "Profile"},
    exercises: [],
    type: { type: String }
    // NOTE If you wish to add additional public properties for Workouts do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Workout;
