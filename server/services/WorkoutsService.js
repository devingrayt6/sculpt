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

  async delete(id, userEmail) {
    let data = await dbContext.Workout.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

  async addExercise(id, body) {
    return await dbContext.Workout.findOneAndUpdate({ _id: id }, { $addToSet: { exerciseData: body } }, { new: true })
  }


  async deleteExercise(id, exerciseId) {
    let data = await dbContext.Workout.findOneAndUpdate({ _id: id }, { $pull: { exerciseData: { _id: exerciseId } } }, { new: true })
    return data
  }
}


export const workoutsService = new WorkoutsService()