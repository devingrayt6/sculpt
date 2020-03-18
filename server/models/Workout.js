import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.Schema.Types.ObjectId

let noWorkout = {
  _id: "12345",
  id: "12345",
  title: "No Workout Set",
  type: "none",
  creatorEmail: "admin"
}

const ExerciseData = {
  title: { type: String },
  reps: { type: Number },
  sets: { type: Number },
  weight: { type: Number },
  distance: { type: String },
  time: { type: String },
}

const Workout = new Schema(
  {
    title: { type: String },
    type: { type: String },
    exerciseData: [ExerciseData],
    creatorEmail: { type: String, required: true },
    day: [{ type: String, lowercase: true }]
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
