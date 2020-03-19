import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class WorkoutsService {

  async getAll(userEmail) {
    return await dbContext.Workout.find({ creatorEmail: userEmail }).populate("creator", "name picture")
  }

  async getById(id, userEmail) {
    let data = await dbContext.Workout.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }

  async create(rawData) {
    let data = await dbContext.Workout.create(rawData)
    return data
  }

  async edit(id, userEmail, update) {
    let data = await dbContext.Workout.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }

  async addDay(id, userEmail, update) {
    return await dbContext.Workout.findOneAndUpdate({ _id: id }, { $addToSet: { day: update.day } }, { new: true })
    // let data = await dbContext.Workout.findOne({ _id: id, creatorEmail: userEmail })
    // data.day.push(update.day)
    // await data.save()
    // if (!data) {
    //   throw new BadRequest("Invalid ID or you do not own this board");
    // }
    // return data;
  }

  async removeDay(id, userEmail, update) {
    let data = await dbContext.Workout.findOneAndUpdate({ _id: id }, { $pull: { day: update.day } }, { new: true })
    // return data
    // let data = await dbContext.Workout.findOne({ _id: id, creatorEmail: userEmail })
    // data.day.pull(update.day)
    // await data.save()
    // if (!data) {
    //   throw new BadRequest("Invalid ID or you do not own this board");
    // }
    return data;
  }

  async editExercise(id, userEmail, update) {
    let data = await dbContext.Workout.findOne({ _id: id, creatorEmail: userEmail })
    let thisExercise = data.exerciseData.find(e => e._id == update.exerciseId)
    let change = update.update
    for (let prop in change) {
      thisExercise[prop] = change[prop]
    }
    await data.save()
    return "updated"
  }
  async delete(id, userEmail) {
    let data = await dbContext.Workout.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

  async addExercise(id, body) {
    return await dbContext.Workout.findOneAndUpdate({ _id: id }, { $addToSet: { exerciseData: body } }, { new: true })
  }


  async deleteExercise(workoutId, exerciseId) {
    let data = await dbContext.Workout.findOneAndUpdate({ _id: workoutId }, { $pull: { exerciseData: { _id: exerciseId } } }, { new: true })
    return data
  }
}


export const workoutsService = new WorkoutsService()