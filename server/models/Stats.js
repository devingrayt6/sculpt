import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.SchemaTypes.ObjectId

const Stats = new Schema(
  {
    // type: {type: String}
    // value: {type: Number}
    // profileId: {type: ObjId, ref: "Profile", required: true}
    bench: [{type: Number, default: 0}],
    deadLift: [{type: Number, default: 0}],
    pullUp: [{type: Number, default: 0}],
    squat: [{type: Number, default: 0}],
    sitUp: [{type: Number, default: 0}],
    pushUp: [{type: Number, default: 0}],
    time: [{type: Number, default: 0}],
    creatorEmail: { type: String, required: true },
    // NOTE If you wish to add additional public properties for Workouts do so here
  },
  { timestamps: true, toJSON: { virtuals: true } })

Stats.virtual("creator",
  {
    localField: "creatorEmail",
    ref: "Profile",
    foreignField: "email",
    justOne: true
  })

export default Stats;