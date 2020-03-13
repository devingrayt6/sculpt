import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.SchemaTypes.ObjectId


  // NOTE If you wish to add additional public properties for Schedules do so here

const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    stats: {
      "bench": 0,
      "deadLift": 0,
      "pullUp" : 0,
      "squat": 0,
      "sitUp": 0,
      "pushUp": 0,
      "run": 0
    },
    completedExerciseStats: {
      "bench": 0,
      "deadLift": 0,
      "pullUp" : 0,
      "squat": 0,
      "sitUp": 0,
      "pushUp": 0,
      "run": 0
    },
    schedule: {
      "Sunday": {},
      "Monday": {},
      "Tuesday": {},
      "Wednesday": {},
      "Thursday": {},
      "Friday": {},
      "Saturday": {}
    }
    // NOTE If you wish to add additional public properties for profiles do so here
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

Profile.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Profile;
