import mongoose from "mongoose";
import ValueSchema from "../models/Value";
import ProfileSchema from "../models/Profile";
import WorkoutSchema from "../models/Workout";
import ExerciseSchema from "../models/Exercises";
import StatsSchema from "../models/Stats";

class DbContext {
  Values = mongoose.model("Value", ValueSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
  Workout = mongoose.model("Workout", WorkoutSchema);
  Exercises = mongoose.model("Exercises", ExerciseSchema);
  Stats = mongoose.model("Stats", StatsSchema)
}

export const dbContext = new DbContext();
