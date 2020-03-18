import mongoose from "mongoose";
const Schema = mongoose.Schema;
const ObjId = mongoose.SchemaTypes.ObjectId


// NOTE If you wish to add additional public properties for Schedules do so here


// const stat = new Schema({
//   value: {type: Number},
//   date: {type: Date, default: Date.now()}
// })

const stats = new Schema({
  bench: [{ type: Number, default: 0 }],
  deadLift: [{ type: Number, default: 0 }],
  pullUp: [{ type: Number, default: 0 }],
  squat: [{ type: Number, default: 0 }],
  sitUp: [{ type: Number, default: 0 }],
  pushUp: [{ type: Number, default: 0 }],
  time: [{ type: Number, default: 0 }]
})


const Profile = new Schema(
  {
    subs: [{ type: String, unique: true }],
    email: { type: String, lowercase: true, unique: true },
    name: { type: String, required: true },
    picture: { type: String },
    stats: stats,
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
