import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.Schema.Types.ObjectId

const Workout = new Schema(
  {
    title: [{ type: String }],
    sets: {type: Number},
    reps: {type: Number},
    weight: {type: Number},
    distance: {type: Number},
    time: {type: String},
    workoutId: { type: ObjId, ref: "Workout"},
    // NOTE If you wish to add additional public properties for Workouts do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Workout;
