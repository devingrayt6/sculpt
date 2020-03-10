import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class ScheduleService {
  async editScheduleByUserId(userId) {
    let data = await dbContext.Schedule.findOneAndUpdate({ _id: userId})
    throw new Error("Method not implemented.")
  }
  async getScheduleByUserId(userId) {
    let data = await dbContext.Schedule.find({ _id: userId })
    return data
  }



}

export const scheduleService = new ScheduleService()