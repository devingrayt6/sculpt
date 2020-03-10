import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.Schema.Types.ObjectId

const Schedule = new Schema(
  {
    monday: { type: String },
    tuesday: { type: String },
    wednesday: { type: String },
    thursday: { type: String },
    friday: { type: String },
    saturday: { type: String },
    sunday: { type: String },
    userId: { type: ObjId, ref: "Profile" }
    // NOTE If you wish to add additional public properties for Schedules do so here
  },
  { timestamps: true, toJSON: { virtuals: true } })

Schedule.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Schedule;
