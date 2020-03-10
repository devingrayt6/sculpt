import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import WorkoutSchema from "../models/Workout"

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Workout = mongoose.model("Workout", WorkoutSchema);
  Exercises = mongoose.model("Exercises", ExerciseSchema)
}

export const dbContext = new DbContext();
