import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"



class ScheduleService {
  async editScheduleByUserId(userId, userEmail, update) {
    let data = await dbContext.Schedule.findOneAndUpdate({ _id: userId, creatorEmail: userEmail}, update, {new:true})
    return data
  }
  async getScheduleByUserId(userId) {
    let data = await dbContext.Schedule.find({ _id: userId })
    return data
  }



}

export const scheduleService = new ScheduleService()