import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.Schema.Types.ObjectId

const ExerciseData = {
  title: { type: String },
  reps: { type: Number },
  sets: { type: Number },
  weights: { type: Number },
  distance: { type: String },
  time: { type: String },
}

const Workout = new Schema(
  {
    title: { type: String, unique: true },
    type: { type: String },
    exerciseData: [ExerciseData],
    creatorEmail: { type: String, required: true },
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
