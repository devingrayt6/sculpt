import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class ExerciseService {
  async getAll(userEmail) {
    return await dbContext.Exercises.find({ creatorEmail: userEmail })
  }



  async getById(id, userEmail) {
    let data = await dbContext.Exercises.findOne({ _id: id, creatorEmail: userEmail })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board")
    }
    return data
  }
  async getExercisesByWorkoutId(workoutId, email) {
    let data = await dbContext.Exercises.find({ _id: workoutId })
    return data
  }


  async create(rawData) {
    let data = await dbContext.Exercises.create(rawData)
    return data
  }


  async edit(id, userEmail, update) {
    let data = await dbContext.Exercises.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return data;
  }



  async delete(id, userEmail) {
    let data = await dbContext.Exercises.findOneAndRemove({ _id: id, creatorEmail: userEmail });
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
  }

}

export const exercisesService = new ExerciseService()